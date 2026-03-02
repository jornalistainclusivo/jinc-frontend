import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Image from 'next/image';

export default function StrapiBlocks({ content }: { content: BlocksContent }) {
  if (!content) return null;

  return (
    <div className="prose prose-lg max-w-[70ch]
                    font-serif leading-[1.9] text-neutral-700
                    prose-headings:text-neutral-900 
                    prose-a:text-neutral-900 hover:prose-a:text-neutral-700">
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="font-serif font-medium tracking-tight text-neutral-900 leading-[1.05] max-w-[20ch] text-balance text-center">{children}</h1>;
              case 2:
                return <h2 className="font-sans font-medium tracking-tight leading-[1.1] text-neutral-900 mt-10 mb-4">{children}</h2>;
              case 3:
                return <h3 className="font-sans font-medium tracking-tight leading-[1.2] text-neutral-900 mt-8 mb-3">{children}</h3>;
              default:
                return <h4 className="font-sans font-medium text-neutral-900">{children}</h4>;
            }
          },
          image: ({ image }) => {
            if (!image) return null;
            return (
              <figure className="my-8">
                <Image
                  src={image.url}
                  alt={image.alternativeText || ''}
                  width={image.width}
                  height={image.height}
                  className="rounded-xl shadow-md w-full h-auto"
                />
                {image.caption && <figcaption className="text-sm text-neutral-500 text-center mt-2">{image.caption}</figcaption>}
              </figure>
            );
          },
        }}
      />
    </div>
  );
}
