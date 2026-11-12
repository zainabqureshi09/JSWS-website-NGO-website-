import React from 'react';
import { BlogPost } from '@/lib/sanity/types';
import { ArticleCard } from './ArticleCard';
import { BookMarked } from 'lucide-react';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-16 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-red-50 text-[var(--color-primary)]">
          <BookMarked className="w-5 h-5" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-900">Related Health Resources</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <ArticleCard key={post._id || post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
