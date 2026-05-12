'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, ArrowRight } from 'lucide-react'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const INTRO_TEXT =
  'Na Casa de Nabais, as vinhas começaram muito antes de o serem. Tudo começa no solo: antes de se plantarem as vinhas, fizemos uma leitura profunda do território, um rigoroso estudo do subsolo e da rocha-mãe e escolhas com visão de longo prazo. Como produtores da uva que vinificamos, controlamos todo o processo — da terra à garrafa — com foco no equilíbrio e na qualidade.'

const CLOSING_QUOTE =
  'Trabalhamos o solo como um ecossistema vivo, onde sustentabilidade ambiental e qualidade caminham juntas.'

const carouselImages = [
  { src: '/images/homepage/vinhas/carousel-01.webp', alt: 'Vinha do Pomar em flor' },
  { src: '/images/homepage/vinhas/carousel-02.webp', alt: 'Vindima à mão' },
  { src: '/images/homepage/vinhas/carousel-03.webp', alt: 'Cachos de Loureiro' },
  { src: '/images/homepage/vinhas/carousel-04.webp', alt: 'Vale do Lima' },
  { src: '/images/homepage/vinhas/carousel-05.webp', alt: 'Ramada tradicional minhota' },
  { src: '/images/homepage/vinhas/carousel-06.webp', alt: 'Adega da Casa de Nabais' },
]

const SLIDE_GAP = 12

