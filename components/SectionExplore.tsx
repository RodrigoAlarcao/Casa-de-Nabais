'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { label: 'As Vinhas', href: '/as-vinhas', image: '/images/homepage/explore/explore-vinhas.jpg', bg: '#3A5B4F' },
  { label: 'A Vinificação', href: '/a-vinificacao', image: '/images/homepage/explore/explore-vinificacao.jpg', bg: '#2A4A3E' },
  { label: 'Os Vinhos', href: '/os-vinhos', image: '/images/homepage/explore/explore-vinhos.jpg', bg: '#1A3A2E' },
  { label: 'Ficar na Casa', href: '/ficar-na-casa', image: '/images/homepage/explore/explore-enoturismo.jpg', bg: '#0A2A1E' },
]

export default function SectionExplore() {
  const sectionRef = useRef<HTMLElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.reveal', {
        y: 25, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <h2
          className="reveal font-display uppercase text-cn-text mb-12 md:mb-16 text-center"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
            lineHeight: 1.0,
            letterSpacing: '0.04em',
          }}
        >
          Explore também
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="reveal group relative overflow-hidden block"
              style={{ aspectRatio: '3/4', backgroundColor: item.bg }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(3,29,29,0.72) 0%, rgba(3,29,29,0.08) 55%, transparent 100%)' }}
              />
              <p className="absolute bottom-5 left-5 right-5 font-display uppercase tracking-[0.13em] text-[11px] text-cn-text-light">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
