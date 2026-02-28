import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do Jornalista Inclusivo. Regras e diretrizes para a utilização do nosso portal.',
};

export default function TermosPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6 text-balance mx-auto">
            Termos de Uso
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-8">
            Última atualização: 26 de Fevereiro de 2026
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[70ch] px-4 sm:px-6 lg:px-8 pt-16">
        <div className="prose prose-lg md:prose-xl prose-neutral max-w-none
          prose-p:font-serif prose-p:leading-[1.9] prose-p:text-neutral-800 prose-p:mb-8
          prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900
          prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
          prose-a:text-neutral-900 hover:prose-a:text-neutral-700 prose-a:underline-offset-4 prose-a:decoration-neutral-300 hover:prose-a:decoration-neutral-900
          prose-li:font-serif prose-li:leading-[1.9] prose-li:text-neutral-800
          prose-strong:font-semibold prose-strong:text-neutral-900
        ">
          
          <p className="lead font-sans text-2xl md:text-3xl text-neutral-600 font-light leading-[1.6] mb-12">
            Bem-vindo ao <strong>Jornalista Inclusivo</strong>. Ao acessar e utilizar nosso portal, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Por favor, leia-os atentamente antes de continuar a navegação.
          </p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar o site Jornalista Inclusivo, você concorda com estes Termos de Uso, bem como com nossa <Link href="/privacidade">Política de Privacidade</Link>. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.
          </p>

          <h2>2. Uso do Conteúdo</h2>
          <p>
            O conteúdo publicado no Jornalista Inclusivo, incluindo textos, imagens, áudios, vídeos e design, é protegido por leis de direitos autorais e propriedade intelectual.
          </p>
          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2"><strong>Uso Pessoal:</strong> Você pode acessar, visualizar e imprimir o conteúdo para uso pessoal e não comercial.</li>
            <li className="pl-2"><strong>Compartilhamento:</strong> Encorajamos o compartilhamento de nossos links em redes sociais e outras plataformas, desde que o crédito seja dado ao Jornalista Inclusivo e o link original seja mantido.</li>
            <li className="pl-2"><strong>Reprodução:</strong> A reprodução total ou parcial de nossos artigos em outros sites, blogs ou publicações impressas requer autorização prévia por escrito. Entre em contato através de <strong>redacao@jornalistainclusivo.com.br</strong> para solicitar permissão.</li>
          </ul>

          <h2>3. Conduta do Usuário</h2>
          <p>
            Ao interagir com o nosso portal (por exemplo, em áreas de comentários, se disponíveis, ou formulários de contato), você concorda em não:
          </p>
          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2">Publicar conteúdo difamatório, ofensivo, discriminatório, capacitista, racista, homofóbico ou que viole os direitos de terceiros.</li>
            <li className="pl-2">Enviar spam, correntes ou qualquer tipo de publicidade não autorizada.</li>
            <li className="pl-2">Tentar acessar áreas restritas do site, interferir em seu funcionamento ou disseminar vírus e malwares.</li>
          </ul>
          <p>
            Reservamo-nos o direito de remover qualquer conteúdo gerado pelo usuário que viole estas regras e de bloquear o acesso de infratores.
          </p>

          <h2>4. Links para Terceiros</h2>
          <p>
            Nosso site pode conter links para sites de terceiros que não são operados ou controlados por nós. Não nos responsabilizamos pelo conteúdo, políticas de privacidade ou práticas desses sites. A inclusão de qualquer link não implica necessariamente uma recomendação ou endosso das visões expressas neles.
          </p>

          <h2>5. Isenção de Responsabilidade</h2>
          <p>
            O Jornalista Inclusivo se esforça para fornecer informações precisas, atualizadas e de alta qualidade. No entanto, não garantimos a exatidão, integridade ou atualidade de todo o conteúdo. As informações publicadas têm caráter jornalístico e informativo, não substituindo aconselhamento profissional (jurídico, médico, psicológico, etc.).
          </p>

          <h2>6. Modificações nos Termos</h2>
          <p>
            Podemos revisar e atualizar estes Termos de Uso periodicamente, a nosso critério exclusivo. Todas as modificações entram em vigor imediatamente após a publicação no site. O uso contínuo do portal após a publicação de Termos de Uso revisados significa que você aceita e concorda com as mudanças.
          </p>

          <h2>7. Contato</h2>
          <p>
            Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco através da nossa página de <Link href="/contato">Contato</Link> ou pelo e-mail <strong>contato@jornalistainclusivo.com.br</strong>.
          </p>

        </div>
      </main>
    </div>
  );
}
