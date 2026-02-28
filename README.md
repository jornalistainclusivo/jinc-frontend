# Jornalista Inclusivo - Portal Editorial

> Infraestrutura cultural e jornalismo de equidade, focado em acessibilidade digital e neuroergonomia.

## Visão Geral
O Jornalista Inclusivo é um portal de notícias Headless construído com Next.js 16 e React 19, focado em entregar a melhor experiência de leitura possível, aderindo estritamente aos padrões **WCAG 2.2 AAA**. O projeto utiliza IA Generativa (Google Gemini) de forma nativa para recursos de acessibilidade, como geração de áudio (TTS) e contextualização de leitura.

## Propósito Editorial
O portal visa ser a principal fonte de informação sobre inclusão, acessibilidade, neurodiversidade e direitos PcD no Brasil, com uma abordagem jornalística rigorosa e uma plataforma tecnológica que serve como exemplo prático de design universal.

## Stack Tecnológica
- **Framework:** Next.js 16 (App Router, Server Components)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **IA / LLM:** Google GenAI SDK (`@google/genai`)
- **Ícones:** Lucide React
- **Tipografia:** Google Fonts (via `next/font`)

## Estrutura do Repositório
A documentação completa do Design System e Arquitetura encontra-se no diretório `/docs`:
- [Design System](./docs/DESIGN_SYSTEM.md)
- [UI Architecture](./docs/UI_ARCHITECTURE.md)
- [Accessibility Guidelines](./docs/ACCESSIBILITY_GUIDELINES.md)
- [Component Library](./docs/COMPONENT_LIBRARY.md)
- [Color System](./docs/COLOR_SYSTEM.md)
- [Governance](./docs/GOVERNANCE.md)
- [Decision Log](./docs/DECISION_LOG.md)

## Como Rodar Localmente
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Adicione sua NEXT_PUBLIC_GEMINI_API_KEY no arquivo .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```
O servidor estará disponível em `http://localhost:3000`.

## Diretrizes de Contribuição
Por favor, leia o documento de [Governança](./docs/GOVERNANCE.md) para entender nosso processo de submissão de Pull Requests, padrões de código e critérios de aceitação.
