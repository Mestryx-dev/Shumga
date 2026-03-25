export function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-void px-5 py-12 md:px-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-snow">Shumga</p>
          <p className="mt-2 max-w-xs text-sm text-mist">
            Site vitrine — Vite, React, Tailwind. Contenu et mentions à adapter à
            votre contexte.
          </p>
        </div>
        <nav aria-label="Liens de pied de page">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-mist">
            <li>
              <a href="#" className="transition hover:text-snow">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-snow">
                Confidentialité
              </a>
            </li>
            <li>
              <a href="#accueil" className="transition hover:text-snow">
                Haut de page
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-mist/60 md:text-left">
        © {new Date().getFullYear()} Shumga. Tous droits réservés.
      </p>
    </footer>
  )
}
