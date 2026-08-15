import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import ImageViewer from '../ui/ImageViewer'

const FeaturedWork = () => {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleImageClick = (index) => {
    setViewerIndex(index)
    setViewerOpen(true)
  }

  const featuredImages = [
    {
      src: '/images/featured/IMG_20260228_172521.webp',
      title: 'Majestic Peaks',
      category: 'Nature',
      className: 'masonry-tall',
    },
    {
      src: '/images/featured/IMG_20260304_081602.webp',
      title: 'Green Horizons',
      category: 'Nature',
      className: '',
    },
    {
      src: '/images/featured/IMG_20260304_165317.webp',
      title: 'Sunset Reflections',
      category: 'Nature',
      className: '',
    },
    {
      src: '/images/featured/IMG_20260307_182107.webp',
      title: 'Mountain Paths',
      category: 'Nature',
      className: 'masonry-tall',
    },
    {
      src: '/images/featured/IMG_20260310_125041.webp',
      title: 'Scenic Vistas',
      category: 'Nature',
      className: 'masonry-wide',
    },
    {
      src: '/images/featured/IMG-20240825-WA0037.webp',
      title: 'Nature Palette',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20250730_161227.webp',
      title: 'Summer Memories',
      category: 'Featured',
      className: 'masonry-tall',
    },
    {
      src: '/images/featured/IMG_20250928_125653.webp',
      title: 'Autumn Moments',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20260104_141749.webp',
      title: 'Winter Whispers',
      category: 'Featured',
      className: 'masonry-wide',
    },
    {
      src: '/images/featured/IMG_20260218_130129.webp',
      title: 'Spring Blossoms',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20260405_132005.webp',
      title: 'April Skies',
      category: 'Featured',
      className: 'masonry-tall',
    },
    {
      src: '/images/featured/IMG_20260511_182543.webp',
      title: 'May Breezes',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20260522_203539.webp',
      title: 'Late Spring',
      category: 'Featured',
      className: 'masonry-wide',
    },
    {
      src: '/images/featured/IMG_20241015_162056.webp',
      title: 'Urban Exploration',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20250411_182007~2.webp',
      title: 'Serene Moments',
      category: 'Featured',
      className: 'masonry-tall',
    },
    {
      src: '/images/featured/IMG_20250821_174734~2.webp',
      title: 'City Lights',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20251001_204952.webp',
      title: 'Night Sky',
      category: 'Featured',
      className: 'masonry-wide',
    },
    {
      src: '/images/featured/IMG_20260104_140737.webp',
      title: 'Winter Wonderland',
      category: 'Featured',
      className: 'masonry-tall',
    },
    {
      src: '/images/featured/IMG_20260322_195857.webp',
      title: 'Spring Awakening',
      category: 'Featured',
      className: '',
    },
    {
      src: '/images/featured/IMG_20260404_181712.webp',
      title: 'Cherry Blossoms',
      category: 'Featured',
      className: 'masonry-wide',
    },
    {
      src: '/images/featured/IMG_20260403_164610.webp',
      title: 'Spring Day',
      category: 'Featured',
      className: '',
    },
  ]



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <section
      id="featured"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-section pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-gold/50 text-xs tracking-[0.3em] uppercase block mb-3"
          >
            Curated Selection
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title">
            Featured Work
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle mt-4">
            A handpicked collection of my most cherished and celebrated photographs
          </motion.p>
          <motion.div variants={itemVariants} className="section-divider mt-6" />
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="masonry-grid"
        >
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`portfolio-image-wrapper group ${image.className}`}
            >
              <div
                onClick={() => handleImageClick(index)}
                className="block relative w-full h-full cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end">
                  <div className="p-5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-gold/60 text-xs tracking-[0.2em] uppercase">{image.category}</span>
                    <p className="text-white font-playfair font-semibold text-lg mt-1">{image.title}</p>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-bl-lg" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Image Viewer */}
      <ImageViewer
        images={featuredImages.map(img => img.src)}
        currentIndex={viewerIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </section>
  )
}

export default FeaturedWork
