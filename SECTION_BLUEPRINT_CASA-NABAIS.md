# SECTION BLUEPRINT — Casa de Nabais
*Mapa de referências visuais por secção*
v1.0 · 2026-04-23

---

## 0. Meta

| Campo | Valor |
|---|---|
| Nome do projecto | casa-nabais-site |
| Foundation | LANDING |
| PRD associado | PRD_CASA-NABAIS.md |
| VIBE-PRD associado | VIBE-PRD_CASA-NABAIS.md |
| Data | 2026-04-23 |
| Versão | v1.0 |
| Páginas cobertas | Homepage · As Vinhas · Ficar na Casa |

---

# PÁGINA 1 — HOMEPAGE

---

## SECÇÃO 1.1 — Navbar

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Navegação global — sempre visível, nunca intrusiva |
| Posição | Sticky top, z-index 100, aparece em todas as páginas |
| Copy | Logo: "CASA DE NABAIS" · Links: A Casa / As Vinhas / A Vinificação / Os Vinhos / O Enoturismo · CTAs: "Ficar na Casa" (ícone casa) + "Comprar Vinho" (ícone garrafa) |
| Elementos | Logo esquerda · Links centro · CTAs direita · Hamburger em mobile |
| Mobile | Menu overlay full-screen com fundo verde escuro blur, links grandes em Joan |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/navbar — filtrar por "transparent" ou "glassmorphism" |
| O que vamos pegar | Estrutura: logo esquerda + links centro + CTAs direita. Comportamento sticky. |
| O que NÃO vamos pegar | Mega menus, dropdowns, cores e fontes default |

### Referência de Ambição

| Campo | Valor |
|---|---|
| URL | https://www.aesop.com — navbar minimalista, texto pequeno, sem elementos a competir |
| O que capturar | Leveza — a navbar existe sem se impor |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Sólido ou transparente | `linear-gradient(180deg, rgba(12,69,68,0.90) 0%, rgba(5,38,37,0.90) 99.52%)` com `backdrop-filter: blur(22px)` |
| Logo | Imagem ou texto genérico | "CASA DE NABAIS" em Joan, uppercase, tracking 0.15em, cor `#FAE6C1` |
| Links | Sans-serif default | Joan 15px, cor `#FFF9ED`, hover → `#FAE6C1`, transition 0.2s |
| CTAs | Botões com border-radius | CTAs com ícone SVG (casa / garrafa) + texto, sem fundo ou com fundo verde mais escuro |
| Mobile menu | Slide sidebar | Overlay full-screen, fundo `rgba(3,29,29,0.95)` + blur, links em Joan 40–48px |

### Camada de Motion

| Animação | Padrão | Especificação |
|---|---|---|
| Entrada inicial | Fade down | `y: -10, opacity: 0, duration: 0.6, ease: power2.out` — ao carregar a página |
| Mobile menu open | Timeline | Overlay fade in (0.3s) → links stagger de cima para baixo (0.08s cada) |
| Mobile menu close | Timeline reversa | Links fade out → overlay fade out |

### Notas para o Claude Code

Sticky sempre — sem scroll-shrink ou mudança de cor ao scroll (o glassmorphism já funciona sobre qualquer fundo). "Comprar Vinho" deve estar visually disabled (opacity 0.5, cursor not-allowed) com tooltip "Em breve" — a loja ainda não existe. O ícone da garrafa e da casa são SVGs simples a criar inline ou em `/public/images/shared/icons/`.

---

## SECÇÃO 1.2 — Hero

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Impacto imediato — fazer o visitante sentir que chegou a um lugar diferente |
| Posição | 1ª secção após navbar, full-viewport-height |
| Copy principal | Headline: "PERTO DA TERRA, ATENTOS AO DETALHE, RESPEITANDO O TEMPO" · Sub: "Assim nascem grandes vinhos" |
| Elementos | Imagem de fundo full-bleed · Overlay escuro gradiente · Headline · Subheadline · CTA "Ficar na Casa" |
| Imagens | `/images/homepage/hero/hero-01.jpg` (landscape) · `hero-01-mobile.jpg` (portrait) |
| CTA | "Ficar na Casa" → `/ficar-na-casa` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — procurar full-screen hero com imagem de fundo e texto centrado ou alinhado à esquerda |
| O que vamos pegar | Full-viewport, imagem de fundo, overlay, headline grande, sub pequena, CTA |
| O que NÃO vamos pegar | Gradientes artificiais, badges, counters, múltiplos CTAs |

