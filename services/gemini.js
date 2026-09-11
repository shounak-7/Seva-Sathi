/**
 * Gemini AI Service for Hustle
 * Powers AI Need Matching, Task Scope Enhancer, Price Advisory, and Semantic Search.
 * Supports Google Gemini 1.5/2.0 Flash with automatic fallback resilience.
 */

const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const DEFAULT_MODEL = 'gemini-1.5-flash';

// Service category mappings & market benchmark rates (in INR) across all 18 catalog trades
const CATEGORY_BENCHMARKS = {
  'Plumbing & Repairs': { min: 299, max: 799, avg: 450, unit: 'visit/job' },
  'Electrical & Wiring': { min: 299, max: 899, avg: 499, unit: 'visit/job' },
  'AC, Fridge & Appliance Repair': { min: 399, max: 1299, avg: 699, unit: 'service' },
  'Deep Cleaning & Sanitization': { min: 499, max: 2499, avg: 1199, unit: 'service' },
  'Carpentry & Woodwork': { min: 349, max: 1199, avg: 599, unit: 'job' },
  'Furniture Assembly & Handyman': { min: 299, max: 799, avg: 449, unit: 'visit/job' },
  'Wall Painting & Waterproofing': { min: 499, max: 3500, avg: 1499, unit: 'room/job' },
  'Pest Control': { min: 599, max: 1899, avg: 899, unit: 'treatment' },
  'Moving & Heavy Lifting': { min: 799, max: 4500, avg: 1999, unit: 'shift' },
  'Tutors & Skill Coaches': { min: 300, max: 900, avg: 500, unit: 'hr' },
  'Pet Care & Dog Walking': { min: 250, max: 700, avg: 400, unit: 'walk/day' },
  'Babysitting & Childcare': { min: 249, max: 799, avg: 399, unit: 'hr' },
  'Salon & Beauty at Home': { min: 399, max: 1599, avg: 799, unit: 'session' },
  'Spa, Massage & Grooming': { min: 699, max: 1999, avg: 1199, unit: 'session' },
  'Gardening & Lawn Care': { min: 300, max: 999, avg: 550, unit: 'visit' },
  'Garden & Plant Care': { min: 300, max: 999, avg: 550, unit: 'visit' },
  'Laptop & Wi-Fi Tech Support': { min: 349, max: 999, avg: 549, unit: 'visit/job' },
  'Yoga & Fitness Coaching': { min: 499, max: 1499, avg: 799, unit: 'session' },
  'Car & Two-Wheeler Care': { min: 399, max: 1299, avg: 599, unit: 'wash/service' },
  'Wardrobe & Home Organisation': { min: 499, max: 1499, avg: 799, unit: 'room/job' },
  'Senior Care & Assistance': { min: 349, max: 899, avg: 499, unit: 'visit/day' }
};

// High-performance In-Memory Cache for Instant AI Search & Matching
const aiCache = new Map();

/**
 * Normalizes Bengali (০-৯) and Hindi (०-९) Indic numerals to ASCII 0-9 digits
 */
function normalizeIndicDigits(str) {
  if (!str) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const hiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  let out = String(str);
  for (let i = 0; i <= 9; i++) {
    out = out.replace(new RegExp(bnDigits[i], 'g'), String(i));
    out = out.replace(new RegExp(hiDigits[i], 'g'), String(i));
  }
  return out;
}

function getCache(key) {
  const item = aiCache.get(key);
  if (item && item.expiry > Date.now()) return item.value;
  return null;
}

function setCache(key, value, ttlMs = 1000 * 60 * 30) {
  if (aiCache.size > 300) {
    const firstKey = aiCache.keys().next().value;
    aiCache.delete(firstKey);
  }
  aiCache.set(key, { value, expiry: Date.now() + ttlMs });
}

/**
 * Calls Gemini REST API using native Node.js https / fetch with fast timeout
 */
async function callGeminiApi(prompt, systemInstruction = null) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 800
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  if (typeof fetch === 'function') {
    const controller = new AbortController();
    // Optimized 4.5s timeout for reliable response while maintaining fallback resilience
    const timeout = setTimeout(() => controller.abort(), 4500);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!response.ok) {
        throw new Error(`Gemini API HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  }

  // Fallback to https request if fetch not present
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const req = https.request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 4500
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed?.candidates?.[0]?.content?.parts?.[0]?.text || null);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`Gemini API status ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API request timed out'));
    });
    req.write(postData);
    req.end();
  });
}

/**
 * Extracts and cleans JSON from Gemini markdown output (e.g. ```json ... ```)
 */
function cleanJsonOutput(raw) {
  if (!raw) return null;
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
  }
  return JSON.parse(cleaned);
}

/**
 * Intelligent Local Heuristic Fallback Engine
 * Guarantees zero downtime if external network is unavailable or rate-limited.
 * Supports colloquial symptom and problem matching in English, Bengali, and Hindi.
 */
function heuristicDiagnose(userInput, city = 'Local Area', localPricing = null) {
  const normInput = normalizeIndicDigits(userInput || '');
  const text = normInput.toLowerCase();

  let category = 'Other / General Assistance';
  let specificSkill = 'General Handyman & Task Support';
  let urgency = 'Standard';
  let minPrice = 300;
  let maxPrice = 600;
  let diagnosis = 'General on-demand task assistance requested.';
  let checklist = [
    'Confirm exact task requirements with customer on arrival',
    'Bring standard multipurpose toolkit',
    'Test and verify resolution before departure'
  ];

  // Emergency keywords
  if (/burst|flood|spark|fire|smoke|shock|leakage|urgent|emergency|immediately|hazard|broken main|জরুরি|বিপদ|আগুন|ধোঁয়া|স্পার্ক|तुरंत|आपातकालीन|खतरा|आग|धुआं/.test(text)) {
    urgency = 'Emergency (Immediate)';
  } else if (/quick|today|asap|soon|faster|tonight|আজই|এখনই|আজ|कल|आज ही|जल्दी/.test(text)) {
    urgency = 'High Priority';
  }

  // Plumbing & Water issues
  if (/plumb|pipe|tap|faucet|drain|leak|sink|flush|toilet|clog|geyser|water tank|sewage|valve|basin|জল পড়ছে|পানি পড়ছে|কল দিয়ে|কল নষ্ট|পাইপ লিক|পাইপ ফেটে|ড্রেন বন্ধ|বেসিন জ্যাম|পানির পাইপ|প্লাম্বার|কল মেরামত|কমোড|नल टपक|नल से पानी|पाइप लीक|पाइप फट|सिंक जाम|नाली बंद|कमोड|प्लम्बर|गीजर पाइप|वाटर टैंक/.test(text)) {
    category = 'Plumbing & Repairs';
    specificSkill = /tap|faucet|কল|नल/.test(text) ? 'Tap & Faucet Repair' :
                    /drain|clog|ড্রেন|বেসিন|नाली|सिंक/.test(text) ? 'Drainage & Clog Clearance' :
                    /flush|toilet|কমোড/.test(text) ? 'Toilet & Flush Valve Repair' :
                    /tank|pipe|burst|পানির পাইপ|ট্যাঙ্ক|पाइप/.test(text) ? 'Pipe Fitting & Leakage Sealing' : 'General Plumbing Inspection';
    minPrice = 349;
    maxPrice = 699;
    diagnosis = `Identified plumbing issue: ${specificSkill}. Water source shutoff may be recommended prior to technician arrival.`;
    checklist = [
      'Locate main stopcock and isolate affected supply line if leaking actively',
      'Inspect pipe joints, seals, and pressure washers',
      'Replace damaged washers, Teflon tape, or threaded fittings',
      'Perform 5-minute continuous flow pressure test to ensure no seepage'
    ];
  }
  // Electrical & Wiring
  else if (/electr|switch|socket|spark|wire|short circuit|mcb|trip|light|fan|fuse|bulb|inverter|chandel|voltage|কারেন্ট|ফ্যান ঘুরছে না|পাখা ঘুরছে না|পাখা বন্ধ|সুইচ নষ্ট|সুইচ বোর্ড|মিটার ট্রিপ|স্পার্ক|আলো জ্বলছে না|শর্ট সার্কিট|বৈদ্যুতিক|ইলেকট্রিক|ইলেকট্রিশিয়ান|বিজলি|बिजली|पंखा नहीं चल रहा|पंखा बंद|स्विच खराब|स्विच बोर्ड|बिजली चली गई|चिंगारी|एमसीबी ट्रिप|शॉर्ट सर्किट|इलेक्ट्रीशियन/.test(text)) {
    category = 'Electrical & Wiring';
    specificSkill = /mcb|trip|short|মিটার ট্রিপ|एमसीबी/.test(text) ? 'MCB & Circuit Breaker Repair' :
                    /fan|ফ্যান|পাখা|पंखा/.test(text) ? 'Ceiling Fan Installation & Repair' :
                    /switch|socket|সুইচ|स्विच/.test(text) ? 'Switchboard & Socket Replacement' : 'Electrical Wiring Inspection';
    minPrice = 349;
    maxPrice = 799;
    diagnosis = `Identified electrical task: ${specificSkill}. Voltage testing and circuit isolation required.`;
    checklist = [
      'De-energize circuit breaker / MCB before touching conductors',
      'Verify zero voltage using digital tester / multimeter',
      'Inspect for thermal burns, loose terminal screws, or insulation degradation',
      'Secure wiring harness and conduct live load test'
    ];
  }
  // AC & Appliances
  else if (/ac|air condition|cool|fridge|refrigerator|freeze|washing machine|microwave|oven|ro|purifier|compressor|chimney|এসি ঠান্ডা হচ্ছে না|এসি বন্ধ|এসি থেকে পানি|ফ্রিজ ঠান্ডা হচ্ছে না|বরফ জমছে না|ওয়াশিং মেশিন বন্ধ|এসি গ্যাস|রেফ্রিজারেটর|एसी ठंडा नहीं कर रहा|एसी कूलिंग नहीं|एसी बंद|फ्रिज ठंडा नहीं|वाशिंग मशीन खराब|माइक्रोवेव/.test(text)) {
    category = 'AC, Fridge & Appliance Repair';
    specificSkill = /ac|air condition|cool|এসি/.test(text) ? 'AC Cooling & Filter Servicing' :
                    /fridge|refrigerator|ফ্রিজ|রেফ্রিজারেটর/.test(text) ? 'Refrigerator Gas & Thermostat Service' :
                    /washing|ওয়াশিং|वाशिंग/.test(text) ? 'Washing Machine Drum & Motor Repair' : 'Appliance Diagnosis & Repair';
    minPrice = 499;
    maxPrice = 1199;
    diagnosis = `Appliance service required: ${specificSkill}. Diagnostics on compressor/motor and coils recommended.`;
    checklist = [
      'Test power input and circuit board error code diagnosis',
      'Clean air/water intake filters and condenser coils',
      'Check refrigerant gas levels or motor belt tension',
      'Run complete operational cycle test to confirm performance'
    ];
  }
  // Cleaning
  else if (/clean|deep clean|dust|sweep|mop|sofa clean|bathroom clean|kitchen clean|sanitiz|wash|maid|housekeep|ঘর অপরিষ্কার|গভীর পরিষ্কার|ঘর মোছা|বাথরুম পরিষ্কার|রান্নাঘর পরিষ্কার|ঘর ঝাড়ু|ঘর সাফ|সোফা পরিষ্কার|জীবাণুমুক্ত|घर की पूरी सफाई|गहरी सफाई|झाड़ू पोछा|बाथरूम की सफाई|किचन की सफाई|सोफा क्लीनिंग|सफाई/.test(text)) {
    category = 'Deep Cleaning & Sanitization';
    specificSkill = /bathroom|toilet|বাথরুম|बाथरूम/.test(text) ? 'Bathroom Deep Scrub & Descaling' :
                    /kitchen|রান্নাঘর|किचन/.test(text) ? 'Kitchen Degreasing & Chimney Cleaning' :
                    /sofa|carpet|mattress|সোফা/.test(text) ? 'Sofa & Upholstery Shampooing' : 'Full Home Deep Cleaning';
    minPrice = 599;
    maxPrice = 1899;
    diagnosis = `Hygiene and sanitization task: ${specificSkill}. Industrial non-toxic agents recommended.`;
    checklist = [
      'Perform dry vacuuming and surface dust removal',
      'Apply food-grade eco-friendly descaling and degreasing agents',
      'Machine scrub or scrub pad deep agitation',
      'Microfiber drying and final disinfectant misting'
    ];
  }
  // Carpentry
  else if (/carpent|wood|furniture|door|hinge|lock|handle|drawer|cabinet|table|chair|bed|shelf|wardrobe|দরজার লক নষ্ট|দরজা আটকাচ্ছে না|খাট মেরামত|আলমারির কবজা|কাঠের কাজ|দরজা বন্ধ হচ্ছে না|দরজার হাতল|কাঠমিস্ত্রি|দরজা|কাঠ|दरवाजे का ताला खराब|दरवाजा अटक रहा|कब्जा ढीला|फर्नीचर मरम्मत|लकड़ी का काम|बढ़ई|ताला/.test(text)) {
    category = 'Carpentry & Woodwork';
    specificSkill = /hinge|lock|handle|লক|হাতল|কবজা|ताला|कब्जा/.test(text) ? 'Door Lock & Hinge Fitting' :
                    /drawer|cabinet|wardrobe|আলমারি/.test(text) ? 'Cabinet & Modular Furniture Repair' : 'Woodwork & Furniture Assembly';
    minPrice = 349;
    maxPrice = 849;
    diagnosis = `Carpentry assistance required: ${specificSkill}. Precise alignment and anchoring required.`;
    checklist = [
      'Inspect frame alignment, hinge screw grip, and clearances',
      'Trim or plane contact edges if binding against frame',
      'Install heavy-duty screws or anchors as needed',
      'Lubricate moving pivots and verify latch lock engagement'
    ];
  }
  // Painting & Waterproofing
  else if (/paint|whitewash|wall|primer|stain|putty|waterproof|seepage|damp|দেওয়ালে রং|দেয়ালে রং|দেওয়ালে নোনা|দেয়াল ভেজা|জল চুইয়ে|পেইন্ট|পেইন্টিং|দেওয়াল পুটিং|রং|দেওয়াল|দেয়াল|रंग पेंट|दीवार पर पेंट|दीवार में सीलन|पुट्टी|दीवार खराब|पेंटर|दीवार/.test(text)) {
    category = 'Wall Painting & Waterproofing';
    specificSkill = /waterproof|seepage|damp|নোনা|ভেজা|सीलन/.test(text) ? 'Wall Dampness & Waterproofing' : 'Interior Wall Painting & Touchup';
    minPrice = 699;
    maxPrice = 2499;
    diagnosis = `Surface preparation & coating: ${specificSkill}. Moisture inspection and primer recommended.`;
    checklist = [
      'Scrape loose flakes and sand surface to smooth finish',
      'Apply anti-fungal damp seal coat or acrylic putty',
      'Evenly apply 2 coats of premium emulsion with roller',
      'Clean floor masking and edges after drying'
    ];
  }
  // Tutoring / Teaching
  else if (/tutor|teach|math|science|english|exam|class|school|study|physics|coding|tuition|অঙ্কের মাস্টারমশাই|অঙ্ক শেখানো|পড়াশোনার টিউটর|পরীক্ষার প্রস্তুতি|বিজ্ঞান শিক্ষক|টিউটরিং|গৃহশিক্ষক|অঙ্ক|গণিত ट्यूटर|पढ़ाई के लिए शिक्षक|परीक्षा की तैयारी|ट्यूशन|टीचर|गणित/.test(text)) {
    category = 'Tutors & Skill Coaches';
    specificSkill = 'Academic Tutoring & Skill Coaching';
    minPrice = 350;
    maxPrice = 800;
    diagnosis = `Educational guidance required: ${specificSkill}. Curriculum review and personalized session plan.`;
    checklist = [
      'Assess student current level and upcoming syllabus targets',
      'Provide structured concept explanation and practice worksheets',
      'Review weak areas with interactive problem-solving'
    ];
  }
  // Babysitting & Childcare
  else if (/baby|babysit|child|children|kid|nanny|infant|toddler|বাচ্চা দেখাশোনা|বাচ্চার জন্য আয়া|ছোট বাচ্চার যত্ন|শিশু সেবা|বাচ্চা|बच्चे की देखभाल|दाई चाहिए|आया चाहिए|बेबीसिटर|बच्चा/.test(text)) {
    category = 'Babysitting';
    specificSkill = 'Childcare & Babysitting Assistance';
    minPrice = 249;
    maxPrice = 799;
    diagnosis = 'Dedicated childcare support requested with experienced supervision.';
    checklist = [
      'Verify childcare requirements, routines, and emergency contact details',
      'Maintain continuous hygienic supervision and play assistance',
      'Log feeding, nap time, and activity routines carefully'
    ];
  }
  // Pet Care
  else if (/pet|dog|cat|puppy|kitten|walk|কুকুর ঘোরানো|পোষা প্রাণীর যত্ন|বিড়াল যত্ন|পোষ্য সেবা|কুকুর|পোষ্য|कुत्ते को टहलाना|पालतू की देखभाल|डॉग वॉकर|पालतू|कुत्ता/.test(text)) {
    category = 'Pet Care & Dog Walking';
    specificSkill = 'Pet Care & Daily Dog Walking';
    minPrice = 250;
    maxPrice = 700;
    diagnosis = 'Pet supervision, walking, and companion care assistance.';
    checklist = [
      'Check pet temperament, walking route, and leash safety',
      'Administer clean water and dietary food as scheduled',
      'Send live photo check-in before and after walk'
    ];
  }
  // Moving & Shifting
  else if (/mov|shift|pack|luggage|tempo|lorry|relocat|carton|furniture lift|বাসা বদল|মালপত্র স্থানান্তর|প্যাকিং শিফটিং|সামান শিফটিং|सामान शिफ्टिंग|घर शिफ्टिंग|सामान उठाना/.test(text)) {
    category = 'Moving & Heavy Lifting';
    specificSkill = 'Furniture Moving & Shifting Support';
    minPrice = 899;
    maxPrice = 2999;
    diagnosis = `Logistics and handling: ${specificSkill}. Protective wrapping and team lifting required.`;
    checklist = [
      'Wrap fragile items and electronics in bubble film',
      'Dismantle larger furniture items safely',
      'Use heavy-duty dollies and shoulder straps for lifting',
      'Secure cargo inside transport vehicle'
    ];
  }
  // Tech Support
  else if (/laptop|computer|pc|mac|wifi|wi-fi|router|internet|printer|software|ল্যাপটপ অন হচ্ছে না|ওয়াইফাই চলছে না|কম্পিউটার স্লো|প্রিন্টার প্রবলেম|টেক হেল্প|ল্যাপটপ|ওয়াইফাই|लैपटॉप चालू नहीं हो रहा|वाईफाई नहीं चल रहा|कंप्यूटर धीमा|प्रिंटर समस्या|वाईफाई|कंप्यूटर/.test(text)) {
    category = 'Laptop & Wi-Fi Tech Support';
    specificSkill = 'Laptop Diagnostic & Wi-Fi Troubleshooting';
    minPrice = 399;
    maxPrice = 999;
    diagnosis = 'Hardware and network setup assistance requested.';
    checklist = [
      'Run diagnostic hardware and network throughput tests',
      'Resolve OS driver, software corruption, or router configurations',
      'Verify smooth internet connection and device stability'
    ];
  }
  // Pest Control
  else if (/pest|termite|cockroach|bedbug|ant|rat|fumigation|disinfection|তেলাপোকা|ছারপোকা|উইপোকা|ইঁদুর|কীটপতঙ্গ|কীটনাশক|कीड़े मकोड़े|कॉकरोच|खटमल|दीमक|पेस्ट कंट्रोल/.test(text)) {
    category = 'Pest Control';
    specificSkill = 'Pest Eradication & Sanitization Treatment';
    minPrice = 549;
    maxPrice = 1899;
    diagnosis = 'Targeted insect and rodent elimination using odor-safe formulations.';
    checklist = [
      'Inspect harborage areas, cracks, and moisture sources',
      'Apply odorless gel bait and targeted spray barrier',
      'Provide 90-day re-infestation prevention guidance'
    ];
  }
  // Handyman & Furniture Assembly
  else if (/handyman|drill|drilling|curtain rod|mirror hanging|frame hanging|shelf fitting|wall mount|ikea|assembly|small fix|हैंडीमैन|ड्रिल|पर्दा रॉड|आईना टांगना|শেल्फ ফিটিং|পর্দার রড|হ্যান্ডিম্যান|ড্রিল/.test(text)) {
    category = 'Furniture Assembly & Handyman';
    specificSkill = /drill|shelf|mount|ড্রিল|রড|रॉड/.test(text) ? 'Wall Mounting, Drilling & Shelf Fitting' : 'Furniture Assembly & Handyman Fixes';
    minPrice = 299;
    maxPrice = 799;
    diagnosis = `Handyman assistance required: ${specificSkill}. Multi-purpose toolkit and precision levels required.`;
    checklist = [
      'Inspect wall density and locate electrical/water conduits before drilling',
      'Use high-precision spirit level and heavy-duty wall anchors',
      'Secure mounts, test load capacity, and vacuum debris'
    ];
  }
  // Spa, Massage & Grooming
  else if (/spa|massag|facial|pedicure|manicure|waxing|salon|beauty|grooming|haircut|body massage|স্পা|ম্যাসাজ|ফেসিয়াল|রূপচর্চা|চুল কাটা|ওয়াক্সিং|स्पा|मसाज|मालिश|फेशियल|मेनिक्योर|पेडिक्योर/.test(text)) {
    category = 'Spa, Massage & Grooming';
    specificSkill = /massage|ম্যাসাজ|मसाज|मालिश/.test(text) ? 'At-Home Relaxation & Therapeutic Massage' : 'Doorstep Salon & Beauty Treatment';
    minPrice = 699;
    maxPrice = 1999;
    diagnosis = `Personal wellness and grooming: ${specificSkill}. Hygienic, disposable salon-grade kits provided.`;
    checklist = [
      'Set up clean, sterilized workspace and disposable protective sheets',
      'Consult on skin sensitivity and preferred herbal/aromatherapy oils',
      'Perform soothing professional therapy with hygienic disposal post-session'
    ];
  }
  // Yoga & Fitness Coaching
  else if (/yoga|fit|gym|workout|trainer|coach|pilates|aerobic|exercise|weight loss|ব্যায়াম|যোগব্যায়াম|ফিটনেস ট্রেনার|ফিটনেস|యోగా|योगा|कसरत|जिम|ट्रेनर/.test(text)) {
    category = 'Yoga & Fitness Coaching';
    specificSkill = /yoga|যোগ|योगा/.test(text) ? 'Personal Hatha & Power Yoga Instruction' : 'At-Home Personal Fitness & Strength Coaching';
    minPrice = 499;
    maxPrice = 1499;
    diagnosis = `Physical fitness & wellness training: ${specificSkill}. Tailored warm-up, workout, and posture correction.`;
    checklist = [
      'Evaluate customer physical fitness level and prior health conditions',
      'Conduct guided warm-up, mobility stretches, and targeted routine',
      'Provide posture correction and sustainable home wellness routine'
    ];
  }
  // Car & Two-Wheeler Detailing
  else if (/car wash|bike wash|car clean|detailing|auto care|foam wash|vehicle|car interior|car polish|গাড়ি ধোয়া|গাড়ি পরিষ্কার|বাইক ওয়াশ|গাড়ির পালিশ|কার ওয়াশ|गाड़ी धुलाई|कार वॉश|कार पॉलिश|बाइक सर्विस/.test(text)) {
    category = 'Car & Two-Wheeler Care';
    specificSkill = /bike|বাইক|बाइक/.test(text) ? 'Two-Wheeler Foam Wash & Chain Lube' : 'Doorstep Car Detailing & Interior Eco Wash';
    minPrice = 399;
    maxPrice = 1299;
    diagnosis = `Vehicle care and aesthetics: ${specificSkill}. High-pressure eco wash and surface waxing.`;
    checklist = [
      'Pre-rinse vehicle exterior to safely dislodge loose dust particles',
      'Apply pH-neutral snow foam shampoo and scrub wheels/tires',
      'Deep vacuum interior, wipe dashboard, and apply tire shine dressing'
    ];
  }
  // Wardrobe & Home Organisation
  else if (/organis|organiz|declutter|wardrobe|closet|pantry|neat|tidying|storage arrangement|আলমারি গোছানো|ঘর সাজানো|ঘর পরিপাটি|বাড়ি গোছানো|अलमारी सजावट|सामान व्यवस्थित|घर की व्यवस्था/.test(text)) {
    category = 'Wardrobe & Home Organisation';
    specificSkill = 'Wardrobe & Home Decluttering Organisation';
    minPrice = 499;
    maxPrice = 1499;
    diagnosis = `Space optimization and decluttering: ${specificSkill}. Systematic categorization and storage setup.`;
    checklist = [
      'Sort items by frequency of use and category',
      'Fold and arrange clothing using space-efficient modular methods',
      'Label compartments and create clean, serene storage layout'
    ];
  }
  // Garden & Plant Care
  else if (/garden|gardening|plant|lawn|grass|mow|prun|hedge|soil|pot|repotting|weeding|gardener|বাগান|গাছপালা|টব|মালী|গাছ ছাঁটাই|মাটি তৈরি|बगीचा|पौधे|माली|गमला|कटाई/.test(text)) {
    category = 'Garden & Plant Care';
    specificSkill = 'Balcony & Lawn Garden Plant Care';
    minPrice = 300;
    maxPrice = 999;
    diagnosis = `Horticulture and plant maintenance: ${specificSkill}. Soil aeration, trimming, and organic nourishment.`;
    checklist = [
      'Prune dead foliage and aerate potted soil/lawn edges',
      'Apply organic vermicompost and anti-pest neem spray',
      'Set up optimized watering schedule for local climate'
    ];
  }
  // Senior Care
  else if (/senior|elder|elderly|grandparent|caregiver|companion|বয়স্কদের দেখাশোনা|প্রবীণ সেবা|বৃদ্ধ সেবা|বুজুর্গদের সেবা|বুজুর্গ|बुजुर्गों की देखभाल|वृद्ध सेवा|बुजुर्ग साथी|बुजुर्ग/.test(text)) {
    category = 'Senior Care & Assistance';
    specificSkill = 'Senior Companionship & Mobility Support';
    minPrice = 349;
    maxPrice = 899;
    diagnosis = 'Gentle companionship, medication reminders, and daily errand support.';
    checklist = [
      'Review daily schedule, prescribed medicines, and dietary notes',
      'Assist with safe room mobility, walks, and clinic appointments',
      'Maintain respectful, calm, and attentive companionship'
    ];
  }

  let suggestedRate = minPrice;
  let pricingSource = `Estimated realistic IRL Indian market rate for ${city}`;

  if (localPricing && localPricing.hasLocalWorkers) {
    minPrice = localPricing.minDemandRate || minPrice;
    maxPrice = localPricing.maxDemandRate || Math.round(minPrice * 1.5);
    suggestedRate = minPrice;
    pricingSource = `Calculated from ${localPricing.workerCount} verified local pro demands in ${city}`;
  }

  const suggestedBudget = (localPricing && localPricing.avgDemandRate)
    ? localPricing.avgDemandRate
    : Math.round((minPrice + maxPrice) / 2);

  return {
    success: true,
    aiModel: 'Hustle Heuristic Engine (Fallback Active)',
    userInput,
    category,
    specificSkill,
    urgency,
    suggestedRate,
    estimatedPriceRange: {
      min: minPrice,
      max: maxPrice,
      suggested: suggestedBudget
    },
    pricingSource,
    diagnosis,
    recommendedChecklist: checklist,
    suggestedNotes: `Diagnosed Issue: ${specificSkill}. Urgency: ${urgency}.\nPlease ensure technician inspects: ${checklist[0]}. Preferred location: ${city}.`
  };
}

