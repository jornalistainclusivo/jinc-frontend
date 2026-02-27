# 📰 Jornalista Inclusivo (Rebuild)

> **Status:** Em Desenvolvimento (Phase 2: Features & IA Integration)  
> **Stack:** Next.js 16, Tailwind CSS v4, TypeScript, Google Gemini API  
> **Foco:** Acessibilidade Extrema (WCAG 2.2 AAA), Performance, SEO Semântico, IA Generativa

## 🎯 Visão Geral

O **Jornalista Inclusivo** é um portal de jornalismo dedicado à equidade, inclusão, direitos das pessoas com deficiência (PcD), paradesporto e diversidade. Este projeto visa modernizar a plataforma antiga, transformando-a em uma referência técnica de acessibilidade digital e experiência de leitura.

A arquitetura é inspirada no minimalismo funcional do *Rest of World*, priorizando o conteúdo e a legibilidade, mas com uma camada robusta de ferramentas assistivas.

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` (ou a URL do container).

## ✨ Funcionalidades Principais

- **Busca Inteligente (Live Search):** Modal de busca com sugestões em tempo real.
- **Áudio com IA (Streaming):** Leitura de artigos gerada dinamicamente via Gemini TTS (Text-to-Speech) com reprodução imediata via Web Audio API.
- **Auto Alt Text:** Geração automática de textos alternativos para imagens utilizando o modelo Gemini Vision, garantindo acessibilidade para usuários com deficiência visual.
- **Páginas Institucionais:** Sobre Nós, Política de Privacidade, Termos de Uso e Contato.
- **Compartilhamento:** Integração com WhatsApp, LinkedIn, Twitter e Facebook.
- **Barra de Acessibilidade:** Ajuste de fonte, alto contraste e navegação facilitada.

## 🎨 Editorias e Cores Dinâmicas

O portal utiliza um sistema de cores dinâmicas para categorizar o conteúdo, promovendo diversidade visual sem perder a identidade:
- **Notícias:** Rosa (`brand-rose`)
- **Neurodiversidade:** Âmbar (`brand-amber`)
- **Saúde:** Teal (`brand-teal`)
- **Educação:** Roxo (`brand-purple`)
- **Direitos PcD:** Verde (`brand-green`)
- **Artigos:** Azul Principal (`brand-primary`)

## 🛠️ Tech Stack & Decisões Arquiteturais

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | SSR para SEO máximo, Server Components para performance em dispositivos low-end. |
| **Estilização** | Tailwind CSS v4 | Manutenibilidade, Design System via tokens, suporte nativo a Dark/High-Contrast Mode. |
| **Acessibilidade** | Radix UI (Primitivos) | Componentes headless testados para leitores de tela (NVDA, JAWS, VoiceOver). |
| **Ícones** | Lucide React | SVGs leves, acessíveis e consistentes. |
| **Animação** | Motion (fka Framer Motion) | Animações respeitando `prefers-reduced-motion`. |
| **IA & Acessibilidade** | Google Gemini API | Geração de áudio (TTS) em tempo real e descrições de imagens (Alt Text) automáticas. |
| **Fontes** | Inter & JetBrains Mono | Legibilidade em telas e clareza para dados técnicos. |

## 📂 Estrutura de Documentação

A documentação técnica deste projeto segue o princípio de "Documentation-as-Code":

- [📐 Arquitetura do Sistema](./docs/ARCHITECTURE.md): Estrutura de pastas, rotas e fluxo de dados.
- [♿ Manifesto de Acessibilidade](./docs/ACCESSIBILITY.md): Diretrizes WCAG, testes e ferramentas assistivas implementadas.
- [🎨 Design System](./docs/DESIGN_SYSTEM.md): Tokens de cor, tipografia e biblioteca de componentes.

## 🤝 Contribuição

1. **Semantic HTML First:** Nunca use uma `div` se existe uma tag semântica (`article`, `section`, `nav`, `aside`).
2. **A11y Driven:** Todo componente interativo deve ser navegável via teclado e possuir `aria-labels` claros.
3. **Mobile First:** O layout deve ser fluido e responsivo, focado na experiência mobile.

---

*Desenvolvido com foco em Inclusão, Acessibilidade e Direitos Humanos.*
