'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import SectionExplore from './SectionExplore'

gsap.registerPlugin(ScrollTrigger)

const INTRO_TEXT =
  'Produzidos exclusivamente com uva própria, em pequena escala, os vinhos da Casa de Nabais são frescos, gastronómicos e pensados para evoluir. Revelam o caráter dos solos graníticos e xistosos onde nascem, e a identidade da casta Loureiro cultivada no Vale do Lima.'

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

  const mobileHeroRef = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)

  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      if (mobileHeroImgRef.current && mobileHeroRef.current && window.innerWidth < 1024) {
        gsap.to(mobileHeroImgRef.current, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (panoramicImgRef.current && panoramicContainerRef.current) {
        gsap.to(panoramicImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: panoramicContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      gsap.from('.reveal-vinhos-page', {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-cn-bg">

      {/* ══════════════════════════════════════
          MOBILE HERO
      ══════════════════════════════════════ */}
      <div ref={mobileHeroRef} className="relative lg:hidden" style={{ height: 'calc(100svh - 72px)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={mobileHeroImgRef}
            className="absolute will-change-transform"
            style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
          >
            <Image
              src="/images/homepage/vinhos/section-01.webp"
              alt="Os Vinhos da Casa de Nabais"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 22%, rgba(3,29,29,0.25) 40%, rgba(3,29,29,0.82) 58%, rgba(3,29,29,0.97) 72%, #031D1D 84%)',
            zIndex: 1,
          }}
        />

        <Link
          href="/"
          className="absolute top-8 left-6 inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-50"
          style={{
            zIndex: 10,
            fontFamily: 'var(--font-display), serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(250,230,193,0.80)',
          }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Voltar
        </Link>

        <div
          className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-center text-center"
          style={{ zIndex: 2 }}
        >
          <h1
            className="font-display uppercase mb-7"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.05em',
              color: '#FAE6C1',
              textShadow: '0 2px 28px rgba(3,29,29,0.95)',
            }}
          >
            Os Vinhos
          </h1>

          <p
            className="font-body mb-8 w-full"
            style={{
              fontSize: 'clamp(0.8125rem, 3.5vw, 0.9375rem)',
              lineHeight: 1.55,
              color: 'rgba(255,249,237,0.68)',
            }}
          >
            {INTRO_TEXT}
          </p>

          <div className="flex flex-col items-center gap-2">
            <span
              className="font-display uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(250,230,193,0.40)' }}
            >
              scroll
            </span>
            <ArrowDown
              size={13}
              strokeWidth={1.5}
              className="animate-bounce"
              style={{ color: 'rgba(250,230,193,0.40)' }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — VOLTAR + TÍTULO
      ══════════════════════════════════════ */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-50"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#3A5B4F',
          }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Voltar
        </Link>

        <h1
          className="font-display uppercase text-center mt-8 md:mt-10"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1.0,
            letterSpacing: '0.05em',
            color: '#0C4544',
          }}
        >
          Os Vinhos
        </h1>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — INTRO
      ══════════════════════════════════════ */}
      <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
              lineHeight: 1.35,
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            {INTRO_TEXT}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DESKTOP — IMAGEM PANORÂMICA 16:7
      ══════════════════════════════════════ */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10">
        <div
          ref={panoramicContainerRef}
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: '16/7', backgroundColor: '#0A3A39', borderRadius: '4px' }}
        >
          <div
            ref={panoramicImgRef}
            className="absolute will-change-transform"
            style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
          >
            <Image
              src="/images/homepage/vinhos/section-01.webp"
              alt="Os Vinhos da Casa de Nabais"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          WINE CARDS
      ══════════════════════════════════════ */}
      <section ref={sectionRef} className="pt-12 pb-20 lg:pt-4 md:pb-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">

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
