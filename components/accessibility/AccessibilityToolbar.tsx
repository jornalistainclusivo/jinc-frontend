'use client';

import { Contrast } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

export function AccessibilityToolbar() {
  const {
    isHighContrast,
    toggleHighContrast,
    fontScale,
    increaseFont,
    decreaseFont,
    resetFont,
  } = useAccessibility();

  return (
    <div 
      className="bg-neutral-950 border-b border-neutral-900 py-1.5 px-4 flex justify-end items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400"
      role="toolbar"
      aria-label="Ferramentas de acessibilidade"
    >
      <div className="flex items-center gap-2">
        <span className="sr-only md:not-sr-only mr-2" aria-hidden="true">Tamanho do texto:</span>
        <button 
          onClick={decreaseFont}
          className="p-1 rounded hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-colors"
          aria-label="Diminuir tamanho do texto"
        >
          A-
        </button>
        <button 
          onClick={resetFont}
          className="p-1 rounded hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-colors"
          aria-label="Tamanho do texto original"
        >
          A
        </button>
        <button 
          onClick={increaseFont}
          className="p-1 rounded hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-colors text-xs"
          aria-label="Aumentar tamanho do texto"
        >
          A+
        </button>
      </div>

      <div className="w-px h-4 bg-neutral-800 mx-1" aria-hidden="true"></div>

      <button
        onClick={toggleHighContrast}
        className="flex items-center gap-2 p-1 rounded hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-colors"
        aria-pressed={isHighContrast}
      >
        <Contrast size={14} aria-hidden="true" />
        <span className="hidden sm:inline">Alto Contraste</span>
      </button>
    </div>
  );
}
