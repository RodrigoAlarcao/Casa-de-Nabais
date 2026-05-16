'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import TextReveal from './TextReveal'
import ImageLightbox from './ImageLightbox'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const carouselImages = [
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suite principal' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Mesa de refeições' },
  { src: '/images/homepage/casa/carousel-07.webp', alt: 'Lareira da sala' },
  { src: '/images/homepage/casa/carousel-08.webp', alt: 'Vista da varanda' },
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12
const MOBILE_LEFT = 16    // px from left edge on mobile
const MOBILE_PEEK = 40    // px of next slide visible on mobile

export default function SectionCasa() {
  const { t } = useLang()
  const sectionRef       = useRef<HTMLElement>(null)
  const containerRef     = useRef<HTMLDivElement>(null)
  const portraitRef      = useRef<HTMLDivElement>(null)
  const imgWrapRef       = useRef<HTMLDivElement>(null)
  const mobileOuterRef   = useRef<HTMLDivElement>(null)
  const mobileImgWrapRef = useRef<HTMLDivElement>(null)

  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth,   setSlideWidth]   = useState(380)
  const [isMobile,     setIsMobile]     = useState(true)
  const [index,        setIndex]        = useState(0)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const [grabbing,      setGrabbing]      = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const canPrev = index > 0
  const canNext = index < carouselImages.length - 1

  function prev() { if (canPrev) setIndex((i) => i - 1) }
  function next() { if (canNext) setIndex((i) => i + 1) }

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
        const sw = portraitRect.width
        setSlideWidth(sw)
        // 2nd slide aligns with the left edge of the portrait image
        setCarouselLeft(`${portraitRect.left - sw - SLIDE_GAP}px`)
      } else {
        setCarouselLeft(`${MOBILE_LEFT}px`)
        setSlideWidth(Math.round(window.innerWidth - MOBILE_LEFT - SLIDE_GAP - MOBILE_PEEK))
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

  // Shared carousel strip (used in both mobile and desktop)
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
            <div key={i} className="relative flex-shrink-0 overflow-hidden"
              data-slide-index={i}
              style={{ width: `${slideWidth}px`, aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px', boxShadow: '0 8px 28px rgba(0,0,0,0.22)', cursor: grabbing ? 'grabbing' : 'zoom-in' }}>
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
    <section ref={sectionRef} className="md:pt-28 pb-0">

      {/* ══ MOBILE: one seamless dark block (text + carousel + nav + CTAs) ══ */}

      {/* Hero image */}
      <div ref={mobileOuterRef} className="relative lg:hidden overflow-hidden" style={{ height: 'calc(100svh - 72px)', backgroundColor: '#031D1D' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div ref={mobileImgWrapRef} className="absolute will-change-transform"
            style={{ top: '-20%', bottom: '-20%', left: 0, right: 0 }}>
            <Image src="/images/homepage/casa/section-01.webp" alt="Fachada da Casa de Nabais"
              fill className="object-cover" sizes="100vw" priority />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1,
            background: 'linear-gradient(to bottom, transparent 62%, rgba(25,79,78,0.72) 74%, rgba(3,29,29,0.96) 84%, #031D1D 93%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-center" style={{ zIndex: 2 }}>
          <h2 className="reveal-casa font-display uppercase mb-8"
            style={{ fontSize: 'clamp(2rem, 8vw, 2.75rem)', lineHeight: 1.05, letterSpacing: '0.04em', color: '#FAE6C1' }}>
            {t.sectionCasa.headingMobile.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <div className="flex flex-col gap-2">
            <Link href="/a-casa"
              className="flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-4 py-3 transition-colors duration-200"
              style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}>
              {t.common.learnMore} <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
            <Link href="/ficar-na-casa"
              className="flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-4 py-3 transition-colors duration-200"
              style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}>
              {t.common.stayAtEstate} <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel + nav + TextReveal — fundo contínuo com -2px overlap */}
      <div className="relative lg:hidden" style={{ marginTop: '-2px', background: '#031D1D', zIndex: 2 }}>
        <div className="px-6 pt-10 pb-6 text-center">
          <p className="reveal-casa font-body"
            style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}>
            {t.sectionCasa.body}
          </p>
        </div>
        <div className="pt-2">
          <CarouselStrip />
        </div>

        {/* Navigation */}
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



        {/* TextReveal — mobile */}
        <div className="px-6 pt-10 pb-20 text-center">
          <TextReveal
            text={t.sectionCasa.textRevealMobile}
            className="font-display"
            style={{ fontSize: 'clamp(1.125rem, 4.5vw, 1.375rem)', lineHeight: 1.2, fontWeight: 400, color: '#FAE6C1' }}
            ghostOpacity={0.18}
          />
        </div>
      </div>

      {/* ══ DESKTOP: text + portrait grid ══════════════════════════════════ */}

      <div ref={containerRef} className="hidden lg:block max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="flex flex-col justify-center px-[4.5rem]">
            <h2 className="reveal-casa font-display uppercase mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0, letterSpacing: '0.04em', color: '#FAE6C1' }}>
              {t.sectionCasa.headingDesktop.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="reveal-casa font-body mb-10"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.72)' }}>
              {t.sectionCasa.body}
            </p>
            <div className="reveal-casa flex items-center gap-4">
              <Link href="/a-casa"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}>
                {t.sectionCasa.learnMore} <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <Link href="/ficar-na-casa"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}>
                {t.common.stayAtEstate} <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
          <div className="reveal-casa">
            <div ref={portraitRef} className="relative overflow-hidden w-full"
              style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}>
              <div ref={imgWrapRef} className="absolute will-change-transform"
                style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}>
                <Image src="/images/homepage/casa/section-01.webp" alt="Fachada da Casa de Nabais"
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

      {/* Desktop navigation */}
      <div className="hidden lg:flex mt-5 items-center gap-5"
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

      {/* TextReveal — desktop only */}
      <div className="hidden lg:block max-w-[1050px] mx-auto px-10 py-28 text-center">
        <TextReveal
          text={t.sectionCasa.textRevealDesktop}
          className="font-display"
          style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', lineHeight: 1.0, fontWeight: 400, color: '#FAE6C1' }}
          ghostOpacity={0.18}
        />
      </div>

    </section>

    {lightboxIndex !== null && (
      <ImageLightbox
        images={carouselImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(carouselImages.length - 1, (i ?? 0) + 1))}
      />
    )}
    </>
  )
}
