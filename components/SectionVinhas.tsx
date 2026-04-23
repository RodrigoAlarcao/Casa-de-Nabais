'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

export default function SectionVinhas() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scale: 1.03,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="reveal font-display uppercase tracking-[0.18em] text-[11px] text-cn-text-muted mb-6">
              As Vinhas
            </p>
            <h2
              className="reveal font-display text-cn-text mb-6"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', lineHeight: 1.15, letterSpacing: '0.02em' }}
            >
              As nossas vinhas
            </h2>
            <p
              className="reveal font-body text-cn-text-muted mb-10"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.85 }}
            >
              As vinhas da Casa de Nabais, situadas no Vale do Lima, são vinhas próprias, onde a uva é vindimada à mão e levada até à adega em poucos minutos, preservando a sua frescura e a sua origem. Aqui, a casta Loureiro encontra solo, tempo e rigor para se revelar com autenticidade.
            </p>
            <Link
              href="/as-vinhas"
              className="reveal flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] text-cn-green hover:text-cn-text transition-colors duration-200 w-fit"
            >
              Saber mais
              <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>

          <div
            ref={imgRef}
            className="relative aspect-[4/3] overflow-hidden"
            style={{ backgroundColor: '#3A5B4F' }}
          >
            <Image
              src="/images/homepage/vinhas/section-01.jpg"
              alt="Vinhas da Casa de Nabais"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
