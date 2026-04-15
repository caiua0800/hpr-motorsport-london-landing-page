'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/src/translations';

interface LanguageCtx {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
}

const Ctx = createContext<LanguageCtx>({
  lang: 'en',
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('hpr-lang') as Language | null;
    if (stored === 'en' || stored === 'pt') setLangState(stored);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('hpr-lang', l);
  };

  const toggle = () => setLang(lang === 'en' ? 'pt' : 'en');

  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
