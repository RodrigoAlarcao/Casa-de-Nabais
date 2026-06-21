import type { Metadata } from 'next'
import TermsPage from '@/components/TermsPage'

export const metadata: Metadata = {
  title: 'Termos e Condições — Casa de Nabais',
  description:
    'Termos e condições de acesso e utilização do website da Casa de Nabais.',
}

export default function Page() {
  return <TermsPage />
}
