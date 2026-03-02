import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json();
        if (!imageUrl) return NextResponse.json({ error: 'Missing imageUrl' }, { status: 400 });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });

        // Ensure we handle absolute vs relative Strapi URLs
        const finalUrl = imageUrl.startsWith('http')
            ? imageUrl
            : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${imageUrl}`;

        const imgRes = await fetch(finalUrl);
        if (!imgRes.ok) throw new Error("Failed to fetch image from URL");

        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString('base64');
        const mimeType = imgRes.headers.get('content-type') || 'image/jpeg';

        const ai = new GoogleGenAI({ apiKey });
        const result = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                {
                    parts: [
                        { text: 'Crie um texto alternativo (alt text) acessível e descritivo para esta imagem, voltado para pessoas com deficiência visual. Seja direto, objetivo e descreva os elementos principais. Não use frases como "A imagem mostra" ou "Foto de". Máximo de 2 frases curtas.' },
                        {
                            inlineData: { data: base64Data, mimeType: mimeType }
                        }
                    ]
                }
            ]
        });

        const altText = result.text?.trim() || "Imagem ilustrativa";
        return NextResponse.json({ altText });
    } catch (error) {
        console.error("Alt text API error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
