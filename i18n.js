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
  "Services by the people, for the people": "जनता द्वारा, जनता के लिए सेवाएं",
  "Services by the people, for the people.": "जनता द्वारा, जनता के लिए सेवाएं।",
  "Services by the people,": "जनता द्वारा सेवाएं,",
  "Services by the people": "जनता द्वारा सेवाएं",
  "for the people": "जनता के लिए",
  "for the people.": "जनता के लिए।",
  "Cooperative Machinery & Tool Rental Hub": "सहकारी मशीन और उपकरण किराया केंद्र",
  "Cooperative Machinery & Tool Rental": "सहकारी मशीन और उपकरण किराया",
  "Peer Equipment Sharing": "साथी उपकरण साझाकरण",
  "Rent out your idle machines to earn extra income, or borrow specialized tools from local peers": "अतिरिक्त आय कमाने के लिए अपनी खाली मशीनें किराए पर दें, या स्थानीय साथियों से विशेष उपकरण उधार लें",
  "List Machine for Rent": "किराए के लिए मशीन जोड़ें",
  "+ List Machine for Rent": "+ किराए के लिए मशीन जोड़ें",
  "My Listed Machines": "मेरी सूचीबद्ध मशीनें",
  "Browse Peer Tools Nearby": "पास के साथियों के उपकरण देखें",
  "Rental Bookings & Earnings": "किराया बुकिंग और कमाई",
  "Rental Income:": "किराया आय:",
  "Active for Rent:": "किराए के लिए सक्रिय:",
  "List a Machine or Equipment for Rent": "किराए के लिए मशीन या उपकरण सूचीबद्ध करें",
  "Machine / Tool Name": "मशीन / उपकरण का नाम",
  "Trade Category": "पेशा श्रेणी",
  "Machine Icon / Badge": "मशीन का चिह्न",
  "Daily Rental Rate": "दैनिक किराया दर",
  "Refundable Security Deposit": "वापसी योग्य सुरक्षा जमा",
  "Machine Condition": "मशीन की स्थिति",
  "Availability Status": "उपलब्धता स्थिति",
  "Available for Rent (Not in Use)": "किराए के लिए उपलब्ध (अप्रयुक्त)",
  "Not in Use / In Use by Me": "मेरे उपयोग में / अनुपलब्ध",
  "Pick-up Location / Area": "पिक-अप स्थान / क्षेत्र",
  "Available for Rent": "किराए के लिए उपलब्ध",
  "In Use / Not Available": "उपयोग में / अनुपलब्ध",
  "Mark as In Use": "उपयोग में चिह्नित करें",
  "Mark Available for Rent": "किराए के लिए उपलब्ध करें",
  "Request to Rent Machine": "मशीन किराए पर लेने का अनुरोध करें",
  "Available Now": "अभी उपलब्ध",
  "Active Rental": "सक्रिय किराया",
  "Completed / Returned": "पूर्ण / वापस मिला",
  "Mark Returned": "वापसी दर्ज करें",
  "Daily Rent": "दैनिक किराया",
  "Deposit (Refundable)": "सुरक्षा जमा (वापसी योग्य)",
  "Earned Amount": "अर्जित राशि",
  "Rent This Tool (Dual Verify)": "🤝 यह उपकरण किराए पर लें (द्विपक्षीय सत्यापन)",
  "Rent This Tool": "🤝 यह उपकरण किराए पर लें",
  "No Machines Listed Yet": "अभी कोई मशीन सूचीबद्ध नहीं है",
  "No Peer Tools Found": "कोई साथी उपकरण नहीं मिला",
  "List Your First Machine": "+ अपनी पहली मशीन जोड़ें",
  "+ List Your First Machine": "+ अपनी पहली मशीन जोड़ें",
  "In Use by Me": "मेरे उपयोग में",
  "Available for Rent": "किराए के लिए उपलब्ध",
  "Remove Listing": "सूची से हटाएं",
  "Rented:": "किराए पर दिया:",
  "times": "बार",
  "Earned:": "कमाई:",
  "Search machines, drill, washer, ladder...": "मशीनें, ड्रिल, वॉशर, सीढ़ी खोजें...",
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
  "GIG WORKER DASHBOARD": "गिग वर्कर डैशबोर्ड",
  "Local Trade Community & Pro Guild": "स्थानीय ट्रेड समुदाय व प्रो गिल्ड",
  "Global Trade Chat": "ग्लोबल ट्रेड चैट",
  "Work Squads & Groups": "कार्य दल व समूह",
  "Direct Messages (1:1)": "सीधे संदेश (1:1)",
  "+ Form New Squad": "+ नया दल बनाएं",
  "Nearby Verified Trade Pros": "आसपास के सत्यापित पेशेवर",
  "Share Overflow Gig Lead": "अतिरिक्त काम का लीड साझा करें",
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
  "Starting from ₹": "शुरुआती दर ₹",
  "SevaSathi AI Voice & Text Assistant": "सेवासाथी एआई वॉयस और टेक्स्ट सहायक",
  "Speak or reply in English, हिन्दी, or বাংলা...": "अंग्रेजी, हिन्दी या বাংলা में बोलें या टाइप करें...",
  "Good morning comrades. Salt Lake Sector V has major power line works today.": "सुप्रभात साथियों। आज सॉल्ट लेक सेक्टर 5 में मुख्य बिजली लाइन का बड़ा काम चल रहा है।",
  "Noted! I am handling commercial AC maintenance calls in New Town today.": "समझ गया! मैं आज न्यू टाउन में कमर्शियल एसी मेंटेनेंस का काम संभाल रहा हूँ।",
  "Ready for emergency electrical deployments in South Kolkata.": "दक्षिण कोलकाता में आपातकालीन बिजली कार्यों के लिए तैयार।",
  "Plumbing brigade active in Whitefield and Koramangala today.": "आज व्हाइटफील्ड और कोरमंगला में प्लंबिंग दल सक्रिय है।",
  "High pressure line repairs in HSR Layout completed.": "एचएसआर लेआउट में हाई प्रेशर लाइन की मरम्मत पूरी हो चुकी है।",
  "Modular kitchen installation squad active in Noida Sector 62.": "नोएडा सेक्टर 62 में मॉड्यूलर किचन इंस्टॉलेशन दल सक्रिय है।",
  "Hotel Grand Heritage requisition squad formed: 6 members assigned. Check tools.": "होटल ग्रैंड हेरिटेज मांग दल गठित: 6 सदस्य नियुक्त। उपकरण जांच लें।",
  "All safety harnesses and drills packed and ready.": "सभी सुरक्षा बेल्ट और ड्रिल पैक होकर तैयार हैं।",
  "Brother, do you have a spare copper pipe cutter available today?": "भाई, क्या आज आपके पास कोई अतिरिक्त तांबे का पाइप कटर उपलब्ध है?",
  "Hello everyone! Power line upgrade works happening in Salt Lake Sector V today. Anyone free to partner on a 3-phase commercial call this afternoon?": "सभी को नमस्ते! आज सॉल्ट लेक सेक्टर 5 में पावर लाइन अपग्रेड का काम हो रहा है। क्या आज दोपहर 3-फेज कमर्शियल काम में कोई साथी बन सकता है?",
  "I'm wrapping up a quick home booking here by 1 PM, count me in for the commercial backup!": "मैं दोपहर 1 बजे तक यहाँ एक घरेलू काम पूरा कर रहा हूँ, मुझे कमर्शियल बैकअप के लिए साथ रखें!",
  "📢 OVERFLOW LEAD:": "📢 अतिरिक्त कार्य लीड:",
  "Need 2 pros for MCB box rewiring in Salt Lake, ₹1,800 total": "सॉल्ट लेक में एमसीबी बॉक्स रीवायरिंग के लिए 2 पेशेवर चाहिए, कुल ₹1,800",
  "Channel Ready": "चैनल तैयार है",
  "Be the first to post a message or coordination lead to this channel.": "इस चैनल पर पहला संदेश या समन्वय लीड पोस्ट करें।",
  "Type a message to your trade community...": "अपने ट्रेड समुदाय को संदेश लिखें...",
  "Type a message to the cooperative channel...": "सहकारी चैनल में अपना संदेश लिखें...",
  "Nearby Verified Trade Pros": "आस-पास के सत्यापित ट्रेड पेशेवर",
  "Active Group-Job Squads": "सक्रिय समूह कार्य दल",
  "Direct Messages (Worker-to-Worker)": "व्यक्तिगत श्रमिक संदेश (1:1)",
  "City & Trade Channels": "शहर व ट्रेड चैनल",
  "Featured Channels": "प्रमुख चैनल",
  "Subhashish R. (Kolkata)": "सुभाशीष आर. (कोलकाता)",
  "Anirban D. (Kolkata)": "अनिर्बान डी. (कोलकाता)",
  "Ramesh Kumar (Bengaluru)": "रमेश कुमार (बेंगलुरु)",
  "Suresh N.": "सुरेश एन.",
  "Manish Sharma (Delhi)": "मनीष शर्मा (दिल्ली)",
  "Coordinator Sayan": "समन्वयक सायन",
  "Manish S.": "मनीष एस.",
  "Ramesh Kumar (Plumber)": "रमेश कुमार (प्लंबर)",
  "Yesterday": "कल",
  "Today": "आज"
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
  "Services by the people, for the people": "মানুষের দ্বারা, মানুষের জন্য পরিষেবা",
  "Services by the people, for the people.": "মানুষের দ্বারা, মানুষের জন্য পরিষেবা।",
  "Services by the people,": "মানুষের দ্বারা পরিষেবা,",
  "Services by the people": "মানুষের দ্বারা পরিষেবা",
  "for the people": "মানুষের জন্য",
  "Cooperative Machinery & Tool Rental Hub": "সমবায় মেশিন ও যন্ত্রপাতি ভাড়া কেন্দ্র",
  "Cooperative Machinery & Tool Rental": "সমবায় মেশিন ও যন্ত্রপাতি ভাড়া",
  "Peer Equipment Sharing": "সহকর্মীদের সরঞ্জাম ভাগাভাগি",
  "Rent out your idle machines to earn extra income, or borrow specialized tools from local peers": "অতিরিক্ত আয়ের জন্য আপনার খালি যন্ত্রপাতি ভাড়া দিন, অথবা স্থানীয় সাথীদের থেকে নিন",
  "List Machine for Rent": "ভাড়ার জন্য মেশিন যুক্ত করুন",
  "+ List Machine for Rent": "+ ভাড়ার জন্য মেশিন যুক্ত করুন",
  "My Listed Machines": "আমার তালিকাভুক্ত মেশিন",
  "Browse Peer Tools Nearby": "কাছের সহকর্মীদের যন্ত্রপাতি দেখুন",
  "Rental Bookings & Earnings": "ভাড়া বুকিং ও আয়",
  "Rental Income:": "ভাড়া আয়:",
  "Active for Rent:": "ভাড়ার জন্য সক্রিয়:",
  "List a Machine or Equipment for Rent": "ভাড়ার জন্য মেশিন বা যন্ত্রপাতি যুক্ত করুন",
  "Machine / Tool Name": "মেশিন / যন্ত্রপাতির নাম",
  "Trade Category": "পেশা বিভাগ",
  "Machine Icon / Badge": "মেশিনের প্রতীক",
  "Daily Rental Rate": "দৈনিক ভাড়া হার",
  "Refundable Security Deposit": "ফেরতযোগ্য নিরাপত্তা আমানত",
  "Machine Condition": "যন্ত্রের অবস্থা",
  "Availability Status": "উপলব্ধতা স্থিতি",
  "Available for Rent (Not in Use)": "ভাড়ার জন্য উপলব্ধ (অব্যবহৃত)",
  "Not in Use / In Use by Me": "আমার ব্যবহারে / অনুপলব্ধ",
  "Pick-up Location / Area": "পিক-আপ এলাকা / ঠিকানা",
  "Available for Rent": "ভাড়ার জন্য উপলব্ধ",
  "In Use / Not Available": "ব্যবহৃত / অনুপলব্ধ",
  "Mark as In Use": "ব্যবহারে চিহ্নিত করুন",
  "Mark Available for Rent": "ভাড়ার জন্য উপলব্ধ করুন",
  "Request to Rent Machine": "মেশিন ভাড়ার অনুরোধ করুন",
  "Available Now": "এখনই উপলব্ধ",
  "Active Rental": "সক্রিয় ভাড়া",
  "Completed / Returned": "সম্পন্ন / ফেরতপ্রাপ্ত",
  "Mark Returned": "ফেরত চিহ্নিত করুন",
  "Daily Rent": "দৈনিক ভাড়া",
  "Earned Amount": "অর্জিত অর্থ",
  "Rent This Tool (Dual Verify)": "🤝 এই সরঞ্জামটি ভাড়া নিন (উভয়পক্ষীয় যাচাইকরণ)",
  "Rent This Tool": "🤝 এই সরঞ্জামটি ভাড়া নিন",
  "No Machines Listed Yet": "এখনও কোনও মেশিন তালিকাভুক্ত নেই",
  "No Peer Tools Found": "কোনও সহকর্মীর সরঞ্জাম পাওয়া যায়নি",
  "List Your First Machine": "+ আপনার প্রথম মেশিন যুক্ত করুন",
  "+ List Your First Machine": "+ আপনার প্রথম মেশিন যুক্ত করুন",
  "In Use by Me": "আমার ব্যবহারে",
  "Available for Rent": "ভাড়ার জন্য উপলব্ধ",
  "Remove Listing": "তালিকা থেকে সরান",
  "Rented:": "ভাড়া দেওয়া হয়েছে:",
  "times": "বার",
  "Earned:": "মোট আয়:",
  "Search machines, drill, washer, ladder...": "মেশিন, ড্রিল, ওয়াশার, মই খুঁজুন...",
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
  "GIG WORKER DASHBOARD": "গিগ কর্মী ড্যাশবোর্ড",
  "Local Trade Community & Pro Guild": "স্থানীয় পেশা সম্প্রদায় ও প্রো গিল্ড",
  "Global Trade Chat": "গ্লোবাল ট্রেড চ্যাট",
  "Work Squads & Groups": "কাজের স্কোয়াড ও গ্রুপ",
  "Direct Messages (1:1)": "ব্যক্তিগত বার্তা (১:১)",
  "+ Form New Squad": "+ নতুন স্কোয়াড তৈরি করুন",
  "Nearby Verified Trade Pros": "নিকটবর্তী যাচাইকৃত পেশাদার",
  "Share Overflow Gig Lead": "অতিরিক্ত কাজের সুযোগ শেয়ার করুন",
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
  "Starting from ₹": "শুরু ₹",
  "SevaSathi AI Voice & Text Assistant": "সেবা সাথী এআই ভয়েস ও টেক্সট সহকারী",
  "Speak or reply in English, हिन्दी, or বাংলা...": "ইংরেজি, हिन्दी বা বাংলা-তে বলুন বা লিখুন...",
  "Good morning comrades. Salt Lake Sector V has major power line works today.": "সুপ্রভাত কমরেডগণ। আজ সল্টলেক সেক্টর ৫-এ বড় বিদ্যুৎ লাইনের কাজ চলছে।",
  "Noted! I am handling commercial AC maintenance calls in New Town today.": "বুঝতে পেরেছি! আজ আমি নিউ টাউনে বাণিজ্যিক এসি রক্ষণাবেক্ষণের কাজ করছি।",
  "Ready for emergency electrical deployments in South Kolkata.": "দক্ষিণ কলকাতায় জরুরি বৈদ্যুতিক কাজের জন্য প্রস্তুত।",
  "Plumbing brigade active in Whitefield and Koramangala today.": "আজ হোয়াইটফিল্ড এবং কোরামঙ্গলায় প্লাম্বিং ব্রিগেড সক্রিয় রয়েছে।",
  "High pressure line repairs in HSR Layout completed.": "এইচএসআর লেআউটে উচ্চ চাপের পাইপলাইন মেরামতের কাজ সম্পন্ন হয়েছে।",
  "Modular kitchen installation squad active in Noida Sector 62.": "নয়ডা সেক্টর ৬২-তে মডুলার কিচেন ইনস্টলেশন স্কোয়াড সক্রিয়।",
  "Hotel Grand Heritage requisition squad formed: 6 members assigned. Check tools.": "হোটেল গ্র্যান্ড হেরিটেজ রিক্যুইজিশন স্কোয়াড গঠিত: ৬ জন সদস্য নিযুক্ত। যন্ত্রপাতি পরীক্ষা করুন।",
  "All safety harnesses and drills packed and ready.": "সব সুরক্ষা সরঞ্জাম ও ড্রিল প্যাক করা আছে এবং প্রস্তুত।",
  "Brother, do you have a spare copper pipe cutter available today?": "ভাই, আজ আপনার কাছে কি অতিরিক্ত তামার পাইপ কাটার পাওয়া যাবে?",
  "Hello everyone! Power line upgrade works happening in Salt Lake Sector V today. Anyone free to partner on a 3-phase commercial call this afternoon?": "সবাইকে নমস্কার! আজ সল্টলেক সেক্টর ৫-এ পাওয়ার লাইন আপগ্রেডের কাজ হচ্ছে। আজ বিকেলে ৩-ফেজ বাণিজ্যিক কাজে কেউ যোগ দিতে পারবেন?",
  "I'm wrapping up a quick home booking here by 1 PM, count me in for the commercial backup!": "আমি দুপুর ১টার মধ্যে এখানে একটি ঘরের কাজ শেষ করছি, বাণিজ্যিক ব্যাকআপের জন্য আমাকে সঙ্গে রাখুন!",
  "📢 OVERFLOW LEAD:": "📢 কাজের অতিরিক্ত খবর:",
  "Need 2 pros for MCB box rewiring in Salt Lake, ₹1,800 total": "সল্টলেকে এমসিবি বক্স রিব্যারিংয়ের জন্য ২ জন প্রফেশনাল দরকার, মোট ₹১,৮০০",
  "Channel Ready": "চ্যানেল প্রস্তুত",
  "Be the first to post a message or coordination lead to this channel.": "এই চ্যানেলে প্রথম বার্তা বা কাজের সুযোগ পোস্ট করুন।",
  "Type a message to your trade community...": "আপনার পেশা সম্প্রদায়ে বার্তা লিখুন...",
  "Type a message to the cooperative channel...": "সমবায় চ্যানেলে আপনার বার্তা লিখুন...",
  "Nearby Verified Trade Pros": "কাছাকাছি যাচাইকৃত পেশাদার কর্মী",
  "Active Group-Job Squads": "সক্রিয় দলগত কাজের স্কোয়াড",
  "Direct Messages (Worker-to-Worker)": "ব্যক্তিগত কর্মী বার্তা (১:১)",
  "City & Trade Channels": "শহর ও পেশা চ্যানেল",
  "Featured Channels": "প্রধান চ্যানেলসমূহ",
  "Subhashish R. (Kolkata)": "শুভাশিস আর. (কলকাতা)",
  "Anirban D. (Kolkata)": "অনির্বাণ ডি. (কলকাতা)",
  "Ramesh Kumar (Bengaluru)": "রমেশ কুমার (বেঙ্গালুরু)",
  "Suresh N.": "সুরেশ এন.",
  "Manish Sharma (Delhi)": "মনীষ শর্মা (দিল্লি)",
  "Coordinator Sayan": "সমন্বয়ক সায়ন",
  "Manish S.": "মনীষ এস.",
  "Ramesh Kumar (Plumber)": "রমেশ কুমার (প্লাম্বার)",
  "Yesterday": "গতকাল",
  "Today": "আজ"
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
    const lang = SUPPORTED_LANGS[currentLang] || SUPPORTED_LANGS.en;
    const activeText = lang.native !== 'Default' ? lang.native : lang.name;
    document.querySelectorAll('.lang-selector-wrap').forEach(wrap => {
      const activeLabel = wrap.querySelector('.lang-active-label');
      if (activeLabel) {
        activeLabel.textContent = activeText;
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

  // Conversational Chat Phrase & Sentence Translator
  function translateChatPhrases(text, lang) {
    if (!text || lang === 'en') return text;
    let out = text;

    const chatRules = [
      // Greetings
      { re: /\b(good morning comrades|good morning comrades\.)/gi, hi: 'सुप्रभात साथियों।', bn: 'সুপ্রভাত কমরেডগণ।' },
      { re: /\b(good morning|morning)\b/gi, hi: 'सुप्रभात', bn: 'সুপ্রভাত' },
      { re: /\b(good evening)\b/gi, hi: 'शुभ संध्या', bn: 'শুভ সন্ধ্যা' },
      { re: /\b(good afternoon)\b/gi, hi: 'शुभ दोपहर', bn: 'শুভ অপরাহ্ন' },
      { re: /\b(hello everyone!?|hello all!?)/gi, hi: 'सभी को नमस्ते!', bn: 'সবাইকে নমস্কার!' },
      { re: /\b(hello|hi there|hey)\b/gi, hi: 'नमस्ते', bn: 'নমস্কার' },

      // Statuses & Arrivals
      { re: /\b(i am on the way|i'm on the way|on my way|on the way)\b/gi, hi: 'मैं रास्ते में हूँ', bn: 'আমি আসছি/রাস্তায় আছি' },
      { re: /\b(i will be there in 10 minutes|i will be there in 15 minutes|be there in 10 mins|be there soon)\b/gi, hi: 'मैं 10-15 मिनट में पहुँच रहा हूँ', bn: 'আমি ১০-১৫ মিনিটের মধ্যে পৌঁছাচ্ছি' },
      { re: /\b(stuck in traffic)\b/gi, hi: 'ट्रैफिक में फंसा हूँ', bn: 'ট্রাফিকে আটকে আছি' },
      { re: /\b(i have reached|i reached|reached location|reached)\b/gi, hi: 'पहुँच गया हूँ', bn: 'পৌঁছে গেছি' },
      { re: /\b(arrived at client location|arrived at spot)\b/gi, hi: 'ग्राहक के पते पर पहुँच गया हूँ', bn: 'গ্রাহকের ঠিকানায় পৌঁছে গেছি' },
      { re: /\b(starting inspection|inspecting now)\b/gi, hi: 'जाँच शुरू कर रहा हूँ', bn: 'পরিদর্শন শুরু করছি' },
      { re: /\b(work completed|job done|work done|completed)\b/gi, hi: 'काम पूरा हो गया', bn: 'কাজ সম্পন্ন হয়েছে' },
      { re: /\b(job successfully finished|task completed successfully)\b/gi, hi: 'काम सफलतापूर्वक संपन्न हुआ', bn: 'কাজ সফলভাবে সম্পন্ন হয়েছে' },
      { re: /\b(i am available|available now|free now)\b/gi, hi: 'अभी उपलब्ध हूँ', bn: 'এখন প্রস্তুত/উপলব্ধ' },
      { re: /\b(starting now|starting the work)\b/gi, hi: 'काम शुरू कर रहा हूँ', bn: 'কাজ শুরু করছি' },

      // Questions & Common Queries
      { re: /\b(where is the location\??|send location|share location)\b/gi, hi: 'कृपया लोकेशन भेजें', bn: 'ঠিকানা/লোকেশন পাঠান' },
      { re: /\b(what is the price\??|what is the rate\??|how much is the cost\??)\b/gi, hi: 'कीमत/दर क्या है?', bn: 'খরচ/রেট কত?' },
      { re: /\b(how much per day\??)\b/gi, hi: 'प्रति दिन कितना किराया है?', bn: 'প্রতি দিনের ভাড়া কত?' },
      { re: /\b(is this available\??|is it available\??)\b/gi, hi: 'क्या यह उपलब्ध है?', bn: 'এটি কি উপলব্ধ আছে?' },
      { re: /\b(when can i pick it up\??)\b/gi, hi: 'मैं इसे कब ले सकता हूँ?', bn: 'আমি এটি কখন নিতে পারি?' },
      { re: /\b(where should i return it\??)\b/gi, hi: 'इसे कहाँ वापस करना है?', bn: 'এটি কোথায় ফেরত দিতে হবে?' },
      { re: /\b(i will return it tomorrow)\b/gi, hi: 'मैं इसे कल वापस कर दूंगा', bn: 'আমি এটি কাল ফেরত দিয়ে দেব' },
      { re: /\b(can you come today\??)\b/gi, hi: 'क्या आप आज आ सकते हैं?', bn: 'আজ কি আসতে পারবেন?' },
      { re: /\b(can you come tomorrow\??)\b/gi, hi: 'क्या आप कल आ सकते हैं?', bn: 'কাল কি আসতে পারবেন?' },
      { re: /\b(do you have tools\??|do you have spare parts\??)\b/gi, hi: 'क्या आपके पास औजार/सामान हैं?', bn: 'আপনার কাছে কি যন্ত্রপাতি আছে?' },
      { re: /\b(what time\??)\b/gi, hi: 'किस समय?', bn: 'কখন/কোন সময়ে?' },
      { re: /\b(send contact number|share phone number)\b/gi, hi: 'फ़ोन नंबर साझा करें', bn: 'ফোন নম্বর পাঠান' },

      // Confirmations & Politeness
      { re: /\b(noted!?|understood)\b/gi, hi: 'समझ गया!', bn: 'বুঝতে পেরেছি!' },
      { re: /\b(yes brother|ok brother|sure brother)\b/gi, hi: 'हाँ भाई, बिल्कुल', bn: 'হ্যাঁ ভাই, অবশ্যই' },
      { re: /\b(no problem|no worries)\b/gi, hi: 'कोई बात नहीं', bn: 'কোনো সমস্যা নেই' },
      { re: /\b(thank you|thanks a lot|thanks)\b/gi, hi: 'धन्यवाद', bn: 'ধন্যবাদ' },
      { re: /\b(thanks for sharing)\b/gi, hi: 'साझा करने के लिए धन्यवाद', bn: 'শেয়ার করার জন্য ধন্যবাদ' },
      { re: /\b(count me in)\b/gi, hi: 'मुझे शामिल रखें', bn: 'আমাকে সঙ্গে রাখুন' },
      { re: /\b(ready for work|ready)\b/gi, hi: 'तैयार हूँ', bn: 'প্রস্তুত' },
      { re: /\b(please call me|call me)\b/gi, hi: 'कृपया मुझे कॉल करें', bn: 'আমাকে ফোন করুন' },
      { re: /\b(message me here)\b/gi, hi: 'यहाँ संदेश भेजें', bn: 'এখানে মেসেজ করুন' },
      { re: /\b(welcome|you're welcome|you are welcome)\b/gi, hi: 'स्वागत है', bn: 'আপনাকে স্বাগতম' },
      { re: /\b(perfect|excellent|great)\b/gi, hi: 'बहुत बढ़िया', bn: 'চমৎকার/দারুণ' },
      { re: /\b(alright|okay|ok)\b/gi, hi: 'ठीक है', bn: 'ঠিক আছে' },

      // Cooperative Resource & Equipment Sharing
      { re: /\b(heavy hammer drill|hammer drill)\b/gi, hi: 'हैमर ड्रिल मशीन', bn: 'হ্যামার ড্রিল মেশিন' },
      { re: /\b(copper pipe cutter|pipe cutter)\b/gi, hi: 'तांबे का पाइप कटर', bn: 'তামার পাইপ কাটার' },
      { re: /\b(fluke digital multimeter|multimeter)\b/gi, hi: 'डिजिटल मल्टीमीटर', bn: 'ডিজিটাল মাল্টিমিটার' },
      { re: /\b(industrial heat gun|heat gun)\b/gi, hi: 'इंडस्ट्रियल हीट गन', bn: 'হিট গান' },
      { re: /\b(safety harness & lanyard|safety harness)\b/gi, hi: 'सुरक्षा हार्नेस किट', bn: 'নিরাপত্তা হার্নেস' },
      { re: /\b(drain snake auger|drain snake)\b/gi, hi: 'ड्रेन स्नेक ऑगर', bn: 'ড্রেন পাইপ ক্লিনার স্নেক' },
      { re: /\b(pressure washer)\b/gi, hi: 'प्रेशर वॉशर मशीन', bn: 'প্রেসার ওয়াশার' },
      { re: /\b(paint sprayer)\b/gi, hi: 'पेंट स्प्रेयर मशीन', bn: 'পেইন্ট স্প্রেয়ার' },
      { re: /\b(welding machine)\b/gi, hi: 'वेल्डिंग मशीन', bn: 'ওয়েল্ডিং মেশিন' },
      { re: /\b(angle grinder)\b/gi, hi: 'एंगल ग्राइंडर', bn: 'অ্যাঙ্গেল গ্রাইন্ডার' },
      { re: /\b(ladder)\b/gi, hi: 'सीढ़ी', bn: 'মই' },
      { re: /\b(available for rent|available for loan)\b/gi, hi: 'किराए/उधार के लिए उपलब्ध', bn: 'ভাড়া/ব্যবহারের জন্য প্রস্তুত' },
      { re: /\b(in use|currently in use)\b/gi, hi: 'वर्तमान में उपयोग में', bn: 'বর্তমানে ব্যবহৃত হচ্ছে' },
      { re: /\b(returned|item returned)\b/gi, hi: 'वापस कर दिया गया', bn: 'ফেরত দেওয়া হয়েছে' },
      { re: /\b(ready for pickup)\b/gi, hi: 'ले जाने के लिए तैयार', bn: 'নেওয়ার জন্য প্রস্তুত' },

      // Trade Collaboration & Emergency
      { re: /\b(need backup electrician|need electrician help)\b/gi, hi: 'अतिरिक्त इलेक्ट्रीशियन की मदद चाहिए', bn: 'অতিরিক্ত ইলেকট্রিশিয়ানের সাহায্য প্রয়োজন' },
      { re: /\b(need assistant plumber|need plumber backup)\b/gi, hi: 'अतिरिक्त प्लंबर की आवश्यकता है', bn: 'অতিরিক্ত প্লাম্বারের সাহায্য প্রয়োজন' },
      { re: /\b(urgent help needed|urgent backup)\b/gi, hi: 'तुरंत सहायता की आवश्यकता है', bn: 'জরুরি সাহায্য প্রয়োজন' },
      { re: /\b(large commercial contract)\b/gi, hi: 'बड़ा वाणिज्यिक अनुबंध', bn: 'বড় বাণিজ্যিক চুক্তি' },
      { re: /\b(payment received)\b/gi, hi: 'भुगतान प्राप्त हुआ', bn: 'পেমেন্ট পেয়েছি' },
      { re: /\b(waiting for customer payment)\b/gi, hi: 'ग्राहक के भुगतान की प्रतीक्षा है', bn: 'গ্রাহকের পেমেন্টের অপেক্ষায়' },
      { re: /\b(cash received)\b/gi, hi: 'नकद प्राप्त हुआ', bn: 'নগদ টাকা পেয়েছি' },
      { re: /\b(escrow released)\b/gi, hi: 'एस्क्रो राशि जारी की गई', bn: 'এসক্রো পেমেন্ট ছেড়ে দেওয়া হয়েছে' },

      // Common Trade Contexts
      { re: /\b(power line works|electrical repair)\b/gi, hi: 'बिजली लाइन मरम्मत का काम', bn: 'বিদ্যুৎ লাইন মেরামতের কাজ' },
      { re: /\b(commercial ac maintenance)\b/gi, hi: 'कमर्शियल एसी मेंटेनेंस', bn: 'বাণিজ্যিক এসি রক্ষণাবেক্ষণ' },
      { re: /\b(pipe repairs|leak repair)\b/gi, hi: 'पाइप मरम्मत का काम', bn: 'পাইপ মেরামতের কাজ' },
      { re: /\b(kitchen installation)\b/gi, hi: 'किचन इंस्टॉलेशन', bn: 'রান্নাঘর ইনস্টলেশন' },
      { re: /\b(emergency deployment)\b/gi, hi: 'आपातकालीन तैनाती', bn: 'জরুরি নিয়োগ' },

      // Timing & Days
      { re: /\b(today)\b/gi, hi: 'आज', bn: 'आज' },
      { re: /\b(tomorrow morning)\b/gi, hi: 'कल सुबह', bn: 'কাল সকালে' },
      { re: /\b(tomorrow)\b/gi, hi: 'कल', bn: 'কাল' },
      { re: /\b(yesterday)\b/gi, hi: 'कल (बीता हुआ)', bn: 'গতকাল' },
      { re: /\b(this afternoon)\b/gi, hi: 'आज दोपहर', bn: 'আজ বিকেলে' },
      { re: /\b(this evening)\b/gi, hi: 'आज शाम', bn: 'আজ সন্ধ্যায়' },

      // Places
      { re: /\b(salt lake sector v|salt lake sector 5|salt lake)\b/gi, hi: 'सॉल्ट लेक', bn: 'সল্টলেক' },
      { re: /\b(new town)\b/gi, hi: 'न्यू टाउन', bn: 'নিউ টাউন' },
      { re: /\b(whitefield)\b/gi, hi: 'व्हाइटफील्ड', bn: 'হোয়াইটফিল্ড' },
      { re: /\b(koramangala)\b/gi, hi: 'कोरमंगला', bn: 'কোরামঙ্গলা' },
      { re: /\b(hsr layout)\b/gi, hi: 'एचएसआर लेआउट', bn: 'এইচএসআর লেআউট' },
      { re: /\b(noida sector 62)\b/gi, hi: 'नोएडा सेक्टर 62', bn: 'নয়ডা সেক্টর ৬২' },
      { re: /\b(south kolkata)\b/gi, hi: 'दक्षिण कोलकाता', bn: 'দক্ষিণ কলকাতা' }
    ];

    for (const rule of chatRules) {
      out = out.replace(rule.re, () => {
        return lang === 'hi' ? rule.hi : rule.bn;
      });
    }

    return out;
  }

  const WORD_LEXICON = {
    hi: {"aadhaar":"आधार","aarav":"आरव","about":"के बारे में","above":"ऊपर","ac":"एसी","academic":"शैक्षणिक","accelerates":"तेज करता है","accept":"स्वीकार करें","acceptable":"स्वीकार्य","acceptance":"स्वीकृति","accepted":"स्वीकृत","accepting":"स्वीकार कर रहे हैं","access":"पहुंच","accident":"दुर्घटना","according":"अनुसार","account":"खाता","accounted":"हिसाब किया गया","accounts":"खाते","across":"भर में","action":"कार्रवाई","actions":"कार्रवाइयां","active":"सक्रिय","activity":"गतिविधि","actual":"वास्तविक","add":"जोड़ें","added":"जोड़ा गया","addition":"जोड़","additional":"अतिरिक्त","address":"पता","adjust":"समायोजित करें","adjusted":"समायोजित","adjustment":"समायोजन","adjustments":"समायोजन","admin":"एडमिन","administration":"प्रशासन","advanced":"उन्नत","advice":"सलाह","advisor":"सलाहकार","adyar":"अड्यार","after":"बाद","afternoon":"दोपहर","again":"पुनः","against":"के खिलाफ","age":"आयु","agent":"एजेंट","agents":"एजेंट्स","ago":"पहले","agree":"सहमत","agreed":"सहमत","agreement":"समझौता","agreements":"समझौते","ahmedabad":"अहमदाबाद","ai":"एआई","air":"हवा","alert":"चेतावनी","alerts":"चेतावनी","algorithmic":"एल्गोरिथम आधारित","alignment":"संरेखण","all":"सभी","allocate":"आवंटित करें","allocated":"आवंटित","allocation":"आवंटन","allocations":"आवंटन","allow":"अनुमति दें","allowance":"भत्ता","allowed":"अनुमति प्राप्त","allowing":"अनुमति देते हुए","almost":"लगभग","alone":"अकेले","along":"साथ","already":"पहले से ही","alright":"सब ठीक","also":"भी","alt":"वैकल्पिक","alternative":"विकल्प","alternatives":"विकल्प","always":"हमेशा","am":"पूर्वाह्न","amazing":"अद्भुत","amount":"राशि","amounts":"राशियां","amp":"&","an":"एक","analytics":"विश्लेषण","analyzing":"विश्लेषण कर रहा है","ananya":"अनन्या","and":"और","angle":"कोण","annual":"वार्षिक","annually":"प्रति वर्ष","another":"दूसरा","answer":"उत्तर","anti":"विरोधी","any":"कोई","anyone":"कोई भी व्यक्ति","anything":"कुछ भी","anywhere":"कहीं भी","app":"ऐप","appliance":"उपकरण","appliances":"घरेलू उपकरण","applicable":"लागू","applicant":"आवेदक","applicants":"आवेदक","application":"आवेदन","applications":"आवेदन","applied":"लागू किया","applies":"लागू होता है","apply":"लागू करें","applying":"लागू कर रहे हैं","appointment":"नियुक्ति (अपॉइंटमेंट)","appointments":"नियुक्तियां","approval":"मंजूरी","approve":"स्वीकृत करें","approved":"स्वीकृत","approx":"लगभग","approximate":"अनुमानित","april":"अप्रैल","area":"क्षेत्र","areas":"क्षेत्र","around":"आस-पास","arrival":"आगमन","arrive":"पहुंचना","arrived":"पहुँच गया","as":"जैसे","ashok":"अशोक","ask":"पूछें","asked":"पूछा","asking":"पूछ रहे हैं","assigned":"सौंपा गया","assignment":"काम सौंपना","assistance":"सहायता","assistant":"सहायक","assisted":"सहायता प्राप्त","associates":"सहयोगी","assurance":"आश्वासन","at":"पर","auger":"ऑगर (ड्रिल)","august":"अगस्त","auth":"प्रमाणीकरण","authentic":"प्रामाणिक","authenticate":"प्रमाणित करें","authenticated":"प्रमाणित","authentication":"प्रमाणीकरण","auto":"ऑटो","automatic":"स्वचालित","automatically":"स्वचालित रूप से","available":"उपलब्ध","availability":"उपलब्धता","avenue":"एवेन्यू","average":"औसत","avg":"औसत","avoid":"बचें","award":"पुरस्कार","aware":"अवगत","away":"दूर","back":"वापस","backend":"बैकएंड","backup":"बैकअप","badge":"बैज","balance":"शेष राशि","balcony":"बालकनी","ban":"प्रतिबंध","banned":"प्रतिबंधित","bangalore":"बेंगलुरु","bangla":"বাংলা","bank":"बैंक","banking":"बैंकिंग","banner":"बैनर","bansal":"बंसल","bapi":"बापी","bar":"पट्टी","bargain":"मोलभाव","bargaining":"मोलभाव जारी","base":"मूल","basic":"बुनियादी","basis":"आधार","bath":"स्नानघर","bathroom":"स्नानघर","be":"होना","beauty":"सौंदर्य","because":"क्योंकि","become":"बनें","been":"रहा है","before":"पहले","behind":"पीछे","being":"होने के नाते","below":"नीचे","benchmark":"मानक दर","benefit":"लाभ","benefits":"लाभ","bengaluru":"बेंगलुरु","bengali":"बंगाली","best":"सर्वोत्तम","better":"बेहतर","between":"के बीच","beyond":"परे","big":"बड़ा","bill":"बिल","billing":"बिलिंग","biz":"व्यवसाय","block":"ब्लॉक","blocked":"अवरुद्ध","board":"बोर्ड","body":"मुख्य भाग","bolt":"बोल्ट","bonus":"बोनस","book":"बुक करें","booked":"बुक किया गया","booking":"बुकिंग","bookings":"बुकिंग्स","borrow":"उधार लें","borrowed":"उधार लिया","both":"दोनों","box":"बॉक्स","brand":"ब्रांड","breakdown":"विभाजन विवरण","brick":"ईंट","bridge":"पुल","brigade":"ब्रिगेड","brilliant":"शानदार","bring":"लाएं","broad":"व्यापक","browse":"ब्राउज़ करें","brush":"ब्रश","bubble":"बुलबुला","budget":"बजट","build":"बनाएं","building":"इमारत","built":"निर्मित","business":"व्यावसायिक","businesses":"व्यवसाय","busy":"व्यस्त","but":"लेकिन","button":"बटन","by":"द्वारा","cable":"केबल","calculator":"कैलकुलेटर","calendar":"कैलेंडर","call":"कॉल करें","called":"बुलाया","calling":"कॉल कर रहे हैं","calls":"कॉल्स","can":"सकते हैं","cancel":"रद्द करें","cancelled":"रद्द","cancelling":"रद्द कर रहे हैं","candidate":"उम्मीदवार","candidates":"उम्मीदवार","capacity":"क्षमता","car":"गाड़ी","card":"कार्ड","cards":"कार्ड्स","care":"देखभाल","caregiver":"देखभालकर्ता","career":"करियर","carpenter":"बढ़ई","carpenters":"बढ़ई","carpentry":"बढ़ई का काम","case":"मामला","cases":"मामले","cash":"नकद","catalog":"कैटलॉग","categories":"श्रेणियां","category":"श्रेणी","cause":"कारण","cbse":"सीबीएसई","center":"केंद्र","central":"केंद्रीय","centre":"केंद्र","certificate":"प्रमाणपत्र","certificates":"प्रमाणपत्र","certification":"प्रमाणन","certified":"प्रमाणित","chain":"श्रृंखला","chair":"कुर्सी","champion":"चैंपियन","chance":"अवसर","change":"बदलें","changed":"बदल दिया","changes":"परिवर्तन","changing":"बदल रहा है","channel":"चैनल","channels":"चैनल्स","charge":"शुल्क","charged":"चार्ज किया गया","charges":"शुल्क","chart":"चार्ट","chat":"बातचीत","chats":"चैट्स","chatted":"बात की","chatting":"चैटिंग","check":"जाँचें","checked":"जाँचा गया","checking":"जाँच रहे हैं","checkout":"चेकआउट","checks":"जाँच","chennai":"चेन्नई","chips":"चिप्स","choice":"पसंद","choose":"चुनें","choosing":"चुन रहे हैं","chosen":"चुना गया","city":"शहर","cities":"शहरों","claim":"दावा","claims":"दावे","class":"कक्षा","classes":"कक्षाएं","clean":"साफ","cleaner":"सफाईकर्मी","cleaners":"सफाईकर्मी","cleaning":"सफाई","clear":"स्पष्ट","click":"क्लिक करें","client":"ग्राहक","clients":"ग्राहक","close":"बंद करें","closed":"बंद","closing":"समापन","coach":"प्रशिक्षक (कोच)","coaching":"कोचिंग","code":"कोड","collective":"सामूहिक","commercial":"वाणिज्यिक","commission":"कमीशन","commissions":"कमीशन","community":"समुदाय","company":"कंपनी","compare":"तुलना करें","compared":"तुलना की गई","complete":"पूर्ण करें","completed":"पूर्ण","completes":"पूर्ण करता है","completing":"पूर्ण कर रहे हैं","completion":"पूर्णता","condition":"शर्त","conditions":"शर्तें","conduct":"आचरण","confirm":"पुष्टि करें","confirmation":"पुष्टि","confirmed":"पुष्टि की गई","connect":"जुड़ें","contact":"संपर्क","contract":"अनुबंध","contracts":"अनुबंध","cooperative":"सहकारी","copper":"तांबा","corporate":"कॉर्पोरेट","cost":"लागत","costs":"लागत","could":"सकते थे","count":"गिनती","counter":"पालटा प्रस्ताव","country":"देश","courier":"कूरियर","create":"बनाएं","created":"बनाया गया","creating":"बना रहे हैं","credit":"क्रेडिट","crew":"दल","current":"वर्तमान","custom":"कस्टम","customer":"ग्राहक","customers":"ग्राहक","cutter":"कटर","daily":"दैनिक","damage":"क्षति","damp":"सीलन","dashboard":"डैशबोर्ड","data":"डेटा","date":"तारीख","dates":"तारीखें","day":"दिन","days":"दिन","debit":"डेबिट","december":"दिसंबर","decline":"अस्वीकार करें","declined":"अस्वीकृत","deep":"गहन","delay":"देरी","delayed":"विलंबित","delete":"हटाएं","deleted":"हटा दिया गया","delhi":"दिल्ली","delivery":"वितरण","demanded":"मांग की गई","democratic":"लोकतांत्रिक","democratically":"लोकतांत्रिक रूप से","department":"विभाग","deployment":"तैनाती","deployments":"तैनाती","deposit":"जमा करें","deposited":"जमा किया गया","describe":"वर्णन करें","description":"विवरण","desired":"वांछित","detail":"विवरण","detailed":"विस्तृत","detailing":"डिटेलिंग","details":"विवरण","device":"डिवाइस","devices":"उपकरण","diagnose":"निदान करें","diagnosis":"निदान","digital":"डिजिटल","digit":"अंक","digits":"अंक","direct":"प्रत्यक्ष","direction":"दिशा","directly":"सीधे","director":"निदेशक","directory":"निर्देशिका","dismiss":"खारिज करें","dismissed":"खारिज किया गया","dispute":"विवाद","disputes":"विवाद","distribution":"वितरण","district":"जिला","dividend":"लाभांश","dividends":"लाभांश","do":"करें","does":"करता है","done":"संपन्न","doorstep":"द्वार पर","draft":"प्रारूप","drain":"नाली","drawer":"दराज","drill":"ड्रिल","drilling":"ड्रिलिंग","drills":"ड्रिल मशीनें","driver":"चालक","drivers":"ड्राइवर","due":"देय","during":"दौरान","earlier":"पहले","early":"जल्दी","earn":"कमाएं","earned":"कमाया","earning":"कमाई","earnings":"कमाई","east":"पूर्व","eco":"इको","edit":"संपादित करें","edited":"संपादित","editing":"संपादन","electrician":"इलेक्ट्रीशियन","electricians":"इलेक्ट्रीशियन","electrical":"बिजली","elevator":"लिफ्ट","eligible":"पात्र","email":"ईमेल","emergency":"आपातकालीन","effortlessly":"बिना किसी कठिनाई के","employ":"रोजगार दें","employee":"कर्मचारी","employer":"नियोक्ता","enforce":"लागू करें","enforcement":"प्रवर्तन","engaged":"संलग्न","engine":"इंजन","engineer":"इंजीनियर","enhance":"बेहतर बनाएं","enhanced":"उन्नत","enter":"दर्ज करें","enterprise":"उद्यम","enterprises":"उद्यम","equipment":"उपकरण","equity":"हिस्सेदारी","errand":"दैनिक कार्य","errands":"दैनिक कार्य","error":"त्रुटि","escrow":"एस्क्रो","escrowed":"एस्क्रो में जमा","estimate":"अनुमान","estimated":"अनुमानित","evening":"शाम","event":"कार्यक्रम","events":"कार्यक्रम","every":"प्रत्येक","everybody":"हर कोई","everyday":"रोज़मर्रा","everyone":"हर कोई","everything":"सब कुछ","everywhere":"हर जगह","exact":"सटीक","examine":"जांचें","excellent":"उत्कृष्ट","exclusive":"अनन्य","expanded":"विस्तारित","expense":"खर्च","experience":"अनुभव","experienced":"अनुभवी","expert":"विशेषज्ञ","expertise":"विशेषज्ञता","experts":"विशेषज्ञ","expire":"समाप्त होना","expired":"समाप्त","explicit":"स्पष्ट","explore":"देखें","exterior":"बाहरी","extra":"अतिरिक्त","extract":"निकालें","exterminator":"कीटनाशक विशेषज्ञ","failed":"विफल","fair":"उचित","fan":"पंखा","faq":"सामान्य प्रश्न","fast":"तेज़","faster":"अधिक तेज़","fastest":"सबसे तेज़","faucet":"नल","february":"फरवरी","fee":"शुल्क","fees":"शुल्क","field":"क्षेत्र","file":"फ़ाइल","filed":"दर्ज किया गया","filter":"फ़िल्टर","filtered":"फ़िल्टर किया गया","final":"अंतिम","finalize":"अंतिम रूप दें","finalized":"अंतिम रूप दिया गया","financial":"वित्तीय","find":"खोजें","finding":"खोज","fine":"उत्कृष्ट","finish":"समाप्त करें","finished":"समाप्त","firm":"कंपनी","first":"पहला","fit":"उपयुक्त","fitness":"फिटनेस","fix":"ठीक करें","fixed":"ठीक किया गया","fixing":"मरम्मत","flag":"ध्वज","flagged":"चिह्नित","flexible":"लचीला","floor":"फर्श","flooring":"फर्श का काम","fluke":"फ्लूक","follow":"अनुसरण करें","for":"के लिए","form":"प्रपत्र","format":"प्रारूप","formed":"गठित","forward":"आगे","found":"मिला","free":"निःशुल्क","friday":"शुक्रवार","friend":"मित्र","fridge":"फ्रिज","frontline":"अग्रिम पंक्ति","full":"पूर्ण","fund":"कोष","funds":"फंड","furniture":"फर्नीचर","future":"भविष्य","gain":"लाभ","garage":"गैराज","garden":"बगीचा","gardener":"माली","gardening":"बागवानी","gate":"द्वार","general":"सामान्य","generate":"उत्पन्न करें","generated":"उत्पन्न","gentle":"कोमल","get":"प्राप्त करें","geyser":"गीज़र","gig":"काम","gigs":"गिग्स","girl":"लड़की","give":"दें","given":"दिया गया","glass":"कांच","global":"वैश्विक","globe":"ग्लोब","gloves":"दस्ताने","goggles":"चश्मा","good":"अच्छा","google":"गूगल","governance":"शासन","governed":"शासित","grade":"श्रेणी","grades":"अंक","grand":"भव्य","great":"महान","green":"हरा","grievance":"शिकायत","grievances":"शिकायतें","grinder":"ग्राइंडर","group":"समूह","groups":"समूह","grow":"बढ़ें","growing":"बढ़ रहा है","guarantee":"गारंटी","guaranteed":"गारंटीकृत","guard":"सुरक्षा गार्ड","guidelines":"दिशानिर्देश","gun":"गन","gurgaon":"गुड़गांव","gurugram":"गुरुग्राम","half":"आधा","hammer":"हैमर","handle":"संभालें","handled":"संभाला","handling":"संभालना","handyman":"कारीगर","happy":"प्रसन्न","hard":"कठिन","hardware":"हार्डवेयर","harness":"सुरक्षा हार्नेस","has":"है","have":"पास है","having":"होने पर","he":"वह","health":"स्वास्थ्य","healthy":"स्वस्थ","hear":"सुनें","heard":"सुना","heat":"गर्मी","heater":"हीटर","heavy":"भारी","held":"आयोजित","hello":"नमस्ते","help":"मदद","helped":"मदद की","helper":"सहायक","helpers":"सहायक","her":"उसकी","herbal":"हर्बल","here":"यहाँ","heritage":"विरासत","hey":"अरे","hide":"छिपाएं","high":"उच्च","highest":"सर्वोच्च","hindi":"हिन्दी","hire":"किराए पर लें","hired":"किराए पर लिया","history":"इतिहास","hold":"रोकें","holding":"रोक कर रखा है","home":"घर","homes":"घर","honest":"ईमानदार","hotel":"होटल","hotels":"होटल","hour":"घंटा","hourly":"प्रति घंटा","hours":"घंटे","house":"मकान","how":"कैसे","hr":"घंटा","hrs":"घंटे","hsr":"एचएसआर","hub":"हब","hyderabad":"हैदराबाद","i":"मैं","icse":"आईसीएसई","id":"आईडी","ideal":"आदर्श","identification":"पहचान","identify":"पहचानें","identity":"पहचान","idle":"निष्क्रिय","if":"यदि","immediate":"तत्काल","immediately":"तुरंत","important":"महत्वपूर्ण","improved":"सुधरा","improvement":"सुधार","in":"में","inactive":"निष्क्रिय","inappropriate":"अनुचित","include":"शामिल करें","included":"शामिल","includes":"शामिल है","income":"आय","incomplete":"अपूर्ण","indegree":"इन-डिग्री","index":"इंडेक्स","india":"भारत","indian":"भारतीय","indic":"भारतीय","individual":"व्यक्तिगत","indoor":"भीतरी","industrial":"औद्योगिक","info":"जानकारी","information":"जानकारी","infrastructure":"बुनियादी ढांचा","inquiry":"पूछताछ","inside":"अंदर","insight":"अंतर्दृष्टि","insights":"इनसाइट्स","inspect":"निरीक्षण करें","inspecting":"निरीक्षण कर रहे हैं","inspection":"निरीक्षण","install":"स्थापित करें","installation":"स्थापना","installed":"स्थापित","instant":"तत्काल","instantly":"तुरंत","instead":"के बजाय","instruct":"निर्देश दें","instruction":"निर्देश","instructions":"निर्देश","instrument":"उपकरण","insurance":"बीमा","insured":"बीमित","integrated":"एकीकृत","intelligence":"बुद्धिमत्ता","intend":"इरादा रखना","interested":"इच्छुक","interim":"अंतरिम","interior":"आंतरिक","internal":"आंतरिक","international":"अंतरराष्ट्रीय","interview":"साक्षात्कार","into":"में","introduce":"परिचय दें","introduction":"परिचय","investigate":"जांच करें","investigating":"जांच जारी","investigation":"जांच","investment":"निवेश","invoice":"चालान","invoices":"चालान","invoicing":"चालान बनाना","is":"है","issue":"मुद्दा","issued":"जारी किया गया","issues":"समस्याएं","it":"यह","item":"मद","items":"सामग्री","its":"इसका","itself":"स्वयं","jaipur":"जयपुर","jan":"जनवरी","january":"जनवरी","job":"कार्य","jobs":"काम","join":"जुड़ें","joined":"जुड़ गए","joining":"जुड़ना","jul":"जुलाई","july":"जुलाई","jun":"जून","june":"जून","junior":"कनिष्ठ","just":"बस","keep":"रखें","kept":"रखा","key":"कुंजी","keyboard":"कीबोर्ड","keys":"कुंजियां","kitchen":"रसोई","kitchens":"रसोई","know":"जानें","knowledge":"ज्ञान","known":"ज्ञात","kolkata":"कोलकाता","koramangala":"कोरमंगला","label":"लेबल","labels":"लेबल","ladder":"सीढ़ी","ladders":"सीढ़ियां","lakh":"लाख","lakhs":"लाख","landscaping":"लैंडस्केपिंग","language":"भाषा","languages":"भाषाएं","lanyard":"डोरी","large":"बड़ा","last":"अंतिम","late":"देर से","latest":"नवीनतम","law":"कानून","layout":"लेआउट","lead":"लीड","leader":"नेता","leadership":"नेतृत्व","leads":"लीड्स","leak":"रिसाव","leakage":"रिसाव","leaking":"टपकता हुआ","leaks":"रिसाव","learn":"सीखें","learning":"सीखना","lease":"पट्टा","least":"कम से कम","ledger":"बहीखाता","left":"बाएं","legal":"कानूनी","lend":"उधार दें","lending":"उधार देना","less":"कम","lesson":"पाठ","lessons":"शिक्षा","let":"दें","level":"स्तर","levels":"स्तर","license":"लाइसेंस","licenses":"लाइसेंस","lighter":"हल्का","line":"लाइन","lines":"लाइनें","link":"लिंक","links":"लिंक्स","list":"सूची","listed":"सूचीबद्ध","listen":"सुनें","listening":"सुन रहे हैं","live":"लाइव","living":"रहने का कमरा","loan":"ऋण","loans":"ऋण","local":"स्थानीय","localities":"इलाके","locality":"इलाका","locate":"पता लगाएं","location":"स्थान","locations":"स्थान","lock":"सुरक्षित","locked":"सुरक्षित","log":"लॉग","logged":"लॉग इन किया","logging":"लॉग इन कर रहे हैं","login":"लॉग इन करें","logo":"लोगो","logout":"लॉग आउट","logs":"लॉग्स","long":"लंबा","look":"देखें","loss":"नुकसान","low":"कम","lower":"कम","lucknow":"लखनऊ","machine":"मशीन","machines":"मशीनें","main":"मुख्य","maintain":"बनाए रखें","maintaining":"बनाए रख रहे हैं","maintenance":"रखरखाव","major":"प्रमुख","make":"बनाएं","making":"बना रहे हैं","management":"प्रबंधन","manager":"प्रबंधक","mar":"मार्च","march":"मार्च","mark":"चिह्नित करें","marked":"चिह्नित किया गया","market":"बाजार","marketplace":"मार्केटप्लेस","mask":"मास्क","mason":"राजमिस्त्री","masonry":"चिनाई का काम","massage":"मालिश","master":"मास्टर","match":"मिलान करें","matched":"मेल खाया","matches":"मिलान","matching":"मिलान","material":"सामग्री","materials":"सामग्री","math":"गणित","maths":"गणित","max":"अधिकतम","maximum":"अधिकतम","may":"मई","mcb":"एमसीबी","me":"मुझे","mechanic":"मैकेनिक","mechanics":"मैकेनिक","mediation":"मध्यस्थता","medium":"मध्यम","meenakshi":"मीनाक्षी","member":"सदस्य","members":"सदस्य","membership":"सदस्यता","menu":"मेनू","message":"संदेश","messages":"संदेश","messaging":"संदेश भेजना","met":"मिला","method":"तरीका","methods":"तरीके","metric":"मीट्रिक","metrics":"आंकड़े","mic":"माइक","microphone":"माइक्रोफ़ोन","microwave":"माइक्रोवेव","midnight":"मध्यरात्रि","min":"मिनट","minimum":"न्यूनतम","minor":"मामूली","mins":"मिनट","minute":"मिनट","minutes":"मिनट","missing":"लापता","mobile":"मोबाइल","model":"मॉडल","modular":"मॉड्यूलर","monday":"सोमवार","money":"पैसे","monitor":"निगरानी करें","monitors":"निगरानी करता है","month":"माह","monthly":"मासिक","months":"महीने","more":"अधिक","morning":"सुबह","mortar":"मोर्टार","most":"अधिकांश","motor":"मोटर","move":"हटाएं","mover":"शिफ्टर","movers":"मूवर्स","moving":"स्थानांतरण","mukherjee":"मुखर्जी","multimeter":"मल्टीमीटर","multiple":"एकाधिक","multilingual":"बहुभाषी","mumbai":"मुंबई","murthy":"मूर्ति","must":"चाहिए","mutual":"पारस्परिक","my":"मेरा","myself":"स्वयं","name":"नाम","names":"नाम","national":"राष्ट्रीय","native":"मूल","nav":"नेविगेशन","navigation":"नेविगेशन","near":"पास","nearby":"निकटतम","neat":"साफ-सुथरा","necessary":"आवश्यक","need":"आवश्यकता","needed":"आवश्यक","needing":"ज़रूरत है","needs":"ज़रूरतें","negative":"नकारात्मक","negi":"नेगी","negotiable":"परक्राम्य","negotiate":"मोलभाव करें","negotiation":"मोलभाव","negotiations":"मोलभाव","net":"शुद्ध","netting":"जाली (नेटिंग)","network":"नेटवर्क","new":"नया","next":"अगला","nidhi":"निधि","night":"रात","nine":"नौ (9)","no":"कोई नहीं","noida":"नोएडा","noise":"शोर","none":"कोई नहीं","noon":"दोपहर","normal":"सामान्य","north":"उत्तर","not":"नहीं","note":"नोट","noted":"समझ गया","notes":"टिप्पणियां","notice":"सूचना","notification":"अधिसूचना","notifications":"सूचनाएं","nov":"नवंबर","november":"नवंबर","now":"अभी","number":"संख्या","numbers":"संख्याएं","numeral":"अंक","numerals":"अंक","nursing":"नर्सिंग","nut":"नट","oauth":"ओ-ऑथ","oct":"अक्टूबर","october":"अक्टूबर","odorless":"गंधहीन","of":"का","off":"बंद","offer":"प्रस्ताव","offered":"प्रस्तावित","offering":"प्रस्ताव","offers":"प्रस्ताव","official":"आधिकारिक","offline":"ऑफलाइन","ok":"ठीक है","okay":"ठीक है","old":"पुराना","on":"पर","onboarding":"शामिल होना","one":"एक","online":"ऑनलाइन","only":"केवल","onto":"पर","open":"खुला","opened":"खोला","opening":"उद्घाटन","opens":"खुलता है","operated":"संचालित","operation":"संचालन","operations":"संचालन","ops":"संचालन","opt":"चुनें","option":"विकल्प","options":"विकल्प","or":"या","order":"ऑर्डर","orders":"ऑर्डर्स","organisation":"संगठन","organization":"संगठन","origin":"मूल","original":"मूल","other":"अन्य","others":"अन्य","our":"हमारा","ours":"हमारा","ourselves":"हम खुद","out":"बाहर","outdoor":"बाहरी","outgoing":"आउटगोइंग","output":"आउटपुट","outstanding":"बकाया","oven":"ओवन","over":"ऊपर","overcharging":"अतिरिक्त शुल्क वसूलना","overflow":"अतिरिक्त कार्य","overview":"अवलोकन","owned":"स्वामित्व","owner":"मालिक","owners":"मालिक","pack":"पैक","package":"पैकेज","packages":"पैकेज","packed":"पैक किया गया","packer":"पैकर","packers":"पैकर्स","packing":"पैकिंग","page":"पृष्ठ","pages":"पृष्ठ","paid":"भुगतान किया","paint":"पेंट","painter":"पेंटर","painters":"पेंटर","painting":"पेंटिंग","pane":"फलक","panel":"पैनल","parmar":"परमार","part":"भाग","partial":"आंशिक","particular":"विशिष्ट","partner":"साथी","partners":"साझेदार","parts":"पुर्जे","pass":"पास","passed":"सफल","password":"पासवर्ड","past":"पिछला","patil":"पाटिल","patna":"पटना","pause":"रोकें","pay":"भुगतान करें","paying":"भुगतान कर रहे हैं","payment":"भुगतान","payments":"भुगतान","payout":"भुगतान","payouts":"भुगतान","paytm":"पेटीएम","pending":"लंबित","pension":"पेंशन","per":"प्रति","percent":"प्रतिशत","percentage":"प्रतिशत","perfect":"उत्कृष्ट","perform":"प्रदर्शन करें","performance":"प्रदर्शन","performed":"किया गया","period":"अवधि","permanent":"स्थायी","permanently":"स्थायी रूप से","permission":"अनुमति","person":"व्यक्ति","personal":"व्यक्तिगत","personally":"व्यक्तिगत रूप से","persons":"व्यक्ति","pest":"कीट","pet":"पालतू","phase":"चरण","phone":"फ़ोन","phonepe":"फ़ोनपे","pick":"चुनें","picked":"चुना","pickup":"पिकअप","pill":"पिल","pin":"पिन","pincode":"पिनकोड","pipe":"पाइप","pipes":"पाइप","place":"स्थान","placed":"रखा गया","placeholder":"प्लेसहोल्डर","places":"स्थान","plan":"योजना","plans":"योजनाएं","plaster":"प्लास्टर","plastic":"प्लास्टिक","platform":"मंच","please":"कृपया","pliers":"प्लाईअर्स","plug":"प्लग","plumber":"प्लंबर","plumbers":"प्लंबर","plumbing":"प्लंबिंग","ply":"प्लाई","plywood":"प्लाईवुड","pm":"अपराह्न","point":"बिंदु","points":"अंक","policy":"नीति","polish":"पॉलिश","polishing":"पॉलिश करना","pool":"पूल","pools":"पूल","poor":"निम्न","popular":"लोकप्रिय","portal":"पोर्टल","position":"पद","positive":"सकारात्मक","possible":"संभव","postal":"डाक","post":"पोस्ट","posted":"पोस्ट किया गया","power":"बिजली","predict":"भविष्यवाणी करें","prediction":"पूर्वानुमान","predictions":"पूर्वानुमान","prefer":"प्राथमिकता दें","preference":"प्राथमिकता","preferred":"पसंदीदा","premium":"प्रीमियम","prepaid":"प्रीपेड","preparation":"तैयारी","presence":"उपस्थिति","press":"दबाएं","pressure":"दबाव","prevent":"रोकें","previous":"पिछला","price":"मूल्य","prices":"कीमतें","pricing":"दरें","primary":"प्राथमिक","privacy":"गोपनीयता","private":"निजी","pro":"प्रो","problem":"समस्या","problems":"समस्याएं","proceed":"आगे बढ़ें","process":"प्रक्रिया","processed":"संसाधित","profession":"पेशा","professional":"पेशेवर","professionals":"पेशेवर","profile":"प्रोफाइल","profiles":"प्रोफाइल","program":"कार्यक्रम","progress":"प्रगति","progressive":"प्रगतिशील","project":"प्रोजेक्ट","promise":"वादा","promote":"बढ़ावा दें","prompt":"शीघ्र","promptly":"तुरंत","property":"संपत्ति","proposal":"प्रस्ताव","propose":"प्रस्ताव करना","proposed":"प्रस्तावित","pros":"कारीगर","prospect":"संभावना","prospective":"भावी","protect":"सुरक्षा दें","protected":"संरक्षित","protection":"सुरक्षा","protocol":"प्रोटोकॉल","provide":"प्रदान करें","provided":"प्रदान किया गया","provider":"प्रदाता","providers":"प्रदाता","punctual":"समयनिष्ठ","pune":"पुणे","qr":"क्यूआर","qualification":"योग्यता","qualified":"योग्य","quality":"गुणवत्ता","quarter":"तिमाही","quarterly":"त्रैमासिक","question":"प्रश्न","questions":"प्रश्न","queue":"कतार","quick":"त्वरित","quickly":"जल्दी से","quit":"छोड़ें","quote":"दर","quotes":"कोट्स","range":"सीमा","rank":"रैंक","ranked":"रैंक दिया गया","rate":"दर","rated":"रेटेड","rates":"दरें","rating":"रेटिंग","ratings":"रेटिंग्स","raw":"कच्चा","reach":"पहुंच","reached":"पहुँच गया","read":"पढ़ें","readiness":"तत्परता","ready":"तैयार","real":"वास्तविक","reallocation":"संसाधन साझाकरण","reason":"कारण","reasonable":"उचित","reasons":"कारण","receive":"प्राप्त करें","received":"प्राप्त हुआ","receiving":"प्राप्त कर रहे हैं","recent":"हालिया","recently":"हाल ही में","recognition":"मान्यता","recommend":"सिफारिश करें","recommended":"अनुशंसित","record":"रिकॉर्ड","records":"रिकॉर्ड्स","recover":"पुनर्प्राप्त करें","rectification":"सुधार","redressal":"निवारण","reduce":"कम करें","reduction":"कटौती","refer":"संदर्भ दें","reference":"संदर्भ","reflect":"प्रतिबिंबित करें","reflects":"दर्शाता है","reform":"सुधार","refresh":"ताज़ा करें","refrigerator":"रेफ्रिजरेटर","refund":"रिफंड","refunded":"वापस किया गया","refunds":"रिफंड","regards":"सादर","region":"क्षेत्र","register":"पंजीकरण करें","registered":"पंजीकृत","registration":"पंजीकरण","regular":"नियमित","reimburse":"प्रतिपूर्ति करें","reinforce":"मजबूत करें","reject":"अस्वीकार","rejected":"अस्वीकृत","rejecting":"अस्वीकार कर रहे हैं","rejection":"अस्वीकृति","relate":"संबंधित","release":"जारी करें","released":"जारी किया गया","releases":"जारी करता है","releasing":"जारी कर रहे हैं","relevant":"प्रासंगिक","reliable":"भरोसेमंद","relief":"राहत","relocation":"स्थानांतरण","remain":"रहें","remaining":"शेष","remains":"बना रहता है","reminder":"अनुस्मारक","remote":"दूरस्थ","remove":"हटाएं","removed":"हटा दिया गया","renew":"नवीनीकरण करें","renewal":"नवीनीकरण","rent":"किराया","rental":"किराया","rented":"किराए पर दिया गया","repair":"मरम्मत","repairs":"मरम्मत कार्य","replace":"बदलें","replacement":"प्रतिस्थापन","reply":"उत्तर दें","report":"रिपोर्ट","reported":"रिपोर्ट किया गया","reporter":"रिपोर्टर","request":"अनुरोध","requested":"अनुरोध किया","requesting":"अनुरोध कर रहे हैं","requests":"अनुरोध","require":"आवश्यक","required":"आवश्यक","requirement":"आवश्यकता","requirements":"आवश्यकताएं","requisition":"मांग","requisitions":"मांग-पत्र","reserve":"आरक्षित","reserves":"आरक्षित निधि","reset":"रीसेट","resolution":"समाधान","resolutions":"समाधान","resolve":"हल करें","resolved":"समाधान पूर्ण","resource":"संसाधन","resources":"संसाधन","respect":"सम्मान","respond":"प्रतिक्रिया दें","response":"प्रतिक्रिया","responses":"प्रतिक्रियाएं","responsible":"जिम्मेदार","rest":"बाकी","restore":"पुनर्स्थापित करें","result":"परिणाम","results":"परिणाम","resume":"फिर शुरू करें","return":"वापसी","returned":"वापस किया गया","revenue":"राजस्व","reversal":"वापसी","review":"समीक्षा","reviewed":"समीक्षा की गई","reviewer":"समीक्षक","reviews":"समीक्षाएं","rewire":"रीवायर करें","rewiring":"रीवायरिंग","rider":"राइडर","right":"सही","rights":"अधिकार","risk":"जोखिम","road":"सड़क","rohini":"रोहिणी","role":"भूमिका","roles":"भूमिकाएं","roller":"रोलर","roof":"छत","roofing":"छत का काम","room":"कमरा","roster":"रोस्टर","rotary":"रोटरी","rule":"नियम","rules":"नियम","rupay":"रुपे","rupee":"रुपया","rupees":"रुपये","safe":"सुरक्षित","safety":"सुरक्षा","said":"कहा","salary":"वेतन","salon":"सैलून","salt":"सॉल्ट","same":"समान","samanta":"सामंत","sanitization":"स्वच्छता","satisfaction":"संतुष्टि","satisfactory":"संतोषजनक","satisfied":"संतुष्ट","saturday":"शनिवार","save":"सहेजें","saved":"सहेजा गया","saving":"बचत","say":"कहें","scale":"पैमाना","scenario":"परिदृश्य","scenarios":"परिदृश्य","schedule":"अनुसूची","scheduled":"निर्धारित","scheduling":"निर्धारण","school":"विद्यालय","scope":"दायरा","score":"स्कोर","screen":"स्क्रीन","screw":"पेंच","screwdriver":"पेचकस","search":"खोजें","searched":"खोजा","searching":"खोज रहे हैं","seat":"सीट","sec":"सेकंड","second":"दूसरा","seconds":"सेकंड","secret":"गुप्त","section":"अनुभाग","sector":"सेक्टर","secure":"सुरक्षित","secured":"सुरक्षित किया गया","security":"सुरक्षा","see":"देखें","seek":"मांगें","select":"चुनें","selected":"चयनित","selecting":"चुनना","selection":"चयन","self":"स्वयं","send":"भेजें","sender":"प्रेषक","sending":"भेज रहे हैं","senior":"वरिष्ठ","sensible":"समझदार","sent":"भेजा गया","sentence":"वाक्य","separate":"अलग","sep":"सितंबर","september":"सितंबर","series":"श्रृंखला","serve":"सेवा दें","served":"सेवा दी","server":"सर्वर","service":"सेवा","services":"सेवाएं","servicing":"सर्विसिंग","session":"सत्र","sessions":"सत्र","set":"सेट करें","setting":"सेटिंग","settings":"सेटिंग्स","settle":"निपटाएं","settled":"निपटाया गया","settlement":"समझौता","seven":"सात (7)","severe":"गंभीर","seva":"सेवा","sevasathi":"सेवासाथी","share":"साझा करें","shared":"साझा किया गया","shares":"शेयर","sharing":"साझाकरण","she":"वह","shell":"शेल","shift":"शिफ्ट","shifted":"शिफ्ट किया गया","shifting":"स्थानांतरण","short":"छोटा","should":"चाहिए","show":"दिखाएं","showing":"दिखा रहा है","shown":"दिखाया गया","shows":"दर्शाता है","side":"तरफ","sides":"पक्ष","sign":"साइन","signed":"हस्ताक्षरित","signing":"हस्ताक्षर करना","signin":"साइन इन करें","signout":"साइन आउट","signup":"पंजीकरण करें","silence":"मौन","silent":"शांत","simple":"सरल","simply":"बस","since":"से","single":"एकल","sir":"सर","site":"साइट","six":"छह (6)","size":"आकार","skill":"कौशल","skilled":"कुशल","skills":"कौशल","slider":"स्लाइडर","slot":"स्लॉट","slots":"स्लॉट","slow":"धीमा","small":"छोटा","smart":"स्मार्ट","snake":"स्नेक","so":"इसलिए","society":"सोसायटी","socket":"सॉकेट","sofa":"सोफा","sold":"बेचा","soldering":"सोल्डरिंग","solution":"समाधान","solutions":"समाधान","some":"कुछ","someone":"कोई","something":"कुछ","somewhere":"कहीं","soon":"जल्द","sorry":"क्षमा करें","sort":"क्रमबद्ध करें","sorted":"क्रमबद्ध","sound":"ध्वनि","source":"स्रोत","south":"दक्षिण","spa":"स्पा","space":"जगह","spaces":"स्थान","spare":"अतिरिक्त","spares":"अतिरिक्त पुर्जे","speak":"बोलें","speaker":"वक्ता","speaking":"बोल रहे हैं","special":"विशेष","specialist":"विशेषज्ञ","specialists":"विशेषज्ञ","specific":"विशिष्ट","specifically":"विशेष रूप से","speed":"गति","speedy":"तेज़","spent":"खर्च किया गया","split":"विभाजन","spot":"स्थान","spray":"स्प्रे","sprayer":"स्प्रेयर","squad":"दस्ता","squads":"दस्ते","staff":"स्टाफ","standard":"मानक","standards":"मानक","star":"स्टार","stars":"सितारे","start":"शुरू करें","started":"शुरू किया","starting":"शुरू हो रहा है","starts":"शुरू होता है","state":"राज्य","statement":"बयान","status":"स्थिति","stay":"रहें","step":"कदम","steps":"चरण","still":"अभी भी","stop":"रोकें","stopped":"रुक गया","stopping":"रोकना","storage":"भंडारण","store":"दुकान","stored":"संग्रहीत","straight":"सीधा","stream":"स्ट्रीम","street":"सड़क","strictly":"सख्ती से","student":"छात्र","students":"छात्र","style":"शैली","subject":"विषय","submit":"जमा करें","submitted":"जमा किया गया","submitting":"जमा कर रहे हैं","subtle":"सूक्ष्म","success":"सफलता","successful":"सफल","successfully":"सफलतापूर्वक","suggest":"सुझाव दें","suggested":"सुझाया गया","suggestion":"सुझाव","suggestions":"सुझाव","suit":"अनुकूल","summary":"सारांश","summer":"गर्मी","sunday":"रविवार","superb":"उत्कृष्ट","supplier":"आपूर्तिकर्ता","support":"सहायता","supported":"समर्थित","supporter":"समर्थक","surat":"सूरत","sure":"ज़रूर","surprise":"आश्चर्य","survey":"सर्वेक्षण","sweet":"मीठा","swift":"त्वरित","switch":"बदलें","symptom":"लक्षण","symptoms":"लक्षण","system":"प्रणाली","systems":"प्रणालियां","table":"तालिका","tailor":"दर्जी","take":"लें","taken":"लिया","taking":"ले रहे हैं","tap":"नल","tape":"टेप","target":"लक्ष्य","task":"कार्य","tasks":"कार्य","team":"टीम","tech":"तकनीक","technician":"तकनीशियन","technicians":"तकनीशियन","technology":"प्रौद्योगिकी","tell":"बताएं","ten":"दस (10)","term":"शर्त","terms":"शर्तें","test":"परीक्षण","tested":"परीक्षण किया गया","tester":"परीक्षक","text":"टेक्स्ट","than":"की तुलना में","thank":"धन्यवाद","thanks":"धन्यवाद","that":"वह","the":"","their":"उनका","theirs":"उनका","them":"उन्हें","themselves":"स्वयं","then":"तो","therapy":"थेरेपी","therapist":"थेरेपिस्ट","therapists":"थेरेपिस्ट","there":"वहाँ","these":"ये","they":"वे","third":"तीसरा","this":"यह","those":"वे","though":"हालांकि","three":"तीन (3)","through":"के माध्यम से","throughout":"भर में","thursday":"गुरुवार","ticket":"टिकट","tickets":"टिकट","tile":"टाइल","tiles":"टाइल्स","tiling":"टाइल लगाने का काम","till":"तक","timber":"इमारती लकड़ी","time":"समय","timeline":"समयरेखा","times":"बार","timing":"समय","timings":"समय","tip":"टिप","tips":"टिप्स","title":"शीर्षक","to":"को","today":"आज","together":"एक साथ","tomorrow":"कल","tonight":"आज रात","too":"भी","tool":"औजार","tools":"औजार","top":"शीर्ष","total":"कुल","touch":"स्पर्श","toward":"की ओर","towards":"की ओर","town":"शहर","track":"ट्रैक करें","tracked":"ट्रैक किया गया","tracking":"ट्रैकिंग","trade":"पेशा","trades":"ट्रेड्स","traffic":"यातायात","train":"प्रशिक्षित करें","trained":"प्रशिक्षित","trainer":"प्रशिक्षक","training":"प्रशिक्षण","transfer":"स्थानांतरण","transferred":"स्थानांतरित","transform":"रूपांतरित करें","transition":"संक्रमण","translation":"अनुवाद","transparent":"पारदर्शी","transport":"परिवहन","treat":"उपचार करें","treatment":"उपचार","treatments":"उपचार","tree":"पेड़","trigger":"शुरू करें","triggered":"शुरू हुआ","true":"सही","truly":"वास्तव में","trust":"भरोसा","trusted":"भरोसेमंद","try":"प्रयास करें","tuesday":"मंगलवार","tutor":"शिक्षक","tutoring":"ट्यूशन","tutors":"शिक्षक","two":"दो (2)","type":"प्रकार","typed":"टाइप किया","types":"प्रकार","typing":"टाइपिंग","unable":"असमर्थ","unassigned":"अनावंटित","unavailable":"अनुपलब्ध","under":"तहत","underneath":"नीचे","understand":"समझें","understanding":"समझ","understood":"समझ गए","uniform":"वर्दी","unify":"एकजुट करना","union":"संघ","unit":"इकाई","united":"संयुक्त","units":"इकाइयां","universal":"सार्वभौमिक","unlock":"अनलॉक","unlocked":"अनलॉक किया","unlocks":"अनलॉक करता है","unpaid":"अदत्त","unprofessional":"गैर-पेशेवर","unresolved":"अनसुलझा","unsettled":"अनसुलझा","unsuccessful":"असफल","until":"जब तक","unverified":"असत्यापित","update":"अपडेट","updated":"अपडेट किया गया","updates":"अपडेट्स","updating":"अपडेट कर रहे हैं","upgrade":"अपग्रेड करें","upgrades":"अपग्रेड","upfront":"अग्रिम","upholstery":"अपहोल्स्ट्री","upi":"यूपीआई","upon":"पर","urgent":"जरूरी","urgently":"तुरंत","us":"हमें","use":"उपयोग करें","used":"उपयोग किया गया","useful":"उपयोगी","user":"उपयोगकर्ता","users":"उपयोगकर्ता","uses":"उपयोग करता है","using":"उपयोग करके","valid":"मान्य","validate":"सत्यापित करें","validated":"सत्यापित","validating":"सत्यापन कर रहे हैं","validation":"सत्यापन","validity":"वैधता","valuation":"मूल्यांकन","value":"मूल्य","values":"मूल्य","valve":"वाल्व","vehicle":"वाहन","vehicles":"वाहन","venkatesh":"वेंकटेश","verdict":"फैसला","verification":"सत्यापन","verified":"सत्यापित","verify":"सत्यापित करें","verifying":"सत्यापित कर रहे हैं","via":"के माध्यम से","view":"देखें","viewed":"देखा गया","viewing":"देख रहे हैं","views":"दृश्य","violation":"उल्लंघन","violations":"उल्लंघन","visa":"वीज़ा","visible":"दृश्यमान","visit":"विज़िट","visited":"भेंट की","visiting":"भेंट कर रहे हैं","visits":"भेंट","visual":"दृश्य","voice":"आवाज़","volume":"मात्रा","vote":"वोट","voted":"वोट दिया","voting":"मतदान","voucher":"वाउचर","wage":"वेतन","wages":"मजदूरी","wait":"प्रतीक्षा करें","waiting":"प्रतीक्षा में","wall":"दीवार","walls":"दीवारें","wallet":"बटुआ","want":"चाहते हैं","wanted":"चाहते थे","wants":"चाहता है","warn":"चेतावनी","warned":"चेतावनी दी गई","warning":"चेतावनी","warnings":"चेतावनी","warranty":"वारंटी","was":"था","wash":"धुलाई","washer":"वॉशर","washing":"धुलाई","water":"पानी","waterproofing":"वॉटरप्रूफिंग","way":"रास्ता","ways":"तरीके","we":"हम","website":"वेबसाइट","wednesday":"बुधवार","week":"सप्ताह","weekend":"सप्ताहांत","weekends":"सप्ताहांत","weekly":"साप्ताहिक","weeks":"सप्ताह","welcome":"स्वागत है","welcoming":"स्वागत कर रहे हैं","welfare":"कल्याण","well":"अच्छा","wellness":"कल्याण","went":"गया","were":"थे","west":"पश्चिम","what":"क्या","whatever":"जो भी","when":"कब","where":"कहाँ","wherever":"जहाँ कहीं भी","which":"कौन सा","while":"जबकि","whitefield":"व्हाइटफील्ड","who":"कौन","whole":"पूरा","whom":"किसे","whose":"किसका","why":"क्यों","wi":"वाई","fi":"फाई","wifi":"वाई-फाई","will":"होगा","window":"खिड़की","windows":"खिड़कियां","wire":"तार","wires":"तारें","wiring":"वायरिंग","wish":"इच्छा","with":"साथ","withdraw":"निकासी करें","withdrawal":"निकासी","within":"के भीतर","without":"बिना","won":"जीता","wonderful":"अद्भुत","wood":"लकड़ी","work":"काम","worked":"काम किया","worker":"श्रमिक","workers":"श्रमिक","workforce":"कार्यबल","working":"कार्यरत","works":"कार्य","workspace":"कार्यक्षेत्र","worldwide":"विश्वव्यापी","worries":"चिंताएं","worry":"चिंता करें","wrap":"लपेटें","wrapping":"समाप्त कर रहे हैं","wrench":"रिंच","write":"लिखें","writing":"लिखना","written":"लिखित","yadaiah":"यदैया","year":"वर्ष","yearly":"वार्षिक","years":"वर्ष","yes":"हाँ","yesterday":"कल","yet":"अभी","yield":"उपज","yoga":"योग","you":"आप","your":"आपका","yours":"आपका","yourself":"खुद","zero":"शून्य","zone":"ज़ोन","zones":"क्षेत्र","anytime":"किसी भी समय","apartment":"अपार्टमेंट","apps":"ऐप्स","ar":"एआर","archived":"संग्रहीत","are":"हैं","arjun":"अर्जुन","artist":"कलाकार","assembled":"संयोजित","assembly":"संयोजन","attendance":"उपस्थिति","ayesha":"आयशा","babysitter":"दाई","babysitting":"शिशु देखभाल","backed":"समर्थित","background":"पृष्ठभूमि","balanced":"संतुलित","balancing":"संतुलन","bandra":"बांद्रा","based":"आधारित","baseline":"आधार रेखा","beneficiary":"लाभार्थी","bhat":"भट","bhk":"बीएचके","bliss":"परमानंद","bookshelf":"किताबों की अलमारी","branches":"शाखाएं","brokers":"दलाल","bug":"खराबी","cafe":"कैफे","calculated":"गणना की गई","calm":"शांत","cancellation":"रद्दीकरण","cancellations":"रद्दीकरण","caring":"देखभाल करने वाला","cashless":"कैशलेस","catering":"खानपान","certifications":"प्रमाणपत्र","child":"बच्चा","childcare":"शिशु देखभाल","children":"बच्चे","cin":"सीआईएन","clarity":"स्पष्टता","cleanup":"सफाई","clearly":"स्पष्ट रूप से","clinic":"क्लिनिक","coats":"परतें (कोट्स)","collaborate":"सहयोग करें","come":"आएं","commences":"शुरू होता है","commute":"आवागमन","companion":"साथी","companions":"साथी","compensation":"मुआवजा","complainant":"शिकायतकर्ता","complexes":"परिसर","compliance":"अनुपालन","comprehensive":"व्यापक","compulsory":"अनिवार्य","console":"कंसोल","consolidated":"समेकित","construction":"निर्माण","contacts":"संपर्क","continue":"जारी रखें","continuing":"जारी रखना","contribution":"योगदान","contributions":"योगदान","control":"नियंत्रण","conversation":"बातचीत","coop":"सहकारी","cooperation":"सहयोग","corner":"कोना","council":"परिषद","counts":"गिनती","cover":"कवर","coverage":"कवरेज","cr":"करोड़","craft":"शिल्प","craftsman":"कारीगर","craftsmanship":"कारीगरी","crashed":"क्रैश हुआ","creation":"सृजन","credential":"साख","credentials":"साख","credits":"क्रेडिट्स","cross":"पार","currently":"वर्तमान में","cut":"काटें","cutters":"कटर","cyber":"साइबर","daughter":"बेटी","dedicated":"समर्पित","deduct":"काटें","deducted":"काटा गया","deductions":"कटौतियां","demand":"मांग","demands":"मांगें","denied":"अस्वीकार किया गया","dependable":"भरोसेमंद","deployed":"तैनात","deploying":"तैनात कर रहे हैं","deshmukh":"देशमुख","desk":"डेस्क","destinations":"गंतव्य","deterioration":"गिरावट","development":"विकास","deworming":"पेट के कीड़े की दवा","dialogue":"संवाद","differ":"भिन्न","difference":"अंतर","different":"अलग","dirt":"गंदगी","disaster":"आपदा","disconnect":"डिस्कनेक्ट","discount":"छूट","discounts":"छूट","dispatch":"रवाना करें","dispatched":"रवाना किया गया","displays":"प्रदर्शित करता है","documentation":"दस्तावेज़ीकरण","documents":"दस्तावेज़","dollar":"डॉलर","don":"मत","dose":"खुराक","download":"डाउनलोड","downtime":"डाउनटाइम","dress":"पोशाक","dues":"बकाया","duration":"अवधि","dust":"धूल","dusting":"धूल झाड़ना","duty":"कर्तव्य","dwellings":"आवास","dynamically":"गतिशील रूप से","easiest":"सबसे आसान","easily":"आसानी से","easy":"आसान","eating":"खानपान","edition":"संस्करण","education":"शिक्षा","efficiency":"दक्षता","efficient":"कुशल","efficiently":"कुशलतापूर्वक","either":"या तो","elaborate":"विस्तृत","electric":"विद्युत","electricity":"बिजली","electronic":"इलेक्ट्रॉनिक","elementary":"प्राथमिक","elevate":"ऊंचा उठाएं","eliminated":"समाप्त किया गया","else":"अन्य","embedded":"निहित","emphasize":"जोर दें","empower":"सशक्त बनाएं","empowerment":"सशक्तिकरण","encourage":"प्रोत्साहित करें","end":"अंत","ended":"समाप्त हुआ","ending":"समाप्ति","energy":"ऊर्जा","enjoy":"आनंद लें","ensuring":"सुनिश्चित करते हुए","entry":"प्रविष्टि","environment":"पर्यावरण","environmental":"पर्यावरणीय","equal":"बराबर","equality":"समानता","equitable":"न्यायसंगत","equivalent":"समतुल्य","escalate":"आगे बढ़ाएं","escalated":"आगे बढ़ाया गया","essential":"आवश्यक","estate":"संपत्ति","et":"आदि","etc":"आदि","ethics":"नैतिकता","evaluation":"मूल्यांकन","evidence":"सबूत","exceeding":"अधिक होना","exclusively":"विशेष रूप से","execution":"निष्पादन","exempt":"मुक्त","exempted":"छूट दी गई","expand":"विस्तार करें","expectation":"अपेक्षा","expectations":"अपेक्षाएं","expected":"अपेक्षित","expedite":"शीघ्र करें","expedited":"शीघ्र किया गया","expenditure":"व्यय","expenses":"खर्च","expensive":"महंगा","expiry":"समाप्ति","extended":"विस्तारित","extending":"विस्तार करना","external":"बाहरी","extractive":"शोषणकारी","extreme":"अत्यधिक","facility":"सुविधा","fail":"विफल","false":"गलत","family":"परिवार","fantastic":"शानदार","farm":"खेत","feature":"सुविधा","featured":"विशेष रुप से प्रदर्शित","features":"सुविधाएं","federation":"महासंघ","feel":"महसूस करें","feet":"फीट","fellow":"साथी","festival":"त्योहार","fetch":"प्राप्त करें","fittings":"फिटिंग्स","fixture":"उपकरण","fixtures":"फिक्स्चर","flash":"फ्लैश","flat":"फ्लैट","flawless":"दोषरहित","flight":"उड़ान","floating":"फ्लोटिंग","flow":"प्रवाह","foam":"फोम","focus":"ध्यान दें","font":"फ़ॉन्ट","food":"भोजन","foot":"पैर","footage":"फुटेज","forbidden":"वर्जित","forecast":"पूर्वानुमान","forecasting":"पूर्वानुमान लगाना","formal":"औपचारिक","formula":"सूत्र","forth":"आगे","fraction":"अंश","framework":"ढांचा","frequently":"अक्सर","front":"सामने","fuel":"ईंधन","function":"समारोह","functional":"कार्यात्मक","functionality":"कार्यक्षमता","gallery":"गैलरी","game":"खेल","gaps":"कमियां","gas":"गैस","gathered":"एकत्रित","gear":"उपकरण","gearing":"तैयारी","gears":"उपकरण","geo":"भौगोलिक","gift":"उपहार","girls":"लड़कियां","gita":"गीता","gives":"देता है","giving":"देना","go":"जाएं","goal":"लक्ष্য","goals":"लक्ष्य","going":"जा रहे हैं","goud":"गौड़","gourmet":"स्वादिष्ट भोजन","government":"सरकार","grace":"कृपा","granite":"ग्रेनाइट","grant":"अनुदान","gross":"सकल","growth":"वृद्धि","guide":"मार्गदर्शक","guided":"निर्देशित","habit":"आदत","hall":"हॉल","hand":"हाथ","handheld":"हाथ में पकड़ने योग्य","hands":"हाथ","happen":"होना","happening":"हो रहा है","happens":"होता है","harassment":"उत्पीड़न","hazard":"खतरा","head":"प्रमुख","header":"शीर्षलेख","heading":"शीर्षक","healthcare":"स्वास्थ्य सेवा","hearing":"सुनवाई","heatgun":"हीट गन","heavily":"भारी मात्रा में","helmet":"हेलमेट","helmets":"हेलमेट","helpdesk":"सहायता केंद्र","helpful":"मददगार","heuristic":"अनुभवजन्य","highrise":"बहुमंजिला इमारत","hill":"पहाड़ी","hint":"संकेत","holiday":"छुट्टी","holidays":"छुट्टियां","hospital":"अस्पताल","hospitalization":"अस्पताल में भर्ती","host":"मेजबान","hot":"गर्म","household":"घरेलू","households":"परिवार","housekeeping":"घर की देखरेख","huge":"विशाल","human":"मानव","hundred":"सौ","hurt":"चोट","hygiene":"स्वच्छता","ignored":"अनदेखा किया गया","illness":"बीमारी","illustrate":"चित्रित करें","impact":"प्रभाव","implement":"लागू करें","implemented":"लागू किया गया","implementation":"कार्यान्वयन","improve":"सुधारें","improves":"सुधार करता है","incentive":"प्रोत्साहन","incentives":"प्रोत्साहन","incident":"घटना","incidents":"घटनाएं","indore":"इंदौर","informing":"सूचित करना","initial":"प्रारंभिक","initials":"आद्याक्षर","initiative":"पहल","input":"इनपुट","inputs":"इनपुट","inquire":"पूछताछ करें","inquiries":"पूछताछ","inspector":"निरीक्षक","installations":"स्थापनाएं","installer":"इंस्टॉलर","instructed":"निर्देशित","integrity":"अखंडता","intent":"इरादा","interactive":"संवादात्मक","interface":"इंटरफ़ेस","intermediate":"मध्यवर्ती","interventions":"हस्तक्षेप","invaluable":"अमूल्य","invested":"निवेश किया गया","investor":"निवेशक","invite":"आमंत्रित करें","invited":"आमंत्रित","inward":"आवक","iron":"लोहा","isolated":"पृथक","janitor":"सफाईकर्मी","jet":"जेट","journey":"यात्रा","judge":"न्यायाधीश","judgment":"निर्णय","junction":"जंक्शन","kilometers":"किलोमीटर","kind":"प्रकार","kits":"किट","laminated":"लेमिनेटेड","lamp":"दीपक","landmark":"सीमाचिह्न","laptop":"लैपटॉप","later":"बाद में","laundering":"धुलाई","laundry":"कपड़े धोने का काम","layer":"परत","leakproof":"रिसावरोधी","learners":"शिक्षार्थी","legacy":"विरासत","lenders":"ऋणदाता","leverage":"लाभ उठाएं","levy":"लेवी","liability":"दायित्व","licensed":"लाइसेंस प्राप्त","life":"जीवन","lifecycle":"जीवनचक्र","lifetime":"आजीवन","lift":"लिफ्ट","lighting":"रोशनी","lights":"लाइट्स","limit":"सीमा","limited":"सीमित","limits":"सीमाएं","lining":"अस्तर","liquidity":"तरलता","loading":"लोड हो रहा है","loaned":"उधार दिया गया","lockers":"लॉकर","locks":"ताले","loop":"लूप","lowcost":"कम लागत","loyalty":"वफादारी","luxury":"विलासिता","mailer":"मेलर","mail":"डाक","maintainer":"अनुरक्षक","mandatory":"अनिवार्य","manpower":"जनशक्ति","manual":"मैनुअल","map":"नक्शा","marble":"संगमरमर","maximize":"अधिकतम करें","maximums":"अधिकतम","meals":"भोजन","means":"साधन","measures":"उपाय","media":"मीडिया","medical":"चिकित्सा","medicine":"दवा","medicines":"दवाएं","mentor":"परामर्शदाता","merchant":"व्यापारी","mess":"गड़बड़","metal":"धातु","meter":"मीटर","meters":"मीटर","micro":"सूक्ष्म","microfinance":"सूक्ष्म वित्त","milestone":"मील का पत्थर","milestones":"मील के पत्थर","minimal":"न्यूनतम","minimize":"कम से कम करें","mode":"मोड","modes":"मोड्स","modify":"संशोधित करें","moment":"क्षण","movement":"आंदोलन","multi":"बहु","multitasking":"मल्टीटास्किंग","nail":"कील","nails":"कीलें","named":"नामित","negotiated":"बातचीत की गई","neighborhood":"पड़ोस","neither":"न तो","netted":"नेट किया गया","networking":"नेटवर्किंग","neutral":"तटस्थ","newly":"नया","nil":"शून्य","noble":"महान","nod":"सहमति","node":"नोड","nominal":"नाममात्र","nonprofit":"गैर-लाभकारी","norm":"मानक","norms":"मानदंड","notation":"अंकन","novel":"उपन्यास","nowadays":"आजकल","null":"शून्य","objective":"उद्देश्य","objectives":"उद्देश्य","obligation":"दायित्व","occupational":"व्यावसायिक","occupations":"व्यवसाय","occurred":"घटित हुआ","offset":"ऑफसेट","oil":"तेल","older":"पुराना","oldest":"सबसे पुराना","omission":"चूक","ongoing":"जारी","onsite":"साइट पर","openings":"अवसर","operate":"संचालित करें","operator":"ऑपरेटर","opportunity":"अवसर","opportunities":"अवसर","optimal":"इष्टतम","optimize":"अनुकूलित करें","optimized":"अनुकूलित","optionally":"वैकल्पिक रूप से","oral":"मौखिक","orderly":"व्यवस्थित","ordinance":"अध्यादेश","outage":"बिजली गुल","outcome":"परिणाम","outdoors":"बाहर","overdue":"अतिदेय","overhead":"उपरि व्यय","overlap":"अतिव्यापन","packet":"पैकेट","panelist":"पैनलिस्ट","panoramic":"विहंगम","parameter":"पैरामीटर","pardon":"क्षमा करें","parent":"अभिभावक","park":"पार्क","parking":"पार्किंग","participate":"भाग लें","participation":"भागीदारी","particulars":"विवरण","parties":"पक्ष","partition":"विभाजन","partnered":"साझेदारी की","passage":"मार्ग","pastime":"मनोरंजन","patience":"धैर्य","patient":"मरीज","patrol":"गश्त","patron":"संरक्षक","pave":"रास्ता बनाना","pedestrian":"पैदल यात्री","penalty":"जुर्माना","penny":"पैसा","perceive":"समझना","perfected":"परिपूर्ण","periodical":"आवधिक","permanency":"स्थायित्व","permeate":"फैलना","permit":"अनुमति","permitted":"अनुमति प्राप्त","perpetual":"निरंतर","perseverance":"दृढ़ता","persists":"बना रहता है","personalized":"व्यक्तिगत","personnel":"कर्मी दल","petroleum":"पेट्रोलियम","phased":"चरणबद्ध","photo":"फोटो","photograph":"तस्वीर","photos":"तस्वीरें","phrase":"वाक्यांश","physical":"शारीरिक","physique":"शारीरिक बनावट","pictures":"चित्र","piece":"टुकड़ा","pilot":"पायलट","pipeline":"पाइपलाइन","placement":"नियुक्ति","platinum":"प्लेटिनम","pleasant":"सुखद","pledge":"प्रतिज्ञा","plentiful":"प्रचुर","plus":"प्लस","pocket":"जेब","pod":"पॉड","policyholder":"पॉलिसीधारक","portion":"हिस्सा","portfolio":"पोर्टफोलियो","positioning":"पोजिशनिंग","possibility":"संभावना","postcard":"पोस्टकार्ड","potential":"संभावित","poultry":"पोल्ट्री","pound":"पाउंड","poverty":"गरीबी","powerful":"शक्तिशाली","practical":"व्यावहारिक","practice":"अभ्यास","practitioner":"चिकित्सक","praise":"प्रशंसा","precaution":"सावधानी","precautions":"सावधानियां","precise":"सटीक","precisely":"सटीक रूप से","precision":"सटीकता","predatory":"शोषणकारी","preferable":"बेहतर","premises":"परिसर","prepared":"तैयार","prescribed":"निर्धारित","presentation":"प्रस्तुति","preserve":"संरक्षित करें","preset":"पूर्व निर्धारित","preside":"अध्यक्षता करना","preventative":"निवारक","prevention":"रोकथाम","pricey":"महंगा","pride":"गर्व","prime":"प्रमुख","primitive":"आदिम","principal":"प्रधान","prior":"पूर्व","priority":"प्राथमिकता","privilege":"विशेषाधिकार","proactive":"सक्रिय","probability":"संभाव्यता","probation":"परिवीक्षा","procedure":"प्रक्रिया","proceeding":"कार्यवाही","processor":"प्रोसेसर","procure":"खरीदें","procurement":"खरीद","produce":"उत्पादन करें","producer":"उत्पादक","product":"उत्पाद","production":"उत्पादन","products":"उत्पाद","profit":"लाभ","profitable":"लाभदायक","profits":"लाभ","profound":"गहरा","progressed":"प्रगति की","prohibit":"निषेध करना","projection":"प्रक्षेपण","prolong":"लंबा खींचना","promising":"आशाजनक","promoter":"प्रवर्तक","promotion":"पदोन्नति","proper":"उचित","properly":"उचित रूप से","proprietor":"मालिक","prosecute":"मुकदमा चलाना","prospects":"संभावनाएं","prosper":"समृद्ध होना","protecting":"सुरक्षा कर रहे हैं","proven":"प्रमाणित","province":"प्रांत","provision":"प्रावधान","provisions":"प्रावधान","proximity":"समीप","prudent":"विवेकी","psychology":"मनोविज्ञान","publish":"प्रकाशित करें","published":"प्रकाशित","pump":"पंप","punctuality":"समय की पाबंदी","purchase":"खरीदें","purchased":"खरीदा","pure":"शुद्ध","purpose":"उद्देश्य","pursue":"पीछा करना","push":"दबाएं","puzzled":"परेशान","quantity":"मात्रा","quarrel":"झगड़ा","quarry":"खदान","query":"प्रश्न","quest":"खोज","quota":"कोटा","quotation":"कोटेशन","radar":"रडार","radiant":"चमकदार","radius":"त्रिज्या","railing":"रेलिंग","raise":"उठाएं","raised":"उठाया","random":"यादृच्छिक","rapid":"त्वरित","rare":"दुर्लभ","ratio":"अनुपात","rationale":"तर्कसंगतता","ravinder":"रविंदर","reaffirm":"पुष्टि करना","realign":"पुनर्गठित करें","reassure":"आश्वस्त करना","rebooking":"पुनर्बुकिंग","rebound":"पुनरुद्धार","rebuild":"पुनर्निर्माण करें","receipt":"रसीद","receipts":"रसीदें","recharge":"रिचार्ज","recipient":"प्राप्तकर्ता","reckon":"गिनती करना","reclaim":"पुनः प्राप्त करें","reconcile":"समाधान करना","reconstruct":"पुनर्निर्माण करना","recoverable":"पुनर्प्राप्ति योग्य","recruitment":"भर्ती","redress":"निवारण","redundant":"अनावश्यक","referee":"रेफरी","refine":"परिष्कृत करें","reflected":"प्रतिबिंबित","reimbursement":"प्रतिपूर्ति","reinstate":"पुनर्स्थापित करें","reiterate":"दोहराना","relaxation":"विश्राम","relaxed":"आरामदायक","relentless":"निरंतर","reliability":"विश्वसनीयता","reliance":"भरोसा","remedy":"उपाय","remittance":"प्रेषित धन","remodel":"पुनर्निर्माण करना","renovation":"नवीनीकरण","reorganization":"पुनर्गठन","repairman":"मरम्मतकर्मी","repave":"पुनः पक्का करना","repeated":"दोहराया गया","repertoire":"संग्रह","repetitive":"दोहरावदार","rephrase":"पुनः व्यक्त करें","replica":"प्रतिकृति","replicate":"दोहराना","repurchase":"पुनर्खरीद","reputable":"प्रतिष्ठित","requester":"अनुरोधकर्ता","rescind":"रद्द करना","rescuer":"बचावकर्ता","reschedule":"समय पुनर्निर्धारित करें","rescheduled":"पुनर्निर्धारित","residence":"निवास","residential":"आवासीय","resilience":"लचीलापन","resistant":"प्रतिरोधी","resolute":"दृढ़","respective":"क्रमशः","restitution":"वापसी","restrict":"प्रतिबंधित करना","retail":"खुदरा","retain":"बनाए रखना","retention":"प्रतिधारण","rethink":"पुनर्विचार करना","retreat":"विश्राम स्थल","retrospect":"सिंहावलोकन","reveal":"प्रकट करना","revelation":"रहस्योद्घाटन","revision":"संशोधन","revival":"पुनरुद्धार","revoke":"रद्द करना","rewrite":"पुनर्लेखन","rigid":"कठोर","rigorous":"कठिन","ring":"अंगूठी","rising":"उभरता हुआ","roadway":"सड़क","roam":"घूमना","robust":"मजबूत","rooftop":"छत","root":"जड़","route":"मार्ग","routine":"दिनचर्या","rubric":"निर्देशिका","ruin":"बर्बाद करना","ruling":"निर्णय","runner":"धावक","safeguard":"सुरक्षात्मक उपाय","safest":"सबसे सुरक्षित","safeties":"सुरक्षा उपाय","sample":"नमूना","sanction":"मंजूरी","sanitary":"स्वच्छ","sanitation":"स्वच्छता","satisfying":"संतोषजनक","saver":"बचतकर्ता","scaffold":"मचान","scaffolding":"मचान","scalable":"स्केलेबल","scan":"स्कैन करें","scanned":"स्कैन किया","scholar":"विद्वान","scholarship":"छात्रवृत्ति","scientific":"वैज्ञानिक","scooter":"स्कूटर","scorecard":"स्कोरकार्ड","scrub":"रगड़ना","seamless":"सहज","secondary":"माध्यमिक","secrecy":"गोपनीयता","securely":"सुरक्षित रूप से","securities":"प्रतिभूतियां","segment":"खंड","selectively":"चयनात्मक रूप से","semester":"सत्र","seminar":"संगोष्ठी","sendoff":"विदाई","sensation":"सनसनी","sensing":"सेंसिंग","sensitive":"संवेदनशील","sentiment":"भावना","sequence":"क्रम","serene":"शांत","serial":"क्रमिक","settling":"निपटाना","setup":"सेटअप","severely":"गंभीरता से","sewing":"सिलाई","shade":"छाया","shake":"हिलाना","shallow":"उथला","shape":"आकार","shaping":"आकार देना","shareholder":"शेयरधारक","shareholding":"शेयरधारिता","sharp":"तेज","sheet":"शीट","shelter":"आश्रय","shield":"ढाल","shine":"चमक","shipment":"खेप","shock":"झटका","shop":"दुकान","shopper":"खरीदार","shortage":"कमी","shortcut":"शॉर्टकट","shortfall":"कमी","shoulder":"कंधा","shounak":"शौनक","shuttle":"शटल","sibling":"भाई-बहन","sick":"बीमार","sickness":"बीमारी","sidewalk":"फुटपाथ","signal":"संकेत","signature":"हस्ताक्षर","significance":"महत्व","signoff":"साइन-ऑफ","simulate":"अनुरूपण करना","simulation":"सिमुलेशन","simultaneously":"एक साथ","sincere":"सच्चा","sincerely":"भवदीय","sister":"बहन","sit":"बैठें","situated":"स्थित","situation":"स्थिति","sketch":"रेखाचित्र","slated":"तय","sliding":"स्लाइडिंग","slight":"मामूली","slightly":"थोड़ा","slip":"पर्ची","slogan":"नारा","smooth":"सहज","smoothly":"सुचारू रूप से","snap":"झटका","snapshot":"झलक","soak":"भिगोना","social":"सामाजिक","socialize":"मेलजोल करना","soft":"नरम","software":"सॉफ्टवेयर","soil":"मिट्टी","solar":"सौर","sole":"एकमात्र","solely":"केवल","solid":"ठोस","solo":"एकल","soundproof":"ध्वनिरोधी","spark":"चिंगारी","specialty":"विशिष्टता","specify":"निर्दिष्ट करें","specifying":"निर्दिष्ट करना","specimen":"नमूना","spectator":"दर्शक","spectrum":"स्पेक्ट्रम","speedometer":"स्पीडोमीटर","spiral":"घुमावदार","splendid":"शानदार","sponsor":"प्रायोजक","sponsorship":"प्रायोजन","spotless":"बेदाग","spout":"टोंटी","spring":"वसंत","sprinkler":"फव्वारा","stability":"स्थिरता","stabilize":"स्थिर करना","stable":"स्थिर","staircase":"सीढ़ी","stairs":"सीढ़ियां","stalwart":"निष्ठावान","stamp":"मुहर","stance":"रुख","standardize":"मानकीकृत करें","standby":"स्टैंडबाय","standing":"खड़ा","standout":"उत्कृष्ट","staple":"मुख्य","starter":"शुरुआती","stationary":"स्थिर","stationery":"स्टेशनरी","statistics":"आंकड़े","statute":"कानून","statutory":"वैधानिक","steady":"स्थिर","steam":"भाप","steel":"इस्पात","stellar":"उत्कृष्ट","sterilize":"कीटाणुरहित करना","steward":"प्रबंधक","stewardship":"प्रबंधन","stimulate":"प्रोत्साहित करना","stipend":"वजीफा","stipulate":"शर्त रखना","stock":"स्टॉक","storm":"तूफान","straightforward":"सीधा और सरल","strand":"धागा","strategic":"रणनीतिक","strategy":"रणनीति","strength":"ताकत","strengthen":"मजबूत करना","stress":"तनाव","stretch":"खिंचाव","strike":"हड़ताल","stringent":"सख्त","structural":"संरचनात्मक","structure":"संरचना","struggle":"संघर्ष","studious":"अध्ययनशील","stump":"ठूंठ","stylish":"स्टाइलिश","subcontract":"उप-अनुबंध","subcontractor":"उप-ठेकेदार","subdivision":"उप-विभाजन","subjected":"अधीन किया गया","sublease":"उप-किराया","subscriber":"ग्राहक","subscription":"सदस्यता","subsequent":"आगामी","subsidiary":"सहायक","subsidize":"सब्सिडी देना","subsidy":"सब्सिडी","substance":"पदार्थ","substandard":"घटिया","substantial":"पर्याप्त","substation":"सबस्टेशन","substitute":"स्थानापन्न","substitution":"प्रतिस्थापन","suburb":"उपनगर","suburban":"उपनगरीय","succeed":"सफल होना","succession":"उत्तराधिकार","successive":"लगातार","sudden":"अचानक","sufficient":"पर्याप्त","suffice":"काफी होना","suite":"सूट","sum":"योग","superintendent":"अधीक्षक","superior":"श्रेष्ठ","supervision":"पर्यवेक्षण","supervisor":"पर्यवेक्षक","supplement":"पूरक","supplementary":"अतिरिक्त","surface":"सतह","surplus":"अधिशेष","surveillance":"निगरानी","sustainable":"टिकाऊ","symposium":"संगोष्ठी","sync":"सिंक","synchronize":"समकालिक करना","synergy":"सक्रिय सहयोग","synthetic":"सिंथेटिक","systematic":"व्यवस्थित","tackle":"निपटना","tactical":"रणनीतिक","tag":"टैग","tailored":"अनुकूलित","tank":"टंकी","tariff":"शुल्क दर","tarmac":"टारमैक","tax":"कर","taxation":"कराधान","taxes":"कर","telecom":"दूरसंचार","telecommunication":"दूरसंचार","telephone":"टेलीफोन","temperature":"तापमान","template":"टेम्पलेट","tenant":"किरायेदार","tender":"निविदा","tenure":"कार्यकाल","terminal":"टर्मिनल","termination":"समाप्ति","territory":"क्षेत्र","testament":"प्रमाण","testimonial":"प्रशंसापत्र","theft":"चोरी","theory":"सिद्धांत","thermal":"थर्मल","thermometer":"थर्मामीटर","thermostat":"थर्मोस्टेट","thick":"मोटा","thickness":"मोटाई","thorough":"संपूर्ण","thoroughly":"पूरी तरह से","thousand":"हजार","thousands":"हजारों","threat":"खतरा","threshold":"दहलीज","thrive":"फलना-फूलना","tier":"स्तर","tiered":"स्तरीय","timeframe":"समय सीमा","timestamp":"समय टिकट","tipoff":"गुप्त सूचना","tire":"टायर","tires":"टायर","token":"टोकन","tolerance":"सहनशीलता","toll":"टोल","ton":"टन","tone":"स्वर","topmost":"सर्वोच्च","torrent":"तेज बहाव","totaling":"कुल मिलाकर","tough":"कठिन","tour":"दौरा","towel":"तौलिया","towels":"तौलिए","toxic":"विषाक्त","trace":"निशान","tracker":"ट्रैकर","trademark":"ट्रेडमार्क","traditional":"पारंपरिक","trainee":"प्रशिक्षु","transaction":"लेन-देन","transactions":"लेन-देन","transformative":"परिवर्तनकारी","transit":"पारगमन","transparency":"पारदर्शिता","tray":"ट्रे","treaty":"संधि","trek":"कठिन यात्रा","trend":"रुझान","trends":"रुझान","trial":"परीक्षण","triangle":"त्रिभुज","tribunal":"न्यायाधिकरण","triggering":"शुरू कर रहा है","trim":"छंटाई","triumph":"विजय","trouble":"परेशानी","truck":"ट्रक","trustee":"ट्रस्टी","trustworthy":"विश्वसनीय","tub":"टब","tube":"ट्यूब","turn":"मोड़","turnaround":"वापसी समय","tutorial":"ट्यूटोरियल","twice":"दो बार","unanimous":"सर्वसम्मत","unattended":"लावारिस","unauthorized":"अनधिकृत","unbiased":"निष्पक्ष","unbroken":"अखंड","unbundle":"अलग करना","uncertain":"अनिश्चित","unchanged":"अपरिवर्तित","unconditional":"बिना शर्त","undergo":"गुजरना","underground":"भूमिगत","underlying":"अंतर्निहित","undermine":"कमजोर करना","understandable":"समझने योग्य","undertake":"बीड़ा उठाना","undertaken":"किया गया","undertaking":"उपक्रम","undisputed":"निर्विरोध","undue":"अनुचित","uneasy":"बेचैन","unemployment":"बेरोजगारी","unequal":"असमान","uneven":"असमान","unexpected":"अप्रत्याशित","unfair":"अनुचित","unfold":"प्रकट होना","unforeseen":"अप्रत्याशित","unfortunate":"दुर्भाग्यपूर्ण","unfounded":"निराधार","unfriendly":"अमित्र","uniformity":"एकरूपता","unilateral":"एकतरफा","uninsured":"अबीमित","uninterrupted":"निर्बाध","unique":"अद्वितीय","unlimited":"असीमित","unlocking":"अनलॉक करना","unmatched":"बेजोड़","unnoticed":"अलक्षित","unoccupied":"खाली","unprecedented":"अभूतपूर्व","unpredictable":"अप्रत्याशित","unravel":"सुलझाना","unregulated":"अनियंत्रित","unrelated":"असंबंधित","unreliable":"अविश्वसनीय","unresponsive":"अनुत्तरदायी","unrestricted":"अप्रतिबंधित","unruly":"अनियंत्रित","unsafe":"असुरक्षित","unsatisfactory":"असंतोषजनक","unseen":"अदृश्य","unskilled":"अकुशल","unstable":"अस्थिर","unsuitable":"अनुपयुक्त","untested":"अपरीक्षित","untimely":"असामयिक","untouched":"अछूता","untrue":"झूठा","unused":"अप्रयुक्त","unusual":"असामान्य","unwarranted":"अनुचित","unwelcome":"अवांछित","upbringing":"पालन-पोषण","upcoming":"आगामी","updraft":"उर्ध्वप्रवाह","updateable":"अपडेट करने योग्य","upgrading":"अपग्रेड कर रहे हैं","upheaval":"उथल-पुथल","uphold":"कायम रखना","upload":"अपलोड","uploaded":"अपलोड किया","upper":"ऊपरी","uppermost":"सर्वोच्च","upright":"सीधा","uprising":"विद्रोह","upset":"परेशान","upshot":"निष्कर्ष","upskill":"कौशल बढ़ाएं","upskilling":"कौशल उन्नयन","upsurge":"उछाल","uptake":"स्वीकृति","uptick":"वृद्धि","upto":"तक","upward":"ऊपर की ओर","urgency":"अति-आवश्यकता","usable":"उपयोगी","usage":"उपयोग","usher":"मार्गदर्शन करना","utilitarian":"उपयोगितावादी","utility":"उपयोगिता","utilize":"उपयोग करें","utilized":"उपयोग किया गया","utilizing":"उपयोग कर रहे हैं","vacant":"खाली","vacate":"खाली करना","vacation":"छुट्टी","vacuum":"वैक्यूम","vapor":"वाष्प","variable":"परिवर्तनीय","variation":"विविधता","varied":"विविध","variety":"विविधता","various":"विभिन्न","vary":"भिन्न होना","vast":"विशाल","vector":"वेक्टर","veil":"घूंघट","velocity":"वेग","vendor":"विक्रेता","vendors":"विक्रेता","ventilate":"हवादार बनाना","ventilation":"वेंटिलेशन","venture":"उद्यम","venue":"स्थान","verbal":"मौखिक","versatile":"बहुमुखी","version":"संस्करण","vertical":"लंबवत","vessel":"पात्र","veteran":"अनुभवी","viable":"व्यावहारिक","vibrant":"जीवंत","vibrate":"कंपन करना","vibration":"कंपन","vicinity":"आस-पास","victim":"पीड़ित","victorious":"विजयी","video":"वीडियो","viewpoint":"दृष्टिकोण","vigor":"उत्साह","vigorous":"जोरदार","village":"गांव","villagers":"ग्रामीण","vintage":"पुराना","viral":"वायरल","virtual":"आभासी","virtue":"सद्गुण","visibility":"दृश्यता","vision":"दृष्टि","visitor":"आगंतुक","visitors":"आगंतुक","vital":"महत्वपूर्ण","vivid":"जीवंत","vocal":"मुखर","vocational":"व्यावसायिक","voiceover":"वॉयसओवर","void":"शून्य","volatile":"अस्थिर","volatility":"अस्थिरता","voltage":"वोल्टेज","volunteer":"स्वयंसेवक","volunteering":"स्वयंसेवा","volunteers":"स्वयंसेवक","voter":"मतदाता","voters":"मतदाता","vow":"प्रतिज्ञा","vulnerable":"संवेदनशील","waiver":"छूट","walk":"टहलना","walker":"वॉकर","walkthrough":"मार्गदर्शिका","warehouse":"गोदाम","watch":"देखें","watcher":"निगरानीकर्ता","watchman":"चौकीदार","waterproof":"वॉटरप्रूफ","wave":"लहर","wealth":"धन","weapon":"हथियार","wear":"पहनना","wearable":"पहनने योग्य","wearing":"पहने हुए","weather":"मौसम","web":"वेब","weekday":"सप्ताह का दिन","weight":"वजन","weights":"वजन","welder":"वेल्डर","wellbeing":"कल्याण","wheel":"पहिया","wheels":"पहिए","whereby":"जिसके द्वारा","whichever":"जो कोई भी","whilst":"जबकि","whisper":"फुसफुसाना","whistle":"सीटी","whistleblower":"भेद खोलने वाला","white":"सफेद","whoever":"जो कोई भी","wholesale":"थोक","wholesome":"पौष्टिक","widely":"व्यापक रूप से","widespread":"व्यापक","width":"चौड़ाई","willing":"इच्छुक","win":"जीत","wind":"हवा","wipe":"पोंछना","wisdom":"बुद्धिमत्ता","withstand":"सामना करना","witness":"गवाह","witnessed":"देखा गया","witty":"हाजिरजवाब","wizard":"विज़ार्ड","woman":"महिला","women":"महिलाएं","woodwork":"लकड़ी का काम","workbench":"कार्यक्षेत्र","workday":"कार्यदिवस","workload":"कार्यभार","workman":"कारीगर","workmanship":"कारीगरी","workstation":"वर्कस्टेशन","worthy":"योग्य","wrist":"कलाई","wrong":"गलत","wrongful":"अनुचित","yard":"आंगन","youth":"युवा","zeal":"उत्साह","zip":"ज़िप","zipper":"ज़िपर","designed":"डिज़ाइन किया गया","detected":"पहचाना गया","devendra":"देवेंद्र","diagnostics":"निदान","dignity":"गरिमा","disbursed":"संवितरित","disbursement":"संवितरण","discover":"खोजें","discrepancy":"विसंगति","docs":"दस्तावेज़","document":"दस्तावेज़","dog":"कुत्ता","doing":"कर रहे हैं","door":"दरवाजा","drainage":"जल निकासी","each":"प्रत्येक","ease":"आसानी","effortless":"सहज","elder":"बुजुर्ग","elected":"निर्वाचित","emergencies":"आपात स्थिति","en":"अंग्रेजी","english":"अंग्रेजी","enroll":"नामांकन करें","ensure":"सुनिश्चित करें","establish":"स्थापित करें","exactly":"बिल्कुल","exhibition":"प्रदर्शनी","explicitly":"स्पष्ट रूप से","fabrication":"निर्माण","facilitates":"सुगम बनाता है","fairly":"निष्पक्ष रूप से","favorite":"पसंदीदा","fill":"भरें","finally":"अंत में","finance":"वित्त","finder":"खोजकर्ता","fitters":"फिटर","fixes":"मरम्मत","floors":"फर्श","flourishing":"समृद्ध","following":"निम्नलिखित","forgot":"भूल गए","founded":"स्थापित","founder":"संस्थापक","frequency":"आवृत्ति","friendly":"अनुकूल","from":"से","fulfilled":"पूरा किया गया","fumigation":"धूनी देना","funded":"वित्तपोषित","gadget":"गैजेट","gh":"जीएच","golden":"सुनहरा","got":"प्राप्त किया","govt":"सरकार","gp":"जीपी","grants":"अनुदान","greener":"अधिक हरा-भरा","grooming":"सजावट","grouped":"समूहीकृत","gstin":"जीएसटीआईएन","guarding":"सुरक्षा करना","guesswork":"अटकलबाजी","guest":"अतिथि","guild":"गिल्ड","hauz":"हौज","hazardous":"खतरनाक","hidden":"छिपा हुआ","highly":"अत्यधिक","hills":"पहाड़ियां","hospitality":"आतिथ्य सत्कार","hq":"मुख्यालय","hubs":"हब","hustle":"मेहनत","hvac":"एचवीएसी","ig":"आईजी","incur":"खर्च वहन करना","independence":"स्वतंत्रता","independent":"स्वतंत्र","indiranagar":"इंदिरानगर","injuries":"चोटें","instruments":"उपकरण","interest":"ब्याज","intervention":"हस्तक्षेप","involved":"शामिल","iyer":"अय्यर","jayanagar":"जयनगर","joshi":"जोशी","jpg":"जेपीजी","jubilee":"जयंती","kabir":"कबीर","kapoor":"कपूर","karan":"करण","kb":"केबी","khan":"खान","khas":"खास","kol":"कोल","kothrud":"कोथरुड","kulkarni":"कुलकर्णी","like":"पसंद","lineage":"वंशावली","lined":"पंक्तिबद्ध","linkage":"संबंध","lodge":"दर्ज करें","longer":"अधिक लंबा","lowest":"न्यूनतम","maid":"घरेलू सहायिका","man":"व्यक्ति","many":"कई","markup":"मार्कअप","matrix":"मैट्रिक्स","mb":"एमबी","men":"पुरुष","mentorship":"मार्गदर्शन","mishap":"दुर्घटना","moscow":"मास्को","much":"बहुत","namely":"अर्थात्","navigator":"नेविगेटर","nearest":"निकटतम","neatly":"सफाई से","neon":"नियॉन","neutrality":"तटस्थता","nights":"रातें","non":"गैर","notch":"दर्जा","noticed":"देखा गया","notices":"सूचनाएं","numerous":"अनेक","occur":"घटित होना","office":"कार्यालय","once":"एक बार","opaque":"अपारदर्शी","operates":"संचालित करता है","opinion":"राय","oppose":"विरोध करना","ordered":"ऑर्डर किया","ordinarily":"आमतौर पर","org":"संगठन","otherwise":"अन्यथा","outreach":"पहुंच","outside":"बाहर","overall":"कुल मिलाकर","participants":"प्रतिभागी","pattern":"पैटर्न","peer":"सहकर्मी","penalties":"जुर्माने","people":"लोग","picture":"तस्वीर","plaza":"प्लाजा","predicted":"पूर्वानुमानित","premise":"परिसर","radiator":"रेडिएटर","raj":"राज","rakesh":"राकेश","ram":"राम","world":"दुनिया","kumar":"कुमार","kunal":"कुणाल","kyc":"केवाईसी","labor":"श्रम","lake":"लेक","lifestyle":"जीवन शैली","lifting":"उठाना","little":"छोटा","locally":"स्थानीय रूप से","logistics":"लॉजिस्टिक्स","looking":"तलाश कर रहे हैं","love":"पसंद","loved":"पसंदीदा","loves":"पसंद करता है","machinery":"मशीनरी","made":"बनाया गया","makeup":"मेकअप","malhotra":"मल्होत्रा","malls":"मॉल","manage":"प्रबंधित करें","manually":"मैन्युअल रूप से","margins":"मार्जिन","massages":"मालिश","matcher":"मैचर","mediated":"मध्यस्थता की","meera":"मीरा","meet":"मिलें","mehta":"मेहता","mentoring":"मार्गदर्शन","messy":"अस्त-व्यस्त","metropolitan":"महानगरीय","mind":"मन","misconduct":"दुराचार","modest":"मामूली","monopolization":"एकाधिकार","moved":"स्थानांतरित","musical":"संगीत","mutually":"आपसी रूप से","naina":"नैना","nair":"नायर","ncr":"एनसीआर","never":"कभी नहीं","nk":"एनके","ones":"वाले","operating":"संचालन","optimization":"अनुकूलन","optional":"वैकल्पिक","organising":"आयोजन","otp":"ओटीपी","outline":"रूपरेखा","oversee":"निगरानी करना","own":"अपना","packaged":"पैक किया गया","parcel":"पार्सल","parents":"माता-पिता","party":"पार्टी","path":"मार्ग","pdf":"पीडीएफ","peace":"शांति","peers":"सहकर्मी","pets":"पालतू जानवर","picks":"चुनता है","pitch":"पिच","pk":"पीके","plant":"पौधा","platforms":"मंच","png":"पीएनजी","polite":"विनम्र","pooja":"पूजा","pre":"पूर्व","prep":"तैयारी","print":"प्रिंट","priya":"प्रिया","profiling":"प्रोफ़ाइलिंग","proof":"सबूत","provides":"प्रदान करता है","pumps":"पंप","put":"रखें","qualifications":"योग्यताएं","quoted":"उद्धृत","ramesh":"रमेश","re":"पुनः","reallocations":"संसाधन साझाकरण","rebalance":"पुनर्संतुलन","rebalancing":"पुनर्संतुलन","recovery":"पुनर्प्राप्ति","recurrence":"पुनरावृत्ति","recurring":"आवर्ती","reddy":"रेड्डी","ref":"संदर्भ","refrigeration":"प्रशीतन","reg":"पंजीकरण","regional":"क्षेत्रीय","replies":"जवाब","req":"आवश्यकता","resorts":"रिसॉर्ट्स","respectful":"सम्मानजनक","respects":"सम्मान","restaurant":"रेस्तरां","restored":"पुनर्स्थापित","restructure":"पुनर्गठित करना","resubmit":"पुनः सबमिट करें","retailers":"खुदरा विक्रेता","retainer":"प्रतिधारक","rewards":"इनाम","ro":"आरओ (वाटर प्यूरीफायर)","satisfy":"संतुष्ट करना","scam":"घोटाला","sectors":"क्षेत्र","seeking":"तलाश रहे हैं","seniority":"वरिष्ठता","sensors":"सेंसर","sentiments":"भावनाएं","shareholders":"शेयरधारक","sharma":"शर्मा","sharmaji":"शर्माजी","sheets":"चादरें","shipped":"भेजा गया","signatures":"हस्ताक्षर","simplified":"सरलीकृत","singh":"सिंह","sites":"साइट्स","specialties":"विशिष्टताएं","specs":"विवरण (स्पेक्स)","spill":"छलकना","sprint":"स्प्रिंट","src":"स्रोत","stages":"चरण","stamps":"मुहरें","startups":"स्टार्टअप","stats":"आंकड़े","statuses":"स्थितियां","stocks":"स्टॉक","str":"स्ट्रिंग","streamlining":"सुव्यवस्थित करना","suites":"सूट","sunita":"सुनीता","super":"शानदार","tagline":"टैगलाइन","tags":"टैग","tailoring":"सिलाई","technologies":"प्रौद्योगिकियां","temp":"अस्थायी","tenants":"किरायेदार","tenders":"निविदाएं","testing":"परीक्षण","th":"वां","themes":"थीम","therapies":"थेरेपी","throughput":"थ्रूपुट","tidy":"साफ-सुथरा","titled":"शीर्षक","toggle":"टॉगल","tokenization":"टोकनाइजेशन","toolkits":"टूलकिट","trackers":"ट्रैकर","traders":"व्यापारी","transact":"लेनदेन करना","transitioning":"संक्रमण","translating":"अनुवाद कर रहे हैं","tutorials":"ट्यूटोरियल","tweaks":"सुधार","undefined":"अपरिभाषित","unregistered":"अपंजीकृत","up":"ऊपर","uptime":"अपटाइम","utf":"यूटीएफ","validates":"सत्यापित करता है","var":"वेरिएबल","variance":"भिन्नता","varma":"वर्मा","ventures":"उद्यम","vikram":"विक्रम","visas":"वीज़ा","vitality":"जीवंतता","warns":"चेतावनी देता है","waste":"अपशिष्ट","waterproofed":"वॉटरप्रूफ किया गया","weren":"नहीं थे","widths":"चौड़ाई","withdrawals":"निकासी","woodworking":"काष्ठकला","workspaces":"कार्यक्षेत्र","yesterdays":"बीते कल","retirement":"सेवानिवृत्ति","retriever":"रिट्रीवर","rohan":"रोहन","rosters":"रोस्टर","rotation":"रोटेशन","roy":"रॉय","run":"चलाएं","safeguards":"सुरक्षा उपाय","safely":"सुरक्षित रूप से","sathi":"साथी","schedules":"अनुसूचियां","scheme":"योजना","schemes":"योजनाएं","scholastic":"शैक्षणिक","science":"विज्ञान","scoring":"स्कोरिंग","scratch":"शुरुआत","seasonal":"मौसमी","sells":"बेचता है","sen":"सेन","serving":"सेवा प्रदान कर रहे हैं","shah":"शाह","shifts":"पालियां","sitting":"बैठक","sneha":"स्नेहा","solved":"हल किया गया","speaks":"बोलता है","specialization":"विशेषज्ञता","specialized":"विशेषज्ञ","spending":"खर्च","sr":"वरिष्ठ","ssc":"एसएससी","staffing":"कर्मचारी नियोजन","staging":"मंचन","stays":"रहता है","stem":"स्टेम","structured":"संरचित","styling":"स्टाइलिंग","stylist":"स्टाइलिस्ट","subhashish":"शुभाशीष","subtotal":"उप-योग","such":"ऐसे","sundaram":"सुंदरम","supporting":"सहायक","surge":"उछाल","surprises":"आश्चर्य","syndicates":"सिंडिकेट्स","tamper":"छेड़छाड़","teams":"टीमें","templates":"टेम्पलेट्स","terrace":"छत","therapeutic":"चिकित्सीय","tooling":"टूलिंग","trainers":"प्रशिक्षक","transformed":"रूपांतरित","travel":"यात्रा","troubles":"परेशानियां","undergoes":"गुजरता है","underpayment":"कम भुगतान","understands":"समझता है","urban":"शहरी","verifies":"सत्यापित करता है","verma":"वर्मा","vetted":"जाँचा-परखा हुआ","vikramaditya":"विक्रमादित्य","walking":"टहलना","walks":"टहलता है","wardrobe":"अलमारी (वॉर्डरोब)","wardrobes":"अलमारियां","warm":"गर्म","washers":"वॉशर","weighted":"भारित","welding":"वेल्डिंग","wheeler":"पहिया वाहन","whether":"चाहे","worksite":"कार्यस्थल"},
    bn: {"aadhaar":"আধার","aarav":"আরভ","about":"সম্পর্কে","above":"উপরে","ac":"এসি","academic":"একাডেমিক","accelerates":"ত্বরান্বিত করে","accept":"গ্রহণ করুন","acceptable":"গ্রহণযোগ্য","acceptance":"গ্রহণ","accepted":"গৃহীত","accepting":"গ্রহণ করছে","access":"অ্যাক্সেস","accident":"দুর্ঘটনা","according":"অনুসারে","account":"অ্যাকাউন্ট","accounted":"হিসাবকৃত","accounts":"অ্যাকাউন্টগুলি","across":"জুড়ে","action":"পদক্ষেপ","actions":"পদক্ষেপগুলি","active":"সক্রিয়","activity":"কার্যকলাপ","actual":"প্রকৃত","add":"যোগ করুন","added":"যুক্ত করা হয়েছে","addition":"সংযোজন","additional":"অতিরিক্ত","address":"ঠিকানা","adjust":"সমন্বয় করুন","adjusted":"সমন্বিত","adjustment":"সমন্বয়","adjustments":"সমন্বয়সমূহ","admin":"অ্যাডমিন","administration":"প্রশাসন","advanced":"উন্নত","advice":"পরামর্শ","advisor":"পরামর্শক","adyar":"আদিয়ার","after":"পরে","afternoon":"বিকেল","again":"আবার","against":"বিরুদ্ধে","age":"বয়স","agent":"এজেন্ট","agents":"এজেন্টরা","ago":"আগে","agree":"একমত","agreed":"সম্মত","agreement":"চুক্তি","agreements":"চুক্তিগুলি","ahmedabad":"আহমেদাবাদ","ai":"এআই","air":"বাতাস","alert":"সতর্কতা","alerts":"সতর্কবার্তা","algorithmic":"অ্যালগরিদমিক","alignment":"সারিবদ্ধকরণ","all":"সমস্ত","allocate":"বরাদ্দ করুন","allocated":"বরাদ্দকৃত","allocation":"বরাদ্দ","allocations":"বরাদ্দসমূহ","allow":"অনুমতি দিন","allowance":"ভাতা","allowed":"অনুমোদিত","allowing":"অনুমতি দিয়ে","almost":"প্রায়","alone":"একা","along":"সাথে","already":"ইতিমধ্যেই","alright":"সব ঠিক","also":"ও","alt":"বিকল্প","alternative":"বিকল্প","alternatives":"বিকল্পসমূহ","always":"সর্বদা","am":"সকাল","amazing":"অসাধারণ","amount":"পরিমাণ","amounts":"পরিমাণসমূহ","amp":"&","an":"একটি","analytics":"অ্যানালিটিক্স","analyzing":"বিশ্লেষণ করছে","ananya":"অনন্যা","and":"এবং","angle":"কোণ","annual":"বার্ষিক","annually":"প্রতি বছর","another":"অন্য একটি","answer":"উত্তর","anti":"বিরোধী","any":"যেকোনো","anyone":"যে কেউ","anything":"কিছুই","anywhere":"যেকোনো স্থানে","app":"অ্যাপ","appliance":"যন্ত্রপাতি","appliances":"হোম অ্যাপ্লায়েন্সেস","applicable":"প্রযোজ্য","applicant":"আবেদনকারী","applicants":"আবেদনকারীরা","application":"আবেদন","applications":"আবেদনসমূহ","applied":"প্রয়োগকৃত","applies":"প্রযোজ্য হয়","apply":"প্রয়োগ","applying":"প্রয়োগ করছে","appointment":"অ্যাপয়েন্টমেন্ট","appointments":"অ্যাপয়েন্টমেন্টগুলি","approval":"অনুমোদন","approve":"অনুমোদন করুন","approved":"অনুমোদিত","approx":"প্রায়","approximate":"আনুমানিক","april":"এপ্রিল","area":"এলাকা","areas":"এলাকাসমূহ","around":"চারপাশে","arrival":"পৌঁছানো","arrive":"পৌঁছানো","arrived":"পৌঁছে গেছে","as":"মতো","ashok":"অশোক","ask":"জিজ্ঞাসা করুন","asked":"জিজ্ঞাসা করেছে","asking":"জিজ্ঞাসা করছে","assigned":"নিযুক্ত","assignment":"অ্যাসাইনমেন্ট","assistance":"সহায়তা","assistant":"সহকারী","assisted":"সহায়তাপ্রাপ্ত","associates":"সহযোগী","assurance":"নিশ্চয়তা","at":"এ","auger":"অগার","august":"আগস্ট","auth":"অথেন্টিকেশন","authentic":"খাঁটি","authenticate":"যাচাই করুন","authenticated":"যাচাইকৃত","authentication":"যাচাইকরণ","auto":"অটো","automatic":"স্বয়ংক্রিয়","automatically":"স্বয়ংক্রিয়ভাবে","available":"উপলব্ধ","availability":"উপলব্ধতা","avenue":"অ্যাভিনিউ","average":"গড়","avg":"গড়","avoid":"এড়িয়ে চলুন","award":"পুরস্কার","aware":"সচেতন","away":"দূরে","back":"ফিরে","backend":"ব্যাকএন্ড","backup":"ব্যাকআপ","badge":"ব্যাজ","balance":"ব্যালেন্স","balcony":"বারান্দা","ban":"নিষিদ্ধকরণ","banned":"নিষিদ্ধ","bangalore":"ব্যাঙ্গালোর","bangla":"বাংলা","bank":"ব্যাংক","banking":"ব্যাংকিং","banner":"ব্যানার","bansal":"বনশল","bapi":"বাপী","bar":"বার","bargain":"দরদাম","bargaining":"দরকষাকষি","base":"ভিত্তি","basic":"প্রাথমিক","basis":"ভিত্তি","bath":"বাথরুম","bathroom":"স্নানাগার","be":"হওয়া","beauty":"সৌন্দর্য","because":"কারণ","become":"হয়ে উঠুন","been":"হয়েছে","before":"আগে","behind":"পেছনে","being":"হওয়ার কারণে","below":"নিচে","benchmark":"মানদণ্ড","benefit":"সুবিধা","benefits":"সুবিধাসমূহ","bengaluru":"বেঙ্গালুরু","bengali":"বাঙালি","best":"সেরা","better":"আরও ভালো","between":"মাঝখানে","beyond":"বাইরে","big":"বড়","bill":"বিল","billing":"বিলিং","biz":"ব্যবসা","block":"ব্লক","blocked":"ব্লক করা হয়েছে","board":"বোর্ড","body":"মূল অংশ","bolt":"বোল্ট","bonus":"বোনাস","book":"বুক করুন","booked":"বুক করা হয়েছে","booking":"বুকিং","bookings":"বুকিংসমূহ","borrow":"ধার নিন","borrowed":"ধার নেওয়া হয়েছে","both":"উভয়","box":"বাক্স","brand":"ব্র্যান্ড","breakdown":"বিস্তারিত বিভাজন","brick":"ইট","bridge":"সেতু","brigade":"ব্রিগেড","brilliant":"অসাধারণ","bring":"নিয়ে আসুন","broad":"বিস্তৃত","browse":"ব্রাউজ করুন","brush":"ব্রাশ","bubble":"বাবল","budget":"বাজেট","build":"তৈরি করুন","building":"ভবন","built":"নির্মিত","business":"ব্যবসায়িক","businesses":"ব্যবসা প্রতিষ্ঠানসমূহ","busy":"ব্যস্ত","but":"কিন্তু","button":"বোতাম","by":"দ্বারা","cable":"তার","calculator":"ক্যালকুলেটর","calendar":"ক্যালেন্ডার","call":"কল করুন","called":"কল করেছে","calling":"কল করছে","calls":"কলসমূহ","can":"পারেন","cancel":"বাতিল করুন","cancelled":"বাতিলকৃত","cancelling":"বাতিল করছে","candidate":"প্রার্থী","candidates":"প্রার্থীরা","capacity":"ক্ষমতা","car":"গাড়ি","card":"কার্ড","cards":"কার্ডগুলি","care":"যত্ন","caregiver":"সেবিকা","career":"ক্যারিয়ার","carpenter":"ছুতার","carpenters":"ছুতাররা","carpentry":"কাঠের কাজ","case":"কেস","cases":"কেসগুলি","cash":"নগদ টাকা","catalog":"ক্যাটালগ","categories":"ক্যাটাগরিসমূহ","category":"বিভাগ","cause":"কারণ","cbse":"সিবিএসই","center":"কেন্দ্র","central":"কেন্দ্রীয়","centre":"কেন্দ্র","certificate":"সার্টিফিকেট","certificates":"সার্টিফিকেটসমূহ","certification":"সনদায়ন","certified":"প্রত্যয়িত","chain":"শৃঙ্খল","chair":"চেয়ার","champion":"চ্যাম্পিয়ন","chance":"সুযোগ","change":"পরিবর্তন করুন","changed":"পরিবর্তিত","changes":"পরিবর্তনসমূহ","changing":"পরিবর্তন করছে","channel":"চ্যানেল","channels":"চ্যানেলসমূহ","charge":"চার্জ","charged":"চার্জ করা হয়েছে","charges":"চার্জসমূহ","chart":"চার্ট","chat":"চ্যাট","chats":"চ্যাটসমূহ","chatted":"চ্যাট করেছে","chatting":"চ্যাট করছে","check":"পরীক্ষা করুন","checked":"পরীক্ষিত","checking":"যাচাই করছে","checkout":"চেকআউট","checks":"পরীক্ষাসমূহ","chennai":"চেন্নাই","chips":"চিপস","choice":"পছন্দ","choose":"বেছে নিন","choosing":"বেছে নিচ্ছে","chosen":"নির্বাচিত","city":"শহর","cities":"শহরসমূহ","claim":"দাবি","claims":"দাবিসমূহ","class":"শ্রেণী","classes":"ক্লাসসমূহ","clean":"পরিষ্কার","cleaner":"ক্লিনার","cleaners":"ক্লিনাররা","cleaning":"পরিষ্কার-পরিচ্ছন্নতা","clear":"পরিষ্কার","click":"ক্লিক করুন","client":"গ্রাহক","clients":"গ্রাহকবৃন্দ","close":"বন্ধ করুন","closed":"বন্ধ","closing":"সমাপ্তি","coach":"প্রশিক্ষক","coaching":"কোচিং","code":"কোড","collective":"সম্মিলিত","commercial":"বাণিজ্যিক","commission":"কমিশন","commissions":"কমিশনসমূহ","community":"সম্প্রদায়","company":"কোম্পানি","compare":"তুলনা করুন","compared":"তুলনা করা হয়েছে","complete":"সম্পূর্ণ করুন","completed":"সম্পন্ন","completes":"সম্পূর্ণ করে","completing":"সম্পূর্ণ করছে","completion":"সমাপ্তি","condition":"শর্ত","conditions":"শর্তাবলী","conduct":"আচরণ","confirm":"নিশ্চিত করুন","confirmation":"নিশ্চিতকরণ","confirmed":"নিশ্চিতকৃত","connect":"যুক্ত হোন","contact":"যোগাযোগ","contract":"চুক্তি","contracts":"চুক্তিসমূহ","cooperative":"সমবায়","copper":"তামা","corporate":"কর্পোরেট","cost":"খরচ","costs":"খরচসমূহ","could":"পারতেন","count":"গণনা","counter":"পাল্টা অফার","country":"দেশ","courier":"কুরিয়ার","create":"তৈরি করুন","created":"তৈরি করা হয়েছে","creating":"তৈরি করছে","credit":"ক্রেডিট","crew":"ক্রু","current":"বর্তমান","custom":"কাস্টম","customer":"গ্রাহক","customers":"গ্রাহকগণ","cutter":"কাটার","daily":"দৈনিক","damage":"ক্ষতি","damp":"স্যাঁতসেঁতে","dashboard":"ড্যাশবোর্ড","data":"তথ্য","date":"তারিখ","dates":"তারিখসমূহ","day":"দিন","days":"দিনসমূহ","debit":"ডেবিট","december":"ডিসেম্বর","decline":"প্রত্যাখ্যান করুন","declined":"প্রত্যাখ্যাত","deep":"গভীর","delay":"বিলম্ব","delayed":"বিলম্বিত","delete":"মুছে ফেলুন","deleted":"মুছে ফেলা হয়েছে","delhi":"দিল্লি","delivery":"ডেলিভারি","demanded":"দাবি করা হয়েছে","democratic":"গণতান্ত্রিক","democratically":"গণতান্ত্রিকভাবে","department":"বিভাগ","deployment":"নিয়োগ","deployments":"মোতায়েনসমূহ","deposit":"জমা করুন","deposited":"জমাকৃত","describe":"বর্ণনা করুন","description":"বর্ণনা","desired":"কাঙ্ক্ষিত","detail":"বিস্তারিত","detailed":"বিস্তারিত","detailing":"ডিটেইলিং","details":"বিবরণ","device":"ডিভাইস","devices":"ডিভাইসসমূহ","diagnose":"রোগনির্ণয়","diagnosis":"রোগনির্ণয়","digital":"ডিজিটাল","digit":"অঙ্ক","digits":"সংখ্যা","direct":"সরাসরি","direction":"দিক","directly":"সরাসরি","director":"পরিচালক","directory":"ডিরেক্টরি","dismiss":"বাতিল করুন","dismissed":"বাতিলকৃত","dispute":"বিরোধ","disputes":"বিরোধসমূহ","distribution":"বণ্টন","district":"জেলা","dividend":"লভ্যাংশ","dividends":"লভ্যাংশসমূহ","do":"করুন","does":"করে","done":"সম্পন্ন","doorstep":"দরজায়","draft":"খসড়া","drain":"ড্রেন","drawer":"ড্রয়ার","drill":"ড্রিল","drilling":"ড্রিলিং","drills":"ড্রিলসমূহ","driver":"ড্রাইভার","drivers":"চালকরা","due":"বকেয়া","during":"চলাকালীন","earlier":"আগে","early":"তাড়াতাড়ি","earn":"উপার্জন করুন","earned":"উপার্জিত","earning":"উপার্জন","earnings":"উপার্জনসমূহ","east":"পূর্ব","eco":"ইকো","edit":"সম্পাদনা করুন","edited":"সম্পাদিত","editing":"সম্পাদনা করছে","electrician":"ইলেকট্রিশিয়ান","electricians":"ইলেকট্রিশিয়ানরা","electrical":"বৈদ্যুতিক","elevator":"লিফট","eligible":"যোগ্য","email":"ইমেল","emergency":"জরুরি","effortlessly":"সহজে","employ":"নিয়োগ দিন","employee":"কর্মচারী","employer":"নিয়োগকর্তা","enforce":"কার্যকর করুন","enforcement":"প্রয়োগ","engaged":"যুক্ত","engine":"ইঞ্জিন","engineer":"প্রকৌশলী","enhance":"উন্নত করুন","enhanced":"উন্নতকৃত","enter":"প্রবেশ করান","enterprise":"এন্টারপ্রাইজ","enterprises":"এন্টারপ্রাইজসমূহ","equipment":"সরঞ্জাম","equity":"ইক্যুইটি","errand":"ফরমাস","errands":"দৈনন্দিন কাজসমূহ","error":"ত্রুটি","escrow":"এসক্রো","escrowed":"এসক্রোতে রক্ষিত","estimate":"অনুমান","estimated":"আনুমানিক","evening":"সন্ধ্যা","event":"ইভেন্ট","events":"ইভেন্টস","every":"প্রতিটি","everybody":"সবাই","everyday":"প্রতিদিনের","everyone":"সবাই","everything":"সবকিছু","everywhere":"সর্বত্র","exact":"সঠিক","examine":"পরীক্ষা করুন","excellent":"চমৎকার","exclusive":"একচেটিয়া","expanded":"প্রসারিত","expense":"ব্যয়","experience":"অভিজ্ঞতা","experienced":"অভিজ্ঞ","expert":"বিশেষজ্ঞ","expertise":"দক্ষতা","experts":"বিশেষজ্ঞবৃন্দ","expire":"মেয়াদ শেষ","expired":"মেয়াদোত্তীর্ণ","explicit":"সুনির্দিষ্ট","explore":"অন্বেষণ করুন","exterior":"বাইরের","extra":"অতিরিক্ত","extract":"বের করুন","exterminator":"কীটনাশক বিশেষজ্ঞ","failed":"ব্যর্থ","fair":"ন্যায্য","fan":"পাখা","faq":"সাধারণ প্রশ্নোত্তর","fast":"দ্রুত","faster":"আরও দ্রুত","fastest":"সবচেয়ে দ্রুত","faucet":"কল","february":"ফেব্রুয়ারি","fee":"ফি","fees":"ফিসমূহ","field":"ক্ষেত্র","file":"ফাইল","filed":"দায়েরকৃত","filter":"ফিল্টার","filtered":"ফিল্টারকৃত","final":"চূড়ান্ত","finalize":"চূড়ান্ত করুন","finalized":"চূড়ান্তকৃত","financial":"আর্থিক","find":"খুঁজুন","finding":"অনুসন্ধান","fine":"ভালো","finish":"শেষ করুন","finished":"সমাপ্ত","firm":"ফার্ম","first":"প্রথম","fit":"উপযুক্ত","fitness":"ফিটনেস","fix":"মেরামত করুন","fixed":"মেরামতকৃত","fixing":"মেরামত","flag":"পতাকা","flagged":"চিহ্নিত করা হয়েছে","flexible":"নমনীয়","floor":"মেঝে","flooring":"মেঝের কাজ","fluke":"ফ্লুক","follow":"অনুসরণ করুন","for":"জন্য","form":"ফর্ম","format":"ফরম্যাট","formed":"গঠিত","forward":"সামনে","found":"পাওয়া গেছে","free":"বিনামূল্যে","friday":"শুক্রবার","friend":"বন্ধু","fridge":"ফ্রিজ","frontline":"সম্মুখসারির","full":"সম্পূর্ণ","fund":"তহবিল","funds":"তহবিলসমূহ","furniture":"আসবাবপত্র","future":"ভবিষ্যত","gain":"লাভ","garage":"গ্যারেজ","garden":"বাগান","gardener":"মালী","gardening":"বাগান পরিচর্যা","gate":"গেট","general":"সাধারণ","generate":"তৈরি করুন","generated":"উৎপন্ন","gentle":"মৃদু","get":"পান","geyser":"গিজার","gig":"গিগ","gigs":"গিগসমূহ","girl":"মেয়ে","give":"দিন","given":"দেওয়া হয়েছে","glass":"কাচ","global":"বিশ্বব্যাপী","globe":"গ্লোব","gloves":"দস্তানা","goggles":"গগলস","good":"ভালো","google":"গুগল","governance":"প্রশাসন","governed":"পরিচালিত","grade":"গ্রেড","grades":"গ্রেডসমূহ","grand":"গ্র্যান্ড","great":"দারুণ","green":"সবুজ","grievance":"অভিযোগ","grievances":"অভিযোগসমূহ","grinder":"গ্রাইন্ডার","group":"গ্রুপ","groups":"গ্রুপসমূহ","grow":"বৃদ্ধি পান","growing":"বৃদ্ধি পাচ্ছে","guarantee":"গ্যারান্টি","guaranteed":"নিশ্চিত","guard":"গার্ড","guidelines":"নির্দেশিকা","gun":"গান","gurgaon":"গুরগাঁও","gurugram":"গুরুগ্রাম","half":"অর্ধেক","hammer":"হ্যামার","handle":"পরিচালনা করুন","handled":"পরিচালিত","handling":"পরিচালনা","handyman":"কারিগর","happy":"খুশি","hard":"কঠিন","hardware":"হার্ডওয়্যার","harness":"হার্নেস","has":"আছে","have":"আছে","having":"থাকার কারণে","he":"সে","health":"স্বাস্থ্য","healthy":"সুস্থ","hear":"শুনুন","heard":"শুনেছি","heat":"তাপ","heater":"হিটার","heavy":"ভারী","held":"রক্ষিত","hello":"নমস্কার","help":"সাহায্য","helped":"সাহায্য করেছে","helper":"সহকারী","helpers":"সহকারীরা","her":"তার","herbal":"ভেষজ","here":"এখানে","heritage":"ঐতিহ্য","hey":"নমস্কার","hide":"লুকান","high":"উচ্চ","highest":"সর্বোচ্চ","hindi":"হিন্দি","hire":"ভাড়া করুন","hired":"ভাড়া করা হয়েছে","history":"ইতিহাস","hold":"ধরে রাখুন","holding":"ধরে রাখছে","home":"বাড়ি","homes":"বাড়িগুলি","honest":"সৎ","hotel":"হোটেল","hotels":"হোটেলসমূহ","hour":"ঘণ্টা","hourly":"প্রতি ঘণ্টায়","hours":"ঘণ্টাসমূহ","house":"বাড়ি","how":"কীভাবে","hr":"ঘণ্টা","hrs":"ঘণ্টা","hsr":"এইচএসআর","hub":"হাব","hyderabad":"হায়দ্রাবাদ","i":"আমি","icse":"আইসিএসই","id":"আইডি","ideal":"আদর্শ","identification":"শনাক্তকরণ","identify":"শনাক্ত করুন","identity":"পরিচয়","idle":"নিষ্ক্রিয়","if":"যদি","immediate":"তাত্ক্ষণিক","immediately":"তাত্ক্ষণিকভাবে","important":"গুরুত্বপূর্ণ","improved":"উন্নত হয়েছে","improvement":"উন্নতি","in":"এ","inactive":"নিষ্ক্রিয়","inappropriate":"অনুপযুক্ত","include":"অন্তর্ভুক্ত করুন","included":"অন্তর্ভুক্ত","includes":"অন্তর্ভুক্ত করে","income":"আয়","incomplete":"অসম্পূর্ণ","indegree":"ইন-ডিগ্রি","index":"সূচক","india":"ভারত","indian":"ভারতীয়","indic":"ভারতীয়","individual":"ব্যক্তিগত","indoor":"ইনডোর","industrial":"শিল্প","info":"তথ্য","information":"তথ্য","infrastructure":"অবকাঠামো","inquiry":"অনুসন্ধান","inside":"ভিতরে","insight":"অন্তর্দৃষ্টি","insights":"অন্তর্দৃষ্টিসমূহ","inspect":"পরিদর্শন করুন","inspecting":"পরিদর্শন করছে","inspection":"পরিদর্শন","install":"ইনস্টল করুন","installation":"ইনস্টলেশন","installed":"ইনস্টলকৃত","instant":"তাত্ক্ষণিক","instantly":"তাত্ক্ষণিকভাবে","instead":"পরিবর্তে","instruct":"নির্দেশ দিন","instruction":"নির্দেশনা","instructions":"নির্দেশাবলী","instrument":"যন্ত্র","insurance":"বীমা","insured":"বীমাকৃত","integrated":"একীভূত","intelligence":"বুদ্ধিমত্তা","intend":"উদ্দেশ্য করা","interested":"আগ্রহী","interim":"অন্তর্বর্তী","interior":"অভ্যন্তরীণ","internal":"অভ্যন্তরীণ","international":"আন্তর্জাতিক","interview":"সাক্ষাৎকার","into":"মধ্যে","introduce":"পরিচয় দিন","introduction":"ভূমিকা","investigate":"তদন্ত করুন","investigating":"তদন্তাধীন","investigation":"তদন্ত","investment":"বিনিয়োগ","invoice":"চালান","invoices":"চালানসমূহ","invoicing":"ইনভয়েসিং","is":"হয়","issue":"সমস্যা","issued":"জারি করা হয়েছে","issues":"সমস্যাসমূহ","it":"এটি","item":"আইটেম","items":"আইটেমসমূহ","its":"এর","itself":"নিজেই","jaipur":"জয়পুর","jan":"জানুয়ারি","january":"জানুয়ারি","job":"কাজ","jobs":"কাজ","join":"যোগ দিন","joined":"যুক্ত হয়েছেন","joining":"যুক্ত হওয়া","jul":"জুলাই","july":"জুলাই","jun":"জুন","june":"জুন","junior":"জুনিয়র","just":"শুধু","keep":"রাখুন","kept":"রেখেছেন","key":"চাবি","keyboard":"কীবোর্ড","keys":"চাবিগুলি","kitchen":"রান্নাঘর","kitchens":"রান্নাঘরগুলি","know":"জানুন","knowledge":"জ্ঞান","known":"পরিচিত","kolkata":"কলকাতা","koramangala":"কোরামঙ্গলা","label":"লেবেল","labels":"লেবেলসমূহ","ladder":"মই","ladders":"মইসমূহ","lakh":"লাখ","lakhs":"লাখ","landscaping":"ল্যান্ডস্কেপিং","language":"ভাষা","languages":"ভাষাসমূহ","lanyard":"ল্যানিয়ার্ড","large":"বড়","last":"শেষ","late":"দেরি","latest":"সর্বশেষ","law":"আইন","layout":"লেআউট","lead":"লিড","leader":"নেতা","leadership":"নেতৃত্ব","leads":"লিডস","leak":"লিক","leakage":"লিক হওয়া","leaking":"লিক করছে","leaks":"লিকসমূহ","learn":"শিখুন","learning":"শেখা","lease":"লিজ","least":"কমপক্ষে","ledger":"লেজার","left":"বাম","legal":"আইনি","lend":"ধার দিন","lending":"ধার দেওয়া","less":"কম","lesson":"পাঠ","lessons":"পাঠসমূহ","let":"দিন","level":"স্তর","levels":"স্তরসমূহ","license":"লাইসেন্স","licenses":"লাইসেন্সসমূহ","lighter":"হালকা","line":"লাইন","lines":"লাইনগুলি","link":"লিঙ্ক","links":"লিঙ্কসমূহ","list":"তালিকা","listed":"তালিকাভুক্ত","listen":"শুনুন","listening":"শুনছে","live":"লাইভ","living":"লিভিং রুম","loan":"ব্যবহার","loans":"ঋণসমূহ","local":"স্থানীয়","localities":"এলাকাসমূহ","locality":"এলাকা","locate":"খুঁজে বের করুন","location":"অবস্থান","locations":"অবস্থানসমূহ","lock":"লক","locked":"লক করা হয়েছে","log":"লগ","logged":"লগ ইন করেছে","logging":"লগইন করছে","login":"লগইন করুন","logo":"লোগো","logout":"লগআউট","logs":"লগসমূহ","long":"দীর্ঘ","look":"দেখুন","loss":"ক্ষতি","low":"কম","lower":"কম","lucknow":"লখনউ","machine":"মেশিন","machines":"মেশিনসমূহ","main":"প্রধান","maintain":"রক্ষণাবেক্ষণ করুন","maintaining":"বজায় রাখছে","maintenance":"রক্ষণাবেক্ষণ","major":"প্রধান","make":"তৈরি করুন","making":"তৈরি করছে","management":"ব্যবস্থাপনা","manager":"ম্যানেজার","mar":"মার্চ","march":"মার্চ","mark":"চিহ্নিত করুন","marked":"চিহ্নিত করা হয়েছে","market":"বাজার","marketplace":"মার্কেটপ্লেস","mask":"মাস্ক","mason":"রাজমিস্ত্রি","masonry":"গাঁথুনির কাজ","massage":"ম্যাসাজ","master":"দক্ষ","match":"মেলান","matched":"মিলেছে","matches":"মিলসমূহ","matching":"মিলকরণ","material":"উপাদান","materials":"উপকরণসমূহ","math":"গণিত","maths":"গণিত","max":"সর্বোচ্চ","maximum":"সর্বোচ্চ","may":"মে","mcb":"এমসিবি","me":"আমাকে","mechanic":"মেকানিক","mechanics":"মেকানিকরা","mediation":"মধ্যস্থতা","medium":"মাঝারি","meenakshi":"মীনাক্ষী","member":"সদস্য","members":"সদস্যবৃন্দ","membership":"সদস্যপদ","menu":"মেনু","message":"বার্তা","messages":"বার্তাসমূহ","messaging":"মেসেজিং","met":"দেখা হয়েছে","method":"পদ্ধতি","methods":"পদ্ধতিসমূহ","metric":"মেট্রিক","metrics":"পরিসংখ্যান","mic":"মাইক","microphone":"মাইক্রোফোন","microwave":"মাইক্রোওয়েভ","midnight":"মধ্যরাত","min":"মিনিট","minimum":"ন্যূনতম","minor":"ছোট","mins":"মিনিট","minute":"মিনিট","minutes":"মিনিট","missing":"অনুপস্থিত","mobile":"মোবাইল","model":"মডেল","modular":"মডুলার","monday":"সোমবার","money":"টাকা","monitor":"নজরদারি করুন","monitors":"নজরদারি করে","month":"মাস","monthly":"মাসিক","months":"মাসসমূহ","more":"আরও","morning":"সকাল","mortar":"মর্টার","most":"বেশিরভাগ","motor":"মোটর","move":"সরান","mover":"মুভার","movers":"মুভাররা","moving":"স্থানান্তর","mukherjee":"মুখার্জি","multimeter":"মাল্টিমিটার","multiple":"একাধিক","multilingual":"বহুভাষী","mumbai":"মুম্বাই","murthy":"মূর্তি","must":"অবশ্যই","mutual":"পারস্পরিক","my":"আমার","myself":"নিজে","name":"নাম","names":"নামসমূহ","national":"জাতীয়","native":"স্থানীয়","nav":"ন্যাভিগেশন","navigation":"ন্যাভিগেশন","near":"কাছে","nearby":"নিকটবর্তী","neat":"পরিচ্ছন্ন","necessary":"প্রয়োজনীয়","need":"প্রয়োজন","needed":"প্রয়োজনীয়","needing":"প্রয়োজন হচ্ছে","needs":"প্রয়োজনীয়তা","negative":"নেতিবাচক","negi":"নেগি","negotiable":"আলোচনা সাপেক্ষ","negotiate":"দরদাম করুন","negotiation":"দরকষাকষি","negotiations":"দরকষাকষিসমূহ","net":"নেট","netting":"নেট","network":"নেটওয়ার্ক","new":"নতুন","next":"পরবর্তী","nidhi":"নিধি","night":"রাত","nine":"নয় (৯)","no":"কোনো","noida":"নয়ডা","noise":"শব্দ","none":"কিছুই না","noon":"দুপুর","normal":"স্বাভাবিক","north":"উত্তর","not":"না","note":"নোট","noted":"নোট করা হয়েছে","notes":"নোটসমূহ","notice":"বিজ্ঞপ্তি","notification":"বিজ্ঞপ্তি","notifications":"বিজ্ঞপ্তিসমূহ","nov":"নভেম্বর","november":"নভেম্বর","now":"এখন","number":"নম্বর","numbers":"নম্বরসমূহ","numeral":"সংখ্যা","numerals":"সংখ্যাসমূহ","nursing":"নার্সিং","nut":"নাট","oauth":"ও-অথ","oct":"অক্টোবর","october":"অক্টোবর","odorless":"গন্ধহীন","of":"এর","off":"বন্ধ","offer":"অফার","offered":"প্রস্তাবিত","offering":"অফার","offers":"অফারসমূহ","official":"অফিসিয়াল","offline":"অফলাইন","ok":"ঠিক আছে","okay":"ঠিক আছে","old":"পুরনো","on":"উপরে","onboarding":"যুক্তকরণ","one":"এক","online":"অনলাইন","only":"কেবলমাত্র","onto":"উপরে","open":"খোলা","opened":"খোলা হয়েছে","opening":"উদ্বোধন","opens":"খোলে","operated":"পরিচালিত","operation":"পরিচালন","operations":"অপারেশনসমূহ","ops":"অপারেশন","opt":"বেছে নিন","option":"বিকল্প","options":"বিকল্পসমূহ","or":"বা","order":"অর্ডার","orders":"অর্ডারসমূহ","organisation":"সংগঠন","organization":"প্রতিষ্ঠান","origin":"উৎস","original":"আসল","other":"অন্য","others":"অন্যরা","our":"আমাদের","ours":"আমাদের","ourselves":"আমরা নিজেরাই","out":"বাইরে","outdoor":"আউটডোর","outgoing":"আউটগোয়িং","output":"আউটপুট","outstanding":"অসাধারণ","oven":"ওভেন","over":"উপরে","overcharging":"অতিরিক্ত চার্জ ধার্য","overflow":"অতিরিক্ত কাজ","overview":"ওভারভিউ","owned":"মালিকানাধীন","owner":"মালিক","owners":"মালিকরা","pack":"প্যাক","package":"প্যাকেজ","packages":"প্যাকেজসমূহ","packed":"প্যাকড","packer":"প্যাকার","packers":"প্যাকার্স","packing":"প্যাকিং","page":"পৃষ্ঠা","pages":"পৃষ্ঠাসমূহ","paid":"পরিশোধিত","paint":"পেইন্ট","painter":"পেইন্টার","painters":"পেইন্টাররা","painting":"রঙের কাজ","pane":"প্যান","panel":"প্যানেল","parmar":"পারমার","part":"অংশ","partial":"আংশিক","particular":"নির্দিষ্ট","partner":"পার্টনার","partners":"পার্টনারবৃন্দ","parts":"যন্ত্রাংশ","pass":"পাস","passed":"উত্তীর্ণ","password":"পাসওয়ার্ড","past":"অতীত","patil":"পাটিল","patna":"পাটনা","pause":"বিরতি","pay":"পেমেন্ট করুন","paying":"পেমেন্ট করছে","payment":"পেমেন্ট","payments":"পেমেন্টসমূহ","payout":"পে-আউট","payouts":"পে-আউটসমূহ","paytm":"পেটিএম","pending":"মুলতুবি","pension":"পেনশন","per":"প্রতি","percent":"শতাংশ","percentage":"শতাংশ","perfect":"নিখুঁত","perform":"সম্পাদন করুন","performance":"কর্মক্ষমতা","performed":"সম্পাদিত","period":"সময়কাল","permanent":"স্থায়ী","permanently":"স্থায়ীভাবে","permission":"অনুমতি","person":"ব্যক্তি","personal":"ব্যক্তিগত","personally":"ব্যক্তিগতভাবে","persons":"ব্যক্তিবর্গ","pest":"কীটপতঙ্গ","pet":"পোষা প্রাণী","phase":"পর্যায়","phone":"ফোন","phonepe":"ফোনপে","pick":"বেছে নিন","picked":"বেছে নিয়েছে","pickup":"পিকআপ","pill":"পিল ব্যাজ","pin":"পিন","pincode":"পিনকোড","pipe":"পাইপ","pipes":"পাইপসমূহ","place":"স্থান","placed":"রাখা হয়েছে","placeholder":"প্লেসহোল্ডার","places":"স্থানসমূহ","plan":"পরিকল্পনা","plans":"পরিকল্পনাসমূহ","plaster":"প্লাস্টার","plastic":"প্লাস্টিক","platform":"প্ল্যাটফর্ম","please":"দয়া করে","pliers":"প্লায়ার্স","plug":"প্লাগ","plumber":"প্লাম্বার","plumbers":"প্লাম্বাররা","plumbing":"প্লাম্বিং","ply":"প্লাই","plywood":"প্লাইউড","pm":"বিকেল","point":"পয়েন্ট","points":"পয়েন্টসমূহ","policy":"নীতি","polish":"পালিশ","polishing":"পালিশ করা","pool":"তহবিল","pools":"তহবিল পুলসমূহ","poor":"দরিদ্র","popular":"জনপ্রিয়","portal":"পোর্টাল","position":"অবস্থান","positive":"ইতিবাচক","possible":"সম্ভব","postal":"ডাক","post":"পোস্ট","posted":"পোস্ট করা হয়েছে","power":"বিদ্যুৎ","predict":"পূর্বাভাস দিন","prediction":"পূর্বাভাস","predictions":"পূর্বাভাসসমূহ","prefer":"পছন্দ করুন","preference":"পছন্দ","preferred":"পছন্দের","premium":"প্রিমিয়াম","prepaid":"প্রিপেইড","preparation":"প্রস্তুতি","presence":"উপস্থিতি","press":"চাপুন","pressure":"চাপ","prevent":"প্রতিরোধ করুন","previous":"পূর্ববর্তী","price":"মূল্য","prices":"দামসমূহ","pricing":"মূল্য নির্ধারণ","primary":"প্রাথমিক","privacy":"গোপনীয়তা","private":"ব্যক্তিগত","pro":"প্রো","problem":"সমস্যা","problems":"সমস্যাসমূহ","proceed":"এগিয়ে যান","process":"প্রক্রিয়া","processed":"প্রক্রিয়াকৃত","profession":"পেশা","professional":"পেশাদার","professionals":"পেশাদাররা","profile":"প্রোফাইল","profiles":"প্রোফাইলসমূহ","program":"প্রোগ্রাম","progress":"অগ্রগতি","progressive":"প্রগতিশীল","project":"প্রকল্প","promise":"প্রতিশ্রুতি","promote":"উন্নীত করুন","prompt":"দ্রুত","promptly":"দ্রুততার সাথে","property":"সম্পত্তি","proposal":"প্রস্তাব","propose":"প্রস্তাব করা","proposed":"প্রস্তাবিত","pros":"বিশেষজ্ঞরা","prospect":"সম্ভাবনা","prospective":"সম্ভাব্য","protect":"রক্ষা করুন","protected":"সুরক্ষিত","protection":"সুরক্ষা","protocol":"প্রোটোকল","provide":"প্রদান করুন","provided":"প্রদত্ত","provider":"সেবাদাতা","providers":"সেবাদাতারা","punctual":"সময়নিষ্ঠ","pune":"পুনে","qr":"কিউআর","qualification":"যোগ্যতা","qualified":"যোগ্যতাসম্পন্ন","quality":"গুণমান","quarter":"ত্রৈমাসিক","quarterly":"ত্রৈমাসিক","question":"প্রশ্ন","questions":"প্রশ্নাবলী","queue":"সারি","quick":"দ্রুত","quickly":"দ্রুত","quit":"প্রস্থান করুন","quote":"কোটেশন","quotes":"কোটেশনসমূহ","range":"পরিসীমা","rank":"র‍্যাঙ্ক","ranked":"র‍্যাঙ্ককৃত","rate":"রেট","rated":"রেটেড","rates":"হার","rating":"রেটিং","ratings":"রেটিংসমূহ","raw":"কাঁচা","reach":"পৌঁছানো","reached":"পৌঁছে গেছে","read":"পড়ুন","readiness":"প্রস্তুতি","ready":"প্রস্তুত","real":"প্রকৃত","reallocation":"সম্পদ পুনর্বণ্টন","reason":"কারণ","reasonable":"যুক্তিসঙ্গত","reasons":"কারণসমূহ","receive":"গ্রহণ করুন","received":"প্রাপ্ত","receiving":"পাচ্ছে","recent":"সাম্প্রতিক","recently":"সম্প্রতি","recognition":"স্বীকৃতি","recommend":"সুপারিশ করুন","recommended":"সুপারিশকৃত","record":"রেকর্ড","records":"রেকর্ডসমূহ","recover":"পুনরুদ্ধার করুন","rectification":"সংশোধন","redressal":"প্রতিকার","reduce":"হ্রাস করুন","reduction":"হ্রাস","refer":"রেফার করুন","reference":"রেফারেন্স","reflect":"প্রতিফলিত করুন","reflects":"প্রতিফলিত করে","reform":"সংস্কার","refresh":"রিফ্রেশ করুন","refrigerator":"রেফ্রিজারেটর","refund":"রিফান্ড","refunded":"রিফান্ডকৃত","refunds":"রিফান্ডসমূহ","regards":"শ্রদ্ধান্তে","region":"অঞ্চল","register":"নিবন্ধন করুন","registered":"নিবন্ধিত","registration":"নিবন্ধন","regular":"নিয়মিত","reimburse":"পরিশোধ করুন","reinforce":"শক্তিশালী করুন","reject":"প্রত্যাখ্যান","rejected":"প্রত্যাখ্যাত","rejecting":"প্রত্যাখ্যান করছে","rejection":"প্রত্যাখ্যান","relate":"সম্পর্কিত","release":"মুক্ত করুন","released":"ছাড় করা হয়েছে","releases":"ছাড়ে","releasing":"ছাড়ছে","relevant":"প্রাসঙ্গিক","reliable":"নির্ভরযোগ্য","relief":"ত্রাণ","relocation":"স্থানান্তর","remain":"থাকুন","remaining":"অবশিষ্ট","remains":"থাকে","reminder":"অনুস্মারক","remote":"রিমোট","remove":"সরান","removed":"সরানো হয়েছে","renew":"নবায়ন করুন","renewal":"নবায়ন","rent":"ভাড়া","rental":"ভাড়া","rented":"ভাড়া দেওয়া হয়েছে","repair":"মেরামত","repairs":"মেরামতসমূহ","replace":"প্রতিস্থাপন করুন","replacement":"প্রতিস্থাপন","reply":"উত্তর দিন","report":"রিপোর্ট","reported":"রিপোর্টকৃত","reporter":"প্রতিবেদক","request":"অনুরোধ","requested":"অনুরোধকৃত","requesting":"অনুরোধ করছে","requests":"অনুরোধ","require":"প্রয়োজন","required":"প্রয়োজনীয়","requirement":"প্রয়োজনীয়তা","requirements":"প্রয়োজনীয়তাসমূহ","requisition":"চাহিদা","requisitions":"রিকুইজিশনসমূহ","reserve":"সংরক্ষিত","reserves":"রিজার্ভ তহবিল","reset":"রিসেট","resolution":"সমাধান","resolutions":"সমাধানসমূহ","resolve":"মীমাংসা করুন","resolved":"মীমাংসিত","resource":"সম্পদ","resources":"সম্পদসমূহ","respect":"শ্রদ্ধা","respond":"সাড়া দিন","response":"প্রতিক্রিয়া","responses":"প্রতিক্রিয়াগুলি","responsible":"দায়িত্বশীল","rest":"বাকি","restore":"পুনরুদ্ধার করুন","result":"ফলাফল","results":"ফলাফলসমূহ","resume":"পুনরায় শুরু করুন","return":"ফেরত","returned":"ফেরত দেওয়া হয়েছে","revenue":"রাজস্ব","reversal":"প্রত্যাবর্তন","review":"পর্যালোচনা","reviewed":"পর্যালোচিত","reviewer":"পর্যালোচক","reviews":"পর্যালোচনা","rewire":"রি-ওয়্যার করুন","rewiring":"রি-ওয়্যারিং","rider":"রাইডার","right":"সঠিক","rights":"অধিকারসমূহ","risk":"ঝুঁকি","road":"রাস্তা","rohini":"রোহিণী","role":"ভূমিকা","roles":"ভূমিকাগুলি","roller":"রোলার","roof":"ছাদ","roofing":"ছাদের কাজ","room":"ঘর","roster":"রোস্টার","rotary":"রোটারি","rule":"নিয়ম","rules":"নিয়মাবলী","rupay":"রুপে","rupee":"টাকা","rupees":"টাকা","safe":"নিরাপদ","safety":"নিরাপত্তা","said":"বলেছেন","salary":"বেতন","salon":"সেলুন","salt":"সল্ট","same":"একই","samanta":"সামন্ত","sanitization":"জীবাণুমুক্তকরণ","satisfaction":"সন্তুষ্টি","satisfactory":"সন্তোষজনক","satisfied":"সন্তুষ্ট","saturday":"শনিবার","save":"সংরক্ষণ করুন","saved":"সংরক্ষিত","saving":"সঞ্চয়","say":"বলুন","scale":"স্কেল","scenario":"পরিস্থিতি","scenarios":"পরিস্থিতিসমূহ","schedule":"সময়সূচী","scheduled":"নির্ধারিত","scheduling":"নির্ধারণ করা হচ্ছে","school":"স্কুল","scope":"পরিসীমা","score":"স্কোর","screen":"পর্দা","screw":"স্ক্রু","screwdriver":"স্ক্রুড্রাইভার","search":"অনুসন্ধান করুন","searched":"অনুসন্ধান করেছে","searching":"অনুসন্ধান করছে","seat":"আসন","sec":"সেকেন্ড","second":"দ্বিতীয়","seconds":"সেকেন্ড","secret":"গোপন","section":"বিভাগ","sector":"সেক্টর","secure":"সুরক্ষিত","secured":"সুরক্ষিত","security":"নিরাপত্তা","see":"দেখুন","seek":"চান","select":"নির্বাচন করুন","selected":"নির্বাচিত","selecting":"নির্বাচন করা","selection":"নির্বাচন","self":"নিজে","send":"পাঠান","sender":"প্রেরক","sending":"পাঠাচ্ছে","senior":"সিনিয়র","sensible":"যৌক্তিক","sent":"পাঠানো হয়েছে","sentence":"বাক্য","separate":"আলাদা","sep":"সেপ্টেম্বর","september":"সেপ্টেম্বর","series":"সিরিজ","serve":"পরিষেবা দিন","served":"পরিষেবা দেওয়া হয়েছে","server":"সার্ভার","service":"পরিষেবা","services":"পরিষেবাসমূহ","servicing":"সার্ভিসিং","session":"সেশন","sessions":"সেশনসমূহ","set":"সেট করুন","setting":"সেটিং","settings":"সেটিংস","settle":"মীমাংসা করুন","settled":"নিষ্পন্ন","settlement":"নিষ্পত্তি","seven":"সাত (৭)","severe":"মারাত্মক","seva":"সেবা","sevasathi":"সেবাসাথী","share":"শেয়ার করুন","shared":"শেয়ার করা হয়েছে","shares":"শেয়ারসমূহ","sharing":"শেয়ারিং","she":"সে","shell":"শেল","shift":"শিফট","shifted":"স্থানান্তরিত","shifting":"স্থানান্তর","short":"সংক্ষিপ্ত","should":"উচিত","show":"দেখান","showing":"দেখাচ্ছে","shown":"দেখানো হয়েছে","shows":"দেখাচ্ছে","side":"দিক","sides":"উভয়পক্ষ","sign":"সাইন","signed":"স্বাক্ষরিত","signing":"স্বাক্ষর করা","signin":"সাইন ইন করুন","signout":"সাইন আউট","signup":"সাইন আপ করুন","silence":"নীরবতা","silent":"নীরব","simple":"সহজ","simply":"সহজভাবে","since":"থেকে","single":"একক","sir":"স্যার","site":"সাইট","six":"ছয় (৬)","size":"আকার","skill":"দক্ষতা","skilled":"দক্ষ","skills":"দক্ষতাসমূহ","slider":"স্লাইডার","slot":"স্লট","slots":"স্লটসমূহ","slow":"ধীর","small":"ছোট","smart":"স্মার্ট","snake":"স্নেক","so":"তাই","society":"সমিতি","socket":"সকেট","sofa":"সোফা","sold":"বিক্রি হয়েছে","soldering":"সোল্ডারিং","solution":"সমাধান","solutions":"সমাধানসমূহ","some":"কিছু","someone":"কেউ","something":"কিছু","somewhere":"কোথাও","soon":"শীঘ্রই","sorry":"দুঃখিত","sort":"সাজান","sorted":"সাজানো","sound":"শব্দ","source":"উৎস","south":"দক্ষিণ","spa":"স্পা","space":"স্থান","spaces":"স্থানসমূহ","spare":"অতিরিক্ত","spares":"অতিরিক্ত যন্ত্রাংশ","speak":"বলুন","speaker":"বক্তা","speaking":"বলছে","special":"বিশেষ","specialist":"বিশেষজ্ঞ","specialists":"বিশেষজ্ঞরা","specific":"নির্দিষ্ট","specifically":"বিশেষভাবে","speed":"গতি","speedy":"দ্রুত","spent":"ব্যয়িত","split":"ভাগ","spot":"স্থান","spray":"স্প্রে","sprayer":"স্প্রেয়ার","squad":"স্কোয়াড","squads":"স্কোয়াডসমূহ","staff":"কর্মী","standard":"মানক","standards":"মানকসমূহ","star":"স্টার","stars":"তারকাসমূহ","start":"শুরু করুন","started":"শুরু হয়েছে","starting":"শুরু হচ্ছে","starts":"শুরু হয়","state":"অবস্থা","statement":"বিবরণী","status":"অবস্থা","stay":"থাকুন","step":"ধাপ","steps":"ধাপসমূহ","still":"এখনও","stop":"থামান","stopped":"থেমে গেছে","stopping":"থামাচ্ছে","storage":"স্টোরেজ","store":"দোকান","stored":"সংরক্ষিত","straight":"সরাসরি","stream":"স্ট্রিম","street":"রাস্তা","strictly":"কঠোরভাবে","student":"ছাত্র","students":"শিক্ষার্থীরা","style":"শৈলী","subject":"বিষয়","submit":"জমা দিন","submitted":"জমা দেওয়া হয়েছে","submitting":"জমা দিচ্ছে","subtle":"সূক্ষ্ম","success":"সাফল্য","successful":"সফল","successfully":"সফলভাবে","suggest":"পরামর্শ দিন","suggested":"প্রস্তাবিত","suggestion":"পরামর্শ","suggestions":"পরামর্শসমূহ","suit":"উপযুক্ত","summary":"সারসংক্ষেপ","summer":"গ্রীষ্ম","sunday":"রবিবার","superb":"চমৎকার","supplier":"সরবরাহকারী","support":"সহায়তা","supported":"সমর্থিত","supporter":"সমর্থক","surat":"সুরাট","sure":"অবশ্যই","surprise":"আশ্চর্য","survey":"জরিপ","sweet":"মিষ্টি","swift":"দ্রুত","switch":"বদলান","symptom":"লক্ষণ","symptoms":"লক্ষণসমূহ","system":"সিস্টেম","systems":"সিস্টেমসমূহ","table":"টেবিল","tailor":"দর্জি","take":"নিন","taken":"নেওয়া হয়েছে","taking":"নিচ্ছে","tap":"কল","tape":"টেপ","target":"লক্ষ্য","task":"কাজ","tasks":"কাজসমূহ","team":"দল","tech":"প্রযুক্তি","technician":"টেকনিশিয়ান","technicians":"টেকনিশিয়ানরা","technology":"প্রযুক্তি","tell":"বলুন","ten":"দশ (১০)","term":"শর্ত","terms":"শর্তাবলী","test":"পরীক্ষা","tested":"পরীক্ষিত","tester":"টেস্টার","text":"টেক্সট","than":"চেয়ে","thank":"ধন্যবাদ","thanks":"ধন্যবাদ","that":"ঐ","the":"","their":"তাদের","theirs":"তাদের","them":"তাদের","themselves":"নিজেদের","then":"তাহলে","therapy":"থেরাপি","therapist":"থেরাপিস্ট","therapists":"থেরাপিস্টরা","there":"সেখানে","these":"এইসব","they":"তারা","third":"তৃতীয়","this":"এই","those":"ঐসব","though":"যদিও","three":"তিন (৩)","through":"মাধ্যমে","throughout":"জুড়ে","thursday":"বৃহস্পতিবার","ticket":"টিকেট","tickets":"টিকেটসমূহ","tile":"টাইল","tiles":"টাইলস","tiling":"টাইলস বসানো","till":"পর্যন্ত","timber":"কাঠ","time":"সময়","timeline":"সময়রেখা","times":"বার","timing":"সময়","timings":"সময়সূচী","tip":"টিপ","tips":"টিপস","title":"শিরোনাম","to":"প্রতি","today":"আজ","together":"একসাথে","tomorrow":"কাল","tonight":"আজ রাতে","too":"অত্যধিক","tool":"যন্ত্রপাতি","tools":"যন্ত্রপাতিসমূহ","top":"শীর্ষ","total":"মোট","touch":"স্পর্শ","toward":"দিকে","towards":"দিকে","town":"শহর","track":"ট্র্যাক করুন","tracked":"ট্র্যাককৃত","tracking":"ট্র্যাকিং","trade":"পেশা","trades":"পেশাসমূহ","traffic":"ট্রাফিক","train":"প্রশিক্ষণ দিন","trained":"প্রশিক্ষিত","trainer":"প্রশিক্ষক","training":"প্রশিক্ষণ","transfer":"স্থানান্তর","transferred":"স্থানান্তরিত","transform":"রূপান্তর করুন","transition":"রূপান্তর","translation":"অনুবাদ","transparent":"স্বচ্ছ","transport":"পরিবহন","treat":"চিকিৎসা করুন","treatment":"চিকিৎসা","treatments":"চিকিৎসাসমূহ","tree":"গাছ","trigger":"ট্রিগার","triggered":"ট্রিগারকৃত","true":"সত্য","truly":"সত্যিই","trust":"বিশ্বাস","trusted":"বিশ্বস্ত","try":"চেষ্টা করুন","tuesday":"মঙ্গলবার","tutor":"টিউটর","tutoring":"টিউশন","tutors":"টিউটররা","two":"দুই (২)","type":"ধরন","typed":"টাইপ করা হয়েছে","types":"ধরনসমূহ","typing":"টাইপিং","unable":"অক্ষম","unassigned":"অনিযুক্ত","unavailable":"অনুপলব্ধ","under":"অধীনে","underneath":"নিচে","understand":"বুঝুন","understanding":"বোঝাপড়া","understood":"বুঝেছি","uniform":"পোশাক","unify":"একত্রিত করা","union":"ইউনিয়ন","unit":"ইউনিট","united":"ঐক্যবদ্ধ","units":"ইউনিটসমূহ","universal":"সার্বজনীন","unlock":"আনলক","unlocked":"আনলককৃত","unlocks":"আনলক করে","unpaid":"অপরিশোধিত","unprofessional":"অপেশাদার","unresolved":"অমীমাংসিত","unsettled":"অমীমাংসিত","unsuccessful":"ব্যর্থ","until":"পর্যন্ত","unverified":"অযাচাইকৃত","update":"আপডেট","updated":"আপডেটকৃত","updates":"আপডেটসমূহ","updating":"আপডেট করছে","upgrade":"আপগ্রেড করুন","upgrades":"আপগ্রেডসমূহ","upfront":"অগ্রিম","upholstery":"আপহোলস্ট্রি","upi":"ইউপিআই","upon":"উপরে","urgent":"জরুরি","urgently":"জরুরিভাবে","us":"আমাদের","use":"ব্যবহার করুন","used":"ব্যবহৃত","useful":"উপকারী","user":"ব্যবহারকারী","users":"ব্যবহারকারীরা","uses":"ব্যবহার করে","using":"ব্যবহার করে","valid":"বৈধ","validate":"যাচাই করুন","validated":"যাচাইকৃত","validating":"যাচাই করছে","validation":"বৈধতা যাচাই","validity":"মেয়াদ","valuation":"মূল্যায়ন","value":"মান","values":"মানসমূহ","valve":"ভালভ","vehicle":"যানবাহন","vehicles":"যানবাহনসমূহ","venkatesh":"ভেঙ্কটেশ","verdict":"রায়","verification":"যাচাইকরণ","verified":"যাচাইকৃত","verify":"যাচাই করুন","verifying":"যাচাই করছে","via":"মাধ্যমে","view":"দেখুন","viewed":"দেখা হয়েছে","viewing":"দেখছে","views":"ভিউ","violation":"লঙ্ঘন","violations":"লঙ্ঘনসমূহ","visa":"ভিসা","visible":"দৃশ্যমান","visit":"ভিজিট","visited":"ভিজিট করেছে","visiting":"ভিজিট করছে","visits":"ভিজিটসমূহ","visual":"ভিজুয়াল","voice":"ভয়েস","volume":"পরিমাণ","vote":"ভোট","voted":"ভোট দিয়েছে","voting":"ভোটদান","voucher":"ভাউচার","wage":"মজুরি","wages":"মজুরি","wait":"অপেক্ষা করুন","waiting":"অপেক্ষারত","wall":"দেয়াল","walls":"দেয়ালগুলি","wallet":"ওয়ালেট","want":"চান","wanted":"চেয়েছিলেন","wants":"চায়","warn":"সতর্কতা","warned":"সতর্কিত","warning":"সতর্কতা","warnings":"সতর্কতাগুলি","warranty":"ওয়ারেন্টি","was":"ছিল","wash":"ধোয়া","washer":"ওয়াশার","washing":"ধোয়ার কাজ","water":"জল","waterproofing":"জলরোধকরণ","way":"উপায়","ways":"পদ্ধতিগুলি","we":"আমরা","website":"ওয়েবসাইট","wednesday":"বুধবার","week":"সপ্তাহ","weekend":"সাপ্তাহিক ছুটি","weekends":"সপ্তাহান্তে","weekly":"সাপ্তাহিক","weeks":"সপ্তাহসমূহ","welcome":"স্বাগতম","welcoming":"স্বাগত জানাচ্ছে","welfare":"কল্যাণ","well":"ভালো","wellness":"সুস্বাস্থ্য","went":"গিয়েছিল","were":"ছিল","west":"পশ্চিম","what":"কী","whatever":"যাই হোক","when":"কখন","where":"কোথায়","wherever":"যেখানেই","which":"কোনটি","while":"যখন","whitefield":"হোয়াইটফিল্ড","who":"কে","whole":"সম্পূর্ণ","whom":"কাকে","whose":"কার","why":"কেন","wi":"ওয়াই","fi":"ফাই","wifi":"ওয়াই-ফাই","will":"হবে","window":"উইন্ডো","windows":"জানালাসমূহ","wire":"তার","wires":"তারসমূহ","wiring":"ওয়্যারিং","wish":"ইচ্ছা","with":"সাথে","withdraw":"উত্তোলন করুন","withdrawal":"উত্তোলন","within":"ভিতরে","without":"ছাড়া","won":"জয়ী","wonderful":"চমৎকার","wood":"কাঠ","work":"কাজ","worked":"কাজ করেছে","worker":"কর্মী","workers":"কর্মীরা","workforce":"কর্মীবাহিনী","working":"কাজ করছে","works":"কাজসমূহ","workspace":"ওয়ার্কস্পেস","worldwide":"বিশ্বব্যাপী","worries":"চিন্তা","worry":"চিন্তা করুন","wrap":"মোড়ানো","wrapping":"শেষ করছে","wrench":"রেঞ্চ","write":"লিখুন","writing":"লেখা","written":"লিখিত","yadaiah":"ইয়াদাইয়া","year":"বছর","yearly":"বার্ষিক","years":"বছর","yes":"হ্যাঁ","yesterday":"গতকাল","yet":"এখনও","yield":"ফলন","yoga":"যোগব্যায়াম","you":"আপনি","your":"আপনার","yours":"আপনার","yourself":"নিজে","zero":"শূন্য","zone":"জোন","zones":"জোনসমূহ","anytime":"যেকোনো সময়","apartment":"অ্যাপার্টমেন্ট","apps":"অ্যাপস","ar":"এআর","archived":"আর্কাইভকৃত","are":"হয়","arjun":"অর্জুন","artist":"শিল্পী","assembled":"একত্রিত","assembly":"সমাবেশ","attendance":"উপস্থিতি","ayesha":"আয়েশা","babysitter":"বেবিসিটার","babysitting":"শিশু যত্ন","backed":"সমর্থিত","background":"পটভূমি","balanced":"ভারসাম্যপূর্ণ","balancing":"ভারসাম্য বজায় রাখা","bandra":"বান্দ্রা","based":"ভিত্তিক","baseline":"বেসলাইন","beneficiary":"সুবিধাভোগী","bhat":"ভাট","bhk":"বিএইচকে","bliss":"আনন্দ","bookshelf":"বইয়ের তাক","branches":"শাখাগুলি","brokers":"দালালরা","bug":"বাগ","cafe":"ক্যাফে","calculated":"গণনাকৃত","calm":"শান্ত","cancellation":"বাতিলকরণ","cancellations":"বাতিলকরণসমূহ","caring":"যত্নশীল","cashless":"ক্যাশলেস","catering":"ক্যাটারিং","certifications":"সনদপত্রসমূহ","child":"শিশু","childcare":"শিশু যত্ন","children":"শিশুরা","cin":"সিআইএন","clarity":"স্পষ্টতা","cleanup":"পরিষ্কার","clearly":"স্পষ্টভাবে","clinic":"ক্লিনিক","coats":"প্রলেপ","collaborate":"সহযোগিতা করুন","come":"আসুন","commences":"শুরু হয়","commute":"যাতায়াত","companion":"সঙ্গী","companions":"সঙ্গীরা","compensation":"ক্ষতিপূরণ","complainant":"অভিযোগকারী","complexes":"কমপ্লেক্স","compliance":"সম্মতি","comprehensive":"ব্যাপক","compulsory":"বাধ্যতামূলক","console":"কনসোল","consolidated":"একীভূত","construction":"নির্মাণ","contacts":"যোগাযোগসমূহ","continue":"চালিয়ে যান","continuing":"চালিয়ে যাওয়া","contribution":"অবদান","contributions":"অবদানসমূহ","control":"নিয়ন্ত্রণ","conversation":"কথোপকথন","coop":"সমবায়","cooperation":"সহযোগিতা","corner":"কোণা","council":"কাউন্সিল","counts":"গণনা","cover":"কভার","coverage":"কভারেজ","cr":"কোটি","craft":"কারুশিল্প","craftsman":"কারিগর","craftsmanship":"দক্ষ কারিগরি","crashed":"ক্র্যাশ করেছে","creation":"সৃষ্টি","credential":"শংসাপত্র","credentials":"শংসাপত্রসমূহ","credits":"ক্রেডিটসমূহ","cross":"ক্রস","currently":"বর্তমানে","cut":"কাটা","cutters":"কাটারসমূহ","cyber":"সাইবার","daughter":"মেয়ে","dedicated":"নিবেদিত","deduct":"কাটা","deducted":"কর্তিত","deductions":"কর্তনসমূহ","demand":"চাহিদা","demands":"চাহিদারা","denied":"প্রত্যাখ্যাত","dependable":"নির্ভরযোগ্য","deployed":"নিয়োজিত","deploying":"নিয়োগ করছে","deshmukh":"দেশমুখ","desk":"ডেস্ক","destinations":"গন্তব্যস্থল","deterioration":"অবনতি","development":"উন্নয়ন","deworming":"কৃমিনাশক","dialogue":"সংলাপ","differ":"ভিন্ন","difference":"পার্থক্য","different":"ভিন্ন","dirt":"ময়লা","disaster":"বিপর্যয়","disconnect":"বিচ্ছিন্ন","discount":"ছাড়","discounts":"ছাড়সমূহ","dispatch":"প্রেরণ করুন","dispatched":"প্রেরিত","displays":"দেখাচ্ছে","documentation":"নথিপত্র","documents":"নথিপত্রসমূহ","dollar":"ডলার","don":"না","dose":"ডোজ","download":"ডাউনলোড","downtime":"অচল সময়","dress":"পোশাক","dues":"বকেয়াসমূহ","duration":"সময়কাল","dust":"ধুলো","dusting":"ধুলো পরিষ্কার","duty":"দায়িত্ব","dwellings":"বাসস্থান","dynamically":"গতিশীলভাবে","easiest":"সবচেয়ে সহজ","easily":"সহজে","easy":"সহজ","eating":"খাওয়া","edition":"সংস্করণ","education":"শিক্ষা","efficiency":"দক্ষতা","efficient":"দক্ষ","efficiently":"দক্ষতার সাথে","either":"হয়","elaborate":"বিস্তারিত","electric":"বৈদ্যুতিক","electricity":"বিদ্যুৎ","electronic":"ইলেকট্রনিক","elementary":"প্রাথমিক","elevate":"উন্নত করুন","eliminated":"নির্মূল","else":"অন্য","embedded":"এমবেডেড","emphasize":"গুরুত্ব দিন","empower":"ক্ষমতায়ন করুন","empowerment":"ক্ষমতায়ন","encourage":"উৎসাহিত করুন","end":"শেষ","ended":"শেষ হয়েছে","ending":"সমাপ্তি","energy":"শক্তি","enjoy":"উপভোগ করুন","ensuring":"নিশ্চিত করে","entry":"এন্ট্রি","environment":"পরিবেশ","environmental":"পরিবেশগত","equal":"সমান","equality":"সমতা","equitable":"ন্যায়সঙ্গত","equivalent":"সমতুল্য","escalate":"উচ্চতর স্তরে পাঠান","escalated":"উচ্চতর স্তরে পাঠানো হয়েছে","essential":"অপরিহার্য","estate":"এস্টেট","et":"ইত্যাদি","etc":"ইত্যাদি","ethics":"নৈতিকতা","evaluation":"মূল্যায়ন","evidence":"প্রমাণ","exceeding":"অতিক্রম করা","exclusively":"একচেটিয়াভাবে","execution":"কার্য সম্পাদন","exempt":"অব্যাহতিপ্রাপ্ত","exempted":"অব্যাহতিপ্রাপ্ত","expand":"সম্প্রসারণ করুন","expectation":"প্রত্যাশা","expectations":"প্রত্যাশাসমূহ","expected":"প্রত্যাশিত","expedite":"ত্বরান্বিত করুন","expedited":"ত্বরান্বিত","expenditure":"ব্যয়","expenses":"ব্যয়সমূহ","expensive":"ব্যয়বহুল","expiry":"মেয়াদ শেষ","extended":"বর্ধিত","extending":"প্রসারিত করা","external":"বাইরের","extractive":"শোষণমূলক","extreme":"চরম","facility":"সুবিধা","fail":"ব্যর্থ","false":"মিথ্যা","family":"পরিবার","fantastic":"চমৎকার","farm":"খামার","feature":"বৈশিষ্ট্য","featured":"ফিচার্ড","features":"বৈশিষ্ট্যসমূহ","federation":"ফেডারেশন","feel":"অনুভব করুন","feet":"ফুট","fellow":"সহকর্মী","festival":"উৎসব","fetch":"নিয়ে আসুন","fittings":"ফিটিংস","fixture":"ফিক্সচার","fixtures":"ফিক্সচারসমূহ","flash":"ফ্ল্যাশ","flat":"ফ্ল্যাট","flawless":"নিখুঁত","flight":"ফ্লাইট","floating":"ভাসমান","flow":"প্রবাহ","foam":"ফোম","focus":"মনোযোগ দিন","font":"ফন্ট","food":"খাবার","foot":"ফুট","footage":"ফুটেজ","forbidden":"নিষিদ্ধ","forecast":"পূর্বাভাস","forecasting":"পূর্বাভাস দেওয়া","formal":"আনুষ্ঠানিক","formula":"সূত্র","forth":"সামনে","fraction":"ভগ্নাংশ","framework":"কাঠামো","frequently":"ঘন ঘন","front":"সামনে","fuel":"জ্বালানি","function":"ফাংশন","functional":"কার্যকর","functionality":"কার্যকারিতা","gallery":"গ্যালারি","game":"খেলা","gaps":"ফাঁক","gas":"গ্যাস","gathered":"সংগৃহীত","gear":"গিয়ার","gearing":"প্রস্তুতি","gears":"সরঞ্জাম","geo":"ভৌগোলিক","gift":"উপহার","girls":"মেয়েরা","gita":"গীতা","gives":"দেয়","giving":"দেওয়া","go":"যান","goal":"লক্ষ্য","goals":"লক্ষ্যসমূহ","going":"যাচ্ছে","goud":"গৌড়","gourmet":"গুরমেট","government":"সরকার","grace":"অনুগ্রহ","granite":"গ্রানাইট","grant":"অনুদান","gross":"মোট","growth":"বৃদ্ধি","guide":"গাইড","guided":"নির্দেশিত","habit":"অভ্যাস","hall":"হল","hand":"হাত","handheld":"হ্যান্ডহেল্ড","hands":"হাত","happen":"ঘটা","happening":"ঘটছে","happens":"ঘটে","harassment":"হয়রানি","hazard":"বিপদ","head":"প্রধান","header":"হেডার","heading":"শিরোনাম","healthcare":"স্বাস্থ্যসেবা","hearing":"শুনানি","heatgun":"হিট গান","heavily":"ভারীভাবে","helmet":"হেলমেট","helmets":"হেলমেটসমূহ","helpdesk":"হেল্পডেস্ক","helpful":"সহায়ক","heuristic":"হিউরিস্টিক","highrise":"উচ্চ ভবন","hill":"পাহাড়","hint":"ইঙ্গিত","holiday":"ছুটি","holidays":"ছুটির দিনসমূহ","hospital":"হাসপাতাল","hospitalization":"হাসপাতালে ভর্তি","host":"হোস্ট","hot":"গরম","household":"গৃহস্থালি","households":"পরিবারসমূহ","housekeeping":"হাউসকিপিং","huge":"বিশাল","human":"মানুষ","hundred":"শত","hurt":"আঘাত","hygiene":"স্বাস্থ্যবিধি","ignored":"উপেক্ষিত","illness":"অসুস্থতা","illustrate":"ব্যাখ্যা করুন","impact":"প্রভাব","implement":"বাস্তবায়ন করুন","implemented":"বাস্তবায়িত","implementation":"বাস্তবায়ন","improve":"উন্নত করুন","improves":"উন্নত করে","incentive":"প্রণোদনা","incentives":"প্রণোদনাগুলি","incident":"ঘটনা","incidents":"ঘটনাসমূহ","indore":"ইন্দোর","informing":"অবহিত করা","initial":"প্রাথমিক","initials":"আদ্যা hish","initiative":"উদ্যোগ","input":"ইনপুট","inputs":"ইনপুটসমূহ","inquire":"অনুসন্ধান করুন","inquiries":"অনুসন্ধানসমূহ","inspector":"পরিদর্শক","installations":"ইনস্টলেশনসমূহ","installer":"ইনস্টলার","instructed":"নির্দেশিত","integrity":"অখণ্ডতা","intent":"উদ্দেশ্য","interactive":"ইন্টারেক্টিভ","interface":"ইন্টারফেস","intermediate":"মধ্যবর্তী","interventions":"হস্তক্ষেপসমূহ","invaluable":"অমূল্য","invested":"বিনিয়োগকৃত","investor":"বিনিয়োগকারী","invite":"আমন্ত্রণ জানান","invited":"আমন্ত্রিত","inward":"ভেতরের","iron":"লোহা","isolated":"বিচ্ছিন্ন","janitor":"দারোয়ান","jet":"জেট","journey":"যাত্রা","judge":"বিচারক","judgment":"রায়","junction":"জংশন","kilometers":"কিলোমিটার","kind":"ধরনের","kits":"কিটস","laminated":"লেমিনেটেড","lamp":"বাতি","landmark":"ল্যান্ডমার্ক","laptop":"ল্যাপটপ","later":"পরে","laundering":"ধোলাই","laundry":"লন্ড্রি","layer":"স্তর","leakproof":"লিকপ্রুফ","learners":"শিক্ষার্থীরা","legacy":"ঐতিহ্য","lenders":"ঋণদাতারা","leverage":"সুবিধা নিন","levy":"লেভি","liability":"দায়","licensed":"লাইসেন্সপ্রাপ্ত","life":"জীবন","lifecycle":"জীবনচক্র","lifetime":"আজীবন","lift":"লিফট","lighting":"আলোকসজ্জা","lights":"বাতিগুলি","limit":"সীমা","limited":"সীমিত","limits":"সীমাবদ্ধতা","lining":"লাইনিং","liquidity":"তারল্য","loading":"লোড হচ্ছে","loaned":"ধার দেওয়া হয়েছে","lockers":"লকারসমূহ","locks":"তালাসমূহ","loop":"লুপ","lowcost":"স্বল্প খরচে","loyalty":"আনুগত্য","luxury":"বিলাসিতা","mailer":"মেইলার","mail":"মেইল","maintainer":"রক্ষণাবেক্ষণকারী","mandatory":"বাধ্যতামূলক","manpower":"জনশক্তি","manual":"ম্যানুয়াল","map":"মানচিত্র","marble":"মার্বেল","maximize":"সর্বোচ্চ করুন","maximums":"সর্বোচ্চ সীমা","meals":"খাবার","means":"উপায়","measures":"পদক্ষেপসমূহ","media":"মিডিয়া","medical":"চিকিৎসা","medicine":"ওষুধ","medicines":"ওষুধসমূহ","mentor":"পরামর্শদাতা","merchant":"ব্যবসায়ী","mess":"বিশৃঙ্খলা","metal":"ধাতু","meter":"মিটার","meters":"মিটারসমূহ","micro":"ক্ষুদ্র","microfinance":"ক্ষুদ্রঋণ","milestone":"মাইলফলক","milestones":"মাইলফলকসমূহ","minimal":"ন্যূনতম","minimize":"সর্বনিম্ন করুন","mode":"মোড","modes":"মোডসমূহ","modify":"সংশোধন করুন","moment":"মুহূর্ত","movement":"আন্দোলন","multi":"বহু","multitasking":"মাল্টিটাস্কিং","nail":"পেরেক","nails":"পেরেকসমূহ","named":"নামকরণকৃত","negotiated":"আলোচনাকৃত","neighborhood":"প্রতিবেশী এলাকা","neither":"না","netted":"নেট করা","networking":"নেটওয়ার্কিং","neutral":"নিরপেক্ষ","newly":"নতুনভাবে","nil":"শূন্য","noble":"মহৎ","nod":"সম্মতি","node":"নোড","nominal":"নামমাত্র","nonprofit":"অলাভজনক","norm":"নিয়ম","norms":"মানদণ্ডসমূহ","notation":"চিহ্ন","novel":"নতুন","nowadays":"আজকাল","null":"নাল","objective":"উদ্দেশ্য","objectives":"উদ্দেশ্যসমূহ","obligation":"বাধ্যবাধকতা","occupational":"পেশাগত","occupations":"পেশাসমূহ","occurred":"ঘটেছে","offset":"অফসেট","oil":"তেল","older":"পুরনো","oldest":"সবচেয়ে পুরানো","omission":"ভুল","ongoing":"চলমান","onsite":"অনসাইট","openings":"সুযোগসমূহ","operate":"পরিচালনা করুন","operator":"অপারেটর","opportunity":"সুযোগ","opportunities":"সুযোগসমূহ","optimal":"সর্বোত্তম","optimize":"অনুকূলিত করুন","optimized":"অনুকূলিত","optionally":"ঐচ্ছিকভাবে","oral":"মৌখিক","orderly":"সুশৃঙ্খল","ordinance":"অধ্যাদেশ","outage":"বিভ্রাট","outcome":"ফলাফল","outdoors":"বাইরে","overdue":"মেয়াদোত্তীর্ণ বকেয়া","overhead":"ওভারহেড খরচ","overlap":"ওভারল্যাপ","packet":"প্যাকেট","panelist":"প্যানেলিস্ট","panoramic":"বিস্তৃত দৃশ্য","parameter":"প্যারামিটার","pardon":"ক্ষমা করবেন","parent":"অভিভাবক","park":"পার্ক","parking":"পার্কিং","participate":"অংশগ্রহণ করুন","participation":"অংশগ্রহণ","particulars":"বিস্তারিত তথ্য","parties":"পক্ষসমূহ","partition":"বিভাজন","partnered":"অংশীদারি করেছে","passage":"পথ","pastime":"শখ","patience":"ধৈর্য","patient":"রোগী","patrol":"টহল","patron":"পৃষ্ঠপোষক","pave":"বাঁধানো","pedestrian":"পথচারী","penalty":"জরিমানা","penny":"পয়সা","perceive":"উপলব্ধি করা","perfected":"নিখুঁতকৃত","periodical":"সাময়িকী","permanency":"স্থায়িত্ব","permeate":"ছড়িয়ে পড়া","permit":"অনুমতি","permitted":"অনুমোদিত","perpetual":"চিরস্থায়ী","perseverance":"অধ্যবসায়","persists":"অব্যাহত থাকে","personalized":"ব্যক্তিগতকৃত","personnel":"কর্মীগণ","petroleum":"পেট্রোলিয়াম","phased":"পর্যায়ক্রমিক","photo":"ছবি","photograph":"ছবি","photos":"ছবিসমূহ","phrase":"শব্দগুচ্ছ","physical":"শারীরিক","physique":"শারীরিক গঠন","pictures":"ছবিগুলি","piece":"টুকরো","pilot":"পাইলট","pipeline":"পাইপলাইন","placement":"নিয়োগ","platinum":"প্ল্যাটিনাম","pleasant":"মনোরম","pledge":"অঙ্গীকার","plentiful":"প্রচুর","plus":"প্লাস","pocket":"পকেট","pod":"পড","policyholder":"পলিসিধারী","portion":"অংশ","portfolio":"পোর্টফোলিও","positioning":"অবস্থান নির্ধারণ","possibility":"সম্ভাবনা","postcard":"পোস্টকার্ড","potential":"সম্ভাবনা","poultry":"পোল্ট্রি","pound":"পাউন্ড","poverty":"দারিদ্র্য","powerful":"শক্তিশালী","practical":"ব্যবহারিক","practice":"অনুশীলন","practitioner":"অনুশীলনকারী","praise":"প্রশংসা","precaution":"সতর্কতা","precautions":"সতর্কতাসমূহ","precise":"সঠিক","precisely":"সঠিকভাবে","precision":"নির্ভুলতা","predatory":"শোষণমূলক","preferable":"অধিক পছন্দনীয়","premises":"চত্বর","prepared":"প্রস্তুত","prescribed":"নির্ধারিত","presentation":"উপস্থাপনা","preserve":"সংরক্ষণ করুন","preset":"প্রিসেট","preside":"সভাপতিত্ব করা","preventative":"প্রতিরোধমূলক","prevention":"প্রতিরোধ","pricey":"ব্যয়বহুল","pride":"গর্ব","prime":"প্রধান","primitive":"আদিম","principal":"প্রধান","prior":"পূর্ববর্তী","priority":"অগ্রাধিকার","privilege":"সুবিধা","proactive":"সক্রিয়","probability":"সম্ভাবনা","probation":"প্রবেশন","procedure":"পদ্ধতি","proceeding":"কার্যক্রম","processor":"প্রসেসর","procure":"সংগ্রহ করুন","procurement":"সংগ্রহ","produce":"উৎপাদন করুন","producer":"উৎপাদক","product":"পণ্য","production":"উৎপাদন","products":"পণ্যসমূহ","profit":"লাভ","profitable":"লাভজনক","profits":"লাভসমূহ","profound":"গভীর","progressed":"অগ্রসর হয়েছে","prohibit":"নিষিদ্ধ করা","projection":"প্রক্ষেপণ","prolong":"দীর্ঘায়িত করা","promising":"আশাব্যঞ্জক","promoter":"প্রবর্তক","promotion":"পদোন্নতি","proper":"সঠিক","properly":"সঠিকভাবে","proprietor":"মালিক","prosecute":"মামলা করা","prospects":"সম্ভাবনাগুলি","prosper":"উন্নতি করা","protecting":"সুরক্ষা দিচ্ছে","proven":"প্রমাণিত","province":"প্রদেশ","provision":"বিধান","provisions":"বিধানসমূহ","proximity":"নৈকট্য","prudent":"বিচক্ষণ","psychology":"মনোবিজ্ঞান","publish":"প্রকাশ করুন","published":"প্রকাশিত","pump":"পাম্প","punctuality":"সময়ানুবর্তিতা","purchase":"ক্রয় করুন","purchased":"ক্রয়কৃত","pure":"খাঁটি","purpose":"উদ্দেশ্য","pursue":"অনুসরণ করা","push":"পুশ","puzzled":"বিভ্রান্ত","quantity":"পরিমাণ","quarrel":"ঝগড়া","quarry":"খনি","query":"প্রশ্ন","quest":"অনুসন্ধান","quota":"কোটা","quotation":"দরপত্র","radar":"রাডার","radiant":"উজ্জ্বল","radius":"ব্যাসার্ধ","railing":"রেলিং","raise":"উত্তোলন করুন","raised":"উত্থাপিত","random":"এলোমেলো","rapid":"দ্রুত","rare":"বিরল","ratio":"অনুপাত","rationale":"যৌক্তিকতা","ravinder":"রবীন্দ্র","reaffirm":"পুনঃনিশ্চিত করা","realign":"পুনর্গঠন করুন","reassure":"আশ্বাস দেওয়া","rebooking":"পুনর্বুকিং","rebound":"প্রত্যাবর্তন","rebuild":"পুনর্নির্মাণ করুন","receipt":"রসিদ","receipts":"রসিদসমূহ","recharge":"রিচার্জ","recipient":"প্রাপক","reckon":"গণনা করা","reclaim":"পুনরুদ্ধার করুন","reconcile":"মীমাংসা করা","reconstruct":"পুনর্গঠন করা","recoverable":"পুনরুদ্ধারযোগ্য","recruitment":"নিয়োগ","redress":"প্রতিকার","redundant":"অপ্রয়োজনীয়","referee":"রেফারি","refine":"পরিমার্জিত করুন","reflected":"প্রতিফলিত","reimbursement":"প্রতিপূরণ","reinstate":"পুনর্বহাল করুন","reiterate":"পুনরাবৃত্তি করা","relaxation":"বিশ্রাম","relaxed":"স্বস্তিদায়ক","relentless":"ক্লান্তিহীন","reliability":"নির্ভরযোগ্যতা","reliance":"নির্ভরতা","remedy":"প্রতিকার","remittance":"টাকা পাঠানো","remodel":"পুনর্নির্মাণ","renovation":"সংস্কার","reorganization":"পুনর্গঠন","repairman":"মেরামতকারী","repave":"পুনরায় বাঁধানো","repeated":"পুনরাবৃত্তি","repertoire":"সংগ্রহ","repetitive":"পুনরাবৃত্তিমূলক","rephrase":"পুনরায় বলুন","replica":"প্রতিলিপি","replicate":"অনুকরণ করা","repurchase":"পুনরায় কেনা","reputable":"মর্যাদাপূর্ণ","requester":"অনুরোধকারী","rescind":"বাতিল করা","rescuer":"উদ্ধারকারী","reschedule":"সময় পুনর্নির্ধারণ করুন","rescheduled":"পুনর্নির্ধারিত","residence":"বাসভবন","residential":"আবাসিক","resilience":"স্থিতিস্থাপকতা","resistant":"প্রতিরোধী","resolute":"দৃঢ়","respective":"স্ব স্ব","restitution":"পুনরুদ্ধার","restrict":"সীমাবদ্ধ করা","retail":"খুচরা","retain":"ধরে রাখা","retention":"ধরে রাখা","rethink":"পুনর্বিবেচনা করা","retreat":"ছুটির স্থান","retrospect":"অতীত মূল্যায়ন","reveal":"প্রকাশ করা","revelation":"রহস্যোদ্ঘাটন","revision":"সংশোধন","revival":"পুনরুজ্জীবন","revoke":"বাতিল করা","rewrite":"পুনরায় লেখা","rigid":"কঠোর","rigorous":"কঠোর","ring":"রিং","rising":"ক্রমবর্ধমান","roadway":"সড়ক","roam":"ঘুরে বেড়ানো","robust":"শক্তিশালী","rooftop":"ছাদ","root":"মূল","route":"পথ","routine":"নিয়মিত কাজ","rubric":"রুব্রিক","ruin":"ধ্বংস করা","ruling":"সিদ্ধান্ত","runner":"রানার","safeguard":"নিরাপত্তা সুরক্ষা","safest":"সবচেয়ে নিরাপদ","safeties":"নিরাপত্তাসমূহ","sample":"নমুনা","sanction":"অনুমোদন","sanitary":"স্যানিটারি","sanitation":"পয়ঃনিষ্কাশন","satisfying":"সন্তোষজনক","saver":"সঞ্চয়কারী","scaffold":"ভারা","scaffolding":"মাচা বাঁধা","scalable":"প্রসারণযোগ্য","scan":"স্ক্যান করুন","scanned":"স্ক্যানকৃত","scholar":"পণ্ডিত","scholarship":"বৃত্তি","scientific":"বৈজ্ঞানিক","scooter":"স্কুটার","scorecard":"স্কোরকার্ড","scrub":"ঘষে পরিষ্কার করা","seamless":"নির্বিঘ্ন","secondary":"মাধ্যমিক","secrecy":"গোপনীয়তা","securely":"নিরাপদে","securities":"সিকিউরিটিজ","segment":"অংশ","selectively":"বেছে বেছে","semester":"সেমিস্টার","seminar":"সেমিনার","sendoff":"বিদায়","sensation":"অনুভূতি","sensing":"উপলব্ধি","sensitive":"সংবেদনশীল","sentiment":"মনোভাব","sequence":"ক্রম","serene":"প্রশান্ত","serial":"ধারাবাহিক","settling":"নিষ্পত্তি করা","setup":"সেটআপ","severely":"গুরুতরভাবে","sewing":"সেলাই","shade":"ছায়া","shake":"ঝাঁকানো","shallow":"অগভীর","shape":"আকার","shaping":"গঠন করা","shareholder":"শেয়ারহোল্ডার","shareholding":"শেয়ার ধারণ","sharp":"ধারালো","sheet":"শীট","shelter":"আশ্রয়","shield":"ঢাল","shine":"উজ্জ্বলতা","shipment":"চালান","shock":"শক","shop":"দোকান","shopper":"ক্রেতা","shortage":"ঘাটতি","shortcut":"শর্টকাট","shortfall":"ঘাটতি","shoulder":"কাঁধ","shounak":"শৌনক","shuttle":"শাটল","sibling":"ভাইবোন","sick":"অসুস্থ","sickness":"অসুস্থতা","sidewalk":"ফুটপাথ","signal":"সংকেত","signature":"স্বাক্ষর","significance":"গুরুত্ব","signoff":"সাইন-অফ","simulate":"অনুকরণ করা","simulation":"সিমুলেশন","simultaneously":"একই সাথে","sincere":"আন্তরিক","sincerely":"বিনীত","sister":"বোন","sit":"বসুন","situated":"অবস্থিত","situation":"পরিস্থিতি","sketch":"স্কেচ","slated":"ধার্যকৃত","sliding":"স্লাইডিং","slight":"সামান্য","slightly":"সামান্য","slip":"স্লিপ","slogan":"স্লোগান","smooth":"মসৃণ","smoothly":"স্বাচ্ছন্দ্যে","snap":"স্ন্যাপ","snapshot":"স্ন্যাপশট","soak":"ভেজা","social":"সামাজিক","socialize":"সামাজিকীকরণ","soft":"নরম","software":"সফটওয়্যার","soil":"মাটি","solar":"সৌর","sole":"একমাত্র","solely":"কেবলমাত্র","solid":"কঠিন","solo":"একক","soundproof":"শব্দরোধী","spark":"স্ফুলিঙ্গ","specialty":"বিশেষত্ব","specify":"নির্দিষ্ট করুন","specifying":"নির্দিষ্ট করা","specimen":"নমুনা","spectator":"দর্শক","spectrum":"বর্ণালী","speedometer":"স্পিডোমিটার","spiral":"সর্পিল","splendid":"চমৎকার","sponsor":"পৃষ্ঠপোষক","sponsorship":"পৃষ্ঠপোষকতা","spotless":"দাগহীন","spout":"নলমুখ","spring":"বসন্ত","sprinkler":"ছিটানো স্প্রিংকলার","stability":"স্থায়িত্ব","stabilize":"স্থিতিশীল করা","stable":"স্থিতিশীল","staircase":"সিঁড়ি","stairs":"সিঁড়িসমূহ","stalwart":"দৃঢ়","stamp":"স্ট্যাম্প","stance":"অবস্থান","standardize":"মানসম্মত করুন","standby":"স্ট্যান্ডবাই","standing":"অবস্থান","standout":"অসাধারণ","staple":"প্রধান","starter":"স্টার্টার","stationary":"স্থির","stationery":"স্টেশনারি","statistics":"পরিসংখ্যান","statute":"আইন","statutory":"সংবিধিবদ্ধ","steady":"ধারাবাহিক","steam":"বাষ্প","steel":"ইস্পাত","stellar":"চমৎকার","sterilize":"জীবাণুমুক্ত করা","steward":"তত্ত্বাবধায়ক","stewardship":"দায়িত্ব পালন","stimulate":"উদ্বুদ্ধ করা","stipend":"ভাতা","stipulate":"শর্ত দেওয়া","stock":"মজুদ","storm":"ঝড়","straightforward":"সহজ ও স্পষ্ট","strand":"সুতো","strategic":"কৌশলগত","strategy":"কৌশল","strength":"শক্তি","strengthen":"শক্তিশালী করা","stress":"চাপ","stretch":"প্রসারিত করা","strike":"ধর্মঘট","stringent":"কঠোর","structural":"কাঠামোগত","structure":"কাঠামো","struggle":"সংগ্রাম","studious":"অধ্যবসায়ী","stump":"স্টাম্প","stylish":"আড়ম্বরপূর্ণ","subcontract":"উপ-চুক্তি","subcontractor":"সাব-কন্ট্রাক্টর","subdivision":"উপ-বিভাগ","subjected":"অধীনস্থ","sublease":"উপ-ভাড়া","subscriber":"গ্রাহক","subscription":"সাবস্ক্রিপশন","subsequent":"পরবর্তী","subsidiary":"সহায়ক","subsidize":"ভর্তুকি দেওয়া","subsidy":"ভর্তুকি","substance":"পদার্থ","substandard":"নিম্নমানের","substantial":"যথেষ্ট","substation":"সাবস্টেশন","substitute":"বিকল্প","substitution":"প্রতিস্থাপন","suburb":"উপশহর","suburban":"উপশহুরে","succeed":"সফল হওয়া","succession":"পরম্পরা","successive":"পরপর","sudden":"হঠাৎ","sufficient":"পর্যাপ্ত","suffice":"যথেষ্ট হওয়া","suite":"স্যুট","sum":"মোট","superintendent":"তত্ত্বাবধায়ক","superior":"উচ্চতর","supervision":"তত্ত্বাবধান","supervisor":"সুপারভাইজার","supplement":"পরিপূরক","supplementary":"অতিরিক্ত","surface":"পৃষ্ঠতল","surplus":"উদ্বৃত্ত","surveillance":"নজরদারি","sustainable":"টেকসই","symposium":"সিম্পোজিয়াম","sync":"সিঙ্ক","synchronize":"সিঙ্ক্রোনাইজ করা","synergy":"সম্মিলিত শক্তি","synthetic":"সিন্থেটিক","systematic":"নিয়মতান্ত্রিক","tackle":"মোকাবিলা করা","tactical":"কৌশলগত","tag":"ট্যাগ","tailored":"উপযোগী","tank":"ট্যাঙ্ক","tariff":"ট্যারিফ","tarmac":"টারম্যাক","tax":"ট্যাক্স","taxation":"কর ব্যবস্থা","taxes":"ট্যাক্সসমূহ","telecom":"টেলিকম","telecommunication":"টেলিযোগাযোগ","telephone":"টেলিফোন","temperature":"তাপমাত্রা","template":"টেমপ্লেট","tenant":"ভাড়াটে","tender":"দরপত্র","tenure":"মেয়াদ","terminal":"টার্মিনাল","termination":"সমাপ্তি","territory":"অঞ্চল","testament":"সাক্ষ্য","testimonial":"প্রশংসাপত্র","theft":"চুরি","theory":"তত্ত্ব","thermal":"তাপীয়","thermometer":"থার্মোমিটার","thermostat":"থার্মোস্ট্যাট","thick":"পুরু","thickness":"পুরুত্ব","thorough":"পুঙ্খানুপুঙ্খ","thoroughly":"সম্পূর্ণরূপে","thousand":"হাজার","thousands":"হাজার হাজার","threat":"হুমকি","threshold":"সীমা","thrive":"উন্নতি করা","tier":"স্তর","tiered":"স্তরভিত্তিক","timeframe":"সময়সীমা","timestamp":"টাইমস্ট্যাম্প","tipoff":"গোপন তথ্য","tire":"টায়ার","tires":"টায়ারসমূহ","token":"টোকেন","tolerance":"সহনশীলতা","toll":"টোল","ton":"টন","tone":"স্বর","topmost":"সর্বোচ্চ","torrent":"প্রবল ধারা","totaling":"মোট","tough":"কঠিন","tour":"ভ্রমণ","towel":"তোয়ালে","towels":"তোয়ালেসমূহ","toxic":"বিষাক্ত","trace":"চিহ্ন","tracker":"ট্র্যাকার","trademark":"ট্রেডমার্ক","traditional":"ঐতিহ্যবাহী","trainee":"প্রশিক্ষণার্থী","transaction":"লেনদেন","transactions":"লেনদেনসমূহ","transformative":"রূপান্তরমূলক","transit":"ট্রানজিট","transparency":"স্বচ্ছতা","tray":"ট্রে","treaty":"চুক্তি","trek":"ভ্রমণ","trend":"প্রবণতা","trends":"প্রবণতাসমূহ","trial":"ট্রায়াল","triangle":"ত্রিভুজ","tribunal":"ট্রাইব্যুনাল","triggering":"ট্রিগার করছে","trim":"ছাঁটাই","triumph":"বিজয়","trouble":"সমস্যা","truck":"ট্রাক","trustee":"ট্রাস্টি","trustworthy":"বিশ্বস্ত","tub":"টাব","tube":"টিউব","turn":"বাঁক","turnaround":"টার্নঅ্যারাউন্ড","tutorial":"টিউটোরিয়াল","twice":"দুইবার","unanimous":"সর্বসম্মত","unattended":"অনবধান","unauthorized":"অননুমোদিত","unbiased":"নিরপেক্ষ","unbroken":"অটুট","unbundle":"আলাদা করা","uncertain":"অনিশ্চিত","unchanged":"অপরিবর্তিত","unconditional":"শর্তহীন","undergo":"অতিক্রম করা","underground":"ভূগর্ভস্থ","underlying":"অন্তর্নিহিত","undermine":"ক্ষতিগ্রস্ত করা","understandable":"বোধগম্য","undertake":"দায়িত্ব নেওয়া","undertaken":"গৃহীত","undertaking":"উদ্যোগ","undisputed":"অনস্বীকার্য","undue":"অযথা","uneasy":"অস্বস্তিকর","unemployment":"বেকারত্ব","unequal":"অসমান","uneven":"অসম","unexpected":"অপ্রত্যাশিত","unfair":"অন্যায়","unfold":"উন্মোচিত হওয়া","unforeseen":"অপ্রত্যাশিত","unfortunate":"দুর্ভাগ্যজনক","unfounded":"ভিত্তিহীন","unfriendly":"বন্ধুত্বহীন","uniformity":"একমুখিতা","unilateral":"একতরফা","uninsured":"বীমাহীন","uninterrupted":"নিরবচ্ছিন্ন","unique":"অনন্য","unlimited":"সীমাহীন","unlocking":"আনলক করা","unmatched":"অনুপম","unnoticed":"অলক্ষিত","unoccupied":"খালি","unprecedented":"নজিরবিহীন","unpredictable":"অনিশ্চিত","unravel":"উন্মোচন করা","unregulated":"অনিয়ন্ত্রিত","unrelated":"সম্পর্কহীন","unreliable":"অবিশ্বস্ত","unresponsive":"সাড়াহীন","unrestricted":"অবাধ","unruly":"উচ্ছৃঙ্খল","unsafe":"অনিরাপদ","unsatisfactory":"অসন্তোষজনক","unseen":"অদেখা","unskilled":"অদক্ষ","unstable":"অস্থিতিশীল","unsuitable":"অনুপযুক্ত","untested":"অপরীক্ষিত","untimely":"অসময়ে","untouched":"অস্পর্শিত","untrue":"অসত্য","unused":"অব্যবহৃত","unusual":"অস্বাভাবিক","unwarranted":"অনাবশ্যক","unwelcome":"অনাকাঙ্ক্ষিত","upbringing":"লালন-পালন","upcoming":"আসন্ন","updraft":"ঊর্ধ্বপ্রবাহ","updateable":"আপডেটযোগ্য","upgrading":"আপগ্রেড করা","upheaval":"বিপ্লব","uphold":"বজায় রাখা","upload":"আপলোড","uploaded":"আপলোডকৃত","upper":"উপরের","uppermost":"শীর্ষতম","upright":"খাড়া","uprising":"বিদ্রোহ","upset":"বিচলিত","upshot":"ফলাফল","upskill":"দক্ষতা বৃদ্ধি","upskilling":"দক্ষতা বৃদ্ধি","upsurge":"বৃদ্ধি","uptake":"গ্রহণ","uptick":"সামান্য বৃদ্ধি","upto":"পর্যন্ত","upward":"ঊর্ধ্বমুখী","urgency":"জরুরিতা","usable":"ব্যবহারযোগ্য","usage":"ব্যবহার","usher":"পথ দেখানো","utilitarian":"ব্যবহারিক","utility":"উপযোগিতা","utilize":"ব্যবহার করুন","utilized":"ব্যবহৃত","utilizing":"ব্যবহার করছে","vacant":"খালি","vacate":"খালি করা","vacation":"ছুটি","vacuum":"ভ্যাকুয়াম","vapor":"বাষ্প","variable":"পরিবর্তনশীল","variation":"বৈচিত্র্য","varied":"নানান","variety":"বিভিন্নতা","various":"বিভিন্ন","vary":"ভিন্ন হওয়া","vast":"বিস্তীর্ণ","vector":"ভেক্টর","veil":"পর্দা","velocity":"গতিবেগ","vendor":"বিক্রেতা","vendors":"বিক্রেতারা","ventilate":"বায়ু চলাচল","ventilation":"বায়ুচলাচল","venture":"উদ্যোগ","venue":"ঘটনাস্থল","verbal":"মৌখিক","versatile":"বহুমুখী","version":"সংস্করণ","vertical":"উল্লম্ব","vessel":"পাত্র","veteran":"প্রবীণ কর্মী","viable":"কার্যকরী","vibrant":"প্রাণবন্ত","vibrate":"কম্পিত হওয়া","vibration":"কম্পন","vicinity":"আশেপাশে","victim":"ভিকটিম","victorious":"বিজয়ী","video":"ভিডিও","viewpoint":"দৃষ্টিকোণ","vigor":"শক্তি","vigorous":"তীব্র","village":"গ্রাম","villagers":"গ্রামবাসীরা","vintage":"ভিন্টেজ","viral":"ভাইরাল","virtual":"ভার্চুয়াল","virtue":"গুণ","visibility":"দৃশ্যমানতা","vision":"দৃষ্টিভঙ্গি","visitor":"দর্শনার্থী","visitors":"দর্শনার্থীরা","vital":"অত্যাবশ্যকীয়","vivid":"প্রাণবন্ত","vocal":"কণ্ঠ","vocational":"বৃত্তিমূলক","voiceover":"ভয়েসওভার","void":"বাতিল","volatile":"উদ্বায়ী","volatility":"অস্থিরতা","voltage":"ভোল্টেজ","volunteer":"স্বেচ্ছাসেবক","volunteering":"স্বেচ্ছাসেবা","volunteers":"স্বেচ্ছাসেবকরা","voter":"ভোটার","voters":"ভোটাররা","vow":"শপথ","vulnerable":"ঝুঁকিপূর্ণ","waiver":"অব্যাহতি","walk":"হাঁটা","walker":"ওয়াকার","walkthrough":"ওয়াকথ্রু","warehouse":"গুদাম","watch":"ঘড়ি","watcher":"পর্যবেক্ষক","watchman":"পাহারাদার","waterproof":"জলরোধী","wave":"ঢেউ","wealth":"সম্পদ","weapon":"অস্ত্র","wear":"পরিধান","wearable":"পরিধানযোগ্য","wearing":"পরা","weather":"আবহাওয়া","web":"ওয়েব","weekday":"কাজের দিন","weight":"ওজন","weights":"ওজনসমূহ","welder":"ওয়েল্ডার","wellbeing":"সুস্থতা","wheel":"চাকা","wheels":"চাকাসমূহ","whereby":"যার মাধ্যমে","whichever":"যেটিই","whilst":"যখন","whisper":"ফিসফিস","whistle":"বাঁশি","whistleblower":"হুইসেলব্লোয়ার","white":"সাদা","whoever":"যে কেউ","wholesale":"পাইকারি","wholesome":"স্বাস্থ্যকর","widely":"ব্যাপকভাবে","widespread":"বিস্তৃত","width":"প্রস্থ","willing":"ইচ্ছুক","win":"জয়","wind":"বাতাস","wipe":"মোছা","wisdom":"প্রজ্ঞা","withstand":"সহ্য করা","witness":"সাক্ষী","witnessed":"সাক্ষ্য দেওয়া হয়েছে","witty":"রসিক","wizard":"উইজার্ড","woman":"মহিলা","women":"মহিলারা","woodwork":"কাঠের কাজ","workbench":"কাজের টেবিল","workday":"কাজের দিন","workload":"কাজের চাপ","workman":"কারিগর","workmanship":"দক্ষ কাজ","workstation":"ওয়ার্কস্টেশন","worthy":"যোগ্য","wrist":"কব্জি","wrong":"ভুল","wrongful":"অন্যায়","yard":"উঠান","youth":"যুবসমাজ","zeal":"উৎসাহ","zip":"জিপ","zipper":"জিপার","designed":"পরিকল্পিত","detected":"শনাক্ত করা হয়েছে","devendra":"দেবেন্দ্র","diagnostics":"ডায়াগনস্টিকস","dignity":"মর্যাদা","disbursed":"বিতরণ করা হয়েছে","disbursement":"বিতরণ","discover":"আবিষ্কার করুন","discrepancy":"অমিল","docs":"নথিপত্র","document":"নথি","dog":"কুকুর","doing":"করছে","door":"দরজা","drainage":"নিষ্কাশন ব্যবস্থা","each":"প্রতিটি","ease":"স্বাচ্ছন্দ্য","effortless":"সহজ","elder":"প্রবীণ","elected":"নির্বাচিত","emergencies":"জরুরি অবস্থাসমূহ","en":"ইংরেজি","english":"ইংরেজি","enroll":"তালিকাভুক্ত করুন","ensure":"নিশ্চিত করুন","establish":"প্রতিষ্ঠা করুন","exactly":"হুবহু","exhibition":"প্রদর্শনী","explicitly":"সুনির্দিষ্টভাবে","fabrication":"ফ্যাব্রিকেশন","facilitates":"সহজ করে","fairly":"ন্যায্যভাবে","favorite":"পছন্দের","fill":"পূরণ করুন","finally":"অবশেষে","finance":"অর্থায়ন","finder":"অনুসন্ধানকারী","fitters":"ফিটাররা","fixes":"সমাধানসমূহ","floors":"মেঝেগুলি","flourishing":"বিকাশমান","following":"নিম্নলিখিত","forgot":"ভুলে গেছেন","founded":"প্রতিষ্ঠিত","founder":"প্রতিষ্ঠাতা","frequency":"ফ্রিকোয়েন্সি","friendly":"বান্ধব","from":"থেকে","fulfilled":"সম্পন্ন হয়েছে","fumigation":"ফিউমিগেশন","funded":"অর্থায়িত","gadget":"গ্যাজেট","gh":"জিএইচ","golden":"সোনালী","got":"পেয়েছে","govt":"সরকারি","gp":"জিপি","grants":"অনুদানসমূহ","greener":"সবুজতর","grooming":"গ্রুমিং","grouped":"গ্রুপভুক্ত","gstin":"জিএসটিআইএন","guarding":"পাহারা দেওয়া","guesswork":"অনুমাননির্ভরতা","guest":"অতিথি","guild":"গিল্ড","hauz":"হৌজ","hazardous":"ঝুঁকিপূর্ণ","hidden":"লুকানো","highly":"অত্যন্ত","hills":"পাহাড়সমূহ","hospitality":"আতিথেয়তা","hq":"সদর দপ্তর","hubs":"হাবসমূহ","hustle":"উদ্যোগ","hvac":"এইচভিএসি","ig":"আইজি","incur":"ব্যয় বহন করা","independence":"স্বাধীনতা","independent":"স্বাধীন","indiranagar":"ইন্দিরানগর","injuries":"আঘাতসমূহ","instruments":"যন্ত্রপাতি","interest":"সুদ","intervention":"হস্তক্ষেপ","involved":"যুক্ত","iyer":"আইয়ার","jayanagar":"জয়ানগর","joshi":"জোশী","jpg":"জেপিজি","jubilee":"জয়ন্তী","kabir":"কবীর","kapoor":"কাপুর","karan":"করণ","kb":"কেবি","khan":"খান","khas":"খাস","kol":"কোল","kothrud":"কোথরুড","kulkarni":"কুলকার্নি","like":"পছন্দ","lineage":"বংশতালিকা","lined":"রেখাঙ্কিত","linkage":"সংযোগ","lodge":"দায়ের করুন","longer":"দীর্ঘতর","lowest":"সর্বনিম্ন","maid":"গৃহপরিচারিকা","man":"মানুষ","many":"অনেক","markup":"মার্কআপ","matrix":"ম্যাট্রিক্স","mb":"এমবি","men":"পুরুষরা","mentorship":"পরামর্শদান","mishap":"দুর্ঘটনা","moscow":"মস্কো","much":"অনেক","namely":"যথা","navigator":"ন্যাভিগেটর","nearest":"নিকটতম","neatly":"পরিচ্ছন্নভাবে","neon":"নিয়ন","neutrality":"নিরপেক্ষতা","nights":"রাতসমূহ","non":"অ-","notch":"মান","noticed":"লক্ষ্য করা হয়েছে","notices":"বিজ্ঞপ্তিসমূহ","numerous":"অসংখ্য","occur":"ঘটা","office":"অফিস","once":"একবার","opaque":"অস্বচ্ছ","operates":"পরিচালনা করে","opinion":"মতামত","oppose":"বিরোধিতা করা","ordered":"অর্ডারকৃত","ordinarily":"সাধারণত","org":"সংগঠন","otherwise":"অন্যথায়","outreach":"জনসংযোগ","outside":"বাইরে","overall":"সামগ্রিক","participants":"অংশগ্রহণকারীরা","pattern":"প্যাটার্ন","peer":"সহকর্মী","penalties":"জরিমানাসমূহ","people":"মানুষ","picture":"ছবি","plaza":"প্লাজা","predicted":"পূর্বাভাসকৃত","premise":"চত্বর","radiator":"রেডিয়েটর","raj":"রাজ","rakesh":"রাকেশ","ram":"রাম","world":"বিশ্ব","kumar":"কুমার","kunal":"কুণাল","kyc":"কেওয়াইসি","labor":"শ্রমিক","lake":"লেক","lifestyle":"জীবনধারা","lifting":"তোলা","little":"ছোট","locally":"স্থানীয়ভাবে","logistics":"রসদ","looking":"খুঁজছে","love":"ভালোবাসা","loved":"পছন্দের","loves":"পছন্দ করে","machinery":"যন্ত্রপাতি","made":"তৈরি","makeup":"মেকআপ","malhotra":"মালহোত্রা","malls":"মলসমূহ","manage":"পরিচালনা করুন","manually":"ম্যানুয়ালি","margins":"মার্জিন","massages":"ম্যাসাজসমূহ","matcher":"ম্যাচার","mediated":"মধ্যস্থতাকৃত","meera":"মীরা","meet":"দেখা করুন","mehta":"মেহতা","mentoring":"মেন্টরিং","messy":"এলোমেলো","metropolitan":"মহানগরীয়","mind":"মন","misconduct":"অসদাচরণ","modest":"বিনয়ী","monopolization":"একচেটিয়াকরণ","moved":"স্থানান্তরিত","musical":"সঙ্গীত","mutually":"পারস্পরিকভাবে","naina":"নায়না","nair":"নায়ার","ncr":"এনসিআর","never":"কখনই না","nk":"এনকে","ones":"গুলি","operating":"পরিচালনা করছে","optimization":"অনুকূলকরণ","optional":"ঐচ্ছিক","organising":"সংগঠিত করা","otp":"ওটিপি","outline":"রূপরেখা","oversee":"তত্ত্বাবধান করা","own":"নিজের","packaged":"প্যাকেজকৃত","parcel":"পার্সেল","parents":"অভিভাবক","party":"পার্টি","path":"পথ","pdf":"পিডিএফ","peace":"শান্তি","peers":"সহকর্মীরা","pets":"পোষা প্রাণী","picks":"বেছে নেয়","pitch":"প্রস্তাব","pk":"পিকে","plant":"উদ্ভিদ","platforms":"প্ল্যাটফর্মসমূহ","png":"পিএনজি","polite":"ভদ্র","pooja":"পূজা","pre":"প্রাক","prep":"প্রস্তুতি","print":"প্রিন্ট","priya":"প্রিয়া","profiling":"প্রোফাইলিং","proof":"প্রমাণ","provides":"প্রদান করে","pumps":"পাম্পসমূহ","put":"রাখুন","qualifications":"যোগ্যতাসমূহ","quoted":"উদ্ধৃত","ramesh":"রমেশ","re":"পুনরায়","reallocations":"সম্পদ পুনর্বণ্টন","rebalance":"পুনর্বার ভারসাম্য রক্ষা","rebalancing":"পুনঃভারসাম্য","recovery":"পুনরুদ্ধার","recurrence":"পুনরাবৃত্তি","recurring":"পুনরাবৃত্তিমূলক","reddy":"রেড্ডি","ref":"রেফারেন্স","refrigeration":"রেফ্রিজারেশন","reg":"নিবন্ধন","regional":"আঞ্চলিক","replies":"উত্তরসমূহ","req":"রিকুইজিশন","resorts":"রিসর্টসমূহ","respectful":"শ্রদ্ধাশীল","respects":"শ্রদ্ধা জানায়","restaurant":"রেস্তোরাঁ","restored":"পুনরুদ্ধারকৃত","restructure":"পুনর্গঠন করা","resubmit":"পুনরায় জমা দিন","retailers":"খুচরা বিক্রেতারা","retainer":"রিটেইনার","rewards":"পুরস্কারসমূহ","ro":"আরও (পানি শোধক)","satisfy":"সন্তুষ্ট করা","scam":"প্রতারণা","sectors":"সেক্টরসমূহ","seeking":"খুঁজছে","seniority":"জ্যেষ্ঠতা","sensors":"সেন্সরসমূহ","sentiments":"অনুভূতিসমূহ","shareholders":"শেয়ারহোল্ডাররা","sharma":"শর্মা","sharmaji":"শর্মাজী","sheets":"শীটসমূহ","shipped":"প্রেরিত","signatures":"স্বাক্ষরসমূহ","simplified":"সহজীকৃত","singh":"সিংহ","sites":"সাইটসমূহ","specialties":"বিশেষত্বসমূহ","specs":"স্পেসিফিকেশন","spill":"ছড়িয়ে পড়া","sprint":"স্প্রিন্ট","src":"উৎস","stages":"পর্যায়সমূহ","stamps":"স্ট্যাম্পসমূহ","startups":"স্টার্টআপসমূহ","stats":"পরিসংখ্যান","statuses":"অবস্থাসমূহ","stocks":"স্টকসমূহ","str":"স্ট্রিং","streamlining":"সহজতর করা","suites":"স্যুটসমূহ","sunita":"সুনীতা","super":"সুপার","tagline":"ট্যাগলাইন","tags":"ট্যাগসমূহ","tailoring":"দর্জির কাজ","technologies":"প্রযুক্তিসমূহ","temp":"অস্থায়ী","tenants":"ভাড়াটিয়ারা","tenders":"দরপত্রসমূহ","testing":"টেস্টিং","th":"তম","themes":"থিমসমূহ","therapies":"থেরাপিসমূহ","throughput":"থ্রুপুট","tidy":"পরিচ্ছন্ন","titled":"শিরোনামযুক্ত","toggle":"টগল","tokenization":"টোকেনাইজেশন","toolkits":"টুলকিটসমূহ","trackers":"ট্র্যাকারসমূহ","traders":"ব্যবসায়ীরা","transact":"লেনদেন করা","transitioning":"রূপান্তরিত হচ্ছে","translating":"অনুবাদ করছে","tutorials":"টিউটোরিয়ালসমূহ","tweaks":"ছোটখাটো পরিবর্তন","undefined":"অসংজ্ঞায়িত","unregistered":"অনিবন্ধিত","up":"উপরে","uptime":"চালু সময়","utf":"ইউটিএফ","validates":"যাচাই করে","var":"ভেরিয়েবল","variance":"পার্থক্য","varma":"ভার্মা","ventures":"উদ্যোগসমূহ","vikram":"বিক্রম","visas":"ভিসাসমূহ","vitality":"প্রাণশক্তি","warns":"সতর্ক করে","waste":"বর্জ্য","waterproofed":"জলরোধী করা হয়েছে","weren":"ছিল না","widths":"প্রস্থসমূহ","withdrawals":"উত্তোলনসমূহ","woodworking":"কাঠের কাজ","workspaces":"ওয়ার্কস্পেসসমূহ","yesterdays":"অতীতের দিনসমূহ","retirement":"অবসর","retriever":"রিট্রিভার","rohan":"রোহন","rosters":"রোস্টারসমূহ","rotation":"ঘূর্ণন","roy":"রায়","run":"চালান","safeguards":"সুরক্ষা ব্যবস্থাসমূহ","safely":"নিরাপদে","sathi":"সাথী","schedules":"সময়সূচীসমূহ","scheme":"পরিকল্পনা","schemes":"পরিকল্পনাসমূহ","scholastic":"শিক্ষামূলক","science":"বিজ্ঞান","scoring":"স্কোরিং","scratch":"স্ক্র্যাচ","seasonal":"মৌসুমি","sells":"বিক্রি করে","sen":"সেন","serving":"পরিষেবা দিচ্ছে","shah":"শাহ","shifts":"শিফটসমূহ","sitting":"বসা","sneha":"স্নেহা","solved":"সমাধানকৃত","speaks":"কথা বলে","specialization":"বিশেষত্ব","specialized":"বিশেষায়িত","spending":"ব্যয়","sr":"সিনিয়র","ssc":"এসএসসি","staffing":"কর্মী নিয়োগ","staging":"স্টেজ স্থাপন","stays":"থাকে","stem":"স্টেম","structured":"কাঠামোগত","styling":"স্টাইলিং","stylist":"স্টাইলিস্ট","subhashish":"শুভাশীষ","subtotal":"উপ-মোট","such":"এমন","sundaram":"সুন্দরম","supporting":"সমর্থন করছে","surge":"বৃদ্ধি","surprises":"বিস্ময়","syndicates":"সিন্ডিকেটসমূহ","tamper":"হস্তক্ষেপ","teams":"দলসমূহ","templates":"টেমপ্লেটসমূহ","terrace":"ছাদ","therapeutic":"থেরাপিউটিক","tooling":"টুলিং","trainers":"প্রশিক্ষকরা","transformed":"রূপান্তরিত","travel":"ভ্রমণ","troubles":"সমস্যাসমূহ","undergoes":"অতিক্রম করে","underpayment":"কম বেতন","understands":"বোঝে","urban":"শহুরে","verifies":"যাচাই করে","verma":"ভার্মা","vetted":"যাচাইকৃত","vikramaditya":"বিক্রমাদিত্য","walking":"হাঁটা","walks":"হাঁটে","wardrobe":"ওয়ারড্রোব","wardrobes":"ওয়ারড্রোবসমূহ","warm":"উষ্ণ","washers":"ওয়াশারসমূহ","weighted":"ভারযুক্ত","welding":"ওয়েল্ডিং","wheeler":"হুইলার","whether":"কিনা","worksite":"কর্মস্থল"}
  };

  function translateRemainingEnglish(text, lang) {
    if (!text || typeof text !== 'string' || lang === 'en') return text;
    const words = WORD_LEXICON[lang] || {};
    return text.replace(/[a-zA-Z]+/g, (match) => {
      const lower = match.toLowerCase();
      if (words[lower] !== undefined && words[lower] !== '') {
        return words[lower];
      }
      return match;
    });
  }

  // Universal text & chat translation helper
  function translateChatText(text, lang = currentLang) {
    if (!text || typeof text !== 'string' || lang === 'en') return text;
    const trimmed = text.trim();
    const dict = PHRASE_MAP[lang] || {};
    const lowerDict = LOWER_MAP[lang] || {};

    // 1. Direct exact lookup
    if (dict[trimmed]) return text.replace(trimmed, dict[trimmed]);
    if (lowerDict[trimmed.toLowerCase()]) return text.replace(trimmed, lowerDict[trimmed.toLowerCase()]);

    // 2. Normalized whitespace lookup
    const normalized = trimmed.replace(/s+/g, ' ');
    if (dict[normalized]) return text.replace(trimmed, dict[normalized]);
    if (lowerDict[normalized.toLowerCase()]) return text.replace(trimmed, lowerDict[normalized.toLowerCase()]);

    // 3. Dynamic regex pattern translation
    let result = translatePatterns(trimmed, lang);
    if (result !== trimmed) return text.replace(trimmed, result);

    // 4. Conversational Chat Phrase & Sentence Translator
    result = translateChatPhrases(trimmed, lang);
    if (result !== trimmed) return text.replace(trimmed, result);

    // 5. Word-by-word token translator for 100% full coverage
    return translateRemainingEnglish(text, lang);
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
          const rep = dict[original] || lowerDict[original.toLowerCase()] || translatePatterns(original, currentLang) || translateChatPhrases(original, currentLang) || translateRemainingEnglish(original, currentLang);
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
          const rep = dict[original] || lowerDict[original.toLowerCase()] || translatePatterns(original, currentLang) || translateChatPhrases(original, currentLang) || translateRemainingEnglish(original, currentLang);
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
            const rep = dict[origAria] || lowerDict[origAria.toLowerCase()] || translateChatPhrases(origAria, currentLang) || translateRemainingEnglish(origAria, currentLang);
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
          // Look up translation in multi-tier pipeline
          let replacement = dict[origText] || lowerDict[origText.toLowerCase()];
          if (!replacement) {
            const normalized = origText.replace(/s+/g, ' ');
            replacement = dict[normalized] || lowerDict[normalized.toLowerCase()];
          }
          if (!replacement) {
            // Check dynamic regex patterns
            const patterned = translatePatterns(origText, currentLang);
            if (patterned !== origText) {
              replacement = patterned;
            }
          }
          if (!replacement) {
            // Check conversational phrases & terms
            const phrased = translateChatPhrases(origText, currentLang);
            if (phrased !== origText) {
              replacement = phrased;
            }
          }
          if (!replacement) {
            // Fallback word-level replacement for 100% complete translation coverage
            const wordTr = translateRemainingEnglish(origText, currentLang);
            if (wordTr !== origText) {
              replacement = wordTr;
            }
          }

          if (replacement && trimmed !== replacement) {
            const leadingSpace = raw.match(/^\s*/)[0];
            const trailingSpace = raw.match(/\s*$/)[0];
            node.nodeValue = leadingSpace + replacement + trailingSpace;
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
    const lang = SUPPORTED_LANGS[currentLang] || SUPPORTED_LANGS.en;
    const activeText = lang.native !== 'Default' ? lang.native : lang.name;
    return `
      <div class="lang-selector-wrap">
        <button type="button" class="lang-selector-btn" aria-expanded="false" aria-haspopup="true" title="Select Language">
          <span class="lang-globe-icon">🌐</span>
          <span class="lang-active-label">${activeText}</span>
          <span class="lang-chevron">▾</span>
        </button>
        <div class="lang-dropdown-menu" role="menu">
          <button type="button" class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
            <span class="lang-flag">🇬🇧</span>
            <span class="lang-name">English</span>
            <span class="lang-native">Default</span>
          </button>
          <button type="button" class="lang-option ${currentLang === 'hi' ? 'active' : ''}" data-lang="hi">
            <span class="lang-flag">🇮🇳</span>
            <span class="lang-name">हिन्दी</span>
            <span class="lang-native">Hindi</span>
          </button>
          <button type="button" class="lang-option ${currentLang === 'bn' ? 'active' : ''}" data-lang="bn">
            <span class="lang-flag">🇮🇳</span>
            <span class="lang-name">বাংলা</span>
            <span class="lang-native">Bengali</span>
          </button>
        </div>
      </div>
    `;
  }

  function mountLanguageSelector() {
    let mounts = Array.from(document.querySelectorAll('#lang-selector-mount, .lang-mount-container'));
    if (mounts.length === 0) {
      const navActions = document.querySelector('.nav-actions, .biz-nav-actions, .worker-nav-right, .admin-nav-actions, .auth-topbar, .auth-nav-right, .terms-topbar');
      if (navActions) {
        const targetSibling = navActions.querySelector('.help-link, .profile-nav-wrap, .btn-biz-logout, #btn-worker-logout, .btn-hub-logout, .back-link, #nav-guest-btn, .back-button');
        const container = document.createElement('div');
        container.id = 'lang-selector-mount';
        container.className = 'lang-mount-container';
        if (targetSibling && targetSibling.parentNode) {
          targetSibling.parentNode.insertBefore(container, targetSibling);
        } else if (navActions) {
          navActions.appendChild(container);
        }
        mounts = [container];
      }
    }

    mounts.forEach(mount => {
      if (!mount.querySelector('.lang-selector-wrap')) {
        mount.innerHTML = renderLanguageSelector();
        attachSelectorEvents(mount);
      }
    });
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

  window.translateChatText = translateChatText;

  window.SevaSathiI18n = {
    setLanguage,
    getLanguage: () => currentLang,
    getSpeechCode: () => (SUPPORTED_LANGS[currentLang] || SUPPORTED_LANGS.en).speechCode,
    applyTranslations,
    mountLanguageSelector,
    translate: translateChatText,
    translateChatText,
    SUPPORTED_LANGS,
    PHRASE_MAP,
    WORD_LEXICON
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
