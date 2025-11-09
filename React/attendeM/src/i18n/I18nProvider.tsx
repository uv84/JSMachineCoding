import React, { createContext, useContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { messages, getStoredLocale, setStoredLocale } from './index';
import type { SupportedLocale } from './index';

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => getStoredLocale());

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale="en"
      >
        <div>{children}</div>
      </IntlProvider>
    </I18nContext.Provider>
  );
};