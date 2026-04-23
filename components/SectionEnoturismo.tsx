'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  { label: 'Provas de Vinho', text: 'Verticais e horizontais guiadas por quem faz os vinhos.' },
  { label: 'Visitas Guiadas', text: 'Percurso pelas vinhas, adega e solar com guia especializado.' },
  { label: 'Almoços na Quinta', text: 'Mesa com produtos locais, maridagem com os vinhos da casa.' },
  { label: 'Passeios na Mata', text: 'Trilhos na mata centenária adjacente à propriedade.' },
]

export default function SectionEnoturismo() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.reveal', {
        y: 30, opacity: 0, stagger: 0.09, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      if (imgRef.current) {
        gsap.from(imgRef.current, {
          scale: 1.03, opacity: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-green">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p
              className="reveal font-display uppercase tracking-[0.18em] text-[11px] mb-6"
              style={{ color: 'rgba(250,230,193,0.60)' }}
            >
              O Enoturismo
            </p>
            <h2
              className="reveal font-display text-cn-text-light mb-7"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', lineHeight: 1.15, letterSpacing: '0.02em' }}
            >
              Enoturismo
            </h2>
            <p
              className="reveal font-body mb-10"
              style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)', lineHeight: 1.85, color: 'rgba(255,249,237,0.72)' }}
            >
              Entre solos graníticos e um raro veio de xisto, criamos vinhos com identidade e oferecemos uma experiência de enoturismo vivida com quem os faz.
            </p>

            <div className="space-y-0 mb-12">
              {experiences.map((exp) => (
                <div
                  key={exp.label}
                  className="reveal py-5"
                  style={{ borderTop: '1px solid rgba(250,230,193,0.18)' }}
                >
                  <p
                    className="font-display uppercase tracking-[0.12em] text-[11px] mb-1.5"
                    style={{ color: '#FAE6C1' }}
                  >
                    {exp.label}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'rgba(255,249,237,0.60)' }}
                  >
                    {exp.text}
                  </p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(250,230,193,0.18)' }} />
            </div>

            <div className="reveal flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <Link
                href="/o-enoturismo"
                className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: '#FAE6C1' }}
              >
                Saber mais
                <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
              <Link
                href="/ficar-na-casa"
                className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: 'rgba(255,249,237,0.60)' }}
              >
                Ficar na Casa
                <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <div
            ref={imgRef}
            className="relative overflow-hidden"
            style={{ aspectRatio: '3/4', backgroundColor: '#0A3A39' }}
          >
            <Image
              src="/images/homepage/enoturismo/section-01.jpg"
              alt="Enoturismo na Casa de Nabais"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
