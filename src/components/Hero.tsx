import { motion, useReducedMotion } from 'framer-motion'
import {
  fadeUpHidden,
  fadeUpTransition,
  fadeUpVisible,
} from '../lib/motion'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="accueil"
      className="relative overflow-hidden px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-glow/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ember/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-gradient-to-br from-ridge/40 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ember md:text-left"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...fadeUpTransition, delay: 0.05 }}
        >
          Expérience &amp; sobriété
        </motion.p>
        <motion.h1
          id="hero-heading"
          className="font-display text-center text-4xl font-bold leading-[1.05] tracking-tight text-snow md:text-left md:text-6xl lg:text-7xl"
          initial={reduce ? false : fadeUpHidden}
          animate={reduce ? undefined : fadeUpVisible}
          transition={{ ...fadeUpTransition, delay: 0.12 }}
        >
          L’essentiel,
          <span className="block bg-gradient-to-r from-snow via-mist to-ember bg-clip-text text-transparent">
            en altitude.
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-mist md:mx-0 md:text-left md:text-lg"
          initial={reduce ? false : fadeUpHidden}
          animate={reduce ? undefined : fadeUpVisible}
          transition={{ ...fadeUpTransition, delay: 0.2 }}
        >
          Shumga rassemble idées, matière et silence numérique. Une vitrine pour
          un projet qui respire — clair, précis, mémorable.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start"
          initial={reduce ? false : fadeUpHidden}
          animate={reduce ? undefined : fadeUpVisible}
          transition={{ ...fadeUpTransition, delay: 0.28 }}
        >
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-ember px-8 py-3.5 text-sm font-semibold text-void shadow-[0_0_48px_-10px_rgba(232,160,92,0.6)] transition hover:bg-ember-hot sm:w-auto"
          >
            Démarrer un échange
          </a>
          <a
            href="#pourquoi-shumga"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-snow backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Découvrir la vision
          </a>
        </motion.div>
      </div>
    </section>
  )
}
