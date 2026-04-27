'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
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
  'Ficar na Casa de Nabais é entrar nesse ritmo: dormir num solar com séculos de história, acordar com a paisagem do Vale do Lima à nossa volta, provar o vinho na terra onde nasce, a mesma que nos dá os frutos, os legumes e as aromáticas que servimos. Entre as vinhas, a adega e a mesa, quem nos visita é convidado a compreender o vinho desde a sua origem, numa experiência próxima e autêntica, vivida com quem o faz.',
  'A generosidade do conjunto e do que o rodeia dispensa encenações ou adornos em excesso. A casa, a vinha, o vinho e a mesa existem em continuidade. Tudo tem origem, intenção e função. Tudo foi pensado para durar, não para impressionar. Receber, na Casa de Nabais, é um ato simples e profundo: abrir a casa, partilhar o que se faz, explicar aquilo em que se acredita.',
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12
const MOBILE_LEFT = 16
const MOBILE_PEEK = 40

export default function CasaPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // 2-col section — for carousel alignment
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef  = useRef<HTMLDivElement>(null)
  const imgWrapRef   = useRef<HTMLDivElement>(null)

  // Carousel state
  const [carouselLeft, setCarouselLeft] = useState('16px')
  const [slideWidth,   setSlideWidth]   = useState(320)
  const [index,        setIndex]        = useState(0)
  const [grabbing,     setGrabbing]     = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)

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
      const isLg = window.innerWidth >= 1024
      if (isLg && containerRef.current && portraitRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setCarouselLeft(`${rect.left}px`)
        setSlideWidth(portraitRef.current.getBoundingClientRect().width)
      } else {
        setCarouselLeft(`${MOBILE_LEFT}px`)
        setSlideWidth(Math.round(window.innerWidth - MOBILE_LEFT - SLIDE_GAP - MOBILE_PEEK))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.ca-hero', {
        y: 22, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.ca-hero-wrap', start: 'top 85%' },
      })
      gsap.from('.ca-body', {
        y: 28, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.ca-body-section', start: 'top 72%' },
      })
      gsap.from('.ca-closing', {
        y: 22, opacity: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.ca-closing-wrap', start: 'top 82%' },
      })

      if (imgWrapRef.current && portraitRef.current && window.innerWidth >= 1024) {
        gsap.to(imgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top bottom', end: 'bottom top', scrub: 1,
          },
        })
      }
    }, pageRef)

    return () => { ctx.revert(); window.removeEventListener('resize', measure) }
  }, [])

  function CarouselStrip() {
    return (
      <div
        className="py-2 select-none"
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
                backgroundColor: '#0A3A39',
                borderRadius: '4px',
                boxShadow: '0 4px 20px rgba(3,29,29,0.12)',
                cursor: grabbing ? 'grabbing' : 'zoom-in',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ════════════════════════════════════════
          HERO TEXTUAL
      ════════════════════════════════════════ */}
      <div className="ca-hero-wrap max-w-[750px] mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-10 md:pb-14">

        {/* ← Voltar */}
        <Link
          href="/"
          className="ca-hero inline-flex items-center gap-1.5 mb-10 md:mb-12 transition-opacity duration-200 hover:opacity-50"
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

        {/* Título */}
        <h1
          className="ca-hero font-display uppercase text-center"
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 3rem)',
            lineHeight: 1.0,
            letterSpacing: '0.05em',
            color: '#0C4544',
            marginBottom: '1.5rem',
          }}
        >
          A Casa de Nabais
        </h1>

        {/* Parágrafo introdutório */}
        <p
          className="ca-hero font-body text-center"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.7,
            color: '#3A5B4F',
            maxWidth: '540px',
            margin: '0 auto',
          }}
        >
          Na Casa de Nabais, o tempo corre ao ritmo da vinha, da luz que ilumina o Vale do Lima e das estações que regressam sempre diferentes. Construída há mais de quatro séculos, é uma casa feita para cultivar, acolher e durar.
        </p>
      </div>

      {/* ════════════════════════════════════════
          IMAGEM PANORÂMICA (16:7)
      ════════════════════════════════════════ */}
      <div className="max-w-[750px] mx-auto px-6 md:px-8 pb-14 md:pb-20">
        <div
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: '16/7', backgroundColor: '#0A3A39', borderRadius: '4px' }}
        >
          <Image
            src="/images/homepage/casa/section-01.webp"
            alt="Vista exterior da Casa de Nabais"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 750px) 100vw, 750px"
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECÇÃO EDITORIAL — retrato + corpo
          (padrão Enoturismo, fundo claro, sem título)
      ════════════════════════════════════════ */}
      <section className="ca-body-section pb-12 md:pb-20">

        {/* MOBILE: retrato inline + texto abaixo */}
        <div className="lg:hidden px-6">
          <div
            className="relative overflow-hidden mb-8"
            style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
          >
            <Image
              src="/images/homepage/casa/carousel-05.webp"
              alt="Jardim histórico da Casa de Nabais"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {BODY_PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className="ca-body font-body mb-5 last:mb-0"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.7, color: '#3A5B4F' }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* DESKTOP: retrato esquerda, texto direita */}
        <div
          ref={containerRef}
          className="hidden lg:block max-w-[750px] mx-auto px-6 md:px-8"
        >
          <div className="grid grid-cols-[5fr_7fr] gap-10 items-start">

            {/* Retrato com parallax */}
            <div className="ca-body">
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
                    src="/images/homepage/casa/carousel-05.webp"
                    alt="Jardim histórico da Casa de Nabais"
                    fill
                    className="object-cover"
                    sizes="35vw"
                  />
                </div>
              </div>
            </div>

            {/* Parágrafos */}
            <div className="flex flex-col justify-start pt-2">
              {BODY_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="ca-body font-body mb-6 last:mb-0"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.75, color: '#3A5B4F' }}
                >
                  {para}
                </p>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════
          GALERIA — carrossel full-bleed
      ════════════════════════════════════════ */}
      <div className="mt-4 md:mt-6">
        <CarouselStrip />

        {/* Nav */}
        <div
          className="mt-5 mb-16 md:mb-20 flex items-center gap-5"
          style={{ paddingLeft: carouselLeft }}
        >
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Anterior"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canPrev ? 1 : 0.25 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#031D1D' }} />
          </button>
          <span
            className="font-display text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'rgba(3,29,29,0.45)' }}
          >
            {index + 1} de {galleryImages.length}
          </span>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Seguinte"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canNext ? 1 : 0.25 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#031D1D' }} />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════
          PARÁGRAFO DE FECHO
      ════════════════════════════════════════ */}
      <div className="ca-closing-wrap max-w-[750px] mx-auto px-6 md:px-8 pb-24 md:pb-32 text-center">
        <p
          className="ca-closing font-body"
          style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: '#3A5B4F',
          }}
        >
          Mais do que um lugar para visitar e partir, a Casa de Nabais é um lugar para se ficar, oferecendo estadias em plena paisagem minhota e revelando-se como um refúgio para ser vivido com tempo — como verdadeira casa de campo que é, onde vinho, história e hospitalidade se unem para criar uma experiência rara e memorável no Minho.
        </p>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex(i => Math.min(galleryImages.length - 1, (i ?? 0) + 1))}
        />
      )}

    </div>
  )
}
