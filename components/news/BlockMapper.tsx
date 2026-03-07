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
                    return <StrapiBlocks key={`block-${block.id}`} content={block.texto} />;
                }
                if (block.__component === 'blocos-materia.contextual-layer') {
                    return (
                        <ContextualLayer
                            key={`block-${block.id}`}
                            title="Desconstruindo o Tema"
                            columns={[
                                { icon: 'brain', title: 'Conceito', content: block.conceito || '' },
                                { icon: 'scale', title: 'Regras', content: block.regra || '' },
                                { icon: 'target', title: 'Impactos', content: block.impacto || '' }
                            ]}
                        />
                    );
                }
                return null; // Ignore unknown blocks gracefully
            })}
        </div>
    );
}
