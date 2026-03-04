import { getArtigoPorSlug, getStrapiURL } from '@/lib/api';
import { notFound } from 'next/navigation';
import StrapiBlocks from '@/components/StrapiBlocks';
import { ArticleAudioPlayer } from '@/components/news/ArticleAudioPlayer';
import { ReaderIntelligenceProvider } from '@/components/news/ReaderIntelligenceProvider';
import { ShareBlock } from '@/components/news/ShareBlock';
import { ContextualLayer } from '@/components/news/ContextualLayer';

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
      author: articleData.autor?.nome || 'Redação JINC',
      date: articleData.publishedAt
        ? new Date(articleData.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Data não disponível',
      image: articleData.capa?.url
        ? getStrapiURL(articleData.capa.url)
        : 'https://picsum.photos/1920/1080?grayscale',
      content: articleData.conteudo, // JSON de blocos do Strapi 5
      simpleSummary: articleData.resumo_simples || null
    };

    // Divisão do array para inserir o ContextualLayer (mock dinâmico) após o parágrafo-alvo
    let mockInsertIndex = -1;
    if (Array.isArray(article.content)) {
      mockInsertIndex = article.content.findIndex((block: any) => {
        if (block.type === 'paragraph' && block.children) {
          return block.children.some((child: any) =>
            child.text && child.text.includes('O Jornalista Inclusivo foi reestruturado para ser')
          );
        }
        return false;
      });
    }

    let contentPart1 = article.content;
    let contentPart2 = null;

    if (mockInsertIndex !== -1 && Array.isArray(article.content)) {
      contentPart1 = article.content.slice(0, mockInsertIndex + 1);
      contentPart2 = article.content.slice(mockInsertIndex + 1);
    }

    // Extrai o texto limpo dos blocos para o TTS
    let plainTextContent = '';
    if (Array.isArray(article.content)) {
      article.content.forEach((block: any) => {
        if (block.type === 'paragraph' || block.type === 'heading') {
          block.children?.forEach((child: any) => {
            if (child.text) plainTextContent += child.text + ' ';
          });
          plainTextContent += '\n\n';
        }
      });
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

            <StrapiBlocks content={contentPart1} />

            <ContextualLayer
              title="Design Universal (v2.0)"
              columns={[
                { icon: 'brain', title: 'O Conceito', content: 'A neuroergonomia aplica a neurociência para projetar interfaces adaptadas à diversidade cognitiva humana.' },
                { icon: 'scale', title: 'A Regra', content: 'Diretrizes rigorosas baseadas nos pilares de aprovação do consórcio W3C (WCAG nível AAA).' },
                { icon: 'target', title: 'O Impacto', content: 'Reduz a sobrecarga mental. O Modo Foco isola o layout, priorizando uma leitura linear sem vazamento cognitivo.' }
              ]}
            />

            {contentPart2 && <StrapiBlocks content={contentPart2} />}

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
