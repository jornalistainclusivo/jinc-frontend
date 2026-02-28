# Design System: Jornalista Inclusivo

## Filosofia
**Modern Institutional Minimalist.** Design brutalista, focado em tipografia, alto contraste e eliminação de ruído cognitivo. A interface deve ser "invisível", permitindo que o jornalismo e a acessibilidade brilhem.

## Escala Tipográfica
Utilizamos duas famílias tipográficas principais, carregadas via `next/font/google`:

1. **Serif (Títulos e Corpo de Artigos):** `font-serif` (ex: Playfair Display / Merriweather / Lora). Traz autoridade, tradição jornalística e conforto para leitura longa.
   - **Títulos (H1, H2):** `font-medium tracking-tight leading-[1.1]`
   - **Corpo (Prose):** `leading-[1.9] text-lg`
2. **Sans-Serif (UI, Metadados, Labels):** `font-sans` (ex: Inter). Usada para elementos de interface, navegação e dados técnicos.
   - **Labels/Metadados:** `text-xs font-bold uppercase tracking-widest`
3. **Mono (Dados, Tempo, Código):** `font-mono`. Usada para timestamps do player de áudio e metadados precisos.
   - **Timestamps:** `text-[10px] uppercase tracking-widest`

## Espaçamento (Rhythm)
- O ritmo vertical é mantido através de espaçamentos generosos.
- Margens inferiores de parágrafos (`mb-8`).
- Espaçamento entre seções (`py-16` a `py-24`).
- Espaçamento interno de componentes (padding) deve ser proporcional (ex: `p-6` ou `p-8`).

## Componentes Core Documentados
Consulte a [Component Library](./COMPONENT_LIBRARY.md) para detalhes de implementação de:
- `ArticleAudioPlayer`
- `ContextualLayer`
- `AccessibilityToolbar`
- `AutoAltImage`

## Estados e Variantes
- **Hover:** Transição suave de cor (`transition-colors duration-200`). Ex: `text-neutral-900 hover:text-neutral-700`.
- **Focus:** Anel de foco de alto contraste (`focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm`).
- **Active:** Redução sutil de escala ou mudança de cor de fundo (`active:scale-95`).
- **Disabled:** Opacidade reduzida (`opacity-50 cursor-not-allowed`).
