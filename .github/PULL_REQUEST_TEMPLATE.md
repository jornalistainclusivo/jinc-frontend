<!-- 
Obrigado por contribuir com o Jornalista Inclusivo! 
Por favor, preencha este template com o máximo de detalhes possível. 
PRs sem o checklist de acessibilidade preenchido serão fechados automaticamente.
-->

## 📝 Descrição
<!-- Descreva de forma clara e concisa o que este PR faz. Qual problema ele resolve? -->

## 🔗 Issue Relacionada
<!-- Se este PR resolve uma issue existente, referencie-a aqui. Ex: Fixes #123 -->

## 🏷️ Tipo de Mudança
<!-- Marque as opções relevantes com um 'x' -->
- [ ] 🐛 Bug fix (mudança não-quebrante que corrige um problema)
- [ ] ✨ Nova feature (mudança não-quebrante que adiciona funcionalidade)
- [ ] 💥 Breaking change (correção ou feature que faria funcionalidades existentes não funcionarem como esperado)
- [ ] ♿ Acessibilidade (melhoria focada exclusivamente em A11y)
- [ ] 📚 Documentação (atualização de README, /docs, etc)
- [ ] 🎨 Refatoração (mudança de código que não corrige bug nem adiciona feature)

---

## ♿ Checklist de Acessibilidade (OBRIGATÓRIO)
<!-- 
A acessibilidade é a fundação deste projeto. 
Você DEVE testar e marcar todas as opções abaixo antes de solicitar revisão. 
-->
- [ ] **Navegação por Teclado:** Consigo navegar por todos os elementos interativos adicionados/modificados usando apenas a tecla `Tab` e `Shift + Tab`.
- [ ] **Foco Visível:** Todos os elementos interativos possuem o estado de foco padrão (`focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2`).
- [ ] **Semântica HTML:** Utilizei tags semânticas apropriadas (`<button>`, `<a>`, `<nav>`, `<article>`, etc.) em vez de `<div>` ou `<span>` com eventos de clique.
- [ ] **Leitores de Tela:** Testei com um leitor de tela (VoiceOver, NVDA, TalkBack) OU garanti que todos os ícones/elementos visuais não-textuais possuem `aria-hidden="true"` ou um `aria-label` descritivo.
- [ ] **Contraste (WCAG AAA):** O contraste de texto sobre fundo atende à proporção mínima de 7:1 (AAA) para texto normal e 4.5:1 para textos grandes/UI.
- [ ] **Imagens:** Todas as imagens informativas utilizam o componente `<AutoAltImage>` e possuem um `alt` descritivo (ou `alt=""` se puramente decorativas).
- [ ] **Redução de Movimento:** Animações respeitam a preferência do usuário (`motion-reduce:` ou equivalente).

## 🏛️ Checklist do Design System & Arquitetura
- [ ] **Minimalismo Institucional:** Não introduzi cores de categoria (ex: `brand-rose`, `brand-amber`). Utilizei a paleta neutra estrutural (`neutral-900`, `neutral-50`, etc).
- [ ] **Neuroergonomia:** O conteúdo de leitura respeita o limite estrito de largura (`max-w-[70ch]`).
- [ ] **Tipografia:** Utilizei `font-serif` para títulos/corpo de texto e `font-sans` para UI/metadados, conforme o `DESIGN_SYSTEM.md`.

## 📸 Screenshots ou Gravações de Tela (Opcional, mas recomendado)
<!-- Adicione imagens ou GIFs mostrando o "Antes" e "Depois" da sua alteração, especialmente para mudanças de UI. -->
| Antes | Depois |
| --- | --- |
| <!-- Inserir imagem aqui --> | <!-- Inserir imagem aqui --> |

## 🧪 Como Testar
<!-- Descreva os passos exatos para que o revisor possa testar sua alteração localmente. -->
1. Faça o checkout desta branch.
2. Rode `npm run dev`.
3. Acesse a rota `/sua-rota`.
4. Verifique o comportamento X.

## ✅ Checklist Final
- [ ] Meu código segue o estilo de código deste projeto.
- [ ] Realizei uma auto-revisão do meu próprio código.
- [ ] Comentei meu código, particularmente em áreas difíceis de entender.
- [ ] Atualizei a documentação correspondente (se aplicável).
- [ ] Meu código não gera novos avisos (warnings) no console.
