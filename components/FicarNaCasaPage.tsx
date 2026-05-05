'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Bed, Users, Bath,
  ChevronLeft, ChevronRight,
  Check, Phone, ArrowRight, X,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────────────── */

const GRID_IMAGES = [
  { src: '/images/homepage/casa/section-01.webp',  alt: 'Casa de Nabais — fachada' },
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
]

const ALL_GALLERY = [
  { src: '/images/homepage/casa/section-01.webp',  alt: 'Casa de Nabais — fachada' },
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suíte principal' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Varanda exterior' },
  { src: '/images/homepage/casa/carousel-08.webp', alt: 'Vista da varanda' },
]

const AMENITIES_LEFT  = ['Lavandaria', 'Cozinha equipada', 'Piscina privada', 'Sauna', 'Spa', 'Pátio exterior']
const AMENITIES_RIGHT = ['Grelhador exterior', 'Bar', 'Wi-Fi', 'Parque automóvel', 'Portátil de bebé', 'Roupa de cama e toalhas']

const ACTIVITIES = [
  'Prova de vinhos guiada',
  'Visita à adega e vinhas',
  'Percursos pedestres pela propriedade',
  'Piscina privada com solário',
  'Gastronomia regional (pré-reservado)',
  'Golfe (pré-reservado)',
  'Aluguer de bicicletas (pré-reservado)',
]

const NEARBY = [
  { label: 'Ponte de Lima — centro', dist: '5 km' },
  { label: 'Museu dos Terceiros', dist: '6 km' },
  { label: 'Viana do Castelo', dist: '25 km' },
  { label: 'Braga (centro histórico)', dist: '35 km' },
  { label: 'Porto (centro)', dist: '85 km' },
  { label: 'Aeroporto do Porto', dist: '85 km' },
  { label: 'Santiago de Compostela', dist: '130 km' },
]

