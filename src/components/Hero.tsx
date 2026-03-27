import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HERO_IMAGE } from '../constants/media'
import {
  fadeUpHidden,
  fadeUpTransition,
  fadeUpVisible,
} from '../lib/motion'

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4])

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative overflow-hidden px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgba(232,121,249,0.18),transparent),radial-gradient(ellipse_70%_50%_at_10%_80%,rgba(34,211,238,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-neon-cyan/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-neon-magenta/15 blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <motion.p
            className="mb-4 font-pixel text-[0.6rem] leading-relaxed text-neon-cyan md:text-[0.7rem]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...fadeUpTransition, delay: 0.05 }}
          >
            PLAYER 1 — INSERT COIN
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-snow md:text-5xl lg:text-6xl"
            initial={reduce ? false : fadeUpHidden}
            animate={reduce ? undefined : fadeUpVisible}
            transition={{ ...fadeUpTransition, delay: 0.1 }}
          >
            Shumga
            <span className="mt-1 block bg-linear-to-r from-neon-cyan via-snow to-neon-magenta bg-clip-text text-transparent">
              mode rétro activé.
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-snug text-mist md:text-xl"
            initial={reduce ? false : fadeUpHidden}
            animate={reduce ? undefined : fadeUpVisible}
            transition={{ ...fadeUpTransition, delay: 0.18 }}
          >
            On kiffe les jeux vidéo, le pixel qui claque et les sessions jusqu’au
            bout de la nuit. Ici, c’est ta base : vibes arcade, collection,
            progression — le site qui respire la manette.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            initial={reduce ? false : fadeUpHidden}
            animate={reduce ? undefined : fadeUpVisible}
            transition={{ ...fadeUpTransition, delay: 0.26 }}
          >
            <a
              href="#contact"
              className="shumga-focus pixel-border inline-flex items-center justify-center rounded-sm bg-coin px-8 py-3.5 text-lg font-bold uppercase tracking-wide text-void shadow-[0_0_32px_-6px_rgba(255,217,61,0.7)] transition hover:bg-coin-hot"
            >
              High score — contact
            </a>
            <a
              href="#loadout"
              className="shumga-focus inline-flex items-center justify-center rounded-sm border-2 border-neon-cyan/50 bg-void/60 px-8 py-3.5 text-lg font-bold text-neon-cyan backdrop-blur-sm transition hover:border-neon-cyan hover:bg-neon-cyan/10"
            >
              Voir le loadout
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ opacity: reduce ? 1 : glowOpacity }}
        >
          <div className="pixel-border relative aspect-4/5 overflow-hidden rounded-sm border border-white/10 bg-ridge/60 shadow-[0_0_60px_-12px_rgba(232,121,249,0.4)] md:aspect-square">
            <motion.div
              className="absolute inset-0"
              style={
                reduce
                  ? undefined
                  : { y: imgY, scale: imgScale }
              }
            >
              <img
                src={HERO_IMAGE}
                alt="Ambiance gaming néon et manette"
                className="h-full w-full object-cover"
                width={1200}
                height={1200}
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-void/90 via-transparent to-neon-cyan/10 mix-blend-soft-light"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
              <span className="font-pixel text-[0.5rem] text-neon-green md:text-[0.55rem]">
                HP ████████░░
              </span>
              <span className="font-pixel text-[0.5rem] text-coin md:text-[0.55rem]">
                COINS ×99
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