/**
 * Diagnose User Need from Natural Language (AI MATCH Field)
 * Dynamically factors in real local worker demands or realistic IRL Indian rates
 */
async function diagnoseNeed(userInput, city = 'Bengaluru', localPricing = null) {
  if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
    return {
      success: false,
      error: 'Please describe what you need assistance with.'
    };
  }

  const cleanInput = userInput.trim();
  const diagCacheKey = `diag:${city}:${cleanInput.toLowerCase()}:${localPricing?.workerCount || 0}`;
  const cachedDiag = getCache(diagCacheKey);
  if (cachedDiag) return cachedDiag;

  let pricingInstruction = '';
  if (localPricing && localPricing.hasLocalWorkers) {
    pricingInstruction = `
REAL-TIME LOCAL WORKER DEMAND DATA FOR ${city.toUpperCase()}:
- Active verified workers in this trade in ${city}: ${localPricing.workerCount}
- Minimum base rate demanded by local pros: ₹${localPricing.minDemandRate}
- Maximum rate demanded by local pros: ₹${localPricing.maxDemandRate}
- Average rate demanded by local pros: ₹${localPricing.avgDemandRate}
${localPricing.sampleDemands && localPricing.sampleDemands.length > 0 ? `- Recent rates/bookings in ${city}: ₹${localPricing.sampleDemands.join(', ₹')}` : ''}

CRITICAL PRICING REQUIREMENT:
You MUST calculate "suggestedRate" and "estimatedPriceRange" based strictly on these actual worker demands in ${city}.
- suggestedRate: starting base rate (around ₹${localPricing.minDemandRate})
- estimatedPriceRange.min: ₹${localPricing.minDemandRate}
- estimatedPriceRange.max: ₹${localPricing.maxDemandRate}
- estimatedPriceRange.suggested: ₹${localPricing.avgDemandRate}
- pricingSource: "Calculated from ${localPricing.workerCount} local pro demands in ${city}"
`;
  } else {
    pricingInstruction = `
LOCAL WORKER STATUS FOR ${city.toUpperCase()}:
- No registered verified workers currently found in ${city} for this specific trade.

CRITICAL PRICING REQUIREMENT:
You MUST estimate realistic in-real-life (IRL) Indian market rates according to this work scope and city (${city}) in INR.
Do NOT return arbitrary random numbers. Base your numbers strictly on real-world Indian urban service technician charges:
- Minor inspection, simple tap washer, single switch fix: ₹249 - ₹399
- Standard plumbing fix, ceiling fan repair, minor carpentry: ₹349 - ₹699
- Appliance servicing, split AC filter jet cleaning, lock replacement: ₹499 - ₹999
- Deep bathroom/kitchen cleaning, sofa shampooing, damp waterproofing: ₹699 - ₹1,899
- Full home shifting or major woodwork: ₹1,299 - ₹3,499
Set suggestedRate to the realistic starting visit/inspection fee in ${city}.
Set pricingSource to: "Estimated realistic IRL Indian market rate for ${city}".
`;
  }

  const prompt = `You are Hustle AI, an intelligent home and urban services triage assistant for India.
Analyze the user's natural language request: "${userInput.trim()}".
The user is located in or around ${city}.

Classify into one of these Hustle service categories:
- Plumbing & Repairs
- Electrical & Wiring
- AC, Fridge & Appliance Repair
- Deep Cleaning & Sanitization
- Carpentry & Woodwork
- Wall Painting & Waterproofing
- Pest Control
- Moving & Heavy Lifting
- Tutors & Skill Coaches
- Pet Care & Dog Walking
- Salon & Beauty at Home
- Gardening & Lawn Care
- Other / General Assistance

${pricingInstruction}

Respond ONLY with valid JSON in this exact structure:
{
  "category": "Matched category name from the list above",
  "specificSkill": "Concise specific skill or trade needed, e.g., 'Pipe Leakage Repair' or 'MCB Tripping Diagnosis'",
  "urgency": "Emergency (Immediate)" | "High Priority" | "Standard",
  "suggestedRate": 349,
  "estimatedPriceRange": {
    "min": 350,
    "max": 750,
    "suggested": 500
  },
  "pricingSource": "Pricing source description",
  "diagnosis": "1-2 sentence professional analysis explaining what is happening and the likely cause.",
  "recommendedChecklist": [
    "Step 1 for safety or prep",
    "Step 2 for technician inspection",
    "Step 3 for verification"
  ],
  "suggestedNotes": "Clear, professional job brief ready to send to workers."
}`;

  try {
    const rawAiText = await callGeminiApi(prompt);
    const parsed = cleanJsonOutput(rawAiText);
    if (parsed && parsed.category && parsed.specificSkill) {
      const fallbackMin = localPricing?.minDemandRate || 349;
      const fallbackMax = localPricing?.maxDemandRate || 799;
      const fallbackAvg = localPricing?.avgDemandRate || 499;

      const priceRange = parsed.estimatedPriceRange || { min: fallbackMin, max: fallbackMax, suggested: fallbackAvg };
      const startingRate = parsed.suggestedRate || priceRange.min || fallbackMin;
      const sourceDesc = parsed.pricingSource || (localPricing?.hasLocalWorkers ? `Calculated from ${localPricing.workerCount} local pro demands in ${city}` : `Estimated realistic IRL Indian market rate for ${city}`);

      const finalResult = {
        success: true,
        aiModel: 'Hustle Smart AI',
        userInput: userInput.trim(),
        category: parsed.category,
        specificSkill: parsed.specificSkill,
        urgency: parsed.urgency || 'Standard',
        suggestedRate: Number(startingRate) || fallbackMin,
        estimatedPriceRange: {
          min: Number(priceRange.min) || fallbackMin,
          max: Number(priceRange.max) || fallbackMax,
          suggested: Number(priceRange.suggested) || fallbackAvg
        },
        pricingSource: sourceDesc,
        diagnosis: parsed.diagnosis,
        recommendedChecklist: parsed.recommendedChecklist || [],
        suggestedNotes: parsed.suggestedNotes || userInput.trim()
      };
      setCache(diagCacheKey, finalResult);
      return finalResult;
    }
  } catch (err) {
    console.warn('[Gemini AI] Live API call did not succeed, engaging heuristic fallback:', err.message);
  }

  // Graceful fallback to heuristic engine
  const fallbackResult = heuristicDiagnose(userInput, city, localPricing);
  setCache(diagCacheKey, fallbackResult);
  return fallbackResult;
}

/**
 * Enhance / Polish Task Notes for Customers
 */
async function enhanceScope(rawNotes, serviceCategory = 'General Service') {
  if (!rawNotes || rawNotes.trim().length === 0) {
    return { success: false, enhanced: rawNotes };
  }

  const prompt = `You are Hustle AI, an expert job scope generator.
Take these rough customer notes for a "${serviceCategory}" task:
"${rawNotes.trim()}"

Rewrite them into a clear, professional, well-structured work brief for a gig worker.
Include:
1. Exact issue / requirement summary
2. Important access, location, or material details
3. Expected standard of completion

Keep it concise (around 3-5 sentences or clean bullet points). Do NOT add conversational fluff. Respond with just the enhanced text.`;

  try {
    const rawAiText = await callGeminiApi(prompt);
    if (rawAiText && rawAiText.trim().length > 10) {
      return {
        success: true,
        aiModel: 'Hustle Smart AI',
        enhanced: rawAiText.trim()
      };
    }
  } catch (err) {
    console.warn('[Gemini AI] Enhance scope fallback engaged:', err.message);
  }

  // Heuristic enhancement
  const cleaned = rawNotes.trim().replace(/\s+/g, ' ');
  const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  const fallbackEnhanced = `Task Requirement: ${capitalized}.\n• Scope: Comprehensive inspection, necessary repairs/service, and post-work operational verification.\n• Safety & Quality: Use standard industry tools and ensure neat cleanup upon completion.`;
  return {
    success: true,
    aiModel: 'Hustle Heuristic Engine (Fallback Active)',
    enhanced: fallbackEnhanced
  };
}

/**
 * Price & Negotiation Advisor
 */
async function advisePrice(serviceCategory, proposedPrice, city = 'Bengaluru') {
  const price = Number(proposedPrice) || 0;
  const benchmarkRate = getCategoryBenchmarkRate(serviceCategory);
  const benchmark = {
    min: benchmarkRate.min,
    max: benchmarkRate.max,
    avg: benchmarkRate.defaultRate,
    unit: 'job'
  };

  let status = 'fair';
  let advice = '';

  if (price < benchmark.min) {
    status = 'below_market';
    advice = `₹${price} is below standard local rates (typically ₹${benchmark.min} - ₹${benchmark.max} for ${serviceCategory} in ${city}). Specialists may be slower to accept.`;
  } else if (price > benchmark.max) {
    status = 'above_average';
    advice = `₹${price} is a premium offer above typical market rate (avg ₹${benchmark.avg}). High likelihood of immediate top-rated worker acceptance.`;
  } else {
    status = 'fair';
    advice = `₹${price} is within the fair market benchmark (₹${benchmark.min} - ₹${benchmark.max}) for ${serviceCategory}.`;
  }

  return {
    success: true,
    category: serviceCategory,
    proposedPrice: price,
    benchmark,
    status,
    advice
  };
}

