import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

function fallbackBuilder(url: string) {
  return {
    width: (width: number) => {
      void width;
      return {
        height: (height: number) => {
          void height;
          return { url: () => url };
        },
        url: () => url,
      };
    },
    url: () => url,
  };
}

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) {
    return fallbackBuilder('/hero.jpg');
  }

  if (typeof source === 'string') {
    return fallbackBuilder(source);
  }

  return builder.image(source);
}

export function getSanityImageUrl(
  source: SanityImageSource | null | undefined,
  width = 800,
  height = 500,
): string {
  if (!source) return '/hero.jpg';
  if (typeof source === 'string') return source;
  if ('url' in source && typeof source.url === 'string') return source.url;
  try {
    return builder.image(source).width(width).height(height).auto('format').fit('crop').url();
  } catch {
    return '/hero.jpg';
  }
}
