'use client';

import React, { useState, useId, useMemo } from 'react';
import { Plus, Minus, Info, Brain, Scale, Target } from 'lucide-react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export interface ContextualColumn {
    title: string;
    content: string | BlocksContent | any;
    icon: 'brain' | 'scale' | 'target';
}

interface ContextualLayerProps {
    title: string;
    content?: string | React.ReactNode;
    columns?: ContextualColumn[];
}

export function ContextualLayer({ title, content, columns }: ContextualLayerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const baseId = useId();
    const contentId = `context-layer-${baseId}`;

    const renderIcon = (iconType: string) => {
        switch (iconType) {
            case 'brain': return <Brain className="w-6 h-6 text-neutral-900 mb-3" aria-hidden="true" />;
            case 'scale': return <Scale className="w-6 h-6 text-neutral-900 mb-3" aria-hidden="true" />;
            case 'target': return <Target className="w-6 h-6 text-neutral-900 mb-3" aria-hidden="true" />;
            default: return null;
        }
    };



    const sanitizeHtml = (htmlContent: string) => {
        if (typeof window === 'undefined') return htmlContent; // Skipping sanitization on SSR
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        // Basic script injection sanitization fallback 
        const scripts = doc.getElementsByTagName('script');
        let i = scripts.length;
        while (i--) {
            scripts[i].parentNode?.removeChild(scripts[i]);
        }
        return doc.body.innerHTML;
    };

    return (
        <div className="contextual-layer-bg my-12 border-y-2 border-neutral-900 bg-neutral-50 px-4 sm:px-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-inset group"
            >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-neutral-900 text-white rounded-full p-1 flex-shrink-0">
                            <Info className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-700 transition-colors select-none">
                            Entenda o Contexto
                        </span>
                    </div>
                    <h3 className="text-xl font-serif font-medium text-neutral-900 transition-colors">
                        {title}
                    </h3>
                </div>
                <div
                    className="text-neutral-900 flex-shrink-0 p-2 sm:p-3 transition-colors group-hover:bg-neutral-200 rounded-full ml-4"
                    aria-hidden="true"
                >
                    {isOpen ? <Minus className="h-5 w-5 sm:h-6 sm:w-6" /> : <Plus className="h-5 w-5 sm:h-6 sm:w-6" />}
                </div>
            </button>

            <div
                id={contentId}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                inert={!isOpen ? true : undefined}
            >
                <div className="overflow-hidden">
                    <div className="pb-8 pt-2">
                        {columns && columns.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                                {columns.map((col, idx) => (
                                    <div key={idx} className="group border-l-2 border-neutral-200 pl-6 hover:border-neutral-900 transition-colors duration-300">
                                        <div className="transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 origin-left">
                                            {renderIcon(col.icon)}
                                        </div>
                                        <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-neutral-900 mb-3">{col.title}</h4>
                                        <div className="font-sans text-neutral-700 text-base leading-relaxed prose prose-neutral prose-sm max-w-none">
                                            {typeof col.content === 'string' ? (
                                                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(col.content) }} />
                                            ) : Array.isArray(col.content) ? (
                                                <BlocksRenderer content={col.content} />
                                            ) : (
                                                col.content
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="prose prose-neutral max-w-none font-serif text-neutral-800 leading-relaxed text-lg">
                                {typeof content === 'string' ? (
                                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
                                ) : (
                                    content
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
