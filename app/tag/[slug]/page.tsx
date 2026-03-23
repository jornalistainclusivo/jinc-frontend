import { getArtigosPorTag, getTags } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api';
import type { Metadata } from 'next';
import type { StrapiTag, StrapiArtigo } from '@/lib/strapi-types';

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getTags } = await import('@/lib/api');
  const { data: tags } = await getTags();
  return (tags || []).map((tag: StrapiTag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagName = slug.replace(/-/g, ' ');
  return {
    title: `Tag: #${tagName} | Jornalista Inclusivo`,
    description: `Artigos marcados com a tag #${tagName} no Jornalista Inclusivo — jornalismo acessível e inclusivo.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  let artigos: StrapiArtigo[] = [];
  let total = 0;

  try {
    const result = await getArtigosPorTag(slug, 1, 12);
    artigos = result?.data || [];
    total = result?.meta?.pagination?.total || 0;
  } catch {
    return notFound();
  }

  if (artigos.length === 0) {
    return notFound();
  }

  const tagName = artigos[0]?.tags?.find((t) => t.slug === slug)?.tag || slug;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Cabeçalho da Tag */}
      <header className="mb-12 pb-8 border-b border-neutral-200">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex gap-2 text-sm text-neutral-500 font-sans">
            <li>
              <Link
                href="/"
                className="hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1 rounded-none"
              >
                Início
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>Tags</li>
            <li aria-hidden="true">›</li>
            <li className="text-neutral-900 font-medium" aria-current="page">
              #{tagName}
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-3">
          #{tagName}
        </h1>
        <p className="text-neutral-500 font-sans text-sm">
          {total} {total === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      </header>

      {/* Grade de artigos */}
      <section aria-label={`Artigos com a tag #${tagName}`}>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
        >
          {artigos.map((artigo) => {
            const imageUrl = artigo.capa?.url
              ? getStrapiMedia(artigo.capa.url) || ''
              : 'https://picsum.photos/800/450?grayscale';
            const alt = artigo.alt_text_ia || artigo.titulo;
            const categoria = artigo.categoria?.nome || 'Geral';
            const date = artigo.publishedAt
              ? new Date(artigo.publishedAt).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : '';

            return (
              <li key={artigo.id}>
                <article className="group flex flex-col h-full">
                  <Link
                    href={`/artigo/${artigo.slug}`}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-none"
                    aria-label={`Ler artigo: ${artigo.titulo}`}
                  >
                    {/* Imagem */}
                    <div className="relative aspect-video overflow-hidden rounded-none bg-neutral-100 mb-4">
                      <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-neutral-900 text-neutral-50 text-xs font-bold px-2 py-0.5 rounded-none font-sans uppercase tracking-tight">
                        {categoria}
                      </span>
                      {date && (
                        <time
                          dateTime={artigo.publishedAt || ''}
                          className="text-neutral-400 text-xs font-sans"
                        >
                          {date}
                        </time>
                      )}
                    </div>

                    {/* Título */}
                    <h2 className="text-lg font-serif font-bold text-neutral-900 leading-snug group-hover:underline decoration-1 underline-offset-2 mb-1">
                      {artigo.titulo}
                    </h2>

                    {/* Subtítulo */}
                    {artigo.subtitulo && (
                      <p className="text-sm text-neutral-600 font-sans line-clamp-2">
                        {artigo.subtitulo}
                      </p>
                    )}
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Voltar */}
      <div className="mt-16 text-center">
        <Link
          href="/"
          className="
            inline-block border border-neutral-300 rounded-none px-6 py-2
            text-sm font-sans text-neutral-700
            hover:border-neutral-900 hover:text-neutral-900
            focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2
            transition-colors duration-150 motion-reduce:transition-none
          "
        >
          ← Voltar para a home
        </Link>
      </div>
    </main>
  );
}
