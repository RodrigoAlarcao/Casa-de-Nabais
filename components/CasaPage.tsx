'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import TextReveal from './TextReveal'
import ImageLightbox from './ImageLightbox'
import CasaHistoriaSection from './CasaHistoriaSection'
import CasaPessoasSection from './CasaPessoasSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suíte principal' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Mesa de refeições' },
  { src: '/images/homepage/casa/carousel-08.webp', alt: 'Vista da varanda' },
]

const BODY_PARAGRAPHS = [
  'A Casa de Nabais nasce da terra e volta a ela. Entre muros antigos, vinhas trabalhadas à mão, o pomar, a horta e a mesa, vive-se um Minho verdadeiro, onde o saber agrícola, o vinho e a hospitalidade formam uma mesma realidade.',
  'Os nossos vinhos começam muito antes de chegarem à garrafa. Começam no subsolo granítico, atravessado por um raro veio de xisto. Continuam no cuidado diário da vinha, na espera paciente, na decisão de intervir pouco. E revelam-se no copo — frescos, precisos, coerentes com o lugar de onde vêm.',
  'Ficar na Casa de Nabais é entrar nesse ritmo: dormir num solar com séculos de história, acordar com a paisagem do Vale do Lima à nossa volta, provar o vinho na terra onde nasce, a mesma que nos dá os frutos, os legumes e as aromáticas que servimos. Entre as vinhas, a adega e a mesa, quem nos visita é convidado a compreender o vinho desde a sua origem, numa experiência próxima e autêntica, vivida com quem o faz.',
  'A generosidade do conjunto e do que o rodeia dispensa encenações ou adornos em excesso. A casa, a vinha, o vinho e a mesa existem em continuidade. Tudo tem origem, intenção e função. Tudo foi pensado para durar, não para impressionar. Receber, na Casa de Nabais, é um ato simples e profundo: abrir a casa, partilhar o que se faz, explicar aquilo em que se acredita.',
]

const CLOSING_TEXT = 'Mais do que um lugar para visitar e partir, a Casa de Nabais é um lugar para se ficar, oferecendo estadias em plena paisagem minhota e revelando-se como um refúgio para ser vivido com tempo — como verdadeira casa de campo que é, onde vinho, história e hospitalidade se unem para criar uma experiência rara e memorável no Minho.'

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12

