import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Calendar, Clock, RefreshCw, User, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/lib/sanity/types';
import { getSanityImageUrl } from '@/lib/sanity/image';

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const imageUrl = getSanityImageUrl(post.featuredImage, 1200, 650);

  const formattedPublishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedUpdatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <header className="mb-8 sm:mb-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">
          Blog & Health Resources
        </Link>
        {post.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="hover:text-[var(--color-primary)] transition-colors font-medium text-gray-700"
            >
              {post.category.name}
            </Link>
          </>
        )}
      </nav>

      {/* Category Pill */}
      {post.category && (
        <div className="mb-4">
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-red-50 border border-red-100 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            {post.category.name}
          </Link>
        </div>
      )}

      {/* Main Title */}
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4 sm:mb-6">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 font-normal">
          {post.excerpt}
        </p>
      )}

      {/* Meta Bar: Author & Timestamps */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-3">
          {post.author?.profileImage ? (
            <Image
              src={getSanityImageUrl(post.author.profileImage, 100, 100)}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10 ring-2 ring-red-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-red-50 text-[var(--color-primary)] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
          )}
          <div>
            <span className="font-bold text-gray-900 block">{post.author?.name || 'JSWS Medical Team'}</span>
            <span className="text-xs text-gray-500">{post.authorDesignation || post.author?.designation || 'Healthcare Contributor'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
            Published: {formattedPublishedDate}
          </span>
          {formattedUpdatedDate && (
            <span className="flex items-center gap-1.5 hidden md:flex">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              Updated: {formattedUpdatedDate}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[var(--color-primary)]" />
            {post.readingTime || 5} min read
          </span>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 my-8">
        <Image
          src={imageUrl}
          alt={post.featuredImage?.alt || post.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        {post.featuredImage?.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs font-medium">
            {post.featuredImage.caption}
          </div>
        )}
      </div>
    </header>
  );
}
