import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface ContextualItem {
  heading: string;
  description: any; // Strapi Blocks AST
}

interface ContextualLayerProps {
  title?: string;
  layout: 'single_column' | 'multi_column';
  items: ContextualItem[];
}

export default function ContextualLayer({ title, layout, items }: ContextualLayerProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="my-12 p-8 bg-neutral-50 border-l-4 border-neutral-900 rounded-r-lg">
      <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-neutral-500">
        {title || "Contexto e Acessibilidade"}
      </h3>
      <div className={`flex flex-wrap gap-8 ${layout === 'single_column' ? 'flex-col' : 'flex-row'}`}>
        {items.map((item, idx) => (
          <div key={idx} className="flex-1 min-w-[300px] max-w-full lg:max-w-[48%]">
            <h4 className="font-serif text-xl mb-4 text-neutral-900 border-b pb-2">
              {item.heading}
            </h4>
            <div className="prose prose-neutral leading-relaxed">
              <BlocksRenderer content={item.description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
