// Registo central de imagens — ao receber as imagens finais do cliente,
// actualiza os caminhos aqui. Nenhum componente precisa de ser alterado.

export type ImgEntry = { src: string; alt: string }

// ─── HOMEPAGE ────────────────────────────────────────────────────────
export const IMG_HOMEPAGE = {
  hero: '/images/homepage/hero/homepage_hero.webp',

  explore: {
    vinhas:      '/images/homepage/explore/explore-vinhas.webp',
    vinificacao: '/images/homepage/explore/explore-vinificacao.webp',
    vinhos:      '/images/homepage/explore/explore-vinhos.webp',
    enoturismo:  '/images/homepage/explore/explore-enoturismo.webp',
  },

  casa: {
    section: '/images/homepage/casa/section-01.webp',
    gallery: [
      { src: '/images/homepage/casa/carousel-01.webp', alt: 'Hall de entrada' },
      { src: '/images/homepage/casa/carousel-02.webp', alt: 'Sala de estar' },
      { src: '/images/homepage/casa/carousel-03.webp', alt: 'Suíte principal' },
      { src: '/images/homepage/casa/carousel-04.webp', alt: 'Piscina da quinta' },
      { src: '/images/homepage/casa/carousel-05.webp', alt: 'Jardim histórico' },
      { src: '/images/homepage/casa/carousel-06.webp', alt: 'Mesa de refeições' },
      { src: '/images/homepage/casa/carousel-07.webp', alt: 'Lareira da sala' },
      { src: '/images/homepage/casa/carousel-08.webp', alt: 'Vista da varanda' },
    ] as ImgEntry[],
  },

  vinhas: {
    section: '/images/homepage/vinhas/section-01.webp',
    gallery: [
      { src: '/images/homepage/vinhas/carousel-01.webp', alt: 'Vinha do Pomar em flor' },
      { src: '/images/homepage/vinhas/carousel-02.webp', alt: 'Vindima à mão' },
      { src: '/images/homepage/vinhas/carousel-03.webp', alt: 'Cachos de Loureiro' },
      { src: '/images/homepage/vinhas/carousel-04.webp', alt: 'Vale do Lima' },
      { src: '/images/homepage/vinhas/carousel-05.webp', alt: 'Ramada tradicional minhota' },
      { src: '/images/homepage/vinhas/carousel-06.webp', alt: 'Adega da Casa de Nabais' },
    ] as ImgEntry[],
  },

  vinificacao: {
    fullbleed: '/images/homepage/vinificacao/fullbleed-01.webp',
  },

  enoturismo: {
    section: '/images/homepage/enoturismo/section-01.webp',
    gallery: [
      { src: '/images/homepage/enoturismo/carousel-01.webp', alt: 'Prova de vinho' },
      { src: '/images/homepage/enoturismo/carousel-02.webp', alt: 'Prova de vinho' },
      { src: '/images/homepage/enoturismo/carousel-03.webp', alt: 'Almoço' },
      { src: '/images/homepage/enoturismo/carousel-04.webp', alt: 'Passeio' },
      { src: '/images/homepage/enoturismo/carousel-05.webp', alt: 'Vindima' },
      { src: '/images/homepage/enoturismo/carousel-06.webp', alt: 'Pôr do sol' },
      { src: '/images/homepage/enoturismo/carousel-07.webp', alt: 'Terraço da casa' },
      { src: '/images/homepage/enoturismo/carousel-08.webp', alt: 'Cesta de produtos locais' },
    ] as ImgEntry[],
  },

  vinhos: {
    loureiro:     '/images/homepage/vinhos/loureiro-context.webp',
    vinhaDoPomar: '/images/homepage/vinhos/vinha-do-pomar-context.webp',
  },
} as const

