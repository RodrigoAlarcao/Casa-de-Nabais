'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'
import ComprarVinhoModal from './ComprarVinhoModal'

gsap.registerPlugin(ScrollTrigger)

const wineImages: Record<string, string> = {
  'vinha-do-pomar': '/images/4. Os vinhos/vinha-do-pomar.webp',
  'loureiro':       '/images/4. Os vinhos/loureiro.webp',
}

const wineNames: Record<string, string> = {
  'vinha-do-pomar': 'Vinha do Pomar',
  'loureiro':       'Loureiro',
}

export default function SectionVinhos() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const [buyWine, setBuyWine] = useState<string | null>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal-vinhos', {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-bg">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header — centered */}
        <div className="text-center mb-14 md:mb-16 max-w-[640px] mx-auto">
          <h2
            className="reveal-vinhos font-display uppercase text-cn-text mb-6 md:whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
            }}
          >
            {t.sectionVinhos.heading}
          </h2>
          <p
            className="reveal-vinhos font-body text-cn-text-muted"
            style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.6 }}
          >
            {t.sectionVinhos.body}
          </p>
        </div>

        {/* Wine cards — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.sectionVinhos.wines.map((wine) => (
            <div key={wine.slug} className="reveal-vinhos flex flex-col">

              {/* Título — 1.º em mobile e desktop */}
              <div className="order-1 text-center pt-6 md:pt-8 pb-7 md:pb-5">
                <p
                  className="font-display uppercase tracking-[0.18em] text-cn-text-muted mb-1"
                  style={{ fontSize: '11px' }}
                >
                  Casa de Nabais
                </p>
                <h3
                  className="font-display uppercase text-cn-text"
                  style={{
                    fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  {wineNames[wine.slug]}
                </h3>
              </div>

              {/* Imagem — 2.º em mobile e desktop */}
              <div
                className="order-2 relative w-full overflow-hidden"
                style={{ aspectRatio: '4/5', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
              >
                <Image
                  src={wineImages[wine.slug]}
                  alt={wineNames[wine.slug]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Descrição — mobile: 3.º, desktop: 3.º */}
              <div className="order-3 text-center pt-5 pb-5">
                <p className="font-body text-cn-text-muted mx-auto" style={{ fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)', lineHeight: 1.6 }}>
                  {wine.intro}
                </p>
              </div>

              {/* Buttons — side by side */}
              <div className="order-4 grid grid-cols-2 gap-3">
                <Link
                  href={`/os-vinhos/${wine.slug}`}
                  className="flex items-center justify-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] py-4 transition-colors duration-200"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    borderRadius: '8px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-text)'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-bg)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'
                  }}
                >
                  {t.common.details}
                  <ArrowRight size={10} strokeWidth={1.5} />
                </Link>
                <button
                  onClick={() => setBuyWine(`Casa de Nabais ${wineNames[wine.slug]}`)}
                  className="flex items-center justify-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] py-4 transition-opacity duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--color-green)',
                    color: '#FAE6C1',
                    cursor: 'pointer',
                    borderRadius: '8px',
                  }}
                >
                  {t.common.buy}
                  <ArrowRight size={10} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Comprar Vinho Modal ── */}
      <ComprarVinhoModal
        key={buyWine ?? 'closed'}
        open={buyWine !== null}
        onClose={() => setBuyWine(null)}
        preselectedWine={buyWine ?? undefined}
      />
    </section>
  )
}
