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
          yPercent: -10, ease: 'none',
          scrollTrigger: {
            trigger: imgContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
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
    <section ref={sectionRef} style={{ backgroundColor: '#031D1D' }}>
      {/* Text block */}
      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <p
          className="reveal-above font-display uppercase tracking-[0.18em] text-[11px] mb-6"
          style={{ color: 'rgba(250,230,193,0.65)' }}
        >
          A Nossa Vinificação
        </p>
        <h2
          className="reveal-above font-display text-cn-text-light mb-7"
          style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', lineHeight: 1.15, letterSpacing: '0.02em' }}
        >
          A nossa vinificação
        </h2>
        <p
          className="reveal-above font-body mb-10"
          style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.85, color: 'rgba(255,249,237,0.72)' }}
        >
          Na Casa de Nabais vinificação é sinónimo de investigação contínua. Começa na vinha, respeita a uva e intervém apenas quando necessário. Trabalhamos com precisão, ciência e curiosidade, para revelar a identidade e as singularidades da casta Loureiro.
        </p>
        <Link
          href="/a-vinificacao"
          className="reveal-above flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] transition-colors duration-200 w-fit"
          style={{ color: '#FAE6C1' }}
        >
          Saber mais
          <ArrowRight size={13} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Full-bleed image */}
      <div ref={imgContainerRef} className="relative overflow-hidden" style={{ height: '55vh' }}>
        <div
          ref={imgWrapRef}
          className="absolute will-change-transform"
          style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
        >
          <Image
            src="/images/homepage/vinificacao/fullbleed-01.jpg"
            alt="Adega da Casa de Nabais"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Destaque */}
      <div ref={destaqueRef} className="max-w-[640px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
        <p
          className="font-body italic"
          style={{ fontSize: 'clamp(1.0625rem, 1.8vw, 1.3125rem)', lineHeight: 1.8, color: '#FAE6C1' }}
        >
          &ldquo;O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível.&rdquo;
        </p>
      </div>
    </section>
  )
}
