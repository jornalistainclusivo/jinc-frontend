import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. EDITORIAL HERO (Capa do Dia) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-24" aria-labelledby="hero-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Dominant Headline + Image (cols 1-8) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="mb-8">
              <Link 
                href="/direitos-pcd" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-green hover:text-brand-green/80 mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-4 rounded-sm transition-colors"
              >
                Direitos PcD
              </Link>
              <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tighter text-neutral-900 leading-[1.02] mb-6 text-balance max-w-[20ch]">
                <Link href="/artigo/novas-regras-acessibilidade" className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                  Governo anuncia novas regras de acessibilidade digital para sites públicos
                </Link>
              </h1>
              <p className="text-xl sm:text-2xl text-neutral-700 leading-[1.6] font-light text-balance max-w-[65ch] mb-8">
                Especialistas avaliam impactos da nova regulamentação para pessoas com deficiência visual e auditiva no acesso a serviços essenciais.
              </p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 font-medium">
                <span>Por Marina Silva</span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime="2026-02-25">25 Fev 2026</time>
              </div>
            </div>

            <Link href="/artigo/novas-regras-acessibilidade" tabIndex={-1} aria-hidden="true" className="group relative w-full aspect-video overflow-hidden bg-neutral-100 focus:outline-none rounded-sm block">
              <AutoAltImage
                src="https://picsum.photos/1920/1080?random=1"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          {/* Right Column: Secondary Curated (cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:border-l lg:border-neutral-200 lg:pl-12">
            <h2 className="sr-only">Destaques Secundários</h2>
            
            {[
              {
                title: 'Inclusão escolar enfrenta falta de mediadores em escolas públicas',
                category: 'Educação Inclusiva',
                date: '25 Fev 2026',
                color: 'text-brand-purple'
              },
              {
                title: 'Mercado de trabalho ainda exclui pessoas com deficiência intelectual',
                category: 'Mercado & Trabalho',
                date: '24 Fev 2026',
                color: 'text-brand-teal'
              },
              {
                title: 'Como a tecnologia assistiva está transformando a mobilidade urbana',
                category: 'Tecnologia Assistiva',
                date: '23 Fev 2026',
                color: 'text-brand-primary'
              }
            ].map((post, idx) => (
              <article key={idx} className="flex flex-col border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3">
                  <span className={`${post.color}`}>{post.category}</span>
                </div>
                <h3 className="text-2xl font-serif font-medium leading-[1.3] tracking-tight text-neutral-900 mb-3">
                  <Link href={`/artigo/secundario-${idx}`} className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                    {post.title}
                  </Link>
                </h3>
                <time dateTime="2026-02-25" className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  {post.date}
                </time>
              </article>
            ))}
          </div>
          
        </div>
      </section>

      {/* 2. SECONDARY HEADLINES (Tipografia Pura - Escaneabilidade) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-24" aria-labelledby="secondary-heading">
        <h2 id="secondary-heading" className="sr-only">Mais Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-neutral-200 pt-8">
          {[
            'Atletas paralímpicos brasileiros se preparam para Paris 2028 com investimentos recordes',
            'STF julga caso histórico sobre direitos PcD e benefícios assistenciais',
            'Nova lei amplia direitos de autistas em ambientes corporativos',
            'Transporte público e acessibilidade: o que mudou nas capitais em 2026'
          ].map((title, idx) => (
            <article key={idx} className="flex flex-col">
              <h3 className="text-lg font-serif font-medium leading-[1.4] text-neutral-900">
                <Link href={`/artigo/curtas-${idx}`} className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                  {title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* 3. INVESTIGATIVE BLOCK (Pausa Dramática) */}
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
              <Link href="/artigo/investigacao" tabIndex={-1} aria-hidden="true" className="group relative w-full aspect-[4/3] lg:aspect-video overflow-hidden bg-neutral-900 focus:outline-none rounded-sm block">
                <AutoAltImage
                  src="https://picsum.photos/1920/1080?random=investigative"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>
            
            <div className="lg:col-span-5 flex flex-col order-1 lg:order-2">
              <h3 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-white leading-[1.1] mb-6 text-balance">
                <Link href="/artigo/investigacao" className="hover:text-neutral-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">
                  O labirinto invisível: a burocracia por trás do BPC/LOAS
                </Link>
              </h3>
              <p className="text-lg sm:text-xl text-neutral-400 leading-[1.6] font-light mb-8 text-balance">
                Uma investigação de seis meses revela como exigências documentais excessivas e perícias defasadas atrasam benefícios vitais para milhares de famílias brasileiras.
              </p>
              <Link 
                href="/artigo/investigacao" 
                tabIndex={-1}
                aria-hidden="true"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-neutral-300 focus:outline-none rounded-sm transition-colors w-fit"
              >
                Ler Investigação Completa
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION GRID (Acessibilidade) - Micro-asymmetry applied */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-24 relative" aria-labelledby="section-acessibilidade">
        {/* Subtle Brand Identity Element: A thin vertical line anchoring the section */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary/10 hidden lg:block" aria-hidden="true"></div>
        
        <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-4 lg:ml-8">
          <h2 id="section-acessibilidade" className="text-3xl font-serif font-medium tracking-tight text-neutral-900">
            Acessibilidade Digital
          </h2>
          <Link href="/acessibilidade" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm transition-colors">
            Ver tudo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 lg:ml-8">
          {/* Main Article (Span 7) */}
          <article className="md:col-span-12 lg:col-span-7 flex flex-col">
            <Link href={`/artigo/acessibilidade-0`} tabIndex={-1} aria-hidden="true" className="group relative w-full aspect-[16/9] overflow-hidden bg-neutral-100 mb-6 focus:outline-none rounded-sm block">
              <AutoAltImage
                src={`https://picsum.photos/1200/800?random=acessibilidade-0`}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>
            <h3 className="text-3xl font-serif font-medium leading-[1.2] tracking-tight text-neutral-900 mb-4">
              <Link href={`/artigo/acessibilidade-0`} className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                O que é WCAG e por que seu site precisa seguir?
              </Link>
            </h3>
            <p className="text-neutral-700 leading-[1.6] font-light text-lg max-w-[65ch]">
              Entenda as diretrizes globais de acessibilidade, como aplicá-las na prática e por que a conformidade legal é apenas o primeiro passo para a verdadeira inclusão digital.
            </p>
          </article>

          {/* Secondary Articles (Span 5) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-8 lg:border-l lg:border-neutral-200 lg:pl-12">
            {[
              { title: 'Como tornar redes sociais acessíveis', desc: 'Dicas essenciais para criadores de conteúdo, marcas e influenciadores.' },
              { title: 'Guia prático de descrição de imagens', desc: 'Aprenda a escrever textos alternativos (alt text) que realmente ajudam.' }
            ].map((item, idx) => (
              <article key={idx} className="flex flex-col border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
                <Link href={`/artigo/acessibilidade-${idx + 1}`} tabIndex={-1} aria-hidden="true" className="group relative w-full aspect-[3/2] overflow-hidden bg-neutral-100 mb-4 focus:outline-none rounded-sm block">
                  <AutoAltImage
                    src={`https://picsum.photos/800/600?random=acessibilidade-${idx + 1}`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <h3 className="text-xl font-serif font-medium leading-[1.3] tracking-tight text-neutral-900 mb-2">
                  <Link href={`/artigo/acessibilidade-${idx + 1}`} className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-neutral-700 leading-[1.5] font-light text-sm">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEXT ONLY LIST (Opinião / Colunas) */}
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
              {[
                { author: 'Roberto Silva', title: 'O capacitismo nosso de cada dia nas empresas de tecnologia' },
                { author: 'Juliana Mendes', title: 'Por que ainda tratamos a acessibilidade como um "puxadinho" arquitetônico?' },
                { author: 'Carlos Eduardo', title: 'A representatividade PcD na política: onde estamos e para onde vamos' }
              ].map((col, idx) => (
                <article key={idx} className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-amber mb-3">{col.author}</span>
                  <h3 className="text-xl font-serif font-medium leading-[1.4] text-neutral-900">
                    <Link href={`/artigo/opiniao-${idx}`} className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                      {col.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS (Cronológico no final) */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-32" aria-labelledby="latest-heading">
        <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-4">
          <h2 id="latest-heading" className="text-3xl font-serif font-medium tracking-tight text-neutral-900">
            Últimas Publicações
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <article key={idx} className="flex flex-col border-t border-neutral-200 pt-6">
              <time dateTime="2026-02-25" className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
                Hoje, 14:30
              </time>
              <h3 className="text-lg font-serif font-medium leading-[1.4] text-neutral-900">
                <Link href={`/artigo/ultimas-${idx}`} className="hover:text-brand-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">
                  Exemplo de notícia cronológica mais curta para compor o feed final da página {idx}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
