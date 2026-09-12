/**
 * SevaSathi Cooperative Federation — Core Application Logic
 * Vanilla JavaScript ES6 Module
 */

import { initCooperativeI18n, getCooperativeLanguage, t } from './cooperative-i18n.js';

// Global state
const state = {
  activeTab: 'dashboard',
  revenueChart: null,
  jobAmount: 2500,
  chatCity: 'Kolkata',
  chatWork: 'Electrician',
  currentChatChannel: 'channel-Kolkata-Electrician',
  roster: [
    { id: 'SSC-KOL-1024', name: 'Subhashish Roy', trade: 'Electrician', city: 'Kolkata', rating: 4.9, equity: '120 shares', status: 'active' },
    { id: 'SSC-BLR-2048', name: 'Ramesh Kumar', trade: 'Plumber', city: 'Bengaluru', rating: 4.8, equity: '95 shares', status: 'on_job' },
    { id: 'SSC-DEL-3091', name: 'Manish Sharma', trade: 'Carpenter', city: 'Delhi NCR', rating: 4.9, equity: '110 shares', status: 'active' },
    { id: 'SSC-MUM-4120', name: 'Sunita Patil', trade: 'Home Cleaning', city: 'Mumbai', rating: 4.95, equity: '140 shares', status: 'active' },
    { id: 'SSC-KOL-5512', name: 'Anirban Das', trade: 'AC Repair & HVAC', city: 'Kolkata', rating: 4.85, equity: '80 shares', status: 'on_job' },
    { id: 'SSC-HYD-6673', name: 'K. Venkatesh', trade: 'Painter', city: 'Hyderabad', rating: 4.75, equity: '65 shares', status: 'active' }
  ],
  verificationQueue: [
    { id: 'VQ-9921', name: 'Bikramjit Ghosh', phone: '+91 98301 23456', trade: 'Electrician', city: 'Kolkata', exp: '5 yrs', kyc: 'Aadhaar Verified' },
    { id: 'VQ-9922', name: 'Deepak Verma', phone: '+91 98112 34567', trade: 'Plumber', city: 'Delhi NCR', exp: '7 yrs', kyc: 'Skill India Certified' },
    { id: 'VQ-9923', name: 'Pooja Hegde', phone: '+91 98450 12345', trade: 'Appliance Repair', city: 'Bengaluru', exp: '4 yrs', kyc: 'Diploma Verified' }
  ],
  welfareLedger: [
    { date: '2026-09-10', type: 'Medical Emergency Grant', beneficiary: 'Ramesh Kumar (Bengaluru)', amount: '₹15,000', status: 'Disbursed' },
    { date: '2026-09-08', type: '0% Interest Tool Loan', beneficiary: 'Subhashish Roy (Kolkata)', amount: '₹22,000', status: 'Active' },
    { date: '2026-09-05', type: 'Child Scholastic Grant', beneficiary: 'Sunita Patil (Mumbai)', amount: '₹8,500', status: 'Disbursed' },
    { date: '2026-09-01', type: 'Accident Coverage Shield', beneficiary: 'Deepak Sharma (Delhi)', amount: '₹35,000', status: 'Disbursed' }
  ],
  grievances: [
    { id: 'GR-4401', worker: 'Bikramjit G.', category: 'Customer Misconduct', desc: 'Customer refused fair wage floor after 4 hours overtime in Howrah.', status: 'investigating', date: '2026-09-11' },
    { id: 'GR-4392', worker: 'K. Venkatesh', category: 'Platform Delay', desc: 'UPI payout reconciliation delayed by 2 hours.', status: 'resolved', date: '2026-09-09' }
  ],
  machines: [
    { id: 'MCH-101', name: 'Bosch 800W Rotary Hammer Drill & Core Bits', category: 'Heavy Drilling & Masonry', city: 'Kolkata', owner: 'Subhashish Roy', phone: '+91 98301 23456', rate: '₹0 / Free for Members', condition: 'Excellent · Serviced Sep 2026', status: 'available' },
    { id: 'MCH-102', name: 'Kärcher K3 High-Pressure Jet Washer (120 Bar)', category: 'Deep Cleaning & HVAC Wash', city: 'Kolkata', owner: 'Anirban Das', phone: '+91 98311 98765', rate: '₹50 / day Maintenance Fund', condition: 'Like New', status: 'available' },
    { id: 'MCH-103', name: 'Value Dual-Stage AC Vacuum Pump & Manifold Gauge', category: 'AC & Refrigeration', city: 'Bengaluru', owner: 'Ramesh Kumar', phone: '+91 98450 11223', rate: '₹0 / Free for Members', condition: 'Good Working Condition', status: 'available' },
    { id: 'MCH-104', name: 'Heavy Duty 800mm Precision Tile Cutter with Laser', category: 'Tile & Flooring', city: 'Delhi NCR', owner: 'Manish Sharma', phone: '+91 98112 55443', rate: '₹80 / day', condition: 'Precision Calibrated', status: 'available' },
    { id: 'MCH-105', name: 'IGBT 220A Inverter Arc Welding Machine with Helmet', category: 'Welding & Fabrication', city: 'Mumbai', owner: 'Sunita Patil', phone: '+91 98200 44556', rate: '₹100 / day', condition: 'Includes 5m copper cables', status: 'available' },
    { id: 'MCH-106', name: 'Wagner Airless High-Output Paint Spray System', category: 'Painting & Waterproofing', city: 'Hyderabad', owner: 'K. Venkatesh', phone: '+91 98490 66778', rate: '₹120 / day', condition: 'Includes 3 nozzles', status: 'available' }
  ],
  reallocations: [
    { id: 'RAL-88', origin: 'Ranchi / Asansol (Surplus)', dest: 'Kolkata Metro (High Demand AC & Elec)', stipend: '₹1,200/day + Hotel Stay', slots: '6 / 10 Filled', active: true },
    { id: 'RAL-89', origin: 'Mysuru (Surplus)', dest: 'Bengaluru IT Corridor (Deep Cleaning)', stipend: '₹950/day + Transit Allowance', slots: '4 / 8 Filled', active: true }
  ],
  chatMessages: {
    'channel-Kolkata-Electrician': [
      { sender: 'Subhashish R. (Kolkata)', text: 'Good morning comrades. Salt Lake Sector V has major power line works today.', time: '09:15 AM', incoming: true },
      { sender: 'Anirban D. (Kolkata)', text: 'Noted! I am handling commercial AC maintenance calls in New Town today.', time: '09:20 AM', incoming: true },
      { sender: 'You', text: 'Ready for emergency electrical deployments in South Kolkata.', time: '09:25 AM', incoming: false }
    ],
    'channel-Bengaluru-Plumber': [
      { sender: 'Ramesh Kumar (Bengaluru)', text: 'Plumbing brigade active in Whitefield and Koramangala today.', time: '08:45 AM', incoming: true },
      { sender: 'Suresh N.', text: 'High pressure line repairs in HSR Layout completed.', time: '09:10 AM', incoming: true }
    ],
    'channel-Delhi NCR-Carpenter': [
      { sender: 'Manish Sharma (Delhi)', text: 'Modular kitchen installation squad active in Noida Sector 62.', time: '09:00 AM', incoming: true }
    ],
    'channel-squad-101': [
      { sender: 'Coordinator Sayan', text: 'Hotel Grand Heritage requisition squad formed: 6 members assigned. Check tools.', time: 'Yesterday', incoming: true },
      { sender: 'Manish S.', text: 'All safety harnesses and drills packed and ready.', time: 'Yesterday', incoming: true }
    ],
    'channel-dm-ramesh': [
      { sender: 'Ramesh Kumar (Plumber)', text: 'Brother, do you have a spare copper pipe cutter available today?', time: '10:05 AM', incoming: true }
    ]
  }
};

