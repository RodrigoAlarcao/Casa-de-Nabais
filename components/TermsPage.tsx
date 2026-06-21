'use client'

import { useLang } from '@/lib/i18n'
import { getTermsDoc } from '@/lib/legal-pages'
import LegalPage from '@/components/LegalPage'

export default function TermsPage() {
  const { lang } = useLang()
  return <LegalPage doc={getTermsDoc(lang)} />
}
