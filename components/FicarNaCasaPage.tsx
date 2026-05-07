'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Bed, Users, Bath,
  ChevronLeft, ChevronRight, ChevronDown,
  Check, Phone, ArrowRight, X,
  WashingMachine, ChefHat, Smartphone, Droplets, Flame,
  Utensils, Sparkles, Flower2, Thermometer, Waves,
  Wine, Compass, TreePine, Heart, Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────────────── */

const GRID_IMAGES = [
  { src: '/images/homepage/casa/section-01.webp',  alt: 'Casa de Nabais — fachada' },
  { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
  { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
  { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suíte principal' },
  { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
  { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
  { src: '/images/homepage/casa/carousel-06.webp', alt: 'Varanda exterior' },
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

const AMENITIES: { name: string; Icon: LucideIcon }[] = [
  { name: 'Lavandaria',                        Icon: WashingMachine },
  { name: 'Cozinha equipada',                  Icon: ChefHat        },
  { name: 'Carregamento de dispositivos móveis', Icon: Smartphone   },
  { name: 'Duches',                            Icon: Droplets       },
  { name: 'Forno de lenha',                    Icon: Flame          },
  { name: 'Grelhador exterior',                Icon: Utensils       },
  { name: 'Produtos de beleza',                Icon: Sparkles       },
  { name: 'Spa',                               Icon: Flower2        },
  { name: 'Sauna',                             Icon: Thermometer    },
  { name: 'Piscina',                           Icon: Waves          },
]

const ACTIVITIES: { name: string; Icon: LucideIcon }[] = [
  { name: 'Provas de vinho',                              Icon: Wine     },
  { name: 'Visitas guiadas às vinhas e à adega',         Icon: Compass  },
  { name: 'Almoços e experiências gastronómicas',        Icon: ChefHat  },
  { name: 'Percursos pedestres na mata e nas vinhas',    Icon: TreePine },
  { name: 'Spa e massagens',                             Icon: Heart    },
  { name: 'Sauna e piscina',                             Icon: Waves    },
  { name: 'Golfe e ténis (nas proximidades)',            Icon: Target   },
]

const NEARBY_CITIES = [
  { name: 'Ponte de Lima (centro)',        detail: '6 km | 10 min | EN203 / A27 (ligação à A3)'  },
  { name: 'Viana do Castelo',              detail: '35 km | 35 min | A27 (ligação à A28)'         },
  { name: 'Braga',                         detail: '40 km | 40 min | A3'                           },
  { name: 'Guimarães',                     detail: '70 km | 1h | A3 + A7'                          },
  { name: 'Porto',                         detail: '95 km | 1h | A3'                               },
  { name: 'Vigo (Espanha)',                detail: '95 km | 1h15 | A3 + AP-9'                      },
  { name: 'Pontevedra (Espanha)',          detail: '75 km | 1h05 | A3 + AP-9'                      },
  { name: 'Santiago de Compostela (Espanha)', detail: '140 km | 1h40 | A3 + AP-9'                 },
  { name: 'A Coruña (Espanha)',            detail: '180 km | 2h | A3 + AP-9'                       },
]

const NEARBY_ROADS = [
  'A3 – eixo Porto - Minho - Galiza (principal acesso à propriedade)',
  'A27 – ligação Ponte de Lima - Viana do Castelo - A28',
  'A28 – corredor litoral Viana do Castelo - Porto',
  'AP-9 (Espanha) – Vigo - Pontevedra - Santiago - A Coruña',
]

const NEARBY_TRAINS = [
  { name: 'Viana do Castelo', detail: '35 km' },
  { name: 'Braga',            detail: '40 km' },
  { name: 'Nine (Vila Nova de Famalicão)', detail: '55 km' },
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

  /* desktop booking modal */
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  /* input focus tracking */
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  function bind(field: string) {
    return {
      onFocus: () => setFocusedField(field),
      onBlur:  () => setFocusedField(null),
    }
  }

  function getPill(field: string, value: string, isStatic = false): React.CSSProperties {
    if (isStatic) return {
      backgroundColor: 'rgba(255,249,237,0.05)',
      border: '1px solid rgba(250,230,193,0.12)',
      borderRadius: '12px',
      padding: '14px 18px',
    }
    const focused = focusedField === field
    const filled  = value !== ''
    return {
      backgroundColor: focused ? 'rgba(255,249,237,0.11)' : 'rgba(255,249,237,0.07)',
      border: `1px solid ${focused ? 'rgba(250,230,193,0.55)' : filled ? 'rgba(250,230,193,0.32)' : 'rgba(250,230,193,0.16)'}`,
      borderRadius: '12px',
      padding: '14px 18px',
      transition: 'border-color 0.18s ease, background-color 0.18s ease',
    }
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

  /* ── shared label / value styles ── */
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display), serif',
    fontSize: '10px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(250,230,193,0.55)',
    marginBottom: '4px',
    display: 'block',
  }
  const valueStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display), serif',
    fontSize: '1.0625rem',
    color: '#FAE6C1',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: '100%',
  }

  /* ── Shared: guests select with chevron ── */
  function renderGuestsSelect(labelText = 'Who', fontSize = '1.0625rem') {
    return (
      <div style={getPill('pessoas', form.pessoas)}>
        <span style={labelStyle}>{labelText}</span>
        <div className="relative flex items-center">
          <select value={form.pessoas} onChange={setField('pessoas')}
            style={{ ...valueStyle, fontSize, appearance: 'none', cursor: 'pointer', paddingRight: '20px' }}
            {...bind('pessoas')}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)} style={{ backgroundColor: '#0C4544' }}>
                {i + 1} {i === 0 ? 'Hóspede' : 'Hóspedes'}
              </option>
            ))}
          </select>
          <ChevronDown size={14} strokeWidth={1.5}
            className="absolute right-0 pointer-events-none"
            style={{ color: 'rgba(250,230,193,0.50)' }}
          />
        </div>
      </div>
    )
  }

  /* ── Success state ── */
  function renderSuccess() {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ border: '1px solid rgba(250,230,193,0.30)' }}>
          <Check size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </div>
        <p className="font-body" style={{ fontSize: '1rem', lineHeight: 1.55, color: 'rgba(255,249,237,0.75)' }}>
          Pedido enviado. Entraremos em contacto brevemente para confirmar a sua estadia.
        </p>
      </div>
    )
  }

  /* ── Desktop card: step 1 (dates + guests + primary CTA) ── */
  function renderStep1(onCTA: () => void) {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-center mb-2">
          <p className="font-display" style={{ fontSize: 'clamp(1.625rem, 2.2vw, 2.25rem)', color: '#FAE6C1', lineHeight: 1.1 }}>
            €1,000 to €2,500/night
          </p>
          <p className="font-body" style={{ fontStyle: 'italic', fontSize: '0.9375rem', color: 'rgba(255,249,237,0.50)', marginTop: '6px' }}>
            Enter dates for seasonal pricing
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div style={getPill('checkIn', form.checkIn)}>
            <span style={labelStyle}>Check In</span>
            <input type="date" value={form.checkIn} onChange={setField('checkIn')}
              min={new Date().toISOString().split('T')[0]}
              style={{ ...valueStyle, colorScheme: 'dark' }}
              {...bind('checkIn')}
            />
          </div>
          <div style={getPill('checkOut', form.checkOut)}>
            <span style={labelStyle}>Check Out</span>
            <input type="date" value={form.checkOut} onChange={setField('checkOut')}
              min={form.checkIn || new Date().toISOString().split('T')[0]}
              style={{ ...valueStyle, colorScheme: 'dark' }}
              {...bind('checkOut')}
            />
          </div>
        </div>

        {renderGuestsSelect('Who')}

        <button
          onClick={onCTA}
          className="w-full font-display tracking-[0.06em] transition-all duration-200 hover:opacity-90"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            backgroundColor: '#FAE6C1',
            border: 'none',
            borderRadius: '12px',
            color: '#031D1D',
            padding: '18px',
            marginTop: '4px',
          }}
        >
          Reservar
        </button>

        <p className="text-center font-body" style={{ fontSize: '0.8125rem', color: 'rgba(255,249,237,0.35)', marginTop: '2px' }}>
          You won&apos;t be charged yet.
        </p>
      </div>
    )
  }

  /* ── Desktop modal: editable dates + guests + contact form ── */
  function renderContactForm() {
    if (formState === 'success') return renderSuccess()

    const canSubmit = form.nome.trim() !== '' && form.email.trim() !== ''

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Editable dates */}
        <div className="grid grid-cols-2 gap-2">
          <div style={getPill('checkIn', form.checkIn)}>
            <span style={labelStyle}>Check In</span>
            <input type="date" value={form.checkIn} onChange={setField('checkIn')}
              min={new Date().toISOString().split('T')[0]}
              style={{ ...valueStyle, fontSize: '0.9375rem', colorScheme: 'dark' }}
              {...bind('checkIn')}
            />
          </div>
          <div style={getPill('checkOut', form.checkOut)}>
            <span style={labelStyle}>Check Out</span>
            <input type="date" value={form.checkOut} onChange={setField('checkOut')}
              min={form.checkIn || new Date().toISOString().split('T')[0]}
              style={{ ...valueStyle, fontSize: '0.9375rem', colorScheme: 'dark' }}
              {...bind('checkOut')}
            />
          </div>
        </div>

        {renderGuestsSelect('Nº de hóspedes', '0.9375rem')}

        {[
          { key: 'nome',     label: 'Nome *',   type: 'text',  placeholder: 'O seu nome',       required: true  },
          { key: 'email',    label: 'Email *',  type: 'email', placeholder: 'email@exemplo.pt',  required: true  },
          { key: 'telefone', label: 'Telefone', type: 'tel',   placeholder: '+351 — opcional',   required: false },
        ].map(({ key, label, type, placeholder, required }) => (
          <div key={key} style={getPill(key, form[key as keyof typeof form])}>
            <span style={labelStyle}>{label}</span>
            <input type={type} required={required} placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={setField(key as keyof typeof form)}
              style={{ ...valueStyle, fontSize: '0.9375rem' }}
              {...bind(key)}
            />
          </div>
        ))}

        <div style={getPill('mensagem', form.mensagem)}>
          <span style={labelStyle}>Mensagem</span>
          <textarea rows={3} placeholder="Pedidos especiais…"
            value={form.mensagem} onChange={setField('mensagem')}
            style={{ ...valueStyle, fontSize: '0.9375rem', resize: 'none' }}
            {...bind('mensagem')}
          />
        </div>

        <button type="submit" disabled={!canSubmit || formState === 'loading'}
          className="w-full font-display tracking-[0.06em] transition-all duration-200"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
            backgroundColor: canSubmit ? '#FAE6C1' : 'rgba(255,249,237,0.08)',
            border: canSubmit ? 'none' : '1px solid rgba(250,230,193,0.15)',
            borderRadius: '12px',
            color: canSubmit ? '#031D1D' : 'rgba(250,230,193,0.30)',
            padding: '18px',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
            opacity: formState === 'loading' ? 0.7 : 1,
          }}
        >
          {formState === 'loading' ? 'A enviar…' : 'Enviar pedido'}
        </button>

        {formState === 'error' && (
          <p className="font-body text-center" style={{ fontSize: '0.875rem', color: 'rgba(255,100,100,0.85)' }}>
            Ocorreu um erro. Tente novamente.
          </p>
        )}

        <div className="flex items-center justify-center gap-2">
          <Phone size={11} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.40)' }} />
          <span className="font-body" style={{ fontSize: '0.8125rem', color: 'rgba(255,249,237,0.40)' }}>
            Ou ligue{' '}
            <a href="tel:+351258000000" className="underline underline-offset-2" style={{ color: 'rgba(250,230,193,0.60)' }}>
              +351 258 000 000
            </a>
          </span>
        </div>
      </form>
    )
  }

  /* ── Mobile: single-screen all-in-one form ── */
  function renderMobileForm() {
    if (formState === 'success') return renderSuccess()

    const canSubmit = form.nome.trim() !== '' && form.email.trim() !== ''

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="text-center mb-2">
          <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 5vw, 1.875rem)', color: '#FAE6C1', lineHeight: 1.1 }}>
            €1,000 to €2,500/night
          </p>
          <p className="font-body" style={{ fontStyle: 'italic', fontSize: '0.875rem', color: 'rgba(255,249,237,0.50)', marginTop: '4px' }}>
            Enter dates for seasonal pricing
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div style={getPill('checkIn', form.checkIn)}>
            <span style={labelStyle}>Check In</span>
            <input type="date" value={form.checkIn} onChange={setField('checkIn')}
              min={new Date().toISOString().split('T')[0]}
              style={{ ...valueStyle, fontSize: '0.9375rem', colorScheme: 'dark' }}
              {...bind('checkIn')}
            />
          </div>
          <div style={getPill('checkOut', form.checkOut)}>
            <span style={labelStyle}>Check Out</span>
            <input type="date" value={form.checkOut} onChange={setField('checkOut')}
              min={form.checkIn || new Date().toISOString().split('T')[0]}
              style={{ ...valueStyle, fontSize: '0.9375rem', colorScheme: 'dark' }}
              {...bind('checkOut')}
            />
          </div>
        </div>

        {renderGuestsSelect('Nº de hóspedes', '0.9375rem')}

        {[
          { key: 'nome',     label: 'Nome *',   type: 'text',  placeholder: 'O seu nome',       required: true  },
          { key: 'email',    label: 'Email *',  type: 'email', placeholder: 'email@exemplo.pt',  required: true  },
          { key: 'telefone', label: 'Telefone', type: 'tel',   placeholder: '+351 — opcional',   required: false },
        ].map(({ key, label, type, placeholder, required }) => (
          <div key={key} style={getPill(key, form[key as keyof typeof form])}>
            <span style={labelStyle}>{label}</span>
            <input type={type} required={required} placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={setField(key as keyof typeof form)}
              style={{ ...valueStyle, fontSize: '0.9375rem' }}
              {...bind(key)}
            />
          </div>
        ))}

        <div style={getPill('mensagem', form.mensagem)}>
          <span style={labelStyle}>Mensagem</span>
          <textarea rows={3} placeholder="Pedidos especiais…"
            value={form.mensagem} onChange={setField('mensagem')}
            style={{ ...valueStyle, fontSize: '0.9375rem', resize: 'none' }}
            {...bind('mensagem')}
          />
        </div>

        <button type="submit" disabled={!canSubmit || formState === 'loading'}
          className="w-full font-display tracking-[0.06em] transition-all duration-200"
          style={{
            fontSize: '1.0625rem',
            backgroundColor: canSubmit ? '#FAE6C1' : 'rgba(255,249,237,0.08)',
            border: canSubmit ? 'none' : '1px solid rgba(250,230,193,0.15)',
            borderRadius: '12px',
            color: canSubmit ? '#031D1D' : 'rgba(250,230,193,0.30)',
            padding: '18px',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            opacity: formState === 'loading' ? 0.7 : 1,
          }}
        >
          {formState === 'loading' ? 'A enviar…' : 'Enviar pedido'}
        </button>

        {formState === 'error' && (
          <p className="font-body text-center" style={{ fontSize: '0.875rem', color: 'rgba(255,100,100,0.85)' }}>
            Ocorreu um erro. Tente novamente.
          </p>
        )}

        <div className="flex items-center justify-center gap-2">
          <Phone size={11} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.40)' }} />
          <span className="font-body" style={{ fontSize: '0.8125rem', color: 'rgba(255,249,237,0.40)' }}>
            Ou ligue{' '}
            <a href="tel:+351258000000" className="underline underline-offset-2" style={{ color: 'rgba(250,230,193,0.60)' }}>
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
            Ficar na<br className="md:hidden" /> Casa de Nabais
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
              gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
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

            {/* 6 imagens menores */}
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
                  sizes="(max-width: 1200px) 17vw, 200px"
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
              fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
              lineHeight: 1.55,
              color: 'rgba(250,230,193,0.82)',
            }}
          >
            Inteiramente recuperada, a Casa de Nabais dispõe de 5 suítes e 1 apartamento, confortáveis e silenciosos, integrados na paisagem e no ambiente agrícola que a rodeia. Com vistas abertas sobre a vinha e próximos da adega onde repousam os vinhos, os quartos oferecem o conforto da tecnologia atual sem perder o charme deste solar milenário com séculos de história.
          </p>
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
              lineHeight: 1.55,
              color: 'rgba(250,230,193,0.82)',
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
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20">

            {/* LEFT */}
            <div className="flex-1 min-w-0">

              {/* Preço mobile callout */}
              <div
                className="lg:hidden mb-8 p-5 rounded-[12px]"
                style={{ border: '1px solid rgba(250,230,193,0.18)', backgroundColor: 'rgba(255,249,237,0.05)' }}
              >
                <p className="font-display text-center" style={{ fontSize: 'clamp(1.375rem, 5vw, 1.75rem)', color: '#FAE6C1', lineHeight: 1.1 }}>
                  €1,000 to €2,500/night
                </p>
                <p className="font-body text-center mt-1" style={{ fontStyle: 'italic', fontSize: '0.875rem', color: 'rgba(255,249,237,0.45)' }}>
                  Enter dates for seasonal pricing
                </p>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="mt-4 w-full font-display tracking-[0.04em] py-4 rounded-[12px]"
                  style={{ backgroundColor: 'rgba(255,249,237,0.12)', color: 'rgba(250,230,193,0.80)', border: '1px solid rgba(250,230,193,0.20)', fontSize: '1rem' }}
                >
                  Reservar
                </button>
              </div>

              {/* ── Bloco intro — Casa de Nabais ── */}
              <div className="reveal-section mb-0">
                <h2
                  className="reveal-item font-display"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#FAE6C1', lineHeight: 1.1, marginBottom: '10px' }}
                >
                  Casa de Nabais
                </h2>
                <div className="reveal-item flex items-center gap-2 mb-8">
                  <MapPin size={13} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.55)', flexShrink: 0 }} />
                  <a
                    href="https://maps.google.com/?q=Seara,Ponte+de+Lima,Portugal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body underline underline-offset-2 transition-opacity duration-200 hover:opacity-80"
                    style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.60)' }}
                  >
                    Seara, Ponte de Lima
                  </a>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: 'rgba(250,230,193,0.14)', marginBottom: '32px' }} />

                <h3
                  className="reveal-item font-display mb-5"
                  style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', color: 'rgba(250,230,193,0.90)', lineHeight: 1.3 }}
                >
                  Enoturismo de charme no coração do Vale do Lima
                </h3>
                {[
                  'A cerca de uma hora do Porto, de Vigo (Espanha) e de Guimarães, a meia hora de Braga e de Viana do Castelo, e a 20 minutos da Praia do Cabedelo, o spot preferido dos praticantes de Surf, Windsurf e Kitesurf, a Casa de Nabais é uma quinta minhota histórica situada em Ponte de Lima, no coração do Vale do Lima, berço da casta Loureiro.',
                  'Focado na frescura, no equilíbrio e no tempo que esta casta exige e merece, o projeto combina produção vínica com uma vertente de enoturismo personalizada e de elevada qualidade.',
                  'Inteiramente recuperada, a casa dispõe de 5 suítes e 1 apartamento, confortáveis e silenciosos, integrados na paisagem e no ambiente agrícola que a rodeia. Com vistas abertas sobre as vinhas e proximidade à adega onde repousam os vinhos, os quartos oferecem o conforto da tecnologia atual sem perder o charme deste solar minhoto com séculos de história.',
                  'Nos interiores, o encontro entre peças com história e uma modernidade discreta cria espaços de pausa e luz suave, pensados para estar e ficar. Dos pequenos-almoços com produtos da quinta à piscina e ao spa, tudo convida a abrandar, até que o silêncio do vale, a vinha e a casa se tornam parte da experiência.',
                ].map((para, i) => (
                  <p
                    key={i}
                    className="reveal-item font-body mb-4 last:mb-0"
                    style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.7, color: 'rgba(255,249,237,0.72)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(250,230,193,0.14)', margin: '40px 0' }} />

              {/* Comodidades */}
              <div className="reveal-section mb-0">
                <h2
                  className="reveal-item font-display mb-6"
                  style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', color: 'rgba(250,230,193,0.90)' }}
                >
                  Comodidades
                </h2>
                <div className="reveal-item grid grid-cols-2 gap-x-8 gap-y-4">
                  {AMENITIES.map(({ name, Icon }) => (
                    <div key={name} className="flex items-center gap-3">
                      <Icon size={16} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.65)', flexShrink: 0 }} />
                      <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(250,230,193,0.14)', margin: '40px 0' }} />

              {/* Atividades */}
              <div className="reveal-section mb-0">
                <h2
                  className="reveal-item font-display mb-6"
                  style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', color: 'rgba(250,230,193,0.90)' }}
                >
                  Atividades e experiências
                </h2>
                <div className="reveal-item flex flex-col gap-4">
                  {ACTIVITIES.map(({ name, Icon }) => (
                    <div key={name} className="flex items-center gap-3">
                      <Icon size={16} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.65)', flexShrink: 0 }} />
                      <span className="font-body" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                        {name}
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

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(250,230,193,0.14)', margin: '40px 0' }} />

              {/* Turismo histórico */}
              <div className="reveal-section mb-0">
                <h2
                  className="reveal-item font-display mb-2"
                  style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', color: 'rgba(250,230,193,0.90)' }}
                >
                  Turismo histórico e cultural
                </h2>
                <p className="reveal-item font-display mb-8" style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', color: 'rgba(250,230,193,0.90)' }}>
                  (a 10-15 minutos da Casa de Nabais)
                </p>

                {/* Cidades */}
                <p className="reveal-item font-body mb-3" style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.55)' }}>
                  Cidades e pontos de referência:
                </p>
                <ul className="reveal-item mb-8" style={{ listStyle: 'disc', paddingLeft: '1.25rem' }}>
                  {NEARBY_CITIES.map(({ name, detail }) => (
                    <li key={name} className="font-body mb-1.5" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                      <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px', color: 'rgba(255,249,237,0.75)' }}>{name}</span>
                      {': '}{detail}
                    </li>
                  ))}
                </ul>

                {/* Estradas */}
                <p className="reveal-item font-body mb-3" style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.55)' }}>
                  Principais eixos rodoviários da região:
                </p>
                <ul className="reveal-item mb-8" style={{ listStyle: 'disc', paddingLeft: '1.25rem' }}>
                  {NEARBY_ROADS.map(road => (
                    <li key={road} className="font-body mb-1.5" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                      {road}
                    </li>
                  ))}
                </ul>

                {/* Comboio */}
                <p className="reveal-item font-body mb-3" style={{ fontSize: '0.9375rem', color: 'rgba(250,230,193,0.55)' }}>
                  Comboio (estações mais próximas):
                </p>
                <ul className="reveal-item" style={{ listStyle: 'disc', paddingLeft: '1.25rem' }}>
                  {NEARBY_TRAINS.map(({ name, detail }) => (
                    <li key={name} className="font-body mb-1.5" style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.68)' }}>
                      {name}: {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(250,230,193,0.14)', margin: '40px 0' }} />

              {/* Localização */}
              <div className="reveal-section pb-4">
                <h2
                  className="reveal-item font-display mb-6"
                  style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', color: 'rgba(250,230,193,0.90)' }}
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

            {/* RIGHT — sticky booking card (always step 1 on desktop) */}
            <div className="hidden lg:block w-full lg:w-[380px] xl:w-[400px] flex-shrink-0">
              <div
                className="sticky rounded-[16px] p-6"
                style={{
                  top: '90px',
                  backgroundColor: 'rgba(255,249,237,0.05)',
                  border: '1px solid rgba(250,230,193,0.18)',
                }}
              >
                {renderStep1(() => setBookingModalOpen(true))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OS NOSSOS VINHOS — igual a SectionVinhos da homepage
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">

          <div className="text-center mb-14 md:mb-16 max-w-[640px] mx-auto">
            <h2
              className="font-display uppercase text-cn-text mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0, letterSpacing: '0.04em' }}
            >
              Os nossos vinhos
            </h2>
            <p className="font-body text-cn-text-muted"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.4 }}>
              Produzidos exclusivamente com uva própria, em pequena escala, são vinhos frescos, gastronómicos e pensados para evoluir, revelando o caráter dos solos graníticos e xistosos onde nascem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {WINES.map(wine => (
              <div key={wine.name} className="flex flex-col">
                {/* Image — white card, contained */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '4/5', backgroundColor: '#FFFFFF', borderRadius: '4px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                >
                  <div className="absolute inset-6">
                    <Image
                      src={wine.img}
                      alt={wine.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Name block */}
                <div className="text-center py-8">
                  <p className="font-display uppercase tracking-[0.18em] text-cn-text-muted mb-1" style={{ fontSize: '11px' }}>
                    {wine.label}
                  </p>
                  <h3 className="font-display uppercase text-cn-text"
                    style={{ fontSize: 'clamp(1.625rem, 3vw, 2.5rem)', letterSpacing: '0.04em', lineHeight: 1.05 }}>
                    {wine.name}
                  </h3>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={wine.href}
                    className="flex items-center justify-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] py-4 transition-colors duration-200"
                    style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)', borderRadius: '8px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-text)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-bg)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)' }}
                  >
                    Detalhes <ArrowRight size={10} strokeWidth={1.5} />
                  </Link>
                  <button
                    disabled
                    title="Em breve"
                    className="flex items-center justify-center gap-1.5 font-display text-[11px] uppercase tracking-[0.14em] py-4"
                    style={{ backgroundColor: 'var(--color-green)', color: '#FAE6C1', opacity: 0.55, cursor: 'not-allowed', borderRadius: '8px' }}
                  >
                    Comprar <ArrowRight size={10} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DESKTOP MODAL — step 2 contact form
      ══════════════════════════════════════════════════════ */}
      {bookingModalOpen && (
        <div
          className="hidden lg:flex fixed inset-0 z-[400] items-center justify-center"
          style={{ backgroundColor: 'rgba(3,13,13,0.80)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          onClick={() => { setBookingModalOpen(false); setFormState('idle') }}
        >
          <div
            className="relative w-full max-w-[520px] mx-6 rounded-[20px] p-7 overflow-y-auto"
            style={{
              maxHeight: '90vh',
              backgroundColor: 'rgba(12,69,68,0.96)',
              border: '1px solid rgba(250,230,193,0.18)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.50)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => { setBookingModalOpen(false); setFormState('idle') }}
              aria-label="Fechar"
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
              style={{ backgroundColor: 'rgba(255,249,237,0.10)', border: '1px solid rgba(250,230,193,0.18)' }}
            >
              <X size={14} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
            </button>
            {renderContactForm()}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MOBILE OVERLAY — two-step booking
      ══════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[300] flex flex-col"
          style={{ background: 'linear-gradient(180deg, #031D1D 0%, #0C4544 50%, #031D1D 100%)' }}>
          <div className="flex items-center justify-end px-6 py-4">
            <button
              onClick={() => { setMobileOpen(false); setFormState('idle') }}
              aria-label="Fechar"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,249,237,0.10)', border: '1px solid rgba(250,230,193,0.18)' }}
            >
              <X size={16} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-8">
            {renderMobileForm()}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR
      ══════════════════════════════════════════════════════ */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] px-5 py-3 flex items-center justify-between"
        style={{
          background: 'linear-gradient(180deg, rgba(12,69,68,0.97) 0%, rgba(5,38,37,0.97) 100%)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          borderTop: '1px solid rgba(250,230,193,0.28)',
        }}
      >
        <div>
          <p className="font-display" style={{ fontSize: '0.625rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(250,230,193,0.50)', lineHeight: 1.2 }}>A partir de</p>
          <p className="font-display" style={{ fontSize: '1.125rem', color: '#FAE6C1', lineHeight: 1.1 }}>
            €1.000 <span style={{ fontSize: '0.8125rem', color: 'rgba(250,230,193,0.55)' }}>/ noite</span>
          </p>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="font-display uppercase tracking-[0.12em] text-[12px] px-7 py-3.5 transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: '#FAE6C1', color: '#031D1D', borderRadius: '8px' }}
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
        <button onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Anterior"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}>
          <ChevronLeft size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      )}

      {index < images.length - 1 && (
        <button onClick={e => { e.stopPropagation(); onNext() }} aria-label="Seguinte"
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
