import { motion, useReducedMotion } from 'framer-motion'
import {
  fadeUpHidden,
  fadeUpTransition,
  fadeUpVisible,
  staggerContainer,
  staggerItemHidden,
  staggerItemVisible,
} from '../lib/motion'

const cards = [
  {
    title: 'Clarté',
    body: 'Chaque mot et chaque écran servent un objectif. Pas de bruit, pas de fioritures inutiles.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3v18M3 12h18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Résilience',
    body: 'Des bases solides pour évoluer sans tout reconstruire. Performance et accessibilité dès le départ.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 14c2-4 6-6 8-8 2 2 6 4 8 8-2 3-5 5-8 6-3-1-6-3-8-6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Horizon',
    body: 'Une esthétique qui invite au calme et à la projection — comme un sommet au lever du jour.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 17h18M5 13l4-4 3 3 5-6 4 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export function Values() {
  const reduce = useReducedMotion()

  return (
    <section
      id="pourquoi-shumga"
      className="border-t border-white/5 bg-depth/50 px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="values-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-80px' }}
          transition={fadeUpTransition}
        >
          <h2
            id="values-heading"
            className="font-display text-3xl font-bold tracking-tight text-snow md:text-4xl"
          >
            Pourquoi Shumga
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
            Trois piliers pour un site qui ne se contente pas d’exister : il
            marque les esprits et tient dans la durée.
          </p>
        </motion.div>

        {reduce ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <li
                key={card.title}
                className="group rounded-2xl border border-white/8 bg-ridge/40 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition hover:border-ember/25 hover:bg-ridge/60"
              >
                <div className="mb-5 inline-flex rounded-xl bg-void/80 p-3 text-ember transition group-hover:text-ember-hot">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-snow">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="mt-14 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {cards.map((card) => (
              <motion.li
                key={card.title}
                variants={{
                  hidden: staggerItemHidden,
                  visible: {
                    ...staggerItemVisible,
                    transition: fadeUpTransition,
                  },
                }}
                className="group rounded-2xl border border-white/8 bg-ridge/40 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition hover:border-ember/25 hover:bg-ridge/60"
              >
                <div className="mb-5 inline-flex rounded-xl bg-void/80 p-3 text-ember transition group-hover:text-ember-hot">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-snow">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
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