// Canonical Catalog of Hustle's 18 Available Services (with Multilingual Hindi & Bangla Indexing)
const HUSTLE_18_SERVICES = [
  { id: 'home-cleaning', name: 'Deep home cleaning', category: 'HOME CARE', description: 'Kitchen, bath & living spaces deep cleaning and sanitization', minPrice: 699, keywords: ['clean', 'cleaning', 'dust', 'mop', 'sweep', 'wash', 'scrub', 'sanitize', 'sanitization', 'bathroom', 'kitchen', 'housekeeping', 'maid', 'সফাই', 'সফাইকর্মী', 'ঘর অপরিষ্কার', 'গভীর পরিষ্কার', 'ঘর মোছা', 'বাথরুম পরিষ্কার', 'রান্নাঘর পরিষ্কার', 'ঘর ঝাড়ু', 'ঘর সাফ', 'সোফা পরিষ্কার', 'ঘর পরিষ্কার', 'सफाई', 'साफ', 'झाड़ू', 'पोछा', 'घर की पूरी सफाई', 'गहरी सफाई', 'झाड़ू पोछा', 'बाथरूम की सफाई', 'किचन की सफाई', 'सोफा क्लीनिंग', 'घर की सफाई'] },
  { id: 'spa-therapy', name: 'At-home spa therapy', category: 'WELLNESS', description: 'Relaxing wellness treatment, body massage, facial, salon & spa at home', minPrice: 1099, keywords: ['spa', 'massage', 'therapy', 'facial', 'pedicure', 'manicure', 'waxing', 'salon', 'beauty', 'haircut', 'skin', 'wellness', 'मसाज', 'स्पा', 'मालिश', 'ফেশিয়াল', 'ম্যাসাজ', 'স্পা'] },
  { id: 'maths-tutoring', name: 'Tutoring', category: 'LEARN', description: 'Academic and subject tutoring for grades 6–12, homework & exam prep', minPrice: 1499, keywords: ['tutor', 'tutoring', 'math', 'maths', 'teacher', 'teach', 'algebra', 'geometry', 'calculus', 'physics', 'science', 'exam', 'homework', 'coaching', 'tuition', 'study', 'শিক্ষক', 'গৃহশিক্ষক', 'অঙ্কের মাস্টারমশাই', 'অঙ্ক শেখানো', 'পড়াশোনার টিউটর', 'পরীক্ষার প্রস্তুতি', 'বিজ্ঞান শিক্ষক', 'টিউটর', 'পড়ানো', 'অঙ্ক', 'ম্যাথ', 'মাস্টারমশাই', 'गणित ट्यूटर', 'पढ़ाई के लिए शिक्षक', 'परीक्षा की तैयारी', 'शिक्षक', 'ट्यूशन', 'पढ़ाई', 'गणित'] },
  { id: 'handyman', name: 'Handyman visits', category: 'HOME REPAIR', description: 'Small fixes, drill & hanging, curler/rod fitting sorted in one visit', minPrice: 349, keywords: ['handyman', 'fix', 'drill', 'drilling', 'hang', 'hanging', 'mirror', 'curtain', 'rod', 'frame', 'screw', 'assembly', 'fitting', 'shelf', 'ড্রিল করা', 'পর্দার রড লাগানো', 'ছবি টাঙানো', 'ড্রিল', 'হ্যান্ডিম্যান', 'ড্রিলিং', 'पर्दा रॉड', 'आइना लगाना', 'ड्रिल', 'फिटिंग'] },
  { id: 'electrician', name: 'Electrician visits', category: 'REPAIRS', description: 'Safe fixes for switches, MCB tripping, fan, lights & wiring in every room', minPrice: 299, keywords: ['electric', 'electrical', 'electrician', 'switch', 'switchboard', 'socket', 'plug', 'spark', 'short circuit', 'circuit breaker', 'breaker', 'trip', 'tripping', 'mcb', 'fuse', 'fan', 'light', 'wire', 'wiring', 'inverter', 'voltage', 'bulb', 'কারেন্ট', 'ফ্যান ঘুরছে না', 'পাখা ঘুরছে না', 'পাখা বন্ধ', 'সুইচ নষ্ট', 'সুইচ বোর্ড', 'মিটার ট্রিপ', 'স্পার্ক', 'আলো জ্বলছে না', 'শর্ট সার্কিট', 'বৈদ্যুতিক', 'ইলেকট্রিক', 'ইলেক্ট্রিশিয়ান', 'ইলেকট্রিশিয়ান', 'পাখা', 'সুইচ', 'আলো', 'बिजली', 'पंखा नहीं चल रहा', 'पंखा बंद', 'स्विच खराब', 'स्विच बोर्ड', 'बिजली चली गई', 'चिंगारी', 'एमसीबी ट्रिप', 'शॉर्ट सर्किट', 'इलेक्ट्रीशियन', 'इलेक्ट्रिक', 'तार', 'पंखा', 'स्विच', 'लाइट', 'बिजली मिस्त्री'] },
  { id: 'plumbing', name: 'Plumbing solutions', category: 'HOME REPAIR', description: 'Leaks, fittings, pipe drainage, tap and toilet installations', minPrice: 349, keywords: ['plumb', 'plumbing', 'pipe', 'tap', 'faucet', 'leak', 'leakage', 'drain', 'drainage', 'clog', 'sink', 'toilet', 'flush', 'water tank', 'sewage', 'valve', 'geyser pipe', 'basin', 'water motor', 'জল পড়ছে', 'পানি পড়ছে', 'কল দিয়ে', 'কল নষ্ট', 'পাইপ লিক', 'পাইপ ফেটে', 'ড্রেন বন্ধ', 'বেসিন জ্যাম', 'পানির পাইপ', 'প্লাম্বার', 'কল মেরামত', 'কমোড', 'পাইপ', 'কল', 'লিক', 'ড্রেন', 'বেসিন', 'জল লিক', 'नल टपक', 'नल से पानी', 'पाइप लीक', 'पाइप फट', 'सिंक जाम', 'नाली बंद', 'कमोड', 'नल', 'पाइप', 'पानी', 'लीक', 'प्लम्बर', 'प্লাম्बर', 'गीजर पाइप', 'वाटर टैंक'] },
  { id: 'carpentry', name: 'Carpentry & assembly', category: 'CARPENTRY', description: 'Furniture repair, hinges, door locks, wooden work and modular assembly', minPrice: 499, keywords: ['carpenter', 'carpentry', 'wood', 'woodwork', 'furniture', 'door', 'lock', 'hinge', 'handle', 'table', 'chair', 'bed', 'wardrobe', 'cabinet', 'drawer', 'sofa', 'upholstery', 'cushion', 'দরজার লক নষ্ট', 'দরজা আটকাচ্ছে না', 'খাট মেরামত', 'আলমারির কবজা', 'কাঠের কাজ', 'দরজা বন্ধ হচ্ছে না', 'দরজার হাতল', 'কাঠমিস্ত্রি', 'দরজা', 'কাঠ', 'তালা', 'দরজার লক', 'দরজার খিল', 'দরজার কবজা', 'দরজার ছিটকিনি', 'দরজা লাগা', 'দরজা খোলা', 'দরজা সারানো', 'দরজা ফিটিং', 'দরজা পাল্লা', 'দরজা ফ্রেম', 'দরজা লক নষ্ট', 'দরজা আটকানো', 'দরজা জ্যাম', 'কাঠের চেয়ার', 'কাঠের টেবিল', 'কাঠের খাট', 'কাঠের আলমারি', 'কাঠের সোফা', 'কাঠের ড্রয়ার', 'কাঠের ক্যাবিনেট', 'কাঠের আসবাবপত্র', 'কাঠের মিস্ত্রি', 'কাঠের কাজ করা', 'কাঠের পলিশ', 'কাঠের বার্নিশ', 'কাঠের পার্টিশন', 'কাঠের সিলিং', 'কাঠের মেঝে', 'কাঠের ফ্রেম', 'কাঠের বোর্ড', 'কাঠের তাক', 'কাঠের তাক লাগানো', 'কাঠের ড্রয়ার ঠিক করা', 'কাঠের আলমারি ঠিক করা', 'কাঠের খাট ঠিক করা', 'কাঠের চেয়ার ঠিক করা', 'কাঠের টেবিল ঠিক করা', 'কাঠের সোফা ঠিক করা', 'কাঠের কবজা ঠিক করা', 'কাঠের লক ঠিক করা', 'কাঠের ছিটকিনি ঠিক করা', 'কাঠের কাজ জানা মিস্ত্রি', 'কাঠমিস্ত্রি ডাকা', 'কাঠমিস্ত্রি প্রয়োজন', 'দরজা ঠিক করার মিস্ত্রি', 'তালা ঠিক করার মিস্ত্রি', 'তালা বদলানো', 'তালা লাগানো', 'তালা মেরামত', 'দরজার হাতল লাগানো', 'দরজার কবজা লাগানো', 'দরজার লক বদলানো', 'দরজার লক লাগানো', 'দরজার লক ঠিক করা', 'দরজার ছিটকিনি লাগানো', 'দরজার ছিটকিনি বদলানো', 'দরজার ছিটকিনি ঠিক করা', 'ফার্নিচার মেরামত', 'ফার্নিচার তৈরি', 'ফার্নিচার পলিশ', 'ফার্নিচার রং', 'ফার্নিচার ফিটিং', 'ফার্নিচার অ্যাসেম্বলি', 'ফার্নিচার ডিসঅ্যাসেম্বলি', 'ফার্নিচার শিফটিং', 'ফার্নিচার হ্যান্ডলিং', 'ফার্নিচার ঠিক করা', 'ফার্নিচার সারানো', 'ফার্নিচার ভাঙা ঠিক করা', 'ফার্নিচার পায়া ভাঙা', 'ফার্নিচার ড্রয়ার জ্যাম', 'ফার্নিচার আলমারি জ্যাম', 'ফার্নিচার খাট ভাঙা', 'ফার্নিচার চেয়ার ভাঙা', 'ফার্নিচার টেবিল ভাঙা', 'ফার্নিচার সোফা ভাঙা', 'ফার্নিচার কুশন ঠিক করা', 'ফার্নিচার ফোম বদলানো', 'ফার্নিচার কভার বদলানো', 'ফার্নিচার রি-পলিশ', 'ফার্নিচার টাচ-আপ', 'ফার্নিচার স্ক্র্যাচ ঠিক করা', 'ফার্নিচার ডেন্ট ঠিক করা', 'ফার্নিচার লেভেলিং', 'ফার্নিচার ব্যালেন্সিং', 'ফার্নিচার শক্ত করা', 'ফার্নিচার স্ক্রু টাইট করা', 'ফার্নিচার নাট-বোল্ট লাগানো', 'ফার্নিচার কবজা বদলানো', 'ফার্নিচার লক বদলানো', 'ফার্নিচার হাতল বদলানো', 'ফার্নিচার হুইল লাগানো', 'ফার্নিচার কাস্টার লাগানো', 'ফার্নিচার চ্যানেল বদলানো', 'ফার্নিচার ড্রয়ার চ্যানেল লাগানো', 'ফার্নিচার স্লাইডার লাগানো', 'ফার্নিচার স্লাইডিং ডোর ঠিক করা', 'ফার্নিচার স্লাইডিং চ্যানেল বদলানো', 'ফার্নিচার ম্যাগনেট ক্যাচ লাগানো', 'ফার্নিচার হাইড্রোলিক পাম্প লাগানো', 'ফার্নিচার হাইড্রোলিক কবজা লাগানো', 'ফার্নিচার সফট-ক্লোজ কবজা লাগানো', 'ফার্নিচার পুশ-টু-ওপেন লাগানো', 'ফার্নিচার হ্যান্ডেল-লেস প্রোফাইল লাগানো', 'ফার্নিচার এজ-ব্যান্ডিং লাগানো', 'ফার্নিচার সানমাইকা লাগানো', 'ফার্নিচার ল্যামিনেট পেস্টিং', 'ফার্নিচার ভিনিয়ার পলিশ', 'ফার্নিচার ডিউকো পেইন্ট', 'ফার্নিচার পিইউ পলিশ', 'ফার্নিচার মেলামাইন পলিশ', 'দরওয়াজা', 'लकड़ी', 'बढ़ई', 'दरवाजे का ताला खराब', 'दरवाजा अटक रहा', 'कब्जा ढीला', 'फर्नीचर मरम्मत', 'लकड़ी का काम', 'ताला', 'फर्नीचर'] },
  { id: 'babysitting', name: 'Babysitting', category: 'CHILDCARE', description: 'Caring hands, child supervision, bedtime and play routines for your little ones', minPrice: 249, keywords: ['baby', 'babysit', 'babysitting', 'babysitter', 'child', 'children', 'kid', 'kids', 'nanny', 'childcare', 'daycare', 'toddler', 'বাচ্চা দেখাশোনা', 'বাচ্চার জন্য আয়া', 'ছোট বাচ্চার যত্ন', 'শিশু সেবা', 'বাচ্চা', 'আয়া', 'শিশু যত্ন', 'बच्चे की देखभाल', 'दाई चाहिए', 'आया चाहिए', 'बेबीसिटर', 'बच्चा', 'दाई', 'आया'] },
  { id: 'pet-care', name: 'Pet sitting & walks', category: 'PETS', description: 'Happy companions, daily dog walks, pet sitting while you are away', minPrice: 299, keywords: ['pet', 'pets', 'dog', 'dogs', 'cat', 'cats', 'puppy', 'walk', 'dog walking', 'pet sitting', 'kitten', 'vet escort', 'feed pet', 'কুকুর ঘোরানো', 'পোষা প্রাণীর যত্ন', 'বিড়াল যত্ন', 'পোষ্য সেবা', 'কুকুর', 'পোষ্য', 'বিড়াল', 'कुत्ते को टहलाना', 'पालतू की देखभाल', 'डॉग वॉकर', 'कुत्ता', 'पालतू', 'बिल्ली'] },
  { id: 'home-organisation', name: 'Home organisation', category: 'ORGANISING', description: 'Order and calm, wardrobe decluttering, pantry & room arrangement', minPrice: 799, keywords: ['organise', 'organize', 'organisation', 'organization', 'declutter', 'decluttering', 'wardrobe', 'closet', 'pantry', 'tidying', 'neat', 'storage', 'ঘর সাজানো', 'আলমারি সাজানো', 'সাজসজ্জা', 'सजावट', 'व्यवस्था', 'अलमारी सजाना'] },
  { id: 'tech-help', name: 'Laptop & Wi-Fi help', category: 'TECH HELP', description: 'Computer, laptop, router, software & Wi-Fi troubles clearly solved', minPrice: 399, keywords: ['laptop', 'computer', 'pc', 'mac', 'wifi', 'wi-fi', 'router', 'internet', 'windows', 'printer', 'software', 'tech help', 'format', 'network', 'ল্যাপটপ অন হচ্ছে না', 'ওয়াইফাই চলছে না', 'কম্পিউটার স্লো', 'প্রিন্টার প্রবলেম', 'টেক হেল্প', 'ল্যাপটপ', 'কম্পিউটার', 'ওয়াইফাই', 'लैपटॉप चालू नहीं हो रहा', 'वाईफाई नहीं चल रहा', 'कंप्यूटर धीमा', 'प्रिंटर समस्या', 'लैपटॉप', 'वाईफाई', 'कंप्यूटर'] },
  { id: 'garden-care', name: 'Garden care', category: 'GARDEN', description: 'Lawn mowing, pruning, plant repotting, weeding and garden maintenance', minPrice: 599, keywords: ['garden', 'gardening', 'lawn', 'plant', 'plants', 'grass', 'mow', 'pruning', 'hedge', 'soil', 'pots', 'repotting', 'weeding', 'balcony garden', 'gardener', 'বাগান পরিচর্যা', 'গাছ লাগানো', 'বাগান', 'গাছপালা', 'বাগানের কাজ', 'बगीचा', 'पौधे', 'घास काटना', 'माली'] },
  { id: 'appliances', name: 'Appliance care & repair', category: 'APPLIANCES', description: 'AC cooling, refrigerator, microwave & washing machine diagnosis and repair', minPrice: 399, keywords: ['ac', 'air conditioner', 'split ac', 'window ac', 'ac filter', 'gas check', 'gas refill', 'gas top-up', 'ac repair', 'ac cleaning', 'cooling', 'fridge', 'refrigerator', 'freeze', 'freezer', 'washing machine', 'microwave', 'oven', 'ro purifier', 'compressor', 'chimney', 'appliance', 'এসি ঠান্ডা হচ্ছে না', 'এসি বন্ধ', 'এসি থেকে পানি', 'ফ্রিজ ঠান্ডা হচ্ছে না', 'বরফ জমছে না', 'ওয়াশিং মেশিন বন্ধ', 'এসি গ্যাস', 'রেফ্রিজারেটর', 'এসি', 'ওয়াশিং মেশিন', 'ফ্রিজ', 'एसी ठंडा नहीं कर रहा', 'एसी कूलिंग नहीं', 'एसी बंद', 'फ्रिज ठंडा नहीं', 'वाशिंग मशीन खराब', 'माइक्रोवेव', 'कूलर', 'एसी', 'फ्रिज', 'मशीन'] },
  { id: 'painting', name: 'Painting & waterproofing', category: 'PAINTING', description: 'Flawless wall coats, interior touchup & damp/seepage waterproofing', minPrice: 999, keywords: ['paint', 'painter', 'painting', 'wall', 'walls', 'waterproof', 'waterproofing', 'damp', 'seepage', 'primer', 'whitewash', 'stencil', 'texture', 'ceiling paint', 'দেওয়ালে রং', 'দেয়ালে রং', 'দেওয়ালে নোনা', 'দেয়াল ভেজা', 'জল চুইয়ে', 'পেইন্ট', 'পেইন্টিং', 'দেওয়াল পুটিং', 'রং', 'দেওয়াল', 'দেয়াল', 'রংমিস্ত্রি', 'रंग पेंट', 'दीवार पर पेंट', 'दीवार में सीलन', 'पुट्टी', 'दीवार खराब', 'पेंटर', 'रंग', 'पेंट', 'दीवार', 'पुट्टी'] },
  { id: 'fitness', name: 'Fitness & yoga coaching', category: 'FITNESS', description: 'Personal fitness, yoga instruction and customized training at your home', minPrice: 799, keywords: ['fitness', 'gym', 'workout', 'train', 'trainer', 'coach', 'yoga', 'weight loss', 'pilates', 'aerobics', 'exercise', 'personal training', 'ব্যায়াম', 'যোগব্যায়াম', 'ফিটনেস ট্রেনার', 'ব্যায়াম', 'যোগ', 'योग', 'व्यायाम', 'फिटनेस ट्रेनर'] },
  { id: 'auto-care', name: 'Car detailing & eco wash', category: 'AUTO CARE', description: 'Doorstep interior vacuum, exterior waterless/eco wash & paint polish', minPrice: 449, keywords: ['car', 'vehicle', 'car wash', 'auto', 'detailing', 'polish', 'car interior', 'car clean', 'bike wash', 'foam wash', 'গাড়ি পরিষ্কার', 'গাড়ি ধোয়া', 'কার ওয়াশ', 'गाड़ी सफाई', 'कार वॉश', 'बाइक वॉश'] },
  { id: 'pest-control', name: 'Pest control & sanitization', category: 'HOME SAFETY', description: 'Odorless, pet-safe pest control treatments for termites, cockroaches & bedbugs', minPrice: 549, keywords: ['pest', 'pests', 'termite', 'termites', 'cockroach', 'cockroaches', 'roach', 'bedbug', 'bedbugs', 'mosquito', 'rodent', 'rat', 'rats', 'ant', 'ants', 'fumigation', 'disinfection', 'pest control', 'তেলাপোকা', 'ছারপোকা', 'উইপোকা', 'ইঁদুর', 'কীটপতঙ্গ', 'কীটনাশক', 'কীটপতঙ্গ দূরীকরণ', 'कीड़े मकोड़े', 'कॉकरोच', 'खटमल', 'दीमक', 'पेस्ट कंट्रोल', 'कीट', 'दीमक'] },
  { id: 'senior-care', name: 'Senior care & assistance', category: 'ASSISTANCE', description: 'Gentle companionship, mobility support, medication reminders & daily errands for elders', minPrice: 349, keywords: ['senior', 'seniors', 'elder', 'elders', 'elderly', 'grandparent', 'old age', 'companion', 'companionship', 'medication', 'errands', 'assistance', 'mobility', 'caregiver', 'বয়স্কদের দেখাশোনা', 'প্রবীণ সেবা', 'বৃদ্ধ সেবা', 'বুজুর্গদের সেবা', 'বয়স্ক সেবা', 'বুজুর্গ', 'बुजुर्गों की देखभाल', 'वृद्ध सेवा', 'बुजुर्ग साथी', 'बुजुर्ग', 'वृद्ध'] }
];

