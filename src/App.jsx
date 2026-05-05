import Nav from './components/Nav'
import Hero from './components/Hero'
import Snapshot from './components/Snapshot'
import Playbook from './components/Playbook'
import Missions from './components/Missions'
import Toolkit from './components/Toolkit'
import Reviews from './components/Reviews'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />
      <main>
        <Hero />
        <Snapshot />
        <Playbook />
        <Missions />
        <Toolkit />
        <Reviews />
        <Contact />
      </main>
    </div>
  )
}
