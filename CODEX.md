# Codex & Copilot Guidelines — RJ Captures

> **MANDATORY INSTRUCTION FOR CODEX & COPILOT**:  
> **DO NOT scan, re-read, or crawl the entire codebase.** All architectural layouts, component APIs, theming rules, image pipelines, and developer playbooks are already documented in [`docs/PROJECT_OUTLINE.md`](docs/PROJECT_OUTLINE.md). Read that file first whenever you need context.

---

## ⚡ Quick Project Context

- **Project**: High-end cinematic photography portfolio and interactive AI guide for **Rohan Jha** (Delhi, India).
- **Core Tech**: React 19 (`^19.2.4`), Vite 8 (`^8.0.1`), Tailwind CSS v3 (`^3.4.19`), Framer Motion 12 (`^12.38.0`), Swiper 12 (`^12.1.2`), Sharp (`^0.33.3`), Groq Cloud API (`openai/gpt-oss-120b`).
- **Aesthetic**: Signature dark mode (`#050505`, `#0a0a0a`), warm gold accents (`#d4af37`), glassmorphism, responsive mobile-first layouts with bottom dock.

---

## 🧭 File Navigation Index

| Need to know about... | Open this file |
|---|---|
| **Master Architecture & Specifications** | [`docs/PROJECT_OUTLINE.md`](docs/PROJECT_OUTLINE.md) |
| **Component Layout & Hierarchy** | [`src/App.jsx`](src/App.jsx) |
| **Theme System & CSS Variables** | [`src/index.css`](src/index.css) & [`src/context/ThemeContext.jsx`](src/context/ThemeContext.jsx) |
| **Tailwind Tokens & Config** | [`tailwind.config.js`](tailwind.config.js) |
| **Screen 1: Hero Carousel** | [`src/components/sections/Hero.jsx`](src/components/sections/Hero.jsx) |
| **Screen 2: Portfolio Categories & Lightbox** | [`src/components/sections/PortfolioSection.jsx`](src/components/sections/PortfolioSection.jsx) |
| **Screen 3: About & Journey Video** | [`src/components/sections/About.jsx`](src/components/sections/About.jsx) |
| **Screen 4: Instagram / Behold.so Feed** | [`src/components/sections/InstagramFeed.jsx`](src/components/sections/InstagramFeed.jsx) |
| **Screen 5: Contact Form** | [`src/components/sections/Contact.jsx`](src/components/sections/Contact.jsx) |
| **Mobile Bottom Dock** | [`src/components/layout/BottomNav.jsx`](src/components/layout/BottomNav.jsx) |
| **AI Chatbot Logic & API** | [`src/components/ui/ChatBot.jsx`](src/components/ui/ChatBot.jsx) |
| **Image Optimization Script** | [`scripts/convert-images.js`](scripts/convert-images.js) |

---

## 🛑 Strict Constraints & Development Rules

1. **Theme Compliance**: Never hardcode pure white or pure black backgrounds without theme variables. Use `bg-theme-bg`, `bg-theme-card`, `text-theme-text`, `border-theme-border`, `text-gold`, etc. Scrolled dark glassmorphic headers/bars must ensure high-contrast text (`text-white/90`) in all themes.
2. **Asset Handling**: All portfolio photos are stored as WebP in `public/images/<category>/`. Do not introduce broken external placeholder links.
3. **Secrets & Endpoints**: Keep `.env.local` private. Use `VITE_GROQ_API_KEY`, `VITE_INSTAGRAM_FEED_URL`, and `VITE_CONTACT_FORM_ENDPOINT`.
4. **Z-Index Discipline**:
   - `z-10`: FilmStrip and decorative background elements
   - `z-50`: Floating desktop Navbar, mobile BottomNav dock (`md:hidden`), ChatBot launcher
   - `z-[60]` - `z-[100]`: Mobile drawer
   - `z-[99999]`: Fullscreen Lightbox (`ImageViewer.jsx`) and modal dialogs
   - `z-[999999]`: Initial LoadingScreen
5. **Accessibility Standards**:
   - Interactive cards/triggers must use `<button type="button">` or `<motion.button>` with `aria-label` and `focus-visible:ring-2 focus-visible:ring-gold`.
   - Modals require `role="dialog"`, `aria-modal="true"`, focus management, and `Escape` key dismissal.
   - Form fields must have associated visible `<label htmlFor="...">` tags.
6. **Mobile Safe Areas**: Floating triggers must respect `env(safe-area-inset-bottom)` so they don't collide with the mobile navigation dock or iOS home indicator.

---

## 📐 Code Generation Conventions

- **React 19 Functional**: Pure React hooks. Do not generate legacy class components or deprecated lifecycle methods.
- **Tailwind Only**: Do not create auxiliary CSS files unless strictly necessary. Utilize existing tokens in `tailwind.config.js` and `src/index.css`.
- **Framer Motion**: Keep animations lightweight (`duration: 0.3` to `0.4`, `ease: "easeOut"`).
- **ESLint Compliance**: Ensure code produces 0 ESLint errors and 0 warnings (`npm run lint`). Avoid unused variables and unhandled rejections.

---

## 🛠️ Essential Commands

```bash
# Start local development server
npm run dev

# Run automated WebP image conversion for new photos
npm run convert-images

# Lint codebase (must be 0 errors, 0 warnings)
npm run lint

# Production bundle build
npm run build

# Preview production build locally
npm run preview
```



---

# Agent Instructions & Constraints

## Code Generation Rules
- Do NOT add dummy, mock, or placeholder code.
- Do NOT write unrequested comments, inline docs, or verbose logging.
- Do NOT rewrite entire files. Apply minimal, surgical diffs only to the requested lines.
- Do NOT create new utility files or dependencies without explicit permission.
- If context or requirements are ambiguous, STOP and ask for clarification instead of guessing.

## Quality Gates
- Every change must pass existing type checks and linters.
- Remove any unused imports, dead variables, and redundant logic before finishing the task.
