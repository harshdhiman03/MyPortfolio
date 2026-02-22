import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// System prompt with context about Harsh Dhiman
const SYSTEM_PROMPT = `You are the AI Digital Twin of Harsh Dhiman.
Your goal is to get Harsh hired as an AI Full-Stack Engineer.

CORE PERSONA:
- Enthusiastic, technical, and systems-oriented.
- You don't just list skills; you explain HOW Harsh used them (Context-Aware).
- You are professional but not stiff.

KNOWLEDGE BASE (Do not hallucinate outside this):
1. PROFESSIONAL EXP:
   - System Engineer at Infosys: Automating TV authoring workflows. 36% time reduction. [cite_start]Tech: Azure, Databricks, .NET Core [cite: 13-15].
   - [cite_start]Intern at Infosys: Built React mailing system (60% faster templates) [cite: 16-21].

2. TOP PROJECTS:
   - FoodOptima: AI Food waste reduction. Published in Springer/Scopus. [cite_start]Uses EfficientNetB0 & T5 [cite: 34-36].
   - Runic Realm: HackIndia Winner. Web3 Gaming. [cite_start]Uses Solidity & Ethers.js [cite: 37-38].
   - Transformer from Scratch: Built an English-to-French translator to master Attention mechanisms (98% accuracy).
   - [cite_start]FinSpire: Financial AI using TradingView APIs and Fine-tuned T5 [cite: 39-40].

3. AGENTIC CAPABILITIES:
   - Harsh understands RAG, Fine-tuning (T5), and Agentic workflows (not just API calling).

BEHAVIORAL RULES:
- If asked about "Experience", prioritize the Infosys Full-Time role.
- If asked about "AI", prioritize the Transformer from Scratch and FoodOptima.
- If asked about "Full Stack", prioritize Runic Realm and the Infosys Internal Tool.
- Keep answers under 3 sentences unless asked for a "Deep Dive".`
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Define the switchLens tool
    const switchLensTool = tool({
      description: 'Switches the portfolio view to a specific lens perspective. Use this when the user asks to see a specific lens or when you want to highlight a particular perspective (Product, Engineering, or Agentic).',
      inputSchema: z.object({
        lens: z
          .enum(['product', 'engineering', 'agentic'])
          .describe(
            'The lens perspective to switch to: "product" for business/user perspective, "engineering" for technical perspective, or "agentic" for AI/automation perspective'
          ),
      }),
      execute: async ({ lens }) => {
        // Return success message - the actual lens switching happens on the client
        return {
          success: true,
          message: `Switched to ${lens} lens`,
          lens,
        };
      },
    });

    // Determine which model to use: Groq (cloud) or Ollama (local)
    let model;
    
    if (process.env.GROQ_API_KEY) {
      // Use Groq API (Cloud - Free, Fast)
      const groq = createOpenAI({
        baseURL: 'https://api.groq.com/openai/v1',
        apiKey: process.env.GROQ_API_KEY,
      });
      model = groq('llama3-8b-8192');
      console.log('✅ Using Groq (Cloud) for AI responses');
    } else if (process.env.OLLAMA_BASE_URL) {
      // Use Ollama with custom base URL
      const ollama = createOpenAI({
        baseURL: process.env.OLLAMA_BASE_URL,
        apiKey: 'ollama',
      });
      model = ollama(process.env.OLLAMA_MODEL || 'llama2');
      console.log('✅ Using Ollama (Local) for AI responses');
    } else {
      // Fallback to Ollama with default local URL
      const ollama = createOpenAI({
        baseURL: 'http://127.0.0.1:11434/v1',
        apiKey: 'ollama',
      });
      model = ollama('llama2');
      console.log('⚠️ Using Ollama (Local) - ensure Ollama service is running on http://127.0.0.1:11434');
    }

    // Use streamText from Vercel AI SDK
    const result = streamText({
      model: model,
      system: SYSTEM_PROMPT,
      tools: {
        switchLens: switchLensTool,
      },
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
    });

    // Return the UI message stream response which includes tool calls
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
