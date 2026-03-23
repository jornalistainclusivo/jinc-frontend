import Link from 'next/link';
import type { StrapiTag } from '@/lib/strapi-types';

interface TagBadgeProps {
  tag: StrapiTag;
  variant?: 'default' | 'small';
}

/**
 * TagBadge — Badge de tag com link para /tag/[slug]
 * Acessível: role implícito de link, foco visível, contraste WCAG AAA.
 */
export function TagBadge({ tag, variant = 'default' }: TagBadgeProps) {
  const sizeClass =
    variant === 'small'
      ? 'text-xs px-2 py-0.5'
      : 'text-sm px-3 py-1';

  return (
    <Link
      href={`/tag/${tag.slug}`}
      className={`
        inline-block rounded-none border border-neutral-300
        text-neutral-600 font-sans font-medium
        hover:border-neutral-900 hover:text-neutral-900 hover:bg-neutral-50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2
        transition-colors duration-150 motion-reduce:transition-none
        ${sizeClass}
      `}
      aria-label={`Ver artigos com a tag: ${tag.tag}`}
    >
      #{tag.tag}
    </Link>
  );
}

interface TagListProps {
  tags: StrapiTag[];
  variant?: 'default' | 'small';
  className?: string;
}

/**
 * TagList — Renderiza uma lista de TagBadge.
 */
export function TagList({ tags, variant = 'default', className = '' }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <nav
      aria-label="Tags do artigo"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {tags.map((tag) => (
        <TagBadge key={tag.id} tag={tag} variant={variant} />
      ))}
    </nav>
  );
}