/**
 * Matches whatever search query is made against all 18 available services.
 * If a match is found: returns closest matching service.
 * If NO match found: returns matched = false, enabling progression to create new pool.
 */
async function matchAgainst18Services(query) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return { success: false, matched: false, service: null, reason: 'Empty search query' };
  }

  const cleanQuery = query.trim();
  const cacheKey = `match18:${cleanQuery.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  // 1. Instant Fast-Path: evaluate local high-precision token/keyword matcher (< 0.2ms!)
  const qLower = cleanQuery.toLowerCase();
  const queryTokens = qLower.split(/[^a-z0-9\u0900-\u097F\u0980-\u09FF]+/).filter(Boolean);
  let bestService = null;
  let bestScore = 0;

  for (const s of HUSTLE_18_SERVICES) {
    let score = 0;
    // Exact name match
    if (qLower.includes(s.name.toLowerCase())) {
      score += 15;
    }
    // Category match
    if (qLower.includes(s.category.toLowerCase())) {
      score += 8;
    }
    // Keyword matches with strict word boundary protection
    for (const kw of s.keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower.includes(' ')) {
        // Multi-word phrase match (e.g., 'dog walking', 'air conditioner', 'জল পড়ছে')
        if (qLower.includes(kwLower)) {
          score += 6;
        }
      } else {
        // Single word: must match a whole token or valid substring
        if (queryTokens.includes(kwLower) || (kwLower.length >= 3 && qLower.includes(kwLower))) {
          score += 4;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestService = s;
    }
  }

  // If decisive high-confidence match found locally (score >= 6), return immediately without waiting for API!
  if (bestService && bestScore >= 6) {
    const fastResult = {
      success: true,
      matched: true,
      service: bestService,
      reason: `Identified as best fit for: ${bestService.name} (${bestService.category}).`
    };
    setCache(cacheKey, fastResult);
    return fastResult;
  }

  const servicesListForPrompt = HUSTLE_18_SERVICES.map((s, idx) => 
    `${idx + 1}. [ID: "${s.id}"] "${s.name}" (Category: ${s.category}) - ${s.description}`
  ).join('\n');

  const prompt = `You are Hustle AI, an intelligent service matcher for an on-demand platform.
We have EXACTLY 18 available services in our catalog:
${servicesListForPrompt}

User Search / Job Need: "${cleanQuery}".

TASK:
1. Compare this search against ALL 18 available services listed above.
2. If this need can be fulfilled by one of our 18 services, find the SINGLE closest matching service.
3. If this need is completely outside of our 18 services (for example: legal/court lawyer, event DJ, wedding photography, biryani catering, solar rooftop panel, tattoo artist, tailoring, astrology, debt recovery, etc.), mark matched as false.

Respond ONLY with valid JSON in this exact format:
{
  "matched": true | false,
  "serviceId": "exact id from list above or null",
  "serviceName": "exact name from list above or null",
  "category": "exact category from list above or null",
  "reason": "1 concise sentence explaining why this is the closest match or why no service fits",
  "suggestedPoolSkill": "concise skill title if custom pool needed"
}`;

  try {
    const rawAiText = await callGeminiApi(prompt);
    const parsed = cleanJsonOutput(rawAiText);
    if (parsed && typeof parsed.matched === 'boolean') {
      if (parsed.matched && parsed.serviceId) {
        const found = HUSTLE_18_SERVICES.find(s => s.id === parsed.serviceId);
        const result = {
          success: true,
          matched: true,
          service: found || {
            id: parsed.serviceId,
            name: parsed.serviceName || parsed.serviceId,
            category: parsed.category || 'HOME CARE',
            minPrice: 349
          },
          reason: parsed.reason || `Closest match among our 18 services: ${parsed.serviceName || parsed.serviceId}.`
        };
        setCache(cacheKey, result);
        return result;
      } else {
        const result = {
          success: true,
          matched: false,
          service: null,
          reason: parsed.reason || `No matching service found among our 18 standard services for "${cleanQuery}".`,
          suggestedPoolSkill: parsed.suggestedPoolSkill || cleanQuery
        };
        setCache(cacheKey, result);
        return result;
      }
    }
  } catch (err) {
    console.warn('[Gemini AI] Match 18 fallback engaged:', err.message);
  }

  // Fallback threshold 4
  if (bestService && bestScore >= 4) {
    const result = {
      success: true,
      matched: true,
      service: bestService,
      reason: `Identified as closest match to ${bestService.name} (${bestService.category}).`
    };
    setCache(cacheKey, result);
    return result;
  }

  // No match found in the 18 services
  const fallbackNoMatch = {
    success: true,
    matched: false,
    service: null,
    reason: `No matching service found among our 18 standard services for "${cleanQuery}".`,
    suggestedPoolSkill: cleanQuery
  };
  setCache(cacheKey, fallbackNoMatch);
  return fallbackNoMatch;
}

/**
 * Semantic Search & Intent Matching against 18 Services
 */
async function semanticSearch(query) {
  if (!query || query.trim().length === 0) {
    return { success: false, matched: false, service: null };
  }

  const matchRes = await matchAgainst18Services(query);
  return matchRes;
}

/**
 * Curated list of popular specific service tasks for fast autocompletion matching
 */
const POPULAR_SERVICE_TASKS = [
  // 1. home-cleaning
  { title: 'Full home deep cleaning & sanitization', category: 'HOME CARE', serviceId: 'home-cleaning', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Kitchen & chimney deep degreasing', category: 'HOME CARE', serviceId: 'home-cleaning', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Bathroom floor & tile descaling', category: 'HOME CARE', serviceId: 'home-cleaning', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Sofa, carpet & mattress shampooing', category: 'HOME CARE', serviceId: 'home-cleaning', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Move-in & vacant apartment cleaning', category: 'HOME CARE', serviceId: 'home-cleaning', is18Catalog: true, tag: 'Standard 18 Service' },

  // 2. spa-therapy
  { title: 'At-home relaxing full body massage & spa', category: 'WELLNESS', serviceId: 'spa-therapy', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Facial, cleanup & de-tan at home', category: 'WELLNESS', serviceId: 'spa-therapy', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Manicure, pedicure & salon package', category: 'WELLNESS', serviceId: 'spa-therapy', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Hair styling & haircut at home', category: 'WELLNESS', serviceId: 'spa-therapy', is18Catalog: true, tag: 'Standard 18 Service' },

  // 3. maths-tutoring
  { title: 'Class 9–12 CBSE/ICSE Tutoring', category: 'LEARN', serviceId: 'maths-tutoring', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Algebra, Calculus & Geometry tuition', category: 'LEARN', serviceId: 'maths-tutoring', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Weekly school homework & exam prep coaching', category: 'LEARN', serviceId: 'maths-tutoring', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Physics & Science foundational tuition', category: 'LEARN', serviceId: 'maths-tutoring', is18Catalog: true, tag: 'Standard 18 Service' },

  // 4. handyman
  { title: 'TV wall mounting & frame drilling', category: 'HOME REPAIR', serviceId: 'handyman', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Curtain rod, mirror & blind installation', category: 'HOME REPAIR', serviceId: 'handyman', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'IKEA & modular furniture flatpack assembly', category: 'HOME REPAIR', serviceId: 'handyman', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Door lock, latch & bolt installation', category: 'HOME REPAIR', serviceId: 'handyman', is18Catalog: true, tag: 'Standard 18 Service' },

  // 5. electrician
  { title: 'Switchboard, socket & plug replacement', category: 'REPAIRS', serviceId: 'electrician', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Ceiling fan installation & capacitor fix', category: 'REPAIRS', serviceId: 'electrician', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'MCB tripping & short circuit inspection', category: 'REPAIRS', serviceId: 'electrician', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Inverter wiring & battery connection', category: 'REPAIRS', serviceId: 'electrician', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'LED lights & chandelier fitting', category: 'REPAIRS', serviceId: 'electrician', is18Catalog: true, tag: 'Standard 18 Service' },

  // 6. plumbing
  { title: 'Plumbing pipe leak repair & sealing', category: 'HOME REPAIR', serviceId: 'plumbing', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Bathroom tap, mixer & shower repair', category: 'HOME REPAIR', serviceId: 'plumbing', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Drain clog, sink trap & pipe unblocking', category: 'HOME REPAIR', serviceId: 'plumbing', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Toilet flush cistern & valve fix', category: 'HOME REPAIR', serviceId: 'plumbing', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Overhead water tank float valve repair', category: 'HOME REPAIR', serviceId: 'plumbing', is18Catalog: true, tag: 'Standard 18 Service' },

  // 7. carpentry
  { title: 'Wooden furniture & chair leg repair', category: 'CARPENTRY', serviceId: 'carpentry', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Wardrobe sliding door & hinge alignment', category: 'CARPENTRY', serviceId: 'carpentry', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Custom wooden shelf & cabinet fitting', category: 'CARPENTRY', serviceId: 'carpentry', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Sofa frame reinforcement & woodwork', category: 'CARPENTRY', serviceId: 'carpentry', is18Catalog: true, tag: 'Standard 18 Service' },

  // 8. babysitting
  { title: 'Evening babysitting & toddler care', category: 'CHILDCARE', serviceId: 'babysitting', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Infant care nanny & feeding routine support', category: 'CHILDCARE', serviceId: 'babysitting', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'After-school child supervision & playtime', category: 'CHILDCARE', serviceId: 'babysitting', is18Catalog: true, tag: 'Standard 18 Service' },

  // 9. pet-care
  { title: 'Daily morning & evening dog walking', category: 'PETS', serviceId: 'pet-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Pet sitting at home while travelling', category: 'PETS', serviceId: 'pet-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Cat feeding, litter cleaning & care', category: 'PETS', serviceId: 'pet-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Dog bath, nail trim & basic grooming', category: 'PETS', serviceId: 'pet-care', is18Catalog: true, tag: 'Standard 18 Service' },

  // 10. home-organisation
  { title: 'Wardrobe decluttering & seasonal organization', category: 'ORGANISING', serviceId: 'home-organisation', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Modular kitchen pantry tidying & jar labeling', category: 'ORGANISING', serviceId: 'home-organisation', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Home study & bookshelf decluttering', category: 'ORGANISING', serviceId: 'home-organisation', is18Catalog: true, tag: 'Standard 18 Service' },

  // 11. tech-help
  { title: 'Laptop performance boost & malware removal', category: 'TECH HELP', serviceId: 'tech-help', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Home Wi-Fi router setup & mesh extension', category: 'TECH HELP', serviceId: 'tech-help', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Printer setup & wireless driver fixing', category: 'TECH HELP', serviceId: 'tech-help', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Windows/MacOS formatting & data backup', category: 'TECH HELP', serviceId: 'tech-help', is18Catalog: true, tag: 'Standard 18 Service' },

  // 12. garden-care
  { title: 'Lawn mowing, edging & grass trimming', category: 'GARDEN', serviceId: 'garden-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Balcony plants repotting, pruning & soil fertilizing', category: 'GARDEN', serviceId: 'garden-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Garden weed removal & seasonal care', category: 'GARDEN', serviceId: 'garden-care', is18Catalog: true, tag: 'Standard 18 Service' },

  // 13. appliances
  { title: 'Split AC deep jet cleaning & gas top-up', category: 'APPLIANCES', serviceId: 'appliances', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'AC not cooling & compressor diagnostic', category: 'APPLIANCES', serviceId: 'appliances', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Refrigerator cooling & freezer ice buildup fix', category: 'APPLIANCES', serviceId: 'appliances', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Washing machine drum vibration & drain motor repair', category: 'APPLIANCES', serviceId: 'appliances', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Microwave oven heating plate & magnetron repair', category: 'APPLIANCES', serviceId: 'appliances', is18Catalog: true, tag: 'Standard 18 Service' },

  // 14. painting
  { title: 'Interior room wall painting & touch-up', category: 'PAINTING', serviceId: 'painting', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Damp wall seepage & waterproofing treatment', category: 'PAINTING', serviceId: 'painting', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Accent feature wall painting & stencil design', category: 'PAINTING', serviceId: 'painting', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Ceiling whitewash & primer recoat', category: 'PAINTING', serviceId: 'painting', is18Catalog: true, tag: 'Standard 18 Service' },

  // 15. fitness
  { title: 'Personal fitness & gym workout coach at home', category: 'FITNESS', serviceId: 'fitness', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Morning yoga, pranayama & flexibility training', category: 'FITNESS', serviceId: 'fitness', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Weight loss, HIIT & stamina training', category: 'FITNESS', serviceId: 'fitness', is18Catalog: true, tag: 'Standard 18 Service' },

  // 16. auto-care
  { title: 'Doorstep exterior foam car wash & rinse', category: 'AUTO CARE', serviceId: 'auto-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Deep interior car vacuuming & dashboard polish', category: 'AUTO CARE', serviceId: 'auto-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Two-wheeler bike wash, chain lube & shine', category: 'AUTO CARE', serviceId: 'auto-care', is18Catalog: true, tag: 'Standard 18 Service' },

  // 17. pest-control
  { title: 'Odorless cockroach herbal gel pest control', category: 'HOME SAFETY', serviceId: 'pest-control', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Bedbug eradication chemical treatment', category: 'HOME SAFETY', serviceId: 'pest-control', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Termite anti-drill wood & wall protection', category: 'HOME SAFETY', serviceId: 'pest-control', is18Catalog: true, tag: 'Standard 18 Service' },

  // 18. senior-care
  { title: 'Elderly companionship & gentle daily assistance', category: 'ASSISTANCE', serviceId: 'senior-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Senior mobility support for doctor clinic visits', category: 'ASSISTANCE', serviceId: 'senior-care', is18Catalog: true, tag: 'Standard 18 Service' },
  { title: 'Daily medication reminder & routine checking', category: 'ASSISTANCE', serviceId: 'senior-care', is18Catalog: true, tag: 'Standard 18 Service' },

  // Popular custom pool tasks
  { title: 'Home cook for North/South Indian meals', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' },
  { title: 'Balcony pigeon bird netting & spike setup', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' },
  { title: 'Event & birthday party photographer', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' },
  { title: 'Custom tailoring, blouse & dress alterations', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' },
  { title: 'Heavy furniture moving & tempo luggage loading', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' },
  { title: 'Guitar & musical keyboard home classes', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' },
  { title: 'CCTV camera installation & DVR wiring', category: 'OPEN POOL', serviceId: null, is18Catalog: false, tag: 'Custom Pro Work' }
];

/**
 * Fast Heuristic Search Suggestions Generator with Multilingual Hindi / Bangla / English Support
 */
function getHeuristicSuggestions(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  const tokens = q.split(/[^\p{L}\p{N}]+/u).filter(Boolean);

  const scored = [];
  const seenTitles = new Set();

  // Score popular tasks
  for (const task of POPULAR_SERVICE_TASKS) {
    const titleLower = task.title.toLowerCase();
    let score = 0;

    if (titleLower.startsWith(q)) {
      score += 30;
    } else if (titleLower.includes(q)) {
      score += 20;
    } else {
      let matches = 0;
      for (const tok of tokens) {
        if (titleLower.includes(tok)) matches++;
      }
      if (matches > 0) score += matches * 8;
    }

    // Match category
    if (task.category.toLowerCase().includes(q)) {
      score += 10;
    }

    if (score > 0 && !seenTitles.has(task.title)) {
      seenTitles.add(task.title);
      scored.push({ ...task, score });
    }
  }

  // Also score 18 catalog services directly
  for (const s of HUSTLE_18_SERVICES) {
    const nameLower = s.name.toLowerCase();
    let score = 0;

    if (nameLower.startsWith(q)) {
      score += 28;
    } else if (nameLower.includes(q)) {
      score += 18;
    } else {
      for (const kw of s.keywords) {
        const kwLower = kw.toLowerCase();
        if (kwLower.startsWith(q) || q.startsWith(kwLower)) {
          score += 16;
          break;
        } else if (kwLower.includes(q) || q.includes(kwLower)) {
          score += 12;
          break;
        } else {
          for (const tok of tokens) {
            if (kwLower.includes(tok)) {
              score += 6;
              break;
            }
          }
        }
      }
    }

    const serviceTitle = `${s.name} (${s.description.split(',')[0].trim()})`;
    if (score > 0 && !seenTitles.has(s.name) && !seenTitles.has(serviceTitle)) {
      seenTitles.add(s.name);
      scored.push({
        title: s.name,
        category: s.category,
        serviceId: s.id,
        is18Catalog: true,
        tag: 'Standard 18 Service',
        score
      });
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map(({ score, ...item }) => item);
}

/**
 * Get AI-Powered Search Suggestions as user types
 * Uses Gemini 1.5 Flash with fallback to instant local heuristics.
 */
async function getSearchSuggestions(partialQuery, city = 'Bengaluru') {
  if (!partialQuery || !partialQuery.trim()) {
    return [];
  }

  const cleanQuery = partialQuery.trim();
  const suggCacheKey = `sugg:${city}:${cleanQuery.toLowerCase()}`;
  const cached = getCache(suggCacheKey);
  if (cached) return cached;

  const heuristics = getHeuristicSuggestions(cleanQuery);

  // If query is short or heuristic already found high quality catalog matches, return instantly!
  if (cleanQuery.length < 2 || heuristics.length >= 3) {
    setCache(suggCacheKey, heuristics, 1000 * 60 * 60);
    return heuristics;
  }

  const servicesCatalogBrief = HUSTLE_18_SERVICES.map(s => `"${s.name}" (ID: ${s.id}, Category: ${s.category})`).join(', ');

  const prompt = `You are Hustle AI, an intelligent search autocompletion engine for an on-demand service app.
A customer in ${city} is currently typing in the search box: "${cleanQuery}".

Predict and suggest 4 to 5 specific, high-intent, natural service works / tasks that the user is likely searching for.
Our 18 standard catalog services are:
${servicesCatalogBrief}

