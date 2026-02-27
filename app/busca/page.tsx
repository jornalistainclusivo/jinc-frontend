import Link from 'next/link';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { articles } from '@/lib/mockData';
import { Metadata } from 'next';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export const metadata: Metadata = {
  title: 'Resultados da Busca',
};

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  
  const query = q.toLowerCase();
  const results = query.trim() === '' 
    ? [] 
    : articles.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.description.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
      );

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header da Busca */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-brand-primary mb-6 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm px-1"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para a Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            Resultados da busca
          </h1>
          <div className="flex items-center gap-3 text-lg text-neutral-600">
            <Search className="h-5 w-5 text-neutral-400" aria-hidden="true" />
            <p>
              {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'} para <strong className="text-neutral-900">&quot;{q}&quot;</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-12">
            {results.map((post) => {
              // Determina a cor baseada na categoria
              let colorClass = 'bg-brand-primary';
              let textHoverClass = 'group-hover:text-brand-primary';
              const catLower = post.category.toLowerCase();
              
              if (catLower.includes('notícia')) { colorClass = 'bg-brand-rose'; textHoverClass = 'group-hover:text-brand-rose'; }
              else if (catLower.includes('neurodiversidade') || catLower.includes('paradesporto')) { colorClass = 'bg-brand-amber'; textHoverClass = 'group-hover:text-brand-amber'; }
              else if (catLower.includes('saúde') || catLower.includes('trabalho')) { colorClass = 'bg-brand-teal'; textHoverClass = 'group-hover:text-brand-teal'; }
              else if (catLower.includes('educação')) { colorClass = 'bg-brand-purple'; textHoverClass = 'group-hover:text-brand-purple'; }
              else if (catLower.includes('direito')) { colorClass = 'bg-brand-green'; textHoverClass = 'group-hover:text-brand-green'; }

              return (
                <article key={post.id} className="flex flex-col sm:flex-row gap-6 group relative border-b border-neutral-100 pb-10 lg:border-b-0 lg:pb-0">
                  <div className="w-full sm:w-2/5 shrink-0">
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                      <AutoAltImage
                        src={`https://picsum.photos/800/600?random=${post.id}`}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-x-3 text-xs mb-3">
                      <time dateTime="2026-02-25" className="text-neutral-500 font-mono uppercase tracking-wider">
                        {post.date}
                      </time>
                      <span className={`relative z-10 rounded-full ${colorClass} px-2.5 py-0.5 font-bold text-white shadow-sm`}>
                        {post.category}
                      </span>
                    </div>
                    <h4 className={`text-xl font-bold leading-tight text-neutral-900 ${textHoverClass} transition-colors mb-3`}>
                      <Link href={`/artigo/${post.slug}`} className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm before:absolute before:inset-0">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-neutral-600 line-clamp-2 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
              <Search className="h-8 w-8 text-neutral-400" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Nenhum resultado encontrado</h2>
            <p className="text-neutral-600 max-w-md mx-auto mb-8">
              Não encontramos nenhuma reportagem ou artigo que corresponda à sua busca. Tente usar outras palavras-chave ou navegue pelas nossas editorias.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
