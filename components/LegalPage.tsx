'use client'

import { Fragment, ReactNode } from 'react'
import type { LegalDoc } from '@/lib/legal-pages'

// Converte emails e URLs em links, mantendo o conteúdo como texto editável.
const TOKEN = /([\w.+-]+@[\w-]+\.[\w.-]+|https?:\/\/[^\s)]+)/g

function linkify(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'var(--color-green)' }}
        >
          {part}
        </a>
      )
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="underline transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'var(--color-green)' }}
        >
          {part}
        </a>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <article className="max-w-[760px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
        <header className="mb-12 md:mb-16">
          <h1 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1] mb-4">
            {doc.title}
          </h1>
          <p
            className="font-display uppercase tracking-[0.14em] text-[11px]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {doc.updatedLabel}
          </p>
          {doc.intro && (
            <p
              className="font-body mt-6"
              style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text)' }}
            >
              {linkify(doc.intro)}
            </p>
          )}
        </header>

        <div className="flex flex-col gap-10 md:gap-12">
          {doc.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display text-[1.5rem] md:text-[1.75rem] leading-tight mb-4">
                {section.heading}
              </h2>

              {section.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="font-body mb-4 last:mb-0"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--color-text)' }}
                >
                  {linkify(p)}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-2 flex flex-col gap-2 list-disc pl-5">
                  {section.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="font-body"
                      style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--color-text)' }}
                    >
                      {linkify(b)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
