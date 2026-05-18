import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useInView'
import ProjectModal from './ProjectModal'
import SeasonalProjectModal from './SeasonalProjectModal'

// ─── Seasonal project card (full-width, silver + dark-orange tech palette) ─────
function SeasonalCard({ project, lang, onOpen }) {
  const [ref, inView] = useInView()
  const t = project[lang]

  // Palette helpers
  const s = (a) => `rgba(190, 205, 220, ${a})`   // silver
  const o = (a) => `rgba(210, 88, 28, ${a})`      // dark tech-orange

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 opacity-0 ${inView ? 'reveal-up' : ''}`}
      style={{
        animationDelay: '100ms',
        background: `linear-gradient(135deg, ${o(0.32)} 0%, rgba(8,14,16,0.97) 55%)`,
        border: `1px solid ${s(0.18)}`,
        boxShadow: `0 0 60px ${o(0.12)}, 0 0 0 1px ${o(0.06)} inset`,
      }}
      onClick={() => onOpen(project)}
    >
      {/* Top accent line: silver → orange → silver */}
      <div
        className="h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${s(0.35)} 20%, ${o(0.70)} 50%, ${s(0.35)} 80%, transparent)` }}
      />

      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="flex-1">
            {/* Badges */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span
                className="font-mono text-[10px] tracking-[0.18em] px-2.5 py-1 rounded"
                style={{ background: o(0.12), border: `1px solid ${o(0.45)}`, color: o(0.95) }}
              >
                SEASONAL PROJECT
              </span>
              <span
                className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded border"
                style={{ borderColor: s(0.12), color: s(0.45), background: 'rgba(8,17,18,0.60)' }}
              >
                {project.category}
              </span>
              <div className="flex items-center gap-1.5 ml-1">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: o(0.85) }} />
                <span className="font-mono text-[9px] tracking-widest" style={{ color: o(0.70) }}>LIVE SIGNAL</span>
              </div>
            </div>

            <h3 className="font-display font-semibold text-2xl lg:text-3xl text-text-bright mb-2 group-hover:text-silver transition-colors duration-300">
              {t.title}
            </h3>
            <p className="font-mono text-xs mb-4 tracking-wide" style={{ color: s(0.50) }}>{t.subtitle}</p>
            <p className="text-text leading-relaxed mb-6 max-w-lg">{t.impact}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* CTA */}
            <button
              className="font-mono text-[11px] tracking-[0.18em] px-5 py-2.5 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{ background: o(0.10), border: `1px solid ${o(0.40)}`, color: o(0.90) }}
              onClick={(e) => { e.stopPropagation(); onOpen(project) }}
            >
              {lang === 'en' ? 'VIEW SIGNAL REPORT →' : 'VOIR RAPPORT SIGNAL →'}
            </button>
          </div>

          {/* ── Right column: metrics ────────────────────────────────────── */}
          <div
            className="md:w-52 rounded-xl p-5 flex flex-col"
            style={{ background: o(0.04), border: `1px solid ${o(0.20)}` }}
          >
            <p
              className="font-mono text-[10px] tracking-[0.18em] mb-5"
              style={{ color: o(0.70) }}
            >
              {lang === 'en' ? 'KEY SIGNALS' : 'SIGNAUX CLÉS'}
            </p>
            <div className="space-y-5">
              {project.metrics.map(m => (
                <div key={m.value} className="flex flex-col items-center text-center">
                  <span className="font-display font-semibold text-2xl" style={{ color: o(0.90) }}>{m.value}</span>
                  <span className="font-mono text-[10px] text-text-dim leading-tight mt-0.5">{m.label[lang]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Regular project card ──────────────────────────────────────────────────────
function ProjectCard({ project, lang, onOpen, onOpenDemo, cta, index }) {
  const [ref, inView] = useInView()
  const t = project[lang]

  return (
    <div
      ref={ref}
      className={`group relative panel rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-border-light hover:glow-amber-sm flex flex-col opacity-0`}
      style={{ animation: inView ? `revealUp 0.6s ease forwards ${index * 100}ms` : 'none' }}
      onClick={() => onOpen(project)}
    >
      {/* Category */}
      <p className="font-mono text-[10px] tracking-widest text-text-dim mb-4">{project.category}</p>

      {/* Title */}
      <h3 className="font-display font-semibold text-lg text-text-bright mb-1.5 group-hover:text-amber transition-colors duration-200">
        {t.title}
      </h3>
      <p className="font-mono text-xs text-silver mb-4">{t.subtitle}</p>

      {/* Impact */}
      <p className="text-text-dim text-sm leading-relaxed mb-5 flex-1">{t.impact}</p>

      {/* Metrics */}
      <div className="flex gap-4 py-4 border-t border-border mb-5">
        {project.metrics.slice(0, 2).map(m => (
          <div key={m.value} className="flex items-baseline gap-1.5">
            <span className="font-display font-semibold text-base text-kpi">{m.value}</span>
            <span className="font-mono text-[10px] text-text-dim">{m.label[lang]}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.slice(0, 2).map(tag => (
          <span key={tag} className="tag text-[10px]">{tag}</span>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <button
          className="font-mono text-xs text-text-dim hover:text-amber transition-colors duration-200"
          onClick={(e) => { e.stopPropagation(); onOpen(project) }}
        >
          {cta} →
        </button>
        <span className="text-border">·</span>
        <button
          className="flex items-center gap-1.5 font-mono text-xs text-text-dim hover:text-amber transition-colors duration-200"
          onClick={(e) => { e.stopPropagation(); onOpenDemo(project) }}
        >
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className="shrink-0">
            <polygon points="2,1 11,6 2,11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
          </svg>
          {lang === 'en' ? 'Check Demo' : 'Voir Démo'}
        </button>
      </div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const { lang } = useLang()
  const t = content[lang].projects
  const [active, setActive] = useState(null)
  const [activeTab, setActiveTab] = useState('case-study')
  const [seasonalOpen, setSeasonalOpen] = useState(false)
  const [headerRef, headerInView] = useInView()

  function openProject(project, tab = 'case-study') {
    if (project.type === 'seasonal') {
      setSeasonalOpen(true)
    } else {
      setActive(project)
      setActiveTab(tab)
    }
  }

  const seasonal = projects.find(p => p.type === 'seasonal')
  const others   = projects.filter(p => p.type !== 'seasonal')

  return (
    <section id="projects" className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 bg-navy/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section label */}
        <div ref={headerRef} className={`section-label opacity-0 ${headerInView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">{t.label}</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <h2
            className={`font-display font-semibold text-4xl md:text-5xl text-text-bright leading-tight opacity-0 ${headerInView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '100ms' }}
          >
            {t.heading}
          </h2>
          <p
            className={`text-text-dim text-sm leading-relaxed max-w-sm opacity-0 ${headerInView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            {t.sub}
          </p>
        </div>

        {/* Seasonal project — first, full-width, teal */}
        {seasonal && (
          <div className="mb-6">
            <SeasonalCard project={seasonal} lang={lang} onOpen={openProject} />
          </div>
        )}

        {/* Regular projects grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onOpen={openProject}
              onOpenDemo={(p) => openProject(p, 'demo')}
              cta={t.cta}
              index={i}
            />
          ))}
        </div>

      </div>

      {/* Standard project modal */}
      {active && (
        <ProjectModal
          project={active}
          lang={lang}
          onClose={() => setActive(null)}
          initialTab={activeTab}
        />
      )}

      {/* Seasonal / Signal Lab modal */}
      {seasonalOpen && (
        <SeasonalProjectModal lang={lang} onClose={() => setSeasonalOpen(false)} />
      )}
    </section>
  )
}
