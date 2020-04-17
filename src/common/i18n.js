import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const DEFAULT_LANGUAGE_CODE = 'en-GB'

export const TRANSLATION_NAMESPACES = ['auth', 'examples', 'common']

// todo: move this config to json etc.
export const AVAILABLE_LANGUAGES = [
  {
    name: 'English',
    languageCode: 'en-GB',
    firebaseCode: 'en',
    flagCode: 'gb'
  },
  {
    name: 'Polski',
    languageCode: 'pl-PL',
    firebaseCode: 'pl',
    flagCode: 'pl'
  }  
]

export const QUERY_PARAM_LANG = 'lang'

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
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    debug: true,

    backend: {
      loadPath: '/lang/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    ns: TRANSLATION_NAMESPACES,

    lookupQuerystring: QUERY_PARAM_LANG,
  });

export function changeLanguageAndGetConfig(languageCode) {
  const langConfig = getLanguageConfigOrDefault(languageCode)
  i18n.changeLanguage(langConfig.languageCode)
  return langConfig
}

export function getCurrentLanguageConfig() { 
  const langCode = i18n.language || window.localStorage.i18nextLng || '';
  return getLanguageConfigOrDefault(langCode)  
}

export function getLanguageConfig(languageCode) {
  return AVAILABLE_LANGUAGES.find(element => element.languageCode === languageCode)  
}

export function getLanguageConfigOrDefault(languageCode) {
  const langConfig = getLanguageConfig(languageCode)
  return langConfig !== undefined ? langConfig : getLanguageConfig(DEFAULT_LANGUAGE_CODE);
}

export function firebaseCodeToLanguageCode(firebaseCode) {
  const langConfig = AVAILABLE_LANGUAGES.find(element => element.firebaseCode === firebaseCode) || getCurrentLanguageConfig()
  return langConfig.languageCode
}