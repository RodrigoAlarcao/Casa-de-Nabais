'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionExplore from './SectionExplore'
import GalleryLightbox from './GalleryLightbox'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const carouselImages = [
  { src: '/images/1. A casa/26.webp', alt: 'As Pessoas de Nabais' },
  { src: '/images/1. A casa/27.webp', alt: 'As Pessoas de Nabais' },
  { src: '/images/1. A casa/28.webp', alt: 'As Pessoas de Nabais' },
  { src: '/images/1. A casa/29.webp', alt: 'As Pessoas de Nabais' },
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12
const MOBILE_LEFT = 16
const MOBILE_PEEK = 40

export default function CasaPessoasSection() {
  const { t } = useLang()
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth,   setSlideWidth]   = useState(380)
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
      if (isLg) {
        // Two slides visible, aligned to the section content's left edge
        setSlideWidth(Math.round((rect.width - SLIDE_GAP) / 2))
        setCarouselLeft(`${rect.left}px`)
      } else {
        setCarouselLeft(`${MOBILE_LEFT}px`)
        setSlideWidth(Math.round(window.innerWidth - MOBILE_LEFT - SLIDE_GAP - MOBILE_PEEK))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-pessoas', {
        y: 25, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, wrapperRef)

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
              style={{ width: `${slideWidth}px`, aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', cursor: grabbing ? 'grabbing' : 'zoom-in' }}>
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
    <div ref={wrapperRef} style={{ background: 'linear-gradient(180deg, #FFF9ED 0%, #FFF3DE 50%, #FFF9ED 100%)' }}>

      {/* ══════════════════════════════════════
          SECTION: As Pessoas de Nabais
      ══════════════════════════════════════ */}
      <section ref={sectionRef} className="pt-20 pb-20 md:pt-28 md:pb-28">
        <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10">

          <h2
            className="reveal-pessoas font-display uppercase text-cn-text text-center mb-8 md:mb-10"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
            }}
          >
            {t.casaPessoas.heading}
          </h2>

          <p
            className="reveal-pessoas font-body text-center mx-auto mb-14 md:mb-20"
            style={{
              maxWidth: '720px',
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.casaPessoas.intro}
          </p>

        </div>

        {/* Carousel */}
        <div className="reveal-pessoas mt-2">
          <CarouselStrip />
        </div>

        {/* Navigation */}
        <div className="reveal-pessoas mt-5 flex items-center gap-5 justify-center lg:justify-start"
          style={{ paddingLeft: carouselLeft }}>
          <button onClick={prev} disabled={!canPrev} aria-label={t.common.previous}
            className="p-1 transition-opacity duration-200" style={{ opacity: canPrev ? 1 : 0.25 }}>
            <ArrowLeft size={15} strokeWidth={1.5} style={{ color: 'var(--color-text)' }} />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--color-text-muted)' }}>
            {index + 1} {t.common.of} {carouselImages.length}
          </span>
          <button onClick={next} disabled={!canNext} aria-label={t.common.next}
            className="p-1 transition-opacity duration-200" style={{ opacity: canNext ? 1 : 0.25 }}>
            <ArrowRight size={15} strokeWidth={1.5} style={{ color: 'var(--color-text)' }} />
          </button>
        </div>

      </section>

      {/* ══════════════════════════════════════
          SECTION: Explore também
      ══════════════════════════════════════ */}
      <SectionExplore noBg />

    </div>

    {lightboxIndex !== null && (
      <GalleryLightbox
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
