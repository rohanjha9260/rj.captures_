import React from 'react'
import { motion } from 'framer-motion'
import { FiInstagram } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const Hero = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500534314263-e9e4e6c0b24e?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920&h=1080&fit=crop&q=80',
  ]

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Layer 1: Background Image Carousel */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          speed={2000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="w-full h-full"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full overflow-hidden">
                <img
                  src={image}
                  alt={`Cinematic landscape ${index + 1}`}
                  className="w-full h-full object-cover hero-ken-burns"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Layer 2: Cinematic Overlays */}
      <div className="absolute inset-0 overlay-gradient pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 hero-vignette pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/30 via-transparent to-deep-blue/30 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Layer 3: Decorative lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-1/3 right-8 w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block pointer-events-none" style={{ zIndex: 3 }} />

      {/* Layer 4: Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center" style={{ zIndex: 10 }}>
        {/* Photographer badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold/80 text-xs tracking-[0.3em] uppercase font-medium backdrop-blur-sm bg-dark-bg/20">
            Cinematic Photography
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="hero-title text-center mb-2 text-white text-shadow-deep">
            RJ Captures
          </h1>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent my-6"
        />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="hero-subtitle mb-10">
            Capturing Nature • Sky • Village Life
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            onClick={scrollToPortfolio}
            className="btn-gold cursor-pointer text-sm uppercase tracking-widest"
          >
            View Portfolio
          </button>
        </motion.div>

        {/* Instagram Handle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8"
        >
          <a
            href="https://instagram.com/rj.captures_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/20 hover:border-gold/50 bg-dark-bg/30 backdrop-blur-sm transition-all duration-400 group hover:bg-gold/10"
          >
            <FiInstagram className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
            <span className="text-gold/90 text-sm tracking-wider font-medium group-hover:text-gold transition-colors duration-300">
              @rj.captures_
            </span>
          </a>
        </motion.div>
      </div>

      {/* Layer 5: Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-gold/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-gold/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-gold/60"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
