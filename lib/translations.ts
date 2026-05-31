export type NavLink = { label: string; href: string }

export type Translations = {
  nav: {
    links: NavLink[]
    stayAtEstate: string
    buyWine: string
    openMenu: string
    closeMenu: string
    comingSoon: string
  }
  footer: {
    tagline: string
    quintaColumn: string
    winesColumn: string
    copyright: string
    quintaLinks: NavLink[]
    winesLinks: NavLink[]
  }
  common: {
    back: string
    learnMore: string
    details: string
    buy: string
    comingSoon: string
    stayAtEstate: string
    previous: string
    next: string
    of: string
    scroll: string
    backToWines: string
    buyWine: string
    noAwards: string
    techSheet: string
    close: string
  }
  hero: {
    headlineLines: string[]
    sub: string
  }
  homepageIntro: { text: string }
  sectionVinhas: {
    heading: string
    body1: string
    body2: string
  }
  sectionVinificacao: {
    heading: string
    body: string
    destaque: string
  }
  sectionVinhos: {
    heading: string
    body: string
    wines: { slug: string; intro: string }[]
  }
  sectionCasa: {
    headingMobile: string
    headingDesktop: string
    body: string
    textRevealMobile: string
    textRevealDesktop: string
    learnMore: string
  }
  sectionEnoturismo: {
    heading: string
    body: string
    textReveal: string
  }
  sectionExplore: {
    heading: string
    items: NavLink[]
  }
  casaPage: {
    title: string
    titleMobile: string
    intro: string
    bodyParagraphs: string[]
    closingText: string
  }
  casaHistoria: {
    heading: string
    headingMobile: string
    intro: string
    bodyParagraphs: string[]
    closingText: string
  }
  casaPessoas: {
    heading: string
    intro: string
  }
  vinhosPage: {
    title: string
    intro: string
    wines: { slug: string; intro: string }[]
  }
  vinhasPage: {
    title: string
    intro: string
    closingQuote: string
    soloHeading: string
    soloText: string
    laboratorioHeading: string
    laboratorioText: string
    viticulturaMobileHeading: string
    viticulturaDesktopHeading: string
    viticulturaText: string
    ourVineyardsHeading: string
    vinhaDoPomarH: string
    vinhaDoPomarP1: string
    vinhaDoPomarP2: string
    vinhaAdegaH: string
    vinhaAdegaP1: string
    vinhaAdegaP2: string
    vinhaIgrejaH: string
    vinhaIgrejaP1: string
    vinhaIgrejaP2: string
    vinhaTalhaoH: string
    vinhaTalhaoP1: string
    vinhaTalhaoP2: string
  }
  vinificacaoPage: {
    title: string
    intro: string
    loureiroHeading: string
    loureiroParas: string[]
    closingText: string
    experimentalHeading: string
    experimentalParas: string[]
    adegaHeading: string
    adegaList: string[]
    adegaParas: string[]
    rigorHeading: string
    rigorText: string
    enologoHeading: string
    enologoParas: string[]
    enologoClosing: string
    enologoName: string
    enologoRole: string
  }
  enoturismoPage: {
    title: string
    intro: string
    provasHeading: string
    provasParas: string[]
    visitasHeading: string
    visitasParas: string[]
    almocosHeading: string
    almocosParas: string[]
    passeiosHeading: string
    passeiosParas: string[]
  }
  ficarNaCasaPage: {
    title: string
    intro: string
    bedroomsLabel: string
    guestsLabel: string
    bathsLabel: string
    amenitiesHeading: string
    amenities: string[]
    activitiesHeading: string
    activities: string[]
    activitiesLinkText: string
    locationHeading: string
    locationIntro: string
    nearbyCitiesHeading: string
    nearbyRoadsHeading: string
    nearbyTrainsHeading: string
    nearbyRoads: string[]
    winesHeading: string
    winesIntro: string
    winesSubtitle: string
    bookingHeading: string
    bookingSubheading: string
    bookingButton: string
    formName: string
    formEmail: string
    formPhone: string
    formCheckIn: string
    formCheckOut: string
    formGuests: string
    formMessage: string
    formSubmit: string
    formSuccess: string
    formSuccessMsg: string
    formError: string
    formErrorMsg: string
    formSending: string
  }
  wineDetail: {
    vintagesLabel: string
    aboutWineLabel: string
    techInfoLabel: string
    tastingNotesLabel: string
    servingSuggestionLabel: string
    keyPointsLabel: string
    techLabels: {
      region: string
      subRegion: string
      varieties: string
      alcohol: string
      totalAcidity: string
      ph: string
      residualSugar: string
      servingTemperature: string
    }
    tastingLabels: {
      color: string
      aroma: string
      palate: string
    }
    sectionIconKeys: {
      terroir: string
      viticulture: string
      winemaking: string
      ageing: string
      ageingPotential: string
    }
  }
}

/* ─── Portuguese ───────────────────────────────────────────────── */

