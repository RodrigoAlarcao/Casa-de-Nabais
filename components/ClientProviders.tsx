'use client'

import { LangProvider } from '@/lib/i18n'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>
}
