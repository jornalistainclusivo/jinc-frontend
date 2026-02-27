# 📐 Arquitetura do Sistema: Jornalista Inclusivo

Este documento descreve a estrutura técnica, o fluxo de dados e a organização do projeto Next.js para o portal Jornalista Inclusivo.

## 🏗️ Estrutura de Diretórios (Next.js App Router)

A organização segue o padrão modular, facilitando a manutenção e a escalabilidade.

```
/
├── app/                        # Rotas e Layouts (App Router)
│   ├── (marketing)/            # Grupo de rotas institucionais
│   │   ├── sobre/              # /sobre
│   │   ├── privacidade/        # /privacidade
│   │   ├── termos/             # /termos
│   │   └── contato/            # /contato
│   ├── (news)/                 # Grupo de rotas de conteúdo (Jornalismo)
│   │   ├── page.tsx            # Home Page (Feed Principal)
│   │   ├── busca/              # /busca (Página de resultados)
│   │   ├── [category]/         # /direitos-pcd, /tecnologia-assistiva
│   │   │   └── page.tsx        # Listagem por categoria
│   │   └── artigo/
│   │       └── [slug]/         # /artigo/titulo-da-materia
│   │           └── page.tsx    # Página de Matéria (Single Post)
│   ├── layout.tsx              # Root Layout (Providers, Fontes, CSS Global)
│   └── not-found.tsx           # Página 404 Customizada e Acessível
├── components/                 # Componentes React
│   ├── ui/                     # Componentes Primitivos (AutoAltImage)
│   ├── layout/                 # Header, Footer, Sidebar
│   ├── news/                   # Componentes específicos (ArticleAudioPlayer)
│   ├── search/                 # Componentes de busca (SearchModal)
│   └── accessibility/          # Ferramentas A11y (AccessibilityToolbar)
├── lib/                        # Utilitários e Lógica de Negócio
│   ├── api.ts                  # Fetchers para o CMS/Backend
│   ├── utils.ts                # Helpers (cn, formatDate)
│   └── constants.ts            # Configurações globais (Menu links, Site metadata)
├── styles/                     # Estilos globais (se necessário além do Tailwind)
└── public/                     # Assets estáticos (Imagens, Fontes locais, Manifest)
```

## 🧩 Componentes Chave

### 1. `SkipLink` (Acessibilidade)
O primeiro elemento focável da página. Permite que usuários de teclado e leitores de tela pulem o menu e vão direto ao conteúdo principal (`<main id="main-content">`).

### 2. `AccessibilityToolbar`
Barra flutuante ou fixa no topo que oferece:
- **Alto Contraste:** Alterna classes CSS no `body` (`.high-contrast`).
- **Tamanho da Fonte:** Ajusta a variável CSS `--font-scale`.
- **Leitura de Voz:** Integração com Web Speech API para ler o resumo da matéria.

### 3. `SearchModal` (Busca Inteligente)
Componente de busca com sugestões em tempo real (live search), acessível via teclado e com foco automático.

### 4. `ArticleAudioPlayer` (Áudio com IA)
Reprodutor de áudio que utiliza a API do Google Gemini (TTS) para gerar a narração do artigo em tempo real (streaming), utilizando a Web Audio API para reprodução imediata sem tempo de espera.

### 5. `AutoAltImage` (Acessibilidade Visual)
Componente que substitui o `next/image` padrão. Se uma imagem não possuir `alt` text, ele consulta a API do Gemini Vision no lado do servidor para gerar uma descrição acessível e objetiva automaticamente, armazenando em cache para performance.

## 🔄 Fluxo de Dados e Integração de IA

### Estratégia de Importação (Legacy to Modern)
Para importar os artigos do site antigo (WordPress/Joomla/Outro):

1.  **Ingestão:** Script de migração para converter HTML legado em Markdown/MDX ou JSON estruturado.
2.  **Sanitização:** Remoção de tags de estilo inline legadas, correção de hierarquia de headers (`h1` -> `h2`).
3.  **Enriquecimento:** Adição manual ou via IA de descrições `alt` para imagens que não possuíam.

### Data Fetching
- **Server Components:** A maioria das páginas (Home, Categoria, Artigo) serão Server Components, buscando dados no build time (SSG) ou request time (SSR) com cache agressivo para performance.

## 🛡️ Segurança e Performance

- **Imagens:** Uso obrigatório de `next/image` para otimização automática e prevenção de Layout Shift (CLS).
- **Fontes:** `next/font` para zero layout shift e carregamento otimizado.
- **CSP (Content Security Policy):** Rigorosa para evitar XSS, especialmente se houver scripts de terceiros (Analytics).

---

> **Nota do Arquiteto:** A estrutura prioriza a semântica HTML. O CSS é utilitário, mas o HTML é a estrutura que garante a acessibilidade.
