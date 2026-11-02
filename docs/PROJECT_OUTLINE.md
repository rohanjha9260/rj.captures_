# RJ Captures — Project Architecture & Complete Technical Outline

> **Purpose for AI Models & Developers**:  
> This document is the single source of truth for the **RJ Captures** codebase. Read this document to understand the full system architecture, component contracts, theming engine, image pipeline, and workflows without needing to crawl or re-index the entire codebase.

---

## 1. Executive Project Summary

- **Project Name**: RJ Captures (`rj-captures`)
- **Owner / Creator**: Rohan Jha (Cinematic photographer based in Delhi, India)
- **Concept**: High-end cinematic photography portfolio showcasing nature, sky, village, travel, and portrait work, paired with an integrated real-time AI photography guide.
- **Design Philosophy**: Cinematic luxury aesthetic, deep dark palettes (`#050505`, `#0a0a0a`), warm golden highlights (`#d4af37`, `#e8c547`), dynamic glassmorphism, fluid micro-interactions via Framer Motion, and responsive mobile-first layouts.
- **Runtime Environment**: SPA (Single Page Application) powered by React 19 and Vite 8, utilizing client-side routing/scrolling.

---

## 2. Technology Stack & Key Dependencies

| Category | Technology | Version | Key Purpose |
|---|---|---|---|
| **Core Framework** | React | `^19.2.4` | Modern component architecture, hooks, lazy loading |
| **DOM Renderer** | React DOM | `^19.2.4` | Virtual DOM rendering with StrictMode |
| **Bundler & Dev Server** | Vite | `^8.0.1` | Lightning-fast HMR, ESM bundling, production optimization |
| **Styling** | Tailwind CSS | `^3.4.19` | Utility-first CSS configured with custom theme tokens |
| **CSS Preprocessing** | PostCSS + Autoprefixer | `^8.5.8` / `^10.4.27` | Vendor prefixing and CSS processing |
| **Motion & Animation** | Framer Motion | `^12.38.0` | Scroll-triggered entrance, AnimatePresence, spring modals |
| **Touch Carousels** | Swiper | `^12.1.2` | Mobile-touch enabled image carousels with pagination & navigation |
| **Icons** | React Icons | `^5.6.0` | Feathers (`fi`), Heroicons (`hi`, `hi2`), etc. |
| **Scroll Trigger** | `react-intersection-observer` | `^10.0.3` | Viewport visibility detection for deferred animations |
| **Image Optimization** | Sharp (Dev tool) | `^0.33.3` | Automated generation of WebP full & thumbnail images |
| **AI Guide Backend** | Groq Cloud API | REST API | Ultra-fast inference (`openai/gpt-oss-120b`) for photography chatbot |
| **Linter** | ESLint | `^9.39.4` | Modern flat config (`eslint.config.js`) for React code quality |

---

## 3. Directory & File Map

```
rj-captures/
├── .env.example                     # Sample environment variable template
├── .env.local                       # Local environment secrets (VITE_GROQ_API_KEY, etc.)
├── eslint.config.js                 # ESLint v9 flat config
├── index.html                       # HTML5 entry shell with SEO meta tags & font links
├── package.json                     # Project manifest, dependencies, and npm scripts
├── postcss.config.js                # PostCSS configuration for Tailwind
├── tailwind.config.js               # Theme definitions, custom colors, animations, shadows
├── vite.config.js                   # Vite configuration with @vitejs/plugin-react
├── AGENTS.md                        # Instruction guide for AI coding assistants
├── FINAL_VERIFICATION.md            # Production build and deployment checklist
├── README.md                        # Public repository documentation
├── docs/
│   └── PROJECT_OUTLINE.md           # [THIS FILE] Master architectural outline
├── scripts/
│   └── convert-images.js            # Sharp CLI script: recurses public/images to create WebP
├── public/
│   ├── favicon.svg                  # Brand favicon
│   ├── icons.svg                    # SVG sprite symbols
│   └── images/                      # Master repository of portfolio photography
│       ├── featured/                # WebP images for masonry grid
│       ├── hero/                    # WebP hero carousel slides
│       ├── nature/                  # WebP nature photography collection
│       ├── portrait/                # WebP portrait photography collection
│       ├── sky/                     # WebP sky & sunset photography collection
│       ├── travel/                  # WebP travel & journey photography collection
│       ├── village/                 # WebP village & cultural life photography collection
│       ├── profile.jpg              # Original photographer profile portrait
│       ├── profile.webp             # Optimized profile portrait (1920px max)
│       └── profile-thumb.webp       # Profile thumbnail (800px max)
└── src/
    ├── main.jsx                     # App mount, React StrictMode, ThemeProvider wrap
    ├── App.jsx                      # Main layout orchestrator & section assembler
    ├── index.css                    # Base CSS variables, theme classes, utilities, animations
    ├── context/
    │   └── ThemeContext.jsx         # Theme provider & session-persisted data-theme switch
    ├── hooks/
    │   ├── useInView.js             # Intersection observer hook for viewport triggers
    │   └── useTheme.js              # ThemeContext consumer hook
    ├── styles/
    │   └── design.css               # Supplementary custom styling sheet (optional overrides)
    └── components/
        ├── layout/
        │   ├── Navbar.jsx           # Sticky glassmorphism header, navigation, theme toggle
        │   ├── BottomNav.jsx        # Mobile dock navigation with scroll-spy tab tracking
        │   └── Footer.jsx           # Brand footer, sitemap links, services list, contact info
        ├── portfolio/
        │   └── FilmStrip.jsx        # Infinite horizontally scrolling photographic film reel
        ├── sections/
        │   ├── Hero.jsx             # Full-screen hero with carousel, tagline, quick stats
        │   ├── PortfolioSection.jsx # Category portfolio cards with lightbox integration
        │   ├── About.jsx            # Bio, photographer narrative, gear & skills tags
        │   ├── InstagramFeed.jsx    # Live 3x3 Instagram / Behold.so photo grid
        │   └── Contact.jsx          # Full contact form with Formspree/Web3Forms logic
        └── ui/
            ├── BackToTop.jsx        # Floating back-to-top button appearing after 400px scroll
            ├── ChatBot.jsx          # Photography AI assistant using Groq API
            └── ImageViewer.jsx      # High-performance fullscreen image lightbox with keyboard controls
```

