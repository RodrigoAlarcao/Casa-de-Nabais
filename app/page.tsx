import Hero from '@/components/Hero'
import HomepageIntro from '@/components/HomepageIntro'
import SectionVinhas from '@/components/SectionVinhas'
import SectionVinificacao from '@/components/SectionVinificacao'
import SectionVinhos from '@/components/SectionVinhos'
import SectionCasa from '@/components/SectionCasa'
import SectionEnoturismo from '@/components/SectionEnoturismo'
import SectionExplore from '@/components/SectionExplore'

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg)' }}>
      <Hero />
      <div style={{ background: 'linear-gradient(180deg, #FFF3DE 6%, #FFF9ED 100%)' }}>
        <HomepageIntro />
        <SectionVinhas />
      </div>
      <SectionVinificacao />
      <SectionVinhos />
      <div style={{ background: 'linear-gradient(180deg, #0C4544 0%, #052625 100%)' }}>
        <SectionCasa />
        <SectionEnoturismo />
      </div>
      <SectionExplore />
    </main>
  )
}
