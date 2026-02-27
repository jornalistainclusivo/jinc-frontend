import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

const navigation = {
  editorial: [
    { name: 'Notícias', href: '/noticias' },
    { name: 'Neurodiversidade', href: '/neurodiversidade' },
    { name: 'Saúde', href: '/saude' },
    { name: 'Educação', href: '/educacao' },
    { name: 'Direitos PCD', href: '/direitos-pcd' },
    { name: 'Artigos', href: '/artigos' },
  ],
  institucional: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Contato', href: '/contato' },
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube,
    },
    {
      name: 'X (Twitter)',
      href: '#',
      icon: Twitter,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white tracking-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm inline-block"
            >
              Jornalista Inclusivo
            </Link>
            <p className="text-sm leading-6 text-neutral-300 max-w-xs">
              Produzir jornalismo independente, acessível e comprometido com os direitos das pessoas com deficiência no Brasil.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm p-1 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Editorial</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.editorial.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm px-1 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Institucional</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.institucional.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm leading-6 text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm px-1 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Assine nossa Newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Inclusão em foco, toda semana no seu e-mail.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Endereço de e-mail
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:w-64 sm:text-sm sm:leading-6"
                    placeholder="Seu melhor e-mail"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-brand-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
                    >
                      Assinar
                    </button>
                  </div>
                </form>
              </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-neutral-400">
            &copy; {new Date().getFullYear()} Jornalista Inclusivo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
