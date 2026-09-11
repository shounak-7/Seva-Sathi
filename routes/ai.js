/**
 * Gemini AI Express Router for Hustle
 * Mounts at /api/ai
 */

const express = require('express');
const router = express.Router();
const gemini = require('../services/gemini');
const db = require('../services/db');

// POST /api/ai/diagnose - Diagnose problem description from AI MATCH
router.post('/diagnose', async (req, res) => {
  try {
    const input = (req.body.userInput || req.body.query || '').trim();
    let city = (req.body.city || '').trim();
    if (!city && input) {
      const resolved = db.resolveCityFromLocation(input);
      if (resolved && resolved.isSupported && resolved.city) {
        city = resolved.city;
      }
    }
    if (!input) {
      return res.status(400).json({
        success: false,
        error: 'Problem description (userInput or query) is required.'
      });
    }

    // Query local pricing and 18-services matcher concurrently in parallel for blazing-fast response
    const localPricingPromise = db.getLocalPricingIntelligence(null, input, city);
    const match18Promise = gemini.matchAgainst18Services(input);

    const localPricing = await localPricingPromise;
    const [diagnosis, match18] = await Promise.all([
      gemini.diagnoseNeed(input, city, localPricing),
      match18Promise
    ]);

    diagnosis.match18 = match18;

    return res.json(diagnosis);
  } catch (error) {
    console.error('AI diagnose error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to diagnose task requirement.'
    });
  }
});

// POST /api/ai/match-18 - Match search query against all 18 available services
router.post('/match-18', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required.'
      });
    }

    const result = await gemini.matchAgainst18Services(query);
    return res.json(result);
  } catch (error) {
    console.error('AI match-18 error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to match against 18 services.'
    });
  }
});

// POST /api/ai/suggestions - Real-time AI task suggestions as user types
router.post('/suggestions', async (req, res) => {
  try {
    const { query, city } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.json({
        success: true,
        query: '',
        suggestions: []
      });
    }

    const suggestions = await gemini.getSearchSuggestions(query.trim(), city || 'Bengaluru');
    return res.json({
      success: true,
      query: query.trim(),
      suggestions
    });
  } catch (error) {
    console.error('AI suggestions error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate search suggestions.'
    });
  }
});

// GET /api/ai/services-18 - Return the official 18 catalog services
router.get('/services-18', (req, res) => {
  return res.json({
    success: true,
    services: gemini.HUSTLE_18_SERVICES
  });
});

// POST /api/ai/enhance-scope - Polish rough task instructions into professional scope
router.post('/enhance-scope', async (req, res) => {
  try {
    const notes = (req.body.rawNotes || req.body.notes || '').trim();
    if (!notes) {
      return res.status(400).json({
        success: false,
        error: 'Task notes (rawNotes) are required.'
      });
    }

    const serviceCategory = req.body.serviceCategory || req.body.category || 'General Service';
    const result = await gemini.enhanceScope(notes, serviceCategory);
    return res.json(result);
  } catch (error) {
    console.error('AI enhance scope error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to enhance task scope.'
    });
  }
});

// POST /api/ai/price-advisor - Fair market benchmark advisory for quotes/bargains
router.post('/price-advisor', async (req, res) => {
  try {
    const serviceCategory = req.body.serviceCategory || req.body.category;
    const proposedPrice = req.body.proposedPrice !== undefined ? req.body.proposedPrice : (req.body.price || req.body.rate);
    const city = req.body.city || req.body.locality || 'Bengaluru';
    if (!serviceCategory) {
      return res.status(400).json({
        success: false,
        error: 'serviceCategory or category is required.'
      });
    }

    const result = await gemini.advisePrice(serviceCategory, proposedPrice, city);
    return res.json(result);
  } catch (error) {
    console.error('AI price advisor error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate price advisory.'
    });
  }
});

// POST /api/ai/semantic-search - Intelligent semantic matching for header search
router.post('/semantic-search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required.'
      });
    }

    const result = await gemini.semanticSearch(query);
    return res.json(result);
  } catch (error) {
    console.error('AI semantic search error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process semantic search.'
    });
  }
});

// POST /api/ai/worker-bio - Generate engaging profile summary for gig workers
router.post('/worker-bio', async (req, res) => {
  try {
    const { workerName, skills, experienceYears, city } = req.body;
    const result = await gemini.generateWorkerBio(workerName, skills, experienceYears, city);
    return res.json(result);
  } catch (error) {
    console.error('AI worker bio error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate worker profile summary.'
    });
  }
});

// POST /api/ai/match-other-skill - AI match for workers who chose "Other" as their skill
router.post('/match-other-skill', async (req, res) => {
  try {
    const { workerSkill, demandedSkill } = req.body;
    if (!workerSkill || !demandedSkill) {
      return res.status(400).json({
        success: false,
        error: 'Both workerSkill and demandedSkill are required.'
      });
    }

    const result = await gemini.matchOtherSkillWithDemand(workerSkill, demandedSkill);
    return res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('AI match-other-skill error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to match other skill with demanded skill.'
    });
  }
});

