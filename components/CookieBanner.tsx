'use client'

import { useConsent } from '@/lib/consent'
import { useLang } from '@/lib/i18n'

export default function CookieBanner() {
  const { bannerOpen, accept, reject } = useConsent()
  const { t } = useLang()
  const c = t.cookies

  if (!bannerOpen) return null

  // Ambos os botões partilham EXACTAMENTE o mesmo estilo para que aceitar e
  // rejeitar tenham igual proeminência visual (sem dark patterns).
  const buttonClass =
    'font-display uppercase tracking-[0.12em] text-[12px] px-7 py-3 rounded-full transition-opacity duration-200 hover:opacity-80 w-full sm:w-auto'
  const buttonStyle = {
    backgroundColor: '#FAE6C1',
    color: '#052625',
    border: '1px solid #FAE6C1',
  } as const

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.title}
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="max-w-[1100px] mx-auto px-6 py-6 md:px-8 md:py-7 rounded-2xl shadow-2xl"
        style={{
          backgroundColor: '#052625',
          border: '1px solid rgba(250,230,193,0.25)',
        }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="md:max-w-[640px]">
            <p
              className="font-display uppercase tracking-[0.15em] text-[11px] mb-2"
              style={{ color: 'rgba(250,230,193,0.55)' }}
            >
              {c.title}
            </p>
            <p
              className="font-body"
              style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,249,237,0.80)' }}
            >
              {c.message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button type="button" onClick={reject} className={buttonClass} style={buttonStyle}>
              {c.reject}
            </button>
            <button type="button" onClick={accept} className={buttonClass} style={buttonStyle}>
              {c.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
