'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AccessibilityContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  fontScale: number;
  applyFontScale: (scale: number) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  // Initialize from localStorage on client mount — read-only, no setState inside effect
  useEffect(() => {
    const savedContrast = localStorage.getItem('ji-high-contrast') === 'true';
    const savedFocus = localStorage.getItem('jinc_focus_pref') === 'true';
    const savedFontScale = parseFloat(localStorage.getItem('ji-font-scale') || '1');

    // Batch all state updates by reading values first, then setting
    const updates: (() => void)[] = [];

    if (savedContrast) {
      updates.push(() => setIsHighContrast(true));
      document.body.classList.add('high-contrast');
    }

    if (savedFocus) {
      updates.push(() => setIsFocusMode(true));
      document.documentElement.setAttribute('data-focus-mode', 'active');
      document.body.classList.add('deep-focus');
    }

    if (savedFontScale !== 1) {
      updates.push(() => setFontScale(savedFontScale));
      document.documentElement.style.setProperty('--font-scale', String(savedFontScale));
    }

    updates.forEach((fn) => fn());
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

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('jinc_focus_pref', String(newValue));
      
      if (newValue) {
        document.documentElement.setAttribute('data-focus-mode', 'active');
        document.body.classList.add('deep-focus');
      } else {
        document.documentElement.removeAttribute('data-focus-mode');
        document.body.classList.remove('deep-focus');
      }
      return newValue;
    });
  }, []);

  const applyFontScale = useCallback((scale: number) => {
    setFontScale(scale);
    localStorage.setItem('ji-font-scale', String(scale));
    document.documentElement.style.setProperty('--font-scale', String(scale));
  }, []);

  const increaseFont = useCallback(() => {
    setFontScale((prev) => {
      const newScale = prev < 1.5 ? prev + 0.1 : prev;
      if (newScale !== prev) applyFontScale(newScale);
      return prev;
    });
  }, [applyFontScale]);

  const decreaseFont = useCallback(() => {
    setFontScale((prev) => {
      const newScale = prev > 0.9 ? prev - 0.1 : prev;
      if (newScale !== prev) applyFontScale(newScale);
      return prev;
    });
  }, [applyFontScale]);

  const resetFont = useCallback(() => applyFontScale(1), [applyFontScale]);

  return (
    <AccessibilityContext.Provider
      value={{
        isHighContrast,
        toggleHighContrast,
        isFocusMode,
        toggleFocusMode,
        fontScale,
        applyFontScale,
        increaseFont,
        decreaseFont,
        resetFont,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
