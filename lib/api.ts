import qs from 'qs';

export function getStrapiURL(path = '') {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    // Ensures Node fetch API resolves properly in IPv4 configurations locally
    return `${baseUrl.replace('localhost', '127.0.0.1')}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }
    // Return the absolute URL if it already is one
    if (url.startsWith('http') || url.startsWith('//')) {
        // Se a Strapi devolveu a URL absoluta mas usando 127.0.0.1, o Chrome vai recusar. Vamos forçar localhost.
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
        // Merge default and user options
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
        requestUrl = `${getStrapiURL(
            `/api${path}${queryString ? `?${queryString}` : ''}`
        )}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);

        if (!response.ok) {
            console.error(response.statusText);
            throw new Error(`An error occurred please try again`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error(`Error fetching data from Strapi API at URL: ${requestUrl}`);
        console.error(`=> Error name: ${error.name}, message: ${error.message}, cause: ${error.cause}`);
        throw error;
    }
}

/**
 * Funções específicas de abstração de conteúdo
 */

export async function getNoticiasDestacadas(limit = 4) {
    return fetchAPI('/artigos', {
        populate: {
            capa: true,
            categoria: true,
            autors: true,
        },
        sort: ['createdAt:desc'],
        pagination: {
            limit: limit,
        },
        // Aqui assumimos que no Strapi exista um filtro de campos ou destaque
        // filters: { destaque: { $eq: true } }
    });
}

export async function getUltimasPublicacoes(page = 1, pageSize = 10) {
    return fetchAPI('/artigos', {
        populate: {
            capa: true,
            categoria: true,
            autors: true,
        },
        sort: ['createdAt:desc'],
        pagination: {
            page: page,
            pageSize: pageSize,
        }
    });
}

/**
 * Busca artigos de uma seção editorial específica, filtrando por slug de categoria.
 * Usado para montar as seções curadas da home (ex: Reportagem Especial, Acessibilidade Digital).
 */
export async function getArtigosPorSecao(categoriaSlug: string, limit = 3) {
    return fetchAPI('/artigos', {
        filters: {
            categoria: {
                slug: {
                    $eq: categoriaSlug,
                },
            },
        },
        populate: {
            capa: true,
            categoria: true,
            autors: true,
        },
        sort: ['createdAt:desc'],
        pagination: {
            page: 1,
            pageSize: limit,
        },
    });
}

export async function getArtigosPorCategoria(categorySlug: string, page = 1, pageSize = 10) {
    return fetchAPI('/artigos', {
        filters: {
            categoria: {
                slug: {
                    $eq: categorySlug
                }
            }
        },
        populate: {
            capa: true,
            categoria: true,
            autors: true,
        },
        sort: ['createdAt:desc'],
        pagination: {
            page: page,
            pageSize: pageSize,
        }
    });
}

export async function getArtigoPorSlug(slug: string) {
    const data = await fetchAPI('/artigos', {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            // Mantemos os relacionamentos de primeiro nível
            capa: true,
            autors: true,
            categoria: true,
            // Populamos o Dynamic Zone de forma universal, sem depender de strings tipadas
            blocos_de_conteudo: {
                populate: '*'
            }
        },
    });

    return data?.data?.[0];
}
