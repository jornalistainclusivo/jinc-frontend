'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReaderIntelligenceContextType {
    isFocusMode: boolean;
    toggleFocusMode: () => void;
}

const ReaderIntelligenceContext = createContext<ReaderIntelligenceContextType | undefined>(undefined);

export function ReaderIntelligenceProvider({ children }: { children: React.ReactNode }) {
    const [isFocusMode, setIsFocusMode] = useState(false);

    const toggleFocusMode = () => {
        setIsFocusMode((prev) => !prev);
    };

    useEffect(() => {
        if (isFocusMode) {
            document.documentElement.setAttribute('data-focus-mode', 'active');
        } else {
            document.documentElement.removeAttribute('data-focus-mode');
        }

        // Cleanup on unmount
        return () => {
            document.documentElement.removeAttribute('data-focus-mode');
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