/* ==========================================================================
   Tab Navigation & Initialization
   ========================================================================== */
function initTabs() {
  const buttons = document.querySelectorAll('.coop-tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.coop-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.coop-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-pane-${tabId}`);
  });

  if (tabId === 'dashboard') {
    renderRevenueChart();
  }
}

/* ==========================================================================
   Feature 1: Federation Dashboard & Chart.js
   ========================================================================== */
function renderRevenueChart() {
  const ctx = document.getElementById('coopRevenueChart');
  if (!ctx || typeof Chart === 'undefined') return;

  if (state.revenueChart) {
    state.revenueChart.destroy();
  }

  state.revenueChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        t('chart_label_worker', 'Direct to Worker (85%)'),
        t('chart_label_welfare', 'Welfare & Emergency Pool (10%)'),
        t('chart_label_ops', 'Federation Ops & Tech (5%)')
      ],
      datasets: [{
        data: [85, 10, 5],
        backgroundColor: ['#059669', '#d97706', '#0284c7'],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 14,
            font: { family: 'inherit', size: 12.5, weight: '600' },
            padding: 16
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      cutout: '68%'
    }
  });
}

function renderRoster(filterText = '') {
  const tbody = document.getElementById('coop-roster-tbody');
  if (!tbody) return;

  const filtered = state.roster.filter(w => {
    const term = filterText.toLowerCase();
    return w.name.toLowerCase().includes(term) || w.trade.toLowerCase().includes(term) || w.city.toLowerCase().includes(term);
  });

  tbody.innerHTML = filtered.map(w => `
    <tr>
      <td><strong>${w.id}</strong></td>
      <td>${w.name}</td>
      <td><span class="coop-badge coop-badge-info">${w.trade}</span></td>
      <td>${w.city}</td>
      <td>★ ${w.rating.toFixed(2)}</td>
      <td>${w.equity}</td>
      <td><span class="coop-badge ${w.status === 'active' ? 'coop-badge-success' : 'coop-badge-warning'}">${w.status === 'active' ? t('status_active', 'Active') : t('status_on_job', 'On Job')}</span></td>
      <td>
        <button class="coop-btn coop-btn-secondary coop-btn-sm" onclick="window.viewWorkerProfile('${w.id}')">View</button>
      </td>
    </tr>
  `).join('');
}

