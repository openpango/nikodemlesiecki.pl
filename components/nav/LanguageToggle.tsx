'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="fixed right-6 top-8 z-50 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase"
      role="radiogroup"
      aria-label="Language selection"
    >
      <button
        role="radio"
        aria-checked={lang === 'en'}
        onClick={() => setLang('en')}
        className={`transition-colors duration-200 ${
          lang === 'en'
            ? 'text-red-primary'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        EN
      </button>
      <span className="text-border-default select-none">/</span>
      <button
        role="radio"
        aria-checked={lang === 'pl'}
        onClick={() => setLang('pl')}
        className={`transition-colors duration-200 ${
          lang === 'pl'
            ? 'text-red-primary'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        PL
      </button>
    </div>
  );
}
