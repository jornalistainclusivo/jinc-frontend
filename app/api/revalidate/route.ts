import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    const secret = request.headers.get('authorization');

    // Segurança: validando o token para que apenas o Strapi faça a requisição
    if (secret !== `Bearer ${process.env.REVALIDATION_TOKEN_SECRET}`) {
        return NextResponse.json({ message: 'Acesso Negado: Token Inválido' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // O webhook do Strapi envia dados sobre o modelo alterado implicitamente no body
        // { event: 'entry.update', model: 'article', entry: { slug: 'foo' } }
        const { model, entry } = body;

        // Atualiza rotas massivas sempre que houver modificação
        revalidatePath('/');
        revalidatePath('/busca');

        // Se houver slug e o modelo for notícia/artigo, revalida rotas dinâmicas diretamente
        if (model === 'article' && entry?.slug) {
            revalidatePath(`/artigo/${entry.slug}`);
        }

        if (model === 'category' && entry?.slug) {
            revalidatePath(`/${entry.slug}`);
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error('Erro na revalidação de cache (ISR):', err);
        return NextResponse.json({ message: 'Erro no servidor durante a revalidação' }, { status: 500 });
    }
}
