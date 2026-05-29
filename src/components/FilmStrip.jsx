import React from 'react'
import { motion } from 'framer-motion'

const FilmStrip = () => {
  // A curated list of cinematic images for the film strip
  const images = [
    '/images/nature/IMG_20260228_172521.jpg',
    '/images/nature/IMG_20260304_081602.jpg',
    '/images/nature/IMG_20260304_165317.jpg',
    '/images/nature/IMG_20260307_182107.jpg',
    '/images/nature/IMG_20260310_125032~2.jpg',
    '/images/nature/IMG_20260310_125041.jpg',
    '/images/sky/IMG-20240825-WA0037.jpg',
    '/images/sky/IMG_20250730_161227.jpg',
    '/images/sky/IMG_20250928_125653.jpg',
    '/images/sky/IMG_20260511_182543.jpg',
    '/images/village/IMG20190727165427~2.jpg',
    '/images/village/IMG_20220513_181151.jpg',
    '/images/village/IMG_20230625_170128.jpg',
    '/images/village/IMG_20250409_142547.jpg',
    '/images/village/IMG_20250906_164119.jpg',
    '/images/travel/IMG-20260129-WA0113.jpg',
    '/images/travel/IMG_20241129_185851~2.jpg',
    '/images/travel/IMG_20241201_162759~2.jpg',
    '/images/travel/IMG_20250716_142310.jpg',
    '/images/travel/IMG_20260127_210047.jpg',
    '/images/travel/IMG_20260128_110708.jpg',
    '/images/portrait/IMG_20260104_141749.jpg',
    '/images/portrait/IMG_20260218_130129.jpg',
    '/images/portrait/IMG_20260405_132005.jpg',
    '/images/portrait/IMG_20260522_203539.jpg',
  ]

  // We duplicate the array to create a seamless infinite loop
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative w-full h-48 md:h-64 bg-black overflow-hidden flex items-center border-y border-white/5 py-2">
      {/* Film strip "holes" effect at top and bottom */}
      <div className="absolute top-1 left-0 right-0 h-1 flex justify-around opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
      <div className="absolute bottom-1 left-0 right-0 h-1 flex justify-around opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '16px 16px' }} />

      {/* Vignette overlay for the strip */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10" />

      {/* Scrolling Container */}
      <motion.div
        className="flex gap-2 min-w-max px-2"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          ease: 'linear',
          duration: 120, // Adjusted for more images so it doesn't move too fast
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="relative h-40 md:h-56 aspect-[3/2] overflow-hidden rounded-sm group flex-shrink-0"
          >
            <img
              src={image}
              alt={`Film strip item ${index}`}
              className="w-full h-full object-cover filter grayscale-[30%] contrast-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            {/* Inner vignette per image */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default FilmStrip
