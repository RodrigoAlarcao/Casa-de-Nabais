'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const wines = [
  {
    slug: 'vinha-do-pomar',
    name: 'Vinha do Pomar',
    type: 'Loureiro · Vinho Verde',
    description: 'Proveniente da vinha com mais história da quinta, revela aromas florais complexos e uma acidez viva que convida à mesa.',
    image: '/images/homepage/vinhos/vinha-do-pomar-bottle.png',
  },
  {
    slug: 'loureiro',
    name: 'Casa de Nabais',
    type: 'Loureiro · Vinho Verde',
    description: 'O vinho de entrada da casa. Fresco, gastronómico, expressivo — pensado para beber jovem com o melhor da cozinha minhota.',
    image: '/images/homepage/vinhos/loureiro-bottle.png',
  },
]

export default function SectionVinhos() {
  const sectionRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="max-w-[600px] mb-14 md:mb-16">
          <p className="reveal font-display uppercase tracking-[0.18em] text-[11px] text-cn-text-muted mb-6">
            Os Vinhos
          </p>
          <h2
            className="reveal font-display text-cn-text mb-5"
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', lineHeight: 1.15, letterSpacing: '0.02em' }}
          >
            Os nossos vinhos
          </h2>
          <p
            className="reveal font-body text-cn-text-muted"
            style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.85 }}
          >
            Produzidos exclusivamente com uva própria, em pequena escala, são vinhos frescos, gastronómicos e pensados para evoluir, revelando o caráter dos solos graníticos e xistosos onde nascem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px]">
          {wines.map((wine) => (
            <div
              key={wine.slug}
              className="reveal flex flex-col"
              style={{ backgroundColor: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}
            >
              <div className="relative h-[220px] overflow-hidden" style={{ backgroundColor: '#E8E0D0' }}>
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <p className="font-display uppercase tracking-[0.14em] text-[10px] text-cn-text-muted mb-2">
                  {wine.type}
                </p>
                <h3
                  className="font-display text-cn-text mb-3"
                  style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', letterSpacing: '0.02em' }}
                >
                  {wine.name}
                </h3>
                <p
                  className="font-body text-cn-text-muted mb-6 flex-1"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.75 }}
                >
                  {wine.description}
                </p>
                <div className="flex items-center gap-6">
                  <Link
                    href={`/os-vinhos/${wine.slug}`}
                    className="flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] text-cn-green hover:text-cn-text transition-colors duration-200"
                  >
                    Detalhes
                    <ArrowRight size={11} strokeWidth={1.5} />
                  </Link>
                  <button
                    disabled
                    title="Em breve"
                    className="font-display text-[11px] uppercase tracking-[0.14em] text-cn-text opacity-25 cursor-not-allowed"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/os-vinhos"
            className="reveal flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] text-cn-green hover:text-cn-text transition-colors duration-200 w-fit"
          >
            Ver todos os vinhos
            <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
