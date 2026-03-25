import { motion, useReducedMotion } from 'framer-motion'

const nav = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#pourquoi-shumga', label: 'Pourquoi Shumga' },
  { href: '#apercu', label: 'Aperçu' },
]

export function Header() {
  const reduce = useReducedMotion()

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/5 bg-void/75 backdrop-blur-xl"
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#accueil"
            className="shrink-0 font-display text-lg font-semibold tracking-tight text-snow transition-colors hover:text-ember"
          >
            Shumga
          </a>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navigation principale"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-mist transition-colors hover:text-snow"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="shrink-0 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-void shadow-[0_0_40px_-8px_rgba(232,160,92,0.55)] transition-transform hover:scale-[1.02] hover:bg-ember-hot focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-void active:scale-[0.98]"
          >
            Nous contacter
          </a>
        </div>
        <nav
          className="mt-3 flex gap-5 overflow-x-auto pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Navigation sections"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs font-medium text-mist transition-colors hover:text-snow"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
