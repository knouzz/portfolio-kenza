import { useEffect, useState } from 'react'
import DemoPanel from './DemoPanel'
import { projectBullets } from '../data/projectBullets'

// ─── Reusable section block ───────────────────────────────────────────────────
function Block({ label, children }) {
  return (
    <div className="border-t border-border pt-5 mt-5">
      <p className="font-mono text-[10px] tracking-[0.2em] text-amber/55 mb-4">{label}</p>
      {children}
    </div>
  )
}

// ─── Bullet list ──────────────────────────────────────────────────────────────
function Bullets({ items, kpi = false }) {
  return (
    <ul className="space-y-2.5">
      {items.map((text, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${kpi ? 'bg-kpi' : 'bg-amber/50'}`} />
          <span className={`text-sm leading-relaxed ${kpi ? 'text-text-bright font-medium' : 'text-text'}`}>
            {text}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ─── Numbered approach steps ──────────────────────────────────────────────────
function Steps({ items }) {
  return (
    <ol className="space-y-3">
      {items.map(({ n, text }) => (
        <li key={n} className="flex items-start gap-4">
          <span className="shrink-0 w-5 h-5 rounded border border-amber/25 flex items-center justify-center">
            <span className="font-mono text-[9px] text-amber/60">{n}</span>
          </span>
          <span className="text-sm text-text leading-relaxed">{text}</span>
        </li>
      ))}
    </ol>
  )
}

// ─── Impact metric cards ──────────────────────────────────────────────────────
function ImpactBullets({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((text, i) => (
        <div key={i} className="bg-navy/60 border border-border rounded-lg px-4 py-3 flex items-start gap-3">
          <span className="mt-1 w-1 h-1 rounded-full bg-kpi shrink-0" />
          <span className="font-mono text-xs text-kpi leading-snug">{text}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export default function ProjectModal({ project, lang, onClose, initialTab = 'case-study' }) {
  const t = project[lang]
  const [activeTab, setActiveTab] = useState(initialTab)

  // Structured bullets for this project (if available)
  const bullets = projectBullets[project.id]?.[lang] ?? null

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Reset to initialTab whenever a new project opens
  useEffect(() => { setActiveTab(initialTab) }, [project.id, initialTab])

  const tabs = [
    { id: 'case-study', label: lang === 'en' ? 'PROJECT' : 'PROJET' },
    { id: 'demo',       label: 'DEMO' },
  ]

  const sectionLabels = {
    en: {
      context:   'A. CONTEXT',
      challenge: 'B. THE CHALLENGE',
      approach:  'C. ANALYTICAL APPROACH',
      tools:     'D. TOOLS & STACK',
      insights:  'E. KEY INSIGHTS',
      impact:    'F. IMPACT & VALUE',
    },
    fr: {
      context:   'A. CONTEXTE',
      challenge: 'B. LE DÉFI',
      approach:  'C. APPROCHE ANALYTIQUE',
      tools:     'D. OUTILS & STACK',
      insights:  'E. INSIGHTS CLÉS',
      impact:    'F. IMPACT & VALEUR',
    },
  }
  const sl = sectionLabels[lang]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/92 backdrop-blur-md" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-surface border border-border rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(232,237,245,0.10)' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Fixed header ─────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-border flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {project.flagship && (
                <span className="tag-amber text-[10px]">
                  {lang === 'en' ? 'FLAGSHIP' : 'PHARE'}
                </span>
              )}
              <span className="font-mono text-[10px] text-text-dim tracking-widest">
                {project.category}
              </span>
            </div>
            <h2 className="font-display font-semibold text-xl text-text-bright">{t.title}</h2>
            <p className="font-mono text-xs text-silver mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-border-light hover:text-text-bright transition-all duration-200 mt-0.5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
        <div className="flex items-center px-6 border-b border-border bg-bg/20 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono text-[10px] tracking-[0.15em] py-3.5 mr-6 border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-amber text-amber'
                  : 'border-transparent text-text-dim hover:text-silver'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Scrollable body ───────────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-6 py-5">

          {activeTab === 'case-study' ? (
            <>
              {/* Impact summary banner */}
              <div className="panel rounded-xl p-4 mb-4 border-l-2 border-l-amber/40">
                <p className="font-mono text-[9px] tracking-widest text-amber/55 mb-1.5">
                  {lang === 'en' ? 'IMPACT SUMMARY' : "RÉSUMÉ D'IMPACT"}
                </p>
                <p className="text-text-bright text-sm font-medium leading-relaxed">{t.impact}</p>
              </div>

              {/* KPI metric cards */}
              <div className="grid grid-cols-3 gap-2.5 mb-1">
                {project.metrics.map(m => (
                  <div key={m.value} className="bg-navy/70 border border-border rounded-xl p-3.5 text-center">
                    <div className="font-display font-semibold text-xl text-kpi">{m.value}</div>
                    <div className="font-mono text-[9px] text-text-dim mt-1 leading-tight">
                      {m.label[lang]}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Structured case study (when bullets available) ─────────── */}
              {bullets ? (
                <>
                  {/* A. Context */}
                  <Block label={sl.context}>
                    <Bullets items={bullets.context} />
                  </Block>

                  {/* B. Challenge */}
                  <Block label={sl.challenge}>
                    <Bullets items={bullets.challenge} />
                  </Block>

                  {/* C. Analytical approach */}
                  <Block label={sl.approach}>
                    <Steps items={bullets.approach} />
                  </Block>

                  {/* D. Tools & Stack */}
                  <Block label={sl.tools}>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </Block>

                  {/* E. Key Insights */}
                  <Block label={sl.insights}>
                    <Bullets items={bullets.insights} kpi={false} />
                  </Block>

                  {/* F. Impact & Value */}
                  <Block label={sl.impact}>
                    <ImpactBullets items={bullets.impact} />
                  </Block>
                </>
              ) : (
                /* ── Fallback: paragraph rendering ──────────────────────── */
                <>
                  {[
                    { label: lang === 'en' ? 'CONTEXT'     : 'CONTEXTE',   text: t.context },
                    { label: lang === 'en' ? 'THE PROBLEM' : 'LE PROBLÈME', text: t.problem },
                    { label: lang === 'en' ? 'APPROACH'    : 'APPROCHE',    text: t.approach },
                    { label: lang === 'en' ? 'SOLUTION'    : 'SOLUTION',    text: t.solution },
                    { label: lang === 'en' ? 'OUTCOME'     : 'RÉSULTAT',    text: t.result },
                  ].map(({ label, text }) => (
                    <Block key={label} label={label}>
                      <p className="text-text text-sm leading-relaxed">{text}</p>
                    </Block>
                  ))}
                  <Block label={lang === 'en' ? 'TOOLS & STACK' : 'OUTILS & STACK'}>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </Block>
                </>
              )}

              {/* "Check Demo" entry point */}
              <div className="mt-5 pt-5 border-t border-border">
                <button
                  onClick={() => setActiveTab('demo')}
                  className="w-full flex items-center justify-between panel rounded-xl px-5 py-4 hover:border-amber/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-border group-hover:border-amber/30 flex items-center justify-center transition-all duration-200">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-text-dim group-hover:text-amber transition-colors duration-200">
                        <polygon points="2,1 11,6 2,11" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-mono text-[10px] tracking-widest text-amber/55">
                        {lang === 'en' ? 'INTERACTIVE DEMO' : 'DÉMO INTERACTIVE'}
                      </p>
                      <p className="text-text-bright text-sm font-medium mt-0.5">
                        {lang === 'en' ? 'Check Demo' : 'Voir la Démo'}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-text-dim group-hover:text-amber transition-colors duration-200">→</span>
                </button>
              </div>
            </>
          ) : (
            /* ── Demo tab ────────────────────────────────────────────────── */
            <DemoPanel
              project={project}
              lang={lang}
              isActive={activeTab === 'demo'}
            />
          )}

        </div>
      </div>
    </div>
  )
}
