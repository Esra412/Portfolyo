let translations = {};

async function loadTranslations(lang) {
  const response = await fetch(`lang/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Translations could not be loaded: ${response.status}`);
  }

  return response.json();
}

function updateActiveLanguageButton(lang) {
  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
}

async function applyLanguage(lang) {
  const safeLang = ['fi', 'en', 'tr'].includes(lang) ? lang : 'fi';
  translations = await loadTranslations(safeLang);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[key]) element.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[key]) element.placeholder = translations[key];
  });

  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    const key = element.dataset.i18nTitle;
    if (translations[key]) element.title = translations[key];
  });

  localStorage.setItem('language', safeLang);
  document.documentElement.lang = safeLang;
  updateActiveLanguageButton(safeLang);
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: safeLang } }));
}

function t(key) {
  return translations[key] || key;
}

function setupLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await applyLanguage(button.dataset.lang);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

async function loadLanguage() {
  const savedLang = localStorage.getItem('language') || 'fi';
  setupLanguageButtons();
  await applyLanguage(savedLang);
}

document.addEventListener('DOMContentLoaded', () => {
  loadLanguage().catch((error) => {
    console.error(error);
  });
});

window.applyLanguage = applyLanguage;
window.t = t;
