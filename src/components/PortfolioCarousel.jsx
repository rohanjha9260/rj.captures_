import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ImageViewer from './ImageViewer'
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

  // Generate images for each category
  const generateImages = () => {
    const baseImages = {
      nature: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1488714614849-e4c9b23c3b63?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518173946687-a8c8ff4964e6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&h=600&fit=crop&q=80',
      ],
      sky: [
        'https://images.unsplash.com/photo-1495954484750-af469f1dabb6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1482228172698-27d1dd19ffc6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500375592092-40eb0e7dd5e8?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=600&fit=crop&q=80',
      ],
      village: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500534314263-e9e4e6c0b24e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500049242364-5f500807cdd7?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&h=600&fit=crop&q=80',
      ],
      travel: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&h=600&fit=crop&q=80',
      ],
      portrait: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506277886041-6fcd4ecd57ab?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop&q=80',
      ],
    }
    return baseImages[category] || baseImages.nature
  }

  const images = generateImages()

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
              1024: { slidesPerView: 3, spaceBetween: 24 },
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
                      src={image}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
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
