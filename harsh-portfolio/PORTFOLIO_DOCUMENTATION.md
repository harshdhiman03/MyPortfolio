# Harsh's Multi-Perspective Portfolio - Complete Implementation

## 🎯 Project Overview

A sophisticated Next.js portfolio that showcases your work through three distinct professional lenses: **Product**, **Engineering**, and **Agentic**. The entire experience dynamically adapts based on the selected lens.

---

## 🏗️ Architecture

### Core Systems

#### 1. **LensContext** (`src/context/LensContext.tsx`)
- React Context for managing the current lens state
- Three lens types: `'product' | 'engineering' | 'agentic'`
- Provides `useLens()` hook for accessing/toggling lens
- Default lens: `'product'`

#### 2. **LensSwitcher** (`src/components/LensSwitcher.tsx`)
- Floating glassmorphic control at bottom-center
- Three segmented tabs with animated background pill
- Smooth spring animations on lens changes
- Fixed positioning with backdrop blur

#### 3. **LensProvider** (`src/context/LensContext.tsx`)
- Wraps entire app for lens context availability
- Integrated in root layout

---

## 🎨 Hero Section (`src/components/Hero.tsx`)

### Features
- Split-screen layout (text left, visuals right)
- Lens-aware dynamic content
- Smooth AnimatePresence transitions

### Lens-Specific Content
- **Product**: "Crafting Intelligent Full-Stack & AI Experiences" + ProductCard visual
- **Engineering**: "Architecting Scalable Cloud Pipelines" + SystemDiagram visual
- **Agentic**: "Designing Intelligent Agents & NLP Systems" + AgentTerminal visual

### Visual Components

#### ProductCard (`src/components/hero/ProductCard.tsx`)
- Glassmorphic Web3-themed card
- Game Session status display
- Pulsing "Live" indicator
- Purple/blue gradient styling

#### SystemDiagram (`src/components/hero/SystemDiagram.tsx`)
- SVG architecture diagram
- Three service boxes: Client (React), API Gateway (.NET Core), Data Processor (Databricks)
- Animated arrows showing continuous data flow
- Azure Cloud wrapper with dashed border
- Blueprint style with grid background

#### AgentTerminal (`src/components/hero/AgentTerminal.tsx`)
- MacOS terminal window mockup
- Traffic light dots (red, yellow, green)
- Line-by-line typing animation of T5 model inference
- Blinking cursor and completion message
- Auto-looping animation

---

## 📊 Projects Section

### ProjectGrid (`src/components/projects/ProjectGrid.tsx`)
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Staggered card animations
- Lens-aware section headers:
  - **Product**: "Shipped Products"
  - **Engineering**: "Technical Deep Dives"
  - **Agentic**: "AI Research & Experiments"

### ProjectCard (`src/components/projects/ProjectCard.tsx`)
- Lens-aware visual section
- Dynamic content display (headline, description, stat)
- Smart tech tag highlighting based on lens relevance
- Modal integration with "Deep Dive" button

### Projects Data (`src/lib/data.ts`)
Three featured projects with lens-specific content:

1. **Infosys (System Engineer)**
   - Product: TV authoring workflow (36% faster)
   - Engineering: Azure/Databricks integration
   - Agentic: Logic automation & manual elimination

2. **FoodOptima**
   - Product: Ending food waste with AI
   - Engineering: EfficientNetB0 & Streamlit
   - Agentic: T5 Transformer fine-tuning

3. **Runic Realm**
   - Product: HackIndia Spark-2 Winner
   - Engineering: Solidity & Ethers.js integration
   - Agentic: Bot-resistant gaming logic

---

## 🎯 Deep Dive Modal System

### Modal (`src/components/ui/Modal.tsx`)
- Custom Framer Motion-based modal
- Backdrop with blur effect
- Smooth animations
- Close button functionality

### ProjectModalContent (`src/components/projects/ProjectModalContent.tsx`)
- Lens-aware content that updates dynamically
- **Product Lens**: User impact and business value
- **Engineering Lens**: 
  - Architecture diagrams (Infosys)
  - Code snippets (FoodOptima, Runic Realm)
  - Technical implementation details
