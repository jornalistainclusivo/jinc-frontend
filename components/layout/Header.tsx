'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Mail, Accessibility, ChevronDown } from 'lucide-react';
import { AccessibilityToolbar } from '../accessibility/AccessibilityToolbar';
import { SearchModal } from '../search/SearchModal';

const navigation = [
  { name: 'Notícias', href: '/noticias' },
  { name: 'Neurodiversidade', href: '/neurodiversidade' },
  { name: 'Direitos PCD', href: '/direitos-pcd' },
  { name: 'Artigos', href: '/artigos' },
];

const hamburgerMenu = [
  { 
    name: 'Notícias', 
    href: '/noticias',
    color: 'text-brand-rose',
    bgHover: 'hover:bg-brand-rose/10',
    subItems: [
      { name: 'Últimas Notícias', href: '/noticias/ultimas-noticias' },
      { name: 'Mercado de Trabalho', href: '/noticias/mercado-trabalho' },
      { name: 'Entrevistas', href: '/noticias/entrevistas' }
    ]
  },
  { name: 'Neurodiversidade', href: '/neurodiversidade', color: 'text-brand-amber', bgHover: 'hover:bg-brand-amber/10' },
  { name: 'Saúde', href: '/saude', color: 'text-brand-teal', bgHover: 'hover:bg-brand-teal/10' },
  { name: 'Educação', href: '/educacao', color: 'text-brand-purple', bgHover: 'hover:bg-brand-purple/10' },
  { 
    name: 'Direitos PCD', 
    href: '/direitos-pcd',
    color: 'text-brand-green',
    bgHover: 'hover:bg-brand-green/10',
    subItems: [
      { name: 'Advogada Responde', href: '/direitos-pcd/advogada-responde' },
      { name: 'Direito Inclusivo', href: '/direitos-pcd/direito-inclusivo' }
    ]
  },
  { 
    name: 'Artigos', 
    href: '/artigos',
    color: 'text-brand-primary',
    bgHover: 'hover:bg-brand-primary/10',
    subItems: [
      { name: 'Moda Inclusiva', href: '/artigos/moda-inclusiva' },
      { name: 'Sem Barreiras', href: '/artigos/sem-barreiras' },
      { name: 'Sem Filtro & Com Afeto', href: '/artigos/sem-filtro-com-afeto' },
      { name: 'Psicologia Inclusiva', href: '/artigos/psicologia-inclusiva' }
    ]
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpanded = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedItems(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Helper to render menu items with optional sub-items
  const renderMenuItems = (items: any[]) => {
    return items.map((item) => {
      const isExpanded = expandedItems[item.name] || false;
      const hasSubItems = item.subItems && item.subItems.length > 0;
      
      return (
        <div key={item.name} className="py-1">
          <div className="flex items-center justify-between">
            <Link
              href={item.href}
              className={`flex-1 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 ${item.bgHover || 'hover:bg-neutral-50'} focus:outline-none focus:ring-2 focus:ring-brand-primary`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={`mr-2 ${item.color || 'text-brand-primary'}`}>•</span>
              {item.name}
            </Link>
            {hasSubItems && (
              <button
                onClick={(e) => toggleExpanded(item.name, e)}
                className={`p-2 rounded-lg ${item.bgHover || 'hover:bg-neutral-50'} focus:outline-none focus:ring-2 focus:ring-brand-primary`}
                aria-expanded={isExpanded}
                aria-label={`Expandir submenu de ${item.name}`}
              >
                <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          {hasSubItems && isExpanded && (
            <div className="pl-6 mt-1 space-y-1 border-l-2 border-neutral-100 ml-4">
              {item.subItems.map((subItem: any) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-neutral-600 ${item.bgHover || 'hover:bg-neutral-50'} hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary`}
                  onClick={() => setMenuOpen(false)}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <AccessibilityToolbar />
      
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / h1 */}
          <div className="flex shrink-0 items-center m-0">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-sm"
              aria-label="Jornalista Inclusivo - Página Inicial"
            >
              Jornalista Inclusivo.
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-sm px-2 py-1 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions (Universal) */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              type="button" 
              className="text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-full p-2 transition-colors"
              aria-label="Buscar no site"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              href="/newsletter"
              className="hidden sm:flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Newsletter
            </Link>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="universal-menu"
            >
              <span className="sr-only">{menuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}</span>
              {menuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Universal Slide-over Menu */}
      {menuOpen && (
        <div id="universal-menu" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-40 bg-black/20" aria-hidden="true" onClick={() => setMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-sm" onClick={() => setMenuOpen(false)}>
                <span className="text-xl font-serif font-bold text-neutral-900">Jornalista Inclusivo.</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span className="sr-only">Fechar menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-neutral-200">
                
                <div className="space-y-1 py-6">
                  {renderMenuItems(hamburgerMenu)}
                </div>
                <div className="py-6 space-y-2">
                  <Link
                    href="/newsletter"
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Mail className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Assinar Newsletter
                  </Link>
                  <Link
                    href="/acessibilidade"
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Accessibility className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Acessibilidade do Site
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
