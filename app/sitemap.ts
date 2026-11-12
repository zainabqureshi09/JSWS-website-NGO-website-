import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jsws.org.pk';

  const posts = await getAllPosts();

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/jsmdc',
    '/sarc',
    '/scholarships',
    '/awareness',
    '/donate',
    '/contact',
    '/gallery',
    '/careers',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/blog' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/blog' ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...blogPostEntries];
}