// GET /api/ai/benchmarks - Get category benchmark rates
router.get('/benchmarks', (req, res) => {
  return res.json({
    success: true,
    benchmarks: gemini.CATEGORY_BENCHMARKS
  });
});

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const LOCALIZED_STRINGS = {
  location_needed: {
    en: "Which city or area do you need this service in?",
    hi: "कृपया बताएं कि आपको किस शहर या इलाके में यह सेवा चाहिए?",
    bn: "দয়া করে বলুন আপনি কোন শহর বা এলাকায় এই পরিষেবা চান?"
  },
  workers_found: {
    en: "{scenarioIntro}We found {count} verified {service} specialists in {location} (ranked from top rated). Select your preferred specialist below:",
    hi: "{scenarioIntro}हमें {location} में {count} सत्यापित {service} विशेषज्ञ मिले (सर्वोच्च रेटिंग सबसे पहले)। अपनी पसंद के विशेषज्ञ को चुनें:",
    bn: "{scenarioIntro}আমরা {location}-এ {count} জন যাচাইকৃত {service} বিশেষজ্ঞ পেয়েছি (সর্বোচ্চ রেটিং প্রথমে)। আপনার পছন্দের বিশেষজ্ঞ বেছে নিন:"
  },
  custom_pool_intro: {
    en: "No active {service} specialists are currently registered in {location}. Let's create an Open Custom Pool request so nearby workers can accept it!",
    hi: "{location} में वर्तमान में कोई सक्रिय {service} विशेषज्ञ उपलब्ध नहीं है। आइए एक कस्टम पूल अनुरोध तैयार करें ताकि नजदीकी कार्यकर्ता इसे स्वीकार कर सकें!",
    bn: "{location}-এ বর্তমানে কোনো সক্রিয় {service} বিশেষজ্ঞ নেই। আসুন একটি ওপেন কাস্টম পুল অনুরোধ তৈরি করি যাতে কাছের কর্মীরা গ্রহণ করতে পারেন!"
  },
  need_service: {
    en: "What kind of service do you need help with?",
    hi: "आपको किस प्रकार की सेवा की आवश्यकता है?",
    bn: "আপনার কী ধরণের পরিষেবার প্রয়োজন?"
  },
  need_date: {
    en: "What date would you like to schedule this for? (e.g., Tomorrow, Today, or a specific date)",
    hi: "आप इसे किस तारीख के लिए निर्धारित करना चाहते हैं? (उदा. कल, आज, या कोई निश्चित तारीख)",
    bn: "আপনি কোন তারিখে এই কাজটি করাতে চান? (যেমন, আগামীকাল, আজ, বা নির্দিষ্ট তারিখ)"
  },
  need_time: {
    en: "What time slot works best for you? (e.g., Morning 9 AM–12 PM, Afternoon 12 PM–3 PM, Evening 6 PM–9 PM)",
    hi: "आपके लिए कौन सा समय सही रहेगा? (उदा. सुबह 9–12 बजे, दोपहर 12–3 बजे, शाम 6–9 बजे)",
    bn: "কোন সময়টি আপনার সুবিধা হবে? (যেমন সকাল ৯টা–১২টা, দুপুর ১২টা–৩টা, সন্ধ্যা ৬টা–৯টা)"
  },
  need_rate: {
    en: "What is your target budget/rate? (Market benchmark for {service} is {range}, suggested ₹{defaultRate})",
    hi: "आपका लक्षित बजट/दर क्या है? ({service} के लिए बाजार दर {range} है, अनुशंसित ₹{defaultRate})",
    bn: "আপনার প্রস্তাবিত রেট বা বাজেট কত? ({service}-এর জন্য বাজার রেট {range}, প্রস্তাবিত ₹{defaultRate})"
  },
  confirm_prompt: {
    en: "Here is your Custom Pool summary:\n• Service: {service}\n• Location: {location}\n• Date: {date}\n• Time: {time}\n• Rate: ₹{rate}\n\nShould I post this to the Open Gig Pool for nearby workers?",
    hi: "आपके कस्टम पूल का विवरण:\n• सेवा: {service}\n• स्थान: {location}\n• तारीख: {date}\n• समय: {time}\n• दर: ₹{rate}\n\nक्या मैं इसे नजदीकी कार्यकर्ताओं के लिए ओपन पूल में पोस्ट कर दूं?",
    bn: "আপনার কাস্টম পুলের বিবরণ:\n• পরিষেবা: {service}\n• স্থান: {location}\n• তারিখ: {date}\n• সময়: {time}\n• রেট: ₹{rate}\n\nআমি কি এটি ওপেন পুলে পোস্ট করে কর্মীদের কাছে পাঠিয়ে দেব?"
  },
  pool_created: {
    en: "🎉 Custom Pool request posted for {service} in {location} at ₹{rate}! Nearby workers have been notified and can accept it directly.",
    hi: "🎉 {location} में ₹{rate} पर {service} के लिए कस्टम पूल अनुरोध पोस्ट कर दिया गया है! नजदीकी कार्यकर्ताओं को सूचित किया जा रहा है।",
    bn: "🎉 {location}-এ ₹{rate}-এ {service}-এর জন্য কাস্টম পুল পোস্ট করা হয়েছে! আশেপাশের কর্মীদের জানানো হয়েছে।"
  },
  worker_selected_need_date: {
    en: "Great! What date would you like to schedule your appointment with {workerName} for?",
    hi: "बहुत बढ़िया! आप {workerName} के साथ किस तारीख के लिए अपॉइंटमेंट बुक करना चाहते हैं?",
    bn: "চমৎকার! আপনি {workerName}-এর সাথে কোন তারিখে বুক করতে চান?"
  },
  worker_selected_need_time: {
    en: "What time slot works best for you with {workerName}?",
    hi: "{workerName} के साथ आपके लिए कौन सा समय सही रहेगा?",
    bn: "{workerName}-এর জন্য কোন সময়টি আপনার সুবিধা হবে?"
  },
  worker_selected_need_rate: {
    en: "What is your proposed budget for {workerName}? (Standard rate: ₹{rate})",
    hi: "{workerName} के लिए आपका प्रस्तावित बजट क्या है? (मानक दर: ₹{rate})",
    bn: "{workerName}-এর জন্য আপনার প্রস্তাবিত বাজেট কত? (সাধারণ রেট: ₹{rate})"
  },
  worker_confirm_prompt: {
    en: "Here is your appointment summary with {workerName}:\n• Specialist: {workerName}\n• Service: {service}\n• Location: {location}\n• Date: {date}\n• Time: {time}\n• Proposed Budget: ₹{rate}\n• Payment Method: {paymentMethod} (100% Escrow Protected)\n\nShould I confirm and send this appointment request to {workerName}?",
    hi: "{workerName} के साथ आपके अपॉइंटमेंट का विवरण:\n• विशेषज्ञ: {workerName}\n• सेवा: {service}\n• स्थान: {location}\n• तारीख: {date}\n• समय: {time}\n• प्रस्तावित बजट: ₹{rate}\n• भुगतान विधि: {paymentMethod} (100% एस्क्रो सुरक्षित)\n\nक्या मैं इस अनुरोध की पुष्टि करके {workerName} को भेज दूं?",
    bn: "{workerName}-এর সাথে আপনার বুকিংয়ের বিবরণ:\n• বিশেষজ্ঞ: {workerName}\n• পরিষেবা: {service}\n• স্থান: {location}\n• তারিখ: {date}\n• সময়: {time}\n• প্রস্তাবিত বাজেট: ₹{rate}\n• পেমেন্ট পদ্ধতি: {paymentMethod} (১০০% এসক্রো সুরক্ষিত)\n\nআমি কি এটি নিশ্চিত করে {workerName}-এর কাছে বুকিং পাঠিয়ে দেব?"
  },
  direct_booking_created: {
    en: "🎉 Appointment request sent directly to {workerName} for {date} ({time}) at ₹{rate}! Payment method: {paymentMethod}. You can track live status or authorize Escrow payment in My Bookings.",
    hi: "🎉 {workerName} को ₹{rate} पर {date} ({time}) के लिए अपॉइंटमेंट अनुरोध भेज दिया गया है! भुगतान विधि: {paymentMethod}। आप लाइव स्थिति देख सकते हैं या एस्क्रो भुगतान कर सकते हैं।",
    bn: "🎉 {workerName}-এর কাছে ₹{rate}-এ {date} ({time})-এর জন্য বুকিং অনুরোধ পাঠানো হয়েছে! পেমেন্ট পদ্ধতি: {paymentMethod}। আপনি লাইভ স্ট্যাটাস দেখতে পারেন বা এসক্রো পেমেন্ট করতে পারেন।"
  }
};