export const pt: Translations = {
  nav: {
    links: [
      { href: '/a-casa',        label: 'A Casa'        },
      { href: '/as-vinhas',     label: 'As Vinhas'     },
      { href: '/a-vinificacao', label: 'A Vinificação' },
      { href: '/os-vinhos',     label: 'Os Vinhos'     },
      { href: '/o-enoturismo',  label: 'O Enoturismo'  },
    ],
    stayAtEstate:  'Ficar na Casa',
    buyWine:       'Comprar Vinho',
    openMenu:      'Abrir menu',
    closeMenu:     'Fechar menu',
    comingSoon:    'Em breve',
  },
  footer: {
    tagline:      'Enoturismo · Vale do Lima',
    quintaColumn: 'A Quinta',
    winesColumn:  'Os Vinhos',
    copyright:    '2024 Casa de Nabais – Todos os direitos reservados',
    quintaLinks: [
      { label: 'A Casa',        href: '/a-casa'        },
      { label: 'As Vinhas',     href: '/as-vinhas'     },
      { label: 'A Vinificação', href: '/a-vinificacao' },
      { label: 'O Enoturismo',  href: '/o-enoturismo'  },
    ],
    winesLinks: [
      { label: 'Loureiro',       href: '/os-vinhos' },
      { label: 'Vinha do Pomar', href: '/os-vinhos' },
    ],
  },
  common: {
    back:         'Voltar',
    learnMore:    'Saber mais',
    details:      'Detalhes',
    buy:          'Comprar',
    comingSoon:   'Em breve',
    stayAtEstate: 'Ficar na Casa',
    previous:     'Anterior',
    next:         'Seguinte',
    of:           'de',
    scroll:       'scroll',
    backToWines:  'Os vinhos',
    buyWine:      'Comprar vinho',
    noAwards:     'Sem prémios registados para esta colheita.',
    techSheet:    'Ficha Técnica',
    close:        'Fechar',
  },
  hero: {
    headlineLines: ['PERTO DA TERRA,', 'ATENTOS AO DETALHE,', 'RESPEITANDO O TEMPO'],
    sub: 'Assim nascem grandes vinhos',
  },
  homepageIntro: {
    text: 'Em Ponte de Lima, no coração do Vale do Lima, berço da casta Loureiro, a Casa de Nabais é uma quinta minhota histórica onde o vinho nasce do estudo da terra, da produção cuidada em pequena escala e se partilha através de experiências de enoturismo pensadas à medida de quem nos visita.',
  },
  sectionVinhas: {
    heading: 'As nossas\nvinhas',
    body1: 'As vinhas da Casa de Nabais, situada no Vale do Lima, são vinhas próprias, onde a uva é vindimada à mão e levada até à adega em poucos minutos, preservando a sua frescura e a sua identidade.',
    body2: 'Aqui, a casta Loureiro encontra solo, tempo e rigor para se revelar com autenticidade.',
  },
  sectionVinificacao: {
    heading: 'A nossa\nvinificação',
    body: 'Na Casa de Nabais vinificação é sinónimo de investigação contínua. Começa na vinha, respeita a uva e intervém apenas quando necessário. Trabalhamos com precisão, ciência e curiosidade, para revelar a identidade e as singularidades da casta Loureiro.',
    destaque: 'O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível.',
  },
  sectionVinhos: {
    heading: 'Os nossos vinhos',
    body: 'Produzidos exclusivamente com uva própria, em pequena escala, são vinhos frescos, gastronómicos e pensados para evoluir, revelando o caráter dos solos graníticos e xistosos onde nascem.',
    wines: [
      { slug: 'vinha-do-pomar', intro: 'Provém da seleção de uma parcela que procura uma leitura mais profunda do Loureiro. Maior estrutura, textura e capacidade de evolução.' },
      { slug: 'loureiro',       intro: 'Nasce num contexto atlântico onde a frescura e a precisão definem o estilo. Uma interpretação direta da casta, focada na pureza aromática e tensão.' },
    ],
  },
  sectionCasa: {
    headingMobile:   'Conheça a Casa\nde Nabais',
    headingDesktop:  'Conheça\na Casa\nde Nabais',
    body:            'Solar minhoto de séculos, recuperado com respeito pela história e pelo lugar. Cinco suítes e um apartamento, piscina, spa e uma mesa com produtos da quinta. Um sítio para ficar, não para passar.',
    textRevealMobile:  'A Casa de Nabais é também um lugar para ficar, provar e aprender. Casa, vinha, vinho e mesa unem-se num ritmo sereno, para que o visitante seja recebido com verdade. Mais do que vinho, oferece-se origem, coerência e uma ligação profunda entre lugar, pessoas e tempo.',
    textRevealDesktop: 'A Casa de Nabais é um lugar para ficar, provar e aprender. Casa, vinha, vinho e mesa unem-se num ritmo sereno, para que o visitante seja recebido com verdade. Mais do que vinho, oferece-se origem, coerência e uma ligação profunda entre lugar, pessoas e tempo.',
    learnMore: 'Saiba mais',
  },
  sectionEnoturismo: {
    heading: 'Enoturismo',
    body:    'Na Casa de Nabais, o enoturismo nasce da terra e tem as pessoas no centro. Entre solos graníticos e um raro veio de xisto, a cada experiência partilhamos a vida da quinta — a vinha, a adega, a mesa e os seus produtos — com autenticidade e cuidado de quem os faz.',
    textReveal: 'Entre solos graníticos e um raro veio de xisto, criamos vinhos com identidade e oferecemos uma experiência de enoturismo vivida com quem os faz.',
  },
  sectionExplore: {
    heading: 'Explore também',
    items: [
      { label: 'As Vinhas',     href: '/as-vinhas'     },
      { label: 'A Vinificação', href: '/a-vinificacao'  },
      { label: 'Os Vinhos',     href: '/os-vinhos'     },
      { label: 'Ficar na Casa', href: '/ficar-na-casa' },
    ],
  },
  casaPage: {
    title:        'A Casa de Nabais',
    titleMobile:  'A Casa\nde Nabais',
    intro: 'Na Casa de Nabais, o tempo corre ao ritmo da vinha, da luz que ilumina o Vale do Lima e das estações que regressam sempre diferentes. Construída há mais de quatro séculos, é uma casa feita para cultivar, acolher e durar.',
    bodyParagraphs: [
      'A Casa de Nabais nasce da terra e volta a ela. Entre muros antigos, vinhas trabalhadas à mão, o pomar, a horta e a mesa, vive-se um Minho verdadeiro, onde o saber agrícola, o vinho e a hospitalidade formam uma mesma realidade.',
      'Os nossos vinhos começam muito antes de chegarem à garrafa. Começam no subsolo granítico, atravessado por um raro veio de xisto. Continuam no cuidado diário da vinha, na espera paciente, na decisão de intervir pouco. E revelam-se no copo — frescos, precisos, coerentes com o lugar de onde vêm.',
      'Ficar na Casa de Nabais é entrar nesse ritmo: dormir num solar com séculos de história, acordar com a paisagem do Vale do Lima à nossa volta, provar o vinho na terra onde nasce, a mesma que nos dá os frutos, os legumes e as aromáticas que servimos. Entre as vinhas, a adega e a mesa, quem nos visita é convidado a compreender o vinho desde a sua origem, numa experiência próxima e autêntica, vivida com quem o faz.',
      'A generosidade do conjunto e do que o rodeia dispensa encenações ou adornos em excesso. A casa, a vinha, o vinho e a mesa existem em continuidade. Tudo tem origem, intenção e função. Tudo foi pensado para durar, não para impressionar. Receber, na Casa de Nabais, é um ato simples e profundo: abrir a casa, partilhar o que se faz, explicar aquilo em que se acredita.',
    ],
    closingText: 'Mais do que um lugar para visitar e partir, a Casa de Nabais é um lugar para se ficar, oferecendo estadias em plena paisagem minhota e revelando-se como um refúgio para ser vivido com tempo — como verdadeira casa de campo que é, onde vinho, história e hospitalidade se unem para criar uma experiência rara e memorável no Minho.',
  },
  casaHistoria: {
    heading:       'História da\nCasa de Nabais',
    headingMobile: 'História da Casa\nde Nabais',
    intro: 'A Casa de Nabais nasceu da paisagem fértil da freguesia da Seara, em pleno Vale do Lima, e da longa história das grandes casas do Minho.',
    bodyParagraphs: [
      'As primeiras referências à quinta remontam ao século XVII, quando pertencia aos Jácome do Lago, poderosa família de Viana do Castelo, cujo brasão ainda hoje marca a fachada. Habitada apenas de forma sazonal, Nabais foi sempre uma casa de rendimento, trabalhada por caseiros e ligada à lógica dos morgados.',
      'Desde cedo, a vinha fez parte da sua identidade. Já no século XVIII a freguesia produzia vinho, e em 1862 a quinta é descrita oficialmente como composta de "terra lavradia com vinha", árvores de fruto e capela própria. No século XX, a memória vitivinícola confirma-se com a existência de lagar aparelhado, sinal claro de produção de vinho na própria casa.',
    ],
    closingText: 'Entre fidalgos, desembargadores, marqueses e, mais tarde, proprietários burgueses, Nabais manteve sempre a mesma vocação: uma casa murada, de vinha e de vinho, onde a história se escreveu entre a nobreza, o território e o trabalho agrícola.',
  },
  casaPessoas: {
    heading: 'As Pessoas de Nabais',
    intro: 'Tudo o que se passa, diariamente, na vinha, na adega, no solar, na horta ou no pomar da Casa de Nabais depende a 100% de quem aqui trabalha com dedicação. Quem nos visite vai decerto encontrar-se com estas pessoas que no dia a dia asseguram a qualidade dos nossos vinhos, do nosso serviço aos hóspedes, dos produtos da nossa horta e do nosso pomar.',
  },
  vinhosPage: {
    title: 'Os Vinhos',
    intro: 'Produzidos exclusivamente com uva própria, em pequena escala, os vinhos da Casa de Nabais são frescos, gastronómicos e pensados para evoluir. Revelam o caráter dos solos graníticos e xistosos onde nascem, e a identidade da casta Loureiro cultivada no Vale do Lima.',
    wines: [
      { slug: 'vinha-do-pomar', intro: 'Provém da seleção de uma parcela que procura uma leitura mais profunda do Loureiro. Maior estrutura, textura e capacidade de evolução.' },
      { slug: 'loureiro',       intro: 'Nasce num contexto atlântico onde a frescura e a precisão definem o estilo. Uma interpretação direta da casta, focada na pureza aromática e tensão.' },
    ],
  },
  vinhasPage: {
    title:        'As Vinhas',
    intro:        'Na Casa de Nabais, as vinhas começaram muito antes de o serem. Tudo começa no solo: antes de se plantarem as vinhas, fizemos uma leitura profunda do território, um rigoroso estudo do subsolo e da rocha-mãe e escolhas com visão de longo prazo. Como produtores da uva que vinificamos, controlamos todo o processo — da terra à garrafa — com foco no equilíbrio e na qualidade.',
    closingQuote: 'Trabalhamos o solo como um ecossistema vivo, onde sustentabilidade ambiental e qualidade caminham juntas.',
    soloHeading:  'O solo como origem',
    soloText:     'Mais do que o tipo de rocha, interessa-nos como o solo gere a água, a nutrição e o equilíbrio. Solo granítico, solo de xisto e perfis mistos orientam a escolha de todos os elementos que, na vinha, nos levarão ao estilo de vinho que queremos construir.',
    laboratorioHeading: 'Vinhas como campo de estudo',
    laboratorioText:    'As vinhas são recentes, plantadas de raiz, e conduzidas como um laboratório vivo. Testamos diferentes sistemas de poda e condução das videiras, linha a linha, para compreender como influenciam o vigor, a sanidade e a expressão da casta Loureiro.',
    viticulturaMobileHeading: 'Viticultura\nIntegrada',
    viticulturaDesktopHeading: 'Viticultura integrada',
    viticulturaText: 'Seguimos um regime de produção integrada, sem herbicidas, caminhando para práticas regenerativas. O enrelvamento da vinha com espécies autóctones controla infestantes, promove biodiversidade e ajuda a regular o vigor das plantas.',
    ourVineyardsHeading: 'As Nossas Vinhas',
    vinhaDoPomarH: 'Vinha do Pomar',
    vinhaDoPomarP1: 'Com o clássico solo da região — terra preta, muita matéria orgânica e argila — apresenta um terreno fértil, com muito vigor, onde agimos para criar as melhores condições para a vinha.',
    vinhaDoPomarP2: 'Aqui o foco é reduzir a produção natural do solo para alcançar mais qualidade, complexidade e identidade no vinho feito a partir da casta Loureiro.',
    vinhaAdegaH:   'Vinha da Adega',
    vinhaAdegaP1:  'Situada numa zona ligeiramente mais elevada da Casa de Nabais, esta é uma vinha de solo muito pobre, pedregoso, com seixo rolado e quase nenhuma retenção de água.',
    vinhaAdegaP2:  'Trata-se de uma parcela de menor produção, mas que entrega uvas mais concentradas, refletindo no vinho um caráter mais profundo e distinto da casta Loureiro que ali cresce.',
    vinhaIgrejaH:  'Vinha da Igreja',
    vinhaIgrejaP1: 'Localizada na freguesia da Seara, a poucos quilómetros da Casa de Nabais, apresenta solo granítico com fertilidade e uma exposição solar durante praticamente todo o dia, graças à sua posição num ligeiro planalto.',
    vinhaIgrejaP2: 'Foi a escolhida para plantar as castas Alvarinho e Vinhão, explorando esta luz privilegiada para obter maturações mais completas num clima marcadamente atlântico.',
    vinhaTalhaoH:  'Vinha Talhão de Xisto',
    vinhaTalhaoP1: 'Situada na freguesia da Feitosa, também na margem esquerda do Rio Lima, esta parcela singulariza-se pelo substrato xistoso que contrasta com o granito dominante na região.',
    vinhaTalhaoP2: 'Aqui a vinha produz menos, as raízes vão a maior profundidade em busca de água e nutrição, e as uvas expressam uma concentração e mineralidade que se transferem directamente para o copo.',
  },
  vinificacaoPage: {
    title: 'A Vinificação',
    intro: 'Na Casa de Nabais, fazer vinho é um processo contínuo de observação e descoberta. Antes das vinhas, analisámos cuidadosamente o solo e o que existe por baixo dele, escolhemos a base da videira (o porta-enxerto) e tomámos decisões quanto ao rumo a seguir muito antes das uvas chegarem à adega. O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível.',
    loureiroHeading: 'O Loureiro',
    loureiroParas: [
      'O Loureiro é o centro do nosso trabalho. A frescura natural, a acidez equilibrada, o perfil aromático terpénico – que confere notas aromáticas ao vinho – e, ainda, o grau alcoólico moderado fazem do Loureiro uma resposta atual ao que é cada vez mais procurado pelos apreciadores.',
      'No Vale do Lima, onde se situa a Casa de Nabais e onde a casta atinge a sua expressão mais completa, acompanhamos o seu comportamento em diferentes solos — no solo granítico, mais comum na região, e num raro veio de xisto que atravessa uma das nossas vinhas. Observamos também exposições e os sistemas de condução da videira, para tirar o máximo partido das características da casta.',
    ],
    closingText: 'Observamos exposições e sistemas de condução da videira, tudo para aproveitar ao máximo as características da casta.',
    experimentalHeading: 'Uma abordagem experimental',
    experimentalParas: [
      'As nossas vinhas são um verdadeiro laboratório ao ar livre. Testamos diferentes formas de podar e conduzir as videiras, linha a linha, para perceber como essas escolhas influenciam a saúde das plantas, o seu equilíbrio e o carácter do vinho.',
      'Na adega trabalhamos com pequenos depósitos, o que nos permite fazer vinificações muito precisas. Assim, conseguimos compreender melhor a influência de fatores como o solo, a forma como a vinha é cuidada e a quantidade de uvas produzidas em cada parcela.',
    ],
    adegaHeading: 'A Adega',
    adegaList: [
      'Prensa pneumática de baixa pressão para extracção suave',
      'Tanques de inox com controlo preciso de temperatura',
      'Cubas de cimento para micro-oxigenação suave',
      'Vinificação por lotes separados, parcela a parcela',
      'Battonâge manual sobre borras finas',
    ],
    adegaParas: [
      'O espaço foi desenhado para funcionar com a máxima precisão e o mínimo de impacto sobre o vinho.',
      'Trabalhar em escala humana permite-nos acompanhar cada detalhe — da vindima ao engarrafamento — com uma atenção que a escala industrial nunca permitiria.',
    ],
    rigorHeading: 'Rigor e dados',
    rigorText: 'A nossa estação meteorológica própria, ímpar na região, recolhe dados contínuos de temperatura, humidade, precipitação, vento e radiação solar. Estes dados ajudam a ajustar as decisões que afetam a vinha e a aprofundar o conhecimento do ecossistema.',
    enologoHeading: 'O Enólogo',
    enologoParas: [
      'Constantino Ramos dedica-se à Região dos Vinhos Verdes há quase 15 anos, tendo vindo a construir uma relação próxima à vinha e à casta Loureiro. Enólogo de escuta atenta e gesto preciso, acredita que o vinho nasce como uma ideia e ganha forma com paciência, respeito e atenção à natureza. Trabalha em escala humana, acompanhando cada parcela como um ecossistema vivo e defende a intervenção humana apenas na medida em que contribui para preservar o equilíbrio e a frescura dos vinhos, respeitando a uva, decidindo o momento certo e dando espaço à identidade de cada vinho.',
      'O seu foco está em vinhos frescos, gastronómicos e com identidade, pensados para evoluir e contar uma história autêntica.',
      'Assume-se como vigneron, aceitando os riscos e tomando as decisões que começam no campo e culminam na vindima, o momento-chave do ano. Vê o vinho como um processo que começa muito antes da colheita, sendo moldado pelo terroir e pela visão pessoal do enólogo.',
    ],
    enologoClosing: 'Nada é feito por moda. Tudo é observado, testado e integrado apenas se servir a origem, o tempo e a singularidade do vinho.',
    enologoName:    'Constantino Ramos',
    enologoRole:    'Enólogo',
  },
  enoturismoPage: {
    title: 'Enoturismo',
    intro: 'Na Casa de Nabais, o enoturismo no Vale do Lima vive-se de forma autêntica e intimista. Entre o solar histórico, as vinhas, a adega e a mesa, cada experiência permite compreender o vinho desde a sua origem. Provas comentadas, visitas guiadas, gastronomia sazonal e estadias em plena natureza revelam uma quinta onde o Loureiro, a terra e o tempo definem o ritmo.',
    provasHeading: 'Provas de vinho',
    provasParas: [
      'Na Casa de Nabais, as provas de vinho são sempre acompanhadas por quem o faz — o produtor, o enólogo ou um membro da equipa técnica — assegurando que cada vinho provado é explicado a partir da vinha, do solo e das escolhas de vinificação que lhe dão forma.',
      'O Loureiro, casta central da quinta, afirma-se como fio condutor destas provas, com a sua expressão aromática marcada, as notas florais de rosa branca, flor e folha de laranjeira e o subtil laivo a louro e, na boca, a mesma nota nítida de flor e folha de laranjeira e uma acidez vibrante e muito fresca.',
    ],
    visitasHeading: 'Visitas guiadas',
    visitasParas: [
      'O acompanhamento das visitas à adega e às vinhas da Casa de Nabais cabe sempre a quem vive a quinta todos os dias e conhece cada detalhe do que aqui é feito.',
      'O percurso permite assim descobrir a relação direta entre vinha e adega, e compreender, por exemplo, a importância das uvas colhidas à mão que chegam à prensa em minutos ou do trabalho contínuo em torno da casta Loureiro e dos diferentes solos da propriedade.',
    ],
    almocosHeading: 'Almoços e experiências gastronómicas',
    almocosParas: [
      'A gastronomia da Casa de Nabais nasce do seu próprio ecossistema. Da horta para a cozinha, do pomar para a mesa, cada refeição reflete a estação e o que a quinta produz em cada estação. Fruta fresca, sidra, marmelada, hortícolas e ervas aromáticas podem ser servidos aos hóspedes ou integrar os menus vínicos pensados para dialogar com os vinhos da casa.',
      'Almoços e experiências gastronómicas são realizados mediante reserva, celebrando uma cozinha simples, honesta e profundamente ligada a este lugar onde os pratos do Minho têm primazia.',
    ],
    passeiosHeading: 'Passeios na mata',
    passeiosParas: [
      'Os passeios na mata da Casa de Nabais começam nas vinhas, entre folhas e uvas que em breve serão vinho. Numa manhã fresca ou tarde calma, atravessa-se a vinha até ao bosque, por trilhos suaves, ao som do Rio Lima e com o reconfortante cheiro de terra húmida. A flora nativa envolve o caminho e, por vezes, o casal de águias que ali nidifica, uma de muitas espécies da fauna local, sobrevoa em silêncio quem passa.',
      'Um percurso para abrandar, sentir o Minho autêntico e descobrir a harmonia natural que sustenta toda a quinta.',
    ],
  },
  ficarNaCasaPage: {
    title:           'Ficar na Casa',
    intro:           'O solar histórico da Casa de Nabais acolhe os seus hóspedes numa experiência única de alojamento rural de charme, onde o conforto moderno convive com séculos de história. Entre vinhas e jardins, a apenas 6 km de Ponte de Lima.',
    bedroomsLabel:   'quartos',
    guestsLabel:     'hóspedes',
    bathsLabel:      'casas de banho',
    amenitiesHeading: 'Comodidades',
    amenities: [
      'Spa',
      'Banho Turco',
      'Ginásio',
      'Piscina',
      'Carregador de carros elétricos',
      'Forno de lenha',
      'Grelhador exterior',
      'Capela',
    ],
    activitiesHeading: 'Actividades',
    activitiesLinkText: 'Saiba mais sobre actividades no Vale do Lima em',
    activities: [
      'Provas de vinho',
      'Visitas guiadas às vinhas e à adega',
      'Almoços e experiências gastronómicas',
      'Percursos pedestres na mata e nas vinhas',
      'Golfe e ténis (nas proximidades)',
    ],
    locationHeading: 'Localização',
    locationIntro:   'A Casa de Nabais situa-se na freguesia da Seara, em Ponte de Lima, no coração do Minho. A propriedade beneficia de uma localização privilegiada, a poucos quilómetros do centro histórico de Ponte de Lima e bem servida pelas principais vias de acesso.',
    nearbyCitiesHeading: 'Distâncias',
    nearbyRoadsHeading:  'Principais acessos rodoviários',
    nearbyTrainsHeading: 'Estações de comboio mais próximas',
    nearbyRoads: [
      'A3 – eixo Porto - Minho - Galiza (principal acesso à propriedade)',
      'A27 – ligação Ponte de Lima - Viana do Castelo - A28',
      'A28 – corredor litoral Viana do Castelo - Porto',
      'AP-9 (Espanha) – Vigo - Pontevedra - Santiago - A Coruña',
    ],
    winesHeading:   'Os nossos vinhos',
    winesIntro:     'Produzidos exclusivamente com uva própria, em pequena escala, os vinhos da Casa de Nabais são frescos, gastronómicos e pensados para evoluir.',
    winesSubtitle:  'Disponíveis para prova e compra durante a sua estadia.',
    bookingHeading:    'Pedido de reserva',
    bookingSubheading: 'Pedido de disponibilidade',
    bookingButton:     'Verificar disponibilidade',
    formName:     'Nome',
    formEmail:    'Email',
    formPhone:    'Telefone',
    formCheckIn:  'Check-in',
    formCheckOut: 'Check-out',
    formGuests:   'Hóspedes',
    formMessage:  'Mensagem (opcional)',
    formSubmit:   'Enviar pedido',
    formSuccess:  'Pedido enviado',
    formSuccessMsg: 'Entraremos em contacto em breve para confirmar disponibilidade.',
    formError:    'Erro ao enviar',
    formErrorMsg: 'Por favor tente novamente ou contacte-nos directamente.',
    formSending:  'A enviar…',
  },
  wineDetail: {
    vintagesLabel:         'Colheitas',
    aboutWineLabel:        'Sobre o vinho',
    techInfoLabel:         'Informação Técnica',
    tastingNotesLabel:     'Notas de Prova',
    servingSuggestionLabel:'Sugestão de Serviço',
    keyPointsLabel:        'Ponto Chave',
    techLabels: {
      region:             'Região',
      subRegion:          'Sub-região',
      varieties:          'Casta',
      alcohol:            'Álcool',
      totalAcidity:       'Acidez Total',
      ph:                 'pH',
      residualSugar:      'Açúcar Residual',
      servingTemperature: 'Temperatura de Serviço',
    },
    tastingLabels: {
      color:  'Cor',
      aroma:  'Aroma',
      palate: 'Paladar',
    },
    sectionIconKeys: {
      terroir:        'Terroir',
      viticulture:    'Viticultura',
      winemaking:     'Vinificação',
      ageing:         'Estágio',
      ageingPotential:'Potencial de Evolução',
    },
  },
}

