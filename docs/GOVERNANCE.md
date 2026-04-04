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

## 🔄 Triple Git Flow (v1.6.1+)

Devido à natureza desbalanceada de privacidade entre os repositórios (CMS privado, Frontend público), adotamos o **Triple Git Flow**:

1. O trabalho em uma feature deve ocorrer em branches espelhadas em todos os repositórios afetados (`jinc-infra`, `jinc-frontend`, `cms`).
2. **Tagging Sincronizado**: Ao atingir um marco (milestone), uma Tag Semântica idêntica (ex: `v1.6.1-polish-final`) deve ser aplicada e subida para os 3 repositórios simultaneamente.
3. Isso garante que o estado funcional do projeto possa ser restaurado integralmente em qualquer ponto da história.

## 🏷️ Consistência de Nomenclatura (Categorias)

Para evitar falhas de renderização e SEO:

1. **CMS**: Slugs devem ser sempre em *kebab-case*, minúsculos e sem acentos (ex: `saude`, `direitos-pcd`).
2. **Frontend**: A exibição visual e metadados devem utilizar o dicionário `CATEGORY_DISPLAY_NAMES` em `app/[category]/page.tsx` para garantir a acentuação correta e o tom institucional (ex: `saude` -> `Saúde`).

## Versionamento Semântico

O projeto segue o [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- **MAJOR:** Mudanças incompatíveis (ex: troca de framework, remoção de cores).
- **MINOR:** Novas editorias ou componentes de acessibilidade.
- **PATCH:** Correções de bugs ou ajustes tipográficos.
