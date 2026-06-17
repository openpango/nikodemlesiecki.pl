'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Language = 'en' | 'pl';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('lang') as Language | null;
    if (stored === 'en' || stored === 'pl') {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  // Prevent flash of wrong language
  if (!mounted) {
    return <LanguageContext.Provider value={{ lang: 'en', setLang }}>{children}</LanguageContext.Provider>;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { lang } = useLanguage();

  const t = useCallback(
    (key: string, translations: Record<string, Record<string, string>>) => {
      return translations[lang]?.[key] || translations['en']?.[key] || key;
    },
    [lang]
  );

  const bilingual = useCallback(
    <T,>(obj: { en: T; pl: T } | undefined | null, fallback?: T): T => {
      if (!obj) return fallback as T;
      return obj[lang] ?? obj['en'] ?? (fallback as T);
    },
    [lang]
  );

  return { lang, t, bilingual };
}

export default LanguageContext;
