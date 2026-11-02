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

// Fallback high-res portfolio shots to complete the 3x3 (9 items) grid if live feed has fewer
const FALLBACK_POSTS = [
  {
    id: 'fb-1',
    permalink: 'https://instagram.com/rj.captures_',
    mediaUrl: '/images/nature/IMG_20260228_172521.webp',
    caption: 'Golden light touching wild horizons.',
    mediaType: 'IMAGE',
  },
  {
    id: 'fb-2',
    permalink: 'https://instagram.com/rj.captures_',
    mediaUrl: '/images/sky/IMG_20250730_161227.webp',
    caption: 'Sunset symphony in the skies.',
    mediaType: 'CAROUSEL_ALBUM',
  },
  {
    id: 'fb-3',
    permalink: 'https://instagram.com/rj.captures_',
    mediaUrl: '/images/village/IMG_20230625_170128.webp',
    caption: 'Serene village echoes and timeless memories.',
    mediaType: 'IMAGE',
  },
]

export default function InstagramFeed() {
  const [feedData, setFeedData] = useState({
    profile: {
      username: 'rj.captures_',
      followersCount: 203,
      profilePictureUrl:
        'https://cdn2.behold.pictures/V4hMLsNdSxbgQ1nKTfv4sMXMEGR2/17841466497061214/profile.webp',
    },
    posts: [],
  })
  const [loading, setLoading] = useState(true)
  const [isLiveFeed, setIsLiveFeed] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0.1,
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
          const livePosts = Array.isArray(data) ? data : data.posts || []
          // Merge to ensure 9 posts (3x3 grid) as seen in Screen 4 of the mockup
          const combined = [...livePosts]
          let fbIdx = 0
          while (combined.length < 9 && FALLBACK_POSTS.length > 0) {
            const base = FALLBACK_POSTS[fbIdx % FALLBACK_POSTS.length]
            combined.push({
              ...base,
              id: `${base.id}-${combined.length}`,
            })
            fbIdx++
          }

          setFeedData({
            profile: {
              username: data.username || 'rj.captures_',
              followersCount: data.followersCount ?? 203,
              profilePictureUrl:
                data.profilePictureUrl ||
                'https://cdn2.behold.pictures/V4hMLsNdSxbgQ1nKTfv4sMXMEGR2/17841466497061214/profile.webp',
            },
            posts: combined.slice(0, 9),
          })
          setIsLiveFeed(livePosts.length > 0)
          setLoading(false)
        }
      } catch (err) {
        console.warn('Using fallback feed items:', err)
        if (isMounted) {
          setIsLiveFeed(false)
          const fallbackList = []
          let fbIdx = 0
          while (fallbackList.length < 9 && FALLBACK_POSTS.length > 0) {
            const base = FALLBACK_POSTS[fbIdx % FALLBACK_POSTS.length]
            fallbackList.push({
              ...base,
              id: `${base.id}-${fallbackList.length}`,
            })
            fbIdx++
          }

          setFeedData((prev) => ({
            ...prev,
            posts: fallbackList,
          }))
          setLoading(false)
        }
      }
    }

    fetchFeed()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section
      id="instagram"
      ref={ref}
      className="relative py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* ── Section Header (Screen 4: Moments on Feed) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-2 text-gold text-xs sm:text-sm tracking-[0.28em] font-semibold uppercase mb-2">
          <FiInstagram className="text-gold text-sm" />
          <span>{isLiveFeed ? 'Live Instagram Feed' : 'Portfolio Highlights'}</span>
        </div>
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          {isLiveFeed ? 'Moments on Feed' : 'Featured Moments'}
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mt-3 font-light leading-relaxed">
          {isLiveFeed
            ? 'Recent captures, behind-the-scenes stories, and daily visual diaries directly from Instagram.'
            : 'Curated visual stories and moments from the photography archive.'}
        </p>

        {/* Profile Card Pill (Matches Screen 4) */}
        <div className="flex items-center gap-3.5 mt-6 p-2 pr-4 rounded-full bg-theme-card/70 border border-theme-border/70 backdrop-blur-md w-fit">
          <img
            src={feedData.profile.profilePictureUrl}
            alt="Rohan Jha"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-gold/40 shadow-sm"
          />
          <div className="text-left">
            <a
              href={`https://instagram.com/${feedData.profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-gold transition-colors"
            >
              <span>@{feedData.profile.username}</span>
              <FiExternalLink className="text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <p className="text-[11px] text-white/50 flex items-center gap-1 mt-0.5">
              <FiUsers className="text-[10px] text-gold" />
              <span>{feedData.profile.followersCount} Followers</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── 3x3 Photo Grid (Screen 4: 9 Posts) ── */}
      {loading ? (
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl sm:rounded-2xl bg-theme-card border border-theme-border animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {feedData.posts.map((post, index) => {
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
                key={post.id || index}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-theme-card border border-theme-border/70 hover:border-gold/50 transition-all duration-300 block shadow-md"
              >
                {/* Photo */}
                <img
                  src={imageUrl}
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Carousel badge in top right */}
                {isCarousel && (
                  <div
                    className="absolute top-2 right-2 z-10 p-1 sm:p-1.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs border border-white/10"
                    title="Carousel Album"
                  >
                    <FiLayers />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2.5 sm:p-4 text-white z-10">
                  <div className="flex justify-end">
                    <FiInstagram className="text-gold text-sm sm:text-base" />
                  </div>
                  {post.likeCount != null && (
                    <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium text-white/95">
                      <span className="flex items-center gap-1">
                        <FiHeart className="text-red-400 fill-red-400 text-xs" />
                        <span>{post.likeCount}</span>
                      </span>
                      {post.commentsCount != null && (
                        <span className="flex items-center gap-1">
                          <FiMessageCircle className="text-gold text-xs" />
                          <span>{post.commentsCount}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.a>
            )
          })}
        </div>
      )}

      {/* ── Follow Button (Screen 4) ── */}
      <div className="mt-10 sm:mt-12 text-center">
        <a
          href="https://instagram.com/rj.captures_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest border border-gold/50 bg-black/35 hover:bg-gold/15 text-gold hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm shadow-sm"
        >
          <FiInstagram className="text-base text-gold" />
          <span>Follow on Instagram</span>
          <span className="font-sans">→</span>
        </a>
      </div>
    </section>
  )
}
