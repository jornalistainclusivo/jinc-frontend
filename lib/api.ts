export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'
        }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
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
        const queryString = new URLSearchParams(urlParamsObject).toString();
        const requestUrl = `${getStrapiURL(
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
    } catch (error) {
        console.error(`Error fetching data from Strapi API`, error);
        throw error;
    }
}

/**
 * Funções específicas de abstração de conteúdo
 */

export async function getNoticiasDestacadas(limit = 4) {
    return fetchAPI('/artigos', {
        populate: '*',
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
        populate: '*',
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
        populate: '*',
    });

    return data?.data?.[0]; // Strapi REST API returns an array for filters
}
