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
        │   └── Footer.jsx           # Brand footer, sitemap links, services list, contact info
        ├── portfolio/
        │   ├── FilmStrip.jsx        # Infinite horizontally scrolling photographic film reel
        │   └── PortfolioCarousel.jsx# Categorized Swiper image gallery with full lightbox view
        ├── sections/
        │   ├── Hero.jsx             # Full-screen hero with carousel, tagline, quick stats
        │   ├── About.jsx            # Bio, photographer narrative, gear & skills tags
        │   ├── FeaturedWork.jsx     # Dynamic masonry grid showcasing highlights
        │   └── Contact.jsx          # Full contact form with Formspree/Web3Forms logic
        └── ui/
            ├── BackToTop.jsx        # Floating back-to-top button appearing after 400px scroll
            ├── ChatBot.jsx          # Photography AI assistant using Groq API
            ├── ImageViewer.jsx      # High-performance fullscreen image lightbox with keyboard controls
            ├── SettingsPanel.jsx    # Slide-over panel for multi-theme selection
            └── SocialLinks.jsx      # Interactive social media cards (Instagram, YouTube, etc.)
```

---

## 4. Component Architecture & Data Flow

```
main.jsx
└── <ThemeProvider>
    └── <App>
        ├── <AnimatePresence> LoadingScreen (0-900ms initial load)
        ├── <Navbar isScrolled={isScrolled} />
        ├── <Hero />
        ├── <FilmStrip />
        ├── <About />
        ├── #portfolio wrapper
        │   ├── <PortfolioCarousel category="nature" ... />
        │   ├── <PortfolioCarousel category="sky" ... />
        │   ├── <PortfolioCarousel category="village" ... />
        │   ├── <PortfolioCarousel category="travel" ... />
        │   └── <PortfolioCarousel category="portrait" ... />
        ├── <FeaturedWork />
        ├── <SocialLinks />
        ├── <Footer />
        ├── <BackToTop />
        └── <Suspense> <ChatBot /> (Lazy loaded after idle/timeout)
```

### Detailed Component Summary

| Component | Path | Key Props / State | Responsibilities & Architecture |
|---|---|---|---|
| **`App.jsx`** | `src/App.jsx` | `isScrolled`, `isLoading`, `shouldMountChatBot` | Root coordinator. Listens to `window.scroll` via `requestAnimationFrame`. Mounts ChatBot via `requestIdleCallback` (fallback 1600ms) to ensure non-blocking initial paint. |
| **`Navbar.jsx`** | `src/components/layout/Navbar.jsx` | `isScrolled` (prop), `isOpen` (mobile drawer) | Sticky glassmorphic navbar. Smooth-scrolls to `#home`, `#about`, `#portfolio`, `#social`. Houses brand badge, desktop menu, mobile animated hamburger (`HiMenuAlt3`/`HiX`), and theme toggle (`FiSun`/`FiMoon`). |
| **`Hero.jsx`** | `src/components/sections/Hero.jsx` | `currentSlide`, slide timer | Full-screen hero section. Displays headline, bio teaser, CTA buttons ("Explore Work", "Connect"), and photographer stats (5+ Years, 50k+ Shots, 100+ Stories). |
| **`FilmStrip.jsx`** | `src/components/portfolio/FilmStrip.jsx` | CSS infinite ticker | Cinematic vintage film-strip animation running continuously across screen with border sprocket holes and preview frames. |
| **`About.jsx`** | `src/components/sections/About.jsx` | `inView` trigger | Photographer biography, philosophy, photography focus pills (Landscape, Portrait, Street, Astro), and featured framed portrait (`profile.webp`). |
| **`PortfolioCarousel.jsx`** | `src/components/portfolio/PortfolioCarousel.jsx` | `id`, `title`, `category`, `description` | Category gallery. Shuffles up to 8 images on mount from static collection, renders a responsive Swiper carousel (1 slide on mobile, 2 on tablet, 3 on desktop), and opens `ImageViewer` on click. |
| **`FeaturedWork.jsx`** | `src/components/sections/FeaturedWork.jsx` | `viewerOpen`, `viewerIndex` | Masonry grid with custom responsive aspect ratios (`masonry-tall`, `masonry-wide`) featuring top curated photographs with hover zooms and metadata overlays. |
| **`SocialLinks.jsx`** | `src/components/ui/SocialLinks.jsx` | None | Cards linking to social platforms: Instagram, YouTube, LinkedIn, GitHub, Twitter/X, with custom hover gradients. |
| **`Contact.jsx`** | `src/components/sections/Contact.jsx` | `formData`, `status`, `isSubmitting` | Production-ready contact form supporting Formspree or Web3Forms with client-side validation, error handling, and animated success confirmation. |
| **`Footer.jsx`** | `src/components/layout/Footer.jsx` | None | Multi-column footer containing brand statement, navigation shortcuts, photography services list, copyright, and direct email link (`rjcaptures.photography@gmail.com`). |
| **`BackToTop.jsx`** | `src/components/ui/BackToTop.jsx` | `isVisible` | Floating circular gold action button rendered when `scrollY > 400px`, smoothly scrolling user back to top. |
| **`ChatBot.jsx`** | `src/components/ui/ChatBot.jsx` | `messages`, `isOpen`, `isLoading`, `inputText` | Floating interactive AI photography guide. Sends conversation history to Groq Cloud endpoint. Features custom markdown renderer for tables, bullet lists, bold text, and quick-prompt chips. |
| **`ImageViewer.jsx`** | `src/components/ui/ImageViewer.jsx` | `images`, `currentIndex`, `isOpen`, `onClose` | Fullscreen modal lightbox supporting keyboard navigation (`Esc` to close, `ArrowLeft`/`ArrowRight` to navigate), swipe gesture support, and backdrop click dismiss. |
| **`SettingsPanel.jsx`** | `src/components/ui/SettingsPanel.jsx` | `isOpen`, `onClose` | Slide-out drawer displaying visual cards to select between different nature-inspired and day/night themes. |

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
3. Open `src/components/portfolio/PortfolioCarousel.jsx`.
4. Add the new `.webp` file path into the corresponding array inside `baseImages.<category>`.

### Task 2: Adding a New Portfolio Category
1. Create directory `public/images/<new_category>/` and populate with WebP images.
2. In `src/components/portfolio/PortfolioCarousel.jsx`, append `<new_category>` to `baseImages`.
3. In `src/App.jsx`, add a new `<PortfolioCarousel>` instance under `#portfolio`:
   ```jsx
   <PortfolioCarousel
     id="new_cat"
     title="New Category Title"
     category="new_cat"
     description="Description of this photo series..."
   />
   ```

### Task 3: Modifying Brand Content or Contact Information
- **Photographer Name & Titles**: `src/components/sections/Hero.jsx` and `src/components/layout/Navbar.jsx`.
- **Bio & Skills**: `src/components/sections/About.jsx`.
- **Contact Details & Email**: `src/components/layout/Footer.jsx` and `src/components/sections/Contact.jsx`.
- **Social Media Links**: `src/components/ui/SocialLinks.jsx` and `src/components/layout/Footer.jsx`.

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
