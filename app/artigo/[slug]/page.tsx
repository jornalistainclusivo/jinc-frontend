'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, MessageCircle, Brain, Search } from 'lucide-react';
import { ArticleAudioPlayer } from '@/components/news/ArticleAudioPlayer';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load Focus Mode preference from localStorage on mount
  useEffect(() => {
    const savedFocusMode = localStorage.getItem('ji_focus_mode');
    if (savedFocusMode === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFocusMode(true);
    }
  }, []);

  // Save Focus Mode preference
  const toggleFocusMode = () => {
    const newValue = !isFocusMode;
    setIsFocusMode(newValue);
    localStorage.setItem('ji_focus_mode', String(newValue));
  };

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

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className={`min-h-screen pb-32 transition-colors duration-200 ease-in-out ${isFocusMode ? 'bg-[#FDFBF7]' : 'bg-white'}`}>
      
      {/* Progress Bar (Focus Mode Only) */}
      {isFocusMode && (
        <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 z-50">
          <div 
            className="h-full bg-brand-primary transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}

      {/* Article Header - Immersive & Editorial */}
      <header className={`pt-16 pb-10 sm:pt-24 sm:pb-16 border-b transition-colors duration-200 ease-in-out ${isFocusMode ? 'bg-[#FDFBF7] border-transparent' : 'bg-neutral-50 border-neutral-200'}`}>
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/direitos-pcd" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green hover:text-brand-green/80 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-4 rounded-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {article.category}
          </Link>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tighter text-neutral-900 leading-[1.05] mb-8 text-balance mx-auto max-w-[20ch]">
            {article.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-neutral-600 leading-[1.6] mb-10 font-light text-balance mx-auto max-w-[65ch]">
            {article.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500 font-medium">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-neutral-200 overflow-hidden relative shadow-sm">
                <AutoAltImage src="https://picsum.photos/100/100?random=author" alt="" fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left">
                <p className="text-base font-semibold text-neutral-900">{article.author}</p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider mt-0.5">
                  <time dateTime="2026-02-25">{article.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image - 21:9 Aspect Ratio */}
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-16 relative z-10 transition-all duration-200 ease-in-out ${isFocusMode ? 'max-w-[900px] opacity-90 grayscale-[20%]' : 'max-w-[1200px]'}`}>
        <figure className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl bg-neutral-100 shadow-2xl">
          <AutoAltImage
            src={article.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-sm text-white/90 font-medium">
            Foto: Reprodução / Ilustrativa. Pessoas utilizando leitores de tela e teclados adaptados.
          </figcaption>
        </figure>
      </div>

      {/* Article Body & Audio Player */}
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ease-in-out ${isFocusMode ? 'max-w-[70ch]' : 'max-w-[65ch]'}`}>
        
        {/* Share & Audio Container */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b transition-colors duration-200 ease-in-out ${isFocusMode ? 'border-neutral-300/50' : 'border-neutral-200'}`}>
          <div className="flex-1 w-full">
            <ArticleAudioPlayer 
              title={article.title} 
              text={`O governo federal publicou nesta terça-feira a nova portaria que estabelece diretrizes rigorosas de acessibilidade digital para todos os sites e aplicativos de serviços públicos. A medida entra em vigor em 120 dias. A nova regulamentação exige que todas as plataformas governamentais atinjam o nível AAA das Diretrizes de Acessibilidade para Conteúdo Web. Isso significa que serviços como agendamento de consultas, emissão de documentos e portais de transparência deverão ser totalmente navegáveis por teclado, compatíveis com leitores de tela avançados e oferecer alternativas em Libras. Para os usuários, a mudança promete reduzir drasticamente as barreiras de acesso. Atualmente, estima-se que menos de 2% dos sites públicos brasileiros sejam totalmente acessíveis. Entre as principais exigências da nova lei estão: contraste de cor adequado, textos alternativos obrigatórios para imagens, semântica HTML correta e prevenção de erros em formulários. Segundo Ana Costa, especialista em acessibilidade: "A acessibilidade digital não é um recurso extra, é um direito civil. Um site inacessível é o equivalente digital a um prédio público sem rampa." Agências de tecnologia e desenvolvedores que prestam serviço para o Estado terão que adaptar seus processos. A portaria prevê multas e a suspensão de contratos para empresas que entregarem produtos digitais fora das especificações. A fiscalização será feita por um comitê misto, composto por técnicos do governo e representantes de organizações da sociedade civil ligadas aos direitos das pessoas com deficiência.`} 
              onToggleFocusMode={toggleFocusMode}
              isFocusMode={isFocusMode}
            />
          </div>
          
          <div className={`flex items-center gap-2 md:pl-6 md:border-l shrink-0 transition-opacity duration-200 ease-in-out ${isFocusMode ? 'opacity-30 hover:opacity-100 border-neutral-300/50' : 'opacity-100 border-neutral-200'}`}>
            <button className="p-2.5 text-neutral-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Compartilhar no Twitter">
              <Twitter className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-neutral-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Compartilhar no Facebook">
              <Facebook className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-neutral-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Compartilhar no LinkedIn">
              <Linkedin className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-neutral-400 hover:text-[#25D366] hover:bg-[#25D366]/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]" aria-label="Compartilhar no WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-neutral-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Copiar link">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Typography Content */}
        <div className={`prose md:prose-xl max-w-none transition-all duration-200 ease-in-out
          prose-p:font-serif prose-p:leading-[1.9] prose-p:mb-8
          prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
          prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
          prose-a:text-brand-primary hover:prose-a:text-brand-dark prose-a:underline-offset-4 prose-a:decoration-brand-primary/30 hover:prose-a:decoration-brand-primary
          prose-li:font-serif prose-li:leading-[1.9]
          prose-strong:font-semibold
          ${isFocusMode 
            ? 'prose-neutral prose-p:text-neutral-900 prose-headings:text-black prose-li:text-neutral-900 prose-strong:text-black prose-lg text-lg' 
            : 'prose-neutral prose-p:text-neutral-800 prose-headings:text-neutral-900 prose-li:text-neutral-800 prose-strong:text-neutral-900 prose-lg'
          }
        `}>
          <p className={`lead font-sans text-2xl md:text-3xl font-light leading-[1.6] mb-12 transition-colors duration-200 ease-in-out ${isFocusMode ? 'text-neutral-800' : 'text-neutral-600'}`}>
            Em um marco histórico para a inclusão no Brasil, o governo federal publicou nesta terça-feira (25) uma nova portaria estabelecendo diretrizes rigorosas de acessibilidade digital. A medida, que entra em vigor em 120 dias, afeta todos os sites e aplicativos de serviços públicos do país.
          </p>
          
          <p>
            A nova regulamentação eleva o sarrafo da inclusão: agora, todas as plataformas governamentais deverão atingir o nível <strong>AAA</strong> das Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2). Na prática, isso significa que serviços essenciais — como o agendamento de consultas no SUS, a emissão de documentos e o acesso a portais de transparência — precisarão ser totalmente navegáveis por teclado, perfeitamente compatíveis com leitores de tela avançados e, fundamentalmente, oferecer alternativas em Libras (Língua Brasileira de Sinais).
          </p>

          {/* Contextual Layer Toggle */}
          <div className={`my-12 p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${isContextExpanded ? 'bg-brand-primary/5 border-brand-primary/20 shadow-inner' : 'bg-neutral-50 border-neutral-200 hover:border-brand-primary/30 shadow-sm'}`}>
            <button 
              onClick={() => setIsContextExpanded(!isContextExpanded)}
              className="flex items-center justify-between w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm group"
              aria-expanded={isContextExpanded}
            >
              <div className="flex items-center gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <Search className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-neutral-900 text-lg m-0">Entenda o Contexto: WCAG 2.2</h4>
                  <p className="font-sans text-sm text-neutral-500 m-0 mt-1">O que significa o nível AAA na prática?</p>
                </div>
              </div>
              <span className="text-brand-primary font-sans text-sm font-bold uppercase tracking-widest bg-brand-primary/5 px-4 py-2 rounded-full group-hover:bg-brand-primary/10 transition-colors">
                {isContextExpanded ? 'Ocultar' : 'Expandir'}
              </span>
            </button>
            
            {isContextExpanded && (
              <div className="mt-8 pt-8 border-t border-brand-primary/10 font-sans animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px bg-brand-primary/20 flex-1"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/60">Contexto editorial preparado pela equipe de acessibilidade</span>
                  <div className="h-px bg-brand-primary/20 flex-1"></div>
                </div>

                <div className="space-y-8">
                  {/* Layer 1: Technical Definition */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2 m-0 flex items-center gap-2">
                      <span aria-hidden="true">📌</span> Definição Técnica
                    </h5>
                    <p className="text-base text-neutral-700 m-0 leading-relaxed">
                      A <strong>WCAG (Web Content Accessibility Guidelines)</strong> é o padrão internacional de acessibilidade. O nível <strong>AAA</strong> é o grau máximo de conformidade, exigindo contraste extremo (7:1), linguagem simplificada (nível de ensino fundamental) e alternativas em língua de sinais para todos os vídeos pré-gravados.
                    </p>
                  </div>

                  {/* Layer 2: Institutional Relevance */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-widest text-brand-teal mb-2 m-0 flex items-center gap-2">
                      <span aria-hidden="true">🏛️</span> Relevância Institucional
                    </h5>
                    <p className="text-base text-neutral-700 m-0 leading-relaxed">
                      Para governos e grandes corporações, atingir o nível AAA deixa de ser apenas uma meta técnica e passa a ser uma <strong>obrigação de direitos civis</strong>. A nova portaria estabelece que a exclusão digital em serviços públicos é passível de judicialização, forçando o Estado a desenhar serviços que não deixem nenhum cidadão para trás.
                    </p>
                  </div>

                  {/* Layer 3: Practical Implication */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-widest text-brand-rose mb-2 m-0 flex items-center gap-2">
                      <span aria-hidden="true">📊</span> Implicação Prática
                    </h5>
                    <p className="text-base text-neutral-700 m-0 leading-relaxed">
                      Usuários com deficiência visual severa, daltonismo, surdez ou limitações cognitivas (como TDAH e dislexia) poderão navegar em portais de transparência, agendar consultas no SUS e emitir documentos sem depender da ajuda de terceiros. É a garantia de <strong>autonomia plena</strong> no ambiente digital.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <h2>O que muda no dia a dia?</h2>
          
          <p>
            Para os cidadãos, a mudança promete reduzir drasticamente as barreiras históricas de acesso à informação. Um levantamento recente estima que menos de 2% dos sites públicos brasileiros sejam, hoje, totalmente acessíveis. Para reverter esse cenário, a nova lei impõe exigências claras:
          </p>

          <ul className="space-y-4 my-10 pl-6 marker:text-brand-green">
            <li className="pl-2"><strong>Contraste visual aprimorado:</strong> Relação mínima de 7:1 para textos normais, garantindo uma leitura confortável para pessoas com baixa visão, daltonismo ou sensibilidade à luz.</li>
            <li className="pl-2"><strong>Descrições ricas (Alt Text):</strong> Obrigatoriedade de textos alternativos contextuais para todas as imagens, gráficos e infográficos, permitindo que usuários cegos compreendam o conteúdo visual.</li>
            <li className="pl-2"><strong>Arquitetura de informação acessível:</strong> Uso rigoroso de semântica HTML (como tags <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> e hierarquia lógica de cabeçalhos) para estruturar a página de forma compreensível para tecnologias assistivas.</li>
            <li className="pl-2"><strong>Navegação tolerante a erros:</strong> Formulários digitais deverão apresentar instruções nítidas, mensagens de erro específicas e tempo estendido para preenchimento, beneficiando usuários com deficiências cognitivas ou motoras.</li>
          </ul>

          {/* Pull Quote - Breaking the axis on desktop (Controlled 15%) */}
          <blockquote className={`relative my-16 font-serif text-2xl md:text-3xl leading-[1.4] italic border-none p-0 mx-0 md:-mx-12 text-left transition-colors duration-200 ease-in-out ${isFocusMode ? 'text-neutral-900' : 'text-brand-dark'}`}>
            <span className={`absolute -top-10 -left-6 text-8xl font-serif transition-colors duration-200 ease-in-out ${isFocusMode ? 'text-neutral-200' : 'text-brand-green/20'}`} aria-hidden="true">&ldquo;</span>
            <p className="relative z-10 m-0">A acessibilidade digital não é um recurso extra, é um direito civil fundamental. Um site público inacessível é o equivalente digital a um prédio governamental construído sem rampas ou elevadores.</p>
            <footer className="mt-6 text-base font-sans font-semibold text-neutral-500 not-italic uppercase tracking-widest">
              &mdash; Ana Costa, especialista em acessibilidade
            </footer>
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
        <div className={`mt-16 pt-10 border-t transition-opacity duration-200 ease-in-out ${isFocusMode ? 'opacity-30 hover:opacity-100 border-neutral-300/50' : 'opacity-100 border-neutral-200'}`}>
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Tópicos desta matéria</h3>
          <div className="flex flex-wrap gap-3">
            {['Acessibilidade Digital', 'WCAG', 'Governo Federal', 'Direitos Digitais', 'Inclusão'].map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center rounded-full bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 transition-colors"
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
