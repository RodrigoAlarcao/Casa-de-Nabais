'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Consent = 'accepted' | 'rejected' | null

const STORAGE_KEY = 'casa-nabais-cookie-consent'

interface ConsentContextValue {
  /** Decisão persistida do utilizador. `null` = ainda não decidiu. */
  consent: Consent
  /** Banner visível (por decidir ou reaberto via "Definições de cookies"). */
  bannerOpen: boolean
  accept: () => void
  reject: () => void
  /** Reabre o banner para o utilizador rever/alterar a escolha. */
  openPreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  bannerOpen: false,
  accept: () => {},
  reject: () => {},
  openPreferences: () => {},
})

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent>(null)
  const [bannerOpen, setBannerOpen] = useState(false)

  // Lê a escolha guardada apenas no cliente, depois da hidratação,
  // para não causar mismatch de SSR/export estático.
  useEffect(() => {
    let stored: Consent = null
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw === 'accepted' || raw === 'rejected') stored = raw
    } catch {
      /* localStorage indisponível — trata como sem decisão */
    }
    setConsentState(stored)
    setBannerOpen(stored === null)
  }, [])

  function persist(value: Exclude<Consent, null>) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignora falhas de escrita (modo privado, etc.) */
    }
    setConsentState(value)
    setBannerOpen(false)
  }

  const accept = () => persist('accepted')
  const reject = () => persist('rejected')
  const openPreferences = () => setBannerOpen(true)

  return (
    <ConsentContext.Provider value={{ consent, bannerOpen, accept, reject, openPreferences }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  return useContext(ConsentContext)
}
