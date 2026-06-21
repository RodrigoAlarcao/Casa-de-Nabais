'use client'

import { useLang } from '@/lib/i18n'
import { getPrivacyDoc } from '@/lib/legal-pages'
import LegalPage from '@/components/LegalPage'

// O GA só existe se houver ID configurado; a secção de transferências para
// fora da UE só aparece nesse caso.
const GA_ENABLED = Boolean(process.env.NEXT_PUBLIC_GA_ID)

export default function PrivacyPage() {
  const { lang } = useLang()
  return <LegalPage doc={getPrivacyDoc(lang, GA_ENABLED)} />
}