---

## 4. Component Architecture & Data Flow

```text
main.jsx
└── <ThemeProvider>
    └── <App>
        ├── <AnimatePresence> LoadingScreen (0-900ms initial load)
        ├── <Navbar isScrolled={isScrolled} />
        ├── <Hero />                                 # Screen 1: HOME PAGE
        ├── <PortfolioSection />                     # Screen 2: PORTFOLIO / WORK (5 Categories)
        ├── <FilmStrip />                            # Cinematic 35mm film reel divider
        ├── <About />                                # Screen 3: ABOUT PAGE (Story, Stats, Expertise)
        ├── <InstagramFeed />                        # Screen 4: INSTAGRAM / FEED PAGE (3x3 Grid)
        ├── <Contact />                              # Screen 5: CONTACT PAGE (Form & Direct Reach)
        ├── <Footer />                               # Brand footer
        ├── <BottomNav />                            # Mobile Bottom Dock (Phone)
        ├── <BackToTop />
        └── <Suspense> <ChatBot />                   # Non-blocking AI Assistant
```

### Detailed Component Summary

| Component | Path | Key Props / State | Responsibilities & Architecture |
|---|---|---|---|
| **`App.jsx`** | `src/App.jsx` | `isScrolled`, `isLoading`, `shouldMountChatBot` | Root coordinator. Listens to `window.scroll` via `requestAnimationFrame`. Mounts ChatBot via `requestIdleCallback` (fallback 1600ms) to ensure non-blocking initial paint. |
| **`Navbar.jsx`** | `src/components/layout/Navbar.jsx` | `isScrolled` (prop), `isOpen` (mobile drawer) | Sticky glassmorphic navbar. Smooth-scrolls to `#home`, `#about`, `#portfolio`, `#instagram`, `#contact`. Houses brand badge, desktop menu, mobile animated hamburger (`HiMenuAlt3`/`HiX`), and theme toggle (`FiSun`/`FiMoon`). |
| **`Hero.jsx`** | `src/components/sections/Hero.jsx` | `currentSlide`, slide timer, `isAutoRotatePaused` | Full-screen hero section. Displays headline, bio teaser, CTA buttons ("Explore My Work", "My Story"), slide counter (01/05), location tag, and accessible auto-rotation controls. |
| **`PortfolioSection.jsx`** | `src/components/sections/PortfolioSection.jsx` | `selectedCategory`, `fullscreenIndex` | Category-driven portfolio section. Renders 5 interactive category cards (Nature, Sky, Village, Travel, Portrait); clicking a category opens a responsive photo arrangement gallery, where selecting any photo launches `ImageViewer` in fullscreen. |
| **`FilmStrip.jsx`** | `src/components/portfolio/FilmStrip.jsx` | CSS infinite ticker | Cinematic vintage film-strip animation running continuously across screen with border sprocket holes and preview frames. |
| **`About.jsx`** | `src/components/sections/About.jsx` | `inView` trigger, `isVideoModalOpen` | Photographer biography, philosophy, cursive signature, glass stat counter, 6 expertise cards, and journey-video card with accessible modal dialog. |
| **`InstagramFeed.jsx`** | `src/components/sections/InstagramFeed.jsx` | `posts`, `profile`, `isLoading`, `isLiveFeed` | Live Instagram visual diary section. Connects to Behold.so JSON feed with fallback highlights gallery, profile badge, 3x3 photo grid, and follow button. |
| **`Contact.jsx`** | `src/components/sections/Contact.jsx` | `formData`, `status`, `isSubmitting` | Production-ready contact form supporting Formspree with client-side validation, error handling, labeled inputs, and direct contact cards. |
| **`Footer.jsx`** | `src/components/layout/Footer.jsx` | None | Multi-column footer containing brand statement, navigation shortcuts, photography categories list, and copyright. |
| **`BottomNav.jsx`** | `src/components/layout/BottomNav.jsx` | `activeTab` | Mobile-only (`md:hidden`) fixed glassmorphism bottom navigation dock. Synchronizes active indicator with current scroll position across `#home`, `#about`, `#portfolio`, `#instagram`, `#contact`. |
| **`BackToTop.jsx`** | `src/components/ui/BackToTop.jsx` | `isVisible` | Floating circular gold action button rendered when `scrollY > 400px`, smoothly scrolling user back to top. |
| **`ChatBot.jsx`** | `src/components/ui/ChatBot.jsx` | `messages`, `isOpen`, `isLoading`, `inputText` | Floating interactive AI photography guide with safe-area spacing. Sends conversation history to Groq Cloud endpoint. Features custom markdown renderer for tables, bullet lists, bold text, and quick-prompt chips. |
| **`ImageViewer.jsx`** | `src/components/ui/ImageViewer.jsx` | `images`, `currentIndex`, `isOpen`, `onClose` | Fullscreen modal lightbox supporting keyboard navigation (`Esc` to close, `ArrowLeft`/`ArrowRight` to navigate), swipe gesture support, and backdrop click dismiss. |

