import { Accessibility, Eye, Type, MousePointerClick, Ear } from 'lucide-react';

export default function AcessibilidadePage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <Accessibility className="h-12 w-12 mx-auto mb-8 text-white" aria-hidden="true" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6 text-balance mx-auto">
            Acessibilidade do Site
          </h1>
          <p className="text-xl text-neutral-400 leading-[1.6] font-light text-balance mx-auto max-w-[55ch]">
            O Jornalista Inclusivo foi projetado e desenvolvido para ser acessível a todas as pessoas, independentemente de suas habilidades ou tecnologias utilizadas.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[70ch] px-4 sm:px-6 lg:px-8 pt-16">
        <div className="prose prose-lg md:prose-xl prose-neutral max-w-none
          prose-p:font-serif prose-p:leading-[1.9] prose-p:text-neutral-800 prose-p:mb-8
          prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900
          prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
          prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
          prose-a:text-brand-primary hover:prose-a:text-brand-dark prose-a:underline-offset-4 prose-a:decoration-brand-primary/30 hover:prose-a:decoration-brand-primary
          prose-li:font-serif prose-li:leading-[1.9] prose-li:text-neutral-800
          prose-strong:font-semibold prose-strong:text-neutral-900
        ">
          <p className="lead font-sans text-2xl md:text-3xl text-neutral-600 font-light leading-[1.6] mb-12">
            Acreditamos que a informação é um direito universal. Por isso, nossa plataforma foi construída seguindo rigorosamente as <strong>Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2)</strong>, buscando atingir o nível AAA em nossos componentes principais.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 my-16 not-prose">
            <div className="bg-white p-8 rounded-none border border-neutral-200 shadow-xl">
              <Eye className="h-8 w-8 text-neutral-900 mb-6" aria-hidden="true" />
              <h3 className="text-lg font-bold text-neutral-900 mb-3 font-sans">Alto Contraste</h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                Disponibilizamos um modo de alto contraste nativo que inverte as cores da interface, garantindo uma relação de contraste superior a 7:1, ideal para pessoas com baixa visão.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-none border border-neutral-200 shadow-xl">
              <Type className="h-8 w-8 text-neutral-900 mb-6" aria-hidden="true" />
              <h3 className="text-lg font-bold text-neutral-900 mb-3 font-sans">Tipografia Fluida</h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                O tamanho da fonte pode ser ajustado diretamente na nossa barra de ferramentas, e o site respeita as configurações de zoom do seu navegador ou sistema operacional.
              </p>
            </div>

            <div className="bg-white p-8 rounded-none border border-neutral-200 shadow-xl">
              <MousePointerClick className="h-8 w-8 text-neutral-900 mb-6" aria-hidden="true" />
              <h3 className="text-lg font-bold text-neutral-900 mb-3 font-sans">Navegação por Teclado</h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                Todo o site pode ser operado utilizando apenas o teclado. Implementamos anéis de foco visíveis e atalhos de &quot;Pular para o conteúdo&quot; (Skip Links).
              </p>
            </div>

            <div className="bg-white p-8 rounded-none border border-neutral-200 shadow-xl">
              <Ear className="h-8 w-8 text-neutral-900 mb-6" aria-hidden="true" />
              <h3 className="text-lg font-bold text-neutral-900 mb-3 font-sans">Leitores de Tela</h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                Utilizamos HTML semântico (tags como nav, main, article) e atributos ARIA para garantir que softwares como NVDA, JAWS e VoiceOver interpretem a página corretamente.
              </p>
            </div>
          </div>

          <h2>Como usar nossas ferramentas</h2>
          <p>
            No topo de todas as páginas, você encontrará nossa <strong>Barra de Acessibilidade</strong>. Nela, você pode:
          </p>
          <ul>
            <li>Clicar em <strong>A+</strong> ou <strong>A-</strong> para redimensionar os textos.</li>
            <li>Clicar em <strong>Alto Contraste</strong> para ativar o tema escuro com fontes amarelas de alta legibilidade.</li>
          </ul>

          <h2>Encontrou uma barreira?</h2>
          <p>
            Apesar de nossos esforços contínuos, sabemos que a acessibilidade é uma jornada. Se você encontrou alguma dificuldade para navegar, ler ou interagir com nosso conteúdo, por favor, avise-nos.
          </p>
          <p>
            Envie um e-mail para <strong>acessibilidade@jornalistainclusivo.com.br</strong> descrevendo o problema e a tecnologia assistiva que você estava utilizando. Sua ajuda é fundamental para melhorarmos.
          </p>
        </div>
      </main>
    </div>
  );
}
