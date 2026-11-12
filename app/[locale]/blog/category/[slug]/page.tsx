import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/sanity/client';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import { BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | JSWS Health Resources',
    };
  }

  return {
    title: `${category.name} Health Resources & Articles | JSWS`,
    description: category.description || `Browse doctor-reviewed articles and healthcare guidelines in ${category.name} from JSWS.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, posts, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Category Header */}
      <section className="bg-gradient-to-b from-red-50/40 via-white to-white py-12 sm:py-16 border-b border-gray-100 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-4">
            <BookOpen className="h-3.5 w-3.5" /> Category Overview
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500">
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} Available
            </span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-6 pt-8">
        {/* Category Filter bar */}
        <div className="mb-8">
          <CategoryFilter categories={categories} activeCategorySlug={category.slug} />
        </div>

        {/* Article Grid */}
        <ArticleGrid
          posts={posts}
          emptyMessage={`No health articles currently published under "${category.name}". Check back soon for new medical updates.`}
        />

        {/* Back Link */}
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
