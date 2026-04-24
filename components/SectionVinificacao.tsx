'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

export default function SectionVinificacao() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const destaqueRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-above', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgWrapRef.current && imgContainerRef.current) {
        gsap.to(imgWrapRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: {
            trigger: imgContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      if (destaqueRef.current) {
        gsap.from(destaqueRef.current, {
          y: 25, opacity: 0, duration: 1.0, ease: 'power2.out',
          scrollTrigger: { trigger: destaqueRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 57%, #031D1D 100%)' }}>
      {/* Text block — two columns */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-20 items-center">

          {/* Left — large headline */}
          <h2
            className="reveal-above font-display uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            A nossa<br />vinificação
          </h2>

          {/* Right — body + CTA */}
          <div>
            <p
              className="reveal-above font-body mb-10"
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.4,
                color: 'rgba(255,249,237,0.72)',
              }}
            >
              Na Casa de Nabais vinificação é sinónimo de investigação contínua. Começa na vinha, respeita a uva e intervém apenas quando necessário. Trabalhamos com precisão, ciência e curiosidade, para revelar a identidade e as singularidades da casta Loureiro.
            </p>
            <Link
              href="/a-vinificacao"
              className="reveal-above inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 w-fit transition-colors duration-200"
              style={{
                color: '#FAE6C1',
                border: '1px solid rgba(250,230,193,0.45)',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
              }}
            >
              Saber mais
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-bleed image */}
      <div ref={imgContainerRef} className="relative overflow-hidden" style={{ height: '66vh' }}>
        <div
          ref={imgWrapRef}
          className="absolute will-change-transform"
          style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
        >
          <Image
            src="/images/homepage/vinificacao/fullbleed-01.webp"
            alt="Adega da Casa de Nabais"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Destaque */}
      <div ref={destaqueRef} className="max-w-[900px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#FAE6C1',
          }}
        >
          O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível.
        </p>
      </div>
    </section>
  )
}
