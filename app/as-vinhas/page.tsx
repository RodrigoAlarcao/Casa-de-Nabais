import type { Metadata } from 'next'
import VinhasPage from '@/components/VinhasPage'

export const metadata: Metadata = {
  title: 'As Vinhas — Casa de Nabais',
  description:
    'Conheça as vinhas da Casa de Nabais: o solo como origem, a viticultura integrada e as parcelas únicas que dão vida aos nossos vinhos no Vale do Lima.',
  openGraph: {
    title: 'As Vinhas — Casa de Nabais',
    description:
      'Conheça as vinhas da Casa de Nabais: o solo como origem, a viticultura integrada e as parcelas únicas que dão vida aos nossos vinhos no Vale do Lima.',
  },
}

export default function Page() {
  return <VinhasPage />
}
