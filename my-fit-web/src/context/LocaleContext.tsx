'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, getTranslations, flags, localeNames } from '@/lib/i18n';

type Translations = ReturnType<typeof getTranslations>;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  flag: string;
  localeName: string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'myfit-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (langParam && ['pt', 'en', 'es'].includes(langParam)) {
      setLocaleState(langParam as Locale);
      localStorage.setItem(LOCALE_STORAGE_KEY, langParam);
    } else {
      // Check localStorage
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && ['pt', 'en', 'es'].includes(stored)) {
        setLocaleState(stored as Locale);
      } else {
        // Check browser language
        const browserLang = navigator.language.slice(0, 2);
        if (['pt', 'en', 'es'].includes(browserLang)) {
          setLocaleState(browserLang as Locale);
        }
      }
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLocale);
    window.history.replaceState({}, '', url.toString());
  };

  const value: LocaleContextType = {
    locale,
    setLocale,
    t: getTranslations(locale),
    flag: flags[locale],
    localeName: localeNames[locale],
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LocaleContext.Provider value={{ ...value, t: getTranslations('pt') }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
