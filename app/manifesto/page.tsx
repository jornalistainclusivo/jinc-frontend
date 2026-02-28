import Link from 'next/link';
import { ArrowLeft, BookOpen, Eye, Brain, Code2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manifesto de Leitura e Acessibilidade | Jornalista Inclusivo',
  description: 'Nosso compromisso institucional com a neuroergonomia, acessibilidade digital (WCAG 2.2) e a redução do ruído cognitivo no jornalismo.',
};

export default function ManifestoPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 rounded-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para a Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6 text-balance mx-auto">
            Manifesto Editorial de Leitura e Acessibilidade
          </h1>
          
          <p className="text-xl text-neutral-400 leading-[1.6] font-light text-balance mx-auto max-w-[55ch]">
            Acreditamos que a informação só é verdadeiramente pública quando a sua arquitetura não impõe barreiras físicas, sensoriais ou cognitivas.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[70ch] px-4 sm:px-6 lg:px-8 pt-16">
        <div className="prose prose-lg md:prose-xl prose-neutral max-w-none
          prose-p:font-serif prose-p:leading-[1.9] prose-p:text-neutral-800 prose-p:mb-8
          prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-neutral-900
          prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:flex prose-h2:items-center prose-h2:gap-3
          prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6
          prose-a:text-brand-primary hover:prose-a:text-brand-dark prose-a:underline-offset-4 prose-a:decoration-brand-primary/30 hover:prose-a:decoration-brand-primary
          prose-li:font-serif prose-li:leading-[1.9] prose-li:text-neutral-800
          prose-strong:font-semibold prose-strong:text-neutral-900
        ">
          <p className="lead font-sans text-2xl md:text-3xl text-neutral-600 font-light leading-[1.6] mb-12">
            O Jornalista Inclusivo não é apenas um portal de notícias. É um laboratório vivo de como o jornalismo digital deve operar na era da neurodiversidade e dos direitos civis digitais.
          </p>

          <p>
            Em um ecossistema digital dominado pela economia da atenção, algoritmos predatórios e interfaces caóticas, decidimos seguir o caminho oposto. Desenhamos nossa plataforma baseada em evidências científicas de neuroergonomia e nos mais rigorosos padrões internacionais de acessibilidade.
          </p>

          <h2>
            <Eye className="h-8 w-8 text-neutral-900" aria-hidden="true" />
            1. Acessibilidade como Fundação (WCAG 2.2)
          </h2>
          <p>
            Não tratamos a acessibilidade como um <em>plugin</em> ou uma camada corretiva aplicada no final do processo. Ela é a fundação do nosso código. Comprometemo-nos publicamente a buscar e manter os padrões <strong>AA e AAA da WCAG 2.2</strong>. Isso significa contraste rigoroso, navegação impecável por teclado, suporte nativo a leitores de tela e respeito absoluto às preferências do sistema do usuário (como a redução de movimento).
          </p>

          <h2>
            <Brain className="h-8 w-8 text-neutral-900" aria-hidden="true" />
            2. Neuroergonomia e Redução de Ruído
          </h2>
          <p>
            A fadiga de decisão e a sobrecarga cognitiva são barreiras invisíveis. Para combatê-las, implementamos:
          </p>
          <ul>
            <li><strong>Controle de Largura:</strong> Nossas colunas de texto são estritamente limitadas a 65-70 caracteres por linha, o padrão ouro para conforto ocular e retenção de leitura.</li>
            <li><strong>Modo Foco Profundo:</strong> Uma infraestrutura cognitiva opcional que reduz o contraste periférico, ajusta a temperatura da cor da tela e elimina distrações para leituras analíticas.</li>
            <li><strong>Hierarquia Inquestionável:</strong> Eliminamos o &quot;paradoxo da escolha&quot; através de uma curadoria editorial clara, onde o design dita o que é urgente e o que é perene.</li>
          </ul>

          <h2>
            <BookOpen className="h-8 w-8 text-neutral-900" aria-hidden="true" />
            3. Contexto Estruturado
          </h2>
          <p>
            O jornalismo moderno não deve apenas relatar o fato, mas fornecer as ferramentas epistemológicas para sua compreensão. Nossas <em>Camadas de Contexto</em> oferecem definições técnicas, relevância institucional e implicações práticas integradas ao fluxo de leitura, sem forçar o usuário a abandonar a página para entender um conceito.
          </p>

          <h2>
            <Code2 className="h-8 w-8 text-neutral-900" aria-hidden="true" />
            4. O Futuro: Um Padrão Aberto (Open-Source)
          </h2>
          <p>
            Acreditamos que a inclusão não deve ser uma vantagem competitiva proprietária. O código, os tokens de design e a arquitetura cognitiva que sustentam o Jornalista Inclusivo nascem com a vocação de se tornarem uma <strong>base para um framework open-source de jornalismo acessível</strong>. 
          </p>
          <p>
            Nosso objetivo de longo prazo é documentar e licenciar abertamente esta infraestrutura, permitindo que redações locais, independentes e globais adotem um padrão de excelência em acessibilidade sem precisarem reinventar a roda.
          </p>

          <hr className="my-12 border-neutral-200" />

          <p className="text-sm text-neutral-500 font-sans uppercase tracking-widest font-bold text-center">
            Este documento é vivo e auditável. <br/>Última atualização: Fevereiro de 2026.
          </p>
        </div>
      </main>
    </div>
  );
}
