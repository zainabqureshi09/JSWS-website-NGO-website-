import React from 'react';
import { Metadata } from 'next';
import { BlogHero } from '@/components/blog/BlogHero';
import { FeaturedArticle } from '@/components/blog/FeaturedArticle';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/sanity/client';
import { Link } from '@/i18n/routing';
import { HeartHandshake, Stethoscope } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog & Health Resources | Jamila Sultan Welfare Society (JSWS)',
    description: 'Knowledge that supports healthier communities. Explore medical guidance, mental health awareness, eye care tips, and physical rehabilitation resources from JSWS doctors.',
    openGraph: {
      title: 'Blog & Health Resources | JSWS',
      description: 'Medical awareness, preventive health advice, and community wellness updates from Jamila Sultan Welfare Society.',
      url: 'https://jsws.org.pk/blog',
      siteName: 'Jamila Sultan Welfare Society',
      images: [
        {
          url: '/hero.jpg',
          width: 1200,
          height: 630,
          alt: 'JSWS Health Resources',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog & Health Resources | JSWS',
      description: 'Knowledge that supports healthier communities.',
      images: ['/hero.jpg'],
    },
  };
}

interface BlogPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q: searchQuery, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const POSTS_PER_PAGE = 6;

  const [allPosts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
  ]);

  const featured = featuredPosts && featuredPosts.length > 0 ? featuredPosts[0] : allPosts[0];

  // Filter by search query if present
  let postsToDisplay = allPosts;
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    postsToDisplay = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.name.toLowerCase().includes(q))
    );
  }

  const totalPosts = postsToDisplay.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = postsToDisplay.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <BlogHero />

      <div className="container mx-auto px-4 md:px-6 -mt-6 relative z-20">
        <BlogSearch initialQuery={searchQuery || ''} />
      </div>

      <main className="container mx-auto px-4 md:px-6 pt-8 sm:pt-12">
        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter categories={categories} />
        </div>

        {/* Featured Article Section (only on page 1 when not searching) */}
        {!searchQuery && currentPage === 1 && featured && (
          <FeaturedArticle post={featured} />
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between my-6">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Articles'}
          </h2>
          <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
            {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Article Grid */}
        <ArticleGrid posts={paginatedPosts} />

        {/* Pagination Controls */}
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={searchQuery ? `/blog?q=${encodeURIComponent(searchQuery)}` : '/blog'}
        />

        {/* Newsletter / CTA Section */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/20 text-white rounded-full">
              <Stethoscope className="w-3.5 h-3.5" /> Healthcare Access For All
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Support Free Healthcare at JSWS Clinics
            </h3>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Every donation helps provide free OPD consultations, specialized eye care, physical rehabilitation, and 100% free prescription medicines for deserving families.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--color-primary)] font-extrabold text-sm shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Donate to JSWS</span>
              </Link>
              <Link
                href="/jsmdc"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black/30 text-white border border-white/30 font-bold text-sm hover:bg-black/50 transition-colors"
              >
                <span>Visit JSMDC Clinic</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
