'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react'
import TextReveal from './TextReveal'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Adega — tanques de inox' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Fermentação do Loureiro' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Controlo de temperatura' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Análise de mosto' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Prova de barrica' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Engarrafamento' },
  { src: '/images/homepage/casa/carousel-08.webp', alt: 'Rotulagem' },
  { src: '/images/homepage/casa/section-01.webp',  alt: 'Expedição' },
]


const RIGOR_IMAGES = [
  { src: '/images/homepage/vinhas/carousel-01.webp', alt: 'Controlo de temperatura — adega' },
  { src: '/images/homepage/vinhas/carousel-02.webp', alt: 'Análise de mosto' },
  { src: '/images/homepage/vinhas/carousel-03.webp', alt: 'Registo de dados — vinificação' },
]


const IMG_RATIO = '4/5'
const SLIDE_GAP = 12

export default function VinificacaoPage() {
  const { t } = useLang()
  const pageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)

  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef = useRef<HTMLDivElement>(null)

  const mobileHeroRef = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)

  // Abordagem section refs
  const expPortraitRef = useRef<HTMLDivElement>(null)
  const expImgWrapRef = useRef<HTMLDivElement>(null)
  const expFullbleedContainerRef = useRef<HTMLDivElement>(null)
  const expFullbleedImgRef = useRef<HTMLDivElement>(null)

  // Adega section refs
  const adegaPortraitRef = useRef<HTMLDivElement>(null)
  const adegaImgWrapRef = useRef<HTMLDivElement>(null)
  const adegaFullbleedContainerRef = useRef<HTMLDivElement>(null)
  const adegaFullbleedImgRef = useRef<HTMLDivElement>(null)

  // Enólogo section refs
  const enologoPortraitRef = useRef<HTMLDivElement>(null)
  const enologoImgWrapRef = useRef<HTMLDivElement>(null)

  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth, setSlideWidth] = useState(380)
  const [index, setIndex] = useState(0)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  const canPrev = index > 0
  const canNext = index < galleryImages.length - 1

  function prev() { if (canPrev) setIndex(i => i - 1) }
  function next() { if (canNext) setIndex(i => i + 1) }

  // Carousel Rigor images — mobile only
  const [rigorIndex, setRigorIndex] = useState(0)
  const [rigorSlideWidth, setRigorSlideWidth] = useState(280)
  const rigorDragStartX = useRef(0)
  const [rigorGrabbing, setRigorGrabbing] = useState(false)

  const rigorCanPrev = rigorIndex > 0
  const rigorCanNext = rigorIndex < RIGOR_IMAGES.length - 1

  function rigorPrev() { if (rigorCanPrev) setRigorIndex(i => i - 1) }
  function rigorNext() { if (rigorCanNext) setRigorIndex(i => i + 1) }

  function onRigorPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    rigorDragStartX.current = e.clientX
    setRigorGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onRigorPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setRigorGrabbing(false)
    const diff = rigorDragStartX.current - e.clientX
    if (Math.abs(diff) < 8) return
    if (diff > 50 && rigorCanNext) rigorNext()
    else if (diff < -50 && rigorCanPrev) rigorPrev()
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) < 8) return
    if (diff > 50 && canNext) next()
    else if (diff < -50 && canPrev) prev()
  }

  useIsomorphicLayoutEffect(() => {
    function measure() {
      if (!containerRef.current) return
      const isLg = window.innerWidth >= 1024
      if (isLg && portraitRef.current) {
        const portraitRect = portraitRef.current.getBoundingClientRect()
        setCarouselLeft(`${portraitRect.left}px`)
        setSlideWidth(portraitRect.width)
      } else {
        const leftOffset = 16
        setCarouselLeft(`${leftOffset}px`)
        setSlideWidth(Math.round(window.innerWidth - leftOffset - SLIDE_GAP - 40))
        setRigorSlideWidth(Math.round(window.innerWidth - 24 - SLIDE_GAP - 40))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-vinif', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgWrapRef.current && portraitRef.current) {
        gsap.to(imgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: portraitRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (panoramicImgRef.current && panoramicContainerRef.current) {
        gsap.to(panoramicImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: panoramicContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (expImgWrapRef.current && expPortraitRef.current) {
        gsap.to(expImgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: expPortraitRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (expFullbleedImgRef.current && expFullbleedContainerRef.current) {
        gsap.to(expFullbleedImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: expFullbleedContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (adegaImgWrapRef.current && adegaPortraitRef.current) {
        gsap.to(adegaImgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: adegaPortraitRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (adegaFullbleedImgRef.current && adegaFullbleedContainerRef.current) {
        gsap.to(adegaFullbleedImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: adegaFullbleedContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (enologoImgWrapRef.current && enologoPortraitRef.current) {
        gsap.to(enologoImgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: enologoPortraitRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (mobileHeroImgRef.current && mobileHeroRef.current && window.innerWidth < 1024) {
        gsap.to(mobileHeroImgRef.current, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }
    }, pageRef)

    return () => { ctx.revert(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <>
      <div ref={pageRef}>

        {/* ══════════════════════════════════════
            ZONA ESCURA 1
            Hero → TextReveal → Abordagem experimental
        ══════════════════════════════════════ */}
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
                  src="/images/homepage/vinificacao/fullbleed-01.webp"
                  alt="A Vinificação — adega"
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Gradiente reforçado para cobrir título + texto */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 34%, rgba(56,103,102,0.82) 63%, rgba(25,79,78,0.95) 78%, #031D1D 92%, #031D1D 100%)',
                zIndex: 1,
              }}
            />

            <Link
              href="/"
              className="absolute top-8 left-6 inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-50"
              style={{
                zIndex: 10,
                color: 'rgba(250,230,193,0.80)',
              }}
            >
              <ArrowLeft size={11} strokeWidth={1.5} />
              {t.common.back}
            </Link>

            {/* Título + texto + scroll indicator */}
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
                {t.vinificacaoPage.title.replace(/^A /, '')}
              </h1>

              <p
                className="font-body mb-8 w-full"
                style={{
                  fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255,249,237,0.90)',
                }}
              >
                {t.vinificacaoPage.intro}
              </p>

              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-2">
                <span
                  className="font-display uppercase"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    color: 'rgba(250,230,193,0.40)',
                  }}
                >
                  {t.common.scroll}
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

          {/* ← VOLTAR + TÍTULO (desktop) */}
          <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-50"
              style={{ color: 'rgba(250,230,193,0.60)' }}
            >
              <ArrowLeft size={11} strokeWidth={1.5} />
              {t.common.back}
            </Link>

            <h1
              className="font-display uppercase text-center mt-8 md:mt-10"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.0,
                letterSpacing: '0.05em',
                color: '#FAE6C1',
              }}
            >
              {t.vinificacaoPage.title}
            </h1>
          </div>

          {/* INTRO — desktop */}
          <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
            <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
              <p
                className="font-body"
                style={{
                  fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                  lineHeight: 1.5,
                  fontWeight: 400,
                  color: 'rgba(255,249,237,0.72)',
                }}
              >
                {t.vinificacaoPage.intro}
              </p>
            </div>
          </section>

          {/* IMAGEM PANORÂMICA 16:7 — desktop */}
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
                  src="/images/homepage/vinificacao/fullbleed-01.webp"
                  alt="Adega da Casa de Nabais"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              GRID: imagem ESQ + texto DIR + CARROSSEL
          ══════════════════════════════════════ */}
          <section ref={sectionRef} className="pt-0 pb-4 md:pb-28">

            <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 lg:pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                <div className="reveal-vinif hidden lg:block">
                  <div
                    ref={portraitRef}
                    className="relative overflow-hidden w-full"
                    style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
                  >
                    <div
                      ref={imgWrapRef}
                      className="absolute will-change-transform"
                      style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                    >
                      <Image
                        src="/images/homepage/casa/carousel-01.webp"
                        alt="A casta Loureiro — vinificação"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 50vw"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col px-0 lg:pl-10">
                  <h2
                    className="reveal-vinif font-display mb-8 lg:mb-10 text-center lg:text-left"
                    style={{
                      fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                      lineHeight: 1.1,
                      color: '#FAE6C1',
                    }}
                  >
                    {t.vinificacaoPage.loureiroHeading}
                  </h2>

                  {t.vinificacaoPage.loureiroParas.map((para, i) => (
                    <p
                      key={i}
                      className="reveal-vinif font-body mb-5 last:mb-0 text-center lg:text-left"
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

              </div>
            </div>

            {/* Mobile: carrossel */}
            <div
              className="lg:hidden mt-10 py-2 select-none"
              style={{ overflowX: 'clip', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => setGrabbing(false)}
            >
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  gap: `${SLIDE_GAP}px`,
                  paddingLeft: carouselLeft,
                  transform: `translateX(calc(-${index} * (${slideWidth}px + ${SLIDE_GAP}px)))`,
                }}
              >
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{
                      width: `${slideWidth}px`,
                      aspectRatio: IMG_RATIO,
                      backgroundColor: '#0A3A39',
                      borderRadius: '4px',
                      boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                      cursor: grabbing ? 'grabbing' : 'grab',
                    }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="90vw" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden mt-5 flex items-center gap-5 justify-center">
              <button onClick={prev} disabled={!canPrev} aria-label={t.common.previous} className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
                <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
              </button>
              <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(250,230,193,0.60)' }}>
                {index + 1} {t.common.of} {galleryImages.length}
              </span>
              <button onClick={next} disabled={!canNext} aria-label={t.common.next} className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
                <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
              </button>
            </div>

            {/* Desktop: carrossel */}
            <div
              className="hidden lg:block mt-4 py-2 select-none"
              style={{ overflowX: 'clip', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => setGrabbing(false)}
            >
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  gap: `${SLIDE_GAP}px`,
                  paddingLeft: carouselLeft,
                  transform: `translateX(calc(-${index} * (${slideWidth}px + ${SLIDE_GAP}px)))`,
                }}
              >
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{
                      width: `${slideWidth}px`,
                      aspectRatio: IMG_RATIO,
                      backgroundColor: '#0A3A39',
                      borderRadius: '4px',
                      boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                      cursor: grabbing ? 'grabbing' : 'grab',
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="hidden lg:flex mt-5 items-center gap-5 justify-start"
              style={{ paddingLeft: carouselLeft }}
            >
              <button onClick={prev} disabled={!canPrev} aria-label={t.common.previous} className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
                <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
              </button>
              <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(250,230,193,0.60)' }}>
                {index + 1} {t.common.of} {galleryImages.length}
              </span>
              <button onClick={next} disabled={!canNext} aria-label={t.common.next} className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
                <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
              </button>
            </div>

          </section>

          {/* TEXTO ANIMADO (TextReveal) */}
          <section className="py-14 md:py-20">
            <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
              <TextReveal
                text={t.vinificacaoPage.closingText}
                className="font-display"
                style={{
                  fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
                  lineHeight: 1.3,
                  fontWeight: 400,
                  color: '#FAE6C1',
                }}
                ghostOpacity={0.15}
              />
            </div>
          </section>

          {/* ══════════════════════════════════════
              ABORDAGEM EXPERIMENTAL
          ══════════════════════════════════════ */}
          <section className="lg:pt-20 lg:pb-28 md:pb-36">

            {/* Mobile: imagem full-bleed + gradient + título */}
            <div className="lg:hidden relative overflow-hidden" style={{ height: 'calc(100svh - 72px)' }}>
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/homepage/vinhas/section-01.webp"
                  alt="Abordagem experimental — microvinificações"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 62%, rgba(25,79,78,0.72) 74%, rgba(3,29,29,0.96) 84%, #031D1D 93%, #031D1D 100%)',
                  zIndex: 1,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-center" style={{ zIndex: 2 }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.375rem, 5vw, 1.875rem)', lineHeight: 1.1, letterSpacing: '0.03em',
                    color: '#FAE6C1',
                  }}
                >
                  {t.vinificacaoPage.experimentalHeading}
                </h2>
              </div>
            </div>

            {/* Mobile: texto — fundo contínuo */}
            <div className="lg:hidden" style={{ background: '#031D1D', marginTop: '-24px', paddingTop: '24px', paddingBottom: '32px', position: 'relative', zIndex: 2 }}>
              <div className="px-6 text-center">
                {t.vinificacaoPage.experimentalParas.map((para, i) => (
                  <p
                    key={i}
                    className="font-body mb-4 last:mb-0"
                    style={{
                      fontSize: 'clamp(0.9375rem, 4vw, 1rem)',
                      lineHeight: 1.6,
                      color: i === 0 ? 'rgba(255,249,237,0.90)' : 'rgba(255,249,237,0.72)',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Desktop: texto ESQ + portrait DIR */}
            <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="grid grid-cols-2 gap-10 lg:gap-16 items-center">

                <div className="flex flex-col px-0 lg:pr-10">
                  <h2
                    className="font-display mb-8 lg:mb-10 text-left"
                    style={{
                      fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                      lineHeight: 1.1,
                      color: '#FAE6C1',
                    }}
                  >
                    {t.vinificacaoPage.experimentalHeading}
                  </h2>

                  {t.vinificacaoPage.experimentalParas.map((para, i) => (
                    <p
                      key={i}
                      className="font-body mb-5 last:mb-0 text-left"
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

                <div>
                  <div
                    ref={expPortraitRef}
                    className="relative overflow-hidden w-full"
                    style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
                  >
                    <div
                      ref={expImgWrapRef}
                      className="absolute will-change-transform"
                      style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                    >
                      <Image
                        src="/images/homepage/vinhas/section-01.webp"
                        alt="Abordagem experimental — microvinificações"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 50vw"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Panorâmica full-width — desktop */}
            <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
              <div
                ref={expFullbleedContainerRef}
                className="relative overflow-hidden w-full"
                style={{ aspectRatio: '16/7', backgroundColor: '#0A3A39', borderRadius: '4px' }}
              >
                <div
                  ref={expFullbleedImgRef}
                  className="absolute will-change-transform"
                  style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-04.webp"
                    alt="Adega da Casa de Nabais — vista exterior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>

          </section>

        </div>
        {/* ── fim zona escura 1 ── */}

        {/* ══════════════════════════════════════
            ZONA CREME
            Uma adega à frente do seu tempo
            + Rigor, dados e tempo
        ══════════════════════════════════════ */}
        <div style={{ background: 'linear-gradient(180deg, #FFF9ED 0%, #FFF3DE 50%, #FFF9ED 100%)' }}>

          {/* ── UMA ADEGA À FRENTE DO SEU TEMPO ── */}
          <section className="pt-20 md:pt-28 pb-20 md:pb-28">

            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Retrato ESQUERDA — desktop */}
                <div className="hidden lg:block">
                  <div
                    ref={adegaPortraitRef}
                    className="relative overflow-hidden w-full"
                    style={{ aspectRatio: IMG_RATIO, backgroundColor: '#3A5B4F', borderRadius: '4px' }}
                  >
                    <div
                      ref={adegaImgWrapRef}
                      className="absolute will-change-transform"
                      style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                    >
                      <Image
                        src="/images/homepage/casa/section-01.webp"
                        alt="Adega — interior"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 50vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Texto DIREITA */}
                <div className="flex flex-col lg:pl-10">
                  <h2
                    className="font-display uppercase mb-8 lg:mb-10 text-center lg:text-left"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.04em',
                      color: '#031D1D',
                    }}
                  >
                    {t.vinificacaoPage.adegaHeading}
                  </h2>

                  <p
                    className="font-body mb-5 text-center lg:text-left"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)',
                      lineHeight: 1.6,
                      color: 'rgba(3,29,29,0.65)',
                    }}
                  >
                    {t.vinificacaoPage.adegaParas[0]}
                  </p>

                  <ul
                    className="mb-5 flex flex-col gap-2 text-center lg:text-left"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)',
                      lineHeight: 1.6,
                      color: 'rgba(3,29,29,0.65)',
                      listStyle: 'none',
                      padding: 0,
                    }}
                  >
                    {t.vinificacaoPage.adegaList.map((item, i) => (
                      <li key={i} className="font-body flex gap-2 justify-center lg:justify-start">
                        <span style={{ opacity: 0.35, flexShrink: 0 }}>—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {t.vinificacaoPage.adegaParas.slice(1).map((para, i) => (
                    <p
                      key={i}
                      className="font-body mb-4 last:mb-0 text-center lg:text-left"
                      style={{
                        fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)',
                        lineHeight: 1.6,
                        color: 'rgba(3,29,29,0.65)',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

              </div>
            </div>

            {/* Panorâmica full-width — desktop */}
            <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
              <div
                ref={adegaFullbleedContainerRef}
                className="relative overflow-hidden w-full"
                style={{ aspectRatio: '16/7', backgroundColor: '#3A5B4F', borderRadius: '4px' }}
              >
                <div
                  ref={adegaFullbleedImgRef}
                  className="absolute will-change-transform"
                  style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                >
                  <Image
                    src="/images/homepage/casa/carousel-03.webp"
                    alt="Adega da Casa de Nabais — construção"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>

            {/* Mobile: portrait */}
            <div
              className="relative lg:hidden mt-10 mx-6"
              style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#3A5B4F' }}
            >
              <Image
                src="/images/homepage/casa/section-01.webp"
                alt="Adega — interior"
                fill
                className="object-cover"
                sizes="calc(100vw - 3rem)"
              />
            </div>

          </section>

          {/* ── RIGOR, DADOS E TEMPO ── */}
          <section className="pt-0 pb-20 md:pb-28">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">

              {/* Título 1/3 + Texto 2/3 — desktop */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] gap-16 mb-20">
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    lineHeight: 1.1,
                    color: '#031D1D',
                  }}
                >
                  {t.vinificacaoPage.rigorHeading}
                </h2>

                <div className="flex flex-col justify-center">
                  <p
                    className="font-body"
                    style={{
                      fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                      lineHeight: 1.65,
                      color: 'rgba(3,29,29,0.65)',
                    }}
                  >
                    {t.vinificacaoPage.rigorText}
                  </p>
                </div>
              </div>

              {/* Título + Texto — mobile */}
              <div className="lg:hidden mb-10 text-center">
                <h2
                  className="font-display mb-6"
                  style={{
                    fontSize: 'clamp(1.75rem, 8vw, 2.5rem)',
                    lineHeight: 1.1,
                    color: '#031D1D',
                  }}
                >
                  {t.vinificacaoPage.rigorHeading}
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)',
                    lineHeight: 1.65,
                    color: 'rgba(3,29,29,0.65)',
                  }}
                >
                  {t.vinificacaoPage.rigorText}
                </p>
              </div>

              {/* 3 imagens — carrossel mobile, grid desktop */}
              <div
                className="lg:hidden -mx-6 py-2 select-none"
                style={{ overflowX: 'clip', cursor: rigorGrabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
                onPointerDown={onRigorPointerDown}
                onPointerUp={onRigorPointerUp}
                onPointerCancel={() => setRigorGrabbing(false)}
              >
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    gap: `${SLIDE_GAP}px`,
                    paddingLeft: '24px',
                    transform: `translateX(calc(-${rigorIndex} * (${rigorSlideWidth}px + ${SLIDE_GAP}px)))`,
                  }}
                >
                  {RIGOR_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{
                        width: `${rigorSlideWidth}px`,
                        aspectRatio: '1/1',
                        backgroundColor: '#3A5B4F',
                        borderRadius: '4px',
                        cursor: rigorGrabbing ? 'grabbing' : 'grab',
                      }}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="90vw" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:hidden mt-5 flex items-center gap-5 justify-center">
                <button onClick={rigorPrev} disabled={!rigorCanPrev} aria-label={t.common.previous} className="p-1 transition-opacity duration-200" style={{ opacity: rigorCanPrev ? 1 : 0.25 }}>
                  <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#031D1D' }} />
                </button>
                <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(3,29,29,0.45)' }}>
                  {rigorIndex + 1} {t.common.of} {RIGOR_IMAGES.length}
                </span>
                <button onClick={rigorNext} disabled={!rigorCanNext} aria-label={t.common.next} className="p-1 transition-opacity duration-200" style={{ opacity: rigorCanNext ? 1 : 0.25 }}>
                  <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#031D1D' }} />
                </button>
              </div>

              {/* Grid 3 colunas — desktop only */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                {RIGOR_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '1/1', backgroundColor: '#3A5B4F', borderRadius: '4px' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 33vw, 380px"
                    />
                  </div>
                ))}
              </div>

            </div>
          </section>

        </div>
        {/* ── fim zona creme ── */}

        {/* ══════════════════════════════════════
            ZONA ESCURA 2
            Perfil do enólogo
        ══════════════════════════════════════ */}
        <div style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 50%, #031D1D 100%)' }}>

          <section className="lg:pt-20 lg:pb-28">

            {/* Mobile: imagem full-bleed + gradient + identidade */}
            <div className="lg:hidden relative overflow-hidden" style={{ minHeight: '100svh' }}>
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/homepage/enoturismo/section-01.webp"
                  alt="Perfil do enólogo — Casa de Nabais"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 34%, rgba(56,103,102,0.82) 63%, rgba(25,79,78,0.95) 78%, #031D1D 92%)',
                  zIndex: 1,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 text-center" style={{ zIndex: 2 }}>
                <p
                  className="font-display uppercase mb-3"
                  style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(250,230,193,0.50)' }}
                >
                  {t.vinificacaoPage.enologoHeading}
                </p>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '0.04em',
                    color: '#FAE6C1',
                  }}
                >
                  {t.vinificacaoPage.enologoName}
                </h2>
              </div>
            </div>

            {/* Mobile: parágrafos — fundo contínuo com o gradiente */}
            <div
              className="lg:hidden px-7 pt-2 pb-12 text-center"
              style={{ background: '#031D1D' }}
            >
              {t.vinificacaoPage.enologoParas.map((para, i) => (
                <p
                  key={i}
                  className="font-body mb-5 last:mb-0"
                  style={{
                    fontSize: 'clamp(0.875rem, 3.8vw, 0.9375rem)',
                    lineHeight: 1.65,
                    color: i === 0 ? 'rgba(255,249,237,0.72)' : 'rgba(255,249,237,0.55)',
                    fontStyle: i > 0 ? 'italic' : 'normal',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Título da secção — desktop */}
            <h2
              className="hidden lg:block font-display uppercase text-center mb-16"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                lineHeight: 1.0,
                letterSpacing: '0.04em',
                color: '#FAE6C1',
              }}
            >
              {t.vinificacaoPage.enologoHeading}
            </h2>

            {/* Desktop: glassmorphism overlapping card + frase de fecho */}
            <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="relative" style={{ minHeight: '900px' }}>

                {/* Imagem — lado esquerdo 62% */}
                <div
                  ref={enologoPortraitRef}
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    ref={enologoImgWrapRef}
                    className="absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/enoturismo/section-01.webp"
                      alt="Perfil do enólogo — Casa de Nabais"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>

                {/* Card glassmorfismo — lado direito, posicionado mais abaixo */}
                <div
                  className="absolute right-0"
                  style={{
                    top: '40%',
                    width: '54%',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 249, 237, 0.72)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 249, 237, 0.30)',
                    padding: '44px 52px',
                    zIndex: 2,
                  }}
                >
                  <h2
                    className="font-display mb-1"
                    style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)', lineHeight: 1.0, color: '#0C4544' }}
                  >
                    {t.vinificacaoPage.enologoName}
                  </h2>
                  <p
                    className="font-display uppercase mb-8"
                    style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(12,69,68,0.40)' }}
                  >
                    {t.vinificacaoPage.enologoRole}
                  </p>
                  {t.vinificacaoPage.enologoParas.map((para, i) => (
                    <p
                      key={i}
                      className="font-body mb-4 last:mb-0"
                      style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

              </div>

              {/* Frase de fecho — dentro do mesmo wrapper, abaixo do card */}
              <div className="text-center mt-28 md:mt-40 mb-8 md:mb-16">
                <TextReveal
                  text={t.vinificacaoPage.enologoClosing}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
                    lineHeight: 1.3,
                    fontWeight: 400,
                    color: '#FAE6C1',
                  }}
                />
              </div>
            </div>

          </section>

        </div>
        {/* ── fim zona escura 2 ── */}

      </div>

      {/* ══════════════════════════════════════
          EXPLORE TAMBÉM — fundo claro
      ══════════════════════════════════════ */}
      <SectionExplore />
    </>
  )
}
