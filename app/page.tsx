import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-neutral-900 text-white" aria-labelledby="hero-heading">
        <div className="absolute inset-0 overflow-hidden">
          <AutoAltImage
            src="https://picsum.photos/1920/1080?random=1"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32 flex flex-col justify-end min-h-[60vh]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-brand-green px-3 py-1 text-sm font-bold text-white mb-4 shadow-sm">
              Direitos PcD
            </span>
            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Governo anuncia novas regras de acessibilidade digital para sites públicos
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl leading-relaxed">
              Especialistas avaliam impactos da nova regulamentação para pessoas com deficiência visual e auditiva.
            </p>
            <Link
              href="/artigo/novas-regras-acessibilidade"
              className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors"
            >
              Leia a reportagem
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area: Últimas Reportagens & Mais Lidas */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="main-content-heading">
        <h2 id="main-content-heading" className="sr-only">Conteúdo Principal</h2>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
          
          {/* Últimas Notícias (Takes 2 columns on desktop) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
              <h3 className="text-3xl font-bold tracking-tight text-neutral-900">
                Últimas Notícias
              </h3>
              <Link href="/ultimas" className="text-sm font-semibold text-brand-primary hover:text-brand-dark flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm px-1">
                Ver todas <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="flex flex-col gap-y-10">
              {[
                {
                  title: 'Inclusão escolar enfrenta falta de mediadores em escolas públicas',
                  description: 'A ausência de profissionais qualificados compromete o aprendizado e a socialização de alunos com deficiência em todo o país.',
                  category: 'Educação Inclusiva',
                  date: '25 Fev 2026',
                  image: 'https://picsum.photos/800/600?random=2',
                  colorClass: 'bg-brand-purple',
                  textHoverClass: 'group-hover:text-brand-purple'
                },
                {
                  title: 'Mercado de trabalho ainda exclui pessoas com deficiência intelectual',
                  description: 'Apesar da Lei de Cotas, empresas relatam "dificuldades" na adaptação, revelando barreiras atitudinais persistentes.',
                  category: 'Mercado & Trabalho',
                  date: '24 Fev 2026',
                  image: 'https://picsum.photos/800/600?random=3',
                  colorClass: 'bg-brand-teal',
                  textHoverClass: 'group-hover:text-brand-teal'
                },
                {
                  title: 'Como a tecnologia assistiva está transformando a mobilidade urbana',
                  description: 'Novos aplicativos e dispositivos vestíveis prometem maior autonomia para pessoas com deficiência visual e motora nas grandes cidades.',
                  category: 'Tecnologia Assistiva',
                  date: '23 Fev 2026',
                  image: 'https://picsum.photos/800/600?random=4',
                  colorClass: 'bg-brand-primary',
                  textHoverClass: 'group-hover:text-brand-primary'
                },
                {
                  title: 'Atletas paralímpicos brasileiros se preparam para Paris 2028',
                  description: 'Com investimentos recordes, delegação brasileira busca superar o quadro de medalhas histórico das últimas edições.',
                  category: 'Paradesporto',
                  date: '22 Fev 2026',
                  image: 'https://picsum.photos/800/600?random=5',
                  colorClass: 'bg-brand-amber',
                  textHoverClass: 'group-hover:text-brand-amber'
                },
                {
                  title: 'STF julga caso histórico sobre direitos PcD',
                  description: 'Decisão pode alterar a forma como benefícios assistenciais são concedidos e avaliados pelo INSS nos próximos anos.',
                  category: 'Direitos PcD',
                  date: '21 Fev 2026',
                  image: 'https://picsum.photos/800/600?random=6',
                  colorClass: 'bg-brand-green',
                  textHoverClass: 'group-hover:text-brand-green'
                }
              ].map((post, index) => (
                <article key={index} className="flex flex-col sm:flex-row gap-6 group relative border-b border-neutral-100 pb-10 last:border-0 last:pb-0">
                  <div className="w-full sm:w-2/5 shrink-0">
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                      <AutoAltImage
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
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
                      <span className={`relative z-10 rounded-full ${post.colorClass} px-2.5 py-0.5 font-bold text-white shadow-sm`}>
                        {post.category}
                      </span>
                    </div>
                    <h4 className={`text-xl sm:text-2xl font-bold leading-tight text-neutral-900 ${post.textHoverClass} transition-colors mb-3`}>
                      <Link href={`/artigo/exemplo-${index}`} className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm before:absolute before:inset-0">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-neutral-600 line-clamp-2 text-sm sm:text-base leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar: Mais Lidas (Takes 1 column on desktop) */}
          <aside className="mt-16 lg:mt-0 lg:col-span-1">
            <div className="sticky top-28">
              <div className="mb-8 border-b border-neutral-200 pb-4">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-primary" aria-hidden="true"></span>
                  Mais Lidas
                </h3>
              </div>
              
              <ol className="space-y-6 list-none p-0 m-0 counter-reset-most-read">
                {[
                  'Como solicitar BPC/LOAS em 2026',
                  'Nova lei amplia direitos de autistas',
                  'Empresas que lideram inclusão no Brasil',
                  'Transporte público e acessibilidade: o que mudou'
                ].map((title, index) => (
                  <li key={index} className="relative flex gap-x-4 group">
                    <div className="text-4xl font-bold text-neutral-200 font-mono leading-none group-hover:text-brand-rose/40 transition-colors" aria-hidden="true">
                      0{index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold leading-tight text-neutral-900 group-hover:text-brand-rose transition-colors">
                        <Link href={`/artigo/mais-lida-${index}`} className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm">
                          <span className="absolute inset-0" />
                          {title}
                        </Link>
                      </h4>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

        </div>
      </section>

      {/* Especial: Acessibilidade Digital */}
      <section className="bg-neutral-50 py-16 sm:py-24" aria-labelledby="special-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 id="special-heading" className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Especial: Acessibilidade Digital
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-700">
              Guias, tutoriais e análises sobre como tornar o ambiente digital verdadeiramente inclusivo.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-neutral-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              { title: 'O que é WCAG e por que seu site precisa seguir?', desc: 'Entenda as diretrizes globais de acessibilidade e como aplicá-las na prática.' },
              { title: 'Como tornar redes sociais acessíveis', desc: 'Dicas essenciais para criadores de conteúdo, marcas e influenciadores.' },
              { title: 'Guia prático de descrição de imagens', desc: 'Aprenda a escrever textos alternativos (alt text) que realmente ajudam.' }
            ].map((item, idx) => (
              <article key={idx} className="flex max-w-xl flex-col items-start justify-between">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-900 group-hover:text-brand-purple transition-colors">
                    <Link href={`/artigo/especial-${idx}`} className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm">
                      <span className="absolute inset-0" />
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-700">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-primary py-16 sm:py-24" aria-labelledby="newsletter-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-brand-dark px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
            <h2 id="newsletter-heading" className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Inclusão em foco, toda semana no seu e-mail
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-neutral-300">
              Receba análises, reportagens exclusivas e atualizações sobre direitos PcD diretamente na sua caixa de entrada.
            </p>
            <form className="mx-auto mt-10 flex flex-col sm:flex-row max-w-md gap-4">
              <label htmlFor="email-address-main" className="sr-only">Endereço de e-mail</label>
              <input
                id="email-address-main"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Seu melhor e-mail"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-brand-dark shadow-sm hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
