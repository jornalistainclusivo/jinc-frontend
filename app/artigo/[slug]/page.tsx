import { getArtigoPorSlug, getStrapiMedia } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { ArticleAudioPlayer } from '@/components/news/ArticleAudioPlayer';
import { BlockMapper } from '@/components/news/BlockMapper';
import { TagList } from '@/components/news/TagBadge';
import { MediaGallery } from '@/components/news/MediaGallery';
import { AutoAltImage } from '@/components/ui/AutoAltImage';
import { ArticleClientWrapper } from '@/components/news/ArticleClientWrapper';

interface ArtigoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;

  try {
    const articleData = await getArtigoPorSlug(slug);

    if (!articleData) return notFound();

    const categorySlug = articleData.categoria?.slug || 'geral';
    
    const article = {
      title: articleData.titulo || 'Sem título',
      subtitle: articleData.subtitulo || '',
      type: categorySlug, // Mapeia a tipologia exata ('hard-news', etc.)
      category: articleData.categoria?.nome || 'Geral',
      author: articleData.autors?.[0]?.nome || 'Redação JINC',
      date: articleData.publishedAt
        ? new Date(articleData.publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'Data não disponível',
      image: articleData.capa?.url
        ? (getStrapiMedia(articleData.capa.url) || '')
        : 'https://picsum.photos/1920/1080?grayscale',
      blocks: articleData.blocos_de_conteudo || [],
      simpleSummary: articleData.resumo_simples || null,
      altTextIa: articleData.alt_text_ia || articleData.titulo,
      descricaoAudio: articleData.descricao_audio || null,
      tags: articleData.tags || [],
      midias: articleData.midias || [],
      readTime: '5 min de leitura', // Mocked readTime or calculated later
    };

    // Extrai o texto limpo dos blocos para o TTS
    let plainTextContent = '';

    if (Array.isArray(article.blocks)) {
      (article.blocks as unknown as Array<{
        __component: string;
        texto?: { type: string; children?: { text?: string }[] }[];
      }>).forEach((block) => {
        if (block.__component === 'blocos-materia.texto-livre' && Array.isArray(block.texto)) {
          block.texto.forEach((richTextNode) => {
            if (richTextNode.type === 'paragraph' || richTextNode.type === 'heading') {
              richTextNode.children?.forEach((child) => {
                if (child.text) plainTextContent += child.text + ' ';
              });
              plainTextContent += '\n\n';
            }
          });
        }
      });
    }

    type LegacyArticle = { conteudo?: { type: string; children?: { text?: string }[] }[] };
    const legacyArticle = articleData as unknown as LegacyArticle;
    if (!plainTextContent && Array.isArray(legacyArticle.conteudo)) {
      const legacyContent = legacyArticle.conteudo!;
      legacyContent.forEach((richTextNode) => {
        if (richTextNode.type === 'paragraph' || richTextNode.type === 'heading') {
          richTextNode.children?.forEach((child) => {
            if (child.text) plainTextContent += child.text + ' ';
          });
          plainTextContent += '\n\n';
        }
      });
      if (article.blocks.length === 0) {
        (article.blocks as { __component: string; id: number; texto: unknown[] }[]).push({
          __component: 'blocos-materia.texto-livre',
          id: 999999,
          texto: legacyContent,
        });
      }
    }

    return (
      <ArticleClientWrapper>
        {/* Article Header - Immersive & Editorial */}
        <header className="pt-16 pb-10 sm:pt-24 sm:pb-16 border-b transition-colors duration-200 ease-in-out border-neutral-200 group-data-[focus-mode=active]/article:border-transparent group-data-[focus-mode=active]/article:bg-[#FDFBF7] bg-neutral-50">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href={`/${categorySlug}`} 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-700 mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 rounded-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {article.category}
            </Link>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tighter text-neutral-900 leading-[1.05] mb-8 text-balance mx-auto max-w-[20ch]">
              {article.title}
            </h1>
            
            {article.subtitle && (
              <p className="text-xl sm:text-2xl text-neutral-600 leading-[1.6] mb-10 font-light text-balance mx-auto max-w-[65ch]">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500 font-medium">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-neutral-200 overflow-hidden relative shadow-sm">
                  <AutoAltImage src="https://picsum.photos/100/100?random=author" alt="" fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold text-neutral-900">{article.author}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider mt-0.5">
                    <time dateTime={articleData.publishedAt ? new Date(articleData.publishedAt).toISOString() : ''}>{article.date}</time>
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
        <div className="mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-16 relative z-10 transition-all duration-200 ease-in-out max-w-[1200px] group-data-[focus-mode=active]/article:max-w-[900px] group-data-[focus-mode=active]/article:opacity-90 group-data-[focus-mode=active]/article:grayscale-[20%]">
          {article.descricaoAudio && (
            <div className="sr-only" aria-live="polite">
              <span>Descrição de áudio da imagem de capa:</span> {article.descricaoAudio}
            </div>
          )}
          <figure className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-none bg-neutral-100 shadow-2xl">
            <AutoAltImage
              src={article.image}
              alt={article.altTextIa || article.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            {article.altTextIa && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-sm text-white/90 font-medium">
                {article.altTextIa}
              </figcaption>
            )}
          </figure>
        </div>

        {/* Article Body & Audio Player */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ease-in-out max-w-[65ch] group-data-[focus-mode=active]/article:max-w-[70ch]">
          
          {/* Audio Container & TL;DR */}
          <div className="mb-12 pb-8 border-b transition-colors duration-200 ease-in-out border-neutral-200 group-data-[focus-mode=active]/article:border-neutral-300/50">
             {plainTextContent && (
               <ArticleAudioPlayer 
                 title={article.title} 
                 text={plainTextContent} 
               />
             )}
          </div>

          {article.simpleSummary && (
            <section
              className="mb-12 p-8 bg-neutral-50 border-l-4 border-neutral-900 shadow-sm"
              aria-labelledby="tl-dr-heading"
            >
              <h2
                id="tl-dr-heading"
                className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-3 flex items-center gap-2"
              >
                Em Resumo (Linguagem Simples)
              </h2>
              <p className="text-neutral-800 text-lg leading-relaxed font-medium">
                {article.simpleSummary}
              </p>
            </section>
          )}

          {/* Typography Content */}
          <div className={`prose md:prose-xl max-w-none transition-all duration-200 ease-in-out prose-p:font-serif prose-p:leading-[1.9] prose-p:mb-8 prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-a:text-neutral-900 hover:prose-a:text-neutral-700 prose-a:underline-offset-4 prose-a:decoration-neutral-300 hover:prose-a:decoration-neutral-900 prose-li:font-serif prose-li:leading-[1.9] prose-strong:font-semibold prose-neutral prose-p:text-neutral-800 prose-headings:text-neutral-900 prose-li:text-neutral-800 prose-strong:text-neutral-900 prose-lg group-data-[focus-mode=active]/article:prose-neutral group-data-[focus-mode=active]/article:prose-p:text-neutral-900 group-data-[focus-mode=active]/article:prose-headings:text-black group-data-[focus-mode=active]/article:prose-li:text-neutral-900 group-data-[focus-mode=active]/article:prose-strong:text-black group-data-[focus-mode=active]/article:prose-lg group-data-[focus-mode=active]/article:text-lg ${
            ['hard-news', 'noticias'].includes(article.type) 
              ? '[&_.is-lead-block>p:first-of-type]:font-serif [&_.is-lead-block>p:first-of-type]:text-2xl md:[&_.is-lead-block>p:first-of-type]:text-3xl [&_.is-lead-block>p:first-of-type]:font-light [&_.is-lead-block>p:first-of-type]:leading-[1.6] [&_.is-lead-block>p:first-of-type]:mb-12 [&_.is-lead-block>p:first-of-type]:text-neutral-600 group-data-[focus-mode=active]/article:[&_.is-lead-block>p:first-of-type]:text-neutral-800' 
              : ''
          }`}>
            
            <BlockMapper blocks={article.blocks} />
            
            {/* Galeria de Mídias Digitais */}
            {article.midias.length > 0 && (
              <div className="mt-8 not-prose">
                <MediaGallery midias={article.midias} />
              </div>
            )}
            
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-16 pt-10 border-t transition-opacity duration-200 ease-in-out border-neutral-200 opacity-100 group-data-[focus-mode=active]/article:border-neutral-300/50 group-data-[focus-mode=active]/article:opacity-30 group-data-[focus-mode=active]/article:hover:opacity-100 border-t-2">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Tópicos desta matéria</h3>
              <div className="flex flex-wrap gap-3">
                <TagList tags={article.tags} variant="small" />
              </div>
            </div>
          )}
        </div>
      </ArticleClientWrapper>
    );
  } catch (error) {
    console.error(error);
    return <div className="p-20 text-center font-bold text-red-500">Erro de conexão com o CMS.</div>;
  }
}
