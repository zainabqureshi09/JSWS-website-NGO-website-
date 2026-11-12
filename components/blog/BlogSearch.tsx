"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface BlogSearchProps {
  placeholder?: string;
  initialQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function BlogSearch({
  placeholder = "Search medical topics, conditions, nutrition, mental health...",
  initialQuery = "",
  onSearchChange,
}: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(query);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearchChange) {
      onSearchChange('');
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onSearchChange) onSearchChange(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full pl-11 pr-12 py-3.5 sm:py-4 rounded-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
