import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { FiInstagram, FiYoutube, FiTwitter, FiFacebook } from 'react-icons/fi'

const SocialLinks = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const socials = [
    {
      name: 'Instagram',
      icon: FiInstagram,
      url: 'https://instagram.com/rj.captures_',
      color: '#E4405F',
      gradient: 'from-pink-500 to-yellow-500',
    },
    {
      name: 'YouTube',
      icon: FiYoutube,
      url: 'https://youtube.com/@rohanjha9260?si=uY4cwqZbCVowMrln',
      color: '#FF0000',
      gradient: 'from-red-600 to-red-400',
    },
    {
      name: 'Twitter',
      icon: FiTwitter,
      url: 'https://x.com/rjcaptures_',
      color: '#739328ff ',
      gradient: 'from-gray-600 to-gray-400',
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      url: 'https://www.facebook.com/profile.php?id=61574357384042',
      color: '#1877F2',
      gradient: 'from-gray-400 to-gray-200',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <section
      id="social"
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold/50 text-xs tracking-[0.3em] uppercase block mb-3">
            Follow My Journey
          </span>
          <h2 className="section-title">
            Let's Connect
          </h2>
          <p className="section-subtitle mt-4">
            Follow my work and let's create something amazing together
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center items-center gap-8 md:gap-12 flex-wrap"
        >
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.15,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
                title={social.name}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl scale-150"
                  style={{ background: social.color }}
                />

                {/* Icon container */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full glass group-hover:border-gold/40 transition-all duration-500">
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 text-gray-400 transition-all duration-500"
                    style={{
                      '--hover-color': social.color,
                    }}
                  />
                  <style>{`
                    .group:hover .${social.name.toLowerCase()}-icon {
                      color: ${social.color};
                    }
                  `}</style>
                </div>

                {/* Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <span className="text-gold/70 text-xs tracking-wider whitespace-nowrap">
                    {social.name}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default SocialLinks
