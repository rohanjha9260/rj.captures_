import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40"
          title="Back to top"
          aria-label="Back to top"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-gold rounded-full blur-xl opacity-50"></div>

          {/* Button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-gold text-dark-bg flex items-center justify-center shadow-lg hover:shadow-gold-lg transition-all duration-300 hover:scale-110">
            <HiArrowUp className="w-6 h-6 font-bold" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
