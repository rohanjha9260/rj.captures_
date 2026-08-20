import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ImageViewer = ({ images, currentIndex, isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, images.length, onClose])

  const goNext = useCallback((e) => {
    e.stopPropagation()
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback((e) => {
    e.stopPropagation()
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  if (!isOpen || !images.length) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.97)' }}
          onClick={onClose}
        >
          {/* Close button — pushed below the navbar on mobile (top-[72px]) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            onClick={onClose}
            className="absolute top-[72px] sm:top-5 right-4 sm:right-5 z-[100001]
                       w-11 h-11 sm:w-12 sm:h-12 rounded-full
                       flex items-center justify-center cursor-pointer
                       bg-black/80 border border-gold/40 backdrop-blur-xl
                       hover:bg-gold/20 hover:border-gold/70 hover:scale-110
                       transition-all duration-300 shadow-lg"
            aria-label="Close image viewer"
          >
            <FiX className="w-5 h-5 text-gold" />
          </motion.button>

          {/* Previous button — vertically centered, left side, not overlapping image */}
          {images.length > 1 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={goPrev}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-[100001]
                         w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full
                         flex items-center justify-center cursor-pointer
                         bg-black/75 border border-gold/25 backdrop-blur-xl
                         hover:bg-gold/15 hover:border-gold/50 hover:scale-110
                         transition-all duration-300 shadow-md"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </motion.button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={goNext}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-[100001]
                         w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full
                         flex items-center justify-center cursor-pointer
                         bg-black/75 border border-gold/25 backdrop-blur-xl
                         hover:bg-gold/15 hover:border-gold/50 hover:scale-110
                         transition-all duration-300 shadow-md"
              aria-label="Next image"
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </motion.button>
          )}

          {/* Main image — centred, safe padding for nav + arrows */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-[99999] flex items-center justify-center
                       px-14 sm:px-20 md:px-24
                       pt-[80px] sm:pt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex]}
              alt={`Photo ${activeIndex + 1}`}
              className="max-w-[92vw] max-h-[82vh] sm:max-h-[88vh] w-auto h-auto
                         object-contain rounded-lg select-none"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 1px rgba(212,175,55,0.25)',
              }}
              draggable={false}
            />
          </motion.div>

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[100001]
                         px-4 py-1.5 rounded-full bg-black/65 border border-gold/15
                         backdrop-blur-sm"
            >
              <span className="text-gold/75 text-xs tracking-widest font-medium">
                {activeIndex + 1} / {images.length}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageViewer
