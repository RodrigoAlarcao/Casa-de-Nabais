import Image from 'next/image'
import Link from 'next/link'

const quintaLinks = [
  { label: 'A Casa', href: '/a-casa' },
  { label: 'As Vinhas', href: '/as-vinhas' },
  { label: 'A Vinificação', href: '/a-vinificacao' },
  { label: 'O Enoturismo', href: '/o-enoturismo' },
]

const vinhosLinks = [
  { label: 'Loureiro', href: '/os-vinhos' },
  { label: 'Vinha do Pomar', href: '/os-vinhos' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(to bottom, #0C4544 0%, #082D2C 29%, #031212 100%)',
        overflow: 'hidden',
      }}
      className="pt-16 md:pt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-10 md:pb-12">

          <div>
            <p
              className="font-display uppercase tracking-[0.15em] text-[11px] mb-5"
              style={{ color: 'rgba(250,230,193,0.45)' }}
            >
              Enoturismo · Vale do Lima
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
              A Quinta
            </p>
            <nav className="flex flex-col gap-3">
              {quintaLinks.map((link) => (
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
              Os Vinhos
            </p>
            <nav className="flex flex-col gap-3">
              {vinhosLinks.map((link) => (
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

          <div className="flex flex-col items-start md:items-end">
            <div className="relative w-28 h-20">
              <Image
                src="/images/shared/logo/estate-logo.png"
                alt="Casa de Nabais — Estate Grown"
                fill
                className="object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <p
              className="font-display uppercase tracking-[0.2em] text-[9px] mt-3"
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-10">
          <p
            className="font-display uppercase tracking-[0.12em] text-[10px]"
            style={{ color: 'rgba(250,230,193,0.30)' }}
          >
            © 2026 Casa de Nabais
          </p>
          <p
            className="font-display uppercase tracking-[0.12em] text-[10px]"
            style={{ color: 'rgba(250,230,193,0.30)' }}
          >
            Ponte de Lima · Vinho Verde · Portugal
          </p>
        </div>

      </div>

      <p
        className="font-display uppercase text-center w-full select-none"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(4.5rem, 18vw, 22rem)',
          letterSpacing: '0.06em',
          color: '#FAE6C1',
          opacity: 0.07,
          lineHeight: 0.85,
          marginTop: '0.5rem',
        }}
      >
        Casa de Nabais
      </p>
    </footer>
  )
}