function renderVerificationQueue() {
  const tbody = document.getElementById('coop-queue-tbody');
  if (!tbody) return;

  if (state.verificationQueue.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#64748b;padding:24px;">${t('queue_empty', 'No pending applications in queue.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = state.verificationQueue.map((item, idx) => `
    <tr>
      <td><strong>${item.id}</strong></td>
      <td>${item.name}<br><small style="color:#64748b;">${item.phone}</small></td>
      <td><span class="coop-badge coop-badge-info">${item.trade}</span></td>
      <td>${item.city} (${item.exp})</td>
      <td><span class="coop-badge coop-badge-success">${item.kyc}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="coop-btn coop-btn-primary coop-btn-sm" onclick="window.approveWorkerQueue(${idx})">${t('btn_approve', 'Approve')}</button>
          <button class="coop-btn coop-btn-danger coop-btn-sm" onclick="window.rejectWorkerQueue(${idx})">${t('btn_reject', 'Reject')}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderLedger() {
  const tbody = document.getElementById('coop-ledger-tbody');
  if (!tbody) return;

  tbody.innerHTML = state.welfareLedger.map(row => `
    <tr>
      <td>${row.date}</td>
      <td><strong>${row.type}</strong></td>
      <td>${row.beneficiary}</td>
      <td style="color:#059669;font-weight:700;">${row.amount}</td>
      <td><span class="coop-badge coop-badge-success">${row.status}</span></td>
    </tr>
  `).join('');
}

/* ==========================================================================
   Feature 2: Worker Onboarding & Smart QR ID Card Generator
   ========================================================================== */
function initOnboarding() {
  const form = document.getElementById('coop-onboarding-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('onboard-name').value.trim();
    const phone = document.getElementById('onboard-phone').value.trim();
    const city = document.getElementById('onboard-city').value;
    const trade = document.getElementById('onboard-trade').value;
    const exp = document.getElementById('onboard-exp').value;

    if (!name || !phone) return;

    const memberId = `SSC-${city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Add to roster
    state.roster.unshift({
      id: memberId,
      name,
      trade,
      city,
      rating: 5.0,
      equity: '50 shares',
      status: 'active'
    });
    renderRoster();

    // Update QR Card Preview
    document.getElementById('card-member-id').textContent = memberId;
    document.getElementById('card-worker-name').textContent = name;
    document.getElementById('card-worker-trade').textContent = `${trade} · ${city}`;
    document.getElementById('card-worker-exp').textContent = `${exp} Years`;
    document.getElementById('card-worker-phone').textContent = phone;
    document.getElementById('card-worker-avatar').textContent = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    // Generate QR Code
    const qrContainer = document.getElementById('coop-qrcode-container');
    qrContainer.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: JSON.stringify({
          federation: 'SevaSathi Labor Cooperative',
          memberId,
          name,
          trade,
          city,
          status: 'VERIFIED_COOPERATIVE_MEMBER',
          authKey: 'SHA256:' + btoa(memberId + name).slice(0, 16)
        }),
        width: 130,
        height: 130,
        colorDark: '#064e3b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    document.getElementById('coop-qr-card-result').scrollIntoView({ behavior: 'smooth' });
    alert(t('msg_qr_generated', 'Smart QR ID generated successfully for member: ') + name);
  });

  const printBtn = document.getElementById('btn-print-qr-card');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   Feature 3: Fair Wage & Transparent Invoice Calculator
   ========================================================================== */
function initInvoiceCalculator() {
  const slider = document.getElementById('coop-invoice-slider');
  const numberInput = document.getElementById('coop-invoice-number');

  function updateBreakdown(val) {
    const amount = Math.max(100, Math.min(50000, Number(val) || 0));
    state.jobAmount = amount;
    if (slider) slider.value = amount;
    if (numberInput) numberInput.value = amount;

    const workerShare = Math.round(amount * 0.85);
    const welfareShare = Math.round(amount * 0.10);
    const opsShare = Math.round(amount * 0.05);
    const predatoryPlatformCut = Math.round(amount * 0.30);

    const elWorker = document.getElementById('calc-worker-share');
    const elWelfare = document.getElementById('calc-welfare-share');
    const elOps = document.getElementById('calc-ops-share');
    const elCompare = document.getElementById('calc-predatory-cut');

    if (elWorker) elWorker.textContent = `₹${workerShare.toLocaleString('en-IN')}`;
    if (elWelfare) elWelfare.textContent = `₹${welfareShare.toLocaleString('en-IN')}`;
    if (elOps) elOps.textContent = `₹${opsShare.toLocaleString('en-IN')}`;
    if (elCompare) elCompare.textContent = `₹${predatoryPlatformCut.toLocaleString('en-IN')}`;
  }

  if (slider) {
    slider.addEventListener('input', (e) => updateBreakdown(e.target.value));
  }
  if (numberInput) {
    numberInput.addEventListener('input', (e) => updateBreakdown(e.target.value));
  }

  updateBreakdown(2500);
}

/* ==========================================================================
   Feature 4: Welfare & Claims
   ========================================================================== */
function initWelfareSchemes() {
  const buttons = document.querySelectorAll('.coop-enroll-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const scheme = btn.getAttribute('data-scheme');
      const amount = prompt(`Enter requested emergency grant amount for "${scheme}" (Max ₹25,000):`, '10000');
      if (amount && Number(amount) > 0) {
        state.welfareLedger.unshift({
          date: new Date().toISOString().split('T')[0],
          type: scheme,
          beneficiary: 'You (Active Member)',
          amount: `₹${Number(amount).toLocaleString('en-IN')}`,
          status: 'Under Review'
        });
        renderLedger();
        alert(t('msg_claim_submitted', 'Your welfare claim has been submitted to the elected council.'));
      }
    });
  });
}

/* ==========================================================================
   Feature 5: Grievance Redressal
   ========================================================================== */
function renderGrievances() {
  const container = document.getElementById('coop-grievance-list');
  if (!container) return;

  container.innerHTML = state.grievances.map(g => `
    <div class="coop-card" style="margin-bottom:12px;padding:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-weight:800;font-size:14px;color:#0f172a;">#${g.id} · ${g.category}</span>
        <span class="coop-badge ${g.status === 'resolved' ? 'coop-badge-success' : 'coop-badge-warning'}">${g.status === 'resolved' ? t('status_resolved', 'Resolved') : t('status_investigating', 'In Investigation')}</span>
      </div>
      <p style="font-size:13.5px;color:#334155;margin:0 0 8px;">${g.desc}</p>
      <div style="font-size:11.5px;color:#64748b;display:flex;justify-content:space-between;">
        <span>Reported by: ${g.worker}</span>
        <span>Date: ${g.date}</span>
      </div>
    </div>
  `).join('');
}

function initGrievanceForm() {
  const form = document.getElementById('coop-grievance-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('grievance-type').value;
    const desc = document.getElementById('grievance-desc').value.trim();
    if (!desc) return;

    const ticketId = `GR-${Math.floor(5000 + Math.random() * 4000)}`;
    state.grievances.unshift({
      id: ticketId,
      worker: 'You (Member)',
      category: type,
      desc,
      status: 'investigating',
      date: new Date().toISOString().split('T')[0]
    });
    renderGrievances();
    form.reset();
    alert(t('msg_ticket_created', 'Grievance ticket created successfully. Tracking ID: #') + ticketId);
  });
}

/* ==========================================================================
   Feature 6: Machine & Equipment Sharing Pool + Inter-City Reallocation
   ========================================================================== */
function renderMachines() {
  const container = document.getElementById('coop-machines-container');
  if (!container) return;

  container.innerHTML = state.machines.map(m => `
    <div class="coop-machine-card">
      <div>
        <div class="coop-machine-header">
          <span class="coop-badge coop-badge-info">${m.category}</span>
          <span class="coop-badge ${m.status === 'available' ? 'coop-badge-success' : 'coop-badge-warning'}">
            ${m.status === 'available' ? t('status_available', 'Available') : t('status_borrowed', 'In Use')}
          </span>
        </div>
        <h4 class="coop-machine-title">${m.name}</h4>
        <div class="coop-machine-meta">
          📍 <strong>${m.city}</strong> · Owner: ${m.owner}<br>
          ⚡ ${m.condition}
        </div>
        <div class="coop-machine-rate-pill">${m.rate}</div>
      </div>
      <div>
        <button class="coop-btn coop-btn-primary coop-btn-sm" style="width:100%;" onclick="window.borrowMachine('${m.id}')">
          ${t('btn_borrow_machine', 'Request / Borrow Tool')}
        </button>
      </div>
    </div>
  `).join('');
}

function initMachineListingForm() {
  const form = document.getElementById('coop-add-machine-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('machine-input-name').value.trim();
    const category = document.getElementById('machine-input-category').value;
    const city = document.getElementById('machine-input-city').value;
    const rateVal = document.getElementById('machine-input-rate').value.trim();
    const condition = document.getElementById('machine-input-condition').value.trim();

    if (!name) return;

    const rate = Number(rateVal) > 0 ? `₹${rateVal} / day` : '₹0 / Free for Members';
    const machineId = `MCH-${Math.floor(200 + Math.random() * 800)}`;

    state.machines.unshift({
      id: machineId,
      name,
      category,
      city,
      owner: 'You (Active Member)',
      phone: '+91 98300 00000',
      rate,
      condition: condition || 'Good Working Condition',
      status: 'available'
    });

    renderMachines();
    form.reset();
    alert(t('msg_machine_listed', 'Your machine has been listed in the cooperative pool successfully!'));
  });
}

function renderReallocations() {
  const container = document.getElementById('coop-reallocation-container');
  if (!container) return;

  container.innerHTML = state.reallocations.map((r, idx) => `
    <div class="coop-card" style="border-left: 4px solid #059669; margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
        <div>
          <span class="coop-badge coop-badge-info" style="margin-bottom:6px;">${r.slots}</span>
          <h3 style="margin:0 0 4px;font-size:16px;">${r.dest}</h3>
          <p style="margin:0;font-size:13px;color:#64748b;">From: ${r.origin}</p>
        </div>
        <button class="coop-btn coop-btn-primary" onclick="window.acceptReallocation(${idx})">${t('btn_accept_realloc', 'Accept Regional Deployment')}</button>
      </div>
      <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:10px 14px;border-radius:8px;font-size:13px;color:#065f46;font-weight:700;">
        🎁 Guaranteed: ${r.stipend}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Feature 7: Multilingual Location & Profession Chat with Voice Typing
   ========================================================================== */
function initChat() {
  const citySelect = document.getElementById('coop-chat-city-select');
  const workSelect = document.getElementById('coop-chat-work-select');
  const sendBtn = document.getElementById('coop-chat-send-btn');
  const input = document.getElementById('coop-chat-input');
  const voiceBtn = document.getElementById('coop-chat-voice-btn');
  const voiceStatus = document.getElementById('coop-voice-live-status');

  function updateActiveChannelFromDropdowns() {
    if (!citySelect || !workSelect) return;
    const city = citySelect.value;
    const work = workSelect.value;
    state.chatCity = city;
    state.chatWork = work;
    state.currentChatChannel = `channel-${city}-${work}`;

    // Get localized display names from select option text
    const cityOpt = citySelect.options[citySelect.selectedIndex];
    const workOpt = workSelect.options[workSelect.selectedIndex];
    const cityText = cityOpt ? cityOpt.textContent : city;
    const workText = workOpt ? workOpt.textContent : work;

    const channelTitle = `📍 ${cityText} — ${workText}`;
    const headerTitle = document.getElementById('coop-chat-current-title');
    if (headerTitle) headerTitle.textContent = channelTitle;

    // Highlight or update sidebar channel items
    document.querySelectorAll('.coop-channel-item').forEach(item => {
      item.classList.remove('active');
    });

    if (!state.chatMessages[state.currentChatChannel]) {
      state.chatMessages[state.currentChatChannel] = [];
    }

    renderChatMessages();
  }

  if (citySelect) {
    citySelect.addEventListener('change', updateActiveChannelFromDropdowns);
  }
  if (workSelect) {
    workSelect.addEventListener('change', updateActiveChannelFromDropdowns);
  }

  // Sidebar channel item click
  const channelItems = document.querySelectorAll('.coop-channel-item');
  channelItems.forEach(item => {
    item.addEventListener('click', () => {
      channelItems.forEach(c => c.classList.remove('active'));
      item.classList.add('active');
      const channelId = item.getAttribute('data-channel');
      state.currentChatChannel = channelId;

      const channelTitle = item.querySelector('.channel-name')?.textContent || 'Cooperative Channel';
      const headerTitle = document.getElementById('coop-chat-current-title');
      if (headerTitle) headerTitle.textContent = channelTitle;
      renderChatMessages();
    });
  });

  function sendMessage() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    if (!state.chatMessages[state.currentChatChannel]) {
      state.chatMessages[state.currentChatChannel] = [];
    }

    state.chatMessages[state.currentChatChannel].push({
      sender: t('chat_sender_you', 'You'),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      incoming: false
    });

    input.value = '';
    renderChatMessages();
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  /* --------------------------------------------------------------------------
     Optimized Voice Typing Engine for Frontline / Low-Literacy Workers
     High accuracy confidence scoring, Indic acoustic tuning, and Auto-Send on
     Sentence / Speech Completion Detection
     -------------------------------------------------------------------------- */
  let recognition = null;
  let isListening = false;
  let initialInputText = '';
  let speechSilenceTimer = null;
  let autoSendTimer = null;
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

  function resetSilenceTimer() {
    if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
    speechSilenceTimer = setTimeout(() => {
      if (isListening) {
        stopVoiceTyping(true);
      }
    }, 12000); // 12s total idle safety timeout
  }

  function stopVoiceTyping(autoSend = false) {
    isListening = false;
    if (speechSilenceTimer) {
      clearTimeout(speechSilenceTimer);
      speechSilenceTimer = null;
    }
    if (autoSendTimer) {
      clearTimeout(autoSendTimer);
      autoSendTimer = null;
    }
    if (voiceBtn) {
      voiceBtn.classList.remove('listening');
      voiceBtn.setAttribute('title', t('tooltip_voice_speak', 'Click to speak without typing'));
    }
    if (voiceStatus) {
      voiceStatus.style.display = 'none';
      voiceStatus.textContent = '';
    }
    if (input && input.hasAttribute('data-orig-ph')) {
      input.placeholder = input.getAttribute('data-orig-ph');
    }
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
    if (autoSend && input && input.value.trim().length > 0) {
      sendMessage();
    }
  }

  function startVoiceTyping() {
    if (!SpeechRecognitionAPI) {
      alert(t('chat_voice_unsupported', 'Voice typing is not supported in your browser. Please type your message.'));
      return;
    }

    try {
      if (recognition) {
        try { recognition.abort(); } catch (e) {}
      }

      recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 5;

      // Configure Indic speech acoustic model dynamically based on active language
      const lang = getCooperativeLanguage();
      if (lang === 'bn') {
        recognition.lang = 'bn-IN';
      } else if (lang === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      initialInputText = input ? input.value.trim() : '';

      recognition.onstart = () => {
        isListening = true;
        resetSilenceTimer();
        if (voiceBtn) {
          voiceBtn.classList.add('listening');
          voiceBtn.setAttribute('title', t('tooltip_voice_listening', '🔴 Listening... Speak now (Click to stop & send)'));
        }
        if (voiceStatus) {
          voiceStatus.style.display = 'inline';
          voiceStatus.textContent = t('tooltip_voice_listening', '🔴 Listening... Auto-sends when done');
        }
        if (input) {
          if (!input.hasAttribute('data-orig-ph')) {
            input.setAttribute('data-orig-ph', input.placeholder);
          }
          input.placeholder = t('tooltip_voice_listening', '🎙️ Listening... बोलिए / বলুন...');
        }
      };

      recognition.onresult = (event) => {
        resetSilenceTimer();
        if (autoSendTimer) clearTimeout(autoSendTimer);

        let finalTrans = '';
        let interimTrans = '';
        let hasFinal = false;

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          // Pick candidate with highest confidence score
          let best = res[0];
          for (let j = 1; j < res.length; ++j) {
            if (res[j].confidence > best.confidence) {
              best = res[j];
            }
          }
          const chunk = best.transcript || '';
          if (res.isFinal) {
            hasFinal = true;
            finalTrans += chunk + ' ';
          } else {
            interimTrans += chunk;
          }
        }

        if (input) {
          let merged = (initialInputText ? initialInputText + ' ' : '') + finalTrans + interimTrans;
          merged = merged.replace(/\s+/g, ' ').trim();
          input.value = merged;

          // Auto-send detection: once the speaker completes a sentence/message, send automatically
          if (input.value.trim().length > 1) {
            const debounceMs = hasFinal ? 1250 : 2000;
            autoSendTimer = setTimeout(() => {
              if (isListening && input && input.value.trim().length > 1) {
                stopVoiceTyping(true);
              }
            }, debounceMs);
          }
        }
      };

      recognition.onerror = (event) => {
        console.warn('[Coop Voice Chat] Speech Recognition event:', event.error);
        if (event.error === 'not-allowed') {
          alert(t('chat_voice_permission_error', 'Microphone permission denied. Please allow microphone access to use voice typing.'));
          stopVoiceTyping(false);
        } else if (event.error !== 'no-speech') {
          stopVoiceTyping(false);
        }
      };

      recognition.onend = () => {
        if (isListening) {
          try {
            initialInputText = input ? input.value.trim() : '';
            recognition.start();
          } catch (e) {
            stopVoiceTyping(false);
          }
        } else {
          stopVoiceTyping(false);
        }
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      stopVoiceTyping(false);
    }
  }

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (isListening) {
        stopVoiceTyping(true);
      } else {
        startVoiceTyping();
      }
    });
  }

  const reportBtn = document.getElementById('coop-btn-report-chat');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      const reason = prompt('Report/Block User: Please specify the reason (Harassment, Spam, Wage Violation):');
      if (reason) {
        alert('User has been flagged and reported to the Cooperative Mediation Board.');
      }
    });
  }

  // Update chat labels when language switch event fires
  window.addEventListener('cooperative-language-changed', () => {
    updateActiveChannelFromDropdowns();
  });

  updateActiveChannelFromDropdowns();
}

