import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret') || request.headers.get('x-sanity-secret');
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    // Verify secret if configured in production
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    const body = await request.json();
    const slug = body?.slug?.current || body?.slug;

    // Revalidate primary blog list pages across locales
    revalidatePath('/blog');
    revalidatePath('/[locale]/blog', 'layout');

    // If a specific article slug was updated/published
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/[locale]/blog/${slug}`, 'page');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      slug: slug || 'all',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ message: message || 'Error revalidating' }, { status: 500 });
  }
}
