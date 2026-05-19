import { useState, useEffect, useCallback } from 'react'

// ─── Sub-label ────────────────────────────────────────────────────────────────
function SectionMeta({ children }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.2em] text-amber/60 mb-4 uppercase">
      {children}
    </p>
  )
}

// ─── Video player (YouTube embed / Vimeo embed / local <video>) ───────────────
function VideoPlayer({ video, lang }) {
  const url = video.url
  const isEmbed = url.includes('youtube') || url.includes('youtu.be') || url.includes('vimeo')

  return (
    <div>
      <SectionMeta>{lang === 'en' ? 'Demo Video' : 'Vidéo Démo'}</SectionMeta>

      {/* 16:9 responsive container */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-border bg-panel"
        style={{ paddingBottom: '56.25%' }}
      >
        {isEmbed ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={url}
            title={video.caption?.[lang] || 'Demo'}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src={url}
            controls
            preload="metadata"
          />
        )}
      </div>

      {video.caption?.[lang] && (
        <p className="font-mono text-xs text-silver mt-3 leading-relaxed">
          {video.caption[lang]}
        </p>
      )}
    </div>
  )
}

// ─── Screenshot gallery with keyboard nav + progress indicator ────────────────
function ScreenshotGallery({ screenshots, lang, isActive }) {
  const [idx, setIdx] = useState(0)
  const total = screenshots.length

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])

  // Keyboard arrows only when this tab is active
  useEffect(() => {
    if (!isActive || total <= 1) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isActive, prev, next, total])

  const shot = screenshots[idx]

  return (
    <div>
      {/* Label + counter */}
      <div className="flex items-center justify-between mb-4">
        <SectionMeta>{lang === 'en' ? 'Snippets of the project, more to discuss!' : 'Aperçus du projet, à approfondir ensemble !'}</SectionMeta>
        {total > 1 && (
          <span className="font-mono text-[10px] text-text-dim -mt-4">
            {idx + 1} / {total}
          </span>
        )}
      </div>

      {/* Main image */}
      <div className="group relative rounded-xl overflow-hidden border border-border bg-panel flex items-center justify-center">
        <img
          key={idx}
          src={shot.src}
          alt={shot.caption?.[lang] || `Screenshot ${idx + 1}`}
          className="w-full h-auto object-contain"
          loading="lazy"
        />

        {/* Hover nav arrows */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-bg/80 border border-border flex items-center justify-center text-silver hover:border-amber/40 hover:text-amber transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 text-base font-light"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-bg/80 border border-border flex items-center justify-center text-silver hover:border-amber/40 hover:text-amber transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 text-base font-light"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {shot.caption?.[lang] && (
        <p className="font-mono text-xs text-silver mt-3 leading-relaxed">
          {shot.caption[lang]}
        </p>
      )}

      {/* Analytical note — left-border highlight */}
      {shot.note?.[lang] && (
        <div className="mt-3 pl-4 border-l-2 border-amber/25">
          <p className="text-text-dim text-sm leading-relaxed">{shot.note[lang]}</p>
        </div>
      )}

      {/* Progress pills */}
      {total > 1 && (
        <div className="flex items-center gap-1.5 mt-5 justify-center">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Screenshot ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? 'w-5 h-1.5 bg-amber'
                  : 'w-1.5 h-1.5 bg-border hover:bg-silver'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Placeholder (no assets yet) with feature highlights ─────────────────────
function DemoPlaceholder({ demo, lang }) {
  const highlights = demo?.highlights || []

  return (
    <div className="space-y-6">
      {/* Wireframe frame */}
      <div
        className="relative rounded-xl border border-border bg-panel overflow-hidden"
        style={{ minHeight: 200 }}
      >
        {/* Faint grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-25" />

        {/* Fake dashboard panel shapes */}
        <div className="absolute inset-4 grid grid-cols-3 gap-2 pointer-events-none opacity-[0.08]">
          <div className="col-span-2 rounded-lg border border-border bg-surface" />
          <div className="rounded-lg border border-border bg-surface" />
          <div className="rounded-lg border border-border bg-surface" />
          <div className="rounded-lg border border-border bg-surface" />
          <div className="rounded-lg border border-border bg-surface" />
        </div>

        {/* Center content */}
        <div className="relative flex flex-col items-center justify-center h-full py-14 px-6 text-center">
          {/* Dashboard icon */}
          <div className="w-10 h-10 rounded-xl border border-border bg-surface flex items-center justify-center mb-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-dim">
              <rect x="1" y="1" width="5" height="5" rx="0.75" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="1" width="7" height="3"   rx="0.75" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="6" width="7" height="2.5" rx="0.75" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="1" y="8" width="5" height="7"   rx="0.75" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="8" y="10" width="7" height="5"  rx="0.75" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-amber/50 mb-2 uppercase">
            {lang === 'en' ? 'Demos incoming' : 'Démos en cours'}
          </p>
        </div>
      </div>

      {/* Feature highlights */}
      {highlights.length > 0 && (
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-amber/60 mb-3 uppercase">
            {lang === 'en' ? 'This Demo Covers' : 'Cette Démo Présente'}
          </p>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 panel rounded-lg px-4 py-3">
                <span className="text-kpi font-mono text-[10px] mt-1 shrink-0">▸</span>
                <span className="text-text text-sm leading-relaxed">{h[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tableau dashboard download block ────────────────────────────────────────
function TableauBlock({ tableau, lang }) {
  return (
    <div>
      <SectionMeta>{lang === 'en' ? 'Packaged Dashboard' : 'Dashboard Packagé'}</SectionMeta>
      <div
        className="rounded-xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        style={{ background: 'rgba(8,17,18,0.70)' }}
      >
        {/* Tableau icon */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(92,242,197,0.08)', border: '1px solid rgba(92,242,197,0.20)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-kpi">
            <rect x="10.5" y="1" width="3" height="6"  rx="1" fill="currentColor" opacity="0.9"/>
            <rect x="10.5" y="17" width="3" height="6" rx="1" fill="currentColor" opacity="0.4"/>
            <rect x="1" y="10.5" width="6" height="3"  rx="1" fill="currentColor" opacity="0.9"/>
            <rect x="17" y="10.5" width="6" height="3" rx="1" fill="currentColor" opacity="0.4"/>
            <rect x="4"  y="4"  width="3" height="6" rx="1" fill="currentColor" opacity="0.7" transform="rotate(-45 4 4)"/>
            <rect x="16" y="14" width="3" height="6" rx="1" fill="currentColor" opacity="0.3" transform="rotate(-45 16 14)"/>
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-text-bright text-sm mb-0.5">
            {tableau.title?.[lang] || 'Cultural Sentiment Intelligence'}
          </p>
          <p className="font-mono text-[10px] text-text-dim leading-relaxed">
            {tableau.caption?.[lang]}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(tableau.sheets || []).map(s => (
              <span key={s} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-surface border border-border text-text-dim">{s}</span>
            ))}
          </div>
        </div>

        {/* Download */}
        <a
          href={tableau.file}
          download
          onClick={e => e.stopPropagation()}
          className="shrink-0 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest px-4 py-2.5 rounded-lg border transition-all duration-200 hover:border-amber/50 hover:text-amber"
          style={{ background: 'rgba(6,13,14,0.80)', borderColor: 'rgba(92,242,197,0.22)', color: 'rgba(232,237,245,0.70)' }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {lang === 'en' ? 'DOWNLOAD .TWBX' : 'TÉLÉCHARGER .TWBX'}
        </a>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function DemoPanel({ project, lang, isActive }) {
  const demo = project.demo
  const hasVideo       = !!demo?.video?.url
  const hasScreenshots = (demo?.screenshots || []).length > 0
  const hasTableau     = !!demo?.tableau?.file
  const hasContent     = hasVideo || hasScreenshots || hasTableau

  if (!hasContent) {
    return <DemoPlaceholder demo={demo} lang={lang} />
  }

  return (
    <div className="space-y-8">
      {hasTableau && (
        <TableauBlock tableau={demo.tableau} lang={lang} />
      )}
      {hasVideo && (
        <VideoPlayer video={demo.video} lang={lang} />
      )}
      {hasScreenshots && (
        <ScreenshotGallery
          screenshots={demo.screenshots}
          lang={lang}
          isActive={isActive}
        />
      )}
    </div>
  )
}
