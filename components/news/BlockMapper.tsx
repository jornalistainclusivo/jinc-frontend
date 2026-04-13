import StrapiBlocks from '@/components/StrapiBlocks';
import ContextualLayer from '@/components/news/ContextualLayer';
import { PullQuote } from '@/components/news/PullQuote';
import { ShareBlock } from '@/components/news/ShareBlock';

export type BlockContextualLayer = {
    __component: 'blocos-materia.contextual-layer';
    id: number;
    title?: string;
    layout: 'single_column' | 'multi_column';
    items: any[];
};

export type BlockTextoLivre = {
    __component: 'blocos-materia.texto-livre';
    id: number;
    texto: any[]; // Rich text format array from Strapi
};

export type BlockPullQuote = {
    __component: 'blocos-materia.pull-quote';
    id: number;
    texto: string;
    autor?: string | null;
};

export type BlockShareBlock = {
    __component: 'blocos-materia.share-block';
    id: number;
    titulo_alternativo?: string | null;
};

export type DynamicBlock = BlockContextualLayer | BlockTextoLivre | BlockPullQuote | BlockShareBlock;

export function BlockMapper({ blocks }: { blocks: DynamicBlock[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="flex flex-col gap-8 w-full">
            {blocks.map((block, index) => {
                const uniqueKey = `block-${block.__component}-${block.id}-${index}`;
                
                switch (block.__component) {
                    case 'blocos-materia.texto-livre':
                        const isFirstText = blocks.findIndex(b => b.__component === 'blocos-materia.texto-livre') === index;
                        return <StrapiBlocks key={uniqueKey} content={block.texto} isLead={isFirstText} />;
                        
                    case 'blocos-materia.contextual-layer':
                        return (
                            <ContextualLayer
                                key={uniqueKey}
                                title={block.title || "Desconstruindo o Tema"}
                                layout={block.layout || 'multi_column'}
                                items={block.items || []}
                            />
                        );
                        
                    case 'blocos-materia.pull-quote':
                        return (
                            <PullQuote 
                                key={uniqueKey}
                                texto={block.texto}
                                autor={block.autor}
                            />
                        );
                        
                    case 'blocos-materia.share-block':
                        return (
                            <div key={uniqueKey} className="my-6 lg:my-10 flex w-full">
                                <ShareBlock />
                            </div>
                        );
                        
                    default:
                        console.warn(`BlockMapper: Componente não mapeado - ${(block as any).__component}`);
                        return null; // Ignore unknown blocks gracefully
                }
            })}
        </div>
    );
}