For each suggestion:
- "title": A clear, concise, actionable service work title (e.g. "Plumbing pipe leak repair", "Split AC jet service", "Wall damp seepage repair", "Balcony bird netting setup")
- "category": Category name (e.g. HOME REPAIR, APPLIANCES, PAINTING, or OPEN POOL)
- "serviceId": Matching service ID from our 18 catalog services, or null if custom
- "is18Catalog": true if it matches one of the 18 catalog services, false otherwise
- "tag": "Standard 18 Service" if is18Catalog is true, otherwise "Custom Pro Work"

Respond ONLY with valid JSON in this exact structure:
{
  "suggestions": [
    {
      "title": "Task title",
      "category": "Category name",
      "serviceId": "id or null",
      "is18Catalog": true,
      "tag": "Standard 18 Service"
    }
  ]
}`;

  try {
    const rawAiText = await callGeminiApi(prompt);
    const parsed = cleanJsonOutput(rawAiText);
    if (parsed && Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
      const normalized = parsed.suggestions
        .filter(s => s && typeof s.title === 'string' && s.title.trim().length > 0)
        .map(s => {
          const matched18 = s.serviceId ? HUSTLE_18_SERVICES.find(srv => srv.id === s.serviceId) : null;
          return {
            title: s.title.trim(),
            category: matched18 ? matched18.category : (s.category || 'General Service'),
            serviceId: matched18 ? matched18.id : (s.is18Catalog ? s.serviceId : null),
            is18Catalog: Boolean(matched18 || s.is18Catalog),
            tag: Boolean(matched18 || s.is18Catalog) ? 'Standard 18 Service' : (s.tag || 'Custom Pro Work')
          };
        });

      if (normalized.length > 0) {
        const finalSugg = normalized.slice(0, 5);
        setCache(suggCacheKey, finalSugg, 1000 * 60 * 60);
        return finalSugg;
      }
    }
  } catch (err) {
    console.warn('[Gemini AI] Search suggestions fallback engaged:', err.message);
  }

  setCache(suggCacheKey, heuristics, 1000 * 60 * 30);
  return heuristics;
}

/**
 * Generate Professional Worker Bio
 */
async function generateWorkerBio(workerName, skills = [], experienceYears = 3, city = 'Bengaluru') {
  const name = workerName || 'Professional Partner';
  const skillList = Array.isArray(skills) ? skills.join(', ') : String(skills);

  const prompt = `You are a professional talent profile copywriter for Hustle.
Write an engaging, trustworthy 2-3 sentence bio for a skilled worker named ${name}.
Trades / Skills: ${skillList}.
Experience: ${experienceYears} years.
City: ${city}.
Tone: Punctual, reliable, safety-conscious, and verified.
Do NOT use quotes. Respond with just the bio text.`;

  try {
    const rawAiText = await callGeminiApi(prompt);
    if (rawAiText && rawAiText.trim().length > 20) {
      return {
        success: true,
        bio: rawAiText.trim()
      };
    }
  } catch (err) {
    console.warn('[Gemini AI] Worker bio fallback engaged:', err.message);
  }

  return {
    success: true,
    bio: `Certified ${skillList || 'trade'} specialist with over ${experienceYears} years of hands-on field experience in ${city}. Committed to punctual arrival, transparent communication, and 100% satisfaction on every appointment.`
  };
}

/**
 * Match a worker's custom self-written skill (for workers who chose "Other")
 * against the customer's demanded pool skill using Gemini AI.
 * Returns: { isSimilar: boolean, reason: string, workerSkill: string, demandedSkill: string }
 */
async function matchOtherSkillWithDemand(workerSpecificSkill, demandedSkill) {
  if (!workerSpecificSkill || !demandedSkill) {
    return {
      isSimilar: false,
      reason: 'Missing skill descriptions',
      workerSkill: workerSpecificSkill || '',
      demandedSkill: demandedSkill || ''
    };
  }

  const prompt = `You are Hustle AI Skill Matchmaker for an on-demand services platform.
A customer posted a custom pool appointment with a specific task requirement: "${demandedSkill}".
A verified local gig worker registered with the trade category "Other" and wrote their own specific skill: "${workerSpecificSkill}".

Task: Determine if the worker's registered skill is SIMILAR, RELEVANT, or CAPABLE of performing the customer's demanded need.
Respond with strict JSON only in this format:
{
  "isSimilar": true or false,
  "reason": "Clear concise 1-sentence explanation of why they are similar or why they are unrelated",
  "confidence": 0.0 to 1.0
}

