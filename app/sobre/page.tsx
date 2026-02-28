import { Target, Users, Handshake, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import { AutoAltImage } from '@/components/ui/AutoAltImage';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a missão, equipe, parcerias e projetos do Jornalista Inclusivo.',
};

export default function SobrePage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6 text-balance mx-auto">
            Sobre Nós
          </h1>
          <p className="text-xl text-neutral-400 leading-[1.6] font-light text-balance mx-auto max-w-[55ch]">
            Somos um portal independente dedicado a dar voz, visibilidade e protagonismo às pessoas com deficiência no Brasil e no mundo.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 space-y-32">
        
        {/* Missão */}
        <section aria-labelledby="missao-heading" className="scroll-mt-24" id="missao">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                  <Target className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                </div>
                <h2 id="missao-heading" className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-neutral-900">Nossa Missão</h2>
              </div>
              <div className="prose prose-lg prose-neutral text-neutral-700 font-serif leading-[1.8]">
                <p>
                  O <strong>Jornalista Inclusivo</strong> nasceu da necessidade urgente de transformar a forma como a deficiência é retratada na mídia. Nossa missão é produzir um jornalismo ético, acessível e de alta qualidade que combata o capacitismo estrutural.
                </p>
                <p>
                  Acreditamos que a informação é uma ferramenta poderosa para a garantia de direitos. Por isso, não apenas noticiamos, mas educamos, fiscalizamos e promovemos o debate público sobre neurodiversidade, acessibilidade e inclusão em todas as esferas da sociedade.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative aspect-[4/3] rounded-none overflow-hidden bg-neutral-100 shadow-2xl">
              <AutoAltImage
                src="https://picsum.photos/800/600?random=sobre-missao"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section aria-labelledby="equipe-heading" className="scroll-mt-24" id="equipe">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <Users className="h-5 w-5 text-neutral-900" aria-hidden="true" />
            </div>
            <h2 id="equipe-heading" className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-neutral-900">Nossa Equipe</h2>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mb-16 font-light leading-relaxed">
            Um time diverso de profissionais de comunicação, especialistas em acessibilidade e ativistas, unidos pelo propósito de fazer um jornalismo que representa a pluralidade humana.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { name: 'Ana Costa', role: 'Editora-Chefe', desc: 'Jornalista com 15 anos de experiência na cobertura de Direitos Humanos.', img: '10' },
              { name: 'Carlos Mendes', role: 'Repórter Especial', desc: 'Especialista em políticas públicas e acessibilidade urbana.', img: '11' },
              { name: 'Juliana Silva', role: 'Consultora de Acessibilidade', desc: 'Auditora de acessibilidade digital (WCAG) e desenvolvedora front-end.', img: '12' },
              { name: 'Roberto Alves', role: 'Fotojornalista', desc: 'Premiado por suas coberturas do paradesporto nacional e internacional.', img: '13' },
            ].map((person, idx) => (
              <div key={idx} className="group">
                <div className="relative w-full aspect-square mb-6 rounded-none overflow-hidden bg-neutral-100">
                  <AutoAltImage
                    src={`https://picsum.photos/400/400?random=${person.img}`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1">{person.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">{person.role}</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{person.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parcerias */}
        <section aria-labelledby="parcerias-heading" className="scroll-mt-24 bg-neutral-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-24 border-y border-neutral-200" id="parcerias">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-neutral-200 mx-auto mb-8">
              <Handshake className="h-5 w-5 text-neutral-900" aria-hidden="true" />
            </div>
            <h2 id="parcerias-heading" className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-neutral-900 mb-6">Parcerias Institucionais</h2>
            <p className="text-xl text-neutral-600 font-light leading-relaxed">
              Trabalhamos em rede com organizações, ONGs e institutos que compartilham da nossa visão de um mundo sem barreiras.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[1, 2, 3, 4].map((logo) => (
              <div key={logo} className="relative w-32 h-16">
                <AutoAltImage
                  src={`https://picsum.photos/300/100?random=logo${logo}`}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Projetos */}
        <section aria-labelledby="projetos-heading" className="scroll-mt-24" id="projetos">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <Lightbulb className="h-5 w-5 text-neutral-900" aria-hidden="true" />
            </div>
            <h2 id="projetos-heading" className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-neutral-900">Projetos Especiais</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-none p-10 hover:border-neutral-900 transition-colors group bg-white shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Guia de Linguagem Inclusiva</h3>
              <p className="text-neutral-600 mb-8 leading-relaxed font-serif">
                Um manual gratuito e de código aberto para redações, empresas e criadores de conteúdo sobre como se comunicar de forma não capacitista e respeitosa.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-sm text-neutral-700 font-serif">
                  <CheckCircle2 className="h-5 w-5 text-neutral-900 shrink-0" />
                  Mais de 50.000 downloads
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-700 font-serif">
                  <CheckCircle2 className="h-5 w-5 text-neutral-900 shrink-0" />
                  Adotado por 12 grandes redações
                </li>
              </ul>
              <button className="text-xs font-bold uppercase tracking-widest text-neutral-900 group-hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm transition-colors">
                Conhecer o Guia &rarr;
              </button>
            </div>

            <div className="border border-neutral-200 rounded-none p-10 hover:border-neutral-900 transition-colors group bg-white shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Observatório da Acessibilidade</h3>
              <p className="text-neutral-600 mb-8 leading-relaxed font-serif">
                Plataforma de monitoramento contínuo da acessibilidade digital nos serviços públicos brasileiros, com relatórios trimestrais e denúncias.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-sm text-neutral-700 font-serif">
                  <CheckCircle2 className="h-5 w-5 text-neutral-900 shrink-0" />
                  Monitoramento de 500+ sites governamentais
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-700 font-serif">
                  <CheckCircle2 className="h-5 w-5 text-neutral-900 shrink-0" />
                  Parceria com o Ministério Público
                </li>
              </ul>
              <button className="text-xs font-bold uppercase tracking-widest text-neutral-900 group-hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm transition-colors">
                Acessar o Observatório &rarr;
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
