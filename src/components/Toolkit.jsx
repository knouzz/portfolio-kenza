const groups = [
  {
    id: 'data & bi',
    skills: ['power bi', 'excel', 'dax', 'sql', 'data modeling', 'vba'],
  },
  {
    id: 'analysis',
    skills: ['kpi tracking', 'forecasting', 'sell-in / sell-out analysis', 'performance reporting', 'trend analysis'],
  },
  {
    id: 'business',
    skills: ['process optimization', 'stakeholder communication', 'problem structuring', 'project scoping', 'requirements gathering'],
  },
]

export default function Toolkit() {
  return (
    <section id="toolkit" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="sys-label mb-6">[ toolkit.registry ]</p>
        <div className="grid md:grid-cols-3 gap-3">
          {groups.map((g) => (
            <div key={g.id} className="panel">
              {/* group header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                <span className="font-mono text-xs text-accent">{g.id}</span>
              </div>
              {/* skills */}
              <div className="p-3 flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
