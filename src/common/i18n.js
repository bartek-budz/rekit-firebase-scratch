import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { getQueryParameter } from './env.js';

const DEFAULT_LANGUAGE_CODE = 'en-GB'

export const TRANSLATION_NAMESPACES = ['common', 'auth', 'demo']

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
    debug: true, // todo: make false on prod
    lng: getCurrentLanguageConfig().languageCode,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    whitelist: AVAILABLE_LANGUAGES.map(langConfig => langConfig.languageCode),    
    ns: TRANSLATION_NAMESPACES,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Backend options
    backend: {
      loadPath: '/lang/{{lng}}/{{ns}}.json',
    },
    // LanguageDetector options
    order: ['querystring', 'cookie', 'localStorage', 'navigator'],
    lookupQuerystring: QUERY_PARAM_LANG,
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLang',
    caches: ['localStorage', 'cookie'],
    checkWhitelist: true,
  });

export function changeLanguageAndGetConfig(languageCode) {
  const langConfig = getLanguageConfigOrDefault(languageCode)
  i18n.changeLanguage(langConfig.languageCode)
  return langConfig
}

export function getCurrentLanguageConfig() {  
  const langCode = (i18n && i18n.language)
    || getLangCodeFromQueryParam()
    || DEFAULT_LANGUAGE_CODE;
  return getLanguageConfigOrDefault(langCode)  
}

function getLangCodeFromQueryParam() {
  const queryParameter = getQueryParameter(QUERY_PARAM_LANG)  
  const langConfig = queryParameter && AVAILABLE_LANGUAGES.find(element => element.languageCode === queryParameter || element.firebaseCode === queryParameter)
  return langConfig && langConfig.languageCode
}

export function getLanguageConfig(languageCode) {
  return AVAILABLE_LANGUAGES.find(element => element.languageCode === languageCode)  
}

export function getLanguageCodeOrDefault(candidate) {
  const langConfig = getLanguageConfig(candidate)
  return langConfig ? langConfig.languageCode : DEFAULT_LANGUAGE_CODE;
}

export function getLanguageConfigOrDefault(languageCode) {
  const langConfig = getLanguageConfig(languageCode)
  return langConfig ? langConfig : getLanguageConfig(DEFAULT_LANGUAGE_CODE);
}

export function firebaseCodeToLanguageCode(firebaseCode) {
  const langConfig = AVAILABLE_LANGUAGES.find(element => element.firebaseCode === firebaseCode) || getCurrentLanguageConfig()
  return langConfig.languageCode
}