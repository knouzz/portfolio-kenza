import { useState, useEffect, useCallback } from 'react'
import { activeSignal, signalLabMeta } from '../data/signalLab'
import { projects } from '../data/projects'

// ─── Screenshot lightbox ───────────────────────────────────────────────────────
function ScreenshotLightbox({ screenshots, lang, onClose, initialIdx = 0 }) {
  const [idx, setIdx] = useState(initialIdx)
  const total = screenshots.length
  const shot = screenshots[idx]

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/96 backdrop-blur-lg" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-widest text-text-dim">SCREENSHOTS</span>
            <span className="font-mono text-[9px] text-text-dim/50">{idx + 1} / {total}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-amber/40 hover:text-amber transition-all duration-200 text-lg font-light"
          >×</button>
        </div>

        {/* Image */}
        <div className="relative rounded-xl overflow-hidden border border-border bg-panel" style={{ aspectRatio: '16/9' }}>
          <img
            key={idx}
            src={shot.src}
            alt={shot.caption?.[lang] || `Screenshot ${idx + 1}`}
            className="w-full h-full object-contain"
          />
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-bg/80 border border-border flex items-center justify-center text-silver hover:border-amber/40 hover:text-amber transition-all duration-200 backdrop-blur-sm text-lg font-light"
              >‹</button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-bg/80 border border-border flex items-center justify-center text-silver hover:border-amber/40 hover:text-amber transition-all duration-200 backdrop-blur-sm text-lg font-light"
              >›</button>
            </>
          )}
        </div>

        {/* Caption + note */}
        {shot.caption?.[lang] && (
          <p className="font-mono text-xs text-silver mt-3 leading-relaxed">{shot.caption[lang]}</p>
        )}
        {shot.note?.[lang] && (
          <div className="mt-2 pl-3 border-l-2 border-amber/25">
            <p className="text-text-dim text-sm leading-relaxed">{shot.note[lang]}</p>
          </div>
        )}

        {/* Progress pills */}
        <div className="flex items-center gap-1.5 mt-5 justify-center">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Screenshot ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-5 h-1.5 bg-amber' : 'w-1.5 h-1.5 bg-border hover:bg-silver'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Shared primitives ─────────────────────────────────────────────────────────
function SentimentBar({ value, max = 1, color = '#5CF2C5', label, pct }) {
  const w = Math.min(100, Math.max(0, (Math.abs(value) / max) * 100))
  const isNeg = value < 0
  return (
    <div className="flex items-center gap-2">
      {label && <span className="font-mono text-[9px] text-text-dim w-16 shrink-0 tracking-wide">{label}</span>}
      <div className="flex-1 h-1 rounded-full bg-border relative overflow-hidden">
        <div
          className="absolute top-0 h-full rounded-full transition-all duration-700"
          style={{ width: `${w}%`, background: isNeg ? 'rgba(239,68,68,0.70)' : color, left: 0 }}
        />
      </div>
      <span className="font-mono text-[10px] text-text-bright w-10 text-right shrink-0">
        {pct !== undefined ? `${pct}%` : value.toFixed(3)}
      </span>
    </div>
  )
}

function WinnerBadge({ children }) {
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-[8px] tracking-[0.15em] px-1.5 py-0.5 rounded"
      style={{ background: 'linear-gradient(135deg, #F07832 0%, #C84010 100%)', border: '1px solid rgba(240,120,50,0.30)', color: '#fff' }}
    >
      ▲ {children}
    </span>
  )
}

function SignalBadge({ text, dim }) {
  return (
    <span
      className="font-mono text-[8px] tracking-[0.15em] px-2 py-0.5 rounded border"
      style={dim
        ? { background: 'rgba(107,133,133,0.10)', borderColor: 'rgba(107,133,133,0.25)', color: 'rgba(107,133,133,0.70)' }
        : { background: 'linear-gradient(135deg, rgba(240,120,50,0.22) 0%, rgba(180,55,8,0.14) 100%)', borderColor: 'rgba(240,120,50,0.38)', color: '#F07832' }}
    >
      {text}
    </span>
  )
}

