import type { Metadata } from 'next'
import VinificacaoPage from '@/components/VinificacaoPage'

export const metadata: Metadata = {
  title: 'A Vinificação — Casa de Nabais',
  description:
    'Fazemos vinho com o mínimo de intervenção possível. Conhece o processo de vinificação da Casa de Nabais e a casta Loureiro como centro do nosso trabalho.',
  openGraph: {
    title: 'A Vinificação — Casa de Nabais',
    description:
      'Fazemos vinho com o mínimo de intervenção possível. Conhece o processo de vinificação da Casa de Nabais e a casta Loureiro como centro do nosso trabalho.',
  },
}

export default function Page() {
  return <VinificacaoPage />
}
