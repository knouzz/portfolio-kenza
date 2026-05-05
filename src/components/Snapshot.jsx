const kpis = [
  { value: '3+',   unit: 'years',      label: 'brand, category & data experience' },
  { value: '5',    unit: 'markets',    label: 'france · benelux · türkiye · morocco · south korea' },
  { value: '120+', unit: 'planograms', label: 'retail recommendations built' },
  { value: '8+',   unit: 'categories', label: 'analyzed with sell-in / sell-out data' },
  { value: '3',    unit: 'dashboards', label: 'power bi — performance & decision tools' },
  { value: '2',    unit: 'tools',      label: 'excel — process automation & forecasting' },
]

function KpiCard({ value, unit, label }) {
  return (
    <div className="panel p-4 hover:glow-accent-sm transition-all duration-200">
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="font-mono text-2xl text-text-bright font-medium">{value}</span>
        <span className="font-mono text-xs text-accent">{unit}</span>
      </div>
      <p className="font-mono text-xs text-text-dim leading-relaxed">{label}</p>
    </div>
  )
}

export default function Snapshot() {
  return (
    <section id="snapshot" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="sys-label mb-6">[ system.snapshot ]</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {kpis.map((k, i) => (
            <KpiCard key={i} {...k} />
          ))}
        </div>
      </div>
    </section>
  )
}