const LOCALIZED_CHIPS = {
  cities: {
    en: ['Kolkata', 'Bengaluru', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad'],
    hi: ['कोलकाता', 'बेंगलुरु', 'दिल्ली', 'मुंबई', 'चेन्नई', 'हैदराबाद', 'पुणे', 'अहमदाबाद'],
    bn: ['কলকাতা', 'বেঙ্গালুরু', 'দিল্লি', 'মুম্বাই', 'চেন্নাই', 'হায়দ্রাবাদ', 'পুনে', 'আহমেদাবাদ']
  },
  services: {
    en: ['Electrician', 'Plumbing', 'Deep Home Cleaning', 'Tutoring', 'Carpentry', 'AC & Appliance Repair'],
    hi: ['इलेक्ट्रीशियन', 'प्लम्बर', 'घर की गहरी सफाई', 'ट्यूशन', 'बढ़ई / कारपेंटर', 'एसी व उपकरण मरम्मत'],
    bn: ['ইলেকট্রিশিয়ান', 'প্লাম্বিং / পাইপ মিস্ত্রি', 'ঘর পরিষ্কার', 'টিউটরিং / পড়াশোনা', 'কাঠমিস্ত্রি', 'এসি ও যন্ত্রপাতি মেরামত']
  },
  dates: {
    en: ['Tomorrow', 'Today', 'Day after tomorrow'],
    hi: ['कल (Tomorrow)', 'आज (Today)', 'परसों (Day after tomorrow)'],
    bn: ['আগামীকাল (Tomorrow)', 'আজ (Today)', 'পরশু (Day after tomorrow)']
  },
  times: {
    en: ['Morning (09:00 AM – 12:00 PM)', 'Afternoon (12:00 PM – 03:00 PM)', 'Evening (06:00 PM – 09:00 PM)'],
    hi: ['सुबह (09:00 AM – 12:00 PM)', 'दोपहर (12:00 PM – 03:00 PM)', 'शाम (06:00 PM – 09:00 PM)'],
    bn: ['সকাল (09:00 AM – 12:00 PM)', 'দুপুর (12:00 PM – 03:00 PM)', 'সন্ধ্যা (06:00 PM – 09:00 PM)']
  },
  confirmWorker: {
    en: (workerName) => [`✅ Confirm & Book ${workerName}`],
    hi: (workerName) => [`✅ ${workerName} को बुक करें`],
    bn: (workerName) => [`✅ ${workerName}-কে বুক করুন`]
  },
  confirmPool: {
    en: ['✅ Confirm & Post Request'],
    hi: ['✅ पुष्टि करें और पोस्ट करें'],
    bn: ['✅ নিশ্চিত করুন ও পোস্ট করুন']
  },
  completed: {
    en: ['📋 View My Bookings', 'Search Another Service'],
    hi: ['📋 मेरी बुकिंग देखें', 'अन्य सेवा खोजें'],
    bn: ['📋 আমার বুকিং দেখুন', 'অন্য পরিষেবা খুঁজুন']
  }
};

function formatMsg(templateKey, lang, params = {}) {
  const dict = LOCALIZED_STRINGS[templateKey] || {};
  let str = dict[lang] || dict['en'] || '';
  for (const k in params) {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k] || '');
  }
  return str;
}

