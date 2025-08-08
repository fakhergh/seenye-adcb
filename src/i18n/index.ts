import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE_STORAGE_KEY } from '@/constants/config';
import { storage } from '@/core/lib/storage';
import ar from '@/i18n/locales/ar.json';
import en from '@/i18n/locales/en.json';

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (language: 'en' | 'ar' | string | null) => void) => {
    const language = storage.getString(LANGUAGE_STORAGE_KEY);

    callback(language || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    resources: {
      en,
      ar,
    },
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
