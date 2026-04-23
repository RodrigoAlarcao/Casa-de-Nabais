import Link from 'next/link'

const navLinks = [
  { label: 'A Casa', href: '/a-casa' },
  { label: 'As Vinhas', href: '/as-vinhas' },
  { label: 'A Vinificação', href: '/a-vinificacao' },
  { label: 'Os Vinhos', href: '/os-vinhos' },
  { label: 'O Enoturismo', href: '/o-enoturismo' },
  { label: 'Ficar na Casa', href: '/ficar-na-casa' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#031D1D' }} className="pt-16 md:pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <p
          className="font-display uppercase mb-14 md:mb-16"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', letterSpacing: '0.12em', color: 'rgba(250,230,193,0.85)' }}
        >
          Casa de Nabais
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-14 md:pb-16"
          style={{ borderBottom: '1px solid rgba(250,230,193,0.12)' }}
        >
          <div>
            <p
              className="font-display uppercase tracking-[0.15em] text-[11px] mb-5"
              style={{ color: 'rgba(250,230,193,0.45)' }}
            >
              Localização
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
              Navegar
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body transition-colors duration-200 w-fit hover:opacity-100"
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
              Contacto
            </p>
            <a
              href="mailto:info@casadenabais.pt"
              className="font-body block transition-opacity duration-200 hover:opacity-100"
              style={{ fontSize: '0.9375rem', color: 'rgba(255,249,237,0.65)' }}
            >
              info@casadenabais.pt
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
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
    </footer>
  )
}
