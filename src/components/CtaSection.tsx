import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpHidden, fadeUpTransition, fadeUpVisible } from '../lib/motion'

export function CtaSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="contact"
      className="px-5 pb-24 pt-4 md:px-8 md:pb-32"
      aria-labelledby="cta-heading"
    >
      <motion.div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-ember/25 bg-gradient-to-br from-ridge/90 via-depth to-void px-8 py-16 text-center md:px-16 md:py-20"
        initial={reduce ? false : fadeUpHidden}
        whileInView={reduce ? undefined : fadeUpVisible}
        viewport={{ once: true, margin: '-60px' }}
        transition={fadeUpTransition}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ember/20 blur-[80px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-glow/20 blur-[70px]"
          aria-hidden
        />
        <h2
          id="cta-heading"
          className="relative font-display text-3xl font-bold tracking-tight text-snow md:text-4xl"
        >
          Prêt à gravir la prochaine étape ?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base text-mist md:text-lg">
          Écrivez-nous pour parler de votre projet, de vos délais ou simplement
          pour dire bonjour. Nous répondons avec attention.
        </p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:contact@shumga.example"
            className="inline-flex w-full items-center justify-center rounded-full bg-ember px-10 py-4 text-sm font-semibold text-void shadow-[0_0_56px_-12px_rgba(232,160,92,0.65)] transition hover:bg-ember-hot sm:w-auto"
          >
            contact@shumga.example
          </a>
          <span className="text-sm text-mist/80">Remplacez l’adresse par la vôtre.</span>
        </div>
      </motion.div>
    </section>
  )
}
