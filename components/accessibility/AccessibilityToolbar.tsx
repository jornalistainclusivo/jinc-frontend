'use client';

import { useState, useEffect, useCallback } from 'react';
import { Type, Contrast, Volume2 } from 'lucide-react';

export function AccessibilityToolbar() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    // Load preferences from localStorage if available
    const savedContrast = localStorage.getItem('ji-high-contrast') === 'true';
    const savedFontScale = parseFloat(localStorage.getItem('ji-font-scale') || '1');
    
    if (savedContrast) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsHighContrast(true);
      document.body.classList.add('high-contrast');
    }
    
    if (savedFontScale !== 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFontScale(savedFontScale);
      document.documentElement.style.setProperty('--font-scale', String(savedFontScale));
    }
  }, []);

  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => {
      const newValue = !prev;
      localStorage.setItem('ji-high-contrast', String(newValue));
      
      if (newValue) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      return newValue;
    });
  }, []);

  const applyFontScale = useCallback((scale: number) => {
    setFontScale(scale);
    localStorage.setItem('ji-font-scale', String(scale));
    document.documentElement.style.setProperty('--font-scale', String(scale));
  }, []);

  const increaseFont = () => {
    if (fontScale < 1.5) applyFontScale(fontScale + 0.1);
  };

  const decreaseFont = () => {
    if (fontScale > 0.9) applyFontScale(fontScale - 0.1);
  };

  const resetFont = () => applyFontScale(1);

  return (
    <div 
      className="bg-neutral-100 border-b border-neutral-200 py-2 px-4 flex justify-end items-center gap-4 text-sm"
      role="toolbar"
      aria-label="Ferramentas de acessibilidade"
    >
      <div className="flex items-center gap-2">
        <span className="sr-only md:not-sr-only md:text-neutral-700 font-medium mr-2" aria-hidden="true">Tamanho do texto:</span>
        <button 
          onClick={decreaseFont}
          className="p-1.5 rounded hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-neutral-900 font-bold"
          aria-label="Diminuir tamanho do texto"
        >
          A-
        </button>
        <button 
          onClick={resetFont}
          className="p-1.5 rounded hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-neutral-900 font-bold"
          aria-label="Tamanho do texto original"
        >
          A
        </button>
        <button 
          onClick={increaseFont}
          className="p-1.5 rounded hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-neutral-900 font-bold text-lg"
          aria-label="Aumentar tamanho do texto"
        >
          A+
        </button>
      </div>

      <div className="w-px h-6 bg-neutral-300 mx-1" aria-hidden="true"></div>

      <button
        onClick={() => toggleHighContrast()}
        className="flex items-center gap-2 p-1.5 rounded hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-neutral-900 font-medium"
        aria-pressed={isHighContrast}
      >
        <Contrast size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Alto Contraste</span>
      </button>
    </div>
  );
}
