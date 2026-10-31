import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiHome, FiUser, FiGrid, FiCompass, FiSend } from 'react-icons/fi'

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: FiHome, href: '#home' },
  { id: 'about', label: 'ABOUT', icon: FiUser, href: '#about' },
  { id: 'portfolio', label: 'WORK', icon: FiGrid, href: '#portfolio' },
  { id: 'instagram', label: 'JOURNEY', icon: FiCompass, href: '#instagram' },
  { id: 'contact', label: 'CONNECT', icon: FiSend, href: '#contact' },
]

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i]
        const element = document.getElementById(item.id)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveTab(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, href, id) => {
    e.preventDefault()
    setActiveTab(id)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.href, item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative group cursor-pointer ${
                isActive ? 'text-gold' : 'text-white/50 hover:text-white/80'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-glow"
                    className="absolute -inset-1 rounded-full bg-gold/20 blur-sm pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </div>
              <span
                className={`text-[9px] font-sans tracking-widest uppercase mt-1 font-semibold transition-colors duration-300 ${
                  isActive ? 'text-gold font-bold' : 'text-white/50'
                }`}
              >
                {item.label}
              </span>

              {/* Active Dot */}
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-dot"
                  className="w-1 h-1 rounded-full bg-gold shadow-gold-glow mt-0.5"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

