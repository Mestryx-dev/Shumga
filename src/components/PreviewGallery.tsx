import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpHidden, fadeUpTransition, fadeUpVisible } from '../lib/motion'

const placeholders = [
  { label: 'Ambiance', from: 'from-glow/30', to: 'to-void' },
  { label: 'Matériau', from: 'from-ember/25', to: 'to-depth' },
  { label: 'Structure', from: 'from-snow/10', to: 'to-ridge' },
  { label: 'Lumière', from: 'from-ember-hot/20', to: 'to-void' },
]

export function PreviewGallery() {
  const reduce = useReducedMotion()

  return (
    <section
      id="apercu"
      className="px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="preview-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-80px' }}
          transition={fadeUpTransition}
          className="mb-12"
        >
          <h2
            id="preview-heading"
            className="font-display text-3xl font-bold tracking-tight text-snow md:text-4xl"
          >
            Aperçu
          </h2>
          <p className="mt-4 max-w-2xl text-base text-mist md:text-lg">
            Quelques directions visuelles — remplacez ces blocs par vos captures,
            maquettes ou photographies lorsque vous serez prêt.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...fadeUpTransition, delay: 0.08 }}
        >
          {placeholders.map((item, i) => (
            <motion.div
              key={item.label}
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${item.from} ${item.to} md:aspect-[3/4]`}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                ...fadeUpTransition,
                delay: reduce ? 0 : 0.06 * i,
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
              <span className="absolute bottom-4 left-4 font-display text-xs font-semibold uppercase tracking-wider text-snow/80">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
