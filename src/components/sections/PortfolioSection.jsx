import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiX, FiMaximize2 } from 'react-icons/fi'
import { useInView } from '../../hooks/useInView'
import ImageViewer from '../ui/ImageViewer'

const CATEGORIES = [
  {
    id: 'nature',
    num: '01',
    title: 'Nature Photography',
    description: 'Landscapes, forests and the raw beauty of nature',
    thumbnail: '/images/nature/IMG_20260228_172521.webp',
    images: [
      '/images/nature/IMG_20260228_172521.webp',
      '/images/nature/IMG_20260304_081602.webp',
      '/images/nature/IMG_20260304_165317.webp',
      '/images/nature/IMG_20260307_182107.webp',
      '/images/nature/IMG_20260310_125032~2.webp',
      '/images/nature/IMG_20260310_125041.webp',
    ],
  },
  {
    id: 'sky',
    num: '02',
    title: 'Sky Photography',
    description: 'Sunsets, clouds and celestial moments',
    thumbnail: '/images/sky/IMG_20250730_161227.webp',
    images: [
      '/images/sky/IMG-20240825-WA0037.webp',
      '/images/sky/IMG_20250730_161227.webp',
      '/images/sky/IMG_20250928_125653.webp',
      '/images/sky/IMG_20260511_182543.webp',
    ],
  },
  {
    id: 'village',
    num: '03',
    title: 'Village Photography',
    description: 'Stories of culture and rural life',
    thumbnail: '/images/village/IMG_20230625_170128.webp',
    images: [
      '/images/village/IMG20190727165427~2.webp',
      '/images/village/IMG_20220513_181151.webp',
      '/images/village/IMG_20230625_170128.webp',
      '/images/village/IMG_20250409_142547.webp',
      '/images/village/IMG_20250906_164119.webp',
    ],
  },
  {
    id: 'travel',
    num: '04',
    title: 'Travel Photography',
    description: 'Places, people and unforgettable journeys',
    thumbnail: '/images/travel/IMG_20241201_162759~2.webp',
    images: [
      '/images/travel/IMG-20260129-WA0113.webp',
      '/images/travel/IMG_20241129_185851~2.webp',
      '/images/travel/IMG_20241201_162759~2.webp',
      '/images/travel/IMG_20250716_142310.webp',
      '/images/travel/IMG_20260127_210047.webp',
      '/images/travel/IMG_20260128_110708.webp',
    ],
  },
  {
    id: 'portrait',
    num: '05',
    title: 'Portrait Photography',
    description: 'People, emotions and real stories',
    thumbnail: '/images/portrait/IMG_20260104_141749.webp',
    images: [
      '/images/portrait/IMG_20260104_141749.webp',
      '/images/portrait/IMG_20260218_130129.webp',
      '/images/portrait/IMG_20260405_132005.webp',
      '/images/portrait/IMG_20260522_203539.webp',
    ],
  },
]

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [fullscreenIndex, setFullscreenIndex] = useState(null)
  const triggerRef = useRef(null)
  const closeButtonRef = useRef(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Prevent background scrolling and focus close button when gallery modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCategory])

  // Close gallery view on Escape if fullscreen viewer is not active, and restore focus to trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCategory && fullscreenIndex === null) {
        setSelectedCategory(null)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCategory, fullscreenIndex])

  const openCategory = (cat, e) => {
    triggerRef.current = e?.currentTarget || (typeof document !== 'undefined' ? document.activeElement : null)
    setSelectedCategory(cat)
    setFullscreenIndex(null)
  }

  const closeCategoryGallery = () => {
    setSelectedCategory(null)
    setFullscreenIndex(null)
    triggerRef.current?.focus()
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* ── Section Header (Matches Screen 2: OUR WORK / Portfolio) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-10 sm:mb-14"
      >
        <span className="text-gold text-xs sm:text-sm tracking-[0.28em] font-semibold uppercase block mb-2">
          Our Work
        </span>
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Portfolio
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mt-3 font-light leading-relaxed">
          Explore different worlds through my lens. Each category tells a unique story.
        </p>
      </motion.div>

      {/* ── Category List (Borderless & Cinematic layout) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        {CATEGORIES.map((cat, index) => (
          <motion.button
            key={cat.id}
            type="button"
            aria-label={`Open ${cat.title} photo gallery`}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={(e) => openCategory(cat, e)}
            className="w-full text-left group relative flex items-center justify-between py-4 px-2 sm:px-4 rounded-xl border-b border-white/10 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all duration-300 cursor-pointer bg-transparent hover:bg-white/[0.02]"
          >
            {/* Left: Thumbnail + Titles */}
            <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0 pr-3">
              {/* Thumbnail */}
              <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-gold/40 transition-colors">
                <img
                  src={cat.thumbnail}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <span className="font-inter text-gold text-xs sm:text-sm font-semibold tracking-wider block">
                  {cat.num}
                </span>
                <h3 className="font-playfair text-base sm:text-xl font-bold text-white group-hover:text-gold transition-colors truncate">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 line-clamp-1 sm:line-clamp-2 mt-0.5 font-light">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Right: Circular Arrow Action */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold/40 group-hover:border-gold group-hover:bg-gold flex items-center justify-center text-gold group-hover:text-black transition-all duration-300 flex-shrink-0 shadow-sm">
              <span className="text-base sm:text-lg font-bold font-sans transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* ── Step 1: Category Photos Arrangement Gallery Overlay ── */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCategory.title} Photo Gallery`}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl overflow-y-auto flex flex-col"
          >
            {/* Sticky Top Bar */}
            <div className="sticky top-0 z-30 bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between shadow-lg">
              <button
                type="button"
                onClick={closeCategoryGallery}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 !text-white/80 hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-all text-xs sm:text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                aria-label="Back to Portfolio Categories"
              >
                <FiArrowLeft className="w-4 h-4 !text-gold" />
                <span className="!text-white/80">Categories</span>
              </button>

              <div className="text-center px-2">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] !text-gold uppercase block">
                  {selectedCategory.num} • {selectedCategory.images.length} Photos
                </span>
                <h3 className="font-playfair text-sm sm:text-lg font-bold !text-white truncate max-w-[180px] sm:max-w-md">
                  {selectedCategory.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCategoryGallery}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 !text-white/80 hover:text-gold hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                aria-label="Close Gallery View"
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5 !text-gold" />
              </button>
            </div>

            {/* Gallery Arrangement Body */}
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 pb-[calc(6rem+env(safe-area-inset-bottom))]">
              {/* Category Subtitle */}
              <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm !text-white/70 font-light leading-relaxed mb-1.5">
                  {selectedCategory.description}
                </p>
                <span className="text-[11px] !text-gold/80 tracking-wide font-sans">
                  Click any photograph to open in fullscreen lightbox
                </span>
              </div>

              {/* Photos Grid Arrangement */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {selectedCategory.images.map((img, idx) => (
                  <motion.button
                    key={`${selectedCategory.id}-${idx}`}
                    type="button"
                    aria-label={`View photo ${idx + 1} of ${selectedCategory.title} in fullscreen`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    onClick={() => setFullscreenIndex(idx)}
                    className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-gold/60 bg-theme-card/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold text-left cursor-pointer shadow-md hover:shadow-gold-sm"
                  >
                    <img
                      src={img}
                      alt={`${selectedCategory.title} capture ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient & Hover Expand Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
                      <span className="text-[11px] font-sans font-medium !text-white/90 tracking-wider">
                        {String(idx + 1).padStart(2, '0')} / {String(selectedCategory.images.length).padStart(2, '0')}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold/20 border border-gold/60 text-gold flex items-center justify-center shadow">
                        <FiMaximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Step 2: Fullscreen Lightbox (Opens on Photo Click) ── */}
      {selectedCategory && fullscreenIndex !== null && (
        <ImageViewer
          images={selectedCategory.images}
          currentIndex={fullscreenIndex}
          isOpen={fullscreenIndex !== null}
          onClose={() => setFullscreenIndex(null)}
        />
      )}
    </section>
  )
}
