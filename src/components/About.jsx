import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { FiCamera, FiSun, FiMapPin, FiImage } from 'react-icons/fi'

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  }

  const skills = [
    { name: 'Nature Photography', icon: FiCamera },
    { name: 'Microshot Photography', icon: FiSun },
    { name: 'Village Photography', icon: FiMapPin },
    { name: 'Travel Photography', icon: FiImage },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Parallax background */}
      <div className="parallax-bg" />
      <div className="absolute inset-0 bg-gradient-section pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* profile photo — circular */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-gold blur-2xl opacity-20 scale-110" />

              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-dashed border-gold/20"
              />

              {/* Photo container — circular */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-gold/30 shadow-gold-glow">
                <img
                  src="/images/profile.jpg"
                  alt="Rohan Jha — Photographer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Bio and Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Title */}
            <div>
              <motion.span
                variants={itemVariants}
                className="text-gold/60 text-sm tracking-[0.3em] uppercase block mb-3"
              >
                About Me
              </motion.span>
              <h2 className="section-title !text-left !mb-2">Rohan Jha</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <FiMapPin className="w-3.5 h-3.5" />
                <span>Delhi, India</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-lg leading-relaxed">
              I am a passionate photographer capturing the beauty of nature, skies,
              and village life through cinematic visuals. Every frame tells a story,
              and I strive to preserve the raw emotions and breathtaking moments
              that our world offers.
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-gold/70 mb-4 font-medium">
                My Expertise
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      className="glass glass-hover px-4 py-3 flex items-center gap-3"
                    >
                      <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="mailto:rjcaptures.photography@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gold inline-block text-sm uppercase tracking-widest cursor-pointer"
            >
              Let's Connect
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
