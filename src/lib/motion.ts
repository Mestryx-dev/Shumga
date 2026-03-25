import type { Transition, Variant } from 'framer-motion'

export const smoothEase: Transition['ease'] = [0.22, 1, 0.36, 1]

export const fadeUpHidden: Variant = { opacity: 0, y: 28 }
export const fadeUpVisible: Variant = { opacity: 1, y: 0 }

export const fadeUpTransition: Transition = {
  duration: 0.65,
  ease: smoothEase,
}

export const staggerContainer: Variant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

export const staggerItemHidden: Variant = { opacity: 0, y: 20 }
export const staggerItemVisible: Variant = { opacity: 1, y: 0 }
