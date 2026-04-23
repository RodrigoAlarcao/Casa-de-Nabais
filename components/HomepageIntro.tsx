'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

export default function HomepageIntro() {
  const sectionRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 md:py-40">
      <div className="max-w-[720px] mx-auto px-6 md:px-10 text-center">
        <p
          className="reveal font-display text-cn-text-muted"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          Em Ponte de Lima, no coração do Vale do Lima, berço da casta Loureiro, a Casa de Nabais é uma quinta minhota histórica onde o vinho nasce do estudo da terra, da produção cuidada em pequena escala e se partilha através de experiências de enoturismo pensadas à medida de quem nos visita.
        </p>
      </div>
    </section>
  )
}
