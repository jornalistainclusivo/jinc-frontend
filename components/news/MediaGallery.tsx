import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api';
import type { StrapiMidias, StrapiMedia } from '@/lib/strapi-types';

interface MediaItemProps {
  media: StrapiMedia;
  index: number;
}

function MediaItem({ media, index }: MediaItemProps) {
  const src = getStrapiMedia(media.url);
  if (!src) return null;

  const alt = media.alternativeText || `Mídia ${index + 1}`;
  const mime = media.mime || '';

  if (mime.startsWith('image/')) {
    return (
      <figure className="overflow-hidden rounded-sm bg-neutral-100 ring-1 ring-neutral-900/5">
        <div className="relative aspect-video w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 motion-reduce:hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {media.caption && (
          <figcaption className="px-3 py-2 text-xs text-neutral-500 font-sans">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (mime.startsWith('video/')) {
    return (
      <figure className="overflow-hidden rounded-sm bg-neutral-900">
        <video
          controls
          src={src}
          className="w-full aspect-video"
          aria-label={alt}
          preload="metadata"
        >
          <track kind="captions" label="Legendas" default />
          Seu navegador não suporta vídeos HTML5.
        </video>
        {media.caption && (
          <figcaption className="px-3 py-2 text-xs text-neutral-400 font-sans">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (mime.startsWith('audio/')) {
    return (
      <figure className="rounded-sm border border-neutral-200 p-4 bg-neutral-50">
        <audio
          controls
          src={src}
          className="w-full"
          aria-label={alt}
          preload="metadata"
        >
          Seu navegador não suporta áudio HTML5.
        </audio>
        {media.caption && (
          <figcaption className="mt-2 text-xs text-neutral-500 font-sans">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Arquivo genérico (PDF, etc.)
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-2 rounded-sm border border-neutral-300
        px-4 py-3 text-sm font-sans text-neutral-700
        hover:border-neutral-900 hover:text-neutral-900 hover:bg-neutral-50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2
        transition-colors duration-150 motion-reduce:transition-none
      "
      aria-label={`Baixar arquivo: ${media.name || alt}`}
    >
      <span aria-hidden="true">📄</span>
      <span>{media.name || alt}</span>
    </a>
  );
}

interface MediaGalleryProps {
  midias: StrapiMidias[];
  className?: string;
}

/**
 * MediaGallery — Renderiza o componente digital-media.midias do Strapi.
 * Suporta imagens, vídeos, áudios e arquivos. Acessível com WCAG AAA.
 */
export function MediaGallery({ midias, className = '' }: MediaGalleryProps) {
  if (!midias || midias.length === 0) return null;

  const allMedia = midias.flatMap((m) => m.Media || []);
  if (allMedia.length === 0) return null;

  const gridClass =
    allMedia.length === 1
      ? 'grid-cols-1'
      : allMedia.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      aria-labelledby="media-gallery-heading"
      className={`mt-12 mb-8 ${className}`}
    >
      <h2
        id="media-gallery-heading"
        className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6 font-sans"
      >
        Galeria de Mídias
      </h2>
      <div className={`grid gap-4 ${gridClass}`}>
        {allMedia.map((media, i) => (
          <MediaItem key={media.id ?? i} media={media} index={i} />
        ))}
      </div>
    </section>
  );
}
