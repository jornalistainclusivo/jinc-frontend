# Guia de Integração: Next.js 16 + Strapi Headless CMS

Este documento estabelece a arquitetura de integração entre o frontend (Next.js) e o backend editorial (Strapi), garantindo alta performance, SEO e governança de dados.

## 🏗️ 1. Topologia do Projeto (Multi-repo vs Monorepo)

Recomendamos a abordagem **Multi-repo** (repositórios separados) para isolar o ciclo de deploy:
- `jornalista-inclusivo-web` (Next.js -> Deploy na Vercel)
- `jornalista-inclusivo-cms` (Strapi -> Deploy na AWS/Render/DigitalOcean)

## ⚙️ 2. Setup do Strapi (Backend)

No seu terminal (fora da pasta do Next.js), inicialize o Strapi:

```bash
npx create-strapi-app@latest jornalista-inclusivo-cms --quickstart
```

### Plugins Recomendados para a Redação:
- **GraphQL:** `npm run strapi install graphql` (Para queries otimizadas).
- **SEO:** `@strapi/plugin-seo` (Para gerenciar meta tags e Open Graph).
- **Publisher:** Para agendamento de publicações.

## 🗄️ 3. Modelagem de Dados Editorial (Content-Types)

Crie os seguintes *Collection Types* no painel do Strapi:

### A. Article (Artigo)
- `title` (Text - Short) - Obrigatório
- `slug` (UID - atrelado ao title) - Obrigatório
- `subtitle` (Text - Long)
- `content` (Rich Text ou Blocks) - O corpo da matéria
- `coverImage` (Media - Single)
- `publishedAt` (Date)
- **Relações:** Tem 1 `Category`, Tem 1 ou mais `Authors`.

### B. Category (Editoria)
- `name` (Text - Short) - Ex: "Direitos PcD"
- `slug` (UID)
- `description` (Text - Long)

### C. Author (Autor)
- `name` (Text - Short)
- `bio` (Text - Long)
- `avatar` (Media - Single)

## 🔗 4. Integração no Next.js (VS Code)

No repositório do Next.js, crie as variáveis de ambiente no `.env.local`:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=seu_token_gerado_no_painel_do_strapi
```

### Exemplo de Fetcher Otimizado (Next.js 16)

Crie um arquivo `lib/api.ts` para centralizar as chamadas:

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    ...options,
  };

  // Construção da URL com qs (query-string)
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`Erro ao buscar dados do Strapi`);
  }
  const data = await response.json();
  return data;
}
```

## 🤖 5. O Papel da IA (Gemini) no Novo Fluxo

Com o Strapi assumindo o conteúdo, a IA Generativa atuará como um **Middleware de Enriquecimento**:

1. **AutoAltImage:** Quando o Next.js renderizar uma imagem vinda do Strapi que não possua `alternativeText` preenchido pelo jornalista, o componente fará o fallback para a API do Gemini Vision.
2. **ArticleAudioPlayer:** O texto rico (`content`) vindo do Strapi será limpo (strip HTML) e enviado em blocos para o Gemini TTS gerar o áudio dinamicamente.

## ⚡ 6. Revalidação de Cache (ISR)

Para garantir que o site seja ultrarrápido, mas atualizado quando uma notícia for publicada:
- Configure **Webhooks** no Strapi para disparar requisições POST para uma Rota de API do Next.js (ex: `/api/revalidate`) sempre que um Artigo for criado ou atualizado.
- O Next.js usará `revalidatePath('/artigo/[slug]')` para atualizar o cache da borda (Edge) instantaneamente.
