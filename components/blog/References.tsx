import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { ReferenceItem } from '@/lib/sanity/types';

interface ReferencesProps {
  references?: ReferenceItem[];
}

export function References({ references }: ReferencesProps) {
  if (!references || references.length === 0) return null;

  return (
    <div className="my-8 p-6 rounded-2xl bg-gray-50 border border-gray-200">
      <div className="flex items-center gap-2 mb-4 text-gray-900 font-heading font-bold text-lg">
        <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
        <h3>Medical & Academic References</h3>
      </div>
      <ul className="space-y-3">
        {references.map((ref, idx) => (
          <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
            <span className="font-semibold text-gray-400 min-w-[20px]">[{idx + 1}]</span>
            <div className="flex-1">
              <span className="font-medium text-gray-900">{ref.title}</span>
              {ref.journal && <span className="text-gray-500 italic ml-1.5">— {ref.journal}</span>}
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline ml-2 text-xs font-semibold"
                >
                  <span>Link / Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
