'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { pt, en, type Translations } from './translations'

export type Lang = 'pt' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextValue>({
  lang: 'pt',
  setLang: () => {},
  t: pt,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')
  return (
    <LangContext.Provider value={{ lang, setLang, t: lang === 'pt' ? pt : en }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
