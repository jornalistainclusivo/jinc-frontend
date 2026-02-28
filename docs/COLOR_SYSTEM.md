# Color System & Chromatic Governance

## Filosofia (v2.0.0+)
O Jornalista Inclusivo adotou a diretriz **Modern Institutional Minimalist**. 
A cor deixou de ser um elemento de categorização temática para se tornar uma ferramenta estrita de **hierarquia, foco e acessibilidade**.

### O Fim das Cores por Categoria
Na v1.x, utilizávamos cores específicas para editorias (ex: Rosa para Notícias, Âmbar para Neurodiversidade). 

**Decisão Arquitetural (ADR-001):** Esta abordagem foi descontinuada.
* **Motivo:** O excesso de variação cromática gerava ruído cognitivo, competia com o conteúdo fotográfico e reduzia a percepção de autoridade institucional.
* **Nova Abordagem:** Categorias são agora diferenciadas exclusivamente por tipografia, labels textuais explícitos (ex: `text-xs font-bold uppercase tracking-widest`) e posicionamento espacial.

## Paleta Global (Structural Neutrals)
A interface é construída sobre uma fundação monocromática de alto contraste.

| Token | Valor Tailwind | Uso Semântico | Contraste (Fundo Branco) |
|---|---|---|---|
| `surface-primary` | `bg-white` | Fundo principal de leitura | N/A |
| `surface-secondary`| `bg-neutral-50` / `bg-neutral-100` | Áreas de destaque, módulos editoriais | N/A |
| `surface-focus` | `bg-[#FDFBF7]` | Fundo do Modo Foco Profundo (Warm Off-White) | N/A |
| `text-primary` | `text-neutral-900` | Títulos, texto principal, ícones ativos | 15.8:1 (AAA) |
| `text-secondary` | `text-neutral-700` | Subtítulos, metadados de alta relevância | 11.4:1 (AAA) |
| `text-tertiary` | `text-neutral-500` | Timestamps, labels auxiliares | 4.5:1 (AA) |
| `border-structural`| `border-neutral-200` | Divisores de seção, grid visível | N/A |
| `border-focus` | `border-neutral-900` | Estados de focus, active, bordas de ênfase | N/A |

## Acessibilidade Cromática
- Nenhum elemento interativo ou informativo depende exclusivamente da cor para ser compreendido.
- O contraste mínimo aceitável para texto é **7:1 (AAA)** para corpo de texto e **4.5:1 (AA)** para textos grandes/UI.
- O estado de `:focus-visible` deve sempre utilizar o anel de foco de alto contraste: `focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2`.