export default function CasaPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // SectionVinhas-style refs
  const sectionRef  = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef  = useRef<HTMLDivElement>(null)
  const imgWrapRef   = useRef<HTMLDivElement>(null)

  // Panoramic image parallax refs
  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef       = useRef<HTMLDivElement>(null)

  // Mobile hero parallax refs
  const mobileHeroRef    = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)

  // Carousel state — idêntico a SectionVinhas
  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth,   setSlideWidth]   = useState(380)
  const [isMobile,     setIsMobile]     = useState(true)
  const [index,        setIndex]        = useState(0)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const [grabbing,      setGrabbing]      = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
    if (Math.abs(diff) < 8) {
      const el = document.elementFromPoint(dragStartX.current, dragStartY.current)
      const slide = el?.closest('[data-slide-index]') as HTMLElement | null
      if (slide?.dataset.slideIndex !== undefined) setLightboxIndex(Number(slide.dataset.slideIndex))
      return
    }
    if (diff > 50 && canNext) next()
    else if (diff < -50 && canPrev) prev()
  }

  useIsomorphicLayoutEffect(() => {
    function measure() {
      if (!containerRef.current) return
      const isLg = window.innerWidth >= 1024
      setIsMobile(!isLg)
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

      gsap.from('.reveal-casa', {
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
    <div ref={pageRef} style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ══════════════════════════════════════
          MOBILE HERO — foto + gradiente
      ══════════════════════════════════════ */}
      <div ref={mobileHeroRef} className="relative lg:hidden" style={{ height: 'calc(85svh - 72px)' }}>

        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={mobileHeroImgRef}
            className="absolute will-change-transform"
            style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
          >
            <Image
              src="/images/homepage/casa/section-01.webp"
              alt="A Casa de Nabais"
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
            bottom: '40px',
            zIndex: 2,
            fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
            lineHeight: 1.0,
            letterSpacing: '0.05em',
            color: '#FAE6C1',
            textShadow: '0 2px 28px rgba(3,29,29,0.95)',
          }}
        >
          A Casa<br />de Nabais
        </h1>
      </div>

      {/* Mobile intro text */}
      <div
        className="relative lg:hidden px-6 pt-5 pb-16 text-center"
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
          Na Casa de Nabais, o tempo corre ao ritmo da vinha, da luz que ilumina o Vale do Lima e das estações que regressam sempre diferentes. Construída há mais de quatro séculos, é uma casa feita para cultivar, acolher e durar.
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
          A Casa de Nabais
        </h1>
      </div>

      {/* ══════════════════════════════════════
          INTRO — desktop only
      ══════════════════════════════════════ */}
      <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            Na Casa de Nabais, o tempo corre ao ritmo da vinha, da luz que ilumina o Vale do Lima e das estações que regressam sempre diferentes. Construída há mais de quatro séculos, é uma casa feita para cultivar, acolher e durar.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          IMAGEM PANORÂMICA 16:7 — desktop only
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
              src="/images/homepage/casa/section-01.webp"
              alt="Vista exterior da Casa de Nabais"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          GRID + CARROSSEL
          Padrão SectionVinhas: texto ESQ, retrato DIR
      ══════════════════════════════════════ */}
      <section ref={sectionRef} className="pt-0 pb-20 md:pb-28">

        <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Retrato ESQUERDA — só desktop */}
            <div className="reveal-casa hidden lg:block">
              <div
                ref={portraitRef}
                className="relative overflow-hidden w-full"
                style={{ aspectRatio: IMG_RATIO, backgroundColor: '#3A5B4F', borderRadius: '4px' }}
              >
                <div
                  ref={imgWrapRef}
                  className="absolute will-change-transform"
                  style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                >
                  <Image
                    src="/images/homepage/casa/carousel-02.webp"
                    alt="Casa de Nabais — interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Texto DIREITA */}
            <div className="flex flex-col px-0 lg:pl-10">
              {BODY_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="reveal-casa font-body text-cn-text-muted mb-4 last:mb-0 text-center lg:text-left"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6 }}
                >
                  {para}
                </p>
              ))}
            </div>

          </div>
        </div>

        {/* Carrossel — alinhado à esquerda do container, sangra para a direita */}
        <div
          className="mt-10 md:mt-14 lg:mt-16 py-2 select-none"
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
                data-slide-index={i}
                style={{
                  width: `${slideWidth}px`,
                  aspectRatio: IMG_RATIO,
                  backgroundColor: '#3A5B4F',
                  borderRadius: '4px',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
                  cursor: grabbing ? 'grabbing' : 'zoom-in',
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

        {/* Navegação */}
        <div
          className="mt-5 flex items-center gap-5 justify-center lg:justify-start"
          style={isMobile ? {} : { paddingLeft: carouselLeft }}
        >
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Anterior"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canPrev ? 1 : 0.25 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-cn-text-muted">
            {index + 1} de {galleryImages.length}
          </span>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Seguinte"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canNext ? 1 : 0.25 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
        </div>

      </section>

      {/* ══════════════════════════════════════
          FECHO — idêntico a HomepageIntro, COM animação TextReveal
      ══════════════════════════════════════ */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
          <TextReveal
            text={CLOSING_TEXT}
            className="font-display"
            style={{
              fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
              lineHeight: 1.0,
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          />
        </div>

        {/* CTA — centrado, depois do texto animado */}
        <div className="flex justify-center mt-14 md:mt-16 px-6">
          <Link
            href="/ficar-na-casa"
            className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] text-cn-text border border-cn-text px-5 py-3 hover:bg-cn-text hover:text-cn-bg transition-colors duration-200 rounded-[8px]"
          >
            Ficar na Casa
            <ArrowRight size={11} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex(i => Math.min(galleryImages.length - 1, (i ?? 0) + 1))}
        />
      )}

      <CasaHistoriaSection />
      <CasaPessoasSection />

    </div>
  )
}
