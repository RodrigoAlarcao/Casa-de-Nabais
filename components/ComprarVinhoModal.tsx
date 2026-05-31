'use client'

import { useState } from 'react'
import { X, Check, ShoppingBag, ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/i18n'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const WINES_PT = ['Casa de Nabais Loureiro', 'Casa de Nabais Vinha do Pomar']

interface Props {
  open: boolean
  onClose: () => void
  preselectedWine?: string
}

export default function ComprarVinhoModal({ open, onClose, preselectedWine }: Props) {
  const { t } = useLang()
  const cv = t.comprarVinho

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorDetail, setErrorDetail] = useState<string>('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    vinho: preselectedWine ?? WINES_PT[0],
    caixas: '1',
    morada: '',
  })

  function setField(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))
  }

  function bind(field: string) {
    return {
      onFocus: () => setFocusedField(field),
      onBlur:  () => setFocusedField(null),
    }
  }

  function getPill(field: string, value: string): React.CSSProperties {
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
    fontSize: '0.9375rem',
    color: '#FAE6C1',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: '100%',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')
    try {
      const body = new FormData()
      Object.entries(form).forEach(([k, v]) => body.append(k, v))

      const res = await fetch('/api/comprar-vinho', { method: 'POST', body })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`)
      setFormState('success')
    } catch (err) {
      setErrorDetail(String(err))
      setFormState('error')
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setFormState('idle')
      setForm({ nome: '', email: '', vinho: preselectedWine ?? WINES_PT[0], caixas: '1', morada: '' })
    }, 300)
  }

  if (!open) return null

  const canSubmit = form.nome.trim() !== '' && form.email.trim() !== '' && form.morada.trim() !== ''

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(3,13,13,0.80)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[520px] mx-6 rounded-[20px] overflow-y-auto flex flex-col"
        style={{
          maxHeight: '92vh',
          backgroundColor: 'rgba(12,69,68,0.96)',
          border: '1px solid rgba(250,230,193,0.18)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.50)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-end px-5 pt-5 pb-2 flex-shrink-0">
          <button
            onClick={handleClose}
            aria-label={t.common.close}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ backgroundColor: 'rgba(255,249,237,0.10)', border: '1px solid rgba(250,230,193,0.18)' }}
          >
            <X size={14} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
          </button>
        </div>

        <div className="px-7 pb-7">
          {formState === 'success' ? (
            /* ── Success ── */
            <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(250,230,193,0.35)', backgroundColor: 'rgba(250,230,193,0.07)' }}
              >
                <Check size={22} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
              </div>
              <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(250,230,193,0.30)' }} />
              <div className="flex flex-col gap-3 max-w-[300px]">
                <p className="font-display uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', color: 'rgba(250,230,193,0.55)' }}>
                  Casa de Nabais
                </p>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.375rem, 5vw, 1.625rem)', color: '#FAE6C1', lineHeight: 1.15 }}>
                  {cv.formSuccess}
                </h3>
                <p className="font-body" style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(255,249,237,0.62)' }}>
                  {cv.formSuccessMsg}
                </p>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Title */}
              <div className="text-center mb-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShoppingBag size={14} strokeWidth={1.5} style={{ color: 'rgba(250,230,193,0.55)' }} />
                </div>
                <p className="font-display" style={{ fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', color: '#FAE6C1', lineHeight: 1.1 }}>
                  {cv.heading}
                </p>
              </div>

              {/* Nome */}
              <div style={getPill('nome', form.nome)}>
                <span style={labelStyle}>{cv.formName}</span>
                <input
                  type="text" required placeholder={cv.namePlaceholder}
                  value={form.nome} onChange={setField('nome')}
                  style={valueStyle} {...bind('nome')}
                />
              </div>

              {/* Email */}
              <div style={getPill('email', form.email)}>
                <span style={labelStyle}>{cv.formEmail}</span>
                <input
                  type="email" required placeholder="email@exemplo.pt"
                  value={form.email} onChange={setField('email')}
                  style={valueStyle} {...bind('email')}
                />
              </div>

              {/* Vinho */}
              <div style={getPill('vinho', form.vinho)}>
                <span style={labelStyle}>{cv.formWine}</span>
                <div className="relative flex items-center">
                  <select
                    value={form.vinho} onChange={setField('vinho')}
                    style={{ ...valueStyle, appearance: 'none', cursor: 'pointer', paddingRight: '20px' }}
                    {...bind('vinho')}
                  >
                    {WINES_PT.map(w => (
                      <option key={w} value={w} style={{ backgroundColor: '#0C4544' }}>{w}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} strokeWidth={1.5}
                    className="absolute right-0 pointer-events-none"
                    style={{ color: 'rgba(250,230,193,0.50)' }}
                  />
                </div>
              </div>

              {/* Caixas */}
              <div style={getPill('caixas', form.caixas)}>
                <span style={labelStyle}>{cv.formQuantity}</span>
                <div className="relative flex items-center">
                  <select
                    value={form.caixas} onChange={setField('caixas')}
                    style={{ ...valueStyle, appearance: 'none', cursor: 'pointer', paddingRight: '20px' }}
                    {...bind('caixas')}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={String(i + 1)} style={{ backgroundColor: '#0C4544' }}>
                        {i + 1} {i === 0 ? cv.box : cv.boxes} (6 {cv.bottles})
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} strokeWidth={1.5}
                    className="absolute right-0 pointer-events-none"
                    style={{ color: 'rgba(250,230,193,0.50)' }}
                  />
                </div>
              </div>

              {/* Morada */}
              <div style={getPill('morada', form.morada)}>
                <span style={labelStyle}>{cv.formAddress}</span>
                <input
                  type="text" required placeholder={cv.addressPlaceholder}
                  value={form.morada} onChange={setField('morada')}
                  style={valueStyle} {...bind('morada')}
                />
              </div>

              {/* Confirmation note */}
              <p
                className="font-body text-center"
                style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'rgba(255,249,237,0.45)', padding: '4px 8px' }}
              >
                {cv.confirmationNote}
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit || formState === 'loading'}
                className="w-full font-display tracking-[0.06em] transition-all duration-200"
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
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
                {formState === 'loading' ? cv.formSending : cv.formSubmit}
              </button>

              {formState === 'error' && (
                <div className="text-center">
                  <p className="font-display" style={{ fontSize: '0.875rem', color: 'rgba(255,100,100,0.85)' }}>
                    {cv.formError}
                  </p>
                  <p className="font-body" style={{ fontSize: '0.8rem', color: 'rgba(255,100,100,0.70)', marginTop: '4px', wordBreak: 'break-all' }}>
                    {errorDetail}
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
