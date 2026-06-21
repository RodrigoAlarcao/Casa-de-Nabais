'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useConsent } from '@/lib/consent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const { consent } = useConsent()
  const enabled = Boolean(GA_ID) && consent === 'accepted'

  // Honra a revogação: se o utilizador rejeitar depois de já ter aceitado,
  // o opt-out oficial do GA impede qualquer tracking até novo opt-in.
  useEffect(() => {
    if (typeof window === 'undefined' || !GA_ID) return
    ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !enabled
  }, [enabled])

  // Sem ID configurado ou sem consentimento explícito → não carrega nada.
  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
