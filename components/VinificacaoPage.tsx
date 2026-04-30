'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import TextReveal from './TextReveal'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Adega — tanques de inox' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Fermentação do Loureiro' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Controlo de temperatura' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Análise de mosto' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Prova de barrica' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Engarrafamento' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Rotulagem' },
  { src: '/images/homepage/vinificacao/fullbleed-01.webp', alt: 'Expedição' },
]

const INTRO_TEXT =
  'Na Casa de Nabais, fazer vinho é um processo contínuo de observação e descoberta. Antes das vinhas, analisámos cuidadosamente o solo e o que existe por baixo dele, escolhemos a base da videira (o porta-enxerto) e tomámos decisões quanto ao rumo a seguir muito antes das uvas chegarem à adega. O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível.'

const LOUREIRO_PARAS = [
  'O Loureiro é o centro do nosso trabalho. A frescura natural, a acidez equilibrada, o perfil aromático terpénico – que confere notas aromáticas ao vinho – e, ainda, o grau alcoólico moderado fazem do Loureiro uma resposta atual ao que é cada vez mais procurado pelos apreciadores.',
  'No Vale do Lima, onde se situa a Casa de Nabais e onde a casta atinge a sua expressão mais completa, acompanhamos o seu comportamento em diferentes solos — no solo granítico, mais comum na região, e num raro veio de xisto que atravessa uma das nossas vinhas. Observamos também exposições e os sistemas de condução da videira, para tirar o máximo partido das características da casta.',
]

const CLOSING_TEXT =
  'Observamos exposições e sistemas de condução da videira, tudo para aproveitar ao máximo as características da casta.'