const WINES = [
  { label: 'Casa de Nabais', name: 'Vinha do Pomar', img: '/images/homepage/vinhos/vinha-do-pomar-context.webp', href: '/os-vinhos' },
  { label: 'Casa de Nabais', name: 'Loureiro',       img: '/images/homepage/vinhos/loureiro-context.webp',       href: '/os-vinhos' },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

/* ─── Component ────────────────────────────────────────────────── */

export default function FicarNaCasaPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  /* gallery lightbox */
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  /* mobile booking overlay */
  const [mobileOpen, setMobileOpen] = useState(false)

  /* form */
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    checkIn: '', checkOut: '', pessoas: '2', mensagem: '',
  })

  function setField(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')
    try {
      const url = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL
      if (!url) { setFormState('success'); return }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  /* scroll reveals */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      document.querySelectorAll('.reveal-section').forEach(section => {
        const items = section.querySelectorAll('.reveal-item')
        if (!items.length) return
        gsap.from(items, {
          y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 82%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Shared input style ─────────────────────────────────────── */
  const inputCls = [
    'w-full font-body text-[0.9375rem] text-cn-text',
    'bg-[#FFF9ED] border border-[rgba(3,29,29,0.18)] rounded-[6px]',
    'px-4 py-3 outline-none',
    'focus:border-cn-green transition-colors duration-200',
    'placeholder:text-cn-text-muted/50',
  ].join(' ')

  /* ── Booking form (called as function to avoid re-mount issues) ── */
  function renderBookingForm() {
    if (formState === 'success') {
      return (
        <div className="flex flex-col items-center text-center py-8 gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#0C4544' }}
          >
            <Check size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </div>
          <p className="font-body" style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
            Pedido enviado. Entraremos em contacto brevemente para confirmar a sua estadia.
          </p>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Check‑in</label>
            <input type="date" required value={form.checkIn} onChange={setField('checkIn')}
              min={new Date().toISOString().split('T')[0]} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Check‑out</label>
            <input type="date" required value={form.checkOut} onChange={setField('checkOut')}
              min={form.checkIn || new Date().toISOString().split('T')[0]} className={inputCls} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Hóspedes</label>
          <select value={form.pessoas} onChange={setField('pessoas')} className={inputCls} style={{ appearance: 'none' }}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>{i + 1} {i === 0 ? 'pessoa' : 'pessoas'}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Nome *</label>
          <input type="text" required placeholder="O seu nome" value={form.nome} onChange={setField('nome')} className={inputCls} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Email *</label>
          <input type="email" required placeholder="email@exemplo.pt" value={form.email} onChange={setField('email')} className={inputCls} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Telefone</label>
          <input type="tel" placeholder="+351 — opcional" value={form.telefone} onChange={setField('telefone')} className={inputCls} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-display uppercase tracking-[0.1em] text-cn-text-muted" style={{ fontSize: '10px' }}>Mensagem</label>
          <textarea rows={3} placeholder="Pedidos especiais, perguntas…" value={form.mensagem} onChange={setField('mensagem')} className={inputCls + ' resize-none'} />
        </div>

        <button
          type="submit"
          disabled={formState === 'loading'}
          className="w-full font-display uppercase tracking-[0.14em] text-[12px] py-4 rounded-[6px] transition-colors duration-200 mt-1"
          style={{ backgroundColor: '#0C4544', color: '#FAE6C1', opacity: formState === 'loading' ? 0.65 : 1 }}
        >
          {formState === 'loading' ? 'A enviar…' : 'Reservar'}
        </button>

        {formState === 'error' && (
          <p className="font-body text-center" style={{ fontSize: '0.875rem', color: '#8B2020' }}>
            Ocorreu um erro. Por favor tente novamente.
          </p>
        )}

        <div className="flex items-center justify-center gap-2 mt-1">
          <Phone size={12} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
          <span className="font-body" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Ou ligue-nos para{' '}
            <a href="tel:+351258000000" className="underline underline-offset-2 hover:text-cn-green transition-colors duration-200">
              +351 258 000 000
            </a>
          </span>
        </div>
      </form>
    )
  }

  /* ─────────────────────────────────────────────────────────────── */

  return (
    <div ref={pageRef}>

      {/* ══════════════════════════════════════════════════════
          HERO — fundo verde escuro, título + grid de fotos + intro
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 23%, #031D1D 100%)',
          paddingBottom: '80px',
        }}
      >
        {/* Título e localização */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-8 md:pb-10 text-center">
          <h1
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '0.06em',
              color: '#FAE6C1',
            }}
          >
            Ficar na Casa de Nabais
          </h1>

          <div className="flex items-center justify-center gap-2 mt-4">
            <MapPin size={14} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.65)' }} />
            <a
              href="https://maps.google.com/?q=Seara,Ponte+de+Lima"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body underline underline-offset-2 transition-opacity duration-200 hover:opacity-80"
              style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.65)' }}
            >
              Seara, Ponte de Lima
            </a>
          </div>
        </div>

        {/* Grid de fotos — full bleed */}
        <div className="w-full">

          {/* Desktop grid */}
          <div
            className="hidden md:grid relative"
            style={{
              gridTemplateColumns: '1.6fr 1fr 1fr',
              gridTemplateRows: '220px 220px',
              gap: '4px',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {/* Imagem grande — ocupa as 2 linhas */}
            <div
              className="relative cursor-pointer group"
              style={{ gridRow: '1 / 3' }}
              onClick={() => setLightboxIdx(0)}
            >
              <Image
                src={GRID_IMAGES[0].src}
                alt={GRID_IMAGES[0].alt}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1200px) 50vw, 600px"
              />
            </div>

            {/* 4 imagens menores */}
            {GRID_IMAGES.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => setLightboxIdx(i + 1)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1200px) 25vw, 300px"
                />
              </div>
            ))}

            {/* Botão "Ver todas as fotos" */}
            <button
              onClick={() => setLightboxIdx(0)}
              className="absolute bottom-4 right-4 font-display uppercase tracking-[0.12em] text-[11px] px-4 py-2 rounded-[4px] transition-all duration-200"
              style={{
                zIndex: 10,
                backgroundColor: 'rgba(255,249,237,0.15)',
                color: '#FAE6C1',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(250,230,193,0.30)',
              }}
            >
              Ver todas as fotos
            </button>
          </div>

          {/* Mobile: carrossel simples */}
          <MobileGallery images={ALL_GALLERY} onImageClick={setLightboxIdx} />
        </div>

        {/* Intro text + specs — ainda no fundo verde */}
        <div className="max-w-[820px] mx-auto px-6 md:px-10 mt-10 md:mt-14 text-center">
          <p
            className="font-body mb-3"
            style={{
              fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
              lineHeight: 1.45,
              color: 'rgba(255,249,237,0.80)',
            }}
          >
            Inteiramente recuperada, a Casa de Nabais dispõe de 5 suítes e 1 apartamento, confortáveis e silenciosos, integrados na paisagem e no ambiente agrícola que a rodeia. Com vistas abertas sobre a vinha e próximos da adega onde repousam os vinhos, os quartos oferecem o conforto da tecnologia atual sem perder o charme deste solar milenário com séculos de história.
          </p>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
              lineHeight: 1.45,
              color: 'rgba(255,249,237,0.80)',
            }}
          >
            Nos interiores, o encontro entre peças com história e uma modernidade discreta cria espaços de pausa e luz suave, pensados para estar e ficar. Dos pequenos-almoços com produtos da quinta à piscina e ao spa, tudo convida a abrandar — até o silêncio do vale, a vinha e a casa se tornam parte da experiência.
          </p>

          {/* Specs row */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8 md:mt-10 pt-8 md:pt-10"
            style={{ borderTop: '1px solid rgba(250,230,193,0.18)' }}
          >
            <div className="flex items-center gap-2.5">
              <Bed size={18} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.70)' }} />
              <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.70)' }}>
                5 suítes + 1 apartamento
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Users size={18} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.70)' }} />
              <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.70)' }}>
                12 pessoas
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Bath size={18} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.70)' }} />
              <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.70)' }}>
                7 casas de banho
              </span>
            </div>
          </div>
        </div>

        {/* ── Two-column content — ainda dentro do wrap verde ── */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 mt-14 md:mt-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20 items-start">

            {/* LEFT */}
            <div className="flex-1 min-w-0">

              {/* Preço mobile callout */}
              <div
                className="lg:hidden mb-8 p-5 rounded-[8px]"
                style={{ border: '1px solid rgba(250,230,193,0.18)', backgroundColor: 'rgba(250,230,193,0.06)' }}
              >
                <p className="font-display" style={{ fontSize: '0.8125rem', color: 'rgba(250,230,193,0.55)', marginBottom: '2px' }}>A partir de</p>
                <p className="font-display" style={{ fontSize: 'clamp(1.375rem, 4vw, 1.75rem)', color: '#FAE6C1', lineHeight: 1.1 }}>
                  €1.000 — €2.500
                  <span className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(250,230,193,0.60)', marginLeft: '4px' }}>/ noite</span>
                </p>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="mt-4 w-full font-display uppercase tracking-[0.14em] text-[12px] py-3.5 rounded-[6px]"
                  style={{ backgroundColor: 'rgba(250,230,193,0.14)', color: '#FAE6C1', border: '1px solid rgba(250,230,193,0.30)' }}
                >
                  Verificar disponibilidade
                </button>
              </div>

              {/* Comodidades */}
              <div className="reveal-section mb-10 md:mb-12">
                <h2
                  className="reveal-item font-display uppercase tracking-[0.08em] mb-6"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(250,230,193,0.85)' }}
                >
                  Comodidades
                </h2>
                <div className="reveal-item grid grid-cols-2 gap-x-8 gap-y-2.5">
                  {[...AMENITIES_LEFT, ...AMENITIES_RIGHT].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(250,230,193,0.10)' }}>
                        <Check size={10} strokeWidth={2.5} style={{ color: 'rgba(250,230,193,0.75)' }} />
                      </div>
                      <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atividades */}
              <div className="reveal-section mb-10 md:mb-12">
                <h2
                  className="reveal-item font-display uppercase tracking-[0.08em] mb-6"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(250,230,193,0.85)' }}
                >
                  Atividades e experiências
                </h2>
                <div className="reveal-item flex flex-col gap-2.5">
                  {ACTIVITIES.map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(250,230,193,0.10)' }}>
                        <Check size={10} strokeWidth={2.5} style={{ color: 'rgba(250,230,193,0.75)' }} />
                      </div>
                      <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="reveal-item font-body mt-5" style={{ fontSize: '0.875rem', color: 'rgba(255,249,237,0.45)' }}>
                  Saiba mais sobre actividades no Vale do Lima em{' '}
                  <a href="https://www.visitepontedelima.pt" target="_blank" rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-100">
                    visitepontedelima.pt
                  </a>
                </p>
              </div>

              {/* Turismo histórico */}
              <div className="reveal-section mb-10 md:mb-14">
                <h2
                  className="reveal-item font-display uppercase tracking-[0.08em] mb-2"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(250,230,193,0.85)' }}
                >
                  Turismo histórico e cultural
                </h2>
                <p className="reveal-item font-body mb-5" style={{ fontSize: '0.875rem', color: 'rgba(255,249,237,0.42)' }}>
                  A 10–15 minutos da Casa de Nabais
                </p>
                <div className="reveal-item flex flex-col" style={{ borderTop: '1px solid rgba(250,230,193,0.10)' }}>
                  {NEARBY.map(({ label, dist }) => (
                    <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(250,230,193,0.10)' }}>
                      <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>{label}</span>
                      <span className="font-display uppercase tracking-[0.1em]" style={{ fontSize: '11px', color: 'rgba(250,230,193,0.40)' }}>{dist}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Localização */}
              <div className="reveal-section">
                <h2
                  className="reveal-item font-display uppercase tracking-[0.08em] mb-6"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'rgba(250,230,193,0.85)' }}
                >
                  Localização
                </h2>
                <div
                  className="reveal-item relative w-full overflow-hidden rounded-[6px]"
                  style={{ aspectRatio: '16/9', backgroundColor: '#1A4E4D' }}
                >
                  <iframe
                    title="Localização da Casa de Nabais"
                    src="https://maps.google.com/maps?q=Seara,+Ponte+de+Lima,+Portugal&output=embed&z=13"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=Seara,Ponte+de+Lima,Portugal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal-item inline-flex items-center gap-1.5 mt-4 font-display uppercase tracking-[0.12em] transition-opacity duration-200 hover:opacity-70"
                  style={{ fontSize: '11px', color: 'rgba(250,230,193,0.50)' }}
                >
                  Ver no Google Maps
                  <ArrowRight size={10} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* RIGHT — sticky booking widget */}
            <div className="hidden lg:block w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
              <div
                className="sticky rounded-[10px] overflow-hidden"
                style={{
                  top: '90px',
                  backgroundColor: '#FFFDF5',
                  boxShadow: '0 0 0 1px rgba(250,230,193,0.18), 0 24px 48px rgba(3,13,13,0.40)',
                }}
              >
                <div className="px-6 pt-6 pb-5 border-b border-[rgba(3,29,29,0.08)]">
                  <p className="font-display" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>A partir de</p>
                  <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 2vw, 1.75rem)', color: 'var(--color-text)', lineHeight: 1.1 }}>
                    €1.000 — €2.500
                    <span className="font-body" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginLeft: '5px' }}>/ noite</span>
                  </p>
                  <p className="font-body mt-1.5" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', opacity: 0.65 }}>
                    Introduza as datas para verificar disponibilidade
                  </p>
                </div>
                <div className="px-6 py-5">
                  {renderBookingForm()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPRAR VINHOS
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-20 reveal-section"
        style={{ backgroundColor: '#0C4544' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2
            className="reveal-item font-display uppercase text-center tracking-[0.12em] mb-10 md:mb-12"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', color: '#FAE6C1' }}
          >
            Comprar Vinhos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[760px] mx-auto">
            {WINES.map(wine => (
              <div
                key={wine.name}
                className="reveal-item rounded-[8px] overflow-hidden border"
                style={{ borderColor: 'rgba(250,230,193,0.18)', backgroundColor: '#0A3A39' }}
              >
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image src={wine.img} alt={wine.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(5,38,37,0.55) 0%, transparent 50%)' }} />
                </div>
                <div className="px-5 py-4">
                  <p className="font-display uppercase tracking-[0.12em]"
                    style={{ fontSize: '10px', color: 'rgba(250,230,193,0.55)', marginBottom: '4px' }}>{wine.label}</p>
                  <p className="font-display uppercase tracking-[0.06em] mb-4"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#FAE6C1', lineHeight: 1.1 }}>{wine.name}</p>
                  <div className="flex items-center gap-3">
                    <Link href={wine.href}
                      className="font-display uppercase tracking-[0.12em] text-[11px] px-4 py-2.5 rounded-[6px] border transition-colors duration-200"
                      style={{ borderColor: 'rgba(250,230,193,0.40)', color: 'rgba(250,230,193,0.85)' }}>
                      Detalhes
                    </Link>
                    <button disabled title="Em breve"
                      className="font-display uppercase tracking-[0.12em] text-[11px] px-4 py-2.5 rounded-[6px] cursor-not-allowed"
                      style={{ backgroundColor: 'rgba(250,230,193,0.12)', color: 'rgba(250,230,193,0.35)' }}>
                      Comprar →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MOBILE OVERLAY — formulário de reserva
      ══════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[300] flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(3,29,29,0.10)]">
            <div>
              <p className="font-display" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>A partir de</p>
              <p className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-text)' }}>
                €1.000 — €2.500
                <span className="font-body" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}>/ noite</span>
              </p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(3,29,29,0.08)' }}
            >
              <X size={16} strokeWidth={1.5} style={{ color: 'var(--color-text)' }} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {renderBookingForm()}
          </div>
        </div>
      )}

      {/* Mobile sticky bottom bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] px-5 py-3.5 flex items-center justify-between border-t"
        style={{
          backgroundColor: 'rgba(255,249,237,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(3,29,29,0.10)',
        }}
      >
        <div>
          <p className="font-display" style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', lineHeight: 1.2 }}>A partir de</p>
          <p className="font-display" style={{ fontSize: '1.0625rem', color: 'var(--color-text)', lineHeight: 1.1 }}>
            €1.000 <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>/ noite</span>
          </p>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="font-display uppercase tracking-[0.14em] text-[11px] px-6 py-3 rounded-[6px]"
          style={{ backgroundColor: '#0C4544', color: '#FAE6C1' }}
        >
          Reservar
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════════════════ */}
      {lightboxIdx !== null && (
        <Lightbox
          images={ALL_GALLERY}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIdx(i => Math.min(ALL_GALLERY.length - 1, (i ?? 0) + 1))}
        />
      )}

    </div>
  )
}

