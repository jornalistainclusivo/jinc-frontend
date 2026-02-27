import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  // Format category slug to Title Case
  const formattedCategory = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const getCategoryTheme = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('notícia')) return { bg: 'bg-brand-rose', text: 'text-brand-rose', hover: 'hover:text-brand-rose', hoverBg: 'hover:bg-brand-rose/10', ring: 'focus:ring-brand-rose', border: 'border-brand-rose' };
    if (lower.includes('neurodiversidade')) return { bg: 'bg-brand-amber', text: 'text-brand-amber', hover: 'hover:text-brand-amber', hoverBg: 'hover:bg-brand-amber/10', ring: 'focus:ring-brand-amber', border: 'border-brand-amber' };
    if (lower.includes('saúde')) return { bg: 'bg-brand-teal', text: 'text-brand-teal', hover: 'hover:text-brand-teal', hoverBg: 'hover:bg-brand-teal/10', ring: 'focus:ring-brand-teal', border: 'border-brand-teal' };
    if (lower.includes('educação')) return { bg: 'bg-brand-purple', text: 'text-brand-purple', hover: 'hover:text-brand-purple', hoverBg: 'hover:bg-brand-purple/10', ring: 'focus:ring-brand-purple', border: 'border-brand-purple' };
    if (lower.includes('direito')) return { bg: 'bg-brand-green', text: 'text-brand-green', hover: 'hover:text-brand-green', hoverBg: 'hover:bg-brand-green/10', ring: 'focus:ring-brand-green', border: 'border-brand-green' };
    if (lower.includes('trabalho')) return { bg: 'bg-brand-teal', text: 'text-brand-teal', hover: 'hover:text-brand-teal', hoverBg: 'hover:bg-brand-teal/10', ring: 'focus:ring-brand-teal', border: 'border-brand-teal' };
    return { bg: 'bg-brand-primary', text: 'text-brand-primary', hover: 'hover:text-brand-primary', hoverBg: 'hover:bg-brand-primary/10', ring: 'focus:ring-brand-primary', border: 'border-brand-primary' };
  };

  const theme = getCategoryTheme(formattedCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Category Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className={`inline-flex items-center gap-2 text-sm font-medium text-neutral-500 ${theme.hover} mb-6 focus:outline-none focus:ring-2 ${theme.ring} rounded-sm px-1`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para a Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-dark">
            {formattedCategory}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
            Acompanhe as últimas reportagens, análises e entrevistas sobre {formattedCategory.toLowerCase()} no Brasil e no mundo.
          </p>
        </div>
      </div>

      {/* Articles Feed */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          
          {/* Main Feed (2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-y-12">
            {[1, 2, 3, 4, 5].map((item) => (
              <article key={item} className="flex flex-col sm:flex-row gap-6 group relative border-b border-neutral-100 pb-12 last:border-0 last:pb-0">
                <div className="w-full sm:w-2/5 shrink-0">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                    <AutoAltImage
                      src={`https://picsum.photos/800/600?random=${item + 10}`}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-x-3 text-xs mb-3">
                    <time dateTime="2026-02-25" className="text-neutral-500 font-mono uppercase tracking-wider">
                      25 Fev 2026
                    </time>
                    <span className={`relative z-10 rounded-full ${theme.bg} px-2.5 py-0.5 font-bold text-white shadow-sm`}>
                      {formattedCategory}
                    </span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-bold leading-tight text-neutral-900 group-hover:${theme.text} transition-colors mb-3`}>
                    <Link href={`/artigo/exemplo-categoria-${item}`} className={`focus:outline-none focus:ring-2 ${theme.ring} rounded-sm before:absolute before:inset-0`}>
                      Título impactante sobre {formattedCategory.toLowerCase()} demonstrando a importância do tema
                    </Link>
                  </h2>
                  <p className="text-neutral-600 line-clamp-3 text-sm sm:text-base leading-relaxed">
                    Um resumo detalhado da matéria que explica o contexto, os principais desafios e as possíveis soluções para a questão abordada, garantindo que o leitor entenda o valor da informação antes de clicar.
                  </p>
                </div>
              </article>
            ))}
            
            {/* Pagination (Simulated) */}
            <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-8">
              <button className={`flex items-center gap-2 text-sm font-medium text-neutral-500 ${theme.hover} focus:outline-none focus:ring-2 ${theme.ring} rounded-md px-3 py-2`} disabled>
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>
              <span className="text-sm text-neutral-700 font-mono">Página 1 de 12</span>
              <button className={`flex items-center gap-2 text-sm font-medium text-neutral-900 ${theme.hover} focus:outline-none focus:ring-2 ${theme.ring} rounded-md px-3 py-2`}>
                Próxima <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-12">
              {/* Destaque Sidebar */}
              <div className={`${theme.bg} rounded-2xl p-6 text-white shadow-lg`}>
                <h3 className="text-xl font-bold mb-4">Assine a Newsletter</h3>
                <p className="text-neutral-300 text-sm mb-6">
                  Receba os melhores conteúdos sobre {formattedCategory.toLowerCase()} diretamente no seu e-mail.
                </p>
                <Link
                  href="/newsletter"
                  className="block w-full text-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-brand-dark shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-dark transition-colors"
                >
                  Inscrever-se
                </Link>
              </div>

              {/* Tópicos Relacionados */}
              <div>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true"></span>
                  Tópicos Relacionados
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Legislação', 'Inclusão', 'Acessibilidade', 'Direitos Humanos', 'Políticas Públicas'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase()}`}
                      className={`inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-200 focus:outline-none focus:ring-2 ${theme.ring} transition-colors`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