### Referência de Ambição

| Campo | Valor |
|---|---|
| URL | https://www.domainedelaromaneecontinuers.fr (qualquer editorial sobre a DRC) — headline tipográfica grande sobre imagem de vinha |
| O que capturar | A quietude. O texto existe sobre a imagem sem lutar com ela. |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Imagem | Placeholder genérico | Fotografia de vinha/solar da Casa de Nabais, luz natural |
| Overlay | Sem overlay ou sólido | `linear-gradient(to bottom, rgba(3,29,29,0.3) 0%, rgba(3,29,29,0.5) 100%)` |
| Headline | Sans-serif, centrado | Joan, `clamp(2.5rem, 6vw, 5rem)`, uppercase, tracking 0.08em, cor `#FFF9ED`, alinhado à esquerda ou centrado |
| Subheadline | Body genérico | Bespoke Serif italic, 20–24px, cor `rgba(255,249,237,0.80)` |
| CTA | Botão com border-radius | Botão outline: border `1px solid #FAE6C1`, cor `#FAE6C1`, hover: fundo `#FAE6C1`, cor `#031D1D` |
| Height | Fixed px | `min-h-screen` — 100vh |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Imagem de fundo | Ken Burns subtil | `gsap.to(imgRef, { scale: 1.06, duration: 8, ease: 'none' })` — lentíssimo, quase imperceptível |
| Headline | SplitText por linhas | `y: 40, opacity: 0, stagger: 0.08, duration: 1.0, ease: power2.out` — começa após 0.3s |
| Subheadline | Fade up | `y: 20, opacity: 0, duration: 0.8, ease: power2.out, delay: 0.7` |
| CTA | Fade up | `y: 15, opacity: 0, duration: 0.7, ease: power2.out, delay: 0.9` |
| Parallax scroll | ScrollTrigger scrub | `gsap.to(imgRef, { yPercent: -12, scrollTrigger: { scrub: 1.5 } })` — subtil |

---

## SECÇÃO 1.3 — Texto de Abertura

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Posicionamento — explicar o que é a Casa de Nabais em texto corrido |
| Posição | Imediatamente após o hero, fundo `#FFF9ED` |
| Copy | "Em Ponte de Lima, no coração do Vale do Lima, berço da casta Loureiro, a Casa de Nabais é uma quinta minhota histórica onde o vinho nasce do estudo da terra, da produção cuidada em pequena escala e se partilha através de experiências de enoturismo pensadas à medida de quem nos visita." |
| Elementos | Texto centrado, max-width contido, sem imagem |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/text — procurar "editorial text" ou "intro paragraph" |
| O que vamos pegar | Parágrafo centrado com tipografia grande, espaço generoso |
| O que NÃO vamos pegar | Colunas, ícones, badges |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Branco | `#FFF9ED` |
| Fonte | Sans-serif | Bespoke Serif, 20–24px, line-height 1.8 |
| Alinhamento | Left | Centrado |
| Max-width | Full | `max-w-[720px] mx-auto` |
| Padding | Standard | `py-24 md:py-32` |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Parágrafo | Fade up | `y: 30, opacity: 0, duration: 0.9, ease: power2.out, scrollTrigger: { start: 'top 80%' }` |

---

