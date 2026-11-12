import React from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';
import { PremiumBackground } from '@/components/premium/PremiumBackground';

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 border-b border-gray-100 bg-gradient-to-b from-red-50/40 via-white to-white">
      <PremiumBackground variant="muted" showParticles={false} />
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-4">
          <BookOpen className="h-3.5 w-3.5" /> JSWS Health Education & CMS
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-4">
          BLOG & HEALTH RESOURCES
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Knowledge that supports healthier communities. Discover doctor-reviewed insights, preventive health guidelines, and welfare updates.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
            Doctor & Specialist Reviewed
          </span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            100% Free Health Resources
          </span>
        </div>
      </div>
    </section>
  );
}
