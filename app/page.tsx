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
      <HomepageIntro />
      <SectionVinhas />
      <SectionVinificacao />
      <SectionVinhos />
      <SectionCasa />
      <SectionEnoturismo />
      <SectionExplore />
    </main>
  )
}
