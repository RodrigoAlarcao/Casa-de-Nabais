**SECTION BLUEPRINT**

*Mapa de referências visuais por secção — o elo entre o PRD e o Claude Code*

Template · v1.0 · Rodrigo Mendes

---

| Como usar este documento |
| :---- |
| 1. Preencher **depois** do PRD e **antes** de abrir o Claude Code. |
| 2. Para cada secção do projecto, preencher uma entrada na Secção 3 com: conteúdo real, referência visual do 21st.dev, adaptações necessárias. |
| 3. Navegar as categorias do 21st.dev listadas na Secção 2 e escolher **um componente concreto** por secção. Copiar o URL. |
| 4. Entregar este documento + VIBE-PRD + FOUNDATION + PRD ao Claude Code. |
| 5. O Claude Code implementa **secção a secção**, nunca o site inteiro de uma vez. |

| ⚠ Regra fundamental: Nenhuma secção avança para código sem uma referência visual concreta. Se não encontras um componente que se aproxime do que queres, a secção não está pronta. |
| :---- |

---

# **0. Meta**

| Campo | Valor |
| :---- | :---- |
| Nome do projecto | *ex: lavande-landing* |
| Foundation | LANDING / PRODUCT |
| PRD associado | *ex: PRD_LAVANDE.md* |
| VIBE-PRD associado | *ex: VIBE-PRD_LAVANDE.md* |
| Data | YYYY-MM-DD |
| Versão | v1.0 |

---

# **1. Workflow Actualizado**

## **1.1 Onde este documento encaixa**

| Passo | Documento | O que resolve |
| :---- | :---- | :---- |
| 1. Conversa crua | — | Capturar intenção emocional |
| 2. VIBE-PRD | VIBE-PRD.md | Identidade emocional, palavras-guia, referências de sentimento |
| 3. DECISION_FRAMEWORK | DECISION_FRAMEWORK.md | Escolher LANDING ou PRODUCT |
| 4. FOUNDATION | FOUNDATION_LANDING / PRODUCT | Ler stack e padrões antes de qualquer decisão técnica |
| 5. PRD | PRD.md | Conteúdo, copy, secções, paleta, tipografia, animações pretendidas |
| **6. SECTION BLUEPRINT** | **Este documento** | **Referência visual concreta para cada secção — componente 21st.dev + adaptações** |
| 7. Claude Code | — | Implementar secção a secção, com referência concreta em mão |

## **1.2 Cadeia de Precedência (actualizada)**

| VIBE-PRD > FOUNDATION > PRD > SECTION BLUEPRINT |
| :---- |

O SECTION BLUEPRINT nunca contradiz o VIBE-PRD ou o FOUNDATION. É uma camada de **implementação visual** — traduz as decisões emocionais e técnicas dos documentos acima em referências concretas de componentes.

Se um componente do 21st.dev contradiz o tom do VIBE-PRD (ex: componente demasiado corporate para um projecto orgânico), a referência é inválida. Escolher outro.

## **1.3 Como entregar ao Claude Code**

Prompt de início (substitui o prompt da secção 9 do PRD):

```
Vou criar [nome do projecto]. Tens quatro documentos:

1. VIBE-PRD — identidade emocional, palavras-guia, tom.
2. FOUNDATION_[LANDING|PRODUCT] — stack, padrões de design, regras técnicas.
3. PRD — conteúdo, secções, paleta, tipografia.
4. SECTION_BLUEPRINT — referência visual concreta para cada secção,
   com componente 21st.dev de referência e adaptações documentadas.

Lê os quatro antes de começar. Implementa SECÇÃO A SECÇÃO,
pela ordem definida no SECTION_BLUEPRINT.
Para cada secção, usa o componente de referência como ponto de partida
e aplica as adaptações listadas.

Começa pela secção: [nome da primeira secção].
```

---

# **2. Guia de Navegação — 21st.dev**

*Categorias relevantes organizadas por tipo de secção. Usar como ponto de partida para browsing.*

## **2.1 Secções de Landing Page**

