import { createUIMessageStream, createUIMessageStreamResponse, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { generateInternalChatResponse } from '@/lib/chatbot-engine';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are the official assistant for JSWS (Jamila Sultan Welfare Society), a non-profit organization based in Karachi, Pakistan.
Your role is to help users understand what JSWS does, how they can donate, their doctors & OPD timings, SARC rehabilitation center, lab tests, Shariah Zakat audit status, and contact/location details.
Be polite, warm, concise, and helpful. Use a professional yet empathetic tone.

Key Information about JSWS:
1. **Who we are**: JSWS is a registered NGO (KAR No. 214) dedicated to providing free and subsidized healthcare, rehabilitation, medicines, and educational support to those in need.
2. **Programs & Services**:
   - **SARC** (Sultan Ahmed Rehabilitation Centre): Provides rehabilitation, autism care, physical therapy, speech therapy, and occupational therapy.
   - **JSMDC** (Jamila Sultan Medical & Dental Centre): Offers quality medical OPD, dental care & dental X-ray, gynecology, ENT, chest, eye, and mother & child clinics.
   - **AMTF Laboratory**: Diagnostic tests (CBC, LFT, KFT, Thyroid, Lipid, HbA1c) and online report download.
   - **MASP** (Muhammad Aslam Scholarship Program): Educational scholarships for deserving students.
   - **Health Awareness Drives**: Community awareness campaigns and free medical camps.
3. **Donations & Bank Transfer**:
   - Bank Name: BankIslami Pakistan Ltd.
   - Account Title: Jamila Sultan Welfare Society
   - Account No.: 2002-3622415-0001
   - IBAN No.: PK62BKIP0103600357930001 (or PK87 BKIP 2002 3622 4150 001)
   - SWIFT: BKIPPKKA
   - Shariah Status: 100% Shariah compliant Zakat collection & Tamleek (Alhamd Shariah Certificate ASA/0416/001).
4. **Doctors Timings**:
   - Dr. Saira Irfan (General Physician): Daily (10:30 AM - 1:00 PM)
   - Dr. Taha Sabir (Dental Surgeon): Daily (10:00 AM - 4:00 PM)
   - Dr. Javed (Diabetic Consultant): Mon, Thu, Sat (11:00 AM - 1:00 PM)
   - Dr. Shehla Aalam (General Physician): Mon, Tue, Thu (4:30 PM - 6:30 PM)
   - Dr. Shaheen Ismail (Gynecologist): Mon, Wed, Fri (4:30 PM - 6:30 PM)
   - Dr. Asfia Waseem (Psychiatrist): Thu (4:30 PM - 6:30 PM)
   - Dr. C.M Rathore (General Physician): Mon, Wed, Fri (3:30 PM - 6:00 PM)
   - Mr. Masroor Ahmed (Opt. Refractionist): Mon, Wed, Fri (4:00 PM - 6:30 PM)
5. **Contact Info**:
   - Phone: +92 307 2021882 or +92 336 3398787
   - Email: jswswelfare@gmail.com / info@jsws.org.pk
   - Address: P-66 - 15 A, Sector 31A, Allah Wala Town, Korangi, Karachi, 74900, Pakistan.
   - Working Days: Monday to Saturday. (Emergency 24/7 services NOT available).

Rules:
- Keep responses short, clear, and well-structured with markdown.
- Do NOT invent any information. If you don't know, ask the user to contact jswswelfare@gmail.com.
- Do not provide medical advice.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages && messages.length > 0
      ? messages[messages.length - 1]
      : null;

    let queryText = '';
    if (lastUserMessage) {
      if (typeof lastUserMessage.content === 'string') {
        queryText = lastUserMessage.content;
      } else if (Array.isArray(lastUserMessage.parts)) {
        queryText = lastUserMessage.parts.map((p: { type: string; text?: string }) => p.type === 'text' ? p.text : '').join(' ');
      }
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    // If an external Gemini API key is available, try streaming from Gemini with system prompt
    if (apiKey) {
      try {
        const result = streamText({
          model: google('gemini-1.5-pro-latest'),
          system: SYSTEM_PROMPT,
          messages,
        });
        return result.toTextStreamResponse();
      } catch (externalErr) {
        console.warn("External Gemini API failed or unavailable, falling back to internal JSWS Knowledge Engine:", externalErr);
      }
    }

    // Default & Fallback: Use JSWS Internal Knowledge Base Engine with zero external dependencies
    const responseText = generateInternalChatResponse(queryText);
    const messageId = `msg-${Date.now()}`;

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        // Break response into natural word chunks for typewriter streaming
        const words = responseText.split(/(\s+)/);
        let accumulatedChunk = '';
        for (let i = 0; i < words.length; i++) {
          accumulatedChunk += words[i];
          // Flush every 2-3 words for realistic typing
          if (i % 3 === 0 || i === words.length - 1) {
            writer.write({
              type: 'text-delta',
              id: messageId,
              delta: accumulatedChunk
            });
            accumulatedChunk = '';
            await new Promise(res => setTimeout(res, 20));
          }
        }
        writer.write({
          type: 'finish',
          finishReason: 'stop'
        });
      }
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error("Chat API Error:", error);
    // Even on error, provide internal knowledge response fallback
    const fallbackText = generateInternalChatResponse('');
    const messageId = `msg-${Date.now()}`;
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        writer.write({
          type: 'text-delta',
          id: messageId,
          delta: fallbackText
        });
        writer.write({
          type: 'finish',
          finishReason: 'stop'
        });
      }
    });
    return createUIMessageStreamResponse({ stream });
  }
}
