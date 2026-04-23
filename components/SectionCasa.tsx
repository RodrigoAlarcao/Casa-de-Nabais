'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

export default function SectionCasa() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scale: 1.03, opacity: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">
          <div>
            <p className="reveal font-display uppercase tracking-[0.18em] text-[11px] text-cn-text-muted mb-6">
              Conheça a Casa
            </p>
            <h2
              className="reveal font-display text-cn-text mb-6"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', lineHeight: 1.15, letterSpacing: '0.02em' }}
            >
              Conheça a Casa de Nabais
            </h2>
            <p
              className="reveal font-body text-cn-text-muted mb-10"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.85 }}
            >
              Solar minhoto de séculos, recuperado com respeito pela história e pelo lugar. Cinco suítes e um apartamento, piscina, spa e uma mesa com produtos da quinta. Um sítio para ficar, não para passar.
            </p>
            <div className="reveal flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <Link
                href="/ficar-na-casa"
                className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] text-cn-green hover:text-cn-text transition-colors duration-200"
              >
                Ficar na Casa
                <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
              <Link
                href="/a-casa"
                className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] text-cn-text-muted hover:text-cn-text transition-colors duration-200"
              >
                Saber mais
                <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <div
            ref={imgRef}
            className="relative aspect-[4/3] overflow-hidden"
            style={{ backgroundColor: '#8B7B55' }}
          >
            <Image
              src="/images/homepage/casa/section-01.jpg"
              alt="Interior da Casa de Nabais"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Destaque */}
        <div
          className="reveal max-w-[680px] mx-auto py-10 md:py-12 text-center"
          style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
        >
          <p
            className="font-body italic text-cn-text"
            style={{ fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.8 }}
          >
            A Casa de Nabais é um lugar para ficar, provar e aprender. Casa, vinha, vinho e mesa unem-se num ritmo sereno, longe do ruído, perto do essencial.
          </p>
        </div>
      </div>
    </section>
  )
}
