import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

interface AIProviderConfig {
    provider: 'gemini' | 'groq' | 'openrouter' | 'ollama';
    apiKey?: string;
    baseUrl?: string;
    model: string;
    siteUrl?: string; // OpenRouter
}

export function getConfig(): AIProviderConfig {
    const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase() as AIProviderConfig['provider'];

    switch (provider) {
        case 'groq':
            return {
                provider: 'groq',
                apiKey: process.env.GROQ_API_KEY,
                baseUrl: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
                // Para visão no Groq, recomendamos o Llama 3.2 11B Vision
                model: process.env.GROQ_VISION_MODEL || 'llama-3.2-11b-vision-preview', 
            };

        case 'openrouter':
            return {
                provider: 'openrouter',
                apiKey: process.env.OPENROUTER_API_KEY,
                baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
                // Claude 3 Haiku é rápido, mas Claude 3.5 Sonnet é melhor para visão. Assumindo suporte base via config
                model: process.env.OPENROUTER_VISION_MODEL || 'anthropic/claude-3-haiku',
                siteUrl: process.env.SITE_URL || 'http://localhost:3000',
            };

        case 'ollama':
            return {
                provider: 'ollama',
                baseUrl: process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
                // O Ollama requer modelos com suporte à Vision, como llava
                model: process.env.OLLAMA_VISION_MODEL || 'llava',
            };

        case 'gemini':
        default:
            return {
                provider: 'gemini',
                apiKey: process.env.GEMINI_API_KEY,
                model: process.env.GEMINI_VISION_MODEL || 'gemini-2.5-flash',
            };
    }
}

/**
 * Função unificada para gerar Texto Alternativo (Visão/Image-to-Text)
 * Abstrai as peculiaridades de cada provedor (Gemini, OpenAI SDK, Ollama REST)
 */
export async function generateAltText(base64Data: string, mimeType: string): Promise<string> {
    const config = getConfig();
    const PROMPT = 'Crie um texto alternativo (alt text) acessível e descritivo para esta imagem, voltado para pessoas com deficiência visual. Seja direto, objetivo e descreva os elementos principais. Não use frases como "A imagem mostra" ou "Foto de". Máximo de 2 frases curtas.';

    console.log(`[JINC Frontend AI] Alt-Text Provider: ${config.provider} | Model: ${config.model}`);

    if (config.provider === 'gemini') {
        if (!config.apiKey) throw new Error('GEMINI_API_KEY ausente no .env');
        const ai = new GoogleGenAI({ apiKey: config.apiKey });
        const result = await ai.models.generateContent({
            model: config.model,
            contents: [
                {
                    parts: [
                        { text: PROMPT },
                        { inlineData: { data: base64Data, mimeType: mimeType } }
                    ]
                }
            ]
        });
        return result.text?.trim() || "Imagem ilustrativa";
    }

    if (config.provider === 'groq' || config.provider === 'openrouter') {
        if (!config.apiKey) throw new Error(`API KEY ausente para provedor ${config.provider}`);
        
        const client = new OpenAI({
            baseURL: config.baseUrl,
            apiKey: config.apiKey,
            defaultHeaders: config.provider === 'openrouter' ? {
                'HTTP-Referer': config.siteUrl,
                'X-Title': 'Jornalista Inclusivo',
            } : undefined,
        });

        // O SDK OpenAI exige a URI da imagem estruturada dessa forma
        const imageUrl = `data:${mimeType};base64,${base64Data}`;

        const completion = await client.chat.completions.create({
            model: config.model,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: PROMPT },
                        { type: 'image_url', image_url: { url: imageUrl } },
                    ],
                },
            ],
            max_tokens: 150,
            temperature: 0.2, // Baixa temperatura para descrição objetiva
        });

        const text = completion.choices?.[0]?.message?.content?.trim();
        if (!text) throw new Error('Provedor OpenAI SDK retornou vazio');
        return text;
    }

    if (config.provider === 'ollama') {
        const response = await fetch(`${config.baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: 'user',
                        content: PROMPT,
                        images: [base64Data] // O Ollama usa array de base64 cru
                    }
                ],
                stream: false,
                options: { temperature: 0.2, num_predict: 150 }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ollama falhou: ${response.status} - ${errorText}`);
        }

        const data = await response.json() as { message?: { content?: string } };
        const text = data.message?.content?.trim();
        if (!text) throw new Error('Ollama retornou resposta vazia');
        return text;
    }

    throw new Error(`Provedor ${config.provider} não é suportado`);
}
