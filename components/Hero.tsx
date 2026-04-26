'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_LINES = [
  'PERTO DA TERRA,',
  'ATENTOS AO DETALHE,',
  'RESPEITANDO O TEMPO',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLSpanElement[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)

  useIsomorphicLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([linesRef.current, subRef.current], { opacity: 1, y: 0 })
        return
      }

      gsap.to(imgWrapRef.current, {
        scale: 1.06,
        duration: 8,
        ease: 'none',
      })

      gsap.to(imgWrapRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '55% top',
          scrub: 1.5,
        },
      })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(linesRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: 'power2.out',
      }).from(
        subRef.current,
        { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagem de fundo */}
      <div
        ref={imgWrapRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <Image
          src="/images/homepage/hero/homepage_hero.webp"
          alt="Vinhas da Casa de Nabais no Vale do Lima"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay escuro subtil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,29,29,0.08) 0%, rgba(3,29,29,0.22) 60%, rgba(3,29,29,0.10) 100%)',
        }}
      />

      {/* Gradient de transição — funde para #FFF3DE, início exacto do gradiente da secção seguinte */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '40%',
          background: 'linear-gradient(to bottom, transparent 0%, #FFF3DE 100%)',
        }}
      />

      {/* Conteúdo — centrado */}
      <div ref={contentRef} className="relative z-20 w-full max-w-[1100px] mx-auto px-6 md:px-10 text-center">
        <h1
          className="font-display uppercase mb-6 md:mb-8"
          style={{
            fontSize: 'clamp(1.5rem, 5.5vw, 3.5rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.0,
            color: '#FAE6C1',
            textShadow: '0 4px 32px rgba(0,0,0,0.40)',
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span
              key={i}
              ref={(el) => { if (el) linesRef.current[i] = el }}
              className="block"
            >
              {line}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="font-body italic"
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: 'rgba(250, 230, 193, 0.80)',
            letterSpacing: '0.01em',
          }}
        >
          Assim nascem grandes vinhos
        </p>
      </div>
    </section>
  )
}
