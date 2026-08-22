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
    { name: 'Connect', href: '#social' },
  ]

  const services = [
    'Nature Photography',
    'Sky Photography',
    'Village Photography',
    'Travel Photography',
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-theme-bg-sec border-t border-theme-border pt-10 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-black font-bold text-xs font-playfair">RJ</span>
              </div>
              <span className="text-lg font-bold text-gold-accent font-playfair">
                RJ Captures
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Capturing the beauty of nature, skies, and village life through cinematic visuals.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-gray-500 text-xs">
              <span>📍</span>
              <span>Delhi, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold/70 mb-5 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-500 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gold/70 mb-5 tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-500 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gold/70 mb-5 tracking-wider uppercase">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <p className="text-gray-500 text-sm">
                <span className="text-gray-400">Email:</span>
                <br />
                <a href="mailto:rjcaptures.photography@gmail.com" className="hover:text-gold transition-colors text-sm">
                  rjcaptures.photography@gmail.com
                </a>
              </p>
              <p className="text-gray-500 text-sm">
                <span className="text-gray-400">Location:</span>
                <br />
                Delhi, India
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-theme-border my-6 sm:my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} RJ Captures. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gold transition-all duration-300 hover:scale-110"
                  title={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#privacy" className="hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
