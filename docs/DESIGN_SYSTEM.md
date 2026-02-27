# 🎨 Design System: Jornalista Inclusivo

Este documento define os tokens de design e componentes base para o desenvolvimento da interface, alinhado com o manifesto de acessibilidade.

## 🌈 Cores (Color Palette)

As cores foram definidas para garantir consistência e contraste.

### Cores Primárias (Brand)
Usadas em headers, botões primários e destaques.

| Token | Valor Hex | Uso | Contraste (vs Branco) |
| :--- | :--- | :--- | :--- |
| `brand-primary` | `#1F3FA3` | Botões, Links, Ícones | 8.8:1 (AAA) |
| `brand-dark` | `#142B70` | Headings, Footer, Hover states | 13.5:1 (AAA) |
| `brand-rose` | `#E11D48` | Editoria: Notícias | |
| `brand-amber` | `#D97706` | Editoria: Neurodiversidade | |
| `brand-teal` | `#0D9488` | Editoria: Saúde | |
| `brand-purple` | `#7C3AED` | Editoria: Educação | |
| `brand-green` | `#059669` | Editoria: Direitos PcD | |

### Cores Neutras (Neutral)
Usadas para texto, fundos e bordas.

| Token | Valor Hex | Uso |
| :--- | :--- | :--- |
| `neutral-50` | `#F9FAFB` | Background alternativo (seções) |
| `neutral-100` | `#F3F4F6` | Background de cards |
| `neutral-200` | `#E5E7EB` | Bordas, Divisores |
| `neutral-700` | `#374151` | Texto secundário (datas, legendas) |
| `neutral-900` | `#111827` | Texto principal (corpo) |

### Cores Semânticas (Feedback)
| Token | Valor | Uso |
| :--- | :--- | :--- |
| `success` | `#059669` | Mensagens de sucesso |
| `warning` | `#D97706` | Avisos |
| `error` | `#DC2626` | Erros de validação |

## 🔠 Tipografia

**Font Family:**
- Sans: `Inter` (Texto geral, UI)
- Serif: `Merriweather` ou `Lora` (Opcional para corpo de matérias longas, para melhor legibilidade) - *A definir na implementação*.
- Mono: `JetBrains Mono` (Dados, Código)

**Escala Tipográfica (Desktop):**
- `h1`: 2.5rem (40px) / Bold / Leading 1.2
- `h2`: 2rem (32px) / SemiBold / Leading 1.3
- `h3`: 1.5rem (24px) / SemiBold / Leading 1.4
- `body`: 1rem (16px) / Regular / Leading 1.6
- `small`: 0.875rem (14px) / Regular / Leading 1.5

## 🧱 Componentes Base (UI Kit)

### Button
- **Primary:** Fundo `brand-primary`, Texto Branco. Hover: `brand-dark`. Focus ring: `brand-primary` (com offset).
- **Secondary:** Borda `brand-primary`, Texto `brand-primary`, Fundo Transparente.
- **Ghost:** Texto `neutral-700`, Hover `neutral-100`.

### Card (Notícia)
- Container com borda sutil (`neutral-200`) ou sombra leve (`shadow-sm`).
- **Hover:** Elevação suave (`shadow-md`) e mudança na cor do título para `brand-primary`.
- **Acessibilidade:** Todo o card deve ser clicável (usando `::after` no link principal) ou ter links explícitos claros.

### Inputs (Formulários)
- Altura mínima de 44px (touch target).
- Labels sempre visíveis (nunca usar apenas placeholder).
- Bordas de alto contraste (`neutral-400` ou mais escuro).

## 📐 Grid & Layout

- **Container:** `max-w-7xl` (1280px) centralizado.
- **Grid de Artigos:**
  - Mobile: 1 coluna
  - Tablet: 2 colunas
  - Desktop: 3 ou 4 colunas (dependendo da seção)
- **Espaçamento (Gap):** Uso consistente da escala Tailwind (`gap-4`, `gap-6`, `gap-8`).

---

## 📱 Responsividade

- **Mobile First:** Todo CSS deve ser escrito pensando primeiro em telas pequenas.
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px