## SECÇÃO 1.4 — As Vinhas (preview)

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Introduzir as vinhas — convidar a saber mais |
| Posição | 4ª secção, fundo alternado `#FFF3DE` |
| Copy | Título: "As nossas vinhas" · Texto: "As vinhas da Casa de Nabais, situadas no Vale do Lima, são vinhas próprias, onde a uva é vindimada à mão e levada até à adega em poucos minutos, preservando a sua frescura e a sua origem. Aqui, a casta Loureiro encontra solo, tempo e rigor para se revelar com autenticidade." · CTA: "Saber mais" → `/as-vinhas` |
| Elementos | Título H2 · Texto · CTA · Imagem principal + carrossel de 3–4 fotos |
| Imagens | `/images/homepage/vinhas/section-01.jpg` + `carousel-01/02/03.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — procurar split layout text + image, ou https://21st.dev/s/card para carrossel |
| O que vamos pegar | Layout: texto à esquerda, imagem/carrossel à direita (desktop) · Stack vertical em mobile |
| O que NÃO vamos pegar | Fundos escuros, ícones, badges |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Layout | Grid simétrico | `grid-cols-1 lg:grid-cols-2 gap-16 items-center` |
| Título | H2 genérico | Joan, `clamp(2rem, 4vw, 3.5rem)`, cor `#031D1D` |
| CTA | Botão filled | Link underline com seta → estilo discreto, sem botão filled |
| Carrossel | Auto-play agressivo | Carrossel manual com indicadores de ponto, auto-play lento (4s) |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Título | Fade up | `y: 30, opacity: 0, duration: 0.9, scrollTrigger: { start: 'top 80%' }` |
| Texto + CTA | Fade up stagger | `y: 25, opacity: 0, stagger: 0.1, duration: 0.8` |
| Imagem | Fade in + leve scale | `scale: 1.02 → 1, opacity: 0 → 1, duration: 1.1` |

---

## SECÇÃO 1.5 — A Nossa Vinificação (preview)

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Credibilidade técnica — mostrar rigor e ciência |
| Posição | 5ª secção, fundo verde escuro `#0C4544` ou `#031D1D` |
| Copy | Título: "A nossa vinificação" · Texto: "Na Casa de Nabais vinificação é sinónimo de investigação contínua. Começa na vinha, respeita a uva e intervém apenas quando necessário. Trabalhamos com precisão, ciência e curiosidade, para revelar a identidade e as singularidades da casta Loureiro." · Destaque: "O nosso objetivo é criar equilíbrio desde o início, para que, mais tarde, o vinho necessite do mínimo de intervenção possível." · CTA: "Saber mais" → `/a-vinificacao` |
| Elementos | Título + texto · Fotografia full-bleed · Texto destaque |
| Imagens | `/images/homepage/vinificacao/fullbleed-01.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — full-bleed image section com texto sobre/abaixo |
| O que vamos pegar | Secção escura com imagem full-bleed e texto em overlay ou abaixo |
| O que NÃO vamos pegar | Gradientes artificiais, ícones tech |

### Referência de Ambição

| Campo | Valor |
|---|---|
| URL | https://www.aesop.com/pt/r/about/ — secções que alternam entre texto e imagem full-bleed |
| O que capturar | A transição entre fundo claro e escuro como mudança de ritmo |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Branco | Secção com fundo `#031D1D`, textos em `#FFF9ED` |
| Imagem | Thumbnail | Full-bleed, height `60vh`, object-cover |
| Destaque | Texto normal | Bespoke Serif italic, tamanho maior (22–26px), cor `#FAE6C1` |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Título + texto | Fade up | `y: 30, opacity: 0, duration: 0.9` |
| Imagem full-bleed | Parallax | `yPercent: -10, scrollTrigger: { scrub: 1.5 }` |
| Destaque | Fade up | `y: 25, opacity: 0, duration: 1.0, delay: 0.2` |

---

## SECÇÃO 1.6 — Os Nossos Vinhos (preview)

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Apresentar 2 vinhos — convidar a explorar a gama |
| Posição | 6ª secção, fundo `#FFF9ED` |
| Copy | Título: "Os nossos vinhos" · Intro: "Produzidos exclusivamente com uva própria, em pequena escala, são vinhos frescos, gastronómicos e pensados para evoluir, revelando o caráter dos solos graníticos e xistosos onde nascem." |
| Elementos | Título · Intro text · 2 cards de vinho (imagem garrafa + nome + breve descrição + botões Detalhes/Comprar) · CTA "Ver todos os vinhos" |
| Imagens | `/images/homepage/vinhos/vinha-do-pomar-bottle.png` · `loureiro-bottle.png` |
| CTAs cards | "Detalhes" → `/os-vinhos/[slug]` · "Comprar" → disabled (em breve) |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/card — product card simples |
| O que vamos pegar | Card com imagem + título + descrição curta + 2 CTAs |
| O que NÃO vamos pegar | Cards com sombras exageradas, badges de preço, ratings |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Grid | 3–4 colunas | `grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto` — só 2 vinhos |
| Card | Fundo branco com shadow | Fundo `#FFF3DE`, sem shadow, border `1px solid var(--color-border)` |
| Botão "Comprar" | Filled primary | Outline discreto, disabled com opacity 0.4 + tooltip "Em breve" |
| Botão "Detalhes" | Secondary | Link simples com seta |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Título + intro | Fade up | `y: 30, opacity: 0, duration: 0.9` |
| Cards | Fade up stagger | `y: 30, opacity: 0, stagger: 0.15, duration: 0.9` |

