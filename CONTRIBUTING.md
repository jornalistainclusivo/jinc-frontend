# Guia de Contribuição (Contributing Guidelines)

Bem-vindo(a) ao repositório do **Jornalista Inclusivo**. 

Nossa missão é construir a principal infraestrutura cultural e jornalística de equidade do Brasil. Para garantir que nosso código reflita nosso compromisso com a inclusão, estabelecemos diretrizes rigorosas de desenvolvimento, design e acessibilidade.

Ao contribuir com este projeto, você concorda em seguir estas diretrizes.

## 🏛️ Filosofia de Engenharia

1. **Acessibilidade como Fundação (A11y-First):** Não aceitamos código que exclua usuários. Todo componente deve ser navegável por teclado, compreensível por leitores de tela e visualmente acessível (WCAG 2.2 Nível AAA).
2. **Minimalismo Institucional:** Menos ruído, mais foco. Evitamos cores desnecessárias, animações supérfluas e layouts complexos. Consulte nosso [Design System](./docs/DESIGN_SYSTEM.md).
3. **Neuroergonomia:** O conforto cognitivo do leitor é inegociável. Respeitamos limites de largura de linha (`max-w-[70ch]`) e hierarquia tipográfica clara. Consulte nossa [Arquitetura de UI](./docs/UI_ARCHITECTURE.md).

## 🛠️ Fluxo de Desenvolvimento

1. **Fork & Clone:** Faça um fork do repositório e clone-o localmente.
2. **Branching:** Crie uma branch a partir da `main` usando o padrão:
   - `feature/nome-da-feature` (Para novas funcionalidades)
   - `fix/nome-do-bug` (Para correções de bugs)
   - `docs/nome-do-documento` (Para atualizações de documentação)
   - `a11y/nome-da-melhoria` (Para melhorias específicas de acessibilidade)
3. **Commits:** Utilize o padrão [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: adiciona novo player de áudio`
   - `fix: corrige contraste no menu mobile`
   - `docs: atualiza diretrizes de acessibilidade`
4. **Push & Pull Request:** Faça o push para o seu fork e abra um Pull Request (PR) contra a branch `main`.

## ♿ Requisitos Obrigatórios de Acessibilidade

Antes de abrir um PR, você **DEVE** garantir que seu código atende aos seguintes critérios:

* **Teclado:** Todos os elementos interativos (links, botões, inputs) devem ser acessíveis via tecla `Tab`.
* **Foco Visível:** O estado de foco deve ser explícito usando nossas classes utilitárias padrão (`focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2`).
* **Semântica:** Use HTML5 semântico (`<main>`, `<article>`, `<nav>`, `<aside>`, `<time>`). Evite `<div>` com `onClick` sem os devidos atributos ARIA e gerenciamento de teclado.
* **Leitores de Tela:** Elementos visuais não textuais (ícones) devem ter `aria-hidden="true"` ou `aria-label` apropriado.
* **Contraste:** O contraste de texto sobre fundo deve ser no mínimo 7:1 (AAA).

## 🛑 Processo de Revisão (Code Review)

Todo Pull Request passará por uma revisão rigorosa. O PR **não será aprovado** se:
1. O checklist do `PULL_REQUEST_TEMPLATE` não estiver preenchido de forma honesta e verificável.
2. Introduzir regressões de acessibilidade.
3. Violar a paleta de cores neutras estruturais (introduzir cores de categoria não autorizadas).
4. Não passar no linter (`npm run lint`) ou no build (`npm run build`).

Agradecemos por nos ajudar a construir uma web sem barreiras!
