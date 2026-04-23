'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  className?: string
  style?: React.CSSProperties
  ghostOpacity?: number
}

export default function TextReveal({ text, className, style, ghostOpacity = 0.2 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const words = text.split(' ')

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const activeWords = containerRef.current?.querySelectorAll<HTMLElement>('.tr-word')
      if (!activeWords?.length) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(activeWords, { opacity: 1 })
        return
      }

      gsap.to(activeWords, {
        opacity: 1,
        ease: 'none',
        stagger: 0.6,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          end: 'bottom 22%',
          scrub: 2,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={className} style={style}>
      <p className="flex flex-wrap" style={{ gap: '0.3em' }}>
        {words.map((word, i) => (
          <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
            <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, opacity: ghostOpacity, userSelect: 'none' }}>
              {word}
            </span>
            <span className="tr-word" style={{ opacity: 0 }}>{word}</span>
          </span>
        ))}
      </p>
    </div>
  )
}
