import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FicarNaCasaPage from '@/components/FicarNaCasaPage'

export const metadata: Metadata = {
  title: 'Ficar na Casa — Casa de Nabais',
  description: 'Estadias num solar minhoto com séculos de história. 5 suítes e 1 apartamento no coração do Vale do Lima, Ponte de Lima.',
}

export default function Page() {
  return (
    <>
      <Navbar />
      <FicarNaCasaPage />
    </>
  )
}
