# AUDIT_CODE.md — Casa de Nabais
> Estado factual do código em 2026-05-24. Sem opiniões ou recomendações.

---

## 1. Schema real da base de dados

**Não existe base de dados.**  
Não há directório `supabase/migrations/`, não há cliente Supabase, não há tabelas, não há RLS. A aplicação é um site estático exportado (`output: 'export'` em `next.config.js`).

---

## 2. Features implementadas

### 2.1 Routes / Páginas

| Rota | Ficheiro | Componente principal |
|------|----------|----------------------|
| `/` | `app/page.tsx` | Hero, HomepageIntro, SectionVinhas, SectionVinificacao, SectionVinhos, SectionCasa, SectionEnoturismo, SectionExplore |
| `/a-casa` | `app/a-casa/page.tsx` | CasaPage |
| `/as-vinhas` | `app/as-vinhas/page.tsx` | VinhasPage |
| `/os-vinhos` | `app/os-vinhos/page.tsx` | VinhosPage |
| `/os-vinhos/[slug]` | `app/os-vinhos/[slug]/page.tsx` | WineDetailPage — slugs estáticos: `loureiro`, `vinha-do-pomar` |
| `/a-vinificacao` | `app/a-vinificacao/page.tsx` | VinificacaoPage |
| `/o-enoturismo` | `app/o-enoturismo/page.tsx` | EnoturismoPage |
| `/ficar-na-casa` | `app/ficar-na-casa/page.tsx` | FicarNaCasaPage |

Não existe nenhum `route.ts` (handler de API). Não existem Server Actions (`"use server"`).

### 2.2 Componentes — lista completa

| Ficheiro | Responsabilidade | Props relevantes |
|----------|-----------------|-----------------|
| `Navbar.tsx` | Navegação, toggle PT/EN, menu mobile com GSAP | — |
| `Hero.tsx` | Hero full-height, parallax, headline animado | — |
| `Footer.tsx` | Rodapé, links, email de contacto | — |
| `ClientProviders.tsx` | Wrapper do `LangProvider` | `children` |
| `SmoothScroll.tsx` | Integração Lenis + GSAP ScrollTrigger | `children` |
| `TextReveal.tsx` | Animação word-by-word ao scroll | `text`, `className?`, `style?`, `ghostOpacity?`, `triggerStart?`, `triggerEnd?` |
| `HomepageIntro.tsx` | Secção intro da homepage | — |
| `SectionVinhas.tsx` | Secção vinhas com carrossel e lightbox | — |
| `SectionVinificacao.tsx` | Secção vinificação com texto e imagens | — |
| `SectionVinhos.tsx` | Showcase de vinhos com cards | — |
| `SectionCasa.tsx` | Secção casa com galeria carrossel | — |
| `SectionEnoturismo.tsx` | Secção enoturismo com experiências | — |
| `SectionExplore.tsx` | CTA de navegação final | — |
| `CasaPage.tsx` | Página completa da casa — história, comodidades | — |
| `CasaHistoriaSection.tsx` | Sub-secção histórica dentro de CasaPage | — |
| `CasaPessoasSection.tsx` | Sub-secção das pessoas dentro de CasaPage | — |
| `VinhasPage.tsx` | Página detalhada das vinhas com parallax | — |
| `VinhosPage.tsx` | Listagem de vinhos com cards | — |
| `WineDetailPage.tsx` | Página dinâmica de detalhe do vinho; accordion para secções narrativas | `wine: WineData` |
| `EnoturismoPage.tsx` | Página detalhe do enoturismo | — |
| `VinificacaoPage.tsx` | Página detalhe do processo de vinificação | — |
| `FicarNaCasaPage.tsx` | Página de alojamento + formulário de reserva | — |
| `ImageLightbox.tsx` | Modal lightbox para galerias; suporta teclado e drag | `images`, `index`, `onClose`, `onPrev`, `onNext` |

### 2.3 Server Actions

Nenhuma. Não existe nenhum ficheiro com directiva `"use server"`.

### 2.4 Tipos de poll suportados

Não aplicável. Não existe nenhum mecanismo de poll na aplicação.

### 2.5 Tipos de dados principais

Definidos em `lib/wines-data.ts`:

