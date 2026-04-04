# Guia de Integração: Next.js 16 + Strapi 5 Headless CMS

Este documento estabelece a arquitetura de integração entre o frontend (Next.js) e o backend editorial (Strapi 5), garantindo alta performance, SEO e governança de dados via **Vibe-Coding**.

## 🏗️ 1. Topologia do Projeto (Hybrid Monorepo)

O projeto utiliza uma estrutura de monorepo para desenvolvimento local, mas mantém repositórios independentes para deploy:

- `jinc-infra` (Monorepo Root / Docker) -> Público.
- `jinc-frontend` (Next.js 16) -> Público (Deploy Vercel).
- `cms` (Strapi 5) -> **Privado** (Deploy AWS/Render).

## ⚙️ 2. Setup & Seeding Automático (Backend)

O Strapi 5 foi configurado para ser resiliente e "zero-config" para o desenvolvedor frontend.

### A. Idempotent Seeding

O arquivo `cms/src/index.ts` executa um script de `bootstrap()` que:

1. Verifica se as categorias essenciais (`noticias`, `direitos-pcd`, `mercado-e-trabalho`, `saude`, etc.) existem.
2. Cria os registros faltantes com slugs padronizados.
3. **Permissões Públicas**: Configura automaticamente as permissões de `find` e `findOne` para a role `Public` na coleção de Categorias e Artigos, eliminando a necessidade de configuração manual no Admin Panel.

### B. Plugins Mandatórios

- **SEO:** `@strapi-community/plugin-seo` (Configurado com o componente `shared.seo`).
- **Publisher:** Para agendamento e gerenciamento de workflow editorial.

## 🗄️ 3. Modelagem de Dados Editorial (Content-Types)

O backend utiliza o **Strapi 5** com o plugin de SEO instalado. Abaixo, a definição técnica dos tipos principais baseada no `schema.json`:

### A. Artigo (`api::artigo.artigo`)

Este é o core da plataforma, integrando acessibilidade por IA e blocos dinâmicos.

- **Campos Base:**
  - `titulo` (String): Título principal.
  - `slug` (UID): Identificador de URL (UID baseado no `titulo`).
  - `subtitulo` (String): Sutiã ou apoio do título.
  - `data_publicacao` (Date): Data de exibição no portal.
  - `capa` (Media): Imagem de destaque (Single).

- **Blocos Dinâmicos (`blocos_de_conteudo`):** Zona dinâmica para montagem de matérias:
  - `blocos-materia.contextual-layer`: Camada de contexto cognitivo.
  - `blocos-materia.texto-livre`: Rich text padrão.
  - `blocos-materia.pull-quote`: Destaque tipográfico.
  - `blocos-materia.share-block`: Botões de compartilhamento localizados.

- **Acessibilidade & IA:**
  - `descricao_audio` (Text): Armazena o roteiro/transcrição para o audioplayer.
  - `resumo_simples` (Text): Armazena os bullet-points gerados para Linguagem Simples.
  - `alt_text_ia` (Text): Cache da descrição visual gerada pelo Gemini.

- **Relações:**
  - `categoria` (OneToOne): Vinculado a 1 Categoria.
  - `autors` (OneToMany): Vinculado a 1 ou mais Autores.
  - `tags` (OneToMany): Vinculado a múltiplas Tags.

- **SEO:**
  - `seo` (Component `shared.seo`): Gerenciamento de Meta Tags, Open Graph e NoIndex.

### B. Categoria (`api::categoria.categoria`)

- **Campos Base:**
  - `nome` (String): Nome visível.
  - `slug` (UID): Identificador técnico.
  - `descricao` (Text): Meta descrição rica para a indexação da editoria.
- **Hierarquia:**
  - Suporta relação com categoria `pai`.

## 🔗 4. Integração no Next.js (Flat Routing)

O Frontend utiliza o **Next.js App Router** com uma arquitetura de rotas dinâmicas simplificada:

### A. Arquitetura de Rotas

- `app/[category]/page.tsx`: Captura qualquer slug de categoria (ex: `/saude`, `/noticias`).
- **Display Names**: O frontend mantém um dicionário `CATEGORY_DISPLAY_NAMES` para garantir a acentuação correta de slugs (ex: `saude` -> `Saúde`) e `CATEGORY_DESCRIPTIONS` para metadados ricos.

### B. Variáveis de Ambiente

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=...
```

## 🤖 5. O Papel da IA (Gemini) no Fluxo

1. **AutoAltImage:** Fallback para descrições de imagem via Gemini Vision.
2. **Contextual Layer:** A IA lê o `conteudo` do Strapi para gerar resumos de acessibilidade cognitiva.

## ⚡ 6. Desenvolvimento Local (Modo Vibe-Coding)

Para rodar o ambiente completo com Hot Module Replacement (HMR) funcional no Windows/WSL:

1. Use `docker compose up`.
2. O frontend roda em estágio `builder` com `npm run dev`.
3. **Limpeza de Cache**: Se houver "shadowing" de arquivos antigos, execute `rm -rf jinc-frontend/.next` no host para forçar a recompilação total.

---
