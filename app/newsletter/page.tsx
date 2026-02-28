import { Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function NewsletterPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative isolate overflow-hidden bg-neutral-950 px-6 py-24 rounded-none sm:px-24 xl:py-32 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6">
              Inclusão em foco, toda semana no seu e-mail.
            </h1>
            <p className="text-xl text-neutral-400 leading-[1.6] font-light mb-12 max-w-[45ch]">
              Junte-se a mais de 10.000 leitores que recebem nossa curadoria semanal com as reportagens mais importantes sobre neurodiversidade, direitos, educação e acessibilidade.
            </p>
            
            <ul className="space-y-6 mb-10">
              {[
                'Reportagens investigativas exclusivas',
                'Resumo das principais leis e decisões judiciais',
                'Dicas práticas de acessibilidade digital',
                'Entrevistas com especialistas e ativistas'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-neutral-300 font-serif text-lg">
                  <CheckCircle2 className="h-6 w-6 text-white shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:w-1/2 w-full max-w-md bg-white rounded-none p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-8">
              <Mail className="h-8 w-8 text-neutral-900" />
            </div>
            <h2 className="text-3xl font-serif font-medium text-neutral-900 mb-2">Assine gratuitamente</h2>
            <p className="text-neutral-500 mb-10 text-sm font-sans">Cancele quando quiser. Não enviamos spam.</p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Nome completo
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full rounded-none border-0 border-b border-neutral-300 py-3 px-0 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0 sm:text-base transition-colors"
                    placeholder="Ex: Maria Silva"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Endereço de e-mail
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-none border-0 border-b border-neutral-300 py-3 px-0 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0 sm:text-base transition-colors"
                    placeholder="voce@exemplo.com.br"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4">
                <div className="flex h-6 items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-5 w-5 rounded-sm border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="privacy" className="text-neutral-600">
                    Concordo com a <Link href="/privacidade" className="font-bold text-neutral-900 hover:underline underline-offset-4">Política de Privacidade</Link> e aceito receber comunicações.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-neutral-950 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 transition-colors"
              >
                Quero assinar a newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
