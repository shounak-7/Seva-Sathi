const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../services/db');
const { JWT_SECRET } = require('../middleware/auth');

// Authentication & Business Middleware
function requireBusiness(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'business' && decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Business or Admin role required.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
}

// Authentication & Worker Middleware
function requireWorker(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'worker') {
      return res.status(403).json({ success: false, message: 'Access denied. Worker role required.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
}

// Authentication & Admin Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Administrator privileges required.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
}

/**
 * FAIR WORKFORCE ALLOCATION WEIGHTED SCORING ALGORITHM
 * 1. Skill match: 40%
 * 2. Availability: 25%
 * 3. Distance/Location: 15%
 * 4. Current Workload (Fair Distribution): 10%
 *    -> Lower active jobs = Higher score! Prevents high-rated workers from monopolizing all gigs.
 * 5. Rating / Reliability: 10%
 */
function calculateWorkerScore(worker, requirement) {
  let score = 0;

  // 1. Skill Match (40 pts)
  const reqCategory = (requirement.serviceCategory || '').toLowerCase();
  const reqSkills = (requirement.requiredSkills || '').toLowerCase();
  const workerCategory = (worker.skillCategory || '').toLowerCase();
  const workerSkill = (worker.specificSkill || '').toLowerCase();

  let skillScore = 0;
  if (workerCategory === reqCategory || workerCategory.includes(reqCategory) || reqCategory.includes(workerCategory)) {
    skillScore = 40;
  } else if (db.skillsApproxMatch(workerCategory + ' ' + workerSkill, reqCategory + ' ' + reqSkills)) {
    skillScore = 32;
  } else if (reqSkills && (workerSkill.includes(reqSkills) || reqSkills.includes(workerSkill))) {
    skillScore = 25;
  } else {
    skillScore = 10; // general service match
  }
  score += skillScore;

  // 2. Availability (25 pts)
  // Approved workers who are not marked offline
  let availabilityScore = 25;
  if (worker.isAvailable === false) {
    availabilityScore = 5;
  }
  score += availabilityScore;

  // 3. Location / Distance (15 pts)
  const reqCity = (requirement.city || requirement.location || '').toLowerCase();
  const workerCity = (worker.city || '').toLowerCase();
  const reqLocality = (requirement.location || '').toLowerCase();
  const workerLocality = (worker.locality || '').toLowerCase();

  let locationScore = 0;
  if (workerCity && reqCity && (workerCity.includes(reqCity) || reqCity.includes(workerCity))) {
    locationScore = 12;
    if (workerLocality && reqLocality && (workerLocality.includes(reqLocality) || reqLocality.includes(workerLocality))) {
      locationScore = 15;
    }
  } else {
    locationScore = 5; // same metro region
  }
  score += locationScore;

  // 4. Current Workload / Cooperative Fairness (10 pts)
  // Workers with fewer active jobs receive maximum score to ensure egalitarian gig allocation
  const activeJobs = Number(worker.activeJobsCount || worker.completedJobsCount || 0);
  let workloadScore = 10;
  if (activeJobs <= 1) {
    workloadScore = 10; // High priority for unallocated cooperative members
  } else if (activeJobs <= 3) {
    workloadScore = 7;
  } else if (activeJobs <= 6) {
    workloadScore = 4;
  } else {
    workloadScore = 2; // Demoted to allow newer/waiting members to receive jobs
  }
  score += workloadScore;

  // 5. Rating / Reliability (10 pts)
  const rating = Number(worker.rating) || 4.5;
  const ratingScore = Math.min(10, Math.max(0, (rating / 5) * 10));
  score += ratingScore;

  return Math.round(score);
}

// ==========================================
// BUSINESS DASHBOARD & KPI STATS
// ==========================================

router.get('/stats', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const requirements = await db.findBusinessRequirementsByBusiness(businessId);
    const contracts = await db.findContractsByBusiness(businessId);
    const invoices = await db.findInvoicesByBusiness(businessId);

    const activeRequirements = requirements.filter(r => r.status === 'open' || r.status === 'matching' || r.status === 'allocated').length;
    const pendingRequests = requirements.filter(r => r.status === 'open' || r.status === 'matching').length;
    const activeContracts = contracts.filter(c => c.status === 'active').length;

    // Assigned workers count across active contracts
    let assignedWorkersSet = new Set();
    contracts.filter(c => c.status === 'active').forEach(c => {
      (c.assignedWorkers || []).forEach(w => assignedWorkersSet.add(w.workerId || w.name));
    });

    // Total spending across paid invoices
    const totalSpending = invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, inv) => sum + (inv.breakdown?.totalAmount || inv.totalAmount || 0), 0);

    const completedJobs = contracts.filter(c => c.status === 'completed').length;

    return res.json({
      success: true,
      stats: {
        activeRequirements,
        pendingRequests,
        currentlyAssignedWorkers: assignedWorkersSet.size,
        activeContracts,
        totalSpending,
        completedJobs
      }
    });
  } catch (err) {
    console.error('Error fetching business stats:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve business statistics.' });
  }
});

