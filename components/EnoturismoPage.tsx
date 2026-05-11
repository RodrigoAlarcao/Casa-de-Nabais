'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowDown } from 'lucide-react'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const IMG_RATIO = '4/5'

const INTRO_TEXT =
  'Na Casa de Nabais, o enoturismo no Vale do Lima vive-se de forma autêntica e intimista. Entre o solar histórico, as vinhas, a adega e a mesa, cada experiência permite compreender o vinho desde a sua origem. Provas comentadas, visitas guiadas, gastronomia sazonal e estadias em plena natureza revelam uma quinta onde o Loureiro, a terra e o tempo definem o ritmo.'

const PROVAS_PARAS = [
  'Na Casa de Nabais, as provas de vinho são sempre acompanhadas por quem o faz — o produtor, o enólogo ou um membro da equipa técnica — assegurando que cada vinho provado é explicado a partir da vinha, do solo e das escolhas de vinificação que lhe dão forma.',
  'O Loureiro, casta central da quinta, afirma-se como fio condutor destas provas, com a sua expressão aromática marcada, as notas florais de rosa branca, flor e folha de laranjeira e o subtil laivo a louro e, na boca, a mesma nota nítida de flor e folha de laranjeira e uma acidez vibrante e muito fresca.',
]
const PROVAS_IMAGES = [
  { src: '/images/homepage/enoturismo/carousel-02.webp', alt: 'Prova de vinho' },
  { src: '/images/homepage/enoturismo/carousel-05.webp', alt: 'Vindima' },
  { src: '/images/homepage/enoturismo/carousel-06.webp', alt: 'Pôr do sol no Vale do Lima' },
]

const VISITAS_PARAS = [
  'A visita começa nas vinhas — percorrendo as diferentes parcelas, compreendendo a influência dos solos e do microclima do Vale do Lima. Os nossos guias partilham o conhecimento acumulado ao longo de gerações, com uma perspectiva a longo prazo e respeito pela biodiversidade.',
  'Na adega, o percurso continua: desde a receção da uva até às cubas e barricas onde os vinhos repousam antes de chegarem à garrafa. Uma visita que liga a terra à mesa, com toda a honestidade de quem trabalha o produto que oferece.',
]
const VISITAS_IMAGES = [
  { src: '/images/homepage/vinhas/section-01.webp',  alt: 'Vinhas da Casa de Nabais' },
  { src: '/images/homepage/vinhas/carousel-01.webp', alt: 'Percurso entre as vinhas' },
  { src: '/images/homepage/vinhas/carousel-03.webp', alt: 'Detalhe das videiras' },
]

const ALMOCOS_PARAS = [
  'A gastronomia da Casa de Nabais nasce dos mesmos princípios que guiam os nossos vinhos: proximidade, sazonalidade e respeito pelo produto. A cozinha parte dos legumes da horta, dos enchidos locais e dos queijos artesanais para construir uma mesa que reflete a identidade da região.',
  'Almoços e experiências gastronómicas são vividos em espaços únicos — na adega em harmonia com os nossos vinhos, no jardim histórico sob as árvores centenárias, ou na vinha durante as vindimas. Tornando cada refeição uma memória de lugar e de tempo.',
]
const ALMOCOS_IMAGES = [
  { src: '/images/homepage/casa/carousel-01.webp',        alt: 'Interior da Casa de Nabais' },
  { src: '/images/homepage/casa/carousel-02.webp',        alt: 'Sala de refeições' },
  { src: '/images/homepage/enoturismo/section-01.webp',   alt: 'Sala de provas' },
]

const PASSEIOS_PARAS = [
  'Os percursos na mata da Casa de Nabais atravessam sobreiros, carvalhos e pinheiros centenários. Numa manhã tranquila, é possível ouvir o som do ribeiro e sentir a frescura das sombras com vista para as vinhas ao longe, enquanto os pássaros anunciam a mudança de estação.',
  'Os percursos são adequados a todos os níveis e podem ser feitos ao ritmo de cada visitante — a pé ou com orientação. Uma forma de desacelerar, de se reencontrar com a natureza e de perceber que o vinho começa muito antes da adega.',
]
const PASSEIOS_IMAGES = [
  { src: '/images/homepage/vinhas/carousel-04.webp', alt: 'Paisagem do Vale do Lima' },
  { src: '/images/homepage/vinhas/carousel-05.webp', alt: 'Vinhas ao entardecer' },
  { src: '/images/homepage/vinhas/carousel-06.webp', alt: 'Natureza na quinta' },
]

