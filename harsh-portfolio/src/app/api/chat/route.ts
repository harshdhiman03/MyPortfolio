import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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
- Keep answers under 3 sentences unless asked for a "Deep Dive".

CRITICAL TOOL USAGE RULES:
- ONLY trigger the switchLens tool if the user EXPLICITLY asks to change the website's view, theme, or lens (e.g., "switch to agentic mode", "show me the engineering view", "change to product lens").
- DO NOT trigger the tool if the user asks about my work, projects, or experience (e.g., "Tell me about Infosys", "What did you do at HackIndia?").
- If the user asks about my experience, answer them conversationally in text using your provided knowledge base.`
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Missing GROQ_API_KEY in environment' },
        { status: 500 }
      );
    }

    const groq = new OpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: groqApiKey,
    });

    let chatCompletion;
    try {
      chatCompletion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || 'llama3-8b-8192',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'switchLens',
              description:
                'Switches the portfolio view to product, engineering, or agentic lens.',
              parameters: {
                type: 'object',
                properties: {
                  lens: {
                    type: 'string',
                    enum: ['product', 'engineering', 'agentic'],
                  },
                },
                required: ['lens'],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: 'auto',
        temperature: 0.7,
      });
    } catch (error) {
      console.error('=== GROQ CALL ERROR ===', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

    console.log('=== RAW GROQ RESPONSE ===', JSON.stringify(chatCompletion, null, 2));

    const aiMessage = chatCompletion.choices[0]?.message;
    if (!aiMessage) {
      console.error('=== AI MESSAGE UNDEFINED ===', chatCompletion.choices[0]);
      return NextResponse.json({
        message: "I couldn't process that request.",
      });
    }

    // Check if the AI decided to call a tool
    if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
      const toolCall = aiMessage.tool_calls[0];

      if (toolCall.type === 'function' && toolCall.function.name === 'switchLens') {
        try {
          const args = JSON.parse(toolCall.function.arguments);
          if (
            args?.lens === 'product' ||
            args?.lens === 'engineering' ||
            args?.lens === 'agentic'
          ) {
            const textResponse =
              aiMessage.content || `Switching to ${args.lens} lens now.`;
            return NextResponse.json({
              message: textResponse,
              action: {
                type: 'switchLens',
                payload: args.lens,
              },
            });
          }
        } catch (error) {
          console.error('=== TOOL ARG PARSE ERROR ===', error);
        }
      }
    }

    // Fallback: If it's just normal text conversation
    return NextResponse.json({
      message: aiMessage.content || "I couldn't process that request.",
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

