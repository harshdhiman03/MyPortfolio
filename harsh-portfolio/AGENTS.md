# AGENTS.md — Harsh Portfolio

## Commands
- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run start` — Run production build
- `npm run lint` — ESLint (Next.js config + TypeScript)

## Architecture
- **Framework**: Next.js 16 (App Router), React 19, TypeScript strict
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), CSS variables for theming
- **Smooth scroll**: Lenis (`lenis/react` provider in `layout.tsx`)
- **Path alias**: `@/*` → `./src/*`

## Lens System (Core Concept)
Three themes that globally restyle the app via `LensContext`:
- `product` — Light, clean (slate-50/900)
- `engineering` — Dark terminal (slate-950, grid bg)
- `agentic` — Dark purple gradient (`#0a0514`, purple accents)

Lens persists in `localStorage.activeLens`. Toggle cycles: product → engineering → agentic.

**Usage**: `const { lens, setLens, toggleLens } = useLens()` from `@/context/LensContext`

## Data Layer
`src/lib/data.ts` — Single source of truth:
- `projects: Project[]` — 7 projects, each with `product`, `engineering`, `agentic` content variants
- `experiences: Experience[]` — 3 work entries
- Types: `LensType`, `ProductContent`, `EngineeringProjectContent`, `AgenticContent`

Add projects here; components consume via typed imports.

## Key Components
| Path | Purpose |
|------|---------|
| `app/page.tsx` | Home: Hero + ProjectGrid + LensToggle |
| `app/about/page.tsx` | About page (Timeline, SkillDNA, NeuralSkillGraph, etc.) |
| `components/projects/ProjectGrid.tsx` | Project cards, opens modal |
| `components/projects/ProjectDetailModal.tsx` | Detail view per lens |
| `components/ui/PolymorphicNavbar.tsx` | Adapts to lens |
| `components/ui/LensToggle.tsx` | Floating lens switcher |
| `components/footer/AgentChat.tsx` | AI chat widget (uses `/api/chat`) |
| `components/LensBackground.tsx` | Animated bg per lens |

## AI Integration
- `@ai-sdk/openai` + `ai` SDK in `app/api/chat/route.ts`
- `openai` client for direct calls
- Env: `OPENAI_API_KEY` required in `.env.local`

## Dev Gotchas
- **React Compiler enabled** (`next.config.ts: reactCompiler: true`) — no `useMemo`/`useCallback` needed
- **Client components**: Most UI uses `'use client'` (LensContext, Hero, modals, etc.)
- **Suspense boundaries**: `PolymorphicNavbar` wrapped in Suspense in `page.tsx:48`
- **TypeScript strict** — no `any`, explicit return types on exported functions
- **Tailwind v4** — uses `@import "tailwindcss"` in `globals.css`, not `@tailwind` directives

## File Conventions
- Components: PascalCase (`ProjectCard.tsx`)
- Hooks/context: `useLens`, `LensContext`
- Types: co-located in `data.ts` or `types/`
- Styles: `product-theme.ts` exports theme tokens as CSS variables

## Adding a Project
1. Add entry to `projects` array in `src/lib/data.ts` with all 3 lens content variants
2. Add image to `public/img/`
3. Project appears automatically in grid (no routing needed)

## Testing
No test framework configured. Add Vitest/Jest if needed.