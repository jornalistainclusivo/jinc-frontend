import Link from 'next/link';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { fetchAPI, getStrapiURL } from '@/lib/api';
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

  const query = q.trim();
  let results: any[] = [];

  if (query) {
    try {
      const response = await fetchAPI('/artigos', {
        filters: {
          $or: [
            { titulo: { $containsi: query } },
            { resumo_simples: { $containsi: query } }
          ]
        },
        populate: '*',
      });
      results = response.data || [];
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header da Busca */}
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
            Resultados da busca
          </h1>
          <div className="flex items-center gap-3 text-xl text-neutral-400 font-light">
            <Search className="h-5 w-5 text-neutral-500" aria-hidden="true" />
            <p>
              {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'} para <strong className="text-white font-medium">&quot;{q}&quot;</strong>
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
            {results.map((postData: any) => {
              const post = {
                id: postData.id || postData.documentId,
                slug: postData.slug,
                title: postData.titulo || 'Sem título',
                description: postData.resumo_simples || '',
                category: postData.categoria?.nome || 'Geral',
                date: postData.publishedAt ? new Date(postData.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
                image: postData.capa?.url ? getStrapiURL(postData.capa.url) : `https://picsum.photos/800/600?random=${postData.id || postData.documentId}`
              };

              let colorClass = 'text-neutral-900';
              let textHoverClass = 'group-hover:text-neutral-700';

              return (
                <article key={post.id} className="flex flex-col sm:flex-row gap-8 group relative border-b border-neutral-100 pb-12 lg:border-b-0 lg:pb-0">
                  <div className="w-full sm:w-2/5 shrink-0">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
                      <AutoAltImage
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-x-3 mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${colorClass}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-neutral-300">&bull;</span>
                      <time dateTime="2026-02-25" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        {post.date}
                      </time>
                    </div>
                    <h4 className={`text-2xl font-serif font-medium leading-tight text-neutral-900 ${textHoverClass} transition-colors mb-4`}>
                      <Link href={`/artigo/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm before:absolute before:inset-0">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-neutral-600 line-clamp-2 text-base leading-relaxed font-serif">
                      {post.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-50 border border-neutral-200 mb-8">
              <Search className="h-8 w-8 text-neutral-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-serif font-medium text-neutral-900 mb-6">Nenhum resultado encontrado</h2>
            <p className="text-neutral-600 max-w-md mx-auto mb-12 text-lg font-light leading-relaxed">
              Não encontramos nenhuma reportagem ou artigo que corresponda à sua busca. Tente usar outras palavras-chave ou navegue pelas nossas editorias.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
