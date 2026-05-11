'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const IMG_RATIO = '4/5'

const INTRO_TEXT =
  'Na Casa de Nabais, o enoturismo no Vale do Lima vive-se de forma autêntica e intimista. Entre o solar histórico, as vinhas, a adega e a mesa, cada experiência permite compreender o vinho desde a sua origem. Provas comentadas, visitas guiadas, gastronomia sazonal e estadias em plena natureza revelam uma quinta onde o Loureiro, a terra e o tempo definem o ritmo.'

const PROVAS_PARAS = [
  'Na Casa de Nabais, as provas de vinho são sempre acompanhadas por quem o faz — o produtor, o enólogo ou um membro da equipa técnica — assegurando que cada vinho provado é explicado a partir da vinha, do solo e das escolhas de vinificação que lhe dão forma.',
  'O Loureiro, casta central da quinta, afirma-se como fio condutor destas provas, com a sua expressão aromática marcada, as notas florais de rosa branca, flor e folha de laranjeira e o subtil laivo a louro e, na boca, a mesma nota nítida de flor e folha de laranjeira e uma acidez vibrante e muito fresca.',
]
const PROVAS_IMAGES = [
  { src: '/images/homepage/enoturismo/carousel-02.webp', alt: 'Prova de vinho' },
  { src: '/images/homepage/enoturismo/carousel-05.webp', alt: 'Vindima' },
  { src: '/images/homepage/enoturismo/carousel-06.webp', alt: 'Pôr do sol no Vale do Lima' },
]

const VISITAS_PARAS = [
  'O acompanhamento das visitas à adega e às vinhas da Casa de Nabais cabe sempre a quem vive a quinta todos os dias e conhece cada detalhe do que aqui é feito.',
  'O percurso permite assim descobrir a relação direta entre vinha e adega, e compreender, por exemplo, a importância das uvas colhidas à mão que chegam à prensa em minutos ou do trabalho contínuo em torno da casta Loureiro e dos diferentes solos da propriedade.',
]
const VISITAS_IMAGES = [
  { src: '/images/homepage/vinhas/section-01.webp',  alt: 'Vinhas da Casa de Nabais' },
  { src: '/images/homepage/vinhas/carousel-01.webp', alt: 'Percurso entre as vinhas' },
  { src: '/images/homepage/vinhas/carousel-03.webp', alt: 'Detalhe das videiras' },
]

const ALMOCOS_PARAS = [
  'A gastronomia da Casa de Nabais nasce do seu próprio ecossistema. Da horta para a cozinha, do pomar para a mesa, cada refeição reflete a estação e o que a quinta produz em cada estação. Fruta fresca, sidra, marmelada, hortícolas e ervas aromáticas podem ser servidos aos hóspedes ou integrar os menus vínicos pensados para dialogar com os vinhos da casa.',
  'Almoços e experiências gastronómicas são realizados mediante reserva, celebrando uma cozinha simples, honesta e profundamente ligada a este lugar onde os pratos do Minho têm primazia.',
]
const ALMOCOS_IMAGES = [
  { src: '/images/homepage/casa/carousel-01.webp',        alt: 'Interior da Casa de Nabais' },
  { src: '/images/homepage/casa/carousel-02.webp',        alt: 'Sala de refeições' },
  { src: '/images/homepage/enoturismo/section-01.webp',   alt: 'Sala de provas' },
]

const PASSEIOS_PARAS = [
  'Os passeios na mata da Casa de Nabais começam nas vinhas, entre folhas e uvas que em breve serão vinho. Numa manhã fresca ou tarde calma, atravessa-se a vinha até ao bosque, por trilhos suaves, ao som do Rio Lima e com o reconfortante cheiro de terra húmida. A flora nativa envolve o caminho e, por vezes, o casal de águias que ali nidifica, uma de muitas espécies da fauna local, sobrevoa em silêncio quem passa.',
  'Um percurso para abrandar, sentir o Minho autêntico e descobrir a harmonia natural que sustenta toda a quinta.',
]
const PASSEIOS_IMAGES = [
  { src: '/images/homepage/vinhas/carousel-04.webp', alt: 'Paisagem do Vale do Lima' },
  { src: '/images/homepage/vinhas/carousel-05.webp', alt: 'Vinhas ao entardecer' },
  { src: '/images/homepage/vinhas/carousel-06.webp', alt: 'Natureza na quinta' },
]

/* ─── 3-image row ───────────────────────────────────────────────── */
// Outer grid-cols-2 gap-4 mirrors the portrait+text block above exactly —
// the large image occupies the portrait column, the nested grid of 2 smalls
// occupies the text column. Column edges align pixel-perfectly.

