import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import {
  FiInstagram,
  FiHeart,
  FiMessageCircle,
  FiExternalLink,
  FiLayers,
  FiUsers,
} from 'react-icons/fi'

const FEED_URL =
  import.meta.env.VITE_INSTAGRAM_FEED_URL ||
  'https://feeds.behold.so/3i4DDvN0aGFLqodOeYlb'

export default function InstagramFeed() {
  const [feedData, setFeedData] = useState({ profile: null, posts: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  useEffect(() => {
    let isMounted = true

    async function fetchFeed() {
      try {
        setLoading(true)
        const response = await fetch(FEED_URL)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()

        if (isMounted) {
          if (Array.isArray(data)) {
            setFeedData({ profile: null, posts: data.slice(0, 8) })
          } else {
            setFeedData({
              profile: {
                username: data.username || 'rj.captures_',
                biography: data.biography || '',
                profilePictureUrl: data.profilePictureUrl || '',
                followersCount: data.followersCount || null,
              },
              posts: (data.posts || []).slice(0, 8),
            })
          }
          setLoading(false)
        }
      } catch (err) {
        console.warn('Unable to load Instagram feed:', err)
        if (isMounted) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchFeed()

    return () => {
      isMounted = false
    }
  }, [])

  // If there's an error or no posts returned, don't show an empty broken section
  if (error || (!loading && feedData.posts.length === 0)) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <section
      id="instagram"
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background glow element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-2">
            <FiInstagram className="text-gold text-base" />
            <span>Live Instagram Feed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-theme-text">
            Moments on Feed
          </h2>
          <p className="text-sm sm:text-base text-theme-text-sec mt-2 max-w-xl">
            Recent captures, behind-the-scenes stories, and daily visual diaries directly from Instagram.
          </p>
        </div>

        {/* Profile Info & CTA */}
        <div className="flex items-center gap-4">
          {feedData.profile?.profilePictureUrl && (
            <img
              src={feedData.profile.profilePictureUrl}
              alt="Rohan Jha"
              className="w-11 h-11 rounded-full object-cover border border-gold/40 shadow-sm"
            />
          )}
          <div className="text-left">
            <a
              href="https://instagram.com/rj.captures_"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-theme-text hover:text-gold transition-colors"
            >
              <span>@{feedData.profile?.username || 'rj.captures_'}</span>
              <FiExternalLink className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {feedData.profile?.followersCount && (
              <p className="text-xs text-theme-text-sec flex items-center gap-1 mt-0.5">
                <FiUsers className="text-[11px] text-gold" />
                <span>{feedData.profile.followersCount} Followers</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid or Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-theme-card border border-theme-border animate-pulse"
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {feedData.posts.map((post) => {
            const imageUrl =
              post.sizes?.medium?.mediaUrl ||
              post.sizes?.large?.mediaUrl ||
              post.mediaUrl ||
              post.thumbnailUrl

            const isCarousel =
              post.mediaType === 'CAROUSEL_ALBUM' ||
              (post.children && post.children.length > 1)

            return (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-theme-card border border-theme-border/70 hover:border-gold/40 transition-all duration-300 shadow-lg block"
              >
                {/* Image */}
                <img
                  src={imageUrl}
                  alt={post.caption || 'RJ Captures Instagram photograph'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Carousel Album Indicator Badge */}
                {isCarousel && (
                  <div
                    className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs border border-white/10"
                    title="Carousel Album"
                  >
                    <FiLayers />
                  </div>
                )}

                {/* Dark Glass Overlay with Metrics on Hover */}
                <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white z-10">
                  <div className="flex justify-end">
                    <FiInstagram className="text-gold text-lg" />
                  </div>

                  {post.caption && (
                    <p className="text-xs text-white/90 line-clamp-3 leading-relaxed font-light">
                      {post.caption}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs font-medium text-white/95">
                    {post.likeCount != null && (
                      <span className="flex items-center gap-1.5">
                        <FiHeart className="text-red-400 fill-red-400" />
                        <span>{post.likeCount}</span>
                      </span>
                    )}
                    {post.commentsCount != null && (
                      <span className="flex items-center gap-1.5">
                        <FiMessageCircle className="text-gold" />
                        <span>{post.commentsCount}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      )}

      {/* Bottom Button to View Full Feed */}
      <div className="mt-12 text-center">
        <a
          href="https://instagram.com/rj.captures_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-theme-card border border-theme-border hover:border-gold/60 text-theme-text hover:text-gold transition-all duration-300 hover:shadow-gold-sm"
        >
          <FiInstagram className="text-base text-gold" />
          <span>See More on Instagram</span>
          <FiExternalLink className="text-xs" />
        </a>
      </div>
    </section>
  )
}
