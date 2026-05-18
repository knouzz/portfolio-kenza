import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav'
import About from './components/About'
import MarketIntelligenceMap from './components/MarketIntelligenceMap'
import Projects from './components/Projects'
import Thoughts from './components/Thoughts'
import Toolkit from './components/Toolkit'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg text-text">
        <Nav />
        <main>
          <About />
          <MarketIntelligenceMap />
          <Projects />
          <Toolkit />
          <Thoughts />
        </main>
      </div>
    </LanguageProvider>
  )
}