---

## SECÇÃO 1.7 — Conheça a Casa de Nabais (preview)

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Apresentar a quinta como destino — apelar à estadia |
| Posição | 7ª secção, fundo alternado |
| Copy | Título: "Conheça a Casa de Nabais" · Texto longo do copy · Destaque: "A Casa de Nabais é um lugar para ficar, provar e aprender. Casa, vinha, vinho e mesa unem-se num ritmo sereno..." · CTAs: "Saber mais" + "Ficar na Casa" |
| Elementos | Texto · Imagem principal · Carrossel · Texto destaque · Imagem full-screen |
| Imagens | `/images/homepage/casa/section-01.jpg` + `carousel-01/02/03.jpg` + `fullbleed-01.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — alternating content sections |
| O que vamos pegar | Secções alternadas texto/imagem com ritmo editorial |
| O que NÃO vamos pegar | Layouts de hotel genérico com estrelas e avaliações |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Layout | Simétrico | Alternar: texto esquerda/imagem direita → imagem esquerda/texto direita |
| Destaque | Texto normal | Bespoke Serif italic, destaque visual com padding lateral e border-left `#FAE6C1` |
| Carrossel | Auto-play agressivo | Manual, indicadores discretos |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Cada bloco texto | Fade up | `y: 30, opacity: 0, duration: 0.9, scrollTrigger: { start: 'top 80%' }` |
| Imagens | Scale + fade | `scale: 1.03 → 1, opacity: 0 → 1, duration: 1.1` |
| Imagem full-bleed | Parallax | `yPercent: -10, scrollTrigger: { scrub: 1.5 }` |

---

## SECÇÃO 1.8 — Enoturismo (preview)

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Apresentar as experiências disponíveis |
| Posição | 8ª secção, fundo verde `#0C4544` |
| Copy | Título: "Enoturismo" · Texto intro · Subsecções: Provas de Vinho / Visitas Guiadas / Almoços / Passeios na Mata · Destaque: "Entre solos graníticos e um raro veio de xisto, criamos vinhos com identidade e oferecemos uma experiência de enoturismo vivida com quem os faz." · CTAs: "Saber mais" + "Ficar na Casa" |
| Elementos | Imagem · Texto · Carrossel de experiências · Texto destaque |
| Imagens | `/images/homepage/enoturismo/section-01.jpg` + `carousel-01/02/03.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — dark section com imagem e texto |
| O que vamos pegar | Secção escura, imagem lado a lado com texto, carrossel de experiências |
| O que NÃO vamos pegar | Cards com preços, CTAs "Reservar agora" agressivos |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Neutro | `#0C4544` com textos em `#FFF9ED` |
| Destaque | Texto normal | Bespoke Serif italic, cor `#FAE6C1`, maior |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Imagem + texto | Fade up stagger | `y: 30, opacity: 0, stagger: 0.1, duration: 0.9` |
| Carrossel items | Fade in | Fade simples ao entrar no viewport |

---

## SECÇÃO 1.9 — Explore Também

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Cross-navigation — convidar a explorar outras páginas |
| Posição | Penúltima secção antes do footer |
| Copy | Título: "Explore também" · 4 cards: As Vinhas / A Vinificação / Os Vinhos / Ficar na Casa |
| Elementos | Grid de 4 imagens com título sobreposto e link |
| Imagens | `/images/homepage/explore/explore-vinhas.jpg` etc. |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/card — image card com overlay de texto |
| O que vamos pegar | Grid de imagens com texto em overlay, hover effect subtil |
| O que NÃO vamos pegar | Cards com sombras exageradas, descrições longas |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Grid | 3 colunas | `grid-cols-2 lg:grid-cols-4 gap-4` |
| Hover | Scale agressivo | `scale: 1.03, duration: 0.5` — subtil |
| Overlay | Fundo sólido | `linear-gradient(to top, rgba(3,29,29,0.7) 0%, transparent 60%)` |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Cards | Fade up stagger | `y: 25, opacity: 0, stagger: 0.08, duration: 0.8` |
| Hover imagem | CSS puro | `transform: scale(1.03), transition: 0.5s ease` |

---

## SECÇÃO 1.10 — Footer

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Contactos, navegação secundária, copyright |
| Posição | Última secção |
| Copy | Morada: "Seara, Ponte de Lima" · Email: info@casadenabais.pt · Links de navegação · Copyright |
| Elementos | Logo grande "CASA DE NABAIS" · 3 colunas: morada+contacto / links / redes sociais · Copyright |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/footer — footer com logo grande e colunas |
| O que vamos pegar | Logo grande centrado ou à esquerda, colunas de links, copyright |
| O que NÃO vamos pegar | Newsletter input, elementos de conversão no footer |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Neutro | `#031D1D` com textos em `#FFF9ED` |
| Logo | Texto pequeno | "CASA DE NABAIS" em Joan, grande (48–64px), cor `#FAE6C1`, centrado ou ocupando toda a largura em opacity baixa (watermark) |
| Links | Sans-serif | Bespoke Serif ou Joan small-caps |

---

# PÁGINA 2 — AS VINHAS

---

## SECÇÃO 2.1 — Hero / Header

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Contextualizar a página — imagem de impacto + título |
| Copy | Título: "AS VINHAS" · Intro: "Na Casa de Nabais, as vinhas começaram muito antes de o serem..." (texto completo do PRD) |
| Imagens | `/images/as-vinhas/hero/hero-01.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — page hero com título grande e imagem |
| O que vamos pegar | Imagem de fundo ou ao lado com título grande em Joan |
| O que NÃO vamos pegar | Breadcrumbs genéricos, subtítulos redundantes |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Layout | Full-bleed | Imagem full-bleed com overlay + título centrado, ou imagem à direita com título à esquerda (ver mockup Figma) |
| Título | H1 genérico | Joan, `clamp(3rem, 7vw, 6rem)`, uppercase, cor `#FFF9ED` sobre imagem |
| Intro | Abaixo do hero | Bespoke Serif 18px, `max-w-[680px]`, fundo `#FFF9ED`, padding generoso |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Título | SplitText linhas | `y: 40, opacity: 0, stagger: 0.06, duration: 1.0` |
| Imagem | Parallax | `yPercent: -12, scrollTrigger: { scrub: 1.5 }` |
| Intro text | Fade up | `y: 30, opacity: 0, duration: 0.9` |

---

## SECÇÃO 2.2 — O Solo Como Origem

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Explicar a abordagem científica ao solo |
| Copy | Título: "O solo como origem" · Texto completo do PRD |
| Imagens | `/images/as-vinhas/sections/solo-01.jpg` + `solo-02.jpg` + `solo-03.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — alternating text/image |
| O que vamos pegar | Texto à esquerda com imagem(ns) à direita, layout editorial |
| O que NÃO vamos pegar | Grid uniforme de thumbnails |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Texto | Fade up | `y: 30, opacity: 0, duration: 0.9, scrollTrigger: { start: 'top 80%' }` |
| Imagens | Fade in stagger | `opacity: 0, stagger: 0.15, duration: 1.0` |

---

## SECÇÃO 2.3 — Vinhas Como Campo de Estudo + Viticultura Integrada

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Aprofundar a metodologia vitícola |
| Copy | 2 subsecções: "Vinhas como campo de estudo" + "Viticultura integrada" com textos do PRD |
| Destaque | "Trabalhamos o solo como um ecossistema vivo, onde sustentabilidade ambiental e qualidade caminham juntas." |
| Imagens | `/images/as-vinhas/carousel/carousel-01/02/03/04.jpg` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/text — editorial text blocks |
| O que vamos pegar | Blocos de texto com títulos em Joan, corpo em Bespoke Serif, destaque visual destacado |
| O que NÃO vamos pegar | Listas com bullets, ícones |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Destaque | Texto normal | Quote-style: border-left `3px solid #FAE6C1`, padding-left, Bespoke Serif italic, tamanho maior |

