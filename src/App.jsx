import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import PortfolioSection from './components/sections/PortfolioSection'
import FilmStrip from './components/portfolio/FilmStrip'
import About from './components/sections/About'
import InstagramFeed from './components/sections/InstagramFeed'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import BackToTop from './components/ui/BackToTop'
import './index.css'

const ChatBot = lazy(() => import('./components/ui/ChatBot'))

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldMountChatBot, setShouldMountChatBot] = useState(false)
  const scrollTickRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTickRef.current) return

      scrollTickRef.current = true
      window.requestAnimationFrame(() => {
        scrollTickRef.current = false
        setIsScrolled((previous) => {
          const nextValue = window.scrollY > 50
          return previous === nextValue ? previous : nextValue
        })
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mountChatBot = () => setShouldMountChatBot(true)

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(mountChatBot, { timeout: 2500 })
      return () => window.cancelIdleCallback?.(idleId)
    }

    const timer = window.setTimeout(mountChatBot, 1600)
    return () => window.clearTimeout(timer)
  }, [])

  // Initial loading screen (900ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 900)
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
            transition={{ duration: 0.35 }}
            className="loading-screen"
          >
            <div className="loader-ring" />
            <div className="loader-text">RJ Captures</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full min-h-screen bg-theme-bg text-theme-text font-inter antialiased">
        {/* Top Navbar (Brand + Desktop Nav + Mobile Icons) */}
        <Navbar isScrolled={isScrolled} />

        {/* ── 1. HOME PAGE (Hero Section) ── */}
        <Hero />

        {/* ── 2. PORTFOLIO PAGE (Our Work / 5 Categories) ── */}
        <PortfolioSection />

        {/* ── Cinematic 35mm Infinite Film Reel ── */}
        <FilmStrip />

        {/* ── 3. ABOUT PAGE (About Me / Rohan Jha Story, Stats, Expertise) ── */}
        <About />

        {/* ── 4. INSTAGRAM / FEED PAGE (Journey / Moments on Feed) ── */}
        <InstagramFeed />

        {/* ── 5. CONTACT PAGE (Get in Touch / Let's Connect Form & Direct Reach) ── */}
        <Contact />

        {/* ── Footer ── */}
        <Footer />

        {/* ── Mobile Bottom Navigation Bar (Phone Dock: Home, About, Work, Journey, Connect) ── */}
        <BottomNav />

        {/* ── Floating Controls ── */}
        <BackToTop />

        {/* Photography AI Chatbot */}
        <Suspense fallback={null}>
          {shouldMountChatBot && <ChatBot />}
        </Suspense>
      </div>
    </>
  )
}

export default App
