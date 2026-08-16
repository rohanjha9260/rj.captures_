import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'
import { FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi'

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name' })
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' })
      return false
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter your message' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setStatus(null)

    const endpoint =
      import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
      (import.meta.env.VITE_WEB3FORMS_KEY
        ? 'https://api.web3forms.com/submit'
        : 'https://formspree.io/f/rjcaptures.photography@gmail.com')

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: 'rjcaptures.photography@gmail.com',
        subject: `New Client Inquiry from ${formData.name}`,
        access_key: import.meta.env.VITE_WEB3FORMS_KEY || undefined,
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success !== false) {
        setStatus({
          type: 'success',
          message: "Thank you! Your message has been sent successfully. I'll get back to you soon!",
        })
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 7000)
      } else {
        const errorMsg =
          data.message ||
          'Failed to send message. Please try again or email directly at rjcaptures.photography@gmail.com.'
        setStatus({
          type: 'error',
          message: errorMsg,
        })
      }
    } catch (err) {
      console.error('Contact form submission error:', err)
      setStatus({
        type: 'error',
        message:
          'Network error while sending message. Please try again or email directly at rjcaptures.photography@gmail.com.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
  }

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'rjcaptures.photography@gmail.com',
      href: 'mailto:rjcaptures.photography@gmail.com',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Delhi, India',
      href: null,
    },
    {
      icon: FiClock,
      title: 'Response Time',
      value: 'Within 24 hours',
      href: null,
    },
  ]

  return (
    <section id="contact" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-section pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-gold/50 text-xs tracking-[0.3em] uppercase block mb-3">
              Get In Touch
            </span>
            <h2 className="section-title">
              Let's Create Together
            </h2>
            <p className="section-subtitle mt-4">
              Have a project in mind? I'd love to hear about it.
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <div key={info.title} className="glass-card p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">{info.title}</h3>
                  {info.href ? (
                    <a href={info.href} className="text-gold hover:text-gold-light text-sm">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gold/80 text-sm">{info.value}</p>
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-12"
          >
            {/* Status Messages */}
            <motion.div
              animate={{
                opacity: status ? 1 : 0,
                height: status ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              {status && (
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <HiExclamationCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{status.message}</span>
                </div>
              )}
            </motion.div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium mb-2 text-gold/70 tracking-wider uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium mb-2 text-gold/70 tracking-wider uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-2 text-gold/70 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  className="w-full resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-gold flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-4 h-4 border-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
