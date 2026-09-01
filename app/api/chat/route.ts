import { createTextStreamResponse, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getQdrantConfig, searchQdrantKnowledge } from '@/lib/qdrant';
import { getOpenAIConfig, generateEmbedding } from '@/lib/openai';
import { generateInternalChatResponse } from '@/lib/chatbot-engine';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;

    let queryText = '';
    if (lastUserMessage) {
      if (typeof lastUserMessage.content === 'string') {
        queryText = lastUserMessage.content;
      } else if (Array.isArray(lastUserMessage.parts)) {
        queryText = lastUserMessage.parts
          .map((p: { type: string; text?: string }) => (p.type === 'text' ? p.text : ''))
          .join(' ');
      }
    }

    const qdrantConfig = getQdrantConfig();
    const openaiConfig = getOpenAIConfig();

    // Check if RAG pipeline (OpenAI + Qdrant Cloud) is configured with valid API keys
    if (openaiConfig.isConfigured && qdrantConfig.isConfigured) {
      try {
        // 1. Generate query embedding via OpenAI text-embedding-3-small
        const queryVector = await generateEmbedding(queryText);

        // 2. Search Qdrant Cloud for relevant knowledge chunks
        const retrievedChunks = await searchQdrantKnowledge(queryVector, 5, 0.3);

        let contextText = '';
        if (retrievedChunks.length > 0) {
          contextText = retrievedChunks
            .map(
              (c, i) =>
                `--- Context Chunk ${i + 1} (${c.payload.title} | ${c.payload.category}) ---\n${c.payload.content}`
            )
            .join('\n\n');
        }

        // 3. Formulate RAG System Prompt
        let systemPrompt = '';
        if (contextText.trim().length > 0) {
          systemPrompt = `
You are the official AI Assistant for Jamila Sultan Welfare Society (JSWS), a registered non-profit organization based in Karachi, Pakistan.

CRITICAL INSTRUCTIONS:
- Answer the user's question accurately using ONLY the retrieved context provided below.
- Use a polite, warm, empathetic, and professional tone.
- Format your response in clean, simple plain text. Do NOT use markdown symbols like asterisks, backticks, hashtags, or slashes. Use clean bullet points (•) and line breaks.
- If the question cannot be answered using the retrieved context, politely state: "I'm sorry, I don't have that specific information in my knowledge base. Please contact JSWS directly at jswswelfare@gmail.com or call +92 307 2021882 for assistance."
- Do NOT invent or hallucinate any facts, clinic timings, phone numbers, or bank account details not present in the context.

RETRIEVED KNOWLEDGE CONTEXT:
${contextText}
`;
        } else {
          systemPrompt = `
You are the official AI Assistant for Jamila Sultan Welfare Society (JSWS).

CRITICAL INSTRUCTION:
No relevant context was found in the Qdrant Cloud knowledge base for this query.
Respond politely: "I'm sorry, I don't have that specific information in my knowledge base. Please contact JSWS directly at jswswelfare@gmail.com or call +92 307 2021882 for assistance."
Do NOT invent or hallucinate any details.
`;
        }

        // 4. Call OpenAI (gpt-4o-mini) and stream response to UI
        const result = streamText({
          model: openai(openaiConfig.chatModel || 'gpt-4o-mini'),
          system: systemPrompt,
          messages,
        });

        return result.toTextStreamResponse();
      } catch (ragError) {
        console.error('RAG Pipeline Error (Qdrant Cloud + OpenAI):', ragError);
        // Fall back to internal engine if Qdrant Cloud search fails or is empty
      }
    }

    // Default & Fallback: Internal JSWS Engine (Works 100% offline without relying on API keys)
    const responseText = generateInternalChatResponse(queryText);

    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(/(\s+)/);
        for (let i = 0; i < words.length; i++) {
          controller.enqueue(words[i]);
          await new Promise((res) => setTimeout(res, 15));
        }
        controller.close();
      },
    });

    return createTextStreamResponse({ stream });
  } catch (error) {
    console.error('Chat API Fatal Error:', error);
    const fallbackText =
      "I'm sorry, an unexpected error occurred. Please contact JSWS directly at jswswelfare@gmail.com or call +92 307 2021882.";

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(fallbackText);
        controller.close();
      },
    });

    return createTextStreamResponse({ stream });
  }
}
