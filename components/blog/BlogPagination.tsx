import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function BlogPagination({ currentPage, totalPages, baseUrl }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination Navigation" className="flex items-center justify-center gap-2 my-12">
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-[var(--color-primary)] transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="p-2.5 rounded-full border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
          aria-label="Previous page disabled"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <span className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white rounded-full border border-gray-200">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-[var(--color-primary)] transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="p-2.5 rounded-full border border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
          aria-label="Next page disabled"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}
