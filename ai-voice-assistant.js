// SevaSathi Customer AI Voice & Text Assistant
// Voice recognition (Web Speech API) + Text input + Speech Synthesis TTS + Gemini Multi-Lingual Intelligence

(function () {
  'use strict';

  let recognition = null;
  let isRecording = false;
  let conversationHistory = [];
  let isSpeaking = false;
  let currentStructuredState = null;

  function getActiveToken() {
    if (window.SevaSathiSession && typeof window.SevaSathiSession.getToken === 'function') {
      const t = window.SevaSathiSession.getToken();
      if (t) return t;
    }
    return localStorage.getItem('hustleToken') || localStorage.getItem('token') || '';
  }

  function getActiveUser() {
    if (window.SevaSathiSession && typeof window.SevaSathiSession.getUser === 'function') {
      const u = window.SevaSathiSession.getUser();
      if (u) return u;
    }
    try {
      return JSON.parse(localStorage.getItem('hustleCurrentUser') || 'null');
    } catch (e) {
      return null;
    }
  }

  let speechSilenceTimer = null;
  let accumulatedTranscript = '';

  function getActiveInputElement() {
    const modal = document.getElementById('ai-assistant-modal');
    if (modal && modal.classList.contains('active')) {
      return document.getElementById('ai-modal-input');
    }
    return document.getElementById('ai-voice-text-input');
  }

  // Initialize Speech Recognition (Continuous + 3.0s Silence Threshold)
  function initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening continuously so user isn't cut off on pauses
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = function () {
          isRecording = true;
          accumulatedTranscript = '';
          updateMicUI(true);
        };

        recognition.onresult = function (event) {
          let interim = '';
          let final = '';
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          const liveText = (final || interim || '').trim();
          if (liveText) {
            accumulatedTranscript = liveText;
            const inputEl = getActiveInputElement();
            if (inputEl) {
              inputEl.value = liveText;
            }
          }

          // Reset silence timer on any speech detected
          if (speechSilenceTimer) {
            clearTimeout(speechSilenceTimer);
          }

          // 3.0-second silence debounce timer gives slow or thinking speakers ample time
          speechSilenceTimer = setTimeout(() => {
            if (isRecording) {
              stopRecording(true);
            }
          }, 3000);
        };

        recognition.onerror = function (event) {
          console.warn('Speech recognition error:', event.error);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            stopRecording(false);
            alert('Microphone access was denied or blocked. You can also type your request directly!');
          }
        };

        recognition.onend = function () {
          // If browser speech recognition drops prematurely while user is still in recording session
          if (isRecording) {
            try {
              recognition.start();
              return;
            } catch (e) {}
          }
          updateMicUI(false);
        };
      } catch (err) {
        console.warn('Could not initialize SpeechRecognition:', err);
      }
    }
  }

  function startRecording() {
    if (!recognition) {
      initSpeech();
    }
    if (!recognition) {
      alert('Speech recognition is not supported in this browser. Please type your request into the text field.');
      return;
    }

    try {
      const currentLang = window.SevaSathiI18n ? window.SevaSathiI18n.getLanguage() : 'en';
      if (currentLang === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (currentLang === 'bn') {
        recognition.lang = 'bn-IN';
      } else {
        recognition.lang = 'en-IN';
      }
      accumulatedTranscript = '';
      recognition.start();
    } catch (e) {
      console.warn('Could not start recognition:', e);
      stopRecording(false);
    }
  }

  function stopRecording(shouldSubmit = false) {
    isRecording = false;
    if (speechSilenceTimer) {
      clearTimeout(speechSilenceTimer);
      speechSilenceTimer = null;
    }
    updateMicUI(false);
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
    if (shouldSubmit && accumulatedTranscript && accumulatedTranscript.trim()) {
      const text = accumulatedTranscript.trim();
      accumulatedTranscript = '';
      submitSmartQuery(text);
    }
  }

  function toggleRecording() {
    if (isRecording) {
      // User tapped mic while recording -> stop and immediately submit what was transcribed
      const activeInput = getActiveInputElement();
      const text = (activeInput ? activeInput.value : accumulatedTranscript).trim();
      stopRecording(false);
      if (text) {
        accumulatedTranscript = '';
        submitSmartQuery(text);
      }
    } else {
      startRecording();
    }
  }

  function updateMicUI(recording) {
    const micBtns = [
      document.getElementById('ai-voice-mic-btn'),
      document.getElementById('ai-modal-mic-btn')
    ].filter(Boolean);

    const activeInput = getActiveInputElement();

    micBtns.forEach(btn => {
      if (recording) {
        btn.classList.add('recording');
        btn.setAttribute('title', 'Listening... Click to send now');
      } else {
        btn.classList.remove('recording');
        btn.setAttribute('title', 'Click to speak (बोलें / বলুন)');
      }
    });

    if (activeInput) {
      if (recording) {
        if (!activeInput.hasAttribute('data-orig-ph')) {
          activeInput.setAttribute('data-orig-ph', activeInput.placeholder);
        }
        activeInput.placeholder = '🎙️ Listening... बोलिए / বলুন...';
      } else if (activeInput.hasAttribute('data-orig-ph')) {
        activeInput.placeholder = activeInput.getAttribute('data-orig-ph');
      }
    }
  }

  let cachedVoices = [];
  function loadAvailableVoices() {
    if (!window.speechSynthesis) return [];
    const v = window.speechSynthesis.getVoices();
    if (v && v.length > 0) cachedVoices = v;
    return cachedVoices;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    loadAvailableVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadAvailableVoices;
    }
  }

  // Text-To-Speech with full audio voice feedback
  function speakResponse(text, lang) {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else if (lang === 'bn') {
        utterance.lang = 'bn-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      // Try matching voice (from cached or immediate getVoices)
      const voices = cachedVoices.length > 0 ? cachedVoices : loadAvailableVoices();
      if (voices && voices.length > 0) {
        const langCode = lang === 'bn' ? 'bn' : (lang === 'hi' ? 'hi' : 'en');
        const match = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
        if (match) utterance.voice = match;
      }

      utterance.onstart = () => { isSpeaking = true; };
      utterance.onend = () => { isSpeaking = false; };
      utterance.onerror = () => { isSpeaking = false; };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('TTS voice playback error:', err);
    }
  }

  // Query Backend Gemini Assistant
  async function submitSmartQuery(queryText, options = {}) {
    if (!queryText || !queryText.trim()) return;

    const token = getActiveToken();
    const user = getActiveUser();

    openModal();
    appendUserBubble(queryText);
    showAssistantThinking();

    const inputEl = document.getElementById('ai-voice-text-input');
    if (inputEl) inputEl.value = '';

    const modalInput = document.getElementById('ai-modal-input');
    if (modalInput) modalInput.value = '';

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;

      // Extract user's actual selected city and coordinates
      const selectedCity = localStorage.getItem('hustleSelectedCity') || localStorage.getItem('hustleLocation') || (user && user.city) || '';
      let coords = null;
      try {
        const savedCoords = localStorage.getItem('hustleLocationCoords') || localStorage.getItem('hustleUserCoords');
        if (savedCoords) coords = JSON.parse(savedCoords);
      } catch (e) {}

      const resp = await fetch('/api/ai/smart-assistant', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: queryText,
          conversationHistory: conversationHistory,
          location: selectedCity,
          coords: coords,
          structuredState: currentStructuredState,
          selectedWorker: (options && options.selectedWorker) || (currentStructuredState && currentStructuredState.selectedWorker) || null,
          confirmed: Boolean(options && options.confirmed),
          paymentMethod: (options && options.paymentMethod) || (currentStructuredState && currentStructuredState.paymentMethod) || null,
          payNow: Boolean(options && options.payNow),
          isEscrowFunded: Boolean(options && options.isEscrowFunded),
          customerId: user ? (user.id || user._id) : null,
          customerName: user ? user.name : 'Valued Customer',
          customerEmail: user ? user.email : '',
          customerPhone: user ? user.phone : '',
          preferredLanguage: (window.SevaSathiI18n ? window.SevaSathiI18n.getLanguage() : null) || 'en'
        })
      });

      const data = await resp.json();
      removeAssistantThinking();

      if (!resp.ok) {
        appendAssistantBubble(data.message || data.error || 'Sorry, I encountered an issue fulfilling your request.');
        return;
      }

      if (data.state) {
        currentStructuredState = data.state;
      }
      if (options && options.selectedWorker) {
        currentStructuredState = currentStructuredState || {};
        currentStructuredState.selectedWorker = options.selectedWorker;
      }

      conversationHistory.push({ role: 'user', content: queryText });
      conversationHistory.push({ role: 'assistant', content: data.spokenResponse || data.textResponse || '' });

      handleAssistantResponse(data);

    } catch (err) {
      console.error('Smart assistant error:', err);
      removeAssistantThinking();
      appendAssistantBubble('Unable to connect to AI assistant right now. Please check your connection.');
    }
  }

  function handleAssistantResponse(data) {
    const action = data.action || data.status;
    if (action === 'workers_found') {
      appendWorkersFoundBubble(data);
    } else if (action === 'worker_gathering') {
      appendWorkerGatheringBubble(data);
    } else if (action === 'worker_ready_to_confirm') {
      appendWorkerConfirmBubble(data);
    } else if (action === 'direct_booking_confirmed') {
      appendDirectBookingConfirmedBubble(data);
      if (typeof window.loadCustomerAppointments === 'function') {
        window.loadCustomerAppointments();
      }
      if (typeof window.fetchAppointments === 'function') {
        window.fetchAppointments();
      }
    } else if (action === 'location_needed') {
      appendLocationNeededBubble(data);
    } else if (action === 'custom_pool_gathering') {
      appendCustomPoolGatheringBubble(data);
    } else if (action === 'custom_pool_ready_to_confirm') {
      appendCustomPoolConfirmBubble(data);
    } else if (action === 'custom_pool_created') {
      appendCustomPoolCreatedBubble(data);
      if (typeof window.loadCustomerAppointments === 'function') {
        window.loadCustomerAppointments();
      }
      if (typeof window.fetchAppointments === 'function') {
        window.fetchAppointments();
      }
    } else if (action === 'clarification_needed') {
      appendClarificationBubble(data.spokenResponse, data.clarifyingQuestions || [data.clarificationQuestion], data.quickChips || data.suggestedChips);
    } else {
      appendAssistantBubble(data.textResponse || data.spokenResponse || 'Request received.');
    }
  }

  // Comprehensive UI Localizations for English, Hindi, Bengali
  const LOCALIZED_UI = {
    en: {
      assistantTitle: 'SevaSathi AI Voice & Text Assistant',
      onlineStatus: 'Online • Gemini Intelligence',
      inputPlaceholder: 'Speak or reply in English, हिन्दी, or বাংলা...',
      micTitle: 'Click to speak (बोलें / বলুন)',
      micListening: '🎙️ Listening... बोलिए / বলুন...',
      sendBtnTitle: 'Send',
      replayVoice: '🔊 Listen Again',
      topWorkers: 'Top Recommended Verified Specialists',
      directAllocation: 'Direct Allocation Ready',
      expYears: 'exp',
      completedJobs: 'completed',
      bookWorker: 'Select & Book',
      checklistWorkerTitle: '📋 Appointment Details with',
      checklistPoolTitle: '📋 Custom Gig Requirement Details (5 of 5 needed)',
      serviceLabel: 'Service / Trade',
      specialistLabel: 'Specialist',
      locationLabel: 'Location',
      dateLabel: 'Scheduled Date',
      timeLabel: 'Preferred Time Window',
      budgetLabel: 'Proposed Budget / Rate',
      notSpecified: '⏳ Not specified',
      missing: '⏳ Missing',
      pending: '⏳ Pending',
      allVerifiedWorker: '✅ All Appointment Factors Verified',
      allGatheredPool: '✅ All 5 Requirements Gathered',
      selectPaymentMethod: '💳 Select Payment Method',
      instantUpi: '⚡ Instant UPI',
      card: '💳 Card',
      netBanking: '🏛️ Net Banking',
      cashAfter: '💵 Pay After Work',
      escrowNote: '🔒 100% Escrow Protection: Funds only paid out after task completion.',
      confirmWorkerBtn: '🚀 Confirm Appointment & Request',
      postPoolBtn: '🚀 Post Request to Open Gig Pool Now',
      bookingStatus: 'BOOKING STATUS',
      paymentEscrow: 'PAYMENT & ESCROW',
      acceptedScheduled: 'Accepted & Scheduled',
      pendingAcceptance: 'Pending Specialist Acceptance',
      escrowFunded: '✓ Escrow Funded',
      escrowPending: '⏳ Escrow Pending',
      bookingId: 'Booking ID',
      scheduledDateTime: 'Scheduled Date & Time',
      agreedBudget: 'Agreed Budget',
      authorizeEscrow: '💳 Authorize & Deposit',
      viewBookings: '📋 View My Bookings & Real-Time Status',
      viewPoolBookings: '📋 View My Bookings & Negotiations',
      poolStatus: 'POOL STATUS',
      activeOpenPool: 'Active Open Gig Pool',
      paymentTerms: 'PAYMENT TERMS',
      proposedBudget: 'Proposed Budget'
    },
    hi: {
      assistantTitle: 'सेवासाथी एआई वॉयस और टेक्स्ट सहायक',
      onlineStatus: 'ऑनलाइन • जेमिनी इंटेलिजेंस',
      inputPlaceholder: 'हिंदी, বাংলা বা ইংরেজিতে বলুন বা লিখুন...',
      micTitle: 'बोलने के लिए क्लिक करें (बोलें / বলুন)',
      micListening: '🎙️ सुन रहे हैं... बोलिए...',
      sendBtnTitle: 'भेजें',
      replayVoice: '🔊 दोबारा सुनें',
      topWorkers: 'शीर्ष अनुशंसित सत्यापित विशेषज्ञ',
      directAllocation: 'सीधे आवंटन के लिए तैयार',
      expYears: 'वर्ष अनुभव',
      completedJobs: 'सफल कार्य',
      bookWorker: 'चुनें और बुक करें',
      checklistWorkerTitle: '📋 विशेषज्ञ के साथ अपॉइंटमेंट विवरण',
      checklistPoolTitle: '📋 कस्टम गिग आवश्यकता विवरण (5 आवश्यक)',
      serviceLabel: 'सेवा / कार्य',
      specialistLabel: 'विशेषज्ञ',
      locationLabel: 'स्थान',
      dateLabel: 'निर्धारित तिथि',
      timeLabel: 'पसंदीदा समय स्लॉट',
      budgetLabel: 'प्रस्तावित बजट / दर',
      notSpecified: '⏳ उल्लिखित नहीं',
      missing: '⏳ स्थान बाकी है',
      pending: '⏳ बाकी है',
      allVerifiedWorker: '✅ अपॉइंटमेंट के सभी विवरण सत्यापित',
      allGatheredPool: '✅ सभी 5 विवरण प्राप्त हुए',
      selectPaymentMethod: '💳 भुगतान विधि चुनें',
      instantUpi: '⚡ त्वरित UPI',
      card: '💳 कार्ड',
      netBanking: '🏛️ नेट बैंकिंग',
      cashAfter: '💵 काम के बाद भुगतान',
      escrowNote: '🔒 100% एस्क्रो सुरक्षा: कार्य संतोषजनक पूरा होने पर ही भुगतान जारी होगा।',
      confirmWorkerBtn: '🚀 अपॉइंटमेंट पुष्टि करें और बुक करें',
      postPoolBtn: '🚀 ओपन गिग पूल में अनुरोध पोस्ट करें',
      bookingStatus: 'बुकिंग स्थिति',
      paymentEscrow: 'भुगतान और एस्क्रो',
      acceptedScheduled: 'स्वीकृत और निर्धारित',
      pendingAcceptance: 'विशेषज्ञ की स्वीकृति लंबित',
      escrowFunded: '✓ एस्क्रो में जमा',
      escrowPending: '⏳ एस्क्रो लंबित',
      bookingId: 'बुकिंग आईडी',
      scheduledDateTime: 'निर्धारित तिथि व समय',
      agreedBudget: 'सहमति बजट',
      authorizeEscrow: '💳 अधिकृत करें और एस्क्रो में जमा करें',
      viewBookings: '📋 मेरी बुकिंग और स्थिति देखें',
      viewPoolBookings: '📋 मेरी बुकिंग और बातचीत देखें',
      poolStatus: 'पूल स्थिति',
      activeOpenPool: 'सक्रिय ओपन गिग पूल',
      paymentTerms: 'भुगतान शर्तें',
      proposedBudget: 'प्रस्तावित बजट'
    },
    bn: {
      assistantTitle: 'সেবাসাথী এআই ভয়েস ও টেক্সট সহকারী',
      onlineStatus: 'অনলাইন • জেমিনি বুদ্ধিমত্তা',
      inputPlaceholder: 'বাংলা, हिन्दी বা ইংরেজিতে বলুন বা লিখুন...',
      micTitle: 'বলার জন্য ক্লিক করুন (বলুন / बोलें)',
      micListening: '🎙️ শুনছি... বলুন...',
      sendBtnTitle: 'পাঠান',
      replayVoice: '🔊 আবার শুনুন',
      topWorkers: 'শীর্ষ প্রস্তাবিত যাচাইকৃত কর্মী',
      directAllocation: 'সরাসরি বরাদ্দের জন্য প্রস্তুত',
      expYears: 'বছর অভিজ্ঞতা',
      completedJobs: 'সম্পন্ন কাজ',
      bookWorker: 'নির্বাচন ও বুক করুন',
      checklistWorkerTitle: '📋 বিশেষজ্ঞের সাথে অ্যাপয়েন্টমেন্টের বিবরণ',
      checklistPoolTitle: '📋 কাস্টম কাজের বিশদ বিবরণ (৫টির সবকটি প্রয়োজন)',
      serviceLabel: 'কাজ / সার্ভিস',
      specialistLabel: 'বিশেষজ্ঞ মিস্ত্রি',
      locationLabel: 'এলাকা / অবস্থান',
      dateLabel: 'নির্ধারিত তারিখ',
      timeLabel: 'সুবিধাজনক সময়',
      budgetLabel: 'প্রস্তাবিত বাজেট / রেট',
      notSpecified: '⏳ নির্দিষ্ট করা হয়নি',
      missing: '⏳ এলাকা বাকি আছে',
      pending: '⏳ বাকি আছে',
      allVerifiedWorker: '✅ বুকিংয়ের সকল তথ্য যাচাই সম্পন্ন',
      allGatheredPool: '✅ ৫টি প্রয়োজনীয় তথ্য সম্পন্ন',
      selectPaymentMethod: '💳 পছন্দের পেমেন্ট মাধ্যম',
      instantUpi: '⚡ তাত্ক্ষণিক UPI',
      card: '💳 কার্ড',
      netBanking: '🏛️ নেট ব্যাংকিং',
      cashAfter: '💵 কাজের পর নগদ',
      escrowNote: '🔒 ১০০% এসক্রো সুরক্ষা: কাজ সফলভাবে শেষ হলেই টাকা মিস্ত্রিকে দেওয়া হবে।',
      confirmWorkerBtn: '🚀 বুকিং নিশ্চিত করুন ও মিস্ত্রি ডাকুন',
      postPoolBtn: '🚀 ওপেন গিগ পুলে রিকোয়েস্ট পাঠান',
      bookingStatus: 'বুকিং স্ট্যাটাস',
      paymentEscrow: 'পেমেন্ট ও এসক্রো',
      acceptedScheduled: 'স্বীকৃত ও নির্ধারিত',
      pendingAcceptance: 'বিশেষজ্ঞের স্বীকৃতির অপেক্ষায়',
      escrowFunded: '✓ এসক্রোতে জমা',
      escrowPending: '⏳ এসক্রো বাকি',
      bookingId: 'বুকিং আইডি',
      scheduledDateTime: 'নির্ধারিত তারিখ ও সময়',
      agreedBudget: 'নির্ধারিত বাজেট',
      authorizeEscrow: '💳 এসক্রোতে অগ্রিম জমা করুন',
      viewBookings: '📋 আমার বুকিং ও স্ট্যাটাস দেখুন',
      viewPoolBookings: '📋 আমার বুকিং ও দরদাম দেখুন',
      poolStatus: 'পুল স্ট্যাটাস',
      activeOpenPool: 'সক্রিয় ওপেন গিগ পুল',
      paymentTerms: 'পেমেন্ট শর্তাবলী',
      proposedBudget: 'প্রস্তাবিত বাজেট'
    }
  };

  function getCurrentLang() {
    return (window.SevaSathiI18n ? window.SevaSathiI18n.getLanguage() : null) || 'en';
  }

  function getUi(key, langOverride) {
    const l = langOverride || getCurrentLang();
    const map = LOCALIZED_UI[l] || LOCALIZED_UI.en;
    return map[key] || LOCALIZED_UI.en[key] || key;
  }

  function updateModalLanguage(lang) {
    const l = lang || getCurrentLang();
    const titleEl = document.querySelector('.ai-title-text');
    if (titleEl) titleEl.textContent = getUi('assistantTitle', l);
    const badgeEl = document.querySelector('.ai-status-badge');
    if (badgeEl) badgeEl.textContent = getUi('onlineStatus', l);
    const inputEl = document.getElementById('ai-modal-input');
    if (inputEl) {
      inputEl.placeholder = getUi('inputPlaceholder', l);
      inputEl.setAttribute('data-orig-ph', getUi('inputPlaceholder', l));
    }
    const bottomInput = document.getElementById('ai-voice-text-input');
    if (bottomInput) {
      bottomInput.placeholder = getUi('inputPlaceholder', l);
      bottomInput.setAttribute('data-orig-ph', getUi('inputPlaceholder', l));
    }
    const micBtn = document.getElementById('ai-modal-mic-btn');
    if (micBtn) micBtn.setAttribute('title', getUi('micTitle', l));
    const bottomMicBtn = document.getElementById('ai-voice-mic-btn');
    if (bottomMicBtn) bottomMicBtn.setAttribute('title', getUi('micTitle', l));
    const sendBtn = document.getElementById('ai-modal-send-btn');
    if (sendBtn) sendBtn.setAttribute('title', getUi('sendBtnTitle', l));
  }

  // Modal Dialog Creation and Management
  function getModal() {
    let modal = document.getElementById('ai-assistant-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ai-assistant-modal';
      modal.className = 'ai-assistant-modal-backdrop';
      const curLang = getCurrentLang();
      modal.innerHTML = `
        <div class="ai-assistant-dialog">
          <div class="ai-assistant-header">
            <div class="ai-assistant-title">
              <div class="ai-avatar-pulse">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </div>
              <div>
                <span class="ai-title-text">${escapeHtml(getUi('assistantTitle', curLang))}</span>
                <span class="ai-status-badge">${escapeHtml(getUi('onlineStatus', curLang))}</span>
              </div>
            </div>
            <button type="button" class="ai-modal-close-btn" id="ai-modal-close-btn" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="ai-assistant-body" id="ai-assistant-messages"></div>
          <div class="ai-assistant-footer">
            <input type="text" id="ai-modal-input" class="ai-modal-input" placeholder="${escapeHtml(getUi('inputPlaceholder', curLang))}" />
            <button type="button" id="ai-modal-mic-btn" class="ai-mic-btn ai-modal-mic-btn" title="${escapeHtml(getUi('micTitle', curLang))}" aria-label="Voice input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
              </svg>
            </button>
            <button type="button" id="ai-modal-send-btn" class="ai-modal-send-btn" title="${escapeHtml(getUi('sendBtnTitle', curLang))}" aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('ai-modal-close-btn').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      const modalInput = document.getElementById('ai-modal-input');
      const sendBtn = document.getElementById('ai-modal-send-btn');
      const micBtn = document.getElementById('ai-modal-mic-btn');

      if (micBtn) {
        micBtn.addEventListener('click', toggleRecording);
      }

      const sendFromModal = () => {
        const val = modalInput.value.trim();
        if (val) {
          modalInput.value = '';
          submitSmartQuery(val);
        }
      };
      sendBtn.addEventListener('click', sendFromModal);
      modalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendFromModal();
        }
      });
    }
    return modal;
  }

  function openModal() {
    const modal = getModal();
    updateModalLanguage();
    modal.classList.add('active');
  }

  function closeModal() {
    const modal = document.getElementById('ai-assistant-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function scrollToBottom() {
    const container = document.getElementById('ai-assistant-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  function appendUserBubble(text) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;
    const bubble = document.createElement('div');
    bubble.className = 'ai-chat-bubble user';
    bubble.textContent = text;
    container.appendChild(bubble);
    scrollToBottom();
  }

  function appendAssistantBubble(text) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;
    const bubble = document.createElement('div');
    bubble.className = 'ai-chat-bubble assistant';
    bubble.textContent = text;
    container.appendChild(bubble);
    scrollToBottom();
  }

  function showAssistantThinking() {
    removeAssistantThinking();
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;
    const thinking = document.createElement('div');
    thinking.id = 'ai-thinking-indicator';
    thinking.className = 'ai-chat-bubble assistant thinking';
    thinking.innerHTML = `
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    `;
    container.appendChild(thinking);
    scrollToBottom();
  }

  function removeAssistantThinking() {
    const el = document.getElementById('ai-thinking-indicator');
    if (el) el.remove();
  }

  function appendClarificationBubble(spokenResponse, clarifyingQuestions, quickChips) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant clarification-bubble';

    let html = `<div class="ai-spoken-text">${escapeHtml(spokenResponse)}</div>`;

    if (clarifyingQuestions && clarifyingQuestions.length > 0) {
      html += `<ul class="ai-clarification-list">`;
      clarifyingQuestions.forEach(q => {
        if (q) html += `<li>${escapeHtml(q)}</li>`;
      });
      html += `</ul>`;
    }

    if (quickChips && quickChips.length > 0) {
      html += `<div class="ai-quick-chips">`;
      quickChips.forEach(chip => {
        if (chip) html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
      });
      html += `</div>`;
    }

    wrap.innerHTML = html;
    container.appendChild(wrap);

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const text = this.getAttribute('data-chip');
        submitSmartQuery(text);
      });
    });

    scrollToBottom();
  }

  function appendWorkersFoundBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const text = data.textResponse || data.spokenResponse || getUi('topWorkers', curLang) + ':';
    const workers = data.workers || [];

    let html = `<div class="ai-spoken-text">${escapeHtml(text)}</div>`;

    if (workers.length > 0) {
      html += `<div class="ai-workers-grid">`;
      workers.forEach((w, idx) => {
        const rating = w.rating ? Number(w.rating).toFixed(1) : '4.9';
        const jobs = w.completedJobs || w.completedJobsCount || 12;
        const initial = (w.name || 'W').charAt(0).toUpperCase();
        const price = w.hourlyRate || w.baseRate || 499;
        const skill = w.specificSkill || w.skillCategory || data.state?.service || 'Specialist';
        const loc = w.locality || w.city || data.state?.location || '';

        html += `
          <div class="ai-worker-select-card">
            <div>
              <div class="ai-worker-card-top">
                <div class="ai-avatar">${escapeHtml(initial)}</div>
                <div>
                  <div class="ai-worker-card-name">${escapeHtml(w.name)}</div>
                  <div class="ai-worker-card-skill">${escapeHtml(skill)}</div>
                </div>
              </div>
              <div class="ai-worker-card-meta">
                <span class="rating-star">★ ${rating}</span>
                <span>(${jobs} ${escapeHtml(getUi('completedJobs', curLang))})</span>
                ${loc ? `<span>• ${escapeHtml(loc)}</span>` : ''}
              </div>
              <div class="ai-worker-card-price">₹${price}</div>
            </div>
            <button type="button" class="btn-book-worker-direct" data-worker-index="${idx}">
              👤 ${escapeHtml(getUi('bookWorker', curLang))} ${escapeHtml(w.name)}
            </button>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (data.quickChips && data.quickChips.length > 0) {
      html += `<div class="ai-quick-chips">`;
      data.quickChips.forEach(chip => {
        if (chip) html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
      });
      html += `</div>`;
    }

    wrap.innerHTML = html;
    container.appendChild(wrap);

    // Attach select button listeners
    wrap.querySelectorAll('.btn-book-worker-direct').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-worker-index'), 10);
        const selectedWorker = workers[idx];
        if (selectedWorker) {
          submitSmartQuery(selectedWorker.name, { selectedWorker });
        }
      });
    });

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const chipText = this.getAttribute('data-chip');
        submitSmartQuery(chipText);
      });
    });

    scrollToBottom();
  }

  function appendWorkerGatheringBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant clarification-bubble';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const text = data.textResponse || data.spokenResponse || '';
    const state = data.state || {};
    const worker = data.selectedWorker || state.selectedWorker || {};

    let html = `<div class="ai-spoken-text" style="white-space: pre-line;">${escapeHtml(text)}</div>`;

    // Live Checklist Card
    html += `
      <div class="ai-checklist-card">
        <div class="ai-checklist-title">${escapeHtml(getUi('checklistWorkerTitle', curLang))} ${escapeHtml(worker.name || 'Specialist')}</div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">1. ${escapeHtml(getUi('specialistLabel', curLang))}</span>
          <span class="ai-checklist-val ready">✓ ${escapeHtml(worker.name || 'Selected')}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">2. ${escapeHtml(getUi('locationLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.location ? 'ready' : 'pending'}">${escapeHtml(state.location ? '✓ ' + state.location : getUi('missing', curLang))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">3. ${escapeHtml(getUi('dateLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.date ? 'ready' : 'pending'}">${escapeHtml(state.formattedDateText || (state.date ? '✓ ' + state.date : getUi('pending', curLang)))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">4. ${escapeHtml(getUi('timeLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.time ? 'ready' : 'pending'}">${escapeHtml(state.time ? '✓ ' + state.time : getUi('pending', curLang))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">5. ${escapeHtml(getUi('budgetLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.rate ? 'ready' : 'pending'}">${escapeHtml(state.rate ? '✓ ₹' + state.rate : '⏳ ₹' + (worker.hourlyRate || worker.baseRate || 499))}</span>
        </div>
      </div>
    `;

    if (data.quickChips && data.quickChips.length > 0) {
      html += `<div class="ai-quick-chips">`;
      data.quickChips.forEach(chip => {
        html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
      });
      html += `</div>`;
    }

    wrap.innerHTML = html;
    container.appendChild(wrap);

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        submitSmartQuery(this.getAttribute('data-chip'));
      });
    });

    scrollToBottom();
  }

  function appendWorkerConfirmBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const text = data.textResponse || data.spokenResponse || '';
    const state = data.state || {};
    const worker = data.selectedWorker || state.selectedWorker || {};
    const activePayMethod = state.paymentMethod || 'UPI';

    let html = `
      <div class="ai-spoken-text" style="white-space: pre-line;">${escapeHtml(text)}</div>
      <div class="ai-confirm-card">
        <div style="font-weight:700; color:#15803d; font-size:13.5px; margin-bottom:8px;">${escapeHtml(getUi('allVerifiedWorker', curLang))}</div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('specialistLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(worker.name || 'Pro')}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('serviceLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.service || worker.skillCategory || 'Service')}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('locationLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.location)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('dateLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.formattedDateText || state.date)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('timeLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.time)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('budgetLabel', curLang))}:</span><strong class="ai-checklist-val ready">₹${escapeHtml(state.rate)}</strong></div>
        
        <!-- Interactive Payment Method Selection -->
        <div class="ai-payment-selection-box" style="margin: 12px 0 10px 0; padding: 10px 12px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px;">
          <div style="font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">${escapeHtml(getUi('selectPaymentMethod', curLang))}</div>
          <div class="ai-pay-options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <label class="ai-pay-opt-pill ${(!activePayMethod || activePayMethod.includes('UPI')) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(!activePayMethod || activePayMethod.includes('UPI')) ? '#16a34a' : '#e2e8f0'}; background:${(!activePayMethod || activePayMethod.includes('UPI')) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-worker-pay-method" value="UPI" ${(!activePayMethod || activePayMethod.includes('UPI')) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('instantUpi', curLang))}</span>
            </label>
            <label class="ai-pay-opt-pill ${(activePayMethod && activePayMethod.includes('Card')) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(activePayMethod && activePayMethod.includes('Card')) ? '#16a34a' : '#e2e8f0'}; background:${(activePayMethod && activePayMethod.includes('Card')) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-worker-pay-method" value="Card" ${(activePayMethod && activePayMethod.includes('Card')) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('card', curLang))}</span>
            </label>
            <label class="ai-pay-opt-pill ${(activePayMethod && activePayMethod.includes('NetBanking')) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(activePayMethod && activePayMethod.includes('NetBanking')) ? '#16a34a' : '#e2e8f0'}; background:${(activePayMethod && activePayMethod.includes('NetBanking')) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-worker-pay-method" value="NetBanking" ${(activePayMethod && activePayMethod.includes('NetBanking')) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('netBanking', curLang))}</span>
            </label>
            <label class="ai-pay-opt-pill ${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? '#16a34a' : '#e2e8f0'}; background:${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-worker-pay-method" value="Cash after Service" ${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('cashAfter', curLang))}</span>
            </label>
          </div>
          <div style="font-size: 11px; color: #15803d; margin-top: 8px; display: flex; align-items: center; gap: 5px;">
            <span>🔒</span> <strong>${escapeHtml(getUi('escrowNote', curLang))}</strong>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">
          <button type="button" class="btn-confirm-pool-action" id="btn-confirm-worker-now">
            ${escapeHtml(getUi('confirmWorkerBtn', curLang))} (${escapeHtml(worker.name || 'Worker')})
          </button>
        </div>
      </div>
    `;

    if (data.quickChips && data.quickChips.length > 0) {
      html += `<div class="ai-quick-chips">`;
      data.quickChips.forEach(chip => {
        html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
      });
      html += `</div>`;
    }

    wrap.innerHTML = html;
    container.appendChild(wrap);

    // Track payment radio changes
    wrap.querySelectorAll('input[name="ai-worker-pay-method"]').forEach(radio => {
      radio.addEventListener('change', function () {
        if (currentStructuredState) {
          currentStructuredState.paymentMethod = this.value;
        }
        wrap.querySelectorAll('.ai-pay-opt-pill').forEach(pill => {
          const isChecked = pill.querySelector('input').checked;
          pill.style.borderColor = isChecked ? '#16a34a' : '#e2e8f0';
          pill.style.background = isChecked ? '#f0fdf4' : '#f8fafc';
        });
      });
    });

    const confirmBtn = wrap.querySelector('#btn-confirm-worker-now');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const selectedPay = wrap.querySelector('input[name="ai-worker-pay-method"]:checked')?.value || 'UPI';
        submitSmartQuery(`Yes, confirm and book ${worker.name || 'specialist'}`, {
          confirmed: true,
          paymentMethod: selectedPay,
          selectedWorker: worker
        });
      });
    }

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const val = this.getAttribute('data-chip');
        const selectedPay = wrap.querySelector('input[name="ai-worker-pay-method"]:checked')?.value || 'UPI';
        if (val.includes('Confirm') || val.includes('पुष्टि') || val.includes('বুক') || val.includes('নিশ্চিত')) {
          submitSmartQuery(val, { confirmed: true, paymentMethod: selectedPay, selectedWorker: worker });
        } else {
          submitSmartQuery(val);
        }
      });
    });

    scrollToBottom();
  }

  function appendDirectBookingConfirmedBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant pool-bubble';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const b = data.booking || {};
    const worker = data.selectedWorker || {};
    const text = data.textResponse || data.spokenResponse || '🎉 Appointment Confirmed!';
    const payMethod = b.paymentMethod || data.state?.paymentMethod || 'UPI (PhonePe / GPay)';
    const isPaid = b.paymentStatus === 'paid';

    wrap.innerHTML = `
      <div class="ai-info-banner" style="border-color:#86efac; background:#f0fdf4;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <strong style="color:#15803d;">${escapeHtml(text)}</strong>
      </div>
      <div class="ai-pool-details">
        <p>Your appointment request has been dispatched directly to <strong>${escapeHtml(worker.name || b.workerName || 'your specialist')}</strong>. The provider will review the slot and arrive as scheduled.</p>
        
        <div class="ai-booking-status-card" style="margin: 10px 0; padding: 12px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 11.5px; font-weight: 700; color: #64748b;">${escapeHtml(getUi('bookingStatus', curLang))}</span>
            <span class="badge-status pending" style="background: #fef3c7; color: #d97706; font-weight: 800; font-size: 11.5px; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              <span class="status-dot-pulse" style="width:6px; height:6px; border-radius:50%; background:#d97706; display:inline-block;"></span>
              ${b.status === 'accepted' ? escapeHtml(getUi('acceptedScheduled', curLang)) : escapeHtml(getUi('pendingAcceptance', curLang))}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 11.5px; font-weight: 700; color: #64748b;">${escapeHtml(getUi('paymentEscrow', curLang))}</span>
            <span class="badge-status ${isPaid ? 'paid' : 'unpaid'}" style="background: ${isPaid ? '#dcfce7; color:#15803d;' : '#eff6ff; color:#2563eb;'} font-weight: 800; font-size: 11.5px; padding: 3px 8px; border-radius: 6px;">
              ${isPaid ? escapeHtml(getUi('escrowFunded', curLang)) + ' (' + escapeHtml(payMethod) + ')' : escapeHtml(getUi('escrowPending', curLang)) + ' (' + escapeHtml(payMethod) + ')'}
            </span>
          </div>
          <div class="ai-pool-meta" style="margin-top: 8px; font-size: 12px; color: #334155; display: flex; flex-direction: column; gap: 4px;">
            <div><strong>${escapeHtml(getUi('bookingId', curLang))}:</strong> #${escapeHtml((b.id || b._id || '').toString().slice(-6))}</div>
            <div><strong>${escapeHtml(getUi('specialistLabel', curLang))}:</strong> ${escapeHtml(worker.name || b.workerName || 'Assigned Pro')} (${escapeHtml(worker.skillCategory || b.category || 'Specialist')})</div>
            <div><strong>${escapeHtml(getUi('serviceLabel', curLang))}:</strong> ${escapeHtml(b.serviceName || data.state?.service || 'Specialist Service')}</div>
            <div><strong>${escapeHtml(getUi('scheduledDateTime', curLang))}:</strong> ${escapeHtml(b.scheduledDate || data.state?.date || '')} · ${escapeHtml(b.scheduledTime || data.state?.time || '')}</div>
            <div><strong>${escapeHtml(getUi('agreedBudget', curLang))}:</strong> ₹${escapeHtml(b.price || data.state?.rate || 499)}</div>
            <div><strong>${escapeHtml(getUi('locationLabel', curLang))}:</strong> ${escapeHtml(b.locality || b.city || data.state?.location || '')}</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
          ${!isPaid ? `
            <button type="button" class="btn-confirm-pool-action" id="btn-pay-direct-escrow" style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);">
              ${escapeHtml(getUi('authorizeEscrow', curLang))} ₹${escapeHtml(b.price || data.state?.rate || 499)}
            </button>
          ` : ''}
          <button type="button" class="btn-confirm-pool-action" id="btn-view-direct-bookings" style="background: #2563eb;">
            ${escapeHtml(getUi('viewBookings', curLang))}
          </button>
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const payBtn = wrap.querySelector('#btn-pay-direct-escrow');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        closeModal();
        const bookingId = b._id || b.id;
        const price = b.price || data.state?.rate || 499;
        const sName = b.serviceName || data.state?.service || 'Specialist Service';
        const wName = worker.name || b.workerName || 'Specialist';
        if (window.SevaSathiBooking && typeof window.SevaSathiBooking.openEscrowPaymentModal === 'function') {
          window.SevaSathiBooking.openEscrowPaymentModal(bookingId, price, sName, wName);
        }
      });
    }

    const viewBtn = wrap.querySelector('#btn-view-direct-bookings');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        closeModal();
        if (window.SevaSathiBooking && typeof window.SevaSathiBooking.openCustomerBookingsModal === 'function') {
          window.SevaSathiBooking.openCustomerBookingsModal();
        }
      });
    }

    scrollToBottom();
  }

  function appendLocationNeededBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant clarification-bubble';

    const curLang = data.detectedLanguage || getCurrentLang();
    const text = data.textResponse || data.spokenResponse || 'Which city or area do you need this service in?';
    let html = `<div class="ai-spoken-text">${escapeHtml(text)}</div>`;

    const chips = data.quickChips || ['Kolkata', 'Bengaluru', 'Delhi', 'Mumbai'];
    html += `<div class="ai-quick-chips">`;
    chips.forEach(chip => {
      html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
    });
    html += `</div>`;

    wrap.innerHTML = html;
    container.appendChild(wrap);

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const selectedCity = this.getAttribute('data-chip');
        localStorage.setItem('hustleSelectedCity', selectedCity);
        localStorage.setItem('hustleLocation', selectedCity);
        const cityBtnText = document.getElementById('header-city-name');
        if (cityBtnText) cityBtnText.textContent = selectedCity;
        submitSmartQuery(selectedCity);
      });
    });

    scrollToBottom();
  }

  function appendCustomPoolGatheringBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant clarification-bubble';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const text = data.textResponse || data.spokenResponse || '';
    const state = data.state || {};
    const benchmark = data.benchmark || {};

    let html = `<div class="ai-spoken-text" style="white-space: pre-line;">${escapeHtml(text)}</div>`;

    // Live Checklist Card
    html += `
      <div class="ai-checklist-card">
        <div class="ai-checklist-title">${escapeHtml(getUi('checklistPoolTitle', curLang))}</div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">1. ${escapeHtml(getUi('serviceLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.service ? 'ready' : 'pending'}">${escapeHtml(state.service ? '✓ ' + state.service : getUi('notSpecified', curLang))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">2. ${escapeHtml(getUi('locationLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.location ? 'ready' : 'pending'}">${escapeHtml(state.location ? '✓ ' + state.location : getUi('missing', curLang))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">3. ${escapeHtml(getUi('dateLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.date ? 'ready' : 'pending'}">${escapeHtml(state.date ? '✓ ' + state.date : getUi('pending', curLang))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">4. ${escapeHtml(getUi('timeLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.time ? 'ready' : 'pending'}">${escapeHtml(state.time ? '✓ ' + state.time : getUi('pending', curLang))}</span>
        </div>
        <div class="ai-checklist-row">
          <span class="ai-checklist-label">5. ${escapeHtml(getUi('budgetLabel', curLang))}</span>
          <span class="ai-checklist-val ${state.rate ? 'ready' : 'pending'}">${escapeHtml(state.rate ? '✓ ₹' + state.rate : (benchmark.defaultRate ? '⏳ ' + benchmark.rangeText + ' (₹' + benchmark.defaultRate + ')' : getUi('pending', curLang)))}</span>
        </div>
      </div>
    `;

    if (data.quickChips && data.quickChips.length > 0) {
      html += `<div class="ai-quick-chips">`;
      data.quickChips.forEach(chip => {
        html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
      });
      html += `</div>`;
    }

    wrap.innerHTML = html;
    container.appendChild(wrap);

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        submitSmartQuery(this.getAttribute('data-chip'));
      });
    });

    scrollToBottom();
  }

  function appendCustomPoolConfirmBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const text = data.textResponse || data.spokenResponse || '';
    const state = data.state || {};
    const activePayMethod = state.paymentMethod || 'UPI';

    let html = `
      <div class="ai-spoken-text" style="white-space: pre-line;">${escapeHtml(text)}</div>
      <div class="ai-confirm-card">
        <div style="font-weight:700; color:#15803d; font-size:13.5px; margin-bottom:8px;">${escapeHtml(getUi('allGatheredPool', curLang))}</div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('serviceLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.service)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('locationLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.location)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('dateLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.date)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('timeLabel', curLang))}:</span><strong class="ai-checklist-val ready">${escapeHtml(state.time)}</strong></div>
        <div class="ai-checklist-row"><span class="ai-checklist-label">${escapeHtml(getUi('budgetLabel', curLang))}:</span><strong class="ai-checklist-val ready">₹${escapeHtml(state.rate)}</strong></div>
        
        <!-- Payment Method Selection -->
        <div class="ai-payment-selection-box" style="margin: 12px 0 10px 0; padding: 10px 12px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px;">
          <div style="font-size: 11.5px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">${escapeHtml(getUi('selectPaymentMethod', curLang))}</div>
          <div class="ai-pay-options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <label class="ai-pay-opt-pill ${(!activePayMethod || activePayMethod.includes('UPI')) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(!activePayMethod || activePayMethod.includes('UPI')) ? '#16a34a' : '#e2e8f0'}; background:${(!activePayMethod || activePayMethod.includes('UPI')) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-pool-pay-method" value="UPI" ${(!activePayMethod || activePayMethod.includes('UPI')) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('instantUpi', curLang))}</span>
            </label>
            <label class="ai-pay-opt-pill ${(activePayMethod && activePayMethod.includes('Card')) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(activePayMethod && activePayMethod.includes('Card')) ? '#16a34a' : '#e2e8f0'}; background:${(activePayMethod && activePayMethod.includes('Card')) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-pool-pay-method" value="Card" ${(activePayMethod && activePayMethod.includes('Card')) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('card', curLang))}</span>
            </label>
            <label class="ai-pay-opt-pill ${(activePayMethod && activePayMethod.includes('NetBanking')) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(activePayMethod && activePayMethod.includes('NetBanking')) ? '#16a34a' : '#e2e8f0'}; background:${(activePayMethod && activePayMethod.includes('NetBanking')) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-pool-pay-method" value="NetBanking" ${(activePayMethod && activePayMethod.includes('NetBanking')) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('netBanking', curLang))}</span>
            </label>
            <label class="ai-pay-opt-pill ${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? 'selected' : ''}" style="display:flex; align-items:center; gap:6px; padding:8px 10px; border:1.5px solid ${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? '#16a34a' : '#e2e8f0'}; background:${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? '#f0fdf4' : '#f8fafc'}; border-radius:8px; cursor:pointer; font-size:12px; font-weight:700;">
              <input type="radio" name="ai-pool-pay-method" value="Cash after Service" ${(activePayMethod && (activePayMethod.includes('Cash') || activePayMethod.includes('After'))) ? 'checked' : ''} style="accent-color:#16a34a;" />
              <span>${escapeHtml(getUi('cashAfter', curLang))}</span>
            </label>
          </div>
        </div>

        <button type="button" class="btn-confirm-pool-action" id="btn-post-pool-now">
          ${escapeHtml(getUi('postPoolBtn', curLang))}
        </button>
      </div>
    `;

    if (data.quickChips && data.quickChips.length > 0) {
      html += `<div class="ai-quick-chips">`;
      data.quickChips.forEach(chip => {
        html += `<button type="button" class="ai-chip-btn" data-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`;
      });
      html += `</div>`;
    }

    wrap.innerHTML = html;
    container.appendChild(wrap);

    // Track payment radio changes
    wrap.querySelectorAll('input[name="ai-pool-pay-method"]').forEach(radio => {
      radio.addEventListener('change', function () {
        if (currentStructuredState) {
          currentStructuredState.paymentMethod = this.value;
        }
        wrap.querySelectorAll('.ai-pay-opt-pill').forEach(pill => {
          const isChecked = pill.querySelector('input').checked;
          pill.style.borderColor = isChecked ? '#16a34a' : '#e2e8f0';
          pill.style.background = isChecked ? '#f0fdf4' : '#f8fafc';
        });
      });
    });

    const postBtn = wrap.querySelector('#btn-post-pool-now');
    if (postBtn) {
      postBtn.addEventListener('click', () => {
        const selectedPay = wrap.querySelector('input[name="ai-pool-pay-method"]:checked')?.value || 'UPI';
        submitSmartQuery('Yes, please confirm and post this custom pool request', {
          confirmed: true,
          paymentMethod: selectedPay
        });
      });
    }

    wrap.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const val = this.getAttribute('data-chip');
        const selectedPay = wrap.querySelector('input[name="ai-pool-pay-method"]:checked')?.value || 'UPI';
        if (val.includes('Confirm') || val.includes('पुष्टि') || val.includes('নিশ্চিত')) {
          submitSmartQuery(val, { confirmed: true, paymentMethod: selectedPay });
        } else {
          submitSmartQuery(val);
        }
      });
    });

    scrollToBottom();
  }

  function appendCustomPoolCreatedBubble(data) {
    const container = document.getElementById('ai-assistant-messages');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'ai-chat-bubble assistant pool-bubble';
    wrap.style.width = '95%';

    const curLang = data.detectedLanguage || getCurrentLang();
    const b = data.booking || {};
    const text = data.textResponse || data.spokenResponse || '🎉 Custom Pool Request Created!';
    const payMethod = b.paymentMethod || data.state?.paymentMethod || 'UPI (PhonePe / GPay)';
    const isPaid = b.paymentStatus === 'paid';

    wrap.innerHTML = `
      <div class="ai-info-banner">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <strong>${escapeHtml(text)}</strong>
      </div>
      <div class="ai-pool-details">
        <p>Your request has been broadcasted to active qualified workers near <strong>${escapeHtml(b.city || data.state?.location || 'your area')}</strong>. Workers can accept your offer of <strong>₹${escapeHtml(b.price || data.state?.rate || 499)}</strong> or submit tailored proposals!</p>
        
        <div class="ai-booking-status-card" style="margin: 10px 0; padding: 12px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 11.5px; font-weight: 700; color: #64748b;">${escapeHtml(getUi('poolStatus', curLang))}</span>
            <span class="badge-status open-pool" style="background: #e0f2fe; color: #0284c7; font-weight: 800; font-size: 11.5px; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              <span class="status-dot-pulse" style="width:6px; height:6px; border-radius:50%; background:#0284c7; display:inline-block;"></span>
              ${escapeHtml(getUi('activeOpenPool', curLang))}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 11.5px; font-weight: 700; color: #64748b;">${escapeHtml(getUi('paymentTerms', curLang))}</span>
            <span class="badge-status ${isPaid ? 'paid' : 'unpaid'}" style="background: ${isPaid ? '#dcfce7; color:#15803d;' : '#eff6ff; color:#2563eb;'} font-weight: 800; font-size: 11.5px; padding: 3px 8px; border-radius: 6px;">
              ${isPaid ? escapeHtml(getUi('escrowFunded', curLang)) + ' (' + escapeHtml(payMethod) + ')' : escapeHtml(getUi('escrowPending', curLang)) + ' (' + escapeHtml(payMethod) + ')'}
            </span>
          </div>
          <div class="ai-pool-meta" style="margin-top: 8px; font-size: 12px; color: #334155; display: flex; flex-direction: column; gap: 4px;">
            <div><strong>${escapeHtml(getUi('bookingId', curLang))}:</strong> #${escapeHtml((b.id || b._id || '').toString().slice(-6))}</div>
            <div><strong>${escapeHtml(getUi('serviceLabel', curLang))}:</strong> ${escapeHtml(b.serviceName || data.state?.service || 'Custom Service')}</div>
            <div><strong>${escapeHtml(getUi('scheduledDateTime', curLang))}:</strong> ${escapeHtml(b.scheduledDate || data.state?.date || '')} · ${escapeHtml(b.scheduledTime || data.state?.time || '')}</div>
            <div><strong>${escapeHtml(getUi('proposedBudget', curLang))}:</strong> ₹${escapeHtml(b.price || data.state?.rate || 499)}</div>
            <div><strong>${escapeHtml(getUi('locationLabel', curLang))}:</strong> ${escapeHtml(b.locality || b.city || data.state?.location || '')}</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
          ${!isPaid ? `
            <button type="button" class="btn-confirm-pool-action" id="btn-pay-pool-escrow" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">
              ${escapeHtml(getUi('authorizeEscrow', curLang))} ₹${escapeHtml(b.price || data.state?.rate || 499)}
            </button>
          ` : ''}
          <button type="button" class="btn-confirm-pool-action" id="btn-view-customer-bookings" style="background: #0284c7;">
            ${escapeHtml(getUi('viewPoolBookings', curLang))}
          </button>
        </div>
      </div>
    `;

    container.appendChild(wrap);

    const payBtn = wrap.querySelector('#btn-pay-pool-escrow');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        closeModal();
        const bookingId = b._id || b.id;
        const price = b.price || data.state?.rate || 499;
        const sName = b.serviceName || data.state?.service || 'Custom Pro Pool';
        if (window.SevaSathiBooking && typeof window.SevaSathiBooking.openEscrowPaymentModal === 'function') {
          window.SevaSathiBooking.openEscrowPaymentModal(bookingId, price, sName, 'Assigned Pro');
        }
      });
    }

    const viewBtn = wrap.querySelector('#btn-view-customer-bookings');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        closeModal();
        if (window.SevaSathiBooking && typeof window.SevaSathiBooking.openCustomerBookingsModal === 'function') {
          window.SevaSathiBooking.openCustomerBookingsModal();
        }
      });
    }

    scrollToBottom();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setupVoiceBar() {
    const micBtn = document.getElementById('ai-voice-mic-btn');
    const inputEl = document.getElementById('ai-voice-text-input');
    const submitBtn = document.getElementById('ai-voice-submit-btn');

    if (micBtn) {
      micBtn.addEventListener('click', toggleRecording);
    }

    if (submitBtn && inputEl) {
      const doSubmit = () => {
        const text = inputEl.value.trim();
        if (text) {
          submitSmartQuery(text);
        }
      };
      submitBtn.addEventListener('click', doSubmit);
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          doSubmit();
        }
      });
    }
  }

  // Synchronize AI voice assistant language when global site language changes
  window.addEventListener('sevasathi:languageChanged', (e) => {
    const lang = e.detail?.language || getCurrentLang();
    updateModalLanguage(lang);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupVoiceBar();
      updateModalLanguage(getCurrentLang());
    });
  } else {
    setupVoiceBar();
    updateModalLanguage(getCurrentLang());
  }

  window.SevaSathiAIVoice = {
    submit: submitSmartQuery,
    openModal: openModal,
    closeModal: closeModal,
    toggleRecording: toggleRecording,
    speak: speakResponse
  };

})();
