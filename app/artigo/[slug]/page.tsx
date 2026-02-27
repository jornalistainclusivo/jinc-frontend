import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { ArticleAudioPlayer } from '@/components/news/ArticleAudioPlayer';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Simulated article data
  const article = {
    title: 'Governo anuncia novas regras de acessibilidade digital para sites públicos',
    subtitle: 'Especialistas avaliam impactos da nova regulamentação para pessoas com deficiência visual e auditiva no acesso a serviços essenciais.',
    category: 'Direitos PcD',
    author: 'Marina Silva',
    date: '25 de Fevereiro de 2026',
    readTime: '5 min de leitura',
    image: 'https://picsum.photos/1920/1080?random=1',
  };

  return (
    <article className="bg-white min-h-screen pb-24">
      {/* Article Header */}
      <header className="pt-12 pb-8 sm:pt-16 sm:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/direitos-pcd" 
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-green/80 mb-8 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-sm px-1"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para {article.category}
          </Link>
          
          <div className="flex items-center gap-x-3 text-sm mb-6">
            <span className="rounded-full bg-brand-green px-3 py-1 font-bold text-white shadow-sm">
              {article.category}
            </span>
            <time dateTime="2026-02-25" className="text-neutral-500 font-mono">
              {article.date}
            </time>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.15] mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-neutral-700 leading-relaxed mb-8 font-medium">
            {article.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-b border-neutral-200 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-neutral-200 overflow-hidden relative">
                <AutoAltImage src="https://picsum.photos/100/100?random=author" alt="" fill sizes="40px" className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Por {article.author}</p>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-500 mr-2">Compartilhar:</span>
              <button className="p-2 text-neutral-400 hover:text-brand-primary hover:bg-neutral-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary" aria-label="Compartilhar no Twitter">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-brand-primary hover:bg-neutral-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary" aria-label="Compartilhar no Facebook">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-brand-primary hover:bg-neutral-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary" aria-label="Compartilhar no LinkedIn">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-[#25D366] hover:bg-neutral-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366]" aria-label="Compartilhar no WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-brand-primary hover:bg-neutral-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary" aria-label="Copiar link">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <figure className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-neutral-100">
          <AutoAltImage
            src={article.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-sm text-white/90">
            Foto: Reprodução / Ilustrativa. Pessoas utilizando leitores de tela e teclados adaptados.
          </figcaption>
        </figure>
      </div>

      {/* Article Body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        <ArticleAudioPlayer 
          title={article.title} 
          text={`O governo federal publicou nesta terça-feira a nova portaria que estabelece diretrizes rigorosas de acessibilidade digital para todos os sites e aplicativos de serviços públicos. A medida entra em vigor em 120 dias. A nova regulamentação exige que todas as plataformas governamentais atinjam o nível AAA das Diretrizes de Acessibilidade para Conteúdo Web. Isso significa que serviços como agendamento de consultas, emissão de documentos e portais de transparência deverão ser totalmente navegáveis por teclado, compatíveis com leitores de tela avançados e oferecer alternativas em Libras. Para os usuários, a mudança promete reduzir drasticamente as barreiras de acesso. Atualmente, estima-se que menos de 2% dos sites públicos brasileiros sejam totalmente acessíveis. Entre as principais exigências da nova lei estão: contraste de cor adequado, textos alternativos obrigatórios para imagens, semântica HTML correta e prevenção de erros em formulários. Segundo Ana Costa, especialista em acessibilidade: "A acessibilidade digital não é um recurso extra, é um direito civil. Um site inacessível é o equivalente digital a um prédio público sem rampa." Agências de tecnologia e desenvolvedores que prestam serviço para o Estado terão que adaptar seus processos. A portaria prevê multas e a suspensão de contratos para empresas que entregarem produtos digitais fora das especificações. A fiscalização será feita por um comitê misto, composto por técnicos do governo e representantes de organizações da sociedade civil ligadas aos direitos das pessoas com deficiência.`} 
        />

        <div className="prose prose-lg md:prose-xl prose-neutral prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-[1.8] prose-p:text-neutral-800 prose-p:mb-6 prose-li:leading-[1.8] prose-li:text-neutral-800 prose-a:text-brand-green hover:prose-a:text-brand-green/80 prose-a:underline-offset-4 max-w-none mt-10">
          <p className="lead text-xl md:text-2xl text-neutral-800 font-medium leading-[1.7] mb-8">
            Em um marco histórico para a inclusão no Brasil, o governo federal publicou nesta terça-feira (25) uma nova portaria estabelecendo diretrizes rigorosas de acessibilidade digital. A medida, que entra em vigor em 120 dias, afeta todos os sites e aplicativos de serviços públicos do país.
          </p>
          
          <p>
            A nova regulamentação eleva o sarrafo da inclusão: agora, todas as plataformas governamentais deverão atingir o nível <strong>AAA</strong> das Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2). Na prática, isso significa que serviços essenciais — como o agendamento de consultas no SUS, a emissão de documentos e o acesso a portais de transparência — precisarão ser totalmente navegáveis por teclado, perfeitamente compatíveis com leitores de tela avançados e, fundamentalmente, oferecer alternativas em Libras (Língua Brasileira de Sinais).
          </p>

          <h2>O que muda no dia a dia?</h2>
          
          <p>
            Para os cidadãos, a mudança promete reduzir drasticamente as barreiras históricas de acesso à informação. Um levantamento recente estima que menos de 2% dos sites públicos brasileiros sejam, hoje, totalmente acessíveis. Para reverter esse cenário, a nova lei impõe exigências claras:
          </p>

          <ul className="space-y-4 my-8 pl-6">
            <li className="pl-2"><strong>Contraste visual aprimorado:</strong> Relação mínima de 7:1 para textos normais, garantindo uma leitura confortável para pessoas com baixa visão, daltonismo ou sensibilidade à luz.</li>
            <li className="pl-2"><strong>Descrições ricas (Alt Text):</strong> Obrigatoriedade de textos alternativos contextuais para todas as imagens, gráficos e infográficos, permitindo que usuários cegos compreendam o conteúdo visual.</li>
            <li className="pl-2"><strong>Arquitetura de informação acessível:</strong> Uso rigoroso de semântica HTML (como tags <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> e hierarquia lógica de cabeçalhos) para estruturar a página de forma compreensível para tecnologias assistivas.</li>
            <li className="pl-2"><strong>Navegação tolerante a erros:</strong> Formulários digitais deverão apresentar instruções nítidas, mensagens de erro específicas e tempo estendido para preenchimento, beneficiando usuários com deficiências cognitivas ou motoras.</li>
          </ul>

          <blockquote className="border-l-4 border-brand-green pl-6 my-10 italic text-neutral-800 bg-neutral-50 py-6 pr-6 rounded-r-xl shadow-sm">
            &quot;A acessibilidade digital não é um recurso extra, é um direito civil fundamental. Um site público inacessível é o equivalente digital a um prédio governamental construído sem rampas ou elevadores.&quot; <br/><span className="text-base font-semibold text-neutral-900 mt-4 block not-italic">— Ana Costa, especialista em acessibilidade e direitos digitais.</span>
          </blockquote>

          <h3>O impacto no mercado de tecnologia</h3>
          
          <p>
            A mudança não afeta apenas o usuário final. Agências de tecnologia, estúdios de design e desenvolvedores que prestam serviço para o Estado precisarão adaptar urgentemente seus processos de criação. A portaria é incisiva: prevê multas severas e até a suspensão de contratos para empresas que entregarem produtos digitais fora das novas especificações.
          </p>
          
          <p>
            Para garantir o cumprimento das regras, a fiscalização será conduzida por um comitê misto, composto tanto por técnicos do governo quanto por representantes de organizações da sociedade civil ligadas à defesa dos direitos das pessoas com deficiência, assegurando transparência e participação social no processo.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">Tags desta matéria</h3>
          <div className="flex flex-wrap gap-2">
            {['Acessibilidade Digital', 'WCAG', 'Governo Federal', 'Direitos Digitais', 'Inclusão'].map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
