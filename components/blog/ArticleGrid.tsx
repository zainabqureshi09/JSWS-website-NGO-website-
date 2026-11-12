import React from 'react';
import { BlogPost } from '@/lib/sanity/types';
import { ArticleCard } from './ArticleCard';
import { FileQuestion } from 'lucide-react';

interface ArticleGridProps {
  posts: BlogPost[];
  emptyMessage?: string;
}

export function ArticleGrid({ posts, emptyMessage = "No health resources found matching your search." }: ArticleGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-red-50 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="w-6 h-6" />
        </div>
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">No Articles Found</h3>
        <p className="text-sm text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-8">
      {posts.map((post, idx) => (
        <ArticleCard key={post._id || post.slug} post={post} priority={idx < 3} />
      ))}
    </div>
  );
}