function ThreeImages({
  images,
  largeSide,
}: {
  images: { src: string; alt: string }[]
  largeSide: 'left' | 'right'
}) {
  const ROW_H = 'clamp(260px, 28vw, 400px)'

  const largeImg = (
    <div
      className="relative overflow-hidden"
      style={{ borderRadius: '4px', backgroundColor: '#0A3A39', height: '100%' }}
    >
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 90vw, 50vw"
      />
    </div>
  )

  const smallsGrid = (
    <div className="grid grid-cols-2 gap-4" style={{ height: '100%' }}>
      {images.slice(1).map((img, i) => (
        <div
          key={i}
          className="relative overflow-hidden"
          style={{ borderRadius: '4px', backgroundColor: '#0A3A39', height: '100%' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 45vw, 25vw"
          />
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop: outer grid-cols-2 = same structure as portrait+text → perfect alignment */}
      <div className="hidden md:grid grid-cols-2 gap-4" style={{ height: ROW_H }}>
        {largeSide === 'left' ? (
          <>{largeImg}{smallsGrid}</>
        ) : (
          <>{smallsGrid}{largeImg}</>
        )}
      </div>

      {/* Mobile: large full-width + 2 smalls side by side */}
      <div className="md:hidden flex flex-col gap-4">
        <div
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: '3/2', borderRadius: '4px', backgroundColor: '#0A3A39' }}
        >
          <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1).map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{ aspectRatio: '1/1', borderRadius: '4px', backgroundColor: '#0A3A39' }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
            </div>
          ))}
        </div>
      </div>
    </>
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
  title: string
  paras: string[]
  portraitSrc: string
  portraitAlt: string
  images: { src: string; alt: string }[]
}) {
  const [index, setIndex] = useState(0)
  const dragStartX = useRef(0)
  const [grabbing, setGrabbing] = useState(false)
  const GAP = 12
  const canPrev = index > 0
  const canNext = index < images.length - 1

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
      {/* Portrait image with gradient + section title */}
      <div className="relative" style={{ height: '60vh' }}>
        <div className="absolute inset-0 overflow-hidden">
          <Image src={portraitSrc} alt={portraitAlt} fill className="object-cover" sizes="100vw" />
        </div>
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: '48%', bottom: '-2px', zIndex: 1,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(3,29,29,0.60) 30%, rgba(3,29,29,0.94) 58%, #031D1D 80%)',
          }}
        />
        <h2
          className="absolute left-0 right-0 text-center px-6 font-display uppercase"
          style={{
            bottom: '28px', zIndex: 2,
            fontSize: 'clamp(1.625rem, 6vw, 2.25rem)', lineHeight: 1.05, letterSpacing: '0.04em',
            color: '#FAE6C1', textShadow: '0 2px 28px rgba(3,29,29,0.95)',
          }}
        >
          {title}
        </h2>
      </div>

      {/* Body text + 3-image swipe carousel */}
      <div style={{ marginTop: '-2px', background: '#031D1D', paddingBottom: '32px' }}>
        <div className="px-6 pt-6 pb-6 text-center">
          {paras.map((para, i) => (
            <p
              key={i}
              className="font-body mb-4 last:mb-0"
              style={{ fontSize: 'clamp(0.9375rem, 4vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Swipe carousel */}
        <div
          className="mt-2 py-2 select-none"
          style={{ overflowX: 'clip', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => setGrabbing(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              gap: `${GAP}px`,
              paddingLeft: '16px',
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
        <div className="mt-4 flex items-center gap-5 justify-center">
          <button
            onClick={() => setIndex((i) => i - 1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canPrev ? 1 : 0.25 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
          <span className="font-display text-[10px] uppercase tracking-[0.16em]" style={{ color: 'rgba(250,230,193,0.55)' }}>
            {index + 1} de {images.length}
          </span>
          <button
            onClick={() => setIndex((i) => i + 1)}
            disabled={!canNext}
            aria-label="Seguinte"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canNext ? 1 : 0.25 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function EnoturismoPage() {
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
          yPercent: 20, ease: 'none',
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

        {/* ── MOBILE HERO ── */}
        <div ref={mobileHeroRef} className="relative lg:hidden" style={{ height: 'calc(100svh - 72px)' }}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              ref={mobileHeroImgRef}
              className="absolute will-change-transform"
              style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
            >
              <Image
                src="/images/homepage/enoturismo/section-01.webp"
                alt="O Enoturismo — Casa de Nabais"
                fill priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, transparent 22%, rgba(3,29,29,0.25) 40%, rgba(3,29,29,0.82) 58%, rgba(3,29,29,0.97) 72%, #031D1D 84%)',
              zIndex: 1,
            }}
          />

          <Link
            href="/"
            className="absolute top-8 left-6 inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-50"
            style={{ zIndex: 10, fontFamily: 'var(--font-display), serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,230,193,0.80)' }}
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            Voltar
          </Link>

          <div className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-center text-center" style={{ zIndex: 2 }}>
            <h1
              className="font-display uppercase mb-7"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.05em', color: '#FAE6C1', textShadow: '0 2px 28px rgba(3,29,29,0.95)' }}
            >
              Enoturismo
            </h1>
            <p
              className="font-body mb-8 w-full"
              style={{ fontSize: 'clamp(0.8125rem, 3.5vw, 0.9375rem)', lineHeight: 1.55, color: 'rgba(255,249,237,0.68)' }}
            >
              {INTRO_TEXT}
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="font-display uppercase" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(250,230,193,0.40)' }}>scroll</span>
              <ArrowDown size={13} strokeWidth={1.5} className="animate-bounce" style={{ color: 'rgba(250,230,193,0.40)' }} />
            </div>
          </div>
        </div>

        {/* ── VOLTAR + TÍTULO (desktop) ── */}
        <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-50"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,230,193,0.60)' }}
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            Voltar
          </Link>

          <h1
            className="font-display uppercase text-center mt-8 md:mt-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.0, letterSpacing: '0.05em', color: '#FAE6C1' }}
          >
            O Enoturismo
          </h1>
        </div>

        {/* INTRO — desktop */}
        <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
          <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
            <p
              className="font-body"
              style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', lineHeight: 1.5, color: 'rgba(255,249,237,0.72)' }}
            >
              {INTRO_TEXT}
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
                src="/images/homepage/enoturismo/section-01.webp"
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
          title="Provas de vinho"
          paras={PROVAS_PARAS}
          portraitSrc="/images/homepage/enoturismo/carousel-01.webp"
          portraitAlt="Prova de vinhos na adega"
          images={PROVAS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-01.webp"
              alt="Prova de vinhos na adega"
              containerRef={p1Ref}
              wrapRef={p1Wrap}
            />
            <TextColumn title="Provas de vinho" paras={PROVAS_PARAS} pad="right" />
          </div>
          <div className="mt-4">
            <ThreeImages images={PROVAS_IMAGES} largeSide="left" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            VISITAS GUIADAS
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title="Visitas guiadas"
          paras={VISITAS_PARAS}
          portraitSrc="/images/homepage/enoturismo/carousel-02.webp"
          portraitAlt="Visita guiada às vinhas"
          images={VISITAS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <TextColumn title="Visitas guiadas às vinhas e adega" paras={VISITAS_PARAS} pad="left" />
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-02.webp"
              alt="Visita guiada às vinhas"
              containerRef={p2Ref}
              wrapRef={p2Wrap}
            />
          </div>
          <div className="mt-4">
            <ThreeImages images={VISITAS_IMAGES} largeSide="right" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            ALMOÇOS E EXPERIÊNCIAS GASTRONÓMICAS
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title="Almoços & gastronomia"
          paras={ALMOCOS_PARAS}
          portraitSrc="/images/homepage/enoturismo/carousel-03.webp"
          portraitAlt="Almoço na quinta"
          images={ALMOCOS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-03.webp"
              alt="Almoço na quinta"
              containerRef={p3Ref}
              wrapRef={p3Wrap}
            />
            <TextColumn title="Almoços e experiências gastronómicas" paras={ALMOCOS_PARAS} pad="right" />
          </div>
          <div className="mt-4">
            <ThreeImages images={ALMOCOS_IMAGES} largeSide="left" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PASSEIOS NA MATA
        ══════════════════════════════════════════════════════ */}

        {/* Mobile */}
        <MobileSection
          title="Passeios na mata"
          paras={PASSEIOS_PARAS}
          portraitSrc="/images/homepage/enoturismo/carousel-04.webp"
          portraitAlt="Passeio na mata"
          images={PASSEIOS_IMAGES}
        />

        {/* Desktop */}
        <section className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 mt-4 pb-28">
          <div className="grid grid-cols-2 gap-4 items-center">
            <TextColumn title="Passeios na mata" paras={PASSEIOS_PARAS} pad="left" />
            <PortraitCell
              src="/images/homepage/enoturismo/carousel-04.webp"
              alt="Passeio na mata"
              containerRef={p4Ref}
              wrapRef={p4Wrap}
            />
          </div>
          <div className="mt-4">
            <ThreeImages images={PASSEIOS_IMAGES} largeSide="right" />
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
