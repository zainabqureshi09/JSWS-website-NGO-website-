import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { getQdrantClient, getQdrantConfig, ensureQdrantCollection } from '../lib/qdrant';
import { generateEmbedding, getOpenAIConfig } from '../lib/openai';
import { JSWS_WEBSITE_CHUNKS } from '../lib/knowledge-chunks';

export async function runIngestion() {
  console.log('🚀 Starting Knowledge Ingestion for JSWS RAG Chatbot...\n');

  const qdrantConfig = getQdrantConfig();
  const openaiConfig = getOpenAIConfig();

  if (!qdrantConfig.isConfigured) {
    console.error('❌ QDRANT_URL or QDRANT_API_KEY is missing in .env.local');
    return { success: false, error: 'Qdrant environment variables missing' };
  }

  if (!openaiConfig.isConfigured) {
    console.error('❌ OPENAI_API_KEY is missing in .env.local');
    return { success: false, error: 'OpenAI API Key missing' };
  }

  // 1. Ensure Qdrant collection exists with size 1536 (text-embedding-3-small)
  console.log(`📌 Ensuring Qdrant collection "${qdrantConfig.collectionName}" exists...`);
  const colResult = await ensureQdrantCollection();
  if (!colResult.success) {
    console.error(`❌ Collection Error: ${colResult.message}`);
    return { success: false, error: colResult.message };
  }
  console.log(`✅ ${colResult.message}\n`);

  const client = getQdrantClient()!;
  let successCount = 0;

  // 2. Loop through knowledge chunks, generate OpenAI embedding, and upsert to Qdrant
  console.log(`📦 Processing ${JSWS_WEBSITE_CHUNKS.length} knowledge chunks...`);

  for (const chunk of JSWS_WEBSITE_CHUNKS) {
    try {
      console.log(`  └─ [${chunk.id}/${JSWS_WEBSITE_CHUNKS.length}] Embedding "${chunk.title}"...`);
      const embedding = await generateEmbedding(chunk.content);

      await client.upsert(qdrantConfig.collectionName, {
        wait: true,
        points: [
          {
            id: chunk.id,
            vector: embedding,
            payload: {
              content: chunk.content,
              title: chunk.title,
              category: chunk.category,
              url: chunk.url || '',
            },
          },
        ],
      });

      successCount++;
    } catch (err: any) {
      console.error(`❌ Failed to ingest chunk ${chunk.id} (${chunk.title}):`, err?.message || err);
    }
  }

  console.log(`\n🎉 Ingestion complete! Successfully stored ${successCount}/${JSWS_WEBSITE_CHUNKS.length} vectors in Qdrant Cloud.`);
  return {
    success: true,
    total: JSWS_WEBSITE_CHUNKS.length,
    ingested: successCount,
  };
}

// Allow direct execution via CLI (node / tsx)
if (require.main === module) {
  runIngestion()
    .then((res) => {
      if (!res.success) {
        process.exit(1);
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal Ingestion Error:', err);
      process.exit(1);
    });
}
