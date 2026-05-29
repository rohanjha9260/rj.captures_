import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiInstagram, FiSun, FiMoon } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const Hero = () => {
  const [isNightMode, setIsNightMode] = useState(false)

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Day/Night pairs for the exact same scenes (or thematic equivalents)
  const heroImages = [
    {
      day: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
      night: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f4d?w=1920&h=1080&fit=crop&q=80',
    },
    {
      day: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&h=1080&fit=crop&q=80',
      night: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop&q=80',
    },
    {
      day: 'https://images.unsplash.com/photo-1500534314263-e9e4e6c0b24e?w=1920&h=1080&fit=crop&q=80',
      night: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&h=1080&fit=crop&q=80',
    },
    {
      day: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920&h=1080&fit=crop&q=80',
      night: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop&q=80',
    }
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
          {heroImages.map((imagePair, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full overflow-hidden bg-black">
                {/* Day Image */}
                <img
                  src={imagePair.day}
                  alt={`Cinematic landscape day ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover hero-ken-burns"
                />
                {/* Night Image with Fade */}
                <motion.img
                  src={imagePair.night}
                  alt={`Cinematic landscape night ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover hero-ken-burns"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isNightMode ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Layer 2: Cinematic Overlays */}
      <div className="absolute inset-0 overlay-gradient pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 hero-vignette pointer-events-none" style={{ zIndex: 2 }} />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-deep-blue/30 via-transparent to-deep-blue/30 pointer-events-none" 
        style={{ zIndex: 2 }}
        animate={{ opacity: isNightMode ? 0.6 : 0.3 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Night specific overlay to darken the scene slightly more */}
      <motion.div
        className="absolute inset-0 bg-black/40 pointer-events-none"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isNightMode ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Layer 3: Decorative lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-1/3 right-8 w-px h-24 bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block pointer-events-none" style={{ zIndex: 3 }} />

      {/* Day/Night Toggle Button */}
      <div className="absolute top-24 right-8 lg:top-32 lg:right-12" style={{ zIndex: 20 }}>
        <button
          onClick={() => setIsNightMode(!isNightMode)}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 bg-dark-bg/40 backdrop-blur-md hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 overflow-hidden cursor-pointer"
          aria-label="Toggle Day/Night Mode"
        >
          <AnimatePresence mode="wait">
            {isNightMode ? (
              <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.4 }}
              >
                <FiMoon className="text-gold w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.4 }}
              >
                <FiSun className="text-gold w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Layer 4: Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none" style={{ zIndex: 10 }}>
        {/* Photographer badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 pointer-events-auto"
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
          className="pointer-events-auto"
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
          className="mt-8 pointer-events-auto"
        >
          <a
            href="https://instagram.com/rj.captures_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/20 hover:border-gold/50 bg-dark-bg/30 backdrop-blur-sm transition-all duration-400 group hover:bg-gold/10 cursor-pointer"
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