---

## SECÇÃO 2.4 — As Nossas Vinhas (4 parcelas)

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Apresentar cada parcela com identidade própria |
| Copy | 4 vinhas: Vinha do Pomar / Vinha da Adega / Vinha da Igreja / Vinha Talhão de Xisto — textos completos do PRD |
| Imagens | `/images/as-vinhas/vinhas/pomar-01.jpg` · `adega-01.jpg` · `igreja-01.jpg` · `xisto-01.jpg` |
| Fundo | Secção escura `#031D1D` ou `#0C4544` |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/card — cards com imagem + título + texto |
| O que vamos pegar | Alternância de layout: imagem esquerda/direita por vinha — não grid uniforme |
| O que NÃO vamos pegar | Cards idênticos em grid simétrico |

### Referência de Ambição

| Campo | Valor |
|---|---|
| URL | Qualquer grande domaine bourguignon com apresentação de parcelas |
| O que capturar | Cada parcela tem personalidade. O layout muda ligeiramente para cada uma. |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Neutro | Fundo escuro `#031D1D`, textos `#FFF9ED`, bordas `rgba(250,230,193,0.30)` |
| Layout | Grid uniforme | Alternating: Pomar (img esq) → Adega (img dir) → Igreja (img esq) → Xisto (img dir) |
| Título vinha | H3 genérico | Joan uppercase, `#FAE6C1` |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Cada vinha | Fade up alternado | Imagem e texto entram separados com leve stagger `0.1s` |

---

# PÁGINA 3 — FICAR NA CASA

---

## SECÇÃO 3.1 — Hero

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Criar desejo de estadia imediato |
| Copy | Título: "FICAR NA CASA" / "CASA DE NABAIS" · Sub: "Seara, Ponte de Lima" |
| Imagens | `/images/ficar-na-casa/hero/hero-01.jpg` (interior ou exterior do solar) |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — full-screen com imagem e título |
| O que vamos pegar | Full-viewport, imagem de qualidade, título em overlay |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Tom | Impacto visual genérico | Warmth — imagem interior com luz dourada, lareira, espaço sereno |
| Título | H1 único | 2 linhas: "CASA DE NABAIS" (Joan small, label) + "FICAR NA CASA" (Joan grande) |

### Camada de Motion

| Animação | Padrão GSAP | Especificação |
|---|---|---|
| Título | SplitText | `y: 40, opacity: 0, stagger: 0.06, duration: 1.0` |
| Imagem | Ken Burns | `scale: 1.04 → 1.08, duration: 10, ease: none` (muito lento) |

---

## SECÇÃO 3.2 — Intro + Capacidade

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Descrever o alojamento + mostrar capacidade/tipologia |
| Copy | Texto intro completo do PRD · Capacidade: até 12 pessoas · Alojamento: 5 suites + 1 apartamento · Casas de banho: 7 |
| Imagens | `/images/ficar-na-casa/quartos/suite-01.jpg` etc. |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/hero — split text + image |
| O que vamos pegar | Texto à esquerda com spec items, galeria à direita |
| O que NÃO vamos pegar | Tabelas de preços nesta secção, botões "Reservar agora" agressivos |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Specs (capacidade, etc.) | Tabela | 3 items em linha: ícone + label + valor, espaçamento generoso, sem borders |

---

## SECÇÃO 3.3 — Formulário de Lead Capture

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Capturar leads qualificados para reservas |
| Copy | Título: "Verificar disponibilidade" · Sub: "Envie-nos as suas datas e entraremos em contacto para confirmar disponibilidade e detalhes da sua estadia." |
| Campos | Nome · Email · Telefone (opcional) · Data chegada · Data saída · Nº pessoas · Mensagem |
| CTA | "Enviar pedido" |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/form — contact form simples |
| O que vamos pegar | Layout de form com campos claros, validação inline, feedback de sucesso |
| O que NÃO vamos pegar | Multi-step wizard, progress bars, designs tech |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Fundo | Branco | Fundo `#FFF3DE` com border suave ou fundo `#0C4544` para contraste |
| Inputs | Border padrão | Border `1px solid var(--color-border)`, fundo `#FFF9ED`, focus: border `#0C4544` |
| Botão submit | Filled genérico | Fundo `#0C4544`, texto `#FAE6C1`, hover: `#031D1D` |
| Success state | Alert genérico | Mensagem inline elegante: ícone check + texto em Bespoke Serif |