| Tipo de secção | Categoria 21st.dev | URL | Qtd |
| :---- | :---- | :---- | :---- |
| Hero | Heroes | https://21st.dev/s/hero | 73+ |
| Navegação | Navbars | https://21st.dev/s/navbar | 43+ |
| Navegação | Navigation Menus | https://21st.dev/s/navigation-menu | 11+ |
| Preços | Pricing Sections | https://21st.dev/s/pricing-section | 49+ |
| Rodapé | Footers | https://21st.dev/s/footer | 37+ |
| Testemunhos | Testimonials | https://21st.dev/s/testimonial | 15+ |
| Tipografia / Text blocks | Texts | https://21st.dev/s/text | 58+ |
| Scroll | Scroll Areas | https://21st.dev/s/scroll-area | 24+ |
| Efeitos visuais | Shaders | https://21st.dev/s/shader | 15+ |
| Vídeo | Videos | https://21st.dev/s/video | 9+ |
| Imagens | Images | https://21st.dev/s/image | 26+ |

## **2.2 Componentes UI (usáveis em qualquer secção)**

| Componente | Categoria 21st.dev | URL | Qtd |
| :---- | :---- | :---- | :---- |
| Botões | Buttons | https://21st.dev/s/button | 130+ |
| Cards | Cards | https://21st.dev/s/card | 79+ |
| Acordeões / FAQ | Accordions | https://21st.dev/s/accordion | 40+ |
| Tabs | Tabs | https://21st.dev/s/tab | 38+ |
| Carousels | Carousels | https://21st.dev/s/carousel | 16+ |
| Badges | Badges | https://21st.dev/s/badge | 25+ |
| Formulários | Forms | https://21st.dev/s/form | 23+ |
| Inputs | Inputs | https://21st.dev/s/input | 102+ |
| Modais / Dialogs | Dialogs | https://21st.dev/s/dialog | 37+ |
| Loaders | Spinner Loaders | https://21st.dev/s/spinner-loader | 21+ |
| Números / Counters | Numbers | https://21st.dev/s/number | 18+ |
| Tooltips | Tooltips | https://21st.dev/s/tooltip | 28+ |

## **2.3 Componentes Específicos PRODUCT**

| Componente | Categoria 21st.dev | URL | Qtd |
| :---- | :---- | :---- | :---- |
| Sidebars | Sidebars | https://21st.dev/s/sidebar | 10+ |
| Tabelas de dados | Tables | https://21st.dev/s/table | 30+ |
| Sign In | Sign Ins | https://21st.dev/s/sign-in | 4+ |
| Sign Up | Sign Ups | https://21st.dev/s/sign-up | 4+ |
| AI Chat interfaces | AI Chats | https://21st.dev/s/ai-chat | 30+ |
| Notificações | Notifications | https://21st.dev/s/notification | 5+ |
| File Upload | File Uploads | https://21st.dev/s/file-upload | 7+ |

## **2.4 Dicas de Browsing**

| Regra | Porquê |
| :---- | :---- |
| Não escolher o primeiro que vês | Percorrer pelo menos 15-20 componentes por categoria antes de decidir. |
| Ignorar as cores e fontes | Estás a escolher **estrutura e layout**, não estética. As cores e fontes vêm do PRD. |
| Preferir componentes com animação | Componentes com motion integrada são mais fáceis de adaptar do que adicionar animação a componentes estáticos. |
| Verificar responsividade | Abrir o componente e redimensionar. Se não se adapta bem a mobile, descartar. |
| Guardar 2-3 alternativas | Para cada secção, anotar um favorito e um backup — pode ser útil durante implementação. |

---

# **3. Blueprints por Secção**

*Copiar este template para cada secção do projecto. Preencher todos os campos antes de avançar para código.*

---

## **SECÇÃO: [Nome da Secção]**

### 3.x.1 — Conteúdo

| Campo | Valor |
| :---- | :---- |
| Objectivo da secção | *O que esta secção comunica. Uma frase.* |
| Posição na página | *ex: 1ª secção (hero) / 3ª secção / última antes do footer* |
| Copy principal | *Título, subtítulo, corpo de texto — o copy real, não placeholder* |
| Dados / elementos | *ex: 3 features com ícone + título + descrição / 4 planos de preço / 6 testemunhos* |
| Imagens necessárias | *ex: foto hero 1920×1080, 3 ícones SVG, logo do cliente* |
| CTA | *ex: "Pedir Orçamento" → link para formulário / "Ver Planos" → scroll to pricing* |

### 3.x.2 — Referência Visual

| Campo | Valor |
| :---- | :---- |
| **Componente 21st.dev** | *URL do componente escolhido — obrigatório* |
| Nome / autor | *ex: "Hero Section" by reuno-ui* |
| O que vamos pegar | *ex: Layout com imagem à direita, badge acima do título, CTA duplo* |
| O que NÃO vamos pegar | *ex: Gradiente de fundo, ícones genéricos, tipografia default* |

