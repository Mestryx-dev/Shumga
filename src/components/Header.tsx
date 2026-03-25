import { motion, useReducedMotion } from 'framer-motion'

const nav = [
  { href: '#accueil', label: 'Spawn' },
  { href: '#loadout', label: 'Loadout' },
  { href: '#apercu', label: 'Galerie' },
]

export function Header() {
  const reduce = useReducedMotion()

  return (
    <motion.header
      className="sticky top-0 z-40 border-b-2 border-neon-cyan/30 bg-void/85 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-5 py-3 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#accueil"
            className="group shrink-0 font-pixel text-[0.65rem] leading-tight text-neon-cyan transition [text-shadow:0_0_12px_rgba(34,211,238,0.5)] hover:text-coin md:text-[0.75rem]"
          >
            SHUMGA
            <span className="mt-0.5 block font-body text-xs font-normal normal-case text-mist group-hover:text-snow">
              continue?
            </span>
          </a>
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Navigation principale"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-lg text-mist transition hover:text-neon-magenta"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="shrink-0 rounded-sm border-2 border-coin bg-coin/90 px-4 py-2 font-body text-lg font-bold uppercase tracking-wide text-void shadow-[0_0_24px_-4px_rgba(255,217,61,0.6)] transition hover:bg-coin hover:shadow-[0_0_32px_-4px_rgba(255,217,61,0.85)] focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            Insert coin
          </a>
        </div>
        <nav
          className="mt-2 flex gap-4 overflow-x-auto pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Navigation sections"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-body text-base text-mist"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
