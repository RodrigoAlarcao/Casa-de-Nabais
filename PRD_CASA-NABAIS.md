# PRD — Casa de Nabais
*Product Requirements Document*
v1.0 · 2026-04-23

---

## 0. Meta do Projecto

| Campo | Valor |
|---|---|
| Nome do projecto | casa-nabais-site |
| Tipo | Landing page / Site institucional com enoturismo e lead capture |
| Foundation a usar | FOUNDATION_LANDING.md |
| VIBE-PRD associado | VIBE-PRD_CASA-NABAIS.md |
| Autor | Rodrigo Mendes |
| Data | 2026-04-23 |
| Versão PRD | v1.0 |
| Status | Em desenvolvimento |

---

## 0.1 Derogações ao FOUNDATION

| Regra do FOUNDATION | Derogação aplicada | Justificação |
|---|---|---|
| Proibido: Inter, Roboto, Arial, Space Grotesk | Usar Joan (títulos) + Bespoke Serif (body) | Joan é serif elegante e característica; Bespoke Serif é serif de leitura — pairing coerente com identidade de quinta histórica |
| GSAP primário | Manter GSAP mas com intensidade reduzida | Animações devem ser subtis (legato) — não chamar atenção, acompanhar o conteúdo |
| Sem shadcn/ui por defeito | Pode usar shadcn/ui para o formulário de lead capture | Formulário com campos, validação e feedback de estado |

---

## 1. Contexto e Objectivo

### 1.1 O problema ou oportunidade

A Casa de Nabais é uma quinta histórica no Vale do Lima com produção própria de vinho Loureiro e oferta de enoturismo. Não tem presença digital à altura da qualidade do produto. O site deve comunicar a identidade da quinta — rigor, autenticidade, territorialidade — e gerar leads qualificados para as estadias.

### 1.2 A solução

Site institucional com 3 páginas iniciais (Homepage, As Vinhas, Ficar na Casa), elegante e editorial, com animações subtis de scroll e lead capture funcional ligado a Google Sheets.

### 1.3 Público-alvo

| Segmento | Descrição |
|---|---|
| Primário | Apreciadores de vinho (35–60 anos) que procuram experiências autênticas de enoturismo em Portugal |
| Secundário | Compradores de vinho premium nacionais e internacionais |
| Terciário | Jornalistas, sommeliers e influenciadores do setor vínico |
| Excluído | Turismo de massas, compras impulsivas, clientes sem interesse em terroir |

### 1.4 Objectivos de sucesso

- Site publicado com domínio próprio em menos de 4 semanas
- Lighthouse Performance > 90 em mobile
- Lead capture funcional com dados a entrar no Google Sheets
- Animações de scroll subtis e elegantes em todas as secções principais
- Estrutura de imagens organizada para facilitar substituição posterior

---

## 2. Identidade Visual

### 2.1 Tom e Personalidade

| Atributo | Definição |
|---|---|
| Tom visual | Editorial / Orgânico — luxo discreto, não ostentação |
| Emoção alvo | "Estou num lugar que tem história e sabe o que faz" |
| Elemento mais memorável | As transições suaves entre secções com imagens a respirar |
| Tema | Light mode — fundo creme quente, não branco |

### 2.2 Tipografia

| Papel | Fonte | Fonte Google/Fontshare |
|---|---|---|
| Display / Títulos H1, H2 | Joan | Google Fonts (gratuita) |
| Body / Texto corrido, H3, H4 | Bespoke Serif | Fontshare (gratuita comercial) |
| Labels / Navbar / Caps | Joan (pequeno, letterspacing) | Google Fonts |

**Nota:** Bespoke Serif carrega via `@font-face` com os ficheiros locais em `/public/fonts/` — não está no Google Fonts. Fazer download de fontshare.com antes de começar.

**Hierarquia tipográfica:**
- H1: Joan, 72–96px (clamp), weight 400, tracking -0.02em
- H2: Joan, 48–64px (clamp), weight 400
- H3: Bespoke Serif, 24–32px, weight 400
- Body: Bespoke Serif, 16–18px, weight 400, line-height 1.7
- Label/caps: Joan, 11–12px, uppercase, tracking 0.15em
- Navbar links: Joan, 15px, weight 400

### 2.3 Paleta de Cores

