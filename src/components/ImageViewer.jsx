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
          onClick={onClose}
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-black/97" />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-5 right-5 z-[100000] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                       bg-black/70 border border-gold/30 backdrop-blur-xl
                       hover:bg-gold/20 hover:border-gold/60 hover:scale-110
                       transition-all duration-300"
          >
            <FiX className="w-5 h-5 text-gold" />
          </motion.button>

          {/* Previous button */}
          {images.length > 1 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={goPrev}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer
                         bg-black/70 border border-gold/25 backdrop-blur-xl
                         hover:bg-gold/15 hover:border-gold/50 hover:scale-110
                         transition-all duration-300"
            >
              <FiChevronLeft className="w-6 h-6 text-gold" />
            </motion.button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={goNext}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer
                         bg-black/70 border border-gold/25 backdrop-blur-xl
                         hover:bg-gold/15 hover:border-gold/50 hover:scale-110
                         transition-all duration-300"
            >
              <FiChevronRight className="w-6 h-6 text-gold" />
            </motion.button>
          )}

          {/* Image */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-[99999] flex items-center justify-center px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex]}
              alt={`Photo ${activeIndex + 1}`}
              className="max-w-[94vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg select-none"
              style={{
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 1px rgba(212, 175, 55, 0.2)',
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
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100000]
                         px-4 py-2 rounded-full bg-black/60 border border-gold/15
                         backdrop-blur-sm"
            >
              <span className="text-gold/70 text-xs tracking-widest font-medium">
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