// ==========================================
// WORKFORCE REQUIREMENTS
// ==========================================

router.post('/requirements', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const businessUser = await db.findUserById(businessId);
    const businessName = businessUser ? (businessUser.businessName || businessUser.name) : 'Corporate Partner';

    const {
      serviceCategory,
      workersNeeded,
      requiredSkills,
      location,
      city,
      startDate,
      endDate,
      schedule,
      ratePerWorker,
      rateUnit = 'daily',
      isRecurring = false,
      recurrenceFrequency = 'none',
      additionalRequirements
    } = req.body;

    if (!serviceCategory || !serviceCategory.trim()) {
      return res.status(400).json({ success: false, message: 'Service category is required.' });
    }
    if (!workersNeeded || Number(workersNeeded) < 1) {
      return res.status(400).json({ success: false, message: 'At least 1 worker must be requested.' });
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ success: false, message: 'Deployment location is required.' });
    }
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Start and end dates are required.' });
    }
    if (!schedule || !schedule.trim()) {
      return res.status(400).json({ success: false, message: 'Working hours / daily schedule is required.' });
    }
    if (!ratePerWorker || Number(ratePerWorker) <= 0) {
      return res.status(400).json({ success: false, message: 'Estimated rate per worker is required.' });
    }

    const requirement = await db.createBusinessRequirement({
      businessId,
      businessName,
      serviceCategory: serviceCategory.trim(),
      workersNeeded: Number(workersNeeded),
      requiredSkills: (requiredSkills || '').trim(),
      location: location.trim(),
      city: (city || (businessUser && businessUser.city) || 'Bengaluru').trim(),
      startDate,
      endDate,
      schedule: schedule.trim(),
      ratePerWorker: Number(ratePerWorker),
      rateUnit,
      isRecurring: Boolean(isRecurring),
      recurrenceFrequency: recurrenceFrequency || 'none',
      additionalRequirements: (additionalRequirements || '').trim(),
      status: 'matching'
    });

    return res.status(201).json({
      success: true,
      message: 'Workforce requirement posted successfully. Cooperative matching initiated.',
      requirement
    });
  } catch (err) {
    console.error('Error posting requirement:', err);
    return res.status(500).json({ success: false, message: 'Failed to post workforce requirement.' });
  }
});

router.get('/requirements', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const requirements = await db.findBusinessRequirementsByBusiness(businessId);
    return res.json({ success: true, requirements });
  } catch (err) {
    console.error('Error listing requirements:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve requirements.' });
  }
});

router.get('/requirements/:id', requireBusiness, async (req, res) => {
  try {
    const requirement = await db.findBusinessRequirementById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found.' });
    }
    return res.json({ success: true, requirement });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve requirement details.' });
  }
});

// ==========================================
// MATCHING ALGORITHM ENDPOINT
// ==========================================