| Papel | Hex | Uso |
|---|---|---|
| Background principal | `#FFF9ED` | Fundo das páginas em modo "claro" |
| Background secundário | `#FFF3DE` | Cards, secções alternadas |
| Verde principal (Main Green) | `#0C4544` | Navbar, secções escuras, CTAs primários |
| Verde escuro | `#052625` | Navbar gradient end, footer |
| Verde muito escuro | `#031D1D` | Overlays, sombras escuras |
| Dourado/creme | `#FAE6C1` | Detalhes, borders, ícones na navbar |
| Texto principal | `#031D1D` | H1, H2, body em fundo claro |
| Texto secundário | `#3A5B4F` | Subtítulos, labels em fundo claro |
| Texto em fundo escuro | `#FFF9ED` | Textos sobre fundo verde |
| Border | `rgba(3, 29, 29, 0.12)` | Separadores em fundo claro |
| Border claro | `rgba(250, 230, 193, 0.60)` | Separadores em fundo escuro |

**CSS Variables (globals.css):**
```css
:root {
  --color-bg: #FFF9ED;
  --color-bg-alt: #FFF3DE;
  --color-green: #0C4544;
  --color-green-dark: #052625;
  --color-green-deep: #031D1D;
  --color-gold: #FAE6C1;
  --color-text: #031D1D;
  --color-text-muted: #3A5B4F;
  --color-text-light: #FFF9ED;
  --color-border: rgba(3, 29, 29, 0.12);
  --color-border-light: rgba(250, 230, 193, 0.60);
  --font-display: 'Joan', serif;
  --font-body: 'Bespoke Serif', serif;
}
```

### 2.4 Referências Visuais

- **aesop.com** — tipografia serif, fundo creme, product shot limpo
- **domainedelaromaneeconomti.fr** — hierarquia tipográfica extrema, espaço negativo
- **famillemary.fr** — produto artesanal com seriedade editorial

---

## 3. Estrutura e Conteúdo

### 3.1 Mapa de Páginas (Fase 1)

| Rota | Descrição | Status |
|---|---|---|
| `/` | Homepage | Fase 1 |
| `/as-vinhas` | Página das Vinhas | Fase 1 |
| `/ficar-na-casa` | Lead capture para estadias | Fase 1 |
| `/a-casa` | História e pessoas | Fase 2 |
| `/a-vinificacao` | Vinificação e enólogo | Fase 2 |
| `/os-vinhos` | Lista de vinhos | Fase 2 |
| `/os-vinhos/[slug]` | Detalhe de vinho | Fase 2 |
| `/o-enoturismo` | Experiências de enoturismo | Fase 2 |
| `/comprar-vinhos` | Redirect para loja externa (disabled) | Fase 3 |

### 3.2 Homepage — Estrutura de Secções

| # | Secção | Objectivo |
|---|---|---|
| 1 | Navbar | Logo + navegação + CTAs Ficar na Casa / Comprar Vinho |
| 2 | Hero | Impacto imediato — headline + subheadline + CTA |
| 3 | Text intro | Parágrafo de abertura — posicionamento da quinta |
| 4 | As Vinhas | Título + texto + imagem / carrossel de vinhas |
| 5 | A Nossa Vinificação | Título + texto + fotografia full-bleed + texto |
| 6 | Os Nossos Vinhos | Título + intro + 2 cards de vinho com Detalhes/Comprar |
| 7 | Conheça a Casa de Nabais | Texto + imagem / carrossel / texto / imagem full-bleed |
| 8 | Enoturismo | Imagem + texto / carrossel / texto |
| 9 | Explore também | Grid de links para outras secções |
| 10 | Footer | Morada, contactos, links, copyright |

### 3.3 As Vinhas — Estrutura de Secções

| # | Secção | Objectivo |
|---|---|---|
| 1 | Navbar | — |
| 2 | Hero/Header | Título "As Vinhas" + texto introdutório |
| 3 | O solo como origem | Texto + imagens |
| 4 | Vinhas como campo de estudo | Texto |
| 5 | Viticultura integrada | Texto |
| 6 | As Nossas Vinhas | 4 vinhas: Pomar, Adega, Igreja, Talhão de Xisto |
| 7 | Explore também | Grid de links |
| 8 | Footer | — |

### 3.4 Ficar na Casa — Estrutura de Secções