/* ─── 3-image row ───────────────────────────────────────────────── */
// largeSide: large image (2fr) aligns with the portrait column above it.
// 2 equal images (1fr each) align with where the next section's portrait will sit.

function ThreeImages({
  images,
  largeSide,
}: {
  images: { src: string; alt: string }[]
  largeSide: 'left' | 'right'
}) {
  // Reorder so the large image is always first in DOM (for left) or last (for right)
  const ordered = largeSide === 'left'
    ? [images[0], images[1], images[2]]
    : [images[1], images[2], images[0]]

  return (
    <>
      {/* Desktop: 2fr + 1fr + 1fr (or reversed), fixed row height */}
      <div
        className="hidden md:grid gap-4"
        style={{
          gridTemplateColumns: largeSide === 'left' ? '2fr 1fr 1fr' : '1fr 1fr 2fr',
          gridTemplateRows: 'clamp(260px, 28vw, 400px)',
        }}
      >
        {ordered.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{ borderRadius: '4px', backgroundColor: '#0A3A39' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes={
                (largeSide === 'left' && i === 0) || (largeSide === 'right' && i === 2)
                  ? '(max-width: 1200px) 50vw, 560px'
                  : '(max-width: 1200px) 25vw, 280px'
              }
            />
          </div>
        ))}
      </div>

      {/* Mobile: large image full-width + 2 smalls side by side */}
      <div className="md:hidden flex flex-col gap-4">
        <div
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: '3/2', borderRadius: '4px', backgroundColor: '#0A3A39' }}
        >
          <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1).map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{ aspectRatio: '1/1', borderRadius: '4px', backgroundColor: '#0A3A39' }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function EnoturismoPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const mobileHeroRef    = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)
  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef       = useRef<HTMLDivElement>(null)

  /* portrait parallax refs — one pair per section */
  const p1Ref    = useRef<HTMLDivElement>(null)
  const p1Wrap   = useRef<HTMLDivElement>(null)
  const p2Ref    = useRef<HTMLDivElement>(null)
  const p2Wrap   = useRef<HTMLDivElement>(null)
  const p3Ref    = useRef<HTMLDivElement>(null)
  const p3Wrap   = useRef<HTMLDivElement>(null)
  const p4Ref    = useRef<HTMLDivElement>(null)
  const p4Wrap   = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-eno-page', {
        y: 30, opacity: 0, stagger: 0.09, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: pageRef.current, start: 'top 75%' },
      })

      if (panoramicImgRef.current && panoramicContainerRef.current) {
        gsap.to(panoramicImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: panoramicContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (mobileHeroImgRef.current && mobileHeroRef.current && window.innerWidth < 1024) {
        gsap.to(mobileHeroImgRef.current, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      const pairs = [
        [p1Ref, p1Wrap], [p2Ref, p2Wrap], [p3Ref, p3Wrap], [p4Ref, p4Wrap],
      ] as const
      pairs.forEach(([portrait, wrap]) => {
        if (wrap.current && portrait.current) {
          gsap.to(wrap.current, {
            yPercent: -20, ease: 'none',
            scrollTrigger: { trigger: portrait.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        }
      })

      gsap.utils.toArray<HTMLElement>('.reveal-eno-sec').forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── shared text column ── */
  function TextColumn({
    title, paras, pad,
  }: { title: string; paras: string[]; pad: 'left' | 'right' }) {
    return (
      <div className={`flex flex-col px-0 ${pad === 'left' ? 'lg:pr-10' : 'lg:pl-10'}`}>
        <h2
          className="reveal-eno-sec font-display mb-8 lg:mb-10 text-center lg:text-left"
          style={{
            fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
            lineHeight: 1.1,
            color: '#FAE6C1',
          }}
        >
          {title}
        </h2>
        {paras.map((para, i) => (
          <p
            key={i}
            className="reveal-eno-sec font-body mb-5 last:mb-0 text-center lg:text-left"
            style={{
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.65,
              color: 'rgba(255,249,237,0.72)',
            }}
          >
            {para}
          </p>
        ))}
      </div>
    )
  }

  /* ── portrait cell ── */
  function PortraitCell({
    src, alt, containerRef, wrapRef,
  }: {
    src: string; alt: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
    wrapRef: React.RefObject<HTMLDivElement | null>;
  }) {
    return (
      <div className="reveal-eno-sec hidden lg:block">
        <div
          ref={containerRef}
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
        >
          <div
            ref={wrapRef}
            className="absolute will-change-transform"
            style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
          >
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 50vw" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef}>

      {/* ══════════════════════════════════════════════════════
          ZONA ESCURA — hero + todas as secções de actividade
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(180deg, #031D1D 0%, #031D1D 35%, #0C4544 62%, #031D1D 100%)' }}>

        {/* ── MOBILE HERO ── */}
        <div ref={mobileHeroRef} className="relative lg:hidden" style={{ height: 'calc(100svh - 72px)' }}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              ref={mobileHeroImgRef}
              className="absolute will-change-transform"
              style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
            >
              <Image
                src="/images/homepage/enoturismo/section-01.webp"
                alt="O Enoturismo — Casa de Nabais"
                fill priority
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
            style={{ zIndex: 10, fontFamily: 'var(--font-display), serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,230,193,0.80)' }}
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            Voltar
          </Link>

          <div className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-center text-center" style={{ zIndex: 2 }}>
            <h1
              className="font-display uppercase mb-7"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.05em', color: '#FAE6C1', textShadow: '0 2px 28px rgba(3,29,29,0.95)' }}
            >
              O Enoturismo
            </h1>
            <p
              className="font-body mb-8 w-full"
              style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9375rem)', lineHeight: 1.55, color: 'rgba(255,249,237,0.68)' }}
            >
              {INTRO_TEXT}
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="font-display uppercase" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(250,230,193,0.40)' }}>scroll</span>
              <ArrowDown size={13} strokeWidth={1.5} className="animate-bounce" style={{ color: 'rgba(250,230,193,0.40)' }} />
            </div>
          </div>
        </div>

        {/* ── VOLTAR + TÍTULO (desktop) ── */}
        <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-50"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,230,193,0.60)' }}
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            Voltar
          </Link>

          <h1
            className="font-display uppercase text-center mt-8 md:mt-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.0, letterSpacing: '0.05em', color: '#FAE6C1' }}
          >
            O Enoturismo
          </h1>
        </div>

        {/* INTRO — desktop */}
        <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
          <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
            <p
              className="font-body"
              style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', lineHeight: 1.5, color: 'rgba(255,249,237,0.72)' }}
            >
              {INTRO_TEXT}
            </p>
          </div>
        </section>

        {/* PANORÂMICA 16:7 — desktop */}
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
                src="/images/homepage/enoturismo/section-01.webp"
                alt="O Enoturismo — Casa de Nabais"
                fill priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PROVAS DE VINHO
        ══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-4">

          {/* Mobile: texto */}
          <div className="lg:hidden mb-8">
            <h2 className="font-display mb-6 text-center" style={{ fontSize: 'clamp(1.75rem, 8vw, 2.5rem)', lineHeight: 1.1, color: '#FAE6C1' }}>
              Provas de vinho
            </h2>
            {PROVAS_PARAS.map((para, i) => (
              <p key={i} className="font-body mb-4 last:mb-0 text-center" style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Desktop: portrait esq + texto dir */}
          <div className="hidden lg:grid grid-cols-2 gap-4 items-center">
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-01.webp"
              alt="Prova de vinhos na adega"
              containerRef={p1Ref}
              wrapRef={p1Wrap}
            />
            <TextColumn title="Provas de vinho" paras={PROVAS_PARAS} pad="right" />
          </div>

          {/* Mobile: portrait */}
          <div className="lg:hidden relative mb-4" style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A3A39' }}>
            <Image src="/images/homepage/enoturismo/carousel-01.webp" alt="Prova de vinhos na adega" fill className="object-cover" sizes="calc(100vw - 3rem)" />
          </div>

          {/* 3 imagens */}
          <div className="mt-4">
            <ThreeImages images={PROVAS_IMAGES} largeSide="left" />
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            VISITAS GUIADAS
        ══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-4">

          {/* Mobile: texto */}
          <div className="lg:hidden mb-8">
            <h2 className="font-display mb-6 text-center" style={{ fontSize: 'clamp(1.75rem, 8vw, 2.5rem)', lineHeight: 1.1, color: '#FAE6C1' }}>
              Visitas guiadas às vinhas e adega
            </h2>
            {VISITAS_PARAS.map((para, i) => (
              <p key={i} className="font-body mb-4 last:mb-0 text-center" style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Desktop: texto esq + portrait dir */}
          <div className="hidden lg:grid grid-cols-2 gap-4 items-center">
            <TextColumn title="Visitas guiadas às vinhas e adega" paras={VISITAS_PARAS} pad="left" />
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-02.webp"
              alt="Visita guiada às vinhas"
              containerRef={p2Ref}
              wrapRef={p2Wrap}
            />
          </div>

          {/* Mobile: portrait */}
          <div className="lg:hidden relative mb-4" style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A3A39' }}>
            <Image src="/images/homepage/enoturismo/carousel-02.webp" alt="Visita guiada às vinhas" fill className="object-cover" sizes="calc(100vw - 3rem)" />
          </div>

          {/* 3 imagens */}
          <div className="mt-4">
            <ThreeImages images={VISITAS_IMAGES} largeSide="right" />
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            ALMOÇOS E EXPERIÊNCIAS GASTRONÓMICAS
        ══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-4">

          {/* Mobile: texto */}
          <div className="lg:hidden mb-8">
            <h2 className="font-display mb-6 text-center" style={{ fontSize: 'clamp(1.75rem, 8vw, 2.5rem)', lineHeight: 1.1, color: '#FAE6C1' }}>
              Almoços e experiências gastronómicas
            </h2>
            {ALMOCOS_PARAS.map((para, i) => (
              <p key={i} className="font-body mb-4 last:mb-0 text-center" style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Desktop: portrait esq + texto dir */}
          <div className="hidden lg:grid grid-cols-2 gap-4 items-center">
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-03.webp"
              alt="Almoço na quinta"
              containerRef={p3Ref}
              wrapRef={p3Wrap}
            />
            <TextColumn title="Almoços e experiências gastronómicas" paras={ALMOCOS_PARAS} pad="right" />
          </div>

          {/* Mobile: portrait */}
          <div className="lg:hidden relative mb-4" style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A3A39' }}>
            <Image src="/images/homepage/enoturismo/carousel-03.webp" alt="Almoço na quinta" fill className="object-cover" sizes="calc(100vw - 3rem)" />
          </div>

          {/* 3 imagens */}
          <div className="mt-4">
            <ThreeImages images={ALMOCOS_IMAGES} largeSide="left" />
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            PASSEIOS NA MATA
        ══════════════════════════════════════════════════════ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-4 pb-28">

          {/* Mobile: texto */}
          <div className="lg:hidden mb-8">
            <h2 className="font-display mb-6 text-center" style={{ fontSize: 'clamp(1.75rem, 8vw, 2.5rem)', lineHeight: 1.1, color: '#FAE6C1' }}>
              Passeios na mata
            </h2>
            {PASSEIOS_PARAS.map((para, i) => (
              <p key={i} className="font-body mb-4 last:mb-0 text-center" style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Desktop: texto esq + portrait dir */}
          <div className="hidden lg:grid grid-cols-2 gap-4 items-center">
            <TextColumn title="Passeios na mata" paras={PASSEIOS_PARAS} pad="left" />
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-04.webp"
              alt="Passeio na mata"
              containerRef={p4Ref}
              wrapRef={p4Wrap}
            />
          </div>

          {/* Mobile: portrait */}
          <div className="lg:hidden relative mb-4" style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A3A39' }}>
            <Image src="/images/homepage/enoturismo/carousel-04.webp" alt="Passeio na mata" fill className="object-cover" sizes="calc(100vw - 3rem)" />
          </div>

          {/* 3 imagens */}
          <div className="mt-4">
            <ThreeImages images={PASSEIOS_IMAGES} largeSide="right" />
          </div>

        </section>

      </div>
      {/* ── fim zona escura ── */}

      {/* ══════════════════════════════════════
          EXPLORE TAMBÉM — fundo claro
      ══════════════════════════════════════ */}
      <SectionExplore excludeHref="/o-enoturismo" />

    </div>
  )
}
