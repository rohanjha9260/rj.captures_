import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import {
  FiMapPin,
  FiSun,
  FiHome,
  FiUser,
  FiCamera,
  FiPlay,
  FiX,
} from 'react-icons/fi'

const STATS = [
  { value: '5+', label: 'Categories' },
  { value: '200+', label: 'Photos' },
  { value: '3+', label: 'Years Journey' },
  { value: '∞', label: 'Stories to Capture' },
]

const EXPERTISE = [
  {
    title: 'Nature',
    subtitle: 'Photography',
    icon: (
      <svg
        className="w-5 h-5 text-gold flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m8 17 4-5 4 5M3 20l6-9 4 5 5-8 3 12H3z"
        />
      </svg>
    ),
  },
  {
    title: 'Sky & Sunset',
    subtitle: 'Photography',
    icon: <FiSun className="w-5 h-5 text-gold flex-shrink-0" />,
  },
  {
    title: 'Village Life',
    subtitle: 'Photography',
    icon: <FiHome className="w-5 h-5 text-gold flex-shrink-0" />,
  },
  {
    title: 'Travel',
    subtitle: 'Photography',
    icon: (
      <svg
        className="w-5 h-5 text-gold flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    title: 'Portrait',
    subtitle: 'Photography',
    icon: <FiUser className="w-5 h-5 text-gold flex-shrink-0" />,
  },
  {
    title: 'Cinematic',
    subtitle: 'Storytelling',
    icon: <FiCamera className="w-5 h-5 text-gold flex-shrink-0" />,
  },
]

export default function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const closeButtonRef = useRef(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!isVideoModalOpen) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVideoModalOpen])

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto overflow-hidden text-white"
    >
      {/* ── Background Subtle Glow ── */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════════
          1. TOP HERO: BIO (LEFT) + PHOTOGRAPHER PHOTO (RIGHT BLENDED)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-between overflow-hidden rounded-3xl mb-12 sm:mb-16">
        {/* ── Photographer Photo (Positioned on Right & Blended into Darkness) ── */}
        <div className="absolute right-0 top-0 bottom-0 w-3/4 sm:w-7/12 lg:w-1/2 pointer-events-none z-0">
          <img
            src="/images/profile.webp"
            alt="Rohan Jha — Photographer"
            className="w-full h-full object-cover object-top sm:object-center opacity-90 sm:opacity-95"
          />
          {/* Left-edge smooth fade to black */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 sm:via-black/50 to-transparent" />
          {/* Bottom & Top soft darkening */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        {/* ── Left Content: About Me, Title, Location, Bio, Signature ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md sm:max-w-lg pr-4 py-8"
        >
          {/* Overline with small gold line */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-gold rounded-full" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-white/70 uppercase">
              About Me
            </span>
          </div>

          {/* Name: Rohan Jha in Large Playfair Display */}
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg leading-tight">
            <span className="bg-gradient-to-r from-white via-[#f7e6b5] to-[#d4af37] bg-clip-text text-transparent">
              Rohan Jha
            </span>
          </h2>

          {/* Subtitle / Location */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/75 font-medium mt-2">
            <span>Photographer</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1 text-white/80">
              <FiMapPin className="text-gold text-xs" />
              Delhi, India
            </span>
          </div>

          {/* Narrative Bio */}
          <p className="text-white/80 text-xs sm:text-sm sm:text-base leading-relaxed font-light mt-4 max-w-md drop-shadow">
            I am a passionate photographer capturing the beauty of nature, skies,
            and village life through cinematic visuals. Every frame tells a story,
            and I strive to preserve the raw emotions and breathtaking moments that
            our world offers.
          </p>

          {/* Cursive Signature: Rohan Jha */}
          <div className="mt-4 pt-1">
            <span className="font-serif italic text-3xl sm:text-4xl text-gold/90 font-light tracking-wide select-none drop-shadow-md">
              Rohan Jha
            </span>
          </div>

          {/* Small Gold Divider */}
          <div className="w-14 h-[1.5px] bg-gold/70 mt-3 rounded-full shadow-gold-glow" />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. HORIZONTAL STATS (Borderless & Open Flow)
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mb-14 sm:mb-16 py-6 border-y border-white/10 flex items-center justify-between divide-x divide-white/10 text-center"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex-1 px-1 sm:px-3">
            <span className="block font-playfair text-xl sm:text-3xl font-bold text-gold leading-tight drop-shadow">
              {stat.value}
            </span>
            <span className="block text-[9px] sm:text-xs font-sans tracking-wider uppercase text-white/60 font-medium mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          3. MY EXPERTISE (Borderless & Cinematic Typography)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="mb-14 sm:mb-16">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-6 h-[1.5px] bg-gold rounded-full" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">
            My Expertise
          </span>
        </div>

        {/* 6 Expertise Items (Borderless & Open) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 sm:gap-x-8">
          {EXPERTISE.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group flex items-start gap-3.5 text-left py-1"
            >
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="leading-tight">
                <span className="block text-xs sm:text-sm font-semibold text-white/95 group-hover:text-gold transition-colors">
                  {item.title}
                </span>
                <span className="block text-[11px] sm:text-xs text-white/60 font-light mt-1">
                  {item.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          4. BEHIND THE LENS (QUOTE) + GLIMPSE OF MY JOURNEY (VIDEO CARD)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="mb-12 sm:mb-14">
        {/* Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-[1.5px] bg-gold rounded-full" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">
            Behind the Lens
          </span>
        </div>

        {/* Quote in Gold Serif */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <blockquote className="font-playfair italic text-xl sm:text-3xl text-gold font-normal leading-snug drop-shadow-md">
            &ldquo;Finding extraordinary beauty in ordinary moments.&rdquo;
          </blockquote>
          <div className="w-12 h-[1.5px] bg-gold/70 mt-3 rounded-full" />
        </motion.div>

        {/* Video / Glimpse Card */}
        <motion.button
          type="button"
          aria-label="Watch a glimpse of my journey"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={() => setIsVideoModalOpen(true)}
          className="w-full text-left group relative aspect-[16/8] sm:aspect-[16/7] rounded-3xl overflow-hidden border border-white/15 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-2xl bg-black cursor-pointer transition-all duration-300 block"
        >
          {/* Landscape Photo Silhouette */}
          <img
            src="/images/hero/IMG_20241015_162056.webp"
            alt="Photographer at golden sunset over horizon"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Dark Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:bg-black/35 transition-colors duration-300" />

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-white/20 border border-white/50 backdrop-blur-md flex items-center justify-center text-white shadow-2xl group-hover:scale-115 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-300">
              <FiPlay className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-current" />
            </div>
          </div>

          {/* Bottom Right Caption: A Glimpse of My Journey */}
          <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-7 flex items-center gap-2">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white/80 font-medium uppercase drop-shadow">
              A Glimpse of My Journey
            </span>
            <span className="w-5 h-px bg-gold" />
          </div>
        </motion.button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          5. CTA BUTTON: EXPLORE MY WORK →
          ══════════════════════════════════════════════════════════════════ */}
      <div className="text-center pt-2">
        <button
          onClick={scrollToPortfolio}
          className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-[#e8c547] via-[#dfb93c] to-[#d4af37] text-black shadow-lg shadow-gold/25 hover:shadow-gold/45 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Explore My Work</span>
          <span className="font-sans font-bold">→</span>
        </button>
      </div>

      {/* ── Journey Video Modal (When Play Button Clicked) ── */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="A Glimpse of My Journey Video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold text-white text-xl transition-colors cursor-pointer"
              aria-label="Close video preview"
            >
              <FiX />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-black relative"
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed?listType=user_uploads&list=rohanjha9260&autoplay=1"
                title="Rohan Jha — Photography Journey"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
