import React from 'react';
import Image from 'next/image';
import { User, Share2, Globe, ExternalLink } from 'lucide-react';
import { Author } from '@/lib/sanity/types';
import { getSanityImageUrl } from '@/lib/sanity/image';

interface ArticleAuthorProps {
  author?: Author;
  authorDesignationOverride?: string;
}

export function ArticleAuthor({ author, authorDesignationOverride }: ArticleAuthorProps) {
  if (!author) return null;

  const imageUrl = author.profileImage ? getSanityImageUrl(author.profileImage, 150, 150) : null;
  const designation = authorDesignationOverride || author.designation || 'Medical Contributor';

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={author.name}
          width={80}
          height={80}
          className="rounded-full object-cover w-20 h-20 ring-2 ring-red-100 shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-red-100 text-[var(--color-primary)] flex items-center justify-center shrink-0">
          <User className="w-10 h-10" />
        </div>
      )}

      <div className="flex-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
          Written & Reviewed By
        </span>
        <h4 className="font-heading text-lg font-bold text-gray-900 mt-0.5">{author.name}</h4>
        <p className="text-xs font-semibold text-gray-600 mb-2">{designation} {author.organization ? `• ${author.organization}` : ''}</p>
        {author.bio && <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>}

        {author.socialLinks && (
          <div className="flex items-center gap-3 mt-3">
            {author.socialLinks.twitter && (
              <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1 text-xs font-semibold">
                <Share2 className="w-3.5 h-3.5" />
                <span>Twitter / X</span>
              </a>
            )}
            {author.socialLinks.linkedin && (
              <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1 text-xs font-semibold">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {author.socialLinks.website && (
              <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
