import { NextResponse } from 'next/server';
import { runIngestion } from '@/scripts/ingest-knowledge';

export async function POST() {
  try {
    const result = await runIngestion();
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Ingestion failed' }, { status: 400 });
    }
    return NextResponse.json({
      message: 'Ingestion completed successfully',
      ingested: result.ingested,
      total: result.total,
    });
  } catch (error: any) {
    console.error('Ingest API Error:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
