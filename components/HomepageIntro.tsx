'use client'

import TextReveal from './TextReveal'
import { useLang } from '@/lib/i18n'

export default function HomepageIntro() {
  const { t } = useLang()

  return (
    <section className="py-28 md:py-40">
      <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
        <TextReveal
          text={t.homepageIntro.text}
          className="font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.0,
            fontWeight: 400,
            color: 'var(--color-text-muted)',
          }}
        />
      </div>
    </section>
  )
}
