'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import TextReveal from './TextReveal'
import ImageLightbox from './ImageLightbox'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suíte principal' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Mesa de refeições' },
  { src: '/images/homepage/casa/carousel-08.webp', alt: 'Vista da varanda' },
]

const spaces = [
  {
    img: '/images/homepage/casa/carousel-03.webp',
    title: 'As Suítes',
    desc: 'Cinco suítes e um apartamento, cada um com carácter próprio. Pedra, madeira e linho — materiais que o tempo conhece.',
  },
  {
    img: '/images/homepage/casa/carousel-06.webp',
    title: 'A Mesa',
    desc: 'Uma cozinha enraizada na tradição minhota, com produtos da própria quinta, maridados com os nossos vinhos.',
  },
  {
    img: '/images/homepage/casa/carousel-04.webp',
    title: 'A Piscina & Spa',
    desc: 'Para que o corpo descanse ao mesmo ritmo que a mente. Um espaço de quietude rodeado por vinha e jardim.',
  },
]

const IMG_RATIO = '4/5'
const SLIDE_GAP = 12
const MOBILE_LEFT = 16
const MOBILE_PEEK = 40

export default function CasaPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // Hero
  const heroRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroLinesRef = useRef<HTMLSpanElement[]>([])
  const heroSubRef = useRef<HTMLParagraphElement>(null)

  // Intro portrait
  const portraitContainerRef = useRef<HTMLDivElement>(null)
  const portraitImgRef = useRef<HTMLDivElement>(null)

  // Gallery carousel
  const galleryContainerRef = useRef<HTMLDivElement>(null)
  const [carouselLeft, setCarouselLeft] = useState('40px')
  const [slideWidth, setSlideWidth] = useState(380)
  const [index, setIndex] = useState(0)
  const [grabbing, setGrabbing] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)

  const canPrev = index > 0
  const canNext = index < galleryImages.length - 1

  function prev() { if (canPrev) setIndex(i => i - 1) }
  function next() { if (canNext) setIndex(i => i + 1) }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) < 8) {
      const el = document.elementFromPoint(dragStartX.current, dragStartY.current)
      const slide = el?.closest('[data-slide-index]') as HTMLElement | null
      if (slide?.dataset.slideIndex !== undefined) setLightboxIndex(Number(slide.dataset.slideIndex))
      return
    }
    if (diff > 50 && canNext) next()
    else if (diff < -50 && canPrev) prev()
  }

  useIsomorphicLayoutEffect(() => {
    function measure() {
      const isLg = window.innerWidth >= 1024
      if (isLg && galleryContainerRef.current) {
        const rect = galleryContainerRef.current.getBoundingClientRect()
        setCarouselLeft(`${rect.left}px`)
        setSlideWidth(Math.round(window.innerWidth * 0.38))
      } else {
        setCarouselLeft(`${MOBILE_LEFT}px`)
        setSlideWidth(Math.round(window.innerWidth - MOBILE_LEFT - SLIDE_GAP - MOBILE_PEEK))
      }
    }
    measure()
    window.addEventListener('resize', measure)

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([...heroLinesRef.current, heroSubRef.current], { opacity: 1, y: 0 })
        return
      }

      // Hero parallax + ken burns
      gsap.to(heroImgRef.current, { scale: 1.06, duration: 8, ease: 'none' })
      gsap.to(heroImgRef.current, {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
      gsap.to(heroContentRef.current, {
        yPercent: -18, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '55% top', scrub: 1.5 },
      })

      // Hero text entrance
      gsap.timeline({ delay: 0.2 })
        .from(heroLinesRef.current, { y: 40, opacity: 0, stagger: 0.08, duration: 1.0, ease: 'power2.out' })
        .from(heroSubRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')

      // Portrait parallax (desktop)
      if (portraitImgRef.current && portraitContainerRef.current && window.innerWidth >= 1024) {
        gsap.to(portraitImgRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: {
            trigger: portraitContainerRef.current,
            start: 'top bottom', end: 'bottom top', scrub: 1,
          },
        })
      }

      // Scroll reveals
      gsap.from('.casa-reveal-intro', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.casa-intro-section', start: 'top 75%' },
      })
      gsap.from('.casa-reveal-gallery', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.casa-gallery-section', start: 'top 75%' },
      })
      gsap.from('.casa-reveal-space', {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.casa-spaces-section', start: 'top 75%' },
      })
      gsap.from('.casa-reveal-cta', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.casa-cta-section', start: 'top 75%' },
      })
    }, pageRef)

    return () => { ctx.revert(); window.removeEventListener('resize', measure) }
  }, [])

  function CarouselStrip() {
    return (
      <div
        className="py-2 select-none"
        style={{ overflowX: 'clip', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setGrabbing(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            gap: `${SLIDE_GAP}px`,
            paddingLeft: carouselLeft,
            transform: `translateX(calc(-${index} * (${slideWidth}px + ${SLIDE_GAP}px)))`,
          }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              data-slide-index={i}
              style={{
                width: `${slideWidth}px`,
                aspectRatio: IMG_RATIO,
                backgroundColor: '#0A3A39',
                borderRadius: '4px',
                boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
                cursor: grabbing ? 'grabbing' : 'zoom-in',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          ref={heroImgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src="/images/homepage/casa/section-01.webp"
            alt="Fachada da Casa de Nabais"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(3,29,29,0.10) 0%, rgba(3,29,29,0.32) 60%, rgba(3,29,29,0.18) 100%)',
          }}
        />

        {/* Gradient transition to cream */}
        <div
          className="absolute left-0 right-0 z-10"
          style={{
            bottom: '-2px',
            height: '40%',
            background: 'linear-gradient(to bottom, transparent 0%, #FFF9ED 100%)',
          }}
        />

        <div
          ref={heroContentRef}
          className="relative z-20 w-full max-w-[1100px] mx-auto px-6 md:px-10 text-center"
        >
          <h1
            className="font-display uppercase mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(1.5rem, 5.5vw, 3.5rem)',
              letterSpacing: '0.04em',
              lineHeight: 1.0,
              color: '#FAE6C1',
              textShadow: '0 4px 32px rgba(0,0,0,0.40)',
            }}
          >
            {['A CASA', 'DE NABAIS'].map((line, i) => (
              <span
                key={i}
                ref={el => { if (el) heroLinesRef.current[i] = el }}
                className="block"
              >
                {line}
              </span>
            ))}
          </h1>
          <p
            ref={heroSubRef}
            className="font-body italic"
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'rgba(250,230,193,0.80)',
              letterSpacing: '0.01em',
            }}
          >
            Solar minhoto no Vale do Lima
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTRO — história e retrato
      ══════════════════════════════════════ */}
      <div
        className="casa-intro-section"
        style={{ background: 'linear-gradient(180deg, #FFF9ED 0%, #FFF3DE 100%)' }}
      >
        {/* TextReveal centrado */}
        <div className="max-w-[900px] mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24 text-center">
          <TextReveal
            text="Um solar minhoto com séculos de história, recuperado com respeito pela memória e pelo lugar. Pedra, madeira e luz natural a moldar espaços onde o tempo passa de outra forma."
            className="font-display"
            style={{
              fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)',
              lineHeight: 1.1,
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
            ghostOpacity={0.12}
          />
        </div>

        {/* Retrato + texto histórico */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Retrato com parallax */}
            <div
              ref={portraitContainerRef}
              className="casa-reveal-intro relative overflow-hidden"
              style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
            >
              <div
                ref={portraitImgRef}
                className="absolute will-change-transform"
                style={{ top: '-20%', bottom: '-20%', left: 0, right: 0 }}
              >
                <Image
                  src="/images/homepage/casa/carousel-01.webp"
                  alt="Hall de entrada da Casa de Nabais"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="flex flex-col justify-center">
              <p
                className="casa-reveal-intro font-display uppercase tracking-[0.12em] text-[11px] mb-6"
                style={{ color: 'rgba(3,29,29,0.45)' }}
              >
                A História
              </p>
              <h2
                className="casa-reveal-intro font-display uppercase mb-8"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  lineHeight: 1.05,
                  letterSpacing: '0.04em',
                  color: '#031D1D',
                }}
              >
                Séculos<br />de memória,<br />um novo capítulo
              </h2>
              <p
                className="casa-reveal-intro font-body mb-6"
                style={{
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                  lineHeight: 1.65,
                  color: '#3A5B4F',
                }}
              >
                A Casa de Nabais é um solar minhoto com raízes profundas no Vale do Lima. Restaurada com rigor e sensibilidade, mantém a nobreza da arquitectura original — os arcos de granito, as madeiras nobres, o jardim histórico — ao mesmo tempo que acolhe com toda a comodidade contemporânea.
              </p>
              <p
                className="casa-reveal-intro font-body mb-10"
                style={{
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                  lineHeight: 1.65,
                  color: '#3A5B4F',
                }}
              >
                Cinco suítes, um apartamento, piscina, spa e uma mesa servida com os frutos da própria quinta. Um lugar para ficar, não para passar.
              </p>
              <Link
                href="/ficar-na-casa"
                className="casa-reveal-intro inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-5 py-3 w-fit transition-colors duration-200"
                style={{ color: '#031D1D', border: '1px solid rgba(3,29,29,0.35)', borderRadius: '8px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(3,29,29,0.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
              >
                Ficar na Casa <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          GALERIA
      ══════════════════════════════════════ */}
      <section
        className="casa-gallery-section"
        style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 50%, #031D1D 100%)' }}
      >
        <div
          ref={galleryContainerRef}
          className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10 md:pb-14"
        >
          <p
            className="casa-reveal-gallery font-display uppercase tracking-[0.12em] text-[11px] mb-5"
            style={{ color: 'rgba(250,230,193,0.45)' }}
          >
            Galeria
          </p>
          <h2
            className="casa-reveal-gallery font-display uppercase"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            Um olhar<br />por dentro
          </h2>
        </div>

        <CarouselStrip />

        <div
          className="mt-5 pb-20 md:pb-28 flex items-center gap-5"
          style={{ paddingLeft: carouselLeft }}
        >
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Anterior"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canPrev ? 1 : 0.25 }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
          <span
            className="font-display text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'rgba(250,230,193,0.55)' }}
          >
            {index + 1} de {galleryImages.length}
          </span>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Seguinte"
            className="p-1 transition-opacity duration-200"
            style={{ opacity: canNext ? 1 : 0.25 }}
          >
            <ArrowRight size={15} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OS ESPAÇOS
      ══════════════════════════════════════ */}
      <div
        className="casa-spaces-section"
        style={{ background: 'linear-gradient(180deg, #FFF9ED 0%, #FFF3DE 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-32">

          <div className="mb-12 md:mb-16">
            <p
              className="casa-reveal-space font-display uppercase tracking-[0.12em] text-[11px] mb-5"
              style={{ color: 'rgba(3,29,29,0.45)' }}
            >
              O que oferecemos
            </p>
            <h2
              className="casa-reveal-space font-display uppercase"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                lineHeight: 1.05,
                letterSpacing: '0.04em',
                color: '#031D1D',
              }}
            >
              Os espaços
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {spaces.map((space, i) => (
              <div key={i} className="casa-reveal-space flex flex-col">
                <div
                  className="relative overflow-hidden mb-6"
                  style={{ aspectRatio: IMG_RATIO, backgroundColor: '#0A3A39', borderRadius: '4px' }}
                >
                  <Image
                    src={space.img}
                    alt={space.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3
                  className="font-display uppercase mb-3"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.4vw, 1.125rem)',
                    letterSpacing: '0.1em',
                    color: '#031D1D',
                  }}
                >
                  {space.title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#3A5B4F' }}
                >
                  {space.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          CTA — Ficar na Casa
      ══════════════════════════════════════ */}
      <section
        className="casa-cta-section"
        style={{
          background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 49%, #082D2C 100%)',
        }}
      >
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-28 md:py-40 text-center">
          <p
            className="casa-reveal-cta font-display uppercase tracking-[0.12em] text-[11px] mb-8"
            style={{ color: 'rgba(250,230,193,0.45)' }}
          >
            Estadias
          </p>
          <h2
            className="casa-reveal-cta font-display uppercase mb-8"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            Ficar na Casa
          </h2>
          <p
            className="casa-reveal-cta font-body mb-12 mx-auto"
            style={{
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
              lineHeight: 1.65,
              color: 'rgba(255,249,237,0.65)',
              maxWidth: '520px',
            }}
          >
            Uma estadia na Casa de Nabais é uma experiência completa — o silêncio da vinha, o calor da pedra, o sabor da terra.
          </p>
          <Link
            href="/ficar-na-casa"
            className="casa-reveal-cta inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.16em] px-8 py-4 transition-colors duration-200"
            style={{ color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.40)', borderRadius: '8px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(250,230,193,0.10)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent' }}
          >
            Ver disponibilidade <ArrowRight size={11} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex(i => Math.min(galleryImages.length - 1, (i ?? 0) + 1))}
        />
      )}

    </div>
  )
}
