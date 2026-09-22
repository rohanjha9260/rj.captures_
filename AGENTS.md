# AI Agent Guide — RJ Captures

> **MANDATORY INSTRUCTION FOR ALL AI MODELS & AGENTS**:  
> **DO NOT scan, re-read, or crawl the entire codebase.** All architectural layouts, component APIs, theming rules, image pipelines, and developer playbooks are already documented in [`docs/PROJECT_OUTLINE.md`](file:///d:/Projects/RJ_Captures/rj-captures/docs/PROJECT_OUTLINE.md). Read that file first whenever you need context.

---

## ⚡ Quick Project Context

- **What is this?**: Cinematic photography portfolio and AI guide website for **Rohan Jha** (based in Delhi, India).
- **Core Tech**: React 19, Vite 8, Tailwind CSS v3, Framer Motion 12, Swiper 12, Sharp (image conversion), Groq Cloud API (`openai/gpt-oss-120b`).
- **Aesthetic**: High-end cinematic dark mode (`#050505`, `#0a0a0a`), warm gold accents (`#d4af37`), glassmorphism, responsive mobile-first layouts.

---

## 🧭 File Navigation Index

| Need to know about... | Open this file |
|---|---|
| **Master Architecture & Specifications** | [`docs/PROJECT_OUTLINE.md`](file:///d:/Projects/RJ_Captures/rj-captures/docs/PROJECT_OUTLINE.md) |
| **Component Layout & Hierarchy** | [`src/App.jsx`](file:///d:/Projects/RJ_Captures/rj-captures/src/App.jsx) |
| **Theme System & CSS Variables** | [`src/index.css`](file:///d:/Projects/RJ_Captures/rj-captures/src/index.css) & [`src/context/ThemeContext.jsx`](file:///d:/Projects/RJ_Captures/rj-captures/src/context/ThemeContext.jsx) |
| **Tailwind Tokens & Config** | [`tailwind.config.js`](file:///d:/Projects/RJ_Captures/rj-captures/tailwind.config.js) |
| **Image Galleries & Categories** | [`src/components/portfolio/PortfolioCarousel.jsx`](file:///d:/Projects/RJ_Captures/rj-captures/src/components/portfolio/PortfolioCarousel.jsx) |
| **AI Chatbot Logic & API** | [`src/components/ui/ChatBot.jsx`](file:///d:/Projects/RJ_Captures/rj-captures/src/components/ui/ChatBot.jsx) |
| **Image Optimization Script** | [`scripts/convert-images.js`](file:///d:/Projects/RJ_Captures/rj-captures/scripts/convert-images.js) |

---

## 🛠️ Essential Commands

```bash
# Start local development server
npm run dev

# Run automated WebP image conversion for new photos
npm run convert-images

# Production bundle build
npm run build

# Preview production build locally
npm run preview

# Lint codebase
npm run lint
```

---

## 🛑 Guardrails & Development Rules

1. **Theme Compliance**: Never hardcode pure white or pure black backgrounds without theme variables. Use `bg-theme-bg`, `bg-theme-card`, `text-theme-text`, `text-gold`, etc.
2. **Asset Handling**: All portfolio photos are stored as WebP in `public/images/<category>/`. Do not introduce broken external placeholder links.
3. **Chatbot Safety**: The chatbot uses Groq's `openai/gpt-oss-120b` endpoint via `VITE_GROQ_API_KEY`. Keep response formatting short and punchy as defined in the system prompt.
4. **Z-Index Discipline**:
   - Background animations / filmstrip: `z-10`
   - Navbar & Chatbot floating trigger: `z-50`
   - Fullscreen Lightbox (`ImageViewer`): `z-[99999]`
   - Fullscreen initial loader: `z-[999999]`
5. **Detailed Documentation**: For exact component props, data models, and step-by-step modification guides, check [`docs/PROJECT_OUTLINE.md`](file:///d:/Projects/RJ_Captures/rj-captures/docs/PROJECT_OUTLINE.md).
