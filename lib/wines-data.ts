export type WineAward = {
  label: string
  type: 'gold' | 'silver' | 'bronze'
}

export type WineVintage = {
  year: string
  techSheetUrl: string | null
  awards: WineAward[]
}

export type WineData = {
  slug: string
  brand: string
  name: string
  subtitle: string
  introText: string[]
  mainImage: string
  sectionImage: string
  details: {
    varieties: string
    production: string
    alcohol: string
    ph: string
    totalAcidity: string
    storageTime: string
  }
  keyPoints: string
  tastingNotes: string
  servingSuggestion: string
  vintages: WineVintage[]
}

export const wines: WineData[] = [
  {
    slug: 'loureiro',
    brand: 'Casa de Nabais',
    name: 'Loureiro',
    subtitle: 'A placeholder para o título desta colheita',
    introText: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
    ],
    mainImage: '/images/homepage/vinhos/loureiro-context.webp',
    sectionImage: '/images/homepage/enoturismo/carousel-01.webp',
    details: {
      varieties: 'Loureiro 100%',
      production: 'A definir',
      alcohol: 'A definir',
      ph: 'A definir',
      totalAcidity: 'A definir',
      storageTime: 'A definir',
    },
    keyPoints:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    tastingNotes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    servingSuggestion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    vintages: [
      {
        year: '2023',
        techSheetUrl: null,
        awards: [],
      },
      {
        year: '2022',
        techSheetUrl: null,
        awards: [
          { label: 'Medalha de Ouro — Concours Mondial de Bruxelles', type: 'gold' },
          { label: 'Medalha de Prata — Decanter World Wine Awards', type: 'silver' },
        ],
      },
      {
        year: '2021',
        techSheetUrl: null,
        awards: [
          { label: 'Medalha de Ouro — Vinalies Internationales', type: 'gold' },
        ],
      },
    ],
  },
  {
    slug: 'vinha-do-pomar',
    brand: 'Casa de Nabais',
    name: 'Vinha do Pomar',
    subtitle: 'A placeholder para o título desta colheita',
    introText: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
    ],
    mainImage: '/images/homepage/vinhos/vinha-do-pomar-context.webp',
    sectionImage: '/images/homepage/enoturismo/carousel-02.webp',
    details: {
      varieties: 'Loureiro 100%',
      production: 'A definir',
      alcohol: 'A definir',
      ph: 'A definir',
      totalAcidity: 'A definir',
      storageTime: 'A definir',
    },
    keyPoints:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    tastingNotes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    servingSuggestion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    vintages: [
      {
        year: '2023',
        techSheetUrl: null,
        awards: [],
      },
      {
        year: '2022',
        techSheetUrl: null,
        awards: [
          { label: 'Medalha de Ouro — Concours Mondial de Bruxelles', type: 'gold' },
        ],
      },
    ],
  },
]
