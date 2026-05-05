const links = [
  {
    label: 'email',
    value: 'PLACEHOLDER@email.com',   // PLACEHOLDER: replace with your email
    href: 'mailto:PLACEHOLDER@email.com',
    icon: '→',
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/PLACEHOLDER', // PLACEHOLDER: replace with your LinkedIn
    href: 'https://linkedin.com/in/PLACEHOLDER',
    icon: '↗',
  },
  {
    label: 'github',
    value: 'github.com/PLACEHOLDER',   // PLACEHOLDER: replace with your GitHub
    href: 'https://github.com/PLACEHOLDER',
    icon: '↗',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-16 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="sys-label mb-6">[ contact.terminal ]</p>

        <div className="panel">
          {/* status bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-panel">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse-slow" />
            <span className="font-mono text-xs text-green">status: available</span>
            <span className="font-mono text-xs text-text-dim/40 mx-1">·</span>
            <span className="font-mono text-xs text-text-dim">open to roles in business analysis, bi and consulting</span>
          </div>

          <div className="grid md:grid-cols-2 divide-x divide-border">
            {/* left — availability */}
            <div className="p-6">
              <p className="font-mono text-xs text-accent/60 mb-3">availability</p>
              <p className="font-sans text-sm text-text leading-relaxed mb-4">
                open to roles in business analysis, bi and consulting.
              </p>
              <p className="font-mono text-xs text-text-dim leading-relaxed">
                interested in positions where data and process improvement
                directly support commercial decisions.
              </p>
            </div>

            {/* right — links */}
            <div className="p-6">
              <p className="font-mono text-xs text-accent/60 mb-3">reach out</p>
              <div className="flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.label !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 border border-border hover:border-accent/40 hover:bg-panel transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-accent/60 w-14 shrink-0">{l.label}</span>
                      <span className="font-mono text-xs text-text-dim group-hover:text-text transition-colors">
                        {l.value}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-text-dim/40 group-hover:text-accent transition-colors">
                      {l.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <p className="font-mono text-xs text-text-dim/30 text-center mt-8">
          kenza en-nassef — 2026 · built with react + tailwind
        </p>
      </div>
    </section>
  )
}
