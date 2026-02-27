import { Accessibility, Eye, Type, MousePointerClick, Ear } from 'lucide-react';

export default function AcessibilidadePage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Accessibility className="h-16 w-16 mx-auto mb-6 text-brand-primary bg-white rounded-full p-3" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Acessibilidade do Site
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            O Jornalista Inclusivo foi projetado e desenvolvido para ser acessível a todas as pessoas, independentemente de suas habilidades ou tecnologias utilizadas.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="prose prose-lg prose-neutral prose-a:text-brand-primary max-w-none">
          <h2>Nosso Compromisso</h2>
          <p>
            Acreditamos que a informação é um direito universal. Por isso, nossa plataforma foi construída seguindo rigorosamente as <strong>Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2)</strong>, buscando atingir o nível AAA em nossos componentes principais.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <Eye className="h-8 w-8 text-brand-primary mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Alto Contraste</h3>
              <p className="text-neutral-600 text-sm">
                Disponibilizamos um modo de alto contraste nativo que inverte as cores da interface, garantindo uma relação de contraste superior a 7:1, ideal para pessoas com baixa visão.
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <Type className="h-8 w-8 text-brand-primary mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Tipografia Fluida</h3>
              <p className="text-neutral-600 text-sm">
                O tamanho da fonte pode ser ajustado diretamente na nossa barra de ferramentas, e o site respeita as configurações de zoom do seu navegador ou sistema operacional.
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <MousePointerClick className="h-8 w-8 text-brand-primary mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Navegação por Teclado</h3>
              <p className="text-neutral-600 text-sm">
                Todo o site pode ser operado utilizando apenas o teclado. Implementamos anéis de foco visíveis e atalhos de &quot;Pular para o conteúdo&quot; (Skip Links).
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <Ear className="h-8 w-8 text-brand-primary mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Leitores de Tela</h3>
              <p className="text-neutral-600 text-sm">
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
      </div>
    </div>
  );
}
