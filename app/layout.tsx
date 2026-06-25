import type { Metadata } from 'next'
import { Joan } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LegalFooter from '@/components/LegalFooter'
import ClientProviders from '@/components/ClientProviders'

const joan = Joan({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Casa de Nabais — Vinho e Enoturismo no Vale do Lima',
  description:
    'Quinta histórica em Ponte de Lima. Produção própria de vinho Loureiro, enoturismo intimista e estadias em solar minhoto com séculos de história.',
  metadataBase: new URL('https://casadenabais.com'),
  openGraph: {
    title: 'Casa de Nabais — Vinho e Enoturismo no Vale do Lima',
    description:
      'Quinta histórica em Ponte de Lima. Produção própria de vinho Loureiro, enoturismo intimista e estadias em solar minhoto com séculos de história.',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={joan.variable}>
        <ClientProviders>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <LegalFooter />
          </SmoothScroll>
        </ClientProviders>
      </body>
    </html>
  )
}
