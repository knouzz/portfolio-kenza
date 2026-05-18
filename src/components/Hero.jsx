import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useCounter } from '../hooks/useCounter'

// Animated sparkline inside the dashboard panel
function Sparkline({ started }) {
  const points = [18, 28, 22, 38, 34, 52, 48, 65, 60, 78, 74, 92]
  const w = 220
  const h = 56
  const max = Math.max(...points)
  const min = Math.min(...points)

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((p - min) / (max - min)) * h
    return `${x},${y}`
  })

  const linePath = `M ${coords.join(' L ')}`
  const areaPath = `M ${coords.join(' L ')} L ${w},${h} L 0,${h} Z`
  const totalLen = 400

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 56 }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5CF2C5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#5CF2C5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {started && (
        <>
          <path d={areaPath} fill="url(#sparkGrad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#5CF2C5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLen}
            strokeDashoffset={totalLen}
            style={{ animation: 'drawLine 2s ease forwards 0.4s' }}
          />
          {/* Last point dot */}
          <circle
            cx={w}
            cy={h - ((points[points.length - 1] - min) / (max - min)) * h}
            r="3"
            fill="#5CF2C5"
            style={{ opacity: 0, animation: 'fadeIn 0.4s ease forwards 2.2s' }}
          />
        </>
      )}
    </svg>
  )
}

// Individual metric tile inside the dashboard panel
function MetricTile({ label, value, text, suffix, sublabel, accent, started, duration }) {
  const count = useCounter(value || 0, duration || 1600, started && value !== null)

  const accentStyle =
    accent === 'amber' ? { color: '#2f875d' } :
    accent === 'green' ? { color: '#4ade80' } :
    { color: '#5CF2C5' }  // mint for kpi and default

  return (
    <div className="bg-bg/60 border border-border rounded-lg p-3 flex flex-col gap-1">
      <span className="font-mono text-[10px] tracking-widest text-text-dim">{label}</span>
      <span className="font-display font-semibold text-lg leading-tight" style={accentStyle}>
        {value !== null
          ? `${started ? count : 0}${suffix || ''}`
          : text}
      </span>
      <span className="font-mono text-[10px] text-text-dim/70">{sublabel}</span>
    </div>
  )
}

// The right-side intelligence panel
function IntelligencePanel({ t, started }) {
  return (
    <div className="relative w-full max-w-sm lg:max-w-none glass-panel rounded-2xl p-5 glow-amber-sm">
      {/* Subtle corner accent */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-amber/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-amber/10 rounded-br-2xl pointer-events-none" />

      {/* Panel header */}
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-border">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-dim mb-0.5">{t.system}</p>
          <p className="font-display font-semibold text-text-bright text-sm">{t.title}</p>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
          <span className="font-mono text-[10px] text-status-green tracking-widest">{t.status}</span>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {t.metrics.map((m, i) => (
          <MetricTile
            key={m.label}
            label={m.label}
            value={m.value}
            text={m.text}
            suffix={m.suffix}
            sublabel={m.sublabel}
            accent="kpi"
            started={started}
            duration={1400 + i * 200}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-widest text-text-dim">{t.chart}</span>
          <span className="font-mono text-[10px] text-kpi/70">↑ 92%</span>
        </div>
        <Sparkline started={started} />
      </div>

      {/* Panel footer */}
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <span className="w-1.5 h-1.5 rounded-full bg-amber/60" />
        <span className="font-mono text-[10px] text-text-dim tracking-wider">{t.footer}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { lang } = useLang()
  const t = content[lang].hero
  const [started, setStarted] = useState(false)

  // Start panel animations after short delay
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 radial-fade" />

      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none scan-line"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(47,135,93,0.10) 20%, rgba(47,135,93,0.18) 50%, rgba(47,135,93,0.10) 80%, transparent 100%)',
        }}
      />

      {/* Corner system labels */}
      <div className="absolute top-20 left-6 font-mono text-[10px] text-text-dim/30 hidden lg:block">
        SYS.INIT // 2024
      </div>
      <div className="absolute top-20 right-6 font-mono text-[10px] text-text-dim/30 hidden lg:block">
        v2.0.1
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* ── Left: Identity ── */}
          <div className="flex-1 md:max-w-[58%]">
            {/* System label */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-8 bg-amber/50 shrink-0" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: '#5CF2C5' }}>
                {t.sysLabel}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber/60 animate-pulse shrink-0" />
            </div>

            {/* Name */}
            <h1
              className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl text-text-bright tracking-tight leading-[1.05] mb-5 opacity-0"
              style={{ animation: 'revealUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards 0.2s' }}
            >
              {t.name.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <>
                      <span className="text-text-bright">{line.split('-')[0]}-</span>
                      <span style={{ background: 'linear-gradient(135deg, #38a06e 0%, #1d6640 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{line.split('-').slice(1).join('-')}</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Role */}
            <p
              className="font-mono text-xs tracking-[0.2em] text-silver mb-8 opacity-0"
              style={{ animation: 'revealUp 0.6s ease forwards 0.35s' }}
            >
              {t.role}
            </p>

            {/* Tagline */}
            <div
              className="mb-6 opacity-0"
              style={{ animation: 'revealUp 0.6s ease forwards 0.45s' }}
            >
              <p className="text-xl md:text-2xl text-text leading-snug">
                {t.tagline}{' '}
                <span className="text-text-bright font-medium">{t.taglineBold}</span>
              </p>
            </div>

            {/* Sub */}
            <p
              className="text-text-dim leading-relaxed max-w-lg mb-10 opacity-0"
              style={{ animation: 'revealUp 0.6s ease forwards 0.55s' }}
            >
              {t.sub}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 opacity-0"
              style={{ animation: 'revealUp 0.6s ease forwards 0.65s' }}
            >
              <button
                className="btn-primary"
                onClick={() => scrollTo('projects')}
              >
                {t.cta1}
                <span className="text-bg/70 ml-1">↓</span>
              </button>
              <button
                className="btn-ghost"
                onClick={() => scrollTo('contact')}
              >
                {t.cta2}
              </button>
            </div>

            {/* Status strip */}
            <div
              className="flex items-center gap-3 mt-12 opacity-0"
              style={{ animation: 'revealUp 0.6s ease forwards 0.75s' }}
            >
              <span className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
              <span className="font-mono text-xs text-text-dim tracking-wide">
                {lang === 'en'
                  ? 'Open to roles focused on customer understanding, performance visibility, and smarter operational systems.'
                  : 'Ouverte à des rôles mêlant compréhension client, pilotage de la performance et optimisation des opérations.'}
              </span>
            </div>
          </div>

          {/* ── Right: Intelligence Panel ── */}
          <div
            className="w-full md:w-[42%] opacity-0"
            style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.4s' }}
          >
            <IntelligencePanel t={t.panel} started={started} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0" style={{ animation: 'revealUp 0.6s ease forwards 1.2s' }}>
        <span className="font-mono text-[10px] tracking-widest text-text-dim">SCROLL</span>
        <div
          className="w-px h-8 bg-gradient-to-b from-text-dim to-transparent"
          style={{ animation: 'pulse 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
