import { Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function NewsletterPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative isolate overflow-hidden bg-brand-dark px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Inclusão em foco, toda semana no seu e-mail.
            </h1>
            <p className="text-lg leading-8 text-neutral-300 mb-8">
              Junte-se a mais de 10.000 leitores que recebem nossa curadoria semanal com as reportagens mais importantes sobre neurodiversidade, direitos, educação e acessibilidade.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                'Reportagens investigativas exclusivas',
                'Resumo das principais leis e decisões judiciais',
                'Dicas práticas de acessibilidade digital',
                'Entrevistas com especialistas e ativistas'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-neutral-200">
                  <CheckCircle2 className="h-6 w-6 text-brand-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:w-1/2 w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-full mb-6">
              <Mail className="h-6 w-6 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Assine gratuitamente</h2>
            <p className="text-neutral-600 mb-8 text-sm">Cancele quando quiser. Não enviamos spam.</p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-neutral-900">
                  Nome completo
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                    placeholder="Ex: Maria Silva"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-900">
                  Endereço de e-mail
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                    placeholder="voce@exemplo.com.br"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="flex h-6 items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="privacy" className="text-neutral-600">
                    Concordo com a <Link href="/privacidade" className="font-semibold text-brand-primary hover:text-brand-dark">Política de Privacidade</Link> e aceito receber comunicações.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-brand-primary px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
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