/* ─── MobileGallery ─────────────────────────────────────────────── */

function MobileGallery({
  images,
  onImageClick,
}: {
  images: typeof ALL_GALLERY
  onImageClick: (i: number) => void
}) {
  const [idx, setIdx] = useState(0)
  const [grabbing, setGrabbing] = useState(false)
  const dragStartX = useRef(0)
  const canPrev = idx > 0
  const canNext = idx < images.length - 1

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerUp(e: React.PointerEvent) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) < 8) { onImageClick(idx); return }
    if (diff > 50 && canNext) setIdx(i => i + 1)
    else if (diff < -50 && canPrev) setIdx(i => i - 1)
  }

  return (
    <div className="md:hidden">
      <div
        className="relative overflow-hidden rounded-[6px]"
        style={{ aspectRatio: '4/3', cursor: grabbing ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setGrabbing(false)}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative flex-shrink-0 w-full h-full">
              <Image src={img.src} alt={img.alt} fill priority={i === 0} className="object-cover" sizes="100vw" draggable={false} />
            </div>
          ))}
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-3 right-4 font-display uppercase tracking-[0.12em] text-[11px]"
          style={{ color: 'rgba(255,249,237,0.80)' }}
        >
          {idx + 1}/{images.length}
        </div>

        {/* Arrows */}
        {canPrev && (
          <button onClick={e => { e.stopPropagation(); setIdx(i => i - 1) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,249,237,0.80)', backdropFilter: 'blur(8px)' }}>
            <ChevronLeft size={16} strokeWidth={1.5} style={{ color: '#031D1D' }} />
          </button>
        )}
        {canNext && (
          <button onClick={e => { e.stopPropagation(); setIdx(i => i + 1) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,249,237,0.80)', backdropFilter: 'blur(8px)' }}>
            <ChevronRight size={16} strokeWidth={1.5} style={{ color: '#031D1D' }} />
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Lightbox ──────────────────────────────────────────────────── */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof ALL_GALLERY
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(3,13,13,0.95)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-[90vw] max-h-[90vh]" style={{ aspectRatio: '4/3' }} onClick={e => e.stopPropagation()}>
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      <button onClick={onClose} aria-label="Fechar"
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}>
        <X size={18} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
      </button>

      {index > 0 && (
        <button onClick={onPrev} aria-label="Anterior"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}>
          <ChevronLeft size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      )}

      {index < images.length - 1 && (
        <button onClick={onNext} aria-label="Seguinte"
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}>
          <ChevronRight size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display uppercase tracking-[0.12em] text-[11px]"
        style={{ color: 'rgba(250,230,193,0.50)' }}>
        {index + 1} / {images.length}
      </div>
    </div>
  )
}
