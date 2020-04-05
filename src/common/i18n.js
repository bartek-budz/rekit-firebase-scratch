import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    backend: {
      loadPath: '/lang/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;

export function changeLanguage(key) {
  i18n.changeLanguage(key)
}

export function getCurrentLanguage() { 
  return i18n.language || window.localStorage.i18nextLng || '';
}

export const AVAILABLE_LANGUAGES = [
  {
    name: 'English',
    languageCode: 'en',
    flagCode: 'gb'
  },
  {
    name: 'Polski',
    languageCode: 'pl',
    flagCode: 'pl'
  }  
]