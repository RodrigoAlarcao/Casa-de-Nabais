'use client'

import { useLang } from '@/lib/i18n'
import { useConsent } from '@/lib/consent'
import { legal } from '@/lib/legal'

const LIVRO_RECLAMACOES_URL = 'https://www.livroreclamacoes.pt'

export default function LegalFooter() {
  const { t } = useLang()
  const { openPreferences } = useConsent()
  const l = t.legalFooter
  const copyrightColor = 'rgba(250,230,193,0.30)'

  const labelColor = 'rgba(250,230,193,0.45)'
  const textColor = 'rgba(255,249,237,0.65)'

  return (
    <section
      aria-label={l.heading}
      style={{ background: '#031212' }}
      className="px-6 md:px-10 py-10 md:py-12"
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          className="font-display uppercase tracking-[0.15em] text-[11px] mb-5"
          style={{ color: labelColor }}
        >
          {l.heading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Identificação do operador */}
          <div
            className="font-body"
            style={{ fontSize: '0.875rem', lineHeight: 1.85, color: textColor }}
          >
            <p>{legal.empresa.denominacao}</p>
            <p>{legal.empresa.morada}</p>
            <p>
              {l.nifLabel}: {legal.empresa.nif}
            </p>
            <p>
              {l.certidaoLabel}: {legal.empresa.registoComercial}
            </p>
            <p>
              {l.rnalLabel}: {legal.alojamento.rnal}
            </p>
          </div>

          {/* Meios de reclamação e RAL */}
          <div
            className="font-body"
            style={{ fontSize: '0.875rem', lineHeight: 1.85, color: textColor }}
          >
            <p className="mb-4">
              <a
                href={LIVRO_RECLAMACOES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-opacity duration-200 hover:opacity-100"
                style={{ color: textColor }}
              >
                {l.complaintsBook}
              </a>
            </p>
            <p>
              {l.ralIntro}{' '}
              <a
                href={legal.ral.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-opacity duration-200 hover:opacity-100"
                style={{ color: textColor }}
              >
                {legal.ral.nome}
              </a>
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href="/politica-de-privacidade"
                className="underline transition-opacity duration-200 hover:opacity-100"
                style={{ color: textColor }}
              >
                {l.privacyPolicy}
              </a>
              <span aria-hidden style={{ color: textColor, opacity: 0.4 }}>·</span>
              <a
                href="/termos"
                className="underline transition-opacity duration-200 hover:opacity-100"
                style={{ color: textColor }}
              >
                {l.terms}
              </a>
              <span aria-hidden style={{ color: textColor, opacity: 0.4 }}>·</span>
              <button
                type="button"
                onClick={openPreferences}
                className="underline transition-opacity duration-200 hover:opacity-100"
                style={{ color: textColor, background: 'none', padding: 0, cursor: 'pointer' }}
              >
                {l.cookieSettings}
              </button>
            </p>
          </div>
        </div>

        <p
          className="font-display tracking-[0.12em] text-[10px] text-center mt-12 mb-0"
          style={{ color: copyrightColor }}
        >
          {t.footer.copyright}
        </p>
      </div>
    </section>
  )
}