Guidelines:
- Return isSimilar: true if the worker's skill can reasonably perform or specialize in the customer's demanded service (e.g. "Sofa Upholstery & Cushioning" matches "Couch leather fix", "Maths Teacher" matches "Grade 10 Algebra", "Balcony Bird Netting" matches "Pigeon spike setup").
- Return isSimilar: false if the trades are fundamentally unrelated (e.g. "Sofa Upholstery" does NOT match "Plumbing pipe burst", "Yoga Trainer" does NOT match "Solar panel wiring").`;

  const systemInstruction = `You are an AI skill matching engine for local gig trades. Output strict JSON only.`;

  try {
    const rawAi = await callGeminiApi(prompt, systemInstruction);
    let parsed = null;
    const jsonMatch = rawAi.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    }
    if (parsed && typeof parsed.isSimilar === 'boolean') {
      return {
        isSimilar: parsed.isSimilar,
        reason: parsed.reason || (parsed.isSimilar ? `Worker skill "${workerSpecificSkill}" is suitable for "${demandedSkill}".` : `Worker skill is not suitable for "${demandedSkill}".`),
        confidence: parsed.confidence || 0.9,
        workerSkill: workerSpecificSkill,
        demandedSkill
      };
    }
  } catch (err) {
    console.warn('[Gemini AI] matchOtherSkillWithDemand fallback engaged:', err.message);
  }

  // Fallback matching
  let dbMatch = false;
  try {
    const db = require('./db');
    if (typeof db.skillsApproxMatch === 'function') {
      dbMatch = db.skillsApproxMatch(workerSpecificSkill, demandedSkill);
    }
  } catch {}

  return {
    isSimilar: dbMatch,
    reason: dbMatch
      ? `Worker skill "${workerSpecificSkill}" matches demanded need "${demandedSkill}".`
      : `Worker skill "${workerSpecificSkill}" is not related to "${demandedSkill}".`,
    confidence: dbMatch ? 0.85 : 0.15,
    workerSkill: workerSpecificSkill,
    demandedSkill,
    fallback: true
  };
}

/**
 * Detect script / language heuristics
 */
function detectLanguageHeuristic(text) {
  if (!text) return 'en';
  if (/[\u0980-\u09FF]/.test(text)) return 'bn';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  const lower = text.toLowerCase();
  if (/\b(amar|amader|lagbe|korbo|korte|kothay|bhalo|dorkar|bari|ghor|pani|jol|kemon)\b/.test(lower)) return 'bn';
  if (/\b(chahiye|karna|hoga|kripya|ghar|bijli|paani|kaam|theek|karein|kitna)\b/.test(lower)) return 'hi';
  return 'en';
}

/**
 * /**
 * Market Benchmark Fair Rate lookup
 */
function getCategoryBenchmarkRate(serviceNameOrTrade) {
  const lower = (serviceNameOrTrade || '').toLowerCase();
  for (const key in CATEGORY_BENCHMARKS) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      const b = CATEGORY_BENCHMARKS[key];
      return { min: b.min, max: b.max, defaultRate: b.avg || Math.round((b.min + b.max) / 2), rangeText: `₹${b.min}–₹${b.max}` };
    }
  }
  if (lower.includes('electr') || lower.includes('बिजली') || lower.includes('ইলেকট্রিক') || lower.includes('কারেন্ট')) return { min: 299, max: 899, defaultRate: 499, rangeText: '₹300–₹900' };
  if (lower.includes('plumb') || lower.includes('नल') || lower.includes('প্লাম্বার') || lower.includes('প্লাম্বিং') || lower.includes('পানি') || lower.includes('জল লিক')) return { min: 299, max: 799, defaultRate: 499, rangeText: '₹300–₹800' };
  if (lower.includes('clean') || lower.includes('सफाई') || lower.includes('পরিষ্কার') || lower.includes('ঝাড়ু') || lower.includes('পোছা')) return { min: 499, max: 2499, defaultRate: 1199, rangeText: '₹500–₹2,500' };
  if (lower.includes('carpent') || lower.includes('बढ़ई') || lower.includes('কাঠমিস্ত্রি') || lower.includes('ফার্নিচার') || lower.includes('দরজা')) return { min: 349, max: 1199, defaultRate: 599, rangeText: '₹350–₹1,200' };
  if (lower.includes('handy') || lower.includes('drill') || lower.includes('assembl') || lower.includes('हैंडीमैन') || lower.includes('ড্রিল')) return { min: 299, max: 799, defaultRate: 449, rangeText: '₹300–₹800' };
  if (lower.includes('appliance') || lower.includes('ac') || lower.includes('fridge') || lower.includes('refrigerat') || lower.includes('washing') || lower.includes('एसी') || lower.includes('ফ্রিজ')) return { min: 399, max: 1299, defaultRate: 699, rangeText: '₹400–₹1,300' };
  if (lower.includes('tutor') || lower.includes('math') || lower.includes('scienc') || lower.includes('शिक्षक') || lower.includes('টিউশন') || lower.includes('ট्यूशन') || lower.includes('পড়ানো')) return { min: 300, max: 900, defaultRate: 500, rangeText: '₹300–₹900' };
  if (lower.includes('paint') || lower.includes('waterproof') || lower.includes('पेंट') || lower.includes('पुताई') || lower.includes('পেইন্ট') || lower.includes('রং')) return { min: 499, max: 3500, defaultRate: 1499, rangeText: '₹500–₹3,500' };
  if (lower.includes('baby') || lower.includes('child') || lower.includes('nanny') || lower.includes('बच्चा') || lower.includes('दाई') || lower.includes('আয়া') || lower.includes('শিশু')) return { min: 249, max: 799, defaultRate: 399, rangeText: '₹250–₹800' };
  if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat') || lower.includes('कुत्ता') || lower.includes('पालतू') || lower.includes('কুকুর') || lower.includes('পোষ্য')) return { min: 250, max: 700, defaultRate: 400, rangeText: '₹250–₹700' };
  if (lower.includes('spa') || lower.includes('massag') || lower.includes('salon') || lower.includes('स्पा') || lower.includes('मसाज') || lower.includes('মালিশ') || lower.includes('স্পা') || lower.includes('ম্যাসাজ')) return { min: 699, max: 1999, defaultRate: 1199, rangeText: '₹700–₹2,000' };
  if (lower.includes('yoga') || lower.includes('fitness') || lower.includes('gym') || lower.includes('workout') || lower.includes('योग') || lower.includes('व्यायाम') || lower.includes('ব্যায়াম') || lower.includes('যোগ')) return { min: 499, max: 1499, defaultRate: 799, rangeText: '₹500–₹1,500' };
  if (lower.includes('auto') || lower.includes('car') || lower.includes('bike') || lower.includes('गाड़ी') || lower.includes('कार') || lower.includes('গাড়ি')) return { min: 399, max: 1299, defaultRate: 599, rangeText: '₹400–₹1,300' };
  if (lower.includes('pest') || lower.includes('termite') || lower.includes('cockroach') || lower.includes('कीट') || lower.includes('दीमक') || lower.includes('কীটপতঙ্গ') || lower.includes('উইপোকা')) return { min: 599, max: 1899, defaultRate: 899, rangeText: '₹600–₹1,900' };
  if (lower.includes('organis') || lower.includes('organiz') || lower.includes('wardrob') || lower.includes('closet') || lower.includes('अलमारी') || lower.includes('গোছানো')) return { min: 499, max: 1499, defaultRate: 799, rangeText: '₹500–₹1,500' };
  if (lower.includes('garden') || lower.includes('plant') || lower.includes('lawn') || lower.includes('माली') || lower.includes('पौधे') || lower.includes('বাগান') || lower.includes('গাছপালা')) return { min: 300, max: 999, defaultRate: 550, rangeText: '₹300–₹1,000' };
  if (lower.includes('tech') || lower.includes('laptop') || lower.includes('wifi') || lower.includes('comput') || lower.includes('लैपटॉप') || lower.includes('ল্যাপটপ') || lower.includes('কম্পিউটার')) return { min: 349, max: 999, defaultRate: 549, rangeText: '₹350–₹1,000' };
  if (lower.includes('senior') || lower.includes('elder') || lower.includes('बुजुर्ग') || lower.includes('वृद्ध') || lower.includes('প্রবীণ') || lower.includes('বয়স্ক')) return { min: 349, max: 899, defaultRate: 499, rangeText: '₹350–₹900' };
  return { min: 400, max: 800, defaultRate: 600, rangeText: '₹400–₹800' };
}

/**
 * /**
 * Natural Language Extraction for Customer Service Requirements
 */
function heuristicExtractRequirements(query, structuredState = null, preferredLanguage = null) {
  const normQuery = normalizeIndicDigits(query || '');
  const lower = normQuery.toLowerCase().trim();
  let detectedLang = detectLanguageHeuristic(query);

  const fallbackLang = preferredLanguage || (structuredState && structuredState.preferredLanguage) || (structuredState && structuredState.detectedLanguage);

  // If query is neutral (e.g. numbers "500", chip click "09:00 AM", "Kolkata", "1") retain language preference
  if (detectedLang === 'en' && fallbackLang && fallbackLang !== 'en') {
    const isPurelyNeutral = /^[\d\s.,:\-–()/₹$★\uD800-\uDBFF\uDC00-\uDFFF]+$/.test(normQuery.trim()) ||
      ['kolkata', 'bengaluru', 'mumbai', 'delhi', 'chennai', 'pune', 'hyderabad', 'ahmedabad'].includes(lower) ||
      /^(?:option|choice|worker|number|no\.?|yes|confirm|proceed|ok|okay)\s*\d*$/i.test(lower);
    if (isPurelyNeutral) {
      detectedLang = fallbackLang;
    }
  }

  // 1. Confirmation check
  const confirmTerms = [
    'yes', 'confirm', 'confirmed', 'proceed', 'book now', 'book it', 'agree', 'sure', 'okay', 'ok', 'post it', 'post request', 'do it', 'haan', 'ha', 'theek hai', 'theek h', 'kardo', 'karo',
    'हाँ', 'हां', 'कर दो', 'करो', 'पुष्टि', 'पुष्टि करें', 'पक्का', 'ठीक है', 'হ্যাঁ', 'হাঁ', 'বুক করুন', 'বুক করো', 'সম্মত', 'নিশ্চিত', 'নিশ্চিত করুন', 'চাকরি দিন', 'বুকিং দিন', 'পোস্ট করো', 'পোস্ট করুন', 'করুন'
  ];
  const isConfirmation = confirmTerms.some(term => {
    if (/^[a-zA-Z0-9\s]+$/.test(term)) {
      return new RegExp(`\\b${term}\\b`, 'i').test(lower) || lower === term;
    }
    return lower.includes(term);
  });

  // 2. Modification / Change intent check
  const isChangeTime = ['change time', 'time change', 'समय बदलें', 'समय बदलो', 'সময় পরিবর্তন', 'সময় বদলাও'].some(t => lower.includes(t));
  const isChangeRate = [
    'change rate', 'change budget', 'rate change', 'budget change', 'change price', 'price change',
    'bargain', 'bargaining', 'negotiate', 'negotiation', 'counter offer', 'counter-offer', 'make an offer', 'offer', 'propose rate', 'propose budget',
    'बजट बदलें', 'दर बदलें', 'मोलभाव', 'सौदा', 'दाम बदलो', 'बजट बदलो', 'बजट परिवर्तन', 'रेट परिवर्तन', 'दर बदलो', 'प्रस्ताव',
    'বাজেট পরিবর্তন', 'রেট পরিবর্তন', 'দাম পরিবর্তন', 'দরদাম', 'অফার', 'বাজেট বদলাও', 'দাম কমাও', 'বাজেট বদল', 'দর বদলাও'
  ].some(t => {
    if (/^[a-zA-Z0-9\s]+$/.test(t)) {
      return new RegExp(`\\b${t}\\b`, 'i').test(lower);
    }
    return lower.includes(t);
  });
  const isChangeDate = ['change date', 'date change', 'तारीख बदलें', 'তারিখ পরিবর্তন'].some(t => lower.includes(t));

  const modifyTerms = ['change', 'modify', 'make it', 'set to', 'instead', 'बदलो', 'बदल', 'बदलें', 'পরিবর্তন', 'বদলাও'];
  const isModification = modifyTerms.some(term => {
    if (/^[a-zA-Z0-9\s]+$/.test(term)) {
      return new RegExp(`\\b${term}\\b`, 'i').test(lower);
    }
    return lower.includes(term);
  });

  // 3. Worker Selection check
  let workerSelectIntent = null;

  // Check chip click format e.g. "1. Subhashis Banerjee (★4.95 · ₹349)" or "১. অনির্বাণ দাস"
  const chipWorkerMatch = lower.match(/^([1-5])\s*[\.\-\)]\s*([a-z\u0900-\u097F\u0980-\u09FF\s]+)/i);
  if (chipWorkerMatch) {
    workerSelectIntent = chipWorkerMatch[1];
  }

  // Direct numbered or ordinal selection e.g. "1", "2", "3", "1st", "2nd", "पहला", "दूसरा", "১", "২", "৩", "১ম", "২য়"
  if (!workerSelectIntent) {
    const numberSelectPatterns = [
      {
        key: '1',
        regex: /^(?:option|worker|specialist|pro|number|no\.?|choice|नंबर|নম্বর)?\s*(?:1|1st|first|১|১ম|প্রথম|पहला)(?:\s*(?:option|worker|specialist|pro|person|वाला|জন|টা))?$/i,
        inlineRegex: /(?:option|worker|specialist|number|no\.?|pro|choice|नंबर|নম্বর)\s*(?:1|1st|first|১|১ম|প্রথম|पहলা)\b|\b(?:1st|first|প্রথম|पहला)\s+(?:option|worker|specialist|pro|person|वाला|জন)/i
      },
      {
        key: '2',
        regex: /^(?:option|worker|specialist|pro|number|no\.?|choice|नंबर|নম্বর)?\s*(?:2|2nd|second|২|২য়|দ্বিতীয়|दूसरा)(?:\s*(?:option|worker|specialist|pro|person|वाला|জন|টা))?$/i,
        inlineRegex: /(?:option|worker|specialist|number|no\.?|pro|choice|नंबर|নম্বর)\s*(?:2|2nd|second|২|২য়|দ্বিতীয়|दूसरा)\b|\b(?:2nd|second|দ্বিতীয়|दूसरा)\s+(?:option|worker|specialist|pro|person|वाला|জন)/i
      },
      {
        key: '3',
        regex: /^(?:option|worker|specialist|pro|number|no\.?|choice|नंबर|নম্বর)?\s*(?:3|3rd|third|৩|৩য়|তৃতীয়|तीसरा)(?:\s*(?:option|worker|specialist|pro|person|वाला|জন|টা))?$/i,
        inlineRegex: /(?:option|worker|specialist|number|no\.?|pro|choice|नंबर|নম্বর)\s*(?:3|3rd|third|৩|৩য়|তৃতীয়|तीसरा)\b|\b(?:3rd|third|তৃতীয়|तीसरा)\s+(?:option|worker|specialist|pro|person|वाला|জন)/i
      },
      {
        key: '4',
        regex: /^(?:option|worker|specialist|pro|number|no\.?|choice|नंबर|নম্বর)?\s*(?:4|4th|fourth|৪|৪র্থ|চতুর্থ|चौथा)(?:\s*(?:option|worker|specialist|pro|person|वाला|জন|টা))?$/i,
        inlineRegex: /(?:option|worker|specialist|number|no\.?|pro|choice|नंबर|নম্বর)\s*(?:4|4th|fourth|৪|৪র্থ|চতুর্থ|चौथा)\b|\b(?:4th|fourth|চতুর্থ|चौथा)\s+(?:option|worker|specialist|pro|person|वाला|জন)/i
      },
      {
        key: '5',
        regex: /^(?:option|worker|specialist|pro|number|no\.?|choice|नंबर|নম্বর)?\s*(?:5|5th|fifth|৫|৫ম|পঞ্চম|पाँचवाँ)(?:\s*(?:option|worker|specialist|pro|person|वाला|জন|টা))?$/i,
        inlineRegex: /(?:option|worker|specialist|number|no\.?|pro|choice|नंबर|নম্বর)\s*(?:5|5th|fifth|৫|৫ম|পঞ্চম|पाँचवाँ)\b|\b(?:5th|fifth|পঞ্চম|पाँचवाँ)\s+(?:option|worker|specialist|pro|person|वाला|জন)/i
      }
    ];

    for (const item of numberSelectPatterns) {
      if (item.regex.test(lower.trim()) || item.inlineRegex.test(lower)) {
        workerSelectIntent = item.key;
        break;
      }
    }
  }

  // Named selection e.g. "Book Ramesh", "Select Virender", "Hire Swapan Mondal", "রমেশকে বুক করুন"
  if (!workerSelectIntent) {
    const workerBookMatch = lower.match(/(?:book|select|choose|hire|with|বুক|সিলেক্ট|বাছাই|হায়ার|बुक|चुनें|के साथ|साथ)\s+([a-z\u0900-\u097F\u0980-\u09FF\s]{2,30})/i);
    if (workerBookMatch && workerBookMatch[1]) {
      const candidate = workerBookMatch[1].trim();
      const ignoreList = ['now', 'today', 'tomorrow', 'electrician', 'plumber', 'cleaner', 'service', 'appointment', 'request', 'pool', 'direct', 'this', 'worker', 'urgent', 'help'];
      if (!ignoreList.includes(candidate)) {
        workerSelectIntent = candidate;
      }
    }
  }

  // Check if query matches a known worker name from availableWorkerNames in state
  if (!workerSelectIntent && structuredState && structuredState.availableWorkerNames && Array.isArray(structuredState.availableWorkerNames)) {
    for (const name of structuredState.availableWorkerNames) {
      const trimmedName = (name || '').trim().toLowerCase();
      if (trimmedName.length >= 3 && lower.includes(trimmedName)) {
        workerSelectIntent = name;
        break;
      }
    }
  }

  // 4. Rate extraction (e.g. "800 rupees", "₹600", "budget 500", "offer 400", "বজট 800", "৫০০ টাকা", "500")
  let extractedRate = null;
  const chipRateMatch = normQuery.match(/₹\s*(\d+)/);
  if (chipRateMatch && chipRateMatch[1]) {
    const num = parseInt(chipRateMatch[1], 10);
    if (num >= 50 && num <= 100000) {
      extractedRate = num;
    }
  }

  if (!extractedRate) {
    const rateMatch =
      lower.match(/(?:₹|rs\.?|inr|rupees|টাকা|রুপিয়া|রুপিতে|रुपये|रुपए|bucks)\s*(\d+)/i) ||
      lower.match(/(\d+)\s*(?:₹|rs\.?|inr|rupees|টাকা|রুপিয়া|রুপিতে|रुपये|रुपए|bucks)/i) ||
      lower.match(/(?:budget|rate|price|offer|bargain|counter|proposed?|amount|बजট|बजट|বাজেট|রেট|रेट|অফার|দাম|দর|প্রস্তাব|मोलभाव)\s*(?:is|to|of|for|=|:|হিসেবে|কে|के लिए|में)?\s*(?:₹|rs\.?)?\s*(\d+)/i) ||
      lower.match(/(?:make it|set to|reduce to|cut to|adjust to|bring down to|कम करो|किए|কমাও|কমিয়ে|কমিয়ে|ফাইনাল|फाइनल)\s*(?:₹|rs\.?)?\s*(\d+)/i);
    if (rateMatch) {
      const numStr = rateMatch[1] || rateMatch[2];
      const num = parseInt(numStr, 10);
      if (num >= 50 && num <= 100000) {
        extractedRate = num;
      }
    }
  }

  // Direct number if user just replied with a budget number (e.g. "500" or "৭৫০")
  if (!extractedRate && /^\s*(\d{2,6})\s*$/.test(normQuery)) {
    const num = parseInt(normQuery.trim(), 10);
    if (num >= 50 && num <= 100000) {
      extractedRate = num;
    }
  }

  // 5. Date extraction with STRICT PRIORITY: Day after tomorrow > Tomorrow > Today > Named Days
  let extractedDate = null;
  let formattedDateText = null;
  const now = new Date();

  const dayAfterTerms = [
    'day after tomorrow', 'day after', 'parson', 'parso', 'porashu', 'porso',
    'পরশু', 'পরশুদিন', 'পরশু দিন', 'পরশু বেলা', 'परसों', 'परसो', '२ दिन बाद', '2 दिन बाद', '2 দিন পর', '২ দিন পর', '2 days later', 'day after tmrw', 'day after tommorow'
  ];
  const tomorrowTerms = [
    'tomorrow', 'tommorow', 'tmrw', 'kal', 'kalke', 'kalkey', 'agami kal', 'agamikal',
    'কাল', 'কালকে', 'আগামীকাল', 'আগামী কাল', 'কাল সকালে', 'কাল দুপুরে', 'কাল বিকেলে', 'কাল সন্ধ্যায়', 'কাল রাতে',
    'कल', 'कल सुबह', 'कल शाम', 'कल दोपहर', 'कल रात', '१ दिन बाद', '1 दिन बाद', '1 দিন পর', '১ দিন পর', 'next day'
  ];
  const todayTerms = [
    'today', 'aaj', 'aajke', 'ajke', 'tonight', 'this morning', 'this evening', 'this afternoon',
    'আজ', 'আজকে', 'আজই', 'আজ সকালে', 'আজ দুপুরে', 'আজ বিকেলে',
    'आज', 'आज ही', 'आज सुबह', 'आज शाम', 'आज दोपहर', 'right now', 'এখনই', 'এখন'
  ];

  // (A) Day after tomorrow (Priority 1)
  if (dayAfterTerms.some(t => lower.includes(t))) {
    const dat = new Date();
    dat.setDate(now.getDate() + 2);
    extractedDate = dat.toISOString().split('T')[0];
    const dayName = dat.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    formattedDateText = detectedLang === 'bn' ? `পরশু (${dayName})` : (detectedLang === 'hi' ? `परसों (${dayName})` : `Day after tomorrow (${dayName})`);
  }
  // (B) Tomorrow (Priority 2)
  else if (tomorrowTerms.some(t => lower.includes(t))) {
    const tom = new Date();
    tom.setDate(now.getDate() + 1);
    extractedDate = tom.toISOString().split('T')[0];
    const dayName = tom.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    formattedDateText = detectedLang === 'bn' ? `আগামীকাল (${dayName})` : (detectedLang === 'hi' ? `कल (${dayName})` : `Tomorrow (${dayName})`);
  }
  // (C) Today (Priority 3)
  else if (todayTerms.some(t => lower.includes(t))) {
    extractedDate = now.toISOString().split('T')[0];
    const dayName = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    formattedDateText = detectedLang === 'bn' ? `আজ (${dayName})` : (detectedLang === 'hi' ? `आज (${dayName})` : `Today (${dayName})`);
  }
  // (D) Day of week (e.g. this saturday, next monday, রবিবার, শনিবার, शनिवार)
  else if (['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'शनिवार', 'रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार'].some(d => lower.includes(d))) {
    const dayMap = {
      sunday: 0, রবিবার: 0, रविवार: 0,
      monday: 1, সোমবার: 1, सोमवार: 1,
      tuesday: 2, মঙ্গলবার: 2, मंगलवार: 2,
      wednesday: 3, বুধবার: 3, बुधवार: 3,
      thursday: 4, বৃহস্পতিবার: 4, गुरुवार: 4,
      friday: 5, শুক্রবার: 5, शुक्रवार: 5,
      saturday: 6, শনিবার: 6, शनिवार: 6
    };
    let targetDay = null;
    for (const d in dayMap) {
      if (lower.includes(d)) {
        targetDay = dayMap[d];
        break;
      }
    }
    if (targetDay !== null) {
      const d = new Date();
      const currentDay = d.getDay();
      let diff = targetDay - currentDay;
      if (diff <= 0) diff += 7;
      d.setDate(d.getDate() + diff);
      extractedDate = d.toISOString().split('T')[0];
      formattedDateText = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  }
  // (E) Explicit dates (e.g. "2026-09-15" or "15 sept")
  else {
    const isoDateMatch = lower.match(/\b(202\d-\d{2}-\d{2})\b/);
    if (isoDateMatch) {
      extractedDate = isoDateMatch[1];
      formattedDateText = extractedDate;
    } else {
      const explicitDateMatch = lower.match(/(\d{1,2})(?:st|nd|rd|th)?\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)/i);
      if (explicitDateMatch) {
        const monthNames = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', sept: '09', oct: '10', nov: '11', dec: '12' };
        const mon = explicitDateMatch[2].toLowerCase().slice(0, 3);
        const mm = monthNames[mon] || '09';
        const dd = explicitDateMatch[1].padStart(2, '0');
        extractedDate = `${now.getFullYear()}-${mm}-${dd}`;
        formattedDateText = `${explicitDateMatch[1]} ${explicitDateMatch[2].charAt(0).toUpperCase() + explicitDateMatch[2].slice(1)}`;
      }
    }
  }

  // 6. Time extraction (Unicode-safe substring, ranges, exact minutes, and regional colloquial patterns)
  let extractedTime = null;
  const chipTimeMatch = normQuery.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)\s*[–\-]\s*\d{1,2}:\d{2}\s*(?:AM|PM))/i);
  if (chipTimeMatch) {
    extractedTime = chipTimeMatch[1];
  } else {
    // Check custom range match e.g. "2 PM to 5 PM", "10 am - 1 pm", "2 to 5 pm", "2:00 PM - 5:00 PM"
    const rangeMatch = lower.match(/(\d{1,2}(?::\d{2})?)\s*(am|pm)?\s*(?:to|–|-|থেকে|সে|तक)\s*(\d{1,2}(?::\d{2})?)\s*(am|pm)/i);
    if (rangeMatch) {
      let t1 = rangeMatch[1];
      let ap1 = rangeMatch[2] ? rangeMatch[2].toUpperCase() : (rangeMatch[4] ? rangeMatch[4].toUpperCase() : 'PM');
      let t2 = rangeMatch[3];
      let ap2 = rangeMatch[4] ? rangeMatch[4].toUpperCase() : 'PM';
      if (!t1.includes(':')) t1 = `${t1}:00`;
      if (!t2.includes(':')) t2 = `${t2}:00`;
      if (t1.length === 4) t1 = '0' + t1;
      if (t2.length === 4) t2 = '0' + t2;
      extractedTime = `${t1} ${ap1} – ${t2} ${ap2}`;
    }

    // Check exact minute format e.g. "10:30", "11:15 AM", "2:30 PM", "10:30"
    if (!extractedTime) {
      const exactMinMatch = lower.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/i);
      if (exactMinMatch) {
        let h = parseInt(exactMinMatch[1], 10);
        let m = exactMinMatch[2];
        let ap = exactMinMatch[3] ? exactMinMatch[3].toUpperCase() : '';
        if (!ap) {
          if (h >= 7 && h <= 11) ap = 'AM';
          else if (h === 12) ap = 'PM';
          else if (h >= 1 && h <= 6) ap = 'PM';
          else if (h >= 13 && h <= 23) {
            h = h - 12;
            ap = 'PM';
          } else {
            ap = 'AM';
          }
        }
        extractedTime = `${h.toString().padStart(2, '0')}:${m} ${ap}`;
      }
    }

    // Check regional time phrases with hour & optional minutes
    if (!extractedTime) {
      // Bengali morning: সকাল ১০টা / সকাল ১০টা ৩০ / সকাল ৯টা
      const bnMorning = lower.match(/(?:সকাল|ভোর)\s*(\d{1,2})(?:\s*টা\s*(\d{2})?|:(\d{2})|\s*টায়|\s*টায়)?/i);
      if (bnMorning) {
        let h = parseInt(bnMorning[1], 10);
        let m = bnMorning[2] || bnMorning[3] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} AM`;
      }
    }
    if (!extractedTime) {
      // Bengali afternoon: দুপুর ২টো / দুপুর ২টো ৩০ / দুপুর ২ টোয়
      const bnNoon = lower.match(/(?:দুপুর)\s*(\d{1,2})(?:\s*(?:টা|টো|টায়|টায়)\s*(\d{2})?|:(\d{2}))?/i);
      if (bnNoon) {
        let h = parseInt(bnNoon[1], 10);
        let m = bnNoon[2] || bnNoon[3] || '00';
        let ap = (h === 12) ? 'PM' : 'PM';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} ${ap}`;
      }
    }
    if (!extractedTime) {
      // Bengali evening: বিকাল ৪টে / বিকাল ৪টা ৩০ / সন্ধ্যা ৭টা
      const bnEve = lower.match(/(?:বিকাল|বিকেল|সন্ধ্যা|সন্ধ্যায়)\s*(\d{1,2})(?:\s*(?:টা|টে|টো|টায়|টায়)\s*(\d{2})?|:(\d{2}))?/i);
      if (bnEve) {
        let h = parseInt(bnEve[1], 10);
        let m = bnEve[2] || bnEve[3] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} PM`;
      }
    }
    if (!extractedTime) {
      // Bengali night: রাত ৮টা / রাত ৯টা ৩০
      const bnNight = lower.match(/(?:রাত|রাতে)\s*(\d{1,2})(?:\s*(?:টা|টে|টো|টায়|টায়)\s*(\d{2})?|:(\d{2}))?/i);
      if (bnNight) {
        let h = parseInt(bnNight[1], 10);
        let m = bnNight[2] || bnNight[3] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} PM`;
      }
    }
    if (!extractedTime) {
      // Hindi morning: सुबह 10 बजे / सुबह 10:30 बजे
      const hiMorning = lower.match(/(?:सुबह|सवेरे)\s*(\d{1,2})(?::(\d{2})|\s*बजे)?/i);
      if (hiMorning) {
        let h = parseInt(hiMorning[1], 10);
        let m = hiMorning[2] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} AM`;
      }
    }
    if (!extractedTime) {
      // Hindi afternoon: दोपहर 2 बजे / दोपहर 2:30 बजे
      const hiNoon = lower.match(/(?:दोपहर)\s*(\d{1,2})(?::(\d{2})|\s*बजे)?/i);
      if (hiNoon) {
        let h = parseInt(hiNoon[1], 10);
        let m = hiNoon[2] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} PM`;
      }
    }
    if (!extractedTime) {
      // Hindi evening: शाम 5 बजे / शाम 6:30 बजे
      const hiEve = lower.match(/(?:शाम|सांझ)\s*(\d{1,2})(?::(\d{2})|\s*बजे)?/i);
      if (hiEve) {
        let h = parseInt(hiEve[1], 10);
        let m = hiEve[2] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} PM`;
      }
    }
    if (!extractedTime) {
      // Hindi night: रात 8 बजे / रात 9:30 बजे
      const hiNight = lower.match(/(?:रात)\s*(\d{1,2})(?::(\d{2})|\s*बजे)?/i);
      if (hiNight) {
        let h = parseInt(hiNight[1], 10);
        let m = hiNight[2] || '00';
        extractedTime = `${h.toString().padStart(2, '0')}:${m.padStart(2, '0')} PM`;
      }
    }
    if (!extractedTime) {
      // General Hour match with AM/PM or regional suffix (e.g. "4 PM", "4টে", "5 बजे")
      const hourMatch = lower.match(/(\d{1,2}(?::\d{2})?)\s*(am|pm)/i) || lower.match(/(\d{1,2})\s*(?:बजे|टा|টে|টো|o'clock)/i);
      if (hourMatch) {
        let hourPart = hourMatch[1];
        let ampm = hourMatch[2] ? hourMatch[2].toUpperCase() : '';
        if (!ampm) {
          const num = parseInt(hourPart, 10);
          ampm = (num >= 7 && num <= 11) ? 'AM' : 'PM';
        }
        if (!hourPart.includes(':')) hourPart = `${hourPart}:00`;
        if (hourPart.length === 4) hourPart = '0' + hourPart;
        extractedTime = `${hourPart} ${ampm}`;
      } else if (['morning', 'early morning', 'सुबह', 'सवेरे', 'সকাল', 'সকালে', 'ভোর', 'ভোরে'].some(w => lower.includes(w))) {
        extractedTime = '09:00 AM – 12:00 PM (Morning)';
      } else if (['afternoon', 'noon', 'दोपहर', 'দুপুর', 'দুপুরে'].some(w => lower.includes(w))) {
        extractedTime = '12:00 PM – 03:00 PM (Afternoon)';
      } else if (['late afternoon', 'evening', 'शाम', 'सांझ', 'সন্ধ্যা', 'সন্ধ্যায়', 'বিকেল', 'বিকেলে', 'বিকাল'].some(w => lower.includes(w))) {
        extractedTime = '06:00 PM – 09:00 PM (Evening)';
      } else if (['night', 'रात', 'রাত', 'রাতে'].some(w => lower.includes(w))) {
        extractedTime = '09:00 PM – 11:00 PM (Night)';
      } else if (['flexible', 'any time', 'anytime', 'कभी भी', 'যেকোনো সময়', 'যখন খুশি'].some(w => lower.includes(w))) {
        extractedTime = 'Flexible / Any Time';
      }
    }
  }

  // 7. Location extraction
  let extractedLocation = null;
  const knownLocations = [
    { name: 'Kolkata', terms: ['kolkata', 'কলকাতা', 'কলকাতায়', 'কলিকাতা', 'कोलकाता'] },
    { name: 'Chinsurah', terms: ['chinsurah', 'chinsura', 'চিনসুরা', 'চুঁচুড়া', 'চুচুড়া', 'चुंचुड़ा', 'चिनसुरा'] },
    { name: 'Chandannagar', terms: ['chandannagar', 'chandannagore', 'চন্দননগর', 'চন্দননগরে', 'चंदननगर'] },
    { name: 'Serampore', terms: ['serampore', 'sreerampur', 'শ্রীরামপুর', 'শ্রীরামপুরে', 'श्रीरामपुर'] },
    { name: 'Howrah', terms: ['howrah', 'হাওড়া', 'হাওড়ায়', 'हावड़ा'] },
    { name: 'Salt Lake', terms: ['salt lake', 'saltlake', 'সল্টলেক', 'সল্ট লেক', 'साल्ट लेक'] },
    { name: 'New Town', terms: ['new town', 'newtown', 'নিউ টাউন', 'নিউটাউন', 'न्यू टाउन'] },
    { name: 'Hooghly', terms: ['hooghly', 'hugli', 'হুগলি', 'হুগলী', 'हुगली'] },
    { name: 'Ballygunge', terms: ['ballygunge', 'বালিগঞ্জ', 'बालीगंज'] },
    { name: 'Dum Dum', terms: ['dum dum', 'dumdum', 'দমদম', 'दमदम'] },
    { name: 'Behala', terms: ['behala', 'বেহালা', 'बेहाला'] },
    { name: 'Jadavpur', terms: ['jadavpur', 'যাদবপুর', 'जादवपुर'] },
    { name: 'Bengaluru', terms: ['bengaluru', 'bangalore', 'বেঙ্গালুরু', 'ব্যাঙ্গালোর', 'बेंगलुरु', 'बैंगलोर'] },
    { name: 'Indiranagar', terms: ['indiranagar', 'ইন্দিরানগর', 'इंदिरानगर'] },
    { name: 'Koramangala', terms: ['koramangala', 'কোরামঙ্গলা', 'कोरमंगला'] },
    { name: 'Whitefield', terms: ['whitefield', 'হোয়াইটফিল্ড', 'व्हाइटफील्ड'] },
    { name: 'HSR Layout', terms: ['hsr layout', 'hsr'] },
    { name: 'Delhi', terms: ['delhi', 'new delhi', 'দিল্লি', 'নতুন দিল্লি', 'दिल्ली', 'नई दिल्ली'] },
    { name: 'Noida', terms: ['noida', 'नोएडा', 'নয়ডা'] },
    { name: 'Gurugram', terms: ['gurugram', 'gurgaon', 'गुरुग्राम', 'गुड़गांव', 'গুরুগ্রাম'] },
    { name: 'Mumbai', terms: ['mumbai', 'bombay', 'মুম্বাই', 'মুম্বই', 'मुंबई'] },
    { name: 'Thane', terms: ['thane', 'ठाणे', 'থানে'] },
    { name: 'Pune', terms: ['pune', 'पुणे', 'পুনে'] },
    { name: 'Hyderabad', terms: ['hyderabad', 'হায়দ্রাবাদ', 'हैदराबाद'] },
    { name: 'Chennai', terms: ['chennai', 'মাদ্রাজ', 'চেন্নাই', 'चेन्नई'] },
    { name: 'Ahmedabad', terms: ['ahmedabad', 'আহমেদাবাদ', 'अहमदाबाद'] }
  ];

  for (const locObj of knownLocations) {
    if (locObj.terms.some(t => {
      if (/^[a-zA-Z0-9\s]+$/.test(t)) {
        return new RegExp(`\\b${t}\\b`, 'i').test(lower);
      }
      return lower.includes(t);
    })) {
      extractedLocation = locObj.name;
      break;
    }
  }

  if (!extractedLocation) {
    const locPattern = lower.match(/\b(?:in|at|near|location|জায়গা|স্থান|शहर|शहर में|में|এলাকায়)\s+([a-z\u0900-\u097F\u0980-\u09FF\s]{3,20})\b/i);
    if (locPattern && locPattern[1]) {
      const candidate = locPattern[1].trim();
      const skipWords = ['tomorrow', 'today', 'morning', 'evening', 'afternoon', 'the', 'my', 'your', 'service', 'worker', 'urgent', 'need', 'please', 'help'];
      if (!skipWords.some(w => candidate.includes(w))) {
        extractedLocation = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }
  }

  // 8. Service / Trade extraction across 18 catalog trades
  let serviceName = null;
  let serviceId = null;

  const tradeKeywords = [
    { id: 'home-organisation', name: 'Home Organisation', keywords: ['wardrobe organisation', 'wardrobe organization', 'organise', 'organize', 'organisation', 'organization', 'declutter', 'decluttering', 'closet organisation', 'pantry organisation', 'tidying', 'storage arrangement', 'messy room', 'bikhra saman', 'গোছানো', 'ঘর গোছানো', 'আলমারি গোছানো', 'আলমারি সাজানো', 'ঘর পরিপাটি', 'অগোছালো জামাকাপড়', 'জিনিসপত্র গোছানো', 'अलमारी सजावट', 'सामान व्यवस्थित', 'घर की व्यवस्था', 'डिक्लटर', 'बिखरा हुआ सामान', 'कमरा व्यवस्थित'] },
    { id: 'auto-care', name: 'Auto Care & Car Wash', keywords: ['car wash', 'bike wash', 'auto care', 'car detailing', 'vehicle wash', 'foam wash', 'interior detailing', 'dashboard polish', 'waterless wash', 'car cleaning', 'bike cleaning', 'exterior polish', 'गाड़ी की पूरी सफाई', 'गाड़ी की सफाई', 'গাড়ি ওয়াশ', 'বাইক ওয়াশ', 'গাড়ি পরিষ্কার', 'গাড়ির সার্ভিস', 'কার ওয়াশ', 'কার ওয়াশিং', 'গাড়ির পালিশ', 'গাড়ি ধোয়া', 'কার ওয়াশ', 'কার ওয়াশিং', 'कार वॉश', 'गाड़ी धुलाई', 'बाइक वॉश', 'कार पॉलिश', 'गाड़ी सफाई', 'ऑटो केयर', 'इंटीरियर क्लीनिंग'] },
    { id: 'garden-care', name: 'Garden Care', keywords: ['gardener', 'garden', 'plant', 'lawn', 'grass', 'pruning', 'repotting', 'weeding', 'pots', 'balcony garden', 'plant pruning', 'lawn maintenance', 'soil change', 'বাগান', 'গাছপালা', 'টব', 'মালী', 'ঘাস কাটা', 'গাছ ছাঁটাই', 'বাগান পরিচর্যা', 'নতুন মাটি', 'টবে গাছ', 'বারান্দার বাগান', 'বগিচা', 'बगीचा', 'पौधे', 'माली', 'गमला', 'घास काटना', 'पौधों की देखभाल', 'गार्डनिंग', 'पौधों की कटाई', 'मिट्टी', 'बालकनी गार्डन'] },
    { id: 'handyman', name: 'Handyman', keywords: ['handyman', 'drill', 'drilling', 'curtain rod', 'mirror hanging', 'photo frame', 'wall mount', 'tv mount', 'shelf fitting', 'assembly pro', 'small fixes', 'hang mirror', 'fixture assembly', 'হ্যান্ডিম্যান', 'ড্রিল', 'ড্রিলিং', 'ছবি টাঙানো', 'আয়না টাঙানো', 'পর্দার রড', 'শেলফ ফিটিং', 'টিভি মাউন্ট', 'ওয়াল ড্রিলিং', 'ঘরের টুকিটাকি কাজ', 'हैंडीमैन', 'ड्रिल', 'ड्रिलिंग', 'पर्दा रॉड', 'आईना टांगना', 'शेल्फ फिटिंग', 'टीवी माउंट', 'दीवार में कील', 'फोटो फ्रेम'] },
    { id: 'spa-therapy', name: 'Spa & Massage', keywords: ['spa', 'massage', 'facial', 'pedicure', 'manicure', 'waxing', 'salon', 'beauty', 'haircut', 'wellness', 'head massage', 'body massage', 'therapy', 'relaxation', 'tired body', 'রূপচর্চা', 'ম্যাসাজ', 'ফেসিয়াল', 'চুল কাটা', 'ওয়াক্সিং', 'স্পা', 'সেলুন', 'বিউটি', 'বডি ম্যাসাজ', 'ক্লান্তি দূর', 'स्पा', 'मसाज', 'मालिश', 'फेशियल', 'बाल काटना', 'सैलून', 'ब्यूटी', 'मेनिक्योर', 'पेडिक्योर', 'बॉडी मसाज', 'थकान दूर'] },
    { id: 'tutoring', name: 'Tutoring', keywords: ['tutor', 'tutoring', 'math', 'maths', 'teach', 'learn', 'coaching', 'tuition', 'physics', 'science', 'chemistry', 'teacher', 'algebra', 'calculus', 'exam prep', 'academic', 'homework', 'শিক্ষক', 'গৃহশিক্ষক', 'অঙ্কের মাস্টারমশাই', 'অঙ্ক শেখানো', 'পড়াশোনার টিউটর', 'পরীক্ষার প্রস্তুতি', 'বিজ্ঞান শিক্ষক', 'টিউটর', 'পড়ানো', 'অঙ্ক', 'ম্যাথ', 'মাস্টারমশাই', 'টুইশন', 'গণিত ট्यूटर', 'দশম শ্রেণি', 'মাধ্যমিক', 'पढ़ाई के लिए शिक्षक', 'परीक्षा की तैयारी', 'शिक्षक', 'ट्यूशन', 'पढ़ाई', 'पढ़ाई', 'পড়াশোনা', 'গণিত', 'होम ट्यूटर'] },
    { id: 'fitness', name: 'Fitness & Yoga', keywords: ['yoga', 'fitness', 'gym', 'workout', 'trainer', 'coach', 'pilates', 'weight loss', 'aerobics', 'exercise', 'personal trainer', 'fitness coach', 'ব্যায়াম', 'যোগব্যায়াম', 'ফিটনেস ট্রেনার', 'ব্যায়াম', 'যোগ', 'ওজন কমানো', 'যোগাসন', 'পার্সোনাল ট্রেনার', 'জিম', 'योग', 'व्यायाम', 'फिटनेस ट्रेनर', 'जिम', 'कसरत', 'वजन घटाना', 'योगासन', 'पर्सनल ट्रेनर'] },
    { id: 'tech-help', name: 'Tech Support', keywords: ['laptop', 'wifi', 'computer', 'router', 'pc', 'mac', 'internet', 'windows', 'printer', 'software', 'antivirus', 'format', 'network', 'slow computer', 'ল্যাপটপ অন হচ্ছে না', 'ওয়াইফাই চলছে না', 'কম্পিউটার স্লো', 'প্রিন্টার প্রবলেম', 'টেক হেল্প', 'ল্যাপটপ', 'কম্পিউটার', 'ওয়াইফাই', 'ইন্টারনেট', 'রাউটার', 'ল্যাপটপ মেরামত', 'लैपटॉप चालू नहीं हो रहा', 'वाईफाई नहीं चल रहा', 'कंप्यूटर धीमा', 'प्रिंटर समस्या', 'लैपटॉप', 'वाईफाई', 'कंप्यूटर', 'इंटरनेट', 'राउटर'] },
    { id: 'pest-control', name: 'Pest Control', keywords: ['pest', 'termite', 'cockroach', 'bedbug', 'ants', 'fumigation', 'disinfection', 'rodent', 'rat', 'rats', 'mosquito', 'insect', 'bugs', 'তেলাপোকা', 'ছারপোকা', 'উইপোকা', 'ইঁদুর', 'কীটপতঙ্গ', 'কীটনাশক', 'কীটপতঙ্গ দূরীকরণ', 'পোকা মাকড়', 'পিঁপড়ে', 'মশা', 'কীটনাশক স্প্রে', 'कीड़े मकोड़े', 'कॉकरोच', 'खटमल', 'दीमक', 'पेस्ट कंट्रोल', 'कीट', 'चूहा', 'चींटियां', 'मच्छर'] },
    { id: 'babysitting', name: 'Babysitting', keywords: ['baby', 'child', 'nanny', 'babysit', 'babysitter', 'kid', 'infant', 'toddler', 'childcare', 'daycare', 'বাচ্চা দেখাশোনা', 'বাচ্চার জন্য আয়া', 'ছোট বাচ্চার যত্ন', 'শিশু সেবা', 'বাচ্চা', 'আয়া', 'আয়া', 'শিশু যত্ন', 'বাচ্চা সামলানো', 'বাচ্চা দেখা', 'बच्चा', 'दाई', 'आया', 'बच्चे की देखभाल', 'दाई चाहिए', 'आया चाहिए', 'बेबीसिटर', 'नैनी'] },
    { id: 'pet-care', name: 'Pet Care', keywords: ['pet', 'dog', 'cat', 'puppy', 'kitten', 'dog walking', 'dog walker', 'pet sitting', 'dog bath', 'feed pet', 'কুকুর ঘোরানো', 'পোষা প্রাণীর যত্ন', 'বিড়াল যত্ন', 'পোষ্য সেবা', 'কুকুর', 'পোষ্য', 'বিড়াল', 'কুকুর স্নান', 'কুত্তা', 'পালतू', 'कुत्ते को टहलाना', 'पालतू की देखभाल', 'डॉग वॉकर', 'बिल्ली', 'पेट सिटिंग', 'कुत्ता'] },
    { id: 'senior-care', name: 'Senior Care', keywords: ['senior', 'elder', 'companion', 'elderly', 'grandparent', 'caregiver', 'old age', 'mobility support', 'medication support', 'care taker', 'দাদু', 'দিদিমা', 'কেয়ারটেকার', 'সেবা সহকারী', 'বয়স্কদের দেখাশোনা', 'প্রবীণ সেবা', 'বৃদ্ধ সেবা', 'বুজুর্গদের সেবা', 'বয়স্ক সেবা', 'বুজুর্গ', 'ওষুধ খাওয়ানো', 'বুজর্গ', 'बुजुर्गों की देखभाल', 'वृद्ध सेवा', 'बुजुर्ग साथी', 'बुजुर्ग', 'वृद्ध', 'दादा', 'दादी', 'केयरटेकर', 'दवाइयां'] },
    { id: 'painting', name: 'Wall Painting', keywords: ['paint', 'painter', 'painters', 'painting', 'waterproof', 'waterproofing', 'wall', 'primer', 'whitewash', 'putty', 'seepage', 'damp', 'peeling paint', 'moisture', 'saltpeter', 'দেওয়ালে রং', 'দেয়ালে রং', 'দেওয়ালে নোনা', 'দেয়াল ভেজা', 'জল চুইয়ে', 'রং খসে পড়ছে', 'পেইন্ট', 'পেইন্টিং', 'দেওয়াল পুটিং', 'রং', 'দেওয়াল', 'দেয়াল', 'রংমিস্ত্রি', 'পুটিং', 'রং চটা', 'रंग पेंट', 'दीवार पर पेंट', 'दीवार में सीलन', 'सीलन', 'पपड़ी छूट रही', 'पुट्टी', 'दीवार खराब', 'पेंटर', 'रंग', 'पेंट', 'दीवार', 'पुताई', 'वाटरप्रूफिंग'] },
    { id: 'appliances', name: 'Appliance Repair', keywords: ['ac', 'fridge', 'appliance', 'refrigerator', 'washing machine', 'microwave', 'oven', 'ro purifier', 'compressor', 'chimney', 'technician', 'ac technician', 'repairman', 'cooling', 'ice not forming', 'water purifier', 'gas refill', 'এসি ঠান্ডা হচ্ছে না', 'এসি বন্ধ', 'এসি থেকে পানি', 'ফ্রিজ ঠান্ডা হচ্ছে না', 'বরফ জমছে না', 'ওয়াশিং মেশিন বন্ধ', 'এসি গ্যাস', 'রেফ্রিজারেটর', 'এসি', 'ওয়াশিং মেশিন', 'ফ্রিজ', 'মাইক্রোওয়েভ', 'ওভেন', 'আরও পিউরিফায়ার', 'চিমনি', 'कूलर', 'एसी', 'फ्रिज', 'मशीन', 'एसी ठंडा नहीं कर रहा', 'एसी कूलिंग नहीं', 'एसी बंद', 'एसी से पानी', 'फ्रिज ठंडा नहीं', 'बर्फ नहीं जम रही', 'वाशिंग मशीन खराब', 'माइक्रोवेव', 'ओवन', 'चिमनी', 'उपकरण'] },
    { id: 'carpentry', name: 'Carpentry', keywords: ['carpent', 'carpenter', 'carpenters', 'carpentry', 'wood', 'furniture', 'door', 'bed', 'wardrobe', 'lock', 'hinge', 'handle', 'table', 'chair', 'cabinet', 'drawer', 'door stuck', 'lock broken', 'দরজার লক নষ্ট', 'দরজা আটকাচ্ছে না', 'খাট মেরামত', 'আলমারির কবজা', 'কাঠের কাজ', 'দরজা বন্ধ হচ্ছে না', 'দরজার হাতল', 'কাঠমিস্ত্রি', 'দরজা', 'কাঠ', 'তালা', 'ফার্নিচার', 'আলমারির পাল্লা', 'ড্রয়ার আটকে গেছে', 'আসবাবপত্র', 'টেবিল', 'চেয়ার', 'बढ़ई', 'कारपेंटर', 'लकड़ी', 'फर्नीचर', 'दरवाजा', 'ताला', 'दरवाजे का ताला खराब', 'दरवाजा अटक रहा', 'कब्जा ढीला', 'फर्नीचर मरम्मत', 'लकड़ी का काम', 'अलमारी का दरवाजा', 'दराज'] },
    { id: 'electrician', name: 'Electrician', keywords: ['electric', 'electrical', 'electrician', 'electricians', 'wiring', 'switch', 'light', 'fan', 'mcb', 'fuse', 'inverter', 'voltage', 'bulb', 'socket', 'short circuit', 'ceiling fan', 'fan noise', 'fan slow', 'power failure', 'spark', 'কারেন্ট', 'ফ্যান', 'সিলিং ফ্যান', 'পাখা', 'ফ্যান ঘুরছে না', 'পাখা ঘুরছে না', 'পাখা বন্ধ', 'ফ্যান আস্তে ঘুরছে', 'ফ্যান দিয়ে আওয়াজ', 'বিশ্রী আওয়াজ', 'সুইচ নষ্ট', 'সুইচ বোর্ড', 'মিটার ট্রিপ', 'স্পার্ক', 'আলো জ্বলছে না', 'শর্ট সার্কিট', 'বৈদ্যুতিক', 'ইলেকট্রিক', 'ইলেক্ট্রিশিয়ান', 'ইলেকট্রিশিয়ান', 'সুইচ', 'আলো', 'বিজলি', 'বিজলী', 'বিদ্যুৎ', 'ফিউজ', 'সকেট', 'ইনভার্টার', 'বাল্ব', 'তার', 'বিজলি মিস্ত্রি', 'बिजली', 'पंखा', 'सीलिंग पंखा', 'पंखा आवाज कर रहा', 'पंखा धीमा', 'पंखा नहीं चल रहा', 'पंखा बंद', 'स्विच खराब', 'स्विच बोर्ड', 'बिजली चली गई', 'चिंगारी', 'एमसीबी ट्रिप', 'एमसीबी ट्रिप', 'शॉर्ट सर्किट', 'इलेक्ट्रीशियन', 'इलेक्ट्रिक', 'तार', 'स्विच', 'लाइट', 'बिजली मिस्त्री', 'सॉकेट', 'फ्यूज', 'इन्वर्टर', 'बल्ब'] },
    { id: 'plumbing', name: 'Plumbing', keywords: ['plumb', 'plumber', 'plumbers', 'plumbing', 'leak', 'pipe', 'tap', 'sink', 'drain', 'faucet', 'toilet', 'flush', 'water tank', 'sewage', 'valve', 'geyser pipe', 'basin', 'water motor', 'flooding', 'burst pipe', 'water leak', 'commode', 'জল পড়ছে', 'পানি পড়ছে', 'কল দিয়ে', 'কল নষ্ট', 'পাইপ লিক', 'পাইপ ফেটে', 'মেঝে ভেসে যাচ্ছে', 'ড্রেন বন্ধ', 'বেসিন জ্যাম', 'পানির পাইপ', 'প্লাম্বার', 'কল মেরামত', 'কমোড', 'পাইপ', 'কল', 'লিক', 'ড্রেন', 'বেসিন', 'জল লিক', 'পানির পাইপ', 'পানির মোটর', 'টয়লেট', 'ফ্লাশ', 'গিজার পাইপ', 'জলের ট্যাঙ্ক', 'সিঙ্ক', 'সিংক', 'नल टपक', 'नल से पानी', 'पानी बह रहा', 'पाइप लीक', 'पाइप फट', 'सिंक जाम', 'नाली बंद', 'कमोड', 'नल', 'पाइप', 'पानी', 'लीक', 'प्लम्बर', 'गीजर पाइप', 'वाटर टैंक', 'पानी की टंकी', 'पानी भर गया', 'बाथरूम में पानी'] },
    { id: 'home-cleaning', name: 'Deep Home Cleaning', keywords: ['cleaner', 'cleaners', 'clean', 'cleaning', 'deep clean', 'deep cleaning', 'home cleaning', 'house cleaning', 'sanitiz', 'wash', 'dust', 'safai', 'mop', 'sweep', 'maid', 'housekeep', 'sofa clean', 'bathroom clean', 'kitchen clean', 'carpet clean', 'ঘর অপরিষ্কার', 'গভীর পরিষ্কার', 'ডিপ ক্লিন', 'ঘর মোছা', 'বাথরুম পরিষ্কার', 'রান্নাঘর পরিষ্কার', 'ঘর ঝাড়ু', 'ঘর সাফ', 'সোফা পরিষ্কার', 'ঘর পরিষ্কার', 'পরিষ্কার', 'ক্লিনিং', 'জীবাণুমুক্ত', 'ঝাড়ু', 'সফাই', 'সফাইকর্মী', 'কার্পেট পরিষ্কার', 'सफाई', 'साफ', 'झाड़ू', 'पोछा', 'घर की पूरी सफाई', 'गहरी सफाई', 'झाड़ू पोछा', 'बाथरूम की सफाई', 'किचन की सफाई', 'सोफा क्लीनिंग', 'घर की सफाई', 'धूल मिट्टी', 'सैनिटाइज'] }
  ];

  const matchKeyword = (text, kw) => {
    if (!text || !kw) return false;
    const kwLower = kw.toLowerCase().trim();
    if (/^[a-zA-Z0-9_\-]+$/.test(kwLower)) {
      return new RegExp(`\\b${kwLower}\\b`, 'i').test(text);
    }
    // For phrases containing whitespace
    if (kwLower.includes(' ') && text.includes(kwLower)) {
      return true;
    }
    const escaped = kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const boundaryRegex = new RegExp(`(^|[\\s.,!?।/()—–"':;\`]+)${escaped}(?:ের|কে|তে|য়|য়|দের|টি|টা|তো|কো|का|की|के|में|ने|से|वाला|वाले|वाली)?([\\s.,!?।/()—–"':;\`]+|$)`, 'i');
    if (boundaryRegex.test(text)) return true;

    // Hindi stem matching (e.g., 'पंखा' matches 'पंखे', 'पंखों'; 'दरवाजा' matches 'दरवाजे', 'दरवाजों')
    if (kwLower.endsWith('\u093E')) {
      const stem = kwLower.slice(0, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const hindiStemRegex = new RegExp(`(^|[\\s.,!?।/()—–"':;\`]+)${stem}[\u0947\u094B](?:[\u0902\u0901])?(?:को|का|की|के|में|ने|से|वाला|वाले|वाली)?([\\s.,!?।/()—–"':;\`]+|$)`, 'i');
      if (hindiStemRegex.test(text)) return true;
    }
    // Bengali stem matching (e.g., 'পাখা' matches 'পাখার', 'পাখাতে', 'পাখায়')
    if (kwLower.endsWith('\u09BE')) {
      const stem = kwLower.slice(0, -1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const bengaliStemRegex = new RegExp(`(^|[\\s.,!?।/()—–"':;\`]+)${stem}\u09BE(?:র|য়|য়|তে|দের|টা|টি)?([\\s.,!?।/()—–"':;\`]+|$)`, 'i');
      if (bengaliStemRegex.test(text)) return true;
    }
    return false;
  };

  for (const t of tradeKeywords) {
    if (t.keywords.some(kw => matchKeyword(lower, kw))) {
      serviceName = t.name;
      serviceId = t.id;
      break;
    }
  }

  // 9. Payment Method extraction
  let extractedPaymentMethod = null;
  if (['upi', 'gpay', 'google pay', 'phonepe', 'paytm', 'bhim', 'यूपीआई', 'ইউপিআই'].some(w => lower.includes(w))) {
    extractedPaymentMethod = 'UPI';
  } else if (['card', 'debit', 'credit', 'visa', 'mastercard', 'कार्ड', 'কার্ড'].some(w => lower.includes(w))) {
    extractedPaymentMethod = 'Card';
  } else if (['netbanking', 'net banking', 'bank transfer', 'नेट बैंकिंग', 'নেট ব্যাংকিং'].some(w => lower.includes(w))) {
    extractedPaymentMethod = 'NetBanking';
  } else if (['cash', 'after service', 'after work', 'pay later', 'cod', 'नकद', 'काम के बाद', 'ক্যাশ', 'কাজের পরে'].some(w => lower.includes(w))) {
    extractedPaymentMethod = 'Cash after Service';
  }

  // 10. Scenario / Problem Diagnosis description in detected language
  let problemDiagnosis = null;
  if (serviceId) {
    const DIAGNOSIS_MAP = {
      'plumbing': {
        en: 'Water pipe leakage, tap repair, or drainage blockage issue',
        hi: 'नल, पाइप में लीकेज या ड्रेनेज रुकावट की समस्या',
        bn: 'পানির পাইপ, কল বা ড্রেনেজ ব্লকেজ সমস্যা'
      },
      'electrician': {
        en: 'Electrical wiring, ceiling fan, switchboard, or short-circuit issue',
        hi: 'बिजली वायरिंग, पंखा, स्विचबोर्ड या शॉर्ट-सर्किट की समस्या',
        bn: 'বৈদ্যুতিক ওয়্যারিং, ফ্যান, সুইচবোর্ড বা শর্ট-সার্কিট সমস্যা'
      },
      'appliances': {
        en: 'AC, refrigerator, or home appliance repair and servicing',
        hi: 'एसी, फ्रिज या घरेलू उपकरण खराबी व मरम्मत कार्य',
        bn: 'এসি, ফ্রিজ বা গৃহস্থালি যন্ত্রপাতি মেরামত ও সার্ভিসিং'
      },
      'home-cleaning': {
        en: 'Deep home, kitchen, bathroom, or sofa sanitization requirement',
        hi: 'घर, किचन, बाथरूम या सोफा की गहरी सफाई व स्वच्छता',
        bn: 'ঘর, রান্নাঘর, বাথরুম বা সোফা গভীর পরিষ্কার ও জীবাণুমুক্তকরণ'
      },
      'carpentry': {
        en: 'Furniture repair, door lock/hinge, or custom woodwork',
        hi: 'फर्नीचर मरम्मत, दरवाजा/ताला या लकड़ी का काम',
        bn: 'আসবাবপত্র মেরামত, দরজার লক/কবজা বা কাঠের কাজ'
      },
      'handyman': {
        en: 'Wall drilling, TV mount, curtain rod, or home fixture assembly',
        hi: 'दीवार में ड्रिलिंग, टीवी माउंट या घरेलू फिटिंग कार्य',
        bn: 'ওয়াল ড্রিলিং, টিভি মাউন্ট বা ঘরের টুকিটাকি ফিটিং'
      },
      'tutoring': {
        en: 'Academic coaching, mathematics, or school tuition',
        hi: 'गणित व शैक्षणिक विषय ट्यूशन / कोचिंग आवश्यकता',
        bn: 'গণিত ও পড়াশোনার গৃহশিক্ষক / টিউশন প্রয়োজন'
      },
      'pet-care': {
        en: 'Pet dog daily walking, sitting, and care assistance',
        hi: 'पालतू कुत्ते को टहलाना व दैनिक देखभाल सहायता',
        bn: 'পোষ্য কুকুরকে ঘোরানো ও সার্বিক পরিচর্যা সহায়তা'
      },
      'senior-care': {
        en: 'Elderly companion, daily assistance, and caregiving',
        hi: 'बुजुर्गों की देखभाल, दैनिक सहायता व सेवा',
        bn: 'প্রবীণদের সেবা, দৈনন্দিন সহায়তা ও দেখাশোনা'
      },
      'pest-control': {
        en: 'Termite, cockroach, rodent, or insect pest control treatment',
        hi: 'दीमक, कॉकरोच, खटमल या कीट नियंत्रण उपचार',
        bn: 'উইপোকা, তেলাপোকা, ছারপোকা বা কীটপতঙ্গ দমন ব্যবস্থা'
      },
      'auto-care': {
        en: 'Car or bike wash, foam detailing, and exterior polish',
        hi: 'गाड़ी या बाइक वॉश, फोम क्लीनिंग व पॉलिश',
        bn: 'গাড়ি বা বাইক ওয়াশ, ফোম ক্লিনিং ও পলিশ'
      },
      'garden-care': {
        en: 'Garden plant care, lawn mowing, pruning, and repotting',
        hi: 'बगीचे के पौधों की देखभाल, घास काटना व बागवानी',
        bn: 'গাছের পরিচর্যা, ঘাস ছাঁটাই ও বাগান পরিচর্যা'
      },
      'fitness': {
        en: 'Personal yoga coaching, workout, and fitness training',
        hi: 'योग, वर्कआउट व व्यक्तिगत फिटनेस कोचिंग',
        bn: 'যোগব্যায়াম, শরীরচর্চা ও ব্যক্তিগত ফিটনেস কোচিং'
      },
      'spa-therapy': {
        en: 'At-home relaxing spa, massage, and wellness therapy',
        hi: 'घर पर स्पा, आरामदायक मसाज व वेलनेस थेरेपी',
        bn: 'ঘরে বসে আরামদায়ক স্পা, ম্যাসাজ ও ওয়েলনেস থেরাপি'
      },
      'home-organisation': {
        en: 'Wardrobe decluttering and room storage organisation',
        hi: 'अलमारी व कमरे का सामान व्यवस्थित व व्यवस्थित करना',
        bn: 'আলমারি ও ঘরের জিনিসপত্র পরিপাটি করে সাজানো'
      },
      'tech-help': {
        en: 'Laptop, Wi-Fi router, PC, or software technical troubleshooting',
        hi: 'लैपटॉप, वाई-फाई, कंप्यूटर या सॉफ्टवेयर तकनीकी समस्या',
        bn: 'ল্যাপটপ, ওয়াই-ফাই, কম্পিউটার বা সফটওয়্যার টেকনিক্যাল সমস্যা'
      },
      'babysitting': {
        en: 'Childcare, infant supervision, and babysitting support',
        hi: 'शिशु व बच्चे की देखभाल और सहायता',
        bn: 'ছোট বাচ্চার দেখাশোনা ও শিশু যত্ন সহায়তা'
      },
      'painting': {
        en: 'Wall painting, waterproofing, or damp/putty repair',
        hi: 'दीवार पर पेंटिंग, वॉटरप्रूफिंग व पुट्टी मरम्मत कार्य',
        bn: 'দেওয়ালে রং, ওয়াটারপ্রুফিং বা ড্যাম্প/পুটিং মেরামত'
      }
    };
    const diag = DIAGNOSIS_MAP[serviceId];
    if (diag) {
      problemDiagnosis = diag[detectedLang] || diag['en'];
    }
  }

  return {
    detectedLanguage: detectedLang,
    languageName: detectedLang === 'bn' ? 'Bangla (বাংলা)' : (detectedLang === 'hi' ? 'Hindi (हिन्दी)' : 'English'),
    serviceName,
    serviceId,
    problemDiagnosis,
    extractedLocation,
    extractedDate,
    formattedDateText,
    extractedTime,
    extractedRate,
    extractedPaymentMethod,
    workerSelectIntent,
    isConfirmation,
    isModification,
    isChangeTime,
    isChangeRate,
    isChangeDate
  };
}

/**
 * Process Customer Smart Query (Voice / Text)
 * Uses NLP extraction with Gemini API and instant heuristic fallback.
 * Emits clean extracted fields to backend Express router for authoritative data matching.
 */
async function processCustomerSmartQuery({ query, conversationHistory = [], customerLocation = null, structuredState = null, preferredLanguage = null }) {
  const cleanQuery = (query || '').trim();
  const heuristic = heuristicExtractRequirements(cleanQuery, structuredState, preferredLanguage);

  // If Gemini API is available, enhance with LLM extraction
  if (GEMINI_API_KEY && cleanQuery.length > 5) {
    try {
      const prompt = `You are Hustle AI, an intelligent multilingual service triage assistant in India.
Our 18 standard catalog services are:
1. plumbing (Plumbing solutions, leaks, taps, drains, toilets)
2. electrician (Electrician visits, fans, lights, switches, wiring, short circuit, MCB)
3. appliances (Appliance care, AC cooling, fridge, washing machine, microwave, RO)
4. home-cleaning (Deep home cleaning, bathroom, kitchen, sofa sanitization)
5. carpentry (Carpentry & assembly, doors, locks, hinges, furniture, drawers)
6. handyman (Handyman visits, drilling, mirror hanging, TV mounting, shelf fitting)
7. tutoring (Tutoring, math, science, homework, exam prep)
8. pet-care (Pet sitting & walks, dog walking)
9. senior-care (Senior care & assistance, companionship, elder assistance)
10. pest-control (Pest control & sanitization, termites, cockroaches, bedbugs)
11. auto-care (Car detailing & eco wash, car/bike wash, foam wash)
12. garden-care (Garden care, lawn mowing, pruning, plant repotting)
13. home-organisation (Home organisation, wardrobe decluttering, storage)
14. fitness (Fitness & yoga coaching, personal training)
15. spa-therapy (At-home spa therapy, body massage, facial, wellness)
16. painting (Painting & waterproofing, wall dampness, seepage, putty)
17. babysitting (Babysitting, childcare, nanny)
18. tech-help (Laptop & Wi-Fi help, computer repair, router)

Extract service requirements and diagnose the customer's scenario/problem in English, Hindi (हिन्दी), or Bengali (বাংলা):
Query: "${cleanQuery}"
Prior Context: ${JSON.stringify(conversationHistory ? conversationHistory.slice(-3) : [])}
Current State: ${JSON.stringify(structuredState || {})}
Customer Location: "${customerLocation || ''}"
User Preferred UI Language: "${preferredLanguage || 'en'}"

Return ONLY JSON:
{
  "detectedLanguage": "en" | "hi" | "bn",
  "serviceName": "string from above catalog or null",
  "serviceId": "exact id (e.g. 'plumbing', 'electrician', 'appliances', 'home-cleaning', 'carpentry', 'handyman', 'tutoring', 'pet-care', 'senior-care', 'pest-control', 'auto-care', 'garden-care', 'home-organisation', 'fitness', 'spa-therapy', 'painting', 'babysitting', 'tech-help') or null",
  "problemDiagnosis": "concise description of diagnosed problem in detected language or null",
  "extractedLocation": "string or null",
  "extractedDate": "YYYY-MM-DD or readable date or null",
  "extractedTime": "readable time slot or null",
  "extractedRate": number or null,
  "extractedPaymentMethod": "UPI" | "Card" | "NetBanking" | "Cash after Service" | null,
  "workerSelectIntent": "string or null",
  "isConfirmation": boolean,
  "isModification": boolean
}`;

      const rawAiText = await callGeminiApi(prompt);
      const jsonMatch = rawAiText && rawAiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          success: true,
          detectedLanguage: parsed.detectedLanguage || heuristic.detectedLanguage,
          languageName: parsed.detectedLanguage === 'bn' ? 'Bangla (বাংলা)' : (parsed.detectedLanguage === 'hi' ? 'Hindi (हिन्दी)' : 'English'),
          serviceName: parsed.serviceName || heuristic.serviceName,
          serviceId: parsed.serviceId || heuristic.serviceId,
          problemDiagnosis: parsed.problemDiagnosis || heuristic.problemDiagnosis,
          extractedLocation: parsed.extractedLocation || heuristic.extractedLocation,
          extractedDate: parsed.extractedDate || heuristic.extractedDate,
          formattedDateText: heuristic.formattedDateText || parsed.extractedDate,
          extractedTime: parsed.extractedTime || heuristic.extractedTime,
          extractedRate: typeof parsed.extractedRate === 'number' ? parsed.extractedRate : heuristic.extractedRate,
          extractedPaymentMethod: parsed.extractedPaymentMethod || heuristic.extractedPaymentMethod,
          workerSelectIntent: parsed.workerSelectIntent || heuristic.workerSelectIntent,
          isConfirmation: Boolean(parsed.isConfirmation || heuristic.isConfirmation),
          isModification: Boolean(parsed.isModification || heuristic.isModification)
        };
      }
    } catch (err) {
      // Graceful fallback to heuristic
    }
  }

  return {
    success: true,
    ...heuristic
  };
}

module.exports = {
  diagnoseNeed,
  enhanceScope,
  advisePrice,
  semanticSearch,
  getSearchSuggestions,
  matchAgainst18Services,
  matchOtherSkillWithDemand,
  generateWorkerBio,
  processCustomerSmartQuery,
  getCategoryBenchmarkRate,
  CATEGORY_BENCHMARKS,
  HUSTLE_18_SERVICES,
  POPULAR_SERVICE_TASKS
};


