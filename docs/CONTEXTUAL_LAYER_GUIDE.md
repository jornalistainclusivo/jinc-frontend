# Documentação: `<ContextualLayer />` ("Entenda o Contexto")

Um módulo expansível (acordeão) projetado como um "Pit Stop Cognitivo" para fornecer contexto técnico, governamental ou histórico no meio de uma matéria jornalística, sem forçar o usuário a sair da página.

**Status:** IMPLEMENTADO E INTEGRADO
**Localização:** `jinc-frontend/components/news/ContextualLayer.tsx`

---

## 📍 1. Estratégia Editorial (Onde Inserir?)

O `ContextualLayer` não é um "banner" promovendo links. Ele deve ser inserido estrategicamente onde o leitor precisa de uma pausa para processar uma informação complexa antes de continuar a leitura.

### Posições Recomendadas

* **Pós-Lead (Momento da Dúvida):** Logo após os 2 primeiros parágrafos, quando a matéria cita uma lei (ex: LBI), uma sigla (ex: BPC) ou um conceito técnico (ex: Neurodivergência). O leitor não deve avançar no texto sem entender a base.
* **Transição de Seção:** Entre o "O que aconteceu" (Fato) e o "Por que isso importa" (Análise). Funciona como um "respiro" visual.

### Onde NUNCA Inserir

* No meio de uma frase.
* Dentro de uma citação (aspas).
* No último parágrafo (o contexto deve vir antes, não depois do fim do texto).

---

## 🎨 2. Especificações Visuais (Brutalismo Estrutural)

O componente adota uma estética de **Brutalismo Estrutural**, rejeitando "cards" arredondados e caixas sombreadas em favor de linhas fortes horizontais e verticais que criam uma pausa dramática.

O componente possui duas variantes de renderização que são decididas automaticamente pelas `props` enviadas:

### 2.1. Variante Simples (1 Coluna)

Usada para explicações diretas de apenas um parágrafo.

* **Aspecto:** Texto contínuo, serifado e grande para leitura confortável.
* **Gatilho:** Prop `content` informada como string ou HTML.

### 2.2. Variante Complexa (3 Colunas)

Para temas complexos, expande-se em um Grid de 3 Colunas (no desktop), atacando o assunto por três ângulos complementares:

* **Coluna 1 (O Conceito 🧠):** Texto serifado. Foco na definição didática.
* **Coluna 2 (A Regra ⚖️):** Texto monoespaçado. Foco na lei, no artigo governamental ou no dado técnico absoluto.
* **Coluna 3 (O Impacto 🎯):** Texto sem serifa (sans). Foco no reflexo prático na vida do leitor.
* **Gatilho:** Prop `columns` informada como um array de 3 objetos `{icon, title, content}`.

Em ambas, a hierarquia tipográfica do botão principal mantém-se igual, englobando o selo `ENTENDA O CONTEXTO` e um ícone `Info` negro.

---

## ♿ 3. Interatividade e Acessibilidade (A11y)

A acessibilidade é inegociável na estrutura deste componente interativo Client-Side.

* **Foco Visível:** O anel de foco é de alto contraste (`focus-visible:ring-neutral-900 focus-visible:ring-inset`).
* **Semântica ARIA:**
  * `aria-expanded={isOpen}` no botão principal para screen readers.
  * `aria-controls="context-layer-X"` para relacionar o botão à área expansível.
  * Áreas visuais irrelevantes como ícones ostentam `aria-hidden="true"`.
* **Animação Inclusiva:** A expansão utiliza manipuladores CSS do Tailwind (transição de `grid-template-rows` de `0fr` para `1fr`), não utilizando Javascript pesado e sendo fluido mesmo em dispositivos com menor capacidade de processamento sem engatilhar vestibulopatias rápidas.

---

## 🛠️ 4. Guia de Integração com o Strapi (Backend)

No servidor (Server Components), a injeção renderiza nativamente este componente via blocos.

### 4.1 Modelagem (Dynamic Zones)

Crie um componente no CMS chamado `ContextBlock` no tipo de conteúdo `Article` com campos para título e, opcionalmente, as 3 colunas (repetidor ou zona).

### 4.2 O Block Renderer (Next.js)

No componente que itera os blocos da matéria (ex. `StrapiBlocks.tsx`), ao detectar o tipo referente ao contexto:

```tsx
// Exemplo de iteração (page.tsx / StrapiBlocks.tsx)
import { ContextualLayer } from '@/components/news/ContextualLayer';

{blocks.map((block, index) => {
  if (block.type === 'context_block') {
    return (
      <ContextualLayer 
        key={index} 
        title={block.title} 
        // Injeta a string simples:
        content={block.explanation} 
        // OU injeta o array de 3 colunas:
        /* columns={[
          { icon: block.col1Icon, title: block.col1Title, content: block.col1Text },
          // ...
        ]} */
      />
    );
  }
  // ... Outros retornos
})}
```

A injeção do block pode também ser feita programaticamente através do mapeamento em `page.tsx` procurando índices de elementos `paragraph` e fatiando o array, como demonstrado na implementação pós-lead da arquitetura base.
