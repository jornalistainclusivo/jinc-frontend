# UI Architecture & Layout

## Estrutura Macro
A interface do Jornalista Inclusivo é desenhada para desaparecer, permitindo que o jornalismo e as ferramentas de acessibilidade assumam o protagonismo. A arquitetura segue o princípio **Modern Institutional Minimalist**.

## O Grid Editorial
- **Largura Máxima de Leitura:** Estritamente contida em `max-w-[70ch]`. Esta é uma regra inegociável baseada em neuroergonomia para evitar fadiga ocular.
- **Alinhamento de Módulos:** Componentes inseridos no meio do texto (como o `ArticleAudioPlayer` ou `ContextualLayer`) devem respeitar o mesmo eixo de `70ch`. Eles não devem "vazar" para as margens em telas grandes.
- **Imagens em Destaque:** Ocupam uma largura maior (`max-w-[1200px]`) para criar tensão visual e hierarquia, mas o texto retorna imediatamente ao grid restrito.

## Lógica de Sticky Elements
Elementos "sticky" (fixos na tela) são altamente intrusivos e devem ser usados com extrema parcimônia.

### Sticky Audio Player
- **Comportamento:** Transiciona de um módulo inline para uma barra fixa no rodapé (`bottom-0`) quando o módulo original sai da viewport (scroll down).
- **Design:** Ultra minimalista. Horizontal. Ocupa 100% da largura da tela, mas seu conteúdo interno respeita o grid central de `70ch`.
- **Regra de Ouro:** O sticky player nunca deve parecer um "card flutuante". Ele deve parecer uma barra de sistema nativa do navegador (`rounded-none`, `border-t border-neutral-200`).

## Modo Foco Profundo (Reader Intelligence Mode)
Uma infraestrutura cognitiva ativada pelo usuário para leitura imersiva.
- **Mutações de Layout:** 
  - Fundo transiciona de `bg-white` para `bg-[#FDFBF7]` (off-white quente).
  - Imagens recebem `grayscale-[20%]` e `opacity-90` para reduzir o brilho.
  - Elementos periféricos (share buttons) têm opacidade reduzida para `30%` (revelam-se apenas no hover).
  - Barra de progresso de leitura injetada no topo da tela (`fixed top-0`).
  - Tipografia do artigo transiciona para um contraste mais suave (`text-neutral-800`).
