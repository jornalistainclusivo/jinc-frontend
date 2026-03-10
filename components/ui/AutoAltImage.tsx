'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

// Cache em memória para evitar requisições repetidas para a mesma imagem durante a sessão
const altCache = new Map<string, string>();

interface AutoAltImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  autoAlt?: boolean;
}

export function AutoAltImage({ src, alt, autoAlt = true, ...props }: AutoAltImageProps) {
  const [finalAlt, setFinalAlt] = useState<string>(alt || "Imagem ilustrativa");

  useEffect(() => {
    let isMounted = true;

    const generateAltText = async (imageUrl: string) => {
      if (altCache.has(imageUrl)) {
        if (isMounted) setFinalAlt(altCache.get(imageUrl)!);
        return;
      }

      try {
        const response = await fetch('/api/ai/alt-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl })
        });

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        const altText = data.altText || "Imagem ilustrativa";

        altCache.set(imageUrl, altText);
        if (isMounted) {
          setFinalAlt(altText);
        }
      } catch (error) {
        console.error("Erro ao gerar alt text para", imageUrl, error);
      }
    };

    if ((!alt || alt.trim() === '') && autoAlt && typeof src === 'string' && src.startsWith('http')) {
      generateAltText(src);
    } else if (alt) {
      setFinalAlt(alt);
    }

    return () => {
      isMounted = false;
    };
  }, [src, alt, autoAlt]);

  // Corrige bugs de Mixed Content e Chromium IPv6 para imagens do Strapi local
  const safeSrc = typeof src === 'string' ? src.replace('127.0.0.1', 'localhost') : src;

  return <Image src={safeSrc} alt={finalAlt} unoptimized={process.env.NODE_ENV === 'development'} {...props} />;
}
