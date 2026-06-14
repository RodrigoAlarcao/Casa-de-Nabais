'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function SectionVinificacao() {
  const { t } = useLang()
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
          yPercent: -16, ease: 'none',
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

  const headingLines = t.sectionVinificacao.heading.split('\n')

  return (
    <section ref={sectionRef} style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 57%, #031D1D 100%)' }}>

      {/* ── MOBILE ── follows the same flow as desktop: text → image → destaque */}
      <div className="lg:hidden">

        {/* Text: heading + body + CTA over the section gradient */}
        <div className="px-6 pt-20 pb-12 text-center">
          <h2
            className="reveal-above font-display uppercase"
            style={{ fontSize: 'clamp(2rem, 8vw, 2.75rem)', lineHeight: 1.05, letterSpacing: '0.04em', color: '#FAE6C1' }}
          >
            {headingLines[0]}<br />{headingLines[1]}
          </h2>
          <p
            className="reveal-above font-body mt-6 mb-8"
            style={{ fontSize: 'clamp(0.9375rem, 4vw, 1rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}
          >
            {t.sectionVinificacao.body}
          </p>
          <Link
            href="/a-vinificacao"
            className="reveal-above inline-flex items-center justify-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 w-full transition-colors duration-200"
            style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
          >
            {t.common.learnMore}
            <ArrowRight size={11} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Image with subtle parallax */}
        <div ref={mobileOuterRef} className="relative overflow-hidden" style={{ height: '58vh' }}>
          <div
            ref={mobileImgWrapRef}
            className="absolute will-change-transform"
            style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}
          >
            <Image
              src="/images/0. Mainpage/9.webp"
              alt="Adega da Casa de Nabais"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Destaque — text again below the image */}
        <div className="px-6 pt-14 pb-16 text-center">
          <p
            className="reveal-above font-display"
            style={{ fontSize: 'clamp(1.375rem, 6vw, 1.75rem)', lineHeight: 1.3, fontWeight: 400, color: '#FAE6C1' }}
          >
            {t.sectionVinificacao.destaque}
          </p>
        </div>
      </div>

      {/* ── DESKTOP ── text columns */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-10 py-28">
        <div className="grid grid-cols-[2fr_3fr] gap-20 items-center">
          <h2
            className="reveal-above font-display uppercase"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            {headingLines[0]}<br />{headingLines[1]}
          </h2>
          <div>
            <p
              className="reveal-above font-body mb-10"
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.6,
                color: 'rgba(255,249,237,0.72)',
              }}
            >
              {t.sectionVinificacao.body}
            </p>
            <Link
              href="/a-vinificacao"
              className="reveal-above inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 w-fit transition-colors duration-200"
              style={{
                color: '#FAE6C1',
                border: '1px solid rgba(250,230,193,0.40)',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
            >
              {t.common.learnMore}
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── full-bleed image with parallax */}
      <div ref={imgContainerRef} className="relative overflow-hidden hidden lg:block" style={{ height: '80vh' }}>
        <div
          ref={imgWrapRef}
          className="absolute will-change-transform"
          style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
        >
          <Image
            src="/images/0. Mainpage/9.webp"
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
          {t.sectionVinificacao.destaque}
        </p>
      </div>

    </section>
  )
}
