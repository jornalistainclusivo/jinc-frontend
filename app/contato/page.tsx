import Link from 'next/link';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a equipe do Jornalista Inclusivo. Envie sugestões de pauta, dúvidas ou parcerias.',
};

export default function ContatoPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <div className="bg-brand-dark text-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Fale Conosco
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Tem uma sugestão de pauta, dúvida, crítica ou quer propor uma parceria? Estamos prontos para ouvir você.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Informações de Contato */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-8">Informações de Contato</h2>
            <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
              Nossa equipe está disponível de segunda a sexta-feira, das 9h às 18h. Responderemos sua mensagem o mais breve possível.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Mail className="h-6 w-6 text-brand-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">E-mail</h3>
                  <p className="mt-1 text-neutral-600">Para pautas e redação:</p>
                  <a href="mailto:redacao@jornalistainclusivo.com.br" className="text-brand-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm">redacao@jornalistainclusivo.com.br</a>
                  <p className="mt-2 text-neutral-600">Para parcerias e comercial:</p>
                  <a href="mailto:contato@jornalistainclusivo.com.br" className="text-brand-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm">contato@jornalistainclusivo.com.br</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10">
                  <Phone className="h-6 w-6 text-brand-teal" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Telefone / WhatsApp</h3>
                  <p className="mt-1 text-neutral-600">Atendimento exclusivo para mensagens de texto e áudio.</p>
                  <a href="tel:+5511999999999" className="text-brand-teal font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-sm">+55 (11) 99999-9999</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-amber/10">
                  <MapPin className="h-6 w-6 text-brand-amber" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Endereço</h3>
                  <p className="mt-1 text-neutral-600 leading-relaxed">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo - SP, 01310-100<br />
                    Brasil
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato Acessível */}
          <div className="bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">Envie uma Mensagem</h2>
            
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold leading-6 text-neutral-900 mb-2">
                  Nome Completo <span className="text-brand-rose" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  autoComplete="name"
                  required
                  aria-required="true"
                  className="block w-full rounded-md border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 bg-white transition-shadow"
                  placeholder="Ex: Maria Silva"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-neutral-900 mb-2">
                  E-mail <span className="text-brand-rose" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  className="block w-full rounded-md border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 bg-white transition-shadow"
                  placeholder="Ex: maria@email.com"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-semibold leading-6 text-neutral-900 mb-2">
                  Assunto <span className="text-brand-rose" aria-hidden="true">*</span>
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  aria-required="true"
                  className="block w-full rounded-md border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 bg-white transition-shadow"
                >
                  <option value="">Selecione um assunto...</option>
                  <option value="pauta">Sugestão de Pauta</option>
                  <option value="parceria">Parcerias e Comercial</option>
                  <option value="duvida">Dúvida Geral</option>
                  <option value="erro">Reportar Erro no Site</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold leading-6 text-neutral-900 mb-2">
                  Mensagem <span className="text-brand-rose" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  aria-required="true"
                  className="block w-full rounded-md border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 bg-white transition-shadow resize-y"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="privacidade"
                    name="privacidade"
                    type="checkbox"
                    required
                    aria-required="true"
                    className="h-5 w-5 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="privacidade" className="text-neutral-600">
                    Concordo com a <Link href="/privacidade" className="font-semibold text-brand-primary hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm">Política de Privacidade</Link> e autorizo o uso dos meus dados para retorno do contato. <span className="text-brand-rose" aria-hidden="true">*</span>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center items-center gap-2 rounded-md bg-brand-primary px-4 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