router.get('/requirements/:id/matches', requireBusiness, async (req, res) => {
  try {
    const requirement = await db.findBusinessRequirementById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found.' });
    }

    // Retrieve approved active workers from cooperative
    const allWorkers = await db.findUsersByRole('worker');
    const approvedWorkers = allWorkers.filter(w => w.approvalStatus === 'approved');

    // Score and rank workers
    const scoredWorkers = approvedWorkers.map(w => {
      const matchScore = calculateWorkerScore(w, requirement);
      return {
        workerId: w._id || w.id,
        anonymizedId: 'W-' + String(w._id || w.id).slice(-4).toUpperCase(),
        name: w.name,
        skillCategory: w.skillCategory || requirement.serviceCategory,
        specificSkill: w.specificSkill || 'Certified Professional',
        experience: w.experience || '2+ years',
        approxLocality: w.locality || w.city || 'Nearby Area',
        rating: Number(w.rating) || 4.8,
        ratingCount: Number(w.ratingCount) || 12,
        activeJobsCount: Number(w.activeJobsCount || w.completedJobsCount || 0),
        estimatedCost: requirement.ratePerWorker,
        rateUnit: requirement.rateUnit || 'daily',
        matchScore
      };
    });

    // Sort by fair weighted match score descending
    scoredWorkers.sort((a, b) => b.matchScore - a.matchScore);

    return res.json({
      success: true,
      requirementId: requirement.requirementId,
      workersNeeded: requirement.workersNeeded,
      totalMatched: scoredWorkers.length,
      matches: scoredWorkers
    });
  } catch (err) {
    console.error('Error running matching algorithm:', err);
    return res.status(500).json({ success: false, message: 'Matching calculation failed.' });
  }
});

// ==========================================
// WORKFORCE ALLOCATION & CONTRACT CREATION
// ==========================================

router.post('/requirements/:id/allocate', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const requirement = await db.findBusinessRequirementById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found.' });
    }

    const { selectedWorkerIds } = req.body;
    let allocatedWorkers = [];

    if (Array.isArray(selectedWorkerIds) && selectedWorkerIds.length > 0) {
      for (const wId of selectedWorkerIds) {
        const worker = await db.findUserById(wId);
        if (worker) {
          allocatedWorkers.push({
            workerId: worker._id || worker.id,
            name: worker.name,
            skill: worker.skillCategory || requirement.serviceCategory,
            phone: worker.phone,
            status: 'Active',
            assignedAt: new Date(),
            attendanceStatus: 'Checked In'
          });
        }
      }
    } else {
      // Auto-allocate top matched workers based on algorithm
      const allWorkers = await db.findUsersByRole('worker');
      const approved = allWorkers.filter(w => w.approvalStatus === 'approved');
      const ranked = approved
        .map(w => ({ worker: w, score: calculateWorkerScore(w, requirement) }))
        .sort((a, b) => b.score - a.score);

      const topPicks = ranked.slice(0, requirement.workersNeeded);
      allocatedWorkers = topPicks.map(p => ({
        workerId: p.worker._id || p.worker.id,
        name: p.worker.name,
        skill: p.worker.skillCategory || requirement.serviceCategory,
        phone: p.worker.phone,
        status: 'Active',
        assignedAt: new Date(),
        attendanceStatus: 'Checked In'
      }));
    }

    // Calculate days and total contract amount
    const start = new Date(requirement.startDate);
    const end = new Date(requirement.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const workerCount = allocatedWorkers.length || requirement.workersNeeded;
    const rate = requirement.ratePerWorker;
    const totalEstimatedAmount = workerCount * rate * diffDays;

    // Create formal contract
    const contract = await db.createContract({
      requirementId: requirement.requirementId,
      businessId,
      businessName: requirement.businessName,
      serviceCategory: requirement.serviceCategory,
      workerCount,
      assignedWorkers: allocatedWorkers,
      duration: {
        startDate: requirement.startDate,
        endDate: requirement.endDate,
        totalDays: diffDays
      },
      schedule: requirement.schedule,
      ratePerWorker: rate,
      totalEstimatedAmount,
      status: 'active'
    });

    // Create consolidated initial invoice
    const subtotal = totalEstimatedAmount;
    const cooperativeFee = Math.round(subtotal * 0.05); // 5% platform cooperative reserve
    const invoice = await db.createInvoice({
      contractId: contract.contractId,
      requirementId: requirement.requirementId,
      businessId,
      businessName: requirement.businessName,
      serviceTitle: `${requirement.serviceCategory} Workforce Deployment (${workerCount} Workers)`,
      breakdown: {
        workerCount,
        ratePerDay: rate,
        totalDays: diffDays,
        subtotal,
        cooperativeFee,
        totalAmount: subtotal + cooperativeFee
      },
      status: 'pending'
    });

    // Update requirement with allocation info
    await db.updateBusinessRequirement(requirement.requirementId, {
      status: 'contracted',
      allocatedWorkers,
      contractId: contract.contractId
    });

    return res.json({
      success: true,
      message: 'Workforce allocation confirmed. Contract activated and invoice generated.',
      contract,
      invoice,
      allocatedWorkers
    });
  } catch (err) {
    console.error('Allocation error:', err);
    return res.status(500).json({ success: false, message: 'Workforce allocation failed.' });
  }
});

