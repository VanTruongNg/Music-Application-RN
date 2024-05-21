import i18next, {LanguageDetectorAsyncModule} from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./locales";
import { getState } from "../redux";

const { language } = getState('app');

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next.use(languageDetector).use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: 'vi',
    resources: resources,
    lng: 'vi',
    ns: ['common'],
    defaultNS: 'common',
    debug: false,

    cache: {
        enabled: true,
    },

    interpolation: {
        escapeValue: false
    },
})

export default i18next