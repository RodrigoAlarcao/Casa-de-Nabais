export type WineAward = {
  label: string
  type: 'gold' | 'silver' | 'bronze'
}

export type WineVintage = {
  year: string
  techSheetUrl: string | null
  awards: WineAward[]
}

export type NarrativeSection = {
  heading: string
  text: string
}

export type TechDetails = {
  region: string
  subRegion: string
  varieties: string
  alcohol: string
  totalAcidity: string
  ph: string
  residualSugar: string
  servingTemperature: string
}

export type TastingNotes = {
  color: string
  aroma: string
  palate: string
}

export type WineData = {
  slug: string
  brand: string
  name: string
  subtitle: string
  introText: string[]
  mainImage: string
  sectionImage: string
  narrativeSections: NarrativeSection[]
  techDetails: TechDetails
  tastingNotes: TastingNotes
  keyPoints: string
  servingSuggestion: string
  vintages: WineVintage[]
}

export const wines: WineData[] = [
  {
    slug: 'loureiro',
    brand: 'Casa de Nabais',
    name: 'Loureiro',
    subtitle: 'Frescura Atlântica',
    introText: [
      'Casa de Nabais Loureiro nasce no Vale do Lima, num contexto atlântico onde a frescura e a precisão definem o estilo. É uma interpretação direta da casta, focada na pureza aromática, tensão e expressão do lugar.',
    ],
    mainImage: '/images/homepage/vinhos/loureiro-context.webp',
    sectionImage: '/images/homepage/enoturismo/carousel-01.webp',
    narrativeSections: [
      {
        heading: 'Terroir',
        text: 'Localizado na freguesia da Seara, em Ponte de Lima, o vinho provém de vinhas expostas à influência atlântica, com solos graníticos de grão fino e de drenagem variável. A ventilação constante do vale favorece maturações lentas, preservando acidez e definição aromática.',
      },
      {
        heading: 'Viticultura',
        text: 'Vinhas com elevada densidade de plantação, com enrelvamento permanente e sem recurso a herbicidas. Foco no equilíbrio vegetativo e na preservação da vida do solo.',
      },
      {
        heading: 'Vinificação',
        text: 'Vindima manual em pequenas caixas de 20kg. Curta distância entre vinha e adega. Maceração pelicular de cerca de 4h. Prensagem suave em prensa pneumática. Decantação estática seguida de fermentação em inox com controlo de temperatura.',
      },
      {
        heading: 'Estágio',
        text: 'Estágio sobre borras finas, com battonâge regular para aportar textura, complexidade e estabilidade natural.',
      },
      {
        heading: 'Potencial de Evolução',
        text: 'Expressivo em jovem pela frescura e componente aromática. Em garrafa ganha definição e integração.',
      },
    ],
    techDetails: {
      region: 'Vinho Verde DOC',
      subRegion: 'Lima',
      varieties: 'Loureiro',
      alcohol: '11,5% vol.',
      totalAcidity: '7,5 g/l',
      ph: '3,09',
      residualSugar: 'Seco',
      servingTemperature: '8–10ºC',
    },
    tastingNotes: {
      color: 'Citrino com reflexos esverdeados.',
      aroma: 'Perfil floral fino, citrinos frescos e nuance de fruta tropical.',
      palate: 'Entrada tensa, acidez marcada, final seco e preciso.',
    },
    keyPoints:
      'Produzido exclusivamente com uva própria, em pequena escala, a partir de vinhas nos solos graníticos do Vale do Lima. Um vinho fresco, gastronómico e pensado para evoluir.',
    servingSuggestion: 'Peixes grelhados, marisco, saladas ou como aperitivo.',
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
    subtitle: 'A definir',
    introText: [
      'A definir.',
    ],
    mainImage: '/images/homepage/vinhos/vinha-do-pomar-context.webp',
    sectionImage: '/images/homepage/enoturismo/carousel-02.webp',
    narrativeSections: [
      {
        heading: 'Terroir',
        text: 'A definir.',
      },
      {
        heading: 'Viticultura',
        text: 'A definir.',
      },
      {
        heading: 'Vinificação',
        text: 'A definir.',
      },
      {
        heading: 'Estágio',
        text: 'A definir.',
      },
      {
        heading: 'Potencial de Evolução',
        text: 'A definir.',
      },
    ],
    techDetails: {
      region: 'Vinho Verde DOC',
      subRegion: 'Lima',
      varieties: 'Loureiro',
      alcohol: 'A definir',
      totalAcidity: 'A definir',
      ph: 'A definir',
      residualSugar: 'A definir',
      servingTemperature: 'A definir',
    },
    tastingNotes: {
      color: 'A definir.',
      aroma: 'A definir.',
      palate: 'A definir.',
    },
    keyPoints: 'A definir.',
    servingSuggestion: 'A definir.',
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
