import { useEffect } from 'react'

export default function CaseModal({ mission, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const isFeatured = mission.featured

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full max-w-2xl bg-surface border rounded-sm
        ${isFeatured ? 'border-green/30 glow-green-sm' : 'border-border glow-accent-sm'}`}>

        {/* header bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b
          ${isFeatured ? 'border-green/20 bg-green/5' : 'border-border bg-panel'}`}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-text-dim">mission.{mission.id}</span>
            <span className={isFeatured ? 'tag-green' : 'tag-accent'}>{mission.type}</span>
            {isFeatured && <span className="tag-green">featured</span>}
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-text-dim hover:text-text transition-colors"
            style={{ textTransform: 'none' }}
          >
            [ close ]
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* title */}
          <div>
            <h2 className={`font-sans text-xl font-medium mb-1 ${isFeatured ? 'text-green' : 'text-text-bright'}`}>
              {mission.title}
            </h2>
            <p className="font-mono text-xs text-text-dim">{mission.subtitle}</p>
          </div>

          {/* image placeholder */}
          <div className="w-full h-40 flex items-center justify-center bg-panel border border-border rounded-sm">
            {/* PLACEHOLDER: <img src="..." className="w-full h-full object-cover rounded-sm" /> */}
            <div className="text-center">
              <p className="font-mono text-xs text-text-dim/40 mb-1">[ screenshot ]</p>
              <p className="font-mono text-xs text-text-dim/30">{mission.imageAlt}</p>
            </div>
          </div>

          {/* case sections */}
          {[
            { key: 'context',  value: mission.context },
            { key: 'problem',  value: mission.problem },
            { key: 'solution', value: mission.solution },
            { key: 'impact',   value: mission.impact_detail },
          ].map(({ key, value }) => (
            <div key={key} className="flex gap-4">
              <span className={`font-mono text-xs w-14 shrink-0 pt-0.5 ${isFeatured ? 'text-green/60' : 'text-accent/60'}`}>
                {key}
              </span>
              <p className="font-sans text-sm text-text leading-relaxed">{value}</p>
            </div>
          ))}

          {/* approach */}
          <div className="flex gap-4">
            <span className={`font-mono text-xs w-14 shrink-0 pt-0.5 ${isFeatured ? 'text-green/60' : 'text-accent/60'}`}>
              approach
            </span>
            <div className="space-y-1.5">
              {mission.approach.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-mono text-xs text-text-dim mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                  <span className="font-sans text-sm text-text">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tools */}
          <div className="flex gap-4">
            <span className={`font-mono text-xs w-14 shrink-0 pt-0.5 ${isFeatured ? 'text-green/60' : 'text-accent/60'}`}>
              tools
            </span>
            <div className="flex flex-wrap gap-1.5">
              {mission.tools.map((t) => (
                <span key={t} className={isFeatured ? 'tag-green' : 'tag-accent'}>{t}</span>
              ))}
            </div>
          </div>

          {/* action buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {/* PLACEHOLDER: set mission.demoUrl to activate */}
            <button
              disabled={!mission.demoUrl}
              onClick={() => mission.demoUrl && window.open(mission.demoUrl, '_blank')}
              className={`font-mono text-xs px-3 py-1.5 border transition-colors
                ${!mission.demoUrl
                  ? 'border-border text-text-dim/40 cursor-not-allowed'
                  : 'border-accent/40 text-accent hover:bg-accent/10'}`}
            >
              ▶ {mission.demoUrl ? 'view demo' : 'demo — coming soon'}
            </button>
            {/* PLACEHOLDER: set mission.githubUrl to activate */}
            <button
              disabled={!mission.githubUrl}
              onClick={() => mission.githubUrl && window.open(mission.githubUrl, '_blank')}
              className={`font-mono text-xs px-3 py-1.5 border transition-colors
                ${!mission.githubUrl
                  ? 'border-border text-text-dim/40 cursor-not-allowed'
                  : 'border-accent/40 text-accent hover:bg-accent/10'}`}
            >
              ↗ {mission.githubUrl ? 'view on github' : 'github — private repo'}
            </button>
            <button
              onClick={onClose}
              className="font-mono text-xs px-3 py-1.5 border border-border text-text-dim hover:text-text hover:border-border/80 transition-colors ml-auto"
            >
              close
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
