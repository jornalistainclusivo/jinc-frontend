# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-28
### Added
- `ArticleAudioPlayer`: Novo módulo editorial inline (max 70ch) e sticky player horizontal nativo.
- `ContextualLayer`: Novo componente de contexto estruturado com design brutalista/minimalista.
- Sistema de documentação centralizada (`/docs`).

### Changed
- **[BREAKING]** Transição arquitetural para "Modern Institutional Minimalist".
- Remoção global de cores semânticas por categoria (brand-rose, brand-amber, etc.).
- Adoção de paleta neutra estrita (`neutral-900`, `neutral-50`) para redução de ruído cognitivo e adequação à WCAG AAA.
- Redesign do Menu Hamburguer: remoção de cores, adoção de tipografia serifada e espaçamento estrutural.
- Atualização de tipografia em artigos (prose) para maximizar contraste e legibilidade.

### Removed
- Sistema legado de cores de categoria (`getCategoryTheme` simplificado).
- Cards flutuantes com sombras excessivas (substituídos por bordas estruturais e layouts flat).