---

## 5. Theming & Design Token System

The styling system is built on **CSS Custom Properties** defined in `src/index.css` and mapped to Tailwind utilities in `tailwind.config.js`.

### 1. How Theming Works
1. `src/context/ThemeContext.jsx` manages the active theme (defaults to `'dark'`).
2. Persisted to `sessionStorage.getItem('app-theme')` so that each new tab or fresh visitor session defaults to the signature cinematic dark look.
3. Sets `data-theme` attribute on `document.documentElement`:
   - `dark` (default): `:root` variables apply.
   - Any other theme: `[data-theme='theme-id']` variables override the root tokens.

### 2. Core Color Token Mapping

| CSS Token | Default Dark (`:root`) | Day Mode (`[data-theme='day']`) | Tailwind Utility |
|---|---|---|---|
| `--color-bg-primary` | `#050505` | `#ffffff` | `bg-theme-bg` |
| `--color-bg-secondary` | `#0a0a0a` | `#f3f4f6` | `bg-theme-bg-sec` |
| `--color-bg-card` | `rgba(26, 26, 26, 0.9)` | `rgba(255, 255, 255, 0.9)` | `bg-theme-card` |
| `--color-text-primary` | `#f3f4f6` | `#111827` | `text-theme-text` |
| `--color-text-secondary` | `#9ca3af` | `#374151` | `text-theme-text-sec` |
| `--color-border` | `rgba(45, 45, 45, 0.5)` | `rgba(209, 213, 219, 1)` | `border-theme-border` |
| `--color-gold` | `#d4af37` | `#d4af37` | `text-gold`, `bg-gold` |
| `--color-gold-light` | `#e8c547` | `#e8c547` | `text-gold-light` |
| `--color-gold-dark` | `#b8941f` | `#b8941f` | `text-gold-dark` |
| `--color-gold-rgb` | `212, 175, 55` | `212, 175, 55` | Used in `rgba()` gradients & glows |

### 3. Typography
Configured in `index.html` via Google Fonts and mapped in `tailwind.config.js`:
- **Heading / Accents**: `'Playfair Display', serif` (`font-playfair`)
- **Body / Interface**: `'Inter', sans-serif` (`font-inter`)
- **Secondary / Subheadings**: `'Poppins', sans-serif` (`font-poppins`)

---

## 6. Image & Asset Processing Pipeline

### 1. Storage Organization
All public assets reside in `public/images/` partitioned by category:
- `public/images/nature/`
- `public/images/sky/`
- `public/images/village/`
- `public/images/travel/`
- `public/images/portrait/`
- `public/images/featured/`
- `public/images/hero/`

### 2. Automated WebP Optimization (`scripts/convert-images.js`)
The project utilizes `sharp` to convert source JPEG/PNG images into high-efficiency WebP files:
- **Command**: `npm run convert-images`
- **Output 1 (Full)**: `<filename>.webp` resized to max width `1920px`, quality `80`.
- **Output 2 (Thumb)**: `<filename>-thumb.webp` resized to max width `800px`, quality `80`.
- **Smart Skip**: Checks filesystem modification timestamps (`mtimeMs`) and skips images that have already been converted unless the original is updated.

