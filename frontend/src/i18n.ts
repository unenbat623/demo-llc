import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import mnTranslation from './locales/mn/translation.json';
import enTranslation from './locales/en/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  mn: {
    translation: mnTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'mn', // Default to Mongolian
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
