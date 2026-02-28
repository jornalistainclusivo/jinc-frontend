import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do Jornalista Inclusivo. Saiba como coletamos, usamos e protegemos seus dados.',
};

export default function PrivacidadePage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6 text-balance mx-auto">
            Política de Privacidade
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
            O <strong>Jornalista Inclusivo</strong> valoriza a sua privacidade e se compromete a proteger os seus dados pessoais. Esta política descreve como coletamos, usamos, armazenamos e protegemos as informações que você nos fornece ao utilizar nosso portal.
          </p>

          <h2>1. Coleta de Dados</h2>
          <p>
            Coletamos informações de duas maneiras principais:
          </p>
          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2"><strong>Dados fornecidos por você:</strong> Quando você assina nossa newsletter, preenche formulários de contato ou participa de pesquisas, coletamos seu nome, endereço de e-mail e outras informações que você decida compartilhar.</li>
            <li className="pl-2"><strong>Dados coletados automaticamente:</strong> Utilizamos cookies e tecnologias semelhantes para coletar dados de navegação, como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência no site. Isso nos ajuda a entender como você usa o portal e a melhorar a sua experiência.</li>
          </ul>

          <h2>2. Uso das Informações</h2>
          <p>
            As informações coletadas são utilizadas para os seguintes fins:
          </p>
          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2">Enviar nossa newsletter semanal e comunicados importantes.</li>
            <li className="pl-2">Responder a dúvidas, sugestões ou solicitações de suporte.</li>
            <li className="pl-2">Personalizar e melhorar o conteúdo e a usabilidade do site.</li>
            <li className="pl-2">Analisar métricas de acesso para entender o perfil do nosso público e otimizar nossas reportagens.</li>
          </ul>

          <h2>3. Compartilhamento de Dados</h2>
          <p>
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Podemos compartilhar informações apenas nas seguintes situações:
          </p>
          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2">Com provedores de serviços confiáveis (como plataformas de envio de e-mail ou hospedagem), que atuam em nosso nome e estão sujeitos a rigorosos acordos de confidencialidade.</li>
            <li className="pl-2">Quando exigido por lei, ordem judicial ou solicitação de autoridades competentes.</li>
          </ul>

          <h2>4. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro.
          </p>

          <h2>5. Seus Direitos</h2>
          <p>
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
          </p>
          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2">Acessar os dados pessoais que mantemos sobre você.</li>
            <li className="pl-2">Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
            <li className="pl-2">Solicitar a exclusão dos seus dados (direito ao esquecimento).</li>
            <li className="pl-2">Revogar o consentimento para o envio de newsletters a qualquer momento, clicando no link de descadastramento no final de nossos e-mails.</li>
          </ul>

          <h2>6. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato conosco através do e-mail <strong>privacidade@jornalistainclusivo.com.br</strong> ou acesse nossa página de <Link href="/contato">Contato</Link>.
          </p>

        </div>
      </main>
    </div>
  );
}