// ==========================================
// CONTRACTS MANAGEMENT
// ==========================================

router.get('/contracts', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const contracts = await db.findContractsByBusiness(businessId);
    return res.json({ success: true, contracts });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve contracts.' });
  }
});

router.get('/contracts/:id', requireBusiness, async (req, res) => {
  try {
    const contract = await db.findContractById(req.params.id);
    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found.' });
    }
    return res.json({ success: true, contract });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve contract.' });
  }
});

// ==========================================
// WORKFORCE ROSTER VIEW
// ==========================================

router.get('/workforce', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const contracts = await db.findContractsByBusiness(businessId);
    const activeContracts = contracts.filter(c => c.status === 'active');

    // Group assigned workers by team/service
    const teams = {};
    activeContracts.forEach(c => {
      const category = c.serviceCategory || 'General Service';
      if (!teams[category]) {
        teams[category] = [];
      }
      (c.assignedWorkers || []).forEach(w => {
        teams[category].push({
          ...w,
          contractId: c.contractId,
          schedule: c.schedule,
          startDate: c.duration?.startDate,
          endDate: c.duration?.endDate,
          ratePerWorker: c.ratePerWorker
        });
      });
    });

    return res.json({
      success: true,
      totalTeams: Object.keys(teams).length,
      teams
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve workforce roster.' });
  }
});

// ==========================================
// INVOICES & DEMO PAYMENTS
// ==========================================

router.get('/invoices', requireBusiness, async (req, res) => {
  try {
    const businessId = req.user.userId;
    const invoices = await db.findInvoicesByBusiness(businessId);
    return res.json({ success: true, invoices });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve invoices.' });
  }
});

router.post('/invoices/:id/pay', requireBusiness, async (req, res) => {
  try {
    const invoice = await db.findInvoiceById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found.' });
    }

    if (invoice.status === 'paid') {
      return res.status(400).json({ success: false, message: 'Invoice has already been paid.' });
    }

    const txId = 'TXN-CORP-' + Date.now().toString(36).toUpperCase();
    const updated = await db.updateInvoice(invoice.invoiceId, {
      status: 'paid',
      paidAt: new Date(),
      transactionId: txId,
      paymentMethod: 'Corporate Escrow (Demo Mode)'
    });

    return res.json({
      success: true,
      message: 'Demo payment processed successfully. Funds secured in SevaSathi Cooperative Escrow.',
      invoice: updated,
      transactionId: txId
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Payment processing failed.' });
  }
});

// ==========================================
// WORKER OPPORTUNITY DISCOVERY & RESPONSE
// ==========================================

router.get('/worker/opportunities', requireWorker, async (req, res) => {
  try {
    const workerId = req.user.userId;
    const worker = await db.findUserById(workerId);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found.' });
    }

    const workerCategory = (worker.skillCategory || '').toLowerCase();
    const allRequirements = await db.findAllBusinessRequirements();

    // Filter open/matching requirements that match worker's trade
    const opportunities = allRequirements
      .filter(r => r.status === 'open' || r.status === 'matching')
      .filter(r => {
        const reqCat = (r.serviceCategory || '').toLowerCase();
        return (
          reqCat.includes(workerCategory) ||
          workerCategory.includes(reqCat) ||
          db.skillsApproxMatch(worker.skillCategory + ' ' + (worker.specificSkill || ''), reqCat + ' ' + (r.requiredSkills || ''))
        );
      })
      .map(r => ({
        requirementId: r.requirementId,
        businessName: r.businessName,
        serviceCategory: r.serviceCategory,
        location: r.location,
        city: r.city,
        startDate: r.startDate,
        endDate: r.endDate,
        schedule: r.schedule,
        ratePerWorker: r.ratePerWorker,
        rateUnit: r.rateUnit,
        workersNeeded: r.workersNeeded,
        additionalRequirements: r.additionalRequirements,
        hasAccepted: (r.allocatedWorkers || []).some(w => String(w.workerId) === String(workerId))
      }));

    return res.json({ success: true, opportunities });
  } catch (err) {
    console.error('Error fetching worker business opportunities:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve business opportunities.' });
  }
});

