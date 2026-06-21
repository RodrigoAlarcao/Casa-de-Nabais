import type { Metadata } from 'next'
import PrivacyPage from '@/components/PrivacyPage'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Casa de Nabais',
  description:
    'Como a Casa de Nabais trata os dados pessoais recolhidos através do site, incluindo os formulários de contacto, em conformidade com o RGPD.',
}

export default function Page() {
  return <PrivacyPage />
}
