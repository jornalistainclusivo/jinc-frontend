import { fetchStrapi } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import StrapiBlocks from '@/components/StrapiBlocks';

interface ArtigoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;

  try {
    const response = await fetchStrapi('/artigos', {
      'filters[slug][$eq]': slug,
      'populate': '*',
    });

    const articleData = response.data?.[0];
    if (!articleData) return notFound();

    const article = {
      title: articleData.titulo || 'Sem título',
      subtitle: articleData.subtitulo || '',
      category: articleData.categoria?.nome || 'Geral',
      author: articleData.autor?.nome || 'Redação JINC',
      date: articleData.publishedAt 
        ? new Date(articleData.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) 
        : 'Data não disponível',
      image: articleData.capa?.url 
        ? `http://127.0.0.1:1337${articleData.capa.url}` 
        : 'https://picsum.photos/1920/1080?grayscale',
      content: articleData.conteudo, // Aqui está o JSON de blocos do Strapi 5
      simpleSummary: articleData.resumo_simples || null
    };

    return (
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 border-b border-gray-100 pb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
              {article.category}
            </span>
            <time className="text-gray-400 text-sm font-medium">{article.date}</time>
          </div>
          <h1 className="text-5xl font-black mb-6 text-gray-900 leading-tight tracking-tight text-center">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl text-gray-500 font-medium text-center max-w-2xl mx-auto leading-relaxed">
              {article.subtitle}
            </p>
          )}
        </header>

        <div className="aspect-video relative mb-16 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* AQUI A MÁGICA ACONTECE: O componente real entra no lugar do aviso amarelo */}
          <StrapiBlocks content={article.content} />
          
          {article.simpleSummary && (
            <section className="mt-20 p-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-100 shadow-inner">
              <h2 className="text-2xl font-black text-green-900 mb-4 flex items-center gap-2">
                🌱 Resumo em Linguagem Simples
              </h2>
              <p className="text-green-800 text-lg leading-relaxed font-medium">{article.simpleSummary}</p>
            </section>
          )}
        </div>
      </article>
    );
  } catch (error) {
    console.error(error);
    return <div className="p-20 text-center font-bold text-red-500">Erro de conexão com o CMS.</div>;
  }
}
