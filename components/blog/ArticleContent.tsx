import React from 'react';
import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import { Info, AlertTriangle, Lightbulb, HeartPulse } from 'lucide-react';
import { getSanityImageUrl } from '@/lib/sanity/image';

interface ArticleContentProps {
  content: string | TypedObject[] | null | undefined;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = getSanityImageUrl(value, 1000, 600);
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={imageUrl}
              alt={value.alt || 'Medical illustration'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="p-3 text-center text-xs text-gray-500 font-medium italic border-t border-gray-100">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const type = value?.type || 'medical';
      let icon = <HeartPulse className="w-5 h-5 text-[var(--color-primary)]" />;
      let bg = 'bg-red-50/70 border-red-200 text-red-950';

      if (type === 'info') {
        icon = <Info className="w-5 h-5 text-blue-600" />;
        bg = 'bg-blue-50/70 border-blue-200 text-blue-950';
      } else if (type === 'warning') {
        icon = <AlertTriangle className="w-5 h-5 text-amber-600" />;
        bg = 'bg-amber-50/70 border-amber-200 text-amber-950';
      } else if (type === 'tip') {
        icon = <Lightbulb className="w-5 h-5 text-emerald-600" />;
        bg = 'bg-emerald-50/70 border-emerald-200 text-emerald-950';
      }

      return (
        <div className={`my-6 p-5 rounded-2xl border ${bg} flex items-start gap-3.5`}>
          <div className="mt-0.5 shrink-0">{icon}</div>
          <div>
            {value.title && <h5 className="font-bold text-sm mb-1">{value.title}</h5>}
            <p className="text-sm leading-relaxed">{value.content}</p>
          </div>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 mt-10 mb-4 pt-4 border-t border-gray-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg font-bold text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 py-2 border-l-4 border-[var(--color-primary)] italic text-gray-800 bg-red-50/40 rounded-r-xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-base sm:text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-base sm:text-lg text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-[var(--color-primary)] font-semibold underline underline-offset-2 hover:text-[var(--color-primary-dark)]"
      >
        {children}
      </a>
    ),
  },
};

export function ArticleContent({ content }: ArticleContentProps) {
  if (!content) return null;

  // Fallback for simple markdown string content (from mock data)
  if (typeof content === 'string') {
    const paragraphs = content.split('\n\n');
    return (
      <div className="prose prose-lg max-w-none text-gray-700">
        {paragraphs.map((para, idx) => {
          if (para.startsWith('### ')) {
            return (
              <h2 key={idx} className="font-heading text-2xl font-bold text-gray-900 mt-8 mb-3">
                {para.replace('### ', '')}
              </h2>
            );
          }
          if (para.startsWith('* ')) {
            const items = para.split('\n* ');
            return (
              <ul key={idx} className="list-disc pl-6 mb-6 space-y-2 text-base sm:text-lg">
                {items.map((item, i) => (
                  <li key={i}>{item.replace('* ', '')}</li>
                ))}
              </ul>
            );
          }
          if (para.startsWith('> ')) {
            return (
              <blockquote key={idx} className="my-6 pl-5 py-3 border-l-4 border-[var(--color-primary)] italic text-gray-800 bg-red-50/40 rounded-r-xl">
                {para.replace('> ', '')}
              </blockquote>
            );
          }
          return (
            <p key={idx} className="text-base sm:text-lg leading-relaxed mb-6">
              {para}
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none text-gray-700">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
