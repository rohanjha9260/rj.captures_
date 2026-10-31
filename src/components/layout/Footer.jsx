import React from 'react'
import { motion } from 'framer-motion'
import { FiInstagram, FiYoutube, FiTwitter, FiFacebook } from 'react-icons/fi'

const Footer = () => {
  const socials = [
    { icon: FiInstagram, url: 'https://instagram.com/rj.captures_', name: 'Instagram' },
    { icon: FiYoutube, url: 'https://youtube.com/@rohanjha9260?si=uY4cwqZbCVowMrln', name: 'YouTube' },
    { icon: FiTwitter, url: 'https://x.com/rjcaptures_', name: 'Twitter' },
    { icon: FiFacebook, url: 'https://www.facebook.com/profile.php?id=61574357384042', name: 'Facebook' },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Journey', href: '#instagram' },
    { name: 'Connect', href: '#contact' },
  ]

  const services = [
    'Nature Photography',
    'Sky Photography',
    'Village Photography',
    'Travel Photography',
    'Portrait Photography',
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-theme-bg-sec border-t border-theme-border pt-10 sm:pt-16 pb-24 sm:pb-12 px-6 sm:px-12 lg:px-20">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start leading-none mb-4">
              <span className="font-playfair text-2xl font-bold text-gold tracking-tight">
                RJ
              </span>
              <span className="text-[9px] tracking-[0.35em] text-gold/80 font-sans uppercase -mt-0.5">
                CAPTURES
              </span>
            </div>
            <p className="text-theme-text-sec text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Capturing cinematic stories of nature, sky, village culture and human emotions through the lens.
            </p>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/40 transition-colors duration-300"
                    title={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-gold text-xs sm:text-sm transition-colors duration-300 tracking-wide font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-4">
              Specialities
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-gray-400 text-xs sm:text-sm tracking-wide font-light"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-4">
              Contact
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 font-light">
              Based in Delhi, India
            </p>
            <a
              href="mailto:rjcaptures.photography@gmail.com"
              className="text-gold hover:text-gold-light text-xs sm:text-sm transition-colors duration-300 block mb-2 break-all"
            >
              rjcaptures.photography@gmail.com
            </a>
            <p className="text-gray-500 text-xs font-light">
              Available for visual commissions & travel assignments.
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-theme-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left font-light">
            &copy; {new Date().getFullYear()} RJ Captures. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center sm:text-right font-light">
            Designed for Phone & PC with cinematic aesthetics.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
