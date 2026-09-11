const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Otp = require('../models/Otp');
const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');
const BusinessRequirement = require('../models/BusinessRequirement');
const Contract = require('../models/Contract');
const Invoice = require('../models/Invoice');

let isMongoReady = false;

// Fallback file storage directory & file
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function initLocalStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [],
      otps: [],
      bookings: [],
      tickets: [],
      businessRequirements: [],
      contracts: [],
      invoices: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function readLocalStore() {
  initLocalStore();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    parsed.bookings = parsed.bookings || [];
    parsed.tickets = parsed.tickets || [];
    parsed.businessRequirements = parsed.businessRequirements || [];
    parsed.contracts = parsed.contracts || [];
    parsed.invoices = parsed.invoices || [];
    return parsed;
  } catch (err) {
    console.error('Error reading local db.json, resetting:', err.message);
    return { users: [], otps: [], bookings: [], tickets: [], businessRequirements: [], contracts: [], invoices: [] };
  }
}

function writeLocalStore(data) {
  initLocalStore();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Synchronize local db.json records into MongoDB Atlas when collections are empty or missing records
 */
async function syncLocalDataToMongo() {
  try {
    const store = readLocalStore();
    if (!store) return;

    // 1. Synchronize Users
    if (Array.isArray(store.users) && store.users.length > 0) {
      const mongoUserCount = await User.countDocuments();
      if (mongoUserCount < store.users.length) {
        console.log(`[Database Sync] Found ${store.users.length} users in db.json (MongoDB has ${mongoUserCount}). Syncing to Atlas...`);
        let importedUsers = 0;
        for (const u of store.users) {
          const cleanEmail = (u.email || '').toLowerCase().trim();
          if (!cleanEmail) continue;
          const exists = await User.findOne({ email: cleanEmail });
          if (!exists) {
            try {
              await User.create({
                name: u.name || 'SevaSathi User',
                email: cleanEmail,
                phone: u.phone || '9876543210',
                password: u.password || '$2a$10$f/FqnEnHfTj.OgKfSGCr6O4lDkaBe.6KJZWlJH4nZLm5Y5MvZxqpu',
                role: u.role || 'customer',
                approvalStatus: u.approvalStatus || 'pending',
                approvedAt: u.approvedAt ? new Date(u.approvedAt) : null,
                approvedBy: u.approvedBy || '',
                completedJobsCount: Number(u.completedJobsCount) || 0,
                earningsTotal: Number(u.earningsTotal) || 0,
                earningsPending: Number(u.earningsPending) || 0,
                rating: Number(u.rating) || 0,
                ratingCount: Number(u.ratingCount) || 0,
                reviews: Array.isArray(u.reviews) ? u.reviews : [],
                skillCategory: u.skillCategory || '',
                specificSkill: u.specificSkill || '',
                experience: u.experience || '',
                locality: u.locality || '',
                bio: u.bio || '',
                city: u.city || 'Bengaluru',
                customCity: u.customCity || '',
                documentFile: u.documentFile || '',
                supportingDocUrl: u.supportingDocUrl || '',
                documentSize: u.documentSize || '',
                googleId: u.googleId || null,
                lastLogin: u.lastLogin ? new Date(u.lastLogin) : new Date(),
                createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
                updatedAt: u.updatedAt ? new Date(u.updatedAt) : new Date()
              });
              importedUsers++;
            } catch (createErr) {
              console.warn(`[Database Sync] Note importing user ${cleanEmail}:`, createErr.message);
            }
          }
        }
        console.log(`[Database Sync] Users synced to MongoDB Atlas. (Imported ${importedUsers} new records, total now: ${await User.countDocuments()})`);
      }
    }

    // 2. Synchronize Bookings
    if (Array.isArray(store.bookings) && store.bookings.length > 0) {
      const mongoBookingCount = await Booking.countDocuments();
      if (mongoBookingCount < store.bookings.length) {
        console.log(`[Database Sync] Found ${store.bookings.length} bookings in db.json (MongoDB has ${mongoBookingCount}). Syncing to Atlas...`);
        let importedBookings = 0;
        for (const b of store.bookings) {
          const exists = await Booking.findOne({
            customerId: String(b.customerId),
            serviceId: b.serviceId,
            scheduledDate: b.scheduledDate,
            scheduledTime: b.scheduledTime
          });
          if (!exists) {
            try {
              await Booking.create({
                serviceId: b.serviceId || 'service',
                serviceName: b.serviceName || 'Custom Service',
                category: b.category || 'General Help',
                customerId: String(b.customerId || 'cust_1'),
                customerName: b.customerName || 'Customer',
                customerPhone: b.customerPhone || '',
                customerEmail: b.customerEmail || '',
                workerId: b.workerId ? String(b.workerId) : null,
                workerName: b.workerName || 'Open Pool (Any Pro)',
                workerPhone: b.workerPhone || '',
                customerLocation: b.customerLocation || b.locality || 'Local Area',
                locality: b.locality || 'Local Area',
                city: b.city || 'Bengaluru',
                declinedWorkerIds: Array.isArray(b.declinedWorkerIds) ? b.declinedWorkerIds : [],
                scheduledDate: b.scheduledDate || '2026-09-10',
                scheduledTime: b.scheduledTime || '10:00 AM',
                notes: b.notes || '',
                price: Number(b.price) || 499,
                status: b.status || 'pending',
                paymentStatus: b.paymentStatus || 'unpaid',
                paidAt: b.paidAt ? new Date(b.paidAt) : null,
                paymentMethod: b.paymentMethod || '',
                rating: b.rating ? Number(b.rating) : null,
                reviewText: b.reviewText || '',
                reviewedAt: b.reviewedAt ? new Date(b.reviewedAt) : null,
                negotiations: Array.isArray(b.negotiations) ? b.negotiations : [],
                createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
                updatedAt: b.updatedAt ? new Date(b.updatedAt) : new Date()
              });
              importedBookings++;
            } catch (createErr) {
              console.warn(`[Database Sync] Note importing booking ${b.serviceName}:`, createErr.message);
            }
          }
        }
        console.log(`[Database Sync] Bookings synced to MongoDB Atlas. (Imported ${importedBookings} new records, total now: ${await Booking.countDocuments()})`);
      }
    }
  } catch (syncErr) {
    console.warn('[Database Sync] Warning during data synchronization:', syncErr.message);
  }
}

/**
 * Connect to MongoDB with graceful error handling and fallback
 */
async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hustle';
  try {
    const isAtlas = mongoUri.includes('mongodb.net');
    console.log(`[Database] Attempting connection to ${isAtlas ? 'MongoDB Atlas' : 'MongoDB'} at: ${mongoUri.replace(/:([^:@]{4})[^:@]*@/, ':****@')}`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    isMongoReady = true;
    console.log(`[Database] Successfully connected to ${isAtlas ? 'MongoDB Atlas (Cloud Cluster)' : 'MongoDB'}.`);
    // Synchronize existing local records to MongoDB Atlas if needed
    await syncLocalDataToMongo();
  } catch (err) {
    isMongoReady = false;
    console.warn(`[Database] MongoDB not reachable (${err.message}). Using persistent backend file database at /data/db.json.`);
    initLocalStore();
  }

  // Handle connection events
  mongoose.connection.on('connected', () => {
    isMongoReady = true;
  });
  mongoose.connection.on('disconnected', () => {
    isMongoReady = false;
  });
}

/**
 * Find user by email (case-insensitive)
 */
async function findUserByEmail(email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail) return null;

  if (isMongoReady) {
    try {
      return await User.findOne({ email: cleanEmail });
    } catch (err) {
      console.error('Mongo findUserByEmail error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.users.find(u => (u.email || '').toLowerCase() === cleanEmail) || null;
}

/**
 * Find user by phone
 */
async function findUserByPhone(phone) {
  const cleanPhone = (phone || '').trim();
  if (!cleanPhone) return null;

  if (isMongoReady) {
    try {
      return await User.findOne({ phone: cleanPhone });
    } catch (err) {
      console.error('Mongo findUserByPhone error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.users.find(u => (u.phone || '').trim() === cleanPhone) || null;
}

/**
 * Find user by email or phone (used in Sign In)
 */
async function findUserByIdentifier(identifier) {
  const clean = (identifier || '').trim();
  if (!clean) return null;

  if (isMongoReady) {
    try {
      return await User.findOne({
        $or: [
          { email: clean.toLowerCase() },
          { phone: clean }
        ]
      });
    } catch (err) {
      console.error('Mongo findUserByIdentifier error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.users.find(u => 
    (u.email || '').toLowerCase() === clean.toLowerCase() ||
    (u.phone || '').trim() === clean
  ) || null;
}

/**
 * Find user by ID
 */
async function findUserById(id) {
  if (!id) return null;

  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const found = await User.findById(id);
        if (found) return found;
      }
      return await User.findOne({ _id: id });
    } catch (err) {
      console.error('Mongo findUserById error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.users.find(u => String(u._id || u.id) === String(id)) || null;
}

/**
 * Create a new user
 */
async function createUser(userData) {
  if (isMongoReady) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (err) {
      console.error('Mongo createUser error:', err.message);
      throw err;
    }
  }

  const store = readLocalStore();
  const newUser = {
    _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.users.push(newUser);
  writeLocalStore(store);
  return newUser;
}

/**
 * Update a user's fields
 */
async function updateUser(id, updates) {
  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updated = await User.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true });
        if (updated) return updated;
      }
      return await User.findOneAndUpdate({ _id: id }, { ...updates, updatedAt: new Date() }, { new: true });
    } catch (err) {
      console.error('Mongo updateUser error:', err.message);
    }
  }

  const store = readLocalStore();
  const idx = store.users.findIndex(u => String(u._id || u.id) === String(id));
  if (idx !== -1) {
    store.users[idx] = {
      ...store.users[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
    return store.users[idx];
  }
  return null;
}

/**
 * Delete a user by ID
 */
async function deleteUser(id) {
  if (!id) return false;

  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const res = await User.findByIdAndDelete(id);
        if (res) return true;
      }
      const res = await User.findOneAndDelete({ _id: id });
      return !!res;
    } catch (err) {
      console.error('Mongo deleteUser error:', err.message);
    }
  }

  const store = readLocalStore();
  const initialLen = store.users.length;
  store.users = store.users.filter(u => String(u._id || u.id) !== String(id));
  if (store.users.length !== initialLen) {
    writeLocalStore(store);
    return true;
  }
  return false;
}

/**
 * Create and save OTP
 */
async function createOtp(identifier, otpCode, type = 'reset_password', ttlMinutes = 10) {
  const cleanId = (identifier || '').trim().toLowerCase();
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

  if (isMongoReady) {
    try {
      const otp = new Otp({
        identifier: cleanId,
        otp: otpCode,
        type,
        expiresAt
      });
      await otp.save();
      return otp;
    } catch (err) {
      console.error('Mongo createOtp error:', err.message);
    }
  }

  const store = readLocalStore();
  const newOtp = {
    _id: 'otp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    identifier: cleanId,
    otp: otpCode,
    type,
    used: false,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString()
  };
  store.otps.push(newOtp);
  writeLocalStore(store);
  return newOtp;
}

/**
 * Find valid unexpired, unused OTP
 */
async function findValidOtp(identifier, otpCode, type = 'reset_password') {
  const cleanId = (identifier || '').trim().toLowerCase();
  const now = new Date();

  if (isMongoReady) {
    try {
      return await Otp.findOne({
        identifier: cleanId,
        otp: String(otpCode).trim(),
        type,
        used: false,
        expiresAt: { $gt: now }
      });
    } catch (err) {
      console.error('Mongo findValidOtp error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.otps.find(o => 
    (o.identifier || '').toLowerCase() === cleanId &&
    String(o.otp).trim() === String(otpCode).trim() &&
    o.type === type &&
    !o.used &&
    new Date(o.expiresAt) > now
  ) || null;
}

/**
 * Mark OTP as used
 */
async function markOtpUsed(otpId) {
  if (!otpId) return;

  if (isMongoReady) {
    try {
      await Otp.findByIdAndUpdate(otpId, { used: true });
      return;
    } catch (err) {
      console.error('Mongo markOtpUsed error:', err.message);
    }
  }

  const store = readLocalStore();
  const otp = store.otps.find(o => String(o._id || o.id) === String(otpId));
  if (otp) {
    otp.used = true;
    writeLocalStore(store);
  }
}

/**
 * Find users by role (e.g. 'worker')
 */
async function findUsersByRole(role) {
  if (isMongoReady) {
    try {
      return await User.find({ role }).sort({ createdAt: -1 });
    } catch (err) {
      console.error('Mongo findUsersByRole error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.users.filter(u => u.role === role);
}

/**
 * Strict Canonical Service Domains for precise worker matching & allocation.
 * Guarantees zero category leakage across unrelated gig trades.
 */
const CANONICAL_SERVICE_DOMAINS = {
  'electrician': {
    ids: ['electrician', 'electrical', 'electrician & wiring repairs', 'electrician visits', 'electrical & wiring', 'electricity', 'wiring', 'mcb', 'ইলেকট্রিশিয়ান', 'ইলেকট্রিশিয়ান', 'ইলেকট্রিক', 'ইলেকট্রিক্যাল', 'কারেন্ট', 'ইলেকট্রিক মিস্ত্রি', 'ইলেকট্রিশিয়ান সার্ভিস', 'इलेक्ट्रीशियन', 'बिजली', 'इलेक्ट्रिकल', 'बिजली मिस्त्री'],
    categories: ['Electrician & Wiring Repairs', 'Electrician', 'Electrical & Wiring'],
    keywords: ['electrician', 'electrical', 'wiring', 'mcb', 'switch', 'socket', 'plug', 'fuse', 'inverter', 'spark', 'short circuit', 'tripping', 'breaker', 'fan', 'light', 'wire', 'voltage', 'কারেন্ট', 'ফ্যান', 'আলো', 'সুইচ', 'তার', 'শর্ট সার্কিট', 'বিদ্যুৎ', 'মিটার', 'ইনভার্টার', 'बिजली', 'पंखा', 'तार', 'स्विच', 'शॉर्ट सर्किट', 'करंट', 'सॉकेट', 'फ्यूज'],
    negativeCategories: ['Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'plumbing': {
    ids: ['plumbing', 'plumber', 'plumbing & drainage fixing', 'plumbing solutions', 'pipe', 'leak', 'drainage', 'tap', 'toilet', 'প্লাম্বার', 'প্লাম্বিং', 'প্লাম্বিং সার্ভিস', 'নল মিস্ত্রি', 'কলের মিস্ত্রি', 'জল পাইপ', 'प्लम्बर', 'प्लंबिंग', 'प्लंबर', 'नलसाज', 'नल मिस्त्री'],
    categories: ['Plumbing & Drainage Fixing', 'Plumbing', 'Plumbing & Repairs'],
    keywords: ['plumbing', 'plumber', 'pipe', 'leak', 'drain', 'drainage', 'clog', 'faucet', 'tap', 'sink', 'toilet', 'flush', 'water tank', 'sewage', 'valve', 'geyser pipe', 'basin', 'water motor', 'কল', 'জল', 'পাইপ', 'নল', 'ট্যাপ', 'বেসিন', 'ড্রেন', 'নর্দমা', 'ফ্লাশ', 'পানির ট্যাঙ্ক', 'नल', 'पानी', 'पाइप', 'सीपेज', 'टोंटी', 'नाली', 'सिंक', 'टॉयलेट'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'home-cleaning': {
    ids: ['home-cleaning', 'deep-home-cleaning', 'deep-cleaning', 'cleaning', 'deep home & kitchen cleaning', 'deep home cleaning', 'deep cleaning & sanitization', 'housekeeping', 'maid', 'ক্লিনিং', 'ঘর পরিষ্কার', 'ডিপ ক্লিনিং', 'সফাই', 'सफाई', 'क्लीनिंग', 'घर की सफाई', 'डीप क्लीनिंग'],
    categories: ['Deep Home & Kitchen Cleaning', 'Deep Home Cleaning', 'Deep Cleaning & Sanitization', 'Home Cleaning'],
    keywords: ['clean', 'cleaning', 'deep clean', 'kitchen clean', 'bathroom clean', 'sanitiz', 'mop', 'housekeep', 'maid', 'dusting', 'scrub', 'floor wash', 'disinfection', 'পরিষ্কার', 'ঘর পরিষ্কার', 'ঝাড়ু', 'মোছা', 'বাথরুম পরিষ্কার', 'রান্নাঘর পরিষ্কার', 'জীবাণুমুক্তকরণ', 'सफाई', 'झाड़ू', 'पोछा', 'घर की सफाई', 'बाथरूम सफाई', 'किचन सफाई'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'appliances': {
    ids: ['appliances', 'appliance', 'appliance-repair', 'ac', 'ac-repair', 'fridge', 'refrigerator', 'washing machine', 'microwave', 'ac, fridge & appliance repair', 'appliance care & repair', 'এসি মেরামত', 'ফ্রিজ মেরামত', 'অ্যাপ্লায়েন্স', 'এসি সার্ভিস', 'एसी रिपेयर', 'फ्रिज रिपेयर', 'वाशिंग मशीन', 'उपकरण मरम्मत'],
    categories: ['AC, Fridge & Appliance Repair', 'Appliance Care & Repair', 'Appliance Repair'],
    keywords: ['ac', 'air conditioner', 'split ac', 'window ac', 'cooling', 'fridge', 'refrigerator', 'freeze', 'freezer', 'washing machine', 'microwave', 'oven', 'ro purifier', 'compressor', 'chimney', 'appliance', 'gas top-up', 'gas check', 'ac filter', 'এসি', 'ফ্রিজ', 'ঠান্ডা হচ্ছে না', 'ওয়াশিং মেশিন', 'মাইক্রোওয়েভ', 'গ্যাস লিক', 'एसी', 'फ्रिज', 'कूलिंग', 'वाशिंग मशीन', 'माइक्रोवेव', 'गैस रिफिल', 'कंप्रेसर'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'carpentry': {
    ids: ['carpentry', 'carpenter', 'custom carpentry & woodwork', 'carpentry & assembly', 'carpentry & woodwork', 'wood', 'woodwork', 'furniture', 'ছুতোর', 'কাঠের কাজ', 'কার্পেন্টার', 'দরজার লক', 'बढ़ई', 'कारपेंटर', 'लकड़ी काम'],
    categories: ['Custom Carpentry & Woodwork', 'Carpentry & Assembly', 'Carpentry & Woodwork', 'Carpentry'],
    keywords: ['carpentry', 'carpenter', 'wood', 'woodwork', 'furniture', 'door lock', 'hinge', 'wardrobe', 'bed repair', 'cabinet', 'drawer', 'sofa repair', 'wooden', 'latch', 'sliding door', 'ছুতোর', 'কাঠ', 'দরজা', 'লক', 'তালা', 'কব্জা', 'আলমারি', 'আসবাবপত্র', 'খাট', 'ড্রয়ার', 'लकड़ी', 'बढ़ई', 'दरवाजा', 'ताला', 'कब्जा', 'फर्नीचर', 'अलमारी', 'सोफा'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'handyman': {
    ids: ['handyman', 'furniture assembly & handyman', 'handyman visits', 'drill', 'drilling', 'assembly', 'হ্যান্ডিম্যান', 'ড্রিল', 'ছবি টাঙানো', 'हैंडीमैन', 'ड्रिलिंग', 'असेंबली'],
    categories: ['Furniture Assembly & Handyman', 'Handyman Visits', 'Handyman'],
    keywords: ['handyman', 'furniture assembly', 'drill', 'drilling', 'curtain rod', 'mirror hanging', 'frame hanging', 'shelf fitting', 'wall mounting', 'small fixes', 'assembly', 'ikea assembly', 'towel rod', 'ড্রিল', 'ছবি টাঙানো', 'পর্দার রড', 'আইনা', 'শেলফ ফিটিং', 'ड्रिलिंग', 'पर्दा रॉड', 'आईना टांगना', 'शेल्फ फिटिंग'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'tutoring': {
    ids: ['tutoring', 'maths-tutoring', 'math-tutoring', 'math', 'maths', 'science', 'tutors & skill coaches', 'tutor', 'শিক্ষক', 'টিউশন', 'টুইশন', 'গণিত শিক্ষক', 'ट्यूशन', 'शिक्षक', 'मैथ्स ट्यूटर'],
    categories: ['Tutoring', 'Tutors & Skill Coaches', 'Academic Tutoring'],
    keywords: ['tutor', 'tutoring', 'math', 'maths', 'teacher', 'teach', 'algebra', 'geometry', 'calculus', 'physics', 'science', 'chemistry', 'exam prep', 'tuition', 'coaching', 'homework', 'academic', 'টিউশন', 'পড়াশোনা', 'অংক', 'বিজ্ঞান', 'শিক্ষক', 'গৃহশিক্ষক', 'টুইশন', 'ट्यूशन', 'पढ़ाई', 'गणित', 'विज्ञान', 'फिजिक्स', 'केमिस्ट्री', 'होमवर्क'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'spa-therapy': {
    ids: ['spa-therapy', 'spa', 'massage', 'spa, massage & grooming', 'at-home spa therapy', 'salon & beauty at home', 'salon', 'beauty', 'স্পা', 'ম্যাসাজ', 'সেলুন', 'বিউটি পার্লার', 'स्पा', 'मसाज', 'सैलून', 'ब्यूटी'],
    categories: ['Spa, Massage & Grooming', 'At-Home Spa Therapy', 'Salon & Beauty at Home', 'Wellness & Spa'],
    keywords: ['spa', 'massage', 'therapy', 'facial', 'pedicure', 'manicure', 'waxing', 'salon', 'beauty', 'haircut', 'skin care', 'wellness', 'head massage', 'body massage', 'স্পা', 'ম্যাসাজ', 'ফেসিয়াল', 'চুল কাটা', 'রূপচর্চা', 'ওয়াক্সিং', 'स्पा', 'मालिश', 'मसाज', 'फेशियल', 'बाल काटना', 'मेनिक्योर', 'पेडिक्योर'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'tech-help': {
    ids: ['tech-help', 'laptop', 'wifi', 'computer', 'laptop & wi-fi tech support', 'laptop & wi-fi help', 'router', 'network', 'ল্যাপটপ', 'কম্পিউটার', 'ওয়াইফাই', 'টেক সাপোর্ট', 'लैपटॉप', 'कंप्यूटर', 'वाईफाई', 'टेक सपोर्ट'],
    categories: ['Laptop & Wi-Fi Tech Support', 'Laptop & Wi-Fi Help', 'Tech Help & IT Support'],
    keywords: ['laptop', 'computer', 'pc', 'mac', 'wifi', 'wi-fi', 'router', 'internet', 'windows', 'printer', 'software', 'network setup', 'format pc', 'antivirus', 'lan', 'ল্যাপটপ', 'কম্পিউটার', 'ইন্টারনেট', 'রাউটার', 'প্রিন্টার', 'সফটওয়্যার', 'लैपटॉप', 'कंप्यूटर', 'इंटरनेट', 'राउटर', 'प्रिंटर', 'सॉफ्टवेयर'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'painting': {
    ids: ['painting', 'painter', 'wall painting & waterproofing', 'painting & waterproofing', 'wall paint', 'waterproofing', 'রং মিস্ত্রি', 'পেইন্টিং', 'রঙ', 'দেওয়াল রং', 'पेंटर', 'पुताई', 'पेंटिंग', 'वाटरप्रूफिंग'],
    categories: ['Wall Painting & Waterproofing', 'Painting & Waterproofing', 'Wall Painting'],
    keywords: ['paint', 'painter', 'painting', 'wall paint', 'waterproof', 'waterproofing', 'damp', 'seepage', 'primer', 'whitewash', 'distemper', 'texture', 'ceiling paint', 'putty', 'দেওয়াল রং', 'রং মিস্ত্রি', 'পেইন্ট', 'ড্যাম্প', 'জল চুইয়ে পড়া', 'পুটিং', 'চুনের কাজ', 'पुताई', 'दीवार पेंट', 'पेंटर', 'सीलन', 'डैम्प', 'प्राइमर', 'पुट्टी'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'fitness': {
    ids: ['fitness', 'yoga', 'gym', 'yoga & fitness coaching', 'fitness & yoga coaching', 'workout', 'trainer', 'যোগাসন', 'ফিটনেস', 'জিম ট্রেনার', 'योगा', 'फिटनेस', 'जिम ट्रेनर', 'कसरत'],
    categories: ['Yoga & Fitness Coaching', 'Fitness & Yoga Coaching', 'Personal Fitness Training'],
    keywords: ['fitness', 'gym', 'workout', 'train', 'trainer', 'coach', 'yoga', 'weight loss', 'pilates', 'aerobics', 'exercise', 'personal training', 'posture', 'যোগব্যায়াম', 'ব্যায়াম', 'ফিটনেস ট্রেনার', 'ওজন কমানো', 'యోगा', 'योगासन', 'कसरत', 'जिम', 'ट्रेनर', 'वजन घटाना'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'auto-care': {
    ids: ['auto-care', 'car', 'vehicle', 'car & two-wheeler care', 'car detailing & eco wash', 'car wash', 'bike wash', 'গাড়ি ধোয়া', 'গাড়ি পরিষ্কার', 'বাইক ওয়াশ', 'कार वॉश', 'गाड़ी सफाई', 'बाइक वॉश'],
    categories: ['Car & Two-Wheeler Care', 'Car Detailing & Eco Wash', 'Auto Care'],
    keywords: ['car', 'vehicle', 'car wash', 'auto', 'detailing', 'polish', 'car interior', 'car clean', 'bike wash', 'foam wash', 'waterless wash', 'dashboard polish', 'গাড়ি পরিষ্কার', 'বাইক ওয়াশ', 'ফোম ওয়াশ', 'গাড়ির পালিশ', 'गाड़ी धुलाई', 'कार पॉलिश', 'फोम वॉश', 'बाइक सर्विस'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'pest-control': {
    ids: ['pest-control', 'pest', 'pest control & fumigation', 'pest control & sanitization', 'termites', 'cockroach', 'পোকামাকড়', 'কীটপতঙ্গ', 'কীটনাশক', 'উইপোকা দমন', 'कीड़े मकोड़े', 'पेस्ट कंट्रोल', 'दीमक'],
    categories: ['Pest Control & Fumigation', 'Pest Control & Sanitization', 'Pest Control'],
    keywords: ['pest', 'termite', 'termites', 'cockroach', 'cockroaches', 'bedbug', 'bedbugs', 'mosquito', 'rodent', 'rat', 'ant', 'fumigation', 'disinfection', 'pest control', 'উইপোকা', 'তেলাপোকা', 'ছারপোকা', 'মশা', 'ইঁদুর', 'কীটনাশক', 'পোকামাকড় দমন', 'दीमक', 'कॉकरोच', 'खटमल', 'मच्छर', 'चूहा', 'कीटनाशक', 'पेस्ट कंट्रोल'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'home-organisation': {
    ids: ['home-organisation', 'home-organization', 'wardrobe & home organisation', 'home organisation', 'declutter', 'wardrobe', 'আলমারি গোছানো', 'ঘর সাজানো', 'ঘর পরিপাটি', 'घर की व्यवस्था', 'अलमारी सजावट', 'डिक्लटर'],
    categories: ['Wardrobe & Home Organisation', 'Home Organisation', 'Home Decluttering'],
    keywords: ['organise', 'organize', 'organisation', 'organization', 'declutter', 'decluttering', 'wardrobe', 'closet', 'pantry', 'tidying', 'neat', 'storage arrangement', 'গোছানো', 'আলমারি সাজানো', 'ঘর পরিপাটি', 'আলমারি', 'अलमारी सजावट', 'सामान व्यवस्थित', 'घर की सफाई व्यवस्था'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'babysitting': {
    ids: ['babysitting', 'childcare', 'babysitting & childcare', 'nanny', 'baby', 'child', 'আয়া', 'বাচ্চা দেখাশোনা', 'শিশু সেবা', 'नैनी', 'बेबीसिटिंग', 'बच्चा देखभाल'],
    categories: ['Babysitting & Childcare', 'Babysitting', 'Childcare'],
    keywords: ['baby', 'babysit', 'babysitting', 'babysitter', 'child', 'children', 'kid', 'kids', 'nanny', 'childcare', 'daycare', 'toddler', 'infant', 'বাচ্চা', 'শিশু', 'আয়া', 'ছোট বাচ্চা', 'শিশুর যত্ন', 'বাচ্চা সামলানো', 'बच्चा', 'शिशु', 'आया', 'बच्चों की देखभाल', 'बेबीसिटर', 'नैनी'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Pet Care & Dog Walking', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'pet-care': {
    ids: ['pet-care', 'pet', 'dog', 'pet care & dog walking', 'pet sitting & walks', 'dog walking', 'cat', 'কুকুর হাঁটা', 'পোষ্য যত্ন', 'কুকুর ঘোরানো', 'कुत्ता घुमाना', 'पेट केयर', 'पालतू देखभाल'],
    categories: ['Pet Care & Dog Walking', 'Pet Sitting & Walks', 'Pet Care'],
    keywords: ['pet', 'pets', 'dog', 'dogs', 'cat', 'cats', 'puppy', 'walk', 'dog walking', 'pet sitting', 'kitten', 'feed pet', 'dog bath', 'কুকুর', 'বিড়াল', 'পোষ্য', 'কুকুর ঘোরানো', 'কুকুর স্নান', 'পোশ্য সেবা', 'कुत्ता', 'बिल्ली', 'पालतू जानवर', 'डॉग वॉकर', 'पेट सिटिंग', 'कुत्ते को नहलाना'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Garden & Plant Care', 'Senior Care & Assistance']
  },
  'garden-care': {
    ids: ['garden-care', 'garden', 'garden & plant care', 'garden care', 'gardener', 'plant', 'lawn', 'মালী', 'বাগান পরিচর্যা', 'বাগান কাজ', 'গাছের যত্ন', 'माली', 'गार्डनिंग', 'बगीचा', 'पौधों की देखभाल'],
    categories: ['Garden & Plant Care', 'Garden Care', 'Gardening'],
    keywords: ['garden', 'gardening', 'lawn', 'plant', 'plants', 'grass', 'mow', 'pruning', 'hedge', 'soil', 'pots', 'repotting', 'weeding', 'balcony garden', 'gardener', 'বাগান', 'গাছপালা', 'টব', 'মালী', 'ঘাস কাটা', 'গাছ ছাঁটাই', 'মাটি তৈরি', 'बगीचा', 'पौधे', 'माली', 'गमला', 'घास काटना', 'कटाई'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Senior Care & Assistance']
  },
  'senior-care': {
    ids: ['senior-care', 'senior', 'elder', 'senior care & assistance', 'elderly', 'companion', 'বয়স্ক সেবা', 'বৃদ্ধ যত্ন', 'দাদুর যত্ন', 'বুजुर्ग देखभाल', 'सीनियर केयर', 'बुजुर्ग साथी'],
    categories: ['Senior Care & Assistance', 'Senior Care', 'Senior Care & Companionship'],
    keywords: ['senior', 'seniors', 'elder', 'elders', 'elderly', 'grandparent', 'old age', 'companion', 'companionship', 'medication', 'errands', 'mobility support', 'caregiver', 'বয়স্ক', 'দাদু', 'দিদিমা', 'বৃদ্ধ', 'ঔষধ দেওয়া', 'সঙ্গী', 'বয়স্কদের সেবা', 'বুजुर्ग', 'दादा', 'दादी', 'दवा देना', 'देखभाल', 'बुजुर्गों का सहारा'],
    negativeCategories: ['Electrician & Wiring Repairs', 'Plumbing & Drainage Fixing', 'Deep Home & Kitchen Cleaning', 'Custom Carpentry & Woodwork', 'AC, Fridge & Appliance Repair', 'Spa, Massage & Grooming', 'Furniture Assembly & Handyman', 'Tutoring', 'Yoga & Fitness Coaching', 'Laptop & Wi-Fi Tech Support', 'Wall Painting & Waterproofing', 'Car & Two-Wheeler Care', 'Pest Control & Fumigation', 'Wardrobe & Home Organisation', 'Babysitting & Childcare', 'Pet Care & Dog Walking', 'Garden & Plant Care']
  }
};

const SERVICE_SKILL_MAP = Object.keys(CANONICAL_SERVICE_DOMAINS).reduce((acc, key) => {
  acc[key] = CANONICAL_SERVICE_DOMAINS[key].keywords;
  for (const id of CANONICAL_SERVICE_DOMAINS[key].ids) {
    acc[id] = CANONICAL_SERVICE_DOMAINS[key].keywords;
  }
  return acc;
}, {});

/**
 * Resolve canonical service domain configuration from any service ID, name, or keyword
 */
function getCanonicalDomain(serviceId) {
  if (!serviceId) return null;
  const s = String(serviceId).toLowerCase().trim();
  const clean = s.replace(/[-_]/g, ' ').trim();

  // Direct domain key match
  if (CANONICAL_SERVICE_DOMAINS[s]) return CANONICAL_SERVICE_DOMAINS[s];
  if (CANONICAL_SERVICE_DOMAINS[clean]) return CANONICAL_SERVICE_DOMAINS[clean];

  for (const [key, domain] of Object.entries(CANONICAL_SERVICE_DOMAINS)) {
    if (key === s || key === clean) return domain;
    if (domain.ids && domain.ids.some(id => id.toLowerCase() === s || id.toLowerCase() === clean || s.includes(id.toLowerCase()) || clean.includes(id.toLowerCase()))) {
      return domain;
    }
    if (domain.categories && domain.categories.some(cat => cat.toLowerCase() === s || cat.toLowerCase() === clean || s.includes(cat.toLowerCase()) || clean.includes(cat.toLowerCase()))) {
      return domain;
    }
  }
  return null;
}

/**
 * The 8 Primary Canonical Cities with geographic coordinates and aliases
 */
const CANONICAL_CITIES = {
  'kolkata': {
    name: 'Kolkata',
    lat: 22.5726,
    lng: 88.3639,
    aliases: ['kolkata', 'calcutta', 'howrah', 'salt lake', 'new town', 'ballygunge', 'gariahath', 'jadavpur', 'dum dum', 'behala', 'tollygunge', 'alipore', 'park street', 'rajarhat', 'কলকাতা', 'কলিকাতা', 'হাওড়া', 'সল্টলেক', 'নিউ টাউন', 'বেহালা', 'দমদম', 'যাদবপুর', 'গারিয়াহাট', 'টালিগঞ্জ', 'আলিপুর', 'পার্ক স্ট্রিট', 'রাজারহাট', 'कोलकाता', 'कलकत्ता', 'हावड़ा', 'साल्ट लेक', 'न्यू टाउन', 'बेहाला', 'दमदम', 'जादवपुर', 'टॉलीगंज']
  },
  'bengaluru': {
    name: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    aliases: ['bengaluru', 'bangalore', 'whitefield', 'indiranagar', 'koramangala', 'hsr', 'bellandur', 'jayanagar', 'jp nagar', 'electronic city', 'btm', 'marathahalli', 'malleshwaram', 'বেঙ্গালুরু', 'ব্যাঙ্গালোর', 'হোয়াইটফিল্ড', 'ইন্দিরানগর', 'কোরামঙ্গলা', 'বিল্লান্দুর', 'জয়নগর', 'ইলেকট্রনিক সিটি', 'बेंगलुरु', 'बैंगलोर', 'व्हाइटफील्ड', 'इंदिरानगर', 'कोरमंगला', 'जयनगर', 'इलेक्ट्रॉनिक सिटी']
  },
  'chennai': {
    name: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    aliases: ['chennai', 'madras', 'adyar', 't nagar', 'anna nagar', 'velachery', 'mylapore', 'omr', 'nungambakkam', 'besant nagar', 'guindy', 'kilpauk', 'alwarpet', 'চেন্নাই', 'মাদ্রাজ', 'আদিয়ার', 'আন্না নগর', 'चेन्नई', 'मद्रास', 'अड्यार', 'अन्ना नगर']
  },
  'mumbai': {
    name: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    aliases: ['mumbai', 'bombay', 'thane', 'navi mumbai', 'bandra', 'andheri', 'juhu', 'worli', 'dadar', 'borivali', 'powai', 'kandivali', 'vashi', 'lower parel', 'khar', 'মুম্বাই', 'বোম্বাই', 'থানে', 'নবী মুম্বাই', 'বান্দ্রা', 'আন্ধেরি', 'জুহু', 'ওরলি', 'দাদর', 'বরিবলি', 'পওয়াই', 'मुंबई', 'बॉम्बे', 'ठाणे', 'नवी मुंबई', 'बांद्रा', 'अंधेरी', 'जुहू', 'वरली', 'दादर', 'बोरीवली', 'पवई']
  },
  'delhi': {
    name: 'Delhi',
    lat: 28.7041,
    lng: 77.1025,
    aliases: ['delhi', 'new delhi', 'noida', 'gurugram', 'gurgaon', 'ghaziabad', 'faridabad', 'rohini', 'lajpat nagar', 'dwarka', 'south ex', 'hauz khas', 'saket', 'pitampura', 'mayur vihar', 'দিল্লি', 'নতুন দিল্লি', 'নয়ডা', 'গুরগাঁও', 'গুরুগ্রাম', 'গাজিয়াবাদ', 'ফরিদাবাদ', 'রোহিণী', 'দ্বারকা', 'সাউথ এক্স', 'সাখ্যাত', 'दिल्ली', 'नई दिल्ली', 'नोएडा', 'गुरुग्राम', 'गुडगांव', 'गाजियाबाद', 'फरीदाबाद', 'रोहिणी', 'द्वारका', 'साकेत']
  },
  'hyderabad': {
    name: 'Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
    aliases: ['hyderabad', 'secunderabad', 'cyberabad', 'gachibowli', 'madhapur', 'hitec city', 'kondapur', 'banjara hills', 'jubilee hills', 'kukatpally', 'begumpet', 'miyapur', 'হায়দ্রাবাদ', 'সেকেন্দ্রাবাদ', 'সাইবারাবাদ', 'গাচিবোলি', 'মাধাপুর', 'হাইটেক সিটি', 'বানজারা হিলস', 'हैदराबाद', 'सिकंदराबाद', 'साइबराबाद', 'गाचीबोवली', 'माधापुर', 'हाईटेक सिटी', 'बंजारा हिल्स']
  },
  'ahmedabad': {
    name: 'Ahmedabad',
    lat: 23.0225,
    lng: 72.5714,
    aliases: ['ahmedabad', 'ahmadabad', 'gandhinagar', 'satellite', 'bodakdev', 'vastrapur', 'prahlad nagar', 'maninagar', 'sg highway', 'bopal', 'navrangpura', 'paldi', 'আমেদাবাদ', 'আহমেদাবাদ', 'গান্ধীনগর', 'স্যাটেলাইট', 'বোড়াকদেব', 'ভস্ত্রাপুর', 'अहमदाबाद', 'गांधीनगर', 'सैटेलाइट', 'बोडकदेव', 'वस्त्रापुर', 'प्रहलाद नगर']
  },
  'pune': {
    name: 'Pune',
    lat: 18.5204,
    lng: 73.8567,
    aliases: ['pune', 'poona', 'pcmc', 'pimpri', 'chinchwad', 'hinjewadi', 'hinjawadi', 'kothrud', 'viman nagar', 'baner', 'aundh', 'wakad', 'koregaon park', 'hadapsar', 'magarpatta', 'পুনে', 'পুণে', 'পিম্পরি', 'চিঞ্চওয়াড়', 'হিঞ্জেওয়াড়ি', 'কোথরূড', 'বিমান নগর', 'বানের', 'पुणे', 'पूना', 'पिंपरी', 'चिंचवड़', 'हिंजवड़ी', 'कोथरुड', 'विमान नगर', 'बानेर', 'वाकड़']
  }
};

/**
 * Haversine formula to compute great-circle distance between two points in km
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Resolve canonical city and radius estimation
 */
function resolveCityFromLocation(query, coords = null) {
  // 1. If GPS coordinates provided, find closest canonical city
  if (coords && typeof coords.lat === 'number' && typeof coords.lng === 'number') {
    let closestCity = null;
    let minDistance = Infinity;
    for (const key in CANONICAL_CITIES) {
      const cityObj = CANONICAL_CITIES[key];
      const dist = calculateDistanceKm(coords.lat, coords.lng, cityObj.lat, cityObj.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestCity = cityObj.name;
      }
    }
    // If within 80km radius, map to that city
    if (minDistance <= 80) {
      return { city: closestCity, canonicalCity: closestCity, isSupported: true, distanceKm: Math.round(minDistance) };
    }
  }

  // 2. Query text match
  if (query && typeof query === 'string') {
    const q = query.toLowerCase().trim();
    if (q && q !== 'choose location') {
      for (const key in CANONICAL_CITIES) {
        const cityObj = CANONICAL_CITIES[key];
        if (cityObj.aliases.some(a => q.includes(a))) {
          return { city: cityObj.name, canonicalCity: cityObj.name, isSupported: true, distanceKm: 0 };
        }
      }
      // Custom user typed city outside the 8
      const cleaned = query.split(',')[0].trim();
      if (cleaned && cleaned.toLowerCase() !== 'choose location') {
        return { city: cleaned, canonicalCity: cleaned, isSupported: false, distanceKm: null };
      }
    }
  }

  return { city: null, canonicalCity: null, isSupported: false, distanceKm: null };
}

/**
 * Pre-assigned verified specialists for demonstration across the 8 primary cities.
 * Distinct local names, ratings, local areas, and rates.
 */
const PRE_ASSIGNED_WORKERS = require('./preassigned-workers');

/**
 * Find approved workers matching a service and specific city / location.
 * Implements AI radius approximation for nearby metropolitan hubs and custom locations.
 */
async function findWorkersByService(serviceId, cityQuery = null, coords = null) {
  const sId = (serviceId || '').toLowerCase().trim();
  const cleanId = sId.replace(/[-_]/g, ' ').trim();
  const domain = getCanonicalDomain(sId || cleanId);
  const keywords = domain ? domain.keywords : (SERVICE_SKILL_MAP[sId] || (cleanId ? [sId, cleanId] : [sId]));
  const negativeCategories = domain ? (domain.negativeCategories || []).map(c => c.toLowerCase().trim()) : [];
  const domainCategories = domain ? (domain.categories || []).map(c => c.toLowerCase().trim()) : [];

  // 1. Resolve canonical city and distance
  const locationResolution = resolveCityFromLocation(cityQuery, coords);
  const targetCity = locationResolution.city;
  const isSupportedCity = locationResolution.isSupported;

  if (!targetCity) {
    return {
      serviceId: sId,
      city: null,
      exactMatch: false,
      noCoverage: true,
      needsLocation: true,
      message: 'Location required to search nearby specialists.',
      workers: [],
      similar: []
    };
  }

  // 2. Fetch all database workers
  const allDbWorkers = await findUsersByRole('worker');
  const approvedDbWorkers = allDbWorkers.filter(w => w.approvalStatus === 'approved');

  // Filter db workers for this city
  const cityDbWorkers = approvedDbWorkers.filter(w => {
    const wCity = (w.city || '').toLowerCase().trim();
    const wLoc = (w.locality || '').toLowerCase().trim();
    const tCity = targetCity.toLowerCase().trim();
    if (!wCity && !wLoc) return false;
    if (wCity && (wCity === tCity || (wCity.length > 2 && tCity.includes(wCity)) || (tCity.length > 2 && wCity.includes(tCity)))) {
      return true;
    }
    if (wLoc && tCity.length > 2 && wLoc.includes(tCity)) {
      return true;
    }
    return false;
  });

  // Filter pre-assigned workers for this city
  const cityPreAssigned = PRE_ASSIGNED_WORKERS.filter(w => {
    return w.city.toLowerCase() === targetCity.toLowerCase();
  });

  // Combine both pools for this city
  const combinedCityWorkers = [...cityDbWorkers, ...cityPreAssigned];

  // If outside the 8 cities and NO worker has registered in that custom city:
  if (!isSupportedCity && combinedCityWorkers.length === 0) {
    return {
      serviceId: sId,
      city: targetCity,
      exactMatch: false,
      noCoverage: true,
      distanceKm: locationResolution.distanceKm,
      message: `Currently no workers registered in ${targetCity}. You can post a custom service request to the open gig pool!`,
      workers: [],
      similar: []
    };
  }

  // 3. Find exact matching workers for this service in this city
  const exactMatches = combinedCityWorkers.filter(w => {
    const cat = (w.skillCategory || '').toLowerCase().trim();
    const spec = (w.specificSkill || '').toLowerCase().trim();
    const primary = (w.primarySkill || '').toLowerCase().trim();

    // If worker's skillCategory belongs to an explicitly negative category for this domain, reject!
    if (cat && negativeCategories.some(neg => cat === neg || cat.includes(neg) || neg.includes(cat))) {
      return false;
    }

    // Direct match with domain categories
    if (cat && domainCategories.some(dc => cat === dc || cat.includes(dc) || dc.includes(cat))) {
      return true;
    }

    // Keyword match in skills or category
    const hasKeywordMatch = keywords.some(k => {
      const kw = (k || '').toLowerCase().trim();
      if (!kw || kw.length < 3) return false;
      return cat.includes(kw) || spec.includes(kw) || primary.includes(kw);
    });

    if (hasKeywordMatch) return true;

    return (cleanId.length >= 4 && (cat.includes(cleanId) || spec.includes(cleanId) || primary.includes(cleanId)));
  });

  // Rank workers: highest rating first, then most completed jobs
  exactMatches.sort((a, b) => {
    const rA = Number(a.rating) || 4.5;
    const rB = Number(b.rating) || 4.5;
    if (rB !== rA) return rB - rA;
    const jA = Number(a.completedJobs || a.completedJobsCount) || 0;
    const jB = Number(b.completedJobs || b.completedJobsCount) || 0;
    return jB - jA;
  });

  if (exactMatches.length > 0) {
    return {
      serviceId: sId,
      city: targetCity,
      exactMatch: true,
      noCoverage: false,
      workers: exactMatches,
      similar: []
    };
  }

  // 4. Similar / cross-trained workers in this city
  return {
    serviceId: sId,
    city: targetCity,
    exactMatch: false,
    noCoverage: false,
    workers: [],
    similar: []
  };
}

/**
 * Create a new appointment booking
 */
async function createBooking(bookingData) {
  if (isMongoReady) {
    try {
      const booking = new Booking(bookingData);
      await booking.save();
      return booking;
    } catch (err) {
      console.error('Mongo createBooking error:', err.message);
    }
  }

  const store = readLocalStore();
  const newBooking = {
    _id: 'bk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    ...bookingData,
    status: bookingData.status || 'pending',
    negotiations: bookingData.negotiations || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.bookings.unshift(newBooking);
  writeLocalStore(store);
  return newBooking;
}

/**
 * Find booking by ID
 */
async function findBookingById(id) {
  if (!id) return null;
  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const found = await Booking.findById(id);
        if (found) return found;
      }
      return await Booking.findOne({ _id: id });
    } catch (err) {
      console.error('Mongo findBookingById error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.bookings.find(b => String(b._id || b.id) === String(id)) || null;
}

/**
 * Update an existing booking
 */
async function updateBooking(id, updates) {
  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Booking.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true });
        if (updated) return updated;
      }
      return await Booking.findOneAndUpdate({ _id: id }, { ...updates, updatedAt: new Date() }, { new: true });
    } catch (err) {
      console.error('Mongo updateBooking error:', err.message);
    }
  }

  const store = readLocalStore();
  const idx = store.bookings.findIndex(b => String(b._id || b.id) === String(id));
  if (idx !== -1) {
    store.bookings[idx] = {
      ...store.bookings[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
    return store.bookings[idx];
  }
  return null;
}

/**
 * Find bookings for a customer
 */
async function findBookingsByCustomer(customerId) {
  if (isMongoReady) {
    try {
      return await Booking.find({ customerId: String(customerId) }).sort({ createdAt: -1 });
    } catch (err) {
      console.error('Mongo findBookingsByCustomer error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.bookings.filter(b => String(b.customerId) === String(customerId));
}

/**
 * Approximate skill matching between worker skill and demanded gig service
 * Matches standard categories as well as custom / 'Other' specific skills
 */
function skillsApproxMatch(workerSkill, demandedGig) {
  if (!workerSkill || !demandedGig) return false;
  const w = String(workerSkill).toLowerCase().trim();
  const d = String(demandedGig).toLowerCase().trim();

  // 1. Direct equality or substring containment
  if (w === d || w.includes(d) || d.includes(w)) return true;

  // 2. Tokenize with Unicode letter/number support and remove stop words
  const stopWords = new Set([
    'and', '&', 'or', 'the', 'a', 'an', 'for', 'in', 'at', 'to', 'of', 'with',
    'service', 'services', 'pro', 'pros', 'help', 'specialist', 'expert',
    'care', 'work', 'works', 'need', 'needs', 'repair', 'repairs', 'fixing',
    'custom', 'pool', 'request', 'other', 'specialized', 'trade', 'visits',
    'এবং', 'বা', 'জন্য', 'কাজ', 'সার্ভিস', 'মিস্ত্রি', 'সেবা', 'দরকার', 'প্রয়োজন',
    'और', 'या', 'के', 'लिए', 'काम', 'सेवा', 'मिस्त्री', 'चाहिए', 'जरूरत'
  ]);

  const tokenize = (str) => {
    return str
      .replace(/[^\p{L}\p{N}]/gu, ' ')
      .split(/\s+/)
      .filter(token => token.length >= 2 && !stopWords.has(token));
  };

  const wTokens = tokenize(w);
  const dTokens = tokenize(d);

  for (const wt of wTokens) {
    for (const dt of dTokens) {
      if (wt === dt || wt.startsWith(dt) || dt.startsWith(wt)) {
        return true;
      }
      if (wt.length >= 4 && dt.length >= 4 && wt.slice(0, 4) === dt.slice(0, 4)) {
        return true;
      }
    }
  }

  // 3. Trade domain keywords mapping across English, Bengali and Hindi
  const tradeGroups = [
    ['plumb', 'pipe', 'leak', 'drain', 'faucet', 'tap', 'sink', 'toilet', 'flush', 'কল', 'জল', 'পাইপ', 'নল', 'প্লাম্বার', 'প্লাম্বিং', 'नल', 'पानी', 'पाइप', 'प्लम्बर', 'प्लंबिंग'],
    ['electr', 'wir', 'switch', 'light', 'circuit', 'fuse', 'socket', 'fan', 'bulb', 'meter', 'ইলেকট্রিক', 'কারেন্ট', 'ফ্যান', 'আলো', 'সুইচ', 'তার', 'বিদ্যুৎ', 'ইলেকট্রিশিয়ান', 'बिजली', 'पंखा', 'तार', 'स्विच', 'इलेक्ट्रीशियन'],
    ['clean', 'maid', 'sweep', 'mop', 'housekeep', 'sanitiz', 'disinfect', 'scrub', 'deep clean', 'পরিষ্কার', 'ঝাড়ু', 'মোছা', 'সফাই', 'ঘর পরিষ্কার', 'सफाई', 'झाड़ू', 'पोछा', 'घर की सफाई'],
    ['carpent', 'wood', 'furnitur', 'door', 'table', 'chair', 'cabinet', 'shelf', 'assembl', 'ছুতোর', 'কাঠ', 'দরজা', 'লক', 'তালা', 'আলমারি', 'আসবাবপত্র', 'কাঠমিস্ত্রি', 'लकड़ी', 'बढ़ई', 'दरवाजा', 'ताला', 'फर्नीचर'],
    ['paint', 'color', 'whitewash', 'wall', 'coat', 'waterproof', 'roller', 'brush', 'রং', 'পেইন্ট', 'দেওয়াল', 'ড্যাম্প', 'রংমিস্ত্রি', 'रंग', 'पेंट', 'दीवार', 'पुताई', 'पेंटर'],
    ['ac', 'aircon', 'fridg', 'refrigerat', 'applianc', 'washing', 'oven', 'microwave', 'এসি', 'ফ্রিজ', 'ওয়াশিং মেশিন', 'অ্যাপ্লায়েন্স', 'एसी', 'फ्रिज', 'कूलर', 'वाशिंग मशीन', 'उपकरण'],
    ['pest', 'termite', 'cockroach', 'fumigat', 'bug', 'insect', 'rodent', 'rat', 'পোকামাকড়', 'উইপোকা', 'তেলাপোকা', 'কীটনাশক', 'ছারপোকা', 'दीमक', 'कॉकरोच', 'कीटनाशक', 'पेस्ट कंट्रोल'],
    ['child', 'baby', 'babysit', 'nanny', 'infant', 'toddler', 'বাচ্চা', 'শিশু', 'আয়া', 'শিশুর যত্ন', 'बच्चा', 'शिशु', 'आया', 'दाई', 'बेबीसिटिंग'],
    ['pet', 'dog', 'cat', 'puppy', 'walk', 'groom', 'কুকুর', 'বিড়াল', 'পোষ্য', 'কুকুর ঘোরানো', 'कुत्ता', 'बिल्ली', 'पालतू', 'डॉग वॉकर'],
    ['tutor', 'teach', 'math', 'scienc', 'physic', 'chemistr', 'english', 'lesson', 'class', 'শিক্ষক', 'টিউশন', 'টুইশন', 'পড়াশোনা', 'অঙ্ক', 'টিউটর', 'ट्यूशन', 'शिक्षक', 'पढ़ाई', 'गणित'],
    ['tech', 'laptop', 'comput', 'wifi', 'wi-fi', 'network', 'pc', 'mac', 'ল্যাপটপ', 'কম্পিউটার', 'ইন্টারনেট', 'রাউটার', 'ওয়াইফাই', 'लैपटॉप', 'कंप्यूटर', 'वाईफाई', 'इंटरनेट'],
    ['garden', 'plant', 'lawn', 'grass', 'prun', 'tree', 'landscap', 'বাগান', 'গাছপালা', 'টব', 'মালী', 'बगीचा', 'पौधे', 'माली', 'गमला'],
    ['yoga', 'fit', 'gym', 'workout', 'train', 'coach', 'ব্যায়াম', 'যোগব্যায়াম', 'ফিটনেস', 'योगा', 'कसरत', 'जिम', 'फिटनेस'],
    ['car', 'auto', 'bike', 'motorcycl', 'vehicl', 'wash', 'detail', 'গাড়ি', 'গাড়ির ওয়াশ', 'বাইক', 'গাছ ধোয়া', 'गाड़ी', 'कार वॉश', 'बाइक'],
    ['senior', 'elder', 'companion', 'assist', 'বয়স্ক', 'বৃদ্ধ', 'বুজুর্গ', 'দাদু', 'দিদিমা', 'বুजुर्ग', 'वृद्ध', 'दादा', 'दादी'],
    ['spa', 'massag', 'salon', 'facial', 'haircut', 'স্পা', 'ম্যাসাজ', 'সেলুন', 'ফেসিয়াল', 'রূপচর্চা', 'स्पा', 'मसाज', 'सैलून', 'মালিশ'],
    ['organis', 'organiz', 'wardrob', 'closet', 'declutter', 'গোছানো', 'আলমারি', 'ঘর সাজানো', 'अलमारी', 'सजावट', 'व्यवस्था'],
    ['handyman', 'drill', 'assembl', 'mount', 'hang', 'curtain rod', 'tv mount', 'shelf', 'হ্যান্ডিম্যান', 'ড্রিল', 'ছবি টাঙানো', 'ড্রিলিং', 'हैंडीमैन', 'ड्रिल', 'ड्रिलिंग', 'फिटिंग']
  ];

  for (const group of tradeGroups) {
    const wHas = group.some(term => w.includes(term));
    const dHas = group.some(term => d.includes(term));
    if (wHas && dHas) return true;
  }

  return false;
}

/**
 * Find bookings for a worker (direct bookings + open pool requests matching their skill)
 */
async function findBookingsByWorker(workerId, workerSkill = '', workerCity = '', workerName = '', workerSpecificSkill = '') {
  const wId = String(workerId);
  const wCity = (workerCity || '').toLowerCase().trim();
  const wName = (workerName || '').toLowerCase().trim();
  const combinedSkill = [workerSkill, workerSpecificSkill].filter(Boolean).join(' ').trim();
  const resolvedWorkerCity = wCity ? resolveCityFromLocation(wCity) : null;
  const canonicalWorkerCity = (resolvedWorkerCity && resolvedWorkerCity.canonicalCity) ? resolvedWorkerCity.canonicalCity.toLowerCase() : '';

  if (isMongoReady) {
    try {
      const orConditions = [
        { workerId: wId },
        { workerId: null }
      ];
      if (wName) {
        orConditions.push({ workerName: new RegExp(`^${wName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });
      }
      const records = await Booking.find({ $or: orConditions }).sort({ createdAt: -1 });

      return records.filter(b => {
        if (b.workerId && String(b.workerId) === wId) return true;
        if (wName && b.workerName && b.workerName.toLowerCase().trim() === wName) return true;
        if (!b.workerId) {
          if (Array.isArray(b.declinedWorkerIds) && b.declinedWorkerIds.includes(wId)) {
            return false;
          }
          if (canonicalWorkerCity && b.city) {
            const resolvedBookingCity = resolveCityFromLocation(b.city);
            const canonicalBookingCity = (resolvedBookingCity && resolvedBookingCity.canonicalCity) ? resolvedBookingCity.canonicalCity.toLowerCase() : '';
            if (canonicalWorkerCity !== canonicalBookingCity) return false;
          }
          if (combinedSkill) {
            return skillsApproxMatch(combinedSkill, `${b.serviceName || ''} ${b.category || ''}`);
          }
          return true;
        }
        return false;
      });
    } catch (err) {
      console.error('Mongo findBookingsByWorker error:', err.message);
    }
  }

  const store = readLocalStore();
  return store.bookings.filter(b => {
    // 1. Direct booking appointed to this specific worker - match by workerId or workerName!
    if (b.workerId && String(b.workerId) === wId) return true;
    if (wName && b.workerName && b.workerName.toLowerCase().trim() === wName) return true;
    
    // 2. Open pool booking (customer requested any available pro)
    if (!b.workerId) {
      if (Array.isArray(b.declinedWorkerIds) && b.declinedWorkerIds.includes(wId)) {
        return false;
      }
      if (canonicalWorkerCity && b.city) {
        const resolvedBookingCity = resolveCityFromLocation(b.city);
        const canonicalBookingCity = (resolvedBookingCity && resolvedBookingCity.canonicalCity) ? resolvedBookingCity.canonicalCity.toLowerCase() : '';
        if (canonicalWorkerCity !== canonicalBookingCity) return false;
      }
      // Filter open pool bookings so worker only sees gigs where their skill approx matches!
      if (combinedSkill) {
        return skillsApproxMatch(combinedSkill, `${b.serviceName || ''} ${b.category || ''}`);
      }
      return true;
    }
    
    // 3. Demo bookings in same city
    if (b.workerId && String(b.workerId).startsWith('pro_')) {
      if (canonicalWorkerCity && b.city) {
        const resolvedBookingCity = resolveCityFromLocation(b.city);
        const canonicalBookingCity = (resolvedBookingCity && resolvedBookingCity.canonicalCity) ? resolvedBookingCity.canonicalCity.toLowerCase() : '';
        if (canonicalWorkerCity !== canonicalBookingCity) return false;
      }
      return true;
    }
    return false;
  });
}

/**
 * Add a negotiation counter-offer or note to booking
 */
async function addBookingNegotiation(bookingId, negotiationEntry) {
  const booking = await findBookingById(bookingId);
  if (!booking) return null;

  const currentNegs = booking.negotiations || [];
  const updatedNegs = [...currentNegs, { ...negotiationEntry, createdAt: new Date() }];

  const updates = {
    negotiations: updatedNegs,
    status: negotiationEntry.newStatus || 'bargaining'
  };

  if (negotiationEntry.proposedPrice) {
    updates.price = negotiationEntry.proposedPrice;
  }
  if (negotiationEntry.proposedTime) {
    updates.scheduledTime = negotiationEntry.proposedTime;
  }
  if (negotiationEntry.proposedDate) {
    updates.scheduledDate = negotiationEntry.proposedDate;
  }
  if (negotiationEntry.workerPhone) {
    updates.workerPhone = negotiationEntry.workerPhone;
  }
  if (negotiationEntry.workerId) {
    updates.workerId = negotiationEntry.workerId;
  }
  if (negotiationEntry.workerName) {
    updates.workerName = negotiationEntry.workerName;
  }

  return await updateBooking(bookingId, updates);
}

/**
 * Real Local Pricing Intelligence Engine
 * Queries real workers and actual bookings in the target city to gather prevailing market rates
 */
async function getLocalPricingIntelligence(serviceCategory = null, queryText = '', cityQuery = 'Bengaluru') {
  try {
    const locationResolution = resolveCityFromLocation(cityQuery, null);
    const targetCity = locationResolution.city || 'Bengaluru';
    const cleanQ = (queryText || '').toLowerCase().trim();
    const cleanCat = (serviceCategory || '').toLowerCase().trim();

    // 1. Fetch all active workers in target city
    const allDbWorkers = await findUsersByRole('worker');
    const approvedDbWorkers = allDbWorkers.filter(w => w.approvalStatus === 'approved');

    const cityDbWorkers = approvedDbWorkers.filter(w => {
      const wCity = (w.city || '').toLowerCase().trim();
      const wLoc = (w.locality || '').toLowerCase().trim();
      const tCity = targetCity.toLowerCase().trim();
      return wCity === tCity || (wCity && tCity.includes(wCity)) || (wLoc && tCity.includes(wLoc));
    });

    const cityPreAssigned = PRE_ASSIGNED_WORKERS.filter(w => {
      return (w.city || '').toLowerCase().trim() === targetCity.toLowerCase().trim();
    });

    const allCityWorkers = [...cityDbWorkers, ...cityPreAssigned];

    // Filter workers who match the trade or skill query
    const keywords = cleanQ.split(/\s+/).filter(k => k.length > 2);
    const matchingWorkers = allCityWorkers.filter(w => {
      const cat = (w.skillCategory || '').toLowerCase();
      const spec = (w.specificSkill || '').toLowerCase();
      const bio = (w.bio || '').toLowerCase();

      if (cleanCat && (cat.includes(cleanCat) || cleanCat.includes(cat))) return true;
      if (keywords.some(k => cat.includes(k) || spec.includes(k) || bio.includes(k))) return true;
      return false;
    });

    // 2. Fetch recent bookings in that city for this service/category
    let sampleBookingPrices = [];
    try {
      if (isMongoReady) {
        const query = {
          city: new RegExp(targetCity, 'i')
        };
        if (cleanCat) {
          query.$or = [
            { category: new RegExp(cleanCat, 'i') },
            { serviceName: new RegExp(cleanCat, 'i') }
          ];
        }
        const recentBookings = await Booking.find(query).limit(10).lean();
        sampleBookingPrices = recentBookings.map(b => Number(b.price)).filter(p => !isNaN(p) && p > 0);
      }
    } catch (bookingErr) {
      console.warn('[Pricing Intelligence] Error fetching bookings:', bookingErr.message);
    }

    // 3. Collect rates
    const candidateRates = [];
    const pool = matchingWorkers.length > 0 ? matchingWorkers : [];

    pool.forEach(w => {
      const rate = Number(w.baseRate || w.hourlyRate || w.price);
      if (!isNaN(rate) && rate > 0) {
        candidateRates.push(rate);
      }
    });

    sampleBookingPrices.forEach(p => {
      candidateRates.push(p);
    });

    if (candidateRates.length > 0) {
      const minDemandRate = Math.min(...candidateRates);
      const maxDemandRate = Math.max(...candidateRates);
      const avgDemandRate = Math.round(candidateRates.reduce((a, b) => a + b, 0) / candidateRates.length);

      return {
        hasLocalWorkers: true,
        city: targetCity,
        workerCount: matchingWorkers.length,
        minDemandRate,
        maxDemandRate,
        avgDemandRate,
        sampleDemands: candidateRates.slice(0, 5),
        sampleWorkers: matchingWorkers.slice(0, 3).map(w => ({
          name: w.name,
          skill: w.specificSkill || w.skillCategory,
          rate: w.baseRate || avgDemandRate
        }))
      };
    }

    // If no workers or bookings exist in that city for this trade:
    return {
      hasLocalWorkers: false,
      city: targetCity,
      workerCount: 0,
      minDemandRate: null,
      maxDemandRate: null,
      avgDemandRate: null,
      sampleDemands: [],
      sampleWorkers: []
    };
  } catch (err) {
    console.warn('[Pricing Intelligence] Error computing local pricing:', err.message);
    return {
      hasLocalWorkers: false,
      city: cityQuery,
      workerCount: 0
    };
  }
}

/**
 * =========================================================================
 * Support Tickets & Customer/Worker Dispute Operations
 * =========================================================================
 */

/**
 * Create a new dispute support ticket
 */
async function createTicket(ticketData) {
  if (isMongoReady) {
    try {
      const ticket = new Ticket(ticketData);
      await ticket.save();
      return ticket;
    } catch (err) {
      console.error('Mongo createTicket error:', err.message);
    }
  }

  const store = readLocalStore();
  const newTicket = {
    _id: 'tkt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    ...ticketData,
    status: ticketData.status || 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.tickets = store.tickets || [];
  store.tickets.unshift(newTicket);
  writeLocalStore(store);
  return newTicket;
}

/**
 * Find ticket by ID or ticketId
 */
async function findTicketById(id) {
  if (!id) return null;
  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const found = await Ticket.findById(id);
        if (found) return found;
      }
      return await Ticket.findOne({ ticketId: id });
    } catch (err) {
      console.error('Mongo findTicketById error:', err.message);
    }
  }

  const store = readLocalStore();
  store.tickets = store.tickets || [];
  return store.tickets.find(t => String(t._id || t.id) === String(id) || t.ticketId === id) || null;
}

/**
 * Update an existing dispute ticket
 */
async function updateTicket(id, updates) {
  if (isMongoReady) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Ticket.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true });
        if (updated) return updated;
      }
      return await Ticket.findOneAndUpdate(
        { ticketId: id },
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
    } catch (err) {
      console.error('Mongo updateTicket error:', err.message);
    }
  }

  const store = readLocalStore();
  store.tickets = store.tickets || [];
  const idx = store.tickets.findIndex(t => String(t._id || t.id) === String(id) || t.ticketId === id);
  if (idx !== -1) {
    store.tickets[idx] = {
      ...store.tickets[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
    return store.tickets[idx];
  }
  return null;
}

/**
 * Find tickets by booking ID
 */
async function findTicketsByBooking(bookingId) {
  if (!bookingId) return [];
  if (isMongoReady) {
    try {
      return await Ticket.find({ bookingId }).sort({ createdAt: -1 });
    } catch (err) {
      console.error('Mongo findTicketsByBooking error:', err.message);
    }
  }

  const store = readLocalStore();
  store.tickets = store.tickets || [];
  return store.tickets.filter(t => String(t.bookingId) === String(bookingId));
}

/**
 * Find tickets involving a specific user
 * NOTE: If includeUnsettledAgainst is false (default for normal users),
 * tickets where this user is the accused party remain hidden until the admin
 * has officially settled the dispute (status is 'resolved' or 'dismissed').
 */
async function findTicketsByUser(userId, includeUnsettledAgainst = false) {
  if (!userId) return [];
  const uid = String(userId);
  if (isMongoReady) {
    try {
      const query = includeUnsettledAgainst
        ? { $or: [{ complainantId: uid }, { againstId: uid }] }
        : {
            $or: [
              { complainantId: uid },
              { againstId: uid, status: { $in: ['resolved', 'dismissed'] } }
            ]
          };
      return await Ticket.find(query).sort({ createdAt: -1 });
    } catch (err) {
      console.error('Mongo findTicketsByUser error:', err.message);
    }
  }

  const store = readLocalStore();
  store.tickets = store.tickets || [];
  return store.tickets
    .filter(t => {
      const isComplainant = String(t.complainantId) === uid;
      const isAgainst = String(t.againstId) === uid;
      if (isComplainant) return true;
      if (isAgainst) {
        return includeUnsettledAgainst || ['resolved', 'dismissed'].includes(t.status);
      }
      return false;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Issue an official warning to a customer or worker from a dispute settlement.
 * Rule: Accumulating more than 3 warnings (i.e. 4 or more) permanently bans the account.
 */
async function issueUserWarning(userId, warningData = {}) {
  const user = await findUserById(userId);
  if (!user) return null;

  const currentCount = Number(user.warningsCount) || 0;
  const newCount = currentCount + 1;
  const warningsList = Array.isArray(user.warnings) ? [...user.warnings] : [];

  const newWarning = {
    warningId: 'WRN-' + Math.floor(100000 + Math.random() * 900000),
    ticketId: warningData.ticketId || '',
    bookingId: warningData.bookingId || '',
    reason: warningData.reason || 'Official warning issued for platform dispute resolution.',
    issuedBy: warningData.issuedBy || 'SevaSathi Operations Admin',
    issuedAt: new Date().toISOString()
  };
  warningsList.push(newWarning);

  const updates = {
    warningsCount: newCount,
    warnings: warningsList
  };

  // Rule: receiving a warning of more than 3 bans account forever (> 3 warnings)
  if (newCount > 3) {
    updates.isBanned = true;
    updates.bannedAt = new Date().toISOString();
    updates.banReason = `Account permanently banned: Exceeded allowable warning threshold (${newCount} official warnings received).`;
    if (user.role === 'worker') {
      updates.approvalStatus = 'rejected';
    }
  }

  const updatedUser = await updateUser(user._id || user.id || userId, updates);
  return {
    user: updatedUser,
    warningsCount: newCount,
    isBanned: newCount > 3,
    bannedNow: newCount === 4
  };
}

/**
 * Get all tickets (for admin dispute console)
 */
async function getAllTickets() {
  if (isMongoReady) {
    try {
      return await Ticket.find().sort({ createdAt: -1 });
    } catch (err) {
      console.error('Mongo getAllTickets error:', err.message);
    }
  }

  const store = readLocalStore();
  store.tickets = store.tickets || [];
  return [...store.tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// ==========================================
// BUSINESS WORKFORCE & REQUISITIONS METHODS
// ==========================================

async function createBusinessRequirement(data) {
  const reqObj = {
    ...data,
    requirementId: data.requirementId || `REQ-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    status: data.status || 'open',
    allocatedWorkers: data.allocatedWorkers || [],
    contractId: data.contractId || null,
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date()
  };

  if (isMongoReady) {
    try {
      const created = await BusinessRequirement.create(reqObj);
      return created.toObject ? created.toObject() : created;
    } catch (err) {
      console.warn('Mongo createBusinessRequirement error, fallback:', err.message);
    }
  }

  const store = readLocalStore();
  store.businessRequirements = store.businessRequirements || [];
  reqObj._id = 'req_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  reqObj.id = reqObj._id;
  store.businessRequirements.push(reqObj);
  writeLocalStore(store);
  return reqObj;
}

async function findBusinessRequirementById(id) {
  if (isMongoReady) {
    try {
      const found = await BusinessRequirement.findOne({
        $or: [{ requirementId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }]
      });
      if (found) return found.toObject ? found.toObject() : found;
    } catch (err) {
      console.warn('Mongo findBusinessRequirementById error:', err.message);
    }
  }

  const store = readLocalStore();
  store.businessRequirements = store.businessRequirements || [];
  return store.businessRequirements.find(r => r.requirementId === id || String(r._id) === String(id) || String(r.id) === String(id)) || null;
}

async function findBusinessRequirementsByBusiness(businessId) {
  if (isMongoReady) {
    try {
      return await BusinessRequirement.find({ businessId: String(businessId) }).sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo findBusinessRequirementsByBusiness error:', err.message);
    }
  }

  const store = readLocalStore();
  store.businessRequirements = store.businessRequirements || [];
  return store.businessRequirements
    .filter(r => String(r.businessId) === String(businessId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function findAllBusinessRequirements() {
  if (isMongoReady) {
    try {
      return await BusinessRequirement.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo findAllBusinessRequirements error:', err.message);
    }
  }

  const store = readLocalStore();
  store.businessRequirements = store.businessRequirements || [];
  return [...store.businessRequirements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function updateBusinessRequirement(id, updateData) {
  if (isMongoReady) {
    try {
      const updated = await BusinessRequirement.findOneAndUpdate(
        { $or: [{ requirementId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );
      if (updated) return updated.toObject ? updated.toObject() : updated;
    } catch (err) {
      console.warn('Mongo updateBusinessRequirement error:', err.message);
    }
  }

  const store = readLocalStore();
  store.businessRequirements = store.businessRequirements || [];
  const idx = store.businessRequirements.findIndex(r => r.requirementId === id || String(r._id) === String(id) || String(r.id) === String(id));
  if (idx !== -1) {
    store.businessRequirements[idx] = { ...store.businessRequirements[idx], ...updateData, updatedAt: new Date() };
    writeLocalStore(store);
    return store.businessRequirements[idx];
  }
  return null;
}

// ==========================================
// CONTRACTS METHODS
// ==========================================

async function createContract(data) {
  const cntObj = {
    ...data,
    contractId: data.contractId || `CNT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: data.status || 'active',
    assignedWorkers: data.assignedWorkers || [],
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date()
  };

  if (isMongoReady) {
    try {
      const created = await Contract.create(cntObj);
      return created.toObject ? created.toObject() : created;
    } catch (err) {
      console.warn('Mongo createContract error:', err.message);
    }
  }

  const store = readLocalStore();
  store.contracts = store.contracts || [];
  cntObj._id = 'cnt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  cntObj.id = cntObj._id;
  store.contracts.push(cntObj);
  writeLocalStore(store);
  return cntObj;
}

async function findContractById(id) {
  if (isMongoReady) {
    try {
      const found = await Contract.findOne({
        $or: [{ contractId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }]
      });
      if (found) return found.toObject ? found.toObject() : found;
    } catch (err) {
      console.warn('Mongo findContractById error:', err.message);
    }
  }

  const store = readLocalStore();
  store.contracts = store.contracts || [];
  return store.contracts.find(c => c.contractId === id || String(c._id) === String(id) || String(c.id) === String(id)) || null;
}

async function findContractsByBusiness(businessId) {
  if (isMongoReady) {
    try {
      return await Contract.find({ businessId: String(businessId) }).sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo findContractsByBusiness error:', err.message);
    }
  }

  const store = readLocalStore();
  store.contracts = store.contracts || [];
  return store.contracts
    .filter(c => String(c.businessId) === String(businessId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function findAllContracts() {
  if (isMongoReady) {
    try {
      return await Contract.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo findAllContracts error:', err.message);
    }
  }

  const store = readLocalStore();
  store.contracts = store.contracts || [];
  return [...store.contracts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function updateContract(id, updateData) {
  if (isMongoReady) {
    try {
      const updated = await Contract.findOneAndUpdate(
        { $or: [{ contractId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );
      if (updated) return updated.toObject ? updated.toObject() : updated;
    } catch (err) {
      console.warn('Mongo updateContract error:', err.message);
    }
  }

  const store = readLocalStore();
  store.contracts = store.contracts || [];
  const idx = store.contracts.findIndex(c => c.contractId === id || String(c._id) === String(id) || String(c.id) === String(id));
  if (idx !== -1) {
    store.contracts[idx] = { ...store.contracts[idx], ...updateData, updatedAt: new Date() };
    writeLocalStore(store);
    return store.contracts[idx];
  }
  return null;
}

// ==========================================
// INVOICES METHODS
// ==========================================

async function createInvoice(data) {
  const invObj = {
    ...data,
    invoiceId: data.invoiceId || `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: data.status || 'pending',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date()
  };

  if (isMongoReady) {
    try {
      const created = await Invoice.create(invObj);
      return created.toObject ? created.toObject() : created;
    } catch (err) {
      console.warn('Mongo createInvoice error:', err.message);
    }
  }

  const store = readLocalStore();
  store.invoices = store.invoices || [];
  invObj._id = 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  invObj.id = invObj._id;
  store.invoices.push(invObj);
  writeLocalStore(store);
  return invObj;
}

async function findInvoiceById(id) {
  if (isMongoReady) {
    try {
      const found = await Invoice.findOne({
        $or: [{ invoiceId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }]
      });
      if (found) return found.toObject ? found.toObject() : found;
    } catch (err) {
      console.warn('Mongo findInvoiceById error:', err.message);
    }
  }

  const store = readLocalStore();
  store.invoices = store.invoices || [];
  return store.invoices.find(i => i.invoiceId === id || String(i._id) === String(id) || String(i.id) === String(id)) || null;
}

async function findInvoicesByBusiness(businessId) {
  if (isMongoReady) {
    try {
      return await Invoice.find({ businessId: String(businessId) }).sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo findInvoicesByBusiness error:', err.message);
    }
  }

  const store = readLocalStore();
  store.invoices = store.invoices || [];
  return store.invoices
    .filter(i => String(i.businessId) === String(businessId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function findAllInvoices() {
  if (isMongoReady) {
    try {
      return await Invoice.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo findAllInvoices error:', err.message);
    }
  }

  const store = readLocalStore();
  store.invoices = store.invoices || [];
  return [...store.invoices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function updateInvoice(id, updateData) {
  if (isMongoReady) {
    try {
      const updated = await Invoice.findOneAndUpdate(
        { $or: [{ invoiceId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );
      if (updated) return updated.toObject ? updated.toObject() : updated;
    } catch (err) {
      console.warn('Mongo updateInvoice error:', err.message);
    }
  }

  const store = readLocalStore();
  store.invoices = store.invoices || [];
  const idx = store.invoices.findIndex(i => i.invoiceId === id || String(i._id) === String(id) || String(i.id) === String(id));
  if (idx !== -1) {
    store.invoices[idx] = { ...store.invoices[idx], ...updateData, updatedAt: new Date() };
    writeLocalStore(store);
    return store.invoices[idx];
  }
  return null;
}

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoReady,
  CANONICAL_SERVICE_DOMAINS,
  getCanonicalDomain,
  SERVICE_SKILL_MAP,
  findUserByEmail,
  findUserByPhone,
  findUserByIdentifier,
  findUserById,
  findUsersByRole,
  findWorkersByService,
  getLocalPricingIntelligence,
  createUser,
  updateUser,
  deleteUser,
  createOtp,
  findValidOtp,
  markOtpUsed,
  createBooking,
  findBookingById,
  updateBooking,
  findBookingsByCustomer,
  findBookingsByWorker,
  skillsApproxMatch,
  addBookingNegotiation,
  CANONICAL_CITIES,
  calculateDistanceKm,
  resolveCityFromLocation,
  PRE_ASSIGNED_WORKERS,
  createTicket,
  findTicketById,
  updateTicket,
  findTicketsByBooking,
  findTicketsByUser,
  issueUserWarning,
  getAllTickets,
  // Business, Contracts & Invoices
  createBusinessRequirement,
  findBusinessRequirementById,
  findBusinessRequirementsByBusiness,
  findAllBusinessRequirements,
  updateBusinessRequirement,
  createContract,
  findContractById,
  findContractsByBusiness,
  findAllContracts,
  updateContract,
  createInvoice,
  findInvoiceById,
  findInvoicesByBusiness,
  findAllInvoices,
  updateInvoice
};
