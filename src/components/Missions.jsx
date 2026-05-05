import { useState } from 'react'
import { missions } from '../data/missions'
import CaseModal from './CaseModal'
import ProductHubModal from './ProductHubModal'

function MissionCard({ mission, onOpen }) {
  const isFeatured = mission.featured

  return (
    <div
      className={`panel flex flex-col gap-3 p-4 cursor-pointer transition-all duration-200
        ${isFeatured
          ? 'border-green/30 hover:glow-green-sm md:col-span-2'
          : 'hover:glow-accent-sm'}`}
      onClick={() => onOpen(mission)}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`sys-label mb-1 ${isFeatured ? 'text-green/60' : ''}`}>
            mission.{mission.id}
          </p>
          <h3 className={`font-sans text-sm font-medium ${isFeatured ? 'text-green' : 'text-text-bright'}`}>
            {mission.title}
          </h3>
        </div>
        {isFeatured && <span className="tag-green shrink-0">featured</span>}
      </div>

      {/* subtitle */}
      <p className="font-mono text-xs text-text-dim">{mission.subtitle}</p>

      {/* description */}
      <p className="font-sans text-xs text-text leading-relaxed flex-1">{mission.description}</p>

      {/* featured metrics strip */}
      {isFeatured && (
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-green/20">
          {[
            ['−75%', 'time saved'],
            ['360h', 'saved / yr'],
            ['€9k',  'annual roi'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-mono text-lg text-green font-medium">{v}</p>
              <p className="font-mono text-xs text-text-dim">{l}</p>
            </div>
          ))}
        </div>
      )}

      {/* tags */}
      <div className="flex flex-wrap gap-1.5">
        <span className={isFeatured ? 'tag-green' : 'tag-accent'}>type: {mission.type}</span>
        <span className="tag">status: {mission.status}</span>
        <span className="tag">impact: {mission.impact}</span>
      </div>

      {/* open link */}
      <button
        className={`font-mono text-xs self-start mt-1 transition-colors ${
          isFeatured
            ? 'text-green/60 hover:text-green'
            : 'text-accent/60 hover:text-accent'
        }`}
        onClick={(e) => { e.stopPropagation(); onOpen(mission) }}
      >
        open case study →
      </button>
    </div>
  )
}

export default function Missions() {
  const [active, setActive] = useState(null)

  return (
    <section id="missions" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="sys-label mb-6">[ mission.log ]</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active && active.id === '04' && (
        <ProductHubModal onClose={() => setActive(null)} />
      )}
      {active && active.id !== '04' && (
        <CaseModal mission={active} onClose={() => setActive(null)} />
      )}
    </section>
  )
}
