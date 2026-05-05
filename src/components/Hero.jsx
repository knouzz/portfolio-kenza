export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center py-20 px-4 grid-bg overflow-hidden">
      {/* radial overlay */}
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      {/* scan line */}
      <div className="absolute left-0 right-0 h-px bg-accent/20 scan-line pointer-events-none" />

      {/* corner labels */}
      <div className="absolute top-8 left-8 font-mono text-xs text-text-dim/40">sys.init</div>
      <div className="absolute top-8 right-8 font-mono text-xs text-text-dim/40">v1.0</div>

      <div className="relative max-w-4xl mx-auto w-full">
        <p className="sys-label mb-4">[ analyst.profile ]</p>

        <h1 className="font-sans text-4xl md:text-6xl font-light text-text-bright mb-2 tracking-tight">
          kenza <span className="text-accent">en-nassef</span>
        </h1>

        <p className="font-mono text-sm md:text-base text-text-dim mb-6">
          business analyst · bi & process optimization
        </p>

        <p className="font-sans text-base text-text leading-relaxed max-w-xl mb-10">
          i turn messy data and manual processes into clear dashboards,
          automated tools, and actionable business insights.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#missions"
            className="font-mono text-xs px-4 py-2 bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20 transition-colors"
          >
            ▶ view missions
          </a>
          {/* PLACEHOLDER: replace href with your actual CV file */}
          <a
            href="/cv-placeholder.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-4 py-2 border border-border text-text-dim hover:border-accent/40 hover:text-text transition-colors"
          >
            ↓ download cv
          </a>
          {/* PLACEHOLDER: replace href with your LinkedIn URL */}
          <a
            href="https://linkedin.com/in/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-4 py-2 border border-border text-text-dim hover:border-accent/40 hover:text-text transition-colors"
          >
            ↗ linkedin
          </a>
        </div>

        {/* status strip */}
        <div className="flex items-center gap-3 mt-12 font-mono text-xs text-text-dim">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse-slow" />
          <span>status: available for roles in ba · bi · consulting</span>
          <span className="hidden sm:inline text-text-dim/40">·</span>
          <span className="hidden sm:inline">paris · remote · international</span>
        </div>
      </div>
    </section>
  )
}
