import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [activeGallery, setActiveGallery] = useState(null)
  const [viewerIndex, setViewerIndex] = useState(0)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const openCategory = (cat) => {
    setActiveGallery(cat)
    setViewerIndex(0)
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

      {/* ── Category Cards Grid (Responsive: 1 col on mobile, 2 cols on PC) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {CATEGORIES.map((cat, index) => (
          <motion.button
            key={cat.id}
            type="button"
            aria-label={`View ${cat.title} gallery`}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => openCategory(cat)}
            className="w-full text-left group relative flex items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-theme-card/75 border border-theme-border/70 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold backdrop-blur-md transition-all duration-300 hover:shadow-card-hover cursor-pointer"
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

      {/* ── Category Fullscreen Lightbox Gallery ── */}
      {activeGallery && (
        <ImageViewer
          images={activeGallery.images}
          currentIndex={viewerIndex}
          isOpen={Boolean(activeGallery)}
          onClose={() => setActiveGallery(null)}
        />
      )}
    </section>
  )
}

