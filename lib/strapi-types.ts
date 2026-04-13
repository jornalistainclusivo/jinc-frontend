/**
 * strapi-types.ts
 * Interfaces TypeScript alinhadas ao schema do Strapi CMS (v2 — Sprint 4)
 * sync: artigo, autor, tag, categoria, digital-media.midias
 */

// ─── Primitivos de Mídia ────────────────────────────────────────────────────

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string;
  name?: string;
}

// ─── Taxonomia ──────────────────────────────────────────────────────────────

export interface StrapiTag {
  id: number;
  tag: string;
  slug: string;
}

export interface StrapiCategoria {
  id: number;
  nome: string;
  slug: string;
}

// ─── Autor ──────────────────────────────────────────────────────────────────

export interface StrapiAutor {
  id: number;
  nome: string;
  biografia?: string | null;
}

// ─── Componentes Dinâmicos ──────────────────────────────────────────────────

export interface StrapiMidias {
  id: number;
  Media: StrapiMedia[];
}

export interface BlocoTextoLivre {
  __component: 'blocos-materia.texto-livre';
  id: number;
  texto: object[]; // Strapi Blocks (Rich Text)
}

export interface BlocoContextualLayer {
  __component: 'blocos-materia.contextual-layer';
  id: number;
  title?: string;
  layout: 'single_column' | 'multi_column';
  items: any[];
}

export type BlocoConteudo = BlocoTextoLivre | BlocoContextualLayer;

// ─── Artigo ─────────────────────────────────────────────────────────────────

export interface StrapiArtigo {
  id: number;
  documentId?: string;
  titulo: string;
  subtitulo?: string | null;
  slug: string;
  data_publicacao?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  resumo_simples?: string | null;
  alt_text_ia?: string | null;
  descricao_audio?: string | null;
  legenda_capa?: string | null;
  capa?: StrapiMedia | null;
  autors?: StrapiAutor[];
  categoria?: StrapiCategoria | null;
  tags?: StrapiTag[];
  midias?: StrapiMidias[];
  blocos_de_conteudo?: BlocoConteudo[];
}

// ─── Respostas da API ────────────────────────────────────────────────────────

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