function renderChatMessages() {
  const container = document.getElementById('coop-chat-messages');
  if (!container) return;

  const messages = state.chatMessages[state.currentChatChannel] || [];
  const youLabel = t('chat_sender_you', 'You');
  const lang = getCooperativeLanguage();

  container.innerHTML = messages.map(m => {
    const isYou = m.sender === 'You' || m.sender === 'আপনি' || m.sender === 'आप' || !m.incoming;
    let senderDisplay = isYou ? youLabel : m.sender;
    let textDisplay = m.text;

    if (lang !== 'en') {
      if (typeof window.translateChatText === 'function') {
        textDisplay = window.translateChatText(m.text, lang);
        if (!isYou) senderDisplay = window.translateChatText(m.sender, lang);
      } else {
        textDisplay = t(m.text, m.text);
      }
    }

    return `
      <div class="coop-chat-bubble ${m.incoming ? 'incoming' : 'outgoing'}">
        <div class="coop-chat-sender">${senderDisplay}</div>
        <div>${textDisplay}</div>
        <div class="coop-chat-time">${m.time}</div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

/* ==========================================================================
   Global Window Action Handlers
   ========================================================================== */
window.borrowMachine = function(id) {
  const machine = state.machines.find(m => m.id === id);
  if (machine) {
    alert(`${t('msg_machine_borrowed', 'Tool borrow request sent to the member owner. Pickup details shared!')}\n\nEquipment: ${machine.name}\nOwner Member: ${machine.owner}\nContact Phone: ${machine.phone}\nLocation: ${machine.city}\nRate: ${machine.rate}`);
  }
};

window.approveWorkerQueue = function(idx) {
  const item = state.verificationQueue.splice(idx, 1)[0];
  if (item) {
    state.roster.unshift({
      id: `SSC-${item.city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: item.name,
      trade: item.trade,
      city: item.city,
      rating: 5.0,
      equity: '50 shares',
      status: 'active'
    });
    renderVerificationQueue();
    renderRoster();
    alert(`Worker ${item.name} approved and inducted into Cooperative Roster!`);
  }
};

