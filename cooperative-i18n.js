/**
 * SevaSathi Cooperative — Isolated Trilingual (en, bn, hi) Internationalization Engine
 * Handles dynamic JSON locale loading, font switching, and DOM translation with fallback.
 */

const STORAGE_KEY = 'seva_coop_lang';
let currentLang = 'en';
let translations = {};

// Fallback embedded cache in case JSON fetch fails in any environment
const FALLBACK_CACHE = {
  en: {
    coop_title: "SevaSathi Cooperative Federation",
    coop_subtitle: "Democratically owned & operated by frontline service professionals",
    nav_back: "← Back to SevaSathi",
    coop_badge: "Worker Cooperative Federation",
    tab_dashboard: "Federation Dashboard",
    tab_onboarding: "Worker Verification & QR ID",
    tab_wages: "Fair Wages & Invoice Breakdown",
    tab_welfare: "Welfare & Insurance",
    tab_grievances: "Grievance Redressal",
    tab_reallocation: "Resource Sharing",
    tab_chat: "Cooperative Chat"
  }
};

/**
 * Get current active cooperative language
 */
export function getCooperativeLanguage() {
  return currentLang;
}

/**
 * Translate key
 */
export function t(key, fallback = '') {
  if (translations[key]) return translations[key];
  if (FALLBACK_CACHE[currentLang] && FALLBACK_CACHE[currentLang][key]) return FALLBACK_CACHE[currentLang][key];
  return fallback || key;
}

/**
 * Load translation dictionary
 */
export async function loadLocale(lang) {
  try {
    const res = await fetch(`/locales/${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    translations = await res.json();
  } catch (err) {
    console.warn(`[Coop-i18n] Could not fetch /locales/${lang}.json, using fallback dictionary:`, err.message);
    translations = FALLBACK_CACHE[lang] || FALLBACK_CACHE.en || {};
  }
}

/**
 * Apply translations to DOM elements
 */
export function applyTranslations() {
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[key]) {
      el.textContent = translations[key];
    }
  });

  // Update data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && translations[key]) {
      el.placeholder = translations[key];
    }
  });

  // Update data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key && translations[key]) {
      el.title = translations[key];
    }
  });

  // Deep DOM node translation for un-annotated elements in cooperative section
  if (window.SevaSathiI18n && typeof window.SevaSathiI18n.applyTranslations === 'function') {
    window.SevaSathiI18n.applyTranslations(document.body);
  }

  // Adjust font styling based on language
  const root = document.documentElement;
  root.setAttribute('lang', currentLang);
  document.body.classList.remove('lang-en', 'lang-bn', 'lang-hi');
  document.body.classList.add(`lang-${currentLang}`);

  // Update active select value in header
  const select = document.getElementById('coop-lang-select');
  if (select && select.value !== currentLang) {
    select.value = currentLang;
  }
}

/**
 * Switch language and re-render
 */
export async function setCooperativeLanguage(lang) {
  if (!['en', 'bn', 'hi'].includes(lang)) lang = 'en';
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
    localStorage.setItem('sevasathi_lang', lang);
  } catch (e) {
    // localStorage may be disabled
  }
  await loadLocale(lang);

  if (window.SevaSathiI18n && typeof window.SevaSathiI18n.setLanguage === 'function') {
    window.SevaSathiI18n.setLanguage(lang, true);
  }

  applyTranslations();

  window.dispatchEvent(new CustomEvent('cooperative-language-changed', {
    detail: { lang, translations }
  }));
}

/**
 * Initialize Cooperative i18n
 */
export async function initCooperativeI18n() {
  let saved = 'en';
  try {
    saved = localStorage.getItem('sevasathi_lang') || localStorage.getItem(STORAGE_KEY) || 'en';
  } catch (e) {}

  if (!['en', 'bn', 'hi'].includes(saved)) saved = 'en';
  
  const select = document.getElementById('coop-lang-select');
  if (select) {
    select.value = saved;
    select.addEventListener('change', (e) => {
      setCooperativeLanguage(e.target.value);
    });
  }

  await setCooperativeLanguage(saved);
}
