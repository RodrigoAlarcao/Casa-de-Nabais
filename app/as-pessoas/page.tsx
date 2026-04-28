import type { Metadata } from 'next'
import PessoasPage from '@/components/PessoasPage'

export const metadata: Metadata = {
  title: 'As Pessoas de Nabais — Casa de Nabais',
  description:
    'Conheça as pessoas que diariamente asseguram a qualidade dos vinhos, do serviço aos hóspedes e dos produtos da horta e do pomar da Casa de Nabais.',
  openGraph: {
    title: 'As Pessoas de Nabais — Casa de Nabais',
    description:
      'Conheça as pessoas que diariamente asseguram a qualidade dos vinhos, do serviço aos hóspedes e dos produtos da horta e do pomar da Casa de Nabais.',
  },
}

export default function Page() {
  return <PessoasPage />
}
