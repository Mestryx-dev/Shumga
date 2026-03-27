import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpHidden, fadeUpTransition, fadeUpVisible } from '../lib/motion'

export function CtaSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="contact"
      className="px-5 pb-24 pt-8 md:px-8 md:pb-32"
      aria-labelledby="cta-heading"
    >
      <motion.div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-sm border-2 border-neon-magenta/40 bg-linear-to-br from-ridge via-depth to-void px-6 py-14 text-center md:px-16 md:py-20"
        initial={reduce ? false : fadeUpHidden}
        whileInView={reduce ? undefined : fadeUpVisible}
        viewport={{ once: true, margin: '-60px' }}
        transition={fadeUpTransition}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          animate={
            reduce
              ? undefined
              : {
                  background: [
                    'radial-gradient(circle at 20% 30%, rgba(34,211,238,0.25), transparent 50%)',
                    'radial-gradient(circle at 80% 70%, rgba(232,121,249,0.3), transparent 50%)',
                    'radial-gradient(circle at 20% 30%, rgba(34,211,238,0.25), transparent 50%)',
                  ],
                }
          }
          transition={
            reduce
              ? undefined
              : { duration: 8, repeat: Infinity, ease: 'linear' }
          }
        />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon-cyan/25 blur-[70px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-coin/20 blur-[60px]"
          aria-hidden
        />
        <p className="relative font-pixel text-[0.55rem] text-neon-green md:text-[0.65rem]">
          BOSS STAGE — CONTINUE?
        </p>
        <h2
          id="cta-heading"
          className="relative mt-4 font-display text-3xl font-extrabold tracking-tight text-snow md:text-5xl"
        >
          Game over ? Pas chez Shumga.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-mist md:text-xl">
          Envoie un mail : on spawn en coop pour parler de ton projet, de ton
          univers jeu vidéo, ou d’un site qui doit faire le même effet qu’un
          trailer E3 (mais en 2026, en mieux).
        </p>
        <motion.div
          className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
          animate={
            reduce ? undefined : { scale: [1, 1.02, 1] }
          }
          transition={
            reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <a
            href="mailto:contact@shumga.example"
            className="shumga-focus pixel-border inline-flex w-full items-center justify-center rounded-sm bg-coin px-10 py-4 text-lg font-bold uppercase tracking-wide text-void shadow-[0_0_48px_-8px_rgba(255,217,61,0.65)] transition hover:bg-coin-hot sm:w-auto"
          >
            contact@shumga.example
          </a>
          <span className="text-base text-mist/90">
            Remplace par ton vrai e-mail — pas de pay-to-win.
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
