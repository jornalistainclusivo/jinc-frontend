const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function fetchStrapi(path: string, urlParamsObject = {}) {
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, {
    next: { revalidate: 60 }, // Revalidação ISR a cada 60 segundos
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados do Strapi em ${path}`);
  }

  return await response.json();
}
