'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReaderIntelligenceContextType {
    isFocusMode: boolean;
    toggleFocusMode: () => void;
}

const ReaderIntelligenceContext = createContext<ReaderIntelligenceContextType | undefined>(undefined);

export function ReaderIntelligenceProvider({ children }: { children: React.ReactNode }) {
    const [isFocusMode, setIsFocusMode] = useState(false);

    useEffect(() => {
        // Run only on client-side to avoid Hydration Mismatch
        const stored = localStorage.getItem('jinc_focus_pref');
        if (stored === 'true') {
            setIsFocusMode(true);
        }
    }, []);

    const toggleFocusMode = () => {
        setIsFocusMode((prev) => {
            const newValue = !prev;
            localStorage.setItem('jinc_focus_pref', newValue ? 'true' : 'false');
            return newValue;
        });
    };

    useEffect(() => {
        if (isFocusMode) {
            document.documentElement.setAttribute('data-focus-mode', 'active');
            document.body.classList.add('deep-focus');
        } else {
            document.documentElement.removeAttribute('data-focus-mode');
            document.body.classList.remove('deep-focus');
        }

        // Cleanup on unmount
        return () => {
            document.documentElement.removeAttribute('data-focus-mode');
            document.body.classList.remove('deep-focus');
        };
    }, [isFocusMode]);

    return (
        <ReaderIntelligenceContext.Provider value={{ isFocusMode, toggleFocusMode }}>
            {children}
        </ReaderIntelligenceContext.Provider>
    );
}

export function useReaderIntelligence() {
    const context = useContext(ReaderIntelligenceContext);
    if (context === undefined) {
        throw new Error('useReaderIntelligence must be used within a ReaderIntelligenceProvider');
    }
    return context;
}
