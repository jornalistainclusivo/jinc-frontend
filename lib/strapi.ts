const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function fetchStrapi(path: string, urlParamsObject = {}) {
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(requestUrl, {
      next: { revalidate: 60 }, // Revalidação ISR a cada 60 segundos
    });

    if (!response.ok) {
      console.warn(`[Build Warning] Strapi respondeu com erro ${response.status} em ${path}`);
      return { data: [], meta: {} };
    }

    return await response.json();
  } catch (error: unknown) {
    const e = error as Error;
    console.warn(`[Build Warning] Strapi offline ou inacessível no build (URL: ${requestUrl})`);
    console.warn(`=> Detalhes: ${e.name} - ${e.message}`);
    console.warn(`=> Retornando payload de fallback vazio para não quebrar o build.`);
    return { data: [], meta: {} };
  }
}
