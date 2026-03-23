import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AutoAltImage } from '@/components/ui/AutoAltImage';
import { getArtigosPorCategoria, getStrapiMedia } from '@/lib/api';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const response = await getArtigosPorCategoria(category, 1, 15);
  const artigos = response?.data || [];

  // Format category slug to Title Case
  const formattedCategory = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const getCategoryTheme = (cat: string) => {
    return {
      bg: 'bg-neutral-900',
      text: 'text-neutral-900',
      hover: 'hover:text-neutral-700',
      hoverBg: 'hover:bg-neutral-100',
      ring: 'focus:ring-neutral-900',
      border: 'border-neutral-900'
    };
  };

  const theme = getCategoryTheme(formattedCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Category Header */}
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 rounded-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para a Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6">
            {formattedCategory}
          </h1>
          <p className="text-xl text-neutral-400 leading-[1.6] font-light max-w-[55ch]">
            Acompanhe as últimas reportagens, análises e entrevistas sobre {formattedCategory.toLowerCase()} no Brasil e no mundo.
          </p>
        </div>
      </header>

      {/* Articles Feed */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-12">

          {/* Main Feed (2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-y-12">
            {artigos.length > 0 ? (
              artigos.map((item: any) => (
                <article key={item.id} className="flex flex-col sm:flex-row gap-6 group relative border-b border-neutral-100 pb-12 last:border-0 last:pb-0">
                  <div className="w-full sm:w-2/5 shrink-0">
                    <Link href={`/artigo/${item.slug}`} tabIndex={-1} className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 block focus:outline-none">
                      <AutoAltImage
                        src={item.capa?.url ? getStrapiMedia(item.capa.url) || '' : `https://picsum.photos/800/600?random=${item.id}`}
                        alt={item.capa?.alternativeText || item.titulo || ''}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-x-3 mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.text}`}>
                        {item.categoria?.nome || formattedCategory}
                      </span>
                      <span className="text-xs text-neutral-300">&bull;</span>
                      <time dateTime={item.publishedAt} className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        {new Date(item.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </time>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-medium leading-tight text-neutral-900 group-hover:text-neutral-700 transition-colors mb-4">
                      <Link href={`/artigo/${item.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm before:absolute before:inset-0">
                        {item.titulo}
                      </Link>
                    </h2>
                    <p className="text-neutral-600 line-clamp-3 text-base leading-relaxed font-serif">
                      {item.resumo_simples || item.subtitulo || 'Leia mais sobre este artigo.'}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-neutral-500 text-center py-12">Nenhum artigo encontrado para esta categoria.</p>
            )}

            {/* Pagination (Simulated) */}
            <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-8">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm px-2 py-1" disabled>
                <ArrowLeft className="h-4 w-4" /> Anterior
              </button>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-900">Página 1 de 12</span>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm px-2 py-1 transition-colors">
                Próxima <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-16">
              {/* Destaque Sidebar */}
              <div className="bg-white rounded-none p-8 border border-neutral-200 shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4">Assine a Newsletter</h3>
                <p className="text-neutral-600 text-sm mb-8 leading-relaxed font-serif">
                  Receba os melhores conteúdos sobre {formattedCategory.toLowerCase()} diretamente no seu e-mail.
                </p>
                <Link
                  href="/newsletter"
                  className="flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 transition-colors"
                >
                  Inscrever-se
                </Link>
              </div>

              {/* Tópicos Relacionados */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 border-b border-neutral-200 pb-4">
                  Tópicos Relacionados
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Legislação', 'Inclusão', 'Acessibilidade', 'Direitos Humanos', 'Políticas Públicas'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase()}`}
                      className="inline-flex items-center rounded-none bg-neutral-50 border border-neutral-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"
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
