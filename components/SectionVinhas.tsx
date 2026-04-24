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

const carouselImages = [
  { src: '/images/homepage/vinhas/carousel-01.webp', alt: 'Vinha do Pomar em flor' },
  { src: '/images/homepage/vinhas/carousel-02.webp', alt: 'Vindima à mão' },
  { src: '/images/homepage/vinhas/carousel-03.webp', alt: 'Cachos de Loureiro' },
  { src: '/images/homepage/vinhas/carousel-04.webp', alt: 'Vale do Lima' },
  { src: '/images/homepage/vinhas/carousel-05.webp', alt: 'Ramada tradicional minhota' },
  { src: '/images/homepage/vinhas/carousel-06.webp', alt: 'Adega da Casa de Nabais' },
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12 // px

export default function SectionVinhas() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth, setSlideWidth] = useState(380)
  const [isMobile, setIsMobile] = useState(true)
  const [index, setIndex] = useState(0)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const [grabbing, setGrabbing] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const maxIndex = carouselImages.length - 1
  const canPrev = index > 0
  const canNext = index < maxIndex

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
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setCarouselLeft(`${rect.left}px`)
        const isLg = window.innerWidth >= 1024
        setIsMobile(!isLg)
        if (isLg && portraitRef.current) {
          setSlideWidth(portraitRef.current.getBoundingClientRect().width)
        } else {
          setSlideWidth(rect.width)
        }
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal-vinhas', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgWrapRef.current && portraitRef.current) {
        gsap.to(imgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: portraitRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }
    }, sectionRef)
    return () => { ctx.revert(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <>
    <section ref={sectionRef} className="pt-0 pb-20 md:pb-28">

      {/* Main content grid */}
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text block */}
          <div className="flex flex-col px-0 lg:px-[4.5rem]">
            <h2
              className="reveal-vinhas font-display text-cn-text uppercase mb-8 text-center lg:text-left"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.05,
                letterSpacing: '0.04em',
              }}
            >
              As nossas<br />vinhas
            </h2>
            <p
              className="reveal-vinhas font-body text-cn-text-muted mb-4 text-center lg:text-left"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6 }}
            >
              As vinhas da Casa de Nabais, situada no Vale do Lima, são vinhas próprias, onde a uva é vindimada à mão e levada até à adega em poucos minutos, preservando a sua frescura e a sua identidade.
            </p>
            <p
              className="reveal-vinhas font-body text-cn-text-muted mb-0 lg:mb-10 text-center lg:text-left"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6 }}
            >
              Aqui, a casta Loureiro encontra solo, tempo e rigor para se revelar com autenticidade.
            </p>
            <Link
              href="/as-vinhas"
              className="reveal-vinhas hidden lg:inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] text-cn-text border border-cn-text px-5 py-3 w-fit hover:bg-cn-text hover:text-cn-bg transition-colors duration-200 rounded-[8px]"
            >
              Saber mais
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Portrait image — desktop only */}
          <div className="reveal-vinhas hidden lg:block">
            <div
              ref={portraitRef}
              className="relative overflow-hidden w-full"
              style={{
                aspectRatio: IMG_RATIO,
                backgroundColor: '#3A5B4F',
                borderRadius: '4px',
              }}
            >
              <div ref={imgWrapRef} className="absolute will-change-transform" style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}>
                <Image
                  src="/images/homepage/vinhas/section-01.webp"
                  alt="Vinhas da Casa de Nabais"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — left-aligned with content, bleeds off the right edge */}
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
          {carouselImages.map((img, i) => (
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

      {/* Navigation */}
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
        <span
          className="font-display text-[10px] uppercase tracking-[0.16em] text-cn-text-muted"
        >
          {index + 1} de {carouselImages.length}
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

      {/* CTA — mobile only, after carousel */}
      <div className="mt-6 px-6 lg:hidden">
        <Link
          href="/as-vinhas"
          className="flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] text-cn-text border border-cn-text px-5 py-3 w-full hover:bg-cn-text hover:text-cn-bg transition-colors duration-200 rounded-[8px]"
        >
          Saber mais
          <ArrowRight size={11} strokeWidth={1.5} />
        </Link>
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
