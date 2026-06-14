'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import TextReveal from './TextReveal'
import GalleryLightbox from './GalleryLightbox'
import CasaHistoriaSection from './CasaHistoriaSection'
import CasaPessoasSection from './CasaPessoasSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/1. A casa/4.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/5.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/6.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/7.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/8.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/9.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/10.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/11.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/12.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/13.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/14.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/16.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/17.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/18.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/19.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/20.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/21.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/23.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/24.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/25.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/26.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/27.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/28.webp', alt: 'A Casa de Nabais' },
  { src: '/images/1. A casa/29.webp', alt: 'A Casa de Nabais' },
]


const IMG_RATIO = '4/5'
const SLIDE_GAP = 12

export default function CasaPage() {
  const { t } = useLang()
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

  // Mobile portrait parallax refs
  const mobilePortraitOuterRef = useRef<HTMLDivElement>(null)
  const mobilePortraitImgRef   = useRef<HTMLDivElement>(null)

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
          yPercent: -16, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (mobilePortraitImgRef.current && mobilePortraitOuterRef.current && window.innerWidth < 1024) {
        gsap.to(mobilePortraitImgRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: mobilePortraitOuterRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }
    }, pageRef)

    return () => { ctx.revert(); window.removeEventListener('resize', measure) }
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
            className="font-display uppercase mb-7"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.05em',
              color: '#0C4544',
            }}
          >
            {t.casaPage.titleMobile.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>

          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.casaPage.intro}
          </p>
        </div>

        {/* Imagem hero com parallax */}
        <div ref={mobileHeroRef} className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#3A5B4F' }}>
          <div
            ref={mobileHeroImgRef}
            className="absolute will-change-transform"
            style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}
          >
            <Image
              src="/images/1. A casa/1.webp"
              alt="A Casa de Nabais"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ← VOLTAR + TÍTULO (desktop)
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
          {t.casaPage.title}
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
            {t.casaPage.intro}
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
              src="/images/1. A casa/1a.webp"
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

        <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 lg:pt-4">
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
                    src="/images/1. A casa/3.webp"
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
              {/* Parágrafos 1–2: sempre visíveis */}
              {t.casaPage.bodyParagraphs.slice(0, 2).map((para: string, i: number) => (
                <p
                  key={i}
                  className="reveal-casa font-body text-cn-text-muted mb-4 text-center lg:text-left"
                  style={{ fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)', lineHeight: 1.6 }}
                >
                  {para}
                </p>
              ))}
              {/* Parágrafos 3–4: apenas desktop */}
              {t.casaPage.bodyParagraphs.slice(2).map((para: string, i: number) => (
                <p
                  key={i + 2}
                  className="reveal-casa font-body text-cn-text-muted mb-4 last:mb-0 text-center lg:text-left hidden lg:block"
                  style={{ fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)', lineHeight: 1.6 }}
                >
                  {para}
                </p>
              ))}
            </div>

          </div>
        </div>

        {/* ── Mobile: carrossel entre parágrafo 2 e 3 ── */}
        <div
          className="lg:hidden mt-8 py-2 select-none"
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
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="90vw" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden mt-5 flex items-center gap-5 justify-center">
          <button onClick={prev} disabled={!canPrev} aria-label={t.common.previous} className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
            <ArrowLeft size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-cn-text-muted">
            {index + 1} {t.common.of} {galleryImages.length}
          </span>
          <button onClick={next} disabled={!canNext} aria-label={t.common.next} className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
            <ArrowRight size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
        </div>
        <div className="lg:hidden max-w-[1200px] mx-auto px-6 mt-8">
          {t.casaPage.bodyParagraphs.slice(2).map((para: string, i: number) => (
            <p
              key={i + 2}
              className="font-body text-cn-text-muted mb-4 last:mb-0 text-center"
              style={{ fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)', lineHeight: 1.6 }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* ── Desktop: carrossel (inalterado) ── */}
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

        {/* Navegação — desktop only */}
        <div
          className="hidden lg:flex mt-5 items-center gap-5 justify-start"
          style={{ paddingLeft: carouselLeft }}
        >
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label={t.common.previous}
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canPrev ? 1 : 0.25 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-cn-text-muted">
            {index + 1} {t.common.of} {galleryImages.length}
          </span>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label={t.common.next}
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canNext ? 1 : 0.25 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} className="text-cn-text" />
          </button>
        </div>

      </section>

      {/* ── Mobile portrait image — carousel-02.webp, antes do TextReveal ── */}
      <div
        ref={mobilePortraitOuterRef}
        className="relative lg:hidden mx-6 mt-10"
        style={{ aspectRatio: IMG_RATIO, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#3A5B4F' }}
      >
        <div
          ref={mobilePortraitImgRef}
          className="absolute will-change-transform"
          style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
        >
          <Image
            src="/images/1. A casa/3.webp"
            alt="Casa de Nabais — interior"
            fill
            className="object-cover"
            sizes="calc(100vw - 3rem)"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          FECHO — idêntico a HomepageIntro, COM animação TextReveal
      ══════════════════════════════════════ */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
          <TextReveal
            text={t.casaPage.closingText}
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
            {t.common.stayAtEstate}
            <ArrowRight size={11} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
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