// ─── PÁGINA: A CASA (/a-casa) ────────────────────────────────────────
export const IMG_A_CASA = {
  hero:       '/images/a-casa/hero.webp',
  panoramica: '/images/a-casa/panoramica.webp',
  portrait:   '/images/a-casa/galeria-01.webp',
  exterior:   '/images/a-casa/exterior.webp',
  gallery: [
    { src: '/images/a-casa/galeria-01.webp', alt: 'Hall de entrada' },
    { src: '/images/a-casa/galeria-02.webp', alt: 'Sala de estar' },
    { src: '/images/a-casa/galeria-03.webp', alt: 'Suíte principal' },
    { src: '/images/a-casa/galeria-04.webp', alt: 'Piscina da quinta' },
    { src: '/images/a-casa/galeria-05.webp', alt: 'Jardim histórico' },
    { src: '/images/a-casa/galeria-06.webp', alt: 'Mesa de refeições' },
    { src: '/images/a-casa/galeria-07.webp', alt: 'Vista da varanda' },
  ] as ImgEntry[],
  equipa: [
    { name: 'Nome', role: 'Posição na casa', image: null as string | null },
    { name: 'Nome', role: 'Posição na casa', image: null as string | null },
    { name: 'Nome', role: 'Posição na casa', image: null as string | null },
    { name: 'Nome', role: 'Posição na casa', image: null as string | null },
    { name: 'Nome', role: 'Posição na casa', image: null as string | null },
    { name: 'Nome', role: 'Posição na casa', image: null as string | null },
  ],
} as const

// ─── PÁGINA: AS VINHAS (/as-vinhas) ──────────────────────────────────
export const IMG_AS_VINHAS = {
  hero:       '/images/as-vinhas/hero.webp',
  panoramica: '/images/as-vinhas/panoramica.webp',
  portrait:   '/images/as-vinhas/galeria-01.webp',
  gallery: [
    { src: '/images/as-vinhas/galeria-01.webp', alt: 'Vinha do Pomar em flor' },
    { src: '/images/as-vinhas/galeria-02.webp', alt: 'Vindima à mão' },
    { src: '/images/as-vinhas/galeria-03.webp', alt: 'Cachos de Loureiro' },
    { src: '/images/as-vinhas/galeria-04.webp', alt: 'Vale do Lima' },
    { src: '/images/as-vinhas/galeria-05.webp', alt: 'Ramada tradicional minhota' },
    { src: '/images/as-vinhas/galeria-06.webp', alt: 'Adega da Casa de Nabais' },
  ] as ImgEntry[],
} as const

// ─── PÁGINA: A VINIFICAÇÃO (/a-vinificacao) ───────────────────────────
export const IMG_A_VINIFICACAO = {
  hero:    '/images/a-vinificacao/hero.webp',
  portrait: '/images/a-vinificacao/galeria-01.webp',
  gallery: [
    { src: '/images/a-vinificacao/galeria-01.webp', alt: 'Adega — tanques de inox' },
    { src: '/images/a-vinificacao/galeria-02.webp', alt: 'Fermentação do Loureiro' },
    { src: '/images/a-vinificacao/galeria-03.webp', alt: 'Controlo de temperatura' },
    { src: '/images/a-vinificacao/galeria-04.webp', alt: 'Análise de mosto' },
    { src: '/images/a-vinificacao/galeria-05.webp', alt: 'Prova de barrica' },
    { src: '/images/a-vinificacao/galeria-06.webp', alt: 'Engarrafamento' },
    { src: '/images/a-vinificacao/galeria-07.webp', alt: 'Rotulagem' },
    { src: '/images/a-vinificacao/galeria-08.webp', alt: 'Expedição' },
  ] as ImgEntry[],
  rigor: [
    { src: '/images/a-vinificacao/rigor-01.webp', alt: 'Controlo de temperatura — adega' },
    { src: '/images/a-vinificacao/rigor-02.webp', alt: 'Análise de mosto' },
    { src: '/images/a-vinificacao/rigor-03.webp', alt: 'Registo de dados — vinificação' },
  ] as ImgEntry[],
} as const

