import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTagBySlug, getPostsByTag } from '@/lib/sanity/client';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import { Tag as TagIcon } from 'lucide-react';
import { Link } from '@/i18n/routing';

export const revalidate = 60;

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: 'Tag Not Found | JSWS Health Resources',
    };
  }

  return {
    title: `Articles tagged with "${tag.name}" | JSWS Health Resources`,
    description: `Browse JSWS medical articles and resources tagged under ${tag.name}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const [tag, posts] = await Promise.all([
    getTagBySlug(slug),
    getPostsByTag(slug),
  ]);

  if (!tag) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <section className="bg-gradient-to-b from-red-50/40 via-white to-white py-12 sm:py-16 border-b border-gray-100 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-4">
            <TagIcon className="h-3.5 w-3.5" /> Topic Tag
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            #{tag.name}
          </h1>
          <p className="text-sm font-medium text-gray-500">
            {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} tagged with #{tag.name}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-6 pt-8">
        <ArticleGrid posts={posts} emptyMessage={`No articles currently tagged with "#${tag.name}".`} />

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white hover:border-red-300 hover:text-[var(--color-primary)] transition-colors"
          >
            ← View All Health Resources
          </Link>
        </div>
      </main>
    </div>
  );
}
