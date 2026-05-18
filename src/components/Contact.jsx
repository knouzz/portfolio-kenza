import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const { lang } = useLang()
  const t = content[lang].contact
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Replace with real form handler (Formspree, EmailJS, etc.)
    setSent(true)
  }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">{t.label}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: copy */}
          <div>
            <h2
              className={`font-display font-semibold text-4xl md:text-5xl text-text-bright leading-tight mb-6 opacity-0 ${
                inView ? 'reveal-up' : ''
              }`}
              style={{ animationDelay: '100ms' }}
            >
              {t.heading}
            </h2>

            <p
              className={`text-text leading-relaxed mb-10 max-w-md opacity-0 ${
                inView ? 'reveal-up' : ''
              }`}
              style={{ animationDelay: '200ms' }}
            >
              {t.sub}
            </p>

            {/* Availability badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 border border-status-green/25 bg-status-green/5 rounded-lg mb-10 opacity-0 ${
                inView ? 'reveal-up' : ''
              }`}
              style={{ animationDelay: '300ms' }}
            >
              <span className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
              <span className="font-mono text-xs text-status-green">{t.availability}</span>
            </div>

            {/* Contact links */}
            <div
              className={`space-y-3 opacity-0 ${inView ? 'reveal-up' : ''}`}
              style={{ animationDelay: '400ms' }}
            >
              {t.links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 group"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-lg border border-border group-hover:border-amber/40 flex items-center justify-center transition-all duration-200">
                    <span className="font-mono text-xs text-text-dim group-hover:text-amber transition-colors duration-200">
                      {link.label === 'LinkedIn' ? 'in' : '@'}
                    </span>
                  </div>
                  <span className="font-medium text-text group-hover:text-amber transition-colors duration-200">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className={`opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '250ms' }}
          >
            {sent ? (
              <div className="panel-elevated rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4" style={{ minHeight: 340 }}>
                <div className="w-12 h-12 rounded-full border border-amber/30 bg-amber/5 flex items-center justify-center mb-2">
                  <span className="text-amber text-xl">✓</span>
                </div>
                <p className="font-display font-semibold text-xl text-text-bright">
                  {lang === 'en' ? "Message received." : "Message reçu."}
                </p>
                <p className="text-text-dim text-sm">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel-elevated rounded-2xl p-8 space-y-5">
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-text-dim block mb-2">
                    {t.form.name.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    required
                    placeholder={t.form.name}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-dim/50 focus:outline-none focus:border-amber/40 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-widest text-text-dim block mb-2">
                    {t.form.email.toUpperCase()}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    required
                    placeholder={t.form.email}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-dim/50 focus:outline-none focus:border-amber/40 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-widest text-text-dim block mb-2">
                    {t.form.message.toUpperCase()}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    required
                    placeholder={t.form.message}
                    rows={5}
                    className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-dim/50 focus:outline-none focus:border-amber/40 transition-colors duration-200 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  {t.form.send}
                  <span className="ml-1 text-bg/60">→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-dim/40">
            Kenza En-Nassef · 2026
          </p>
          <p className="font-mono text-xs text-text-dim/40">
            Built with React + Tailwind · {lang === 'en' ? 'Designed for intelligence.' : 'Conçu pour l\'intelligence.'}
          </p>
        </div>
      </div>
    </section>
  )
}
