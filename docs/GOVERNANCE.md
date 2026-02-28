# Governance & Workflow

## Processo de Decisão Arquitetural
Qualquer mudança estrutural na UI, adição de dependências ou alteração no Design System deve ser registrada no `DECISION_LOG.md`. A documentação deve ser tratada como código (Docs as Code).

## Fluxo de Pull Requests
1. **Branching:** `feature/nome-da-feature`, `fix/nome-do-bug`, `chore/atualizacao`.
2. **Checklist de PR:**
   - Passa no linter (`npm run lint`)?
   - Acessibilidade validada (navegação por teclado funciona)?
   - Contraste verificado (WCAG AAA)?
   - Responsividade testada (Mobile, Tablet, Desktop)?
   - Documentação atualizada (se aplicável)?
3. **Aprovação:** Requer revisão de pelo menos um membro focado em Acessibilidade/Design System.

## Critérios para Breaking Changes
Alterações que modifiquem a estrutura de dados do CMS Headless ou que alterem tokens globais do Tailwind são consideradas Breaking Changes e exigem bump de versão MAJOR no `package.json` e `CHANGELOG.md`.

## Versionamento Semântico
O projeto segue o [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
- **MAJOR:** Mudanças incompatíveis na API ou Design System (ex: remoção de cores de categoria).
- **MINOR:** Adição de funcionalidades de forma retrocompatível (ex: novo componente de acessibilidade).
- **PATCH:** Correções de bugs retrocompatíveis (ex: ajuste de padding em um botão).
