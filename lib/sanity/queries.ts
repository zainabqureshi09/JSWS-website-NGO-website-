import { groq } from 'next-sanity';

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    author-> {
      name,
      designation,
      profileImage,
      organization
    },
    authorDesignation,
    category-> {
      name,
      "slug": slug.current,
      description
    },
    tags[]-> {
      name,
      "slug": slug.current
    }
  }
`;

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*")) && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    featured,
    author-> {
      name,
      designation,
      profileImage
    },
    category-> {
      name,
      "slug": slug.current
    }
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*")) && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    featuredImage,
    ogImage,
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    seoTitle,
    seoDescription,
    medicalDisclaimer,
    references,
    author-> {
      name,
      designation,
      profileImage,
      bio,
      organization,
      socialLinks
    },
    authorDesignation,
    category-> {
      _id,
      name,
      "slug": slug.current,
      description
    },
    tags[]-> {
      _id,
      name,
      "slug": slug.current
    }
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*")) && defined(slug.current)][].slug.current
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "postCount": count(*[_type == "post" && !(_id in path("drafts.*")) && references(^._id)])
  }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "postCount": count(*[_type == "post" && !(_id in path("drafts.*")) && references(^._id)])
  }
`;

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*")) && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    author-> {
      name,
      designation,
      profileImage
    },
    category-> {
      name,
      "slug": slug.current
    },
    tags[]-> {
      name,
      "slug": slug.current
    }
  }
`;

export const TAGS_QUERY = groq`
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const TAG_BY_SLUG_QUERY = groq`
  *[_type == "tag" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current
  }
`;

export const POSTS_BY_TAG_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*")) && $slug in tags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    author-> {
      name,
      designation,
      profileImage
    },
    category-> {
      name,
      "slug": slug.current
    },
    tags[]-> {
      name,
      "slug": slug.current
    }
  }
`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.*")) && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    author-> {
      name,
      designation
    },
    category-> {
      name,
      "slug": slug.current
    }
  }
`;

