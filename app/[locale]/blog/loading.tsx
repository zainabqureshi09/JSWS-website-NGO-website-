import React from 'react';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 animate-pulse">
      {/* Skeleton Hero */}
      <div className="bg-gray-900 py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl space-y-4">
          <div className="h-6 w-32 bg-gray-800 rounded-full mx-auto" />
          <div className="h-10 w-3/4 bg-gray-800 rounded-lg mx-auto" />
          <div className="h-4 w-1/2 bg-gray-800 rounded mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-12 space-y-8">
        {/* Search & Category Skeleton */}
        <div className="h-12 w-full max-w-2xl bg-gray-200 rounded-full mx-auto" />
        <div className="flex gap-2 justify-center">
          <div className="h-8 w-24 bg-gray-200 rounded-full" />
          <div className="h-8 w-28 bg-gray-200 rounded-full" />
          <div className="h-8 w-24 bg-gray-200 rounded-full" />
        </div>

        {/* Featured Article Skeleton */}
        <div className="h-96 w-full bg-gray-200 rounded-3xl" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
