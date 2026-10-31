import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiPlay,
  FiPause,
} from 'react-icons/fi'

// 5 curated cinematic wallpapers matching the luxury aesthetic in the design
const SLIDES = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop&q=85',
    alt: 'Golden mountain sunset over fjord and lake',
  },
  {
    id: 2,
    image: '/images/hero/IMG_20250411_182007~2.webp',
    alt: 'Serene nature landscape at dusk',
  },
  {
    id: 3,
    image: '/images/sky/IMG_20250730_161227.webp',
    alt: 'Golden celestial sunset sky',
  },
  {
    id: 4,
    image: '/images/hero/IMG_20250821_174734~2.webp',
    alt: 'Village cultural twilight moment',
  },
  {
    id: 5,
    image: '/images/hero/IMG_20251001_204952.webp',
    alt: 'Atmospheric journey and night lights',
  },
]

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: FiInstagram,
    url: 'https://instagram.com/rj.captures_',
  },
  {
    name: 'YouTube',
    icon: FiYoutube,
    url: 'https://youtube.com/@rohanjha9260?si=uY4cwqZbCVowMrln',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    url: 'https://www.linkedin.com/in/rohan-jha-027581290',
  },
  {
    name: 'GitHub',
    icon: FiGithub,
    url: 'https://github.com/RohanJha-dev',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoRotatePaused, setIsAutoRotatePaused] = useState(false)
  const [isControlFocused, setIsControlFocused] = useState(false)

  // Auto-advance slides every 7 seconds when rotation is enabled
  useEffect(() => {
    if (isAutoRotatePaused || isControlFocused) return undefined

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [isAutoRotatePaused, isControlFocused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNext = () => {
    const nextSection =
      document.getElementById('portfolio') ||
      document.getElementById('about') ||
      document.getElementById('instagram')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen h-[100dvh] overflow-hidden bg-black text-white flex flex-col justify-between select-none"
    >
      {/* ── Layer 1: Background Carousel Slides with Ken Burns Effect ── */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].alt}
              className="w-full h-full object-cover object-center"
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Layer 2: Atmospheric & Vignette Gradients ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-0 hero-vignette pointer-events-none z-1" />
      </div>

      {/* ── Spacer for Top Navbar ── */}
      <div className="h-20 sm:h-24 w-full relative z-10" />

      {/* ── Layer 3: Main Left-Aligned Hero Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-4 sm:py-6 flex-1 flex flex-col justify-center">
        <div className="max-w-xl">
          {/* Overline Category */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2.5 sm:mb-3"
          >
            <span className="text-[11px] sm:text-xs tracking-[0.28em] font-semibold uppercase text-white/75">
              Cinematic Photography
            </span>
          </motion.div>

          {/* Main Title: RJ Captures */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] drop-shadow-2xl">
              <span className="text-white">RJ </span>
              <span className="bg-gradient-to-r from-[#ffffff] via-[#f7e6b5] to-[#d4af37] bg-clip-text text-transparent">
                Captures
              </span>
            </h1>
          </motion.div>

          {/* Subtitle Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-2.5 sm:mt-3"
          >
            <p className="text-xs sm:text-sm tracking-[0.22em] uppercase font-medium text-white/80">
              Capturing Nature · Sky · Village Life
            </p>
          </motion.div>

          {/* Small Horizontal Gold Accent Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{ transformOrigin: 'left' }}
            className="w-14 h-[2px] bg-gold my-4 sm:my-5 rounded-full shadow-gold-glow"
          />

          {/* Poetic Narrative / Story Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <p className="font-playfair text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-sm sm:max-w-md">
              Every frame holds a story.
              <br />
              I capture the moments that deserve to last forever.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-xs sm:max-w-none"
          >
            {/* Primary Gold Pill Button */}
            <button
              onClick={scrollToPortfolio}
              className="group relative px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-[#e8c547] via-[#dfb93c] to-[#d4af37] text-black shadow-lg shadow-gold/25 hover:shadow-gold/45 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore My Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </button>

            {/* Secondary Glass Outline Pill Button */}
            <button
              onClick={scrollToAbout}
              className="px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-widest uppercase border border-gold/50 text-white bg-black/25 backdrop-blur-sm hover:border-gold hover:bg-gold/15 hover:text-gold hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              My Story
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Layer 4: Slide Indicator (01 | 05) & Pause/Resume Control ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onFocus={() => setIsControlFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsControlFocused(false)
          }
        }}
        className="absolute right-5 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-20"
      >
        <button
          type="button"
          onClick={nextSlide}
          title="Next slide"
          aria-label="Next slide"
          className="flex flex-col items-center gap-2 p-1.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
        >
          <span className="font-inter text-xs sm:text-sm font-medium text-white group-hover:text-gold transition-colors tracking-widest">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <div className="w-[1.5px] h-8 sm:h-10 bg-gold/50 group-hover:bg-gold transition-colors rounded-full" />
          <span className="font-inter text-xs sm:text-sm font-light text-white/50 tracking-widest">
            {String(SLIDES.length).padStart(2, '0')}
          </span>
        </button>

        {/* Pause / Resume Control */}
        <button
          type="button"
          onClick={() => setIsAutoRotatePaused((prev) => !prev)}
          title={isAutoRotatePaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          aria-label={isAutoRotatePaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          className="p-1.5 rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-gold hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all cursor-pointer"
        >
          {isAutoRotatePaused ? (
            <FiPlay className="w-3 h-3 fill-current" />
          ) : (
            <FiPause className="w-3 h-3" />
          )}
        </button>
      </motion.div>

      {/* ── Layer 5: Bottom Section (Scroll Down on Left + Delhi India Pill on Right) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-20 sm:pb-8 flex items-end justify-between">
        {/* Scroll Down Indicator */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col items-start gap-1 cursor-pointer group text-left"
          aria-label="Scroll down"
        >
          <div className="w-5 h-8 rounded-full border border-white/45 group-hover:border-gold flex justify-center pt-1.5 transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.9, 0.2, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-gold"
            />
          </div>
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-white/60 group-hover:text-gold uppercase font-medium mt-1 transition-colors">
            Scroll Down
          </span>
          <div className="w-px h-6 sm:h-8 bg-white/20 group-hover:bg-gold/60 ml-2.5 transition-colors" />
        </motion.button>

        {/* Location Pill & Socials */}
        <div className="flex flex-col items-end gap-3">
          {/* Delhi India Pill (Matches Mobile Mockup Screen 1) */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-gold/30 shadow-lg text-xs text-white/90">
            <FiMapPin className="text-gold text-xs" />
            <span className="tracking-wider text-[11px] font-medium uppercase">
              Delhi, India
            </span>
          </div>

          {/* Social Icons for Desktop */}
          <div className="hidden sm:flex items-center gap-4 text-white/70">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  className="hover:text-gold hover:scale-115 active:scale-95 transition-all duration-300 p-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
