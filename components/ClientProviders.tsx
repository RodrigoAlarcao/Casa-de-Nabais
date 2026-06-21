'use client'

import { LangProvider } from '@/lib/i18n'
import { ConsentProvider } from '@/lib/consent'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ConsentProvider>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
      </ConsentProvider>
    </LangProvider>
  )
}
