import { NextRequest } from 'next/server';
import { GoogleGenAI, Modality } from '@google/genai';

export async function POST(req: NextRequest) {
    try {
        const { text, title } = await req.json();
        if (!text || !title) return new Response('Missing text or title', { status: 400 });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return new Response('Server missing API Key', { status: 500 });

        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Leia o seguinte texto de forma clara, profissional e acolhedora, como um âncora de jornal. Faça pausas adequadas na pontuação.\n\nTítulo: ${title}\n\n${text}`;

        const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of responseStream) {
                        const base64Audio = chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                        if (base64Audio) {
                            controller.enqueue(new TextEncoder().encode(`data: ${base64Audio}\n\n`));
                        }
                    }
                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('TTS Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
