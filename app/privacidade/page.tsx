import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do Jornalista Inclusivo. Saiba como coletamos, usamos e protegemos seus dados.',
};

export default function PrivacidadePage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg md:prose-xl prose-neutral prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl sm:prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-[1.8] prose-p:text-neutral-800 prose-p:mb-6 prose-li:leading-[1.8] prose-li:text-neutral-800 prose-a:text-brand-primary hover:prose-a:text-brand-dark prose-a:underline-offset-4 max-w-none">
          
          <h1>Política de Privacidade</h1>
          <p className="text-sm text-neutral-500 font-mono mb-12">Última atualização: 26 de Fevereiro de 2026</p>

          <p className="lead text-xl md:text-2xl text-neutral-800 font-medium leading-[1.7] mb-8">
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
      </div>
    </div>
  );
}
