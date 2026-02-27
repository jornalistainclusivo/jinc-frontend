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
      <div className="bg-brand-dark text-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Sobre Nós
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Somos um portal independente dedicado a dar voz, visibilidade e protagonismo às pessoas com deficiência no Brasil e no mundo.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* Missão */}
        <section aria-labelledby="missao-heading" className="scroll-mt-24" id="missao">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-rose/10">
                  <Target className="h-6 w-6 text-brand-rose" aria-hidden="true" />
                </div>
                <h2 id="missao-heading" className="text-3xl font-bold tracking-tight text-neutral-900">Nossa Missão</h2>
              </div>
              <div className="prose prose-lg prose-neutral text-neutral-700">
                <p>
                  O <strong>Jornalista Inclusivo</strong> nasceu da necessidade urgente de transformar a forma como a deficiência é retratada na mídia. Nossa missão é produzir um jornalismo ético, acessível e de alta qualidade que combata o capacitismo estrutural.
                </p>
                <p>
                  Acreditamos que a informação é uma ferramenta poderosa para a garantia de direitos. Por isso, não apenas noticiamos, mas educamos, fiscalizamos e promovemos o debate público sobre neurodiversidade, acessibilidade e inclusão em todas as esferas da sociedade.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-lg">
              <AutoAltImage
                src="https://picsum.photos/800/600?random=sobre-missao"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section aria-labelledby="equipe-heading" className="scroll-mt-24" id="equipe">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10">
              <Users className="h-6 w-6 text-brand-teal" aria-hidden="true" />
            </div>
            <h2 id="equipe-heading" className="text-3xl font-bold tracking-tight text-neutral-900">Nossa Equipe</h2>
          </div>
          <p className="text-lg text-neutral-600 max-w-3xl mb-12">
            Um time diverso de profissionais de comunicação, especialistas em acessibilidade e ativistas, unidos pelo propósito de fazer um jornalismo que representa a pluralidade humana.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Ana Costa', role: 'Editora-Chefe', desc: 'Jornalista com 15 anos de experiência na cobertura de Direitos Humanos.', img: '10' },
              { name: 'Carlos Mendes', role: 'Repórter Especial', desc: 'Especialista em políticas públicas e acessibilidade urbana.', img: '11' },
              { name: 'Juliana Silva', role: 'Consultora de Acessibilidade', desc: 'Auditora de acessibilidade digital (WCAG) e desenvolvedora front-end.', img: '12' },
              { name: 'Roberto Alves', role: 'Fotojornalista', desc: 'Premiado por suas coberturas do paradesporto nacional e internacional.', img: '13' },
            ].map((person, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 text-center hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
                  <AutoAltImage
                    src={`https://picsum.photos/200/200?random=${person.img}`}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{person.name}</h3>
                <p className="text-sm font-semibold text-brand-teal mb-3">{person.role}</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{person.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parcerias */}
        <section aria-labelledby="parcerias-heading" className="scroll-mt-24 bg-neutral-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl" id="parcerias">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-amber/10 mx-auto mb-6">
              <Handshake className="h-6 w-6 text-brand-amber" aria-hidden="true" />
            </div>
            <h2 id="parcerias-heading" className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">Parcerias Institucionais</h2>
            <p className="text-lg text-neutral-600">
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
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10">
              <Lightbulb className="h-6 w-6 text-brand-purple" aria-hidden="true" />
            </div>
            <h2 id="projetos-heading" className="text-3xl font-bold tracking-tight text-neutral-900">Projetos Especiais</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-2xl p-8 hover:border-brand-purple transition-colors">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Guia de Linguagem Inclusiva</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Um manual gratuito e de código aberto para redações, empresas e criadores de conteúdo sobre como se comunicar de forma não capacitista e respeitosa.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple shrink-0" />
                  Mais de 50.000 downloads
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple shrink-0" />
                  Adotado por 12 grandes redações
                </li>
              </ul>
              <button className="text-brand-purple font-semibold hover:text-brand-purple/80 focus:outline-none focus:ring-2 focus:ring-brand-purple rounded-sm px-1">
                Conhecer o Guia &rarr;
              </button>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-8 hover:border-brand-purple transition-colors">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Observatório da Acessibilidade</h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Plataforma de monitoramento contínuo da acessibilidade digital nos serviços públicos brasileiros, com relatórios trimestrais e denúncias.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple shrink-0" />
                  Monitoramento de 500+ sites governamentais
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple shrink-0" />
                  Parceria com o Ministério Público
                </li>
              </ul>
              <button className="text-brand-purple font-semibold hover:text-brand-purple/80 focus:outline-none focus:ring-2 focus:ring-brand-purple rounded-sm px-1">
                Acessar o Observatório &rarr;
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
