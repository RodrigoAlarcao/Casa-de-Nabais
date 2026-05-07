'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Home, Wine, X, Menu } from 'lucide-react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

const NAV_LINKS = [
  { href: '/a-casa', label: 'A Casa' },
  { href: '/as-vinhas', label: 'As Vinhas' },
  { href: '/a-vinificacao', label: 'A Vinificação' },
  { href: '/os-vinhos', label: 'Os Vinhos' },
  { href: '/o-enoturismo', label: 'O Enoturismo' },
]

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuTlRef = useRef<gsap.core.Timeline | null>(null)

  /* Animação de entrada da navbar ao carregar */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const openMenu = () => {
    setMenuOpen(true)

    /* Aguardar montagem do overlay no DOM antes de animar */
    requestAnimationFrame(() => {
      const tl = gsap.timeline()
      menuTlRef.current = tl

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      ).fromTo(
        '.mobile-nav-link',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
        '-=0.15'
      )
    })
  }

  const closeMenu = () => {
    if (menuTlRef.current) menuTlRef.current.kill()

    const tl = gsap.timeline({
      onComplete: () => setMenuOpen(false),
    })

    tl.to('.mobile-nav-link', {
      opacity: 0,
      duration: 0.15,
      stagger: 0.04,
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.25 },
      '-=0.05'
    )
  }

  return (
    <>
      <header
        ref={headerRef}
        style={{
          background:
            'linear-gradient(180deg, rgba(12,69,68,0.90) 0%, rgba(5,38,37,0.90) 99.52%)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          borderBottom: '0.5px solid rgba(250, 230, 193, 0.00)',
        }}
        className="sticky top-0 z-[100]"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[16px] font-semibold uppercase tracking-[0.15em] text-[#FAE6C1] hover:opacity-80 transition-opacity duration-200"
          >
            Casa de Nabais
          </Link>

          {/* Links de navegação — desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-[15px] text-[#FFF9ED] hover:text-[#FAE6C1] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs — desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/ficar-na-casa"
              className="flex items-center gap-2 font-display text-[14px] text-[#FFF9ED] hover:text-[#FAE6C1] transition-colors duration-200"
            >
              <Home size={14} strokeWidth={1.5} />
              Ficar na Casa
            </Link>
            <button
              disabled
              title="Em breve"
              className="flex items-center gap-2 font-display text-[14px] text-[#FFF9ED] opacity-40 cursor-not-allowed"
            >
              <Wine size={14} strokeWidth={1.5} />
              Comprar Vinho
            </button>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={openMenu}
            aria-label="Abrir menu"
            className="md:hidden text-[#FFF9ED] hover:text-[#FAE6C1] transition-colors duration-200"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          ref={overlayRef}
          style={{
            background: 'rgba(3, 29, 29, 0.78)',
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            borderRight: '0.5px solid rgba(250,230,193,0.08)',
          }}
          className="fixed inset-0 z-[200] flex flex-col px-8 pt-8 pb-12 md:hidden"
        >
          {/* Botão fechar */}
          <div className="flex justify-between items-center mb-16">
            <span className="font-display text-[16px] font-semibold uppercase tracking-[0.15em] text-[#FAE6C1]">
              Casa de Nabais
            </span>
            <button
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="text-[#FFF9ED] hover:text-[#FAE6C1] transition-colors duration-200"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="mobile-nav-link font-display text-[clamp(2rem,8vw,2.75rem)] text-[#FFF9ED] hover:text-[#FAE6C1] transition-colors duration-200 leading-[1.2] py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs mobile */}
          <div className="mt-auto flex flex-col gap-3 mobile-nav-link">
            <Link
              href="/ficar-na-casa"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2.5 font-display text-[13px] uppercase tracking-[0.14em] py-4 rounded-[8px] transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: '#FAE6C1', color: '#031D1D' }}
            >
              <Home size={14} strokeWidth={1.5} />
              Ficar na Casa
            </Link>
            <button
              disabled
              title="Em breve"
              className="flex items-center justify-center gap-2.5 font-display text-[13px] uppercase tracking-[0.14em] py-4 rounded-[8px] cursor-not-allowed"
              style={{ border: '1px solid rgba(250,230,193,0.30)', color: 'rgba(250,230,193,0.35)' }}
            >
              <Wine size={14} strokeWidth={1.5} />
              Comprar Vinho
            </button>
          </div>
        </div>
      )}
    </>
  )
}