window.rejectWorkerQueue = function(idx) {
  const item = state.verificationQueue.splice(idx, 1)[0];
  if (item) {
    renderVerificationQueue();
    alert(`Application for ${item.name} declined.`);
  }
};

window.acceptReallocation = function(idx) {
  const r = state.reallocations[idx];
  alert(t('msg_realloc_accepted', 'Regional deployment accepted! Travel stipend added to your ledger.'));
};

window.viewWorkerProfile = function(id) {
  const worker = state.roster.find(w => w.id === id);
  if (worker) {
    alert(`Cooperative Member Profile:\nID: ${worker.id}\nName: ${worker.name}\nTrade: ${worker.trade}\nCity: ${worker.city}\nRating: ★${worker.rating}\nCoop Equity: ${worker.equity}`);
  }
};

/* ==========================================================================
   Feature 8: Upcoming Voice IVR & SMS Autonomous Dispatch Simulation
   ========================================================================== */
function initIvrSimulator() {
  const promptEl = document.getElementById('ivr-audio-prompt');
  const timerEl = document.getElementById('ivr-timer');
  const smsWorkerEl = document.getElementById('sms-worker-content');
  const smsCustomerEl = document.getElementById('sms-customer-content');
  const restartBtn = document.getElementById('btn-ivr-demo-call');

  let selectedJob = null;
  let selectedSlot = null;
  let seconds = 14;

  setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `${mins}:${secs}`;
  }, 1000);

  function resetCall() {
    selectedJob = null;
    selectedSlot = null;
    if (promptEl) {
      promptEl.innerHTML = `"🎙️ Welcome Subhashish (Electrician, Kolkata). We found 2 tasks near Salt Lake. Press [1] for Switchboard & Wiring in Sector V (₹450). Press [2] for AC Power Line Repair in New Town (₹600)."`;
    }
    if (smsWorkerEl) {
      smsWorkerEl.style.background = '#ffffff';
      smsWorkerEl.style.borderColor = '#cbd5e1';
    }
    if (smsCustomerEl) {
      smsCustomerEl.style.background = '#ffffff';
      smsCustomerEl.style.borderColor = '#cbd5e1';
    }
  }

  document.querySelectorAll('.btn-ivr-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => { btn.style.transform = ''; }, 150);

      if (key === '1') {
        selectedJob = { title: 'Electrical Switchboard Wiring in Salt Lake Sec V', customer: 'Priya Banerjee (+91 98310 98765)', rate: 450, area: 'Salt Lake Sec V' };
        if (promptEl) {
          promptEl.innerHTML = `<em>[Key 1 Pressed]</em> "Great! You selected <strong>${selectedJob.title}</strong> at <strong>₹${selectedJob.rate}</strong>. Now choose your time: Press [4] for Today 02:00 PM, or Press [5] for Tomorrow 10:00 AM."`;
        }
      } else if (key === '2') {
        selectedJob = { title: 'AC Power Line Repair in New Town Action Area 1', customer: 'Debashis Sen (+91 98319 12345)', rate: 600, area: 'New Town' };
        if (promptEl) {
          promptEl.innerHTML = `<em>[Key 2 Pressed]</em> "Great! You selected <strong>${selectedJob.title}</strong> at <strong>₹${selectedJob.rate}</strong>. Now choose your time: Press [4] for Today 02:00 PM, or Press [5] for Tomorrow 10:00 AM."`;
        }
      } else if (key === '3') {
        if (promptEl) {
          promptEl.innerHTML = `<em>[Key 3 Pressed]</em> "Option 3: Ceiling Fan Installation in Lake Town at ₹350. Press [1] for Sector V, Press [2] for New Town."`;
        }
      } else if (key === '4' || key === '5') {
        selectedSlot = (key === '4') ? 'Today 02:00 PM' : 'Tomorrow 10:00 AM';
        if (!selectedJob) {
          selectedJob = { title: 'Electrical Switchboard Wiring in Salt Lake Sec V', customer: 'Priya Banerjee (+91 98310 98765)', rate: 450, area: 'Salt Lake Sec V' };
        }
        if (promptEl) {
          promptEl.innerHTML = `<em>[Key ${key} Pressed]</em> "Slot selected: <strong>${selectedSlot}</strong>. Press [9] to confirm booking and dispatch dual SMS."`;
        }
      } else if (key === '9') {
        if (!selectedJob) {
          selectedJob = { title: 'Electrical Switchboard Wiring in Salt Lake Sec V', customer: 'Priya Banerjee (+91 98310 98765)', rate: 450, area: 'Salt Lake Sec V' };
        }
        if (!selectedSlot) {
          selectedSlot = 'Today 02:00 PM';
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        if (promptEl) {
          promptEl.innerHTML = `✅ <strong>[Booking Confirmed!]</strong> "Thank you Subhashish! Your booking for ${selectedJob.title} on ${selectedSlot} is confirmed. Dual SMS dispatched to you and customer. Start OTP is ${otp}. Have a great day!"`;
        }
        if (smsWorkerEl) {
          smsWorkerEl.innerHTML = `[SevaSathi] Task Booked! Job: ${selectedJob.title}. Customer: ${selectedJob.customer}. Slot: ${selectedSlot}. Agreed Rate: ₹${selectedJob.rate} (Escrow Protected). Start OTP: ${otp}.`;
          smsWorkerEl.style.background = '#f0fdf4';
          smsWorkerEl.style.borderColor = '#86efac';
        }
        if (smsCustomerEl) {
          smsCustomerEl.innerHTML = `[SevaSathi] Specialist Confirmed! Subhashish Roy (Rating: 4.9★, Certified Electrician, +91 98301 23456) will arrive at ${selectedJob.area} on ${selectedSlot}. Total: ₹${selectedJob.rate}. Share Start OTP ${otp} upon arrival.`;
          smsCustomerEl.style.background = '#f0fdf4';
          smsCustomerEl.style.borderColor = '#86efac';
        }
      }
    });
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', resetCall);
  }
}

/* ==========================================================================
   Bootstrapping
   ========================================================================== */
document.addEventListener('DOMContentLoaded', async () => {
  await initCooperativeI18n();
  initTabs();
  renderRoster();
  renderVerificationQueue();
  renderLedger();
  initOnboarding();
  initInvoiceCalculator();
  initWelfareSchemes();
  renderGrievances();
  initGrievanceForm();
  renderMachines();
  initMachineListingForm();
  renderReallocations();
  initChat();
  initIvrSimulator();

  // Search input for worker roster
  const searchInput = document.getElementById('coop-roster-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderRoster(e.target.value);
    });
  }

  // Handle re-render on language switch
  window.addEventListener('cooperative-language-changed', () => {
    renderRevenueChart();
    renderRoster();
    renderVerificationQueue();
    renderMachines();
  });
});
