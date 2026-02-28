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
      <header className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-neutral-950 text-neutral-50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tighter text-white leading-[1.1] mb-6 text-balance mx-auto">
            Fale Conosco
          </h1>
          <p className="text-xl text-neutral-400 leading-[1.6] font-light text-balance mx-auto max-w-[55ch]">
            Tem uma sugestão de pauta, dúvida, crítica ou quer propor uma parceria? Estamos prontos para ouvir você.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Informações de Contato */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-neutral-900 mb-8">Informações de Contato</h2>
            <p className="text-xl text-neutral-600 mb-16 font-light leading-relaxed">
              Nossa equipe está disponível de segunda a sexta-feira, das 9h às 18h. Responderemos sua mensagem o mais breve possível.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Mail className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">E-mail</h3>
                  <p className="mt-1 text-neutral-900 font-serif">Para pautas e redação:</p>
                  <a href="mailto:redacao@jornalistainclusivo.com.br" className="text-neutral-600 font-serif hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm transition-colors">redacao@jornalistainclusivo.com.br</a>
                  <p className="mt-4 text-neutral-900 font-serif">Para parcerias e comercial:</p>
                  <a href="mailto:contato@jornalistainclusivo.com.br" className="text-neutral-600 font-serif hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm transition-colors">contato@jornalistainclusivo.com.br</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Phone className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Telefone / WhatsApp</h3>
                  <p className="mt-1 text-neutral-900 font-serif">Atendimento exclusivo para mensagens de texto e áudio.</p>
                  <a href="tel:+5511999999999" className="text-neutral-600 font-serif hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm transition-colors">+55 (11) 99999-9999</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <MapPin className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Endereço</h3>
                  <p className="mt-1 text-neutral-600 font-serif leading-relaxed">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo - SP, 01310-100<br />
                    Brasil
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato Acessível */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-2xl">
            <h2 className="text-2xl font-serif font-bold tracking-tight text-neutral-900 mb-8">Envie uma Mensagem</h2>
            
            <form className="space-y-8" action="#" method="POST">
              <div>
                <label htmlFor="nome" className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Nome Completo <span className="text-neutral-900" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  autoComplete="name"
                  required
                  aria-required="true"
                  className="block w-full rounded-none border-0 border-b border-neutral-300 py-3 px-0 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0 sm:text-base transition-colors"
                  placeholder="Ex: Maria Silva"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  E-mail <span className="text-neutral-900" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  className="block w-full rounded-none border-0 border-b border-neutral-300 py-3 px-0 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0 sm:text-base transition-colors"
                  placeholder="Ex: maria@email.com"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Assunto <span className="text-neutral-900" aria-hidden="true">*</span>
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  aria-required="true"
                  className="block w-full rounded-none border-0 border-b border-neutral-300 py-3 px-0 text-neutral-900 focus:border-neutral-900 focus:ring-0 sm:text-base transition-colors bg-white"
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
                <label htmlFor="mensagem" className="block text-xs font-bold uppercase tracking-widest text-neutral-900 mb-2">
                  Mensagem <span className="text-neutral-900" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  aria-required="true"
                  className="block w-full rounded-none border-0 border-b border-neutral-300 py-3 px-0 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-0 sm:text-base transition-colors resize-y"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              <div className="flex items-start pt-4">
                <div className="flex h-6 items-center">
                  <input
                    id="privacidade"
                    name="privacidade"
                    type="checkbox"
                    required
                    aria-required="true"
                    className="h-5 w-5 rounded-sm border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="privacidade" className="text-neutral-600">
                    Concordo com a <Link href="/privacidade" className="font-bold text-neutral-900 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm">Política de Privacidade</Link> e autorizo o uso dos meus dados para retorno do contato. <span className="text-neutral-900" aria-hidden="true">*</span>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center items-center gap-3 rounded-full bg-neutral-950 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 transition-colors mt-8"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
