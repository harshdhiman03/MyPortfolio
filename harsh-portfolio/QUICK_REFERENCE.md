# Quick Reference Guide - Harsh's Portfolio

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 📂 Key File Locations

### Context & State Management
- `src/context/LensContext.tsx` - Lens context, provider, and hook

### Components
- `src/components/Hero.tsx` - Main hero section with dynamic content
- `src/components/LensSwitcher.tsx` - Floating lens switcher control
- `src/components/ChatWidget.tsx` - AI chat interface
- `src/components/projects/ProjectGrid.tsx` - Projects display grid
- `src/components/projects/ProjectCard.tsx` - Individual project card
- `src/components/projects/ProjectModalContent.tsx` - Modal content
- `src/components/ui/Modal.tsx` - Reusable modal component

### Hero Visuals
- `src/components/hero/ProductCard.tsx` - Product lens visual
- `src/components/hero/SystemDiagram.tsx` - Engineering lens visual
- `src/components/hero/AgentTerminal.tsx` - Agentic lens visual

### API
- `src/app/api/chat/route.ts` - AI chat endpoint

### Data
- `src/lib/data.ts` - Projects data with lens-specific content

### Pages
- `src/app/page.tsx` - Home page (main entry point)
- `src/app/layout.tsx` - Root layout with LensProvider

---

## 🎯 How the Lens System Works

1. **Default Lens**: "product"
2. **Available Lenses**: product | engineering | agentic
3. **Toggle**: Use LensSwitcher (bottom-center)
4. **Updates**: All components automatically re-render

### Accessing Lens in Components
```tsx
import { useLens } from '@/context/LensContext';

export const MyComponent = () => {
  const { lens, setLens, toggleLens } = useLens();
  
  return <div>Current lens: {lens}</div>;
};
```

---

## 💬 Chat API Usage

### Endpoint
```
POST /api/chat
```

### Request Format
```json
{
  "messages": [
    { "role": "user", "content": "Tell me about your projects" }
  ]
}
```

### Response
Streams text response in real-time using Server-Sent Events

---

## 🎨 Styling Reference

### Colors
- **Primary**: `from-purple-600 via-blue-600 to-purple-600`
- **Background**: `bg-slate-950` / `bg-slate-900`
- **Text**: `text-white` with opacity variants
- **Accent**: `text-green-400` (terminal), `text-blue-400`, `text-pink-400`

### Common Classes
```tsx
// Glassmorphism
"backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl"

// Gradient Text
"bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"

// Button Style
"px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 
 text-white font-semibold border border-white/20 hover:border-white/40 
 transition-all shadow-lg hover:shadow-purple-500/50"
```

---

## 🔧 Common Tasks

### Add a New Project
Edit `src/lib/data.ts`:
```tsx
{
  id: 'project-name',
  title: 'Project Title',
  stack: ['Tech1', 'Tech2'],
  content: {
    product: { headline: '...', description: '...', stat: '...' },
    engineering: { headline: '...', description: '...', stat: '...' },
    agentic: { headline: '...', description: '...', stat: '...' },
  }
}
```

### Modify Hero Content
Edit `src/components/Hero.tsx`:
```tsx
const HERO_CONTENT = {
  product: { headline: '...', subtitle: '...', ... },
  // ...
}
```

### Update Chat System Prompt
Edit `src/app/api/chat/route.ts`:
```tsx
const SYSTEM_PROMPT = `Your updated prompt here...`;
```

### Change Colors
Update Tailwind classes in components or `tailwind.config.ts`

---

## 🐛 Troubleshooting

### Chat not working?
1. Check `.env.local` has `OPENAI_API_KEY`
2. Verify API key is valid
3. Check browser console for errors
4. Try: `npm run dev` to restart dev server

### Components not updating on lens change?
1. Ensure `useLens()` is imported and used
2. Check that components are wrapped in `<LensProvider>`
3. Verify `useEffect` dependencies include `lens`

### Build errors?
1. Run `npm run build` to check
2. Fix TypeScript errors with `npm run lint`
3. Delete `.next` folder and rebuild

---

## 📊 Component Dependencies

```
LensProvider (wraps entire app)
├── Navbar
├── Hero
│   └── ProductCard / SystemDiagram / AgentTerminal
├── ProjectGrid
│   └── ProjectCard (multiple)
│       └── ProjectModalContent
│           └── Modal
├── LensSwitcher
└── ChatWidget
    └── /api/chat (API)
```

---

## 🎬 Feature Showcase

### Product Lens
- Shows beautiful UI with live indicator
- Focuses on user experience
- Displays gaming/app features

### Engineering Lens
- Shows architecture diagrams
- Displays code examples
- Technical deep dives
- System design focus

### Agentic Lens
- Shows thought process bubbles
- AI logic visualization
- Automation flow
- Intelligent systems focus

---

## 📞 Support

For issues or questions about the portfolio setup:
- Email: dhimanharsh142003@gmail.com

---

## ✅ Deployment Checklist

- [ ] Set `OPENAI_API_KEY` in production environment
- [ ] Run `npm run build` successfully
- [ ] Test all three lenses
- [ ] Test chat functionality
- [ ] Test Deep Dive modals
- [ ] Test mobile responsiveness
- [ ] Update contact information if needed
- [ ] Deploy to Vercel/production

---

**Last Updated**: February 15, 2026
**Build Status**: ✅ Passing
