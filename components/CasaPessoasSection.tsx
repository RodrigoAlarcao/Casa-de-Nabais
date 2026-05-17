'use client'

import { useRef } from 'react'
import Image from 'next/image'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'
import { IMG_A_CASA } from '@/lib/images'

gsap.registerPlugin(ScrollTrigger)

const teamMembers = IMG_A_CASA.equipa
const EQUIPA_BGS = ['#3A5B4F', '#2A4A3E', '#4A6B5F', '#3A5B4F', '#2A4A3E', '#4A6B5F']

export default function CasaPessoasSection() {
  const { t } = useLang()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-pessoas', {
        y: 25, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.utils.toArray<HTMLElement>('.pessoa-img-wrap').forEach((wrap) => {
        gsap.to(wrap, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: wrap.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} style={{ background: 'linear-gradient(180deg, #FFF9ED 0%, #FFF3DE 50%, #FFF9ED 100%)' }}>

      {/* ══════════════════════════════════════
          SECTION: As Pessoas de Nabais
      ══════════════════════════════════════ */}
      <section ref={sectionRef} className="pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <h2
            className="reveal-pessoas font-display uppercase text-cn-text text-center mb-8 md:mb-10"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
            }}
          >
            {t.casaPessoas.heading}
          </h2>

          <p
            className="reveal-pessoas font-body text-center mx-auto mb-14 md:mb-20"
            style={{
              maxWidth: '720px',
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
            }}
          >
            {t.casaPessoas.intro}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="reveal-pessoas relative overflow-hidden"
                style={{ aspectRatio: '3/4', backgroundColor: EQUIPA_BGS[i], borderRadius: '8px' }}
              >
                {member.image && (
                  <div
                    className="pessoa-img-wrap absolute will-change-transform"
                    style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div
                  className="absolute bottom-0 left-0 right-0 py-4 px-5 text-center"
                  style={{
                    background: 'rgba(7, 45, 40, 0.85)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
                      color: '#FAE6C1',
                      letterSpacing: '0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="font-body mt-1"
                    style={{
                      fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                      color: 'rgba(250, 230, 193, 0.70)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION: Explore também
      ══════════════════════════════════════ */}
      <SectionExplore noBg />

    </div>
  )
}