router.post('/worker/opportunities/:id/respond', requireWorker, async (req, res) => {
  try {
    const workerId = req.user.userId;
    const worker = await db.findUserById(workerId);
    const { action } = req.body; // 'accept' or 'decline'

    const requirement = await db.findBusinessRequirementById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found.' });
    }

    if (action === 'accept') {
      const alreadyAllocated = (requirement.allocatedWorkers || []).some(w => String(w.workerId) === String(workerId));
      if (!alreadyAllocated) {
        const updatedWorkers = [
          ...(requirement.allocatedWorkers || []),
          {
            workerId: worker._id || worker.id,
            name: worker.name,
            skill: worker.skillCategory || requirement.serviceCategory,
            phone: worker.phone,
            status: 'Active',
            assignedAt: new Date(),
            attendanceStatus: 'Checked In'
          }
        ];

        await db.updateBusinessRequirement(requirement.requirementId, {
          allocatedWorkers: updatedWorkers,
          status: updatedWorkers.length >= requirement.workersNeeded ? 'allocated' : requirement.status
        });
      }

      return res.json({
        success: true,
        message: `You have successfully accepted the commercial gig for ${requirement.businessName}!`
      });
    } else {
      return res.json({
        success: true,
        message: 'Opportunity declined. You will not be scheduled for this gig.'
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to record response.' });
  }
});

// ==========================================
// ADMIN / COOPERATIVE INTERVENTION & REBALANCING
// ==========================================

router.get('/admin/overview', requireAdmin, async (req, res) => {
  try {
    const requirements = await db.findAllBusinessRequirements();
    const contracts = await db.findAllContracts();
    const invoices = await db.findAllInvoices();

    return res.json({
      success: true,
      totalRequirements: requirements.length,
      totalContracts: contracts.length,
      totalInvoices: invoices.length,
      requirements,
      contracts,
      invoices
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve corporate overview.' });
  }
});

router.post('/admin/requirements/:id/rebalance', requireAdmin, async (req, res) => {
  try {
    const requirement = await db.findBusinessRequirementById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found.' });
    }

    const { workerIds } = req.body;
    if (!Array.isArray(workerIds)) {
      return res.status(400).json({ success: false, message: 'workerIds array is required.' });
    }

    const newAllocated = [];
    for (const wId of workerIds) {
      const worker = await db.findUserById(wId);
      if (worker) {
        newAllocated.push({
          workerId: worker._id || worker.id,
          name: worker.name,
          skill: worker.skillCategory || requirement.serviceCategory,
          phone: worker.phone,
          status: 'Active',
          assignedAt: new Date(),
          attendanceStatus: 'Checked In'
        });
      }
    }

    const updated = await db.updateBusinessRequirement(requirement.requirementId, {
      allocatedWorkers: newAllocated,
      status: newAllocated.length >= requirement.workersNeeded ? 'allocated' : 'matching'
    });

    return res.json({
      success: true,
      message: 'Cooperative admin rebalancing executed successfully.',
      requirement: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Admin rebalancing failed.' });
  }
});

module.exports = router;
