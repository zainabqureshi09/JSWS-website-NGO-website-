import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts } from '@/lib/sanity/client';
import { ArticleHeader } from '@/components/blog/ArticleHeader';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { ArticleAuthor } from '@/components/blog/ArticleAuthor';
import { MedicalDisclaimer } from '@/components/blog/MedicalDisclaimer';
import { References } from '@/components/blog/References';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { getSanityImageUrl } from '@/lib/sanity/image';
import { Link } from '@/i18n/routing';
import { HeartHandshake, ArrowRight, ShieldPlus } from 'lucide-react';

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | JSWS Health Blog',
    };
  }

  const title = post.seoTitle || `${post.title} | JSWS Health Blog`;
  const description = post.seoDescription || post.excerpt;
  const ogImageUrl = getSanityImageUrl(post.ogImage || post.featuredImage, 1200, 630);
  const canonicalUrl = `https://jsws.org.pk/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Jamila Sultan Welfare Society',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : ['JSWS Medical Team'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.category?.slug
    ? await getRelatedPosts(post.category.slug, post.slug)
    : [];

  const ogImageUrl = getSanityImageUrl(post.ogImage || post.featuredImage, 1200, 630);

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: ogImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'JSWS Healthcare Team',
      jobTitle: post.author?.designation,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jamila Sultan Welfare Society',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jsws.org.pk/jsws-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://jsws.org.pk/blog/${post.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 md:px-6 pt-8 sm:pt-12 max-w-4xl">
        {/* Article Header */}
        <ArticleHeader post={post} />

        {/* Constrained Main Body Content */}
        <div className="py-4">
          <ArticleContent content={post.body} />
        </div>

        {/* References Section */}
        <References references={post.references} />

        {/* Medical Disclaimer Box */}
        <MedicalDisclaimer customDisclaimer={post.medicalDisclaimer} />

        {/* Author Details Box */}
        <ArticleAuthor author={post.author} authorDesignationOverride={post.authorDesignation} />

        {/* Related Articles */}
        <RelatedArticles posts={relatedPosts} />

        {/* Program CTA Box */}
        <section className="mt-12 p-8 rounded-3xl bg-gray-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 rounded-full border border-red-800/40">
              <ShieldPlus className="w-3.5 h-3.5" /> JSWS Welfare Programs
            </span>
            <h4 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Need Medical Consultation or Rehabilitation?
            </h4>
            <p className="text-sm text-gray-300">
              Visit JSMDC OPD clinics or Sultan Ahmed Rehabilitation Centre for free & subsidized care.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/jsmdc"
              className="px-6 py-3 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore JSMDC Clinic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/donate"
              className="px-6 py-3 rounded-full bg-white text-gray-900 hover:bg-gray-100 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Donate Now</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
