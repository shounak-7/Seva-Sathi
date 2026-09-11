// test-suite.js - Comprehensive in-memory test suite for SevaSathi Platform
const { dispatch } = require('./in-memory-runner');

function request({ method = 'GET', path = '/', headers = {}, body = null, token = null }) {
  const reqHeaders = { ...headers };
  if (token && !reqHeaders['Authorization'] && !reqHeaders['authorization']) {
    reqHeaders['Authorization'] = `Bearer ${token}`;
  }
  return dispatch({ method, url: path, headers: reqHeaders, body });
}

let passedTests = 0;
let failedTests = 0;
const failuresList = [];

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${details ? '(' + details + ')' : ''}`);
    failedTests++;
    failuresList.push({ testName, details });
  }
}

async function runAllTests() {
  console.log(`\n======================================================`);
  console.log(`🚀 Starting Comprehensive SevaSathi Platform Test Suite`);
  console.log(`======================================================\n`);

  // Wait 1.5 seconds for DB initialization / file sync if needed
  await new Promise(r => setTimeout(r, 1500));

  const uniqueSuffix = Date.now() + '_' + Math.floor(Math.random() * 1000);
  const custEmail = `test.cust.${uniqueSuffix}@example.com`;
  const custPhone = `98${Math.floor(10000000 + Math.random() * 90000000)}`;
  const workEmail = `test.worker.${uniqueSuffix}@example.com`;
  const workPhone = `97${Math.floor(10000000 + Math.random() * 90000000)}`;
  const bizEmail = `test.biz.${uniqueSuffix}@example.com`;
  const bizPhone = `96${Math.floor(10000000 + Math.random() * 90000000)}`;

  let customerToken = '';
  let customerUser = null;
  let workerToken = '';
  let workerUser = null;
  let businessToken = '';
  let businessUser = null;
  let adminToken = '';

  // --------------------------------------------------------------------------
  // SECTION 1: Health & Static Endpoints
  // --------------------------------------------------------------------------
  console.log(`\n--- [1] Health, Static Pages & Dynamic Config ---`);
  try {
    const health = await request({ method: 'GET', path: '/api/auth/status' });
    assert(health.status === 200 && health.data?.success === true, 'Health check returns HTTP 200 OK and healthy status');

    const mapsConfig = await request({ method: 'GET', path: '/maps-config.js' });
    assert(mapsConfig.status === 200 && mapsConfig.raw.includes('SEVASATHI_GOOGLE_MAPS_KEY'), 'Google Maps dynamic JS config endpoint operational');
  } catch (err) {
    assert(false, 'Section 1 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 2: Authentication, Registration & Roles
  // --------------------------------------------------------------------------
  console.log(`\n--- [2] Authentication, Roles & Password Reset ---`);
  try {
    // 2.1 Register Customer
    const custSignup = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'Test Customer',
        email: custEmail,
        phone: custPhone,
        password: 'password123',
        role: 'customer',
        city: 'Kolkata'
      }
    });
    assert(custSignup.status === 201 && custSignup.data?.token, 'Customer registration succeeds and returns JWT', JSON.stringify(custSignup.data));
    customerToken = custSignup.data?.token;
    customerUser = custSignup.data?.user;

    // 2.2 Register Worker
    const workSignup = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'Test Electrician Worker',
        email: workEmail,
        phone: workPhone,
        password: 'password123',
        role: 'worker',
        city: 'Kolkata',
        skillCategory: 'Electrician & Wiring Repairs',
        specificSkill: 'MCB switches, wiring, fuse repairs',
        experience: '5'
      }
    });
    assert(workSignup.status === 201 && workSignup.data?.user?.role === 'worker', 'Worker registration succeeds (role: worker, approval: pending)', JSON.stringify(workSignup.data));
    workerToken = workSignup.data?.token;
    workerUser = workSignup.data?.user;

    // 2.3 Register Business Enterprise
    const bizSignup = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'TechPark Facility Corp',
        businessName: 'TechPark Facility Corp',
        businessType: 'IT Park Management',
        email: bizEmail,
        phone: bizPhone,
        password: 'password123',
        role: 'business',
        address: 'Sector V, Salt Lake, Kolkata',
        city: 'Kolkata',
        gstin: '19AAACT0001M1Z5'
      }
    });
    assert(bizSignup.status === 201 && bizSignup.data?.user?.role === 'business', 'Business enterprise registration succeeds', JSON.stringify(bizSignup.data));
    businessToken = bizSignup.data?.token;
    businessUser = bizSignup.data?.user;

    // 2.4 Duplicate registration rejection
    const dupSignup = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'Duplicate User',
        email: custEmail,
        phone: '9111111111',
        password: 'password123',
        role: 'customer'
      }
    });
    assert(dupSignup.status === 409, 'Duplicate email registration correctly rejected with HTTP 409 Conflict');

    // 2.5 Sign in Customer
    const custSignin = await request({
      method: 'POST',
      path: '/api/auth/signin',
      body: {
        identifier: custEmail,
        password: 'password123',
        expectedRole: 'customer'
      }
    });
    assert(custSignin.status === 200 && custSignin.data?.token, 'Customer signin succeeds with valid credentials');

    // 2.6 Role Enforcement: Worker trying to log in expecting customer role
    const roleMismatchSignin = await request({
      method: 'POST',
      path: '/api/auth/signin',
      body: {
        identifier: workEmail,
        password: 'password123',
        expectedRole: 'customer'
      }
    });
    assert(roleMismatchSignin.status === 403 && roleMismatchSignin.data?.roleMismatch === true, 'Role enforcement prevents worker signing in on customer portal');

    // 2.7 Invalid password rejection
    const badPass = await request({
      method: 'POST',
      path: '/api/auth/signin',
      body: {
        identifier: custEmail,
        password: 'wrongpassword'
      }
    });
    assert(badPass.status === 401, 'Invalid password rejected with HTTP 401 Unauthorized');

    // 2.8 Forgot Password & OTP Flow
    const forgotRes = await request({
      method: 'POST',
      path: '/api/auth/forgot-password',
      body: { identifier: custEmail }
    });
    assert(forgotRes.status === 200 && forgotRes.data?.otp, 'Forgot password generates valid 6-digit OTP');

    const otpCode = forgotRes.data?.otp;
    const verifyOtpRes = await request({
      method: 'POST',
      path: '/api/auth/verify-otp',
      body: {
        identifier: custEmail,
        otp: otpCode,
        newPassword: 'newpassword123'
      }
    });
    assert(verifyOtpRes.status === 200, 'Verify OTP resets password successfully');

    // Test signin with new password
    const newPassSignin = await request({
      method: 'POST',
      path: '/api/auth/signin',
      body: {
        identifier: custEmail,
        password: 'newpassword123'
      }
    });
    assert(newPassSignin.status === 200, 'Customer signs in with newly reset password');

    // 2.9 Profile retrieval and update
    const meRes = await request({
      method: 'GET',
      path: '/api/auth/me',
      headers: { 'Authorization': `Bearer ${customerToken}` }
    });
    assert(meRes.status === 200 && meRes.data?.user?.email === custEmail, 'Protected GET /api/auth/me returns current user profile');

    const updateProfile = await request({
      method: 'PATCH',
      path: '/api/auth/profile',
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: {
        location: 'Salt Lake Sector V, Kolkata',
        city: 'Kolkata',
        preferredLanguage: 'bn'
      }
    });
    assert(updateProfile.status === 200 && updateProfile.data?.user?.preferredLanguage === 'bn', 'Profile update PATCH /api/auth/profile updates location and language');

    // 2.10 Admin login
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@hustle.local';
    const adminPass = process.env.ADMIN_PASSWORD || 'password123';
    const adminLoginRes = await request({
      method: 'POST',
      path: '/api/auth/admin/login',
      body: {
        email: adminEmail,
        password: adminPass
      }
    });
    assert(adminLoginRes.status === 200 && adminLoginRes.data?.token, 'Admin login succeeds with configured staff credentials', JSON.stringify(adminLoginRes.data));
    adminToken = adminLoginRes.data?.token;

    // 2.11 Admin approves worker
    const approveWorkerRes = await request({
      method: 'POST',
      path: `/api/auth/admin/workers/${workerUser._id || workerUser.id}/status`,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { status: 'approved' }
    });
    assert(approveWorkerRes.status === 200 && approveWorkerRes.data?.worker?.approvalStatus === 'approved', 'Admin successfully approves worker partner');

  } catch (err) {
    assert(false, 'Section 2 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 3: Catalog, Worker Search & Pricing Intelligence
  // --------------------------------------------------------------------------
  console.log(`\n--- [3] Catalog, Worker Search & Pricing ---`);
  try {
    const allWorkersRes = await request({ method: 'GET', path: '/api/auth/workers' });
    assert(allWorkersRes.status === 200 && Array.isArray(allWorkersRes.data?.workers), 'GET /api/auth/workers lists approved workers');

    const searchElectrician = await request({
      method: 'GET',
      path: '/api/auth/services/workers?serviceId=electrician&city=Kolkata'
    });
    assert(searchElectrician.status === 200 && searchElectrician.data?.workers?.length > 0, 'GET /api/auth/services/workers matches electricians in Kolkata');

    const pricingOverview = await request({
      method: 'GET',
      path: '/api/auth/services/pricing-overview?city=Kolkata'
    });
    assert(pricingOverview.status === 200 && typeof pricingOverview.data?.pricing === 'object', 'GET /api/auth/services/pricing-overview returns price points');
  } catch (err) {
    assert(false, 'Section 3 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 4: Booking Lifecycle, Negotiations & Payments
  // --------------------------------------------------------------------------
  console.log(`\n--- [4] Bookings, Negotiations, Payments & Reviews ---`);
  let createdBookingId = '';
  try {
    // 4.1 Create Booking appointed to approved worker
    const createBookingRes = await request({
      method: 'POST',
      path: '/api/auth/bookings',
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: {
        serviceId: 'electrician',
        serviceName: 'Electrician & Wiring Repairs',
        category: 'Electrical & Wiring',
        city: 'Kolkata',
        locality: 'Salt Lake',
        workerId: workerUser._id || workerUser.id,
        workerName: workerUser.name,
        scheduledDate: '2026-09-15',
        scheduledTime: '10:00 AM – 01:00 PM',
        notes: 'Main MCB switch tripping repeatedly when AC turns on',
        price: 499
      }
    });
    assert(createBookingRes.status === 201 && createBookingRes.data?.booking?._id, 'Direct appointment created with status pending');
    createdBookingId = createBookingRes.data?.booking?._id || createBookingRes.data?.booking?.id;

    // 4.2 Customer sees booking in their dashboard
    const customerBookings = await request({
      method: 'GET',
      path: '/api/auth/bookings/customer',
      headers: { 'Authorization': `Bearer ${customerToken}` }
    });
    assert(customerBookings.status === 200 && customerBookings.data?.bookings?.some(b => String(b._id || b.id) === String(createdBookingId)), 'Customer dashboard lists the created appointment');

    // 4.3 Worker sees booking in incoming requests
    const workerBookings = await request({
      method: 'GET',
      path: '/api/auth/bookings/worker',
      headers: { 'Authorization': `Bearer ${workerToken}` }
    });
    assert(workerBookings.status === 200 && workerBookings.data?.bookings?.some(b => String(b._id || b.id) === String(createdBookingId)), 'Worker dashboard receives the incoming appointment');

    // 4.4 Worker proposes counter-bargain (e.g. ₹599 due to complex troubleshooting)
    const workerBargain = await request({
      method: 'POST',
      path: `/api/auth/bookings/${createdBookingId}/respond`,
      headers: { 'Authorization': `Bearer ${workerToken}` },
      body: {
        action: 'bargain',
        proposedPrice: 599,
        proposedTime: '11:00 AM – 02:00 PM',
        note: 'Requires replacement of MCB switch and load check'
      }
    });
    assert(workerBargain.status === 200 && workerBargain.data?.booking?.status === 'bargaining', 'Worker counter-offer changes status to bargaining');

    // 4.5 Worker cannot bargain a second time (max 1 negotiation limit)
    const workerBargain2 = await request({
      method: 'POST',
      path: `/api/auth/bookings/${createdBookingId}/respond`,
      headers: { 'Authorization': `Bearer ${workerToken}` },
      body: { action: 'bargain', proposedPrice: 650 }
    });
    assert(workerBargain2.status === 400, 'Negotiation limit enforced: Worker cannot send second consecutive counter-offer');

    // 4.6 Customer accepts worker counter-offer
    const custAccept = await request({
      method: 'POST',
      path: `/api/auth/bookings/${createdBookingId}/customer-respond`,
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: { action: 'accept', note: 'Agreed with adjusted price' }
    });
    assert(custAccept.status === 200 && custAccept.data?.booking?.status === 'accepted', 'Customer accepts counter-terms, setting status to accepted');

    // 4.7 Customer makes payment into escrow
    const payRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${createdBookingId}/pay`,
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: { paymentMethod: 'UPI / Google Pay' }
    });
    assert(payRes.status === 200 && payRes.data?.booking?.paymentStatus === 'paid', 'Customer payment locks funds in escrow (paymentStatus: paid)');

    // 4.8 Worker completes the task
    const completeRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${createdBookingId}/respond`,
      headers: { 'Authorization': `Bearer ${workerToken}` },
      body: { action: 'complete', note: 'MCB replaced and tested under full load' }
    });
    assert(completeRes.status === 200 && completeRes.data?.booking?.status === 'completed', 'Worker completes task, releasing escrow funds to earnings');

    // 4.9 Customer submits 5-star review
    const reviewRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${createdBookingId}/review`,
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: {
        rating: 5,
        reviewText: 'Excellent electrician! Diagnosed and replaced the tripping MCB promptly.'
      }
    });
    assert(reviewRes.status === 200 && reviewRes.data?.booking?.rating === 5, 'Customer review submitted and stored on booking and worker profile');

    // 4.10 Check Worker Dashboard metrics update
    const workerDashData = await request({
      method: 'GET',
      path: '/api/auth/worker/dashboard-data',
      headers: { 'Authorization': `Bearer ${workerToken}` }
    });
    assert(workerDashData.status === 200 && workerDashData.data?.metrics?.completedJobs >= 1, 'Worker dashboard metrics reflect completed job and earnings');

  } catch (err) {
    assert(false, 'Section 4 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 5: Disputes, Escrow Verdicts & 3-Warning Ban Rule
  // --------------------------------------------------------------------------
  console.log(`\n--- [5] Dispute Management & 3-Warning Ban Enforcement ---`);
  try {
    // 5.1 Create a new booking for dispute testing
    const disputeBooking = await request({
      method: 'POST',
      path: '/api/auth/bookings',
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: {
        serviceId: 'plumbing',
        serviceName: 'Plumbing solutions',
        category: 'Home Repair',
        city: 'Kolkata',
        locality: 'Salt Lake',
        workerId: workerUser._id || workerUser.id,
        workerName: workerUser.name,
        scheduledDate: '2026-09-16',
        scheduledTime: '02:00 PM',
        price: 349
      }
    });
    const dBookingId = disputeBooking.data?.booking?._id || disputeBooking.data?.booking?.id;

    // Customer accepts and pays
    await request({
      method: 'POST',
      path: `/api/auth/bookings/${dBookingId}/customer-respond`,
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: { action: 'accept' }
    });
    await request({
      method: 'POST',
      path: `/api/auth/bookings/${dBookingId}/pay`,
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: { paymentMethod: 'Card' }
    });

    // 5.2 Customer files dispute ticket
    const fileTicket = await request({
      method: 'POST',
      path: '/api/auth/tickets',
      headers: { 'Authorization': `Bearer ${customerToken}` },
      body: {
        bookingId: dBookingId,
        category: 'Service Quality Issue',
        subject: 'Pipe still leaking after visit',
        description: 'The technician did not replace the seal properly and pipe started dripping again.',
        desiredResolution: 'Refund or re-service'
      }
    });
    assert(fileTicket.status === 201 && fileTicket.data?.ticket?.ticketId, 'Customer raises official dispute ticket');
    const ticketId = fileTicket.data?.ticket?.ticketId;

    // 5.3 Dispute Privacy Check: Worker should not see unsettled ticket filed against them in /tickets/my
    const workerTicketsMy = await request({
      method: 'GET',
      path: '/api/auth/tickets/my',
      headers: { 'Authorization': `Bearer ${workerToken}` }
    });
    const canWorkerSeeUnsettled = workerTicketsMy.data?.tickets?.some(t => t.ticketId === ticketId);
    assert(!canWorkerSeeUnsettled, 'Dispute Privacy: Unsettled ticket against worker remains hidden until admin verdict');

    // 5.4 Admin fetches all tickets
    const adminTickets = await request({
      method: 'GET',
      path: '/api/auth/admin/tickets',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(adminTickets.status === 200 && adminTickets.data?.tickets?.some(t => t.ticketId === ticketId), 'Admin console lists open dispute ticket');

    // 5.5 Admin settles dispute in favor of worker (e.g. invalid complaint)
    const settleWorkerFavour = await request({
      method: 'POST',
      path: `/api/auth/admin/tickets/${ticketId}/settle`,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        status: 'resolved',
        resolutionAction: 'favour_worker',
        adminNotes: 'Inspection photos confirmed job was completed per specifications. Customer complaint unfounded.'
      }
    });
    assert(settleWorkerFavour.status === 200 && settleWorkerFavour.data?.penalties?.customerWarned, 'Admin settles in favor of worker: Escrow released, customer issued official warning');

    // 5.6 Test 3-Warning Auto-Ban Threshold
    console.log('    Testing 4-warning permanent ban trigger...');
    await request({
      method: 'POST',
      path: `/api/auth/admin/tickets/${ticketId}/settle`,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { status: 'resolved', resolutionAction: 'favour_worker', adminNotes: 'Warning 2' }
    });
    await request({
      method: 'POST',
      path: `/api/auth/admin/tickets/${ticketId}/settle`,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { status: 'resolved', resolutionAction: 'favour_worker', adminNotes: 'Warning 3' }
    });
    const banTriggerRes = await request({
      method: 'POST',
      path: `/api/auth/admin/tickets/${ticketId}/settle`,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { status: 'resolved', resolutionAction: 'favour_worker', adminNotes: 'Warning 4 - Exceeded allowable limit' }
    });
    assert(banTriggerRes.data?.penalties?.customerWarned?.isBanned === true, '4th warning triggers automatic permanent account ban');

    // 5.7 Verify banned user is blocked from logging in
    const bannedLogin = await request({
      method: 'POST',
      path: '/api/auth/signin',
      body: {
        identifier: custEmail,
        password: 'newpassword123'
      }
    });
    assert(bannedLogin.status === 403 && bannedLogin.data?.isBanned === true, 'Banned user is denied login with HTTP 403 Forbidden');

  } catch (err) {
    assert(false, 'Section 5 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 6: Business Enterprise, Workforce & Contracts
  // --------------------------------------------------------------------------
  console.log(`\n--- [6] Enterprise Workforce Management, Contracts & Invoices ---`);
  let createdReqId = '';
  let createdContractId = '';
  let createdInvoiceId = '';
  try {
    // 6.1 Post Enterprise Workforce Requirement
    const postReq = await request({
      method: 'POST',
      path: '/api/business/requirements',
      headers: { 'Authorization': `Bearer ${businessToken}` },
      body: {
        serviceCategory: 'Deep Cleaning & Sanitization',
        workersNeeded: 3,
        requiredSkills: 'Industrial floor scrubbers, sanitization, housekeeping',
        location: 'Salt Lake Sector V Tech Park',
        city: 'Kolkata',
        startDate: '2026-09-20',
        endDate: '2026-09-25',
        schedule: '08:00 AM – 05:00 PM',
        ratePerWorker: 850,
        additionalRequirements: 'Full PPE kits and uniform required'
      }
    });
    assert(postReq.status === 201 && postReq.data?.requirement?.requirementId, 'Enterprise posts multi-worker requisition');
    createdReqId = postReq.data?.requirement?.requirementId;

    // 6.2 Match Candidates with 5-factor weighted algorithm
    const matchRes = await request({
      method: 'GET',
      path: `/api/business/requirements/${createdReqId}/matches`,
      headers: { 'Authorization': `Bearer ${businessToken}` }
    });
    assert(matchRes.status === 200 && Array.isArray(matchRes.data?.matches), 'Algorithmic matching scores and ranks available cooperative workers');

    // 6.3 Allocate Workers and Generate Contract + Escrow Invoice
    const allocRes = await request({
      method: 'POST',
      path: `/api/business/requirements/${createdReqId}/allocate`,
      headers: { 'Authorization': `Bearer ${businessToken}` },
      body: {} // Auto-allocates top matches
    });
    assert(allocRes.status === 200 && allocRes.data?.contract?.contractId && allocRes.data?.invoice?.invoiceId, 'Allocation activates commercial contract and generates invoice');
    createdContractId = allocRes.data?.contract?.contractId;
    createdInvoiceId = allocRes.data?.invoice?.invoiceId;

    // 6.4 Department Workforce Roster
    const workforceRoster = await request({
      method: 'GET',
      path: '/api/business/workforce',
      headers: { 'Authorization': `Bearer ${businessToken}` }
    });
    assert(workforceRoster.status === 200 && typeof workforceRoster.data?.teams === 'object', 'Workforce roster groups deployed staff by department');

    // 6.5 Pay Corporate Invoice via Escrow
    const payBizInv = await request({
      method: 'POST',
      path: `/api/business/invoices/${createdInvoiceId}/pay`,
      headers: { 'Authorization': `Bearer ${businessToken}` }
    });
    assert(payBizInv.status === 200 && payBizInv.data?.invoice?.status === 'paid', 'Corporate invoice payment locks funds in escrow');

    // 6.6 Admin Corporate Overview & Rebalance
    const adminBizOverview = await request({
      method: 'GET',
      path: '/api/business/admin/overview',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(adminBizOverview.status === 200 && adminBizOverview.data?.requirements?.length > 0, 'Admin overview monitors all enterprise requisitions and contracts');

  } catch (err) {
    assert(false, 'Section 6 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // SECTION 7: AI Intelligence & Multilingual Voice Assistant
  // --------------------------------------------------------------------------
  console.log(`\n--- [7] AI Services & Multilingual Voice Assistant ---`);
  try {
    // 7.1 AI Diagnosis
    const diagRes = await request({
      method: 'POST',
      path: '/api/ai/diagnose',
      body: {
        userInput: 'Water leaking under bathroom sink and tap is broken',
        city: 'Kolkata'
      }
    });
    assert(diagRes.status === 200 && diagRes.data?.category === 'Plumbing & Repairs', 'POST /api/ai/diagnose classifies problem and calculates price range');

    // 7.2 18 Services Matcher
    const match18 = await request({
      method: 'POST',
      path: '/api/ai/match-18',
      body: { query: 'need split ac filter cleaning and gas check' }
    });
    assert(match18.status === 200 && match18.data?.service?.id === 'appliances', 'POST /api/ai/match-18 matches query to catalog service');

    // 7.3 Autocomplete Suggestions
    const suggRes = await request({
      method: 'POST',
      path: '/api/ai/suggestions',
      body: { query: 'carpent', city: 'Kolkata' }
    });
    assert(suggRes.status === 200 && Array.isArray(suggRes.data?.suggestions) && suggRes.data?.suggestions.length > 0, 'POST /api/ai/suggestions returns autocomplete suggestions');

    // 7.4 Enhance Task Scope
    const enhanceRes = await request({
      method: 'POST',
      path: '/api/ai/enhance-scope',
      body: {
        notes: 'fix door lock and table leg wobbling',
        serviceCategory: 'Carpentry & Woodwork'
      }
    });
    assert(enhanceRes.status === 200 && enhanceRes.data?.enhanced?.length > 20, 'POST /api/ai/enhance-scope polishes raw instructions');

    // 7.5 Price Advisor
    const priceAdv = await request({
      method: 'POST',
      path: '/api/ai/price-advisor',
      body: {
        serviceCategory: 'Plumbing & Repairs',
        proposedPrice: 450,
        city: 'Kolkata'
      }
    });
    assert(priceAdv.status === 200 && priceAdv.data?.status === 'fair', 'POST /api/ai/price-advisor evaluates quote against benchmark');

    // 7.6 Multilingual Smart Assistant: English Flow
    const assistantEn = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I need an electrician tomorrow at 10 AM in Kolkata budget 500'
      }
    });
    assert(assistantEn.status === 200 && assistantEn.data?.success === true, 'Smart Assistant handles full English request');

    // 7.7 Multilingual Smart Assistant: Hindi Flow
    const assistantHi = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'मुझे कल सुबह 10 बजे कोलकाता में बिजली मिस्त्री चाहिए 500 रुपये में'
      }
    });
    assert(assistantHi.status === 200 && assistantHi.data?.detectedLanguage === 'hi', 'Smart Assistant recognizes Hindi and returns localized response');

    // 7.8 Multilingual Smart Assistant: Bengali Flow
    const assistantBn = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'কালকে সকাল ১০টায় কলকাতায় ইলেকট্রিশিয়ান দরকার বাজেট ৫০০ টাকা'
      }
    });
    assert(assistantBn.status === 200 && assistantBn.data?.detectedLanguage === 'bn', 'Smart Assistant recognizes Bengali and returns localized response');

    // 7.9 AI Assistant Gig Worker Direct Appointment with Payment Method
    const aiBookRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      token: customerToken,
      body: {
        query: 'Yes, confirm and book appointment',
        confirmed: true,
        paymentMethod: 'UPI (PhonePe / GPay)',
        structuredState: {
          service: 'Electrician',
          serviceId: 'electrician',
          location: 'Kolkata',
          date: '2026-10-15',
          time: '10:00 AM – 01:00 PM',
          rate: 550,
          readyToConfirm: true,
          selectedWorker: {
            id: workerUser ? (workerUser.id || workerUser._id) : 'pro_kol_elec_1',
            name: workerUser ? workerUser.name : 'Virender Electrician',
            city: 'Kolkata',
            skillCategory: 'Electrician & Wiring Repairs',
            hourlyRate: 550
          }
        }
      }
    });
    assert(
      aiBookRes.status === 200 &&
      aiBookRes.data?.action === 'direct_booking_confirmed' &&
      aiBookRes.data?.booking?.status === 'pending' &&
      aiBookRes.data?.booking?.paymentMethod === 'UPI (PhonePe / GPay)' &&
      aiBookRes.data?.booking?.paymentStatus === 'unpaid',
      'AI Assistant creates gig worker appointment with status pending and selected payment method'
    );

    // 7.10 AI Assistant Booking with Instant Escrow Pre-funding
    const aiEscrowBookRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      token: customerToken,
      body: {
        query: 'Yes, confirm and fund escrow now',
        confirmed: true,
        payNow: true,
        isEscrowFunded: true,
        paymentMethod: 'Card',
        structuredState: {
          service: 'Electrician',
          serviceId: 'electrician',
          location: 'Kolkata',
          date: '2026-10-16',
          time: '02:00 PM – 05:00 PM',
          rate: 650,
          readyToConfirm: true,
          selectedWorker: {
            id: workerUser ? (workerUser.id || workerUser._id) : 'pro_kol_elec_1',
            name: workerUser ? workerUser.name : 'Virender Electrician',
            city: 'Kolkata',
            skillCategory: 'Electrician & Wiring Repairs',
            hourlyRate: 650
          }
        }
      }
    });
    assert(
      aiEscrowBookRes.status === 200 &&
      aiEscrowBookRes.data?.action === 'direct_booking_confirmed' &&
      aiEscrowBookRes.data?.booking?.status === 'pending' &&
      aiEscrowBookRes.data?.booking?.paymentStatus === 'paid' &&
      aiEscrowBookRes.data?.booking?.escrowStatus === 'held' &&
      aiEscrowBookRes.data?.booking?.paymentMethod === 'Card',
      'AI Assistant creates gig worker appointment with instant Escrow funding and status'
    );

    // 7.11 Trade Isolation: Searching for plumber returns only plumbing specialists
    const plumberSearchRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I need a plumber in Kolkata for pipe leakage'
      }
    });
    const plumberWorkers = plumberSearchRes.data?.workers || [];
    const allPlumbers = plumberWorkers.length > 0 && plumberWorkers.every(w => {
      const cat = (w.skillCategory || '').toLowerCase();
      return cat.includes('plumb');
    });
    assert(
      plumberSearchRes.status === 200 &&
      plumberSearchRes.data?.action === 'workers_found' &&
      allPlumbers === true,
      'Smart Assistant returns strictly verified plumbing specialists without cross-category leakage'
    );

    // 7.12 Trade Switch Invalidation: Switching from Electrician to Deep Home Cleaning resets worker selection
    const switchServiceRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Actually I need deep home cleaning in Kolkata instead',
        structuredState: {
          service: 'Electrician',
          serviceId: 'electrician',
          location: 'Kolkata',
          date: '2026-10-15',
          time: '10:00 AM – 01:00 PM',
          rate: 550,
          readyToConfirm: true,
          selectedWorker: {
            id: 'pro_ccu_elec_1',
            name: 'Subhashis Banerjee',
            city: 'Kolkata',
            skillCategory: 'Electrician & Wiring Repairs'
          }
        }
      }
    });
    const cleaningWorkers = switchServiceRes.data?.workers || [];
    const allCleaners = cleaningWorkers.length > 0 && cleaningWorkers.every(w => {
      const cat = (w.skillCategory || '').toLowerCase();
      return cat.includes('clean');
    });
    assert(
      switchServiceRes.status === 200 &&
      switchServiceRes.data?.action === 'workers_found' &&
      !switchServiceRes.data?.state?.selectedWorker &&
      switchServiceRes.data?.state?.readyToConfirm === false &&
      allCleaners === true,
      'Service trade switch invalidates previous worker selection and suggests specialists in new trade'
    );

    // 7.13 False Positive Prevention: "1 cleaner in Bengaluru at 1 PM" does not falsely auto-select worker #1
    const falsePositiveRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I need 1 cleaner in Bengaluru at 1 PM'
      }
    });
    assert(
      falsePositiveRes.status === 200 &&
      falsePositiveRes.data?.action === 'workers_found' &&
      !falsePositiveRes.data?.state?.selectedWorker,
      'Digits in counts or times (1 cleaner, 1 PM) do not falsely trigger instant worker selection'
    );

    // 7.14 Explicit Numbered Selection: "Option 1" correctly selects worker #1
    const explicitSelectRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Option 1',
        structuredState: {
          service: 'Deep Home & Kitchen Cleaning',
          serviceId: 'home-cleaning',
          location: 'Kolkata',
          availableWorkerNames: ['Priya Sen']
        }
      }
    });
    assert(
      explicitSelectRes.status === 200 &&
      explicitSelectRes.data?.selectedWorker?.name === 'Priya Sen',
      'Explicit choice (Option 1) accurately selects candidate worker'
    );

    // 7.15 Multilingual Query in Hindi: Returns Hindi response and Hindi quick chips
    const hindiRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'मुझे कोलकाता में कल सुबह इलेक्ट्रीशियन चाहिए'
      }
    });
    assert(
      hindiRes.status === 200 &&
      hindiRes.data?.detectedLanguage === 'hi' &&
      hindiRes.data?.state?.serviceId === 'electrician' &&
      hindiRes.data?.state?.location === 'Kolkata' &&
      hindiRes.data?.state?.date != null &&
      hindiRes.data?.state?.time != null,
      'Hindi voice/text query correctly extracts service, location, date, and morning time in Hindi'
    );

    // 7.16 Multilingual Query in Bengali with "পরশু" (Day after tomorrow priority)
    const bengaliDatRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'আমার পরশু কলকাতায় একজন প্লাম্বার লাগবে'
      }
    });
    const expectedDat = new Date();
    expectedDat.setDate(expectedDat.getDate() + 2);
    const expectedDatStr = expectedDat.toISOString().split('T')[0];
    assert(
      bengaliDatRes.status === 200 &&
      bengaliDatRes.data?.detectedLanguage === 'bn' &&
      bengaliDatRes.data?.state?.serviceId === 'plumbing' &&
      bengaliDatRes.data?.state?.location === 'Kolkata' &&
      bengaliDatRes.data?.state?.date === expectedDatStr,
      'Bengali query with "পরশু" accurately extracts date as Day After Tomorrow with strict priority'
    );

    // 7.17 Progressive Flow: Answering date/time for 1 available worker advances without looping workers_found
    const singleWorkerFlowRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Tomorrow at 10 AM',
        structuredState: {
          service: 'Deep Home Cleaning',
          serviceId: 'home-cleaning',
          location: 'Kolkata'
        }
      }
    });
    assert(
      singleWorkerFlowRes.status === 200 &&
      singleWorkerFlowRes.data?.selectedWorker != null &&
      (singleWorkerFlowRes.data?.action === 'worker_ready_to_confirm' || singleWorkerFlowRes.data?.action === 'worker_gathering'),
      'Customer date/time progression auto-associates single specialist and advances towards confirmation without looping'
    );

    // 7.18 In-Chat Dynamic Modification: Changing Time resets time field and prompts for new time
    const modifyTimeRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: '✏️ সময় পরিবর্তন',
        structuredState: {
          service: 'Electrician',
          serviceId: 'electrician',
          location: 'Kolkata',
          date: '2026-10-15',
          time: '09:00 AM – 12:00 PM (Morning)',
          rate: 499,
          readyToConfirm: true,
          selectedWorker: {
            name: 'Subhashis Banerjee',
            city: 'Kolkata',
            skillCategory: 'Electrician & Wiring Repairs'
          }
        }
      }
    });
    assert(
      modifyTimeRes.status === 200 &&
      modifyTimeRes.data?.action === 'worker_gathering' &&
      modifyTimeRes.data?.missingFields?.includes('time') &&
      modifyTimeRes.data?.state?.time === null,
      'In-chat modification "সময় পরিবর্তন" seamlessly resets time slot for customer update'
    );

    // 7.19 Adjust Price & Terms on Existing Booking
    const freshCustRes = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'Fresh Active Customer',
        email: `fresh.cust.${uniqueSuffix}@example.com`,
        phone: `99${Math.floor(10000000 + Math.random() * 90000000)}`,
        password: 'password123',
        role: 'customer',
        city: 'Kolkata'
      }
    });
    const freshCustToken = freshCustRes.data?.token;

    const newPendingBooking = await request({
      method: 'POST',
      path: '/api/auth/bookings',
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        serviceId: 'plumbing',
        serviceName: 'Plumbing Solutions',
        category: 'Plumbing',
        city: 'Kolkata',
        locality: 'Salt Lake',
        scheduledDate: '2026-10-20',
        scheduledTime: '11:00 AM',
        price: 350,
        notes: 'Initial booking offer'
      }
    });
    const pendingBookingId = newPendingBooking.data?.booking?._id || newPendingBooking.data?.booking?.id;
    assert(
      (newPendingBooking.status === 201 || newPendingBooking.status === 200) && pendingBookingId,
      'Customer creates a pending booking for price adjustment test',
      `Status: ${newPendingBooking.status}, Data: ${JSON.stringify(newPendingBooking.data)}`
    );

    const updatePriceRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${pendingBookingId}/customer-respond`,
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        action: 'update-price',
        proposedPrice: 500,
        proposedTime: '03:00 PM',
        note: 'Customer adjusted budget to ₹500 for urgent work'
      }
    });
    assert(
      updatePriceRes.status === 200 &&
      updatePriceRes.data?.booking?.price === 500 &&
      updatePriceRes.data?.booking?.scheduledTime === '03:00 PM',
      'Customer successfully updates price and terms on active booking via customer-respond update-price',
      `Status: ${updatePriceRes.status}, Data: ${JSON.stringify(updatePriceRes.data)}`
    );

    // 7.20 Multilingual Case Detection: Colloquial Bengali symptom extraction
    const bnSymptomRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'আমার ঘরের সিলিং ফ্যান ঘুরছে না আর সুইচে স্পার্ক হচ্ছে',
        location: 'Kolkata'
      }
    });
    assert(
      bnSymptomRes.status === 200 &&
      bnSymptomRes.data?.state?.serviceId === 'electrician',
      'Colloquial Bengali symptom description ("সিলিং ফ্যান ঘুরছে না") accurately maps to Electrician service'
    );

    // 7.21 Multilingual Case Detection: Colloquial Hindi symptom extraction
    const hiSymptomRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'बाथरूम का नल बहुत तेज टपक रहा है और पाइप से पानी गिर रहा है',
        location: 'Delhi'
      }
    });
    assert(
      hiSymptomRes.status === 200 &&
      hiSymptomRes.data?.state?.serviceId === 'plumbing',
      'Colloquial Hindi symptom description ("नल टपक रहा है") accurately maps to Plumbing service'
    );

    // 7.22 Custom Booking Time: Indic Bengali numerals and morning phrase
    const indicTimeRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'কাল সকাল ১০:৩০ টায়',
        structuredState: {
          service: 'Electrician',
          serviceId: 'electrician',
          location: 'Kolkata'
        }
      }
    });
    assert(
      indicTimeRes.status === 200 &&
      indicTimeRes.data?.state?.time === '10:30 AM',
      'Custom booking time with Indic Bengali numerals ("সকাল ১০:৩০") extracts cleanly as "10:30 AM"',
      `Extracted time: ${indicTimeRes.data?.state?.time}`
    );

    // 7.23 Custom Booking Time: Custom time range
    const timeRangeRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Tomorrow 2 PM to 5 PM',
        structuredState: {
          service: 'Plumber',
          serviceId: 'plumbing',
          location: 'Kolkata'
        }
      }
    });
    assert(
      timeRangeRes.status === 200 &&
      timeRangeRes.data?.state?.time === '02:00 PM – 05:00 PM',
      'Custom booking time range ("2 PM to 5 PM") extracts cleanly as "02:00 PM – 05:00 PM"',
      `Extracted time: ${timeRangeRes.data?.state?.time}`
    );

    // 7.24 Dynamic Benchmark Rate Advising with Multilingual & Localized Trade Name
    const adviseRateRes = await request({
      method: 'POST',
      path: '/api/ai/price-advisor',
      body: {
        category: 'প্লাম্বার সার্ভিস',
        experience: '5',
        locality: 'Kolkata'
      }
    });
    assert(
      adviseRateRes.status === 200 &&
      adviseRateRes.data?.benchmark?.min === 299 &&
      adviseRateRes.data?.benchmark?.avg === 499,
      'Price benchmark advisor fuzzy-resolves localized category ("প্লাম্বার সার্ভিস") to correct benchmark (min: ₹299, avg: ₹499)',
      `Status: ${adviseRateRes.status}, Data: ${JSON.stringify(adviseRateRes.data)}`
    );

    // 7.25 AI Direct Booking: Negotiations array initialization
    const directAiBookingRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        query: 'Yes, please confirm appointment now',
        confirmed: true,
        paymentMethod: 'UPI (PhonePe / GPay)',
        structuredState: {
          service: 'Electrician',
          serviceId: 'electrician',
          location: 'Kolkata',
          date: '2026-11-01',
          time: '10:00 AM',
          rate: 550,
          readyToConfirm: true,
          selectedWorker: {
            name: 'Subhashis Banerjee',
            city: 'Kolkata',
            skillCategory: 'Electrician & Wiring Repairs'
          }
        }
      }
    });
    const confirmedBooking = directAiBookingRes.data?.booking;
    assert(
      directAiBookingRes.status === 200 &&
      confirmedBooking &&
      Array.isArray(confirmedBooking.negotiations) &&
      confirmedBooking.negotiations.length > 0 &&
      confirmedBooking.negotiations[0].senderRole === 'customer',
      'AI Assistant Direct Booking initializes negotiations history array with customer terms',
      `Status: ${directAiBookingRes.status}, Booking: ${JSON.stringify(confirmedBooking)}`
    );

    // 7.26 Multi-Trade Support: Carpentry worker lookup in Bengaluru
    const carpBlrRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I need a carpenter to fix wardrobe door hinges in Bengaluru',
        location: 'Bengaluru'
      }
    });
    assert(
      carpBlrRes.status === 200 &&
      carpBlrRes.data?.state?.serviceId === 'carpentry' &&
      carpBlrRes.data?.workers?.length > 0 &&
      carpBlrRes.data?.workers[0]?.name === 'Venkatesh Murthy',
      'Carpentry request in Bengaluru accurately maps to carpentry service and suggests verified specialist Venkatesh Murthy',
      `Service: ${carpBlrRes.data?.state?.serviceId}, Workers: ${carpBlrRes.data?.workers?.map(w => w.name)}`
    );

    // 7.27 Multi-Trade Support: Spa & Massage in Mumbai
    const spaBomRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'मुझे घर पर मसाज और फेशियल के लिए थेरेपिस्ट चाहिए',
        location: 'Mumbai'
      }
    });
    assert(
      spaBomRes.status === 200 &&
      spaBomRes.data?.state?.serviceId === 'spa-therapy' &&
      spaBomRes.data?.workers?.length > 0 &&
      spaBomRes.data?.workers[0]?.name === 'Rohini Deshmukh',
      'Hindi Spa & Massage request in Mumbai accurately maps to spa-therapy and suggests verified therapist Rohini Deshmukh',
      `Service: ${spaBomRes.data?.state?.serviceId}, Workers: ${spaBomRes.data?.workers?.map(w => w.name)}`
    );

    // 7.28 Multi-Trade Support: Handyman in Kolkata (Bengali drilling query)
    const handyCcuRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'দেওয়ালে ড্রিল করে ছবি ও পর্দার রড টাঙাতে হবে',
        location: 'Kolkata'
      }
    });
    assert(
      handyCcuRes.status === 200 &&
      handyCcuRes.data?.state?.serviceId === 'handyman' &&
      handyCcuRes.data?.workers?.length > 0 &&
      handyCcuRes.data?.workers[0]?.name === 'Bapi Samanta',
      'Bengali Handyman drilling request in Kolkata accurately maps to handyman service and suggests specialist Bapi Samanta',
      `Service: ${handyCcuRes.data?.state?.serviceId}, Workers: ${handyCcuRes.data?.workers?.map(w => w.name)}`
    );

    // 7.29 Multi-Trade Support: Tutoring in Delhi
    const tutorDelRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Need a math and physics tutor for Class 10 CBSE in Delhi',
        location: 'Delhi'
      }
    });
    assert(
      tutorDelRes.status === 200 &&
      tutorDelRes.data?.state?.serviceId === 'tutoring' &&
      tutorDelRes.data?.workers?.length > 0 &&
      tutorDelRes.data?.workers[0]?.name === 'Dr. Nidhi Bansal',
      'Tutoring request in Delhi accurately maps to tutoring service and suggests top-rated tutor Dr. Nidhi Bansal',
      `Service: ${tutorDelRes.data?.state?.serviceId}, Workers: ${tutorDelRes.data?.workers?.map(w => w.name)}`
    );

    // 7.30 Multi-Trade Support: Yoga & Fitness Coaching in Pune
    const fitPnqRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I want a personal yoga trainer in Pune',
        location: 'Pune'
      }
    });
    const fitWorkerName = fitPnqRes.data?.workers?.[0]?.name || fitPnqRes.data?.state?.selectedWorker?.name;
    assert(
      fitPnqRes.status === 200 &&
      fitPnqRes.data?.state?.serviceId === 'fitness' &&
      fitWorkerName === 'Ajinkya Patil',
      'Yoga & Fitness request in Pune accurately maps to fitness service and suggests coach Ajinkya Patil',
      `Service: ${fitPnqRes.data?.state?.serviceId}, Worker: ${fitWorkerName}`
    );

    // 7.31 Multi-Trade Support: Wardrobe & Home Organisation in Chennai
    const orgMaaRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Need wardrobe organisation and kitchen decluttering in Chennai',
        location: 'Chennai'
      }
    });
    assert(
      orgMaaRes.status === 200 &&
      orgMaaRes.data?.state?.serviceId === 'home-organisation' &&
      orgMaaRes.data?.workers?.length > 0 &&
      orgMaaRes.data?.workers[0]?.name === 'S. Meenakshi',
      'Home Organisation request in Chennai accurately maps to home-organisation and suggests pro S. Meenakshi',
      `Service: ${orgMaaRes.data?.state?.serviceId}, Workers: ${orgMaaRes.data?.workers?.map(w => w.name)}`
    );

    // 7.32 Multi-Trade Support: Auto Care / Car Detailing in Ahmedabad
    const autoAmdRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'गाड़ी की पूरी सफाई और कार वॉश करवानी है अहमदाबाद में',
        location: 'Ahmedabad'
      }
    });
    assert(
      autoAmdRes.status === 200 &&
      autoAmdRes.data?.state?.serviceId === 'auto-care' &&
      autoAmdRes.data?.workers?.length > 0 &&
      autoAmdRes.data?.workers[0]?.name === 'Alpesh Parmar',
      'Hindi Car Wash request in Ahmedabad accurately maps to auto-care and suggests specialist Alpesh Parmar',
      `Service: ${autoAmdRes.data?.state?.serviceId}, Workers: ${autoAmdRes.data?.workers?.map(w => w.name)}`
    );

    // 7.33 Multi-Trade Support: Pest Control in Delhi
    const pestDelRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'घर में दीमक और कॉकरोच बहुत हैं पेस्ट कंट्रोल करवाना है',
        location: 'Delhi'
      }
    });
    assert(
      pestDelRes.status === 200 &&
      pestDelRes.data?.state?.serviceId === 'pest-control' &&
      pestDelRes.data?.workers?.length > 0 &&
      pestDelRes.data?.workers[0]?.name === 'Ravinder Negi',
      'Hindi Pest Control request in Delhi accurately maps to pest-control and suggests exterminator Ravinder Negi',
      `Service: ${pestDelRes.data?.state?.serviceId}, Workers: ${pestDelRes.data?.workers?.map(w => w.name)}`
    );

    // 7.34 Multi-Trade Support: Garden & Plant Care in Hyderabad
    const gardenHydRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Need a gardener for lawn maintenance and plant pruning in Hyderabad',
        location: 'Hyderabad'
      }
    });
    assert(
      gardenHydRes.status === 200 &&
      gardenHydRes.data?.state?.serviceId === 'garden-care' &&
      gardenHydRes.data?.workers?.length > 0 &&
      gardenHydRes.data?.workers[0]?.name === 'Yadaiah Goud',
      'Garden Care request in Hyderabad accurately maps to garden-care and suggests gardener Yadaiah Goud',
      `Service: ${gardenHydRes.data?.state?.serviceId}, Workers: ${gardenHydRes.data?.workers?.map(w => w.name)}`
    );

    // 7.35 Multi-Trade Support: Senior Care in Kolkata (Bengali elder care query)
    const seniorCcuRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'আমার বৃদ্ধ দাদুর দেখাশোনা এবং ঔষধ দেওয়ার জন্য সেবা সহকারী দরকার',
        location: 'Kolkata'
      }
    });
    assert(
      seniorCcuRes.status === 200 &&
      seniorCcuRes.data?.state?.serviceId === 'senior-care' &&
      seniorCcuRes.data?.workers?.length > 0 &&
      seniorCcuRes.data?.workers[0]?.name === 'Gita Mukherjee',
      'Bengali Senior Care request in Kolkata accurately maps to senior-care and suggests caregiver Gita Mukherjee',
      `Service: ${seniorCcuRes.data?.state?.serviceId}, Workers: ${seniorCcuRes.data?.workers?.map(w => w.name)}`
    );

    // 7.36 AI Assistant Price Offer Extraction: "Offer 400" correctly parses proposed budget
    const priceOfferRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I need a plumber in Kolkata tomorrow at 10 AM, my offer is 400',
        location: 'Kolkata'
      }
    });
    assert(
      priceOfferRes.status === 200 &&
      priceOfferRes.data?.state?.rate === 400 &&
      priceOfferRes.data?.state?.serviceId === 'plumbing',
      'AI Assistant accurately extracts explicit price offer ("my offer is 400") as target budget'
    );

    // 7.37 AI Assistant In-Chat Bargaining: "Change budget to 450" updates rate without erasing to null
    const bargainRateRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Change budget to 450',
        structuredState: {
          service: 'Plumbing',
          serviceId: 'plumbing',
          location: 'Kolkata',
          date: '2026-10-15',
          time: '10:00 AM',
          rate: 350,
          readyToConfirm: true,
          selectedWorker: {
            id: 'pro_kol_plumb_1',
            name: 'Subhashis Banerjee',
            city: 'Kolkata',
            skillCategory: 'Plumbing & Drainage Fixing'
          }
        }
      }
    });
    assert(
      bargainRateRes.status === 200 &&
      bargainRateRes.data?.state?.rate === 450,
      'AI Assistant in-chat bargaining ("Change budget to 450") cleanly updates state rate to ₹450'
    );

    // 7.38 Multilingual Bengali In-Chat Bargain Extraction: "দরদাম করে ৪০০ টাকা"
    const bnBargainRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'দরদাম করে ৪০০ টাকা অফার করছি প্লাম্বারের জন্য',
        location: 'Kolkata'
      }
    });
    assert(
      bnBargainRes.status === 200 &&
      bnBargainRes.data?.state?.rate === 400 &&
      bnBargainRes.data?.state?.serviceId === 'plumbing',
      'Bengali in-chat bargain ("দরদাম করে ৪০০ টাকা অফার করছি") extracts rate as ₹400'
    );

    // 7.39 Multilingual Hindi In-Chat Bargain Extraction: "400 रुपये का ऑफर है"
    const hiBargainRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'बिजली मिस्त्री के लिए 450 रुपये का ऑफर है कल सुबह',
        location: 'Delhi'
      }
    });
    assert(
      hiBargainRes.status === 200 &&
      hiBargainRes.data?.state?.rate === 450 &&
      hiBargainRes.data?.state?.serviceId === 'electrician',
      'Hindi in-chat price offer ("450 रुपये का ऑफर है") extracts rate as ₹450'
    );

    // 7.40 End-to-End Worker Counter-Bargain & Customer Accept on AI-Assisted Booking
    const activeSec7WorkerRes = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'Swapan Mondal',
        email: `swapan.worker.${uniqueSuffix}@example.com`,
        phone: `91${Math.floor(10000000 + Math.random() * 90000000)}`,
        password: 'password123',
        role: 'worker',
        city: 'Kolkata',
        experience: '5',
        skillCategory: 'Custom Carpentry & Woodwork'
      }
    });
    const sec7WorkerToken = activeSec7WorkerRes.data?.token;
    const sec7WorkerUser = activeSec7WorkerRes.data?.user;

    // Approve worker by admin
    await request({
      method: 'PATCH',
      path: `/api/auth/admin/users/${sec7WorkerUser?.id || sec7WorkerUser?._id}/approval`,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { approvalStatus: 'approved' }
    });

    const aiDirectBookBargain = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        query: 'Yes confirm appointment',
        confirmed: true,
        structuredState: {
          service: 'Carpentry',
          serviceId: 'carpentry',
          location: 'Kolkata',
          date: '2026-10-22',
          time: '02:00 PM',
          rate: 399,
          readyToConfirm: true,
          selectedWorker: {
            id: sec7WorkerUser.id || sec7WorkerUser._id,
            name: 'Swapan Mondal',
            city: 'Kolkata',
            skillCategory: 'Custom Carpentry & Woodwork'
          }
        }
      }
    });
    const aiBookingId = aiDirectBookBargain.data?.booking?._id || aiDirectBookBargain.data?.booking?.id;
    assert(
      aiDirectBookBargain.status === 200 && aiBookingId != null && aiDirectBookBargain.data?.booking?.price === 399,
      'AI Assistant Direct Booking creates initial appointment at customer offered rate ₹399'
    );

    // Worker counter-offers ₹499
    const proCounterRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${aiBookingId}/respond`,
      headers: { 'Authorization': `Bearer ${sec7WorkerToken}` },
      body: {
        action: 'bargain',
        proposedPrice: 499,
        proposedTime: '02:30 PM',
        note: 'Requires additional wood adhesive and hardware.'
      }
    });
    assert(
      proCounterRes.status === 200 &&
      proCounterRes.data?.booking?.status === 'bargaining' &&
      proCounterRes.data?.booking?.price === 499,
      'Worker counter-offer updates AI booking status to bargaining with proposed rate ₹499'
    );

    // Customer accepts the counter-offer
    const custAcceptRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${aiBookingId}/customer-respond`,
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        action: 'accept',
        note: 'Customer agreed to ₹499'
      }
    });
    assert(
      custAcceptRes.status === 200 &&
      custAcceptRes.data?.booking?.status === 'accepted' &&
      custAcceptRes.data?.booking?.price === 499 &&
      custAcceptRes.data?.booking?.scheduledTime === '02:30 PM',
      'Customer acceptance of worker counter-offer finalizes agreed price ₹499 and schedule'
    );

    // 7.41 Escrow Lock on Paid AI Booking: Worker cannot modify price after payment
    const aiPrepaidBook = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        query: 'Yes confirm and pay now',
        confirmed: true,
        payNow: true,
        isEscrowFunded: true,
        structuredState: {
          service: 'Plumbing',
          serviceId: 'plumbing',
          location: 'Kolkata',
          date: '2026-10-25',
          time: '04:00 PM',
          rate: 450,
          readyToConfirm: true,
          selectedWorker: {
            id: sec7WorkerUser.id || sec7WorkerUser._id,
            name: 'Subhashis Banerjee',
            city: 'Kolkata',
            skillCategory: 'Plumbing & Drainage Fixing'
          }
        }
      }
    });
    const prepaidId = aiPrepaidBook.data?.booking?._id || aiPrepaidBook.data?.booking?.id;
    assert(
      aiPrepaidBook.status === 200 && prepaidId != null && aiPrepaidBook.data?.booking?.paymentStatus === 'paid',
      'AI Assistant creates prepaid booking with funds locked in escrow'
    );

    const illegalBargainRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${prepaidId}/respond`,
      headers: { 'Authorization': `Bearer ${sec7WorkerToken}` },
      body: {
        action: 'bargain',
        proposedPrice: 600,
        note: 'Want extra charge'
      }
    });
    assert(
      illegalBargainRes.status === 400 &&
      illegalBargainRes.data?.success === false,
      'Price bargaining is strictly blocked on bookings that have already been paid into escrow'
    );

    // 7.42 AI Assistant In-Chat Active Booking Adjustment: "Update price on my booking to ₹420"
    const inChatAdjustBooking = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      headers: { 'Authorization': `Bearer ${freshCustToken}` },
      body: {
        query: 'Update price on my booking to 420 rupees'
      }
    });
    assert(
      inChatAdjustBooking.status === 200 &&
      inChatAdjustBooking.data?.action === 'booking_terms_updated' &&
      inChatAdjustBooking.data?.booking?.price === 420,
      'AI Assistant in-chat command ("Update price on my booking to 420 rupees") dynamically updates active booking'
    );

    // 7.43 AI Confirmation Chips: Strictly exclude "Change Time" and "Change Rate"
    const confirmChipsCheck = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'Tomorrow at 10 AM',
        structuredState: {
          service: 'Plumber',
          serviceId: 'plumbing',
          location: 'Kolkata',
          date: '2026-10-15',
          time: '10:00 AM',
          rate: 349,
          selectedWorker: {
            name: 'Anirban Das',
            city: 'Kolkata',
            skillCategory: 'Plumbing & Drainage Fixing'
          }
        }
      }
    });
    const quickChips = confirmChipsCheck.data?.quickChips || [];
    const hasChangeTime = quickChips.some(c => c.toLowerCase().includes('time') || c.includes('সময়') || c.includes('समय'));
    const hasChangeRate = quickChips.some(c => c.toLowerCase().includes('rate') || c.includes('budget') || c.includes('বাজেট') || c.includes('दर'));
    assert(
      confirmChipsCheck.status === 200 &&
      confirmChipsCheck.data?.action === 'worker_ready_to_confirm' &&
      !hasChangeTime && !hasChangeRate &&
      quickChips.length === 1 &&
      quickChips[0].includes('Anirban Das'),
      'AI confirmation quick chips contain only confirm button and strictly exclude "Change Time" and "Change Rate"'
    );

    // 7.44 Contact Privacy Before Confirmation: Customer phone is hidden from worker on pending booking
    const privacyCustSignup = await request({
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        name: 'Privacy Test Customer',
        email: `privacy_cust_${Date.now()}_${Math.floor(Math.random()*1000)}@example.com`,
        phone: `96${Math.floor(10000000 + Math.random() * 90000000)}`,
        password: 'password123',
        role: 'customer'
      }
    });
    const privacyCustToken = privacyCustSignup.data?.token;

    const privacyBookingRes = await request({
      method: 'POST',
      path: '/api/auth/bookings',
      headers: { 'Authorization': `Bearer ${privacyCustToken}` },
      body: {
        serviceId: 'electrician',
        serviceName: 'Electrician',
        category: 'Electrical Repairs',
        city: 'Kolkata',
        locality: 'Salt Lake Sector 5, Block EP',
        scheduledDate: '2026-10-20',
        scheduledTime: '11:00 AM',
        price: 499,
        customerPhone: '9831999888'
      }
    });
    const privacyBookingId = privacyBookingRes.data?.booking?._id || privacyBookingRes.data?.booking?.id;

    const workerIncomingPreConfirm = await request({
      method: 'GET',
      path: '/api/auth/bookings/worker',
      headers: { 'Authorization': `Bearer ${workerToken}` }
    });
    const matchingPreBooking = (workerIncomingPreConfirm.data?.bookings || []).find(b => String(b._id || b.id) === String(privacyBookingId));
    assert(
      matchingPreBooking != null &&
      matchingPreBooking.status === 'pending' &&
      matchingPreBooking.customerPhone == null,
      'Unconfirmed booking privacy: Customer phone is protected and hidden from worker before confirmation'
    );

    // 7.45 Worker Acceptance Confirmation: Worker receives customer phone and exact customer location
    const workerAcceptRes = await request({
      method: 'POST',
      path: `/api/auth/bookings/${privacyBookingId}/respond`,
      headers: { 'Authorization': `Bearer ${workerToken}` },
      body: {
        action: 'accept',
        note: 'I am available and will reach your address at Salt Lake Sector 5.'
      }
    });
    assert(
      workerAcceptRes.status === 200 &&
      workerAcceptRes.data?.booking?.status === 'accepted' &&
      workerAcceptRes.data?.booking?.customerPhone === '9831999888' &&
      workerAcceptRes.data?.booking?.customerLocation?.includes('Salt Lake Sector 5') &&
      workerAcceptRes.data?.booking?.workerPhone != null &&
      workerAcceptRes.data?.booking?.workerPhone.length >= 10,
      'Worker acceptance confirmation: Worker receives customer phone and exact customer location upon accepting booking'
    );

    // 7.46 Customer Confirmation: Customer receives verified worker phone on their dashboard
    const customerConfirmedBookings = await request({
      method: 'GET',
      path: '/api/auth/bookings/customer',
      headers: { 'Authorization': `Bearer ${privacyCustToken}` }
    });
    const matchingCustBooking = (customerConfirmedBookings.data?.bookings || []).find(b => String(b._id || b.id) === String(privacyBookingId));
    assert(
      matchingCustBooking != null &&
      matchingCustBooking.status === 'accepted' &&
      matchingCustBooking.workerPhone != null &&
      matchingCustBooking.workerPhone.length >= 10,
      'Customer confirmation: Customer receives verified worker phone number once booking is confirmed',
      JSON.stringify(matchingCustBooking || customerConfirmedBookings.data)
    );

    // 7.47 Worker Dashboard Live Gigs reflects confirmed customer contact details
    const workerDashboardCheck = await request({
      method: 'GET',
      path: '/api/auth/worker/dashboard',
      headers: { 'Authorization': `Bearer ${workerToken}` }
    });
    const dashboardGig = (workerDashboardCheck.data?.currentGigs || []).find(g => String(g.id) === String(privacyBookingId));
    assert(
      dashboardGig != null &&
      dashboardGig.status === 'accepted' &&
      dashboardGig.customerPhone === '9831999888' &&
      dashboardGig.customerLocation?.includes('Salt Lake Sector 5'),
      'Worker dashboard live gigs reflects confirmed customer contact details and exact service address'
    );

    // 7.48 Multilingual Booking Creation (Bengali with Indic City 'কলকাতা' and Service 'প্লাম্বার সার্ভিস')
    const bengaliBookingRes = await request({
      method: 'POST',
      path: '/api/auth/bookings',
      headers: { 'Authorization': `Bearer ${privacyCustToken}` },
      body: {
        serviceId: 'plumbing',
        serviceName: 'প্লাম্বার সার্ভিস',
        category: 'Plumbing & Repairs',
        city: 'কলকাতা',
        locality: 'শ্যামবাজার ৫ নম্বর ক্রসিং',
        scheduledDate: '2026-10-22',
        scheduledTime: '10:00 AM',
        price: 450,
        customerPhone: '9831999888'
      }
    });
    assert(
      bengaliBookingRes.status === 201 &&
      bengaliBookingRes.data?.booking?.city === 'Kolkata' &&
      bengaliBookingRes.data?.booking?.serviceId === 'plumbing' &&
      bengaliBookingRes.data?.booking?.price === 450,
      'Multilingual Booking in Bengali: Backend normalizes Indic city "কলকাতা" to canonical "Kolkata" and standardizes trade'
    );

    // 7.49 Multilingual Booking Creation (Hindi with Indic City 'बेंगलुरु' and Service 'इलेक्ट्रीशियन')
    const hindiBookingRes = await request({
      method: 'POST',
      path: '/api/auth/bookings',
      headers: { 'Authorization': `Bearer ${privacyCustToken}` },
      body: {
        serviceId: 'electrician',
        serviceName: 'इलेक्ट्रीशियन सेवा',
        category: 'Electrical & Wiring',
        city: 'बेंगलुरु',
        locality: 'इंदिरानगर 100 फीट रोड',
        scheduledDate: '2026-10-23',
        scheduledTime: '02:00 PM',
        price: 500,
        customerPhone: '9831999888'
      }
    });
    assert(
      hindiBookingRes.status === 201 &&
      hindiBookingRes.data?.booking?.city === 'Bengaluru' &&
      hindiBookingRes.data?.booking?.serviceId === 'electrician' &&
      hindiBookingRes.data?.booking?.price === 500,
      'Multilingual Booking in Hindi: Backend normalizes Indic city "बेंगलुरु" to canonical "Bengaluru" and standardizes trade'
    );

    // 7.50 AI Scenario Understanding & Top-to-Least Rated Ranking (English Scenario)
    const scenarioEngRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'My kitchen pipe burst and water is flooding all over the floor in Kolkata tomorrow at 11 AM, my budget is 500 rupees'
      }
    });
    const engWorkers = scenarioEngRes.data?.workers || [];
    const isSortedEng = engWorkers.length > 1 && engWorkers.every((w, i) => {
      if (i === 0) return true;
      const prevRating = Number(engWorkers[i - 1].rating) || 4.5;
      const currRating = Number(w.rating) || 4.5;
      return prevRating >= currRating;
    });
    assert(
      scenarioEngRes.status === 200 &&
      scenarioEngRes.data?.state?.serviceId === 'plumbing' &&
      scenarioEngRes.data?.state?.location === 'Kolkata' &&
      engWorkers.length > 0 &&
      (engWorkers.length === 1 || isSortedEng) &&
      scenarioEngRes.data?.textResponse?.includes('Plumbing'),
      'AI Assistant Scenario Diagnosis: Understands kitchen pipe flood scenario as Plumbing and suggests specialists sorted top-rated first'
    );

    // 7.51 AI Multilingual Bengali Scenario Diagnosis & Top-Rated Ranking
    const scenarioBnRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'আমার সিলিং ফ্যান থেকে বিশ্রী আওয়াজ হচ্ছে আর একদম আস্তে ঘুরছে, কলকাতায় কাল সকাল ১০টায়'
      }
    });
    const bnWorkers = scenarioBnRes.data?.workers || [];
    const isSortedBn = bnWorkers.length > 1 && bnWorkers.every((w, i) => {
      if (i === 0) return true;
      const prevRating = Number(bnWorkers[i - 1].rating) || 4.5;
      const currRating = Number(w.rating) || 4.5;
      return prevRating >= currRating;
    });
    assert(
      scenarioBnRes.status === 200 &&
      scenarioBnRes.data?.detectedLanguage === 'bn' &&
      scenarioBnRes.data?.state?.serviceId === 'electrician' &&
      scenarioBnRes.data?.state?.location === 'Kolkata' &&
      bnWorkers.length > 0 &&
      (bnWorkers.length === 1 || isSortedBn),
      'AI Multilingual Bengali Scenario: Accurately diagnoses ceiling fan problem as Electrician and ranks verified specialists top-rated first'
    );

    // 7.52 AI Multilingual Hindi Scenario Diagnosis & Top-Rated Ranking
    const scenarioHiRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'सीलिंग पंखे से बहुत तेज आवाज आ रही है और एकदम धीमे घूम रहा है, दिल्ली में कल सुबह 10 बजे',
        preferredLanguage: 'hi'
      }
    });
    const hiWorkers = scenarioHiRes.data?.workers || [];
    const isSortedHi = hiWorkers.length > 1 && hiWorkers.every((w, i) => {
      if (i === 0) return true;
      const prevRating = Number(hiWorkers[i - 1].rating) || 4.5;
      const currRating = Number(w.rating) || 4.5;
      return prevRating >= currRating;
    });
    assert(
      scenarioHiRes.status === 200 &&
      scenarioHiRes.data?.detectedLanguage === 'hi' &&
      scenarioHiRes.data?.state?.serviceId === 'electrician' &&
      scenarioHiRes.data?.state?.location === 'Delhi' &&
      hiWorkers.length > 0 &&
      (hiWorkers.length === 1 || isSortedHi),
      'AI Multilingual Hindi Scenario: Accurately diagnoses ceiling fan noise as Electrician and ranks verified specialists top-rated first'
    );

    // 7.53 Multi-worker suggestion check: All workers returned and sorted highest-to-lowest rating
    const allWorkersRes = await request({
      method: 'POST',
      path: '/api/ai/smart-assistant',
      body: {
        query: 'I need an Electrician in Kolkata'
      }
    });
    const allWorkers = allWorkersRes.data?.workers || [];
    const isStrictlyDescending = allWorkers.length > 1 && allWorkers.every((w, i) => {
      if (i === 0) return true;
      return (Number(allWorkers[i - 1].rating) || 0) >= (Number(w.rating) || 0);
    });
    assert(
      allWorkersRes.status === 200 &&
      allWorkers.length >= 2 &&
      isStrictlyDescending &&
      Number(allWorkers[0].rating) >= Number(allWorkers[allWorkers.length - 1].rating),
      'AI Worker Ranking: Suggests all matching specialists in city/trade strictly sorted from highest to lowest rating'
    );

  } catch (err) {
    assert(false, 'Section 7 execution', err.message);
  }

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  console.log(`\n======================================================`);
  console.log(`🏁 Test Suite Finished: ${passedTests} Passed, ${failedTests} Failed`);
  if (failedTests > 0) {
    console.log(`\nFailed Tests Summary:`);
    failuresList.forEach((f, idx) => {
      console.log(`  ${idx + 1}. ${f.testName}: ${f.details}`);
    });
  }
  console.log(`======================================================\n`);

  process.exit(failedTests === 0 ? 0 : 1);
}

runAllTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
