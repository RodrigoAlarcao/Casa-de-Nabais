# Casa de Nabais

Website institucional da Casa de Nabais — vinho e enoturismo no Vale do Lima.

- **Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS
- **Build:** export estático (`output: 'export'`) — gera HTML/CSS/JS estáticos, sem servidor Node em produção
- **Idiomas:** PT (por defeito) e EN, geridos em `lib/translations.ts`

---

## Desenvolvimento local

```bash
npm install        # instalar dependências
cp .env.example .env.local   # criar ficheiro de variáveis (preencher valores)
npm run dev        # arrancar em http://localhost:3000
```

## Build de produção

```bash
npm run build      # gera o site estático na pasta /out
```

A pasta `/out` contém o site pronto a publicar em qualquer alojamento de
ficheiros estáticos (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Variáveis de ambiente

Definir em `.env.local` (local) e nas *Environment Variables* da plataforma de
produção (ex.: Vercel → Settings → Environment Variables). Ver `.env.example`.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | Sim | URL do Google Apps Script que recebe os leads do formulário "Ficar na Casa". |
| `NEXT_PUBLIC_APPS_SCRIPT_URL_VINHOS` | Sim | URL do Google Apps Script que recebe os leads do formulário "Comprar Vinho". |
| `NEXT_PUBLIC_GA_ID` | Não | ID de medição do Google Analytics (formato `G-XXXXXXXXXX`). Se vazio, o GA **não** é carregado. |

> Todas as variáveis usadas no browser têm de começar por `NEXT_PUBLIC_`.

---

## Checklist de entrega / produção

Tarefas a cargo de quem monta o ambiente de produção (o cliente):

### 1. Domínio e alojamento
- [ ] Publicar a pasta `/out` (ou ligar o repositório ao Vercel/Netlify, que correm `npm run build` automaticamente).
- [ ] Apontar o domínio `casadenabais.pt` para o alojamento e ativar HTTPS.

### 2. Formulários (Google Apps Script)
- [ ] Fazer *deploy* dos scripts em `scripts/google-apps-script.gs` e `scripts/google-apps-script-vinhos.gs` (ver instruções nos próprios ficheiros).
- [ ] Copiar os dois URLs para `NEXT_PUBLIC_APPS_SCRIPT_URL` e `NEXT_PUBLIC_APPS_SCRIPT_URL_VINHOS`.

### 3. Google Analytics (opcional, mas recomendado)
- [ ] Criar uma propriedade GA4 e obter o ID de medição (`G-XXXXXXXXXX`).
- [ ] Definir `NEXT_PUBLIC_GA_ID` com esse valor nas variáveis de produção.
- Sem este valor o site funciona normalmente, apenas não há tracking.

### 4. Conformidade legal — **confirmar os dados antes de publicar**
Os dados legais estão centralizados em **`lib/legal.ts`** e aparecem no rodapé
de todas as páginas. Validar que estão corretos:

- [ ] Denominação social, morada e **NIF** (`517375443`).
- [ ] **Código de acesso à certidão permanente** (`4650-7856-5038`) — atenção: este código dá acesso à certidão da empresa, confirmar se deve ser público.
- [ ] **RNAL** do alojamento (`47231/AL`).
- [ ] Entidade RAL (CNIACC) — já preenchida, não depende do cliente.

### 5. Cookies / RGPD (conforme CNPD)
O site já inclui um banner de consentimento de cookies com opt-in explícito:

- O Google Analytics e quaisquer scripts de terceiros **só carregam depois de
  o visitante carregar em "Aceitar"**. "Rejeitar" não dispara nada.
- A escolha é guardada no browser (localStorage) e pode ser alterada a qualquer
  momento pelo link **"Definições de cookies"** no rodapé.
- Botões "Aceitar" e "Rejeitar" têm a mesma proeminência visual (sem dark patterns).

**Pendente (recomendado para conformidade plena):**
- [ ] Criar uma **Política de Privacidade e Cookies** e ligá-la a partir do
  banner e do rodapé. O site ainda não tem esta página — a CNPD recomenda que o
  banner remeta para essa política ("Saber mais"). Se for pretendido, pode ser
  adicionada uma página `/privacidade` com o respetivo link.

---

## Estrutura relevante

| Caminho | Função |
|---|---|
| `app/` | Páginas (App Router). `app/layout.tsx` injeta Navbar, Footer e LegalFooter em todas. |
| `components/Footer.tsx` | Rodapé principal (marca, navegação). |
| `components/LegalFooter.tsx` | Rodapé legal: identificação do operador, Livro de Reclamações, RAL, "Definições de cookies" e copyright. |
| `components/CookieBanner.tsx` | Banner de consentimento (Aceitar / Rejeitar). |
| `components/GoogleAnalytics.tsx` | Carrega o GA via `next/script`, condicionado ao consentimento. |
| `lib/legal.ts` | Fonte única dos dados legais (empresa, alojamento, RAL). |
| `lib/consent.tsx` | Estado de consentimento (persistência e revogação). |
| `lib/translations.ts` | Todos os textos PT/EN. |
