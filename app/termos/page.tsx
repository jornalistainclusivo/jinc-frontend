import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso do Jornalista Inclusivo. Regras e diretrizes para a utilização do nosso portal.',
};

export default function TermosPage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg md:prose-xl prose-neutral prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl sm:prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-[1.8] prose-p:text-neutral-800 prose-p:mb-6 prose-li:leading-[1.8] prose-li:text-neutral-800 prose-a:text-brand-primary hover:prose-a:text-brand-dark prose-a:underline-offset-4 max-w-none">
          
          <h1>Termos de Uso</h1>
          <p className="text-sm text-neutral-500 font-mono mb-12">Última atualização: 26 de Fevereiro de 2026</p>

          <p className="lead text-xl md:text-2xl text-neutral-800 font-medium leading-[1.7] mb-8">
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
      </div>
    </div>
  );
}
