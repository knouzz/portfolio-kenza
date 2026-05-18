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
      // On mobile: hide when scrolling down, show when scrolling up
      if (window.innerWidth < 768) {
        setVisible(current < last || current < 60)
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
          <a
            href="mailto:kenzaennassef@outlook.fr"
            className="btn-primary text-xs mt-3 justify-center"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