### 3. Referencing Images in Components
Always use absolute web paths starting with `/images/...`:
```javascript
// Example
const imagePath = '/images/nature/IMG_20260228_172521.webp'
```

---

## 7. AI Photography Guide (`ChatBot.jsx`)

### 1. Provider & Inference Details
- **Provider**: Groq Cloud REST API
- **Endpoint**: `POST https://api.groq.com/openai/v1/chat/completions`
- **Model**: `openai/gpt-oss-120b` (low latency, high reasoning fidelity)
- **API Key**: `import.meta.env.VITE_GROQ_API_KEY` (configured in `.env.local`)
- **Temperature**: `0.6`
- **Max Tokens**: `200`

### 2. Prompt Behavior & Guardrails
- Instructed as a concise photography guide for Rohan Jha's portfolio.
- **Constraints**:
  - Ultra-short & punchy responses (2-4 bullet points or under 80 words total).
  - Practical exposure formulas (Aperture $f$-stop, Shutter speed, ISO).
  - No bloated markdown tables or huge headings.
- Custom parsing functions (`renderInlineFormatted` and `formatMessage`) render markdown bold, italic, code, bullets, and tables into bespoke Tailwind elements.

---

## 8. Environment Variables Reference

| Variable Name | Required? | Location | Description |
|---|---|---|---|
| `VITE_GROQ_API_KEY` | **Yes** (for AI chatbot) | `.env.local` | Groq Cloud API key used in `ChatBot.jsx` |
| `VITE_CONTACT_FORM_ENDPOINT` | Optional | `.env.local` | Formspree or custom backend endpoint for `Contact.jsx` |
| `VITE_WEB3FORMS_KEY` | Optional | `.env.local` | Web3Forms access key if using Web3Forms submission |

*Note: Never commit `.env.local` to version control. Reference template is kept in `.env.example`.*

---

## 9. Common Developer & AI Model Playbook

### Task 1: Adding New Photos to an Existing Category
1. Place raw images (`.jpg` or `.png`) into `public/images/<category>/`.
2. Run conversion:
   ```bash
   npm run convert-images
   ```
3. Open `src/components/sections/PortfolioSection.jsx`.
4. Add the new `.webp` file path into the corresponding array inside `CATEGORIES[i].images`.

### Task 2: Adding a New Portfolio Category
1. Create directory `public/images/<new_category>/` and populate with WebP images.
2. In `src/components/sections/PortfolioSection.jsx`, append the new category object to `CATEGORIES`.

### Task 3: Modifying Brand Content or Contact Information
- **Photographer Name & Titles**: `src/components/sections/Hero.jsx` and `src/components/layout/Navbar.jsx`.
- **Bio & Skills**: `src/components/sections/About.jsx`.
- **Contact Details & Email**: `src/components/sections/Contact.jsx`.
- **Social Media Links**: `src/components/layout/Footer.jsx` and `src/components/sections/Contact.jsx`.

### Task 4: Re-enabling the Contact Form
- `Contact.jsx` is fully implemented in `src/components/sections/Contact.jsx`.
- To show it on the landing page, import `Contact` into `src/App.jsx` and add `<Contact />` right before `<Footer />`.

---

## 10. Rules & Guardrails for AI Assistants

When modifying this repository, any AI assistant MUST adhere to the following:

1. **Preserve Theming Tokens**: Do not hardcode arbitrary hex backgrounds or text colors. Use `text-theme-text`, `bg-theme-bg`, `text-gold`, `border-theme-border`, or `var(--color-...)` so all themes remain functional.
2. **Preserve Responsive Layouts**: Test or ensure classes accommodate 3 primary breakpoints:
   - Mobile: `< 640px` (single column, full width)
   - Tablet: `640px - 1024px` (`sm:`, `md:`)
   - Desktop: `> 1024px` (`lg:`, `xl:`)
3. **Z-Index Layering Order**:
   - `z-10`: FilmStrip and section decorative elements
   - `z-50`: Floating `Navbar` and `ChatBot` closed trigger
   - `z-[60]` / `z-[100]`: Mobile menus & `SettingsPanel` drawer
   - `z-[99999]`: `ImageViewer` modal lightbox
   - `z-[999999]`: Global `LoadingScreen`
4. **Non-blocking Chatbot**: Keep the ChatBot dynamically imported or deferred via `requestIdleCallback` to maintain top Lighthouse performance scores.
5. **No Placeholders**: Do not insert broken placeholder image URLs. Always use existing WebP assets from `public/images/`.