| # | Secção | Objectivo |
|---|---|---|
| 1 | Navbar | — |
| 2 | Hero | Imagem da casa + título |
| 3 | Intro | Texto descritivo + capacidade/unidades |
| 4 | Comodidades | Lista de comodidades + atividades |
| 5 | Formulário de reserva | Lead capture: datas, nº pessoas, contacto |
| 6 | Localização | Texto de acessos + mapa estático |
| 7 | Explore também | Grid de links |
| 8 | Footer | — |

---

## 4. Animações — Regras Globais

### 4.1 Filosofia de Motion

**Legato, não staccato.** As animações devem acompanhar o scroll como respiração — nunca como saltos ou pops. O visitante não deve notar as animações; deve sentir que o site flui naturalmente.

### 4.2 Acessibilidade

`prefers-reduced-motion`: se activo, desactivar todas as animações GSAP. Mostrar estado final com `gsap.set`. Os conteúdos são funcionais sem animação.

### 4.3 Regras Globais de Motion

- Parallax em imagens hero: subtil, máximo `yPercent: -15` (não -30 como o padrão FOUNDATION)
- Scroll reveals: `y: 30` (não 40–60) — movimento pequeno, suave
- Duração: 0.9–1.1s para elementos de conteúdo, 0.6s para labels e detalhes
- Easing: `power2.out` para tudo — suave e orgânico
- Stagger: 0.08–0.10s entre elementos consecutivos
- Cursor custom: **não usar** — desnecessário para este perfil
- Magnetic buttons: **não usar** — muito tecnológico para o tom

---

## 5. Estrutura de Ficheiros — Imagens

```
public/
  fonts/
    BespokeSerif-Regular.woff2
    BespokeSerif-Italic.woff2
    BespokeSerif-Medium.woff2
  images/
    homepage/
      hero/
        hero-01.jpg          ← imagem principal do hero
        hero-01-mobile.jpg   ← versão mobile (portrait)
      vinhas/
        section-01.jpg       ← texto + imagem
        carousel-01.jpg      ← carrossel
        carousel-02.jpg
        carousel-03.jpg
      vinificacao/
        fullbleed-01.jpg     ← fotografia full-screen
        section-01.jpg
      vinhos/
        vinha-do-pomar-bottle.png
        loureiro-bottle.png
      casa/
        section-01.jpg
        carousel-01.jpg
        carousel-02.jpg
        carousel-03.jpg
        fullbleed-01.jpg
      enoturismo/
        section-01.jpg
        carousel-01.jpg
        carousel-02.jpg
        carousel-03.jpg
      explore/
        explore-vinhas.jpg
        explore-vinificacao.jpg
        explore-vinhos.jpg
        explore-enoturismo.jpg
    as-vinhas/
      hero/
        hero-01.jpg
        hero-01-mobile.jpg
      sections/
        solo-01.jpg
        solo-02.jpg
        solo-03.jpg
      carousel/
        carousel-01.jpg
        carousel-02.jpg
        carousel-03.jpg
        carousel-04.jpg
      vinhas/
        pomar-01.jpg
        adega-01.jpg
        igreja-01.jpg
        xisto-01.jpg
    ficar-na-casa/
      hero/
        hero-01.jpg
        hero-01-mobile.jpg
      quartos/
        suite-01.jpg
        suite-02.jpg
        suite-03.jpg
        apartamento-01.jpg
      espacos/
        piscina-01.jpg
        spa-01.jpg
        sala-01.jpg
    shared/
      icons/
        icon-bottle.svg
        icon-home.svg
        icon-arrow.svg
        icon-chevron.svg
      logo/
        logo-light.svg       ← para fundo escuro (verde)
        logo-dark.svg        ← para fundo claro (creme)
```

---

## 6. Lead Capture — Ficar na Casa

### 6.1 Stack técnica

**Google Apps Script + Google Sheets** (gratuito, sem conta externa necessária).

- Formulário em Next.js faz POST para Apps Script Web App URL
- Apps Script escreve os dados numa Google Sheet do cliente
- Resposta de sucesso/erro em JSON
- Não há backend próprio — zero custo operacional

### 6.2 Campos do formulário

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome | text | Sim |
| Email | email | Sim |
| Telefone | tel | Opcional |
| Data de chegada | date | Sim |
| Data de saída | date | Sim |
| Número de pessoas | select (1–12) | Sim |
| Mensagem | textarea | Opcional |

### 6.3 Variáveis de Ambiente

```env
NEXT_PUBLIC_SITE_URL=https://casadenabais.pt
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/[ID]/exec
```

---

## 7. Funcionalidades e Requisitos

### 7.1 Must Have (Fase 1)

