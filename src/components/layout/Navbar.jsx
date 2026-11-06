import React, { useState, useEffect } from 'react'
import { HiX, HiMenu } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Journey', href: '#instagram' },
  { name: 'Connect', href: '#contact' },
]

export default function Navbar({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`floating-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'scrolled bg-black/85 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* ── Brand Logo: RJ Captures (Gold Circle Badge + RJ CAPTURES) ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center gap-3 group cursor-pointer"
                aria-label="RJ Captures Home"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#f7e6b5] via-[#d4af37] to-[#997b1a] flex items-center justify-center shadow-gold-glow flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-black font-bold text-xs sm:text-sm font-playfair">
                    RJ
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white group-hover:text-gold transition-colors duration-300 font-sans uppercase">
                  RJ CAPTURES
                </span>
              </a>
            </motion.div>

            {/* ── Desktop Navigation (PC) ── */}
            <div className="hidden md:flex items-center space-x-2">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`underline-animation px-4 py-2 rounded-md text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
                    isScrolled
                      ? 'text-white/90 hover:text-gold'
                      : 'text-white/90 hover:text-gold'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Theme Toggle Button (Desktop) */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: NAV_LINKS.length * 0.08 }}
                onClick={() => setTheme(theme === 'dark' ? 'day' : 'dark')}
                className="ml-4 p-2 rounded-full hover:bg-gold/10 transition-all duration-300 text-gold hover:text-gold-light cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* ── Mobile Action Icons: Sun & Hamburger in Rounded Box ── */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'day' : 'dark')}
                className="p-2 text-gold hover:text-gold-light transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Hamburger Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-gold/35 hover:border-gold/70 transition-all duration-300 bg-black/25 backdrop-blur-md cursor-pointer"
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiX className="h-5 w-5 text-gold" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <HiMenu className="h-5 w-5 text-gold" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-theme-bg/95 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
              <motion.div className="space-y-4 text-center">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-8 py-3 text-2xl font-playfair font-semibold text-gray-200 hover:text-gold transition-colors duration-300 tracking-wider"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
                <p className="text-gold/60 text-xs tracking-[0.25em] uppercase font-medium">
                  Capturing Nature · Sky · Village Life
                </p>
                <p className="text-white/40 text-[10px] tracking-wider mt-2">
                  Delhi, India
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
