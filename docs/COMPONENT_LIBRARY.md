# Component Library

## 1. ArticleAudioPlayer

**Finalidade:** Módulo editorial que converte texto em áudio via IA (Gemini TTS) e controla a reprodução.
**Anatomia:**

- **Estado Inline:** Renderizado no fluxo do texto, largura máxima de 70ch. Contém título, barra de progresso, controles de playback (rewind, play/pause, forward), tempo, toggle de Foco Profundo, velocidade e volume.
- **Estado Sticky:** Barra horizontal fixada no rodapé (`bottom-0`). Visível apenas quando o player inline sai da viewport.
**Regras de Uso:** Apenas um por artigo. Deve ser posicionado imediatamente antes do corpo do texto.
**Anti-padrões:** Não utilizar sombras excessivas ou cantos arredondados grandes. O player deve parecer uma extensão do texto, não um "widget" flutuante.

## 2. ContextualLayer

**Finalidade:** Fornecer contexto técnico, institucional ou prático sem forçar o usuário a sair da página.
**Anatomia:** Acordeão expansível. Estilo brutalista com bordas superior e inferior (`border-y-2 border-neutral-900`).
**Regras de Uso:** Usado para explicar termos complexos (ex: WCAG, BPC/LOAS). Não deve conter informações críticas para a compreensão básica da notícia, apenas aprofundamento.
**Variações:** Pode conter 1, 2 ou 3 colunas de contexto, dependendo da complexidade do termo.

## 3. Header & Hamburger Menu

**Finalidade:** Navegação global.
**Anatomia:** Menu desktop inline. Menu mobile via slide-over.
**Anti-padrões:** Não utilizar cores para diferenciar categorias no menu. Manter a tipografia serifada para os itens principais e sans-serif para subitens.
**Estados:** O menu mobile deve ter um estado de foco claro e ser totalmente navegável por teclado.

## 4. AutoAltImage

**Finalidade:** Componente de imagem que gera automaticamente textos alternativos (Alt Text) via IA (Gemini Vision) caso não sejam fornecidos.
**Anatomia:** Wrapper em torno do `next/image`.
**Regras de Uso:** Deve ser usado para todas as imagens editoriais.
**Acessibilidade:** Garante que nenhuma imagem fique sem descrição, cumprindo os requisitos da WCAG.

## 5. AccessibilityToolbar

**Finalidade:** Fornecer controles rápidos de acessibilidade (tamanho da fonte, contraste, modo foco).
**Anatomia:** Barra horizontal fixa no topo da tela ou integrada ao Header.
**Regras de Uso:** Deve estar sempre visível e acessível via teclado.
