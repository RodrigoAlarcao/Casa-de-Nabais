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
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────────────── */

const galleryImages = [
  { src: '/images/homepage/casa/section-01.webp',  alt: 'Casa de Nabais — exterior' },
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suíte principal' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Varanda exterior' },
  { src: '/images/homepage/casa/carousel-08.webp', alt: 'Vista da varanda' },
]

const AMENITIES_LEFT = [
  'Lavandaria',
  'Cozinha equipada',
  'Piscina privada',
  'Sauna',
  'Spa',
  'Pátio exterior',
]

const AMENITIES_RIGHT = [
  'Grelhador exterior',
  'Bar',
  'Wi-Fi',
  'Parque automóvel',
  'Portátil de bebé',
  'Roupa de cama e toalhas',
]

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
  {
    label: 'Casa de Nabais',
    name: 'Vinha do Pomar',
    img: '/images/homepage/vinhos/vinha-do-pomar-context.webp',
    href: '/os-vinhos',
  },
  {
    label: 'Casa de Nabais',
    name: 'Loureiro',
    img: '/images/homepage/vinhos/loureiro-context.webp',
    href: '/os-vinhos',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

/* ─── Component ────────────────────────────────────────────────── */

export default function FicarNaCasaPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  /* gallery */
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [grabbing, setGrabbing] = useState(false)
  const dragStartX = useRef(0)
  const canPrev = galleryIdx > 0
  const canNext = galleryIdx < galleryImages.length - 1

  function prevSlide() { if (canPrev) setGalleryIdx(i => i - 1) }
  function nextSlide() { if (canNext) setGalleryIdx(i => i + 1) }

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX
    setGrabbing(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerUp(e: React.PointerEvent) {
    setGrabbing(false)
    const diff = dragStartX.current - e.clientX
    if (diff > 50 && canNext) nextSlide()
    else if (diff < -50 && canPrev) prevSlide()
  }

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

      const sections = document.querySelectorAll('.reveal-section')
      sections.forEach(section => {
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

  /* ── shared input style ─────────────────────────────────────── */
  const inputCls = [
    'w-full font-body text-[0.9375rem] text-cn-text',
    'bg-[#FFF9ED] border border-[rgba(3,29,29,0.18)] rounded-[6px]',
    'px-4 py-3 outline-none',
    'focus:border-cn-green transition-colors duration-200',
    'placeholder:text-cn-text-muted/50',
  ].join(' ')

  /* ── BookingForm (called as a function, not as JSX component) ── */
  function renderBookingForm(compact?: boolean) {
    if (formState === 'success') {
      return (
        <div className="flex flex-col items-center text-center py-8 gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#0C4544' }}
          >
            <Check size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </div>
          <p
            className="font-body"
            style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}
          >
            Pedido enviado. Entraremos em contacto brevemente para confirmar a sua estadia.
          </p>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label
              className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
              style={{ fontSize: '10px' }}
            >
              Check‑in
            </label>
            <input
              type="date"
              required
              value={form.checkIn}
              onChange={setField('checkIn')}
              min={new Date().toISOString().split('T')[0]}
              className={inputCls}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
              style={{ fontSize: '10px' }}
            >
              Check‑out
            </label>
            <input
              type="date"
              required
              value={form.checkOut}
              onChange={setField('checkOut')}
              min={form.checkIn || new Date().toISOString().split('T')[0]}
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
            style={{ fontSize: '10px' }}
          >
            Hóspedes
          </label>
          <select
            value={form.pessoas}
            onChange={setField('pessoas')}
            className={inputCls}
            style={{ appearance: 'none' }}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1} {i === 0 ? 'pessoa' : 'pessoas'}
              </option>
            ))}
          </select>
        </div>

        {!compact && (
          <>
            <div className="flex flex-col gap-1">
              <label
                className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
                style={{ fontSize: '10px' }}
              >
                Nome *
              </label>
              <input
                type="text"
                required
                placeholder="O seu nome"
                value={form.nome}
                onChange={setField('nome')}
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
                style={{ fontSize: '10px' }}
              >
                Email *
              </label>
              <input
                type="email"
                required
                placeholder="email@exemplo.pt"
                value={form.email}
                onChange={setField('email')}
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
                style={{ fontSize: '10px' }}
              >
                Telefone
              </label>
              <input
                type="tel"
                placeholder="+351 — opcional"
                value={form.telefone}
                onChange={setField('telefone')}
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-display uppercase tracking-[0.1em] text-cn-text-muted"
                style={{ fontSize: '10px' }}
              >
                Mensagem
              </label>
              <textarea
                rows={3}
                placeholder="Pedidos especiais, perguntas…"
                value={form.mensagem}
                onChange={setField('mensagem')}
                className={inputCls + ' resize-none'}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={formState === 'loading'}
          className="w-full font-display uppercase tracking-[0.14em] text-[12px] py-4 rounded-[6px] transition-colors duration-200 mt-1"
          style={{
            backgroundColor: '#0C4544',
            color: '#FAE6C1',
            opacity: formState === 'loading' ? 0.65 : 1,
          }}
        >
          {formState === 'loading' ? 'A enviar…' : 'Reservar'}
        </button>

        {formState === 'error' && (
          <p
            className="font-body text-center"
            style={{ fontSize: '0.875rem', color: '#8B2020' }}
          >
            Ocorreu um erro. Por favor tente novamente.
          </p>
        )}

        <div className="flex items-center justify-center gap-2 mt-1">
          <Phone size={12} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
          <span
            className="font-body"
            style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}
          >
            Ou ligue-nos para{' '}
            <a
              href="tel:+351258000000"
              className="underline underline-offset-2 hover:text-cn-green transition-colors duration-200"
            >
              +351 258 000 000
            </a>
          </span>
        </div>
      </form>
    )
  }

  /* ────────────────────────────────────────────────────────────── */

  return (
    <div ref={pageRef} style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ══════════════════════════════════
          GALLERY HERO
      ══════════════════════════════════ */}
      <div
        className="relative select-none overflow-hidden"
        style={{ aspectRatio: '16/7', backgroundColor: '#0A3A39', cursor: grabbing ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setGrabbing(false)}
      >
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${galleryIdx * 100}%)` }}
        >
          {galleryImages.map((img, i) => (
            <div key={i} className="relative flex-shrink-0 w-full h-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay — bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(3,29,29,0.35) 100%)',
          }}
        />

        {/* Arrow controls */}
        <button
          onClick={prevSlide}
          disabled={!canPrev}
          aria-label="Imagem anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: 'rgba(255,249,237,0.85)',
            opacity: canPrev ? 1 : 0.3,
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronLeft size={18} strokeWidth={1.5} style={{ color: '#031D1D' }} />
        </button>

        <button
          onClick={nextSlide}
          disabled={!canNext}
          aria-label="Próxima imagem"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: 'rgba(255,249,237,0.85)',
            opacity: canNext ? 1 : 0.3,
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronRight size={18} strokeWidth={1.5} style={{ color: '#031D1D' }} />
        </button>

        {/* Counter */}
        <div
          className="absolute bottom-4 right-5 font-display uppercase tracking-[0.12em] text-[11px]"
          style={{ color: 'rgba(255,249,237,0.80)' }}
        >
          {galleryIdx + 1}/{galleryImages.length}
        </div>
      </div>

      {/* Mobile gallery aspect ratio override */}
      <style>{`
        @media (max-width: 767px) {
          .gallery-hero { aspect-ratio: 4/3 !important; }
        }
      `}</style>

      {/* ══════════════════════════════════
          PROPERTY HEADER
      ══════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 md:pt-10 reveal-section">

        <h1
          className="reveal-item font-display uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.0,
            letterSpacing: '0.05em',
            color: 'var(--color-text)',
          }}
        >
          Ficar na Casa de Nabais
        </h1>

        <div className="reveal-item flex items-center gap-2 mt-3">
          <MapPin size={14} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
          <a
            href="https://maps.google.com/?q=Seara,Ponte+de+Lima"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body underline underline-offset-2 hover:text-cn-green transition-colors duration-200"
            style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
          >
            Seara, Ponte de Lima
          </a>
        </div>

        {/* Specs row */}
        <div className="reveal-item flex flex-wrap items-center gap-6 md:gap-10 mt-5 pb-6 md:pb-8 border-b border-[rgba(3,29,29,0.10)]">
          <div className="flex items-center gap-2.5">
            <Bed size={18} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
            <span
              className="font-body"
              style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
            >
              5 suítes + 1 apartamento
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users size={18} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
            <span
              className="font-body"
              style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
            >
              12 pessoas
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Bath size={18} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
            <span
              className="font-body"
              style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
            >
              7 casas de banho
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN CONTENT — two-column grid
      ══════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20 items-start">

          {/* ── LEFT COLUMN ──────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Intro */}
            <div className="reveal-section mb-10 md:mb-12">
              <p
                className="reveal-item font-body text-cn-text-muted mb-4"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.7 }}
              >
                Inteiramente recuperada, a Casa de Nabais dispõe de 5 suítes e 1 apartamento, confortáveis e silenciosos, integrados na paisagem e no ambiente agrícola que a rodeia. Com vistas abertas sobre a vinha e próximos da adega onde repousam os vinhos, os quartos oferecem o conforto da tecnologia atual sem perder o charme deste solar milenário com séculos de história.
              </p>
              <p
                className="reveal-item font-body text-cn-text-muted mb-4"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.7 }}
              >
                Nos interiores, o encontro entre passado e presente é feito com luxo e uma modernidade discreta: uma equipa de prazo e serviços atenciosos, pensados para estar e ficar. Dos pequenos-almoços preparados com produtos da casa aos aperitivos ao final do dia — o alojamento não é apenas o sítio onde se dorme, é parte integrante da experiência.
              </p>
              <p
                className="reveal-item font-body text-cn-text-muted"
                style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.7 }}
              >
                A piscina e o spa, nada convida a andar mais — até o silêncio do vale, a vinha e a casa se tornam parte da experiência.
              </p>
            </div>

            {/* Price callout — mobile only */}
            <div
              className="lg:hidden mb-8 p-5 rounded-[8px] border border-[rgba(3,29,29,0.12)]"
              style={{ backgroundColor: '#FFF3DE' }}
            >
              <p
                className="font-display"
                style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}
              >
                A partir de
              </p>
              <p
                className="font-display"
                style={{ fontSize: 'clamp(1.375rem, 4vw, 1.75rem)', color: 'var(--color-text)', lineHeight: 1.1 }}
              >
                €1.000 — €2.500
                <span
                  className="font-body"
                  style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}
                >
                  / noite
                </span>
              </p>
              <button
                onClick={() => setMobileOpen(true)}
                className="mt-4 w-full font-display uppercase tracking-[0.14em] text-[12px] py-3.5 rounded-[6px]"
                style={{ backgroundColor: '#0C4544', color: '#FAE6C1' }}
              >
                Verificar disponibilidade
              </button>
            </div>

            {/* Comodidades */}
            <div className="reveal-section mb-10 md:mb-12">
              <h2
                className="reveal-item font-display uppercase tracking-[0.08em] mb-6"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--color-text)' }}
              >
                Comodidades
              </h2>
              <div className="reveal-item grid grid-cols-2 gap-x-8 gap-y-2.5">
                {AMENITIES_LEFT.map((item, i) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(12,69,68,0.10)' }}
                    >
                      <Check size={10} strokeWidth={2.5} style={{ color: '#0C4544' }} />
                    </div>
                    <span
                      className="font-body"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
                {AMENITIES_RIGHT.map((item, i) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(12,69,68,0.10)' }}
                    >
                      <Check size={10} strokeWidth={2.5} style={{ color: '#0C4544' }} />
                    </div>
                    <span
                      className="font-body"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
                    >
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
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--color-text)' }}
              >
                Atividades e experiências
              </h2>
              <div className="reveal-item flex flex-col gap-2.5">
                {ACTIVITIES.map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(12,69,68,0.10)' }}
                    >
                      <Check size={10} strokeWidth={2.5} style={{ color: '#0C4544' }} />
                    </div>
                    <span
                      className="font-body"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="reveal-item font-body mt-5"
                style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', opacity: 0.7 }}
              >
                Saiba mais sobre actividades no Vale do Lima em{' '}
                <a
                  href="https://www.visitepontedelima.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-cn-green transition-colors duration-200"
                >
                  visitepontedelima.pt
                </a>
              </p>
            </div>

            {/* Turismo histórico */}
            <div className="reveal-section mb-10 md:mb-14">
              <h2
                className="reveal-item font-display uppercase tracking-[0.08em] mb-2"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--color-text)' }}
              >
                Turismo histórico e cultural
              </h2>
              <p
                className="reveal-item font-body mb-5"
                style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', opacity: 0.7 }}
              >
                A 10–15 minutos da Casa de Nabais
              </p>
              <div className="reveal-item flex flex-col divide-y divide-[rgba(3,29,29,0.08)]">
                {NEARBY.map(({ label, dist }) => (
                  <div key={label} className="flex items-center justify-between py-2.5">
                    <span
                      className="font-body"
                      style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-display uppercase tracking-[0.1em]"
                      style={{ fontSize: '11px', color: 'var(--color-text-muted)', opacity: 0.6 }}
                    >
                      {dist}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Localização */}
            <div className="reveal-section">
              <h2
                className="reveal-item font-display uppercase tracking-[0.08em] mb-6"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--color-text)' }}
              >
                Localização
              </h2>

              <div
                className="reveal-item relative w-full overflow-hidden rounded-[6px]"
                style={{ aspectRatio: '16/9', backgroundColor: '#3A5B4F' }}
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
                className="reveal-item inline-flex items-center gap-1.5 mt-4 font-display uppercase tracking-[0.12em] hover:opacity-70 transition-opacity duration-200"
                style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}
              >
                Ver no Google Maps
                <ArrowRight size={10} strokeWidth={1.5} />
              </a>
            </div>

          </div>

          {/* ── RIGHT COLUMN — sticky booking widget ── */}
          <div className="hidden lg:block w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
            <div
              className="sticky rounded-[10px] border border-[rgba(3,29,29,0.12)] overflow-hidden"
              style={{ top: '90px', backgroundColor: '#FFFDF5' }}
            >
              {/* Widget header */}
              <div className="px-6 pt-6 pb-5 border-b border-[rgba(3,29,29,0.08)]">
                <p
                  className="font-display"
                  style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}
                >
                  A partir de
                </p>
                <p
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                    color: 'var(--color-text)',
                    lineHeight: 1.1,
                  }}
                >
                  €1.000 — €2.500
                  <span
                    className="font-body"
                    style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginLeft: '5px' }}
                  >
                    / noite
                  </span>
                </p>
                <p
                  className="font-body mt-1.5"
                  style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', opacity: 0.65 }}
                >
                  Introduza as datas para verificar disponibilidade
                </p>
              </div>

              {/* Form */}
              <div className="px-6 py-5">
                {renderBookingForm()}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════
          COMPRAR VINHOS
      ══════════════════════════════════ */}
      <section
        className="py-16 md:py-20 mt-8 md:mt-12 reveal-section"
        style={{ backgroundColor: '#0C4544' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <h2
            className="reveal-item font-display uppercase text-center tracking-[0.12em] mb-10 md:mb-12"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
              color: '#FAE6C1',
            }}
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
                {/* Wine image */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={wine.img}
                    alt={wine.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(5,38,37,0.55) 0%, transparent 50%)',
                    }}
                  />
                </div>

                {/* Wine info */}
                <div className="px-5 py-4">
                  <p
                    className="font-display uppercase tracking-[0.12em]"
                    style={{ fontSize: '10px', color: 'rgba(250,230,193,0.55)', marginBottom: '4px' }}
                  >
                    {wine.label}
                  </p>
                  <p
                    className="font-display uppercase tracking-[0.06em] mb-4"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#FAE6C1', lineHeight: 1.1 }}
                  >
                    {wine.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={wine.href}
                      className="font-display uppercase tracking-[0.12em] text-[11px] px-4 py-2.5 rounded-[6px] border transition-colors duration-200"
                      style={{
                        borderColor: 'rgba(250,230,193,0.40)',
                        color: 'rgba(250,230,193,0.85)',
                      }}
                    >
                      Detalhes
                    </Link>
                    <button
                      disabled
                      title="Em breve"
                      className="font-display uppercase tracking-[0.12em] text-[11px] px-4 py-2.5 rounded-[6px] cursor-not-allowed"
                      style={{
                        backgroundColor: 'rgba(250,230,193,0.12)',
                        color: 'rgba(250,230,193,0.35)',
                      }}
                    >
                      Comprar →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════
          MOBILE BOOKING OVERLAY
      ══════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[300] flex flex-col"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-[rgba(3,29,29,0.10)]"
          >
            <div>
              <p
                className="font-display"
                style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
              >
                A partir de
              </p>
              <p
                className="font-display"
                style={{ fontSize: '1.25rem', color: 'var(--color-text)' }}
              >
                €1.000 — €2.500
                <span
                  className="font-body"
                  style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}
                >
                  / noite
                </span>
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

          {/* Scrollable form body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {renderBookingForm()}
          </div>
        </div>
      )}

      <Footer />

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
          <p
            className="font-display"
            style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', lineHeight: 1.2 }}
          >
            A partir de
          </p>
          <p
            className="font-display"
            style={{ fontSize: '1.0625rem', color: 'var(--color-text)', lineHeight: 1.1 }}
          >
            €1.000{' '}
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>/ noite</span>
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

    </div>
  )
}
