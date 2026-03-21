import React from 'react';
import { Quote } from 'lucide-react';

interface PullQuoteProps {
    texto: string;
    autor?: string | null;
}

export function PullQuote({ texto, autor }: PullQuoteProps) {
    if (!texto) return null;

    return (
        <figure className="my-16 px-6 sm:px-10 border-l-4 border-neutral-900 bg-neutral-50/50 py-8 transition-colors duration-200 group-data-[focus-mode=active]/article:bg-white group-data-[focus-mode=active]/article:border-neutral-500 shadow-sm relative overflow-hidden">
            <Quote 
                className="absolute top-4 left-4 w-24 h-24 text-neutral-100 -z-10 transform -rotate-6" 
                aria-hidden="true" 
            />
            <blockquote className="text-2xl sm:text-3xl font-serif font-medium text-neutral-900 leading-[1.4] tracking-tight mb-6 relative z-10 text-balance">
                &ldquo;{texto}&rdquo;
            </blockquote>
            {autor && (
                <figcaption className="text-sm font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-3">
                    <span className="w-8 h-px bg-neutral-300"></span>
                    {autor}
                </figcaption>
            )}
        </figure>
    );
}
