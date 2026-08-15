# Harsh Dhiman — Portfolio

**Not your average portfolio. It's three portfolios in one.**

Every pixel of this site changes when you flip the lens. The same projects, the same work — restyled for a product manager, a staff engineer, and an AI researcher. One toggle. Three completely different experiences.

---

## Things to try first

Curious where to start? Here's what visitors enjoy most:

1. **Talk to my AI digital twin.** The chat widget in the corner isn't a FAQ bot — it's an AI clone of me, trained on my actual projects, internships, and research. Ask it "why did you build a Transformer from scratch?" It knows.
2. **Click a node in the Neural Skill Graph.** The whole skill map is a living force-graph. Hover any skill for my proficiency, then *click it* — it opens the real project that uses it, in full detail.
3. **Flip the lens.** Find the floating toggle and cycle through the three themes. Watch the entire site — colors, typography, even the *structure* of project pages — morph between `product`, `engineering`, and `agentic`.
4. **Open any project in the Engineering lens.** You don't get a bullet list. You get architecture flow diagrams, real code snippets, and system design decisions.

---

## What's inside

| Section | What you'll find |
|---------|------------------|
| **Hero + Projects** | Six real projects — from a Springer-published food-waste AI to an 8-second multilingual podcast synthesizer |
| **Project Deep Dives** | Three content variants per project: SWOT analysis, architecture + code, and AI reasoning traces |
| **About** | Neural skill graph, career timeline, research lab, and skill DNA |
| **AI Chat** | A knowledge-bounded digital twin that answers only about Harsh — nothing else |
| **Contact** | Direct form (EmailJS), socials, and resume access |

---

## The Lens System — one site, three personalities

- **Product lens** — clean, light, user-first. SWOT analyses and "aha moments" for every project.
- **Engineering lens** — dark terminal aesthetic. Architecture flow diagrams, core snippets, infra decisions. Cyan on slate, monospace, grids.
- **Agentic lens** — deep purple, particle fields. Reasoning traces showing how each system thinks, step by step.

Your choice persists across visits. The lens isn't a skin — it changes the *content format* of every project page.

---

## The Neural Skill Graph

A D3 force-directed network of 30+ technologies across four domains (AI/ML, Cloud & Data, Full Stack, Developer Tools), connected to the projects that actually use them:

- Node size = real proficiency, not marketing
- Hover a skill → proficiency meter and its projects
- Dashed amber links = cross-domain connections (the interesting ones)
- Click any node → jump straight into the matching project deep dive
- Legend chips focus a single domain

---

## Project highlights

- **OmniListen** — vector-search personalized news audiobooks: 768-dim semantic matching, dual-host LLM scripts, parallel TTS in 10 languages under 8 seconds.
- **Neural Translator** — a Transformer built *from scratch* (custom attention, positional encoding) hitting 98% translation accuracy.
- **FoodOptima** — post-meal-only AI vision for food waste, published at Springer (Scopus), zero pre-meal scans.
- **HackSuraksha** — dual-modal phishing detection (LSTM + CNN) at 96.8% accuracy.
- **Mestor Ai** — a hybrid rules + LLM 4-agent pipeline that turns raw user feedback into prioritized engineering actions.

---

## Tech behind it

**Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · React Compiler**

Plus: Framer Motion, Lenis smooth scroll, D3-force + react-force-graph-2d, the Vercel AI SDK, and Groq for the chat twin. The React Compiler is enabled — zero manual memoization needed.

## Run it locally

```bash
npm install
cp .env.example .env.local   # add GROQ_API_KEY for the AI twin
npm run dev                  # → http://localhost:3000
```

Env vars (all optional except `GROQ_API_KEY` for chat):

```env
GROQ_API_KEY=...                         # AI twin
GROQ_MODEL=...                           # optional, default llama3-8b-8192
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...       # contact form
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## Repo map (the interesting parts)

```
src/lib/data.ts                    # Every project, three lenses deep
src/components/about/NeuralSkillGraph.tsx   # The interactive skill graph
src/components/footer/AgentChat.tsx         # The AI digital twin
src/context/LensContext.tsx                 # The lens engine
src/app/api/chat/route.ts                   # Chat endpoint (Groq)
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build with typecheck |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint + TypeScript checks |

