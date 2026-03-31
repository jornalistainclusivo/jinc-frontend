import { NextRequest, NextResponse } from 'next/server';
import { generateAltText } from '../../../../lib/ai-provider';

export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json();

        // Security: Validação de Payload
        if (!imageUrl || typeof imageUrl !== 'string') return NextResponse.json({ error: 'Missing or invalid imageUrl' }, { status: 400 });
        if (imageUrl.length > 2000) return NextResponse.json({ error: 'URL payload too large' }, { status: 413 });

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

        const altText = await generateAltText(base64Data, mimeType);

        return NextResponse.json({ altText });
    } catch (error) {
        console.error("Alt text API error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
