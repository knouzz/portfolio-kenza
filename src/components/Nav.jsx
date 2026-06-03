import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'

export default function Nav() {
  const { lang, toggle } = useLang()
  const t = content[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useState(0)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 60)
      // On mobile: hide once scrolled past top, never come back
      if (window.innerWidth < 768) {
        setVisible(current < 60)
      }
      last = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = t.links.map(l => l.href)
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [lang])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      } ${!visible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-semibold text-text-bright tracking-tight hover:text-amber transition-colors duration-200"
        >
          KNOUZ<span className="text-amber">.</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {t.links.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-mono text-xs tracking-widest transition-colors duration-200 ${
                active === link.href
                  ? 'text-amber'
                  : 'text-silver hover:text-text-bright'
              }`}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="font-mono text-xs tracking-widest border border-border px-3 py-1.5 rounded text-silver hover:border-amber/40 hover:text-amber transition-all duration-200"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>

          <a
            href="mailto:kenzaennassef@outlook.fr"
            className="hidden md:inline-flex btn-primary text-xs py-2 px-4"
          >
            {t.cta}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-text-bright transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-text-bright transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-text-bright transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-border bg-surface/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {t.links.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-mono text-xs tracking-widest text-left py-3 border-b border-border/40 transition-colors duration-200 ${
                active === link.href ? 'text-amber' : 'text-silver'
              }`}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
          {/* CV + LinkedIn row */}
          <div className="flex items-center gap-3 mt-1 mb-1">
            <a
              href={lang === 'en' ? '/cv-kenza-en-nassef-en.pdf' : '/cv-kenza-en-nassef-fr.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 font-mono text-xs tracking-widest py-2.5 flex items-center justify-center rounded-lg border border-border text-silver hover:border-amber/50 hover:text-amber transition-all duration-200"
            >
              {lang === 'en' ? 'CV' : 'CV'}
            </a>
            <a
              href="https://linkedin.com/in/kenza-en-nassef"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 font-mono text-xs tracking-widest py-2.5 flex items-center justify-center gap-2 rounded-lg border border-border text-silver hover:border-amber/50 hover:text-amber transition-all duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 6.5V11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M8 11.5V8.5c0-1.1.9-2 2-2s2 .9 2 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="5" cy="4.5" r="0.75" fill="currentColor"/>
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="flex gap-2 mt-1">
            <a
              href="mailto:kenzaennassef@outlook.fr"
              className="btn-primary text-xs flex-1 justify-center"
            >
              {t.cta}
            </a>
            <a
              href="tel:+33659301931"
              title="+33 6 59 30 19 31"
              className="w-10 flex items-center justify-center rounded-lg border border-border text-silver hover:border-amber/50 hover:text-amber transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 3.5C2 2.67 2.67 2 3.5 2h1.586a1 1 0 0 1 .894.553l1 2A1 1 0 0 1 6.83 5.8L5.91 6.72a8.01 8.01 0 0 0 3.37 3.37l.92-.92a1 1 0 0 1 1.246-.15l2 1a1 1 0 0 1 .554.895V12.5A1.5 1.5 0 0 1 12.5 14C6.701 14 2 9.299 2 3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
