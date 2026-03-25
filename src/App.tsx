import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PreviewGallery } from './components/PreviewGallery'
import { RetroMarquee } from './components/RetroMarquee'
import { ScrollProgressBar } from './components/ScrollProgressBar'
import { Values } from './components/Values'

function App() {
  return (
    <>
      <ScrollProgressBar />
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-sm focus:border-2 focus:border-neon-cyan focus:bg-coin focus:px-4 focus:py-2 focus:font-body focus:text-lg focus:font-bold focus:text-void focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <div className="crt-vignette" aria-hidden />
      <div className="crt-scanlines" aria-hidden />
      <div className="shumga-grain" aria-hidden />
      <div className="relative z-10 min-h-svh">
        <Header />
        <main id="contenu-principal" tabIndex={-1}>
          <Hero />
          <RetroMarquee />
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
