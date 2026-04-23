'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const carouselImages = [
  { src: '/images/homepage/vinhas/carousel-01.jpg', alt: 'Vinha do Pomar em flor' },
  { src: '/images/homepage/vinhas/carousel-02.jpg', alt: 'Vindima à mão' },
  { src: '/images/homepage/vinhas/carousel-03.jpg', alt: 'Cachos de Loureiro' },
  { src: '/images/homepage/vinhas/carousel-04.jpg', alt: 'Vale do Lima' },
  { src: '/images/homepage/vinhas/carousel-05.jpg', alt: 'Ramada tradicional minhota' },
  { src: '/images/homepage/vinhas/carousel-06.jpg', alt: 'Adega da Casa de Nabais' },
]

// Image dimensions — same ratio on both main image and carousel
const IMG_RATIO = '4/5'
// Carousel slide width matches portrait image max-width exactly
const SLIDE_W = 'clamp(240px, 36vw, 380px)'
const SLIDE_GAP = 12 // px

export default function SectionVinhas() {
  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [index, setIndex] = useState(0)

  const maxIndex = carouselImages.length - 1
  const canPrev = index > 0
  const canNext = index < maxIndex

  function prev() { if (canPrev) setIndex((i) => i - 1) }
  function next() { if (canNext) setIndex((i) => i + 1) }

  useIsomorphicLayoutEffect(() => {
    function measure() {
      if (portraitRef.current) {
        setCarouselLeft(`${portraitRef.current.getBoundingClientRect().left}px`)
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
    }, sectionRef)
    return () => { ctx.revert(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <section ref={sectionRef} className="pt-0 pb-20 md:pb-28">

      {/* Main content grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text block */}
          <div className="flex flex-col justify-center">
            <h2
              className="reveal-vinhas font-display text-cn-text uppercase mb-8"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.05,
                letterSpacing: '0.04em',
              }}
            >
              As nossas<br />vinhas
            </h2>
            <p
              className="reveal-vinhas font-body text-cn-text-muted mb-10"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.85 }}
            >
              As vinhas da Casa de Nabais, situadas no Vale do Lima, são vinhas próprias, onde a uva é vindimada à mão e levada até à adega em poucos minutos, preservando a sua frescura e a sua origem. Aqui, a casta Loureiro encontra solo, tempo e rigor para se revelar com autenticidade.
            </p>
            <Link
              href="/as-vinhas"
              className="reveal-vinhas inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] text-cn-text border border-cn-text px-5 py-3 w-fit hover:bg-cn-text hover:text-cn-bg transition-colors duration-200"
            >
              Saber mais
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Portrait image — constrained to avoid dominating the layout */}
          <div className="reveal-vinhas flex justify-center lg:justify-end">
            <div
              ref={portraitRef}
              className="relative overflow-hidden w-full"
              style={{
                maxWidth: 'clamp(240px, 36vw, 380px)',
                aspectRatio: IMG_RATIO,
                backgroundColor: '#3A5B4F',
              }}
            >
              <Image
                src="/images/homepage/vinhas/section-01.jpg"
                alt="Vinhas da Casa de Nabais"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 38vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — left-aligned with content, bleeds off the right edge */}
      <div className="mt-14 md:mt-16 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            gap: `${SLIDE_GAP}px`,
            paddingLeft: carouselLeft,
            transform: `translateX(calc(-${index} * (${SLIDE_W} + ${SLIDE_GAP}px)))`,
          }}
        >
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: SLIDE_W,
                aspectRatio: IMG_RATIO,
                backgroundColor: '#3A5B4F',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 28vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div
        className="mt-5 flex items-center gap-5"
        style={{ paddingLeft: carouselLeft }}
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

    </section>
  )
}
