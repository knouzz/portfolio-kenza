import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useInView } from '../hooks/useInView'

function StatCard({ value, label, index }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-1 opacity-0 transition-all duration-700`}
      style={{ animation: inView ? `revealUp 0.6s ease forwards ${index * 100}ms` : 'none' }}
    >
      <span className="font-display font-semibold text-3xl text-kpi">{value}</span>
      <span className="font-mono text-xs text-text-dim tracking-wide">{label}</span>
    </div>
  )
}

export default function ExecutiveSnapshot() {
  const { lang } = useLang()
  const t = content[lang].snapshot
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-16 lg:py-24 relative">
      {/* Subtle section background shift */}
      <div className="absolute inset-0 bg-navy/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">{t.label}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-16 items-start">
          {/* Left: narrative */}
          <div>
            <h2
              className={`font-display font-semibold text-4xl md:text-5xl text-text-bright mb-10 leading-tight opacity-0 ${
                inView ? 'reveal-up' : ''
              }`}
              style={{ animationDelay: '100ms' }}
            >
              {t.heading}
            </h2>

            <div className="space-y-5">
              {t.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-text leading-relaxed opacity-0 ${inView ? 'reveal-up' : ''}`}
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  {i === 0 ? (
                    <span className="text-text-bright font-medium text-lg">{para}</span>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>

            {/* Discipline tags */}
            <div
              className={`flex flex-wrap gap-2 mt-8 opacity-0 ${inView ? 'reveal-up' : ''}`}
              style={{ animationDelay: '500ms' }}
            >
              {t.disciplines.map(d => (
                <span key={d} className="tag">{d}</span>
              ))}
            </div>
          </div>

          {/* Right: stats + profile card */}
          <div
            className={`opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            {/* Profile card */}
            <div className="panel-elevated rounded-2xl p-8 mb-8">
              {/* Card header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                  <div className="font-display font-semibold text-text-bright text-lg mb-0.5">
                    Kenza En-Nassef
                  </div>
                  <div className="font-mono text-xs text-amber/70 tracking-widest">
                    {lang === 'en' ? 'BUSINESS ANALYST · BI' : 'ANALYSTE COMMERCIALE · BI'}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/25 flex items-center justify-center">
                  <span className="font-display font-semibold text-amber text-sm">K</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-8">
                {t.stats.map((s, i) => (
                  <StatCard key={s.label} value={s.value} label={s.label} index={i} />
                ))}
              </div>
            </div>

            {/* Background path — elegant timeline */}
            <div className="panel rounded-xl p-6">
              <p className="font-mono text-[10px] tracking-widest text-text-dim mb-5">
                {lang === 'en' ? 'CAREER ARC' : 'TRAJECTOIRE'}
              </p>
              <div className="space-y-4">
                {[
                  {
                    phase: lang === 'en' ? 'Communications & PR'          : 'Communication & RP',
                    desc:  lang === 'en' ? 'Brand narrative, media, storytelling' : 'Narration de marque, médias, storytelling',
                  },
                  {
                    phase: lang === 'en' ? 'Marketing & Brand Strategy'   : 'Marketing & Stratégie de Marque',
                    desc:  lang === 'en' ? 'Consumer insight, category management'   : "Insight consommateur, category management",
                  },
                  {
                    phase: lang === 'en' ? 'Commercial Analysis & BI'     : 'Analyse Commerciale & BI',
                    desc:  lang === 'en' ? 'KPIs, dashboards, automation, forecasting' : 'KPIs, dashboards, automatisation, prévisions',
                    current: true,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.current ? 'bg-amber' : 'bg-border-light'
                        }`}
                      />
                      {i < 2 && <div className="w-px h-8 bg-border" />}
                    </div>
                    <div>
                      <p
                        className={`font-medium text-sm mb-0.5 ${
                          item.current ? 'text-amber' : 'text-text'
                        }`}
                      >
                        {item.phase}
                      </p>
                      <p className="font-mono text-[11px] text-text-dim">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Human energy card — full width, bottom of section */}
        <div
          className={`mt-8 panel rounded-xl p-6 flex items-start gap-5 opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '600ms' }}
        >
          <div className="w-1.5 h-6 rounded-full bg-kpi/30 shrink-0 mt-0.5" />
          <div>
            <p className="font-mono text-[10px] tracking-widest text-kpi/60 mb-2">
              {lang === 'en' ? 'OFF THE CLOCK' : 'EN DEHORS DU BUREAU'}
            </p>
            <p className="text-text-dim text-sm leading-relaxed max-w-2xl">
              {lang === 'en'
                ? 'Football on weekends, hikes that reset the thinking, long conversations over a BBQ. The same curiosity that draws me toward consumer behavior — why people do what they do — makes these moments feel like continued fieldwork.'
                : 'Football le weekend, randonnées qui remettent les idées en place, longues conversations autour d\'un BBQ. La même curiosité qui me pousse vers les comportements consommateurs — pourquoi les gens font ce qu\'ils font — fait de ces moments une forme de terrain continue.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