### 3.x.3 — Referência de Ambição (opcional mas recomendada)

*Uma referência de site real (Awwwards, Dribbble, site de marca) que mostra o nível de polish/animação pretendido. O componente 21st.dev dá a estrutura — esta referência dá o nível de qualidade.*

| Campo | Valor |
| :---- | :---- |
| URL de referência | *ex: https://www.aesop.com — hero com parallax e tipografia oversized* |
| O que capturar | *ex: A transição suave entre estados, o uso do espaço negativo* |

### 3.x.4 — Adaptações

*O que muda do componente base do 21st.dev para o resultado final.*

| Aspecto | Componente base | Adaptação para este projecto |
| :---- | :---- | :---- |
| Tipografia | *ex: Inter/system* | *ex: Cormorant Garamond display + Lora body (do PRD)* |
| Paleta | *ex: default shadcn* | *ex: cores do PRD secção 2.3* |
| Layout | *ex: centrado simétrico* | *ex: assimétrico, imagem à esquerda com bleed* |
| Espaçamento | *ex: padding standard* | *ex: py-32 md:py-40 (FOUNDATION)* |
| Responsivo | *ex: stack vertical em mobile* | *ex: manter, mas hero image esconde em <768px* |

### 3.x.5 — Camada de Motion

*Animações a adicionar sobre o componente base. Usar nomenclatura do FOUNDATION.*

| Animação | Padrão GSAP | Especificação |
| :---- | :---- | :---- |
| *ex: Entrada do título* | *ex: SplitText reveal* | *ex: Por linhas, y:60, stagger 0.08, power3.out* |
| *ex: Imagem hero* | *ex: clipPath reveal* | *ex: clip-path de 0% a 100%, duração 1.2s, scrub* |
| *ex: Badge* | *ex: Fade + slide* | *ex: y:-20, opacity:0, duration 0.6* |

### 3.x.6 — Notas para o Claude Code

*Instruções específicas que o Claude Code precisa de saber para esta secção.*

| *ex: "Manter a estrutura HTML do componente 21st.dev mas substituir todas as classes de cor pelos tokens do globals.css. Adicionar a timeline GSAP descrita acima. A imagem usa next/image com priority={true} porque é above the fold."* |
| :---- |

---

# **4. Secções Comuns — Guia Rápido de Escolha**

*Para cada tipo de secção, o que procurar no 21st.dev e o que ter em mente.*

## **4.1 LANDING — Secções Típicas**

### Loader / Preloader
- **Onde procurar:** Spinner Loaders, Shaders
- **O que procurar:** Animação de marca (não um spinner genérico). Transição para o hero.
- **Armadilha:** Loaders demasiado longos matam a experiência. Máximo 2-3s.
- **Nota Awwwards:** Loader é pontuado separadamente — investir aqui diferencia.

### Navbar / Navegação
- **Onde procurar:** Navbars, Navigation Menus
- **O que procurar:** Estrutura (logo left + links center + CTA right é o padrão). Comportamento ao scroll (fixed? shrink? esconde?). Menu mobile (hamburger? full-screen overlay?).
- **Armadilha:** Navbars com mega-menus complexos raramente fazem sentido em landing pages.
- **Decisão chave:** Transparente sobre o hero vs fundo sólido desde o início.

### Hero
- **Onde procurar:** Heroes (principal), Images, Videos, Shaders, Texts
- **O que procurar:** Composição (imagem + texto, full-screen, split). Hierarquia (badge → título → sub → CTA). Impacto visual imediato.
- **Armadilha:** Heroes sem imagem ou visual forte são desvantagem competitiva (ref: FOUNDATION 4.1).
- **Decisão chave:** Hero com imagem de fundo vs hero com imagem lateral vs hero tipográfico puro.

### Social Proof / Logos
- **Onde procurar:** Cards, Images, Carousels
- **O que procurar:** Marquee de logos, grid de logos com hover, strip horizontal. Integração com secção anterior (pode ser parte do hero).
- **Armadilha:** Logos pixelados ou com tamanhos inconsistentes destroem credibilidade.

### Features / Como Funciona
- **Onde procurar:** Cards, Tabs, Accordions, Numbers
- **O que procurar:** Grid de 3-4 features com ícone + título + descrição. Steps numerados. Tabs com conteúdo alternado. Bento grid.
- **Armadilha:** Features genéricas com ícones Lucide aleatórios — escolher ícones com intenção.
- **Decisão chave:** Layout grid simétrico vs layout editorial assimétrico.

