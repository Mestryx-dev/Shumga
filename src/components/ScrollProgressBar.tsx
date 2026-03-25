import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.15,
  })

  if (reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-1.5 origin-left bg-linear-to-r from-neon-cyan via-neon-magenta to-coin shadow-[0_0_20px_rgba(34,211,238,0.5)]"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
