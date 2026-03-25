import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PreviewGallery } from './components/PreviewGallery'
import { Values } from './components/Values'

function App() {
  return (
    <>
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <div className="shumga-grain" aria-hidden />
      <div className="relative z-10 min-h-svh">
        <Header />
        <main id="contenu-principal" tabIndex={-1}>
          <Hero />
          <Values />
          <PreviewGallery />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