function getLocalizedChips(type, lang, param = null) {
  const group = LOCALIZED_CHIPS[type];
  if (!group) return [];
  if (typeof group[lang] === 'function') {
    return group[lang](param);
  }
  if (typeof group['en'] === 'function') {
    return group['en'](param);
  }
  return group[lang] || group['en'] || [];
}

/**
 * POST /api/ai/smart-assistant
 * Unified, multi-lingual customer voice/text assistant.
 * - Resolves customer location accurately
 * - Queries real worker database dynamically and ranks by rating & completed jobs
 * - If workers found: allows selecting worker and conversing to verify Date, Time, and Budget before explicit confirmation
 * - If no workers found: initiates Custom Pool requirement gathering (Service, Location, Date, Time, Rate)
 * - Strict multi-factor gate: NEVER creates any booking until Location, Date, Time, and Budget are verified and confirmed
 */
router.post('/smart-assistant', async (req, res) => {
  try {
    const { query, conversationHistory, location, coords, structuredState, confirmed, selectedWorker, paymentMethod, payNow, isEscrowFunded, preferredLanguage } = req.body;
    let customerId = req.body.customerId;
    let customerName = req.body.customerName || 'Customer';
    let customerPhone = req.body.customerPhone || '';
    let customerEmail = req.body.customerEmail || '';

    // Check JWT token if available
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) customerId = decoded.userId;
        if (decoded.name) customerName = decoded.name;
        if (decoded.email) customerEmail = decoded.email;
        if (decoded.phone) customerPhone = decoded.phone;
      } catch (e) {
        // Continue with body details
      }
    }

    if (!customerId) {
      customerId = 'guest_cust_' + Date.now();
    }

    // Step 1: NLP Extraction via Gemini / heuristic
    const extraction = await gemini.processCustomerSmartQuery({
      query,
      conversationHistory,
      customerLocation: location || (structuredState && structuredState.location),
      structuredState,
      preferredLanguage: preferredLanguage || (structuredState && structuredState.preferredLanguage)
    });

    const lang = extraction.detectedLanguage || preferredLanguage || 'en';

    // Step 2: Merge structured state and handle trade switch invalidation
    const previousService = structuredState && (structuredState.serviceId || structuredState.service);
    const newService = extraction.serviceId || extraction.serviceName;
    const serviceChanged = previousService && newService && (
      previousService.toLowerCase().trim() !== newService.toLowerCase().trim()
    );

    let currentSelectedWorker = selectedWorker || (structuredState && structuredState.selectedWorker) || null;
    let currentReadyToConfirm = Boolean(structuredState && structuredState.readyToConfirm);

    if (serviceChanged) {
      currentSelectedWorker = null;
      currentReadyToConfirm = false;
    }

    const state = {
      service: extraction.serviceName || (structuredState && structuredState.service) || null,
      serviceId: extraction.serviceId || (structuredState && structuredState.serviceId) || null,
      location: extraction.extractedLocation || location || (structuredState && structuredState.location) || null,
      date: extraction.extractedDate || (structuredState && structuredState.date) || null,
      formattedDateText: extraction.formattedDateText || (structuredState && structuredState.formattedDateText) || null,
      time: extraction.extractedTime || (structuredState && structuredState.time) || null,
      rate: extraction.extractedRate || (structuredState && structuredState.rate) || null,
      paymentMethod: paymentMethod || extraction.extractedPaymentMethod || (structuredState && structuredState.paymentMethod) || 'UPI (PhonePe / GPay)',
      preferredLanguage: preferredLanguage || extraction.detectedLanguage || (structuredState && structuredState.preferredLanguage) || 'en',
      selectedWorker: currentSelectedWorker,
      readyToConfirm: currentReadyToConfirm
    };

    // Check if query is targeting an existing active booking adjustment (e.g. "Update price of my booking to ₹450")
    const lowerQuery = (query || '').toLowerCase();
    const isBookingSpecificAdjustment = /(?:my\s+booking|my\s+appointment|active\s+booking|booking\s+id|appointment\s+id|বুকিং|অ্যাপয়েন্টমেন্ট|मेरी\s+बुकिंग)/i.test(lowerQuery) && (extraction.isChangeRate || extraction.isChangeTime || extraction.isChangeDate || extraction.extractedRate);
    if (isBookingSpecificAdjustment && customerId) {
      const userBookings = await db.findBookingsByCustomer(String(customerId));
      const activeBooking = userBookings.find(b => ['pending', 'bargaining', 'open-pool'].includes(b.status) && b.paymentStatus !== 'paid');
      if (activeBooking) {
        const newPrice = extraction.extractedRate ? Number(extraction.extractedRate) : activeBooking.price;
        const newTime = extraction.extractedTime || activeBooking.scheduledTime;
        const newDate = extraction.extractedDate || activeBooking.scheduledDate;
        const newStatus = (!activeBooking.workerId || activeBooking.status === 'open-pool') ? 'pending' : (activeBooking.status === 'pending' ? 'pending' : 'bargaining');

        const updatedBooking = await db.addBookingNegotiation(activeBooking._id || activeBooking.id, {
          senderRole: 'customer',
          senderName: customerName,
          proposedPrice: newPrice,
          proposedTime: newTime,
          proposedDate: newDate,
          note: `Customer updated terms via AI Assistant (${newPrice ? '₹' + newPrice : ''}${newDate ? ', ' + newDate : ''}${newTime ? ', ' + newTime : ''})`,
          newStatus
        });

        const updateMsg = lang === 'bn'
          ? `✓ আপনার সক্রিয় বুকিংয়ের (#${(activeBooking._id || activeBooking.id).toString().slice(-6)}) বাজেট ₹${newPrice}-এ আপডেট করা হয়েছে। কর্মীকে জানানো হয়েছে।`
          : (lang === 'hi'
            ? `✓ आपकी सक्रिय बुकिंग (#${(activeBooking._id || activeBooking.id).toString().slice(-6)}) की दर ₹${newPrice} कर दी गई है। कार्यकर्ता को सूचित कर दिया गया है।`
            : `✓ Your active booking (#${(activeBooking._id || activeBooking.id).toString().slice(-6)}) terms have been updated to ₹${newPrice}. The specialist/pool has been notified.`);

        return res.json({
          success: true,
          status: 'booking_terms_updated',
          action: 'booking_terms_updated',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          booking: updatedBooking,
          spokenResponse: updateMsg,
          textResponse: updateMsg,
          quickChips: getLocalizedChips('completed', lang)
        });
      }
    }

    // Handle in-chat parameter change requests: only reset field to null if a new value was NOT provided in the same query
    if (extraction.isChangeTime) {
      if (extraction.extractedTime) {
        state.time = extraction.extractedTime;
      } else {
        state.time = null;
        state.readyToConfirm = false;
      }
    }
    if (extraction.isChangeRate) {
      if (extraction.extractedRate) {
        state.rate = extraction.extractedRate;
      } else {
        state.rate = null;
        state.readyToConfirm = false;
      }
    }
    if (extraction.isChangeDate) {
      if (extraction.extractedDate) {
        state.date = extraction.extractedDate;
        state.formattedDateText = extraction.formattedDateText;
      } else {
        state.date = null;
        state.formattedDateText = null;
        state.readyToConfirm = false;
      }
    }

    // Validate that selectedWorker matches the active service domain
    if (state.selectedWorker && (state.serviceId || state.service)) {
      const domain = db.getCanonicalDomain ? db.getCanonicalDomain(state.serviceId || state.service) : null;
      const workerCat = (state.selectedWorker.skillCategory || '').toLowerCase().trim();
      const workerSpec = (state.selectedWorker.specificSkill || '').toLowerCase().trim();
      const workerPrimary = (state.selectedWorker.primarySkill || '').toLowerCase().trim();

      let isWorkerValidForService = true;
      if (domain) {
        const negCats = (domain.negativeCategories || []).map(c => c.toLowerCase().trim());
        const domCats = (domain.categories || []).map(c => c.toLowerCase().trim());
        if (workerCat && negCats.some(neg => workerCat === neg || workerCat.includes(neg) || neg.includes(workerCat))) {
          isWorkerValidForService = false;
        } else if (workerCat && domCats.some(dc => workerCat === dc || workerCat.includes(dc) || dc.includes(workerCat))) {
          isWorkerValidForService = true;
        } else {
          const hasKw = (domain.keywords || []).some(k => {
            const kw = (k || '').toLowerCase().trim();
            return kw && (workerCat.includes(kw) || workerSpec.includes(kw) || workerPrimary.includes(kw));
          });
          if (!hasKw) isWorkerValidForService = false;
        }
      }
      if (!isWorkerValidForService) {
        state.selectedWorker = null;
        state.readyToConfirm = false;
      }
    }

    // Calculate market benchmark for rate guidance
    const benchmark = gemini.getCategoryBenchmarkRate(state.service || query);

    // Step 3: Check Location Requirement
    if (!state.location) {
      const promptText = formatMsg('location_needed', lang);
      return res.json({
        success: true,
        status: 'location_needed',
        action: 'location_needed',
        detectedLanguage: lang,
        languageName: extraction.languageName,
        state,
        missingFields: ['location'],
        spokenResponse: promptText,
        textResponse: promptText,
        quickChips: getLocalizedChips('cities', lang)
      });
    }

    // Step 4: Check if service is known
    if (!state.service && !state.serviceId) {
      const promptText = formatMsg('need_service', lang);
      return res.json({
        success: true,
        status: 'custom_pool_gathering',
        action: 'custom_pool_gathering',
        detectedLanguage: lang,
        languageName: extraction.languageName,
        state,
        missingFields: ['service'],
        spokenResponse: promptText,
        textResponse: promptText,
        quickChips: getLocalizedChips('services', lang)
      });
    }

    // Step 5: Authoritative Worker Search in Database
    const workerSearch = await db.findWorkersByService(state.serviceId || state.service, state.location, coords);
    const hasWorkers = workerSearch.exactMatch && workerSearch.workers && workerSearch.workers.length > 0;
    const availableWorkers = hasWorkers ? workerSearch.workers : [];

    // Check if user specified a worker in voice or text (e.g. "Book Virender", "1st worker")
    if (availableWorkers.length > 0 && !state.selectedWorker) {
      if (extraction.workerSelectIntent) {
        const target = extraction.workerSelectIntent.toLowerCase().trim();
        const matched = availableWorkers.find((w, i) => {
          const name = (w.name || '').toLowerCase();
          const nameMatch = target.length >= 3 && (name.includes(target) || target.includes(name));
          const numMatch = (
            (target === '1' || target === '1st' || target === 'first' || target === 'पहला' || target === '১' || target === '১ম' || target === 'প্রথম') && i === 0
          ) || (
            (target === '2' || target === '2nd' || target === 'second' || target === 'दूसरा' || target === '২' || target === '২য়' || target === 'দ্বিতীয়') && i === 1
          ) || (
            (target === '3' || target === '3rd' || target === 'third' || target === 'तीसरा' || target === '৩' || target === '৩য়' || target === 'তৃতীয়') && i === 2
          ) || (
            (target === '4' || target === '4th' || target === 'fourth' || target === 'चौथा' || target === '৪' || target === '৪র্থ' || target === 'চতুর্থ') && i === 3
          ) || (
            (target === '5' || target === '5th' || target === 'fifth' || target === 'पाँचवाँ' || target === '৫' || target === '৫ম' || target === 'পঞ্চম') && i === 4
          );
          return nameMatch || numMatch;
        });
        if (matched) {
          state.selectedWorker = matched;
        }
      } else if (structuredState && (structuredState.service || structuredState.serviceId) && !serviceChanged && availableWorkers.length === 1 && (extraction.extractedDate || extraction.extractedTime || extraction.extractedRate || (query && /\b(?:book|hire|appointment|schedule|proceed|yes|haan)\b|কাল|আগামীকাল|পরশু|कल|परसों/i.test(query)))) {
        // Automatically select the sole candidate specialist only when progressing from an active conversation
        state.selectedWorker = availableWorkers[0];
      }
    }

    // ==========================================
    // CASE A: DIRECT SPECIALIST FLOW
    // ==========================================
    if (hasWorkers) {
      // Sub-case A1: Worker not yet selected -> show available verified workers
      if (!state.selectedWorker) {
        // Sort available workers strictly by rating descending (highest at top), then completed jobs descending
        availableWorkers.sort((a, b) => {
          const rA = Number(a.rating) || 4.5;
          const rB = Number(b.rating) || 4.5;
          if (rB !== rA) return rB - rA;
          const jA = Number(a.completedJobs || a.completedJobsCount) || 0;
          const jB = Number(b.completedJobs || b.completedJobsCount) || 0;
          return jB - jA;
        });

        state.availableWorkerNames = availableWorkers.map(w => w.name);

        let scenarioIntro = '';
        if (extraction.problemDiagnosis) {
          if (lang === 'bn') {
            scenarioIntro = `আমি আপনার সমস্যাটি বুঝতে পেরেছি: "${extraction.problemDiagnosis}"। `;
          } else if (lang === 'hi') {
            scenarioIntro = `मैंने आपकी समस्या को समझा: "${extraction.problemDiagnosis}"। `;
          } else {
            scenarioIntro = `I understand your situation: "${extraction.problemDiagnosis}". `;
          }
        }

        const promptText = formatMsg('workers_found', lang, {
          scenarioIntro,
          count: availableWorkers.length,
          service: state.service || 'Specialist',
          location: state.location
        });

        const workerChips = availableWorkers.map((w, idx) => {
          return `${idx + 1}. ${w.name} (★${Number(w.rating || 4.9).toFixed(1)} · ₹${w.hourlyRate || w.baseRate || 499})`;
        });

        return res.json({
          success: true,
          status: 'workers_found',
          action: 'workers_found',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          workers: availableWorkers,
          spokenResponse: promptText,
          textResponse: promptText,
          quickChips: workerChips,
          prefillDate: state.date,
          prefillTime: state.time
        });
      }

      // Sub-case A2: Worker is selected -> verify Date, Time, and Budget strictly
      const worker = state.selectedWorker;
      if (!state.rate) {
        state.rate = worker.hourlyRate || worker.baseRate || benchmark.defaultRate;
      }

      const missingWorkerFields = [];
      if (!state.date) missingWorkerFields.push('date');
      if (!state.time) missingWorkerFields.push('time');
      if (!state.rate || isNaN(Number(state.rate))) missingWorkerFields.push('rate');

      // Prompt for missing factors
      if (missingWorkerFields.length > 0) {
        // Missing Date
        if (!state.date) {
          const question = formatMsg('worker_selected_need_date', lang, { workerName: worker.name });
          const dateChips = getLocalizedChips('dates', lang);

          return res.json({
            success: true,
            status: 'worker_gathering',
            action: 'worker_gathering',
            detectedLanguage: lang,
            languageName: extraction.languageName,
            state,
            selectedWorker: worker,
            missingFields: missingWorkerFields,
            benchmark,
            spokenResponse: question,
            textResponse: question,
            quickChips: dateChips
          });
        }

        // Missing Time
        if (!state.time) {
          const question = formatMsg('worker_selected_need_time', lang, { workerName: worker.name });
          const timeChips = getLocalizedChips('times', lang);

          return res.json({
            success: true,
            status: 'worker_gathering',
            action: 'worker_gathering',
            detectedLanguage: lang,
            languageName: extraction.languageName,
            state,
            selectedWorker: worker,
            missingFields: missingWorkerFields,
            benchmark,
            spokenResponse: question,
            textResponse: question,
            quickChips: timeChips
          });
        }

        // Missing Budget / Rate
        if (!state.rate || isNaN(Number(state.rate))) {
          const defaultWkRate = worker.hourlyRate || worker.baseRate || benchmark.defaultRate;
          const question = formatMsg('worker_selected_need_rate', lang, { workerName: worker.name, rate: defaultWkRate });
          const rateChips = [
            `₹${defaultWkRate} (Standard)`,
            `₹${benchmark.min}`,
            `₹${benchmark.max}`
          ];

          return res.json({
            success: true,
            status: 'worker_gathering',
            action: 'worker_gathering',
            detectedLanguage: lang,
            languageName: extraction.languageName,
            state,
            selectedWorker: worker,
            missingFields: missingWorkerFields,
            benchmark,
            spokenResponse: question,
            textResponse: question,
            quickChips: rateChips
          });
        }
      }

      // All 4 factors present! Check confirmation
      const wasReadyToConfirm = Boolean(structuredState && structuredState.readyToConfirm);
      const isExplicitConfirmation = Boolean(
        confirmed ||
        (query && /^(yes|confirm|book|book appointment|book now|proceed|agree|haan|ha|theek hai|kardo|हाँ|हां|कर दो|पुष्टि करें|হাঁ|হ্যাঁ|বুক করুন|বুক করো|নিশ্চিত)/i.test(query.trim()))
      );
      const isConfirmed = isExplicitConfirmation || (wasReadyToConfirm && extraction.isConfirmation);

      if (!isConfirmed) {
        state.readyToConfirm = true;
        const confirmText = formatMsg('worker_confirm_prompt', lang, {
          workerName: worker.name,
          service: state.service,
          location: state.location,
          date: state.formattedDateText || state.date,
          time: state.time,
          rate: state.rate,
          paymentMethod: state.paymentMethod
        });

        const confirmChips = getLocalizedChips('confirmWorker', lang, worker.name);

        return res.json({
          success: true,
          status: 'worker_ready_to_confirm',
          action: 'worker_ready_to_confirm',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          selectedWorker: worker,
          missingFields: [],
          benchmark,
          spokenResponse: confirmText.replace(/\n•/g, ', ').replace(/\n\n/g, ' '),
          textResponse: confirmText,
          quickChips: confirmChips
        });
      }

      // Confirmed! Check for duplicate booking within last 30s
      const existingBookings = await db.findBookingsByCustomer(String(customerId));
      const isDuplicate = existingBookings.some(b => {
        const sameWorker = String(b.workerId) === String(worker.id || worker._id);
        const sameDate = b.scheduledDate === state.date;
        const recent = b.createdAt && (Date.now() - new Date(b.createdAt).getTime() < 30000);
        return sameWorker && sameDate && recent;
      });

      const isPaidNow = Boolean(req.body.payNow || req.body.isEscrowFunded);
      const chosenPaymentMethod = state.paymentMethod || req.body.paymentMethod || 'UPI (PhonePe / GPay)';

      let directBooking;
      if (isDuplicate) {
        directBooking = existingBookings.find(b => String(b.workerId) === String(worker.id || worker._id));
      } else {
        directBooking = await db.createBooking({
          serviceId: state.serviceId || 'direct-service',
          serviceName: state.service || 'Direct Service',
          category: worker.skillCategory || state.service || 'General Service',
          city: worker.city || state.location,
          locality: state.location,
          customerLocation: state.location,
          customerId: String(customerId),
          customerName: customerName,
          customerPhone: customerPhone,
          customerEmail: customerEmail,
          workerId: String(worker.id || worker._id),
          workerName: worker.name,
          workerPhone: worker.phone || '',
          scheduledDate: state.date,
          scheduledTime: state.time,
          price: Number(state.rate),
          notes: `AI Assistant Direct Booking (${lang}): ${state.service} with ${worker.name} on ${state.date} (${state.time}) at ${state.location}. Budget: ₹${state.rate}. Payment: ${chosenPaymentMethod}.`,
          status: 'pending',
          isCustomPool: false,
          paymentStatus: isPaidNow ? 'paid' : 'unpaid',
          escrowStatus: isPaidNow ? 'held' : 'pending',
          paidAt: isPaidNow ? new Date().toISOString() : null,
          paymentMethod: chosenPaymentMethod,
          negotiations: [
            {
              senderRole: 'customer',
              senderName: customerName,
              proposedPrice: Number(state.rate),
              proposedTime: state.time,
              proposedDate: state.date,
              note: `Initial offer via AI Assistant (${chosenPaymentMethod})`,
              createdAt: new Date()
            }
          ]
        });
      }

      const successText = formatMsg('direct_booking_created', lang, {
        workerName: worker.name,
        date: state.formattedDateText || state.date,
        time: state.time,
        rate: state.rate,
        paymentMethod: chosenPaymentMethod
      });

      return res.json({
        success: true,
        status: 'direct_booking_confirmed',
        action: 'direct_booking_confirmed',
        detectedLanguage: lang,
        languageName: extraction.languageName,
        state,
        selectedWorker: worker,
        booking: directBooking,
        spokenResponse: successText,
        textResponse: successText,
        quickChips: getLocalizedChips('completed', lang)
      });
    }

    // ==========================================
    // CASE B: NO WORKERS -> OPEN CUSTOM POOL FLOW
    // ==========================================
    const missingFields = [];
    if (!state.service) missingFields.push('service');
    if (!state.location) missingFields.push('location');
    if (!state.date) missingFields.push('date');
    if (!state.time) missingFields.push('time');
    if (!state.rate || isNaN(Number(state.rate))) missingFields.push('rate');

    if (missingFields.length > 0) {
      // 1. Service
      if (!state.service) {
        const question = formatMsg('need_service', lang);
        return res.json({
          success: true,
          status: 'custom_pool_gathering',
          action: 'custom_pool_gathering',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          missingFields,
          spokenResponse: question,
          textResponse: question,
          quickChips: getLocalizedChips('services', lang)
        });
      }

      // 2. Location
      if (!state.location) {
        const question = formatMsg('location_needed', lang);
        return res.json({
          success: true,
          status: 'location_needed',
          action: 'location_needed',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          missingFields,
          spokenResponse: question,
          textResponse: question,
          quickChips: getLocalizedChips('cities', lang)
        });
      }

      // 3. Date
      if (!state.date) {
        const intro = (structuredState && structuredState.poolIntroShown) ? '' : formatMsg('custom_pool_intro', lang, { service: state.service, location: state.location }) + '\n\n';
        const question = formatMsg('need_date', lang);
        const dateChips = getLocalizedChips('dates', lang);

        state.poolIntroShown = true;
        return res.json({
          success: true,
          status: 'custom_pool_gathering',
          action: 'custom_pool_gathering',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          missingFields,
          benchmark,
          spokenResponse: (intro ? intro.replace(/\n\n/g, ' ') : '') + question,
          textResponse: intro + question,
          quickChips: dateChips
        });
      }

      // 4. Time
      if (!state.time) {
        const question = formatMsg('need_time', lang);
        const timeChips = getLocalizedChips('times', lang);

        return res.json({
          success: true,
          status: 'custom_pool_gathering',
          action: 'custom_pool_gathering',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          missingFields,
          benchmark,
          spokenResponse: question,
          textResponse: question,
          quickChips: timeChips
        });
      }

      // 5. Rate
      if (!state.rate || isNaN(Number(state.rate))) {
        const question = formatMsg('need_rate', lang, {
          service: state.service,
          range: benchmark.rangeText,
          defaultRate: benchmark.defaultRate
        });
        const rateChips = [
          `₹${benchmark.defaultRate} (Standard)`,
          `₹${benchmark.min}`,
          `₹${benchmark.max}`
        ];

        return res.json({
          success: true,
          status: 'custom_pool_gathering',
          action: 'custom_pool_gathering',
          detectedLanguage: lang,
          languageName: extraction.languageName,
          state,
          missingFields,
          benchmark,
          spokenResponse: question,
          textResponse: question,
          quickChips: rateChips
        });
      }
    }

    // ALL 5 fields are verified present! Check user confirmation
    const wasReadyToConfirm = Boolean(structuredState && structuredState.readyToConfirm);
    const isExplicitConfirmation = Boolean(
      confirmed || 
      (query && /^(yes|confirm|post|post request|do it|proceed|agree|haan|ha|theek hai post kar do|kardo|हाँ|हां|ठीक है पोस्ट कर दो|पुष्टि करें|হাঁ|হ্যাঁ|পোস্ট করুন|নিশ্চিত)/i.test(query.trim()))
    );

    const isConfirmed = isExplicitConfirmation || (wasReadyToConfirm && extraction.isConfirmation);

    if (!isConfirmed) {
      state.readyToConfirm = true;
      const confirmText = formatMsg('confirm_prompt', lang, {
        service: state.service,
        location: state.location,
        date: state.formattedDateText || state.date,
        time: state.time,
        rate: state.rate
      });
      const confirmChips = getLocalizedChips('confirmPool', lang);

      return res.json({
        success: true,
        status: 'custom_pool_ready_to_confirm',
        action: 'custom_pool_ready_to_confirm',
        detectedLanguage: lang,
        languageName: extraction.languageName,
        state,
        missingFields: [],
        benchmark,
        spokenResponse: confirmText.replace(/\n•/g, ', ').replace(/\n\n/g, ' '),
        textResponse: confirmText,
        quickChips: confirmChips
      });
    }

    // Confirmed! Check for duplicate custom pool requests submitted within last 30s
    const existingBookings = await db.findBookingsByCustomer(String(customerId));
    const isDuplicate = existingBookings.some(b => {
      if (!b.isCustomPool && b.serviceId && !b.serviceId.startsWith('custom-pool')) return false;
      const sameService = (b.serviceName || '').toLowerCase() === (state.service || '').toLowerCase();
      const sameLoc = (b.city || '').toLowerCase() === (state.location || '').toLowerCase();
      const sameDate = b.scheduledDate === state.date;
      const recent = b.createdAt && (Date.now() - new Date(b.createdAt).getTime() < 30000);
      return sameService && sameLoc && sameDate && recent;
    });

    const isPaidNow = Boolean(req.body.payNow || req.body.isEscrowFunded);
    const chosenPaymentMethod = state.paymentMethod || req.body.paymentMethod || 'UPI (PhonePe / GPay)';

    let poolBooking;
    if (isDuplicate) {
      poolBooking = existingBookings.find(b => (b.serviceName || '').toLowerCase() === (state.service || '').toLowerCase());
    } else {
      poolBooking = await db.createBooking({
        serviceId: (state.serviceId || 'custom-pool') + '-' + Date.now(),
        serviceName: state.service || 'Custom Gig Request',
        category: state.service || 'Custom Trade Request',
        city: state.location,
        customerId: String(customerId),
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        workerId: null,
        workerName: null,
        scheduledDate: state.date,
        scheduledTime: state.time,
        price: Number(state.rate),
        notes: `AI Open Pool Request (${lang}): ${state.service} at ${state.location} on ${state.date} (${state.time}). Proposed Rate: ₹${state.rate}. Payment: ${chosenPaymentMethod}. Customer Query: ${query}`,
        status: 'pending',
        isCustomPool: true,
        paymentStatus: isPaidNow ? 'paid' : 'unpaid',
        escrowStatus: isPaidNow ? 'held' : 'pending',
        paidAt: isPaidNow ? new Date().toISOString() : null,
        paymentMethod: chosenPaymentMethod,
        negotiations: [
          {
            senderRole: 'customer',
            senderName: customerName,
            proposedPrice: Number(state.rate),
            proposedTime: state.time,
            proposedDate: state.date,
            note: `Initial offer via AI Assistant Pool (${chosenPaymentMethod})`,
            createdAt: new Date()
          }
        ]
      });
    }

    const successText = formatMsg('pool_created', lang, {
      service: state.service,
      location: state.location,
      rate: state.rate
    });

    return res.json({
      success: true,
      status: 'custom_pool_created',
      action: 'custom_pool_created',
      detectedLanguage: lang,
      languageName: extraction.languageName,
      state,
      booking: poolBooking,
      spokenResponse: successText,
      textResponse: successText,
      quickChips: getLocalizedChips('completed', lang)
    });

  } catch (error) {
    console.error('AI smart-assistant error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process AI assistant query.'
    });
  }
});

module.exports = router;
