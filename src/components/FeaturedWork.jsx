import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import ImageViewer from './ImageViewer'

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
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&q=80',
      title: 'Mountain Majesty',
      category: 'Nature',
      className: 'masonry-tall',
    },
    {
      src: 'https://images.unsplash.com/photo-1495954484750-af469f1dabb6?w=800&h=600&fit=crop&q=80',
      title: 'Golden Hour Sky',
      category: 'Sky',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1500534314263-e9e4e6c0b24e?w=800&h=600&fit=crop&q=80',
      title: 'Village Serenity',
      category: 'Village',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=800&fit=crop&q=80',
      title: 'Travel Stories',
      category: 'Travel',
      className: 'masonry-tall',
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?w=800&h=600&fit=crop&q=80',
      title: "Nature's Canvas",
      category: 'Nature',
      className: 'masonry-wide',
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
      title: 'Portrait of Soul',
      category: 'Portrait',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1482228172698-27d1dd19ffc6?w=800&h=600&fit=crop&q=80',
      title: 'Twilight Dreams',
      category: 'Sky',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=800&fit=crop&q=80',
      title: 'Rural Horizons',
      category: 'Village',
      className: 'masonry-tall',
    },
    {
      src: 'https://images.unsplash.com/photo-1518173946687-a8c8ff4964e6?w=800&h=600&fit=crop&q=80',
      title: 'Enchanted Forest',
      category: 'Nature',
      className: '',
    },
    {
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&q=80',
      title: 'Candid Essence',
      category: 'Portrait',
      className: 'masonry-wide',
    },
    {
      src: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&h=800&fit=crop&q=80',
      title: 'Wanderlust',
      category: 'Travel',
      className: 'masonry-tall',
    },
    {
      src: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop&q=80',
      title: 'Cosmic Skies',
      category: 'Sky',
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
