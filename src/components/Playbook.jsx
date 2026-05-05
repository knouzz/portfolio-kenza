const steps = [
  {
    n: '01',
    label: 'understand the business context',
    detail: 'before touching data, understand the goal, the stakeholders, and the decision being made.',
  },
  {
    n: '02',
    label: 'break problems into components',
    detail: 'structure the problem into clear, measurable parts. avoid jumping to solutions.',
  },
  {
    n: '03',
    label: 'identify key drivers using data',
    detail: 'find the 20% of variables that explain 80% of the outcome. cut noise, keep signal.',
  },
  {
    n: '04',
    label: 'design simple and scalable solutions',
    detail: 'build for clarity and maintainability. the best tool is the one the team actually uses.',
  },
  {
    n: '05',
    label: 'focus on clarity, usability and impact',
    detail: 'output must be actionable. insight without action is just information.',
  },
]

export default function Playbook() {
  return (
    <section id="playbook" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="sys-label mb-6">[ analyst.playbook ]</p>

        <div className="panel">
          <div className="divide-y divide-border">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6 p-5 hover:bg-panel/50 transition-colors duration-150 group">
                <span className="font-mono text-xs text-accent/60 w-8 shrink-0 pt-0.5">{s.n}</span>
                <div className="flex-1">
                  <p className="font-mono text-xs text-text-bright mb-1.5 group-hover:text-accent transition-colors">
                    {s.label}
                  </p>
                  <p className="font-sans text-xs text-text-dim leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-5 py-3 bg-accent/5">
            <p className="font-mono text-xs text-accent/70">
              note: applicable to any ba / bi / consulting engagement — tools come second, structure comes first.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
