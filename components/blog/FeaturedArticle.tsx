import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost } from '@/lib/sanity/types';
import { getSanityImageUrl } from '@/lib/sanity/image';

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const imageUrl = getSanityImageUrl(post.featuredImage, 1200, 750);
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-3xl text-white shadow-xl mb-12 sm:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
        {/* Left Column: Text & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/40 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Featured Resource
            </span>
            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                {post.category.name}
              </Link>
            )}
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight hover:text-red-200 transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-400" />
              {post.readingTime || 5} min read
            </span>
            {post.author && (
              <span className="text-gray-300 font-semibold">
                By {post.author.name}
              </span>
            )}
          </div>

          <div className="pt-3">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-bold shadow-md shadow-red-900/30 transition-all hover:scale-105"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
