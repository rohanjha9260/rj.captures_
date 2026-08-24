import { useRef, useState, useEffect } from 'react'

export const useInView = ({ threshold = 0.2, triggerOnce = false } = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const currentRef = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce && currentRef) {
            observer.unobserve(currentRef)
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, triggerOnce])

  return { ref, inView }
}
