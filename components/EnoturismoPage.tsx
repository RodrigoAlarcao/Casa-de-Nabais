'use client'

import { useRef } from 'react'
import Image from 'next/image'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

/* ─── Content ─────────────────────────────────────────────────── */

const SECTIONS = [
  {
    id: 'provas',
    title: 'Provas de vinho',
    body: [
      'Na Casa de Nabais, as provas de vinho são uma experiência multissensorial, conduzidas pelos próprios produtores. Cada copo conta a história de uma parcela específica — o solo granítico, o veio de xisto, a casta Loureiro — e de um processo de vinificação atento e cuidadoso.',
      'O Loureiro, com a sua frescura e elegância atlântica, é o fio condutor de todas as provas. Servimos os nossos vinhos com pão e azeite da região, harmonizando os sabores locais e revelando a identidade de cada lote e cuvée.',
    ],
    images: [
      { src: '/images/homepage/enoturismo/carousel-01.webp', alt: 'Prova de vinhos na adega' },
      { src: '/images/homepage/enoturismo/carousel-05.webp', alt: 'Copo de Loureiro' },
      { src: '/images/homepage/enoturismo/section-01.webp',  alt: 'Adega da Casa de Nabais' },
    ],
    textRight: true,
  },
  {
    id: 'visitas',
    title: 'Visitas guiadas às vinhas e adega',
    body: [
      'A visita começa nas vinhas — percorrendo as diferentes parcelas, compreendendo a influência dos solos e do microclima do Vale do Lima. Os nossos guias partilham o conhecimento acumulado ao longo de gerações, com uma perspectiva a longo prazo e respeito pela biodiversidade.',
      'Na adega, o percurso continua: desde a receção da uva até às cubas e barricas onde os vinhos repousam antes de chegarem à garrafa. Uma visita que liga a terra à mesa, com toda a honestidade e transparência de quem trabalha o produto que oferece.',
    ],
    images: [
      { src: '/images/homepage/enoturismo/carousel-02.webp', alt: 'Visita guiada às vinhas' },
      { src: '/images/homepage/vinhas/section-01.webp',      alt: 'Vinhas da Casa de Nabais' },
      { src: '/images/homepage/vinhas/carousel-02.webp',     alt: 'Percurso entre as vinhas' },
    ],
    textRight: false,
  },
  {
    id: 'almocos',
    title: 'Almoços e experiências gastronómicas',
    body: [
      'A gastronomia da Casa de Nabais nasce dos mesmos princípios que guiam os nossos vinhos: proximidade, sazonalidade e respeito pelo produto. A cozinha parte dos legumes da horta, dos enchidos locais e dos queijos artesanais para construir uma mesa que reflete a identidade da região.',
      'Almoços e experiências gastronómicas são vividos em espaços únicos: na adega em harmonia com os nossos vinhos, no jardim histórico sob as árvores centenárias, ou até mesmo na própria vinha durante a época das vindimas — tornando cada refeição uma memória de lugar e de tempo.',
    ],
    images: [
      { src: '/images/homepage/enoturismo/carousel-03.webp', alt: 'Mesa de petiscos locais' },
      { src: '/images/homepage/casa/carousel-02.webp',       alt: 'Sala de refeições' },
      { src: '/images/homepage/enoturismo/carousel-06.webp', alt: 'Pôr do sol no Vale do Lima' },
    ],
    textRight: true,
  },
  {
    id: 'passeios',
    title: 'Passeios na mata',
    body: [
      'Os percursos na mata da Casa de Nabais atravessam sobreiros, carvalhos e pinheiros centenários. Numa manhã tranquila, é possível ouvir o som do ribeiro e sentir a frescura das sombras com vista para as vinhas ao longe, enquanto os pássaros anunciam a mudança de estação.',
      'Os percursos são adequados a todos os níveis e podem ser feitos ao ritmo de cada visitante — a pé ou com orientação. Uma forma de desacelerar, de se reencontrar com a natureza e de perceber que o vinho começa muito antes da adega.',
    ],
    images: [
      { src: '/images/homepage/enoturismo/carousel-04.webp', alt: 'Passeio na mata' },
      { src: '/images/homepage/vinhas/carousel-04.webp',     alt: 'Paisagem do Vale do Lima' },
      { src: '/images/homepage/vinhas/carousel-06.webp',     alt: 'Natureza na quinta' },
    ],
    textRight: false,
  },
]

const HERO_IMAGES = [
  { src: '/images/homepage/enoturismo/carousel-01.webp', alt: 'Prova de vinho' },
  { src: '/images/homepage/enoturismo/carousel-02.webp', alt: 'Visita às vinhas' },
  { src: '/images/homepage/enoturismo/carousel-03.webp', alt: 'Mesa de petiscos' },
  { src: '/images/homepage/enoturismo/carousel-04.webp', alt: 'Passeio na quinta' },
]

/* ─── Mosaic ────────────────────────────────────────────────────── */

