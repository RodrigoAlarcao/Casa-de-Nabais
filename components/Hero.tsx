'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  const linesRef = useRef<HTMLSpanElement[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useIsomorphicLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        /* estado final imediato sem animação */
        gsap.set([linesRef.current, subRef.current, ctaRef.current], { opacity: 1, y: 0 })
        return
      }

      /* Ken Burns — escala subtil, muito lenta */
      gsap.to(imgWrapRef.current, {
        scale: 1.06,
        duration: 8,
        ease: 'none',
      })

      /* Parallax ao scroll — máx yPercent:-12 conforme PRD */
      gsap.to(imgWrapRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      /* Timeline de entrada */
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(linesRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: 'power2.out',
      })
        .from(
          subRef.current,
          { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          { y: 15, opacity: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Imagem de fundo */}
      <div
        ref={imgWrapRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <Image
          src="/images/homepage/hero/homepage_hero.png"
          alt="Vinhas da Casa de Nabais no Vale do Lima"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,29,29,0.10) 0%, rgba(3,29,29,0.18) 45%, rgba(3,29,29,0.60) 100%)',
        }}
      />

      {/* Conteúdo — ancorado em baixo */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pb-20 md:pb-28">
        {/* Headline */}
        <h1
          className="font-display uppercase text-[#FFF9ED] mb-5 md:mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '0.06em',
            lineHeight: 1.05,
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

        {/* Subheadline */}
        <p
          ref={subRef}
          className="font-body italic mb-10 md:mb-12"
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: 'rgba(255, 249, 237, 0.78)',
            letterSpacing: '0.01em',
          }}
        >
          Assim nascem grandes vinhos
        </p>

        {/* CTA */}
        <Link
          ref={ctaRef}
          href="/ficar-na-casa"
          className="inline-block font-display text-[13px] uppercase tracking-[0.12em] px-8 py-4 text-[#FAE6C1] border border-[#FAE6C1] hover:bg-[#FAE6C1] hover:text-[#031D1D] transition-colors duration-300"
        >
          Ficar na Casa
        </Link>
      </div>
    </section>
  )
}