```typescript
type Lang = 'pt' | 'en'

type WineAward = {
  label: string
  type: 'gold' | 'silver' | 'bronze'
}

type WineVintage = {
  year: string
  techSheetUrl: string | null
  awards: WineAward[]
}

type NarrativeSection = {
  heading: string
  text: string
}

type TechDetails = {
  region: string
  subRegion: string
  varieties: string
  alcohol: string
  totalAcidity: string
  ph: string
  residualSugar: string
  servingTemperature: string
}

type TastingNotes = {
  color: string
  aroma: string
  palate: string
}

type WineEnContent = {
  subtitle: string
  introText: string[]
  narrativeSections: NarrativeSection[]
  tastingNotes: TastingNotes
  keyPoints: string
  servingSuggestion: string
}

type WineData = {
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
  en?: WineEnContent
}
```

Definidos em `lib/i18n.tsx` e `lib/translations.ts`:

```typescript
type NavLink = { label: string; href: string }

type Translations = {
  nav: { links: NavLink[], stayAtEstate, buyWine, openMenu, closeMenu, comingSoon }
  footer: { tagline, quintaColumn, winesColumn, copyright, quintaLinks, winesLinks }
  common: { back, learnMore, details, buy, comingSoon, stayAtEstate, previous, next, of, scroll, ... }
  hero: { headlineLines: string[], sub: string }
  homepageIntro: { text: string }
  // + ~60 chaves de texto por página e secção
}

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}
```

### 2.6 Dados hardcoded em `lib/wines-data.ts`

Dois vinhos com conteúdo completo em PT e EN:

| Slug | Nome | Casta | DO | Álcool | pH | Acidez total | Açúcar residual | Temperatura serviço |
|------|------|-------|----|--------|----|--------------|-----------------|---------------------|
| `loureiro` | Loureiro | Loureiro | Vinho Verde DOC (Lima) | 11.5% | 3.09 | 7.5 g/l | — | — |
| `vinha-do-pomar` | Vinha do Pomar | — | Vinho Verde DOC (Lima) | 12% | 3.14 | 7.1 g/l | — | — |

Vintages presentes:
- Loureiro: 2023, 2022 (ouro), 2021 (ouro)
- Vinha do Pomar: 2023, 2022 (ouro)

---

## 3. Integrações e env vars

### 3.1 Environment variables

| Variável | Obrigatória | Onde é usada | Para quê |
|----------|-------------|--------------|---------|
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | Sim (em runtime) | `components/FicarNaCasaPage.tsx:159-160` | URL do Google Apps Script para receber submissões do formulário de reserva |

Não existem mais variáveis de ambiente referenciadas no código. Definida em `.env.example`.

### 3.2 Anthropic API

**Não está a ser usada.** Não existe nenhum import de `anthropic` ou `@anthropic-ai/sdk` em todo o codebase.

### 3.3 Supabase Realtime

**Não está a ser usada.** Não existe cliente Supabase, não existem chamadas a `.channel()`, `.on()` (de Supabase), ou `.subscribe()`.

O único `.on()` no codebase é `lenis.on('scroll', ScrollTrigger.update)` em `SmoothScroll.tsx` — relativo ao Lenis, não a Supabase.

### 3.4 Google Apps Script

**Activo.** `FicarNaCasaPage.tsx` faz `fetch` POST para `NEXT_PUBLIC_APPS_SCRIPT_URL` com `mode: 'no-cors'`. O script correspondente existe em `scripts/google-apps-script.gs`.

Campos enviados no formulário:
```
nome, email, telefone, checkIn, checkOut, pessoas, mensagem
```

### 3.5 Outras integrações

| Integração | Versão | Uso |
|-----------|--------|-----|
| GSAP | 3.12.5 | Animações, ScrollTrigger, parallax, menus |
| Lenis (`@studio-freight/lenis`) | 1.0.42 | Smooth scroll, integrado com GSAP |
| Lucide React | 0.460.0 | Ícones |
| Google Fonts | Joan | Carregado via Next.js `next/font/google` |
| Fontes locais | Bespoke Serif | Carregadas via `@font-face` em `globals.css` |

---

## 4. O que existe mas parece incompleto ou partido

