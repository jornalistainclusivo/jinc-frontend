'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { GoogleGenAI } from '@google/genai';

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
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return;

        const ai = new GoogleGenAI({ apiKey });
        
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Failed to fetch image");
        
        const blob = await response.blob();
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataUrl = reader.result as string;
            const base64 = dataUrl.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        
        const mimeType = response.headers.get('content-type') || 'image/jpeg';

        const result = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              parts: [
                { text: 'Crie um texto alternativo (alt text) acessível e descritivo para esta imagem, voltado para pessoas com deficiência visual. Seja direto, objetivo e descreva os elementos principais. Não use frases como "A imagem mostra" ou "Foto de". Máximo de 2 frases curtas.' },
                {
                  inlineData: {
                    data: base64Data,
                    mimeType: mimeType
                  }
                }
              ]
            }
          ]
        });

        const altText = result.text?.trim() || "Imagem ilustrativa";
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

  return <Image src={src} alt={finalAlt} {...props} />;
}
