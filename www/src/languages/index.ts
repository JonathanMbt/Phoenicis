import i18next, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr';
import en from './en';
import es from './es';

export const initI18n = async (): Promise<TFunction> => {
  return i18next.use(initReactI18next).init({
    lng: 'fr',
    fallbackLng: 'en',
    resources: { fr, en, es } as const,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
};
