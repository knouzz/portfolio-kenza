import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useInView } from '../hooks/useInView'

// ─── LinkedIn icon ─────────────────────────────────────────────────────────────
function LinkedInIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452H17.02v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.604V9h3.29v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.908 1.908 0 01-1.907-1.907 1.908 1.908 0 011.907-1.907 1.908 1.908 0 011.907 1.907 1.908 1.908 0 01-1.907 1.907zM6.78 20.452H3.89V9h2.89v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ─── Avatar: real photo or initials fallback ───────────────────────────────────
function Avatar({ photo, name, size = 48 }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '??'

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="rounded-full object-cover border-2"
        style={{ width: size, height: size, borderColor: 'rgba(180,195,210,0.25)' }}
        onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
      />
    )
  }

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 border"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, rgba(180,195,210,0.12), rgba(180,195,210,0.04))',
        borderColor: 'rgba(180,195,210,0.20)',
      }}
    >
      <span className="font-display font-semibold text-sm" style={{ color: 'rgba(180,195,210,0.70)' }}>
        {initials}
      </span>
    </div>
  )
}

// ─── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({ item, index }) {
  const [ref, inView] = useInView()

  const attribution = (
    <div className="border-t border-border pt-5 flex items-center gap-3.5">
      {/* Avatar */}
      <div className="shrink-0">
        <Avatar photo={item.photo} name={item.name} size={44} />
      </div>

      {/* Name + title + company */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-display font-semibold text-sm text-text-bright leading-tight truncate">
            {item.name}
          </p>
          {item.linkedin && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="shrink-0 text-text-dim hover:text-[#0A66C2] transition-colors duration-200"
              aria-label={`${item.name} on LinkedIn`}
            >
              <LinkedInIcon size={13} />
            </a>
          )}
        </div>
        <p className="font-mono text-[10px] text-text-dim leading-snug mt-0.5 truncate">{item.title}</p>
        <p className="font-mono text-[10px] leading-snug mt-0.5 truncate" style={{ color: 'rgba(180,195,210,0.40)' }}>
          {item.company}
        </p>
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`group relative panel rounded-xl p-7 flex flex-col gap-6 transition-all duration-300 hover:border-border-light opacity-0`}
      style={{
        animation: inView
          ? `revealUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards ${index * 150}ms`
          : 'none',
      }}
    >
      {/* Large quotation mark */}
      <div
        className="absolute top-5 right-6 font-display text-6xl text-amber/10 leading-none select-none pointer-events-none"
        style={{ fontStyle: 'italic' }}
        aria-hidden
      >
        "
      </div>

      {/* Quote */}
      <blockquote className="text-text leading-relaxed text-[15px] relative z-10 flex-1">
        "{item.quote}"
      </blockquote>

      {/* Attribution — wrap in <a> only if linkedin exists */}
      {item.linkedin ? (
        <a
          href={item.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity duration-200"
          onClick={e => e.stopPropagation()}
        >
          {attribution}
        </a>
      ) : attribution}
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { lang } = useLang()
  const t = content[lang].testimonials
  const [ref, inView] = useInView()

  return (
    <section id="testimonials" className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 bg-navy/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">{t.label}</span>
        </div>

        <h2
          className={`font-display font-semibold text-4xl lg:text-5xl text-text-bright mb-14 leading-tight opacity-0 ${
            inView ? 'reveal-up' : ''
          }`}
          style={{ animationDelay: '100ms' }}
        >
          {t.heading}
        </h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {t.items.map((item, i) => (
            <div key={i} className="break-inside-avoid">
              <TestimonialCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
