'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import SectionExplore from './SectionExplore'

gsap.registerPlugin(ScrollTrigger)

const wines = [
  {
    slug: 'vinha-do-pomar',
    brand: 'Casa de Nabais',
    name: 'Vinha do Pomar',
    intro: 'Provém da seleção de uma parcela que procura uma leitura mais profunda do Loureiro. Maior estrutura, textura e capacidade de evolução.',
    image: '/images/homepage/vinhos/vinha-do-pomar-context.webp',
    buyUrl: null,
  },
  {
    slug: 'loureiro',
    brand: 'Casa de Nabais',
    name: 'Loureiro',
    intro: 'Nasce num contexto atlântico onde a frescura e a precisão definem o estilo. Uma interpretação direta da casta, focada na pureza aromática e tensão.',
    image: '/images/homepage/vinhos/loureiro-context.webp',
    buyUrl: null,
  },
]

export default function VinhosPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal-vinhos-page', {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-cn-bg">

      {/* ── BACK LINK ── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-40"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(3,29,29,0.50)',
          }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Voltar
        </Link>
      </div>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <section ref={sectionRef} className="pt-12 pb-20 md:pt-14 md:pb-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">

          {/* Cabeçalho centrado */}
          <div className="text-center mb-14 md:mb-16 max-w-[640px] mx-auto">
            <h1
              className="reveal-vinhos-page font-display uppercase text-cn-text mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                whiteSpace: 'nowrap',
                lineHeight: 1.0,
                letterSpacing: '0.04em',
              }}
            >
              Os nossos vinhos
            </h1>
            <p
              className="reveal-vinhos-page font-body text-cn-text-muted"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.4 }}
            >
              Produzidos exclusivamente com uva própria, em pequena escala, são vinhos frescos, gastronómicos e pensados para evoluir, revelando o caráter dos solos graníticos e xistosos onde nascem.
            </p>
          </div>

          {/* Cards — 2 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {wines.map((wine) => (
              <div key={wine.slug} className="reveal-vinhos-page flex flex-col">

                {/* Imagem */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '4/5', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                >
                  <div className="absolute inset-6">
                    <Image
                      src={wine.image}
                      alt={wine.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Nome */}
                <div className="text-center pt-8 pb-5">
                  <p
                    className="font-display uppercase tracking-[0.18em] text-cn-text-muted mb-1"
                    style={{ fontSize: '11px' }}
                  >
                    {wine.brand}
                  </p>
                  <h2
                    className="font-display uppercase text-cn-text mb-4"
                    style={{
                      fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.05,
                    }}
                  >
                    {wine.name}
                  </h2>
                  <p className="font-body text-cn-text-muted mx-auto" style={{ fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)', lineHeight: 1.6 }}>
                    {wine.intro}
                  </p>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/os-vinhos/${wine.slug}`}
                    className="flex items-center justify-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] py-4 transition-colors duration-200"
                    style={{
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                      borderRadius: '8px',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-text)'
                      ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-bg)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                      ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'
                    }}
                  >
                    Detalhes
                    <ArrowRight size={10} strokeWidth={1.5} />
                  </Link>
                  <button
                    disabled={!wine.buyUrl}
                    title={wine.buyUrl ? undefined : 'Em breve'}
                    className="flex items-center justify-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] py-4 transition-colors duration-200"
                    style={{
                      backgroundColor: 'var(--color-green)',
                      color: '#FAE6C1',
                      opacity: wine.buyUrl ? 1 : 0.55,
                      cursor: wine.buyUrl ? 'pointer' : 'not-allowed',
                      borderRadius: '8px',
                    }}
                  >
                    Comprar
                    <ArrowRight size={10} strokeWidth={1.5} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── EXPLORE TAMBÉM ── */}
      <SectionExplore excludeHref="/os-vinhos" />

    </div>
  )
}
