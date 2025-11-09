import React from 'react';
import { useIntl } from 'react-intl';
import { useI18n } from './I18nProvider';
import type { SupportedLocale } from './index';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const intl = useIntl();
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLocale);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label 
        htmlFor="language-select" 
        className="text-sm font-medium text-gray-700"
      >
        {intl.formatMessage({ id: 'language.switch' })}:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
        className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="en">
          {intl.formatMessage({ id: 'language.english' })}
        </option>
        <option value="mr">
          {intl.formatMessage({ id: 'language.marathi' })}
        </option>
      </select>
    </div>
  );
};