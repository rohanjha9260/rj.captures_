import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ImageViewer from '../ui/ImageViewer'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PortfolioCarousel = ({ id, title, category, description }) => {
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

  // All available images for each category
  const baseImages = {
    nature: [
      '/images/nature/IMG_20260228_172521.webp',
      '/images/nature/IMG_20260304_081602.webp',
      '/images/nature/IMG_20260304_165317.webp',
      '/images/nature/IMG_20260307_182107.webp',
      '/images/nature/IMG_20260310_125032~2.webp',
      '/images/nature/IMG_20260310_125041.webp',
    ],
    sky: [
      '/images/sky/IMG-20240825-WA0037.webp',
      '/images/sky/IMG_20250730_161227.webp',
      '/images/sky/IMG_20250928_125653.webp',
      '/images/sky/IMG_20260511_182543.webp',
    ],
    village: [
      '/images/village/IMG20190727165427~2.webp',
      '/images/village/IMG_20220513_181151.webp',
      '/images/village/IMG_20230625_170128.webp',
      '/images/village/IMG_20250409_142547.webp',
      '/images/village/IMG_20250906_164119.webp',
    ],
    travel: [
      '/images/travel/IMG-20260129-WA0113.webp',
      '/images/travel/IMG_20241129_185851~2.webp',
      '/images/travel/IMG_20241201_162759~2.webp',
      '/images/travel/IMG_20250716_142310.webp',
      '/images/travel/IMG_20260127_210047.webp',
      '/images/travel/IMG_20260128_110708.webp',
    ],
    portrait: [
      '/images/portrait/IMG_20260104_141749.webp',
      '/images/portrait/IMG_20260218_130129.webp',
      '/images/portrait/IMG_20260405_132005.webp',
      '/images/portrait/IMG_20260522_203539.webp',
    ],
  }

  // Pick up to 8 random images on first load so they don't re-shuffle on every render
  const [images] = useState(() => {
    const categoryImages = baseImages[category] || baseImages.nature;
    // Shuffle the array using sort and Math.random()
    const shuffled = [...categoryImages].sort(() => 0.5 - Math.random());
    // Take exactly the first 8 (or fewer if the array is smaller)
    return shuffled.slice(0, 8);
  });

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
      id={id}
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.span
            variants={itemVariants}
            className="text-gold/50 text-xs tracking-[0.3em] uppercase block mb-3"
          >
            Portfolio
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title">
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle mt-4">
            {description}
          </motion.p>
          <motion.div variants={itemVariants} className="section-divider mt-6" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="portfolio-carousel pb-14"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div variants={itemVariants}>
                  <div
                    onClick={() => handleImageClick(index)}
                    className="portfolio-image-wrapper group block cursor-pointer"
                  >
                    <img
                      src={image.replace('.webp', '-thumb.webp')}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <div className="w-full p-5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-gold-light font-playfair font-semibold text-lg">
                          {title}
                        </p>
                        <p className="text-gray-400 text-xs mt-1 tracking-wider uppercase">
                          Click to view fullscreen
                        </p>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/40 transition-all duration-500 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/40 transition-all duration-500 rounded-bl-lg" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Fullscreen Image Viewer */}
      <ImageViewer
        images={images}
        currentIndex={viewerIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </section>
  )
}

export default PortfolioCarousel
