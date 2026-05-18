import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { toolkit } from '../data/toolkit'
import { useInView } from '../hooks/useInView'

function CategoryCard({ category, index, lang }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`panel rounded-xl overflow-hidden opacity-0`}
      style={{
        animation: inView
          ? `revealUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards ${index * 100}ms`
          : 'none',
      }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-amber/60 shrink-0" />
        <span className="font-mono text-xs tracking-widest text-amber/80">{(lang === 'fr' && category.category_fr ? category.category_fr : category.category).toUpperCase()}</span>
      </div>

      {/* Skills */}
      <div className="p-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-[10px] text-text-dim px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(92,242,197,0.06)', border: '1px solid rgba(92,242,197,0.12)' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Toolkit() {
  const { lang } = useLang()
  const t = content[lang].toolkit
  const [ref, inView] = useInView()

  return (
    <section id="toolkit" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">{t.label}</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2
            className={`font-display font-semibold text-4xl md:text-5xl text-text-bright leading-tight opacity-0 ${
              inView ? 'reveal-up' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            {t.heading}
          </h2>
          <p
            className={`text-text-dim text-sm leading-relaxed max-w-sm opacity-0 ${
              inView ? 'reveal-up' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          >
            {t.sub}
          </p>
        </div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolkit.map((category, i) => (
            <CategoryCard key={category.category} category={category} index={i} lang={lang} />
          ))}

          {/* Languages card — same shape as the others */}
          <div
            className="panel rounded-xl overflow-hidden opacity-0"
            style={{
              animation: inView
                ? `revealUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards ${toolkit.length * 100}ms`
                : 'none',
            }}
          >
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber/60 shrink-0" />
              <span className="font-mono text-xs tracking-widest text-amber/80">
                {lang === 'en' ? 'LANGUAGES' : 'LANGUES'}
              </span>
            </div>
            <div className="p-5 flex flex-wrap gap-2">
              {(lang === 'en'
                ? ['English', 'French', 'Arabic', 'Turkish — Beginner']
                : ['Anglais', 'Français', 'Arabe', 'Turc — Débutant']
              ).map((l) => (
                <span
                  key={l}
                  className="font-mono text-[10px] text-text-dim px-2.5 py-1 rounded-md"
                  style={{ background: 'rgba(92,242,197,0.06)', border: '1px solid rgba(92,242,197,0.12)' }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
