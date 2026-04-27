import type { Metadata } from 'next'
import CasaPage from '@/components/CasaPage'

export const metadata: Metadata = {
  title: 'A Casa de Nabais — Solar Minhoto no Vale do Lima',
  description:
    'Solar minhoto com séculos de história em Ponte de Lima. Cinco suítes, apartamento, piscina, spa e uma mesa com os produtos da quinta.',
  openGraph: {
    title: 'A Casa de Nabais — Solar Minhoto no Vale do Lima',
    description:
      'Solar minhoto com séculos de história em Ponte de Lima. Cinco suítes, apartamento, piscina, spa e uma mesa com os produtos da quinta.',
  },
}

export default function Page() {
  return <CasaPage />
}
