'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { articles } from '@/lib/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim() === '' 
    ? [] 
    : articles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.description.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query)}`);
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm transition-opacity" onClick={handleClose} aria-hidden="true" />
      
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all mx-4 flex flex-col max-h-[80vh]">
        <h2 id="search-modal-title" className="sr-only">Busca no site</h2>
        <form onSubmit={handleSearch} className="relative border-b border-neutral-200 shrink-0">
          <Search className="pointer-events-none absolute left-4 top-4 h-6 w-6 text-neutral-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="h-14 w-full border-0 bg-transparent pl-12 pr-12 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-lg outline-none"
            placeholder="Buscar reportagens, artigos, guias..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Campo de busca"
          />
          <button
            type="button"
            className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-sm"
            onClick={handleClose}
          >
            <span className="sr-only">Fechar busca</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </form>

        {query.trim() !== '' && (
          <div className="overflow-y-auto p-4 flex-1">
            {results.length > 0 ? (
              <ul className="space-y-2" role="listbox">
                {results.map((article) => (
                  <li key={article.id} role="option" aria-selected="false">
                    <Link
                      href={`/artigo/${article.slug}`}
                      className="block rounded-xl p-3 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                      onClick={handleClose}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">{article.category}</span>
                        <span className="text-xs text-neutral-400">&bull;</span>
                        <span className="text-xs text-neutral-500">{article.date}</span>
                      </div>
                      <h4 className="text-base font-semibold text-neutral-900">{article.title}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 text-center text-neutral-500">
                Nenhum resultado encontrado para &quot;{query}&quot;.
              </div>
            )}
            
            {results.length > 0 && (
              <div className="mt-4 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-50 px-4 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                >
                  Ver todos os resultados para &quot;{query}&quot;
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
