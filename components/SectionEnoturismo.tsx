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

gsap.registerPlugin(ScrollTrigger)

const carouselImages = [
  { src: '/images/homepage/enoturismo/carousel-01.webp', alt: 'Prova de vinhos na adega' },
  { src: '/images/homepage/enoturismo/carousel-02.webp', alt: 'Visita guiada às vinhas' },
  { src: '/images/homepage/enoturismo/carousel-03.webp', alt: 'Almoço na quinta' },
  { src: '/images/homepage/enoturismo/carousel-04.webp', alt: 'Passeio na mata' },
  { src: '/images/homepage/enoturismo/carousel-05.webp', alt: 'Vindima' },
  { src: '/images/homepage/enoturismo/carousel-06.webp', alt: 'Pôr do sol no Vale do Lima' },
  { src: '/images/homepage/enoturismo/carousel-07.webp', alt: 'Terraço da casa' },
  { src: '/images/homepage/enoturismo/carousel-08.webp', alt: 'Cesta de produtos locais' },
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12
const MOBILE_LEFT = 16
const MOBILE_PEEK = 40

export default function SectionEnoturismo() {
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
  const [grabbing,      setGrabbing]    = useState(false)
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
        setSlideWidth(portraitRect.width)
        // Portrait is the LEFT column — 1st slide aligns with it directly
        setCarouselLeft(`${portraitRect.left}px`)
      } else {
        setCarouselLeft(`${MOBILE_LEFT}px`)
        setSlideWidth(Math.round(window.innerWidth - MOBILE_LEFT - SLIDE_GAP - MOBILE_PEEK))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-eno', {
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
          yPercent: 20, ease: 'none',
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
    <section ref={sectionRef} className="pt-0 pb-0">

      {/* ══ MOBILE ══ */}

      {/* Hero image */}
      <div ref={mobileOuterRef} className="relative lg:hidden overflow-hidden" style={{ minHeight: '100svh', backgroundColor: '#031D1D' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div ref={mobileImgWrapRef} className="absolute will-change-transform"
            style={{ top: '-20%', bottom: '-20%', left: 0, right: 0 }}>
            <Image src="/images/homepage/enoturismo/section-01.webp" alt="Enoturismo na Casa de Nabais"
              fill className="object-cover" sizes="100vw" priority />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1,
            background: 'linear-gradient(to bottom, transparent 45%, rgba(56,103,102,0.14) 56%, rgba(56,103,102,0.50) 64%, rgba(25,79,78,0.80) 71%, rgba(3,29,29,0.93) 80%, #031D1D 90%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-center" style={{ zIndex: 2 }}>
          <h2 className="reveal-eno font-display uppercase mb-6"
            style={{ fontSize: 'clamp(2rem, 8vw, 2.75rem)', lineHeight: 1.05, letterSpacing: '0.04em', color: '#FAE6C1' }}>
            Enoturismo
          </h2>
          <p className="reveal-eno font-body mb-8"
            style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.75)' }}>
            Na Casa de Nabais, o enoturismo nasce da terra e tem as pessoas no centro. Entre solos graníticos e um raro veio de xisto, a cada experiência partilhamos a vida da quinta — a vinha, a adega, a mesa e os seus produtos — com autenticidade e cuidado de quem os faz.
          </p>
          <div className="flex gap-3">
            <Link href="/o-enoturismo"
              className="flex-1 flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-4 py-3 transition-colors duration-200"
              style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}>
              Saber mais <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
            <Link href="/ficar-na-casa"
              className="flex-1 flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-4 py-3 transition-colors duration-200"
              style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}>
              Ficar na Casa <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel + nav + TextReveal — fundo contínuo com -2px overlap */}
      <div className="relative lg:hidden" style={{ marginTop: '-2px', background: '#031D1D', zIndex: 2 }}>
        <div className="pt-4">
          <CarouselStrip />
        </div>

        {/* Navigation */}
        <div className="mt-5 flex items-center gap-5 justify-center">
          <button onClick={prev} disabled={!canPrev} aria-label="Anterior"
            className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
            <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'rgba(250,230,193,0.55)' }}>
            {index + 1} de {carouselImages.length}
          </span>
          <button onClick={next} disabled={!canNext} aria-label="Seguinte"
            className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
            <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
        </div>

        {/* TextReveal — mobile */}
        <div className="px-6 pb-16 text-center">
          <TextReveal
            text="Entre solos graníticos e um raro veio de xisto, criamos vinhos com identidade e oferecemos uma experiência de enoturismo vivida com quem os faz."
            className="font-display"
            style={{ fontSize: 'clamp(1.125rem, 4.5vw, 1.375rem)', lineHeight: 1.2, fontWeight: 400, color: '#FAE6C1' }}
            ghostOpacity={0.18}
          />
        </div>
      </div>

      {/* ══ DESKTOP ══ image LEFT, text RIGHT */}
      <div ref={containerRef} className="hidden lg:block max-w-[1200px] mx-auto px-10 pt-0 pb-0">
        <div className="grid grid-cols-2 gap-16 items-center">

          <div className="reveal-eno">
            <div ref={portraitRef} className="relative overflow-hidden w-full"
              style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}>
              <div ref={imgWrapRef} className="absolute will-change-transform" style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}>
                <Image src="/images/homepage/enoturismo/section-01.webp" alt="Enoturismo na Casa de Nabais"
                  fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-[4.5rem]">
            <h2 className="reveal-eno font-display uppercase mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0, letterSpacing: '0.04em', color: '#FAE6C1' }}>
              Enoturismo
            </h2>
            <p className="reveal-eno font-body mb-10"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.4, color: 'rgba(255,249,237,0.72)' }}>
              Na Casa de Nabais, o enoturismo nasce da terra e tem as pessoas no centro. Entre solos graníticos e um raro veio de xisto, a cada experiência partilhamos a vida da quinta — a vinha, a adega, a mesa e os seus produtos — com autenticidade e cuidado de quem os faz.
            </p>
            <div className="reveal-eno flex items-center gap-4">
              <Link href="/o-enoturismo"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}>
                Saiba mais <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <Link href="/ficar-na-casa"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}>
                Ficar na Casa <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop carousel */}
      <div className="hidden lg:block mt-4">
        <CarouselStrip />
      </div>

      {/* Desktop navigation */}
      <div className="hidden lg:block mt-5 flex items-center gap-5"
        style={{ paddingLeft: carouselLeft }}>
        <button onClick={prev} disabled={!canPrev} aria-label="Anterior"
          className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
          <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
        <span className="font-display text-[10px] uppercase tracking-[0.16em]"
          style={{ color: 'rgba(250,230,193,0.55)' }}>
          {index + 1} de {carouselImages.length}
        </span>
        <button onClick={next} disabled={!canNext} aria-label="Seguinte"
          className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
          <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      </div>

      {/* Desktop closing text */}
      <div className="hidden lg:block max-w-[1050px] mx-auto px-10 py-28 text-center">
        <p className="reveal-eno font-display"
          style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', lineHeight: 1.3, fontWeight: 400, color: '#FAE6C1' }}>
          Entre solos graníticos e um raro veio de xisto, criamos vinhos com identidade e oferecemos uma experiência de enoturismo vivida com quem os faz.
        </p>
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
