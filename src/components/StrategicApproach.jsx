import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useInView } from '../hooks/useInView'

function PillarCard({ pillar, index }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`group relative panel rounded-xl p-7 opacity-0 transition-all duration-300 hover:border-amber/20 hover:glow-amber-sm`}
      style={{
        animation: inView
          ? `revealUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards ${index * 120}ms`
          : 'none',
      }}
    >
      {/* Number */}
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-xs text-amber/50 tracking-widest">{pillar.number}</span>
        {/* Subtle top-right corner accent on hover */}
        <div className="w-4 h-4 border-t border-r border-transparent group-hover:border-amber/30 transition-all duration-300 rounded-tr" />
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-lg text-text-bright mb-3 leading-snug group-hover:text-amber transition-colors duration-300">
        {pillar.title}
      </h3>

      {/* Body */}
      <p className="text-text-dim leading-relaxed text-sm">{pillar.body}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-7 right-7 h-px bg-amber/0 group-hover:bg-amber/20 transition-all duration-300" />
    </div>
  )
}

export default function StrategicApproach() {
  const { lang } = useLang()
  const t = content[lang].approach
  const [ref, inView] = useInView()

  return (
    <section id="approach" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">{t.label}</span>
        </div>

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2
            className={`font-display font-semibold text-4xl md:text-5xl text-text-bright leading-tight opacity-0 ${
              inView ? 'reveal-up' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            {t.heading}
          </h2>
          <p
            className={`text-text-dim max-w-sm text-sm leading-relaxed opacity-0 ${
              inView ? 'reveal-up' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          >
            {t.sub}
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {t.pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-12 flex items-center gap-4 opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '600ms' }}
        >
          <div className="h-px flex-1 bg-border" />
          <p className="font-mono text-xs text-text-dim tracking-wide px-4 text-center">
            {lang === 'en'
              ? 'Methodology applies across FMCG · Retail · Consumer Goods · Strategy'
              : 'Méthodologie applicable en FMCG · Retail · Grande Consommation · Stratégie'}
          </p>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  )
}
