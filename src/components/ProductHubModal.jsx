import { useState, useEffect } from 'react'

// ── static content ────────────────────────────────────────────────────────────

const beforeGroups = [
  {
    team: 'product development team',
    steps: [
      'creates recipe sheet manually',
      'fills 3 IT excel files independently',
    ],
  },
  {
    team: 'marketing team',
    steps: [
      'fills product information sheet',
      'repeats the same IT files for france',
    ],
  },
  {
    team: 'operations team',
    steps: [
      'repeats the entire process per country for international markets',
    ],
  },
]

const afterGroups = [
  {
    layer: 'input',
    steps: [
      'product development team inputs recipe data once into the product hub',
      'marketing inputs product info once into the product hub',
    ],
  },
  {
    layer: 'automation',
    steps: [
      'vba macros auto-populate all required IT files',
      'archive system logs the product automatically',
    ],
  },
  {
    layer: 'roadmap',
    steps: [
      'power bi connection for performance tracking (planned)',
    ],
  },
]

const beforeTags = ['~2h per product', 'high error risk', 'no coordination', 'repeated work']
const afterTags  = ['30 min per product', 'errors reduced', 'aligned teams', 'one source of truth']

const features = [
  { title: 'single data input',    detail: 'one entry point for all product data. no duplication across teams or files.' },
  { title: 'vba automation',       detail: 'macros auto-populate IT files, handle validation, and eliminate manual steps.' },
  { title: 'navigation home page', detail: 'clear interface with instructions — designed for non-technical users.' },
  { title: 'backend data engine',  detail: 'structured layer with dropdowns, mapping tables, raw data and glossary.' },
  { title: 'archive system',       detail: 'stores all created products with full metadata for future reference.' },
  { title: 'power bi ready',       detail: 'architecture designed to connect directly to a performance tracking dashboard.' },
]

const metrics = [
  { value: '−75%', label: 'time per product', sub: '2h → 30 min' },
  { value: '360h', label: 'saved per year',   sub: 'estimated annual impact' },
  { value: '€9k',  label: 'annual savings',   sub: 'operational cost reduction' },
  { value: '3',    label: 'teams aligned',    sub: 'npd · marketing · intl. ops' },
]

const technical = [
  { tool: 'excel',       role: 'data model, input forms, user interface' },
  { tool: 'vba',         role: 'automation macros, file population, validation logic' },
  { tool: 'power query', role: 'data transformation and connection layer' },
  { tool: 'claude',      role: 'vba debugging assistant and formula validation' },
]

const highlights = [
  'identifying process inefficiencies within the IT and marketing departments',
  'translating a business problem into a working, maintained tool',
  'designing for non-technical users — clear, usable, documented',
  'delivering measurable roi through structured thinking',
]

// ── sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-green/60">{label}</span>
      <div className="flex-1 h-px bg-green/10" />
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export default function ProductHubModal({ onClose }) {
  const [view, setView] = useState('before')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-3xl bg-surface border border-green/30 rounded-sm glow-green-sm">

        {/* ── header bar ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-green/20 bg-green/5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-text-dim">mission.04</span>
            <span className="tag-green">automation tool</span>
            <span className="tag-green">featured</span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-text-dim hover:text-text transition-colors"
            style={{ textTransform: 'none' }}
          >
            [ close ]
          </button>
        </div>

        <div className="p-6 space-y-8">

          {/* ── title ─────────────────────────────────────────────────── */}
          <div>
            <h2 className="font-sans text-xl text-green font-medium mb-0.5">product data hub</h2>
            <p className="font-mono text-xs text-text-dim">excel + vba automation · brand management — sushi shop</p>
          </div>

          {/* ── image placeholder ─────────────────────────────────────── */}
          <div className="w-full h-44 flex items-center justify-center bg-panel border border-border rounded-sm">
            {/*
              PLACEHOLDER — replace with:
              <img src="/images/product-hub-overview.png"
                   alt="product hub architecture overview"
                   className="w-full h-full object-cover rounded-sm" />
            */}
            <div className="text-center">
              <p className="font-mono text-xs text-text-dim/40 mb-1">[ screenshot / diagram ]</p>
              <p className="font-mono text-xs text-text-dim/25">product hub architecture overview</p>
            </div>
          </div>

          {/* ── problem ───────────────────────────────────────────────── */}
          <div>
            <SectionTitle label="problem" />
            <p className="font-sans text-sm text-text leading-relaxed mb-4">
              product creation took ~2 hours per product across 3 disconnected teams — with no central data source,
              repeated manual entry, and errors that propagated downstream into it systems.
            </p>
            <div className="border border-border rounded-sm divide-y divide-border">
              {[
                ['fragmented input',  'npd, marketing, and international teams each filled the same data into separate files.'],
                ['no single source',  'product data existed in 3+ excel files with no master record.'],
                ['manual repetition', '~2 hours per product, per launch — repeated across all markets.'],
                ['error propagation', "copy-paste errors flowed downstream into it systems undetected."],
                ['no coordination',   "teams had no visibility into each other's progress or data state."],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 px-3 py-2">
                  <span className="font-mono text-xs text-green/60 w-28 shrink-0 pt-0.5">{k}</span>
                  <span className="font-sans text-xs text-text leading-relaxed">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── workflow ──────────────────────────────────────────────── */}
          <div>
            <SectionTitle label="workflow" />

            {/* toggle */}
            <div className="flex gap-1 mb-4">
              {[
                { key: 'before', label: '← before' },
                { key: 'after',  label: 'after →'  },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`font-mono text-xs px-4 py-1.5 border transition-colors ${
                    view === key
                      ? 'border-green/40 bg-green/10 text-green'
                      : 'border-border text-text-dim hover:text-text'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* before */}
            {view === 'before' && (
              <div className="border border-border rounded-sm p-4 space-y-4">
                {beforeGroups.map((g) => (
                  <div key={g.team}>
                    <span className="tag mb-2 inline-block">{g.team}</span>
                    <div className="ml-2 pl-3 space-y-1.5 border-l border-border/60">
                      {g.steps.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-mono text-xs text-text-dim mt-0.5 shrink-0">→</span>
                          <span className="font-sans text-xs text-text">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {beforeTags.map((t) => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 border border-red-500/30 text-red-400/70 bg-red-500/5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* after */}
            {view === 'after' && (
              <div className="border border-green/20 rounded-sm p-4 space-y-4 bg-green/5">
                {afterGroups.map((g) => (
                  <div key={g.layer}>
                    <span className="tag-green mb-2 inline-block">{g.layer}</span>
                    <div className="ml-2 pl-3 space-y-1.5 border-l border-green/30">
                      {g.steps.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-mono text-xs text-green/60 mt-0.5 shrink-0">→</span>
                          <span className="font-sans text-xs text-text">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-green/20">
                  {afterTags.map((t) => (
                    <span key={t} className="tag-green">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── key features ──────────────────────────────────────────── */}
          <div>
            <SectionTitle label="key features" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="panel p-3 hover:border-green/30 transition-colors duration-150 cursor-default"
                >
                  <p className="font-mono text-xs text-green/70 mb-1.5">{f.title}</p>
                  <p className="font-sans text-xs text-text leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── impact ────────────────────────────────────────────────── */}
          <div>
            <SectionTitle label="impact" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="panel p-3 text-center hover:glow-green-sm transition-all duration-200"
                >
                  <p className="font-mono text-2xl text-green font-medium mb-0.5">{m.value}</p>
                  <p className="font-mono text-xs text-text mb-0.5">{m.label}</p>
                  <p className="font-mono text-xs text-text-dim">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── technical layer ───────────────────────────────────────── */}
          <div>
            <SectionTitle label="technical layer" />
            <div className="border border-border rounded-sm divide-y divide-border mb-3">
              {technical.map((t) => (
                <div key={t.tool} className="flex gap-4 px-3 py-2">
                  <span className="font-mono text-xs text-green/60 w-20 shrink-0">{t.tool}</span>
                  <span className="font-sans text-xs text-text leading-relaxed">{t.role}</span>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 bg-panel border border-border rounded-sm">
              <span className="font-mono text-xs text-text-dim">
                <span className="text-text">note on ai usage —</span>{' '}
                claude was used as a technical assistant for vba debugging and formula validation.
                business logic, process design, data architecture and workflow structure were developed independently.
              </span>
            </div>
          </div>

          {/* ── what this project shows ───────────────────────────────── */}
          <div>
            <SectionTitle label="what this project shows" />
            <div className="panel divide-y divide-border">
              {highlights.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3">
                  <span className="font-mono text-xs text-green/60 w-5 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-sans text-sm text-text leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── action buttons ────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            <button disabled className="font-mono text-xs px-3 py-1.5 border border-border text-text-dim/40 cursor-not-allowed">
              ▶ demo video — coming soon
            </button>
            <button disabled className="font-mono text-xs px-3 py-1.5 border border-border text-text-dim/40 cursor-not-allowed">
              ↗ github — private repo
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
