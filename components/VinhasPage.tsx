'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowDown } from 'lucide-react'
import SectionExplore from './SectionExplore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const INTRO_TEXT =
  'Na Casa de Nabais, as vinhas começam muito antes de chegarem à garrafa. Tudo começa no subsolo granítico, atravessado por um raro veio de xisto. Seguimos uma leitura profunda do território — sem rigidez, mas com sabedoria e perspectiva de longo prazo. Como produtores atentos, acompanhamos todo o processo — da terra à garrafa — com foco no equilíbrio e na qualidade.'

const CLOSING_QUOTE =
  'Trabalhamos o solo como um ecossistema vivo, onde sustentabilidade ambiental e qualidade caminham juntas.'

export default function VinhasPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const mobileHeroRef = useRef<HTMLDivElement>(null)
  const mobileHeroImgRef = useRef<HTMLDivElement>(null)
  const panoramicContainerRef = useRef<HTMLDivElement>(null)
  const panoramicImgRef = useRef<HTMLDivElement>(null)
  const editorialRef = useRef<HTMLElement>(null)
  const vinhasSecRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      if (mobileHeroImgRef.current && mobileHeroRef.current && window.innerWidth < 1024) {
        gsap.to(mobileHeroImgRef.current, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: mobileHeroRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      if (panoramicImgRef.current && panoramicContainerRef.current) {
        gsap.to(panoramicImgRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: panoramicContainerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      gsap.from('.reveal-vinhas', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: editorialRef.current, start: 'top 75%' },
      })

      gsap.utils.toArray<HTMLElement>('.reveal-vinhas-block').forEach((el) => {
        gsap.from(el, {
          y: 25, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      gsap.from('.reveal-vinhas-sec', {
        y: 25, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: vinhasSecRef.current, start: 'top 75%' },
      })

      gsap.utils.toArray<HTMLElement>('.reveal-vinha-row').forEach((el) => {
        gsap.from(el.querySelectorAll('.reveal-vinha-item'), {
          y: 20, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ══════════════════════════════════════
          MOBILE HERO
      ══════════════════════════════════════ */}
      <div ref={mobileHeroRef} className="relative lg:hidden" style={{ height: 'calc(100svh - 72px)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={mobileHeroImgRef}
            className="absolute will-change-transform"
            style={{ top: '-40%', bottom: '-40%', left: 0, right: 0 }}
          >
            <Image
              src="/images/homepage/vinhas/section-01.webp"
              alt="As Vinhas da Casa de Nabais"
              fill
              priority
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
          style={{
            zIndex: 10,
            fontFamily: 'var(--font-display), serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(250,230,193,0.80)',
          }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Voltar
        </Link>

        <div
          className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-center text-center"
          style={{ zIndex: 2 }}
        >
          <h1
            className="font-display uppercase mb-7"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.05em',
              color: '#FAE6C1',
              textShadow: '0 2px 28px rgba(3,29,29,0.95)',
            }}
          >
            As Vinhas
          </h1>

          <p
            className="font-body mb-8 w-full"
            style={{
              fontSize: 'clamp(0.8125rem, 3.5vw, 0.9375rem)',
              lineHeight: 1.55,
              color: 'rgba(255,249,237,0.68)',
            }}
          >
            Na Casa de Nabais, as vinhas começam muito antes de chegarem à garrafa. Tudo começa no solo.
          </p>

          <div className="flex flex-col items-center gap-2">
            <span
              className="font-display uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(250,230,193,0.40)' }}
            >
              scroll
            </span>
            <ArrowDown
              size={13}
              strokeWidth={1.5}
              className="animate-bounce"
              style={{ color: 'rgba(250,230,193,0.40)' }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — VOLTAR + TÍTULO
      ══════════════════════════════════════ */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-50"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#3A5B4F',
          }}
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Voltar
        </Link>

        <h1
          className="font-display uppercase text-center mt-8 md:mt-10"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1.0,
            letterSpacing: '0.05em',
            color: '#0C4544',
          }}
        >
          As Vinhas
        </h1>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — INTRO
      ══════════════════════════════════════ */}
      <section className="hidden lg:block pt-12 md:pt-14 pb-14 md:pb-20">
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
              lineHeight: 1.35,
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            {INTRO_TEXT}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DESKTOP — PANORAMIC IMAGE
      ══════════════════════════════════════ */}
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
              src="/images/homepage/vinhas/section-01.webp"
              alt="Vinhas da Casa de Nabais — vista panorâmica"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECÇÃO EDITORIAL
      ══════════════════════════════════════ */}
      <section ref={editorialRef} className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 space-y-24 md:space-y-32">

          {/* Bloco A — O solo como origem: texto esq, mosaico dir */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal-vinhas flex flex-col justify-center order-2 lg:order-1">
              <h2
                className="font-display mb-5"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  color: 'var(--color-text)',
                }}
              >
                O solo como origem
              </h2>
              <p
                className="font-body text-cn-text-muted"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
              >
                Para nós, tudo começa no solo. O substrato granítico interrompido por um raro veio de xisto cria condições únicas de drenagem, estrutura e temperatura que se revelam directamente nos vinhos. Trabalhamos activamente com a geologia da quinta, mapeando variações de solo e adaptando a condução da vinha a cada parcela, sempre com o objectivo de expressar o lugar com fidelidade e precisão.
              </p>
            </div>

            {/* Mosaico: 2 retratos empilhados + 1 retrato maior */}
            <div className="reveal-vinhas order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-2" style={{ height: '480px' }}>
                <div className="grid grid-rows-2 gap-2">
                  <div
                    className="relative overflow-hidden"
                    style={{ borderRadius: '4px', backgroundColor: '#3A5B4F' }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-01.webp"
                      alt="Solo da vinha"
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                  <div
                    className="relative overflow-hidden"
                    style={{ borderRadius: '4px', backgroundColor: '#3A5B4F' }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-02.webp"
                      alt="Trabalho na vinha"
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                </div>
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: '4px', backgroundColor: '#3A5B4F' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-03.webp"
                    alt="Paisagem da vinha"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bloco B — Vinhas como campo de estudo: imagem esq, texto dir */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div
              className="reveal-vinhas-block relative overflow-hidden"
              style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
            >
              <Image
                src="/images/homepage/vinhas/carousel-04.webp"
                alt="Vinhas como campo de estudo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
            <div className="reveal-vinhas-block flex flex-col justify-center">
              <h2
                className="font-display mb-5"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  color: 'var(--color-text)',
                }}
              >
                Vinhas como campo de estudo
              </h2>
              <p
                className="font-body text-cn-text-muted"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
              >
                As nossas vinhas são laboratórios a céu aberto. Registamos dados de fenologia, analisamos microclimas por parcela e testamos técnicas de viticultura mínima em harmonia com a biodiversidade local. Cada decisão tomada na vinha — quando intervir, como conduzir, quando colher — resulta de anos de observação cuidadosa e de uma convicção crescente de que, neste terroir, o melhor vinho nasce da escuta.
              </p>
            </div>
          </div>

          {/* Bloco C — Viticultura integrada: mosaico esq, texto dir */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal-vinhas-block order-2 lg:order-1">
              <div className="grid grid-rows-2 gap-2" style={{ height: '420px' }}>
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: '4px', backgroundColor: '#3A5B4F' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-05.webp"
                    alt="Viticultura integrada"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 50vw"
                  />
                </div>
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: '4px', backgroundColor: '#3A5B4F' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-06.webp"
                    alt="Biodiversidade nas vinhas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 50vw"
                  />
                </div>
              </div>
            </div>
            <div className="reveal-vinhas-block flex flex-col justify-center order-1 lg:order-2">
              <h2
                className="font-display mb-5"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  color: 'var(--color-text)',
                }}
              >
                Viticultura integrada
              </h2>
              <p
                className="font-body text-cn-text-muted"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65 }}
              >
                Seguimos os princípios da viticultura integrada: eliminação de pesticidas de síntese, promoção da biodiversidade, gestão responsável da água e das coberturas vegetais. Não se trata de seguir uma moda — é uma escolha sustentada por resultados. As vinhas mais equilibradas, com maior resistência a doenças e melhor expressão aromática, são invariavelmente as que tratamos com menor intervenção química e maior respeito pelos seus ritmos naturais.
              </p>
            </div>
          </div>

        </div>

        {/* Frase de fecho */}
        <div className="max-w-[860px] mx-auto px-6 md:px-10 text-center mt-24 md:mt-32">
          <p
            className="font-body italic"
            style={{
              fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
              lineHeight: 1.55,
              color: 'var(--color-text-muted)',
            }}
          >
            {CLOSING_QUOTE}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AS NOSSAS VINHAS
      ══════════════════════════════════════ */}
      <section
        ref={vinhasSecRef}
        style={{ background: 'linear-gradient(to bottom, #0C4544, #031D1D)' }}
        className="py-20 md:py-28"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <h2
            className="reveal-vinhas-sec font-display uppercase text-center mb-16 md:mb-20"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.0,
              letterSpacing: '0.04em',
              color: '#FAE6C1',
            }}
          >
            As Nossas Vinhas
          </h2>

          <div
            className="divide-y"
            style={{ borderColor: 'rgba(250,230,193,0.12)' }}
          >

            {/* Vinha do Pomar — texto esq, imagem dir */}
            <div className="reveal-vinha-row grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 py-16 md:py-20">
              <div className="reveal-vinha-item flex flex-col justify-center order-2 lg:order-1 lg:pr-16">
                <span
                  className="font-display uppercase mb-4 block"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha do Pomar
                </span>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  Situada junto ao pomar histórico da quinta, esta vinha de Loureiro beneficia de um microclima particular, com maior amplitude térmica diurna e solos graníticos de boa estrutura. Dá origem ao nosso Loureiro de referência — fresco, floral e de grande persistência aromática.
                </p>
              </div>
              <div
                className="reveal-vinha-item relative overflow-hidden order-1 lg:order-2"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#0A3A39' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-01.webp"
                  alt="Vinha do Pomar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
            </div>

            {/* Vinha da Adega — imagem esq, texto dir */}
            <div className="reveal-vinha-row grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 py-16 md:py-20">
              <div
                className="reveal-vinha-item relative overflow-hidden"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#0A3A39' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-02.webp"
                  alt="Vinha da Adega"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
              <div className="reveal-vinha-item flex flex-col justify-center lg:pl-16">
                <span
                  className="font-display uppercase mb-4 block"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha da Adega
                </span>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  A vinha mais próxima da adega, plantada em socalcos antigos com exposição poente. Os solos são mais argilosos nesta parcela, conferindo ao vinho maior peso em boca e uma textura diferenciada. Um terroir que se distingue pela densidade e pelo carácter mineral do xisto que aflora em algumas zonas.
                </p>
                <p
                  className="font-body mt-3"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.48)' }}
                >
                  A sua proximidade com a adega permite-nos acompanhar de perto a evolução das uvas ao longo da maturação, colhendo em múltiplas passagens quando a condição sanitária o permite.
                </p>
              </div>
            </div>

            {/* Vinha da Sorteia — texto esq, imagem dir */}
            <div className="reveal-vinha-row grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 py-16 md:py-20">
              <div className="reveal-vinha-item flex flex-col justify-center order-2 lg:order-1 lg:pr-16">
                <span
                  className="font-display uppercase mb-4 block"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha da Sorteia
                </span>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  A vinha da Sorteia tira o nome de um campo histórico da quinta. Plantada em granito degradado e com cepas de maior idade, é a parcela que consideramos mais expressiva do terroir de Nabais. Os vinhos aqui produzidos têm um carácter mais seco e tenso, com acidez vibrante e um perfil mineral que os distingue no conjunto.
                </p>
              </div>
              <div
                className="reveal-vinha-item relative overflow-hidden order-1 lg:order-2"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#0A3A39' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-04.webp"
                  alt="Vinha da Sorteia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
            </div>

            {/* Vinha Talhão de Xisto — imagem esq, texto dir */}
            <div className="reveal-vinha-row grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 py-16 md:py-20">
              <div
                className="reveal-vinha-item relative overflow-hidden"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#0A3A39' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-05.webp"
                  alt="Vinha Talhão de Xisto"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
              <div className="reveal-vinha-item flex flex-col justify-center lg:pl-16">
                <span
                  className="font-display uppercase mb-4 block"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha Talhão de Xisto
                </span>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  Num raro talhão onde o granito cede lugar ao xisto, esta vinha produz uvas de intensidade singular. O xisto retém calor durante o dia e irradia-o lentamente à noite, promovendo uma maturação mais lenta e complexa. Os vinhos do Talhão de Xisto têm estrutura, profundidade e uma salinidade característica que os torna únicos no contexto da Casa de Nabais.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SectionExplore excludeHref="/as-vinhas" />

    </div>
  )
}
