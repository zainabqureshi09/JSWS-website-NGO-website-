import { createClient } from 'next-sanity';
import { mockPosts, mockCategories, mockTags } from './mockData';
import { BlogPost, Category, Tag } from './types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper fetch function with fallback data when Sanity env vars are unconfigured or empty
export async function fetchSanityData<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  const isSanityConfigured =
    Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo_project';

  if (!isSanityConfigured) {
    return fallback;
  }

  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    if (data !== null && data !== undefined) {
      if (Array.isArray(data)) {
        return (data.length > 0 ? data : fallback) as T;
      }
      if (typeof data === 'object') {
        return (Object.keys(data).length > 0 ? data : fallback) as T;
      }
      return data;
    }
    return fallback;
  } catch (error) {
    console.warn('Sanity fetch warning, falling back to static data:', error);
    return fallback;
  }
}

// Higher level data access methods
export async function getAllPosts(): Promise<BlogPost[]> {
  const { ALL_POSTS_QUERY } = await import('./queries');
  return fetchSanityData<BlogPost[]>(ALL_POSTS_QUERY, {}, mockPosts);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const { FEATURED_POSTS_QUERY } = await import('./queries');
  const featured = mockPosts.filter((p) => p.featured);
  return fetchSanityData<BlogPost[]>(FEATURED_POSTS_QUERY, {}, featured.length > 0 ? featured : mockPosts.slice(0, 3));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { POST_BY_SLUG_QUERY } = await import('./queries');
  const foundMock = mockPosts.find((p) => p.slug === slug) || null;
  return fetchSanityData<BlogPost | null>(POST_BY_SLUG_QUERY, { slug }, foundMock);
}

export async function getAllCategories(): Promise<Category[]> {
  const { CATEGORIES_QUERY } = await import('./queries');
  return fetchSanityData<Category[]>(CATEGORIES_QUERY, {}, mockCategories);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { CATEGORY_BY_SLUG_QUERY } = await import('./queries');
  const foundMock = mockCategories.find((c) => c.slug === slug) || null;
  return fetchSanityData<Category | null>(CATEGORY_BY_SLUG_QUERY, { slug }, foundMock);
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const { POSTS_BY_CATEGORY_QUERY } = await import('./queries');
  const filteredMock = mockPosts.filter((p) => p.category?.slug === categorySlug);
  return fetchSanityData<BlogPost[]>(POSTS_BY_CATEGORY_QUERY, { slug: categorySlug }, filteredMock);
}

export async function getAllTags(): Promise<Tag[]> {
  const { TAGS_QUERY } = await import('./queries');
  return fetchSanityData<Tag[]>(TAGS_QUERY, {}, mockTags);
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const { TAG_BY_SLUG_QUERY } = await import('./queries');
  const foundMock = mockTags.find((t) => t.slug === slug) || null;
  return fetchSanityData<Tag | null>(TAG_BY_SLUG_QUERY, { slug }, foundMock);
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const { POSTS_BY_TAG_QUERY } = await import('./queries');
  const filteredMock = mockPosts.filter((p) => p.tags?.some((t) => t.slug === tagSlug));
  return fetchSanityData<BlogPost[]>(POSTS_BY_TAG_QUERY, { slug: tagSlug }, filteredMock);
}

export async function getRelatedPosts(categorySlug: string, currentSlug: string): Promise<BlogPost[]> {
  const { RELATED_POSTS_QUERY } = await import('./queries');
  const filteredMock = mockPosts
    .filter((p) => p.category?.slug === categorySlug && p.slug !== currentSlug)
    .slice(0, 3);
  return fetchSanityData<BlogPost[]>(
    RELATED_POSTS_QUERY,
    { categorySlug, currentSlug },
    filteredMock.length > 0 ? filteredMock : mockPosts.filter((p) => p.slug !== currentSlug).slice(0, 3)
  );
}
