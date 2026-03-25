import type { Transition, Variants } from 'framer-motion'

export const smoothEase: Transition['ease'] = [0.22, 1, 0.36, 1]

export const fadeUpTransition: Transition = {
  duration: 0.65,
  ease: smoothEase,
}

/** Use with initial / whileInView when motion is enabled */
export const fadeUpHidden = { opacity: 0, y: 28 } as const
export const fadeUpVisible = { opacity: 1, y: 0 } as const

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeUpTransition,
  },
}