const EXPERIMENTAL_PARAS = [
  'As nossas vinhas são um verdadeiro laboratório ao ar livre. Testamos diferentes formas de podar e conduzir as videiras, linha a linha, para perceber como essas escolhas influenciam a saúde das plantas, o seu equilíbrio e o carácter do vinho.',
  'Na adega trabalhamos com pequenos depósitos, o que nos permite fazer vinificações muito precisas. Assim, conseguimos compreender melhor a influência de fatores como o solo, a forma como a vinha é cuidada e a quantidade de uvas produzidas em cada parcela.',
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12

export default function VinificacaoPage() {
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
      {/* ══════════════════════════════════════
          DARK GRADIENT WRAPPER
          Hero → TextReveal + Abordagem section
      ══════════════════════════════════════ */}
      <div
        ref={pageRef}
        style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 40%, #031D1D 100%)' }}
      >

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

          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: '15%',
              bottom: '-60px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(3,29,29,0.45) 38%, rgba(3,29,29,0.9) 65%, #031D1D 82%)',
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

          <h1
            className="absolute left-0 right-0 text-center px-6 font-display uppercase"
            style={{
              bottom: '36px',
              zIndex: 2,
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.05em',
              color: '#FAE6C1',
              textShadow: '0 2px 28px rgba(3,29,29,0.95)',
            }}
          >
            A Vinificação
          </h1>
        </div>

        {/* Mobile intro text */}
        <div
          className="relative lg:hidden px-6 pt-5 pb-10 text-center"
          style={{ marginTop: '-2px', background: '#031D1D', zIndex: 2 }}
        >
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)',
              lineHeight: 1.6,
              color: 'rgba(255,249,237,0.72)',
            }}
          >
            {INTRO_TEXT}
          </p>
        </div>

        {/* ══════════════════════════════════════
            ← VOLTAR + TÍTULO (desktop)
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
              color: 'rgba(250,230,193,0.60)',
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
              color: '#FAE6C1',
            }}
          >
            A Vinificação
          </h1>
        </div>

        {/* ── INTRO — desktop ── */}
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
              {INTRO_TEXT}
            </p>
          </div>
        </section>

        {/* ── IMAGEM PANORÂMICA 16:7 — desktop ── */}
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
            GRID: imagem ESQ + texto DIR
            + CARROSSEL
        ══════════════════════════════════════ */}
        <section ref={sectionRef} className="pt-0 pb-20 md:pb-28">

          <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Retrato ESQUERDA — desktop */}
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
                      src="/images/homepage/vinificacao/fullbleed-01.webp"
                      alt="A casta Loureiro — vinificação"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Texto DIREITA */}
              <div className="flex flex-col px-0 lg:pl-10">
                <h2
                  className="reveal-vinif font-display mb-8 lg:mb-10 text-center lg:text-left"
                  style={{
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    lineHeight: 1.1,
                    color: '#FAE6C1',
                  }}
                >
                  A casta Loureiro<br />como centro de estudo
                </h2>

                {LOUREIRO_PARAS.map((para, i) => (
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

          {/* ── Mobile: carrossel ── */}
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
            <button onClick={prev} disabled={!canPrev} aria-label="Anterior" className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
              <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
            </button>
            <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(250,230,193,0.60)' }}>
              {index + 1} de {galleryImages.length}
            </span>
            <button onClick={next} disabled={!canNext} aria-label="Seguinte" className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
              <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
            </button>
          </div>

          {/* ── Desktop: carrossel ── */}
          <div
            className="hidden lg:block mt-16 py-2 select-none"
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

          {/* Navegação carrossel — desktop */}
          <div
            className="hidden lg:flex mt-5 items-center gap-5 justify-start"
            style={{ paddingLeft: carouselLeft }}
          >
            <button onClick={prev} disabled={!canPrev} aria-label="Anterior" className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
              <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
            </button>
            <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(250,230,193,0.60)' }}>
              {index + 1} de {galleryImages.length}
            </span>
            <button onClick={next} disabled={!canNext} aria-label="Seguinte" className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
              <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
            </button>
          </div>

        </section>

        {/* ══════════════════════════════════════
            TEXTO ANIMADO (TextReveal)
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
            <TextReveal
              text={CLOSING_TEXT}
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
            Grid: imagem ESQ + texto DIR
            + imagem panorâmica full-width abaixo
        ══════════════════════════════════════ */}
        <section className="pt-20 md:pt-28 pb-28 md:pb-36">

          {/* Grid desktop: imagem + texto */}
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Retrato ESQUERDA — desktop */}
              <div className="hidden lg:block">
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
                      src="/images/homepage/vinificacao/fullbleed-01.webp"
                      alt="Abordagem experimental — microvinificações"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Texto DIREITA */}
              <div className="flex flex-col px-0 lg:pl-10">
                <h2
                  className="font-display mb-8 lg:mb-10 text-center lg:text-left"
                  style={{
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    lineHeight: 1.1,
                    color: '#FAE6C1',
                  }}
                >
                  Abordagem experimental e microvinificações
                </h2>

                {EXPERIMENTAL_PARAS.map((para, i) => (
                  <p
                    key={i}
                    className="font-body mb-5 last:mb-0 text-center lg:text-left"
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

          {/* Imagem panorâmica full-width — desktop */}
          <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-16 md:mt-20">
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
                  src="/images/homepage/vinificacao/fullbleed-01.webp"
                  alt="Adega da Casa de Nabais — vista exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>

          {/* Mobile: portrait image */}
          <div
            className="relative lg:hidden mt-10 mx-6"
            style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A3A39' }}
          >
            <Image
              src="/images/homepage/vinificacao/fullbleed-01.webp"
              alt="Abordagem experimental — microvinificações"
              fill
              className="object-cover"
              sizes="calc(100vw - 3rem)"
            />
          </div>

        </section>

        {/* ══════════════════════════════════════
            UMA ADEGA À FRENTE DO SEU TEMPO
            Layout invertido: texto ESQ, imagem DIR
            + imagem panorâmica full-width abaixo
        ══════════════════════════════════════ */}
        <section className="pb-28 md:pb-36">

          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Texto ESQUERDA */}
              <div className="flex flex-col">
                <h2
                  className="font-display uppercase mb-8 lg:mb-10 text-center lg:text-left"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    lineHeight: 1.0,
                    letterSpacing: '0.04em',
                    color: '#FAE6C1',
                  }}
                >
                  Uma adega<br />à frente<br />do seu tempo
                </h2>

                <p
                  className="font-body mb-5 text-center lg:text-left"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                    lineHeight: 1.4,
                    color: 'rgba(255,249,237,0.72)',
                  }}
                >
                  Na adega, utilizamos diferentes materiais como ferramentas ao serviço do vinho.
                </p>

                <ul
                  className="mb-5 flex flex-col gap-2 text-center lg:text-left"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                    lineHeight: 1.4,
                    color: 'rgba(255,249,237,0.72)',
                    listStyle: 'none',
                    padding: 0,
                  }}
                >
                  {[
                    'O inox ajuda a preservar a frescura e a pureza dos aromas.',
                    'O cimento contribui para uma textura mais equilibrada, sem alterar o aroma do vinho.',
                    'As barricas de carvalho são usadas com moderação, para suavizar o vinho e dar-lhe maior profundidade.',
                  ].map((item, i) => (
                    <li key={i} className="font-body flex gap-2 justify-center lg:justify-start">
                      <span style={{ opacity: 0.45, flexShrink: 0 }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {[
                  'Cada material funciona como um tempero: só é usado quando realmente faz sentido e acrescenta valor ao vinho.',
                  'Projetada pelo Arquiteto André Tavares, a nossa adega foi construída no meio da vinha, estando parcialmente enterrada, sem luz natural direta.',
                  'Esta escolha garante proximidade absoluta à colheita e uma grande estabilidade térmica, essencial para uma evolução lenta e elegante dos vinhos, em depósito e em garrafa.',
                ].map((para, i) => (
                  <p
                    key={i}
                    className="font-body mb-4 last:mb-0 text-center lg:text-left"
                    style={{
                      fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                      lineHeight: 1.4,
                      color: 'rgba(255,249,237,0.72)',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Retrato DIREITA — desktop */}
              <div className="hidden lg:block">
                <div
                  ref={adegaPortraitRef}
                  className="relative overflow-hidden w-full"
                  style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
                >
                  <div
                    ref={adegaImgWrapRef}
                    className="absolute will-change-transform"
                    style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinificacao/fullbleed-01.webp"
                      alt="Adega — interior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 50vw"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Imagem panorâmica full-width — desktop */}
          <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-16 md:mt-20">
            <div
              ref={adegaFullbleedContainerRef}
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: '16/7', backgroundColor: '#0A3A39', borderRadius: '4px' }}
            >
              <div
                ref={adegaFullbleedImgRef}
                className="absolute will-change-transform"
                style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
              >
                <Image
                  src="/images/homepage/vinificacao/fullbleed-01.webp"
                  alt="Adega da Casa de Nabais — construção"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>

          {/* Mobile: portrait image */}
          <div
            className="relative lg:hidden mt-10 mx-6"
            style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A3A39' }}
          >
            <Image
              src="/images/homepage/vinificacao/fullbleed-01.webp"
              alt="Adega — interior"
              fill
              className="object-cover"
              sizes="calc(100vw - 3rem)"
            />
          </div>

        </section>

        {/* ══════════════════════════════════════
            RIGOR, DADOS E TEMPO
        ══════════════════════════════════════ */}
        <section className="pt-20 md:pt-28 pb-28 md:pb-36">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">

            {/* Título 1/3 + texto 2/3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: '#FAE6C1',
                }}
              >
                Rigor, dados<br />e tempo
              </h2>
              <p
                className="lg:col-span-2 font-body"
                style={{
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                  lineHeight: 1.4,
                  color: 'rgba(255,249,237,0.72)',
                }}
              >
                A nossa estação meteorológica própria, ímpar na região, recolhe dados contínuos de temperatura, humidade, precipitação, vento e radiação solar. Estes dados ajudam a ajustar as decisões que afetam a vinha e a aprofundar o conhecimento do ecossistema.
              </p>
            </div>

            {/* 3 fotos quadradas */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-16 md:mt-20">
              {[
                { src: '/images/homepage/vinificacao/rigor-01.webp', alt: 'Vinha — alinhamento de cordas' },
                { src: '/images/homepage/vinificacao/rigor-02.webp', alt: 'Poda — detalhe manual' },
                { src: '/images/homepage/vinificacao/rigor-03.webp', alt: 'Trabalho na vinha' },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden w-full"
                  style={{ aspectRatio: '1/1', backgroundColor: '#0A3A39', borderRadius: '4px' }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 400px"
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            PERFIL DO ENÓLOGO
        ══════════════════════════════════════ */}
        <section className="pt-20 md:pt-28 pb-0">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">

            {/* Título centrado */}
            <h2
              className="font-display uppercase text-center mb-16 md:mb-20"
              style={{
                fontSize: 'clamp(1.875rem, 3.2vw, 3.5rem)',
                lineHeight: 1.0,
                letterSpacing: '0.04em',
                color: '#FAE6C1',
              }}
            >
              Perfil do Enólogo
            </h2>

            {/* Desktop: foto + card sobrepostos */}
            <div className="hidden lg:block relative" style={{ paddingBottom: '18%' }}>

              {/* Foto quadrada — esquerda */}
              <div
                className="relative overflow-hidden"
                style={{ width: '56%', aspectRatio: '1/1', borderRadius: '4px', backgroundColor: '#0A3A39' }}
              >
                <Image
                  src="/images/homepage/vinificacao/enologo-portrait.webp"
                  alt="Constantino Ramos — Enólogo"
                  fill
                  className="object-cover"
                  sizes="660px"
                />
              </div>

              {/* Card glassmorphism — sobreposto dir/baixo */}
              <div
                className="absolute"
                style={{
                  left: '43%',
                  top: '28%',
                  width: '50%',
                  background: 'rgba(232, 224, 210, 0.80)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(232, 224, 210, 0.45)',
                  borderRadius: '8px',
                  padding: '2rem 2.25rem',
                }}
              >
                <p
                  className="font-display"
                  style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', color: '#0C4544', lineHeight: 1.2, marginBottom: '2px' }}
                >
                  Constantino Ramos
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.8125rem)', color: 'rgba(12,69,68,0.60)', letterSpacing: '0.04em', marginBottom: '1rem' }}
                >
                  Enólogo
                </p>
                <div style={{ fontSize: 'clamp(0.8125rem, 0.88vw, 0.9375rem)', lineHeight: 1.6, color: 'rgba(12,69,68,0.78)' }}>
                  <p className="font-body mb-3">Constantino Ramos dedica-se à Região dos Vinhos Verdes há quase 15 anos, tendo vindo a construir uma relação próxima à vinha e à casta Loureiro. Enólogo de escuta atenta e gesto preciso, acredita que o vinho nasce como uma ideia e ganha forma com paciência, respeito e atenção à natureza. Trabalha em escala humana, acompanhando cada parcela como um ecossistema vivo e defende a intervenção humana apenas na medida em que contribui para preservar o equilíbrio e a frescura dos vinhos, respeitando a uva, decidindo o momento certo e dando espaço à identidade de cada vinho.</p>
                  <p className="font-body mb-3">O seu foco está em vinhos frescos, gastronómicos e com identidade, pensados para evoluir e contar uma história autêntica.</p>
                  <p className="font-body">Assume-se como vigneron, aceitando os riscos e tomando as decisões que começam no campo e culminam na vindima, o momento-chave do ano. Vê o vinho como um processo que começa muito antes da colheita, sendo moldado pelo terroir e pela visão pessoal do enólogo.</p>
                </div>
              </div>

            </div>

            {/* Mobile: foto + card empilhados */}
            <div className="lg:hidden flex flex-col gap-6">
              <div
                className="relative overflow-hidden w-full"
                style={{ aspectRatio: '1/1', borderRadius: '4px', backgroundColor: '#0A3A39' }}
              >
                <Image
                  src="/images/homepage/vinificacao/enologo-portrait.webp"
                  alt="Constantino Ramos — Enólogo"
                  fill
                  className="object-cover"
                  sizes="calc(100vw - 3rem)"
                />
              </div>
              <div
                style={{
                  background: 'rgba(232, 224, 210, 0.80)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(232, 224, 210, 0.45)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}
              >
                <p className="font-display" style={{ fontSize: '1.0625rem', color: '#0C4544', lineHeight: 1.2, marginBottom: '2px' }}>
                  Constantino Ramos
                </p>
                <p className="font-body" style={{ fontSize: '0.8125rem', color: 'rgba(12,69,68,0.60)', letterSpacing: '0.04em', marginBottom: '0.875rem' }}>
                  Enólogo
                </p>
                <div className="font-body" style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'rgba(12,69,68,0.78)' }}>
                  <p className="mb-3">Constantino Ramos dedica-se à Região dos Vinhos Verdes há quase 15 anos, tendo vindo a construir uma relação próxima à vinha e à casta Loureiro. Enólogo de escuta atenta e gesto preciso, acredita que o vinho nasce como uma ideia e ganha forma com paciência, respeito e atenção à natureza. Trabalha em escala humana, acompanhando cada parcela como um ecossistema vivo e defende a intervenção humana apenas na medida em que contribui para preservar o equilíbrio e a frescura dos vinhos, respeitando a uva, decidindo o momento certo e dando espaço à identidade de cada vinho.</p>
                  <p className="mb-3">O seu foco está em vinhos frescos, gastronómicos e com identidade, pensados para evoluir e contar uma história autêntica.</p>
                  <p>Assume-se como vigneron, aceitando os riscos e tomando as decisões que começam no campo e culminam na vindima, o momento-chave do ano. Vê o vinho como um processo que começa muito antes da colheita, sendo moldado pelo terroir e pela visão pessoal do enólogo.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            TEXTO ANIMADO FINAL
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
            <TextReveal
              text="Nada é feito por moda. Tudo é observado, testado e integrado apenas se servir a origem, o tempo e a singularidade do vinho."
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

      </div>
      {/* ── end dark gradient wrapper ── */}

      {/* ══════════════════════════════════════
          EXPLORE TAMBÉM — fundo claro
      ══════════════════════════════════════ */}
      <SectionExplore />
    </>
  )
}
