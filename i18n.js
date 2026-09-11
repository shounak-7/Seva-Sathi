/**
 * SevaSathi — Universal Internationalization (i18n) Engine
 * Full DOM text-node-level translation across all pages.
 * Supports English (en), Hindi (hi), and Bangla (bn).
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sevasathi_lang';
  const SUPPORTED_LANGS = {
    en: { name: 'English', native: 'Default', flag: '🇬🇧', speechCode: 'en-IN' },
    hi: { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
    bn: { name: 'Bangla', native: 'বাংলা', flag: '🇮🇳', speechCode: 'bn-IN' }
  };

  const PHRASE_MAP = {
    hi: {
  "Now serving 12 cities": "अब 12 शहरों में उपलब्ध",
  "Verified professionals, right around the corner": "सत्यापित विशेषज्ञ, ठीक आपके पास",
  "Choose location": "स्थान चुनें",
  "Search cleaners, tutors, movers...": "सफाईकर्मी, शिक्षक, इलेक्ट्रीशियन खोजें...",
  "Cooperative": "सहकारी संघ",
  "📅 My Bookings": "📅 मेरी बुकिंग्स",
  "Sign in or register": "साइन इन या पंजीकरण करें",
  "Sign In": "लॉग इन करें",
  "Log Out": "लॉग आउट",
  "Log out": "लॉग आउट",
  "Sign Out": "साइन आउट",
  "Browse Services": "सेवाएं देखें",
  "My Requests & Workspace": "मेरे अनुरोध और कार्यक्षेत्र",
  "SevaSathi Protection & Escrow": "सेवासाथी सुरक्षा और एस्क्रो",
  "👤 Verified Customer": "👤 सत्यापित ग्राहक",
  "👷 Verified Partner": "👷 सत्यापित साथी",
  "🏢 Commercial Partner": "🏢 व्यावसायिक साझेदार",
  "GIG PARTNER HUB": "गिग पार्टनर हब",
  "VERIFIED CUSTOMER PORTAL": "सत्यापित ग्राहक पोर्टल",
  "Enterprise Workforce": "उद्यम कार्यबल",
  "Online · Accepting Gigs": "ऑनलाइन · काम स्वीकार कर रहे हैं",
  "Trade Specialist": "पेशा विशेषज्ञ",
  "Worker Partner": "कार्यकर्ता साथी",
  "ON-DEMAND, DONE RIGHT": "मांग पर सेवा, सही तरीके से",
  "Make more time for": "अपनी जिंदगी के लिए",
  "your life.": "समय निकालें।",
  "Make more time for your life.": "अपनी जिंदगी के लिए समय निकालें।",
  "Whatever needs doing, find a trusted local person who can make it happen today.": "जो भी काम हो, एक भरोसेमंद स्थानीय विशेषज्ञ पाएं जो इसे आज ही पूरा कर सके।",
  "Explore services": "सेवाएं देखें",
  "Post a request": "अनुरोध पोस्ट करें",
  "I want to work": "काम करना चाहता हूँ",
  "4.9/5 from 12,000+ users": "12,000+ उपयोगकर्ताओं से 4.9/5 रेटिंग",
  "who got their weekends back": "जिन्होंने अपना सप्ताहांत बचाया",
  "Trusted": "भरोसेमंद",
  "pros nearby": "स्थानीय कारीगर",
  "average rating": "औसत रेटिंग",
  "GIG OF THE DAY": "आज का खास काम",
  "Get it done. Feel lighter.": "काम पूरा, मन हल्का।",
  "BROWSE BY NEED": "जरूरत के अनुसार खोजें",
  "What can we help with?": "हम किस काम में मदद कर सकते हैं?",
  "See all services": "सभी सेवाएं देखें",
  "Describe what you need — “a leaking tap”, “help moving”, “maths tutor”": "अपनी आवश्यकता बताएं — “नल लीक”, “सामान शिफ्टिंग”, “गणित ट्यूटर”",
  "Home care": "घर की देखभाल",
  "Cleaning & repairs": "सफाई और मरम्मत",
  "Beauty & wellness": "सौंदर्य और कल्याण",
  "Feel-good care": "आरामदायक थेरेपी",
  "Lessons & skills": "शिक्षा और कौशल",
  "Learn from experts": "विशेषज्ञों से सीखें",
  "Tech support": "तकनीकी सहायता",
  "Devices & Wi-Fi": "डिवाइस और वाई-फाई",
  "Events & errands": "इवेंट्स और काम",
  "Help on the go": "भागदौड़ में सहायता",
  "Moving & delivery": "शिफ्टिंग और डिलीवरी",
  "Shift with ease": "सुरक्षित सामान ढुलाई",
  "EVERYDAY HELP": "दैनिक सहायता",
  "Services we offer": "हमारी मुख्य सेवाएं",
  "Great local help for life's little and big jobs.": "जीवन के छोटे और बड़े कामों के लिए बेहतरीन स्थानीय मदद।",
  "AVAILABLE TODAY": "आज ही उपलब्ध",
  "TOP RATED": "शीर्ष रेटेड",
  "FLEXIBLE TIMINGS": "लचीला समय",
  "EXPERT PROS": "विशेषज्ञ पेशेवर",
  "POPULAR": "लोकप्रिय",
  "CERTIFIED": "प्रमाणित",
  "DOORSTEP": "डोरस्टेप सेवा",
  "SAFE & HERBAL": "सुरक्षित और हर्बल",
  "VERIFIED CARE": "सत्यापित देखभाल",
  "HOME CARE": "होम केयर",
  "WELLNESS": "वेलनेस",
  "LEARN": "शिक्षा",
  "APPLIANCES": "उपकरण",
  "PAINTING": "पेंटिंग",
  "FITNESS": "फिटनेस",
  "AUTO CARE": "ऑटो केयर",
  "HOME SAFETY": "घर की सुरक्षा",
  "ASSISTANCE": "सहायता",
  "Deep home cleaning": "घर की गहरी सफाई",
  "Kitchen, bath & living spaces": "रसोई, स्नानघर और बैठक क्षेत्र",
  "At-home spa therapy": "घर पर स्पा थेरेपी",
  "Relaxation without the commute": "बिना आवाजाही के पूर्ण विश्राम",
  "Maths tutoring": "गणित ट्यूशन",
  "For grades 6–12, at your place": "कक्षा 6–12 के लिए, आपके घर पर",
  "Appliance care & repair": "उपकरण देखभाल और मरम्मत",
  "AC, fridge & washing machines": "एसी, फ्रिज और वाशिंग मशीन",
  "Painting & waterproofing": "पेंटिंग और वॉटरप्रूफिंग",
  "Flawless coats & damp solutions": "बेदाग फिनिश और सीलन से मुक्ति",
  "Fitness & yoga coaching": "फिटनेस और योग कोचिंग",
  "Personal training at your home": "आपके घर पर व्यक्तिगत प्रशिक्षण",
  "Car detailing & eco wash": "कार डिटेलिंग और इको वॉश",
  "Interior deep clean & exterior polish": "अंदरूनी गहरी सफाई और बाहरी चमक",
  "Pest control & sanitization": "कीट नियंत्रण और स्वच्छता",
  "Odorless, pet-safe treatments": "गंधहीन, पालतू-सुरक्षित उपचार",
  "Senior care & assistance": "वरिष्ठ नागरिक देखभाल और सहायता",
  "Gentle support & daily errands": "सहानुभूतिपूर्ण देखभाल और दैनिक कार्य",
  "View more services": "और सेवाएं देखें",
  "From ₹699": "₹699 से",
  "From ₹1,099": "₹1,099 से",
  "From ₹1499/month": "₹1,499/माह से",
  "From ₹399": "₹399 से",
  "From ₹999": "₹999 से",
  "From ₹799/session": "₹799/सत्र से",
  "From ₹449": "₹449 से",
  "From ₹549": "₹549 से",
  "From ₹349/hr": "₹349/घंटा से",
  "WORK ON YOUR OWN TERMS": "अपनी शर्तों पर काम करें",
  "Want to start as a": "शुरुआत करना चाहते हैं",
  "Gig Worker?": "गिग वर्कर के रूप में?",
  "Join our platform, start earning effortlessly, and build your career on your own terms.": "हमारे मंच से जुड़ें, आसानी से कमाना शुरू करें और अपनी शर्तों पर अपना करियर बनाएं।",
  "Keep 100% of your tips": "अपनी 100% टिप्स अपने पास रखें",
  "Transparent pricing & same-day payouts": "पारदर्शी दरें और उसी दिन बैंक भुगतान",
  "Work near your home": "अपने घर के पास काम करें",
  "Choose gigs in your preferred localities": "अपने पसंदीदा इलाकों में काम चुनें",
  "Set your own schedule": "अपना समय खुद तय करें",
  "Full-time, weekends or part-time hours": "फुल-टाइम, वीकेंड या पार्ट-टाइम घंटे",
  "United Gig Community": "संयुक्त गिग समुदाय",
  "100% ID Verified & Protected": "100% आईडी सत्यापित और सुरक्षित",
  "EARNINGS & COOPERATION": "कमाई और सहयोग",
  "100% Tips Kept": "100% टिप्स आपके पास",
  "/ month (transparent earnings & direct payouts)": "/ माह (पारदर्शी कमाई और सीधा भुगतान)",
  "Direct bank payouts": "सीधे बैंक खाते में भुगतान",
  "Worker trust & satisfaction": "श्रमिक विश्वास और संतुष्टि",
  "growing together in mutual trust": "आपसी विश्वास के साथ आगे बढ़ रहे हैं",
  "YOUR REQUEST, YOUR WAY": "आपकी आवश्यकता, आपका तरीका",
  "Need something": "कुछ खास",
  "specific?": "चाहिए?",
  "Need something specific?": "कुछ खास सेवा चाहिए?",
  "Tell us what you need and your ideal budget. Verified local pros will reply to your request.": "अपनी जरूरत और बजट बताएं। सत्यापित स्थानीय विशेषज्ञ आपके अनुरोध पर तुरंत जवाब देंगे।",
  "Tell us what you need and your ideal budget. Great local people will come to you.": "हमें बताएं कि आपको क्या चाहिए और आपका बजट क्या है। बेहतरीन स्थानीय पेशेवर आपसे संपर्क करेंगे।",
  "Request a gig": "काम का अनुरोध करें",
  "ACTIVE REQUEST": "सक्रिय अनुरोध",
  "NEW REQUEST": "नया अनुरोध",
  "Help me move this Saturday": "इस शनिवार शिफ्टिंग में मदद चाहिए",
  "Help me move": "सामान शिफ्टिंग में मदद",
  "this Saturday": "इस शनिवार",
  "3 pros are interested": "3 पेशेवर इच्छुक हैं",
  "THE SEVASATHI PROMISE": "सेवासाथी का वादा",
  "Good people. Great work. No guesswork.": "अच्छे लोग। बेहतरीन काम। कोई भ्रम नहीं।",
  "ID-verified professionals": "पहचान-सत्यापित पेशेवर",
  "Transparent, upfront prices": "पारदर्शी और अग्रिम कीमतें",
  "Escrow-protected payments": "एस्क्रो द्वारा 100% सुरक्षित भुगतान",
  "Support when you need it": "जरूरत पड़ने पर तुरंत सहायता",
  "How we keep you safe": "हम आपको कैसे सुरक्षित रखते हैं",
  "LOVED LOCALLY": "स्थानीय लोगों की पसंद",
  "Real people, lighter days": "असली लोग, आसान दिन",
  "MEET OUR EXPERTS": "हमारे विशेषज्ञों से मिलें",
  "People who love what they do": "वे लोग जो अपने काम से प्यार करते हैं",
  "Browse professionals": "पेशेवर ब्राउज़ करें",
  "Verified Customer": "सत्यापित ग्राहक",
  "Verified Partner": "सत्यापित साथी",
  "More life, less to-do.": "ज़िंदगी के लिए ज़्यादा वक़्त, कम परेशानियां।",
  "GET LOCAL HELP, FAST": "स्थानीय मदद पाएं, तुरंत",
  "Ready to cross something off?": "क्या कोई काम पूरा करने के लिए तैयार हैं?",
  "Find an expert": "विशेषज्ञ खोजें",
  "Discover": "खोजें",
  "All services": "सभी सेवाएं",
  "Become a worker": "गिग वर्कर बनें",
  "For businesses": "व्यवसायों के लिए",
  "SevaSathi": "सेवासाथी",
  "How it works": "यह कैसे काम करता है",
  "Trust & safety": "विश्वास और सुरक्षा",
  "Support": "सहायता",
  "Contact us": "हमसे संपर्क करें",
  "Help centre": "सहायता केंद्र",
  "Cities": "शहर",
  "FOLLOW ALONG": "जुड़े रहें",
  "Home": "होम",
  "Explore": "खोजें",
  "Profile": "प्रोफ़ाइल",
  "CHOOSE YOUR PORTAL": "अपना पोर्टल चुनें",
  "Good work starts with the right": "अच्छा काम सही",
  "path.": "रास्ते से शुरू होता है।",
  "Good work starts with the right path.": "अच्छा काम सही रास्ते से शुरू होता है।",
  "Choose whether you want to book reliable local services or offer your specialized skills and earn on your schedule.": "चुनें कि क्या आप विश्वसनीय स्थानीय सेवाएं बुक करना चाहते हैं या अपने विशेष कौशल की पेशकश कर अपने समय पर कमाना चाहते हैं।",
  "I'm looking for help": "मुझे सहायता चाहिए",
  "CUSTOMER": "ग्राहक",
  "Book trusted, verified local services & experts": "भरोसेमंद, सत्यापित स्थानीय सेवाएं और विशेषज्ञ बुक करें",
  "I want to offer my services": "मैं सेवाएं देना चाहता हूँ",
  "GIG WORKER": "गिग वर्कर",
  "Earn flexibly, choose your hours, get paid fast": "अपनी सुविधानुसार कमाएं, तुरंत भुगतान पाएं",
  "I represent a business / enterprise": "मैं एक व्यावसायिक संस्था हूँ",
  "BUSINESS": "व्यवसाय",
  "Hire multi-worker squads, staff events, manage facility workforce": "बहु-श्रमिक दल नियुक्त करें, कार्यक्रम स्टाफ करें",
  "Back to Marketplace": "मुख्य बाज़ार पर वापस",
  "Sign In to Your Account": "अपने खाते में लॉग इन करें",
  "Email address": "ईमेल पता",
  "Password": "पासवर्ड",
  "Full name": "पूरा नाम",
  "Phone number": "फ़ोन नंबर",
  "Remember me": "मुझे याद रखें",
  "Forgot password?": "पासवर्ड भूल गए?",
  "Don't have an account?": "खाता नहीं है?",
  "Register here": "यहाँ पंजीकरण करें",
  "Already have an account?": "क्या पहले से खाता है?",
  "Sign In here": "यहाँ लॉग इन करें",
  "Organization Name": "संस्था का नाम",
  "Business Type": "व्यवसाय का प्रकार",
  "Contact Person": "संपर्क व्यक्ति",
  "Operating Address": "कार्यकारी पता",
  "AI ASSISTANT": "एआई सहायक",
  "SevaSathi AI Assistant": "सेवासाथी एआई सहायक",
  "Online • Multi-lingual": "ऑनलाइन • बहुभाषी",
  "Online • Gemini Intelligence": "ऑनलाइन • जेमिनी इंटेलिजेंस",
  "Click to speak (Voice Recognition)": "बोलने के लिए क्लिक करें (आवाज पहचान)",
  "Submit Request": "अनुरोध भेजें",
  "🗣️ Speaks & understands Hindi, Bangla & English": "🗣️ हिन्दी, বাংলা और अंग्रेजी समझता व बोलता है",
  "⚡ Instant worker matching or open pool creation": "⚡ तत्काल कार्यकर्ता मिलान या ओपन पूल निर्माण",
  "Speak or type what you need... e.g. '3 AC servicing workers tomorrow in Salt Lake' or 'প্লাম্বার লাগবে'": "बोलें या लिखें... जैसे 'कल सुबह 10 बजे एसी रिपेयर कारीगर चाहिए' या 'नल ठीक करवाना है'",
  "Terms & Conditions & How SevaSathi Works": "नियम और शर्तें एवं सेवासाथी कैसे काम करता है",
  "How SevaSathi Works": "सेवासाथी कैसे काम करता है",
  "Back": "वापस",
  "I Understand / OK": "मैं समझ गया / ठीक है",
  "Admin Password": "Admin पासवर्ड",
  "Authentication — SevaSathi": "प्रमाणीकरण — सेवासाथी",
  "Business / Organization Name": "Business / संस्था का नाम",
  "By continuing, you agree to SevaSathi's": "By continuing, you agree to सेवासाथी's",
  "By utilizing the SevaSathi platform as a customer or gig professional, you confirm alignment with our community standards and service terms.": "ग्राहक या गिग पेशेवर के रूप में सेवासाथी का उपयोग करके, आप हमारे सामुदायिक मानकों और सेवा शर्तों के साथ सहमति की पुष्टि करते हैं।",
  "CUSTOMER PORTAL": "ग्राहक पोर्टल",
  "Commercial & Cooperative Opportunities (Hotels & Enterprises)": "व्यावसायिक और सहकारी अवसर (होटल और उद्यम)",
  "Contact Person Name": "संपर्क व्यक्ति Name",
  "Cooperative minimum wage standards apply": "सहकारी संघ minimum wage standards apply",
  "Customer Dashboard — SevaSathi Marketplace": "Customer Dashboard — सेवासाथी Marketplace",
  "Customer Profile": "Customer प्रोफ़ाइल",
  "Deep Home & Kitchen Cleaning": "घर और रसोई की गहरी सफाई",
  "Device & Tech Support": "डिवाइस और तकनीकी सहायता",
  "Discover or Describe Your Need": "अपनी आवश्यकता खोजें या बताएं",
  "Enterprise Business Portal — SevaSathi": "Enterprise Business Portal — सेवासाथी",
  "Enterprise Workforce Dashboard": "उद्यम कार्यबल Dashboard",
  "Every gig worker on SevaSathi undergoes identity verification and credential reviews prior to taking active bookings.": "सेवासाथी पर प्रत्येक गिग वर्कर सक्रिय बुकिंग लेने से पहले पहचान सत्यापन और क्रेडेंशियल समीक्षा से गुजरता है।",
  "Explore Marketplace": "बाज़ार देखें",
  "Explore as Guest": "अतिथि के रूप में देखें",
  "Full name of authorized manager or HR": "पूरा नाम of authorized manager or HR",
  "GIG WORKER DASHBOARD": "गिग वर्कर डैशबोर्ड",
  "General Cooperative Labor": "General सहकारी संघ Labor",
  "Gig Partner Hub — SevaSathi": "Gig Partner Hub — सेवासाथी",
  "Go Back": "वापस जाएं",
  "HSR Layout, Bengaluru · Home Care": "एचएसआर लेआउट, बेंगलुरु · होम केयर",
  "Home Care & Deep Cleaning": "होम केयर और गहरी सफाई",
  "Home organisation": "घर की व्यवस्था और प्रबंधन",
  "Home repair specialist": "घरेलू मरम्मत विशेषज्ञ",
  "How it works &": "यह कैसे काम करता है और",
  "If a job does not meet quality standards, SevaSathi support facilitates prompt re-work or dispute resolution with customer support available 7 days a week.": "यदि कोई कार्य गुणवत्ता मानकों को पूरा नहीं करता है, तो सेवासाथी सहायता सप्ताह के सातों दिन उपलब्ध ग्राहक सहायता के साथ त्वरित पुनः कार्य या विवाद समाधान की सुविधा प्रदान करती है।",
  "Join SevaSathi to discover verified local professionals right in your neighborhood.": "अपने आस-पड़ोस में सत्यापित स्थानीय पेशेवरों को खोजने के लिए सेवासाथी से जुड़ें।",
  "Laptop & Wi-Fi Tech Support": "लैपटॉप और वाई-फाई तकनीकी सहायता",
  "Log Out / Switch Account": "लॉग आउट / खाता बदलें",
  "Multi-day staff deployment requisitions from verified enterprise partners. Guaranteed daily rates held safely in SevaSathi Cooperative Escrow.": "सत्यापित उद्यम भागीदारों से बहु-दिवसीय स्टाफ तैनाती मांग। सेवासाथी सहकारी एस्क्रो में सुरक्षित दैनिक दरें।",
  "Official service agreements between your organization and the SevaSathi Cooperative Workforce.": "Official service agreements between your organization and the सेवासाथी सहकारी संघ Workforce.",
  "Operating Address & City": "कार्यकारी पता & City",
  "Organization Profile": "Organization प्रोफ़ाइल",
  "Organization Profile & Compliance": "Organization प्रोफ़ाइल & Compliance",
  "Quoted prices on SevaSathi include standard labor costs. Any supplementary materials or unexpected scope changes must be mutually approved before execution.": "सेवासाथी पर उद्धृत कीमतों में मानक श्रम लागत शामिल है। किसी भी पूरक सामग्री या अप्रत्याशित कार्य विस्तार को निष्पादन से पहले पारस्परिक रूप से अनुमोदित किया जाना चाहिए।",
  "Senior Companion & Support": "Senior Companion & सहायता केंद्र",
  "SevaSathi Operations · Administration Console": "सेवासाथी Operations · Administration Console",
  "SevaSathi Trust Guarantee": "सेवासाथी ट्रस्ट गारंटी",
  "SevaSathi Trust Guarantee:": "सेवासाथी ट्रस्ट गारंटी:",
  "SevaSathi Verified Pro Network": "सेवासाथी सत्यापित प्रो नेटवर्क",
  "SevaSathi is founded on the simple premise that quality everyday help should be straightforward, respectful, and reliable for both customers and independent gig workers.": "सेवासाथी की स्थापना इस सरल विचार पर की गई है कि ग्राहकों और स्वतंत्र गिग कर्मियों दोनों के लिए गुणवत्तापूर्ण दैनिक सहायता सीधी, सम्मानजनक और विश्वसनीय होनी चाहिए।",
  "SevaSathi provides an on-demand, local marketplace designed to connect households and businesses with experienced, independent specialists across essential lifestyle services:": "सेवासाथी एक ऑन-डिमांड, स्थानीय बाज़ार प्रदान करता है जो परिवारों और व्यवसायों को आवश्यक जीवनशैली सेवाओं में अनुभवी, स्वतंत्र विशेषज्ञों से जोड़ता है:",
  "SevaSathi uses a balanced scoring model to allocate gig workers fairly without monopolization:": "सेवासाथी uses a balanced scoring model to allocate gig workers fairly without monopolization:",
  "SevaSathi — On-Demand Services, on your terms": "सेवासाथी — On-Demand Services, on your terms",
  "Sign In to Admin Console": "लॉग इन करें to Admin Console",
  "Supporting Docs": "सहायता केंद्रing Docs",
  "Supporting Verification Documents": "सहायता केंद्रing Verification Documents",
  "Supporting document": "सहायता केंद्रing document",
  "Terms & Conditions & How SevaSathi Works — SevaSathi": "नियम और शर्तें एवं सेवासाथी की कार्यप्रणाली — सेवासाथी",
  "Thank you for joining SevaSathi as a Gig Worker Partner! Our operations team manually verifies each partner’s credentials, ID documents, and trade skills to ensure safe, top-quality service for customers.": "Thank you for joining सेवासाथी as a Gig कारीगर पार्टनर! Our operations team manually verifies each partner’s credentials, ID documents, and trade skills to ensure safe, top-quality service for customers.",
  "Total Worker Partners": "Total कारीगर पार्टनरs",
  "Trusted, highly-rated professionals in your area.": "आपके क्षेत्र के भरोसेमंद, उच्च-रेटेड पेशेवर।",
  "Verify OTP & Save New Password": "ओटीपी सत्यापित करें और नया पासवर्ड सहेजें",
  "Wardrobe & Home Organisation": "Wardrobe & होम Organisation",
  "Your contact details and exact address are shared only with the assigned professional once a gig is confirmed. SevaSathi never sells personal information to third-party data brokers.": "काम की पुष्टि होने के बाद ही आपका संपर्क विवरण और सटीक पता केवल नियुक्त पेशेवर के साथ साझा किया जाता है। सेवासाथी कभी भी तीसरे पक्ष के डेटा दलालों को व्यक्तिगत जानकारी नहीं बेचता है।",
  "customer@hustle.local · Verified Customer": "customer@hustle.local · सत्यापित ग्राहक",
  "← Back": "← वापस",
  "← Back to Marketplace": "← मुख्य बाज़ार पर वापस",
  "★ 4.9 average rating · 18,500+ verified reviews": "★ 4.9 औसत रेटिंग · 18,500+ सत्यापित समीक्षाएं",
  "👷 Worker Partners Queue": "👷 कारीगर पार्टनरs Queue",
  "💾 Save Profile Updates": "💾 Save प्रोफ़ाइल Updates",
  "4.9 average rating · 18,500+ verified reviews": "4.9 औसत रेटिंग · 18,500+ सत्यापित समीक्षाएं",
  "18,500+ verified reviews": "18,500+ सत्यापित समीक्षाएं",
  "verified reviews": "सत्यापित समीक्षाएं",
  "“The plumber was at my door in under an hour. Clean work, fair price, and zero surprises.”": "“प्लंबर एक घंटे के भीतर मेरे दरवाजे पर था। साफ-सुथरा काम, उचित दाम और कोई अप्रत्याशित शुल्क नहीं।”",
  "Priya Nair": "प्रिया नायर",
  "Indiranagar, Bengaluru · Plumbing": "इंदिरानगर, बेंगलुरु · प्लंबिंग",
  "“Found a brilliant maths tutor for my daughter in one evening. Her grades improved immediately.”": "“मेरी बेटी के लिए एक ही शाम में एक शानदार गणित शिक्षक मिल गया। उसके अंकों में तुरंत सुधार हुआ।”",
  "Kunal Shah": "कुणाल शाह",
  "Koramangala, Bengaluru · Tutoring": "कोरमंगला, बेंगलुरु · ट्यूशन",
  "“I book the same home cleaner every month. Effortless, punctual, and thoroughly dependable.”": "“मैं हर महीने उसी सफाईकर्मी को बुक करती हूँ। बेहद सहज, समय के पाबंद और पूरी तरह भरोसेमंद।”",
  "Ayesha Khan": "आयशा खान",
  "“Finally, a service that respects your time. Sorted all my apartment wiring in one single visit.”": "“आखिरकार एक ऐसी सेवा जो आपके समय की कद्र करती है। एक ही बार में मेरे पूरे अपार्टमेंट की वायरिंग ठीक कर दी।”",
  "Rohan Iyer": "रोहन अय्यर",
  "Whitefield, Bengaluru · Electrical": "व्हाइटफील्ड, बेंगलुरु · इलेक्ट्रिकल",
  "“Our babysitter was warm, skilled and thoroughly verified. Such peace of mind for working parents.”": "“हमारी बेबीसिटर बेहद स्नेही, कुशल और पूरी तरह सत्यापित थीं। कामकाजी माता-पिता के लिए कितना सुकून!”",
  "Meera Joshi": "मीरा जोशी",
  "Jayanagar, Bengaluru · Childcare": "जयनगर, बेंगलुरु · चाइल्डकेयर",
  "“The at-home therapeutic massage was pure bliss after a long week. Top-tier professional setup.”": "“लंबे व्यस्त हफ्ते के बाद घर पर थेराप्यूटिक मसाज बेहद सुकून देने वाला रहा। शीर्ष स्तरीय पेशेवर सेटअप।”",
  "Ananya Deshmukh": "अनन्या देशमुख",
  "Bandra West, Mumbai · Wellness": "बांद्रा वेस्ट, मुंबई · वेलनेस",
  "“Laptop crashed right before an investor pitch. An expert tech arrived in 35 mins and restored it.”": "“निवेशक पिच से ठीक पहले लैपटॉप क्रैश हो गया। एक विशेषज्ञ तकनीकी 35 मिनट में पहुंचा और सब ठीक कर दिया।”",
  "Vikramaditya Sen": "विक्रमादित्य सेन",
  "Cyber City, Gurugram · Tech Help": "साइबर सिटी, गुरुग्राम · टेक सहायता",
  "“Our golden retriever loves the daily walking pro! Photo updates and route tracking keep us relaxed.”": "“हमारा गोल्डन रिट्रीवर रोजाना डॉग वॉकर को बहुत पसंद करता है! फोटो अपडेट और रूट ट्रैकिंग से हम निश्चिंत रहते हैं।”",
  "Sunita Reddy": "सुनीता रेड्डी",
  "Jubilee Hills, Hyderabad · Pet Care": "जुबली हिल्स, हैदराबाद · पेट केयर",
  "“Moved our whole 2-BHK flat without a single scratch. Upfront quotation, no sudden extra fees.”": "“हमारे पूरे 2-BHK फ्लैट का सामान बिना एक भी खरोंच के शिफ्ट कर दिया। पहले से तय कोटेशन, कोई अचानक शुल्क नहीं।”",
  "Kabir Malhotra": "कबीर मल्होत्रा",
  "Hauz Khas, New Delhi · Moving": "हौज़ खास, नई दिल्ली · शिफ्टिंग",
  "“Assembled two custom modular wardrobes and bookshelf in one afternoon. Solid craftsmanship!”": "“एक ही दोपहर में दो कस्टम मॉड्यूलर वार्डरोब और बुकशेल्फ़ असेंबल कर दीं। बेहतरीन कारीगरी!”",
  "Sneha Kulkarni": "स्नेहा कुलकर्णी",
  "Kothrud, Pune · Carpentry": "कोथरुड, पुणे · बढ़ईगीरी",
  "“Quick response for kitchen leaks and balcony fixtures. Polite technician and spotless cleanup.”": "“रसोई के लीकेज और बालकनी फिक्स्चर के लिए त्वरित प्रतिक्रिया। विनम्र तकनीशियन और बेदाग सफाई।”",
  "Devendra Verma": "देवेंद्र वर्मा",
  "Salt Lake, Kolkata · Repairs": "सॉल्ट लेक, कोलकाता · मरम्मत",
  "“Transformed our messy terrace into a flourishing urban garden. Expert plant care and advice.”": "“हमारी अव्यवस्थित छत को एक हरे-भरे शहरी बगीचे में बदल दिया। विशेषज्ञ पौधों की देखभाल और सलाह।”",
  "Pooja Sundaram": "पूजा सुंदरम",
  "Adyar, Chennai · Garden Care": "अड्यार, चेन्नई · गार्डन केयर",
  "Arjun Mehta": "अर्जुन मेहता",
  "142 jobs": "142 काम",
  "Naina Kapoor": "नैना कपूर",
  "Makeup artist & stylist": "मेकअप आर्टिस्ट और स्टाइलिस्ट",
  "88 jobs": "88 काम",
  "Karan Bhat": "करण भट",
  "Maths & science tutor": "गणित और विज्ञान शिक्षक",
  "67 jobs": "67 काम",
  "QUICK BOOK": "तुरंत बुकिंग",
  "FAST RESPONSE": "त्वरित प्रतिक्रिया",
  "BOOK TODAY": "आज ही बुक करें",
  "PET CARE": "पालतू जानवरों की देखभाल",
  "SAME DAY": "उसी दिन सेवा",
  "OUTDOOR": "आउटडोर",
  "HOME REPAIR": "घरेलू मरम्मत",
  "REPAIRS": "मरम्मत",
  "CARPENTRY": "बढ़ईगीरी",
  "CHILDCARE": "चाइल्डकेयर",
  "PETS": "पेट्स",
  "ORGANISING": "ऑर्गनाइजिंग",
  "TECH HELP": "तकनीकी सहायता",
  "GARDEN": "बगीचा",
  "Handyman visits": "हैंडीमैन सेवा",
  "Small fixes, sorted in one visit": "छोटी मरम्मत, एक ही मुलाकात में हल",
  "Electrician visits": "इलेक्ट्रीशियन सेवा",
  "Safe fixes for every room": "हर कमरे के लिए सुरक्षित मरम्मत",
  "Plumbing solutions": "प्लंबिंग समाधान",
  "Leaks, fittings & installations": "लीक, फिटिंग और नई स्थापना",
  "Carpentry & assembly": "बढ़ईगीरी और असेंबली",
  "Furniture built to last": "टिकाऊ फर्नीचर और फिटिंग",
  "Babysitting": "बेबीसिटिंग",
  "Caring hands for your little ones": "आपके नन्हे-मुन्नों की स्नेही देखभाल",
  "Pet sitting & walks": "पेट सिटिंग और डॉग वॉक",
  "Happy companions while you’re away": "आपकी अनुपस्थिति में खुशमिजाज साथी",
  "Order and calm, room by room": "हर कमरे में व्यवस्था और शांति",
  "Laptop & Wi-Fi help": "लैपटॉप और वाई-फाई सहायता",
  "Tech troubles, clearly solved": "तकनीकी परेशानियां, तुरंत हल",
  "Garden care": "बगीचे की देखभाल",
  "A little greener, every weekend": "हर सप्ताहांत थोड़ा और हरा-भरा",
  "From ₹349": "₹349 से",
  "From ₹299": "₹299 से",
  "From ₹499": "₹499 से",
  "From ₹249/hr": "₹249/घंटा से",
  "From ₹799": "₹799 से",
  "From ₹599": "₹599 से",
  "Want to start as a Gig Worker?": "गिग वर्कर के रूप में काम शुरू करना चाहते हैं?",
  "Join as a Gig Worker": "गिग वर्कर के रूप में जुड़ें",
  "Learn how it works": "जानें यह कैसे काम करता है",
  "TRUST & COOPERATION": "विश्वास और सहयोग",
  "₹35,000–₹65,000": "₹35,000–₹65,000",
  "₹35,000-₹65,000": "₹35,000–₹65,000",
  "⚡ Same-day": "⚡ उसी दिन",
  "Same-day": "उसी दिन",
  "🤝 99.4%": "🤝 99.4%",
  "99.4%": "99.4%",
  "Over 3,200+ local professionals": "3,200+ से अधिक स्थानीय पेशेवर",
  "₹1,500 budget · 3 replies": "₹1,500 बजट · 3 जवाब",
  "Sign in": "साइन इन करें",
  "Activity": "गतिविधि",
  "PLATFORM TRANSPARENCY": "मंच पारदर्शिता",
  "How it works & Terms of Trust.": "यह कैसे काम करता है और विश्वास के नियम।",
  "Terms of Trust.": "विश्वास की शर्तें।",
  "100% ID-Verified Professionals": "100% पहचान-सत्यापित पेशेवर",
  "Government ID checks & skill validation": "सरकारी पहचान पत्र जांच और कौशल सत्यापन",
  "Upfront Escrow & Price Clarity": "अग्रिम एस्क्रो और मूल्य स्पष्टता",
  "No hidden charges, surge fees, or surprises": "कोई छिपा हुआ शुल्क, उछाल दर या आश्चर्य नहीं",
  "Fair Worker Compensation": "कर्मियों का उचित पारिश्रमिक",
  "Workers keep 100% of tips + same-day payouts": "कर्मियों को 100% टिप्स + उसी दिन भुगतान मिलता है",
  "SECTION 01": "अनुभाग 01",
  "What We Offer": "हम क्या प्रदान करते हैं",
  "Residential sanitization, kitchen and bathroom deep cleaning, appliance maintenance, and seasonal prep.": "आवासीय स्वच्छता, रसोई और बाथरूम की गहरी सफाई, उपकरण रखरखाव और मौसमी तैयारी।",
  "Repairs & Maintenance": "मरम्मत और रखरखाव",
  "Licensed electricians, certified plumbers, expert carpenters, and general handyman solutions.": "लाइसेंस प्राप्त इलेक्ट्रीशियन, प्रमाणित प्लंबर, विशेषज्ञ बढ़ई और सामान्य हैंडीमैन समाधान।",
  "Lessons & Skill Coaching": "शिक्षा और कौशल प्रशिक्षण",
  "Doorstep academic tutoring, STEM mentoring, musical instruments, and vocational language coaching.": "घर पर शैक्षणिक ट्यूशन, स्टेम मेंटरिंग, संगीत वाद्ययंत्र और व्यावसायिक भाषा कोचिंग।",
  "Wellness & Personal Care": "कल्याण और व्यक्तिगत देखभाल",
  "Certified home spa specialists, therapeutic massages, beauty styling, and wellness trainers.": "प्रमाणित होम स्पा विशेषज्ञ, चिकित्सीय मालिश, सौंदर्य स्टाइलिंग और वेलनेस ट्रेनर।",
  "Same-day laptop diagnostics, Wi-Fi optimization, home office setup, and smart gadget installation.": "उसी दिन लैपटॉप निदान, वाई-फाई अनुकूलन, होम ऑफिस सेटअप और स्मार्ट गैजेट स्थापना।",
  "Errands, Moving & Care": "दैनिक कार्य, शिफ्टिंग और देखभाल",
  "Flat shifting, parcel delivery, verified babysitting, pet walking, and dedicated elder companion care.": "फ्लैट शिफ्टिंग, पार्सल डिलीवरी, सत्यापित बेबीसिटिंग, पेट वॉकिंग और समर्पित बुजुर्ग साथी देखभाल।",
  "SECTION 02": "अनुभाग 02",
  "From booking your first task to seamless completion, our platform is structured in 4 clear, transparent milestones:": "अपना पहला काम बुक करने से लेकर सुगम समापन तक, हमारा प्लेटफॉर्म 4 स्पष्ट, पारदर्शी चरणों में संरचित है:",
  "Browse pre-packaged service templates or use our AI need-finder to state exactly what you require along with your preferred timeline and budget.": "तैयार सेवा पैकेज देखें या अपने पसंदीदा समय और बजट के साथ अपनी सटीक आवश्यकता बताने के लिए हमारे एआई नीड-फाइंडर का उपयोग करें।",
  "Match with Local, Verified Pros": "स्थानीय, सत्यापित पेशेवरों से जुड़ें",
  "Receive immediate responses from top-rated, background-checked independent workers nearby. Review real customer ratings, past job counts, and verified reviews.": "आसपास के शीर्ष-रेटेड, पृष्ठभूमि-सत्यापित स्वतंत्र श्रमिकों से तुरंत प्रतिक्रियाएं प्राप्त करें। वास्तविक रेटिंग, पिछले काम और समीक्षाएं देखें।",
  "Transparent Pricing & Secure Escrow": "पारदर्शी मूल्य निर्धारण और सुरक्षित एस्क्रो",
  "Agree on upfront costs before work commences. Your payment is held safely in escrow and only released once the job is completed to your satisfaction.": "काम शुरू होने से पहले अग्रिम लागत पर सहमति बनाएं। आपका भुगतान एस्क्रो में सुरक्षित रहता है और काम से संतुष्ट होने के बाद ही जारी किया जाता है।",
  "Same-Day Direct Payouts & Honest Reviews": "उसी दिन सीधा भुगतान और ईमानदार समीक्षाएं",
  "Professionals receive same-day direct bank payouts with 100% tip retention. Rate and save your favorite pros for simple recurring bookings.": "पेशेवरों को 100% टिप प्रतिधारण के साथ उसी दिन सीधे बैंक में भुगतान मिलता है। बार-बार बुकिंग के लिए अपने पसंदीदा पेशेवरों को रेट और सेव करें।",
  "SECTION 03": "अनुभाग 03",
  "Terms of Service & Community Standards": "सेवा की शर्तें और सामुदायिक मानक",
  "To maintain the integrity of our community and ensure safety for everyone involved, all users agree to the following terms:": "हमारे समुदाय की अखंडता बनाए रखने और इसमें शामिल सभी लोगों की सुरक्षा सुनिश्चित करने के लिए, सभी उपयोगकर्ता निम्नलिखित शर्तों से सहमत हैं:",
  "Identity Verification:": "पहचान सत्यापन:",
  "Pricing Integrity:": "मूल्य निर्धारण की निष्ठा:",
  "Worker Dignity & Independence:": "श्रमिकों की गरिमा और स्वतंत्रता:",
  "Gig workers are independent professionals who set their schedules and manage their work. Customers agree to provide safe, harassment-free workspaces.": "गिग श्रमिक स्वतंत्र पेशेवर हैं जो अपना समय निर्धारित करते हैं और अपने काम का प्रबंधन करते हैं। ग्राहक सुरक्षित, उत्पीड़न-मुक्त कार्यस्थल प्रदान करने के लिए सहमत हैं।",
  "Cancellation Policy:": "रद्दीकरण नीति:",
  "Free cancellations are supported up to 2 hours prior to scheduled arrival. Cancellations made after a pro is en route incur a modest travel compensation fee.": "निर्धारित आगमन से 2 घंटे पहले तक निःशुल्क रद्दीकरण समर्थित है। पेशेवर के रास्ते में होने के बाद किए गए रद्दीकरण पर मामूली यात्रा मुआवजा शुल्क लगता है।",
  "SECTION 04": "अनुभाग 04",
  "Privacy & Escrow Safeguards": "गोपनीयता और एस्क्रो सुरक्षा",
  "Questions? Contact our team anytime at support@hustle.local": "सवाल? हमारी टीम से कभी भी support@hustle.local पर संपर्क करें",
  "I want to offer services": "मैं सेवाएं देना चाहता हूँ",
  "Earn effortlessly, build your business & same-day pay": "आसानी से कमाएं, अपना व्यवसाय बनाएं और उसी दिन भुगतान पाएं",
  "I'm here for my business": "मैं अपने व्यवसाय के लिए यहाँ हूँ",
  "Hire workforce teams, facilities & enterprise staffing": "कार्यबल टीमें, सुविधाएं और एंटरप्राइज स्टाफिंग किराए पर लें",
  "Verified Local Experts": "सत्यापित स्थानीय विशेषज्ञ",
  "Government ID checked and vetted professionals": "सरकारी पहचान सत्यापित और जांचे-परखे पेशेवर",
  "Transparent Upfront Pricing": "पारदर्शी अग्रिम मूल्य",
  "No hidden commissions, surge fees, or guesswork": "कोई छिपा हुआ कमीशन, सर्ज चार्ज या भ्रम नहीं",
  "Secure escrow protection with same-day resolution": "उसी दिन समाधान के साथ सुरक्षित एस्क्रो सुरक्षा",
  "GIG WORKER PORTAL": "गिग वर्कर पोर्टल",
  "BUSINESS PORTAL": "बिजनेस पोर्टल",
  "Create account or sign in to continue": "जारी रखने के लिए खाता बनाएं या साइन इन करें",
  "ACTIVE SESSION DETECTED": "सक्रिय सत्र का पता चला",
  "You are currently signed in as": "आप वर्तमान में इस रूप में साइन इन हैं:",
  "Go to Marketplace →": "मार्केटप्लेस पर जाएं →",
  "or create/sign in to another account below": "या नीचे किसी अन्य खाते में बनाएं/साइन इन करें",
  "Find the help you need.": "अपनी ज़रूरत की मदद पाएं।",
  "Create account": "खाता बनाएं",
  "Continue with Google": "गूगल के साथ जारी रखें",
  "or continue with email & phone": "या ईमेल और फोन के साथ जारी रखें",
  "What skills do you have?": "आपके पास कौन से कौशल हैं?",
  "* (Compulsory)": "* (अनिवार्य)",
  "Select primary skill category...": "प्राथमिक कौशल श्रेणी चुनें...",
  "Plumbing & Drainage Fixing": "प्लंबिंग और ड्रेनेज मरम्मत",
  "Electrician & Wiring Repairs": "इलेक्ट्रीशियन और वायरिंग मरम्मत",
  "Furniture Assembly & Handyman": "फर्नीचर असेंबली और हैंडीमैन",
  "Custom Carpentry & Woodwork": "कस्टम बढ़ईगीरी और लकड़ी का काम",
  "AC, Fridge & Appliance Repair": "एसी, फ्रिज और उपकरण मरम्मत",
  "Spa, Massage & Grooming": "स्पा, मालिश और ग्रूमिंग",
  "Maths & Science Tutoring": "गणित और विज्ञान ट्यूशन",
  "Wall Painting & Waterproofing": "दीवार पेंटिंग और वॉटरप्रूफिंग",
  "Babysitting & Childcare": "बेबीसिटिंग और बाल देखभाल",
  "Pet Grooming, Sitting & Dog Walking": "पालतू जानवरों की देखभाल और वॉक",
  "Garden & Plant Care": "बगीचा और पौधों की देखभाल",
  "Yoga & Fitness Coaching": "योग और फिटनेस कोचिंग",
  "Car & Two-Wheeler Care": "कार और दोपहिया वाहन देखभाल",
  "Pest Control & Fumigation": "कीट नियंत्रण और धूमन",
  "Other Specialized Skill": "अन्य विशिष्ट कौशल",
  "Years of experience": "अनुभव के वर्ष",
  "Choose your experience level...": "अपना अनुभव स्तर चुनें...",
  "Less than 1 year (Entry / Starting out)": "1 वर्ष से कम (शुरुआती)",
  "1–2 years (Working pro)": "1–2 वर्ष (कार्यरत पेशेवर)",
  "3–5 years (Experienced specialist)": "3–5 वर्ष (अनुभवी विशेषज्ञ)",
  "5–10 years (Senior craftsman)": "5–10 वर्ष (वरिष्ठ कारीगर)",
  "10+ years (Master pro)": "10+ वर्ष (मास्टर प्रो)",
  "(Optional — accelerates verification)": "(वैकल्पिक — सत्यापन को गति देता है)",
  "Upload ID proof, trade certificate or resume": "पहचान पत्र, ट्रेड सर्टिफिकेट या बायोडाटा अपलोड करें",
  "PDF, JPG, or PNG up to 10MB · Click to choose": "पीडीएफ, जेपीजी या पीएनजी 10MB तक · चुनने के लिए क्लिक करें",
  "Uploaded file ready": "अपलोड की गई फ़ाइल तैयार",
  "Working City": "कार्यरत शहर",
  "Select your city...": "अपना शहर चुनें...",
  "Kolkata": "कोलकाता",
  "Bengaluru": "बेंगलुरु",
  "Chennai": "चेन्नई",
  "Mumbai": "मुंबई",
  "Delhi": "दिल्ली",
  "Hyderabad": "हैदराबाद",
  "Ahmedabad": "अहमदाबाद",
  "Pune": "पुणे",
  "Other (Type your city)": "अन्य (अपना शहर लिखें)",
  "Preferred work localities": "पसंदीदा कार्य क्षेत्र",
  "(e.g. Salt Lake, Indiranagar, Bandra, Hauz Khas)": "(उदा. सॉल्ट लेक, इंदिरानगर, बांद्रा, हौज़ खास)",
  "About your craft & background": "अपने हुनर और अनुभव के बारे में बताएं",
  "(Optional)": "(वैकल्पिक)",
  "Select business category...": "व्यवसाय श्रेणी चुनें...",
  "Hotel / Hospitality & Resorts": "होटल / आतिथ्य और रिसॉर्ट्स",
  "Facility & Property Management": "सुविधा और संपत्ति प्रबंधन",
  "IT Park & Corporate Office": "आईटी पार्क और कॉर्पोरेट कार्यालय",
  "Retail, Malls & Commercial Complexes": "खुदरा, मॉल और वाणिज्यिक परिसर",
  "Restaurant, Cafe & Catering": "रेस्तरां, कैफे और कैटरिंग",
  "Construction & Real Estate Development": "निर्माण और रियल एस्टेट विकास",
  "Event Venue, Exhibition & Staging": "इवेंट स्थल, प्रदर्शनी और स्टेजिंग",
  "Healthcare, Clinic & Wellness Centre": "स्वास्थ्य सेवा, क्लिनिक और कल्याण केंद्र",
  "Other Enterprise": "अन्य उद्यम",
  "Business/Organization Name": "व्यवसाय / संस्था का नाम",
  "Address / Headquarters": "पता / मुख्यालय",
  "GSTIN (Optional)": "जीएसटीआईएन (वैकल्पिक)",
  "Business Registration Number (Optional)": "व्यवसाय पंजीकरण संख्या (वैकल्पिक)",
  "Website / Portfolio (Optional)": "वेबसाइट / पोर्टफोलियो (वैकल्पिक)",
  "Keep me signed in on this device": "मुझे इस डिवाइस पर साइन इन रखें",
  "Create Free Account": "मुफ़्त खाता बनाएं",
  "Sign In to Portal": "पोर्टल में साइन इन करें",
  "By creating an account, you agree to SevaSathi's Terms of Service & Privacy Policy.": "खाता बनाकर, आप सेवासाथी की सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं।",
  "Terms of Service": "सेवा की शर्तें",
  "Privacy Policy": "गोपनीयता नीति",
  "ACCOUNT RECOVERY": "खाता पुनर्प्राप्ति",
  "Reset your password": "अपना पासवर्ड रीसेट करें",
  "Enter your registered email or phone number to receive a verification OTP.": "सत्यापन ओटीपी प्राप्त करने के लिए अपना पंजीकृत ईमेल या फ़ोन नंबर दर्ज करें।",
  "Registered email or phone number": "पंजीकृत ईमेल या फ़ोन नंबर",
  "Send Verification OTP": "सत्यापन ओटीपी भेजें",
  "OTP Sent:": "ओटीपी भेजा गया:",
  "Auto-fill": "स्वतः भरें",
  "Standard verification code 123456 is also accepted.": "मानक सत्यापन कोड 123456 भी स्वीकार्य है।",
  "Enter 6-digit OTP": "6-अंकों का ओटीपी दर्ज करें",
  "Create new password": "नया पासवर्ड बनाएं",
  "Start earning on your terms.": "अपनी शर्तों पर कमाई शुरू करें।",
  "Join our cooperative network of trusted local specialists and get paid same day.": "भरोसेमंद स्थानीय विशेषज्ञों के हमारे सहकारी नेटवर्क से जुड़ें और उसी दिन भुगतान पाएं।",
  "Register your organization.": "अपने संगठन का पंजीकरण करें।",
  "Create your enterprise business account to request and deploy cooperative workforce teams.": "सहकारी कार्यबल टीमों का अनुरोध और तैनाती करने के लिए अपना एंटरप्राइज बिजनेस खाता बनाएं।",
  "Welcome back, business partner.": "पुनः स्वागत है, व्यावसायिक साझेदार।",
  "Sign in to manage your active workforce, recurring contracts, and consolidated invoices.": "अपने सक्रिय कार्यबल, आवर्ती अनुबंधों और समेकित चालानों का प्रबंधन करने के लिए साइन इन करें।",
  "Multi-Worker Team Hiring": "बहु-श्रमिक टीम भर्ती",
  "Request and deploy 1 to 50+ vetted cooperative workers with one brief": "एक ही अनुरोध के साथ 1 से 50+ जाँचे-परखे सहकारी श्रमिकों की तैनाती करें",
  "Recurring Corporate Contracts": "आवर्ती कॉर्पोरेट अनुबंध",
  "Predictable daily, weekly, or monthly deployment agreements": "दैनिक, साप्ताहिक या मासिक तैनाती के स्पष्ट और पारदर्शी समझौते",
  "Consolidated Invoicing": "समेकित चालान",
  "Single itemized corporate bill with secure escrow protection": "सुरक्षित एस्क्रो सुरक्षा के साथ एकल मदवार कॉर्पोरेट बिल",
  "OPEN PRO POOL": "ओपन प्रो पूल",
  "Can't find what you're looking for?": "क्या आपको अपनी पसंद की सेवा नहीं मिल रही?",
  "Post your custom job requirements directly to our verified open pool. Outline your task, choose your schedule, and set your own budget.": "अपनी कस्टम कार्य आवश्यकताएं सीधे हमारे सत्यापित ओपन पूल में पोस्ट करें। अपना कार्य बताएं, समय चुनें और अपना बजट तय करें।",
  "Enter Custom Job Needs": "कस्टम कार्य की ज़रूरतें दर्ज करें",
  "Post custom task": "कस्टम कार्य पोस्ट करें",
  "Trust & Escrow": "विश्वास और एस्क्रो",
  "Account settings": "खाता सेटिंग्स",
  "Customer Help": "ग्राहक सहायता",
  "Speak or type what you need... e.g.": "बोलें या लिखें कि आपको क्या चाहिए... उदा.",
  "COOPERATIVE ENTERPRISE": "सहकारी उद्यम",
  "Fair Workforce Allocation · Multi-Worker Staffing · Secured Escrow Contracts": "उचित कार्यबल आवंटन · बहु-श्रमिक स्टाफिंग · सुरक्षित एस्क्रो अनुबंध",
  "Helpdesk:": "हेल्पडेस्क:",
  "Dashboard Overview": "डैशबोर्ड अवलोकन",
  "Post Requirement": "आवश्यकता पोस्ट करें",
  "My Requirements": "मेरी आवश्यकताएं",
  "Workforce Roster": "कार्यबल सूची",
  "Active Contracts": "सक्रिय अनुबंध",
  "Invoices & Escrow": "चालान और एस्क्रो",
  "Fair Allocation System": "उचित आवंटन प्रणाली",
  "Skill Match:": "कौशल मिलान:",
  "Availability:": "उपलब्धता:",
  "Proximity:": "निकटता:",
  "Fair Workload (Rotation):": "उचित कार्यभार (रोटेशन):",
  "Rating & Reliability:": "रेटिंग और विश्वसनीयता:",
  "Manage multi-worker deployments, team rosters, and consolidated billing.": "बहु-श्रमिक तैनाती, टीम रोस्टर और समेकित बिलिंग का प्रबंधन करें।",
  "➕ Post Workforce Requirement": "➕ कार्यबल आवश्यकता पोस्ट करें",
  "Active Requirements": "सक्रिय आवश्यकताएं",
  "Commercial requisitions": "वाणिज्यिक मांग",
  "Pending Requests": "लंबित अनुरोध",
  "Matching candidates": "उम्मीदवारों का मिलान",
  "Assigned Workers": "नियुक्त श्रमिक",
  "Deployed on active contracts": "सक्रिय अनुबंधों पर तैनात",
  "Live service agreements": "सक्रिय सेवा समझौते",
  "Total Spending": "कुल खर्च",
  "Paid through escrow": "एस्क्रो के माध्यम से भुगतान किया गया",
  "Completed Deployments": "पूर्ण की गई तैनाती",
  "Fulfilled contracts": "पूर्ण अनुबंध",
  "Recent Requirements": "हाल की आवश्यकताएं",
  "View All": "सभी देखें",
  "Req ID": "अनुरोध आईडी",
  "Trade Category": "ट्रेड श्रेणी",
  "Workers Needed": "आवश्यक श्रमिक",
  "Duration": "अवधि",
  "Rate / Worker": "दर / श्रमिक",
  "Status": "स्थिति",
  "Action": "कार्रवाई",
  "Loading requirements...": "आवश्यकताएं लोड हो रही हैं...",
  "Active Contracts Overview": "सक्रिय अनुबंध अवलोकन",
  "Contract ID": "अनुबंध आईडी",
  "Department": "विभाग",
  "Team Size": "टीम का आकार",
  "Total Budget": "कुल बजट",
  "Loading contracts...": "अनुबंध लोड हो रहे हैं...",
  "Post Workforce Requirement": "कार्यबल आवश्यकता पोस्ट करें",
  "Submit a multi-worker staffing request. Our cooperative engine matches verified trade professionals fairly.": "एक बहु-श्रमिक स्टाफिंग अनुरोध सबमिट करें। हमारा सहकारी इंजन जाँचे-परखे ट्रेड पेशेवरों का निष्पक्ष मिलान करता है।",
  "Service Category": "सेवा श्रेणी",
  "Select trade category": "ट्रेड श्रेणी चुनें",
  "Cleaning & Housekeeping": "सफाई और हाउसकीपिंग",
  "Electrical & Maintenance": "इलेक्ट्रिकल और रखरखाव",
  "Plumbing & Sanitation": "प्लंबिंग और स्वच्छता",
  "Security & Guarding": "सुरक्षा और गार्डिंग",
  "Painting & Renovation": "पेंटिंग और नवीनीकरण",
  "Event & Hospitality Staff": "इवेंट और आतिथ्य कर्मचारी",
  "Logistics & Heavy Lifting": "लॉजिस्टिक्स और भारी ढुलाई",
  "e.g. 3 cleaners or 1 electrician": "उदा. 3 क्लीनर या 1 इलेक्ट्रीशियन",
  "Required Skills & Qualifications": "आवश्यक कौशल और योग्यता",
  "Deployment Address / Facility": "तैनाती पता / सुविधा",
  "City": "शहर",
  "Delhi NCR": "दिल्ली एनसीआर",
  "Start Date": "प्रारंभ तिथि",
  "End Date": "समाप्ति तिथि",
  "Shift / Daily Schedule": "शिफ्ट / दैनिक समय",
  "Estimated Daily Rate per Worker (₹)": "अनुमानित दैनिक दर प्रति श्रमिक (₹)",
  "Recurring Workforce Contract (e.g. Monthly / Weekly staffing)": "आवर्ती कार्यबल अनुबंध (उदा. मासिक / साप्ताहिक स्टाफिंग)",
  "Recurrence Frequency": "पुनरावृत्ति आवृत्ति",
  "Weekly Rotation": "साप्ताहिक रोटेशन",
  "Monthly Recurring Roster": "मासिक आवर्ती रोस्टर",
  "Quarterly Retainer": "त्रैमासिक रिटेनर",
  "Additional Instructions & Safety Equipment": "अतिरिक्त निर्देश और सुरक्षा उपकरण",
  "Requested Squad": "अनुरोधित दस्ता",
  "3 Pros": "3 पेशेवर",
  "7 Days": "7 दिन",
  "Labor Subtotal": "श्रम उप-योग",
  "Coop Reserve (5%)": "सहकारी रिज़र्व (5%)",
  "How It Works": "यह कैसे काम करता है",
  "Email Address": "ईमेल पता",
  "Phone Number": "फ़ोन नंबर",
  "Seva": "सेवा",
  "Sathi": "साथी",
  "AI MATCH": "एआई मिलान",
  "Terms & Conditions": "नियम और शर्तें",
  "and": "और",
  "Total Estimated Budget": "कुल अनुमानित बजट",
  "Reset Form": "फ़ॉर्म रीसेट करें",
  "🚀 Submit & Run Fair Matcher": "🚀 सबमिट करें और निष्पक्ष मिलान चलाएं",
  "Workforce Requisitions": "कार्यबल मांग",
  "Track all commercial requisitions, view algorithmic worker matches, and confirm team allocations.": "सभी वाणिज्यिक मांगों को ट्रैक करें, एल्गोरिथम कार्यकर्ता मिलान देखें और टीम आवंटन की पुष्टि करें।",
  "➕ New Requisition": "➕ नई मांग",
  "Category": "श्रेणी",
  "Workers": "श्रमिक",
  "Dates": "तिथियां",
  "Daily Rate": "दैनिक दर",
  "Allocated Team": "आवंटित टीम",
  "Actions": "कार्रवाइयां",
  "Workforce Department Roster": "कार्यबल विभाग रोस्टर",
  "View currently deployed trade workers grouped by department/service, shifts, and attendance status.": "विभाग/सेवा, शिफ्ट और उपस्थिति स्थिति के अनुसार समूहीकृत वर्तमान में तैनात ट्रेड श्रमिकों को देखें।",
  "Loading active department teams...": "सक्रिय विभाग टीमें लोड हो रही हैं...",
  "Commercial Contracts": "वाणिज्यिक अनुबंध",
  "Duration & Days": "अवधि और दिन",
  "Total Contract Value": "कुल अनुबंध मूल्य",
  "Invoices & Escrow Payments": "चालान और एस्क्रो भुगतान",
  "Consolidated multi-worker billing. Funds are secured in escrow and disbursed directly to workers upon shift sign-off.": "समेकित बहु-श्रमिक बिलिंग। धनराशि एस्क्रो में सुरक्षित है और शिफ्ट पूर्ण होने पर सीधे श्रमिकों को वितरित की जाती है।",
  "Loading consolidated invoices...": "समेकित चालान लोड हो रहे हैं...",
  "Verified commercial registration, GSTIN compliance, and billing contacts.": "सत्यापित वाणिज्यिक पंजीकरण, जीएसटी अनुपालन और बिलिंग संपर्क।",
  "Facility / HQ Address": "सुविधा / मुख्यालय का पता",
  "Registration / CIN": "पंजीकरण / सीआईएन",
  "Algorithmic Fair Matches": "एल्गोरिथम निष्पक्ष मिलान",
  "Fair weighted scoring based on Skill (40%), Availability (25%), Proximity (15%), Workload Rotation (10%), and Rating (10%).": "कौशल (40%), उपलब्धता (25%), निकटता (15%), कार्यभार रोटेशन (10%), और रेटिंग (10%) पर आधारित निष्पक्ष भारित स्कोरिंग।",
  "⚡ Auto-Select Top Picks": "⚡ शीर्ष विकल्प स्वतः चुनें",
  "Selected:": "चयनित:",
  "Cancel": "रद्द करें",
  "Confirm Allocation & Generate Contract": "आवंटन की पुष्टि करें और अनुबंध तैयार करें",
  "Direct Payouts, Protected Escrow & Two-Way Bargaining": "प्रत्यक्ष भुगतान, संरक्षित एस्क्रो और दोतरफा बातचीत",
  "⏳ APPLICATION UNDER REVIEW": "⏳ आवेदन समीक्षाधीन है",
  "Partner ID & Skill Verification": "साथी पहचान व कौशल सत्यापन",
  "in Progress": "प्रगति पर है",
  "Applicant Name": "आवेदक का नाम",
  "Registered Trade": "पंजीकृत पेशा",
  "Experience": "अनुभव",
  "Service Locality": "सेवा इलाका",
  "Verification Status": "सत्यापन स्थिति",
  "Pending Admin Approval": "प्रशासक की स्वीकृति लंबित है",
  "Browse on-demand trade requests, view service categories, and explore the platform as a guest while operations reviews your application.": "मांग पर ट्रेड अनुरोध ब्राउज़ करें, सेवा श्रेणियां देखें और संचालन टीम द्वारा आपके आवेदन की समीक्षा के दौरान अतिथि के रूप में मंच देखें।",
  "✓ VERIFIED & ACTIVE PRO PARTNER": "✓ सत्यापित और सक्रिय प्रो पार्टनर",
  "Welcome back,": "पुनः स्वागत है,",
  "Partner": "पार्टनर",
  "Here are your live customer appointments, counter-offers, and instant payouts.": "यहाँ आपकी लाइव ग्राहक नियुक्तियां, काउंटर-ऑफ़र और त्वरित भुगतान हैं।",
  "View Customer Marketplace": "ग्राहक बाज़ार देखें",
  "Total Earnings": "कुल कमाई",
  "Earned from completed tasks": "पूरे किए गए कार्यों से अर्जित",
  "Pending Escrow Balance": "लंबित एस्क्रो शेष",
  "Releases on task sign-off": "कार्य पूर्ण होने पर जारी होता है",
  "⚡ Payout": "⚡ भुगतान निकालें",
  "Completed Jobs": "पूर्ण किए गए कार्य",
  "0 tasks completed": "0 कार्य पूर्ण",
  "Client Rating & Tips": "ग्राहक रेटिंग और सुझाव",
  "New Pro": "नए पेशेवर",
  "Client rating unlocks after completed jobs": "पूर्ण किए गए कार्यों के बाद ग्राहक रेटिंग अनलॉक होती है",
  "Live Available Gigs Nearby": "पास में उपलब्ध लाइव काम",
  "0 active": "0 सक्रिय",
  "Past Completed Gigs & Reviews": "अतीत में पूरे किए गए काम व समीक्षाएं",
  "0 completed": "0 पूर्ण",
  "0 available": "0 उपलब्ध",
  "Amount in ₹": "राशि ₹ में",
  "Workspace — SevaSathi": "कार्यक्षेत्र — सेवासाथी",
  "🚪 Log Out": "🚪 लॉग आउट",
  "YOUR ACTIVE SESSION": "आपका सक्रिय सत्र",
  "Welcome to": "स्वागत है",
  "SevaSathi.": "सेवासाथी में।",
  "Your personalized dashboard is ready.": "आपका व्यक्तिगत डैशबोर्ड तैयार है।",
  "Return to marketplace": "बाज़ार पर वापस जाएं",
  "Log Out of Account": "खाते से लॉग आउट करें",
  "CUSTOMER WORKSPACE": "ग्राहक कार्यक्षेत्र",
  "Your tailored workspace": "आपका व्यक्तिगत कार्यक्षेत्र",
  "You remain logged in with this account across all visits until you explicitly log out.": "जब तक आप स्पष्ट रूप से लॉग आउट नहीं करते, तब तक आप सभी विज़िट में इस खाते से लॉग इन रहेंगे।",
  "🛡️ Staff Operations": "🛡️ स्टाफ संचालन",
  "Staff Administration": "स्टाफ प्रशासन",
  "Sign in with operations staff credentials to verify workers, manage customer accounts, and settle dispute tickets.": "श्रमिकों को सत्यापित करने, ग्राहक खातों का प्रबंधन करने और विवाद टिकटों को निपटाने के लिए संचालन स्टाफ क्रेडेंशियल के साथ साइन इन करें।",
  "Admin Email": "एडमिन ईमेल",
  "Role-Based Security:": "भूमिका-आधारित सुरक्षा:",
  "Customer and worker credentials are strictly denied entry. Staff credentials required on each login.": "ग्राहक और कार्यकर्ता क्रेडेंशियल का प्रवेश सख्त वर्जित है। प्रत्येक लॉगिन पर स्टाफ क्रेडेंशियल आवश्यक हैं।",
  "Platform Management & Operations": "मंच प्रबंधन और संचालन",
  "Inspect verified documents, oversee gig worker partners, and settle customer disputes.": "सत्यापित दस्तावेज़ों का निरीक्षण करें, गिग वर्कर भागीदारों की निगरानी करें और ग्राहक विवादों का निपटारा करें।",
  "👤 Customer Accounts": "👤 ग्राहक खाते",
  "⚖️ Disputes & Tickets": "⚖️ विवाद और टिकट",
  "🏢 Enterprise & Rebalancing": "🏢 उद्यम और पुनर्संतुलन",
  "Pending Verification": "सत्यापन लंबित",
  "Approved & Live": "स्वीकृत और लाइव",
  "Locality": "इलाका",
  "Total Customer Accounts": "कुल ग्राहक खाते",
  "Active Bookings in Pipeline": "प्रक्रिया में सक्रिय बुकिंग",
  "Contact Info": "संपर्क जानकारी",
  "Joined Date": "जुड़ने की तिथि",
  "Bookings Handled": "संभाली गई बुकिंग",
  "Total Dispute Tickets": "कुल विवाद टिकट",
  "Open / Under Review": "खुले / समीक्षाधीन",
  "Settled & Resolved": "निपटारे और सुलझाए गए",
  "Ticket Ref & Date": "टिकट संदर्भ और तिथि",
  "Complainant": "शिकायतकर्ता",
  "Against": "के खिलाफ",
  "Service & Price": "सेवा और कीमत",
  "Category & Statement": "श्रेणी और विवरण",
  "Total Enterprise Requisitions": "कुल उद्यम मांगें",
  "Commercial Contracts Active": "सक्रिय वाणिज्यिक अनुबंध",
  "Commercial Escrow Invoices": "वाणिज्यिक एस्क्रो चालान",
  "Multi-Worker Requisitions": "बहु-श्रमिक मांग",
  "Inspect corporate staffing demands and manually rebalance allocations to ensure fair work distribution across cooperative members.": "कॉर्पोरेट स्टाफिंग मांगों का निरीक्षण करें और सहकारी सदस्यों के बीच निष्पक्ष कार्य वितरण सुनिश्चित करने के लिए आवंटन को मैन्युअल रूप से पुनर्संतुलित करें।",
  "Client Organization": "ग्राहक संगठन",
  "Staff Size": "कर्मचारी संख्या",
  "Intervention": "हस्तक्षेप",
  "Active Commercial Contracts": "सक्रिय वाणिज्यिक अनुबंध",
  "Organization": "संगठन",
  "Trade Squad": "ट्रेड दस्ता",
  "Total Value": "कुल मूल्य",
  "Review & Settle Task Dispute": "कार्य विवाद की समीक्षा और समाधान करें",
  "Enter admin email": "एडमिन ईमेल दर्ज करें",
  "e.g. Aditi Sharma": "उदा. अदिति शर्मा",
  "you@example.com": "you@example.com",
  "98765 43210": "98765 43210",
  "Specify your trade (e.g. Master Carpenter, High School Maths, AC Tech)": "अपना ट्रेड बताएं (उदा. मास्टर बढ़ई, हाई स्कूल गणित, एसी तकनीशियन)",
  "Type your city name (e.g. Chandigarh, Jaipur, Kochi)": "अपने शहर का नाम टाइप करें (उदा. चंडीगढ़, जयपुर, कोच्चि)",
  "e.g. Salt Lake & New Town, or Indiranagar": "उदा. सॉल्ट लेक और न्यू टाउन, या इंदिरानगर",
  "e.g. Salt Lake &amp; New Town, or Indiranagar": "उदा. सॉल्ट लेक और न्यू टाउन, या इंदिरानगर",
  "Tell customers what makes your service stand out...": "ग्राहकों को बताएं कि आपकी सेवा क्या खास बनाती है...",
  "e.g. Grand Heritage Hotel, CloudNine Tech Park": "उदा. ग्रैंड हेरिटेज होटल, क्लाउडनाइन टेक पार्क",
  "e.g. Plot 14, Sector V, Salt Lake, Kolkata": "उदा. प्लॉट 14, सेक्टर V, सॉल्ट लेक, कोलकाता",
  "https://yourcompany.com": "https://yourcompany.com",
  "At least 6 characters": "कम से कम 6 अक्षर",
  "you@example.com or 9876543210": "you@example.com या 9876543210",
  "e.g. 482910": "उदा. 482910",
  "e.g. Industrial Floor Polishing, High-Voltage Wiring, Restroom Sanitation": "उदा. औद्योगिक फर्श पॉलिशिंग, हाई-वोल्टेज वायरिंग, टॉयलेट स्वच्छता",
  "e.g. Grand Heritage Hotel, Salt Lake Sector V": "उदा. ग्रैंड हेरिटेज होटल, सॉल्ट लेक सेक्टर V",
  "e.g. 08:00 AM - 04:00 PM (8 Hours)": "उदा. सुबह 08:00 - शाम 04:00 (8 घंटे)",
  "Specify any uniform requirements, security clearance, entry gate pass, or safety gear needed on site.": "साइट पर आवश्यक वर्दी, सुरक्षा मंजूरी, गेट पास या सुरक्षा उपकरण का विवरण दें।",
  "e.g. Can do tomorrow at 4 PM, will bring high-grade copper wires...": "उदा. कल शाम 4 बजे कर सकते हैं, उच्च गुणवत्ता वाले कॉपर तार साथ लाएंगे...",
  "Detail what occurred with the client...": "ग्राहक के साथ क्या हुआ विस्तार से बताएं...",
  "Sign in to Partner Portal": "पार्टनर पोर्टल में साइन इन करें",
  "Sign in to Business Portal": "बिजनेस पोर्टल में साइन इन करें",
  "Sign in to SevaSathi": "सेवासाथी में साइन इन करें",
  "Submit Partner Application": "पार्टनर आवेदन जमा करें",
  "Create Business Account": "बिजनेस खाता बनाएं",
  "Create Customer Account": "ग्राहक खाता बनाएं",
  "Email address or phone number": "ईमेल पता या फ़ोन नंबर",
  "Sign in with Google": "गूगल से साइन इन करें",
  "New to SevaSathi?": "सेवासाथी पर नए हैं?",
  "Create an account": "खाता बनाएं",
  "Welcome back, partner.": "पुनः स्वागत है, साथी।",
  "Welcome back, customer.": "पुनः स्वागत है, ग्राहक।",
  "👥 Multi-Worker Team Hiring": "👥 बहु-श्रमिक टीम भर्ती",
  "📜 Recurring Corporate Contracts": "📜 आवर्ती कॉर्पोरेट अनुबंध",
  "🧾 Consolidated Invoicing": "🧾 समेकित चालान",
  "I Understand / OK ✓": "मैं समझ गया / ठीक है ✓",
  "Join as a Gig Worker →": "गिग वर्कर के रूप में जुड़ें →",
  "Learn how it works ↗": "जानें यह कैसे काम करता है ↗",
  "Request a gig →": "काम का अनुरोध करें →",
  "Browse professionals →": "पेशेवर ब्राउज़ करें →",
  "Find an expert →": "विशेषज्ञ खोजें →",
  "View more services →": "और सेवाएं देखें →",
  "How we keep you safe →": "हम आपको कैसे सुरक्षित रखते हैं →",
  "LOOKING FOR HELP": "मदद की तलाश",
  "Great help for your everyday life.": "आपके दैनिक जीवन के लिए बेहतरीन सहायता।",
  "Great help for": "आपके दैनिक जीवन के लिए",
  "your everyday life.": "बेहतरीन सहायता।",
  "Find, compare and book ID-verified professionals near you with transparent upfront prices and payment protection.": "पारदर्शी अग्रिम कीमतों और भुगतान सुरक्षा के साथ अपने पास आईडी-सत्यापित पेशेवरों को खोजें, तुलना करें और बुक करें।",
  "Find & book trusted local pros": "भरोसेमंद स्थानीय पेशेवरों को खोजें और बुक करें",
  "Create your customer account to discover trusted local experts in moments.": "कुछ ही पलों में भरोसेमंद स्थानीय विशेषज्ञों को खोजने के लिए अपना ग्राहक खाता बनाएं।",
  "Welcome back.": "पुनः स्वागत है।",
  "Sign in to your customer account to manage service requests and bookings.": "सेवा अनुरोधों और बुकिंग का प्रबंधन करने के लिए अपने ग्राहक खाते में साइन इन करें।",
  "Government ID checked and skill-vetted professionals": "सरकारी आईडी जांची गई और कौशल-सत्यापित पेशेवर",
  "Zero hidden commissions, surge charges, or surprises": "शून्य छिपा हुआ कमीशन, सर्ज चार्ज या अप्रत्याशित शुल्क",
  "Pay After Completion": "काम पूरा होने के बाद भुगतान",
  "Escrow protection ensures quality work before payment releases": "एस्क्रो सुरक्षा भुगतान जारी होने से पहले गुणवत्तापूर्ण कार्य सुनिश्चित करती है",
  "WORK ON YOUR TERMS": "अपनी शर्तों पर काम करें",
  "Put your craft to work & earn more.": "अपने हुनर को काम पर लगाएं और अधिक कमाएं।",
  "Put your craft to work &": "अपने हुनर को काम पर लगाएं और",
  "earn more.": "अधिक कमाएं।",
  "Join over 3,200+ independent local pros. Keep 100% of your tips, enjoy daily direct payouts, and build a lasting business.": "3,200+ से अधिक स्वतंत्र स्थानीय पेशेवरों से जुड़ें। अपनी 100% टिप्स रखें, दैनिक सीधे भुगतान का आनंद लें और एक स्थायी व्यवसाय बनाएं।",
  "WORKER PARTNER PORTAL": "कारीगर पार्टनर पोर्टल",
  "Grow your business & receive gigs": "अपना व्यवसाय बढ़ाएं और काम प्राप्त करें",
  "Put your skills to work.": "अपने कौशल को काम पर लगाएं।",
  "Create your professional partner account and start receiving high-paying local gigs.": "अपना पेशेवर साथी खाता बनाएं और उच्च-भुगतान वाले स्थानीय काम प्राप्त करना शुरू करें।",
  "Sign in to your professional portal to view incoming requests and track your earnings.": "आने वाले अनुरोधों को देखने और अपनी कमाई को ट्रैक करने के लिए अपने पेशेवर पोर्टल में साइन इन करें।",
  "⚡ Same-Day Direct Payouts": "⚡ उसी दिन सीधा भुगतान",
  "Direct transfers to your bank account with zero delayed fees": "शून्य विलंबित शुल्क के साथ आपके बैंक खाते में सीधा स्थानांतरण",
  "✦ Keep 100% of Your Tips": "✦ अपनी 100% टिप्स अपने पास रखें",
  "Transparent earnings with absolute compensation fairness": "पूर्ण पारिश्रमिक निष्पक्षता के साथ पारदर्शी कमाई",
  "✓ Set Your Own Hours": "✓ अपना समय खुद तय करें",
  "Accept jobs in your neighborhood on full-time, part-time, or weekend basis": "फुल-टाइम, पार्ट-टाइम या वीकेंड के आधार पर अपने पड़ोस में काम स्वीकार करें",
  "WORKFORCE AT SCALE": "बड़े पैमाने पर कार्यबल",
  "Cooperative staffing for your enterprise.": "आपके उद्यम के लिए सहकारी स्टाफिंग।",
  "Cooperative staffing for": "आपके उद्यम के लिए",
  "your enterprise.": "सहकारी स्टाफिंग।",
  "Hire verified multi-worker teams for hotels, facilities, tech parks, and commercial spaces with guaranteed fair allocation and consolidated billing.": "गारंटीकृत निष्पक्ष आवंटन और समेकित बिलिंग के साथ होटल, सुविधाओं, टेक पार्कों और वाणिज्यिक स्थानों के लिए सत्यापित बहु-श्रमिक टीमों को किराए पर लें।",
  "BUSINESS & ENTERPRISE PORTAL": "बिजनेस और एंटरप्राइज पोर्टल",
  "Deploy reliable multi-worker teams": "विश्वसनीय बहु-श्रमिक टीमों को तैनात करें",
  "Post Open Pool Request": "ओपन पूल अनुरोध पोस्ट करें",
  "Post to Open Pro Pool": "ओपन प्रो पूल में पोस्ट करें",
  "🚀 Post to Open Pro Pool": "🚀 ओपन प्रो पूल में पोस्ट करें",
  "🌐 SevaSathi Open Pro Pool": "🌐 सेवासाथी ओपन प्रो पूल",
  "Broadcast to all capable available workers": "सभी सक्षम और उपलब्ध कर्मियों को प्रसारित",
  "Custom Open Request": "कस्टम ओपन अनुरोध",
  "Demanded Gig Service / Required Trade": "मांग की गई सेवा / आवश्यक कार्य",
  "Select required trade category...": "आवश्यक सेवा श्रेणी चुनें...",
  "Other Custom Trade (Specify below)": "अन्य कस्टम कार्य (नीचे विवरण दें)",
  "Type your demanded service (e.g. AC Repair, Sofa Upholstery, Math Tutor, Balcony Netting)": "अपनी आवश्यक सेवा लिखें (उदा. एसी रिपेयर, सोफा अपहोल्स्ट्री, मैथ्स ट्यूटर, बालकनी नेटिंग)",
  "Preferred Date": "पसंदीदा तारीख",
  "Preferred Time Slot": "पसंदीदा समय स्लॉट",
  "Flexible / Any Time": "लचीला समय / किसी भी समय",
  "06:00 AM – 09:00 AM (Early Morning)": "सुबह 06:00 – 09:00 (प्रातःकाल)",
  "09:00 AM – 12:00 PM (Morning)": "सुबह 09:00 – दोपहर 12:00 (सुबह)",
  "12:00 PM – 03:00 PM (Afternoon)": "दोपहर 12:00 – 03:00 (दोपहर)",
  "03:00 PM – 06:00 PM (Late Afternoon)": "दोपहर 03:00 – शाम 06:00 (अपराह्न)",
  "06:00 PM – 09:00 PM (Evening)": "शाम 06:00 – रात 09:00 (शाम)",
  "09:00 PM – 11:00 PM (Night)": "रात 09:00 – 11:00 (रात)",
  "Specific Time / Custom Hour (Specify below)": "विशिष्ट समय / कस्टम घंटा (नीचे निर्दिष्ट करें)",
  "e.g. 10:30 AM, 4:00 PM, Tomorrow 2 PM": "उदा. 10:30 AM, 4:00 PM, कल दोपहर 2 बजे",
  "Enter your specific preferred time (e.g. 10:30 AM, 4:00 PM)": "अपना विशिष्ट पसंदीदा समय दर्ज करें (उदा. 10:30 AM, 4:00 PM)",
  "Service Locality / Flat Address": "सेवा क्षेत्र / फ्लैट का पता",
  "Task Requirements & Instructions": "कार्य की आवश्यकताएं और निर्देश",
  "Polish Task with AI": "एआई से कार्य विवरण सुधारें",
  "✨ Polish Task with AI": "✨ एआई से कार्य विवरण सुधारें",
  "AI Thinking...": "एआई सोच रहा है...",
  "✦ AI Thinking...": "✦ एआई सोच रहा है...",
  "Describe the job in detail (e.g. Master bathroom sink drain clogged, leaking pipe under the cabinet)...": "काम का विस्तार से वर्णन करें (उदा. बाथरूम का सिंक जाम है, कैबिनेट के नीचे पाइप लीक हो रहा है)...",
  "Your Proposed Budget / Offer": "आपका प्रस्तावित बजट / प्रस्ताव",
  "(Two-way bargaining enabled)": "(दोतरफा बातचीत सक्षम)",
  "Enter any budget in ₹": "₹ में कोई भी बजट दर्ज करें",
  "Price & Timing Bargaining:": "मूल्य और समय पर बातचीत:",
  "You propose your initial budget here (enter any amount). The worker can accept directly or respond with an adjusted time or counter-offer for your approval!": "आप यहां अपना प्रारंभिक बजट प्रस्तावित करते हैं (कोई भी राशि दर्ज करें)। कर्मी इसे सीधे स्वीकार कर सकता है या आपकी मंजूरी के लिए संशोधित समय या जवाबी प्रस्ताव भेज सकता है!",
  "Confirm Appointment Request": "नियुक्ति अनुरोध की पुष्टि करें",
  "🚀 Confirm Appointment Request": "🚀 नियुक्ति अनुरोध की पुष्टि करें",
  "Sending Request...": "अनुरोध भेजा जा रहा है...",
  "⏳ Sending Request...": "⏳ अनुरोध भेजा जा रहा है...",
  "Appointment Request Sent!": "नियुक्ति अनुरोध भेजा गया!",
  "🌐 Open Pool Request Posted!": "🌐 ओपन पूल अनुरोध पोस्ट हो गया!",
  "Open Pool Request Posted!": "ओपन पूल अनुरोध पोस्ट हो गया!",
  "View My Bookings & Negotiations": "मेरी बुकिंग और बातचीत देखें",
  "📅 View My Bookings & Negotiations": "📅 मेरी बुकिंग और बातचीत देखें",
  "View Appointments & Matching Specialists": "नियुक्तियां और मेल खाने वाले विशेषज्ञ देखें",
  "📦 View Appointments & Matching Specialists": "📦 नियुक्तियां और मेल खाने वाले विशेषज्ञ देखें",
  "Done": "पूर्ण",
  "Back to specialist list": "विशेषज्ञों की सूची पर वापस जाएं",
  "← Back to specialist list": "← विशेषज्ञों की सूची पर वापस जाएं",
  "Please fill in your address and task instructions.": "कृपया अपना पता और कार्य निर्देश भरें।",
  "Please write a brief summary of your task first!": "कृपया पहले अपने कार्य का संक्षिप्त विवरण लिखें!",
  "Job scope polished with AI!": "एआई के साथ कार्य विवरण को बेहतर बनाया गया!",
  "✨ Job scope polished with AI!": "✨ एआई के साथ कार्य विवरण को बेहतर बनाया गया!",
  "Enter Custom Job Needs →": "कस्टम कार्य की ज़रूरतें दर्ज करें →",
  "Awaiting Specialist Claim (Open Pool)": "विशेषज्ञ स्वीकृति की प्रतीक्षा (ओपन पूल)",
  "Open Pro Pool Request:": "ओपन प्रो पूल अनुरोध:",
  "open pool": "ओपन पूल",
  "paid & scheduled": "भुगतान किया और निर्धारित",
  "Request Specialist Directly": "विशेषज्ञ से सीधे अनुरोध करें",
  "⚡ Request Specialist Directly": "⚡ विशेषज्ञ से सीधे अनुरोध करें",
  "Broadcasting to Cooperative": "सहकारी समुदाय को प्रसारित",
  "Broadcasting in": "प्रसारित हो रहा है",
  "Custom Pool Request Created!": "कस्टम पूल अनुरोध बनाया गया!",
  "No immediate specialized worker was free for": "इस समय तुरंत कोई विशेषज्ञ कर्मी उपलब्ध नहीं था",
  "in your immediate vicinity, so we created an open cooperative job pool.": "आपके निकटतम क्षेत्र में, इसलिए हमने एक ओपन सहकारी कार्य पूल बना दिया है।",
  "Requested Service:": "अनुरोधित सेवा:",
  "Custom Service": "कस्टम सेवा",
  "Pool Status:": "पूल स्थिति:",
  "Location:": "स्थान:",
  "Your Registered Location": "आपका पंजीकृत स्थान",
  "Listen Again": "पुनः सुनें",
  "🔊 Listen Again": "🔊 फिर से सुनें",
  "📢 Request Custom Service / Post to Open Pro Pool": "📢 कस्टम सेवा का अनुरोध करें / ओपन प्रो पूल में पोस्ट करें",
  "Request Custom Service / Post to Open Pro Pool": "कस्टम सेवा का अनुरोध करें / ओपन प्रो पूल में पोस्ट करें",
  "⚡ Post Request to Open Gig Pool": "⚡ ओपन गिग पूल में अनुरोध पोस्ट करें",
  "Post Request to Open Gig Pool": "ओपन गिग पूल में अनुरोध पोस्ट करें",
  "📢 Post Request to Open Gig Pool": "📢 ओपन गिग पूल में अनुरोध पोस्ट करें",
  "Pet Care & Dog Walking": "पालतू जानवरों की देखभाल और वॉक",
  "Don’t worry! You can book cross-trained verified pros in": "चिंता न करें! आप सत्यापित पेशेवरों को बुक कर सकते हैं",
  "below or post your request to our open gig pool.": "नीचे या अपने अनुरोध को हमारे ओपन गिग पूल में पोस्ट कर सकते हैं।",
  "Specify Your Location": "अपना स्थान निर्दिष्ट करें",
  "Search city or locality…": "शहर या इलाका खोजें…",
  "Available Cities": "उपलब्ध शहर",
  "Use current location (GPS)": "वर्तमान स्थान का उपयोग करें (जीपीएस)",
  "Use Current Location (GPS / Google Maps)": "वर्तमान स्थान का उपयोग करें (जीपीएस / गूगल मैप्स)",
  "Before looking for specialists or booking services, please specify your location. We match you strictly with verified local specialists in your city.": "विशेषज्ञों को खोजने या सेवाएं बुक करने से पहले, कृपया अपना स्थान निर्दिष्ट करें। हम आपको केवल आपके शहर के सत्यापित स्थानीय विशेषज्ञों से जोड़ते हैं।",
  "Or select your city": "या अपना शहर चुनें",
  "Search street, locality or other city…": "सड़क, इलाका या अन्य शहर खोजें…",
  "📍 Service Area Setup": "📍 सेवा क्षेत्र सेटअप",
  "Where are you located?": "आप कहाँ स्थित हैं?",
  "To connect you with verified specialists and real-time localized pricing, please confirm your current location.": "आपको सत्यापित विशेषज्ञों और वास्तविक समय की स्थानीय कीमतों से जोड़ने के लिए, कृपया अपने वर्तमान स्थान की पुष्टि करें।",
  "Detect My Current Location (GPS / Map API)": "मेरा वर्तमान स्थान खोजें (जीपीएस / मैप)",
  "Or search locality / select city": "या इलाका खोजें / शहर चुनें",
  "Search area, landmark or street (e.g. Koramangala)...": "इलाका, लैंडमार्क या सड़क खोजें (उदा. कोरमंगला)...",
  "Popular Cities": "लोकप्रिय शहर",
  "Results and prices will immediately update according to workers available in your selected location.": "आपके चुने हुए स्थान पर उपलब्ध कर्मियों के अनुसार परिणाम और कीमतें तुरंत अपडेट हो जाएंगी।",
  "⚡ Results and prices will immediately update according to workers available in your selected location.": "⚡ आपके चुने हुए स्थान पर उपलब्ध कर्मियों के अनुसार परिणाम और कीमतें तुरंत अपडेट हो जाएंगी।",
  "Verified Service Specialists": "सत्यापित सेवा विशेषज्ञ",
  "Verified background-checked specialists serving": "सत्यापित और पृष्ठभूमि-जांच किए गए विशेषज्ञ जो सेवा दे रहे हैं",
  "🛡️ SevaSathi Guarantee": "🛡️ सेवासाथी गारंटी",
  "Standard Visit": "मानक विज़िट",
  "Visit Base": "विज़िट आधार शुल्क",
  "📅 Book Appointment": "📅 अपॉइंटमेंट बुक करें",
  "Book Appointment": "अपॉइंटमेंट बुक करें",
  "Finding verified specialists in your city...": "आपके शहर में सत्यापित विशेषज्ञ खोजे जा रहे हैं...",
  "Unable to connect to worker directory.": "कर्मचारी निर्देशिका से कनेक्ट करने में असमर्थ।",
  "Retry": "पुनः प्रयास करें",
  "Cross-Trained & Similar Available Pros": "अन्य प्रशिक्षित व समान उपलब्ध पेशेवर",
  "Post your requirement to all qualified workers in your area. Available pros with open schedules will review your task, accept, or offer bargain timings & prices!": "अपनी आवश्यकता अपने क्षेत्र के सभी योग्य कर्मियों को भेजें। उपलब्ध पेशेवर आपके कार्य की समीक्षा करेंगे, स्वीकार करेंगे या बातचीत का समय व मूल्य प्रस्तावित करेंगे!",
  "Partner Workspace & Gigs": "पार्टनर कार्यक्षेत्र और काम",
  "Daily Payouts & Tips (100%)": "दैनिक भुगतान और टिप्स (100%)",
  "Partner Code & Escrow": "पार्टनर आचार संहिता और एस्क्रो",
  "Explore All Services": "सभी सेवाएं देखें",
  "How SevaSathi Works & Safety": "सेवासाथी कैसे काम करता है और सुरक्षा",
  "🛠️ Pro Partner": "🛠️ प्रो पार्टनर",
  "My Appointments & Bargains": "मेरी नियुक्तियां और बातचीत",
  "Loading your appointments & live bargains...": "आपकी नियुक्तियां और चल रही बातचीत लोड हो रही है...",
  "Please sign in to view your appointments.": "अपनी नियुक्तियां देखने के लिए कृपया साइन इन करें।",
  "No Active Appointments Yet": "अभी कोई सक्रिय नियुक्ति नहीं है",
  "Choose any service card from our directory to find verified workers and schedule your first visit!": "सत्यापित कर्मियों को खोजने और अपनी पहली विज़िट तय करने के लिए हमारी निर्देशिका से कोई भी सेवा कार्ड चुनें!",
  "Explore Services": "सेवाएं देखें",
  "Worker Accepted Your Task!": "कर्मचारी ने आपका कार्य स्वीकार कर लिया!",
  "Specialist accepted your terms. Complete payment to secure funds in escrow.": "विशेषज्ञ ने आपकी शर्तें स्वीकार कर ली हैं। एस्क्रो में धनराशि सुरक्षित करने के लिए भुगतान पूरा करें।",
  "Specialist is scheduled. Escrow funds will release upon task completion.": "विशेषज्ञ तय हो चुका है। कार्य पूरा होने पर एस्क्रो फंड जारी किए जाएंगे।",
  "Task Successfully Completed by": "कार्य सफलतापूर्वक संपन्न किया गया द्वारा:",
  "Rate Specialist & Leave Review": "विशेषज्ञ को रेटिंग दें और समीक्षा लिखें",
  "Submit Rating & Review": "रेटिंग और समीक्षा सबमिट करें",
  "Customer Rating Dismissed by Admin": "व्यवस्थापक द्वारा ग्राहक रेटिंग निरस्त कर दी गई",
  "File a Dispute / Request Refund": "विवाद दर्ज करें / रिफंड का अनुरोध करें",
  "Report an issue with this service": "इस सेवा से संबंधित किसी समस्या की रिपोर्ट करें",
  "Customer Proposed Counter-Terms:": "ग्राहक ने जवाबी शर्तें प्रस्तावित कीं:",
  "Worker Proposed Adjustment:": "कर्मचारी ने समायोजन प्रस्तावित किया:",
  "Accept Adjusted Terms": "समायोजित शर्तें स्वीकार करें",
  "Decline & Cancel": "अस्वीकार करें और रद्द करें",
  "Propose New Counter-Offer": "नया जवाबी प्रस्ताव दें",
  "Cancel Appointment": "अपॉइंटमेंट रद्द करें",
  "Select stars (1–5) and share a few words about your experience (optional):": "स्टार (1–5) चुनें और अपने अनुभव के बारे में कुछ शब्द साझा करें (वैकल्पिक):",
  "Have an issue or dispute with this completed task?": "क्या इस पूर्ण किए गए कार्य में कोई समस्या या विवाद है?",
  "Issue Category": "मुद्दे की श्रेणी",
  "Work Incomplete / Poor Quality": "कार्य अधूरा / खराब गुणवत्ता",
  "Property Damage / Loss": "संपत्ति की क्षति / नुकसान",
  "Overcharging / Extra Cash Demanded": "अत्यधिक शुल्क / अतिरिक्त नकद की मांग",
  "Unprofessional / Inappropriate Conduct": "अव्यवसायिक / अनुचित आचरण",
  "Delayed Arrival / Left Early": "देर से आगमन / जल्दी चले जाना",
  "Other Service Dispute": "अन्य सेवा विवाद",
  "Desired Settlement": "वांछित समाधान",
  "Full Escrow Refund": "पूर्ण एस्क्रो रिफंड",
  "Partial Escrow Refund": "आंशिक एस्क्रो रिफंड",
  "Free Re-work / Rectification": "मुफ्त पुन: कार्य / सुधार",
  "Account Warning to Specialist": "विशेषज्ञ को खाता चेतावनी",
  "Description of the issue": "मुद्दे का विवरण",
  "Submit Ticket to Admin": "व्यवस्थापक को टिकट सबमिट करें",
  "Cancel Ticket": "टिकट रद्द करें",
  "Secure SevaSathi Escrow Checkout": "सुरक्षित सेवासाथी एस्क्रो चेकआउट",
  "Service Task": "सेवा कार्य",
  "Specialist:": "विशेषज्ञ:",
  "Amount Due": "देय राशि",
  "Select Payment Method:": "भुगतान विधि चुनें:",
  "Instant UPI (PhonePe / GPay / Paytm)": "त्वरित यूपीआई (फोनपे / जीपे / पेटीएम)",
  "Instant escrow deposit (0% fee)": "त्वरित एस्क्रो जमा (0% शुल्क)",
  "Debit / Credit Card (•••• 4242)": "डेबिट / क्रेडिट कार्ड (•••• 4242)",
  "Visa, Mastercard, RuPay": "वीज़ा, मास्टरकार्ड, रुपे",
  "Net Banking (HDFC / SBI / ICICI)": "नेट बैंकिंग (HDFC / SBI / ICICI)",
  "Direct Escrow Wire": "सीधा एस्क्रो वायर ट्रांसफर",
  "SevaSathi 100% Escrow Guarantee:": "सेवासाथी 100% एस्क्रो गारंटी:",
  "Your payment is held safely in escrow. The specialist cannot claim payout until the task is successfully performed and marked completed.": "आपका भुगतान एस्क्रो में सुरक्षित रखा जाता है। जब तक कार्य सफलतापूर्वक पूरा नहीं हो जाता, विशेषज्ञ भुगतान का दावा नहीं कर सकता।",
  "APPLICATION UNDER REVIEW": "आवेदन समीक्षाधीन है",
  "No Pending Requests in Your Trade Yet": "आपके पेशे में अभी कोई लंबित अनुरोध नहीं है",
  "Customer Instructions:": "ग्राहक के निर्देश:",
  "Your Counter Price (₹)": "आपकी जवाबी कीमत (₹)",
  "Adjusted Time Slot": "समायोजित समय स्लॉट",
  "Note to Customer (Reason/Materials)": "ग्राहक को नोट (कारण/सामग्री)",
  "Send Counter-Offer": "जवाबी प्रस्ताव भेजें",
  "Accept Task": "कार्य स्वीकार करें",
  "Decline": "अस्वीकार करें",
  "Mark Work Completed": "कार्य पूर्ण चिह्नित करें",
  "No Completed Jobs Yet": "अभी कोई पूर्ण कार्य नहीं है",
  "No Open Commercial Requisitions in Your Trade": "आपके पेशे में कोई खुली वाणिज्यिक मांग नहीं है",
  "Tutoring": "ट्यूशन",
  "Book tutoring": "ट्यूशन बुक करें",
  "View tutoring": "ट्यूशन देखें",
  "Describe what you need — “a leaking tap”, “help moving”, “home tutor”": "अपनी आवश्यकता बताएं — “नल लीक”, “सामान शिफ्टिंग”, “होम ट्यूटर”",
  "“Found a brilliant tutor for my daughter in one evening. Her grades improved immediately.”": "“मेरी बेटी के लिए एक ही शाम में एक शानदार शिक्षक मिल गया। उसके अंकों में तुरंत सुधार हुआ।”",
  "Specify your trade (e.g. Master Carpenter, Academic Tutoring, AC Tech)": "अपना ट्रेड बताएं (उदा. मास्टर बढ़ई, शैक्षणिक ट्यूशन, एसी तकनीशियन)",
  "Type your demanded service (e.g. AC Repair, Sofa Upholstery, Tutor, Balcony Netting)": "अपनी आवश्यक सेवा लिखें (उदा. एसी रिपेयर, सोफा अपहोल्स्ट्री, ट्यूटर, बालकनी नेटिंग)",
  "Class 9–12 CBSE/ICSE Tutoring": "कक्षा 9–12 सीबीएसई/आईसीएसई ट्यूशन",
  "Which city or area do you need this service in?": "कृपया बताएं कि आपको किस शहर या इलाके में यह सेवा चाहिए?",
  "We found verified specialists for you:": "हमें आपके लिए सत्यापित विशेषज्ञ मिले:",
  "📋 Custom Gig Requirement Details (5 of 5 needed)": "📋 कस्टम गिग आवश्यकता विवरण (5 में से 5 आवश्यक)",
  "1. Service / Trade": "1. सेवा / कार्य",
  "2. Service Location": "2. सेवा का स्थान",
  "3. Scheduled Date": "3. निर्धारित तिथि",
  "4. Preferred Time Window": "4. पसंदीदा समय",
  "5. Proposed Budget / Rate": "5. प्रस्तावित बजट / दर",
  "✓ Not specified": "⏳ निर्दिष्ट नहीं है",
  "⏳ Not specified": "⏳ निर्दिष्ट नहीं है",
  "⏳ Missing": "⏳ स्थान की आवश्यकता है",
  "⏳ Pending": "⏳ लंबित",
  "✅ All 5 Requirements Gathered": "✅ सभी 5 आवश्यकताएं एकत्र की गईं",
  "Service:": "सेवा:",
  "Date:": "तारीख:",
  "Time:": "समय:",
  "Offer Rate:": "प्रस्तावित दर:",
  "🚀 Post Request to Open Gig Pool Now": "🚀 ओपन गिग पूल में अनुरोध पोस्ट करें",
  "📋 View My Bookings & Negotiations": "📋 मेरी बुकिंग और बातचीत देखें",
  "Starting from ₹": "शुरुआती दर ₹",
  "SevaSathi AI Voice & Text Assistant": "सेवासाथी एआई वॉयस और टेक्स्ट सहायक",
  "Speak or reply in English, हिन्दी, or বাংলা...": "अंग्रेजी, हिन्दी या বাংলা में बोलें या टाइप करें..."
},
    bn: {
  "Now serving 12 cities": "এখন ১২টি শহরে উপলব্ধ",
  "Verified professionals, right around the corner": "যাচাইকৃত দক্ষ কর্মী, ঠিক আপনার বাড়ির কাছে",
  "Choose location": "অবস্থান নির্বাচন করুন",
  "Search cleaners, tutors, movers...": "ক্লিনার, গৃহশিক্ষক, ইলেকট্রিশিয়ান খুঁজুন...",
  "Cooperative": "সমবায় সংস্থা",
  "📅 My Bookings": "📅 আমার বুকিং",
  "Sign in or register": "সাইন ইন বা রেজিস্টার করুন",
  "Sign In": "লগ ইন করুন",
  "Log Out": "লগ আউট",
  "Log out": "লগ আউট",
  "Sign Out": "সাইন আউট",
  "Browse Services": "পরিষেবা দেখুন",
  "My Requests & Workspace": "আমার অনুরোধ ও ওয়ার্কস্পেস",
  "SevaSathi Protection & Escrow": "সেবা সাথী সুরক্ষা ও এসক্রো",
  "👤 Verified Customer": "👤 যাচাইকৃত গ্রাহক",
  "👷 Verified Partner": "👷 যাচাইকৃত পার্টনার",
  "🏢 Commercial Partner": "🏢 বাণিজ্যিক অংশীদার",
  "GIG PARTNER HUB": "গিগ পার্টনার হাব",
  "VERIFIED CUSTOMER PORTAL": "যাচাইকৃত গ্রাহক পোর্টাল",
  "Enterprise Workforce": "এন্টারপ্রাইজ ওয়ার্কফোর্স",
  "Online · Accepting Gigs": "অনলাইন · কাজ গ্রহণ করছেন",
  "Trade Specialist": "পেশা বিশেষজ্ঞ",
  "Worker Partner": "কর্মী পার্টনার",
  "ON-DEMAND, DONE RIGHT": "চাহিদা অনুযায়ী সেবা, সঠিক নিয়মে",
  "Make more time for": "নিজের জীবনের জন্য",
  "your life.": "সময় বাঁচান।",
  "Make more time for your life.": "নিজের জীবনের জন্য সময় বাঁচান।",
  "Whatever needs doing, find a trusted local person who can make it happen today.": "যে কোনো কাজের জন্য একজন বিশ্বস্ত স্থানীয় দক্ষ মানুষ পান, যিনি আজকেই কাজ শেষ করবেন।",
  "Explore services": "পরিষেবা দেখুন",
  "Post a request": "অনুরোধ জানান",
  "I want to work": "আমি কাজ করতে চাই",
  "4.9/5 from 12,000+ users": "১২,০০০+ ব্যবহারকারীর ৪.৯/৫ রেটিং",
  "who got their weekends back": "যাঁরা ছুটি উপভোগ করতে পেরেছেন",
  "Trusted": "বিশ্বস্ত",
  "pros nearby": "কাছের দক্ষ কর্মী",
  "average rating": "গড় রেটিং",
  "GIG OF THE DAY": "আজকের সেরা কাজ",
  "Get it done. Feel lighter.": "কাজ শেষ, মন হালকা।",
  "BROWSE BY NEED": "প্রয়োজন অনুযায়ী খুঁজুন",
  "What can we help with?": "কী কাজে আমরা সাহায্য করতে পারি?",
  "See all services": "সব পরিষেবা দেখুন",
  "Describe what you need — “a leaking tap”, “help moving”, “maths tutor”": "কী কাজ প্রয়োজন লিখুন — “পানির কল লিক”, “বাসা বদল”, “অঙ্কের টিউটর”",
  "Home care": "গৃহস্থালির যত্ন",
  "Cleaning & repairs": "পরিচ্ছন্নতা ও মেরামত",
  "Beauty & wellness": "সৌন্দর্য ও সুস্থতা",
  "Feel-good care": "আরামদায়ক পরিচর্যা",
  "Lessons & skills": "শিক্ষা ও প্রশিক্ষণ",
  "Learn from experts": "অভিজ্ঞদের কাছে শিখুন",
  "Tech support": "প্রযুক্তিগত সহায়তা",
  "Devices & Wi-Fi": "ডিভাইস ও ওয়াই-ফাই",
  "Events & errands": "অনুষ্ঠান ও ফাই-ফরমাশ",
  "Help on the go": "প্রয়োজনীয় সহায়তা",
  "Moving & delivery": "শিফটিং ও ডেলিভারি",
  "Shift with ease": "সহজে জিনিসপত্র স্থানান্তর",
  "EVERYDAY HELP": "প্রতিদিনের সহায়তা",
  "Services we offer": "আমাদের মূল পরিষেবা",
  "Great local help for life's little and big jobs.": "জীবনের ছোট-বড় সব কাজের জন্য স্থানীয় সেরা সাহায্য।",
  "AVAILABLE TODAY": "আজই উপলব্ধ",
  "TOP RATED": "শীর্ষ রেটেড",
  "FLEXIBLE TIMINGS": "নমনীয় সময়",
  "EXPERT PROS": "দক্ষ পেশাদার",
  "POPULAR": "জনপ্রিয়",
  "CERTIFIED": "প্রত্যয়িত",
  "DOORSTEP": "দোরগোড়ায় সেবা",
  "SAFE & HERBAL": "নিরাপদ ও ভেষজ",
  "VERIFIED CARE": "যাচাইকৃত যত্ন",
  "HOME CARE": "গৃহ পরিচর্যা",
  "WELLNESS": "স্বাস্থ্য ও সুস্থতা",
  "LEARN": "শিক্ষা",
  "APPLIANCES": "যন্ত্রপাতি",
  "PAINTING": "রং ও পেইন্টিং",
  "FITNESS": "ফিটনেস",
  "AUTO CARE": "গাড়ির যত্ন",
  "HOME SAFETY": "গৃহ নিরাপত্তা",
  "ASSISTANCE": "সহায়তা",
  "Deep home cleaning": "বাড়ির গভীর পরিচ্ছন্নতা",
  "Kitchen, bath & living spaces": "রান্নাঘর, বাথরুম ও লিভিং স্পেস",
  "At-home spa therapy": "বাড়িতে স্পা থেরাপি",
  "Relaxation without the commute": "যাতায়াতের ঝামেলাহীন প্রশান্তি",
  "Maths tutoring": "গণিত টিউশন",
  "For grades 6–12, at your place": "৬–১২ ক্লাসের জন্য, আপনার বাড়িতে",
  "Appliance care & repair": "যন্ত্রপাতির যত্ন ও মেরামত",
  "AC, fridge & washing machines": "এসি, ফ্রিজ ও ওয়াশিং মেশিন",
  "Painting & waterproofing": "রং করা ও ওয়াটারপ্রুফিং",
  "Flawless coats & damp solutions": "নিখুঁত কোটিং ও স্যাঁতসেঁতে ভাব দূরীকরণ",
  "Fitness & yoga coaching": "ফিটনেস ও যোগাসন প্রশিক্ষণ",
  "Personal training at your home": "আপনার বাড়িতে व्यक्तिगत প্রশিক্ষণ",
  "Car detailing & eco wash": "গাড়ির ডিটেইলিং ও ইকো ওয়াশ",
  "Interior deep clean & exterior polish": "ভেতরের গভীর পরিচ্ছন্নতা ও বাইরের পলিশ",
  "Pest control & sanitization": "কীটপতঙ্গ নিয়ন্ত্রণ ও জীবাণুমুক্তকরণ",
  "Odorless, pet-safe treatments": "গন্ধহীন, পোষা-বান্ধব ট্রিটমেন্ট",
  "Senior care & assistance": "প্রবীণদের যত্ন ও সহায়তা",
  "Gentle support & daily errands": "মমতাময়ী সেবা ও প্রাত্যহিক কাজ",
  "View more services": "আরও পরিষেবা দেখুন",
  "From ₹699": "₹৬৯৯ থেকে",
  "From ₹1,099": "₹১,০৯৯ থেকে",
  "From ₹1499/month": "₹১,৪৯৯/মাস থেকে",
  "From ₹399": "₹৩৯৯ থেকে",
  "From ₹999": "₹৯৯৯ থেকে",
  "From ₹799/session": "₹৭৯৯/সেশন থেকে",
  "From ₹449": "₹৪৪৯ থেকে",
  "From ₹549": "₹৫৪৯ থেকে",
  "From ₹349/hr": "₹৩৪৯/ঘণ্টা থেকে",
  "WORK ON YOUR OWN TERMS": "নিজের শর্তে কাজ করুন",
  "Want to start as a": "শুরু করতে চান একজন",
  "Gig Worker?": "গিগ কর্মী হিসেবে?",
  "Join our platform, start earning effortlessly, and build your career on your own terms.": "আমাদের প্ল্যাটফর্মে যোগ দিন, সহজে উপার্জন শুরু করুন এবং নিজের শর্তে ক্যারিয়ার গড়ুন।",
  "Keep 100% of your tips": "আপনার ১০০% টিপস নিজেই রাখুন",
  "Transparent pricing & same-day payouts": "স্বচ্ছ মূল্য এবং একই দিনে পেমেন্ট",
  "Work near your home": "নিজের বাড়ির কাছে কাজ করুন",
  "Choose gigs in your preferred localities": "আপনার পছন্দের এলাকায় কাজ বেছে নিন",
  "Set your own schedule": "নিজের সময়সূচি নিজেই নির্ধারণ করুন",
  "Full-time, weekends or part-time hours": "ফুল-টাইম, উইকেন্ড বা পার্ট-টাইম সময়",
  "United Gig Community": "একত্রিত গিগ কমিউনিটি",
  "100% ID Verified & Protected": "১০০% আইডি যাচাইকৃত ও সুরক্ষিত",
  "EARNINGS & COOPERATION": "উপার্জন ও সহযোগিতা",
  "100% Tips Kept": "১০০% টিপস আপনার",
  "/ month (transparent earnings & direct payouts)": "/ মাস (স্বচ্ছ উপার্জন এবং সরাসরি পেমেন্ট)",
  "Direct bank payouts": "সরাসরি ব্যাংক অ্যাকাউন্টে পেমেন্ট",
  "Worker trust & satisfaction": "কর্মীদের আস্থা ও সন্তুষ্টি",
  "growing together in mutual trust": "পারস্পরিক বিশ্বাসে একসাথে এগিয়ে চলেছেন",
  "YOUR REQUEST, YOUR WAY": "আপনার অনুরোধ, আপনার সুবিধা",
  "Need something": "নির্দিষ্ট কিছু",
  "specific?": "প্রয়োজন?",
  "Need something specific?": "নির্দিষ্ট কিছু প্রয়োজন?",
  "Tell us what you need and your ideal budget. Verified local pros will reply to your request.": "আপনার কাজ এবং বাজেট জানান। যাচাইকৃত স্থানীয় কর্মীরা অবিলম্বে যোগাযোগ করবেন।",
  "Tell us what you need and your ideal budget. Great local people will come to you.": "আপনার কী প্রয়োজন এবং বাজেট কত তা জানান। দক্ষ স্থানীয় পেশাদাররা সরাসরি আপনার সাথে যোগাযোগ করবেন।",
  "Request a gig": "কাজের অনুরোধ করুন",
  "ACTIVE REQUEST": "সক্রিয় অনুরোধ",
  "NEW REQUEST": "নতুন অনুরোধ",
  "Help me move this Saturday": "এই শনিবারে বাড়ি শিফটিংয়ে সাহায্য চাই",
  "Help me move": "শিফটিংয়ে সাহায্য",
  "this Saturday": "এই শনিবার",
  "3 pros are interested": "৩ জন কর্মী আগ্রহী",
  "THE SEVASATHI PROMISE": "সেবাসাথীর প্রতিশ্রুতি",
  "Good people. Great work. No guesswork.": "ভালো মানুষ। নিখুঁত কাজ। কোনো অনিশ্চয়তা নেই।",
  "ID-verified professionals": "পরিচয়-যাচাইকৃত পেশাদার",
  "Transparent, upfront prices": "স্বচ্ছ ও অগ্রিম মূল্য",
  "Escrow-protected payments": "এসক্রো দ্বারা শতভাগ নিরাপদ পেমেন্ট",
  "Support when you need it": "প্রয়োজনে সর্বদা সহায়তা",
  "How we keep you safe": "আমরা কীভাবে আপনার সুরক্ষা নিশ্চিত করি",
  "LOVED LOCALLY": "স্থানীয় মানুষের পছন্দ",
  "Real people, lighter days": "আসল মানুষ, সহজ জীবন",
  "MEET OUR EXPERTS": "আমাদের বিশেষজ্ঞদের সাথে পরিচিত হন",
  "People who love what they do": "যাঁরা নিজেদের কাজকে ভালোবাসেন",
  "Browse professionals": "পেশাদারদের দেখুন",
  "Verified Customer": "যাচাইকৃত গ্রাহক",
  "Verified Partner": "যাচাইকৃত অংশীদার",
  "More life, less to-do.": "জীবনের জন্য বেশি সময়, কম কাজের ঝামেলা।",
  "GET LOCAL HELP, FAST": "দ্রুত স্থানীয় সহায়তা পান",
  "Ready to cross something off?": "কোনো কাজ শেষ করার জন্য প্রস্তুত?",
  "Find an expert": "পেশাদার খুঁজুন",
  "Discover": "আবিষ্কার করুন",
  "All services": "সমস্ত পরিষেবা",
  "Become a worker": "কর্মী হিসেবে যোগ দিন",
  "For businesses": "ব্যবসার জন্য",
  "SevaSathi": "সেবাসাথী",
  "How it works": "কীভাবে কাজ করে",
  "Trust & safety": "আস্থা ও নিরাপত্তা",
  "Support": "সহায়তা",
  "Contact us": "যোগাযোগ করুন",
  "Help centre": "সহায়তা কেন্দ্র",
  "Cities": "শহরসমূহ",
  "FOLLOW ALONG": "সাথে থাকুন",
  "Home": "হোম",
  "Explore": "অন্বেষণ করুন",
  "Profile": "প্রোফাইল",
  "CHOOSE YOUR PORTAL": "আপনার পোর্টাল বেছে নিন",
  "Good work starts with the right": "সঠিক পথেই ভালো",
  "path.": "কাজের সূচনা।",
  "Good work starts with the right path.": "সঠিক পথেই ভালো কাজের সূচনা।",
  "Choose whether you want to book reliable local services or offer your specialized skills and earn on your schedule.": "বেছে নিন আপনি নির্ভরযোগ্য স্থানীয় সেবা নিতে চান নাকি নিজের দক্ষতায় সুবিধাজনক সময়ে উপার্জন করতে চান।",
  "I'm looking for help": "আমি সেবা খুঁজছি",
  "CUSTOMER": "গ্রাহক",
  "Book trusted, verified local services & experts": "বিশ্বস্ত ও যাচাইকৃত স্থানীয় সেবা ও বিশেষজ্ঞ বুক করুন",
  "I want to offer my services": "আমি কাজ করতে চাই",
  "GIG WORKER": "গিগ কর্মী",
  "Earn flexibly, choose your hours, get paid fast": "সুবিধামতো আয় করুন, দ্রুত পারিশ্রমিক পান",
  "I represent a business / enterprise": "আমি একটি বাণিজ্যিক প্রতিষ্ঠান",
  "BUSINESS": "ব্যবসা",
  "Hire multi-worker squads, staff events, manage facility workforce": "একসাথে একাধিক কর্মী নিয়োগ করুন, ইভেন্ট পরিচালনা করুন",
  "Back to Marketplace": "মার্কেটপ্লেসে ফিরে যান",
  "Sign In to Your Account": "অ্যাকাউন্টে সাইন ইন করুন",
  "Email address": "ইমেল ঠিকানা",
  "Password": "পাসওয়ার্ড",
  "Full name": "সম্পূর্ণ নাম",
  "Phone number": "ফোন নম্বর",
  "Remember me": "আমাকে মনে রাখুন",
  "Forgot password?": "পাসওয়ার্ড ভুলে গেছেন?",
  "Don't have an account?": "অ্যাকাউন্ট নেই?",
  "Register here": "এখানে রেজিস্টার করুন",
  "Already have an account?": "ইতিমধ্যে অ্যাকাউন্ট আছে?",
  "Sign In here": "এখানে লগ ইন করুন",
  "Organization Name": "প্রতিষ্ঠানের নাম",
  "Business Type": "ব্যবসার প্রকার",
  "Contact Person": "যোগাযোগকারী ব্যক্তি",
  "Operating Address": "অফিসের ঠিকানা",
  "AI ASSISTANT": "এআই সহকারী",
  "SevaSathi AI Assistant": "সেবা সাথী এআই সহকারী",
  "Online • Multi-lingual": "অনলাইন • বহুভাষী",
  "Online • Gemini Intelligence": "অনলাইন • জেমিনি বুদ্ধিমত্তা",
  "Click to speak (Voice Recognition)": "কথা বলতে ক্লিক করুন (ভয়েস ইনপুট)",
  "Submit Request": "অনুরোধ জমা দিন",
  "🗣️ Speaks & understands Hindi, Bangla & English": "🗣️ হিন্দি, বাংলা ও ইংরেজি বোঝে এবং কথা বলে",
  "⚡ Instant worker matching or open pool creation": "⚡ তাৎক্ষণিক কর্মী ম্যাচিং বা ওপেন পুল তৈরি",
  "Speak or type what you need... e.g. '3 AC servicing workers tomorrow in Salt Lake' or 'প্লাম্বার লাগবে'": "বলুন বা লিখুন... যেমন 'কাল সকালে বাথরুমের পাইপ সারাতে লোক লাগবে' বা 'ঘর পরিষ্কার করাতে চাই'",
  "Terms & Conditions & How SevaSathi Works": "শর্তাবলী এবং সেবা সাথী কীভাবে কাজ করে",
  "How SevaSathi Works": "সেবা সাথী কীভাবে কাজ করে",
  "Back": "ফিরে যান",
  "I Understand / OK": "আমি বুঝেছি / ঠিক আছে",
  "Admin Password": "Admin পাসওয়ার্ড",
  "Authentication — SevaSathi": "অথেন্টিকেশন — সেবাসাথী",
  "Business / Organization Name": "Business / প্রতিষ্ঠানের নাম",
  "By continuing, you agree to SevaSathi's": "By continuing, you agree to সেবা সাথী's",
  "By utilizing the SevaSathi platform as a customer or gig professional, you confirm alignment with our community standards and service terms.": "গ্রাহক বা গিগ কর্মী হিসেবে সেবাসাথী ব্যবহার করে, আপনি আমাদের সম্প্রদায়ের মানদণ্ড এবং পরিষেবার শর্তাবলীর সাথে সম্মতি নিশ্চিত করেন।",
  "CUSTOMER PORTAL": "গ্রাহক পোর্টাল",
  "Commercial & Cooperative Opportunities (Hotels & Enterprises)": "বাণিজ্যিক ও সমবায় সুযোগ (হোটেল ও উদ্যোগ)",
  "Contact Person Name": "যোগাযোগকারী ব্যক্তি Name",
  "Cooperative minimum wage standards apply": "সমবায় সংস্থা minimum wage standards apply",
  "Customer Dashboard — SevaSathi Marketplace": "Customer Dashboard — সেবা সাথী Marketplace",
  "Customer Profile": "Customer প্রোফাইল",
  "Deep Home & Kitchen Cleaning": "বাড়ি ও রান্নাঘরের গভীর পরিচ্ছন্নতা",
  "Device & Tech Support": "ডিভাইস ও প্রযুক্তি সহায়তা",
  "Discover or Describe Your Need": "আপনার প্রয়োজন খুঁজুন বা বর্ণনা করুন",
  "Enterprise Business Portal — SevaSathi": "Enterprise Business Portal — সেবা সাথী",
  "Enterprise Workforce Dashboard": "এন্টারপ্রাইজ ওয়ার্কফোর্স Dashboard",
  "Every gig worker on SevaSathi undergoes identity verification and credential reviews prior to taking active bookings.": "সেবাসাথীর প্রতিটি গিগ কর্মী সক্রিয় বুকিং নেওয়ার আগে পরিচয় যাচাইকরণ এবং যোগ্যতার পর্যালোচনার মধ্য দিয়ে যান।",
  "Explore Marketplace": "মার্কেটপ্লেস অন্বেষণ করুন",
  "Explore as Guest": "অতিথি হিসেবে দেখুন",
  "Full name of authorized manager or HR": "সম্পূর্ণ নাম of authorized manager or HR",
  "GIG WORKER DASHBOARD": "গিগ কর্মী ড্যাশবোর্ড",
  "General Cooperative Labor": "General সমবায় সংস্থা Labor",
  "Gig Partner Hub — SevaSathi": "Gig Partner Hub — সেবা সাথী",
  "Go Back": "ফিরে যান",
  "HSR Layout, Bengaluru · Home Care": "এইচএসআর লেআউট, বেঙ্গালুরু · হোম কেয়ার",
  "Home Care & Deep Cleaning": "গৃহ পরিচর্যা ও গভীর পরিচ্ছন্নতা",
  "Home organisation": "ঘর পরিপাটি ও গোছগাছ",
  "Home repair specialist": "গৃহ মেরামত বিশেষজ্ঞ",
  "How it works &": "এটি কীভাবে কাজ করে এবং",
  "If a job does not meet quality standards, SevaSathi support facilitates prompt re-work or dispute resolution with customer support available 7 days a week.": "যদি কোনো কাজ মানসম্মত না হয়, তবে সেবাসাথী সাপোর্ট সপ্তাহে ৭ দিন উপলব্ধ কাস্টমার সার্ভিসের মাধ্যমে দ্রুত পুনরায় কাজ বা বিরোধ নিষ্পত্তির ব্যবস্থা করে।",
  "Join SevaSathi to discover verified local professionals right in your neighborhood.": "আপনার আশেপাশেই যাচাইকৃত স্থানীয় পেশাদারদের খুঁজে পেতে সেবাসাথীতে যোগ দিন।",
  "Laptop & Wi-Fi Tech Support": "ল্যাপটপ ও ওয়াই-ফাই কারিগরি সহায়তা",
  "Log Out / Switch Account": "লগ আউট / অ্যাকাউন্ট পরিবর্তন",
  "Multi-day staff deployment requisitions from verified enterprise partners. Guaranteed daily rates held safely in SevaSathi Cooperative Escrow.": "যাচাইকৃত এন্টারপ্রাইজ পার্টনারদের থেকে একাধিক দিনের কর্মী মোতায়েনের চাহিদা। সেবাসাথী সমবায় এসক্রোতে সুরক্ষিত নিশ্চিত দৈনিক হার।",
  "Official service agreements between your organization and the SevaSathi Cooperative Workforce.": "Official service agreements between your organization and the সেবা সাথী সমবায় সংস্থা Workforce.",
  "Operating Address & City": "অফিসের ঠিকানা & City",
  "Organization Profile": "Organization প্রোফাইল",
  "Organization Profile & Compliance": "Organization প্রোফাইল & Compliance",
  "Quoted prices on SevaSathi include standard labor costs. Any supplementary materials or unexpected scope changes must be mutually approved before execution.": "সেবাসাথীতে উল্লিখিত মূল্যে সাধারণ শ্রম খরচ অন্তর্ভুক্ত। কোনো অতিরিক্ত উপাদান বা অপ্রত্যাশিত কাজের ক্ষেত্রে শুরু করার আগেই উভয়ের সম্মতি প্রয়োজন।",
  "Senior Companion & Support": "Senior Companion & সহায়তা কেন্দ্র",
  "SevaSathi Operations · Administration Console": "সেবা সাথী Operations · Administration Console",
  "SevaSathi Trust Guarantee": "সেবাসাথী ট্রাস্ট গ্যারান্টি",
  "SevaSathi Trust Guarantee:": "সেবাসাথী ট্রাস্ট গ্যারান্টি:",
  "SevaSathi Verified Pro Network": "সেবাসাথী যাচাইকৃত প্রো নেটওয়ার্ক",
  "SevaSathi is founded on the simple premise that quality everyday help should be straightforward, respectful, and reliable for both customers and independent gig workers.": "সেবাসাথী এই সহজ ভিত্তির ওপর প্রতিষ্ঠিত যে গুণমানের দৈনন্দিন সাহায্য গ্রাহক এবং স্বাধীন গিগ কর্মীদের উভয়ের জন্য সহজ, সম্মানজনক এবং নির্ভরযোগ্য হওয়া উচিত।",
  "SevaSathi provides an on-demand, local marketplace designed to connect households and businesses with experienced, independent specialists across essential lifestyle services:": "সেবাসাথী একটি অন-ডিমান্ড, স্থানীয় মার্কেটপ্লেস প্রদান করে যা পরিবার ও ব্যবসাকে প্রয়োজনীয় লাইফস্টাইল সেবায় অভিজ্ঞ, স্বাধীন বিশেষজ্ঞদের সাথে সংযুক্ত করে:",
  "SevaSathi uses a balanced scoring model to allocate gig workers fairly without monopolization:": "সেবা সাথী uses a balanced scoring model to allocate gig workers fairly without monopolization:",
  "SevaSathi — On-Demand Services, on your terms": "সেবা সাথী — On-Demand Services, on your terms",
  "Sign In to Admin Console": "লগ ইন করুন to Admin Console",
  "Supporting Docs": "সহায়তা কেন্দ্রing Docs",
  "Supporting Verification Documents": "সহায়তা কেন্দ্রing Verification Documents",
  "Supporting document": "সহায়তা কেন্দ্রing document",
  "Terms & Conditions & How SevaSathi Works — SevaSathi": "শর্তাবলী এবং সেবাসাথী কীভাবে কাজ করে — সেবাসাথী",
  "Thank you for joining SevaSathi as a Gig Worker Partner! Our operations team manually verifies each partner’s credentials, ID documents, and trade skills to ensure safe, top-quality service for customers.": "Thank you for joining সেবা সাথী as a Gig কর্মী পার্টনার! Our operations team manually verifies each partner’s credentials, ID documents, and trade skills to ensure safe, top-quality service for customers.",
  "Total Worker Partners": "Total কর্মী পার্টনারs",
  "Trusted, highly-rated professionals in your area.": "আপনার এলাকার নির্ভরযোগ্য এবং শীর্ষ-রেটেড পেশাদারগণ।",
  "Verify OTP & Save New Password": "ওটিপি যাচাই করুন এবং নতুন পাসওয়ার্ড সংরক্ষণ করুন",
  "Wardrobe & Home Organisation": "Wardrobe & হোম Organisation",
  "Your contact details and exact address are shared only with the assigned professional once a gig is confirmed. SevaSathi never sells personal information to third-party data brokers.": "কাজের নিশ্চিতকরণের পরই কেবল মনোনীত পেশাদারের সাথে আপনার যোগাযোগের তথ্য ও ঠিকানা শেয়ার করা হয়। সেবাসাথী কখনোই তৃতীয় পক্ষের কাছে ব্যক্তিগত তথ্য বিক্রি করে না।",
  "customer@hustle.local · Verified Customer": "customer@hustle.local · যাচাইকৃত গ্রাহক",
  "← Back": "← ফিরে যান",
  "← Back to Marketplace": "← মার্কেটপ্লেসে ফিরে যান",
  "★ 4.9 average rating · 18,500+ verified reviews": "★ 4.9 গড় রেটিং · ১৮,৫০০+ যাচাইকৃত পর্যালোচনা",
  "👷 Worker Partners Queue": "👷 কর্মী পার্টনারs Queue",
  "💾 Save Profile Updates": "💾 Save প্রোফাইল Updates",
  "4.9 average rating · 18,500+ verified reviews": "৪.৯ গড় রেটিং · ১৮,৫০০+ যাচাইকৃত পর্যালোচনা",
  "18,500+ verified reviews": "১৮,৫০০+ যাচাইকৃত পর্যালোচনা",
  "verified reviews": "যাচাইকৃত পর্যালোচনা",
  "“The plumber was at my door in under an hour. Clean work, fair price, and zero surprises.”": "“এক ঘণ্টারও কম সময়ে প্লাম্বার আমার দরজায় উপস্থিত ছিল। পরিষ্কার কাজ, সঠিক দাম এবং কোনো লুকানো খরচ নেই।”",
  "Priya Nair": "প্রিয়া নায়ার",
  "Indiranagar, Bengaluru · Plumbing": "ইন্দিরানগর, বেঙ্গালুরু · প্লাম্বিং",
  "“Found a brilliant maths tutor for my daughter in one evening. Her grades improved immediately.”": "“আমার মেয়ের জন্য এক সন্ধ্যাতেই একজন অসাধারণ গণিতের শিক্ষক পেলাম। তার পরীক্ষার ফলাফলে তাৎক্ষণিক উন্নতি হয়েছে।”",
  "Kunal Shah": "কুণাল শাহ",
  "Koramangala, Bengaluru · Tutoring": "কোরামঙ্গলা, বেঙ্গালুরু · টিউশন",
  "“I book the same home cleaner every month. Effortless, punctual, and thoroughly dependable.”": "“আমি প্রতি মাসে একই হোম ক্লিনার বুক করি। অত্যন্ত সহজ, সময়নিষ্ঠ এবং সম্পূর্ণ নির্ভরযোগ্য।”",
  "Ayesha Khan": "আয়েশা খান",
  "“Finally, a service that respects your time. Sorted all my apartment wiring in one single visit.”": "“অবশেষে এমন একটি পরিষেবা যা আপনার সময়ের মূল্য দেয়। এক দর্শনেই আমার পুরো অ্যাপার্টমেন্টের ওয়্যারিং ঠিক করে দিয়েছে।”",
  "Rohan Iyer": "রোহন আইয়ার",
  "Whitefield, Bengaluru · Electrical": "হোয়াইটফিল্ড, বেঙ্গালুরু · ইলেকট্রিক্যাল",
  "“Our babysitter was warm, skilled and thoroughly verified. Such peace of mind for working parents.”": "“আমাদের বেবিসিটার অত্যন্ত আন্তরিক, দক্ষ এবং পুরোপুরি যাচাইকৃত ছিলেন। কর্মজীবী অভিভাবকদের জন্য দারুণ মানসিক শান্তি।”",
  "Meera Joshi": "মীরা যোশী",
  "Jayanagar, Bengaluru · Childcare": "জয়নগর, বেঙ্গালুরু · চাইল্ডকেয়ার",
  "“The at-home therapeutic massage was pure bliss after a long week. Top-tier professional setup.”": "“ব্যস্ত সপ্তাহের পর বাড়িতে থেরাপিউটিক ম্যাসেজ এক পরম শান্তি ছিল। একদম উচ্চমানের পেশাদার সেটআপ।”",
  "Ananya Deshmukh": "অনন্যা দেশমুখ",
  "Bandra West, Mumbai · Wellness": "বান্দ্রা ওয়েস্ট, মুম্বাই · ওয়েলনেস",
  "“Laptop crashed right before an investor pitch. An expert tech arrived in 35 mins and restored it.”": "“বিনিয়োগকারী পিচের ঠিক আগেই ল্যাপটপ ক্র্যাশ করেছিল। একজন দক্ষ টেকনিশিয়ান ৩৫ মিনিটে এসে তা পুনরুদ্ধার করেন।”",
  "Vikramaditya Sen": "বিক্রমাদিত্য সেন",
  "Cyber City, Gurugram · Tech Help": "সাইবার সিটি, গুরুগ্রাম · টেক সহায়তা",
  "“Our golden retriever loves the daily walking pro! Photo updates and route tracking keep us relaxed.”": "“আমাদের গোল্ডেন রিট্রিভার প্রতিদিনের ওয়াকিং প্রো-কে খুব ভালোবাসে! ছবির আপডেট এবং রুট ট্র্যাকিং আমাদের চিন্তামুক্ত রাখে।”",
  "Sunita Reddy": "সুনিতা রেড্ডি",
  "Jubilee Hills, Hyderabad · Pet Care": "জুবিলি হিলস, হায়দ্রাবাদ · পোষা প্রাণীর যত্ন",
  "“Moved our whole 2-BHK flat without a single scratch. Upfront quotation, no sudden extra fees.”": "“একটিও স্ক্র্যাচ ছাড়া আমাদের পুরো 2-BHK ফ্ল্যাট শিফট করে দিয়েছে। স্পষ্ট কোটেশন, কোনো অপ্রত্যাশিত অতিরিক্ত ফি নেই।”",
  "Kabir Malhotra": "কবীর মালহোত্রা",
  "Hauz Khas, New Delhi · Moving": "হৌজ খাস, নতুন দিল্লি · শিফটিং",
  "“Assembled two custom modular wardrobes and bookshelf in one afternoon. Solid craftsmanship!”": "“এক দুপুরেই দুটি কাস্টম মডুলার ওয়ারড্রোব এবং বুকশেল্ফ একত্রিত করে দিয়েছে। নিখুঁত কারিগরি!”",
  "Sneha Kulkarni": "স্নেহা কুলকার্নি",
  "Kothrud, Pune · Carpentry": "কোথরুদ, পুনে · ছুতার কাজ",
  "“Quick response for kitchen leaks and balcony fixtures. Polite technician and spotless cleanup.”": "“রান্নাঘরের লিক এবং বারান্দার ফিক্সচারের জন্য দ্রুত রেসপন্স। ভদ্র টেকনিশিয়ান এবং নিখুঁত পরিচ্ছন্নতা।”",
  "Devendra Verma": "দেবেন্দ্র ভার্মা",
  "Salt Lake, Kolkata · Repairs": "সল্টলেক, কলকাতা · মেরামত",
  "“Transformed our messy terrace into a flourishing urban garden. Expert plant care and advice.”": "“আমাদের অগোছালো ছাদটিকে একটি সুন্দর সবুজ শহুরে বাগানে রূপান্তরিত করেছে। বিশেষজ্ঞ গাছের যত্ন ও পরামর্শ।”",
  "Pooja Sundaram": "পূজা সুন্দরম",
  "Adyar, Chennai · Garden Care": "আদিয়ার, চেন্নাই · বাগান পরিচর্যা",
  "Arjun Mehta": "অর্জুন মেহতা",
  "142 jobs": "১৪২টি কাজ",
  "Naina Kapoor": "নয়না কাপুর",
  "Makeup artist & stylist": "মেকআপ আর্টিস্ট এবং স্টাইলিস্ট",
  "88 jobs": "৮৮টি কাজ",
  "Karan Bhat": "করণ ভাট",
  "Maths & science tutor": "গণিত ও বিজ্ঞান শিক্ষক",
  "67 jobs": "৬৭টি কাজ",
  "QUICK BOOK": "দ্রুত বুকিং",
  "FAST RESPONSE": "দ্রুত সাড়া",
  "BOOK TODAY": "আজই বুক করুন",
  "PET CARE": "পোষা প্রাণীর যত্ন",
  "SAME DAY": "একই দিনে",
  "OUTDOOR": "আউটডোর",
  "HOME REPAIR": "গৃহ মেরামত",
  "REPAIRS": "মেরামত",
  "CARPENTRY": "ছুতার কাজ",
  "CHILDCARE": "শিশুর যত্ন",
  "PETS": "পোষা প্রাণী",
  "ORGANISING": "গোছগাছ",
  "TECH HELP": "টেক সাপোর্ট",
  "GARDEN": "বাগান",
  "Handyman visits": "হ্যান্ডিম্যান সেবা",
  "Small fixes, sorted in one visit": "ছোটখাটো ত্রুটি, এক দর্শনেই সমাধান",
  "Electrician visits": "ইলেকট্রিশিয়ান সেবা",
  "Safe fixes for every room": "প্রতিটি ঘরের জন্য নিরাপদ মেরামত",
  "Plumbing solutions": "প্লাম্বিং সমাধান",
  "Leaks, fittings & installations": "লিক মেরামত, ফিটিং ও ইনস্টলেশন",
  "Carpentry & assembly": "ছুতার কাজ এবং ফিটিং",
  "Furniture built to last": "দীর্ঘস্থায়ী ও মজবুত আসবাব",
  "Babysitting": "বেবিসিটিং",
  "Caring hands for your little ones": "আপনার ছোট্ট সোনার স্নেহপূর্ণ যত্ন",
  "Pet sitting & walks": "পোষা প্রাণীর যত্ন ও হাঁটা",
  "Happy companions while you’re away": "আপনার অনুপস্থিতিতে আদুরে সঙ্গী",
  "Order and calm, room by room": "প্রতিটি ঘরে পরিচ্ছন্ন শৃঙ্খলা ও শান্তি",
  "Laptop & Wi-Fi help": "ল্যাপটপ ও ওয়াই-ফাই সহায়তা",
  "Tech troubles, clearly solved": "প্রযুক্তিগত সমস্যা, পরিষ্কার সমাধান",
  "Garden care": "বাগান পরিচর্যা",
  "A little greener, every weekend": "প্রতি উইকেন্ডে আরেকটু বেশি সবুজ",
  "From ₹349": "₹৩৪৯ থেকে",
  "From ₹299": "₹২৯৯ থেকে",
  "From ₹499": "₹৪৯৯ থেকে",
  "From ₹249/hr": "₹২৪৯/ঘণ্টা থেকে",
  "From ₹799": "₹৭৯৯ থেকে",
  "From ₹599": "₹৫৯৯ থেকে",
  "Want to start as a Gig Worker?": "গিগ কর্মী হিসেবে কাজ শুরু করতে চান?",
  "Join as a Gig Worker": "গিগ কর্মী হিসেবে যোগ দিন",
  "Learn how it works": "জানুন এটি কীভাবে কাজ করে",
  "TRUST & COOPERATION": "বিশ্বাস ও সহযোগিতা",
  "₹35,000–₹65,000": "₹৩৫,০০০–₹৬৫,০০০",
  "₹35,000-₹65,000": "₹৩৫,০০০–₹৬৫,০০০",
  "⚡ Same-day": "⚡ একই দিনে",
  "Same-day": "একই দিনে",
  "🤝 99.4%": "🤝 ৯৯.৪%",
  "99.4%": "৯৯.৪%",
  "Over 3,200+ local professionals": "৩,২০০+ এরও বেশি স্থানীয় পেশাদার",
  "₹1,500 budget · 3 replies": "₹১,৫০০ বাজেট · ৩টি সাড়া",
  "Sign in": "সাইন ইন করুন",
  "Activity": "কার্যকলাপ",
  "PLATFORM TRANSPARENCY": "প্ল্যাটফর্মের স্বচ্ছতা",
  "How it works & Terms of Trust.": "কীভাবে কাজ করে এবং বিশ্বাসের শর্তাবলী।",
  "Terms of Trust.": "আস্থার শর্তাবলী।",
  "100% ID-Verified Professionals": "১০০% পরিচয়-যাচাইকৃত পেশাদার",
  "Government ID checks & skill validation": "সরকারি আইডি পরীক্ষা এবং দক্ষতা যাচাইকরণ",
  "Upfront Escrow & Price Clarity": "অগ্রিম এসক্রো এবং মূল্যের স্বচ্ছতা",
  "No hidden charges, surge fees, or surprises": "কোনো লুকানো চার্জ, বর্ধিত ফি বা চমক নেই",
  "Fair Worker Compensation": "ন্যায্য কর্মী পারিশ্রমিক",
  "Workers keep 100% of tips + same-day payouts": "কর্মীরা ১০০% টিপস রাখেন + একই দিনে পেআউট পান",
  "SECTION 01": "বিভাগ ০১",
  "What We Offer": "আমরা কী অফার করি",
  "Residential sanitization, kitchen and bathroom deep cleaning, appliance maintenance, and seasonal prep.": "আবাসিক স্যানিটাইজেশন, রান্নাঘর ও বাথরুমের গভীর পরিচ্ছন্নতা, সরঞ্জাম রক্ষণাবেক্ষণ এবং সিজনাল প্রস্তুতি।",
  "Repairs & Maintenance": "মেরামত ও রক্ষণাবেক্ষণ",
  "Licensed electricians, certified plumbers, expert carpenters, and general handyman solutions.": "লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ান, প্রত্যয়িত প্লাম্বার, দক্ষ ছুতার এবং সাধারণ হ্যান্ডিম্যান সমাধান।",
  "Lessons & Skill Coaching": "শিক্ষা ও দক্ষতা প্রশিক্ষণ",
  "Doorstep academic tutoring, STEM mentoring, musical instruments, and vocational language coaching.": "দোরগোড়ায় একাডেমিক টিউশন, স্টেম মেন্টরিং, বাদ্যযন্ত্র এবং বৃত্তিমূলক ভাষা কোচিং।",
  "Wellness & Personal Care": "সুস্থতা ও ব্যক্তিগত যত্ন",
  "Certified home spa specialists, therapeutic massages, beauty styling, and wellness trainers.": "প্রত্যয়িত হোম স্পা বিশেষজ্ঞ, থেরাপিউটিক ম্যাসেজ, সৌন্দর্য স্টাইলিং এবং ওয়েলনেস প্রশিক্ষক।",
  "Same-day laptop diagnostics, Wi-Fi optimization, home office setup, and smart gadget installation.": "একই দিনে ল্যাপটপ ডায়াগনস্টিক, ওয়াই-ফাই অপ্টিমাইজেশন, হোম অফিস সেটআপ এবং স্মার্ট গ্যাজেট ইনস্টলেশন।",
  "Errands, Moving & Care": "প্রাত্যহিক কাজ, শিফটিং ও যত্ন",
  "Flat shifting, parcel delivery, verified babysitting, pet walking, and dedicated elder companion care.": "ফ্ল্যাট শিফটিং, পার্সেল ডেলিভারি, যাচাইকৃত বেবিসিটিং, পোষা প্রাণী ঘোরানো এবং নিবেদিত প্রবীণ সঙ্গী সেবা।",
  "SECTION 02": "বিভাগ ০২",
  "From booking your first task to seamless completion, our platform is structured in 4 clear, transparent milestones:": "আপনার প্রথম কাজ বুকিং থেকে সফল সমাপ্তি পর্যন্ত, আমাদের প্ল্যাটফর্ম ৪টি স্পষ্ট ও স্বচ্ছ ধাপে বিভক্ত:",
  "Browse pre-packaged service templates or use our AI need-finder to state exactly what you require along with your preferred timeline and budget.": "রেডিমেড সার্ভিস প্যাকেজ ব্রাউজ করুন অথবা আপনার পছন্দের সময় ও বাজেটসহ সুনির্দিষ্ট চাহিদা জানাতে আমাদের এআই নিড-ফাইন্ডার ব্যবহার করুন।",
  "Match with Local, Verified Pros": "স্থানীয় যাচাইকৃত পেশাদারদের সাথে যুক্ত হন",
  "Receive immediate responses from top-rated, background-checked independent workers nearby. Review real customer ratings, past job counts, and verified reviews.": "আশেপাশের শীর্ষ-রেটেড, ব্যাকগ্রাউন্ড যাচাইকৃত স্বতন্ত্র কর্মীদের থেকে তাৎক্ষণিক সাড়া পান। আসল গ্রাহক রেটিং, অতীত কাজের সংখ্যা ও পর্যালোচনা দেখুন।",
  "Transparent Pricing & Secure Escrow": "স্বচ্ছ মূল্য ও সুরক্ষিত এসক্রো",
  "Agree on upfront costs before work commences. Your payment is held safely in escrow and only released once the job is completed to your satisfaction.": "কাজ শুরুর আগেই চূড়ান্ত খরচে সম্মতি দিন। আপনার পেমেন্ট এসক্রোতে নিরাপদে সংরক্ষিত থাকে এবং আপনার সন্তুষ্টি অনুযায়ী কাজ শেষ হলেই তা রিলিজ হয়।",
  "Same-Day Direct Payouts & Honest Reviews": "একই দিনে সরাসরি পেমেন্ট এবং সৎ পর্যালোচনা",
  "Professionals receive same-day direct bank payouts with 100% tip retention. Rate and save your favorite pros for simple recurring bookings.": "পেশাদাররা পান ১০০% টিপসসহ একই দিনে সরাসরি ব্যাংক পেমেন্ট। সহজে পুনরায় বুক করতে আপনার প্রিয় কর্মীদের রেট ও সেভ করুন।",
  "SECTION 03": "বিভাগ ০৩",
  "Terms of Service & Community Standards": "পরিষেবার শর্তাবলী এবং সম্প্রদায়ের মানদণ্ড",
  "To maintain the integrity of our community and ensure safety for everyone involved, all users agree to the following terms:": "আমাদের কমিউনিটির সংহতি বজায় রাখতে এবং সকলের নিরাপত্তা নিশ্চিত করতে, সমস্ত ব্যবহারকারী নিম্নলিখিত শর্তাবলীতে সম্মত হন:",
  "Identity Verification:": "পরিচয় যাচাইকরণ:",
  "Pricing Integrity:": "मूल্যের সততা ও স্বচ্ছতা:",
  "Worker Dignity & Independence:": "কর্মীদের মর্যাদা ও স্বাধীনতা:",
  "Gig workers are independent professionals who set their schedules and manage their work. Customers agree to provide safe, harassment-free workspaces.": "গিগ কর্মীরা স্বাধীন পেশাদার যাঁরা নিজেদের সময়সূচি ও কাজের ব্যবস্থাপনা করেন। গ্রাহকরা নিরাপদ ও হয়রানিমুক্ত কাজের পরিবেশ দিতে সম্মত হন।",
  "Cancellation Policy:": "বাতিলকরণ নীতি:",
  "Free cancellations are supported up to 2 hours prior to scheduled arrival. Cancellations made after a pro is en route incur a modest travel compensation fee.": "নির্ধারিত সময়ের ২ ঘণ্টা পূর্ব পর্যন্ত বিনামূল্যে বাতিল করার সুবিধা রয়েছে। কর্মী রওনা দেওয়ার পর বাতিল করলে সামান্য ভ্রমণ ক্ষতিপূরণ ফি প্রযোজ্য।",
  "SECTION 04": "বিভাগ ০৪",
  "Privacy & Escrow Safeguards": "গোপনীয়তা এবং এসক্রো সুরক্ষা",
  "Questions? Contact our team anytime at support@hustle.local": "কোনো প্রশ্ন? যেকোনো সময় support@hustle.local এ আমাদের সাথে যোগাযোগ করুন",
  "I want to offer services": "আমি সেবা দিতে চাই",
  "Earn effortlessly, build your business & same-day pay": "সহজে উপার্জন করুন, ব্যবসা বাড়ান এবং একই দিনে পেমেন্ট পান",
  "I'm here for my business": "আমি আমার ব্যবসার জন্য এসেছি",
  "Hire workforce teams, facilities & enterprise staffing": "ওয়ার্কফোর্স টিম, ফ্যাসিলিটিজ ও এন্টারপ্রাইজ কর্মী নিয়োগ করুন",
  "Verified Local Experts": "যাচাইকৃত স্থানীয় বিশেষজ্ঞ",
  "Government ID checked and vetted professionals": "সরকারি আইডি যাচাইকৃত ও পরীক্ষিত পেশাদার",
  "Transparent Upfront Pricing": "স্বচ্ছ अग्रिम মূল্য",
  "No hidden commissions, surge fees, or guesswork": "কোনো লুকানো কমিশন, বাড়তি চার্জ বা বিভ্রান্তি নেই",
  "Secure escrow protection with same-day resolution": "একই দিনে সমাধানের সাথে নিরাপদ এসক্রো সুরক্ষা",
  "GIG WORKER PORTAL": "গিগ কর্মী পোর্টাল",
  "BUSINESS PORTAL": "বিজনেস পোর্টাল",
  "Create account or sign in to continue": "এগিয়ে যেতে অ্যাকাউন্ট তৈরি করুন অথবা সাইন ইন করুন",
  "ACTIVE SESSION DETECTED": "সক্রিয় সেশন শনাক্ত হয়েছে",
  "You are currently signed in as": "আপনি বর্তমানে সাইন ইন আছেন:",
  "Go to Marketplace →": "মার্কেটপ্লেসে যান →",
  "or create/sign in to another account below": "অথবা নিচে অন্য অ্যাকাউন্টে তৈরি/সাইন ইন করুন",
  "Find the help you need.": "আপনার প্রয়োজনীয় সাহায্য খুঁজুন।",
  "Create account": "অ্যাকাউন্ট তৈরি করুন",
  "Continue with Google": "Google এর মাধ্যমে এগিয়ে যান",
  "or continue with email & phone": "অথবা ইমেল ও ফোন দিয়ে এগিয়ে যান",
  "What skills do you have?": "আপনার কী কী দক্ষতা আছে?",
  "* (Compulsory)": "* (বাধ্যতামূলক)",
  "Select primary skill category...": "মূল দক্ষতার ক্যাটাগরি বেছে নিন...",
  "Plumbing & Drainage Fixing": "প্লাম্বিং ও ড্রেনেজ মেরামত",
  "Electrician & Wiring Repairs": "ইলেকট্রিশিয়ান ও ওয়্যারিং মেরামত",
  "Furniture Assembly & Handyman": "আসবাবপত্র সংযোজন ও হ্যান্ডিম্যান",
  "Custom Carpentry & Woodwork": "কাঠের কাজ ও কাস্টম আসবাব মেরামত",
  "AC, Fridge & Appliance Repair": "এসি, ফ্রিজ ও গৃহস্থালি যন্ত্র মেরামত",
  "Spa, Massage & Grooming": "স্পা, ম্যাসেজ ও গ্রুমিং",
  "Maths & Science Tutoring": "গণিত ও বিজ্ঞান টিউশন",
  "Wall Painting & Waterproofing": "ওয়াল পেইন্টিং ও ওয়াটারপ্রুফিং",
  "Babysitting & Childcare": "বেবিসিটিং ও শিশু যত্ন",
  "Pet Grooming, Sitting & Dog Walking": "পোষা প্রাণীর পরিচর্যা ও হাঁটা",
  "Garden & Plant Care": "বাগান ও গাছের পরিচর্যা",
  "Yoga & Fitness Coaching": "যোগব্যায়াম ও ফিটনেস কোচিং",
  "Car & Two-Wheeler Care": "গাড়ি ও বাইক সার্ভিসিং",
  "Pest Control & Fumigation": "কীটপতঙ্গ নিয়ন্ত্রণ ও জীবাণুমুক্তকরণ",
  "Other Specialized Skill": "অন্যান্য বিশেষ দক্ষতা",
  "Years of experience": "অভিজ্ঞতার বছর",
  "Choose your experience level...": "আপনার অভিজ্ঞতার স্তর বেছে নিন...",
  "Less than 1 year (Entry / Starting out)": "১ বছরের কম (নবীন)",
  "1–2 years (Working pro)": "১–২ বছর (পেশাদার)",
  "3–5 years (Experienced specialist)": "৩–৫ বছর (অভিজ্ঞ বিশেষজ্ঞ)",
  "5–10 years (Senior craftsman)": "৫–১০ বছর (সিনিয়র কারিগর)",
  "10+ years (Master pro)": "১০+ বছর (মাস্টার প্রো)",
  "(Optional — accelerates verification)": "(ঐচ্ছিক — দ্রুত যাচাইয়ে সহায়ক)",
  "Upload ID proof, trade certificate or resume": "পরিচয়পত্র, ট্রেড সার্টিফিকেট বা সিভি আপলোড করুন",
  "PDF, JPG, or PNG up to 10MB · Click to choose": "PDF, JPG বা PNG সর্বোচ্চ 10MB · বেছে নিতে ক্লিক করুন",
  "Uploaded file ready": "আপলোড করা ফাইল প্রস্তুত",
  "Working City": "কাজের শহর",
  "Select your city...": "আপনার শহর নির্বাচন করুন...",
  "Kolkata": "কলকাতা",
  "Bengaluru": "বেঙ্গালুরু",
  "Chennai": "চেন্নাই",
  "Mumbai": "মুম্বাই",
  "Delhi": "দিল্লি",
  "Hyderabad": "হায়দ্রাবাদ",
  "Ahmedabad": "আহমেদাবাদ",
  "Pune": "পুনে",
  "Other (Type your city)": "অন্যান্য (শহরের নাম লিখুন)",
  "Preferred work localities": "পছন্দের কাজের এলাকা",
  "(e.g. Salt Lake, Indiranagar, Bandra, Hauz Khas)": "(যেমন সল্টলেক, ইন্দিরানগর, বান্দ্রা, হৌজ খাস)",
  "About your craft & background": "আপনার দক্ষতা ও অভিজ্ঞতা সম্পর্কে বলুন",
  "(Optional)": "(ঐচ্ছিক)",
  "Select business category...": "ব্যবসার ধরন বেছে নিন...",
  "Hotel / Hospitality & Resorts": "হোটেল / হসপিটালিটি ও রিসর্ট",
  "Facility & Property Management": "ফ্যাসিলিটি ও প্রপার্টি ম্যানেজমেন্ট",
  "IT Park & Corporate Office": "আইটি পার্ক ও কর্পোরেট অফিস",
  "Retail, Malls & Commercial Complexes": "রিটেল, শপিং মল ও বাণিজ্যিক ভবন",
  "Restaurant, Cafe & Catering": "রেস্তোরাঁ, ক্যাফে ও ক্যাটারিং",
  "Construction & Real Estate Development": "নির্মাণ ও রিয়েল এস্টেট",
  "Event Venue, Exhibition & Staging": "ইভেন্ট ভেন্যু, প্রদর্শনী ও স্টেজ",
  "Healthcare, Clinic & Wellness Centre": "স্বাস্থ্যসেবা, ক্লিনিক ও ওয়েলনেস সেন্টার",
  "Other Enterprise": "অন্যান্য প্রতিষ্ঠান",
  "Business/Organization Name": "ব্যবসা / প্রতিষ্ঠানের নাম",
  "Address / Headquarters": "ঠিকানা / প্রধান কার্যালয়",
  "GSTIN (Optional)": "জিএসটিআইএন (ঐচ্ছিক)",
  "Business Registration Number (Optional)": "ব্যবসা নিবন্ধন নম্বর (ঐচ্ছিক)",
  "Website / Portfolio (Optional)": "ওয়েবসাইট / পোর্টফোলিও (ঐচ্ছিক)",
  "Keep me signed in on this device": "আমাকে এই ডিভাইসে সাইন ইন রাখুন",
  "Create Free Account": "বিনামূল্যে অ্যাকাউন্ট খুলুন",
  "Sign In to Portal": "পোর্টালে সাইন ইন করুন",
  "By creating an account, you agree to SevaSathi's Terms of Service & Privacy Policy.": "অ্যাকাউন্ট তৈরি করে আপনি সেবাসাথীর সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মতি দিচ্ছেন।",
  "Terms of Service": "সেবার শর্তাবলী",
  "Privacy Policy": "গোপনীয়তা নীতি",
  "ACCOUNT RECOVERY": "অ্যাকাউন্ট পুনরুদ্ধার",
  "Reset your password": "আপনার পাসওয়ার্ড রিসেট করুন",
  "Enter your registered email or phone number to receive a verification OTP.": "যাচাইকরণ ওটিপি পেতে আপনার নিবন্ধিত ইমেল বা ফোন নম্বর লিখুন।",
  "Registered email or phone number": "নিবন্ধিত ইমেল বা ফোন নম্বর",
  "Send Verification OTP": "যাচাইকরণ ওটিপি পাঠান",
  "OTP Sent:": "ওটিপি পাঠানো হয়েছে:",
  "Auto-fill": "স্বয়ংক্রিয় পূরণ",
  "Standard verification code 123456 is also accepted.": "সাধারণ যাচাই কোড 123456-ও গ্রহণযোগ্য।",
  "Enter 6-digit OTP": "৬-সংখ্যার ওটিপি লিখুন",
  "Create new password": "নতুন পাসওয়ার্ড তৈরি করুন",
  "Start earning on your terms.": "নিজের শর্তে উপার্জন শুরু করুন।",
  "Join our cooperative network of trusted local specialists and get paid same day.": "আমাদের বিশ্বস্ত স্থানীয় বিশেষজ্ঞদের সমবায় নেটওয়ার্কে যোগ দিন এবং একই দিনে পেমেন্ট পান।",
  "Register your organization.": "আপনার প্রতিষ্ঠান নিবন্ধন করুন।",
  "Create your enterprise business account to request and deploy cooperative workforce teams.": "সমবায় কর্মী দল নিয়োগ ও পরিচালনার জন্য আপনার এন্টারপ্রাইজ বিজনেস অ্যাকাউন্ট তৈরি করুন।",
  "Welcome back, business partner.": "স্বাগতম, ব্যবসায়িক পার্টনার।",
  "Sign in to manage your active workforce, recurring contracts, and consolidated invoices.": "আপনার সক্রিয় কর্মী, চুক্তি এবং বিলিং পরিচালনার জন্য সাইন ইন করুন।",
  "Multi-Worker Team Hiring": "একাধিক কর্মী নিয়োগ",
  "Request and deploy 1 to 50+ vetted cooperative workers with one brief": "একটি সাধারণ রিকোয়েস্টে ১ থেকে ৫০+ যাচাইকৃত সমবায় কর্মী নিয়োগ করুন",
  "Recurring Corporate Contracts": "কর্পোরেট চুক্তি",
  "Predictable daily, weekly, or monthly deployment agreements": "দৈনিক, সাপ্তাহিক বা মাসিক ভিত্তিতে সুবিধাজনক চুক্তি",
  "Consolidated Invoicing": "একত্রিত ইনভয়েস",
  "Single itemized corporate bill with secure escrow protection": "নিরাপদ এসক্রো সুরক্ষাসহ একক বিস্তারিত কর্পোরেট বিল",
  "OPEN PRO POOL": "ওপেন প্রো পুল",
  "Can't find what you're looking for?": "আপনার কাঙ্ক্ষিত সেবা খুঁজে পাচ্ছেন না?",
  "Post your custom job requirements directly to our verified open pool. Outline your task, choose your schedule, and set your own budget.": "আপনার কাস্টম কাজের চাহিদা সরাসরি আমাদের যাচাইকৃত ওপেন পুলে পোস্ট করুন। কাজের বিবরণ দিন, সময়সূচি বাছুন এবং বাজেট নির্ধারণ করুন।",
  "Enter Custom Job Needs": "কাস্টম কাজের চাহিদা লিখুন",
  "Post custom task": "কাস্টম কাজ পোস্ট করুন",
  "Trust & Escrow": "আস্থা ও এসক্রো",
  "Account settings": "অ্যাকাউন্ট সেটিংস",
  "Customer Help": "গ্রাহক সহায়তা",
  "Speak or type what you need... e.g.": "বলুন বা লিখুন কী প্রয়োজন... যেমন",
  "COOPERATIVE ENTERPRISE": "সমবায় এন্টারপ্রাইজ",
  "Fair Workforce Allocation · Multi-Worker Staffing · Secured Escrow Contracts": "ন্যায্য কর্মী বণ্টন · একাধিক কর্মী নিয়োগ · সুরক্ষিত এসক্রো চুক্তি",
  "Helpdesk:": "হেল্পডেস্ক:",
  "Dashboard Overview": "ড্যাশবোর্ড ওভারভিউ",
  "Post Requirement": "চাহিদা পোস্ট করুন",
  "My Requirements": "আমার চাহিদাগুলি",
  "Workforce Roster": "কর্মী তালিকা",
  "Active Contracts": "সক্রিয় চুক্তি",
  "Invoices & Escrow": "ইনভয়েস ও এসক্রো",
  "Fair Allocation System": "ন্যায্য বণ্টন ব্যবস্থা",
  "Skill Match:": "দক্ষতার মিল:",
  "Availability:": "প্রাপ্যতা:",
  "Proximity:": "দূরত্ব:",
  "Fair Workload (Rotation):": "ন্যায্য কাজের চাপ (ঘূর্ণন):",
  "Rating & Reliability:": "রেটিং ও নির্ভরযোগ্যতা:",
  "Manage multi-worker deployments, team rosters, and consolidated billing.": "একাধিক কর্মী মোতায়েন, টিম রোস্টার এবং বিলিং পরিচালনা করুন।",
  "➕ Post Workforce Requirement": "➕ কর্মী চাহিদা পোস্ট করুন",
  "Active Requirements": "সক্রিয় চাহিদা",
  "Commercial requisitions": "বাণিজ্যিক চাহিদা",
  "Pending Requests": "অপেক্ষমাণ অনুরোধ",
  "Matching candidates": "উপযুক্ত কর্মী খোঁজা হচ্ছে",
  "Assigned Workers": "নিয়োগকৃত কর্মী",
  "Deployed on active contracts": "সক্রিয় চুক্তিতে নিয়োজিত",
  "Live service agreements": "চলমান পরিষেবা চুক্তি",
  "Total Spending": "মোট খরচ",
  "Paid through escrow": "এসক্রোর মাধ্যমে পরিশোধিত",
  "Completed Deployments": "সম্পন্ন মোতায়েন",
  "Fulfilled contracts": "সম্পন্ন চুক্তি",
  "Recent Requirements": "সাম্প্রতিক চাহিদা",
  "View All": "সব দেখুন",
  "Req ID": "রিকোয়েস্ট আইডি",
  "Trade Category": "কাজের ধরন",
  "Workers Needed": "প্রয়োজনীয় কর্মী",
  "Duration": "সময়সীমা",
  "Rate / Worker": "রেট / কর্মী",
  "Status": "অবস্থা",
  "Action": "পদক্ষেপ",
  "Loading requirements...": "চাহিদা লোড হচ্ছে...",
  "Active Contracts Overview": "সক্রিয় চুক্তি বিবরণী",
  "Contract ID": "চুক্তি আইডি",
  "Department": "বিভাগ",
  "Team Size": "দলের সদস্য",
  "Total Budget": "মোট বাজেট",
  "Loading contracts...": "চুক্তি লোড হচ্ছে...",
  "Post Workforce Requirement": "কর্মী চাহিদা পোস্ট করুন",
  "Submit a multi-worker staffing request. Our cooperative engine matches verified trade professionals fairly.": "একটি একাধিক কর্মী রিকোয়েস্ট জমা দিন। আমাদের সমবায় ইঞ্জিন দক্ষতার সাথে নিরপেক্ষ কর্মী বণ্টন করে।",
  "Service Category": "পরিষেবা ক্যাটাগরি",
  "Select trade category": "কাজের ক্যাটাগরি বাছুন",
  "Cleaning & Housekeeping": "পরিচ্ছন্নতা ও হাউসকিপিং",
  "Electrical & Maintenance": "ইলেকট্রিক্যাল ও রক্ষণাবেক্ষণ",
  "Plumbing & Sanitation": "প্লাম্বিং ও স্যানিটেশন",
  "Security & Guarding": "নিরাপত্তা ও গার্ডিং",
  "Painting & Renovation": "পেইন্টিং ও সংস্কার",
  "Event & Hospitality Staff": "ইভেন্ট ও হসপিটালিটি কর্মী",
  "Logistics & Heavy Lifting": "লজিস্টিকস ও ভারী পণ্য বহন",
  "e.g. 3 cleaners or 1 electrician": "যেমন ৩ জন ক্লিনার বা ১ জন ইলেকট্রিশিয়ান",
  "Required Skills & Qualifications": "প্রয়োজনীয় দক্ষতা ও যোগ্যতা",
  "Deployment Address / Facility": "কাজের স্থান / সুবিধা",
  "City": "শহর",
  "Delhi NCR": "দিল্লি এনসিআর",
  "Start Date": "শুরুর তারিখ",
  "End Date": "শেষ তারিখ",
  "Shift / Daily Schedule": "শিফট / দৈনিক সময়সূচি",
  "Estimated Daily Rate per Worker (₹)": "কর্মী প্রতি আনুমানিক দৈনিক রেট (₹)",
  "Recurring Workforce Contract (e.g. Monthly / Weekly staffing)": "নিয়মিত কর্মী চুক্তি (যেমন মাসিক / সাপ্তাহিক কর্মী নিয়োগ)",
  "Recurrence Frequency": "পুনরাবৃত্তির সময়কাল",
  "Weekly Rotation": "সাপ্তাহিক ঘূর্ণন",
  "Monthly Recurring Roster": "মাসিক রোস্টার",
  "Quarterly Retainer": "ত্রৈমাসিক রিটেইনার",
  "Additional Instructions & Safety Equipment": "অতিরিক্ত নির্দেশাবলী ও সুরক্ষা সরঞ্জাম",
  "Requested Squad": "অনুরোধকৃত টিম",
  "3 Pros": "৩ জন কর্মী",
  "7 Days": "৭ দিন",
  "Labor Subtotal": "শ্রম উপমোট",
  "Coop Reserve (5%)": "সমবায় ফান্ড (৫%)",
  "How It Works": "কীভাবে এটি কাজ করে",
  "Email Address": "ইমেল ঠিকানা",
  "Phone Number": "ফোন নম্বর",
  "Seva": "সেবা",
  "Sathi": "সাথী",
  "AI MATCH": "এআই ম্যাচ",
  "Terms & Conditions": "শর্তাবলী এবং নিয়ম",
  "and": "এবং",
  "Total Estimated Budget": "মোট আনুমানিক বাজেট",
  "Reset Form": "ফর্ম রিসেট করুন",
  "🚀 Submit & Run Fair Matcher": "🚀 জমা দিন এবং ফেয়ার ম্যাচিং চালু করুন",
  "Workforce Requisitions": "কর্মী চাহিদা তালিকা",
  "Track all commercial requisitions, view algorithmic worker matches, and confirm team allocations.": "সমস্ত বাণিজ্যিক চাহিদা ট্র্যাক করুন, অ্যালগরিদমিক কর্মী ম্যাচিং দেখুন এবং টিম বণ্টন নিশ্চিত করুন।",
  "➕ New Requisition": "➕ নতুন চাহিদা",
  "Category": "ক্যাটাগরি",
  "Workers": "কর্মী",
  "Dates": "তারিখসমূহ",
  "Daily Rate": "দৈনিক রেট",
  "Allocated Team": "বরাদ্দকৃত দল",
  "Actions": "পদক্ষেপ",
  "Workforce Department Roster": "বিভাগভিত্তিক কর্মী তালিকা",
  "View currently deployed trade workers grouped by department/service, shifts, and attendance status.": "বিভাগ/পরিষেবা, শিফট এবং উপস্থিতির অবস্থা অনুসারে বর্তমানে মোতায়েন কর্মীদের দেখুন।",
  "Loading active department teams...": "সক্রিয় বিভাগীয় দল লোড হচ্ছে...",
  "Commercial Contracts": "বাণিজ্যিক চুক্তি",
  "Duration & Days": "সময়কাল ও দিন",
  "Total Contract Value": "মোট চুক্তির মূল্য",
  "Invoices & Escrow Payments": "ইনভয়েস ও এসক্রো পেমেন্ট",
  "Consolidated multi-worker billing. Funds are secured in escrow and disbursed directly to workers upon shift sign-off.": "একত্রিত কর্মী বিলিং। অর্থ এসক্রোতে সুরক্ষিত এবং শিফট সমাপ্তিতে সরাসরি কর্মীদের কাছে বিতরণ করা হয়।",
  "Loading consolidated invoices...": "ইনভয়েস লোড হচ্ছে...",
  "Verified commercial registration, GSTIN compliance, and billing contacts.": "যাচাইকৃত বাণিজ্যিক নিবন্ধন, জিএসটি সম্মতি এবং বিলিং পরিচিতি।",
  "Facility / HQ Address": "স্থান / প্রধান কার্যালয়ের ঠিকানা",
  "Registration / CIN": "নিবন্ধন / সিআইএন",
  "Algorithmic Fair Matches": "অ্যালগরিদমিক ন্যায্য ম্যাচ",
  "Fair weighted scoring based on Skill (40%), Availability (25%), Proximity (15%), Workload Rotation (10%), and Rating (10%).": "দক্ষতা (৪০%), প্রাপ্যতা (২৫%), নৈকট্য (১৫%), কাজের চাপ ঘূর্ণন (১০%), এবং রেটিং (১০%) এর ওপর ভিত্তি করে ন্যায্য স্কোরিং।",
  "⚡ Auto-Select Top Picks": "⚡ সেরা কর্মী নির্বাচন করুন",
  "Selected:": "নির্বাচিত:",
  "Cancel": "বাতিল করুন",
  "Confirm Allocation & Generate Contract": "বণ্টন নিশ্চিত করুন ও চুক্তি তৈরি করুন",
  "Direct Payouts, Protected Escrow & Two-Way Bargaining": "সরাসরি পেআউট, সুরক্ষিত এসক্রো এবং দ্বিমুখী দরদাম",
  "⏳ APPLICATION UNDER REVIEW": "⏳ আবেদন পর্যালোচিত হচ্ছে",
  "Partner ID & Skill Verification": "পার্টনার আইডি ও দক্ষতা যাচাইকরণ",
  "in Progress": "চলমান রয়েছে",
  "Applicant Name": "আবেদনকারীর নাম",
  "Registered Trade": "নিবন্ধিত পেশা",
  "Experience": "অভিজ্ঞতা",
  "Service Locality": "পরিষেবা এলাকা",
  "Verification Status": "যাচাইকরণের স্থিতি",
  "Pending Admin Approval": "অ্যাডমিনের অনুমোদনের অপেক্ষায়",
  "Browse on-demand trade requests, view service categories, and explore the platform as a guest while operations reviews your application.": "অন-ডিমান্ড কাজের অনুরোধ ব্রাউজ করুন, পরিষেবার ক্যাটাগরি দেখুন এবং আবেদন পর্যালোচনার সময় অতিথি হিসেবে প্ল্যাটফর্ম ঘুরে দেখুন।",
  "✓ VERIFIED & ACTIVE PRO PARTNER": "✓ যাচাইকৃত ও সক্রিয় প্রো পার্টনার",
  "Welcome back,": "স্বাগতম,",
  "Partner": "পার্টনার",
  "Here are your live customer appointments, counter-offers, and instant payouts.": "এখানে আপনার লাইভ গ্রাহক অ্যাপয়েন্টমেন্ট, কাউন্টার অফার এবং তাত্ক্ষণিক পেমেন্ট রয়েছে।",
  "View Customer Marketplace": "গ্রাহক মার্কেটপ্লেস দেখুন",
  "Total Earnings": "মোট আয়",
  "Earned from completed tasks": "সম্পন্ন কাজ থেকে অর্জিত",
  "Pending Escrow Balance": "মুলতুবি এসক্রো ব্যালেন্স",
  "Releases on task sign-off": "কাজ সমাপ্তির পর মুক্তি পায়",
  "⚡ Payout": "⚡ পেআউট নিন",
  "Completed Jobs": "সম্পন্ন কাজ",
  "0 tasks completed": "০টি কাজ সম্পন্ন",
  "Client Rating & Tips": "ক্লায়েন্ট রেটিং ও টিপস",
  "New Pro": "নতুন পেশাদার",
  "Client rating unlocks after completed jobs": "সম্পন্ন কাজের পরে ক্লায়েন্ট রেটিং আনলক হয়",
  "Live Available Gigs Nearby": "কাছাকাছি উপলব্ধ লাইভ কাজ",
  "0 active": "০টি সক্রিয়",
  "Past Completed Gigs & Reviews": "অতীতের সম্পন্ন কাজ ও পর্যালোচনা",
  "0 completed": "০টি সম্পন্ন",
  "0 available": "০টি উপলব্ধ",
  "Amount in ₹": "পরিমাণ ₹",
  "Workspace — SevaSathi": "ওয়ার্কস্পেস — সেবাসাথী",
  "🚪 Log Out": "🚪 লগ আউট",
  "YOUR ACTIVE SESSION": "আপনার সক্রিয় সেশন",
  "Welcome to": "স্বাগতম",
  "SevaSathi.": "সেবাসাথীতে।",
  "Your personalized dashboard is ready.": "আপনার ব্যক্তিগত ড্যাশবোর্ড প্রস্তুত।",
  "Return to marketplace": "মার্কেটপ্লেসে ফিরে যান",
  "Log Out of Account": "অ্যাকাউন্ট থেকে লগ আউট করুন",
  "CUSTOMER WORKSPACE": "গ্রাহক ওয়ার্কস্পেস",
  "Your tailored workspace": "আপনার উপযোগী ওয়ার্কস্পেস",
  "You remain logged in with this account across all visits until you explicitly log out.": "যতক্ষণ না আপনি নিজে লগ আউট করছেন, সমস্ত ভিজিটে আপনি এই অ্যাকাউন্টে সাইন ইন থাকবেন।",
  "🛡️ Staff Operations": "🛡️ স্টাফ পরিচালনা",
  "Staff Administration": "স্টাফ প্রশাসন",
  "Sign in with operations staff credentials to verify workers, manage customer accounts, and settle dispute tickets.": "কর্মী যাচাই, গ্রাহক অ্যাকাউন্ট পরিচালনা এবং বিরোধ নিষ্পত্তি করতে স্টাফ ক্রেডেনশিয়াল দিয়ে সাইন ইন করুন।",
  "Admin Email": "অ্যাডমিন ইমেল",
  "Role-Based Security:": "রোল-ভিত্তিক নিরাপত্তা:",
  "Customer and worker credentials are strictly denied entry. Staff credentials required on each login.": "গ্রাহক এবং কর্মী ক্রেডেনশিয়াল দিয়ে প্রবেশ নিষেধ। প্রতি লগইনে স্টাফ ক্রেডেনশিয়াল আবশ্যক।",
  "Platform Management & Operations": "প্ল্যাটফর্ম পরিচালনা ও অপারেশনস",
  "Inspect verified documents, oversee gig worker partners, and settle customer disputes.": "যাচাইকৃত নথি পরীক্ষা করুন, গিগ কর্মীদের তদারকি করুন এবং গ্রাহকদের বিরোধ নিষ্পত্তি করুন।",
  "👤 Customer Accounts": "👤 গ্রাহক অ্যাকাউন্ট",
  "⚖️ Disputes & Tickets": "⚖️ বিরোধ ও টিকিট",
  "🏢 Enterprise & Rebalancing": "🏢 এন্টারপ্রাইজ ও ভারসাম্য",
  "Pending Verification": "যাচাইকরণ অপেক্ষমাণ",
  "Approved & Live": "অনুমোদিত ও সক্রিয়",
  "Locality": "এলাকা",
  "Total Customer Accounts": "মোট গ্রাহক অ্যাকাউন্ট",
  "Active Bookings in Pipeline": "চলমান বুকিং",
  "Contact Info": "যোগাযোগের তথ্য",
  "Joined Date": "যোগদানের তারিখ",
  "Bookings Handled": "পরিচালিত বুকিং",
  "Total Dispute Tickets": "মোট বিরোধের টিকিট",
  "Open / Under Review": "উন্মুক্ত / পর্যালোচনাধীন",
  "Settled & Resolved": "নিষ্পত্তিকৃত ও সমাধানকৃত",
  "Ticket Ref & Date": "টিকিট রেফারেন্স ও তারিখ",
  "Complainant": "অভিযোগকারী",
  "Against": "বিপক্ষে",
  "Service & Price": "পরিষেবা ও মূল্য",
  "Category & Statement": "ক্যাটাগরি ও বিবরণ",
  "Total Enterprise Requisitions": "মোট এন্টারপ্রাইজ চাহিদা",
  "Commercial Contracts Active": "সক্রিয় বাণিজ্যিক চুক্তি",
  "Commercial Escrow Invoices": "বাণিজ্যিক এসক্রো ইনভয়েস",
  "Multi-Worker Requisitions": "একাধিক কর্মী চাহিদা",
  "Inspect corporate staffing demands and manually rebalance allocations to ensure fair work distribution across cooperative members.": "কর্পোরেট কর্মী চাহিদা পরীক্ষা করুন এবং সমবায় সদস্যদের মধ্যে ন্যায্য কাজ বণ্টন নিশ্চিত করতে ম্যানুয়ালি ব্যালান্স করুন।",
  "Client Organization": "গ্রাহক সংস্থা",
  "Staff Size": "কর্মীর সংখ্যা",
  "Intervention": "হস্তক্ষেপ",
  "Active Commercial Contracts": "সক্রিয় বাণিজ্যিক চুক্তি",
  "Organization": "প্রতিষ্ঠান",
  "Trade Squad": "কর্মী দল",
  "Total Value": "মোট মূল্য",
  "Review & Settle Task Dispute": "কাজের বিরোধ পর্যালোচনা ও নিষ্পত্তি করুন",
  "Enter admin email": "অ্যাডমিন ইমেল লিখুন",
  "e.g. Aditi Sharma": "যেমন অদিতি শর্মা",
  "you@example.com": "you@example.com",
  "98765 43210": "98765 43210",
  "Specify your trade (e.g. Master Carpenter, High School Maths, AC Tech)": "আপনার পেশা উল্লেখ করুন (যেমন দক্ষ ছুতার, গণিত শিক্ষক, এসি টেকনিশিয়ান)",
  "Type your city name (e.g. Chandigarh, Jaipur, Kochi)": "আপনার শহরের নাম লিখুন (যেমন চণ্ডীগড়, জয়পুর, কোচি)",
  "e.g. Salt Lake & New Town, or Indiranagar": "যেমন সল্টলেক ও নিউটাউন, বা ইন্দিরানগর",
  "e.g. Salt Lake &amp; New Town, or Indiranagar": "जैसे সল্টলেক ও নিউটাউন, বা ইন্দিরানগর",
  "Tell customers what makes your service stand out...": "গ্রাহকদের জানান আপনার সেবা কেন অনন্য...",
  "e.g. Grand Heritage Hotel, CloudNine Tech Park": "যেমন গ্র্যান্ড হেরিটেজ হোটেল, ক্লাউডনাইন টেক পার্ক",
  "e.g. Plot 14, Sector V, Salt Lake, Kolkata": "যেমন প্লট ১৪, সেক্টর ৫, সল্টলেক, কলকাতা",
  "https://yourcompany.com": "https://yourcompany.com",
  "At least 6 characters": "কমপক্ষে ৬টি অক্ষর",
  "you@example.com or 9876543210": "you@example.com অথবা 9876543210",
  "e.g. 482910": "যেমন ৪৮২৯১০",
  "e.g. Industrial Floor Polishing, High-Voltage Wiring, Restroom Sanitation": "যেমন মেঝে পলিশিং, হাই-ভোল্টেজ ওয়্যারিং, ওয়াশরুম পরিচ্ছন্নতা",
  "e.g. Grand Heritage Hotel, Salt Lake Sector V": "যেমন গ্র্যান্ড হেরিটেজ হোটেল, সল্টলেক সেক্টর ৫",
  "e.g. 08:00 AM - 04:00 PM (8 Hours)": "যেমন সকাল ০৮:০০ - বিকাল ০৪:০০ (৮ ঘণ্টা)",
  "Specify any uniform requirements, security clearance, entry gate pass, or safety gear needed on site.": "কাজের স্থানে কোনো নির্দিষ্ট পোশাক, সিকিউরিটি পাস বা নিরাপত্তা সরঞ্জামের প্রয়োজন থাকলে উল্লেখ করুন।",
  "e.g. Can do tomorrow at 4 PM, will bring high-grade copper wires...": "যেমন কাল বিকাল ৪টায় করতে পারব, উন্নত মানের তামার তার নিয়ে আসব...",
  "Detail what occurred with the client...": "গ্রাহকের সাথে কী ঘটেছিল তা বিস্তারিত লিখুন...",
  "Sign in to Partner Portal": "পার্টনার পোর্টালে সাইন ইন করুন",
  "Sign in to Business Portal": "বিজনেস পোর্টালে সাইন ইন করুন",
  "Sign in to SevaSathi": "সেবাসাথীতে সাইন ইন করুন",
  "Submit Partner Application": "পার্টনার আবেদন জমা দিন",
  "Create Business Account": "বিজনেস অ্যাকাউন্ট তৈরি করুন",
  "Create Customer Account": "গ্রাহক অ্যাকাউন্ট তৈরি করুন",
  "Email address or phone number": "ইমেল ঠিকানা বা ফোন নম্বর",
  "Sign in with Google": "Google দিয়ে সাইন ইন করুন",
  "New to SevaSathi?": "সেবাসাথীতে নতুন?",
  "Create an account": "অ্যাকাউন্ট তৈরি করুন",
  "Welcome back, partner.": "স্বাগতম, পার্টনার।",
  "Welcome back, customer.": "স্বাগতম, গ্রাহক।",
  "👥 Multi-Worker Team Hiring": "👥 একাধিক কর্মী নিয়োগ",
  "📜 Recurring Corporate Contracts": "📜 কর্পোরেট চুক্তি",
  "🧾 Consolidated Invoicing": "🧾 একত্রিত ইনভয়েস",
  "I Understand / OK ✓": "আমি বুঝেছি / ঠিক আছে ✓",
  "Join as a Gig Worker →": "গিগ কর্মী হিসেবে যোগ দিন →",
  "Learn how it works ↗": "জানুন এটি কীভাবে কাজ করে ↗",
  "Request a gig →": "কাজের অনুরোধ করুন →",
  "Browse professionals →": "পেশাদারদের দেখুন →",
  "Find an expert →": "পেশাদার খুঁজুন →",
  "View more services →": "আরও পরিষেবা দেখুন →",
  "How we keep you safe →": "আমরা কীভাবে আপনার সুরক্ষা নিশ্চিত করি →",
  "LOOKING FOR HELP": "সাহায্যের প্রয়োজন",
  "Great help for your everyday life.": "আপনার প্রতিদিনের জীবনের জন্য দারুণ সহায়তা।",
  "Great help for": "আপনার প্রতিদিনের জীবনের জন্য",
  "your everyday life.": "দারুণ সহায়তা।",
  "Find, compare and book ID-verified professionals near you with transparent upfront prices and payment protection.": "স্বচ্ছ অগ্রিম মূল্য এবং পেমেন্ট সুরক্ষাসহ আপনার কাছাকাছি আইডি-যাচাইকৃত পেশাদারদের খুঁজুন, তুলনা করুন এবং বুক করুন।",
  "Find & book trusted local pros": "বিশ্বস্ত স্থানীয় পেশাদার খুঁজুন ও বুক করুন",
  "Create your customer account to discover trusted local experts in moments.": "মুহূর্তেই বিশ্বস্ত স্থানীয় বিশেষজ্ঞদের খুঁজে পেতে আপনার গ্রাহক অ্যাকাউন্ট তৈরি করুন।",
  "Welcome back.": "স্বাগতম।",
  "Sign in to your customer account to manage service requests and bookings.": "পরিষেবার অনুরোধ এবং বুকিং পরিচালনা করতে আপনার গ্রাহক অ্যাকাউন্টে সাইন ইন করুন।",
  "Government ID checked and skill-vetted professionals": "সরকারি আইডি যাচাইকৃত এবং দক্ষতা-পরীক্ষিত পেশাদার",
  "Zero hidden commissions, surge charges, or surprises": "কোনো লুকানো কমিশন, বাড়তি চার্জ বা অপ্রত্যাশিত খরচ নেই",
  "Pay After Completion": "কাজ শেষের পর পেমেন্ট",
  "Escrow protection ensures quality work before payment releases": "এসক্রো সুরক্ষা পেমেন্ট ছাড়ার আগে মানসম্মত কাজ নিশ্চিত করে",
  "WORK ON YOUR TERMS": "নিজের শর্তে কাজ করুন",
  "Put your craft to work & earn more.": "আপনার দক্ষতাকে কাজে লাগিয়ে বেশি উপার্জন করুন।",
  "Put your craft to work &": "আপনার দক্ষতাকে কাজে লাগিয়ে",
  "earn more.": "বেশি উপার্জন করুন।",
  "Join over 3,200+ independent local pros. Keep 100% of your tips, enjoy daily direct payouts, and build a lasting business.": "৩,২০০+ এরও বেশি স্বাধীন পেশাদারের সাথে যোগ দিন। আপনার ১০০% টিপস রাখুন, প্রতিদিন সরাসরি পেমেন্ট পান এবং দীর্ঘস্থায়ী ক্যারিয়ার গড়ুন।",
  "WORKER PARTNER PORTAL": "কর্মী পার্টনার পোর্টাল",
  "Grow your business & receive gigs": "আপনার কাজ বাড়ান এবং নতুন কাজ পান",
  "Put your skills to work.": "আপনার দক্ষতাকে কাজে লাগান।",
  "Create your professional partner account and start receiving high-paying local gigs.": "আপনার পেশাদার পার্টনার অ্যাকাউন্ট তৈরি করুন এবং ভালো পারিশ্রমিকের স্থানীয় কাজ পেতে শুরু করুন।",
  "Sign in to your professional portal to view incoming requests and track your earnings.": "আগত অনুরোধ দেখতে এবং উপার্জন ট্র্যাক করতে আপনার পেশাদার পোর্টালে সাইন ইন করুন।",
  "⚡ Same-Day Direct Payouts": "⚡ একই দিনে সরাসরি পেমেন্ট",
  "Direct transfers to your bank account with zero delayed fees": "কোনো বিলম্ব ফি ছাড়াই আপনার ব্যাংক অ্যাকাউন্টে সরাসরি ট্রান্সফার",
  "✦ Keep 100% of Your Tips": "✦ আপনার ১০০% টিপস নিজেই রাখুন",
  "Transparent earnings with absolute compensation fairness": "সম্পূর্ণ ন্যায্য পারিশ্রমিকের সাথে স্বচ্ছ উপার্জন",
  "✓ Set Your Own Hours": "✓ নিজের সময়সূচি নিজেই নির্ধারণ করুন",
  "Accept jobs in your neighborhood on full-time, part-time, or weekend basis": "ফুল-টাইম, পার্ট-টাইম বা উইকেন্ড ভিত্তিতে আপনার এলাকার কাজ গ্রহণ করুন",
  "WORKFORCE AT SCALE": "বৃহৎ পরিসরে কর্মী নিয়োগ",
  "Cooperative staffing for your enterprise.": "আপনার প্রতিষ্ঠানের জন্য সমবায় কর্মী নিয়োগ।",
  "Cooperative staffing for": "আপনার প্রতিষ্ঠানের জন্য",
  "your enterprise.": "সমবায় কর্মী নিয়োগ।",
  "Hire verified multi-worker teams for hotels, facilities, tech parks, and commercial spaces with guaranteed fair allocation and consolidated billing.": "গ্যারান্টিযুক্ত ন্যায্য বণ্টন এবং একত্রিত বিলিংসহ হোটেল, প্রতিষ্ঠান, টেক পার্ক এবং বাণিজ্যিক ভবনের জন্য যাচাইকৃত কর্মী দল নিয়োগ করুন।",
  "BUSINESS & ENTERPRISE PORTAL": "ব্যবসা ও এন্টারপ্রাইজ পোর্টাল",
  "Deploy reliable multi-worker teams": "নির্ভরযোগ্য কর্মী দল নিয়োগ করুন",
  "Post Open Pool Request": "ওপেন পুল অনুরোধ পোস্ট করুন",
  "Post to Open Pro Pool": "ওপেন প্রো পুলে পোস্ট করুন",
  "🚀 Post to Open Pro Pool": "🚀 ওপেন প্রো পুলে পোস্ট করুন",
  "🌐 SevaSathi Open Pro Pool": "🌐 সেবা সাথী ওপেন প্রো পুল",
  "Broadcast to all capable available workers": "সকল সক্ষম ও উপলব্ধ কর্মীদের কাছে সম্প্রচারিত",
  "Custom Open Request": "কাস্টম ওপেন অনুরোধ",
  "Demanded Gig Service / Required Trade": "প্রয়োজনীয় গিগ সেবা / কাজের ধরণ",
  "Select required trade category...": "প্রয়োজনীয় কাজের ধরণ নির্বাচন করুন...",
  "Other Custom Trade (Specify below)": "অন্যান্য কাস্টম কাজ (নিচে উল্লেখ করুন)",
  "Type your demanded service (e.g. AC Repair, Sofa Upholstery, Math Tutor, Balcony Netting)": "আপনার প্রয়োজনীয় সেবা লিখুন (যেমন: এসি মেরামত, সোফা আপহোলস্ট্রি, অংক টিউটর, বারান্দার নেট)",
  "Preferred Date": "পছন্দের তারিখ",
  "Preferred Time Slot": "পছন্দের সময় স্লট",
  "Flexible / Any Time": "নমনীয় সময় / যেকোনো সময়",
  "06:00 AM – 09:00 AM (Early Morning)": "সকাল ০৬:০০ – ০৯:০০ (ভোর/সকাল)",
  "09:00 AM – 12:00 PM (Morning)": "সকাল ০৯:০০ – দুপুর ১২:০০ (সকাল)",
  "12:00 PM – 03:00 PM (Afternoon)": "দুপুর ১২:০০ – ০৩:০০ (দুপুর)",
  "03:00 PM – 06:00 PM (Late Afternoon)": "দুপুর ০৩:০০ – সন্ধ্যা ০৬:০০ (বিকেল)",
  "06:00 PM – 09:00 PM (Evening)": "সন্ধ্যা ০৬:০০ – রাত ০৯:০০ (সন্ধ্যা)",
  "09:00 PM – 11:00 PM (Night)": "রাত ০৯:০০ – ১১:০০ (রাত)",
  "Specific Time / Custom Hour (Specify below)": "নির্দিষ্ট সময় / কাস্টম সময় (নিচে উল্লেখ করুন)",
  "e.g. 10:30 AM, 4:00 PM, Tomorrow 2 PM": "যেমন: 10:30 AM, 4:00 PM, আগামীকাল দুপুর ২টা",
  "Enter your specific preferred time (e.g. 10:30 AM, 4:00 PM)": "আপনার পছন্দের নির্দিষ্ট সময় লিখুন (যেমন: 10:30 AM, 4:00 PM)",
  "Service Locality / Flat Address": "সেবার এলাকা / ফ্ল্যাটের ঠিকানা",
  "Task Requirements & Instructions": "কাজের বিবরণ ও নির্দেশনা",
  "Polish Task with AI": "এআই দিয়ে কাজের বিবরণ উন্নত করুন",
  "✨ Polish Task with AI": "✨ এআই দিয়ে কাজের বিবরণ উন্নত করুন",
  "AI Thinking...": "এআই চিন্তা করছে...",
  "✦ AI Thinking...": "✦ এআই চিন্তা করছে...",
  "Describe the job in detail (e.g. Master bathroom sink drain clogged, leaking pipe under the cabinet)...": "কাজের বিস্তারিত বিবরণ দিন (যেমন: বাথরুমের সিঙ্ক জ্যাম, কেবিনেটের নিচে পাইপ লিক করছে)...",
  "Your Proposed Budget / Offer": "আপনার প্রস্তাবিত বাজেট / অফার",
  "(Two-way bargaining enabled)": "(উভয়মুখী দরকষাকষি সক্রিয়)",
  "Enter any budget in ₹": "যেকোনো বাজেট ₹-এ লিখুন",
  "Price & Timing Bargaining:": "দাম ও সময় নির্ধারণের দরকষাকষি:",
  "You propose your initial budget here (enter any amount). The worker can accept directly or respond with an adjusted time or counter-offer for your approval!": "আপনি এখানে আপনার প্রাথমিক বাজেট প্রস্তাব করুন (যেকোনো পরিমাণ লিখুন)। কর্মী সরাসরি গ্রহণ করতে পারেন অথবা আপনার অনুমোদনের জন্য পরিবর্তিত সময় বা পাল্টা অফার দিতে পারেন!",
  "Confirm Appointment Request": "অ্যাপয়েন্টমেন্ট অনুরোধ নিশ্চিত করুন",
  "🚀 Confirm Appointment Request": "🚀 অ্যাপয়েন্টমেন্ট অনুরোধ নিশ্চিত করুন",
  "Sending Request...": "অনুরোধ পাঠানো হচ্ছে...",
  "⏳ Sending Request...": "⏳ অনুরোধ পাঠানো হচ্ছে...",
  "Appointment Request Sent!": "অ্যাপয়েন্টমেন্ট অনুরোধ পাঠানো হয়েছে!",
  "🌐 Open Pool Request Posted!": "🌐 ওপেন পুল অনুরোধ সফলভাবে পোস্ট হয়েছে!",
  "Open Pool Request Posted!": "ওপেন পুল অনুরোধ সফলভাবে পোস্ট হয়েছে!",
  "View My Bookings & Negotiations": "আমার বুকিং ও দরকষাকষি দেখুন",
  "📅 View My Bookings & Negotiations": "📅 আমার বুকিং ও দরকষাকষি দেখুন",
  "View Appointments & Matching Specialists": "অ্যাপয়েন্টমেন্ট ও উপযুক্ত বিশেষজ্ঞ দেখুন",
  "📦 View Appointments & Matching Specialists": "📦 অ্যাপয়েন্টমেন্ট ও উপযুক্ত বিশেষজ্ঞ দেখুন",
  "Done": "সম্পন্ন",
  "Back to specialist list": "বিশেষজ্ঞ তালিকায় ফিরে যান",
  "← Back to specialist list": "← বিশেষজ্ঞ তালিকায় ফিরে যান",
  "Please fill in your address and task instructions.": "অনুগ্রহ করে আপনার ঠিকানা এবং কাজের নির্দেশনা পূরণ করুন।",
  "Please write a brief summary of your task first!": "অনুগ্রহ করে প্রথমে আপনার কাজের একটি সংক্ষিপ্ত বিবরণ লিখুন!",
  "Job scope polished with AI!": "এআই দিয়ে কাজের বিবরণ সুন্দরভাবে পরিমার্জিত হয়েছে!",
  "✨ Job scope polished with AI!": "✨ এআই দিয়ে কাজের বিবরণ সুন্দরভাবে পরিমার্জিত হয়েছে!",
  "Enter Custom Job Needs →": "কাস্টম কাজের চাহিদা লিখুন →",
  "Awaiting Specialist Claim (Open Pool)": "বিশেষজ্ঞের দাবির অপেক্ষায় (ওপেন পুল)",
  "Open Pro Pool Request:": "ওপেন প্রো পুল অনুরোধ:",
  "open pool": "ওপেন পুল",
  "paid & scheduled": "পরিশোধিত ও নির্ধারিত",
  "Request Specialist Directly": "সরাসরি বিশেষজ্ঞকে অনুরোধ করুন",
  "⚡ Request Specialist Directly": "⚡ সরাসরি বিশেষজ্ঞকে অনুরোধ করুন",
  "Broadcasting to Cooperative": "সমবায়ে সম্প্রচারিত",
  "Broadcasting in": "সম্প্রচারিত হচ্ছে",
  "Custom Pool Request Created!": "কাস্টম পুল অনুরোধ তৈরি হয়েছে!",
  "No immediate specialized worker was free for": "এই মুহূর্তে কোনো বিশেষ কর্মী সরাসরি উপলব্ধ ছিল না",
  "in your immediate vicinity, so we created an open cooperative job pool.": "আপনার আশেপাশের এলাকায়, তাই আমরা একটি উন্মুক্ত সমবায় জব পুল তৈরি করেছি।",
  "Requested Service:": "অনুরোধকৃত সেবা:",
  "Custom Service": "কাস্টম সেবা",
  "Pool Status:": "পুলের অবস্থা:",
  "Location:": "স্থান:",
  "Your Registered Location": "আপনার নিবন্ধিত অবস্থান",
  "Listen Again": "আবার শুনুন",
  "🔊 Listen Again": "🔊 আবার শুনুন",
  "📢 Request Custom Service / Post to Open Pro Pool": "📢 কাস্টম পরিষেবার অনুরোধ করুন / ওপেন প্রো পুলে পোস্ট করুন",
  "Request Custom Service / Post to Open Pro Pool": "কাস্টম পরিষেবার অনুরোধ করুন / ওপেন প্রো পুলে পোস্ট করুন",
  "⚡ Post Request to Open Gig Pool": "⚡ ওপেন গিগ পুলে অনুরোধ পোস্ট করুন",
  "Post Request to Open Gig Pool": "ওপেন গিগ পুলে অনুরোধ পোস্ট করুন",
  "📢 Post Request to Open Gig Pool": "📢 ওপেন গিগ পুলে অনুরোধ পোস্ট করুন",
  "Pet Care & Dog Walking": "পোষ্য প্রাণীর যত্ন ও হাঁটা",
  "Don’t worry! You can book cross-trained verified pros in": "চিন্তা করবেন না! আপনি যাচাইকৃত পেশাদারদের বুক করতে পারেন",
  "below or post your request to our open gig pool.": "নিচে বা আমাদের ওপেন গিগ পুলে আপনার অনুরোধ পোস্ট করতে পারেন।",
  "Specify Your Location": "আপনার অবস্থান নির্দিষ্ট করুন",
  "Search city or locality…": "শহর বা এলাকা খুঁজুন…",
  "Available Cities": "উপলব্ধ শহরসমূহ",
  "Use current location (GPS)": "বর্তমান অবস্থান ব্যবহার করুন (GPS)",
  "Use Current Location (GPS / Google Maps)": "বর্তমান অবস্থান ব্যবহার করুন (GPS / Google Maps)",
  "Before looking for specialists or booking services, please specify your location. We match you strictly with verified local specialists in your city.": "বিশেষজ্ঞ খোঁজার বা পরিষেবা বুক করার আগে, দয়া করে আপনার অবস্থান নির্দিষ্ট করুন। আমরা আপনাকে আপনার শহরের যাচাইকৃত স্থানীয় বিশেষজ্ঞদের সাথেই মেলাই।",
  "Or select your city": "বা আপনার শহর নির্বাচন করুন",
  "Search street, locality or other city…": "রাস্তা, এলাকা বা অন্য শহর খুঁজুন…",
  "📍 Service Area Setup": "📍 সেবা অঞ্চল সেটআপ",
  "Where are you located?": "আপনি কোথায় অবস্থিত?",
  "To connect you with verified specialists and real-time localized pricing, please confirm your current location.": "যাচাইকৃত বিশেষজ্ঞ এবং রিয়েল-টাইম স্থানীয় মূল্যের সাথে যুক্ত হতে, দয়া করে আপনার বর্তমান অবস্থান নিশ্চিত করুন।",
  "Detect My Current Location (GPS / Map API)": "আমার বর্তমান অবস্থান সনাক্ত করুন (GPS / Map)",
  "Or search locality / select city": "বা এলাকা খুঁজুন / শহর নির্বাচন করুন",
  "Search area, landmark or street (e.g. Koramangala)...": "এলাকা, ল্যান্ডমার্ক বা রাস্তা খুঁজুন (যেমন কোরামঙ্গলা)...",
  "Popular Cities": "জনপ্রিয় শহরসমূহ",
  "Results and prices will immediately update according to workers available in your selected location.": "আপনার নির্বাচিত অবস্থানে উপলব্ধ কর্মীদের উপর ভিত্তি করে ফলাফল এবং মূল্য অবিলম্বে আপডেট হবে।",
  "⚡ Results and prices will immediately update according to workers available in your selected location.": "⚡ আপনার নির্বাচিত অবস্থানে উপলব্ধ কর্মীদের উপর ভিত্তি করে ফলাফল এবং মূল্য অবিলম্বে আপডেট হবে।",
  "Verified Service Specialists": "যাচাইকৃত পরিষেবা বিশেষজ্ঞ",
  "Verified background-checked specialists serving": "যাচাইকৃত ও ব্যাকগ্রাউন্ড-চেক করা বিশেষজ্ঞ যারা সেবা দিচ্ছেন",
  "🛡️ SevaSathi Guarantee": "🛡️ সেবাসাথী গ্যারান্টি",
  "Standard Visit": "স্ট্যান্ডার্ড ভিজিট",
  "Visit Base": "ভিজিট বেস চার্জ",
  "📅 Book Appointment": "📅 অ্যাপয়েন্টমেন্ট বুক করুন",
  "Book Appointment": "অ্যাপয়েন্টমেন্ট বুক করুন",
  "Finding verified specialists in your city...": "আপনার শহরে যাচাইকৃত বিশেষজ্ঞ খোঁজা হচ্ছে...",
  "Unable to connect to worker directory.": "কর্মী ডিরেক্টরির সাথে সংযোগ করা সম্ভব হয়নি।",
  "Retry": "পুনরায় চেষ্টা করুন",
  "Cross-Trained & Similar Available Pros": "অন্যান্য প্রশিক্ষিত ও একই ধরনের উপলব্ধ কর্মী",
  "Post your requirement to all qualified workers in your area. Available pros with open schedules will review your task, accept, or offer bargain timings & prices!": "আপনার এলাকার সমস্ত যোগ্য কর্মীদের কাছে আপনার চাহিদা পাঠান। উপলব্ধ কর্মীরা আপনার কাজ পর্যালোচনা করবে, গ্রহণ করবে বা দরদামের সময় ও মূল্য প্রস্তাব করবে!",
  "Partner Workspace & Gigs": "পার্টনার ওয়ার্কস্পেস ও কাজ",
  "Daily Payouts & Tips (100%)": "দৈনিক পেআউট ও টিপস (১০০%)",
  "Partner Code & Escrow": "পার্টনার আচরণবিধি ও এসক্রো",
  "Explore All Services": "সমস্ত পরিষেবা দেখুন",
  "How SevaSathi Works & Safety": "সেবাসাথী কীভাবে কাজ করে ও নিরাপত্তা",
  "🛠️ Pro Partner": "🛠️ প্রো পার্টনার",
  "My Appointments & Bargains": "আমার অ্যাপয়েন্টমেন্ট ও দরদাম",
  "Loading your appointments & live bargains...": "আপনার অ্যাপয়েন্টমেন্ট ও লাইভ দরদাম লোড হচ্ছে...",
  "Please sign in to view your appointments.": "আপনার অ্যাপয়েন্টমেন্ট দেখতে অনুগ্রহ করে সাইন ইন করুন।",
  "No Active Appointments Yet": "এখনও কোনও সক্রিয় অ্যাপয়েন্টমেন্ট নেই",
  "Choose any service card from our directory to find verified workers and schedule your first visit!": "যাচাইকৃত কর্মীদের খুঁজে পেতে এবং আপনার প্রথম ভিজিট নির্ধারণ করতে আমাদের ডিরেক্টরি থেকে যেকোনো পরিষেবা কার্ড বেছে নিন!",
  "Explore Services": "পরিষেবাগুলি দেখুন",
  "Worker Accepted Your Task!": "কর্মী আপনার কাজটি গ্রহণ করেছেন!",
  "Specialist accepted your terms. Complete payment to secure funds in escrow.": "বিশেষজ্ঞ আপনার শর্তাদি গ্রহণ করেছেন। এসক্রোতে তহবিল সুরক্ষিত করতে অর্থপ্রদান সম্পূর্ণ করুন।",
  "Specialist is scheduled. Escrow funds will release upon task completion.": "বিশেষজ্ঞ নির্ধারিত হয়েছে। কাজ শেষ হলে এসক্রো তহবিল মুক্তি পাবে।",
  "Task Successfully Completed by": "কাজ সফলভাবে সম্পন্ন করেছেন:",
  "Rate Specialist & Leave Review": "বিশেষজ্ঞকে রেটিং দিন এবং পর্যালোচনা লিখুন",
  "Submit Rating & Review": "রেটিং ও পর্যালোচনা জমা দিন",
  "Customer Rating Dismissed by Admin": "অ্যাডমিন দ্বারা গ্রাহক রেটিং বাতিল করা হয়েছে",
  "File a Dispute / Request Refund": "একটি বিরোধ দায়ের করুন / রিফান্ডের অনুরোধ করুন",
  "Report an issue with this service": "এই পরিষেবার সাথে একটি সমস্যা রিপোর্ট করুন",
  "Customer Proposed Counter-Terms:": "গ্রাহক পাল্টা শর্ত প্রস্তাব করেছেন:",
  "Worker Proposed Adjustment:": "কর্মী সমন্বয় প্রস্তাব করেছেন:",
  "Accept Adjusted Terms": "সমন্বিত শর্তাবলী গ্রহণ করুন",
  "Decline & Cancel": "প্রত্যাখ্যান করুন ও বাতিল করুন",
  "Propose New Counter-Offer": "নতুন পাল্টা অফার প্রস্তাব করুন",
  "Cancel Appointment": "অ্যাপয়েন্টমেন্ট বাতিল করুন",
  "Select stars (1–5) and share a few words about your experience (optional):": "স্টার (১-৫) নির্বাচন করুন এবং আপনার অভিজ্ঞতা সম্পর্কে কিছু কথা শেয়ার করুন (ঐচ্ছিক):",
  "Have an issue or dispute with this completed task?": "এই সম্পন্ন কাজের সাথে কি কোনো সমস্যা বা বিরোধ আছে?",
  "Issue Category": "সমস্যার বিভাগ",
  "Work Incomplete / Poor Quality": "কাজ অসম্পূর্ণ / নিম্নমানের",
  "Property Damage / Loss": "সম্পত্তির ক্ষতি / ক্ষতিসাধন",
  "Overcharging / Extra Cash Demanded": "অতিরিক্ত চার্জ / অতিরিক্ত নগদ দাবি",
  "Unprofessional / Inappropriate Conduct": "অপেশাদার / অনুচিত আচরণ",
  "Delayed Arrival / Left Early": "দেরিতে আগমন / তাড়াতাড়ি চলে যাওয়া",
  "Other Service Dispute": "অন্যান্য পরিষেবা বিরোধ",
  "Desired Settlement": "কাঙ্ক্ষিত নিষ্পত্তি",
  "Full Escrow Refund": "সম্পূর্ণ এসক্রো রিফান্ড",
  "Partial Escrow Refund": "আংশিক এসক্রো রিফান্ড",
  "Free Re-work / Rectification": "বিনামূল্যে পুনরায় কাজ / সংশোধন",
  "Account Warning to Specialist": "বিশেষজ্ঞকে অ্যাকাউন্টে সতর্কতা",
  "Description of the issue": "সমস্যার বিবরণ",
  "Submit Ticket to Admin": "অ্যাডমিনের কাছে টিকিট জমা দিন",
  "Cancel Ticket": "টিকিট বাতিল করুন",
  "Secure SevaSathi Escrow Checkout": "নিরাপদ সেবাসাথী এসক্রো চেকআউট",
  "Service Task": "পরিষেবা কাজ",
  "Specialist:": "বিশেষজ্ঞ:",
  "Amount Due": "প্রদেয় পরিমাণ",
  "Select Payment Method:": "পেমেন্ট পদ্ধতি নির্বাচন করুন:",
  "Instant UPI (PhonePe / GPay / Paytm)": "তাত্ক্ষণিক ইউপিআই (PhonePe / GPay / Paytm)",
  "Instant escrow deposit (0% fee)": "তাত্ক্ষণিক এসক্রো জমা (০% ফি)",
  "Debit / Credit Card (•••• 4242)": "ডেবিট / ক্রেডিট কার্ড (•••• 4242)",
  "Visa, Mastercard, RuPay": "ভিসা, মাস্টারকার্ড, রুপে",
  "Net Banking (HDFC / SBI / ICICI)": "নেট ব্যাংকিং (HDFC / SBI / ICICI)",
  "Direct Escrow Wire": "সরাসরি এসক্রো ওয়্যার স্থানান্তর",
  "SevaSathi 100% Escrow Guarantee:": "সেবাসাথী ১০০% এসক্রো গ্যারান্টি:",
  "Your payment is held safely in escrow. The specialist cannot claim payout until the task is successfully performed and marked completed.": "আপনার পেমেন্ট নিরাপদে এসক্রোতে রাখা হয়। কাজটি সফলভাবে সম্পন্ন না হওয়া পর্যন্ত বিশেষজ্ঞ অর্থ দাবি করতে পারবেন না।",
  "APPLICATION UNDER REVIEW": "আবেদন পর্যালোচনাধীন",
  "No Pending Requests in Your Trade Yet": "আপনার পেশায় এখনও কোনো মুলতুবি অনুরোধ নেই",
  "Customer Instructions:": "গ্রাহকের নির্দেশাবলী:",
  "Your Counter Price (₹)": "আপনার পাল্টা মূল্য (₹)",
  "Adjusted Time Slot": "সমন্বিত সময় স্লট",
  "Note to Customer (Reason/Materials)": "গ্রাহকের জন্য নোট (কারণ/উপাদান)",
  "Send Counter-Offer": "পাল্টা প্রস্তাব পাঠান",
  "Accept Task": "কাজ গ্রহণ করুন",
  "Decline": "প্রত্যাখ্যান করুন",
  "Mark Work Completed": "কাজ সম্পন্ন চিহ্নিত করুন",
  "No Completed Jobs Yet": "এখনও কোনও সম্পন্ন কাজ নেই",
  "No Open Commercial Requisitions in Your Trade": "আপনার পেশায় কোনো উন্মুক্ত বাণিজ্যিক চাহিদা নেই",
  "Tutoring": "টিউশন",
  "Book tutoring": "টিউশন বুক করুন",
  "View tutoring": "টিউশন দেখুন",
  "Describe what you need — “a leaking tap”, “help moving”, “home tutor”": "কী কাজ প্রয়োজন লিখুন — “পানির কল লিক”, “বাসা বদল”, “হোম টিউটর”",
  "“Found a brilliant tutor for my daughter in one evening. Her grades improved immediately.”": "“আমার মেয়ের জন্য এক সন্ধ্যাতেই একজন অসাধারণ শিক্ষক পেলাম। তার পরীক্ষার ফলাফলে তাৎক্ষণিক উন্নতি হয়েছে।”",
  "Specify your trade (e.g. Master Carpenter, Academic Tutoring, AC Tech)": "আপনার পেশা উল্লেখ করুন (যেমন দক্ষ ছুতার, একাডেমিক টিউশন, এসি টেকনিশিয়ান)",
  "Type your demanded service (e.g. AC Repair, Sofa Upholstery, Tutor, Balcony Netting)": "আপনার প্রয়োজনীয় সেবা লিখুন (যেমন এসি মেরামত, সোফা কুশন, টিউটর, ব্যালকনি নেট)",
  "Class 9–12 CBSE/ICSE Tutoring": "ক্লাস ৯–১২ সিবিএসই/আইসিএসই টিউশন",
  "Which city or area do you need this service in?": "দয়া করে বলুন আপনি কোন শহর বা এলাকায় এই পরিষেবা চান?",
  "We found verified specialists for you:": "আমরা আপনার জন্য যাচাইকৃত বিশেষজ্ঞ পেয়েছি:",
  "📋 Custom Gig Requirement Details (5 of 5 needed)": "📋 কাস্টম গিগ প্রয়োজনীয় বিবরণ (৫টির মধ্যে ৫টি প্রয়োজন)",
  "1. Service / Trade": "১. পরিষেবা / কাজ",
  "2. Service Location": "২. কাজের স্থান",
  "3. Scheduled Date": "৩. নির্ধারিত তারিখ",
  "4. Preferred Time Window": "৪. পছন্দের সময়",
  "5. Proposed Budget / Rate": "৫. প্রস্তাবিত বাজেট / রেট",
  "✓ Not specified": "⏳ নির্দিষ্ট করা হয়নি",
  "⏳ Not specified": "⏳ নির্দিষ্ট করা হয়নি",
  "⏳ Missing": "⏳ স্থান প্রয়োজন",
  "⏳ Pending": "⏳ বাকি আছে",
  "✅ All 5 Requirements Gathered": "✅ ৫টি প্রয়োজনীয় বিবরণই পাওয়া গেছে",
  "Service:": "পরিষেবা:",
  "Date:": "তারিখ:",
  "Time:": "সময়:",
  "Offer Rate:": "প্রস্তাবিত রেট:",
  "🚀 Post Request to Open Gig Pool Now": "🚀 ওপেন গিগ পুলে এখনই পোস্ট করুন",
  "📋 View My Bookings & Negotiations": "📋 আমার বুকিং ও দরদাম দেখুন",
  "Starting from ₹": "শুরু ₹",
  "SevaSathi AI Voice & Text Assistant": "সেবা সাথী এআই ভয়েস ও টেক্সট সহকারী",
  "Speak or reply in English, हिन्दी, or বাংলা...": "ইংরেজি, हिन्दी বা বাংলা-তে বলুন বা লিখুন..."
}
  };

  // Build lowercase lookup maps for fast case-insensitive matching
  const LOWER_MAP = {
    hi: {},
    bn: {}
  };
  // Build inverted lookup map to restore English from Hindi/Bangla
  const INVERTED_MAP = {};

  Object.entries(PHRASE_MAP.hi).forEach(([enKey, hiVal]) => {
    LOWER_MAP.hi[enKey.toLowerCase()] = hiVal;
    INVERTED_MAP[hiVal] = enKey;
  });
  Object.entries(PHRASE_MAP.bn).forEach(([enKey, bnVal]) => {
    LOWER_MAP.bn[enKey.toLowerCase()] = bnVal;
    INVERTED_MAP[bnVal] = enKey;
  });

  let currentLang = 'en';
  let isTranslating = false;
  let debounceTimer = null;
  let domObserver = null;

  function getStoredLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGS[stored]) return stored;
    } catch (e) {}
    return 'en';
  }

  function saveStoredLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function setLanguage(lang, syncSession = true) {
    if (!SUPPORTED_LANGS[lang]) return;
    currentLang = lang;
    saveStoredLanguage(lang);
    document.documentElement.lang = lang;

    // Update session preference if logged in
    if (syncSession) {
      updateSessionLanguage(lang);
    }

    // Update dropdown UI labels
    updateSelectorUI();

    // Trigger full translation
    applyTranslations();

    // Dispatch global event for interested components (e.g. AI assistant, dynamic tables)
    window.dispatchEvent(new CustomEvent('sevasathi:languageChanged', { detail: { language: lang } }));
  }

  function updateSelectorUI() {
    document.querySelectorAll('.lang-selector-wrap').forEach(wrap => {
      const activeLabel = wrap.querySelector('.lang-active-label');
      if (activeLabel) {
        activeLabel.textContent = SUPPORTED_LANGS[currentLang].name;
      }
      wrap.querySelectorAll('.lang-option').forEach(opt => {
        const optLang = opt.getAttribute('data-lang');
        opt.classList.toggle('active', optLang === currentLang);
      });
    });
  }

  function updateSessionLanguage(lang) {
    try {
      if (window.SevaSathiSession && typeof window.SevaSathiSession.getUser === 'function') {
        const user = window.SevaSathiSession.getUser();
        if (user) {
          user.preferredLanguage = lang;
          if (typeof window.SevaSathiSession.setUser === 'function') {
            window.SevaSathiSession.setUser(user);
          } else {
            localStorage.setItem('hustleCurrentUser', JSON.stringify(user));
          }
        }
      } else {
        const raw = localStorage.getItem('hustleCurrentUser');
        if (raw) {
          const user = JSON.parse(raw);
          user.preferredLanguage = lang;
          localStorage.setItem('hustleCurrentUser', JSON.stringify(user));
        }
      }
    } catch (e) {
      console.warn('Failed to sync preferred language with session:', e.message);
    }
  }

  // Regex dynamic pattern translator for numbers, pricing, ratings, and budgets
  function translatePatterns(text, lang) {
    if (!text || lang === 'en') return text;

    // Pattern 1: From ₹X, From ₹X/month, From ₹X/hr, From ₹X/session
    text = text.replace(/From\s+₹([\d,]+)(\/month|\/hr|\/session)?/gi, (match, amount, unit) => {
      if (lang === 'hi') {
        if (unit === '/month') return `₹${amount}/माह से`;
        if (unit === '/hr') return `₹${amount}/घंटा से`;
        if (unit === '/session') return `₹${amount}/सत्र से`;
        return `₹${amount} से`;
      } else if (lang === 'bn') {
        if (unit === '/month') return `₹${amount}/মাস থেকে`;
        if (unit === '/hr') return `₹${amount}/ঘণ্টা থেকে`;
        if (unit === '/session') return `₹${amount}/সেশন থেকে`;
        return `₹${amount} থেকে`;
      }
      return match;
    });

    // Pattern 2: (\d+) jobs
    text = text.replace(/^(\d+)\s*jobs$/i, (match, count) => {
      if (lang === 'hi') return `${count} काम`;
      if (lang === 'bn') return `${count}টি কাজ`;
      return match;
    });

    // Pattern 3: ★ 4.9 average rating · 18,500+ verified reviews
    text = text.replace(/★?\s*(\d+\.\d+)\s*average rating\s*·\s*([\d,]+)\+?\s*verified reviews/gi, (match, rating, revCount) => {
      if (lang === 'hi') return `★ ${rating} औसत रेटिंग · ${revCount}+ सत्यापित समीक्षाएं`;
      if (lang === 'bn') return `★ ${rating} গড় রেটিং · ${revCount}+ যাচাইকৃত পর্যালোচনা`;
      return match;
    });

    // Pattern 4: ₹1,500 budget · 3 replies
    text = text.replace(/₹([\d,]+)\s*budget\s*·\s*(\d+)\s*replies/gi, (match, budget, replies) => {
      if (lang === 'hi') return `₹${budget} बजट · ${replies} जवाब`;
      if (lang === 'bn') return `₹${budget} বাজেট · ${replies}টি সাড়া`;
      return match;
    });

    // Pattern 5: 3 pros are interested
    text = text.replace(/(\d+)\s*pros are interested/gi, (match, count) => {
      if (lang === 'hi') return `${count} पेशेवर इच्छुक हैं`;
      if (lang === 'bn') return `${count} জন কর্মী আগ্রহী`;
      return match;
    });

    // Pattern 6: Time slots with (Morning), (Afternoon), etc.
    text = text.replace(/06:00 AM [–\-] 09:00 AM \(Early Morning\)/gi, () => {
      return lang === 'hi' ? 'सुबह 06:00 – 09:00 (प्रातःकाल)' : 'সকাল ০৬:০০ – ০৯:০০ (ভোর/সকাল)';
    });
    text = text.replace(/09:00 AM [–\-] 12:00 PM \(Morning\)/gi, () => {
      return lang === 'hi' ? 'सुबह 09:00 – दोपहर 12:00 (सुबह)' : 'সকাল ০৯:০০ – দুপুর ১২:০০ (সকাল)';
    });
    text = text.replace(/12:00 PM [–\-] 03:00 PM \(Afternoon\)/gi, () => {
      return lang === 'hi' ? 'दोपहर 12:00 – 03:00 (दोपहर)' : 'দুপুর ১২:০০ – ০৩:০০ (দুপুর)';
    });
    text = text.replace(/03:00 PM [–\-] 06:00 PM \(Late Afternoon\)/gi, () => {
      return lang === 'hi' ? 'दोपहर 03:00 – शाम 06:00 (अपराह्न)' : 'দুপুর ০৩:০০ – সন্ধ্যা ০৬:০০ (বিকেল)';
    });
    text = text.replace(/06:00 PM [–\-] 09:00 PM \(Evening\)/gi, () => {
      return lang === 'hi' ? 'शाम 06:00 – रात 09:00 (शाम)' : 'সন্ধ্যা ০৬:০০ – রাত ০৯:০০ (সন্ধ্যা)';
    });
    text = text.replace(/09:00 PM [–\-] 11:00 PM \(Night\)/gi, () => {
      return lang === 'hi' ? 'रात 09:00 – 11:00 (रात)' : 'রাত ০৯:০০ – ১১:০০ (রাত)';
    });
    text = text.replace(/Flexible \/ Any Time/gi, () => {
      return lang === 'hi' ? 'लचीला समय / किसी भी समय' : 'নমনীয় সময় / যেকোনো সময়';
    });

    // Pattern 7: Date, Time, Price, Area in customer booking details
    text = text.replace(/⏱\s*Time:/gi, () => lang === 'hi' ? '⏱ समय:' : '⏱ সময়:');
    text = text.replace(/📅\s*Date:/gi, () => lang === 'hi' ? '📅 तारीख:' : '📅 তারিখ:');
    text = text.replace(/💰\s*Price:/gi, () => lang === 'hi' ? '💰 मूल्य:' : '💰 মূল্য:');
    text = text.replace(/📍\s*Area:/gi, () => lang === 'hi' ? '📍 क्षेत्र:' : '📍 এলাকা:');
    text = text.replace(/Broadcasting in\s+([a-zA-Z\s]+)/gi, (m, city) => {
      return lang === 'hi' ? `${city.trim()} में प्रसारित हो रहा है` : `${city.trim()} এ সম্প্রচারিত হচ্ছে`;
    });
    text = text.replace(/Open Pro Pool Request:\s*(.+)/gi, (m, sName) => {
      return lang === 'hi' ? `ओपन प्रो पूल अनुरोध: ${sName}` : `ওপেন প্রো পুল অনুরোধ: ${sName}`;
    });

    // Pattern 8: Payment Ready & Pay Now button
    text = text.replace(/💳\s*Payment Ready:\s*₹([\d,]+)/gi, (m, amt) => {
      return lang === 'hi' ? `💳 भुगतान तैयार: ₹${amt}` : `💳 পেমেন্ট প্রস্তুত: ₹${amt}`;
    });
    text = text.replace(/💳\s*Pay\s*₹([\d,]+)\s*Now/gi, (m, amt) => {
      return lang === 'hi' ? `💳 अभी ₹${amt} का भुगतान करें` : `💳 এখনই ₹${amt} পেমেন্ট করুন`;
    });
    text = text.replace(/Payment of ₹([\d,]+) Verified & Held in Escrow:/gi, (m, amt) => {
      return lang === 'hi' ? `₹${amt} का भुगतान सत्यापित और एस्क्रो में सुरक्षित:` : `₹${amt} পেমেন্ট যাচাইকৃত এবং এসক্রোতে রক্ষিত:`;
    });

    return text;
  }

  // Deep DOM text translator using robust per-node tracking and pattern substitution
  function applyTranslations(root = document.body) {
    if (!root || isTranslating) return;
    isTranslating = true;

    // Disconnect observer during translation pass to eliminate infinite observer feedback loops
    if (domObserver) {
      domObserver.disconnect();
    }

    try {
      const dict = PHRASE_MAP[currentLang] || {};
      const lowerDict = LOWER_MAP[currentLang] || {};

      // 1. Handle Placeholders
      root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        if (input.closest('.lang-selector-wrap') || input.closest('.ai-chat-bubble.user')) return;
        const original = input.getAttribute('data-orig-placeholder') || input.getAttribute('placeholder');
        if (!input.hasAttribute('data-orig-placeholder')) {
          input.setAttribute('data-orig-placeholder', original);
        }

        if (currentLang === 'en') {
          if (input.getAttribute('placeholder') !== original) {
            input.setAttribute('placeholder', original);
          }
        } else {
          const rep = dict[original] || lowerDict[original.toLowerCase()] || translatePatterns(original, currentLang);
          if (rep && input.getAttribute('placeholder') !== rep) {
            input.setAttribute('placeholder', rep);
          }
        }
      });

      // 2. Handle Select Dropdown Options
      root.querySelectorAll('select option').forEach(opt => {
        if (opt.closest('.lang-selector-wrap')) return;
        const original = opt.getAttribute('data-orig-text') || opt.textContent.trim();
        if (!opt.hasAttribute('data-orig-text')) {
          opt.setAttribute('data-orig-text', original);
        }

        if (currentLang === 'en') {
          if (opt.textContent !== original) {
            opt.textContent = original;
          }
        } else {
          const rep = dict[original] || lowerDict[original.toLowerCase()] || translatePatterns(original, currentLang);
          if (rep && opt.textContent !== rep) {
            opt.textContent = rep;
          }
        }
      });

      // 3. Handle Tooltips and aria-labels
      root.querySelectorAll('[aria-label], [title]').forEach(el => {
        if (el.closest('.lang-selector-wrap') || el.closest('.ai-chat-bubble.user')) return;
        const aria = el.getAttribute('aria-label');
        if (aria) {
          const origAria = el.getAttribute('data-orig-aria') || aria;
          if (!el.hasAttribute('data-orig-aria')) el.setAttribute('data-orig-aria', origAria);
          if (currentLang === 'en') {
            if (el.getAttribute('aria-label') !== origAria) el.setAttribute('aria-label', origAria);
          } else {
            const rep = dict[origAria] || lowerDict[origAria.toLowerCase()];
            if (rep && el.getAttribute('aria-label') !== rep) el.setAttribute('aria-label', rep);
          }
        }
      });

      // 4. Handle Text Nodes across the entire DOM tree
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'noscript' || tag === 'code' || tag === 'kbd' || tag === 'textarea' || tag === 'option') {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.closest('.lang-selector-wrap') || parent.closest('.ai-chat-bubble.user')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const nodesToUpdate = [];
      while (walker.nextNode()) {
        nodesToUpdate.push(walker.currentNode);
      }

      nodesToUpdate.forEach(node => {
        const raw = node.nodeValue;
        const trimmed = raw.trim();
        if (!trimmed) return;

        // Establish / Update original English text
        if (!node._i18nOrig) {
          // If already in Hindi or Bangla, check inverted map
          if (INVERTED_MAP[trimmed]) {
            node._i18nOrig = INVERTED_MAP[trimmed];
          } else {
            node._i18nOrig = trimmed;
          }
        } else {
          // If dynamic script updated the node to a new English key present in dict
          if (dict[trimmed] || lowerDict[trimmed.toLowerCase()]) {
            node._i18nOrig = trimmed;
          }
        }

        const origText = node._i18nOrig;

        if (currentLang === 'en') {
          if (trimmed !== origText) {
            node.nodeValue = node.nodeValue.replace(trimmed, origText);
          }
        } else {
          // Look up translation
          let replacement = dict[origText] || lowerDict[origText.toLowerCase()];
          if (!replacement) {
            const normalized = origText.replace(/\s+/g, ' ');
            replacement = dict[normalized] || lowerDict[normalized.toLowerCase()];
          }
          if (!replacement) {
            // Check dynamic regex patterns
            const patterned = translatePatterns(origText, currentLang);
            if (patterned !== origText) {
              replacement = patterned;
            }
          }

          if (replacement && trimmed !== replacement) {
            node.nodeValue = node.nodeValue.replace(trimmed, replacement);
          }
        }
      });
    } finally {
      isTranslating = false;
      // Safely reconnect observer after DOM updates finish
      if (domObserver && document.body) {
        domObserver.observe(document.body, { childList: true, subtree: true, characterData: false });
      }
    }
  }

  function renderLanguageSelector() {
    return `
      <div class="lang-selector-wrap" id="lang-selector-wrap">
        <button type="button" class="lang-selector-btn" id="lang-selector-btn" aria-label="Select Language" aria-haspopup="true" aria-expanded="false" title="Language / भाषा / ভাষা">
          <span class="lang-globe-icon">🌐</span>
          <span class="lang-active-label">${SUPPORTED_LANGS[currentLang].name}</span>
          <span class="lang-chevron" aria-hidden="true">▾</span>
        </button>
        <div class="lang-dropdown-menu" id="lang-dropdown-menu" role="menu">
          <button type="button" class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
            <span class="lang-flag">🇬🇧</span>
            <span class="lang-name">English</span>
            <span class="lang-native">Default</span>
          </button>
          <button type="button" class="lang-option ${currentLang === 'hi' ? 'active' : ''}" data-lang="hi">
            <span class="lang-flag">🇮🇳</span>
            <span class="lang-name">Hindi</span>
            <span class="lang-native">हिन्दी</span>
          </button>
          <button type="button" class="lang-option ${currentLang === 'bn' ? 'active' : ''}" data-lang="bn">
            <span class="lang-flag">🇮🇳</span>
            <span class="lang-name">Bangla</span>
            <span class="lang-native">বাংলা</span>
          </button>
        </div>
      </div>
    `;
  }

  function mountLanguageSelector() {
    let mount = document.getElementById('lang-selector-mount');
    if (!mount) {
      const navActions = document.querySelector('.nav-actions, .biz-nav-actions, .worker-nav-right, .admin-nav-actions, .auth-topbar, .auth-nav-right, .terms-topbar');
      if (navActions) {
        const targetSibling = navActions.querySelector('.help-link, .profile-nav-wrap, .btn-biz-logout, #btn-worker-logout, .back-link, #nav-guest-btn, .back-button');
        const container = document.createElement('div');
        container.id = 'lang-selector-mount';
        container.className = 'lang-mount-container';
        if (targetSibling && targetSibling.parentNode) {
          targetSibling.parentNode.insertBefore(container, targetSibling);
        } else if (navActions) {
          navActions.appendChild(container);
        }
        mount = container;
      }
    }

    if (mount && !mount.querySelector('.lang-selector-wrap')) {
      mount.innerHTML = renderLanguageSelector();
      attachSelectorEvents(mount);
    }
  }

  function attachSelectorEvents(container) {
    const wrap = container.querySelector('.lang-selector-wrap');
    const btn = container.querySelector('.lang-selector-btn');
    const options = container.querySelectorAll('.lang-option');

    if (!btn || !wrap) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('open');
      document.querySelectorAll('.lang-selector-wrap.open').forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        wrap.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = opt.getAttribute('data-lang');
        if (selectedLang) {
          setLanguage(selectedLang);
          wrap.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function init() {
    const stored = getStoredLanguage();
    currentLang = stored;

    // Synchronize current preferredLanguage into session if session differs
    if (window.SevaSathiSession && window.SevaSathiSession.isLoggedIn()) {
      const user = window.SevaSathiSession.getUser();
      if (user && user.preferredLanguage !== currentLang) {
        user.preferredLanguage = currentLang;
        if (typeof window.SevaSathiSession.setUser === 'function') {
          window.SevaSathiSession.setUser(user);
        } else {
          localStorage.setItem('hustleCurrentUser', JSON.stringify(user));
        }
      }
    }

    document.documentElement.lang = currentLang;
    mountLanguageSelector();
    applyTranslations();

    // Setup MutationObserver with loop prevention and debouncing
    domObserver = new MutationObserver((mutations) => {
      if (isTranslating || currentLang === 'en') return;
      let shouldTranslate = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          // Avoid re-translating our language selector or voice assistant bubbles
          let skip = false;
          for (const n of m.addedNodes) {
            if (n.nodeType === 1 && (n.closest?.('.lang-selector-wrap') || n.closest?.('#ai-assistant-modal'))) {
              skip = true;
              break;
            }
          }
          if (!skip) {
            shouldTranslate = true;
            break;
          }
        }
      }
      if (shouldTranslate) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          applyTranslations();
        }, 80);
      }
    });

    if (document.body) {
      domObserver.observe(document.body, { childList: true, subtree: true, characterData: false });
    }
  }

  window.SevaSathiI18n = {
    setLanguage,
    getLanguage: () => currentLang,
    getSpeechCode: () => (SUPPORTED_LANGS[currentLang] || SUPPORTED_LANGS.en).speechCode,
    applyTranslations,
    mountLanguageSelector,
    SUPPORTED_LANGS,
    PHRASE_MAP
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
