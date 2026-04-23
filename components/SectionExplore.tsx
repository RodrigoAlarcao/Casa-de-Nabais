'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { label: 'As Vinhas',      href: '/as-vinhas',      image: '/images/homepage/explore/explore-vinhas.jpg',      bg: '#3A5B4F' },
  { label: 'A Vinificação',  href: '/a-vinificacao',  image: '/images/homepage/explore/explore-vinificacao.jpg', bg: '#2A4A3E' },
  { label: 'Os Vinhos',      href: '/os-vinhos',      image: '/images/homepage/explore/explore-vinhos.jpg',      bg: '#1A3A2E' },
  { label: 'Ficar na Casa',  href: '/ficar-na-casa',  image: '/images/homepage/explore/explore-enoturismo.jpg',  bg: '#0A2A1E' },
]

export default function SectionExplore() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

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

  function getFlex(i: number) {
    if (hovered === null) return 1
    return hovered === i ? 2.5 : 0.55
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cn-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <h2
          className="reveal font-display uppercase text-cn-text mb-12 md:mb-16 text-center"
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1.0,
            letterSpacing: '0.04em',
          }}
        >
          Explore também
        </h2>

        {/* Desktop — expandable flex gallery */}
        <div className="hidden md:flex gap-2" style={{ height: '520px' }}>
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="reveal relative overflow-hidden min-w-0"
              style={{
                flex: getFlex(i),
                backgroundColor: item.bg,
                transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)',
                borderRadius: '4px',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
                style={{
                  transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.7s ease-out',
                }}
                sizes="30vw"
              />

              {/* Dark overlay on non-hovered siblings */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'rgba(3,29,29,0.50)',
                  opacity: hovered !== null && hovered !== i ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              />

              {/* Persistent bottom gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(3,29,29,0.65) 0%, transparent 55%)' }}
              />

              {/* Centered label — appears on hover */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: hovered === i ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              >
                <p className="font-display uppercase tracking-[0.18em] text-[13px] text-cn-text-light text-center px-4">
                  {item.label}
                </p>
              </div>

              {/* Bottom label — hidden on hover */}
              <p
                className="absolute bottom-5 left-5 right-5 font-display uppercase tracking-[0.13em] text-[11px] text-cn-text-light"
                style={{
                  opacity: hovered === i ? 0 : 1,
                  transition: 'opacity 0.25s ease',
                }}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile — 2-column grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="reveal group relative overflow-hidden block"
              style={{ aspectRatio: '3/4', backgroundColor: item.bg, borderRadius: '4px' }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="50vw"
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
