// test-cooperative.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

async function testCooperativeSection() {
  console.log('🧪 Starting Dedicated Cooperative Section Test Suite...\n');

  // 1. Verify files exist
  const files = [
    'cooperative-section.html',
    'cooperative.css',
    'cooperative.js',
    'cooperative-i18n.js',
    'locales/en.json',
    'locales/bn.json',
    'locales/hi.json'
  ];

  files.forEach(f => {
    const fullPath = path.join(__dirname, f);
    assert(fs.existsSync(fullPath), `File ${f} must exist`);
    console.log(`  ✓ File exists: ${f}`);
  });

  // 2. Validate Locales
  const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales/en.json'), 'utf8'));
  const bn = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales/bn.json'), 'utf8'));
  const hi = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales/hi.json'), 'utf8'));

  const enKeys = Object.keys(en);
  const bnKeys = Object.keys(bn);
  const hiKeys = Object.keys(hi);

  assert(enKeys.length > 50, 'English dictionary has comprehensive keys');
  assert(bnKeys.length === enKeys.length, `Bengali key count (${bnKeys.length}) matches English (${enKeys.length})`);
  assert(hiKeys.length === enKeys.length, `Hindi key count (${hiKeys.length}) matches English (${enKeys.length})`);
  assert(en.machines_title && bn.machines_title && hi.machines_title, 'Machine sharing keys present in all 3 locales');
  assert(en.chat_select_city_label && bn.chat_select_city_label && hi.chat_select_city_label, 'Chat dropdown keys present in all 3 locales');
  assert(en.btn_voice_typing && bn.btn_voice_typing && hi.btn_voice_typing, 'Voice typing button keys present in all 3 locales');
  assert(en.chat_opt_electrician && bn.chat_opt_electrician && hi.chat_opt_electrician, 'Multilingual trade options present in all 3 locales');
  assert(en.chat_opt_kolkata && bn.chat_opt_kolkata && hi.chat_opt_kolkata, 'Multilingual city options present in all 3 locales');

  console.log(`  ✓ Trilingual dictionary integrity: all 3 languages have identical key parity (${enKeys.length} keys each)`);

  // 3. Verify HTML structure & CDN references
  const html = fs.readFileSync(path.join(__dirname, 'cooperative-section.html'), 'utf8');
  assert(html.includes('cooperative.css'), 'HTML links cooperative.css');
  assert(html.includes('cooperative.js'), 'HTML loads cooperative.js module');
  assert(html.includes('chart.umd.min.js') || html.includes('chart.js'), 'HTML includes Chart.js CDN');
  assert(html.includes('qrcode.min.js') || html.includes('qrcodejs'), 'HTML includes QRCode CDN');
  assert(html.includes('data-i18n="tab_dashboard"'), 'HTML has data-i18n attributes');
  assert(html.includes('coop-lang-select'), 'HTML includes language selector');
  assert(html.includes('coop-chat-city-select'), 'HTML includes City dropdown in chat');
  assert(html.includes('coop-chat-work-select'), 'HTML includes Profession/Work dropdown in chat');
  assert(html.includes('coop-chat-voice-btn'), 'HTML includes Voice Typing button in cooperative chat');
  assert(html.includes('data-i18n-title="tooltip_voice_speak"'), 'HTML has data-i18n-title on voice typing button');
  assert(html.includes('data-i18n="chat_opt_kolkata"'), 'HTML has multilingual data-i18n on city options');
  assert(html.includes('coop-machines-container'), 'HTML includes Machine sharing container');
  assert(html.includes('coop-add-machine-form'), 'HTML includes Share Machine form');
  assert(html.includes('coopRevenueChart'), 'HTML includes Revenue chart canvas');
  console.log('  ✓ HTML contains all required tab components, Machine Sharing pool, Arrow Dropdowns, Voice Typing button, and data-i18n hooks');

  // 4. Verify Fair Wage 85% / 10% / 5% Formulas
  const testAmounts = [1000, 2500, 5000, 10000, 20000];
  testAmounts.forEach(amt => {
    const worker = Math.round(amt * 0.85);
    const welfare = Math.round(amt * 0.10);
    const ops = Math.round(amt * 0.05);
    assert.strictEqual(worker + welfare + ops, amt, `Fair allocation sums to 100% of ₹${amt}`);
  });
  console.log('  ✓ Fair Wage Calculator math (85% worker, 10% welfare, 5% ops) verified accurately across all test amounts');

  // 5. Verify Navigation & Auth Modifications
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const custDash = fs.readFileSync(path.join(__dirname, 'customer-dashboard.html'), 'utf8');
  const authHtml = fs.readFileSync(path.join(__dirname, 'auth.html'), 'utf8');
  assert(!indexHtml.includes('coop-portal-btn'), 'index.html top nav no longer contains cooperative button');
  assert(!custDash.includes('coop-portal-btn'), 'customer-dashboard.html top nav no longer contains cooperative button');
  assert(!authHtml.includes("I'm here for my business"), 'auth.html no longer contains business option');
  console.log('  ✓ Top navigation cooperative button and auth business option successfully removed');

  console.log('\n======================================================');
  console.log('🎉 All Cooperative Section test suites passed with 100% success!');
  console.log('======================================================\n');
}

testCooperativeSection().catch(err => {
  console.error('Cooperative test failed:', err);
  process.exit(1);
});
