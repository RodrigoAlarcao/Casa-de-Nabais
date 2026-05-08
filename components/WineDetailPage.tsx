'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Download, ChevronDown,
  Globe, MapPin, Leaf, Wine, Clock, TrendingUp,
  Utensils, Eye, Wind, Sparkles, Thermometer,
  Droplets, FlaskConical, Activity, Minus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import SectionExplore from './SectionExplore'
import { wines, type WineData } from '@/lib/wines-data'

gsap.registerPlugin(ScrollTrigger)

/* ─── Icon maps ────────────────────────────────────────────── */

const SECTION_ICONS: Record<string, LucideIcon> = {
  'Terroir':              Globe,
  'Viticultura':          Leaf,
  'Vinificação':          Wine,
  'Estágio':              Clock,
  'Potencial de Evolução': TrendingUp,
}

const MEDAL_COLORS: Record<string, string> = {
  gold: '#C9A227', silver: '#9B9B9B', bronze: '#A0522D',
}

/* ─── Sub-components ────────────────────────────────────────── */

function MedalDot({ type }: { type: string }) {
  return (
    <span
      className="inline-block rounded-full flex-shrink-0"
      style={{ width: 10, height: 10, backgroundColor: MEDAL_COLORS[type] ?? MEDAL_COLORS.gold, marginTop: 2 }}
    />
  )
}

