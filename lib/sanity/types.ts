import type { SanityImageSource } from '@sanity/image-url';
import type { TypedObject } from '@portabletext/types';

export type BlogImage = SanityImageSource & {
  alt?: string;
  caption?: string;
};

export interface Author {
  _id?: string;
  name: string;
  designation?: string;
  profileImage?: BlogImage;
  bio?: string;
  organization?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: BlogImage;
}

export interface Tag {
  _id?: string;
  name: string;
  slug: string;
}

export interface ReferenceItem {
  title: string;
  url?: string;
  journal?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: BlogImage;
  author?: Author;
  authorDesignation?: string;
  category: Category;
  tags?: Tag[];
  body: TypedObject[] | string;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: BlogImage;
  medicalDisclaimer?: string;
  references?: ReferenceItem[];
}