### 4.1 Formulário de reserva (`FicarNaCasaPage.tsx`)

O formulário usa `mode: 'no-cors'` no fetch, o que significa que a resposta do servidor é opaca — o código não consegue distinguir sucesso de falha de rede. A lógica de feedback ao utilizador baseia-se apenas na ausência de excepção JavaScript, não na confirmação real de entrega.

```typescript
// FicarNaCasaPage.tsx
await fetch(url, { method: 'POST', mode: 'no-cors', ... })
// não há verificação de response.ok — com no-cors isso é sempre opaque
setSubmitStatus('success')  // sempre success se não lançar excepção
```

### 4.2 Teclas de compra de vinho

Em múltiplos componentes existem CTAs com labels `"Comprar"` / `"Buy"` e atributo `comingSoon` no contexto de tradução. Não existe nenhuma página de loja, carrinho ou integração de e-commerce.

Em `Navbar.tsx` e `SectionVinhos.tsx` existem botões de compra marcados internamente como `comingSoon` nas traduções.

### 4.3 Tech sheets (fichas técnicas) com URL nula

Nos dados de `lib/wines-data.ts`, vários vintages têm `techSheetUrl: null`:

```typescript
// Loureiro 2021, 2022
{ year: '2021', techSheetUrl: null, awards: [...] }
{ year: '2022', techSheetUrl: null, awards: [...] }
// Vinha do Pomar 2022
{ year: '2022', techSheetUrl: null, awards: [...] }
```

`WineDetailPage.tsx` renderiza um botão de download quando `techSheetUrl` não é null. Para os vintages com `null`, o botão não aparece — comportamento definido no código, mas dados incompletos.

### 4.4 Campos em branco em `TechDetails`

Nos dados hardcoded dos vinhos, os campos `residualSugar` e `servingTemperature` estão presentes no tipo mas com string vazia (`''`) ou com valor não preenchido para ambos os vinhos.

### 4.5 `useIsomorphicLayoutEffect`

Existe um hook em `hooks/useIsomorphicLayoutEffect.ts` que exporta `useLayoutEffect` no cliente e `useEffect` no servidor. Não foi possível confirmar se todos os componentes que usam GSAP o utilizam consistentemente — alguns componentes usam directamente `useEffect` para inicializar ScrollTrigger.

### 4.6 Animações GSAP sem cleanup verificado

Vários componentes inicializam ScrollTrigger contexts e timelines GSAP em `useEffect`. A existência de `return () => ctx.revert()` foi observada em alguns mas não é uniforme em todos os componentes com GSAP.

---

## 5. Stack técnico (sumário)

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js (App Router, static export) | 14.2.29 |
| UI | React | 18 |
| Styling | Tailwind CSS | 3.4.1 |
| Animações | GSAP + ScrollTrigger | 3.12.5 |
| Scroll | Lenis | 1.0.42 |
| Ícones | Lucide React | 0.460.0 |
| i18n | Context custom (PT/EN) | — |
| Imagens | next/image + Sharp | 0.34.5 |
| Tipografia | Joan (Google) + Bespoke Serif (local) | — |
| Deploy target | Static HTML (`output: 'export'`) | — |
| Base de dados | Nenhuma | — |
| Backend | Nenhum | — |
| Auth | Nenhuma | — |

---

## 6. Estrutura de ficheiros

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── a-casa/page.tsx
│   ├── as-vinhas/page.tsx
│   ├── os-vinhos/page.tsx
│   ├── os-vinhos/[slug]/page.tsx
│   ├── a-vinificacao/page.tsx
│   ├── o-enoturismo/page.tsx
│   └── ficar-na-casa/page.tsx
├── components/                   # 23 componentes React
├── lib/
│   ├── i18n.tsx                  # LangContext + LangProvider
│   ├── translations.ts           # Strings PT e EN
│   └── wines-data.ts             # Dados dos vinhos + tipos TypeScript
├── hooks/
│   └── useIsomorphicLayoutEffect.ts
├── public/                       # Imagens, fontes, assets estáticos
├── scripts/
│   ├── convert-to-webp.mjs       # Script de conversão de imagens
│   └── google-apps-script.gs     # Script GAS para o formulário
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