- Homepage completa com todas as secções
- Página As Vinhas completa
- Página Ficar na Casa com formulário funcional
- Navbar responsiva com menu hamburger em mobile
- Parallax subtil em imagens hero e full-bleed
- Scroll reveals em textos e imagens
- Lead capture a escrever em Google Sheets
- Deploy no Vercel com domínio casadenabais.pt
- Lighthouse Performance > 90

### 7.2 Should Have (Fase 2)

- Páginas A Casa, A Vinificação, Os Vinhos, O Enoturismo
- Páginas de detalhe de vinho
- Open Graph meta tags
- Google Analytics ou Vercel Analytics
- Sitemap.xml

### 7.3 Won't Have (Fora de scope)

- CMS
- Autenticação
- Loja própria (redirect para externa quando disponível)
- Blog
- Calendário de disponibilidade em tempo real

---

## 8. Notas Técnicas

### 8.1 Navbar

```css
/* Navbar — sticky, glassmorphism verde */
background: linear-gradient(180deg, rgba(12, 69, 68, 0.90) 0%, rgba(5, 38, 37, 0.90) 99.52%);
backdrop-filter: blur(22px);
border-bottom: 0.5px solid rgba(250, 230, 193, 0.00); /* invisível — pode tornar-se visível ao scroll */
position: sticky;
top: 0;
z-index: 100;
```

- Logo: "CASA DE NABAIS" em Joan, caps, tracking 0.15em, cor `#FAE6C1`
- Links centrais: Joan 15px, cor `#FFF9ED`, hover: `#FAE6C1` com transition 0.2s
- CTAs direita: "Ficar na Casa" (com ícone casa) + "Comprar Vinho" (com ícone garrafa)
- Mobile: hamburger menu com overlay full-screen (como nos screenshots)
- Comportamento: sempre sticky, sem scroll-shrink

### 8.2 Performance

- next/image em todas as imagens com WebP/AVIF
- Lazy loading excepto hero (priority={true})
- Fontes: Joan via next/font/google; Bespoke Serif via @font-face local
- GSAP carrega apenas em Client Components

### 8.3 SEO e Meta

| Campo | Valor |
|---|---|
| Title | Casa de Nabais — Vinho e Enoturismo no Vale do Lima |
| Description | Quinta histórica em Ponte de Lima. Produção própria de vinho Loureiro, enoturismo intimista e estadias em solar minhoto com séculos de história. |
| OG Image | /images/shared/og-image.jpg (1200×630px) |
| Canonical URL | https://casadenabais.pt |
| Lang | pt |

---

## 9. Prompt de Início para o Claude Code

```
Vou criar o site Casa de Nabais. Tens quatro documentos:

1. VIBE-PRD_CASA-NABAIS.md — identidade emocional, palavras-guia, tom: sereno, enraizado, preciso.
2. FOUNDATION_LANDING.md — stack, padrões de design, regras técnicas.
3. PRD_CASA-NABAIS.md — conteúdo, secções, paleta, tipografia, requisitos.
4. SECTION_BLUEPRINT_CASA-NABAIS.md — referência visual concreta para cada secção.

Stack: Next.js 14 + Tailwind CSS + GSAP. TypeScript sem strict mode.
Fontes: Joan (Google Fonts, títulos) + Bespoke Serif (Fontshare, body — ficheiros locais em /public/fonts/).
Paleta: fundo creme #FFF9ED, verde #0C4544, dourado #FAE6C1.
Tom de motion: LEGATO — animações subtis, y:30 máximo, parallax suave (yPercent:-15 máximo). Nada brusco.

ESTÉTICA — proibições absolutas:
- Nunca Inter, Roboto, Arial, Space Grotesk
- Nunca gradientes artificiais que não existam na natureza
- Nunca animações que chamem mais atenção do que o conteúdo

PERFORMANCE — regras fixas:
- Animar apenas transform e opacity
- next/image em todas as imagens
- next/font para Joan, @font-face para Bespoke Serif
- gsap.context().revert() em todos os cleanups

Começa pelo setup do projecto (passos 1–7 do FOUNDATION) e depois avança para a Navbar.
```

---

## CHANGELOG

| Versão | Data | Autor | Mudanças |
|---|---|---|---|
| 1.0 | 2026-04-23 | Rodrigo Mendes | Documento inicial |

*PRD_CASA-NABAIS.md · v1.0 · 2026-04-23*