function NarrativeAccordion({
  icon: Icon, title, text, defaultOpen = false,
}: {
  icon: LucideIcon; title: string; text: string; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (contentRef.current && !defaultOpen) {
      gsap.set(contentRef.current, { height: 0, overflow: 'hidden' })
    }
  }, [])

  function toggle() {
    if (!contentRef.current) return
    const el = contentRef.current

    if (open) {
      gsap.to(el, {
        height: 0, duration: 0.38, ease: 'power2.inOut', overwrite: true,
        onStart: () => { el.style.overflow = 'hidden' },
      })
    } else {
      gsap.set(el, { height: 'auto', overflow: 'hidden' })
      const h = el.offsetHeight
      gsap.fromTo(el,
        { height: 0 },
        {
          height: h, duration: 0.48, ease: 'power2.out', overwrite: true,
          onComplete: () => { el.style.height = 'auto'; el.style.overflow = 'visible' },
        }
      )
    }
    setOpen((v) => !v)
  }

  return (
    <div className="accordion-item border-b" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 32, height: 32, borderRadius: '7px', flexShrink: 0,
              backgroundColor: open ? 'var(--color-green)' : 'rgba(12,69,68,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.25s ease',
            }}
          >
            <Icon
              size={14} strokeWidth={1.5}
              style={{ color: open ? '#FAE6C1' : 'var(--color-green)', transition: 'color 0.25s ease' }}
            />
          </div>
          <span
            className="font-display uppercase tracking-[0.12em] text-cn-text"
            style={{ fontSize: '11px' }}
          >
            {title}
          </span>
        </div>
        <ChevronDown
          size={14} strokeWidth={1.5}
          style={{
            color: 'rgba(3,29,29,0.35)', flexShrink: 0,
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div ref={contentRef} style={{ overflow: 'hidden' }}>
        <p
          className="font-body text-cn-text-muted"
          style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.75, paddingBottom: '20px' }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────── */

export default function WineDetailPage({ wine }: { wine: WineData }) {
  const pageRef    = useRef<HTMLDivElement>(null)
  const heroRef    = useRef<HTMLElement>(null)
  const narrativeRef = useRef<HTMLDivElement>(null)
  const techRef    = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLElement>(null)

  const latestVintage = wine.vintages[0]
  const [activeYear, setActiveYear] = useState(latestVintage?.year ?? '')
  const activeVintage = wine.vintages.find((v) => v.year === activeYear) ?? latestVintage
  const otherWine = wines.find((w) => w.slug !== wine.slug) as WineData

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-hero', {
        y: 30, opacity: 0, stagger: 0.07, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
      })

      gsap.from('.accordion-item', {
        y: 18, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: narrativeRef.current, start: 'top 82%' },
      })

      gsap.from('.reveal-tech', {
        y: 16, opacity: 0, stagger: 0.04, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: techRef.current, start: 'top 85%' },
      })

      gsap.from('.reveal-cards', {
        y: 25, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-cn-bg">

      {/* ══════════════════════════
          CABEÇALHO
      ══════════════════════════ */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <Link
          href="/os-vinhos"
          className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-40"
          style={{ fontFamily: 'var(--font-display), serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(3,29,29,0.50)' }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Os vinhos
        </Link>
      </div>

      <div className="text-center pt-8 pb-2 md:pt-10 md:pb-4">
        <p className="font-display uppercase tracking-[0.18em] text-cn-text-muted" style={{ fontSize: '11px' }}>
          {wine.brand}
        </p>
        <h1
          className="font-display uppercase text-cn-text mt-2"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.0, letterSpacing: '0.04em' }}
        >
          {wine.name}
        </h1>
      </div>

      {/* ══════════════════════════
          HERO — intro + prémios
      ══════════════════════════ */}
      <section ref={heroRef} className="py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

            {/* Imagem */}
            <div className="reveal-hero">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '3/4', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}
              >
                <Image
                  src={wine.mainImage}
                  alt={wine.name}
                  fill priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Texto + prémios */}
            <div className="flex flex-col pt-0 md:pt-4">
              <p className="reveal-hero font-display uppercase tracking-[0.14em] text-cn-text-muted mb-3" style={{ fontSize: '11px' }}>
                {latestVintage?.year}
              </p>
              <h2
                className="reveal-hero font-body text-cn-text mb-6"
                style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', lineHeight: 1.25, fontStyle: 'italic', fontWeight: 400 }}
              >
                {wine.subtitle}
              </h2>

              {wine.introText.map((para, i) => (
                <p
                  key={i}
                  className="reveal-hero font-body text-cn-text-muted mb-4 last:mb-0"
                  style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.6 }}
                >
                  {para}
                </p>
              ))}

              {wine.vintages.length > 0 && (
                <div className="reveal-hero mt-8 pt-7" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <p className="font-display uppercase tracking-[0.14em] text-cn-text mb-4" style={{ fontSize: '11px' }}>
                    Prémios
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {wine.vintages.map((v) => {
                      const isActive = v.year === activeYear
                      return (
                        <button
                          key={v.year}
                          onClick={() => setActiveYear(v.year)}
                          className="font-display uppercase tracking-[0.1em] px-4 py-1.5 transition-all duration-200"
                          style={{
                            fontSize: '11px', borderRadius: '100px',
                            border: '1px solid var(--color-border)',
                            backgroundColor: isActive ? 'var(--color-text)' : 'transparent',
                            color: isActive ? 'var(--color-bg)' : 'var(--color-text)',
                          }}
                        >
                          {v.year}
                        </button>
                      )
                    })}
                  </div>

                  <div className="min-h-[48px]">
                    {activeVintage && activeVintage.awards.length > 0 ? (
                      <ul className="flex flex-col gap-2 mb-5">
                        {activeVintage.awards.map((award, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <MedalDot type={award.type} />
                            <span className="font-body text-cn-text-muted" style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)', lineHeight: 1.45 }}>
                              {award.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-body text-cn-text-muted mb-5" style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)', opacity: 0.55 }}>
                        Sem prémios registados para esta colheita.
                      </p>
                    )}
                  </div>

                  {activeVintage?.techSheetUrl ? (
                    <a
                      href={activeVintage.techSheetUrl}
                      download
                      className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3 transition-colors duration-200"
                      style={{ border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-text)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-bg)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)' }}
                    >
                      Ficha Técnica <Download size={11} strokeWidth={1.5} />
                    </a>
                  ) : (
                    <button
                      disabled title="Em breve"
                      className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3"
                      style={{ border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)', opacity: 0.40, cursor: 'not-allowed' }}
                    >
                      Ficha Técnica <Download size={11} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DETALHES — imagem sticky + conteúdo scrollável
      ══════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

            {/* ── Esquerda: imagem sticky ── */}
            <div className="hidden md:block w-[320px] lg:w-[360px] flex-shrink-0">
              <div className="sticky" style={{ top: '90px' }}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '3/4', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
                >
                  <div className="absolute inset-5">
                    <Image
                      src={wine.mainImage}
                      alt={wine.name}
                      fill
                      className="object-contain"
                      sizes="360px"
                    />
                  </div>
                </div>
                <div className="text-center mt-5">
                  <p className="font-display uppercase tracking-[0.18em] text-cn-text-muted" style={{ fontSize: '10px' }}>
                    {wine.brand}
                  </p>
                  <p
                    className="font-display uppercase text-cn-text mt-1"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', letterSpacing: '0.06em', lineHeight: 1 }}
                  >
                    {wine.name}
                  </p>
                  {latestVintage && (
                    <p className="font-display uppercase tracking-[0.1em] text-cn-text-muted mt-1.5" style={{ fontSize: '10px', opacity: 0.55 }}>
                      {latestVintage.year}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Direita: detalhes scrolláveis ── */}
            <div className="flex-1 min-w-0">

              {/* Label de secção */}
              <p className="font-display uppercase tracking-[0.14em] mb-8" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                Sobre o vinho
              </p>

              {/* Accordions narrativos */}
              <div ref={narrativeRef} style={{ borderTop: '1px solid var(--color-border)' }}>
                {wine.narrativeSections.map((section, i) => (
                  <NarrativeAccordion
                    key={section.heading}
                    icon={SECTION_ICONS[section.heading] ?? Leaf}
                    title={section.heading}
                    text={section.text}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>

              {/* Informação Técnica + Notas de Prova */}
              <div
                ref={techRef}
                className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12"
              >

                {/* Informação Técnica */}
                <div>
                  <p className="reveal-tech font-display uppercase tracking-[0.14em] mb-6" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                    Informação Técnica
                  </p>
                  <dl>
                    {([
                      { Icon: Globe,       label: 'Região',              value: wine.techDetails.region },
                      { Icon: MapPin,      label: 'Sub-região',          value: wine.techDetails.subRegion },
                      { Icon: Leaf,        label: 'Casta',               value: wine.techDetails.varieties },
                      { Icon: Droplets,    label: 'Álcool',              value: wine.techDetails.alcohol },
                      { Icon: Activity,    label: 'Acidez Total',        value: wine.techDetails.totalAcidity },
                      { Icon: FlaskConical,label: 'pH',                  value: wine.techDetails.ph },
                      { Icon: Minus,       label: 'Açúcar Residual',     value: wine.techDetails.residualSugar },
                      { Icon: Thermometer, label: 'Temperatura de Serviço', value: wine.techDetails.servingTemperature },
                    ] as { Icon: LucideIcon; label: string; value: string }[]).map(({ Icon: RowIcon, label, value }) => (
                      <div
                        key={label}
                        className="reveal-tech flex items-center gap-2.5 py-3"
                        style={{ borderBottom: '1px solid var(--color-border)' }}
                      >
                        <RowIcon size={11} strokeWidth={1.5} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                        <dt
                          className="font-display uppercase tracking-[0.06em] flex-1"
                          style={{ fontSize: '10px', color: 'rgba(3,29,29,0.45)' }}
                        >
                          {label}
                        </dt>
                        <dd className="font-body text-cn-text" style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)' }}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Notas de Prova + Sugestão de Serviço */}
                <div>
                  <p className="reveal-tech font-display uppercase tracking-[0.14em] mb-6" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                    Notas de Prova
                  </p>
                  <dl className="flex flex-col gap-6 mb-8">
                    {([
                      { Icon: Eye,      label: 'Cor',     value: wine.tastingNotes.color  },
                      { Icon: Wind,     label: 'Aroma',   value: wine.tastingNotes.aroma  },
                      { Icon: Sparkles, label: 'Paladar', value: wine.tastingNotes.palate },
                    ] as { Icon: LucideIcon; label: string; value: string }[]).map(({ Icon: ItemIcon, label, value }) => (
                      <div key={label} className="reveal-tech">
                        <div className="flex items-center gap-2 mb-1.5">
                          <ItemIcon size={11} strokeWidth={1.5} style={{ color: 'var(--color-green)' }} />
                          <dt className="font-display uppercase tracking-[0.12em]" style={{ fontSize: '10px', color: 'var(--color-green)' }}>
                            {label}
                          </dt>
                        </div>
                        <dd className="font-body text-cn-text-muted" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.65 }}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Sugestão de Serviço */}
                  <div
                    className="reveal-tech rounded-[8px] p-5"
                    style={{ backgroundColor: 'rgba(12,69,68,0.06)', border: '1px solid rgba(12,69,68,0.14)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Utensils size={11} strokeWidth={1.5} style={{ color: 'var(--color-green)' }} />
                      <p className="font-display uppercase tracking-[0.12em]" style={{ fontSize: '10px', color: 'var(--color-green)' }}>
                        Sugestão de Serviço
                      </p>
                    </div>
                    <p className="font-body text-cn-text-muted" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.65 }}>
                      {wine.servingSuggestion}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CARDS + FOTOGRAFIA
      ══════════════════════════ */}
      <section ref={cardsRef} className="pb-0" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-14 md:pb-20">

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-4">
            {[
              { title: 'Pontos-chave', text: wine.keyPoints },
              { title: 'Notas de prova', text: `${wine.tastingNotes.color} ${wine.tastingNotes.aroma} ${wine.tastingNotes.palate}` },
              { title: 'Sugestão de serviço', text: wine.servingSuggestion },
            ].map(({ title, text }) => (
              <div key={title} className="reveal-cards flex flex-col p-6" style={{ backgroundColor: '#0C4544', borderRadius: '8px' }}>
                <h3 className="font-body mb-3" style={{ fontSize: '1.0625rem', fontStyle: 'italic', fontWeight: 400, color: '#FAE6C1' }}>
                  {title}
                </h3>
                <p className="font-body" style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                  {text}
                </p>
              </div>
            ))}
            <div className="reveal-cards relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '8px', backgroundColor: '#1A3A2E' }}>
              <Image src={wine.sectionImage} alt={`${wine.name} — detalhe`} fill className="object-cover" sizes="100vw" />
            </div>
          </div>

          {/* Desktop — foto absoluta + cards glassmorphic */}
          <div className="reveal-cards hidden md:block relative" style={{ paddingBottom: '200px' }}>
            <div
              className="absolute overflow-hidden"
              style={{ right: 0, top: 0, bottom: 0, width: '55%', borderRadius: '8px', zIndex: 1 }}
            >
              <Image src={wine.sectionImage} alt={`${wine.name} — detalhe`} fill className="object-cover" sizes="55vw" />
            </div>

            <div className="relative" style={{ zIndex: 2 }}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { title: 'Pontos-chave', text: wine.keyPoints },
                  { title: 'Notas de prova', text: `${wine.tastingNotes.color} ${wine.tastingNotes.aroma} ${wine.tastingNotes.palate}` },
                ].map(({ title, text }) => (
                  <div
                    key={title}
                    className="flex flex-col p-7"
                    style={{
                      backgroundColor: 'rgba(5, 38, 37, 0.65)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(250, 230, 193, 0.10)',
                      borderRadius: '8px',
                    }}
                  >
                    <h3 className="font-body mb-4" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', fontStyle: 'italic', fontWeight: 400, color: '#FAE6C1' }}>
                      {title}
                    </h3>
                    <p className="font-body" style={{ fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ width: 'calc(50% - 8px)' }}>
                <div
                  className="flex flex-col p-7"
                  style={{
                    backgroundColor: 'rgba(5, 38, 37, 0.65)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(250, 230, 193, 0.10)',
                    borderRadius: '8px',
                  }}
                >
                  <h3 className="font-body mb-4" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', fontStyle: 'italic', fontWeight: 400, color: '#FAE6C1' }}>
                    Sugestão de serviço
                  </h3>
                  <p className="font-body" style={{ fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}>
                    {wine.servingSuggestion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          OUTRO VINHO — cross-sell
      ══════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #052625 0%, #0C4544 50%, #052625 100%)' }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

            <div className="flex flex-col">
              <p className="font-display uppercase tracking-[0.18em] mb-3" style={{ fontSize: '11px', color: 'rgba(250,230,193,0.50)' }}>
                {otherWine.brand}
              </p>
              <h2
                className="font-display uppercase mb-8"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.04em', color: '#FAE6C1' }}
              >
                {otherWine.name}
              </h2>

              <div className="flex items-center gap-3">
                <Link
                  href={`/os-vinhos/${otherWine.slug}`}
                  className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3 transition-all duration-200"
                  style={{ border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px', color: '#FAE6C1' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.12)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
                >
                  Detalhes <ArrowRight size={10} strokeWidth={1.5} />
                </Link>
                <button
                  disabled title="Em breve"
                  className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3"
                  style={{ backgroundColor: 'rgba(250,230,193,0.12)', borderRadius: '8px', color: 'rgba(250,230,193,0.55)', cursor: 'not-allowed' }}
                >
                  Comprar <ArrowRight size={10} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#0A3A39' }}>
              <Image src={otherWine.mainImage} alt={otherWine.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════
          EXPLORE TAMBÉM
      ══════════════════════════ */}
      <SectionExplore />

    </div>
  )
}
