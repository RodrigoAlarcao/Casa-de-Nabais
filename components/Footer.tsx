'use client'

import Link from 'next/link'
import { useLang } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer
      style={{
        background: 'linear-gradient(to bottom, #0C4544 0%, #082D2C 29%, #031212 100%)',
        overflow: 'hidden',
      }}
      className="pt-16 md:pt-20"
    >

      {/* ══ MOBILE LAYOUT ══ */}
      <div className="lg:hidden flex flex-col items-center text-center px-6">

        {/* Ilustração — substituir o div por <Image> quando o ficheiro estiver disponível */}
        {/* <Image src="/images/shared/footer-illustration.webp" alt="Casa de Nabais" width={180} height={180} className="mb-3" /> */}
        <div style={{ height: 180, marginBottom: 12 }} />

        <p
          className="font-display uppercase tracking-[0.2em] text-[9px] mb-14"
          style={{ color: 'rgba(250,230,193,0.35)' }}
        >
          Estate Grown
        </p>

        {/* Morada */}
        <p
          className="font-display uppercase tracking-[0.15em] text-[11px] mb-4"
          style={{ color: 'rgba(250,230,193,0.45)' }}
        >
          {t.footer.tagline}
        </p>
        <p
          className="font-body mb-14"
          style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'rgba(255,249,237,0.65)' }}
        >
          Seara, Ponte de Lima<br />
          4990 Viana do Castelo<br />
          Portugal
        </p>

        {/* A Quinta */}
        <p
          className="font-display uppercase tracking-[0.15em] text-[11px] mb-4"
          style={{ color: 'rgba(250,230,193,0.45)' }}
        >
          {t.footer.quintaColumn}
        </p>
        <nav className="flex flex-col gap-3 mb-14">
          {t.footer.quintaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body transition-opacity duration-200 hover:opacity-100"
              style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Os Vinhos */}
        <p
          className="font-display uppercase tracking-[0.15em] text-[11px] mb-4"
          style={{ color: 'rgba(250,230,193,0.45)' }}
        >
          {t.footer.winesColumn}
        </p>
        <nav className="flex flex-col gap-3 mb-14">
          {t.footer.winesLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body transition-opacity duration-200 hover:opacity-100"
              style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Email */}
        <a
          href="mailto:info@casadenabais.pt"
          className="font-body underline transition-opacity duration-200 hover:opacity-100 mb-14"
          style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
        >
          info@casadenabais.pt
        </a>

        {/* Copyright */}
        <p
          className="font-display tracking-[0.12em] text-[10px] mb-0"
          style={{ color: 'rgba(250,230,193,0.30)' }}
        >
          {t.footer.copyright}
        </p>

      </div>

      {/* Marca de água — mobile (3 linhas, NABAIS extravasa para fora) */}
      <div className="lg:hidden">
        <p
          aria-hidden="true"
          className="font-display uppercase select-none text-center"
          style={{
            fontSize: '28vw',
            letterSpacing: '0.04em',
            lineHeight: 0.88,
            backgroundImage: 'linear-gradient(to bottom, #3A5B4F 0%, #031312 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginTop: '2.5rem',
            paddingBottom: '3rem',
          }}
        >
          CASA<br />DE<br />NABAIS
        </p>
      </div>

      {/* ══ DESKTOP LAYOUT ══ */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-10 md:pb-12">

          <div>
            <p
              className="font-display uppercase tracking-[0.15em] text-[11px] mb-5"
              style={{ color: 'rgba(250,230,193,0.45)' }}
            >
              {t.footer.tagline}
            </p>
            <p
              className="font-body"
              style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'rgba(255,249,237,0.65)' }}
            >
              Seara<br />
              Ponte de Lima<br />
              Minho · Portugal
            </p>
          </div>

          <div>
            <p
              className="font-display uppercase tracking-[0.15em] text-[11px] mb-5"
              style={{ color: 'rgba(250,230,193,0.45)' }}
            >
              {t.footer.quintaColumn}
            </p>
            <nav className="flex flex-col gap-3">
              {t.footer.quintaLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body transition-opacity duration-200 w-fit hover:opacity-100"
                  style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              className="font-display uppercase tracking-[0.15em] text-[11px] mb-5"
              style={{ color: 'rgba(250,230,193,0.45)' }}
            >
              {t.footer.winesColumn}
            </p>
            <nav className="flex flex-col gap-3">
              {t.footer.winesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body transition-opacity duration-200 w-fit hover:opacity-100"
                  style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-start md:items-end justify-end">
            <p
              className="font-display uppercase tracking-[0.2em] text-[9px]"
              style={{ color: 'rgba(250,230,193,0.35)' }}
            >
              Estate Grown
            </p>
          </div>

        </div>

        <div className="pb-10 md:pb-12">
          <a
            href="mailto:info@casadenabais.pt"
            className="font-body transition-opacity duration-200 hover:opacity-100"
            style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
          >
            info@casadenabais.pt
          </a>
        </div>

        <div
          className="mb-8"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, rgba(250,230,193,0) 0%, rgba(250,230,193,0) 2%, #FAE6C1 52%, rgba(250,230,193,0) 100%)',
          }}
        />

        <p
          className="font-display tracking-[0.12em] text-[10px] text-center pb-10"
          style={{ color: 'rgba(250,230,193,0.30)' }}
        >
          {t.footer.copyright}
        </p>

        <p
          className="font-display uppercase text-center w-full select-none"
          aria-hidden="true"
          style={{
            fontSize: 'min(10.3vw, 124px)',
            letterSpacing: '0.04em',
            backgroundImage: 'linear-gradient(to bottom, #3A5B4F 0%, #031312 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 0.85,
            marginTop: '0.5rem',
            paddingBottom: '3rem',
            whiteSpace: 'nowrap',
          }}
        >
          Casa de Nabais
        </p>

      </div>
    </footer>
  )
}
