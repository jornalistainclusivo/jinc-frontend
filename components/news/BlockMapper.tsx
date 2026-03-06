import StrapiBlocks from '@/components/StrapiBlocks';
import { ContextualLayer, ContextualColumn } from '@/components/news/ContextualLayer';

export interface DynamicBlock {
    id: number;
    __component: string;
    [key: string]: any;
}

export function BlockMapper({ blocks }: { blocks: DynamicBlock[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="flex flex-col gap-8 w-full">
            {blocks.map((block) => {
                if (block.__component === 'blocos-materia.texto-livre') {
                    return <StrapiBlocks key={`block-${block.id}`} content={block.conteudo} />;
                }
                if (block.__component === 'blocos-materia.contextual-layer') {
                    return (
                        <ContextualLayer
                            key={`block-${block.id}`}
                            title={block.titulo}
                            content={block.conteudo_simples}
                            columns={block.colunas as ContextualColumn[]}
                        />
                    );
                }
                return null; // Ignore unknown blocks gracefully
            })}
        </div>
    );
}
