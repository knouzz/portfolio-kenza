/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ─── Base surfaces ────────────────────────────────────────────
        bg:             '#060d0e',              // main page background — near-black teal
        surface:        '#081112',              // slightly elevated surface
        panel:          '#0b1a1b',              // card / panel background
        navy:           '#0b1a1b',              // section background
        'navy-light':   '#0f2425',              // hover surface
        // ─── Borders ─────────────────────────────────────────────────
        border:         'rgba(92,242,197,0.12)',   // mint-tinted border
        'border-light': 'rgba(92,242,197,0.26)',   // hover border
        // ─── Typography ──────────────────────────────────────────────
        text:           '#9aa8bc',              // secondary text
        'text-bright':  '#ffffff',              // primary text — headings
        'text-dim':     '#6b8585',              // muted text — labels
        silver:         '#e8edf5',              // normal body text
        // ─── Accent GREEN — UI interactions ──────────────────────────
        amber:          '#2f875d',              // nav active, links, CTAs, hover
        'amber-light':  '#38a06e',              // hover state (lighter green)
        'amber-dark':   '#1d6640',              // deeper green
        // ─── KPI MINT — data & metrics only ──────────────────────────
        kpi:            '#5CF2C5',              // KPI numbers, %, rankings
        // ─── Supporting ──────────────────────────────────────────────
        'status-green': '#5CF2C5',
        'teal-accent':  '#2f875d',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':     'fadeIn 0.8s ease forwards',
        'slide-up':    'slideUp 0.6s ease forwards',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'scan':        'scan 10s linear infinite',
        'draw-line':   'drawLine 2s ease forwards',
        'blink':       'blink 1.2s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '0.7' },
        },
        scan: {
          '0%':   { top: '0%', opacity: '0.6' },
          '80%':  { opacity: '0.2' },
          '100%': { top: '100%', opacity: '0' },
        },
        drawLine: {
          '0%':   { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      backgroundImage: {
        // Visible mint grid lines for high-contrast gamey look
        'grid-dark': `
          linear-gradient(rgba(92,242,197,0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(92,242,197,0.055) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