### Showcase / Demo / Galeria
- **Onde procurar:** Scroll Areas, Carousels, Images, Videos
- **O que procurar:** Scroll horizontal, lightbox, before/after, vídeo inline. Depende do conteúdo.
- **Armadilha:** Scroll horizontal sem indicação visual de que há mais conteúdo.

### Testemunhos
- **Onde procurar:** Testimonials, Cards, Carousels
- **O que procurar:** Card com foto + nome + cargo + quote. Carousel auto-play. Grid masonry.
- **Armadilha:** Testemunhos sem foto ou com fotos stock — perde toda a credibilidade.
- **Decisão chave:** Estáticos (grid) vs animados (carousel/marquee).

### Pricing
- **Onde procurar:** Pricing Sections
- **O que procurar:** 2-3 planos com destaque no recomendado. Toggle mensal/anual. Feature comparison table.
- **Armadilha:** Demasiadas features listadas. Manter 5-7 por plano, máximo.
- **Decisão chave:** Cards lado a lado vs tabela comparativa.

### CTA Final
- **Onde procurar:** Heroes (muitos servem como CTA), Texts, Cards
- **O que procurar:** Simples, directo. Título forte + botão. Background com cor de acento ou contraste.
- **Armadilha:** Repetir o hero — o CTA final deve ser mais directo e urgente.

### Footer
- **Onde procurar:** Footers
- **O que procurar:** Colunas de links, newsletter input, social icons, copyright. Coerência com o resto do site.
- **Armadilha:** Footer esquecido e genérico — é a última impressão.

### Página 404
- **Onde procurar:** Texts, Heroes (adaptar)
- **O que procurar:** Mensagem amigável + CTA para voltar ao home. Pode ter animação divertida.
- **Nota Awwwards:** 404 é pontuada separadamente — investir aqui.

## **4.2 PRODUCT — Secções Típicas**

### Dashboard / Layout Base
- **Onde procurar:** Sidebars, Tables, Cards
- **O que procurar:** Sidebar + main content area. Top bar com search + avatar. Breadcrumbs.

### Formulários
- **Onde procurar:** Forms, Inputs, Selects
- **O que procurar:** Layout de form com labels, validação inline, estados de erro/sucesso.

### Tabelas de Dados
- **Onde procurar:** Tables
- **O que procurar:** Sorting, filtering, pagination, row selection. Bulk actions.

### Auth (Login / Signup)
- **Onde procurar:** Sign Ins, Sign Ups
- **O que procurar:** Layout centrado com logo, campos, providers OAuth, link para register/login.

### Empty States
- **Onde procurar:** Cards, Texts
- **O que procurar:** Ilustração + mensagem + CTA. Nunca ecrã em branco.

### Settings / Perfil
- **Onde procurar:** Tabs, Forms, Sidebars
- **O que procurar:** Sidebar de navegação + formulário de secção activa.

---

# **5. Checklist de Validação**

*Antes de entregar ao Claude Code, verificar:*

- [ ] Todas as secções do PRD têm uma entrada na Secção 3 deste documento
- [ ] Cada entrada tem URL de componente 21st.dev preenchida
- [ ] O copy real está definido (não placeholder "Lorem ipsum")
- [ ] As adaptações de tipografia e cor estão documentadas
- [ ] A camada de motion está especificada com padrões GSAP concretos
- [ ] As referências visuais são coerentes com as palavras-guia do VIBE-PRD
- [ ] Imagens/assets necessários estão identificados e disponíveis (ou com placeholder real)
- [ ] Secções de impacto (hero, showcase, CTA) têm referência de ambição preenchida
- [ ] Responsividade: anotadas as diferenças mobile vs desktop para cada secção
- [ ] Ordem das secções está definida — é a ordem de implementação

---

# **6. Regras para o Claude Code**

*Instruções que acompanham este documento quando entregue ao Claude Code.*