- **Agentic Lens**: Intelligent agent logic and automation

---

## 💬 AI Chat System

### API Route (`src/app/api/chat/route.ts`)
- **Endpoint**: POST `/api/chat`
- **Technology**: Vercel AI SDK + OpenAI GPT-4 Turbo
- **Features**:
  - Real-time text streaming with `streamText()`
  - Comprehensive system prompt with portfolio context
  - Graceful error handling
  - Input validation

### System Prompt Context
- Professional AI assistant persona
- Complete project descriptions
- Technical skills inventory
- Resume highlights
- Contact information
- Tone guidelines

### ChatWidget (`src/components/ChatWidget.tsx`)
- Floating chat button (bottom-right)
- Expandable chat window
- Real-time message streaming
- Message history display
- Auto-scroll to latest messages
- Loading state with "Thinking..." indicator
- Framer Motion animations

---

## 🎨 Styling & Theme

### Color Scheme
- Primary: Purple & Blue gradients
- Background: Slate-900 to Slate-950
- Text: White with opacity variations
- Accent: Green (terminal), Cyan, Pink

### Animations
- Framer Motion throughout
- Spring physics (stiffness: 380, damping: 30)
- AnimatePresence for smooth transitions
- Staggered children animations
- Viewport-based animations

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Proper spacing and padding
- Flexible grid layouts

---

## 📦 Dependencies

### Core
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5

### Animation & UI
- framer-motion 12.34.0
- lucide-react 0.564.0

### AI & Chat
- ai 6.0.86
- @ai-sdk/openai 3.0.29
- openai 6.22.0

### Styling
- Tailwind CSS 4
- clsx 2.1.1
- tailwind-merge 3.4.1

### Utilities
- zod 4.3.6 (for validation)

---

## 🚀 Key Features

✅ **Multi-Perspective Experience** - Same projects shown differently based on lens
✅ **Real-Time AI Chat** - Stream-based responses with context
✅ **Smooth Animations** - Professional motion throughout
✅ **Responsive Design** - Works seamlessly on all devices
✅ **Type-Safe** - Full TypeScript implementation
✅ **Accessible** - Proper semantic HTML and ARIA
✅ **Performance** - Optimized with Next.js Turbopack
✅ **Modular Architecture** - Reusable, maintainable components

---

## 🔧 Setup & Environment

### Required Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

---

## 📱 Page Structure

```
Home Page
├── Navbar (sticky)
│   ├── Logo (harsh.dev)
│   └── Navigation links
├── Hero Section
│   ├── Lens label badge
│   ├── Dynamic headline
│   ├── Subtitle
│   ├── CTA button
│   ├── Visual component (ProductCard/SystemDiagram/AgentTerminal)
│   └── Statistics
├── Projects Section
│   ├── Section header (lens-aware)
│   └── Project Grid
│       └── ProjectCards (with modal integration)
├── LensSwitcher (fixed bottom-center)
└── ChatWidget (fixed bottom-right)
```

---

## 🎬 User Experience Flow

1. User lands on portfolio
2. Sees hero section with Product lens (default)
3. Explores projects in current lens
4. Clicks "Deep Dive" to see detailed modal content
5. Uses LensSwitcher to change perspective
6. All content updates dynamically
7. Chats with AI assistant about work
8. AI provides context-aware responses

---

## 🔮 Future Enhancements

- Add more projects
- Integrate actual code examples from GitHub
- Add animations library (Lottie files)
- Blog/case study pages
- Contact form integration
- Newsletter subscription
- Dark/light mode toggle
- Internationalization (i18n)

---

## ✨ Technical Highlights

- **Zero external UI libraries** - All modals and components built from scratch
- **Type-safe chat** - Full TypeScript implementation
- **Streaming responses** - Real-time AI chat with streaming
- **Context-aware AI** - Custom system prompt with portfolio context
- **Lens architecture** - Novel multi-perspective approach to portfolios
- **Performance optimized** - Server-side rendering + static generation

---

## 📞 Contact

**Email**: dhimanharsh142003@gmail.com

---

## 📝 License

This portfolio is proprietary and created for personal use.

---

**Built with ❤️ using Next.js, React, Framer Motion, and AI**
