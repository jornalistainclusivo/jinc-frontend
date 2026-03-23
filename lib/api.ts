import qs from 'qs';
import type { StrapiArtigo, StrapiCategoria, StrapiTag } from './strapi-types';

export function getStrapiURL(path = '') {
    // Server-side (SSR/Docker): use internal Docker DNS to reach CMS container
    // Client-side (browser): use public URL accessible from the host machine
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer
        ? (process.env.INTERNAL_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337')
        : (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337');
    return `${baseUrl.replace('localhost', '127.0.0.1')}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    // Return the absolute URL if it already is one
    if (url.startsWith('http') || url.startsWith('//')) {
        // Se a Strapi devolveu a URL absoluta mas usando 127.0.0.1, o Chrome vai recusar.
        return url.replace('127.0.0.1', 'localhost');
    }
    // Ensure Client Media fetches bypass 127.0.0.1 CORS/Mixed content local blockers
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    return `${baseUrl.replace('127.0.0.1', 'localhost')}${url}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
    let requestUrl = '';
    try {
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
        requestUrl = `${getStrapiURL(
            `/api${path}${queryString ? `?${queryString}` : ''}`
        )}`;

        const response = await fetch(requestUrl, mergedOptions);

        if (!response.ok) {
            console.error(response.statusText);
            throw new Error(`An error occurred please try again`);
        }
        const data = await response.json();
        return data;
    } catch (error: unknown) {
        const e = error as Error;
        console.warn(`[Build Warning] Strapi offline ou inacessível no build (URL: ${requestUrl})`);
        console.warn(`=> Detalhes: ${e.name} - ${e.message}`);
        console.warn(`=> Retornando payload de fallback vazio para não quebrar o build.`);
        return { data: [], meta: {} };
    }
}

// ─── Populate padrão para listas de artigos ──────────────────────────────────

const ARTIGO_LIST_POPULATE = {
    capa: true,
    categoria: true,
    autors: true,
    tags: true,
} as const;

// ─── Artigos ─────────────────────────────────────────────────────────────────

export async function getNoticiasDestacadas(limit = 4): Promise<{ data: StrapiArtigo[] }> {
    return fetchAPI('/artigos', {
        populate: ARTIGO_LIST_POPULATE,
        sort: ['createdAt:desc'],
        pagination: { limit },
    });
}

export async function getUltimasPublicacoes(page = 1, pageSize = 10): Promise<{ data: StrapiArtigo[] }> {
    return fetchAPI('/artigos', {
        populate: ARTIGO_LIST_POPULATE,
        sort: ['createdAt:desc'],
        pagination: { page, pageSize },
    });
}

/**
 * Busca artigos de uma seção editorial específica, filtrando por slug de categoria.
 * Usado para montar as seções curadas da home (ex: Reportagem Especial, Acessibilidade Digital).
 */
export async function getArtigosPorSecao(
    categoriaSlug: string,
    limit = 3
): Promise<{ data: StrapiArtigo[] }> {
    return fetchAPI('/artigos', {
        filters: {
            categoria: { slug: { $eq: categoriaSlug } },
        },
        populate: ARTIGO_LIST_POPULATE,
        sort: ['createdAt:desc'],
        pagination: { page: 1, pageSize: limit },
    });
}

export async function getArtigosPorCategoria(
    categorySlug: string,
    page = 1,
    pageSize = 10
): Promise<{ data: StrapiArtigo[] }> {
    return fetchAPI('/artigos', {
        filters: {
            categoria: { slug: { $eq: categorySlug } },
        },
        populate: ARTIGO_LIST_POPULATE,
        sort: ['createdAt:desc'],
        pagination: { page, pageSize },
    });
}

export async function getArtigoPorSlug(slug: string): Promise<StrapiArtigo | null> {
    const data = await fetchAPI('/artigos', {
        filters: {
            slug: { $eq: slug },
        },
        populate: {
            capa: true,
            autors: true,
            categoria: true,
            tags: true,
            // Componente de mídias digitais (repeatable)
            midias: {
                populate: { Media: true },
            },
            // Dynamic Zone com populate universal
            blocos_de_conteudo: {
                populate: '*',
            },
        },
    });

    return data?.data?.[0] ?? null;
}

// ─── Tags ─────────────────────────────────────────────────────────────────────

export async function getTags(): Promise<{ data: StrapiTag[] }> {
    return fetchAPI('/tags', {
        sort: ['tag:asc'],
        pagination: { limit: 100 },
    });
}

export async function getArtigosPorTag(
    tagSlug: string,
    page = 1,
    pageSize = 10
): Promise<{ data: StrapiArtigo[]; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }> {
    return fetchAPI('/artigos', {
        filters: {
            tags: { slug: { $eq: tagSlug } },
        },
        populate: ARTIGO_LIST_POPULATE,
        sort: ['createdAt:desc'],
        pagination: { page, pageSize },
    });
}

// ─── Categorias ───────────────────────────────────────────────────────────────

export async function getCategorias(): Promise<{ data: StrapiCategoria[] }> {
    return fetchAPI('/categorias', {
        sort: ['nome:asc'],
        pagination: { limit: 50 },
    });
}
