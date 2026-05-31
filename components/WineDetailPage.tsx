'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, ChevronDown, Download,
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
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

/* ─── Medal helpers ─────────────────────────────────────────── */

const MEDAL_COLORS: Record<string, string> = {
  gold: '#C9A227', silver: '#9B9B9B', bronze: '#A0522D',
}

function MedalDot({ type }: { type: string }) {
  return (
    <span
      className="inline-block rounded-full flex-shrink-0"
      style={{ width: 10, height: 10, backgroundColor: MEDAL_COLORS[type] ?? MEDAL_COLORS.gold, marginTop: 3 }}
    />
  )
}

/* ─── Icon maps ────────────────────────────────────────────── */

const SECTION_ICONS: Record<string, LucideIcon> = {
  'Terroir':               Globe,
  'Viticultura':           Leaf,
  'Vinificação':           Wine,
  'Estágio':               Clock,
  'Potencial de Evolução': TrendingUp,
  'Viticulture':           Leaf,
  'Winemaking':            Wine,
  'Ageing':                Clock,
  'Ageing Potential':      TrendingUp,
}

/* ─── Accordion ─────────────────────────────────────────────── */

function NarrativeAccordion({
  icon: Icon, title, text, isOpen, onToggle,
}: {
  icon: LucideIcon; title: string; text: string; isOpen: boolean; onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (!contentRef.current) return
    if (!mounted.current) {
      if (!isOpen) gsap.set(contentRef.current, { height: 0, overflow: 'hidden' })
      mounted.current = true
      return
    }
    const el = contentRef.current
    if (!isOpen) {
      gsap.to(el, {
        height: 0, duration: 0.38, ease: 'power2.inOut', overwrite: true,
        onStart: () => { el.style.overflow = 'hidden' },
      })
    } else {
      gsap.set(el, { height: 'auto', overflow: 'hidden' })
      const h = el.offsetHeight
      gsap.fromTo(el, { height: 0 }, {
        height: h, duration: 0.48, ease: 'power2.out', overwrite: true,
        onComplete: () => { el.style.height = 'auto'; el.style.overflow = 'visible' },
      })
    }
  }, [isOpen])

  return (
    <div className="accordion-item border-b" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 32, height: 32, borderRadius: '7px', flexShrink: 0,
              backgroundColor: 'var(--color-green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon size={14} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </div>
          <span className="font-display uppercase tracking-[0.12em] text-cn-text" style={{ fontSize: '11px' }}>
            {title}
          </span>
        </div>
        <ChevronDown
          size={14} strokeWidth={1.5}
          style={{
            color: 'rgba(3,29,29,0.35)', flexShrink: 0,
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
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

/* ─── Page ──────────────────────────────────────────────────── */

export default function WineDetailPage({ wine }: { wine: WineData }) {
  const pageRef      = useRef<HTMLDivElement>(null)
  const narrativeRef = useRef<HTMLDivElement>(null)
  const techRef      = useRef<HTMLDivElement>(null)

  const { t, lang } = useLang()

  const narrativeSections  = lang === 'en' && wine.en ? wine.en.narrativeSections  : wine.narrativeSections
  const tastingNotes       = lang === 'en' && wine.en ? wine.en.tastingNotes       : wine.tastingNotes
  const keyPoints          = lang === 'en' && wine.en ? wine.en.keyPoints          : wine.keyPoints
  const servingSuggestion  = lang === 'en' && wine.en ? wine.en.servingSuggestion  : wine.servingSuggestion
  const introText          = lang === 'en' && wine.en ? wine.en.introText          : wine.introText

  useIsomorphicLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const otherWine = wines.find((w) => w.slug !== wine.slug) as WineData
  const otherIntroText = lang === 'en' && otherWine.en ? otherWine.en.introText : otherWine.introText
  const latestVintage = wine.vintages[0]
  const [activeYear, setActiveYear] = useState(latestVintage?.year ?? '')
  const activeVintage = wine.vintages.find((v) => v.year === activeYear) ?? latestVintage

  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState<string | null>(null)
  const [desktopOpen, setDesktopOpen] = useState<Set<string>>(
    () => new Set(narrativeSections.map((s) => s.heading))
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function getAccordionProps(heading: string) {
    if (isMobile) {
      return {
        isOpen: mobileOpen === heading,
        onToggle: () => setMobileOpen((prev) => (prev === heading ? null : heading)),
      }
    }
    return {
      isOpen: desktopOpen.has(heading),
      onToggle: () => setDesktopOpen((prev) => {
        const next = new Set(prev)
        if (next.has(heading)) next.delete(heading); else next.add(heading)
        return next
      }),
    }
  }

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-header', {
        y: 20, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'power2.out',
        delay: 0.05,
      })

      gsap.from('.accordion-item', {
        y: 18, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: narrativeRef.current, start: 'top 82%' },
      })

      gsap.from('.reveal-tech', {
        y: 16, opacity: 0, stagger: 0.04, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: techRef.current, start: 'top 85%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-cn-bg">

      {/* ── Voltar ── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <Link
          href="/os-vinhos"
          className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-40"
          style={{ color: 'rgba(3,29,29,0.50)' }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          {t.common.backToWines}
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          DETALHES — imagem sticky + conteúdo scrollável
      ══════════════════════════════════════════ */}
      <section>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-10 pb-20 md:pb-28">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

            {/* ── Esquerda: imagem sticky ── */}
            <div className="hidden md:block w-[300px] lg:w-[340px] flex-shrink-0 self-stretch">
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
                      priority
                      className="object-contain"
                      sizes="340px"
                    />
                  </div>
                </div>

                {/* Comprar CTA */}
                <button
                  disabled
                  title={t.common.comingSoon}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.14em]"
                  style={{
                    fontSize: '11px', padding: '12px 0', borderRadius: '8px',
                    backgroundColor: 'var(--color-green)', color: '#FAE6C1',
                    opacity: 0.45, cursor: 'not-allowed',
                  }}
                >
                  {t.common.buyWine}
                </button>
              </div>
            </div>

            {/* ── Direita: conteúdo scrollável ── */}
            <div className="flex-1 min-w-0">

              {/* Título e ano — mobile centered, desktop left-aligned */}
              <div className="mb-6 text-center md:text-left">
                <p className="reveal-header font-display uppercase tracking-[0.18em] text-cn-text-muted mb-2" style={{ fontSize: '11px' }}>
                  {wine.brand}
                </p>
                <h1
                  className="reveal-header font-display uppercase text-cn-text"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.04em' }}
                >
                  {wine.name}
                </h1>
              </div>

              {/* Imagem — mobile only, after title, before intro */}
              <div
                className="reveal-header block md:hidden relative w-full overflow-hidden mb-8"
                style={{ aspectRatio: '3/4', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
              >
                <div className="absolute inset-5">
                  <Image
                    src={wine.mainImage}
                    alt={wine.name}
                    fill
                    priority
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>

              {/* Introdução */}
              <div className="mb-10 text-center md:text-left">
                {introText.map((para, i) => (
                  <p
                    key={i}
                    className="reveal-header font-body text-cn-text-muted mt-4 first:mt-0"
                    style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.7 }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Vintage tabs + prémios + ficha técnica */}
              {wine.vintages.length > 0 && (
                <div className="reveal-header mb-10 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <p className="font-display uppercase tracking-[0.14em] mb-4" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                    {t.wineDetail.vintagesLabel}
                  </p>

                  {/* Year pill tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {wine.vintages.map((v) => {
                      const isActive = v.year === activeYear
                      return (
                        <button
                          key={v.year}
                          onClick={() => setActiveYear(v.year)}
                          className="font-display uppercase tracking-[0.1em] px-4 py-1.5 transition-all duration-200"
                          style={{
                            fontSize: '11px', borderRadius: '8px',
                            border: '1px solid var(--color-border)',
                            backgroundColor: isActive ? 'var(--color-green)' : 'transparent',
                            color: isActive ? '#FAE6C1' : 'var(--color-text)',
                          }}
                        >
                          {v.year}
                        </button>
                      )
                    })}
                  </div>

                  {/* Awards */}
                  {activeVintage && activeVintage.awards.length > 0 && (
                    <div className="mb-6">
                      <ul className="flex flex-col gap-2">
                        {activeVintage.awards.map((award, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <MedalDot type={award.type} />
                            <span className="font-body text-cn-text-muted" style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)', lineHeight: 1.45 }}>
                              {award.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* PDF download */}
                  {activeVintage?.techSheetUrl ? (
                    <a
                      href={activeVintage.techSheetUrl}
                      download
                      className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3 transition-colors duration-200"
                      style={{ border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-text)'; e.currentTarget.style.color = 'var(--color-bg)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text)' }}
                    >
                      {t.common.techSheet} <Download size={11} strokeWidth={1.5} />
                    </a>
                  ) : (
                    <button
                      disabled title={t.common.comingSoon}
                      className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3"
                      style={{ border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)', opacity: 0.35, cursor: 'not-allowed' }}
                    >
                      {t.common.techSheet} <Download size={11} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}

              {/* Informação Técnica + Notas de Prova */}
              <div
                ref={techRef}
                className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12"
              >

                {/* Informação Técnica */}
                <div>
                  <p className="reveal-tech font-display uppercase tracking-[0.14em] mb-6" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                    {t.wineDetail.techInfoLabel}
                  </p>
                  <dl>
                    {([
                      { Icon: Globe,        label: t.wineDetail.techLabels.region,             value: wine.techDetails.region },
                      { Icon: MapPin,       label: t.wineDetail.techLabels.subRegion,           value: wine.techDetails.subRegion },
                      { Icon: Leaf,         label: t.wineDetail.techLabels.varieties,           value: wine.techDetails.varieties },
                      { Icon: Droplets,     label: t.wineDetail.techLabels.alcohol,             value: wine.techDetails.alcohol },
                      { Icon: Activity,     label: t.wineDetail.techLabels.totalAcidity,        value: wine.techDetails.totalAcidity },
                      { Icon: FlaskConical, label: t.wineDetail.techLabels.ph,                  value: wine.techDetails.ph },
                      { Icon: Minus,        label: t.wineDetail.techLabels.residualSugar,       value: wine.techDetails.residualSugar },
                      { Icon: Thermometer,  label: t.wineDetail.techLabels.servingTemperature,  value: wine.techDetails.servingTemperature },
                    ] as { Icon: LucideIcon; label: string; value: string }[]).map(({ Icon: RowIcon, label, value }) => (
                      <div
                        key={label}
                        className="reveal-tech flex items-center gap-2.5 py-3"
                        style={{ borderBottom: '1px solid var(--color-border)' }}
                      >
                        <RowIcon size={11} strokeWidth={1.5} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                        <dt className="font-display uppercase tracking-[0.06em] flex-1" style={{ fontSize: '10px', color: 'rgba(3,29,29,0.45)' }}>
                          {label}
                        </dt>
                        <dd className="font-body text-cn-text" style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)' }}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Notas de Prova */}
                <div>
                  <p className="reveal-tech font-display uppercase tracking-[0.14em] mb-6" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                    {t.wineDetail.tastingNotesLabel}
                  </p>
                  <dl className="flex flex-col gap-6">
                    {([
                      { Icon: Eye,      label: t.wineDetail.tastingLabels.color,  value: tastingNotes.color  },
                      { Icon: Wind,     label: t.wineDetail.tastingLabels.aroma,  value: tastingNotes.aroma  },
                      { Icon: Sparkles, label: t.wineDetail.tastingLabels.palate, value: tastingNotes.palate },
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
                </div>

              </div>

              {/* Sugestão de Serviço */}
              <div
                className="reveal-tech mt-8 rounded-[8px] p-5 flex flex-col md:flex-row md:items-center md:gap-8"
                style={{
                  background: 'linear-gradient(135deg, #052625 0%, #0C4544 50%, #052625 100%)',
                  border: '1px solid rgba(250,230,193,0.08)',
                  boxShadow: '0 4px 24px rgba(5,38,37,0.18)',
                }}
              >
                <div className="flex items-center gap-2 mb-2 md:mb-0 md:shrink-0">
                  <Utensils size={11} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.60)' }} />
                  <p className="font-display uppercase tracking-[0.12em]" style={{ fontSize: '10px', color: 'rgba(250,230,193,0.60)' }}>
                    {t.wineDetail.servingSuggestionLabel}
                  </p>
                </div>
                <p className="font-body" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.65, color: 'rgba(250,230,193,0.85)' }}>
                  {servingSuggestion}
                </p>
              </div>

              {/* Accordions narrativos — Sobre o Vinho */}
              <div className="mt-12 md:mt-16">
                <p className="font-display uppercase tracking-[0.14em] mb-4" style={{ fontSize: '11px', color: 'var(--color-green)' }}>
                  {t.wineDetail.aboutWineLabel}
                </p>
                <div ref={narrativeRef} style={{ borderTop: '1px solid var(--color-border)' }}>
                  {narrativeSections.map((section) => (
                    <NarrativeAccordion
                      key={section.heading}
                      icon={SECTION_ICONS[section.heading] ?? Leaf}
                      title={section.heading}
                      text={section.text}
                      {...getAccordionProps(section.heading)}
                    />
                  ))}
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

            <div className="flex flex-col text-center md:text-left">
              <p className="font-display uppercase tracking-[0.18em] mb-3" style={{ fontSize: '11px', color: 'rgba(250,230,193,0.50)' }}>
                {otherWine.brand}
              </p>
              <h2
                className="font-display uppercase"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.04em', color: '#FAE6C1' }}
              >
                {otherWine.name}
              </h2>

              {/* Image — mobile only, between title and intro */}
              <div className="block md:hidden relative w-full overflow-hidden mt-6" style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#0A3A39' }}>
                <Image src={otherWine.mainImage} alt={otherWine.name} fill className="object-cover" sizes="100vw" />
              </div>

              {otherIntroText[0] && (
                <p
                  className="font-body mt-5 mb-8"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: 'rgba(250,230,193,0.65)' }}
                >
                  {otherIntroText[0]}
                </p>
              )}

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Link
                  href={`/os-vinhos/${otherWine.slug}`}
                  className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3 transition-all duration-200"
                  style={{ border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px', color: '#FAE6C1' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.12)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
                >
                  {t.common.details} <ArrowRight size={10} strokeWidth={1.5} />
                </Link>
                <button
                  disabled title={t.common.comingSoon}
                  className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] px-5 py-3"
                  style={{ backgroundColor: 'rgba(250,230,193,0.12)', borderRadius: '8px', color: 'rgba(250,230,193,0.55)', cursor: 'not-allowed' }}
                >
                  {t.common.buy} <ArrowRight size={10} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Image — desktop only */}
            <div className="hidden md:block relative w-full overflow-hidden" style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#0A3A39' }}>
              <Image src={otherWine.mainImage} alt={otherWine.name} fill className="object-cover" sizes="50vw" />
            </div>

          </div>
        </div>
      </section>

      {/* ── Explore também ── */}
      <SectionExplore />

    </div>
  )
}
