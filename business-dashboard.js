/**
 * SevaSathi Enterprise Business Dashboard Controller
 */

const API_BASE = (function () {
  if (typeof window === 'undefined') return '/api';
  if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
    return 'http://localhost:5001/api';
  }
  if ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port && window.location.port !== '5001') {
    return 'http://localhost:5001/api';
  }
  return '/api';
})();

let currentRequirementForMatch = null;
let currentSelectedWorkerIds = [];
let currentCandidateList = [];

// ==========================================
// INITIALIZATION & AUTH CHECK
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
  const user = window.SevaSathiSession ? SevaSathiSession.getUser() : JSON.parse(localStorage.getItem('hustleCurrentUser') || 'null');
  const token = window.SevaSathiSession ? SevaSathiSession.getToken() : localStorage.getItem('hustleToken');

  if (!user || !token) {
    window.location.href = 'auth.html?role=business&mode=signin';
    return;
  }

  if (user.role !== 'business' && user.role !== 'admin') {
    alert('Access restricted. Please log in with a verified Business Organization account.');
    window.location.href = 'auth.html?role=business&mode=signin';
    return;
  }

  // Populate header profile
  setupHeaderProfile(user);
  setupDateDefaults();
  setupTabNavigation();
  setupEventHandlers();
  setupCostEstimator();

  // Load data
  await loadAllDashboardData();
});

function setupHeaderProfile(user) {
  const orgName = user.businessName || user.name || 'Commercial Partner';
  const contactName = user.contactPerson || user.name || 'Account Admin';
  const initials = getInitials(orgName);

  const navAvatar = document.getElementById('nav-avatar');
  const navOrgName = document.getElementById('nav-org-name');
  const navContactPerson = document.getElementById('nav-contact-person');
  const welcomeSub = document.getElementById('welcome-subheading');

  if (navAvatar) navAvatar.textContent = initials;
  if (navOrgName) navOrgName.textContent = orgName;
  if (navContactPerson) navContactPerson.textContent = contactName;
  if (welcomeSub) welcomeSub.textContent = `Welcome back, ${orgName}! Manage multi-worker deployments, team rosters, and consolidated billing.`;

  // Profile tab fields
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setVal('prof-biz-name', user.businessName || user.name);
  setVal('prof-biz-type', user.businessType || 'Hospitality / Facility Management');
  setVal('prof-contact', user.contactPerson || user.name);
  setVal('prof-email', user.email);
  setVal('prof-phone', user.phone);
  setVal('prof-address', user.address || 'Corporate Headquarters');
  setVal('prof-gstin', user.gstin || '19AAACG0123M1Z8');
  setVal('prof-reg', user.businessRegNumber || 'U55101WB2018PTC224150');
}

