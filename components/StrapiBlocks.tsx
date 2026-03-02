import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export default function StrapiBlocks({ content }: { content: BlocksContent }) {
  if (!content) return null;

  return (
    <div className="prose prose-lg max-w-[70ch]
                    font-serif leading-[1.9] text-neutral-700
                    prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight prose-headings:leading-[1.1] prose-headings:text-neutral-900 
                    prose-a:text-neutral-900 hover:prose-a:text-neutral-700
                    prose-img:rounded-xl prose-img:shadow-md">
      <BlocksRenderer content={content} />
    </div>
  );
}
