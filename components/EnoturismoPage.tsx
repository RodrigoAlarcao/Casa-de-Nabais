'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useLang } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const IMG_RATIO = '4/5'

const PROVAS_IMAGES = [
  { src: '/images/5. O enoturismo/6.webp', alt: 'O Enoturismo' },
  { src: '/images/5. O enoturismo/3.webp', alt: 'O Enoturismo' },
]

const VISITAS_IMAGES = [
  { src: '/images/5. O enoturismo/2.webp', alt: 'O Enoturismo' },
  { src: '/images/5. O enoturismo/7.webp', alt: 'O Enoturismo' },
]

const ALMOCOS_IMAGES = [
  { src: '/images/5. O enoturismo/11.webp', alt: 'O Enoturismo' },
  { src: '/images/5. O enoturismo/1.webp', alt: 'O Enoturismo' },
]

const PASSEIOS_IMAGES = [
  { src: '/images/5. O enoturismo/8.webp', alt: 'O Enoturismo' },
  { src: '/images/5. O enoturismo/14.webp', alt: 'O Enoturismo' },
]

/* ─── 2-image row ───────────────────────────────────────────────── */
// Outer grid-cols-2 gap-4 mirrors the portrait+text block above exactly —
// two equal-width landscape images, column edges align pixel-perfectly.

function TwoImages({
  images,
}: {
  images: { src: string; alt: string }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative overflow-hidden"
          style={{ aspectRatio: '3/2', borderRadius: '4px', backgroundColor: '#0A3A39' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 45vw, 50vw"
          />
        </div>
      ))}
    </div>
  )
}

/* ─── Mobile section block (full-bleed image + gradient title + text + swipe carousel) ── */

