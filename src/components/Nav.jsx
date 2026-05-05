import { useState, useEffect } from 'react'

const links = [
  { label: 'snapshot',  href: '#snapshot' },
  { label: 'playbook',  href: '#playbook' },
  { label: 'missions',  href: '#missions' },
  { label: 'toolkit',   href: '#toolkit'  },
  { label: 'contact',   href: '#contact'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = links.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(sections[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-surface/95 border-b border-border backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-6">
        {/* logo */}
        <a href="#top" className="font-mono text-sm text-accent shrink-0">
          k.en-nassef_<span className="blink">▋</span>
        </a>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {links.map((l) => {
            const isActive = active === l.href.replace('#', '')
            return (
              <a
                key={l.href}
                href={l.href}
                className={`font-mono text-xs transition-colors duration-150 ${
                  isActive ? 'text-accent' : 'text-text-dim hover:text-text'
                }`}
              >
                {isActive && <span className="text-accent mr-1">›</span>}
                {l.label}
              </a>
            )
          })}
        </div>

        {/* mobile toggle */}
        <div className="md:hidden ml-auto">
          <button
            className="font-mono text-xs text-text-dim hover:text-accent transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            [ {menuOpen ? 'close' : 'menu'} ]
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block font-mono text-xs text-text-dim hover:text-accent py-2 border-b border-border/50 last:border-0"
            >
              › {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
