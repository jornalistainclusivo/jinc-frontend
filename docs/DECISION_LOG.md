# Architecture Decision Records (ADR)

## ADR-001: Transição para Minimalismo Institucional

**Data:** 2026-02-28
**Status:** Consolidado
**Contexto:** O uso de cores semânticas por categoria (rosa, verde, âmbar) estava gerando ruído visual e conflitando com a seriedade editorial.
**Decisão:** Remoção global de cores de categoria. Adoção de paleta neutra (`neutral-900`, `neutral-50`).
**Consequências:** Maior legibilidade, adequação estrita à WCAG AAA, design mais maduro e focado no conteúdo fotográfico e tipográfico.

## ADR-002: Player de Áudio como Módulo Editorial

**Data:** 2026-02-28
**Status:** Implementado
**Contexto:** O player de áudio parecia um "widget" flutuante desconectado do texto.
**Decisão:** Integrar o player ao grid do artigo (`max-w-[70ch]`) e transformar o estado sticky em uma barra de sistema nativa.
**Consequências:** O player se torna uma extensão natural da leitura, reduzindo a carga cognitiva e melhorando a usabilidade em telas pequenas.

## ADR-003: Adoção do Modo Foco Profundo

**Data:** 2026-02-28
**Status:** Consolidado
**Contexto:** Usuários com TDAH ou fadiga visual precisavam de uma forma de reduzir distrações durante a leitura de artigos longos.
**Decisão:** Implementação de um toggle que altera o layout global da página (fundo off-white, redução de contraste em imagens, ocultação de elementos periféricos).
**Consequências:** Aumento da acessibilidade cognitiva e conforto visual, sem comprometer a identidade visual do portal.

## ADR-004: Simplificação do Header e Novas Editorias

**Data:** 2026-03-14
**Status:** Consolidado
**Contexto:** O menu principal estava poluído visualmente com muitos itens e termos extensos (ex: "Direitos PCD", "Acessibilidade Digital", "Opinião").
**Decisão:** Simplificação da navegação principal para exatamente 4 itens: Notícias, Neurodiversidade, Direitos, e Artigos. As demais seções foram integradas como subcategorias ou acessíveis via página inicial. Substituição do botão "Admin" por um ícone de usuário minimalista.
**Consequências:** Header mais limpo, focado e com menor carga cognitiva.

## ADR-005: Padronização de Cantos Retos (Brutalismo Editorial)

**Data:** 2026-03-14
**Status:** Em Revisão
**Contexto:** A mistura de cantos arredondados (`rounded-md`, `rounded-xl`) com elementos retos estava diluindo a identidade visual do portal, que busca inspiração no jornalismo impresso clássico.
**Decisão:** Adoção estrita de cantos retos (`rounded-none`) para todos os elementos estruturais e de ação principal (botões, modais, imagens de capa, cards, tags de tópicos/categorias). O uso de `rounded-full` foi restrito a elementos secundários (ícones, avatares).
**Consequências:** Estética mais séria, institucional e alinhada ao design brutalista focado em tipografia e alto contraste.

## ADR-006: Copiloto Editorial de Newsletter

**Data:** 2026-03-14
**Status:** Postergado
**Contexto:** A redação perdia muito tempo curando e resumindo matérias para a newsletter semanal.
**Decisão:** Criação de uma interface administrativa (`/admin/newsletter`) integrada a um Copiloto Editorial alimentado por IA (Gemini). A IA lê as matérias selecionadas e gera um rascunho completo (assunto, editorial, resumos), mantendo o jornalista no controle (Human-in-the-loop) para edição e aprovação final.
**Consequências:** Ganho expressivo de produtividade editorial e garantia de consistência no tom de voz e na acessibilidade (Linguagem Simples) dos emails enviados.

## ADR-007: Resumo Simples (Acessibilidade Cognitiva via IA)

**Data:** 2026-03-21
**Atualizado:** 2026-03-28
**Status:** Implementado
**Contexto:** Artigos longos ou com linguagem técnica podem ser excludentes para pessoas com deficiência intelectual, dislexia, TDAH ou baixo letramento.
**Decisão:** Implementação de uma funcionalidade de "Resumo Simples" na página. A ferramenta utiliza a API do Gemini via backend do Strapi ("Lifecycle hooks" em rascunhos) para gerar resumos em bullet points seguindo os princípios de Linguagem Simples (Plain Language), sem publicar automaticamente, o que foi renderizado em um Collapsible em HTML5 Acessível.
**Consequências:** Aumento significativo da acessibilidade cognitiva, permitindo que o usuário decida entre ler o texto completo ou acionar o `<details>` e consumir um resumo simplificado direto dos pontos principais.

## ADR-008: Fallbacks Descritivos via IA na Migração de Imagens

**Data:** 2026-03-28
**Status:** Implementado
**Contexto:** Imagens legadas migradas para o CMS frequentemente não possuíam o atributo `alt` preenchido, falhando em prover acessibilidade para usuários de leitores de tela.
**Decisão:** Expansão do acionamento da IA (Gemini) no componente `<AutoAltImage>` para permitir a geração de descrição (alt-text) também em caminhos relativos locais (`/uploads/...`), viabilizando a mesma política de fallbacks usada em imagens externas para todo acervo da migração que dependia do Strapi.
**Consequências:** Solução do gargalo retroativo de acessibilidade visual de imagens antigas sem edição manual em massa no CMS, atuando em conformidade com o JINC Protocol e requisitos WCAG AAA.

## ADR-009: Global Flat Routing & Category Consolidation

**Data:** 2026-04-03
**Status:** Implementado
**Contexto:** A navegação original possuía submenus complexos em "Artigos" e redirecionamentos aninhados (ex: `/noticias/x`) que fragmentavam o SEO e a manutenção.
**Decisão:** Consolidação de todas as categorias em rotas de nível 1 em `app/[category]/page.tsx`. Remoção de subcategorias no Header e no Menu Hamburger para focar na simplicidade e acessibilidade cognitiva.
**Consequências:**

- URLs mais diretas e amigáveis ao SEO.
- Uso mandatório do dicionário `CATEGORY_DISPLAY_NAMES` no frontend para garantir acentuação ortográfica (ex: `saude` -> `Saúde`) independente do slug do CMS.

## ADR-010: Vibe-Coding Dev Stack (Docker HMR & Builder Targets)

**Data:** 2026-04-03
**Status:** Implementado
**Contexto:** O desenvolvimento era lento devido à falta de Hot Module Replacement (HMR) funcional no Docker em hosts Windows e ao cache persistente do Next.js entre builds de containers.
**Decisão:**

- Configuração do `docker-compose.yml` para rodar no estágio `builder` (Next.js Dev Server).
- Ativação de `WATCHPACK_POLLING: 1000` para detectar mudanças de arquivo no Windows.
- Remoção de volumes persistentes da pasta `.next` para evitar conflitos de cache "shadowing".
**Consequências:** Ciclo de feedback instantâneo (Vibe-Coding) restabelecido.

## ADR-011: Automated Idempotent CMS Seeding (Index Lifecycle)

**Data:** 2026-04-03
**Status:** Implementado
**Contexto:** A divergência manual de categorias e permissões entre ambientes de dev/staging/prod causava falhas no frontend.
**Decisão:** Implementação de um fluxo de `bootstrap()` em `cms/src/index.ts` que verifica a existência da taxonomia base e configura permissões de acesso público (`find/findOne`) programaticamente na inicialização.
**Consequências:** Ambientes CMS são agora auto-provisionáveis e resilientes a reinícios de banco de dados (SQLite).
