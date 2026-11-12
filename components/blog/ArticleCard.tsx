import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { BlogPost } from '@/lib/sanity/types';
import { getSanityImageUrl } from '@/lib/sanity/image';

interface ArticleCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function ArticleCard({ post, priority = false }: ArticleCardProps) {
  const imageUrl = getSanityImageUrl(post.featuredImage, 700, 450);
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={post.featuredImage?.alt || post.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {post.category && (
          <div className="absolute top-4 left-4 z-10">
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-white/95 backdrop-blur-md rounded-full shadow-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              {post.category.name}
            </Link>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {post.readingTime || 5} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 mb-2">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info & Link */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author?.profileImage ? (
              <Image
                src={getSanityImageUrl(post.author.profileImage, 100, 100)}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8 ring-1 ring-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-50 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold">
                <User className="w-4 h-4" />
              </div>
            )}
            <span className="text-xs font-semibold text-gray-700 truncate max-w-[140px]">
              {post.author?.name || 'JSWS Healthcare Team'}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors group/link"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
