import OpenAI from 'openai';

export function getOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL?.trim() || 'text-embedding-3-small';
  const chatModel = process.env.OPENAI_CHAT_MODEL?.trim() || 'gpt-4o-mini';

  return {
    apiKey,
    embeddingModel,
    chatModel,
    isConfigured: Boolean(apiKey && apiKey.length > 0),
  };
}

let openaiClientInstance: OpenAI | null = null;

export function getOpenAIClient(): OpenAI | null {
  const config = getOpenAIConfig();
  if (!config.isConfigured) {
    return null;
  }

  if (!openaiClientInstance) {
    openaiClientInstance = new OpenAI({
      apiKey: config.apiKey,
    });
  }

  return openaiClientInstance;
}

/**
 * Generates vector embedding for input text using OpenAI embeddings API (text-embedding-3-small).
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const client = getOpenAIClient();
  const config = getOpenAIConfig();

  if (!client || !config.isConfigured) {
    throw new Error('OPENAI_API_KEY is not configured in .env.local');
  }

  const cleanedText = text.replace(/\n+/g, ' ').trim();
  if (!cleanedText) {
    throw new Error('Input text for embedding is empty');
  }

  const response = await client.embeddings.create({
    model: config.embeddingModel,
    input: cleanedText,
  });

  if (!response.data || response.data.length === 0) {
    throw new Error('No embedding data returned from OpenAI');
  }

  return response.data[0].embedding;
}