### Notas para o Claude Code

O form faz POST para `NEXT_PUBLIC_APPS_SCRIPT_URL` (Google Apps Script). Validação client-side com estados: idle → loading → success → error. Loading state: botão disabled + spinner subtil. Nunca recarregar a página — tudo gerido em estado React.

---

## SECÇÃO 3.4 — Comodidades e Atividades

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Listar o que está disponível — sem oversell |
| Copy | 2 colunas: "Comodidades" (lavandaria, cozinha, spa, sauna, piscina, etc.) + "Atividades e Experiências" (provas, visitas, percursos, golfe, etc.) |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/card — feature list |
| O que vamos pegar | 2 colunas de listas com ícone + texto |
| O que NÃO vamos pegar | Ícones coloridos, badges, destaque excessivo |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Ícones | Lucide coloridos | SVG simples monocromáticos ou apenas bullet point `–` em `#FAE6C1` |

---

## SECÇÃO 3.5 — Localização

### Conteúdo

| Campo | Valor |
|---|---|
| Objectivo | Facilitar o planeamento da deslocação |
| Copy | Texto de acessos + tabela de distâncias (cidades principais + aeroportos) do PRD |
| Elementos | Texto + mapa estático (Google Maps embed ou imagem estática) |

### Referência Visual

| Campo | Valor |
|---|---|
| Componente 21st.dev | https://21st.dev/s/card — info cards com mapa |
| O que vamos pegar | Mapa ao lado de tabela de distâncias |

### Adaptações

| Aspecto | Base | Adaptação |
|---|---|---|
| Mapa | Google Maps embed | Mapa estático com pin — ou Google Maps embed com estilos personalizados (tons verdes/sépia) |
| Tabela distâncias | HTML table genérica | 2 colunas sem bordas visíveis — apenas linha de separação subtil |

---

## SECÇÃO 3.6 — Explore Também (shared)

*(Igual à secção 1.9 da Homepage — componente reutilizável)*

---

## SECÇÃO 3.7 — Footer (shared)

*(Igual à secção 1.10 da Homepage — componente reutilizável)*

---

# Checklist de Validação

- [x] Todas as secções das 3 páginas têm entrada neste documento
- [x] Cada entrada tem referência 21st.dev indicada
- [x] O copy real está definido (vem do PRD e dos textos do cliente)
- [x] As adaptações de tipografia e cor estão documentadas
- [x] A camada de motion está especificada com padrões GSAP concretos
- [x] As referências visuais são coerentes com as palavras-guia do VIBE-PRD (sereno, enraizado, preciso)
- [x] Imagens identificadas por path estruturado
- [x] Responsividade: mobile anotado nas secções críticas
- [x] Ordem das secções definida — é a ordem de implementação

---

# Ordem de Implementação

1. Setup do projecto (FOUNDATION steps 1–7)
2. globals.css — design tokens completos
3. Navbar (componente partilhado)
4. Footer (componente partilhado)
5. Homepage — Hero (1.2)
6. Homepage — Texto de abertura (1.3)
7. Homepage — As Vinhas preview (1.4)
8. Homepage — Vinificação preview (1.5)
9. Homepage — Vinhos preview (1.6)
10. Homepage — Casa preview (1.7)
11. Homepage — Enoturismo preview (1.8)
12. Homepage — Explore também (1.9)
13. As Vinhas — Hero (2.1)
14. As Vinhas — Solo (2.2)
15. As Vinhas — Metodologia (2.3)
16. As Vinhas — 4 Parcelas (2.4)
17. Ficar na Casa — Hero (3.1)
18. Ficar na Casa — Intro (3.2)
19. Ficar na Casa — Formulário (3.3)
20. Ficar na Casa — Comodidades (3.4)
21. Ficar na Casa — Localização (3.5)

---

*SECTION_BLUEPRINT_CASA-NABAIS.md · v1.0 · 2026-04-23*
