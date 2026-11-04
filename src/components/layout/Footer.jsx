import React from 'react'
import { FiInstagram, FiYoutube, FiTwitter, FiFacebook } from 'react-icons/fi'

const SOCIALS = [
  { icon: FiInstagram, url: 'https://instagram.com/rj.captures_', name: 'Instagram' },
  { icon: FiYoutube, url: 'https://youtube.com/@rohanjha9260?si=uY4cwqZbCVowMrln', name: 'YouTube' },
  { icon: FiTwitter, url: 'https://x.com/rjcaptures_', name: 'Twitter' },
  { icon: FiFacebook, url: 'https://www.facebook.com/profile.php?id=61574357384042', name: 'Facebook' },
]

const QUICK_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Journey', href: '#instagram' },
  { name: 'Connect', href: '#contact' },
]

const SPECIALITIES = [
  { name: 'Nature Photography', href: '#portfolio' },
  { name: 'Sky & Sunsets', href: '#portfolio' },
  { name: 'Village Life', href: '#portfolio' },
  { name: 'Travel Stories', href: '#portfolio' },
  { name: 'Portrait Moments', href: '#portfolio' },
]

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-theme-bg-sec border-t border-theme-border/60 pt-12 sm:pt-16 pb-[calc(7.5rem+env(safe-area-inset-bottom))] md:pb-14 px-5 sm:px-10 lg:px-20 overflow-hidden">
      {/* Top subtle gold highlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Quick Links & Specialities */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-14">
          {/* Quick Links */}
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <h4 className="text-theme-text text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
                Explore
              </h4>
            </div>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center text-theme-text-sec hover:text-gold text-xs sm:text-sm transition-colors duration-200 font-light"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <h4 className="text-theme-text text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
                Categories
              </h4>
            </div>
            <ul className="space-y-2.5">
              {SPECIALITIES.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group inline-flex items-center text-theme-text-sec hover:text-gold text-xs sm:text-sm transition-colors duration-200 font-light"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand Lockup & Socials (Moved to Bottom) */}
        <div className="border-t border-theme-border/60 pt-10 pb-8 flex flex-col items-center text-center">
          {/* Logo Monogram Lockup */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center shadow-gold-sm">
              <span className="font-playfair text-xl font-bold text-gold">RJ</span>
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-playfair text-xl font-bold text-theme-text tracking-wide">
                RJ Captures
              </span>
              <span className="text-[9px] tracking-[0.3em] text-gold/80 uppercase font-sans">
                Cinematic Photography
              </span>
            </div>
          </div>

          <p className="text-theme-text-sec text-xs sm:text-sm leading-relaxed mb-6 max-w-md font-light">
            Capturing cinematic stories of nature, atmospheric skies, and village culture. Preserving raw emotions and fleeting moments that deserve to last forever.
          </p>

          {/* Social Pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {SOCIALS.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit RJ Captures on ${social.name}`}
                  className="w-10 h-10 rounded-xl bg-theme-card/80 border border-theme-border/80 text-theme-text-sec hover:text-gold hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div className="border-t border-theme-border/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-theme-text-sec font-light">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} RJ Captures • All stories and photographs preserved.
          </p>
          <p className="text-gold font-medium text-center sm:text-right">
            Rohan Jha
          </p>
        </div>
      </div>
    </footer>
  )
}
