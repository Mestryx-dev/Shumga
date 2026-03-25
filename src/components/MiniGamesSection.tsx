import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpHidden, fadeUpTransition, fadeUpVisible } from '../lib/motion'
import { SnakeGame } from './games/SnakeGame'
import { TicTacToe } from './games/TicTacToe'

export function MiniGamesSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="arcade"
      className="border-t border-neon-cyan/20 bg-void px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="arcade-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-80px' }}
          transition={fadeUpTransition}
          className="mb-12 text-center md:text-left"
        >
          <p className="font-pixel text-[0.55rem] text-coin md:text-[0.65rem]">
            BONUS STAGE — ARCADE
          </p>
          <h2
            id="arcade-heading"
            className="mt-3 font-display text-3xl font-bold text-snow md:text-5xl"
          >
            Pause jeu — 2 mini boss
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-mist md:mx-0 md:text-xl">
            Morpion local et Snake rétro. Gratuit, sans loot box.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-12"
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...fadeUpTransition, delay: reduce ? 0 : 0.08 }}
        >
          <TicTacToe />
          <SnakeGame />
        </motion.div>
      </div>
    </section>
  )
}
