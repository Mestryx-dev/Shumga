import { motion, useReducedMotion } from 'framer-motion'
import {
  fadeUpHidden,
  fadeUpTransition,
  fadeUpVisible,
  staggerContainer,
  staggerItemVariants,
} from '../lib/motion'

function XpBar({ pct, delay }: { pct: number; delay: number }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className="mt-4 h-2 overflow-hidden rounded-full border border-white/10 bg-void/80">
        <div
          className="h-full rounded-full bg-linear-to-r from-neon-cyan via-neon-magenta to-coin"
          style={{ width: `${pct}%` }}
        />
      </div>
    )
  }
  return (
    <div className="mt-4 h-2 overflow-hidden rounded-full border border-white/10 bg-void/80">
      <motion.div
        className="h-full rounded-full bg-linear-to-r from-neon-cyan via-neon-magenta to-coin shadow-[0_0_12px_rgba(232,121,249,0.4)]"
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

const cards = [
  {
    title: 'Build pixel-perfect',
    stat: 'DEX',
    xp: 94,
    body: 'Interfaces nettes comme un sprite sheet propre : hiérarchie lisible, zéro fatigue visuelle, combo UX + flow.',
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        <rect
          x="4"
          y="6"
          width="24"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M10 14h4v4h-4zM18 14h4v4h-4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: 'Tank & perf',
    stat: 'VIT',
    xp: 88,
    body: 'Comme un bon perso : résistance aux pics de charge, temps de chargement courts, accessibilité pas en option.',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 4 L28 10 V22 L16 28 L4 22 V10 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 10v12M10 16h12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: 'Late-game scaling',
    stat: 'INT',
    xp: 91,
    body: 'Prêt pour les DLC : contenus modulaires, sections qui scrollent avec style, animations qui en mettent plein les yeux.',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M6 24 L16 8 L26 24 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
]

export function Values() {
  const reduce = useReducedMotion()

  return (
    <section
      id="loadout"
      className="border-t border-neon-magenta/20 bg-linear-to-b from-depth/90 to-void px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="values-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-80px' }}
          transition={fadeUpTransition}
        >
          <p className="font-pixel text-[0.55rem] text-neon-amber md:text-[0.65rem]">
            MENU — SELECT EQUIPMENT
          </p>
          <h2
            id="values-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-snow md:text-5xl"
          >
            Ton loadout Shumga
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mist md:text-xl">
            Trois stats montées pour un site qui fait le même effet qu’un bon
            jeu rétro : tu veux enchaîner les niveaux.
          </p>
        </motion.div>

        {reduce ? (
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {cards.map((card, i) => (
              <li
                key={card.title}
                className="pixel-border rounded-sm border border-white/10 bg-ridge/50 p-8"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="font-pixel text-[0.5rem] text-neon-green">
                    {card.stat}
                  </span>
                  <div className="text-neon-cyan">{card.icon}</div>
                </div>
                <h3 className="font-display text-xl font-bold text-snow md:text-2xl">
                  {card.title}
                </h3>
                <XpBar pct={card.xp} delay={0.1 * i} />
                <p className="mt-4 text-base leading-snug text-mist">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="mt-14 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {cards.map((card, i) => (
              <motion.li
                key={card.title}
                variants={staggerItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="pixel-border rounded-sm border border-white/10 bg-ridge/50 p-8 transition-shadow hover:shadow-[0_0_40px_-10px_rgba(232,121,249,0.35)]"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="font-pixel text-[0.5rem] text-neon-green md:text-[0.55rem]">
                    {card.stat}
                  </span>
                  <div className="text-neon-cyan">{card.icon}</div>
                </div>
                <h3 className="font-display text-xl font-bold text-snow md:text-2xl">
                  {card.title}
                </h3>
                <XpBar pct={card.xp} delay={0.15 + i * 0.12} />
                <p className="mt-4 text-base leading-snug text-mist">
                  {card.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  )
}
