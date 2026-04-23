import TextReveal from './TextReveal'

const TEXT = 'Em Ponte de Lima, no coração do Vale do Lima, berço da casta Loureiro, a Casa de Nabais é uma quinta minhota histórica onde o vinho nasce do estudo da terra, da produção cuidada em pequena escala e se partilha através de experiências de enoturismo pensadas à medida de quem nos visita.'

export default function HomepageIntro() {
  return (
    <section className="py-28 md:py-40">
      <div className="max-w-[1050px] mx-auto px-6 md:px-10 text-center">
        <TextReveal
          text={TEXT}
          className="font-display"
          style={{
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: 'var(--color-text-muted)',
          }}
        />
      </div>
    </section>
  )
}
