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
  { src: '/images/homepage/casa/carousel-01.jpg', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.jpg', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.jpg', alt: 'Suite principal' },
  { src: '/images/homepage/casa/carousel-04.jpg', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.jpg', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.jpg', alt: 'Mesa de refeições' },
  { src: '/images/homepage/casa/carousel-07.jpg', alt: 'Lareira da sala' },
  { src: '/images/homepage/casa/carousel-08.jpg', alt: 'Vista da varanda' },
]

const SLIDE_W = 'clamp(200px, 26vw, 340px)'
const SLIDE_GAP = 12

export default function SectionCasa() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index < carouselImages.length - 1

  function prev() { if (canPrev) setIndex((i) => i - 1) }
  function next() { if (canNext) setIndex((i) => i + 1) }

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal-casa', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const leftPad = 'max(24px, calc((100vw - 1200px) / 2 + 40px))'

  return (
    <section ref={sectionRef} className="pt-20 md:pt-28 pb-0">
      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text — left */}
          <div className="flex flex-col justify-center">
            <h2
              className="reveal-casa font-display uppercase mb-8"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.0,
                letterSpacing: '0.04em',
                color: '#FAE6C1',
              }}
            >
              Conheça<br />a Casa<br />de Nabais
            </h2>
            <p
              className="reveal-casa font-body mb-10"
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.85,
                color: 'rgba(255,249,237,0.72)',
              }}
            >
              Solar minhoto de séculos, recuperado com respeito pela história e pelo lugar. Cinco suítes e um apartamento, piscina, spa e uma mesa com produtos da quinta. Um sítio para ficar, não para passar.
            </p>
            <div className="reveal-casa flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href="/a-casa"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
              >
                Saiba mais <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
              <Link
                href="/ficar-na-casa"
                className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 transition-colors duration-200"
                style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
              >
                Ficar na Casa <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Portrait image — right */}
          <div className="reveal-casa flex justify-center lg:justify-end">
            <div
              className="relative overflow-hidden w-full"
              style={{ maxWidth: 'clamp(240px, 36vw, 380px)', aspectRatio: '4/5', backgroundColor: '#0A3A39' }}
            >
              <Image
                src="/images/homepage/casa/section-01.jpg"
                alt="Fachada da Casa de Nabais"
                fill className="object-cover"
                sizes="(max-width: 1024px) 80vw, 38vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — bleed right */}
      <div className="mt-14 md:mt-16 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            gap: `${SLIDE_GAP}px`,
            paddingLeft: leftPad,
            transform: `translateX(calc(-${index} * (${SLIDE_W} + ${SLIDE_GAP}px)))`,
          }}
        >
          {carouselImages.map((img, i) => (
            <div key={i} className="relative flex-shrink-0 overflow-hidden"
              style={{ width: SLIDE_W, aspectRatio: '4/5', backgroundColor: '#0A3A39' }}>
              <Image src={img.src} alt={img.alt} fill className="object-cover"
                sizes="(max-width: 768px) 60vw, 28vw" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center gap-5" style={{ paddingLeft: leftPad }}>
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

      {/* Centered quote */}
      <div className="max-w-[720px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        <p
          className="reveal-casa font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#FAE6C1',
          }}
        >
          A Casa de Nabais é um lugar para ficar, provar e aprender. Casa, vinha, vinho e mesa unem-se num ritmo sereno, para que o visitante seja recebido com verdade. Mais do que vinho, oferece-se origem, coerência e uma ligação profunda entre lugar, pessoas e tempo.
        </p>
      </div>
    </section>
  )
}
