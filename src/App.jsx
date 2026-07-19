import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import FilmStrip from './components/portfolio/FilmStrip'
import PortfolioCarousel from './components/portfolio/PortfolioCarousel'
import FeaturedWork from './components/sections/FeaturedWork'
import SocialLinks from './components/ui/SocialLinks'

import Footer from './components/layout/Footer'
import BackToTop from './components/ui/BackToTop'
import ChatBot from './components/ui/ChatBot'
import './index.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="loading-screen"
          >
            <div className="loader-ring" />
            <div className="loader-text">RJ Captures</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full min-h-screen">
        <Navbar isScrolled={isScrolled} />

        {/* Hero Section */}
        <Hero />

        {/* Infinite Film Strip */}
        <FilmStrip />

        {/* About Section */}
        <About />

        {/* Portfolio Sections — wrapped with ID for navigation */}
        <div id="portfolio">
          <PortfolioCarousel
            id="nature"
            title="Nature Photography"
            category="nature"
            description="Capturing the raw beauty of natural landscapes and the serenity of wilderness"
          />

          <PortfolioCarousel
            id="sky"
            title="Sky Photography"
            category="sky"
            description="The ever-changing canvas of clouds, sunsets, and celestial moments"
          />

          <PortfolioCarousel
            id="village"
            title="Village Photography"
            category="village"
            description="Stories of culture, tradition, and life in quaint villages"
          />

          <PortfolioCarousel
            id="travel"
            title="Travel Photography"
            category="travel"
            description="Wanderlust captured through the lens, exploring diverse destinations"
          />

          <PortfolioCarousel
            id="portrait"
            title="Portrait Photography"
            category="portrait"
            description="Intimate moments and authentic expressions of the human soul"
          />
        </div>

        {/* Featured Work */}
        <FeaturedWork />

        {/* Social Links */}
        <SocialLinks />



        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Photography AI Chatbot */}
        <ChatBot />
      </div>
    </>
  )
}

export default App