function getInitials(name) {
  if (!name) return 'GH';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function setupDateDefaults() {
  const startInput = document.getElementById('req-start-date');
  const endInput = document.getElementById('req-end-date');

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const formatIso = (d) => d.toISOString().split('T')[0];

  if (startInput && !startInput.value) startInput.value = formatIso(today);
  if (endInput && !endInput.value) endInput.value = formatIso(nextWeek);
}

// Toast notification helper
function showBizToast(msg, type = 'success') {
  let container = document.getElementById('biz-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'biz-toast-container';
    container.className = 'biz-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `biz-toast ${type}`;
  const icon = type === 'error' ? '⚠️' : '✓';

  toast.innerHTML = `
    <span style="font-size:16px; font-weight:800; color:${type === 'error' ? '#DC2626' : '#15803D'};">${icon}</span>
    <div style="flex:1; line-height:1.4;">${msg}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3600);
}

// ==========================================
// TAB NAVIGATION
// ==========================================

function setupTabNavigation() {
  const navButtons = document.querySelectorAll('.biz-nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  const quickPostBtn = document.getElementById('btn-quick-post-req');
  if (quickPostBtn) {
    quickPostBtn.addEventListener('click', () => switchTab('post-requirement'));
  }
}

function switchTab(tabId) {
  document.querySelectorAll('.biz-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.biz-tab-content').forEach(sec => {
    sec.style.display = sec.id === `tab-${tabId}` ? 'block' : 'none';
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// REAL-TIME COST ESTIMATION PREVIEW
// ==========================================

function setupCostEstimator() {
  const workersInput = document.getElementById('req-workers-needed');
  const rateInput = document.getElementById('req-rate');
  const startInput = document.getElementById('req-start-date');
  const endInput = document.getElementById('req-end-date');

  function updateCostPreview() {
    const workers = Math.max(1, Number(workersInput?.value) || 1);
    const rate = Math.max(300, Number(rateInput?.value) || 850);
    const start = new Date(startInput?.value || Date.now());
    const end = new Date(endInput?.value || Date.now());

    let days = 1;
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
      const diff = Math.abs(end - start);
      days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    const subtotal = workers * rate * days;
    const fee = Math.round(subtotal * 0.05); // 5% cooperative reserve
    const total = subtotal + fee;

    const elSquad = document.getElementById('calc-squad-text');
    const elDuration = document.getElementById('calc-duration-text');
    const elSubtotal = document.getElementById('calc-subtotal-text');
    const elFee = document.getElementById('calc-fee-text');
    const elTotal = document.getElementById('calc-total-text');

    if (elSquad) elSquad.textContent = `${workers} Pro${workers > 1 ? 's' : ''}`;
    if (elDuration) elDuration.textContent = `${days} Day${days > 1 ? 's' : ''}`;
    if (elSubtotal) elSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (elFee) elFee.textContent = `₹${fee.toLocaleString('en-IN')}`;
    if (elTotal) elTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  [workersInput, rateInput, startInput, endInput].forEach(el => {
    if (el) el.addEventListener('input', updateCostPreview);
    if (el) el.addEventListener('change', updateCostPreview);
  });

  updateCostPreview();
}

// ==========================================
// EVENT HANDLERS
// ==========================================

function setupEventHandlers() {
  // Sign Out
  const logoutBtn = document.getElementById('btn-biz-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (window.SevaSathiSession) {
        SevaSathiSession.clear();
      } else {
        localStorage.removeItem('hustleToken');
        localStorage.removeItem('hustleCurrentUser');
      }
      window.location.href = 'auth.html?role=business&mode=signin';
    });
  }

  // Recurring checkbox toggle
  const isRecurringCheck = document.getElementById('req-is-recurring');
  const recurrenceGroup = document.getElementById('group-recurrence');
  if (isRecurringCheck && recurrenceGroup) {
    isRecurringCheck.addEventListener('change', (e) => {
      recurrenceGroup.style.display = e.target.checked ? 'block' : 'none';
    });
  }

  // Form Submit: Post Requirement
  const formPost = document.getElementById('form-post-requirement');
  if (formPost) {
    formPost.addEventListener('submit', handlePostRequirement);
  }

  // Confirm Allocation button in modal
  const btnConfirmAlloc = document.getElementById('btn-confirm-allocation');
  if (btnConfirmAlloc) {
    btnConfirmAlloc.addEventListener('click', handleConfirmAllocation);
  }

  // Auto-Select Top Recommendations button in modal
  const btnAutoSelect = document.getElementById('btn-auto-select-top');
  if (btnAutoSelect) {
    btnAutoSelect.addEventListener('click', handleAutoSelectTopMatches);
  }

  // Save Profile Updates
  const btnSaveProfile = document.getElementById('btn-save-profile');
  if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', handleSaveProfile);
  }
}

// ==========================================
// DATA LOADING
// ==========================================

async function loadAllDashboardData() {
  await Promise.all([
    loadStats(),
    loadRequirements(),
    loadContracts(),
    loadWorkforce(),
    loadInvoices()
  ]);
}

function getAuthHeaders() {
  const token = window.SevaSathiSession ? SevaSathiSession.getToken() : localStorage.getItem('hustleToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

async function loadStats() {
  try {
    const res = await fetch(`${API_BASE}/business/stats`, { headers: getAuthHeaders() });
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && data.stats) {
      const s = data.stats;
      document.getElementById('kpi-active-reqs').textContent = s.activeRequirements || 0;
      document.getElementById('kpi-pending-reqs').textContent = s.pendingRequests || 0;
      document.getElementById('kpi-assigned-workers').textContent = s.currentlyAssignedWorkers || 0;
      document.getElementById('kpi-active-contracts').textContent = s.activeContracts || 0;
      document.getElementById('kpi-total-spending').textContent = `₹${(s.totalSpending || 0).toLocaleString('en-IN')}`;
      document.getElementById('kpi-completed-jobs').textContent = s.completedJobs || 0;
    }
  } catch (err) {
    console.error('Error loading stats:', err);
  }
}

async function loadRequirements() {
  try {
    const res = await fetch(`${API_BASE}/business/requirements`, { headers: getAuthHeaders() });
    if (!res.ok) return;
    const data = await res.json();
    const reqs = data.requirements || [];

    const badge = document.getElementById('badge-req-count');
    if (badge) badge.textContent = reqs.length;

    renderRequirementsTable(reqs);
    renderOverviewRecentRequirements(reqs.slice(0, 5));
  } catch (err) {
    console.error('Error loading requirements:', err);
  }
}

function renderRequirementsTable(reqs) {
  const tbody = document.getElementById('requirements-tbody');
  if (!tbody) return;

  if (reqs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:28px; color:var(--muted);">No workforce requirements posted yet. Click "New Requisition" to request staff.</td></tr>`;
    return;
  }

  tbody.innerHTML = reqs.map(r => {
    const statusClass = r.status || 'open';
    const workerCount = (r.allocatedWorkers || []).length;
    const isAllocated = r.status === 'contracted' || r.status === 'allocated';

    return `
      <tr>
        <td><strong>#${r.requirementId}</strong></td>
        <td>
          <strong>${r.serviceCategory}</strong>
          ${r.requiredSkills ? `<br><small style="color:var(--muted);">${r.requiredSkills}</small>` : ''}
        </td>
        <td><strong style="color:var(--primary-green);">${r.workersNeeded}</strong> pro(s)</td>
        <td>
          <small>${r.startDate} → ${r.endDate}</small><br>
          <small style="color:var(--muted);">${r.schedule}</small>
        </td>
        <td><strong>₹${r.ratePerWorker}</strong> / day</td>
        <td><span class="status-pill ${statusClass}">${r.status}</span></td>
        <td>
          ${isAllocated 
            ? `<span style="font-size:12px; font-weight:700; color:#059669;">✓ ${workerCount} Workers Assigned</span>` 
            : `<span style="font-size:12px; color:var(--muted);">Pending Allocation</span>`}
        </td>
        <td>
          ${!isAllocated ? `
            <button type="button" class="biz-btn-primary" style="font-size:12px; padding:6px 14px;" onclick="openMatchModal('${r.requirementId}')">
              <span>⚡ View Matches</span>
            </button>
          ` : `
            <button type="button" class="biz-btn-secondary" style="font-size:12px; padding:6px 14px;" onclick="switchTab('workforce')">
              <span>View Roster</span>
            </button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function renderOverviewRecentRequirements(reqs) {
  const tbody = document.getElementById('overview-recent-reqs-tbody');
  if (!tbody) return;

  if (reqs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--muted);">No active requirements. Post a requirement to start workforce deployment.</td></tr>`;
    return;
  }

  tbody.innerHTML = reqs.map(r => `
    <tr>
      <td><strong>#${r.requirementId}</strong></td>
      <td><strong>${r.serviceCategory}</strong></td>
      <td><strong>${r.workersNeeded}</strong></td>
      <td><small>${r.startDate} → ${r.endDate}</small></td>
      <td>₹${r.ratePerWorker}/day</td>
      <td><span class="status-pill ${r.status}">${r.status}</span></td>
      <td>
        <button type="button" class="biz-btn-secondary" style="font-size:11.5px; padding:4px 10px;" onclick="openMatchModal('${r.requirementId}')">
          Matches
        </button>
      </td>
    </tr>
  `).join('');
}

async function loadContracts() {
  try {
    const res = await fetch(`${API_BASE}/business/contracts`, { headers: getAuthHeaders() });
    if (!res.ok) return;
    const data = await res.json();
    const contracts = data.contracts || [];

    const badge = document.getElementById('badge-contract-count');
    if (badge) badge.textContent = contracts.length;

    renderContractsTable(contracts);
    renderOverviewRecentContracts(contracts.slice(0, 5));
  } catch (err) {
    console.error('Error loading contracts:', err);
  }
}

function renderContractsTable(contracts) {
  const tbody = document.getElementById('contracts-tbody');
  if (!tbody) return;

  if (contracts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:28px; color:var(--muted);">No active commercial contracts yet. Contracts are generated automatically when workforce allocations are confirmed.</td></tr>`;
    return;
  }

  tbody.innerHTML = contracts.map(c => `
    <tr>
      <td><strong>#${c.contractId}</strong></td>
      <td><strong>${c.serviceCategory}</strong></td>
      <td><strong style="color:var(--primary-green);">${c.workerCount}</strong> Workers</td>
      <td>
        <small>${c.duration?.startDate} to ${c.duration?.endDate}</small><br>
        <small style="color:var(--muted);">${c.duration?.totalDays || 1} Total Days</small>
      </td>
      <td>₹${c.ratePerWorker} / day</td>
      <td><strong style="font-size:15px; color:#166534;">₹${(c.totalEstimatedAmount || 0).toLocaleString('en-IN')}</strong></td>
      <td><span class="status-pill ${c.status}">${c.status}</span></td>
      <td>
        <button type="button" class="biz-btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="switchTab('invoices')">
          <span>View Invoice</span>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderOverviewRecentContracts(contracts) {
  const tbody = document.getElementById('overview-recent-contracts-tbody');
  if (!tbody) return;

  if (contracts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--muted);">No active contracts found.</td></tr>`;
    return;
  }

  tbody.innerHTML = contracts.map(c => `
    <tr>
      <td><strong>#${c.contractId}</strong></td>
      <td><strong>${c.serviceCategory}</strong></td>
      <td>${c.workerCount} Pros</td>
      <td><small>${c.duration?.startDate} → ${c.duration?.endDate}</small></td>
      <td><strong>₹${(c.totalEstimatedAmount || 0).toLocaleString('en-IN')}</strong></td>
      <td><span class="status-pill ${c.status}">${c.status}</span></td>
    </tr>
  `).join('');
}

async function loadWorkforce() {
  try {
    const res = await fetch(`${API_BASE}/business/workforce`, { headers: getAuthHeaders() });
    if (!res.ok) return;
    const data = await res.json();
    const teams = data.teams || {};

    let totalWorkers = 0;
    Object.values(teams).forEach(arr => totalWorkers += arr.length);

    const badge = document.getElementById('badge-workforce-count');
    if (badge) badge.textContent = totalWorkers;

    renderWorkforceRoster(teams);
  } catch (err) {
    console.error('Error loading workforce:', err);
  }
}

function renderWorkforceRoster(teams) {
  const container = document.getElementById('workforce-teams-container');
  if (!container) return;

  const categories = Object.keys(teams);
  if (categories.length === 0) {
    container.innerHTML = `
      <div class="biz-panel" style="text-align:center; padding:44px 20px; color:var(--muted);">
        <p style="font-size:16px; margin:0 0 8px; font-weight:700; color:var(--ink);">No Deployed Workers Currently</p>
        <p style="margin:0;">When you allocate matched candidates to a requirement, they will be organized into department squads here with live attendance status.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = categories.map(cat => {
    const members = teams[cat] || [];
    return `
      <div class="team-accordion open">
        <div class="team-accordion-header">
          <h4><span>🏢</span> ${cat} Department (${members.length} Active Pros)</h4>
          <span class="status-pill active">Department Active</span>
        </div>
        <div class="team-members-grid">
          ${members.map(m => `
            <div class="worker-roster-card">
              <div class="biz-avatar">${getInitials(m.name)}</div>
              <div style="flex:1; min-width:0;">
                <div style="font-weight:700; font-size:13.5px; color:var(--ink);">${m.name}</div>
                <div style="font-size:11.5px; color:var(--muted);">${m.skill || cat}</div>
                <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
                  <span class="status-pill active" style="font-size:10px; padding:2px 8px;">✓ ${m.attendanceStatus || 'Checked In'}</span>
                  <span style="font-size:11.5px; font-weight:700; color:#15803D;">₹${m.ratePerWorker}/day</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

async function loadInvoices() {
  try {
    const res = await fetch(`${API_BASE}/business/invoices`, { headers: getAuthHeaders() });
    if (!res.ok) return;
    const data = await res.json();
    const invoices = data.invoices || [];

    const badge = document.getElementById('badge-invoice-count');
    if (badge) badge.textContent = invoices.filter(i => i.status === 'pending').length;

    renderInvoicesList(invoices);
  } catch (err) {
    console.error('Error loading invoices:', err);
  }
}

function renderInvoicesList(invoices) {
  const container = document.getElementById('invoices-list-container');
  if (!container) return;

  if (invoices.length === 0) {
    container.innerHTML = `
      <div class="biz-panel" style="text-align:center; padding:44px 20px; color:var(--muted);">
        <p style="font-size:16px; margin:0 0 8px; font-weight:700; color:var(--ink);">No Invoices Generated Yet</p>
        <p style="margin:0;">Consolidated escrow invoices will be generated automatically when workforce requisitions are approved and allocated.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = invoices.map(inv => {
    const b = inv.breakdown || {};
    const isPaid = inv.status === 'paid';

    return `
      <div class="invoice-card">
        <div class="invoice-card-header">
          <div>
            <div style="display:flex; align-items:center; gap:10px;">
              <h3 style="margin:0; font-family:var(--font-heading); font-size:21px;">Invoice #${inv.invoiceId}</h3>
              <span class="status-pill ${inv.status}">${inv.status}</span>
            </div>
            <p style="margin:4px 0 0; font-size:13.5px; color:var(--muted);">${inv.serviceTitle}</p>
            <small style="color:var(--muted);">Associated Contract: <strong>#${inv.contractId}</strong></small>
          </div>
          <div style="text-align:right;">
            <div class="invoice-total-highlight">₹${(b.totalAmount || inv.totalAmount || 0).toLocaleString('en-IN')}</div>
            <small style="color:var(--muted); font-weight:600;">${isPaid ? 'Secured in Escrow' : 'Payment Due'}</small>
          </div>
        </div>

        <!-- Breakdown Details -->
        <div style="background:#F8FAFC; border:1px solid var(--line); border-radius:12px; padding:16px 20px; margin-bottom:18px;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:14px; font-size:12.5px;">
            <div>
              <span style="color:var(--muted); display:block; margin-bottom:3px;">Workforce Count</span>
              <strong>${b.workerCount || 1} Assigned Pro(s)</strong>
            </div>
            <div>
              <span style="color:var(--muted); display:block; margin-bottom:3px;">Daily Rate / Worker</span>
              <strong>₹${(b.ratePerDay || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <span style="color:var(--muted); display:block; margin-bottom:3px;">Contract Duration</span>
              <strong>${b.totalDays || 1} Days</strong>
            </div>
            <div>
              <span style="color:var(--muted); display:block; margin-bottom:3px;">Labor Subtotal</span>
              <strong>₹${(b.subtotal || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <span style="color:var(--muted); display:block; margin-bottom:3px;">Cooperative Reserve (5%)</span>
              <strong>₹${(b.cooperativeFee || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            ${isPaid ? `
              <span style="font-size:12.5px; color:#15803D; font-weight:700;">
                ✓ Paid via ${inv.paymentMethod || 'Corporate Escrow'} · Ref: ${inv.transactionId || 'TXN-000'}
              </span>
            ` : `
              <span style="font-size:12.5px; color:#B45309; font-weight:600;">
                ⚠️ Funds will be held securely in cooperative escrow and disbursed upon shift sign-offs.
              </span>
            `}
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" class="biz-btn-secondary" onclick="window.print()" style="font-size:12px; padding:8px 14px;">🖨️ Print Invoice</button>
            ${!isPaid ? `
              <button type="button" class="biz-btn-primary" onclick="payInvoice('${inv.invoiceId}')" style="font-size:12px; padding:8px 16px;">
                💳 Pay via Corporate Escrow (Demo)
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function payInvoice(invoiceId) {
  if (!confirm('Authorize corporate payment for this workforce deployment? Funds will be locked in SevaSathi Escrow.')) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/business/invoices/${invoiceId}/pay`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (data.success) {
      showBizToast(`Payment processed successfully! TxID: ${data.transactionId}`, 'success');
      await loadAllDashboardData();
    } else {
      showBizToast('Payment failed: ' + data.message, 'error');
    }
  } catch (err) {
    showBizToast('Payment request error: ' + err.message, 'error');
  }
}

// ==========================================
// FORM SUBMIT: POST REQUIREMENT
// ==========================================

async function handlePostRequirement(e) {
  e.preventDefault();

  const serviceCategory = document.getElementById('req-category').value;
  const workersNeeded = document.getElementById('req-workers-needed').value;
  const requiredSkills = document.getElementById('req-skills').value;
  const location = document.getElementById('req-location').value;
  const city = document.getElementById('req-city').value;
  const startDate = document.getElementById('req-start-date').value;
  const endDate = document.getElementById('req-end-date').value;
  const schedule = document.getElementById('req-schedule').value;
  const ratePerWorker = document.getElementById('req-rate').value;
  const isRecurring = document.getElementById('req-is-recurring').checked;
  const recurrenceFrequency = document.getElementById('req-recurrence-freq').value;
  const additionalRequirements = document.getElementById('req-notes').value;

  if (new Date(endDate) < new Date(startDate)) {
    showBizToast('End date cannot be prior to start date.', 'error');
    return;
  }

  const payload = {
    serviceCategory,
    workersNeeded: Number(workersNeeded),
    requiredSkills,
    location,
    city,
    startDate,
    endDate,
    schedule,
    ratePerWorker: Number(ratePerWorker),
    isRecurring,
    recurrenceFrequency: isRecurring ? recurrenceFrequency : 'none',
    additionalRequirements
  };

  const submitBtn = document.getElementById('btn-submit-requirement');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>⏳ Running Matching Engine...</span>';

  try {
    const res = await fetch(`${API_BASE}/business/requirements`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success && data.requirement) {
      showBizToast('Workforce requirement posted! Opening algorithmic fair matches.', 'success');
      document.getElementById('form-post-requirement').reset();
      setupDateDefaults();
      setupCostEstimator();
      await loadAllDashboardData();
      switchTab('requirements');
      openMatchModal(data.requirement.requirementId);
    } else {
      showBizToast(data.message || 'Failed to post requirement.', 'error');
    }
  } catch (err) {
    showBizToast('Submission error: ' + err.message, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>🚀 Submit &amp; Run Fair Matcher</span>';
  }
}

// ==========================================
// MATCHING CANDIDATES MODAL
// ==========================================

async function openMatchModal(requirementId) {
  const modal = document.getElementById('modal-matches');
  const body = document.getElementById('modal-matches-body');
  const title = document.getElementById('modal-match-title');
  const neededCountEl = document.getElementById('needed-workers-count');
  const selectedCountEl = document.getElementById('selected-workers-count');

  modal.style.display = 'flex';
  body.innerHTML = '<div style="text-align:center; padding:36px; color:var(--muted);">Running 5-Factor Weighted Fair Scoring Algorithm...</div>';

  currentRequirementForMatch = requirementId;
  currentSelectedWorkerIds = [];
  currentCandidateList = [];
  selectedCountEl.textContent = '0';

  try {
    const res = await fetch(`${API_BASE}/business/requirements/${requirementId}/matches`, { headers: getAuthHeaders() });
    const data = await res.json();

    if (!data.success || !data.matches) {
      body.innerHTML = `<div style="text-align:center; padding:30px; color:#DC2626;">${data.message || 'Failed to load matches.'}</div>`;
      return;
    }

    const matches = data.matches;
    currentCandidateList = matches;
    const needed = data.workersNeeded || 1;
    neededCountEl.textContent = needed;
    title.textContent = `Algorithmic Matches for Requirement #${requirementId} (${needed} Needed)`;

    if (matches.length === 0) {
      body.innerHTML = `
        <div style="text-align:center; padding:36px; color:var(--muted);">
          No approved cooperative workers currently match this trade. You can review available workers or broaden required skills.
        </div>
      `;
      return;
    }

    // Auto-select top candidates up to needed count
    const autoSelectIds = matches.slice(0, needed).map(m => m.workerId);
    currentSelectedWorkerIds = [...autoSelectIds];
    selectedCountEl.textContent = currentSelectedWorkerIds.length;

    renderCandidateCards(matches, needed);

  } catch (err) {
    body.innerHTML = `<div style="text-align:center; padding:30px; color:#DC2626;">Error: ${err.message}</div>`;
  }
}

function renderCandidateCards(matches, needed) {
  const body = document.getElementById('modal-matches-body');
  if (!body) return;

  body.innerHTML = matches.map(m => {
    const isChecked = currentSelectedWorkerIds.includes(m.workerId);
    const isEgalitarianPriority = (m.activeJobsCount || 0) <= 1;

    return `
      <div class="candidate-card ${isChecked ? 'selected' : ''}" id="cand-card-${m.workerId}">
        <div>
          <input type="checkbox" style="transform:scale(1.3); cursor:pointer;" 
            ${isChecked ? 'checked' : ''} 
            onchange="toggleCandidateSelect('${m.workerId}', ${needed})" 
          />
        </div>
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="font-size:15px; color:var(--ink);">${m.name}</strong>
            <span style="font-size:11px; font-weight:700; background:#F1F5F9; color:#475569; padding:2px 8px; border-radius:6px;">
              ${m.anonymizedId}
            </span>
            ${isEgalitarianPriority ? `
              <span style="font-size:10.5px; font-weight:800; background:#DCFCE7; color:#15803D; padding:2px 8px; border-radius:999px; border:1px solid #86EFAC;">
                ★ Rotation Priority (Low Workload)
              </span>
            ` : ''}
          </div>
          <div style="font-size:12.5px; color:var(--muted); margin-top:3px;">
            ${m.skillCategory} · ${m.specificSkill} · ${m.experience} Experience
          </div>
          <div style="font-size:12px; color:#475569; margin-top:4px;">
            📍 ${m.approxLocality} · ⭐ ${m.rating} (${m.ratingCount} reviews) · Active Jobs: ${m.activeJobsCount}
          </div>
        </div>
        <div>
          <div style="text-align:right;">
            <strong style="font-size:15px; color:#166534;">₹${m.estimatedCost}</strong>
            <small style="display:block; color:var(--muted); font-size:10.5px;">per day</small>
          </div>
        </div>
        <div>
          <div class="candidate-score-badge">
            ${m.matchScore}%
            <small>Fair Score</small>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleAutoSelectTopMatches() {
  const needed = Number(document.getElementById('needed-workers-count')?.textContent) || 1;
  const topPicks = currentCandidateList.slice(0, needed).map(c => c.workerId);
  currentSelectedWorkerIds = [...topPicks];

  renderCandidateCards(currentCandidateList, needed);

  const selectedCountEl = document.getElementById('selected-workers-count');
  if (selectedCountEl) selectedCountEl.textContent = currentSelectedWorkerIds.length;
  showBizToast(`Selected top ${topPicks.length} ranked candidate(s) by fair allocation score.`);
}

function toggleCandidateSelect(workerId, needed) {
  const idx = currentSelectedWorkerIds.indexOf(workerId);
  if (idx > -1) {
    currentSelectedWorkerIds.splice(idx, 1);
  } else {
    currentSelectedWorkerIds.push(workerId);
  }

  const card = document.getElementById(`cand-card-${workerId}`);
  if (card) {
    card.classList.toggle('selected', currentSelectedWorkerIds.includes(workerId));
  }

  const selectedCountEl = document.getElementById('selected-workers-count');
  if (selectedCountEl) {
    selectedCountEl.textContent = currentSelectedWorkerIds.length;
  }
}

function closeMatchModal() {
  const modal = document.getElementById('modal-matches');
  if (modal) modal.style.display = 'none';
  currentRequirementForMatch = null;
  currentSelectedWorkerIds = [];
}

async function handleConfirmAllocation() {
  if (!currentRequirementForMatch) return;
  if (currentSelectedWorkerIds.length === 0) {
    showBizToast('Please select at least 1 worker for allocation.', 'error');
    return;
  }

  const btn = document.getElementById('btn-confirm-allocation');
  btn.disabled = true;
  btn.textContent = 'Allocating & Activating Contract...';

  try {
    const res = await fetch(`${API_BASE}/business/requirements/${currentRequirementForMatch}/allocate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ selectedWorkerIds: currentSelectedWorkerIds })
    });

    const data = await res.json();
    if (data.success) {
      showBizToast(`Contract #${data.contract.contractId} generated successfully!`, 'success');
      closeMatchModal();
      await loadAllDashboardData();
      switchTab('workforce');
    } else {
      showBizToast('Allocation error: ' + data.message, 'error');
    }
  } catch (err) {
    showBizToast('Allocation request failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Confirm Allocation & Generate Contract';
  }
}

// ==========================================
// PROFILE UPDATE HANDLER
// ==========================================

function handleSaveProfile() {
  const contactPerson = document.getElementById('prof-contact')?.value.trim();
  const phone = document.getElementById('prof-phone')?.value.trim();
  const address = document.getElementById('prof-address')?.value.trim();
  const gstin = document.getElementById('prof-gstin')?.value.trim();
  const businessType = document.getElementById('prof-biz-type')?.value.trim();
  const reg = document.getElementById('prof-reg')?.value.trim();

  const user = window.SevaSathiSession ? SevaSathiSession.getUser() : JSON.parse(localStorage.getItem('hustleCurrentUser') || '{}');
  if (user) {
    if (contactPerson) user.contactPerson = contactPerson;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (gstin) user.gstin = gstin;
    if (businessType) user.businessType = businessType;
    if (reg) user.businessRegNumber = reg;

    localStorage.setItem('hustleCurrentUser', JSON.stringify(user));
    setupHeaderProfile(user);
    showBizToast('Organization profile details updated successfully!', 'success');
  }
}
