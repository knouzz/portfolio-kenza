import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { signalLabMeta, activeSignal, upcomingSignals } from '../data/signalLab'
import { useInView } from '../hooks/useInView'

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
      style={{ background: 'rgba(92,242,197,0.14)', border: '1px solid rgba(92,242,197,0.35)', color: '#5CF2C5' }}
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
        : { background: 'rgba(92,242,197,0.10)', borderColor: 'rgba(92,242,197,0.30)', color: '#5CF2C5' }}
    >
      {text}
    </span>
  )
}

// ─── Executive recommendation strip ──────────────────────────────────────────
function ExecRecommendation({ signal, lang }) {
  const v = signal.verdict
  const positivePct = signal.films?.find(f => f.winner)?.positivePct
  const cards = [
    {
      label: lang === 'fr' ? 'À REGARDER EN PREMIER' : 'RECOMMENDED FIRST WATCH',
      value: v.recommended,
      sub:   v.reason,
      icon:  '▶',
      accent: true,
    },
    {
      label: lang === 'fr' ? 'DYNAMIQUE CULTURELLE' : 'CULTURAL MOMENTUM',
      value: v.momentum,
      sub:   v.momentumDiff,
      icon:  '↑',
      accent: true,
    },
    {
      label: lang === 'fr' ? 'GAGNANT DU SENTIMENT' : 'SENTIMENT WINNER',
      value: v.sentimentWinner,
      sub:   lang === 'fr' ? `${positivePct}% de mentions positives` : `${positivePct}% positive mention rate`,
      icon:  '◆',
      accent: true,
    },
    {
      label: lang === 'fr' ? 'HYPE vs QUALITÉ' : 'HYPE vs QUALITY',
      value: v.hyper.leader,
      sub:   v.hyper.insight,
      icon:  '≠',
      accent: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className="rounded-xl p-4 flex flex-col gap-2"
          style={{
            background: c.accent ? 'rgba(92,242,197,0.05)' : 'rgba(8,17,18,0.80)',
            border: `1px solid ${c.accent ? 'rgba(92,242,197,0.20)' : 'rgba(92,242,197,0.09)'}`,
          }}
        >
          <p className="font-mono text-[8px] tracking-[0.18em] text-text-dim">{c.label}</p>
          <p className={`font-display font-semibold text-base leading-tight ${c.accent ? 'text-kpi' : 'text-text'}`}>
            <span className="text-text-dim mr-1.5">{c.icon}</span>{c.value}
          </p>
          <p className="font-mono text-[9px] text-text-dim leading-relaxed">{c.sub}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Film KPI card ────────────────────────────────────────────────────────────
function FilmKPI({ film }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-5"
      style={{
        background: film.winner ? 'rgba(92,242,197,0.04)' : 'rgba(8,17,18,0.60)',
        border: `1px solid ${film.winner ? 'rgba(92,242,197,0.22)' : 'rgba(92,242,197,0.09)'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[9px] text-text-dim tracking-widest mb-1">{film.type.toUpperCase()}</p>
          <h4 className="font-display font-semibold text-lg text-text-bright leading-tight">{film.title}</h4>
          <p className="font-mono text-[9px] text-text-dim mt-0.5">{film.posts} posts analysed</p>
        </div>
        {film.winner && <WinnerBadge>WINNER</WinnerBadge>}
      </div>

      {/* Sentiment metrics */}
      <div>
        <p className="font-mono text-[8px] tracking-widest text-text-dim mb-3">SENTIMENT BREAKDOWN</p>
        <div className="flex flex-col gap-2">
          <SentimentBar label="POSITIVE" value={film.positivePct / 100} pct={film.positivePct} color="#5CF2C5" />
          <SentimentBar label="NEGATIVE" value={film.negativePct / 100} pct={film.negativePct} color="rgba(239,68,68,0.70)" />
          <SentimentBar label="NEUTRAL"  value={film.neutralPct  / 100} pct={film.neutralPct}  color="rgba(107,133,133,0.50)" />
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { k: 'AVG SENTIMENT',    v: film.avgSentiment.toFixed(3) },
          { k: 'EXCITEMENT IDX',   v: film.excitementIndex.toFixed(3) },
          { k: 'HYPE INDEX',       v: film.hypeIndex.toFixed(3) },
          { k: 'AVG ENGAGEMENT',   v: film.avgEngagement.toFixed(2) },
        ].map(({ k, v }) => (
          <div key={k} className="bg-bg/60 rounded-lg p-2.5 border border-border">
            <p className="font-mono text-[8px] text-text-dim tracking-wide mb-1">{k}</p>
            <p className="font-display font-semibold text-sm text-kpi">{v}</p>
          </div>
        ))}
      </div>

      {/* Platform breakdown */}
      <div>
        <p className="font-mono text-[8px] tracking-widest text-text-dim mb-3">PLATFORM SENTIMENT</p>
        <div className="flex flex-col gap-2">
          {film.platforms.map(p => (
            <SentimentBar key={p.name} label={p.name.toUpperCase().slice(0, 8)} value={p.sentiment} max={0.35} color="#5CF2C5" />
          ))}
        </div>
      </div>

      {/* Verdict */}
      <div
        className="rounded-lg px-3 py-2"
        style={{ background: 'rgba(107,133,133,0.08)', borderLeft: `2px solid ${film.winner ? '#5CF2C5' : 'rgba(107,133,133,0.35)'}` }}
      >
        <p className="font-mono text-[9px] text-text-dim leading-relaxed">{film.verdict}</p>
      </div>
    </div>
  )
}

// ─── Audience archetype cards ─────────────────────────────────────────────────
function ArchetypeCard({ cluster, film }) {
  const sentimentCol = cluster.sentiment >= 0.2 ? '#5CF2C5' : cluster.sentiment >= 0 ? '#9aa8bc' : 'rgba(239,68,68,0.80)'
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: 'rgba(8,17,18,0.70)', border: '1px solid rgba(92,242,197,0.10)' }}
    >
      {/* Film tag + cluster name */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="font-mono text-[7px] tracking-widest px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(92,242,197,0.08)', color: 'rgba(92,242,197,0.60)', border: '1px solid rgba(92,242,197,0.15)' }}
          >
            {film.title === 'Michael' ? 'MICHAEL' : 'DWP2'}
          </span>
          <span className="font-mono text-[7px] tracking-widest text-text-dim">
            {cluster.share}% of audience
          </span>
        </div>
        <h5 className="font-display font-semibold text-sm text-text-bright leading-tight">{cluster.label}</h5>
        <p className="font-mono text-[9px] mt-1" style={{ color: sentimentCol }}>{cluster.tone}</p>
      </div>

      {/* Metrics row */}
      <div className="flex gap-3">
        <div className="flex-1 bg-bg/60 rounded-lg p-2 border border-border text-center">
          <p className="font-mono text-[7px] text-text-dim">SENTIMENT</p>
          <p className="font-display font-semibold text-xs mt-0.5" style={{ color: sentimentCol }}>{cluster.sentiment.toFixed(3)}</p>
        </div>
        <div className="flex-1 bg-bg/60 rounded-lg p-2 border border-border text-center">
          <p className="font-mono text-[7px] text-text-dim">POSITIVE</p>
          <p className="font-display font-semibold text-xs text-kpi mt-0.5">{cluster.positive}%</p>
        </div>
        <div className="flex-1 bg-bg/60 rounded-lg p-2 border border-border text-center">
          <p className="font-mono text-[7px] text-text-dim">EXCITEMENT</p>
          <p className="font-display font-semibold text-xs mt-0.5" style={{ color: '#5CF2C5' }}>{cluster.excitement.toFixed(2)}</p>
        </div>
      </div>

      {/* Dominant terms */}
      <div>
        <p className="font-mono text-[7px] text-text-dim tracking-widest mb-1.5">DOMINANT SIGNALS</p>
        <div className="flex flex-wrap gap-1">
          {cluster.dominant.slice(0, 4).map(t => (
            <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-surface border border-border text-text-dim">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Strategic insights ────────────────────────────────────────────────────────
function InsightBlock({ insight, delay }) {
  const signalColor = {
    DIVERGENCE: '#5CF2C5',
    STABILITY:  '#2f875d',
    RISK:       'rgba(239,68,68,0.80)',
    PLATFORM:   '#5CF2C5',
    ENGAGEMENT: '#9aa8bc',
  }
  return (
    <div
      className="flex gap-4 items-start p-4 rounded-xl opacity-0 reveal-up"
      style={{
        background: 'rgba(8,17,18,0.60)',
        border: '1px solid rgba(92,242,197,0.09)',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="shrink-0 flex flex-col items-center gap-1.5 mt-0.5">
        <span className="font-mono text-[10px] font-bold text-text-dim">{String(insight.n).padStart(2, '0')}</span>
        <div className="w-px flex-1 min-h-[24px]" style={{ background: 'rgba(92,242,197,0.12)' }} />
      </div>
      <div className="flex-1">
        <span
          className="font-mono text-[8px] tracking-[0.18em] mb-2 inline-block"
          style={{ color: signalColor[insight.signal] || '#5CF2C5' }}
        >
          ◆ {insight.signal}
        </span>
        <p className="text-text text-sm leading-relaxed">{insight.text}</p>
      </div>
    </div>
  )
}

// ─── Coming soon signal card ──────────────────────────────────────────────────
function ComingCard({ signal }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: 'rgba(8,17,18,0.50)', border: '1px dashed rgba(92,242,197,0.14)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <SignalBadge text={signal.quarter} dim />
        <span className="font-mono text-[8px] text-text-dim tracking-widest opacity-60">LOADING…</span>
      </div>
      <h5 className="font-display font-medium text-sm text-text/60 leading-tight">{signal.title}</h5>
      <p className="font-mono text-[9px] text-text-dim/60 leading-relaxed">{signal.subtitle}</p>
      <div className="flex flex-wrap gap-1 mt-1">
        {signal.tags.map(t => (
          <span key={t} className="font-mono text-[7px] px-1.5 py-0.5 rounded bg-surface/50 border border-border/50 text-text-dim/50">
            {t}
          </span>
        ))}
      </div>
      {/* Animated loading bar */}
      <div className="h-px w-full rounded-full overflow-hidden mt-1" style={{ background: 'rgba(92,242,197,0.08)' }}>
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(92,242,197,0.30), transparent)',
            width: '40%',
            animation: 'scan 3s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

// ─── Archetype selector ───────────────────────────────────────────────────────
const FEATURED_ARCHETYPES = [
  { filmIdx: 1, clusterLabel: 'Nostalgia Advocates' },
  { filmIdx: 1, clusterLabel: 'Fashion Insiders'    },
  { filmIdx: 0, clusterLabel: 'Legacy Believers'    },
  { filmIdx: 0, clusterLabel: 'Music Enthusiasts'   },
]

// ─── Main section ─────────────────────────────────────────────────────────────
export default function SignalLab() {
  const { lang } = useLang()
  const [ref, inView] = useInView()
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'archetypes' | 'insights'

  if (!activeSignal) return null
  const signal = lang === 'fr' && activeSignal?.fr ? { ...activeSignal, ...activeSignal.fr } : activeSignal

  const featuredArchetypes = FEATURED_ARCHETYPES.map(({ filmIdx, clusterLabel }) => ({
    film: signal.films[filmIdx],
    cluster: signal.films[filmIdx].clusters.find(c => c.label === clusterLabel),
  })).filter(a => a.cluster)

  const tabs = [
    { id: 'overview',   label: lang === 'fr' ? 'Vue d\'ensemble KPI' : 'KPI Overview' },
    { id: 'archetypes', label: lang === 'fr' ? 'Archétypes d\'audience' : 'Audience Archetypes' },
    { id: 'insights',   label: lang === 'fr' ? 'Insights Stratégiques' : 'Strategic Insights' },
  ]

  return (
    <section id="signal-lab" className="py-10 lg:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 radial-fade-navy pointer-events-none" />
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(92,242,197,0.20) 30%, rgba(92,242,197,0.20) 70%, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Section label ──────────────────────────────────────────────── */}
        <div ref={ref} className={`opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber/50" />
            <span className="font-mono text-xs text-amber/80 tracking-[0.2em] uppercase">Signal Lab</span>
            <div className="flex items-center gap-1.5 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kpi animate-pulse" />
              <span className="font-mono text-[9px] text-kpi/70 tracking-widest">LIVE SIGNAL</span>
            </div>
          </div>
        </div>

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              className={`font-display font-semibold text-4xl md:text-5xl text-text-bright leading-tight opacity-0 ${inView ? 'reveal-up' : ''}`}
              style={{ animationDelay: '100ms' }}
            >
              {lang === 'en' ? 'Michael vs. DWP2' : 'Michael vs. DWP2'}
            </h2>
            <p
              className={`font-mono text-xs text-silver/50 mt-2 max-w-sm leading-relaxed opacity-0 ${inView ? 'reveal-up' : ''}`}
              style={{ animationDelay: '180ms' }}
            >
              {lang === 'fr' ? (signalLabMeta.tagline_fr || signalLabMeta.tagline) : signalLabMeta.tagline}
            </p>
          </div>
          <div
            className={`flex items-center gap-3 opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '220ms' }}
          >
            <SignalBadge text={signal.quarter} />
            <span className="font-mono text-[9px] text-text-dim tracking-widest">
              {signal.posts} → 870 posts · 5 platforms
            </span>
          </div>
        </div>

        {/* ── Active signal header card ──────────────────────────────────── */}
        <div
          className={`mb-8 rounded-2xl p-5 lg:p-6 opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{
            animationDelay: '250ms',
            background: 'rgba(8,17,18,0.90)',
            border: '1px solid rgba(92,242,197,0.18)',
            boxShadow: '0 0 40px rgba(92,242,197,0.05), 0 0 0 1px rgba(92,242,197,0.04) inset',
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
              <p className="font-mono text-[8px] tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.70)' }}>{lang === 'fr' ? 'À REGARDER EN PREMIER' : 'RECOMMENDED WATCH'}</p>
              <p className="font-display font-bold text-lg" style={{ color: '#fff' }}>{signal.verdict.recommended}</p>
              <p className="font-mono text-[8px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{lang === 'fr' ? 'meilleure qualité de sentiment' : 'highest sentiment quality'}</p>
            </div>
          </div>

          {/* Core question */}
          <p className="text-text text-sm leading-relaxed mb-5 max-w-3xl">
            <span className="text-text-bright font-medium">{lang === 'fr' ? 'Question centrale : ' : 'Core question: '}</span>
            {signal.question}
          </p>

          {/* Methodology pills */}
          <div>
            <p className="font-mono text-[8px] tracking-widest text-text-dim mb-2.5">{lang === 'fr' ? 'MÉTHODOLOGIE' : 'METHODOLOGY'}</p>
            <div className="flex flex-col gap-1.5">
              {signal.methodology.map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[8px] text-kpi/50 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-mono text-[9px] text-text-dim leading-relaxed">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Executive recommendation strip ─────────────────────────────── */}
        <div className={`opacity-0 ${inView ? 'reveal-up' : ''}`} style={{ animationDelay: '320ms' }}>
          <p className="font-mono text-[8px] tracking-[0.2em] text-amber/70 mb-4">◆ {lang === 'fr' ? 'RECOMMANDATION EXÉCUTIVE' : 'EXECUTIVE RECOMMENDATION'}</p>
          <ExecRecommendation signal={signal} lang={lang} />
        </div>

        {/* ── Tab navigation ─────────────────────────────────────────────── */}
        <div
          className={`flex gap-1 mb-6 opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '380ms' }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="font-mono text-[9px] tracking-widest px-3 py-2 rounded-lg transition-all duration-200"
              style={activeTab === tab.id
                ? { background: 'rgba(92,242,197,0.12)', border: '1px solid rgba(92,242,197,0.28)', color: '#5CF2C5' }
                : { background: 'rgba(8,17,18,0.60)', border: '1px solid rgba(92,242,197,0.09)', color: 'rgba(154,168,188,0.70)' }}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── Tab: KPI Overview ──────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div
            className={`opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '420ms' }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              {signal.films.map(film => <FilmKPI key={film.id} film={film} />)}
            </div>
          </div>
        )}

        {/* ── Tab: Audience Archetypes ───────────────────────────────────── */}
        {activeTab === 'archetypes' && (
          <div
            className={`opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '420ms' }}
          >
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

            {/* Cluster share visual */}
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {signal.films.map(film => (
                <div
                  key={film.id}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(8,17,18,0.70)', border: '1px solid rgba(92,242,197,0.09)' }}
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

        {/* ── Tab: Strategic Insights ────────────────────────────────────── */}
        {activeTab === 'insights' && (
          <div className="flex flex-col gap-3">
            {signal.insights.map((ins, i) => (
              <InsightBlock key={ins.n} insight={ins} delay={i * 80} />
            ))}
          </div>
        )}

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="mt-12 mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border/40" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-text-dim/50">{lang === 'fr' ? 'PROCHAINS SIGNAUX EN COURS' : 'NEXT SIGNALS LOADING'}</span>
          <div className="h-px flex-1 bg-border/40" />
        </div>

        {/* ── Upcoming signals grid ──────────────────────────────────────── */}
        <div
          className={`opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '500ms' }}
        >
          <p className="font-mono text-[8px] tracking-[0.2em] text-text-dim/60 mb-4">{lang === 'fr' ? 'SIGNAUX FUTURS · PUBLICATION TRIMESTRIELLE' : 'FUTURE SIGNALS · QUARTERLY RELEASE'}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingSignals.map(s => <ComingCard key={s.id} signal={s} />)}
          </div>
        </div>

        {/* ── Footer note ────────────────────────────────────────────────── */}
        <p className="font-mono text-[8px] text-text-dim/35 tracking-widest mt-8 text-right">
          {lang === 'en'
            ? 'Signal Lab publishes quarterly. All data collected, processed, and analysed by Kenza En-Nassef.'
            : 'Signal Lab publie chaque trimestre. Toutes les données collectées, traitées et analysées par Kenza En-Nassef.'}
        </p>

      </div>
    </section>
  )
}