// ─── Executive recommendation strip ───────────────────────────────────────────
function ExecRecommendation({ signal }) {
  const v = signal.verdict
  const cards = [
    { label: 'RECOMMENDED FIRST WATCH', value: v.recommended,    sub: v.reason,         icon: '▶', accent: true  },
    { label: 'CULTURAL MOMENTUM',       value: v.momentum,       sub: v.momentumDiff,   icon: '↑', accent: true  },
    { label: 'SENTIMENT WINNER',        value: v.sentimentWinner, sub: `${signal.films.find(f => f.winner)?.positivePct}% positive mention rate`, icon: '◆', accent: true },
    { label: 'HYPE vs QUALITY',         value: v.hyper.leader,   sub: v.hyper.insight,  icon: '≠', accent: false },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className="rounded-xl p-4 flex flex-col gap-2"
          style={{
            background: c.accent ? 'linear-gradient(135deg, rgba(92,242,197,0.10) 0%, rgba(29,102,64,0.06) 100%)' : 'rgba(8,17,18,0.80)',
            border: `1px solid ${c.accent ? 'rgba(92,242,197,0.22)' : 'rgba(92,242,197,0.07)'}`,
          }}
        >
          <p className="font-mono text-[8px] tracking-[0.18em] text-text-dim">{c.label}</p>
          <p className="font-display font-semibold text-base leading-tight" style={{ color: c.accent ? '#5CF2C5' : 'var(--color-text)' }}>
            <span className="text-text-dim mr-1.5">{c.icon}</span>{c.value}
          </p>
          <p className="font-mono text-[9px] text-text-dim leading-relaxed">{c.sub}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Film KPI card ─────────────────────────────────────────────────────────────
function FilmKPI({ film }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-5"
      style={{
        background: film.winner ? 'rgba(92,242,197,0.05)' : 'rgba(8,17,18,0.60)',
        border: `1px solid ${film.winner ? 'rgba(92,242,197,0.22)' : 'rgba(92,242,197,0.07)'}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[9px] text-text-dim tracking-widest mb-1">{film.type.toUpperCase()}</p>
          <h4 className="font-display font-semibold text-lg text-text-bright leading-tight">{film.title}</h4>
          <p className="font-mono text-[9px] text-text-dim mt-0.5">{film.posts} posts analysed</p>
        </div>
        {film.winner && <WinnerBadge>WINNER</WinnerBadge>}
      </div>
      <div>
        <p className="font-mono text-[8px] tracking-widest text-text-dim mb-3">SENTIMENT BREAKDOWN</p>
        <div className="flex flex-col gap-2">
          <SentimentBar label="POSITIVE" value={film.positivePct / 100} pct={film.positivePct} color="#5CF2C5" />
          <SentimentBar label="NEGATIVE" value={film.negativePct / 100} pct={film.negativePct} color="rgba(239,68,68,0.70)" />
          <SentimentBar label="NEUTRAL"  value={film.neutralPct  / 100} pct={film.neutralPct}  color="rgba(107,133,133,0.50)" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { k: 'AVG SENTIMENT',   v: film.avgSentiment.toFixed(3) },
          { k: 'EXCITEMENT IDX',  v: film.excitementIndex.toFixed(3) },
          { k: 'HYPE INDEX',      v: film.hypeIndex.toFixed(3) },
          { k: 'AVG ENGAGEMENT',  v: film.avgEngagement.toFixed(2) },
        ].map(({ k, v }) => (
          <div key={k} className="bg-bg/60 rounded-lg p-2.5 border border-border">
            <p className="font-mono text-[8px] text-text-dim tracking-wide mb-1">{k}</p>
            <p className="font-display font-semibold text-sm" style={{ color: '#5CF2C5' }}>{v}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="font-mono text-[8px] tracking-widest text-text-dim mb-3">PLATFORM SENTIMENT</p>
        <div className="flex flex-col gap-2">
          {film.platforms.map(p => (
            <SentimentBar key={p.name} label={p.name.toUpperCase().slice(0, 8)} value={p.sentiment} max={0.35} color="#5CF2C5" />
          ))}
        </div>
      </div>
      <div
        className="rounded-lg px-3 py-2"
        style={{ background: 'rgba(107,133,133,0.08)', borderLeft: `2px solid ${film.winner ? '#5CF2C5' : 'rgba(107,133,133,0.35)'}` }}
      >
        <p className="font-mono text-[9px] text-text-dim leading-relaxed">{film.verdict}</p>
      </div>
    </div>
  )
}

// ─── Audience archetype card ───────────────────────────────────────────────────
function ArchetypeCard({ cluster, film }) {
  const sentimentCol = cluster.sentiment >= 0.2 ? '#5CF2C5' : cluster.sentiment >= 0 ? '#9aa8bc' : 'rgba(239,68,68,0.80)'
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: 'rgba(8,17,18,0.70)', border: '1px solid rgba(240,120,50,0.12)' }}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="font-mono text-[7px] tracking-widest px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(240,120,50,0.08)', color: 'rgba(240,120,50,0.65)', border: '1px solid rgba(240,120,50,0.18)' }}
          >
            {film.title === 'Michael' ? 'MICHAEL' : 'DWP2'}
          </span>
          <span className="font-mono text-[7px] tracking-widest text-text-dim">{cluster.share}% of audience</span>
        </div>
        <h5 className="font-display font-semibold text-sm text-text-bright leading-tight">{cluster.label}</h5>
        <p className="font-mono text-[9px] mt-1" style={{ color: sentimentCol }}>{cluster.tone}</p>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 bg-bg/60 rounded-lg p-2 border border-border text-center">
          <p className="font-mono text-[7px] text-text-dim">SENTIMENT</p>
          <p className="font-display font-semibold text-xs mt-0.5" style={{ color: sentimentCol }}>{cluster.sentiment.toFixed(3)}</p>
        </div>
        <div className="flex-1 bg-bg/60 rounded-lg p-2 border border-border text-center">
          <p className="font-mono text-[7px] text-text-dim">POSITIVE</p>
          <p className="font-display font-semibold text-xs mt-0.5" style={{ color: '#5CF2C5' }}>{cluster.positive}%</p>
        </div>
        <div className="flex-1 bg-bg/60 rounded-lg p-2 border border-border text-center">
          <p className="font-mono text-[7px] text-text-dim">EXCITEMENT</p>
          <p className="font-display font-semibold text-xs mt-0.5" style={{ color: '#5CF2C5' }}>{cluster.excitement.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <p className="font-mono text-[7px] text-text-dim tracking-widest mb-1.5">DOMINANT SIGNALS</p>
        <div className="flex flex-wrap gap-1">
          {cluster.dominant.slice(0, 4).map(t => (
            <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-surface border border-border text-text-dim">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Strategic insight block ───────────────────────────────────────────────────
function InsightBlock({ insight, delay }) {
  const signalColor = {
    DIVERGENCE: '#9aa8bc',
    STABILITY:  '#5CF2C5',
    RISK:       'rgba(239,68,68,0.80)',
    PLATFORM:   '#5CF2C5',
    ENGAGEMENT: '#5CF2C5',
  }
  return (
    <div
      className="flex gap-4 items-start p-4 rounded-xl"
      style={{ background: 'rgba(8,17,18,0.60)', border: '1px solid rgba(240,120,50,0.10)', animationDelay: `${delay}ms` }}
    >
      <div className="shrink-0 flex flex-col items-center gap-1.5 mt-0.5">
        <span className="font-mono text-[10px] font-bold text-text-dim">{String(insight.n).padStart(2, '0')}</span>
        <div className="w-px flex-1 min-h-[24px]" style={{ background: 'rgba(240,120,50,0.15)' }} />
      </div>
      <div className="flex-1">
        <span className="font-mono text-[8px] tracking-[0.18em] mb-2 inline-block" style={{ color: signalColor[insight.signal] || '#9aa8bc' }}>
          ◆ {insight.signal}
        </span>
        <p className="text-text text-sm leading-relaxed">{insight.text}</p>
      </div>
    </div>
  )
}

// ─── Coming soon card ──────────────────────────────────────────────────────────
function ComingCard({ signal }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: 'rgba(8,17,18,0.50)', border: '1px dashed rgba(240,120,50,0.16)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <SignalBadge text={signal.quarter} dim />
        <span className="font-mono text-[8px] text-text-dim tracking-widest opacity-60">LOADING…</span>
      </div>
      <h5 className="font-display font-medium text-sm text-text/60 leading-tight">{signal.title}</h5>
      <p className="font-mono text-[9px] text-text-dim/60 leading-relaxed">{signal.subtitle}</p>
      <div className="flex flex-wrap gap-1 mt-1">
        {signal.tags.map(t => (
          <span key={t} className="font-mono text-[7px] px-1.5 py-0.5 rounded bg-surface/50 border border-border/50 text-text-dim/50">{t}</span>
        ))}
      </div>
      <div className="h-px w-full rounded-full overflow-hidden mt-1" style={{ background: 'rgba(240,120,50,0.08)' }}>
        <div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(240,120,50,0.35), transparent)', width: '40%', animation: 'scan 3s linear infinite' }}
        />
      </div>
    </div>
  )
}

// ─── Featured archetypes ───────────────────────────────────────────────────────
const FEATURED_ARCHETYPES = [
  { filmIdx: 1, clusterLabel: 'Nostalgia Advocates' },
  { filmIdx: 1, clusterLabel: 'Fashion Insiders'    },
  { filmIdx: 0, clusterLabel: 'Legacy Believers'    },
  { filmIdx: 0, clusterLabel: 'Music Enthusiasts'   },
]

// ─── Main modal ────────────────────────────────────────────────────────────────
export default function SeasonalProjectModal({ onClose, lang }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [screenshotsOpen, setScreenshotsOpen] = useState(false)
  const [diagramOpen, setDiagramOpen] = useState(false)
  const [diagramIdx, setDiagramIdx] = useState(0)

  const csiProject = projects.find(p => p.id === 'cultural-sentiment-intelligence')
  const screenshots = csiProject?.demo?.screenshots || []
  const diagrams = csiProject?.demo?.diagrams || []

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const signal = activeSignal
  if (!signal) return null

  const featuredArchetypes = FEATURED_ARCHETYPES.map(({ filmIdx, clusterLabel }) => ({
    film: signal.films[filmIdx],
    cluster: signal.films[filmIdx].clusters.find(c => c.label === clusterLabel),
  })).filter(a => a.cluster)

  const tabs = [
    { id: 'overview',   label: lang === 'en' ? 'KPI Overview'        : 'Vue KPI' },
    { id: 'archetypes', label: lang === 'en' ? 'Audience Archetypes'  : 'Archétypes' },
    { id: 'insights',   label: lang === 'en' ? 'Strategic Insights'   : 'Insights Stratégiques' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg/92 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto my-6 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(6,13,14,0.98)',
          border: '1px solid rgba(240,120,50,0.22)',
          boxShadow: '0 0 80px rgba(240,120,50,0.10)',
        }}
      >
        {/* Top accent line */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(240,120,50,0.60) 30%, rgba(240,120,50,0.60) 70%, transparent)' }} />

        {/* Modal header */}
        <div
          className="flex items-start justify-between px-8 py-6 border-b"
          style={{ borderColor: 'rgba(240,120,50,0.12)' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-mono text-[9px] tracking-[0.2em] px-2 py-0.5 rounded"
                style={{ background: 'rgba(240,120,50,0.10)', border: '1px solid rgba(240,120,50,0.32)', color: '#F07832' }}
              >
                SEASONAL PROJECT
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F07832' }} />
                <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(240,120,50,0.70)' }}>LIVE SIGNAL · {signal.quarter}</span>
              </div>
            </div>
            <h2 className="font-display font-semibold text-2xl text-text-bright leading-tight">
              {lang === 'en' ? 'Michael vs. DWP2' : "Michael vs. DWP2"}
            </h2>
            <p className="font-mono text-xs text-silver/50 mt-1">{signalLabMeta.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-amber/40 hover:text-amber transition-all duration-200 ml-4 mt-1 text-lg font-light"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Modal body — scrollable */}
        <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>

          {/* ── Active signal header card ────────────────────────────────── */}
          <div
            className="mb-8 rounded-2xl p-5 lg:p-6"
            style={{
              background: 'rgba(8,17,18,0.90)',
              border: '1px solid rgba(240,120,50,0.20)',
              boxShadow: '0 0 40px rgba(240,120,50,0.06)',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-5 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <SignalBadge text={`${signal.quarter} · ACTIVE`} />
                  {signal.tags.slice(0, 3).map(t => (
                    <SignalBadge key={t} text={t} dim />
                  ))}
                </div>
                <h3 className="font-display font-semibold text-2xl text-text-bright leading-tight">{signal.title}</h3>
                <p className="font-mono text-xs text-text-dim mt-1">{signal.subtitle}</p>
              </div>
              <div
                className="shrink-0 rounded-xl px-4 py-3 text-center min-w-[160px]"
                style={{ background: 'linear-gradient(135deg, #F07832 0%, #C84010 100%)', border: '1px solid rgba(240,120,50,0.40)' }}
              >
                <p className="font-mono text-[8px] tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.70)' }}>RECOMMENDED WATCH</p>
                <p className="font-display font-bold text-lg" style={{ color: '#fff' }}>{signal.verdict.recommended}</p>
                <p className="font-mono text-[8px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>highest sentiment quality</p>
              </div>
            </div>

            <p className="text-text text-sm leading-relaxed mb-5 max-w-3xl">
              <span className="text-text-bright font-medium">Core question: </span>
              {signal.question}
            </p>

            <div>
              <p className="font-mono text-[8px] tracking-widest text-text-dim mb-2.5">METHODOLOGY</p>
              <div className="flex flex-col gap-1.5">
                {signal.methodology.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[8px] mt-0.5 shrink-0" style={{ color: 'rgba(240,120,50,0.50)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[9px] text-text-dim leading-relaxed">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Executive recommendation ─────────────────────────────────── */}
          <div className="mb-8">
            <p className="font-mono text-[8px] tracking-[0.2em] text-amber/70 mb-4">◆ EXECUTIVE RECOMMENDATION</p>
            <ExecRecommendation signal={signal} />
          </div>


          {/* ── Tab navigation + Tableau download ──────────────────────── */}
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <div className="flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="font-mono text-[9px] tracking-widest px-3 py-2 rounded-lg transition-all duration-200"
                  style={activeTab === tab.id
                    ? { background: 'linear-gradient(135deg, rgba(240,120,50,0.24) 0%, rgba(180,55,8,0.12) 100%)', border: '1px solid rgba(240,120,50,0.35)', color: '#F07832' }
                    : { background: 'rgba(8,17,18,0.60)', border: '1px solid rgba(240,120,50,0.10)', color: 'rgba(154,168,188,0.70)' }}
                >
                  {tab.label.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {screenshots.length > 0 && (
                <button
                  onClick={() => setScreenshotsOpen(true)}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
                  style={{ background: 'rgba(8,17,18,0.70)', border: '1px solid rgba(154,168,188,0.22)', color: 'rgba(154,168,188,0.75)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="2" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M1 9l3-3 3 3 2-2 4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {lang === 'en' ? 'TABLEAU CHARTS SNIPPETS' : 'APERÇUS TABLEAU'}
                </button>
              )}
            </div>
          </div>

          {/* ── Tab: KPI Overview ────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-5">
              {signal.films.map(film => <FilmKPI key={film.id} film={film} />)}
            </div>
          )}

          {/* ── Tab: Audience Archetypes ─────────────────────────────────── */}
          {activeTab === 'archetypes' && (
            <div>
              <p className="font-mono text-[9px] text-text-dim tracking-widest mb-4">
                {lang === 'en'
                  ? '8 audience clusters identified across both films — 4 featured below'
                  : '8 segments d\'audience identifiés — 4 présentés ci-dessous'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredArchetypes.map(({ film, cluster }) => (
                  <ArchetypeCard key={`${film.id}-${cluster.label}`} film={film} cluster={cluster} />
                ))}
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                {signal.films.map(film => (
                  <div
                    key={film.id}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(8,17,18,0.70)', border: '1px solid rgba(240,120,50,0.10)' }}
                  >
                    <p className="font-mono text-[8px] tracking-widest text-text-dim mb-3">{film.title.toUpperCase()} · AUDIENCE DISTRIBUTION</p>
                    <div className="flex flex-col gap-2">
                      {film.clusters.map(c => (
                        <div key={c.label} className="flex items-center gap-2">
                          <span className="font-mono text-[8px] text-text-dim w-32 shrink-0 truncate">{c.label}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${c.share}%`, background: c.sentiment >= 0 ? 'rgba(92,242,197,0.55)' : 'rgba(239,68,68,0.55)' }}
                            />
                          </div>
                          <span className="font-mono text-[9px] text-text-bright w-10 text-right shrink-0">{c.share}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: Strategic Insights ──────────────────────────────────── */}
          {activeTab === 'insights' && (
            <div className="flex flex-col gap-3">
              {signal.insights.map((ins, i) => (
                <InsightBlock key={ins.n} insight={ins} delay={i * 80} />
              ))}
            </div>
          )}

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <p className="font-mono text-[8px] text-text-dim/35 tracking-widest mt-10 text-right">
            {lang === 'en'
              ? 'All data collected, processed, and analysed by Kenza En-Nassef.'
              : 'Toutes les données collectées, traitées et analysées par Kenza En-Nassef.'}
          </p>

        </div>
      </div>

      {/* Screenshot lightbox */}
      {screenshotsOpen && screenshots.length > 0 && (
        <ScreenshotLightbox
          screenshots={screenshots}
          lang={lang}
          onClose={() => setScreenshotsOpen(false)}
        />
      )}

      {/* Diagram lightbox */}
      {diagramOpen && diagrams.length > 0 && (
        <ScreenshotLightbox
          screenshots={diagrams}
          lang={lang}
          initialIdx={diagramIdx}
          onClose={() => setDiagramOpen(false)}
        />
      )}
    </div>
  )
}