export default function VinhasPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const mobileHeroRef = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)
  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef = useRef<HTMLDivElement>(null)
  const editorialRef = useRef<HTMLElement>(null)
  const vinhasSecRef = useRef<HTMLElement>(null)

  const [carouselIndex, setCarouselIndex] = useState(0)
  const dragStartX = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  function prevSlide() { setCarouselIndex(i => Math.max(0, i - 1)) }
  function nextSlide() { setCarouselIndex(i => Math.min(carouselImages.length - 1, i + 1)) }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (diff > 50) nextSlide()
    else if (diff < -50) prevSlide()
  }

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

      gsap.from('.reveal-vinhas', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: editorialRef.current, start: 'top 75%' },
      })

      gsap.utils.toArray<HTMLElement>('.reveal-vinhas-block').forEach((el) => {
        gsap.from(el, {
          y: 25, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      gsap.from('.reveal-vinhas-sec', {
        y: 25, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: vinhasSecRef.current, start: 'top 75%' },
      })

      gsap.utils.toArray<HTMLElement>('.reveal-vinha-row').forEach((el) => {
        gsap.from(el.querySelectorAll('.reveal-vinha-item'), {
          y: 20, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.vinha-img-inner').forEach((inner) => {
        gsap.to(inner, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: inner.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })

      gsap.utils.toArray<HTMLElement>('.vinha-card-glass').forEach((card) => {
        gsap.from(card, {
          y: 35, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.mobile-quote').forEach((el) => {
        gsap.from(el, {
          y: 20, opacity: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--color-bg)' }}>

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
              src="/images/homepage/vinhas/section-01.webp"
              alt="As Vinhas da Casa de Nabais"
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
            background: 'linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(3,29,29,0.20) 35%, rgba(3,29,29,0.75) 52%, rgba(3,29,29,0.97) 68%, #031D1D 80%)',
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
          className="absolute left-0 right-0 bottom-0 px-6 pb-8 flex flex-col items-center text-center"
          style={{ zIndex: 2 }}
        >
          <h1
            className="font-display uppercase mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.05em',
              color: '#FAE6C1',
              textShadow: '0 2px 28px rgba(3,29,29,0.95)',
            }}
          >
            As Vinhas
          </h1>

          <p
            className="font-body mb-8 w-full"
            style={{
              fontSize: 'clamp(0.75rem, 3.2vw, 0.875rem)',
              lineHeight: 1.6,
              color: 'rgba(255,249,237,0.65)',
            }}
          >
            Na Casa de Nabais, as vinhas começaram muito antes de o serem.
            Tudo começa no solo: antes de se plantarem as vinhas, fizemos uma leitura profunda do território,
            um rigoroso estudo do subsolo e da rocha-mãe e escolhas com visão de longo prazo.
            Como produtores da uva que vinificamos, controlamos todo o processo — da terra à garrafa — com foco no equilíbrio e na qualidade.
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
          As Vinhas
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
          DESKTOP — PANORAMIC IMAGE
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
              src="/images/homepage/vinhas/section-01.webp"
              alt="Vinhas da Casa de Nabais — vista panorâmica"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE — O SOLO COMO ORIGEM
      ══════════════════════════════════════ */}
      <section className="lg:hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="px-6 pt-12 pb-8 text-center">
          <h2
            className="font-display mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 7vw, 2rem)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              color: 'var(--color-text)',
            }}
          >
            O solo como origem
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.875rem, 3.8vw, 0.9375rem)',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
            }}
          >
            Mais do que o tipo de rocha, interessa-nos como o solo gere a água, a nutrição e o equilíbrio. Solo granítico, solo de xisto e perfis mistos orientam a escolha de todos os elementos que, na vinha, nos levarão ao estilo de vinho que queremos construir.
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{ overflowX: 'clip', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => setGrabbing(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              gap: `${SLIDE_GAP}px`,
              paddingLeft: '24px',
              transform: `translateX(calc(-${carouselIndex} * (calc(100vw - 64px) + ${SLIDE_GAP}px)))`,
            }}
          >
            {carouselImages.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 relative overflow-hidden"
                style={{
                  width: 'calc(100vw - 64px)',
                  aspectRatio: '4/5',
                  borderRadius: '4px',
                  backgroundColor: '#3A5B4F',
                }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="90vw" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5 justify-center mt-5">
          <button
            onClick={prevSlide}
            disabled={carouselIndex === 0}
            aria-label="Anterior"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: carouselIndex === 0 ? 0.25 : 1 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-cn-text-muted">
            {carouselIndex + 1} de {carouselImages.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={carouselIndex === carouselImages.length - 1}
            aria-label="Seguinte"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: carouselIndex === carouselImages.length - 1 ? 0.25 : 1 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
        </div>

        {/* Animated quote */}
        <div className="mobile-quote px-8 py-14 text-center">
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.25rem, 5.5vw, 1.5rem)',
              lineHeight: 1.45,
              color: '#0C4544',
            }}
          >
            {CLOSING_QUOTE}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MOBILE — VITICULTURA INTEGRADA
      ══════════════════════════════════════ */}
      <section className="lg:hidden">
        {/* Full bleed image with gradient + title + text overlaid */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: '100svh' }}
        >
          <Image
            src="/images/homepage/vinhas/carousel-05.webp"
            alt="Viticultura integrada"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 20%, rgba(5,38,37,0.50) 45%, rgba(5,38,37,0.90) 68%, #052625 88%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 text-center">
            <h2
              className="font-display uppercase mb-5"
              style={{
                fontSize: 'clamp(1.625rem, 7vw, 2.125rem)',
                lineHeight: 1.05,
                letterSpacing: '0.06em',
                color: '#FAE6C1',
              }}
            >
              Viticultura<br />Integrada
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: 'clamp(0.875rem, 3.8vw, 0.9375rem)',
                lineHeight: 1.6,
                color: 'rgba(255,249,237,0.75)',
              }}
            >
              Seguimos um regime de produção integrada, sem herbicidas, caminhando para práticas regenerativas. O enrelvamento da vinha com espécies autóctones controla infestantes, promove biodiversidade e ajuda a regular o vigor das plantas.
            </p>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════
          DESKTOP — SECÇÃO EDITORIAL
      ══════════════════════════════════════ */}
      <section ref={editorialRef} className="hidden lg:block pt-4 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          {/* Bloco A — O solo como origem */}
          <div className="reveal-vinhas">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-01.webp"
                  alt="Solo da vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 25vw"
                />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center lg:px-10">
                <h2
                  className="font-display mb-5"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                    lineHeight: 1.1,
                    letterSpacing: '0.02em',
                    color: 'var(--color-text)',
                  }}
                >
                  O solo como origem
                </h2>
                <p
                  className="font-body text-cn-text-muted"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
                >
                  Mais do que o tipo de rocha, interessa-nos como o solo gere a água, a nutrição e o equilíbrio. Solo granítico, solo de xisto e perfis mistos orientam a escolha de todos os elementos que, na vinha, nos levarão ao estilo de vinho que queremos construir.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 items-start">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-02.webp"
                  alt="Trabalho na vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-03.webp"
                  alt="Detalhe na vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '2/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-04.webp"
                  alt="Paisagem da vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          </div>

          {/* Bloco B — Vinhas como campo de estudo */}
          <div className="reveal-vinhas-block mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div className="lg:col-span-2 flex flex-col justify-center lg:px-14">
                <h2
                  className="font-display mb-5"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                    lineHeight: 1.1,
                    letterSpacing: '0.02em',
                    color: 'var(--color-text)',
                  }}
                >
                  Vinhas como campo de estudo
                </h2>
                <p
                  className="font-body text-cn-text-muted"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
                >
                  As vinhas são recentes, plantadas de raiz, e conduzidas como um laboratório vivo. Testamos diferentes sistemas de poda e condução das videiras, linha a linha, para compreender como influenciam o vigor, a sanidade e a expressão da casta Loureiro.
                </p>
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/5', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-04.webp"
                  alt="Vinhas como campo de estudo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Bloco C — Viticultura integrada */}
          <div className="reveal-vinhas-block mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div
                className="relative overflow-hidden lg:col-span-2"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-05.webp"
                  alt="Viticultura integrada"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 66vw"
                />
              </div>
              <div className="flex flex-col justify-center lg:pl-10">
                <h2
                  className="font-display mb-5"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                    lineHeight: 1.15,
                    letterSpacing: '0.02em',
                    color: 'var(--color-text)',
                  }}
                >
                  Viticultura integrada
                </h2>
                <p
                  className="font-body text-cn-text-muted"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
                >
                  Seguimos um regime de produção integrada, sem herbicidas, caminhando para práticas regenerativas. O enrelvamento da vinha com espécies autóctones controla infestantes, promove biodiversidade e ajuda a regular o vigor das plantas.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Frase de fecho */}
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center mt-24 md:mt-32 pb-4 md:pb-8">
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#0C4544',
            }}
          >
            {CLOSING_QUOTE}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AS NOSSAS VINHAS
      ══════════════════════════════════════ */}
      <section
        ref={vinhasSecRef}
        style={{ background: 'linear-gradient(to bottom, #0C4544, #031D1D)' }}
        className="lg:py-28"
      >
        <div className="max-w-[1200px] mx-auto lg:px-10">

          <h2
            className="reveal-vinhas-sec hidden lg:block font-display uppercase text-center mb-16 md:mb-20"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            As Nossas Vinhas
          </h2>

          <div className="lg:space-y-20">

            {/* ── Vinha do Pomar ── */}
            <div className="reveal-vinha-row">

              {/* Desktop */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 right-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-01.webp"
                      alt="Vinha do Pomar"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute left-0"
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
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha do Pomar
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Com o clássico solo da região — terra preta, muita matéria orgânica e argila — apresenta um terreno fértil, com muito vigor, onde agimos para criar as melhores condições para a vinha.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Aqui o foco é reduzir a produção natural do solo para alcançar mais qualidade, complexidade e identidade no vinho feito a partir da casta Loureiro.
                  </p>
                </div>
              </div>

              {/* Mobile: full bleed */}
              <div className="lg:hidden">
                <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
                  <Image
                    src="/images/homepage/vinhas/carousel-01.webp"
                    alt="Vinha do Pomar"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 25%, rgba(3,29,29,0.50) 50%, rgba(3,29,29,0.90) 70%, #031D1D 88%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 text-center">
                    <h3
                      className="font-display uppercase mb-5"
                      style={{
                        fontSize: 'clamp(1.5rem, 6.5vw, 2rem)',
                        lineHeight: 1.0,
                        letterSpacing: '0.06em',
                        color: '#FAE6C1',
                      }}
                    >
                      Vinha do Pomar
                    </h3>
                    <p
                      className="font-body mb-4"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.75)' }}
                    >
                      Com o clássico solo da região — terra preta, muita matéria orgânica e argila — apresenta um terreno fértil, com muito vigor, onde agimos para criar as melhores condições para a vinha.
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.58)' }}
                    >
                      Aqui o foco é reduzir a produção natural do solo para alcançar mais qualidade, complexidade e identidade no vinho feito a partir da casta Loureiro.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Vinha da Adega ── */}
            <div className="reveal-vinha-row">

              {/* Desktop */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-02.webp"
                      alt="Vinha da Adega"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute right-0"
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
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha da Adega
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Situada numa zona ligeiramente mais elevada da Casa de Nabais, esta é uma vinha de solo muito pobre, pedregoso, com seixo rolado e quase nenhuma retenção de água.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Trata-se de uma parcela de menor produção, mas que entrega uvas mais concentradas, refletindo no vinho um caráter mais profundo e distinto da casta Loureiro que ali cresce.
                  </p>
                </div>
              </div>

              {/* Mobile: full bleed */}
              <div className="lg:hidden">
                <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
                  <Image
                    src="/images/homepage/vinhas/carousel-02.webp"
                    alt="Vinha da Adega"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 25%, rgba(3,29,29,0.50) 50%, rgba(3,29,29,0.90) 70%, #031D1D 88%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 text-center">
                    <h3
                      className="font-display uppercase mb-5"
                      style={{
                        fontSize: 'clamp(1.5rem, 6.5vw, 2rem)',
                        lineHeight: 1.0,
                        letterSpacing: '0.06em',
                        color: '#FAE6C1',
                      }}
                    >
                      Vinha da Adega
                    </h3>
                    <p
                      className="font-body mb-4"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.75)' }}
                    >
                      Situada numa zona ligeiramente mais elevada da Casa de Nabais, esta é uma vinha de solo muito pobre, pedregoso, com seixo rolado e quase nenhuma retenção de água.
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.58)' }}
                    >
                      Trata-se de uma parcela de menor produção, mas que entrega uvas mais concentradas, refletindo no vinho um caráter mais profundo e distinto da casta Loureiro que ali cresce.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Vinha da Igreja ── */}
            <div className="reveal-vinha-row">

              {/* Desktop */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 right-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-04.webp"
                      alt="Vinha da Igreja"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute left-0"
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
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha da Igreja
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Localizada na freguesia da Seara, a poucos quilómetros da Casa de Nabais, apresenta solo granítico com fertilidade e uma exposição solar durante praticamente todo o dia, graças à sua posição num ligeiro planalto.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Foi a escolhida para plantar as castas Alvarinho e Vinhão, explorando esta luz privilegiada para obter maturações mais completas num clima marcadamente atlântico.
                  </p>
                </div>
              </div>

              {/* Mobile: full bleed */}
              <div className="lg:hidden">
                <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
                  <Image
                    src="/images/homepage/vinhas/carousel-04.webp"
                    alt="Vinha da Igreja"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 25%, rgba(3,29,29,0.50) 50%, rgba(3,29,29,0.90) 70%, #031D1D 88%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 text-center">
                    <h3
                      className="font-display uppercase mb-5"
                      style={{
                        fontSize: 'clamp(1.5rem, 6.5vw, 2rem)',
                        lineHeight: 1.0,
                        letterSpacing: '0.06em',
                        color: '#FAE6C1',
                      }}
                    >
                      Vinha da Igreja
                    </h3>
                    <p
                      className="font-body mb-4"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.75)' }}
                    >
                      Localizada na freguesia da Seara, a poucos quilómetros da Casa de Nabais, apresenta solo granítico com fertilidade e uma exposição solar durante praticamente todo o dia, graças à sua posição num ligeiro planalto.
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.58)' }}
                    >
                      Foi a escolhida para plantar as castas Alvarinho e Vinhão, explorando esta luz privilegiada para obter maturações mais completas num clima marcadamente atlântico.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Vinha Talhão de Xisto ── */}
            <div className="reveal-vinha-row">

              {/* Desktop */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-05.webp"
                      alt="Vinha Talhão de Xisto"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute right-0"
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
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha Talhão de Xisto
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Situada na freguesia da Feitosa, também na margem esquerda do Rio Lima, esta parcela singulariza-se pelo substrato xistoso que contrasta com o granito dominante na região.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Aqui a vinha produz menos, as raízes vão a maior profundidade em busca de água e nutrição, e as uvas expressam uma concentração e mineralidade que se transferem directamente para o copo.
                  </p>
                </div>
              </div>

              {/* Mobile: full bleed */}
              <div className="lg:hidden">
                <div className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
                  <Image
                    src="/images/homepage/vinhas/carousel-05.webp"
                    alt="Vinha Talhão de Xisto"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 25%, rgba(3,29,29,0.50) 50%, rgba(3,29,29,0.90) 70%, #031D1D 88%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 text-center">
                    <h3
                      className="font-display uppercase mb-5"
                      style={{
                        fontSize: 'clamp(1.5rem, 6.5vw, 2rem)',
                        lineHeight: 1.0,
                        letterSpacing: '0.06em',
                        color: '#FAE6C1',
                      }}
                    >
                      Vinha Talhão de Xisto
                    </h3>
                    <p
                      className="font-body mb-4"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.75)' }}
                    >
                      Situada na freguesia da Feitosa, também na margem esquerda do Rio Lima, esta parcela singulariza-se pelo substrato xistoso que contrasta com o granito dominante na região.
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.58)' }}
                    >
                      Aqui a vinha produz menos, as raízes vão a maior profundidade em busca de água e nutrição, e as uvas expressam uma concentração e mineralidade que se transferem directamente para o copo.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Mobile bottom padding */}
        <div className="lg:hidden" style={{ height: '48px' }} />
      </section>

      <SectionExplore excludeHref="/as-vinhas" />

    </div>
  )
}
