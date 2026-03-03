'use client';

import React from 'react';
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import { useReaderIntelligence } from '@/components/news/ReaderIntelligenceProvider';

export function ShareBlock() {
    const { isFocusMode } = useReaderIntelligence();
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
    };

    return (
        <div
            className={`flex items-center gap-4 transition-opacity duration-300 ${isFocusMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Compartilhar artigo"
        >
            <button
                className="text-neutral-400 hover:text-[#1DA1F2] hover:bg-neutral-100 p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Compartilhar no Twitter"
            >
                <Twitter className="w-5 h-5" />
            </button>

            <button
                className="text-neutral-400 hover:text-[#1877F2] hover:bg-neutral-100 p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Compartilhar no Facebook"
            >
                <Facebook className="w-5 h-5" />
            </button>

            <button
                className="text-neutral-400 hover:text-[#0A66C2] hover:bg-neutral-100 p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Compartilhar no LinkedIn"
            >
                <Linkedin className="w-5 h-5" />
            </button>

            <button
                className="text-neutral-400 hover:text-[#25D366] hover:bg-neutral-100 p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Compartilhar no WhatsApp"
            >
                {/* WhatsApp Icon placeholder - using a generic SVG path for WhatsApp if lucide doesn't have it natively or using MessageCircle */}
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            </button>

            <button
                onClick={handleCopyLink}
                className="text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Copiar link do artigo"
            >
                <Link2 className="w-5 h-5" />
            </button>
        </div>
    );
}