| Regra | Descrição |
| :---- | :---- |
| **Secção a secção** | Implementar uma secção de cada vez, pela ordem do SECTION_BLUEPRINT. Não avançar para a próxima sem a actual estar aprovada. |
| **Componente como esqueleto** | O componente 21st.dev é o ponto de partida estrutural. Manter a hierarquia HTML e a lógica de layout. Substituir cores, fontes, espaçamentos pelos tokens do projecto. |
| **Não copiar estilos default** | As classes de cor e tipografia do componente 21st.dev são substituídas pelas CSS variables do globals.css. Nunca manter Inter, Geist, ou cores shadcn default. |
| **Motion é camada adicional** | Adicionar as animações GSAP descritas na secção 3.x.5 sobre o componente adaptado. A animação não deve alterar a estrutura HTML do componente. |
| **Referência de ambição** | Se a secção tem referência de ambição (3.x.3), o nível de polish e detalhe deve igualar essa referência, não o componente base. |
| **Validação antes de avançar** | Após implementar cada secção, mostrar o resultado. Só avançar após aprovação explícita. |

---

# **7. Exemplo Preenchido — Hero da Lavande**

*Para demonstrar como preencher. Referência é fictícia.*

## **SECÇÃO: Hero**

### 3.1.1 — Conteúdo

| Campo | Valor |
| :---- | :---- |
| Objectivo da secção | Impacto imediato — comunicar que a Lavande é um serviço de lavandaria premium, local, artesanal |
| Posição na página | 1ª secção (após loader) |
| Copy principal | Badge: "Lavandaria & Engomadoria · Lisboa" / H1: "Cuidamos da sua roupa como se fosse nossa" / Sub: "Serviço de recolha e entrega em 48h na zona de Lisboa. Qualidade artesanal, conveniência moderna." |
| Dados / elementos | Badge com dot indicator, H1, parágrafo, 2 CTAs (primário + secundário) |
| Imagens necessárias | Foto hero: roupa em cabides, luz natural, 1920×1080, tom quente |
| CTA | "Pedir Recolha" → formulário / "Ver Preços" → scroll to pricing |

### 3.1.2 — Referência Visual

| Campo | Valor |
| :---- | :---- |
| **Componente 21st.dev** | *https://21st.dev/community/components/[autor]/[componente]* |
| Nome / autor | *ex: "Hero with Side Image" by reuno-ui* |
| O que vamos pegar | Split layout com imagem à direita, badge acima do título, hierarquia clara badge → h1 → sub → CTAs |
| O que NÃO vamos pegar | Gradiente de fundo, ícones no badge, sombras nos CTAs |

### 3.1.3 — Referência de Ambição

| Campo | Valor |
| :---- | :---- |
| URL de referência | https://www.aesop.com — hero clean com foco no produto, tipografia editorial |
| O que capturar | Uso do espaço negativo, tipografia serif como identidade, sensação de calma e qualidade |

### 3.1.4 — Adaptações

| Aspecto | Componente base | Adaptação |
| :---- | :---- | :---- |
| Tipografia | System/Inter | Cormorant Garamond (display) + Lora (body) + Space Mono (badge) |
| Paleta | Default shadcn | Tons quentes do PRD — bg creme, texto dark brown, acento terracotta |
| Layout | Centrado | Split: copy esquerda (60%), imagem direita (40%) com bleed |
| Espaçamento | Padrão | py-32 md:py-40, imagem com margin negativa no right |

### 3.1.5 — Camada de Motion

| Animação | Padrão GSAP | Especificação |
| :---- | :---- | :---- |
| Entrada do título | SplitText reveal | Por linhas, y:60, clipPath, stagger 0.08, power3.out, duration 0.9 |
| Badge | Fade + slide | y:-20, opacity:0, duration 0.6, começa antes do título |
| Imagem hero | clipPath reveal | clip-path inset de 100% a 0%, duration 1.4, ease power2.inOut |
| CTAs | Fade up | y:20, opacity:0, duration 0.6, stagger 0.1 |

### 3.1.6 — Notas para o Claude Code

| "Usar o componente 21st.dev como esqueleto HTML. Substituir todas as cores por CSS variables do globals.css. A imagem usa next/image com priority={true}. Timeline GSAP sequencial: badge → título (SplitText) → subtítulo → CTAs. Manter a estrutura responsive do componente base mas ajustar breakpoints para o layout split." |
| :---- |

---

# **8. Lições e Evolução**

*Após cada projecto, anotar o que funcionou e o que falhou neste processo.*

| Data | Observação |
| :---- | :---- |
| — | — |

---

# **9. CHANGELOG**

| Versão | Data | Autor | Mudanças |
| :---- | :---- | :---- | :---- |
| 1.0 | 2026-04 | Rodrigo Mendes | Documento inicial — workflow entre PRD e Claude Code com referências 21st.dev |

*SECTION_BLUEPRINT.md · v1.0 · Rodrigo Mendes*