function Mosaic({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <>
      {/* Desktop mosaic: tall left + two right cells */}
      <div
        className="hidden md:grid gap-1 w-full"
        style={{
          gridTemplateColumns: '1.2fr 1fr',
          gridTemplateRows: '280px 180px',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ gridRow: '1 / 3', borderRadius: '4px', backgroundColor: '#0A3A39' }}
        >
          <div
            className="eno-img-inner absolute will-change-transform"
            style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
          >
            <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" sizes="30vw" />
          </div>
        </div>

        {images.slice(1).map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{ borderRadius: '4px', backgroundColor: '#0A3A39' }}
          >
            <div
              className="eno-img-inner absolute will-change-transform"
              style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="20vw" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: two images side by side */}
      <div
        className="grid md:hidden gap-1 w-full"
        style={{ gridTemplateColumns: '1fr 1fr', height: '220px' }}
      >
        {images.slice(0, 2).map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{ borderRadius: '4px', backgroundColor: '#0A3A39' }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
          </div>
        ))}
      </div>
    </>
  )
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function EnoturismoPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.utils.toArray<HTMLElement>('.reveal-eno-page').forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.eno-img-inner').forEach((inner) => {
        gsap.to(inner, {
          yPercent: -14, ease: 'none',
          scrollTrigger: {
            trigger: inner.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>

      {/* ══════════════════════════════════════════════
          Dark green gradient — hero + all 4 sections
      ══════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 30%, #052E2D 65%, #031D1D 100%)' }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: '80px', paddingBottom: '64px' }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">

            {/* Title + intro paragraph */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 mb-8 lg:mb-12">
              <h1
                className="reveal-eno-page font-display uppercase flex-shrink-0"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '0.06em',
                  color: '#FAE6C1',
                }}
              >
                O Enoturismo
              </h1>

              <p
                className="reveal-eno-page font-body"
                style={{
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                  lineHeight: 1.7,
                  color: 'rgba(255,249,237,0.72)',
                  maxWidth: '560px',
                }}
              >
                Na Casa de Nabais, o enoturismo no Vale do Lima vive-se de forma autêntica e feitenta. Entre o solar histórico, as vinhas, a adega e a mesa, cada experiência permite compreender o vinho desde a sua origem. Provas comentadas, visitas guiadas, gastronomia caseira e estadas em plena natureza revelam uma quinta onde o Loureiro, a terra e o tempo definem o ritmo.
              </p>
            </div>

            {/* Hero photo mosaic — desktop 3-col, mobile 2-col */}
            <div className="reveal-eno-page">

              {/* Desktop */}
              <div
                className="hidden md:grid gap-1"
                style={{
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gridTemplateRows: '320px 200px',
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ gridRow: '1 / 3', borderRadius: '4px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="eno-img-inner absolute will-change-transform"
                    style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/enoturismo/section-01.webp"
                      alt="Enoturismo na Casa de Nabais"
                      fill
                      className="object-cover"
                      sizes="40vw"
                      priority
                    />
                  </div>
                </div>

                {HERO_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden"
                    style={{ borderRadius: '4px', backgroundColor: '#0A3A39' }}
                  >
                    <div
                      className="eno-img-inner absolute will-change-transform"
                      style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="20vw"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: 2×2 grid */}
              <div
                className="grid md:hidden gap-1"
                style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 140px' }}
              >
                <div
                  className="relative overflow-hidden col-span-2"
                  style={{ borderRadius: '4px', backgroundColor: '#0A3A39' }}
                >
                  <Image
                    src="/images/homepage/enoturismo/section-01.webp"
                    alt="Enoturismo na Casa de Nabais"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
                {HERO_IMAGES.slice(0, 2).map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden"
                    style={{ borderRadius: '4px', backgroundColor: '#0A3A39' }}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── ACTIVITY SECTIONS ── */}
        {SECTIONS.map((sec) => (
          <section key={sec.id} style={{ paddingBottom: '80px' }}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
              <div
                className={`flex flex-col gap-10 lg:gap-16 lg:items-center ${
                  sec.textRight ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Images mosaic */}
                <div className="flex-1 min-w-0 reveal-eno-page">
                  <Mosaic images={sec.images} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 reveal-eno-page" style={{ maxWidth: '480px' }}>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.625rem)',
                      lineHeight: 1.1,
                      letterSpacing: '0.01em',
                      color: '#FAE6C1',
                      marginBottom: '20px',
                    }}
                  >
                    {sec.title}
                  </h2>

                  {sec.body.map((para, i) => (
                    <p
                      key={i}
                      className="font-body"
                      style={{
                        fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)',
                        lineHeight: 1.75,
                        color: 'rgba(255,249,237,0.72)',
                        marginBottom: i < sec.body.length - 1 ? '14px' : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

      </div>

      {/* ── EXPLORE TAMBÉM ── */}
      <SectionExplore excludeHref="/o-enoturismo" />

    </div>
  )
}
