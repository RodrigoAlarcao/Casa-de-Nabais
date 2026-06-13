'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import GalleryLightbox from './GalleryLightbox'
import TextReveal from './TextReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const carouselImages = [
  { src: '/images/1. A casa/31.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/32.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/33.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/34.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/35.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/36.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/37.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/38.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/39.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/40.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/41.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/42.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/43.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/44.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/45.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/46.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/47.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/48.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/49.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/50.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/51.webp', alt: 'História da Casa de Nabais' },
  { src: '/images/1. A casa/52.webp', alt: 'História da Casa de Nabais' },
]


const IMG_RATIO = '4/5'
const SLIDE_GAP = 12
const MOBILE_LEFT = 16
const MOBILE_PEEK = 40

export default function CasaHistoriaSection() {
  const { t } = useLang()
  const sectionRef       = useRef<HTMLElement>(null)
  const containerRef     = useRef<HTMLDivElement>(null)
  const portraitRef      = useRef<HTMLDivElement>(null)
  const imgWrapRef       = useRef<HTMLDivElement>(null)
  const mobileOuterRef   = useRef<HTMLDivElement>(null)
  const mobileImgWrapRef = useRef<HTMLDivElement>(null)

  const [carouselLeft,  setCarouselLeft]  = useState('40px')
  const [slideWidth,    setSlideWidth]    = useState(380)
  const [isMobile,      setIsMobile]      = useState(true)
  const [index,         setIndex]         = useState(0)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const [grabbing,      setGrabbing]      = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const canPrev = index > 0
  const canNext = index < carouselImages.length - 1

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
      const rect = containerRef.current.getBoundingClientRect()
      const isLg = window.innerWidth >= 1024
      setIsMobile(!isLg)
      if (isLg && portraitRef.current) {
        const portraitRect = portraitRef.current.getBoundingClientRect()
        const slideW = portraitRect.width
        setSlideWidth(slideW)
        setCarouselLeft(`${portraitRect.left - slideW - SLIDE_GAP}px`)
      } else {
        setCarouselLeft(`${MOBILE_LEFT}px`)
        setSlideWidth(Math.round(window.innerWidth - MOBILE_LEFT - SLIDE_GAP - MOBILE_PEEK))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-hist', {
        y: 30, opacity: 0, stagger: 0.09, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgWrapRef.current && portraitRef.current && window.innerWidth >= 1024) {
        gsap.to(imgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: portraitRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (mobileImgWrapRef.current && mobileOuterRef.current && window.innerWidth < 1024) {
        gsap.to(mobileImgWrapRef.current, {
          yPercent: -10, ease: 'none',
          scrollTrigger: { trigger: mobileOuterRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

    }, sectionRef)

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
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              data-slide-index={i}
              style={{
                width: `${slideWidth}px`,
                aspectRatio: IMG_RATIO,
                backgroundColor: '#0A3A39',
                borderRadius: '4px',
                boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
                cursor: grabbing ? 'grabbing' : 'zoom-in',
              }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover"
                sizes="(max-width: 768px) 90vw, 50vw" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
    <section
      ref={sectionRef}
      style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 25%, #031D1D 100%)' }}
    >

      {/* ══════════════════════════════════════════
          TÍTULO — layout SectionVinificacao (desktop)
      ══════════════════════════════════════════ */}

      {/* Desktop */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-10 py-28">
        <div className="grid grid-cols-2 gap-20 items-center">
          <h2
            className="reveal-hist font-display uppercase"
            style={{
              fontSize: 'clamp(1.875rem, 3.2vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            {t.casaHistoria.heading}
          </h2>
          <p
            className="reveal-hist font-body px-10"
            style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)' }}
          >
            {t.casaHistoria.intro}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE: imagem hero + bloco de texto
      ══════════════════════════════════════════ */}

      <div ref={mobileOuterRef} className="relative lg:hidden overflow-hidden" style={{ height: 'calc(100svh - 72px)', background: '#031D1D' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div ref={mobileImgWrapRef} className="absolute will-change-transform"
            style={{ top: '-20%', bottom: '-20%', left: 0, right: 0 }}>
            <Image src="/images/1. A casa/30.webp" alt="Fachada histórica da Casa de Nabais"
              fill className="object-cover" sizes="100vw" />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: 'linear-gradient(to bottom, transparent 62%, rgba(25,79,78,0.72) 74%, rgba(3,29,29,0.96) 84%, #031D1D 93%)',
          }}
        />
        <div className="absolute left-0 right-0 bottom-0 px-6 pb-4 text-center" style={{ zIndex: 2 }}>
          <h2
            className="reveal-hist font-display uppercase"
            style={{
              fontSize: 'clamp(1.875rem, 6vw, 2.5rem)',
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            {t.casaHistoria.headingMobile}
          </h2>
        </div>
      </div>

      <div className="relative lg:hidden" style={{ marginTop: '-2px', background: '#031D1D', zIndex: 2 }}>
        <div className="px-6 pt-0 pb-6 text-center">
          <p
            className="reveal-hist font-body"
            style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)' }}
          >
            {t.casaHistoria.intro}
          </p>
        </div>
        <div className="pt-2">
          <CarouselStrip />
        </div>

        <div className="mt-5 flex items-center gap-5 justify-center">
          <button onClick={prev} disabled={!canPrev} aria-label={t.common.previous}
            className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
            <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'rgba(250,230,193,0.55)' }}>
            {index + 1} {t.common.of} {carouselImages.length}
          </span>
          <button onClick={next} disabled={!canNext} aria-label={t.common.next}
            className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
            <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
        </div>

        <div className="px-6 pt-10 pb-4 text-center">
          {t.casaHistoria.bodyParagraphs.map((para: string, i: number) => (
            <p
              key={i}
              className="reveal-hist font-body mb-5 last:mb-0"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)' }}
            >
              {para}
            </p>
          ))}
        </div>

        <div className="px-6 py-16 text-center">
          <TextReveal
            text={t.casaHistoria.closingText}
            className="font-display"
            style={{ fontSize: 'clamp(1.125rem, 4.5vw, 1.375rem)', lineHeight: 1.2, fontWeight: 400, color: '#FAE6C1' }}
            triggerStart="top 85%"
            triggerEnd="bottom 55%"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP: texto ESQ, retrato DIR (padrão SectionCasa)
      ══════════════════════════════════════════ */}

      <div ref={containerRef} className="hidden lg:block max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-2 gap-16 items-center">

          <div className="flex flex-col justify-center px-[4.5rem]">
            {t.casaHistoria.bodyParagraphs.map((para: string, i: number) => (
              <p
                key={i}
                className="reveal-hist font-body mb-8 last:mb-0"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)' }}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="reveal-hist">
            <div ref={portraitRef} className="relative overflow-hidden w-full"
              style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}>
              <div ref={imgWrapRef} className="absolute will-change-transform"
                style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}>
                <Image src="/images/1. A casa/30.webp" alt="Fachada histórica da Casa de Nabais"
                  fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop carousel */}
      <div className="hidden lg:block mt-4">
        <CarouselStrip />
      </div>

      {/* Desktop nav */}
      <div className="hidden lg:block mt-5 flex items-center gap-5"
        style={{ paddingLeft: carouselLeft }}>
        <button onClick={prev} disabled={!canPrev} aria-label={t.common.previous}
          className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
          <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
        <span className="font-display text-[10px] uppercase tracking-[0.16em]"
          style={{ color: 'rgba(250,230,193,0.55)' }}>
          {index + 1} {t.common.of} {carouselImages.length}
        </span>
        <button onClick={next} disabled={!canNext} aria-label={t.common.next}
          className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
          <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      </div>

      {/* Desktop closing text — padrão Enoturismo */}
      <div className="hidden lg:block max-w-[1050px] mx-auto px-10 py-28 text-center">
        <TextReveal
          text={t.casaHistoria.closingText}
          className="font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#FAE6C1',
          }}
          triggerStart="top 35%"
          triggerEnd="bottom 10%"
        />
      </div>

    </section>

    {lightboxIndex !== null && (
      <GalleryLightbox
        images={carouselImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
        onNext={() => setLightboxIndex(i => Math.min(carouselImages.length - 1, (i ?? 0) + 1))}
      />
    )}
    </>
  )
}