/* ─── English ──────────────────────────────────────────────────── */

export const en: Translations = {
  nav: {
    links: [
      { href: '/a-casa',        label: 'The Estate'  },
      { href: '/as-vinhas',     label: 'The Vineyards'},
      { href: '/a-vinificacao', label: 'Winemaking'  },
      { href: '/os-vinhos',     label: 'The Wines'   },
      { href: '/o-enoturismo',  label: 'Wine Tourism'},
    ],
    stayAtEstate: 'Stay at the Estate',
    buyWine:      'Buy Wine',
    openMenu:     'Open menu',
    closeMenu:    'Close menu',
    comingSoon:   'Coming soon',
  },
  footer: {
    tagline:      'Wine Tourism · Lima Valley',
    quintaColumn: 'The Estate',
    winesColumn:  'The Wines',
    copyright:    '2024 Casa de Nabais – All rights reserved',
    quintaLinks: [
      { label: 'The Estate',    href: '/a-casa'        },
      { label: 'The Vineyards', href: '/as-vinhas'     },
      { label: 'Winemaking',    href: '/a-vinificacao' },
      { label: 'Wine Tourism',  href: '/o-enoturismo'  },
    ],
    winesLinks: [
      { label: 'Loureiro',       href: '/os-vinhos' },
      { label: 'Vinha do Pomar', href: '/os-vinhos' },
    ],
  },
  common: {
    back:         'Back',
    learnMore:    'Learn more',
    details:      'Details',
    buy:          'Buy',
    comingSoon:   'Coming soon',
    stayAtEstate: 'Stay at the Estate',
    previous:     'Previous',
    next:         'Next',
    of:           'of',
    scroll:       'scroll',
    backToWines:  'The wines',
    buyWine:      'Buy wine',
    noAwards:     'No awards recorded for this vintage.',
    techSheet:    'Tech Sheet',
    close:        'Close',
  },
  hero: {
    headlineLines: ['CLOSE TO THE LAND,', 'ATTENTIVE TO DETAIL,', 'RESPECTING TIME'],
    sub: 'This is how great wines are born',
  },
  homepageIntro: {
    text: 'In Ponte de Lima, at the heart of the Lima Valley, birthplace of the Loureiro grape, Casa de Nabais is a historic Minho estate where wine is born from an intimate knowledge of the land, crafted on a small scale and shared through bespoke wine tourism experiences.',
  },
  sectionVinhas: {
    heading: 'Our\nVineyards',
    body1: 'The vineyards of Casa de Nabais, set in the Lima Valley, are estate-grown. The grapes are harvested by hand and carried to the winery within minutes, preserving their freshness and character.',
    body2: 'Here, the Loureiro variety finds the soil, time and rigour to express itself with genuine authenticity.',
  },
  sectionVinificacao: {
    heading: 'Our\nWinemaking',
    body: 'At Casa de Nabais, winemaking is synonymous with continuous inquiry. It begins in the vineyard, respects the grape and intervenes only when necessary. We work with precision, science and curiosity to reveal the identity and singularities of the Loureiro variety.',
    destaque: 'Our goal is to create balance from the outset, so that the wine requires the minimum of intervention thereafter.',
  },
  sectionVinhos: {
    heading: 'Our Wines',
    body: 'Produced exclusively from estate-grown grapes, on a small scale, these are fresh, food-friendly wines crafted to evolve, revealing the character of the granite and schist soils from which they emerge.',
    wines: [
      { slug: 'vinha-do-pomar', intro: 'Drawn from the selection of a single plot, seeking a deeper reading of Loureiro. Greater structure, texture and ageing potential.' },
      { slug: 'loureiro',       intro: 'Born in an Atlantic setting where freshness and precision define the style. A direct expression of the variety, focused on aromatic purity and tension.' },
    ],
  },
  sectionCasa: {
    headingMobile:   'Discover\nCasa de Nabais',
    headingDesktop:  'Discover\nCasa de Nabais',
    body:            'A centuries-old Minho manor, restored with respect for history and place. Five suites and an apartment, a pool, spa and a table set with produce from the estate. A place to stay, not simply to pass through.',
    textRevealMobile:  'Casa de Nabais is a place to stay, taste and learn. House, vineyard, wine and table come together in a quiet rhythm, so that every guest is welcomed with sincerity. More than wine, we offer origin, coherence and a deep connection between place, people and time.',
    textRevealDesktop: 'Casa de Nabais is a place to stay, taste and learn. House, vineyard, wine and table come together in a quiet rhythm, so that every guest is welcomed with sincerity. More than wine, we offer origin, coherence and a deep connection between place, people and time.',
    learnMore: 'Learn more',
  },
  sectionEnoturismo: {
    heading: 'Wine Tourism',
    body:    'At Casa de Nabais, wine tourism is rooted in the land and places people at its centre. Among granite soils and a rare vein of schist, each experience shares the life of the estate — the vineyard, the winery, the table and its produce — with the authenticity and care of those who make it.',
    textReveal: 'Among granite soils and a rare vein of schist, we create wines with a distinct identity and offer a wine tourism experience lived alongside those who make it.',
  },
  sectionExplore: {
    heading: 'Explore',
    items: [
      { label: 'The Vineyards',     href: '/as-vinhas'     },
      { label: 'Winemaking',        href: '/a-vinificacao'  },
      { label: 'The Wines',         href: '/os-vinhos'     },
      { label: 'Stay at the Estate',href: '/ficar-na-casa' },
    ],
  },
  casaPage: {
    title:        'Casa de Nabais',
    titleMobile:  'Casa de Nabais',
    intro: 'At Casa de Nabais, time flows at the rhythm of the vineyard, the light that falls across the Lima Valley and the seasons that return, always different. Built over four centuries ago, it is a house made to cultivate, welcome and endure.',
    bodyParagraphs: [
      'Casa de Nabais is born from the land and returns to it. Between ancient walls, hand-tended vines, the orchard, the kitchen garden and the table, one lives a true Minho, where agricultural knowledge, wine and hospitality form a single reality.',
      'Our wines begin long before they reach the bottle. They begin in the granite subsoil, threaded with a rare vein of schist. They continue in the daily care of the vineyard, in patient waiting, in the decision to intervene sparingly. And they reveal themselves in the glass — fresh, precise, true to the place from which they come.',
      'Staying at Casa de Nabais means stepping into that rhythm: sleeping in a manor with centuries of history, waking to the landscape of the Lima Valley all around, tasting the wine in the very land where it is born — the same land that gives us the fruit, vegetables and herbs we serve. Between the vineyards, the winery and the table, guests are invited to understand wine from its very origin, in a close and authentic experience, shared with those who make it.',
      'The generosity of the place and all that surrounds it needs no staging or excess ornament. The house, the vineyard, the wine and the table exist in continuity. Everything has origin, intention and purpose. Everything was made to last, not to impress. To welcome guests at Casa de Nabais is a simple and profound act: to open the house, share what is made, and explain what is believed in.',
    ],
    closingText: 'More than a place to visit and leave, Casa de Nabais is a place to stay — a refuge to be lived in at leisure, in the heart of the Minho landscape. A true country house where wine, history and hospitality unite to create a rare and memorable experience in northern Portugal.',
  },
  casaHistoria: {
    heading:       'The History of\nCasa de Nabais',
    headingMobile: 'The History of\nCasa de Nabais',
    intro: 'Casa de Nabais was born from the fertile landscape of the Seara parish, in the heart of the Lima Valley, and from the long history of the great Minho estates.',
    bodyParagraphs: [
      'The earliest references to the estate date to the seventeenth century, when it belonged to the Jácome do Lago family — a powerful family from Viana do Castelo — whose coat of arms still marks the façade today. Inhabited only seasonally, Nabais was always a working estate, farmed by tenant farmers and governed by the logic of the estate inheritance.',
      'The vineyard was part of its identity from early on. By the eighteenth century the parish was already producing wine, and in 1862 the estate was officially described as comprising "arable land with vines", fruit trees and a private chapel. In the twentieth century, the winemaking heritage is confirmed by the presence of a fitted wine press — a clear sign that wine was produced on the estate itself.',
    ],
    closingText: 'Among noblemen, magistrates, marquesses and, later, bourgeois proprietors, Nabais has always maintained the same vocation: a walled estate of vineyard and wine, where history was written between nobility, territory and agricultural work.',
  },
  casaPessoas: {
    heading: 'The People of Nabais',
    intro: 'Everything that happens daily in the vineyard, the winery, the manor, the kitchen garden and the orchard of Casa de Nabais depends entirely on those who work here with dedication. Those who visit us will no doubt encounter the people who day after day ensure the quality of our wines, our guest service, and the produce from our garden and orchard.',
  },
  vinhosPage: {
    title: 'The Wines',
    intro: 'Produced exclusively from estate-grown grapes, on a small scale, the wines of Casa de Nabais are fresh, food-friendly and crafted to evolve. They reveal the character of the granite and schist soils from which they emerge, and the identity of the Loureiro variety cultivated in the Lima Valley.',
    wines: [
      { slug: 'vinha-do-pomar', intro: 'Drawn from the selection of a single plot, seeking a deeper reading of Loureiro. Greater structure, texture and ageing potential.' },
      { slug: 'loureiro',       intro: 'Born in an Atlantic setting where freshness and precision define the style. A direct expression of the variety, focused on aromatic purity and tension.' },
    ],
  },
  vinhasPage: {
    title:        'The Vineyards',
    intro:        'At Casa de Nabais, the vineyards began long before they were planted. Everything starts with the soil: before planting, we carried out a thorough study of the territory, a rigorous analysis of the subsoil and bedrock, and made decisions with a long-term vision. As growers who vinify our own grapes, we control the entire process — from land to bottle — with a focus on balance and quality.',
    closingQuote: 'We work the soil as a living ecosystem, where environmental sustainability and quality go hand in hand.',
    soloHeading:  'The soil as the origin',
    soloText:     'More than the type of rock, what matters to us is how the soil manages water, nutrition and balance. Granite soils, schist soils and mixed profiles guide the choice of every element that, in the vineyard, will lead us to the style of wine we want to create.',
    laboratorioHeading: 'The vineyards as a field of study',
    laboratorioText:    'The vineyards are recent, planted from scratch and managed as a living laboratory. We test different pruning and training systems, row by row, to understand how these choices influence vigour, vine health and the expression of the Loureiro variety.',
    viticulturaMobileHeading: 'Integrated\nViticulture',
    viticulturaDesktopHeading: 'Integrated viticulture',
    viticulturaText: 'We follow an integrated production system, herbicide-free, moving towards regenerative practices. Cover cropping with native species controls weeds, promotes biodiversity and helps regulate vine vigour.',
    ourVineyardsHeading: 'Our Vineyards',
    vinhaDoPomarH: 'Vinha do Pomar',
    vinhaDoPomarP1: 'With the classic soil of the region — dark earth, rich in organic matter and clay — it presents a fertile, vigorous terrain where we act to create the best conditions for the vine.',
    vinhaDoPomarP2: 'Here the focus is on reducing the soil\'s natural productivity to achieve greater quality, complexity and identity in the wine made from the Loureiro variety.',
    vinhaAdegaH:   'Vinha da Adega',
    vinhaAdegaP1:  'Located in a slightly elevated area of Casa de Nabais, this is a vineyard with very poor, stony soil, with rounded pebbles and almost no water retention.',
    vinhaAdegaP2:  'It is a lower-yielding plot, but one that delivers more concentrated grapes, reflecting in the wine a deeper and more distinctive character of the Loureiro variety that grows there.',
    vinhaIgrejaH:  'Vinha da Igreja',
    vinhaIgrejaP1: 'Located in the Seara parish, a few kilometres from Casa de Nabais, it features fertile granite soil and sun exposure for practically the entire day, thanks to its position on a gentle plateau.',
    vinhaIgrejaP2: 'It was chosen to plant the Alvarinho and Vinhão varieties, making the most of this privileged light to achieve fuller ripening in a markedly Atlantic climate.',
    vinhaTalhaoH:  'Vinha Talhão de Xisto',
    vinhaTalhaoP1: 'Located in the Feitosa parish, also on the left bank of the Lima River, this plot stands out for its schist substrate, which contrasts with the granite dominant in the region.',
    vinhaTalhaoP2: 'Here the vine yields less, the roots go deeper in search of water and nutrition, and the grapes express a concentration and minerality that transfer directly to the glass.',
  },
  vinificacaoPage: {
    title: 'Winemaking',
    intro: 'At Casa de Nabais, making wine is a continuous process of observation and discovery. Before the vineyards, we carefully analysed the soil and what lies beneath it, chose the vine rootstock and made decisions about the path forward long before the grapes arrived at the winery. Our goal is to create balance from the outset, so that the wine requires the minimum of intervention thereafter.',
    loureiroHeading: 'Loureiro',
    loureiroParas: [
      'Loureiro is the centre of our work. Its natural freshness, balanced acidity, terpenic aromatic profile — which gives the wine its distinctive aromatic notes — and moderate alcohol make Loureiro a contemporary answer to what wine lovers are increasingly seeking.',
      'In the Lima Valley, where Casa de Nabais is located and where the variety achieves its fullest expression, we follow its behaviour across different soils — the granite soil more common in the region, and a rare vein of schist that runs through one of our vineyards. We also observe sun exposure and vine training systems to draw the most from the variety\'s characteristics.',
    ],
    closingText: 'We observe sun exposure and vine training systems — all to make the most of the variety\'s characteristics.',
    experimentalHeading: 'An experimental approach',
    experimentalParas: [
      'Our vineyards are a true open-air laboratory. We test different pruning and training methods, row by row, to understand how these choices affect the health, balance and character of the wine.',
      'In the winery we work with small tanks, which allows us to vinify with great precision. This helps us better understand the influence of factors such as soil, vine management and the yield of each plot.',
    ],
    adegaHeading: 'The Winery',
    adegaList: [
      'Low-pressure pneumatic press for gentle extraction',
      'Stainless steel tanks with precise temperature control',
      'Cement vats for gentle micro-oxygenation',
      'Vinification in separate batches, plot by plot',
      'Manual bâtonnage on fine lees',
    ],
    adegaParas: [
      'The space was designed to work with maximum precision and minimum impact on the wine.',
      'Working at a human scale allows us to follow every detail — from harvest to bottling — with an attention that industrial scale would never permit.',
    ],
    rigorHeading: 'Rigour and data',
    rigorText: 'Our own weather station, unique in the region, continuously collects data on temperature, humidity, rainfall, wind and solar radiation. This data helps fine-tune decisions affecting the vineyard and deepen our understanding of the ecosystem.',
    enologoHeading: 'The Winemaker',
    enologoParas: [
      'Constantino Ramos has dedicated himself to the Vinho Verde region for nearly 15 years, building a close relationship with the vineyard and the Loureiro variety. A winemaker of attentive listening and precise action, he believes wine is born as an idea and takes shape through patience, respect and attentiveness to nature. He works at a human scale, following each plot as a living ecosystem, and advocates human intervention only insofar as it contributes to preserving the balance and freshness of the wines — respecting the grape, choosing the right moment and giving space to the identity of each wine.',
      'His focus is on fresh, food-friendly wines with identity, designed to evolve and tell an authentic story.',
      'He sees himself as a vigneron, accepting the risks and making the decisions that begin in the field and culminate in harvest — the defining moment of the year. He views wine as a process that begins long before picking, shaped by terroir and the winemaker\'s personal vision.',
    ],
    enologoClosing: 'Nothing is done for fashion. Everything is observed, tested and adopted only if it serves the origin, the time and the singularity of the wine.',
    enologoName:    'Constantino Ramos',
    enologoRole:    'Winemaker',
  },
  enoturismoPage: {
    title: 'Wine Tourism',
    intro: 'At Casa de Nabais, wine tourism in the Lima Valley is lived authentically and intimately. Between the historic manor, the vineyards, the winery and the table, each experience allows you to understand wine from its very origin. Guided tastings, guided tours, seasonal gastronomy and stays in the heart of nature reveal an estate where Loureiro, the land and time define the rhythm.',
    provasHeading: 'Wine tastings',
    provasParas: [
      'At Casa de Nabais, wine tastings are always led by those who make the wine — the producer, the winemaker or a member of the technical team — ensuring that each wine tasted is explained from the perspective of the vineyard, the soil and the winemaking decisions that shaped it.',
      'Loureiro, the estate\'s central variety, is the guiding thread of these tastings, with its distinctive aromatic expression, the floral notes of white rose, orange blossom and orange leaf, the subtle touch of bay laurel and, on the palate, the same crisp note of orange blossom and leaf alongside a vibrant, very fresh acidity.',
    ],
    visitasHeading: 'Guided tours',
    visitasParas: [
      'Guided visits to the winery and vineyards of Casa de Nabais are always led by those who live the estate every day and know every detail of what is done here.',
      'The tour allows guests to discover the direct relationship between vineyard and winery, and to understand, for example, the importance of hand-harvested grapes that reach the press within minutes, or the ongoing work around the Loureiro variety and the estate\'s different soils.',
    ],
    almocosHeading: 'Lunches and gastronomic experiences',
    almocosParas: [
      'The gastronomy of Casa de Nabais is born from its own ecosystem. From the kitchen garden to the kitchen, from the orchard to the table, each meal reflects the season and what the estate produces at that time. Fresh fruit, cider, marmalade, vegetables and aromatic herbs may be served to guests or featured in wine menus designed to pair with the estate\'s wines.',
      'Lunches and gastronomic experiences are available by reservation, celebrating a simple, honest cuisine deeply connected to this place, where the dishes of the Minho region take pride of place.',
    ],
    passeiosHeading: 'Walks in the woodland',
    passeiosParas: [
      'The walks through the woodland of Casa de Nabais begin in the vineyards, among leaves and grapes that will soon become wine. On a fresh morning or a calm afternoon, you cross the vineyard into the forest along gentle paths, to the sound of the Lima River and the comforting scent of damp earth. The native flora lines the way and, at times, the pair of eagles that nest there — one of many local wildlife species — glides silently overhead.',
      'A walk to slow down, feel the authentic Minho and discover the natural harmony that sustains the whole estate.',
    ],
  },
  ficarNaCasaPage: {
    title:           'Stay at the Estate',
    intro:           'The historic manor of Casa de Nabais welcomes guests to a unique rural boutique accommodation experience, where modern comfort coexists with centuries of history. Set among vineyards and gardens, just 6 km from Ponte de Lima.',
    bedroomsLabel:   'bedrooms',
    guestsLabel:     'guests',
    bathsLabel:      'bathrooms',
    amenitiesHeading: 'Amenities',
    amenities: [
      'Spa',
      'Turkish Bath',
      'Gym',
      'Swimming pool',
      'Electric car charger',
      'Wood-fired oven',
      'Outdoor barbecue',
      'Chapel',
    ],
    activitiesHeading: 'Activities',
    activitiesLinkText: 'Learn more about activities in the Lima Valley at',
    activities: [
      'Wine tastings',
      'Guided tours of the vineyards and winery',
      'Lunches and gastronomic experiences',
      'Walking trails through the woodland and vineyards',
      'Golf and tennis (nearby)',
    ],
    locationHeading: 'Location',
    locationIntro:   'Casa de Nabais is located in the Seara parish, in Ponte de Lima, at the heart of the Minho region. The property benefits from a privileged position, just a few kilometres from the historic centre of Ponte de Lima and well connected by the main access roads.',
    nearbyCitiesHeading: 'Distances',
    nearbyRoadsHeading:  'Main road access',
    nearbyTrainsHeading: 'Nearest train stations',
    nearbyRoads: [
      'A3 – Porto - Minho - Galicia corridor (main access to the property)',
      'A27 – Ponte de Lima - Viana do Castelo - A28 link',
      'A28 – Viana do Castelo - Porto coastal corridor',
      'AP-9 (Spain) – Vigo - Pontevedra - Santiago - A Coruña',
    ],
    winesHeading:   'Our wines',
    winesIntro:     'Produced exclusively from estate-grown grapes, on a small scale, the wines of Casa de Nabais are fresh, food-friendly and crafted to evolve.',
    winesSubtitle:  'Available for tasting and purchase during your stay.',
    bookingHeading:    'Book',
    bookingSubheading: 'Availability request',
    bookingButton:     'Check availability',
    formName:     'Name',
    formEmail:    'Email',
    formPhone:    'Phone',
    formCheckIn:  'Check-in',
    formCheckOut: 'Check-out',
    formGuests:   'Guests',
    formMessage:  'Message (optional)',
    formSubmit:   'Send request',
    formSuccess:  'Request sent',
    formSuccessMsg: 'We will be in touch shortly to confirm availability.',
    formError:    'Error sending',
    formErrorMsg: 'Please try again or contact us directly.',
    formSending:  'Sending…',
  },
  wineDetail: {
    vintagesLabel:         'Vintages',
    aboutWineLabel:        'About this wine',
    techInfoLabel:         'Technical Info',
    tastingNotesLabel:     'Tasting Notes',
    servingSuggestionLabel:'Serving Suggestion',
    keyPointsLabel:        'Key Points',
    techLabels: {
      region:             'Region',
      subRegion:          'Sub-region',
      varieties:          'Variety',
      alcohol:            'Alcohol',
      totalAcidity:       'Total Acidity',
      ph:                 'pH',
      residualSugar:      'Residual Sugar',
      servingTemperature: 'Serving Temperature',
    },
    tastingLabels: {
      color:  'Colour',
      aroma:  'Aroma',
      palate: 'Palate',
    },
    sectionIconKeys: {
      terroir:        'Terroir',
      viticulture:    'Viticulture',
      winemaking:     'Winemaking',
      ageing:         'Ageing',
      ageingPotential:'Ageing Potential',
    },
  },
}
