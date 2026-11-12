import { QdrantClient } from '@qdrant/js-client-rest';

export function getQdrantConfig() {
  const url = process.env.QDRANT_URL?.trim();
  const apiKey = process.env.QDRANT_API_KEY?.trim();
  const collectionName = process.env.QDRANT_COLLECTION_NAME?.trim() || 'website_knowledge';

  return {
    url,
    apiKey,
    collectionName,
    isConfigured: Boolean(url && url.length > 0 && apiKey && apiKey.length > 0),
  };
}

let qdrantClientInstance: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient | null {
  const config = getQdrantConfig();
  if (!config.isConfigured) {
    return null;
  }

  if (!qdrantClientInstance) {
    qdrantClientInstance = new QdrantClient({
      url: config.url,
      apiKey: config.apiKey,
    });
  }

  return qdrantClientInstance;
}

/**
 * Ensures that the Qdrant collection exists with vector dimension 1536 (OpenAI text-embedding-3-small).
 */
export async function ensureQdrantCollection(): Promise<{ success: boolean; message: string }> {
  const client = getQdrantClient();
  const config = getQdrantConfig();

  if (!client || !config.isConfigured) {
    return {
      success: false,
      message: 'Qdrant URL or API Key is missing in environment variables (.env.local).',
    };
  }

  try {
    const collections = await client.getCollections();
    const exists = collections.collections.some((col: { name: string }) => col.name === config.collectionName);

    if (!exists) {
      await client.createCollection(config.collectionName, {
        vectors: {
          size: 1536, // Dimension for text-embedding-3-small
          distance: 'Cosine',
        },
      });
      return {
        success: true,
        message: `Created collection "${config.collectionName}" with vector size 1536 (Cosine distance).`,
      };
    }

    return {
      success: true,
      message: `Collection "${config.collectionName}" already exists.`,
    };
  } catch (error: unknown) {
    console.error('Error ensuring Qdrant collection:', error);
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Failed to ensure collection: ${message}`,
    };
  }
}

export interface QdrantSearchResult {
  id: string | number;
  score: number;
  payload: {
    content: string;
    title: string;
    category: string;
    url?: string;
  };
}

/**
 * Searches Qdrant collection for vectors similar to queryEmbedding.
 */
export async function searchQdrantKnowledge(
  queryEmbedding: number[],
  topK: number = 5,
  scoreThreshold: number = 0.3
): Promise<QdrantSearchResult[]> {
  const client = getQdrantClient();
  const config = getQdrantConfig();

  if (!client || !config.isConfigured) {
    return [];
  }

  try {
    const results = await client.query(config.collectionName, {
      query: queryEmbedding,
      limit: topK,
      score_threshold: scoreThreshold,
      with_payload: true,
    });

    return results.points.map((item) => ({
      id: item.id,
      score: item.score,
      payload: {
        content: typeof item.payload?.content === 'string' ? item.payload.content : '',
        title: typeof item.payload?.title === 'string' ? item.payload.title : '',
        category: typeof item.payload?.category === 'string' ? item.payload.category : '',
        url: typeof item.payload?.url === 'string' ? item.payload.url : undefined,
      },
    }));
  } catch (error) {
    console.error('Qdrant Search Error:', error);
    return [];
  }
}