// ─── PÁGINA: O ENOTURISMO (/o-enoturismo) ────────────────────────────
export const IMG_O_ENOTURISMO = {
  destaque: '/images/o-enoturismo/destaque.webp',
  provas: [
    { src: '/images/o-enoturismo/provas-01.webp', alt: 'Prova de vinho' },
    { src: '/images/o-enoturismo/provas-02.webp', alt: 'Vindima' },
    { src: '/images/o-enoturismo/provas-03.webp', alt: 'Pôr do sol no Vale do Lima' },
  ] as ImgEntry[],
  visitas: [
    { src: '/images/o-enoturismo/visitas-01.webp', alt: 'Vinhas da Casa de Nabais' },
    { src: '/images/o-enoturismo/visitas-02.webp', alt: 'Percurso entre as vinhas' },
    { src: '/images/o-enoturismo/visitas-03.webp', alt: 'Detalhe das videiras' },
  ] as ImgEntry[],
  almocos: [
    { src: '/images/o-enoturismo/almocos-01.webp', alt: 'Interior da Casa de Nabais' },
    { src: '/images/o-enoturismo/almocos-02.webp', alt: 'Sala de refeições' },
    { src: '/images/o-enoturismo/almocos-03.webp', alt: 'Sala de provas' },
  ] as ImgEntry[],
  passeios: [
    { src: '/images/o-enoturismo/passeios-01.webp', alt: 'Paisagem do Vale do Lima' },
    { src: '/images/o-enoturismo/passeios-02.webp', alt: 'Vinhas ao entardecer' },
    { src: '/images/o-enoturismo/passeios-03.webp', alt: 'Natureza na quinta' },
  ] as ImgEntry[],
} as const

// ─── PÁGINA: OS VINHOS (/os-vinhos) ──────────────────────────────────
export const IMG_OS_VINHOS = {
  loureiro:     '/images/os-vinhos/loureiro.webp',
  vinhaDoPomar: '/images/os-vinhos/vinha-do-pomar.webp',
} as const

// ─── PÁGINA: FICAR NA CASA (/ficar-na-casa) ──────────────────────────
// Partilha as imagens de interiores com A Casa (mesmo espaço físico)
export const IMG_FICAR_NA_CASA = {
  hero: '/images/ficar-na-casa/hero.webp',
  gridImages: [
    { src: '/images/a-casa/exterior.webp',   alt: 'Casa de Nabais — fachada' },
    { src: '/images/a-casa/galeria-01.webp', alt: 'Hall de entrada' },
    { src: '/images/a-casa/galeria-02.webp', alt: 'Sala de estar' },
    { src: '/images/a-casa/galeria-03.webp', alt: 'Suíte principal' },
    { src: '/images/a-casa/galeria-04.webp', alt: 'Piscina da quinta' },
    { src: '/images/a-casa/galeria-05.webp', alt: 'Jardim histórico' },
    { src: '/images/a-casa/galeria-06.webp', alt: 'Varanda exterior' },
  ] as ImgEntry[],
  allGallery: [
    { src: '/images/a-casa/exterior.webp',   alt: 'Casa de Nabais — fachada' },
    { src: '/images/a-casa/galeria-01.webp', alt: 'Hall de entrada' },
    { src: '/images/a-casa/galeria-02.webp', alt: 'Sala de estar' },
    { src: '/images/a-casa/galeria-03.webp', alt: 'Suíte principal' },
    { src: '/images/a-casa/galeria-04.webp', alt: 'Piscina da quinta' },
    { src: '/images/a-casa/galeria-05.webp', alt: 'Jardim histórico' },
    { src: '/images/a-casa/galeria-06.webp', alt: 'Mesa de refeições' },
    { src: '/images/a-casa/galeria-07.webp', alt: 'Vista da varanda' },
  ] as ImgEntry[],
  wines: [
    { label: 'Casa de Nabais', name: 'Vinha do Pomar', intro: 'Provém da seleção de uma parcela que procura uma leitura mais profunda do Loureiro. Maior estrutura, textura e capacidade de evolução.', img: '/images/os-vinhos/vinha-do-pomar.webp', href: '/os-vinhos/vinha-do-pomar' },
    { label: 'Casa de Nabais', name: 'Loureiro', intro: 'Nasce num contexto atlântico onde a frescura e a precisão definem o estilo. Uma interpretação direta da casta, focada na pureza aromática e tensão.', img: '/images/os-vinhos/loureiro.webp', href: '/os-vinhos/loureiro' },
  ],
} as const