function MobileSection({
  title,
  paras,
  portraitSrc,
  portraitAlt,
  images,
}: {
  title: React.ReactNode
  paras: string[]
  portraitSrc: string
  portraitAlt: string
  images: { src: string; alt: string }[]
}) {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const dragStartX = useRef(0)
  const [grabbing, setGrabbing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const GAP = 12
  const canPrev = index > 0
  const canNext = index < images.length - 1

  useIsomorphicLayoutEffect(() => {
    if (!imgRef.current || !containerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -16, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
    return () => ctx.revert()
  }, [])

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (diff > 50 && canNext) setIndex((i) => i + 1)
    else if (diff < -50 && canPrev) setIndex((i) => i - 1)
  }

  return (
    <div className="lg:hidden">
      {/* Heading + 1º parágrafo */}
      <div className="px-6 pt-12 pb-8 text-center">
        <h2
          className="font-display mb-6"
          style={{
            fontSize: 'clamp(1.75rem, 7vw, 2.25rem)', lineHeight: 1.1, letterSpacing: '0.02em',
            color: '#FAE6C1',
          }}
        >
          {title}
        </h2>
        <p
          className="font-body"
          style={{
            fontSize: 'clamp(0.9375rem, 4vw, 1rem)',
            lineHeight: 1.6,
            color: 'rgba(255,249,237,0.90)',
          }}
        >
          {paras[0]}
        </p>
      </div>

      {/* Imagem editorial (retrato) com parallax */}
      <div ref={containerRef} className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39' }}>
        <div
          ref={imgRef}
          className="absolute will-change-transform"
          style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}
        >
          <Image src={portraitSrc} alt={portraitAlt} fill className="object-cover" sizes="calc(100vw - 3rem)" />
        </div>
      </div>

      {/* Restantes parágrafos — bloco de texto antes do carrossel */}
      <div className="px-6 pt-8 pb-2 text-center">
        {paras.slice(1).map((para, i) => (
          <p
            key={i}
            className="font-body mb-4 last:mb-0"
            style={{
              fontSize: 'clamp(0.9375rem, 4vw, 1rem)',
              lineHeight: 1.6,
              color: 'rgba(255,249,237,0.72)',
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Carrossel das 3 imagens */}
      <div
        className="mt-6 py-2 select-none"
        style={{ overflowX: 'clip', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setGrabbing(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            gap: `${GAP}px`,
            paddingLeft: '24px',
            transform: `translateX(calc(-${index} * (85vw + ${GAP}px)))`,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: '85vw', aspectRatio: '3/2', backgroundColor: '#0A3A39', borderRadius: '4px' }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="85vw" />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel nav */}
      <div className="mt-4 pb-14 flex items-center gap-5 justify-center">
        <button
          onClick={() => setIndex((i) => i - 1)}
          disabled={!canPrev}
          aria-label={t.common.previous}
          className="p-1 transition-opacity duration-200"
          style={{ opacity: canPrev ? 1 : 0.25 }}
        >
          <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
        <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(250,230,193,0.55)' }}>
          {index + 1} {t.common.of} {images.length}
        </span>
        <button
          onClick={() => setIndex((i) => i + 1)}
          disabled={!canNext}
          aria-label={t.common.next}
          className="p-1 transition-opacity duration-200"
          style={{ opacity: canNext ? 1 : 0.25 }}
        >
          <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      </div>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function EnoturismoPage() {
  const { t } = useLang()
  const pageRef    = useRef<HTMLDivElement>(null)
  const mobileHeroRef    = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)
  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef       = useRef<HTMLDivElement>(null)

  /* portrait parallax refs — one pair per section */
  const p1Ref    = useRef<HTMLDivElement>(null)
  const p1Wrap   = useRef<HTMLDivElement>(null)
  const p2Ref    = useRef<HTMLDivElement>(null)
  const p2Wrap   = useRef<HTMLDivElement>(null)
  const p3Ref    = useRef<HTMLDivElement>(null)
  const p3Wrap   = useRef<HTMLDivElement>(null)
  const p4Ref    = useRef<HTMLDivElement>(null)
  const p4Wrap   = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal-eno-page', {
        y: 30, opacity: 0, stagger: 0.09, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: pageRef.current, start: 'top 75%' },
      })

      if (panoramicImgRef.current && panoramicContainerRef.current) {
        gsap.to(panoramicImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: panoramicContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (mobileHeroImgRef.current && mobileHeroRef.current && window.innerWidth < 1024) {
        gsap.to(mobileHeroImgRef.current, {
          yPercent: -16, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      const pairs = [
        [p1Ref, p1Wrap], [p2Ref, p2Wrap], [p3Ref, p3Wrap], [p4Ref, p4Wrap],
      ] as const
      pairs.forEach(([portrait, wrap]) => {
        if (wrap.current && portrait.current) {
          gsap.to(wrap.current, {
            yPercent: -20, ease: 'none',
            scrollTrigger: { trigger: portrait.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        }
      })

      gsap.utils.toArray<HTMLElement>('.reveal-eno-sec').forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── shared text column ── */
  function TextColumn({
    title, paras, pad,
  }: { title: string; paras: string[]; pad: 'left' | 'right' }) {
    return (
      <div className={`flex flex-col px-0 ${pad === 'left' ? 'lg:pr-10' : 'lg:pl-10'}`}>
        <h2
          className="reveal-eno-sec font-display mb-8 lg:mb-10 text-center lg:text-left"
          style={{
            fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
            lineHeight: 1.1,
            color: '#FAE6C1',
          }}
        >
          {title}
        </h2>
        {paras.map((para, i) => (
          <p
            key={i}
            className="reveal-eno-sec font-body mb-5 last:mb-0 text-center lg:text-left"
            style={{
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.65,
              color: 'rgba(255,249,237,0.72)',
            }}
          >
            {para}
          </p>
        ))}
      </div>
    )
  }

  /* ── portrait cell ── */
  function PortraitCell({
    src, alt, containerRef, wrapRef,
  }: {
    src: string; alt: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
    wrapRef: React.RefObject<HTMLDivElement | null>;
  }) {
    return (
      <div className="reveal-eno-sec hidden lg:block">
        <div
          ref={containerRef}
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
        >
          <div
            ref={wrapRef}
            className="absolute will-change-transform"
            style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
          >
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 50vw" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef}>

      {/* ══════════════════════════════════════════════════════
          ZONA ESCURA — hero + todas as secções de actividade
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(180deg, #031D1D 0%, #031D1D 35%, #0C4544 62%, #031D1D 100%)' }}>

        {/* ── MOBILE HERO — texto primeiro, depois imagem ── */}
        <div className="lg:hidden">

          {/* ← Voltar */}
          <div className="px-6 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-50"
              style={{ color: 'rgba(250,230,193,0.80)' }}
            >
              <ArrowLeft size={11} strokeWidth={1.5} />
              {t.common.back}
            </Link>
          </div>

          {/* Título + intro */}
          <div className="px-6 pt-8 pb-10 text-center">
            <h1
              className="font-display uppercase mb-7"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.05em', color: '#FAE6C1' }}
            >
              {t.enoturismoPage.title}
            </h1>
            <p
              className="font-body"
              style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)', lineHeight: 1.6, color: 'rgba(255,249,237,0.90)' }}
            >
              {t.enoturismoPage.intro}
            </p>
          </div>

          {/* Imagem editorial com parallax */}
          <div ref={mobileHeroRef} className="relative overflow-hidden mx-6 rounded-[4px]" style={{ aspectRatio: '4/5', backgroundColor: '#0A3A39' }}>
            <div
              ref={mobileHeroImgRef}
              className="absolute will-change-transform"
              style={{ top: '-28%', bottom: '-28%', left: 0, right: 0 }}
            >
              <Image
                src="/images/5. O enoturismo/9.webp"
                alt="O Enoturismo — Casa de Nabais"
                fill priority
                className="object-cover"
                sizes="calc(100vw - 3rem)"
              />
            </div>
          </div>
        </div>

        {/* ── VOLTAR + TÍTULO (desktop) ── */}
        <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-50"
            style={{ color: 'rgba(250,230,193,0.60)' }}
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            {t.common.back}
          </Link>

          <h1
            className="font-display uppercase text-center mt-8 md:mt-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.0, letterSpacing: '0.05em', color: '#FAE6C1' }}
          >
            {t.enoturismoPage.title}
          </h1>
        </div>

        {/* INTRO — desktop */}
        <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
          <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
            <p
              className="font-body"
              style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', lineHeight: 1.5, color: 'rgba(255,249,237,0.72)' }}
            >
              {t.enoturismoPage.intro}
            </p>
          </div>
        </section>

        {/* PANORÂMICA 16:7 — desktop */}
        <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10">
          <div
            ref={panoramicContainerRef}
            className="relative overflow-hidden w-full"
            style={{ aspectRatio: '16/7', backgroundColor: '#0A3A39', borderRadius: '4px' }}
          >
            <div
              ref={panoramicImgRef}
              className="absolute will-change-transform"
              style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
            >
              <Image
                src="/images/5. O enoturismo/9.webp"
                alt="O Enoturismo — Casa de Nabais"
                fill priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PROVAS DE VINHO
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title={t.enoturismoPage.provasHeading}
          paras={t.enoturismoPage.provasParas}
          portraitSrc="/images/5. O enoturismo/1a.webp"
          portraitAlt="Prova de vinhos na adega"
          images={PROVAS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <PortraitCell
              src="/images/5. O enoturismo/1a.webp"
              alt="Prova de vinhos na adega"
              containerRef={p1Ref}
              wrapRef={p1Wrap}
            />
            <TextColumn title={t.enoturismoPage.provasHeading} paras={t.enoturismoPage.provasParas} pad="right" />
          </div>
          <div className="mt-4">
            <TwoImages images={PROVAS_IMAGES} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            VISITAS GUIADAS
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title={t.enoturismoPage.visitasHeading}
          paras={t.enoturismoPage.visitasParas}
          portraitSrc="/images/5. O enoturismo/5.webp"
          portraitAlt="Visita guiada às vinhas"
          images={VISITAS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <TextColumn title={t.enoturismoPage.visitasHeading} paras={t.enoturismoPage.visitasParas} pad="left" />
            <PortraitCell
              src="/images/5. O enoturismo/5.webp"
              alt="Visita guiada às vinhas"
              containerRef={p2Ref}
              wrapRef={p2Wrap}
            />
          </div>
          <div className="mt-4">
            <TwoImages images={VISITAS_IMAGES} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ALMOÇOS E EXPERIÊNCIAS GASTRONÓMICAS
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title={t.enoturismoPage.almocosHeading}
          paras={t.enoturismoPage.almocosParas}
          portraitSrc="/images/5. O enoturismo/9a.webp"
          portraitAlt="Almoço na quinta"
          images={ALMOCOS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <PortraitCell
              src="/images/5. O enoturismo/9a.webp"
              alt="Almoço na quinta"
              containerRef={p3Ref}
              wrapRef={p3Wrap}
            />
            <TextColumn title={t.enoturismoPage.almocosHeading} paras={t.enoturismoPage.almocosParas} pad="right" />
          </div>
          <div className="mt-4">
            <TwoImages images={ALMOCOS_IMAGES} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PASSEIOS NA MATA
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title={t.enoturismoPage.passeiosHeading}
          paras={t.enoturismoPage.passeiosParas}
          portraitSrc="/images/5. O enoturismo/15.webp"
          portraitAlt="Passeio na mata"
          images={PASSEIOS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4 pb-28">
          <div className="grid grid-cols-2 gap-4 items-center">
            <TextColumn title={t.enoturismoPage.passeiosHeading} paras={t.enoturismoPage.passeiosParas} pad="left" />
            <PortraitCell
              src="/images/5. O enoturismo/15.webp"
              alt="Passeio na mata"
              containerRef={p4Ref}
              wrapRef={p4Wrap}
            />
          </div>
          <div className="mt-4">
            <TwoImages images={PASSEIOS_IMAGES} />
          </div>
        </section>

        {/* Mobile bottom spacing before SectionExplore */}
        <div className="lg:hidden" style={{ height: '48px', background: '#031D1D' }} />

      </div>
      {/* ── fim zona escura ── */}

      {/* ══════════════════════════════════════
          EXPLORE TAMBÉM — fundo claro
      ══════════════════════════════════════ */}
      <SectionExplore excludeHref="/o-enoturismo" />

    </div>
  )
}
