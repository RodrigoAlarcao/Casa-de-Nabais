import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WineDetailPage from '@/components/WineDetailPage'
import { wines } from '@/lib/wines-data'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return wines.map((wine) => ({ slug: wine.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wine = wines.find((w) => w.slug === params.slug)
  if (!wine) return {}
  return {
    title: `${wine.name} — Casa de Nabais`,
    description: wine.introText[0],
    openGraph: {
      title: `${wine.name} — Casa de Nabais`,
      description: wine.introText[0],
    },
  }
}

export default function Page({ params }: Props) {
  const wine = wines.find((w) => w.slug === params.slug)
  if (!wine) notFound()
  return <WineDetailPage wine={wine} />
}
