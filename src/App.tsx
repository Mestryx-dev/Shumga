import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PreviewGallery } from './components/PreviewGallery'
import { Values } from './components/Values'

function App() {
  return (
    <>
      <div className="shumga-grain" aria-hidden />
      <div className="relative z-10 min-h-svh">
        <Header />
        <main>
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
