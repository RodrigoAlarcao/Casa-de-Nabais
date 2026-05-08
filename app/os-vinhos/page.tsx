import type { Metadata } from 'next'
import VinhosPage from '@/components/VinhosPage'

export const metadata: Metadata = {
  title: 'Os nossos vinhos — Casa de Nabais',
  description:
    'Vinha do Pomar e Loureiro — vinhos produzidos exclusivamente com uva própria, em pequena escala, nos solos graníticos e xistosos do Vale do Lima.',
  openGraph: {
    title: 'Os nossos vinhos — Casa de Nabais',
    description:
      'Vinha do Pomar e Loureiro — vinhos produzidos exclusivamente com uva própria, em pequena escala, nos solos graníticos e xistosos do Vale do Lima.',
  },
}

export default function Page() {
  return <VinhosPage />
}
