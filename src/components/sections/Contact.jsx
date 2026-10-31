import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { FiMail, FiInstagram, FiCheckCircle } from 'react-icons/fi'

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

    if (!endpoint) {
      setStatus({
        type: 'error',
        message: 'Contact form endpoint is not configured. Please contact me directly via email or Instagram.',
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again or reach out directly.',
        })
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please try again or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* ── Section Header (Screen 5: Let's Connect) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-left mb-8 sm:mb-10"
      >
        <span className="text-gold text-xs sm:text-sm tracking-[0.28em] font-semibold uppercase block mb-2">
          Get in Touch
        </span>
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Let's Connect
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mt-3 font-light leading-relaxed">
          Have a story to capture?
          <br />
          Let's create something amazing together.
        </p>
      </motion.div>

      {/* ── Contact Form ── */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="space-y-3.5 sm:space-y-4"
      >
        {status && (
          <div
            className={`p-4 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm ${
              status.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/15 border border-red-500/30 text-red-300'
            }`}
          >
            <FiCheckCircle className="flex-shrink-0 text-base" />
            <span>{status.message}</span>
          </div>
        )}

        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-theme-card/80 border border-theme-border/70 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-white placeholder:text-white/40 transition-all backdrop-blur-sm"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-theme-card/80 border border-theme-border/70 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-white placeholder:text-white/40 transition-all backdrop-blur-sm"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-3.5 rounded-xl bg-theme-card/80 border border-theme-border/70 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-white placeholder:text-white/40 transition-all backdrop-blur-sm"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-theme-card/80 border border-theme-border/70 hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm text-white placeholder:text-white/40 transition-all resize-none backdrop-blur-sm"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-[#e8c547] via-[#dfb93c] to-[#d4af37] text-black shadow-lg shadow-gold/25 hover:shadow-gold/45 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <span className="font-sans font-bold">→</span>
        </button>
      </motion.form>

      {/* ── Direct Reach Divider & Cards (Screen 5) ── */}
      <div className="mt-12 sm:mt-14">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-white/50">
            Or Reach Me Directly
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* 2 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Email Card */}
          <a
            href="mailto:rjcaptures.photography@gmail.com"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-theme-card/75 border border-theme-border/70 hover:border-gold/40 backdrop-blur-md transition-all duration-300 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
              <FiMail className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] tracking-wider uppercase text-white/50 block font-medium">
                Email Me
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-gold transition-colors">
                rjcaptures.photography@gmail.com
              </span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://instagram.com/rj.captures_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-theme-card/75 border border-theme-border/70 hover:border-gold/40 backdrop-blur-md transition-all duration-300 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
              <FiInstagram className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] tracking-wider uppercase text-white/50 block font-medium">
                Instagram
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-gold transition-colors">
                @rj.captures_
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
