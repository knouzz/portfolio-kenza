import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useLang } from '../context/LanguageContext'
import { thoughts, thoughtCategories } from '../data/thoughts'

// ─── Signal → visual style ─────────────────────────────────────────────────────
const SIGNAL = {
  high:       { color: '#5CF2C5', bg: 'rgba(92,242,197,0.08)',  border: 'rgba(92,242,197,0.25)' },
  human:      { color: '#5CF2C5', bg: 'rgba(92,242,197,0.08)',  border: 'rgba(92,242,197,0.25)' },
  emerging:   { color: '#C9A848', bg: 'rgba(201,168,72,0.07)',  border: 'rgba(201,168,72,0.26)' },
  cultural:   { color: '#C9A848', bg: 'rgba(201,168,72,0.07)',  border: 'rgba(201,168,72,0.26)' },
  structural: { color: 'rgba(239,100,80,0.90)', bg: 'rgba(239,100,80,0.07)', border: 'rgba(239,100,80,0.24)' },
}

// ─── Expandable "Explore Further" panel ────────────────────────────────────────
function ExploreFurther({ thought, open, lang }) {
  return (
    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: open ? '400px' : '0', opacity: open ? 1 : 0 }}
    >
      <div
        className="mt-3 pt-3 flex flex-col gap-4"
        style={{ borderTop: '1px solid rgba(154,168,188,0.08)' }}
      >
        {/* Next exploration */}
        <div>
          <p
            className="font-mono text-[7.5px] tracking-[0.18em] mb-2"
            style={{ color: 'rgba(154,168,188,0.40)' }}
          >
            {lang === 'en' ? 'NEXT EXPLORATION' : 'PROCHAINE EXPLORATION'}
          </p>
          <ul className="flex flex-col gap-1.5">
            {thought.nextExploration.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="font-mono text-[9px] mt-0.5 shrink-0"
                  style={{ color: 'rgba(92,242,197,0.45)' }}
                >
                  →
                </span>
                <span
                  className="text-[11.5px] leading-snug"
                  style={{ color: 'rgba(154,168,188,0.60)' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools / Methods */}
        <div>
          <p
            className="font-mono text-[7.5px] tracking-[0.18em] mb-2"
            style={{ color: 'rgba(154,168,188,0.40)' }}
          >
            {lang === 'en' ? 'TOOLS & METHODS' : 'OUTILS & MÉTHODES'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {thought.tools.map(tool => (
              <span
                key={tool}
                className="font-mono text-[8px] tracking-wide px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(92,242,197,0.05)',
                  border:     '1px solid rgba(92,242,197,0.15)',
                  color:      'rgba(92,242,197,0.55)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Single thought card ───────────────────────────────────────────────────────
function ThoughtCard({ thought, index, lang }) {
  const [open, setOpen] = useState(false)
  const sig = SIGNAL[thought.signal.type] || SIGNAL.high
  const hasExplore = thought.nextExploration?.length > 0

  return (
    <div
      className="relative flex flex-col rounded-2xl opacity-0 reveal-up transition-colors duration-300"
      style={{
        background:        'rgba(8,17,18,0.55)',
        border:            '1px solid rgba(154,168,188,0.09)',
        animationDelay:    `${index * 110}ms`,
        animationFillMode: 'forwards',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(154,168,188,0.18)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(154,168,188,0.09)' }}
    >
      {/* ── Card body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3.5 p-5">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {thought.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[7px] tracking-[0.14em] px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(154,168,188,0.07)',
                border:     '1px solid rgba(154,168,188,0.12)',
                color:      'rgba(154,168,188,0.55)',
              }}
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-[15px] leading-snug text-text-bright">
          {lang === 'fr' && thought.title_fr ? thought.title_fr : thought.title}
        </h3>

        {/* Insight — supports paragraph breaks via \n\n */}
        <div className="flex flex-col gap-2.5">
          {(lang === 'fr' && thought.insight_fr ? thought.insight_fr : thought.insight).split('\n\n').map((para, i) => (
            <p
              key={i}
              className="text-[13px] leading-relaxed"
              style={{ color: i === 0 ? 'rgba(154,168,188,0.85)' : 'rgba(154,168,188,0.60)' }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Explore further (collapsible) */}
        {hasExplore && (
          <ExploreFurther thought={thought} open={open} lang={lang} />
        )}
      </div>

      {/* ── Card footer ───────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3 mt-auto"
        style={{ borderTop: '1px solid rgba(154,168,188,0.07)' }}
      >
        {/* Signal badge */}
        <span
          className="inline-flex items-center gap-1.5 font-mono text-[7.5px] tracking-[0.14em] px-2 py-1 rounded"
          style={{ background: sig.bg, border: `1px solid ${sig.border}`, color: sig.color }}
        >
          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: sig.color }} />
          {thought.signal.label}
        </span>

        <div className="flex items-center gap-3">
          {/* Date */}
          <span
            className="font-mono text-[7.5px] tracking-wide"
            style={{ color: 'rgba(154,168,188,0.30)' }}
          >
            {thought.date}
          </span>

          {/* Explore toggle */}
          {hasExplore && (
            <button
              onClick={() => setOpen(o => !o)}
              className="inline-flex items-center gap-1 font-mono text-[7.5px] tracking-[0.12em] transition-all duration-200"
              style={{ color: open ? 'rgba(92,242,197,0.70)' : 'rgba(154,168,188,0.40)' }}
            >
              <span
                className="inline-block transition-transform duration-200"
                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ▾
              </span>
              {open
                ? (lang === 'en' ? 'COLLAPSE' : 'RÉDUIRE')
                : (lang === 'en' ? 'EXPLORE' : 'EXPLORER')
              }
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Thoughts() {
  const { lang } = useLang()
  const [ref, inView] = useInView()
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? thoughts
    : thoughts.filter(t => t.category === activeCategory)

  return (
    <section id="thoughts" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section label ─────────────────────────────────────────────── */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">
            {lang === 'en' ? 'PERSONAL NOTEBOOK' : 'CARNET PERSONNEL'}
          </span>
        </div>

        {/* ── Heading row ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className={`font-display font-semibold text-3xl lg:text-4xl text-text-bright opacity-0 ${inView ? 'reveal-up' : ''}`}
              style={{ animationDelay: '100ms' }}
            >
              {lang === 'en' ? 'Thoughts' : 'Réflexions'}
            </h2>
            <p
              className={`font-mono text-xs mt-2 md:whitespace-nowrap opacity-0 ${inView ? 'reveal-up' : ''}`}
              style={{ animationDelay: '200ms', color: 'rgba(154,168,188,0.40)' }}
            >
              {lang === 'en'
                ? 'Observations in motion, on people, culture, systems, and what connects them.'
                : 'Observations en cours, sur les gens, la culture, les systèmes et ce qui les relie.'}
            </p>
          </div>

          {/* ── Category filters ────────────────────────────────────────── */}
          <div
            className={`flex flex-wrap gap-1.5 opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '280ms' }}
          >
            {thoughtCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="font-mono text-[8px] tracking-[0.13em] px-3 py-1.5 rounded-lg transition-all duration-200"
                style={activeCategory === cat.id
                  ? { background: 'rgba(92,242,197,0.10)', border: '1px solid rgba(92,242,197,0.28)', color: '#5CF2C5' }
                  : { background: 'transparent', border: '1px solid rgba(154,168,188,0.13)', color: 'rgba(154,168,188,0.45)' }
                }
              >
                {(lang === 'en' ? cat.label : cat.labelFr).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ── Cards grid ────────────────────────────────────────────────── */}
        {inView && (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((thought, i) => (
              <ThoughtCard
                key={thought.id}
                thought={thought}
                index={i}
                lang={lang}
              />
            ))}
          </div>
        )}

        {/* ── Footer note ───────────────────────────────────────────────── */}
        {inView && (
          <p
            className="font-mono text-[7.5px] tracking-widest mt-10 text-center opacity-0 reveal-up"
            style={{
              color:             'rgba(154,168,188,0.22)',
              animationDelay:    `${filtered.length * 110 + 180}ms`,
              animationFillMode: 'forwards',
            }}
          >
            {lang === 'en'
              ? 'CONTINUOUSLY UPDATED · KENZA EN-NASSEF'
              : 'MIS À JOUR EN CONTINU · KENZA EN-NASSEF'}
          </p>
        )}

      </div>
    </section>
  )
}
