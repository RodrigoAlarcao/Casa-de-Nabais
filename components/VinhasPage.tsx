'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionExplore from './SectionExplore'
import TextReveal from './TextReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const carouselImages = [
  { src: '/images/2. As vinhas/2.webp', alt: 'Vinha do Pomar em flor' },
  { src: '/images/2. As vinhas/3.webp', alt: 'Vindima à mão' },
  { src: '/images/2. As vinhas/4.webp', alt: 'Cachos de Loureiro' },
  { src: '/images/2. As vinhas/5.webp', alt: 'Vale do Lima' },
  { src: '/images/2. As vinhas/6.webp', alt: 'Ramada tradicional minhota' },
  { src: '/images/2. As vinhas/7.webp', alt: 'Adega da Casa de Nabais' },
]

const SLIDE_GAP = 12

export default function VinhasPage() {
  const { t } = useLang()
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
          yPercent: -16, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      // Parallax para as imagens editoriais em mobile
      if (window.innerWidth < 1024) {
        gsap.utils.toArray<HTMLElement>('.mobile-parallax-img').forEach((inner) => {
          gsap.to(inner, {
            yPercent: -16, ease: 'none',
            scrollTrigger: { trigger: inner.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
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
          MOBILE HERO — texto primeiro, depois imagem (igual ao desktop)
      ══════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* ← Voltar */}
        <div className="px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-50"
            style={{ color: '#3A5B4F' }}
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            {t.common.back}
          </Link>
        </div>

        {/* Título + intro */}
        <div className="px-6 pt-8 pb-10 text-center">
          <h1
            className="font-display uppercase mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.05em',
              color: '#0C4544',
            }}
          >
            {t.vinhasPage.title}
          </h1>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.vinhasPage.intro}
          </p>
        </div>

        {/* Imagem hero com parallax — editorial */}
        <div ref={mobileHeroRef} className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#3A5B4F' }}>
          <div
            ref={mobileHeroImgRef}
            className="absolute will-change-transform"
            style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}
          >
            <Image
              src="/images/2. As vinhas/1.webp"
              alt="As Vinhas da Casa de Nabais"
              fill
              priority
              className="object-cover"
              sizes="calc(100vw - 3rem)"
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
          className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-50"
          style={{ color: '#3A5B4F' }}
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
            color: '#0C4544',
          }}
        >
          {t.vinhasPage.title}
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
              lineHeight: 1.3,
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.vinhasPage.intro}
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
              src="/images/2. As vinhas/1.webp"
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
            {t.vinhasPage.soloHeading}
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.875rem, 3.8vw, 0.9375rem)',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.vinhasPage.soloText}
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
            aria-label={t.common.previous}
            className="p-1 transition-opacity duration-200"
            style={{ opacity: carouselIndex === 0 ? 0.25 : 1 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-cn-text-muted">
            {carouselIndex + 1} {t.common.of} {carouselImages.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={carouselIndex === carouselImages.length - 1}
            aria-label={t.common.next}
            className="p-1 transition-opacity duration-200"
            style={{ opacity: carouselIndex === carouselImages.length - 1 ? 0.25 : 1 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
        </div>

      </section>

      {/* ══════════════════════════════════════
          MOBILE — VITICULTURA INTEGRADA
      ══════════════════════════════════════ */}
      <section className="lg:hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
        {/* Texto primeiro */}
        <div className="px-6 pt-4 pb-8 text-center">
          <h2
            className="font-display mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 7vw, 2rem)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              color: 'var(--color-text)',
            }}
          >
            {t.vinhasPage.viticulturaMobileHeading}
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.875rem, 3.8vw, 0.9375rem)',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.vinhasPage.viticulturaText}
          </p>
        </div>

        {/* Imagem editorial com parallax */}
        <div className="relative overflow-hidden mx-6 mb-4 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#3A5B4F' }}>
          <div className="mobile-parallax-img absolute will-change-transform" style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}>
            <Image
              src="/images/2. As vinhas/7.webp"
              alt="Viticultura integrada"
              fill
              className="object-cover"
              sizes="calc(100vw - 3rem)"
            />
          </div>
        </div>

        {/* Frase animada — depois da fotografia da viticultura */}
        <div className="mobile-quote px-8 py-16 text-center">
          <TextReveal
            text={t.vinhasPage.closingQuote}
            className="font-display"
            style={{ fontSize: 'clamp(1.25rem, 5.5vw, 1.5rem)', lineHeight: 1.45, fontWeight: 400, color: '#0C4544' }}
            ghostOpacity={0.15}
          />
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
                  src="/images/2. As vinhas/2.webp"
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
                  {t.vinhasPage.soloHeading}
                </h2>
                <p
                  className="font-body text-cn-text-muted"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
                >
                  {t.vinhasPage.soloText}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 items-start">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/2. As vinhas/3.webp"
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
                  src="/images/2. As vinhas/4.webp"
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
                  src="/images/2. As vinhas/5.webp"
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
                  {t.vinhasPage.laboratorioHeading}
                </h2>
                <p
                  className="font-body text-cn-text-muted"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
                >
                  {t.vinhasPage.laboratorioText}
                </p>
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/5', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/2. As vinhas/6.webp"
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
                  src="/images/2. As vinhas/7.webp"
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
                  {t.vinhasPage.viticulturaDesktopHeading}
                </h2>
                <p
                  className="font-body text-cn-text-muted"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
                >
                  {t.vinhasPage.viticulturaText}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Frase de fecho */}
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center mt-24 md:mt-32 pb-20 md:pb-28">
          <TextReveal
            text={t.vinhasPage.closingQuote}
            className="font-display"
            style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', lineHeight: 1.3, fontWeight: 400, color: '#0C4544' }}
            ghostOpacity={0.15}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          AS NOSSAS VINHAS
      ══════════════════════════════════════ */}
      <section
        ref={vinhasSecRef}
        style={{ background: 'linear-gradient(to bottom, #0C4544, #031D1D)' }}
        className="pb-16 lg:py-28"
      >
        <div className="max-w-[1200px] mx-auto lg:px-10">

          {/* Heading mobile */}
          <h2
            className="reveal-vinhas-sec lg:hidden font-display uppercase text-center px-6 pt-16 pb-2"
            style={{
              fontSize: 'clamp(1.75rem, 8vw, 2.25rem)',
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            {t.vinhasPage.ourVineyardsHeading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>

          <h2
            className="reveal-vinhas-sec hidden lg:block font-display uppercase text-center mb-16 md:mb-20"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            {t.vinhasPage.ourVineyardsHeading}
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
                      src="/images/2. As vinhas/8.webp"
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
                    {t.vinhasPage.vinhaDoPomarH}
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    {t.vinhasPage.vinhaDoPomarP1}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaDoPomarP2}
                  </p>
                </div>
              </div>

              {/* Mobile: texto + imagem + frase em itálico */}
              <div className="lg:hidden pb-16">
                <div className="px-6 pt-12 pb-6 text-center">
                  <h3
                    className="reveal-vinha-item font-display uppercase mb-5"
                    style={{ fontSize: 'clamp(1.5rem, 6.5vw, 2rem)', lineHeight: 1.0, letterSpacing: '0.06em', color: '#FAE6C1' }}
                  >
                    {t.vinhasPage.vinhaDoPomarH}
                  </h3>
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}
                  >
                    {t.vinhasPage.vinhaDoPomarP1}
                  </p>
                </div>
                <div className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#0A3A39' }}>
                  <div className="mobile-parallax-img absolute will-change-transform" style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}>
                    <Image
                      src="/images/2. As vinhas/8.webp"
                      alt="Vinha do Pomar"
                      fill
                      className="object-cover"
                      sizes="calc(100vw - 3rem)"
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 text-center">
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaDoPomarP2}
                  </p>
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
                      src="/images/2. As vinhas/9.webp"
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
                    {t.vinhasPage.vinhaAdegaH}
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    {t.vinhasPage.vinhaAdegaP1}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaAdegaP2}
                  </p>
                </div>
              </div>

              {/* Mobile: texto + imagem + frase em itálico */}
              <div className="lg:hidden pb-16">
                <div className="px-6 pt-12 pb-6 text-center">
                  <h3
                    className="reveal-vinha-item font-display uppercase mb-5"
                    style={{ fontSize: 'clamp(1.5rem, 6.5vw, 2rem)', lineHeight: 1.0, letterSpacing: '0.06em', color: '#FAE6C1' }}
                  >
                    {t.vinhasPage.vinhaAdegaH}
                  </h3>
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}
                  >
                    {t.vinhasPage.vinhaAdegaP1}
                  </p>
                </div>
                <div className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#0A3A39' }}>
                  <div className="mobile-parallax-img absolute will-change-transform" style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}>
                    <Image
                      src="/images/2. As vinhas/9.webp"
                      alt="Vinha da Adega"
                      fill
                      className="object-cover"
                      sizes="calc(100vw - 3rem)"
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 text-center">
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaAdegaP2}
                  </p>
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
                      src="/images/2. As vinhas/10.webp"
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
                    {t.vinhasPage.vinhaIgrejaH}
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    {t.vinhasPage.vinhaIgrejaP1}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaIgrejaP2}
                  </p>
                </div>
              </div>

              {/* Mobile: texto + imagem + frase em itálico */}
              <div className="lg:hidden pb-16">
                <div className="px-6 pt-12 pb-6 text-center">
                  <h3
                    className="reveal-vinha-item font-display uppercase mb-5"
                    style={{ fontSize: 'clamp(1.5rem, 6.5vw, 2rem)', lineHeight: 1.0, letterSpacing: '0.06em', color: '#FAE6C1' }}
                  >
                    {t.vinhasPage.vinhaIgrejaH}
                  </h3>
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}
                  >
                    {t.vinhasPage.vinhaIgrejaP1}
                  </p>
                </div>
                <div className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#0A3A39' }}>
                  <div className="mobile-parallax-img absolute will-change-transform" style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}>
                    <Image
                      src="/images/2. As vinhas/10.webp"
                      alt="Vinha da Igreja"
                      fill
                      className="object-cover"
                      sizes="calc(100vw - 3rem)"
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 text-center">
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaIgrejaP2}
                  </p>
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
                      src="/images/2. As vinhas/11.webp"
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
                    {t.vinhasPage.vinhaTalhaoH}
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    {t.vinhasPage.vinhaTalhaoP1}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaTalhaoP2}
                  </p>
                </div>
              </div>

              {/* Mobile: texto + imagem + frase em itálico */}
              <div className="lg:hidden pb-16">
                <div className="px-6 pt-12 pb-6 text-center">
                  <h3
                    className="reveal-vinha-item font-display uppercase mb-5"
                    style={{ fontSize: 'clamp(1.5rem, 6.5vw, 2rem)', lineHeight: 1.05, letterSpacing: '0.06em', color: '#FAE6C1' }}
                  >
                    {t.vinhasPage.vinhaTalhaoH.split('\n').map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </h3>
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}
                  >
                    {t.vinhasPage.vinhaTalhaoP1}
                  </p>
                </div>
                <div className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#0A3A39' }}>
                  <div className="mobile-parallax-img absolute will-change-transform" style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}>
                    <Image
                      src="/images/2. As vinhas/11.webp"
                      alt="Vinha Talhão de Xisto"
                      fill
                      className="object-cover"
                      sizes="calc(100vw - 3rem)"
                    />
                  </div>
                </div>
                <div className="px-6 pt-6 text-center">
                  <p
                    className="reveal-vinha-item font-body"
                    style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)', fontStyle: 'italic' }}
                  >
                    {t.vinhasPage.vinhaTalhaoP2}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      <SectionExplore excludeHref="/as-vinhas" />

    </div>
  )
}
