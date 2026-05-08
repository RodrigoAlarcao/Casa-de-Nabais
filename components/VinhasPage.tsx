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

      gsap.utils.toArray<HTMLElement>('.vinha-img-inner').forEach((inner) => {
        gsap.to(inner, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: inner.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })

      gsap.utils.toArray<HTMLElement>('.vinha-card-glass').forEach((card) => {
        gsap.from(card, {
          y: 35, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
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
      <section ref={editorialRef} className="pt-4 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          {/* Bloco A — O solo como origem */}
          <div className="reveal-vinhas">
            {/* Linha 1: imagem 1/3 + texto 2/3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-01.webp"
                  alt="Solo da vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 25vw"
                />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center lg:px-10">
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
                  Mais do que o tipo de rocha, interessa-nos como o solo gere a água, a nutrição e o equilíbrio. Solo granítico, solo de xisto e perfis mistos orientam a escolha de todos os elementos que, na vinha, nos levarão ao estilo de vinho que queremos construir.
                </p>
              </div>
            </div>
            {/* Linha 2: 3 imagens separadas por 16px, aspect ratios variados */}
            <div className="grid grid-cols-3 gap-4 mt-4 items-start">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-02.webp"
                  alt="Trabalho na vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-03.webp"
                  alt="Detalhe na vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '2/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-04.webp"
                  alt="Paisagem da vinha"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          </div>

          {/* Bloco B — Vinhas como campo de estudo: texto 2/3 esq, imagem 1/3 dir */}
          <div className="reveal-vinhas-block mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div className="lg:col-span-2 flex flex-col justify-center lg:px-14">
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
                  As vinhas são recentes, plantadas de raiz, e conduzidas como um laboratório vivo. Testamos diferentes sistemas de poda e condução das videiras, linha a linha, para compreender como influenciam o vigor, a sanidade e a expressão da casta Loureiro.
                </p>
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/5', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-04.webp"
                  alt="Vinhas como campo de estudo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Bloco C — Viticultura integrada: imagem 2/3 esq, texto 1/3 dir */}
          <div className="reveal-vinhas-block mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div
                className="relative overflow-hidden lg:col-span-2"
                style={{ aspectRatio: '4/3', borderRadius: '4px', backgroundColor: '#3A5B4F' }}
              >
                <Image
                  src="/images/homepage/vinhas/carousel-05.webp"
                  alt="Viticultura integrada"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 66vw"
                />
              </div>
              <div className="flex flex-col justify-center lg:pl-10">
                <h2
                  className="font-display mb-5"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                    lineHeight: 1.15,
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
                  Seguimos um regime de produção integrada, sem herbicidas, caminhando para práticas regenerativas. O enrelvamento da vinha com espécies autóctones controla infestantes, promove biodiversidade e ajuda a regular o vigor das plantas.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Frase de fecho */}
        <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center mt-24 md:mt-32 pb-4 md:pb-8">
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#0C4544',
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

          <div className="space-y-16 md:space-y-20">

            {/* Vinha do Pomar — card creme esq sobreposição, imagem dir */}
            <div className="reveal-vinha-row">

              {/* Desktop: layout de sobreposição */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                {/* Imagem — lado direito, largura total da altura */}
                <div
                  className="absolute inset-y-0 right-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-01.webp"
                      alt="Vinha do Pomar"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                {/* Card glassmorfismo — posicionado mais abaixo para efeito editorial */}
                <div
                  className="vinha-card-glass absolute left-0"
                  style={{
                    top: '40%',
                    width: '54%',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 249, 237, 0.72)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 249, 237, 0.30)',
                    padding: '44px 52px',
                    zIndex: 2,
                  }}
                >
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha do Pomar
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Com o clássico solo da região — terra preta, muita matéria orgânica e argila — apresenta um terreno fértil, com muito vigor, onde agimos para criar as melhores condições para a vinha.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Aqui o foco é reduzir a produção natural do solo para alcançar mais qualidade, complexidade e identidade no vinho feito a partir da casta Loureiro.
                  </p>
                </div>
              </div>

              {/* Mobile: empilhado */}
              <div className="lg:hidden">
                <div
                  className="relative overflow-hidden mb-6"
                  style={{ aspectRatio: '4/3', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-01.webp"
                    alt="Vinha do Pomar"
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                </div>
                <span
                  className="font-display uppercase block mb-4"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha do Pomar
                </span>
                <p
                  className="font-body mb-3"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  Com o clássico solo da região — terra preta, muita matéria orgânica e argila — apresenta um terreno fértil, com muito vigor, onde agimos para criar as melhores condições para a vinha.
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.55)' }}
                >
                  Aqui o foco é reduzir a produção natural do solo para alcançar mais qualidade, complexidade e identidade no vinho feito a partir da casta Loureiro.
                </p>
              </div>

            </div>

            {/* Vinha da Adega — imagem esq, card glassmorfismo dir */}
            <div className="reveal-vinha-row">

              {/* Desktop: layout de sobreposição */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-02.webp"
                      alt="Vinha da Adega"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute right-0"
                  style={{
                    top: '40%',
                    width: '54%',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 249, 237, 0.72)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 249, 237, 0.30)',
                    padding: '44px 52px',
                    zIndex: 2,
                  }}
                >
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha da Adega
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Situada numa zona ligeiramente mais elevada da Casa de Nabais, esta é uma vinha de solo muito pobre, pedregoso, com seixo rolado e quase nenhuma retenção de água.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Trata-se de uma parcela de menor produção, mas que entrega uvas mais concentradas, refletindo no vinho um caráter mais profundo e distinto da casta Loureiro que ali cresce.
                  </p>
                </div>
              </div>

              {/* Mobile: empilhado */}
              <div className="lg:hidden">
                <div
                  className="relative overflow-hidden mb-6"
                  style={{ aspectRatio: '4/3', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-02.webp"
                    alt="Vinha da Adega"
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                </div>
                <span
                  className="font-display uppercase block mb-4"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha da Adega
                </span>
                <p
                  className="font-body mb-3"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  Situada numa zona ligeiramente mais elevada da Casa de Nabais, esta é uma vinha de solo muito pobre, pedregoso, com seixo rolado e quase nenhuma retenção de água.
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.55)' }}
                >
                  Trata-se de uma parcela de menor produção, mas que entrega uvas mais concentradas, refletindo no vinho um caráter mais profundo e distinto da casta Loureiro que ali cresce.
                </p>
              </div>

            </div>

            {/* Vinha da Igreja — card glassmorfismo esq, imagem dir */}
            <div className="reveal-vinha-row">

              {/* Desktop: layout de sobreposição */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 right-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-04.webp"
                      alt="Vinha da Igreja"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute left-0"
                  style={{
                    top: '40%',
                    width: '54%',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 249, 237, 0.72)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 249, 237, 0.30)',
                    padding: '44px 52px',
                    zIndex: 2,
                  }}
                >
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha da Igreja
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Localizada na freguesia da Seara, a poucos quilómetros da Casa de Nabais, apresenta solo granítico com fertilidade e uma exposição solar durante praticamente todo o dia, graças à sua posição num ligeiro planalto.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Foi a escolhida para plantar as castas Alvarinho e Vinhão, explorando esta luz privilegiada para obter maturações mais completas num clima marcadamente atlântico.
                  </p>
                </div>
              </div>

              {/* Mobile: empilhado */}
              <div className="lg:hidden">
                <div
                  className="relative overflow-hidden mb-6"
                  style={{ aspectRatio: '4/3', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-04.webp"
                    alt="Vinha da Igreja"
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                </div>
                <span
                  className="font-display uppercase block mb-4"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha da Igreja
                </span>
                <p
                  className="font-body mb-3"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  Localizada na freguesia da Seara, a poucos quilómetros da Casa de Nabais, apresenta solo granítico com fertilidade e uma exposição solar durante praticamente todo o dia, graças à sua posição num ligeiro planalto.
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.55)' }}
                >
                  Foi a escolhida para plantar as castas Alvarinho e Vinhão, explorando esta luz privilegiada para obter maturações mais completas num clima marcadamente atlântico.
                </p>
              </div>

            </div>

            {/* Vinha Talhão de Xisto — imagem esq, card glassmorfismo dir */}
            <div className="reveal-vinha-row">

              {/* Desktop: layout de sobreposição */}
              <div className="hidden lg:block relative" style={{ minHeight: '700px' }}>
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: '62%', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <div
                    className="vinha-img-inner absolute will-change-transform"
                    style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}
                  >
                    <Image
                      src="/images/homepage/vinhas/carousel-05.webp"
                      alt="Vinha Talhão de Xisto"
                      fill
                      className="object-cover"
                      sizes="60vw"
                    />
                  </div>
                </div>
                <div
                  className="vinha-card-glass absolute right-0"
                  style={{
                    top: '40%',
                    width: '54%',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 249, 237, 0.72)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 249, 237, 0.30)',
                    padding: '44px 52px',
                    zIndex: 2,
                  }}
                >
                  <h3
                    className="font-display uppercase mb-6"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: '#0C4544',
                    }}
                  >
                    Vinha Talhão de Xisto
                  </h3>
                  <p
                    className="font-body mb-4"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Situada na freguesia da Feitosa, também na margem esquerda do Rio Lima, esta parcela singulariza-se pelo substrato xistoso que contrasta com o granito dominante na região.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#3A5B4F' }}
                  >
                    Aqui a vinha produz menos, as raízes vão a maior profundidade em busca de água e nutrição, e as uvas expressam uma concentração e mineralidade que se transferem directamente para o copo.
                  </p>
                </div>
              </div>

              {/* Mobile: empilhado */}
              <div className="lg:hidden">
                <div
                  className="relative overflow-hidden mb-6"
                  style={{ aspectRatio: '4/3', borderRadius: '6px', backgroundColor: '#0A3A39' }}
                >
                  <Image
                    src="/images/homepage/vinhas/carousel-05.webp"
                    alt="Vinha Talhão de Xisto"
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                </div>
                <span
                  className="font-display uppercase block mb-4"
                  style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(250,230,193,0.45)' }}
                >
                  Vinha Talhão de Xisto
                </span>
                <p
                  className="font-body mb-3"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.72)' }}
                >
                  Situada na freguesia da Feitosa, também na margem esquerda do Rio Lima, esta parcela singulariza-se pelo substrato xistoso que contrasta com o granito dominante na região.
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.65, color: 'rgba(255,249,237,0.55)' }}
                >
                  Aqui a vinha produz menos, as raízes vão a maior profundidade em busca de água e nutrição, e as uvas expressam uma concentração e mineralidade que se transferem directamente para o copo.
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
