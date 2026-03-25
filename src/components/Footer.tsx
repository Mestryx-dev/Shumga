export function Footer() {
  return (
    <footer
      className="border-t-2 border-neon-cyan/20 bg-depth px-5 py-12 md:px-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-pixel text-[0.7rem] text-neon-cyan">SHUMGA</p>
          <p className="mt-3 max-w-sm text-lg text-mist">
            Built with Vite + React + Tailwind + Framer Motion. GG WP. Pense à
            brancher tes vrais liens légaux quand tu passes en prod.
          </p>
        </div>
        <nav aria-label="Liens de pied de page">
          <ul className="flex flex-wrap items-center justify-center gap-6 font-body text-lg text-mist">
            <li>
              <a href="#" className="transition hover:text-neon-magenta">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-neon-magenta">
                Confidentialité
              </a>
            </li>
            <li>
              <a href="#accueil" className="transition hover:text-coin">
                Respawn (haut)
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center font-pixel text-[0.45rem] text-mist/50 md:text-left md:text-[0.5rem]">
        © {new Date().getFullYear()} SHUMGA — ALL RIGHTS RESERVED — NO AFK
      </p>
    </footer>
  )
}
