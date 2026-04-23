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

const VISIBLE = 3

export default function SectionVinhas() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index < carouselImages.length - VISIBLE

  function prev() {
    if (canPrev) setIndex((i) => i - 1)
  }
  function next() {
    if (canNext) setIndex((i) => i + 1)
  }

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-vinhas', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pt-0 pb-20 md:pb-28">
      {/* Main content grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start pt-16 md:pt-20">
          {/* Text block */}
          <div className="flex flex-col justify-center">
            <h2
              className="reveal-vinhas font-display text-cn-text uppercase mb-8"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
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

          {/* Portrait image */}
          <div
            className="reveal-vinhas relative overflow-hidden w-full"
            style={{ aspectRatio: '4/5', backgroundColor: '#3A5B4F' }}
          >
            <Image
              src="/images/homepage/vinhas/section-01.jpg"
              alt="Vinhas da Casa de Nabais"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* Carousel — full width */}
      <div className="mt-16 md:mt-20 px-6 md:px-10 max-w-[1200px] mx-auto">
        {/* Images strip */}
        <div className="overflow-hidden">
          <div
            className="flex gap-3 md:gap-4 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(calc(-${index} * (33.333% + 0.75rem)))` }}
          >
            {carouselImages.map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: 'calc(33.333% - 0.5rem)',
                  aspectRatio: '3/4',
                  backgroundColor: '#3A5B4F',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Anterior"
            className="p-2 transition-opacity duration-200"
            style={{ opacity: canPrev ? 1 : 0.25 }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} className="text-cn-text" />
          </button>
          <span
            className="font-display text-[11px] uppercase tracking-[0.16em] text-cn-text-muted"
            style={{ minWidth: '4rem', textAlign: 'center' }}
          >
            {index + 1} de {carouselImages.length - VISIBLE + 1}
          </span>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Seguinte"
            className="p-2 transition-opacity duration-200"
            style={{ opacity: canNext ? 1 : 0.25 }}
          >
            <ArrowRight size={16} strokeWidth={1.5} className="text-cn-text" />
          </button>
        </div>
      </div>
    </section>
  )
}
