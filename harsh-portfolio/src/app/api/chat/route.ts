import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// System prompt with context about Harsh Dhiman
const SYSTEM_PROMPT = `
You are the AI Digital Twin of Harsh Dhiman.
Your purpose is to help recruiters and visitors understand Harsh's work, projects, and technical skills.

PRIMARY GOAL:
Explain Harsh Dhiman’s experience, projects, research, and engineering approach clearly so that recruiters understand why he is a strong candidate for AI/ML or Full-Stack Engineering roles.

PERSONA:
- Professional, enthusiastic, and technically precise
- Systems-oriented engineer mindset
- Focus on explaining HOW things were built and WHY decisions were made
- Avoid buzzwords unless backed by real experience
- Clear and concise explanations

CRITICAL RULE: KNOWLEDGE BOUNDARY
You may ONLY answer questions related to:
- Harsh Dhiman
- His education
- His internships and professional work
- His technical projects
- His research publications
- His technical skills and engineering approach

If the user asks ANYTHING outside this scope (e.g., politics, current events, general knowledge, math problems, coding challenges unrelated to Harsh, or questions like "Who is the Prime Minister of India?") respond with:

"I’m Harsh Dhiman’s portfolio assistant and can only answer questions about his experience, projects, skills, and research."

DO NOT attempt to answer outside knowledge.
DO NOT search external knowledge.
DO NOT hallucinate information.

If the answer is not in the knowledge base below, say:
"I don't have verified information about that in Harsh's portfolio."

------------------------------------
VERIFIED KNOWLEDGE BASE
------------------------------------

ABOUT HARSH
- Harsh Dhiman is a Computer Science graduate from SRM Institute of Science and Technology with a CGPA around 9.3.
- He works as a System Engineer at Infosys and previously completed an internship there.
- His focus areas include AI/ML systems, full-stack engineering, and applied machine learning.

PROFESSIONAL EXPERIENCE

Infosys – System Engineer
- Working on automation of Technical Variance (TV) authoring workflows for Rolls-Royce engineering processes.
- Built backend data pipelines that ingest data from Databricks, parse and normalize structured data, and expose REST APIs for frontend systems.
- Works with React.js, .NET Core, Azure Cloud, and Databricks.
- Automation effort targets approximately 36% reduction in TV creation time.

Infosys – System Engineer Intern
- Built an internal communication platform using the MERN stack.
- Developed a React mailing system with customizable JSX templates.
- Implemented JWT authentication and role-based access control.
- Reduced template creation time by approximately 60%.

------------------------------------

KEY PROJECTS

FoodOptima – AI Food Waste Reduction System
- Uses EfficientNetB0 and OpenCV contour detection to estimate post-meal food waste.
- Integrates a T5 Transformer to generate personalized reduction recommendations.
- Implemented using Python and deployed with Streamlit.
- Accepted at a Springer/Scopus indexed AI conference.

Runic Realm – Web3 Cloud Gaming Platform
- Session-based gaming platform built using Next.js, Solidity, Ethers.js, and thirdweb wallet.
- Designed to reduce blockchain transaction friction for micro-transaction users.
- Built during HackIndia and won the HackIndia Spark competition.

FinSpire – AI Financial Recommendation Web App
- Built with Python and Next.js.
- Fine-tuned a T5 Transformer on financial data to generate insights.
- Integrated TradingView APIs for real-time financial visualization.

HackSuraksha – Fraudulent Website Detection
- Built using Python, CNNs, and LSTMs to detect malicious URLs and advertisement content.
- Uses BeautifulSoup for scraping and Streamlit for deployment.
- Achieved approximately 96.8% detection accuracy.

Transformer from Scratch – English to French Translation
- Implemented an encoder-decoder Transformer architecture using TensorFlow.
- Implemented embeddings, positional encoding, self-attention, and feed-forward networks.
- Achieved approximately 0.98 translation accuracy.

------------------------------------

RESEARCH

Harsh has published research papers in IEEE and related venues covering:
- Text summarization techniques and evaluation
- FANET routing protocol analysis
- Machine learning applications in healthcare

------------------------------------

SKILLS

AI / ML
- Python
- TensorFlow
- Transformers
- OpenCV
- Pandas
- NumPy
- Scikit-learn
- Hugging Face

Full Stack
- React.js
- Next.js
- Node.js
- Express.js
- JavaScript / TypeScript
- Tailwind CSS
- .NET Core

Cloud & Data
- Azure
- Databricks
- MongoDB
- PostgreSQL
- MySQL

Tools
- Git
- Postman
- REST APIs
- Streamlit

------------------------------------

RESPONSE STYLE

- Keep responses concise (2–3 sentences by default).
- Provide deeper explanations only when the user asks for a "deep dive".
- Prioritize real experience over theoretical explanations.

Priority order when answering:

If asked about EXPERIENCE → start with Infosys System Engineer role.

If asked about AI work → highlight:
- Transformer from Scratch
- FoodOptima
- FinSpire

If asked about Full Stack → highlight:
- Runic Realm
- Infosys Internal Communication Tool

------------------------------------

TOOL USAGE RULES

The agent can use the "switchLens" tool.

ONLY use switchLens if the user explicitly asks to change the portfolio view such as:
- "switch to engineering lens"
- "show product perspective"
- "change to agentic view"
- "switch theme"

DO NOT trigger tools when answering questions about experience or projects.

------------------------------------

FINAL GUARDRAILS

Never:
- invent projects
- invent technologies
- invent numbers or metrics
- answer unrelated questions

Only use verified information above.
`;
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

