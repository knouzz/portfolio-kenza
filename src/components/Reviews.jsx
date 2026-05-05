const testimonials = [
  {
    quote: 'kenza brings structure, clarity and energy to complex projects. she quickly understands priorities and delivers work that actually moves things forward.',
    role: 'former manager',
    context: 'brand management',
  },
  {
    quote: 'she is proactive, reliable, and turns analysis into concrete actions. you can give her a messy problem and trust that she will come back with a clear answer.',
    role: 'former manager',
    context: 'category management',
  },
  {
    quote: 'kenza listens, understands the need, then builds the right solution — not just the requested one. that is rare and genuinely valuable.',
    role: 'colleague',
    context: 'cross-functional project',
  },
]

function TestimonialCard({ quote, role, context }) {
  return (
    <div className="panel p-5 flex flex-col gap-4 hover:glow-accent-sm transition-all duration-200">
      <div className="relative">
        <span
          className="absolute -top-2 -left-1 font-serif text-4xl text-accent/20 leading-none select-none"
          style={{ textTransform: 'none' }}
        >"</span>
        <p className="font-sans text-sm text-text leading-relaxed pt-4 italic">{quote}</p>
      </div>
      <div className="border-t border-border pt-3">
        <p className="font-mono text-xs text-text-bright">{role}</p>
        <p className="font-mono text-xs text-text-dim">{context}</p>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="sys-label mb-6">[ peer.review ]</p>
        <div className="grid md:grid-cols-3 gap-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
