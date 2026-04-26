'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const BODY_TEXT = 'Na Casa de Nabais vinificação é sinónimo de investigação contínua. Começa na vinha, respeita a uva e intervém apenas quando necessário. Trabalhamos com precisão, ciência e curiosidade, para revelar a identidade e as singularidades da casta Loureiro.'
const DESTAQUE = 'O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível.'

export default function SectionVinificacao() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const destaqueRef = useRef<HTMLDivElement>(null)
  const mobileOuterRef = useRef<HTMLDivElement>(null)
  const mobileImgWrapRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-above', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgWrapRef.current && imgContainerRef.current && window.innerWidth >= 1024) {
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

      if (mobileImgWrapRef.current && mobileOuterRef.current && window.innerWidth < 1024) {
        gsap.to(mobileImgWrapRef.current, {
          yPercent: -18, ease: 'none',
          scrollTrigger: {
            trigger: mobileOuterRef.current,
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

      {/* ── MOBILE ──
          Outer wrapper: position relative, NO overflow-hidden, so the gradient
          child can visually bleed 60px below the image boundary. */}
      <div ref={mobileOuterRef} className="relative lg:hidden" style={{ height: '55vh' }}>

        {/* Inner image container: overflow-hidden clips parallax overflow */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Parallax wrap: oversized so GSAP yPercent has room to move */}
          <div
            ref={mobileImgWrapRef}
            className="absolute will-change-transform"
            style={{ top: '-30%', bottom: '-30%', left: 0, right: 0 }}
          >
            <Image
              src="/images/homepage/vinificacao/fullbleed-01.webp"
              alt="Adega da Casa de Nabais"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Gradient: starts at 15% of image height, bleeds 60px below the wrapper.
            No overflow-hidden on parent means this renders past the 55vh boundary. */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: '15%',
            bottom: '-60px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(3,29,29,0.45) 38%, rgba(3,29,29,0.9) 65%, #031D1D 82%)',
            zIndex: 1,
          }}
        />

        {/* Title: absolute within image, floats over the gradient */}
        <h2
          className="reveal-above absolute left-0 right-0 text-center px-6 font-display uppercase"
          style={{
            bottom: '36px',
            zIndex: 2,
            fontSize: 'clamp(1.875rem, 6vw, 2.5rem)',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            color: '#FAE6C1',
            textShadow: '0 2px 28px rgba(3,29,29,0.95)',
          }}
        >
          A nossa<br />vinificação
        </h2>
      </div>

      {/* Text block: slides up 2px to close the seam; z-index 2 renders it above
          the gradient extension so the gradient colour merges with the background. */}
      <div
        className="relative lg:hidden px-6 pt-5 pb-16 text-center"
        style={{ marginTop: '-2px', background: '#031D1D', zIndex: 2 }}
      >
        <p
          className="reveal-above font-body mb-8"
          style={{
            fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
            lineHeight: 1.6,
            color: 'rgba(255,249,237,0.72)',
          }}
        >
          {BODY_TEXT}
        </p>
        <Link
          href="/a-vinificacao"
          className="reveal-above flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 w-full transition-colors duration-200"
          style={{
            color: '#FAE6C1',
            border: '1px solid rgba(250,230,193,0.45)',
            borderRadius: '8px',
          }}
        >
          Saber mais
          <ArrowRight size={11} strokeWidth={1.5} />
        </Link>
      </div>

      {/* ── DESKTOP ── text columns */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-10 py-28">
        <div className="grid grid-cols-[2fr_3fr] gap-20 items-center">
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
          <div>
            <p
              className="reveal-above font-body mb-10"
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.4,
                color: 'rgba(255,249,237,0.72)',
              }}
            >
              {BODY_TEXT}
            </p>
            <Link
              href="/a-vinificacao"
              className="reveal-above inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 w-fit transition-colors duration-200"
              style={{
                color: '#FAE6C1',
                border: '1px solid rgba(250,230,193,0.45)',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
            >
              Saber mais
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── full-bleed image with parallax */}
      <div ref={imgContainerRef} className="relative overflow-hidden hidden lg:block" style={{ height: '66vh' }}>
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

      {/* Destaque — desktop only */}
      <div ref={destaqueRef} className="hidden lg:block max-w-[900px] mx-auto px-10 py-28 text-center">
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#FAE6C1',
          }}
        >
          {DESTAQUE}
        </p>
      </div>

    </section>
  )
}
