# Architecture Decision Records (ADR)

## ADR-001: Transição para Minimalismo Institucional
**Data:** 2026-02-28
**Status:** Aceito
**Contexto:** O uso de cores semânticas por categoria (rosa, verde, âmbar) estava gerando ruído visual e conflitando com a seriedade editorial.
**Decisão:** Remoção global de cores de categoria. Adoção de paleta neutra (`neutral-900`, `neutral-50`).
**Consequências:** Maior legibilidade, adequação estrita à WCAG AAA, design mais maduro e focado no conteúdo fotográfico e tipográfico.

## ADR-002: Player de Áudio como Módulo Editorial
**Data:** 2026-02-28
**Status:** Aceito
**Contexto:** O player de áudio parecia um "widget" flutuante desconectado do texto.
**Decisão:** Integrar o player ao grid do artigo (`max-w-[70ch]`) e transformar o estado sticky em uma barra de sistema nativa.
**Consequências:** O player se torna uma extensão natural da leitura, reduzindo a carga cognitiva e melhorando a usabilidade em telas pequenas.

## ADR-003: Adoção do Modo Foco Profundo
**Data:** 2026-02-28
**Status:** Aceito
**Contexto:** Usuários com TDAH ou fadiga visual precisavam de uma forma de reduzir distrações durante a leitura de artigos longos.
**Decisão:** Implementação de um toggle que altera o layout global da página (fundo off-white, redução de contraste em imagens, ocultação de elementos periféricos).
**Consequências:** Aumento da acessibilidade cognitiva e conforto visual, sem comprometer a identidade visual do portal.
