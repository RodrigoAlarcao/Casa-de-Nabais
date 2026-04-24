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

export default function SectionEnoturismo() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth, setSlideWidth] = useState(380)
  const [index, setIndex] = useState(0)
  const dragStartX = useRef(0)
  const [grabbing, setGrabbing] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const canPrev = index > 0
  const canNext = index < carouselImages.length - 1

  function prev() { if (canPrev) setIndex((i) => i - 1) }
  function next() { if (canNext) setIndex((i) => i + 1) }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) < 8) return
    if (diff > 50 && canNext) next()
    else if (diff < -50 && canPrev) prev()
  }

  useIsomorphicLayoutEffect(() => {
    function measure() {
      if (containerRef.current && portraitRef.current) {
        setCarouselLeft(`${containerRef.current.getBoundingClientRect().left}px`)
        setSlideWidth(portraitRef.current.getBoundingClientRect().width)
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
    <section ref={sectionRef} className="pt-0 pb-20 md:pb-28">
      {/* Main grid — image LEFT, text RIGHT */}
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Portrait image — fills the full left column (50% of the grid) */}
          <div className="reveal-eno order-2 lg:order-1">
            <div
              ref={portraitRef}
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
            >
              <div ref={imgWrapRef} className="absolute will-change-transform" style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}>
                <Image
                  src="/images/homepage/enoturismo/section-01.webp"
                  alt="Enoturismo na Casa de Nabais"
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Text — right */}
          <div className="flex flex-col justify-center px-10 lg:px-[4.5rem] order-1 lg:order-2">
            <h2
              className="reveal-eno font-display uppercase mb-8"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.0,
                letterSpacing: '0.04em',
                color: '#FAE6C1',
              }}
            >
              Enoturismo
            </h2>
            <p
              className="reveal-eno font-body mb-10"
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.4,
                color: 'rgba(255,249,237,0.72)',
              }}
            >
              Na Casa de Nabais, o enoturismo nasce da terra e tem as pessoas no centro. Entre solos graníticos e um raro veio de xisto, a cada experiência partilhamos a vida da quinta — a vinha, a adega, a mesa e os seus produtos — com autenticidade e cuidado de quem os faz.
            </p>
            <div className="reveal-eno flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href="/o-enoturismo"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
              >
                Saiba mais <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <Link
                href="/ficar-na-casa"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
              >
                Ficar na Casa <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — bleed right */}
      <div
        className="mt-14 md:mt-16 py-2 select-none"
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
              style={{ width: `${slideWidth}px`, aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px', boxShadow: '0 8px 28px rgba(0,0,0,0.22)', cursor: 'zoom-in' }}
              onClick={() => setLightboxIndex(i)}>
              <Image src={img.src} alt={img.alt} fill className="object-cover"
                sizes="(max-width: 768px) 90vw, 50vw" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center gap-5" style={{ paddingLeft: carouselLeft }}>
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

      {/* Centered closing text */}
      <div className="max-w-[1050px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        <p
          className="reveal-eno font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#FAE6C1',
          }}
        >
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
  )
}
