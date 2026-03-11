import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AutoAltImage } from '@/components/ui/AutoAltImage';
import { getUltimasPublicacoes, getStrapiMedia } from '@/lib/api';

function formatDate(dateString?: string) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getImageUrl(item: any, fallbackId: string) {
  return item?.capa?.url ? (getStrapiMedia(item.capa.url) || '') : `https://picsum.photos/1024/768?random=${fallbackId}`;
}

export default async function Home() {
  const response = await getUltimasPublicacoes(1, 25);
  const artigos = response.data || [];

  // Pega os destaques na ordem
  const heroArticle = artigos[0];
  const secondaryCurated = artigos.slice(1, 4);
  const secondaryHeadlines = artigos.slice(4, 8);
  const investigativeArticle = artigos[8] || artigos[0]; // fallback to hero if not enough
  const accessibilityMain = artigos[9] || artigos[0];
  const accessibilitySecondary = artigos.slice(10, 12);
  const opinionArticles = artigos.slice(12, 15);
  const latestPublications = artigos.slice(0, 8); // Just repeating latest 8 at bottom for chronological feed

  return (
    <div className="bg-white min-h-screen">

      {/* 1. EDITORIAL HERO (Capa do Dia) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-24" aria-labelledby="hero-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Dominant Headline + Image (cols 1-8) */}
          <div className="lg:col-span-8 flex flex-col">
            {heroArticle ? (
              <>
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-900 mb-6">
                    {heroArticle.categoria?.nome || 'Destaque'}
                  </span>
                  <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tighter text-neutral-900 leading-[1.02] mb-6 text-balance max-w-[20ch]">
                    <Link href={`/artigo/${heroArticle.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                      {heroArticle.titulo}
                    </Link>
                  </h1>
                  <p className="text-xl sm:text-2xl text-neutral-700 leading-[1.6] font-light text-balance max-w-[65ch] mb-8">
                    {heroArticle.subtitulo || 'Leia mais sobre este assunto em nossa plataforma.'}
                  </p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 font-medium">
                    <span>Por {heroArticle.autors?.[0]?.nome || heroArticle.autor?.nome || 'Redação JINC'}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={heroArticle.publishedAt}>{formatDate(heroArticle.publishedAt)}</time>
                  </div>
                </div>

                <Link href={`/artigo/${heroArticle.slug}`} tabIndex={-1} className="group relative w-full aspect-video overflow-hidden bg-neutral-100 focus:outline-none rounded-sm block">
                  <AutoAltImage
                    src={getImageUrl(heroArticle, 'hero')}
                    alt={heroArticle.capa?.alternativeText || heroArticle.titulo || ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </>
            ) : (
              <p>Nenhuma publicação disponível.</p>
            )}
          </div>

          {/* Right Column: Secondary Curated (cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:border-l lg:border-neutral-200 lg:pl-12">
            <h2 className="sr-only">Destaques Secundários</h2>

            {secondaryCurated.map((post: any) => (
              <article key={post.id} className="flex flex-col border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3">
                  <span className="text-neutral-900">{post.categoria?.nome || 'Notícias'}</span>
                </div>
                <h3 className="text-2xl font-serif font-medium leading-[1.3] tracking-tight text-neutral-900 mb-3">
                  <Link href={`/artigo/${post.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                    {post.titulo}
                  </Link>
                </h3>
                <time dateTime={post.publishedAt} className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  {formatDate(post.publishedAt)}
                </time>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 2. SECONDARY HEADLINES (Tipografia Pura - Escaneabilidade) */}
      {secondaryHeadlines.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-24" aria-labelledby="secondary-heading">
          <h2 id="secondary-heading" className="sr-only">Mais Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-neutral-200 pt-8">
            {secondaryHeadlines.map((post: any) => (
              <article key={post.id} className="flex flex-col">
                <h3 className="text-lg font-serif font-medium leading-[1.4] text-neutral-900">
                  <Link href={`/artigo/${post.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                    {post.titulo}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. INVESTIGATIVE BLOCK (Pausa Dramática) */}
      {investigativeArticle && (
        <section className="bg-neutral-950 text-neutral-50 py-24 sm:py-32 mb-24" aria-labelledby="investigative-heading">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px bg-neutral-800 flex-1"></div>
              <h2 id="investigative-heading" className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                Reportagem Especial
              </h2>
              <div className="h-px bg-neutral-800 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <Link href={`/artigo/${investigativeArticle.slug}`} tabIndex={-1} className="group relative w-full aspect-[4/3] lg:aspect-video overflow-hidden bg-neutral-900 focus:outline-none rounded-sm block">
                  <AutoAltImage
                    src={getImageUrl(investigativeArticle, 'invest')}
                    alt={investigativeArticle.capa?.alternativeText || investigativeArticle.titulo || ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </div>

              <div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
                <h3 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-white leading-[1.1] mb-6 text-balance">
                  <Link href={`/artigo/${investigativeArticle.slug}`} className="hover:text-neutral-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">
                    {investigativeArticle.titulo}
                  </Link>
                </h3>
                <p className="text-lg sm:text-xl text-neutral-400 leading-[1.6] font-light mb-8 text-balance">
                  {investigativeArticle.subtitulo || 'Uma investigação aprofundada sobre temas relevantes do nosso portal.'}
                </p>
                <Link
                  href={`/artigo/${investigativeArticle.slug}`}
                  tabIndex={-1}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-neutral-300 focus:outline-none rounded-sm transition-colors w-fit"
                >
                  Ler Investigação Completa
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. SECTION GRID (Acessibilidade) - Micro-asymmetry applied */}
      {accessibilityMain && (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-24 relative" aria-labelledby="section-acessibilidade">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary/10 hidden lg:block" aria-hidden="true"></div>

          <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-4 lg:ml-8">
            <h2 id="section-acessibilidade" className="text-3xl font-serif font-medium tracking-tight text-neutral-900">
              Acessibilidade Digital
            </h2>
            <Link href="/busca" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm transition-colors">
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 lg:ml-8">
            <article className="md:col-span-12 lg:col-span-7 flex flex-col">
              <Link href={`/artigo/${accessibilityMain.slug}`} tabIndex={-1} className="group relative w-full aspect-[16/9] overflow-hidden bg-neutral-100 mb-6 focus:outline-none rounded-sm block">
                <AutoAltImage
                  src={getImageUrl(accessibilityMain, 'accMain')}
                  alt={accessibilityMain.capa?.alternativeText || accessibilityMain.titulo || ''}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <h3 className="text-3xl font-serif font-medium leading-[1.2] tracking-tight text-neutral-900 mb-4">
                <Link href={`/artigo/${accessibilityMain.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                  {accessibilityMain.titulo}
                </Link>
              </h3>
              <p className="text-neutral-700 leading-[1.6] font-light text-lg max-w-[65ch]">
                {accessibilityMain.subtitulo}
              </p>
            </article>

            {accessibilitySecondary.length > 0 && (
              <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-8 lg:border-l lg:border-neutral-200 lg:pl-12">
                {accessibilitySecondary.map((item: any) => (
                  <article key={item.id} className="flex flex-col border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
                    <Link href={`/artigo/${item.slug}`} tabIndex={-1} className="group relative w-full aspect-[3/2] overflow-hidden bg-neutral-100 mb-4 focus:outline-none rounded-sm block">
                      <AutoAltImage
                        src={getImageUrl(item, 'accSec')}
                        alt={item.capa?.alternativeText || item.titulo || ''}
                        fill
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                    <h3 className="text-xl font-serif font-medium leading-[1.3] tracking-tight text-neutral-900 mb-2">
                      <Link href={`/artigo/${item.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                        {item.titulo}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. TEXT ONLY LIST (Opinião / Colunas) */}
      {opinionArticles.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-24" aria-labelledby="opinion-heading">
          <div className="border-t border-b border-neutral-200 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 id="opinion-heading" className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Opinião & Análise
                </h2>
                <p className="text-neutral-500 text-sm">
                  Vozes plurais sobre os desafios da inclusão no Brasil.
                </p>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                {opinionArticles.map((col: any) => (
                  <article key={col.id} className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-3">{col.autors?.[0]?.nome || col.autor?.nome || 'Convidado'}</span>
                    <h3 className="text-xl font-serif font-medium leading-[1.4] text-neutral-900">
                      <Link href={`/artigo/${col.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                        {col.titulo}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. LATEST NEWS (Cronológico no final) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-32" aria-labelledby="latest-heading">
        <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-4">
          <h2 id="latest-heading" className="text-3xl font-serif font-medium tracking-tight text-neutral-900">
            Últimas Publicações
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {latestPublications.map((post: any) => (
            <article key={post.id} className="flex flex-col border-t border-neutral-200 pt-6">
              <time dateTime={post.publishedAt} className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
                {formatDate(post.publishedAt)}
              </time>
              <h3 className="text-lg font-serif font-medium leading-[1.4] text-neutral-900">
                <Link href={`/artigo/${post.slug}`} className="hover:text-neutral-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">
                  {post.titulo}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
