import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useCounter } from '../hooks/useCounter'

function MetricTile({ label, value, text, suffix, sublabel, accent, started, duration }) {
  const count = useCounter(value || 0, duration || 1600, started && value !== null)
  const accentStyle =
    accent === 'amber' ? { color: '#2f875d' } :
    { color: '#5CF2C5' }

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

export default function About() {
  const { lang } = useLang()
  const t = content[lang]
  const hero = t.hero
  const snap = t.snapshot
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 radial-fade" />
      <div
        className="absolute left-0 right-0 h-px pointer-events-none scan-line"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(47,135,93,0.10) 20%, rgba(47,135,93,0.18) 50%, rgba(47,135,93,0.10) 80%, transparent 100%)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ── LEFT: Identity ──────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[54%]">
            {/* Name */}
            <h1
              className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl text-text-bright tracking-tight leading-[1.05] mb-8 mt-4 opacity-0"
              style={{ animation: 'revealUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards 0.2s' }}
            >
              {hero.name.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <>
                      <span className="text-text-bright">{line.split('-')[0]}-</span>
                      <span className="text-amber">{line.split('-').slice(1).join('-')}</span>
                    </>
                  ) : line}
                </span>
              ))}
            </h1>

            {/* Tagline */}
            <div className="mb-5 opacity-0" style={{ animation: 'revealUp 0.6s ease forwards 0.45s' }}>
              <p className="text-xl md:text-2xl text-text leading-snug">
                {hero.tagline}{' '}
                <span className="text-text-bright font-medium">{hero.taglineBold}</span>
              </p>
            </div>

            {/* Sub */}
            <p className="text-text-dim leading-relaxed max-w-lg mb-8 opacity-0" style={{ animation: 'revealUp 0.6s ease forwards 0.55s' }}>
              {hero.sub}
            </p>

            {/* Discipline tags */}
            <div className="flex flex-wrap gap-2 mb-10 opacity-0" style={{ animation: 'revealUp 0.6s ease forwards 0.6s' }}>
              {snap.disciplines.map(d => (
                <span key={d} className="tag">{d}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 opacity-0" style={{ animation: 'revealUp 0.6s ease forwards 0.65s' }}>
              <button className="btn-primary" onClick={() => scrollTo('projects')}>
                {hero.cta1}<span className="text-bg/70 ml-1">↓</span>
              </button>

              {/* Social / contact links */}
              <div className="flex items-center gap-1">
                {/* CV */}
                <a
                  href={lang === 'en' ? '/cv-kenza-en-nassef-en.pdf' : '/cv-kenza-en-nassef-fr.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={lang === 'en' ? 'Download CV' : 'Télécharger CV'}
                  className="h-9 px-3 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-amber/50 hover:text-amber transition-all duration-200 font-mono text-xs tracking-widest"
                >
                  CV
                </a>

                {/* Email */}
                <a
                  href="mailto:kenzaennassef@outlook.fr"
                  title="Email"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-amber/50 hover:text-amber transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </a>

                {/* Phone */}
                <a
                  href="tel:+33659301931"
                  title="+33 6 59 30 19 31"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-amber/50 hover:text-amber transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3.5C2 2.67 2.67 2 3.5 2h1.586a1 1 0 0 1 .894.553l1 2A1 1 0 0 1 6.83 5.8L5.91 6.72a8.01 8.01 0 0 0 3.37 3.37l.92-.92a1 1 0 0 1 1.246-.15l2 1a1 1 0 0 1 .554.895V12.5A1.5 1.5 0 0 1 12.5 14C6.701 14 2 9.299 2 3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/kenza-en-nassef"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-dim hover:border-amber/50 hover:text-amber transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M5 6.5V11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    <path d="M8 11.5V8.5c0-1.1.9-2 2-2s2 .9 2 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    <circle cx="5" cy="4.5" r="0.75" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Intelligence Panel ────────────────────── */}
          <div className="w-full lg:w-[42%] flex flex-col gap-4 opacity-0" style={{ animation: 'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.4s' }}>

            {/* Photo + KPI side by side */}
            <div className="flex gap-4">
              {/* Portrait */}
              <div className="relative rounded-xl overflow-hidden border border-border/60 shrink-0" style={{ width: '42%' }}>
                <div className="aspect-[3/4]">
                  <img
                    src="/kenza.jpg"
                    alt="Kenza En-Nassef"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-mono text-[9px] tracking-widest text-kpi/80 leading-relaxed">KENZA EN-NASSEF</p>
                </div>
              </div>

              {/* KPI panel */}
              <div className="flex-1 relative glass-panel rounded-xl p-4 glow-amber-sm">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber/20 rounded-tl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber/10 rounded-br-xl pointer-events-none" />
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                  <p className="font-mono text-[9px] tracking-[0.15em] text-text-dim">{hero.panel.system}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
                    <span className="font-mono text-[9px] text-status-green tracking-widest">{hero.panel.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {hero.panel.metrics.map((m, i) => (
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
              </div>
            </div>

            {/* Career arc */}
            <div className="panel rounded-xl p-5">
              <p className="font-mono text-[10px] tracking-widest text-text-dim mb-4">
                {lang === 'en' ? 'CAREER ARC' : 'TRAJECTOIRE'}
              </p>
              <div className="space-y-4">
                {[
                  {
                    phase: lang === 'en' ? 'Communications & PR'       : 'Communication & RP',
                    desc:  lang === 'en' ? 'Brand narrative, media, storytelling' : 'Narration de marque, médias, storytelling',
                  },
                  {
                    phase: lang === 'en' ? 'Brand Strategy & Management' : 'Stratégie & Management de Marque',
                    desc:  lang === 'en' ? 'Product launches, category management, organic & paid Ads' : 'Lancements produits, category management, organic & paid Ads',
                  },
                  {
                    phase: lang === 'en' ? 'Business Analytics & BI'  : 'Analyse Business & BI',
                    desc:  lang === 'en' ? 'Consumer insights, KPIs, dashboards, automation' : 'Insight consommateur, KPIs, dashboards, automatisation',
                    current: true,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                      <div className={`w-2 h-2 rounded-full ${item.current ? 'bg-amber' : 'bg-border-light'}`} />
                      {i < 2 && <div className="w-px h-8 bg-border" />}
                    </div>
                    <div>
                      <p className={`font-medium text-sm mb-0.5 ${item.current ? 'text-amber' : 'text-text'}`}>{item.phase}</p>
                      <p className="font-mono text-[11px] text-text-dim">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Human energy */}
            <div className="panel rounded-xl p-5 flex items-start gap-4">
              <div className="w-1.5 h-5 rounded-full bg-kpi/30 shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] tracking-widest text-kpi/60 mb-1.5">
                  {lang === 'en' ? 'OFF THE CLOCK' : 'EN DEHORS DU BUREAU'}
                </p>
                <p className="text-text-dim text-xs leading-relaxed">
                  {lang === 'en'
                    ? 'I’m usually somewhere between a football pitch, a jazz playlist, a long hike, trying new food places and flavours, or a conversation with someone I just met while traveling.'
                    : 'On me retrouve souvent entre un terrain de foot, une playlist de jazz, une longue randonnée, la découverte de nouvelles saveurs, ou une conversation improvisée avec quelqu’un rencontré en voyage.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0" style={{ animation: 'revealUp 0.6s ease forwards 1.2s' }}>
        <span className="font-mono text-[10px] tracking-widest text-text-dim">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-dim to-transparent" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
