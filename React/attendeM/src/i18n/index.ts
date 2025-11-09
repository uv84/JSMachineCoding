import { en } from './locales/en';
import { mr } from './locales/mr';

export const messages = {
  en,
  mr,
};

export const supportedLocales = ['en', 'mr'] as const;
export type SupportedLocale = typeof supportedLocales[number];

export const getDefaultLocale = (): SupportedLocale => {
  const browserLocale = navigator.language.split('-')[0];
  return supportedLocales.includes(browserLocale as SupportedLocale) 
    ? (browserLocale as SupportedLocale) 
    : 'en';
};

export const getStoredLocale = (): SupportedLocale => {
  const stored = localStorage.getItem('locale');
  return stored && supportedLocales.includes(stored as SupportedLocale)
    ? (stored as SupportedLocale)
    : getDefaultLocale();
};

export const setStoredLocale = (locale: SupportedLocale): void => {
  localStorage.setItem('locale', locale);
};