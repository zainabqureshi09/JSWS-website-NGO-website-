import React from 'react';
import { Link } from '@/i18n/routing';
import { Category } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  activeCategorySlug?: string;
  className?: string;
}

export function CategoryFilter({ categories, activeCategorySlug, className }: CategoryFilterProps) {
  return (
    <nav aria-label="Blog categories" className={cn("flex flex-wrap items-center gap-2 py-4", className)}>
      <Link
        href="/blog"
        className={cn(
          "px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 border whitespace-nowrap",
          !activeCategorySlug
            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
            : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-[var(--color-primary)]"
        )}
      >
        All Resources
      </Link>
      {categories.map((cat) => {
        const isActive = activeCategorySlug === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className={cn(
              "px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 border whitespace-nowrap",
              isActive
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-[var(--color-primary)]"
            )}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
