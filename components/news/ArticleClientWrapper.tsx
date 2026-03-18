'use client';

import { useState, useEffect } from 'react';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';

interface ArticleClientWrapperProps {
  children: React.ReactNode;
}

export function ArticleClientWrapper({ children }: ArticleClientWrapperProps) {
  const { isFocusMode } = useAccessibility();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article 
      data-focus-mode={isFocusMode ? 'active' : 'inactive'}
      className={`group/article min-h-screen pb-32 transition-colors duration-200 ease-in-out ${isFocusMode ? 'bg-[#FDFBF7]' : 'bg-white'}`}
    >
      {/* Progress Bar (Focus Mode Only) */}
      {isFocusMode && (
        <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 z-50">
          <div 
            className="h-full bg-neutral-900 transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}

      {children}
    </article>
  );
}
