import { getArtigoPorSlug, getStrapiMedia } from '@/lib/api';
import { notFound } from 'next/navigation';
import StrapiBlocks from '@/components/StrapiBlocks';
import { ArticleAudioPlayer } from '@/components/news/ArticleAudioPlayer';
import { ReaderIntelligenceProvider } from '@/components/news/ReaderIntelligenceProvider';
import { ShareBlock } from '@/components/news/ShareBlock';
import { BlockMapper } from '@/components/news/BlockMapper';

interface ArtigoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;

  try {
    const articleData = await getArtigoPorSlug(slug);

    if (!articleData) return notFound();

    const article = {
      title: articleData.titulo || 'Sem título',
      subtitle: articleData.subtitulo || '',
      category: articleData.categoria?.nome || 'Geral',
      author: articleData.autors?.[0]?.nome || 'Redação JINC',
      date: articleData.publishedAt
        ? new Date(articleData.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Data não disponível',
      image: articleData.capa?.url
        ? (getStrapiMedia(articleData.capa.url) || '')
        : 'https://picsum.photos/1920/1080?grayscale',
      blocks: articleData.blocos_de_conteudo || [], // Fallback if no blocks
      simpleSummary: articleData.resumo_simples || null
    };

    // Extrai o texto limpo dos blocos para o TTS
    let plainTextContent = '';

    // Tratamento para a nova Dynamic Zone
    if (Array.isArray(article.blocks)) {
      article.blocks.forEach((block: any) => {
        if (block.__component === 'blocos-materia.texto-livre' && Array.isArray(block.texto)) {
          block.texto.forEach((richTextNode: any) => {
            if (richTextNode.type === 'paragraph' || richTextNode.type === 'heading') {
              richTextNode.children?.forEach((child: any) => {
                if (child.text) plainTextContent += child.text + ' ';
              });
              plainTextContent += '\n\n';
            }
          });
        }
      });
    }

    // Tratamento de fallback (caso o field antigo conteudo exista mas as dynamic zones não - compatibilidade)
    if (!plainTextContent && Array.isArray(articleData.conteudo)) {
      articleData.conteudo.forEach((richTextNode: any) => {
        if (richTextNode.type === 'paragraph' || richTextNode.type === 'heading') {
          richTextNode.children?.forEach((child: any) => {
            if (child.text) plainTextContent += child.text + ' ';
          });
          plainTextContent += '\n\n';
        }
      });
      // Injete-o como um bloco de texto live retro-compatível se as Dynamic Zones vierem vazias
      if (article.blocks.length === 0) {
        article.blocks.push({
          __component: 'blocos-materia.texto-livre',
          id: 999999,
          texto: articleData.conteudo
        });
      }
    }

    return (
      <ReaderIntelligenceProvider>
        <article className="max-w-4xl mx-auto px-4 py-12">
          <header className="mb-12 border-b border-neutral-200 pb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="bg-[#1F3FA3] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-tighter shadow-sm">
                {article.category}
              </span>
              <time className="text-neutral-500 text-sm font-medium">{article.date}</time>
            </div>
            <h1 className="text-5xl font-serif font-bold mb-6 text-neutral-900 leading-tight tracking-tight text-center">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-neutral-600 font-medium text-center max-w-2xl mx-auto leading-relaxed">
                {article.subtitle}
              </p>
            )}
          </header>

          <div className="aspect-video relative mb-16 rounded-sm overflow-hidden shadow-xl ring-1 ring-neutral-900/5 bg-neutral-100 transition-[filter,opacity] duration-500 group-data-[focus-mode=active]:grayscale-[20%] group-data-[focus-mode=active]:opacity-90">
            <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
          </div>

          <div className="max-w-2xl mx-auto">
            {plainTextContent && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-y border-neutral-200 py-6">
                <div className="flex-1 w-full relative">
                  <ArticleAudioPlayer
                    title={article.title}
                    text={plainTextContent}
                  />
                </div>
                <div className="shrink-0 md:border-l md:pl-8 border-neutral-200 flex items-center justify-center">
                  <ShareBlock />
                </div>
              </div>
            )}

            <BlockMapper blocks={article.blocks} />

            {article.simpleSummary && (
              <section className="mt-20 p-10 bg-neutral-50 rounded-sm border border-neutral-200 shadow-sm">
                <h2 className="text-2xl font-serif font-black text-neutral-900 mb-4 flex items-center gap-2">
                  Resumo em Linguagem Simples
                </h2>
                <p className="text-neutral-700 text-lg leading-relaxed font-light">{article.simpleSummary}</p>
              </section>
            )}
          </div>
        </article>
      </ReaderIntelligenceProvider>
    );
  } catch (error) {
    console.error(error);
    return <div className="p-20 text-center font-bold text-red-500">Erro de conexão com o CMS.</div>;
  }
}
