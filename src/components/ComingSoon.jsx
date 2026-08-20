import { useEffect, useRef, useState } from 'react'

const CELL = 18
const COLS = 20
const ROWS = 16
const TICK = 130

const DIR = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0] }

function rnd(exclude = []) {
  while (true) {
    const x = Math.floor(Math.random() * COLS)
    const y = Math.floor(Math.random() * ROWS)
    if (!exclude.some(p => p[0] === x && p[1] === y)) return [x, y]
  }
}

export default function ComingSoon() {
  const canvasRef = useRef(null)
  const state = useRef({
    snake: [[10, 8], [9, 8], [8, 8]],
    dir: [1, 0],
    next: [1, 0],
    food: [15, 8],
    score: 0,
    alive: true,
    started: false,
  })
  const [score, setScore] = useState(0)
  const [dead, setDead] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const s = state.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid dots
      ctx.fillStyle = 'rgba(92,242,197,0.06)'
      for (let x = 0; x < COLS; x++)
        for (let y = 0; y < ROWS; y++)
          ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2)

      if (!s.started) return

      // Food
      const [fx, fy] = s.food
      ctx.fillStyle = '#f59e0b'
      ctx.beginPath()
      ctx.arc(fx * CELL + CELL / 2, fy * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2)
      ctx.fill()

      // Snake
      s.snake.forEach(([x, y], i) => {
        const alpha = 1 - (i / s.snake.length) * 0.5
        ctx.fillStyle = i === 0 ? '#5CF2C5' : `rgba(47,135,93,${alpha})`
        const pad = i === 0 ? 1 : 2
        ctx.beginPath()
        ctx.roundRect(x * CELL + pad, y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 3)
        ctx.fill()
      })
    }

    const tick = () => {
      const s = state.current
      if (!s.alive || !s.started) return
      s.dir = s.next
      const [hx, hy] = s.snake[0]
      const [dx, dy] = s.dir
      const nx = (hx + dx + COLS) % COLS
      const ny = (hy + dy + ROWS) % ROWS
      if (s.snake.some(([x, y]) => x === nx && y === ny)) {
        s.alive = false
        setDead(true)
        return
      }
      s.snake.unshift([nx, ny])
      if (nx === s.food[0] && ny === s.food[1]) {
        s.score++
        setScore(s.score)
        s.food = rnd(s.snake)
      } else {
        s.snake.pop()
      }
    }

    const onKey = (e) => {
      if (DIR[e.key]) {
        e.preventDefault()
        const s = state.current
        const [dx, dy] = DIR[e.key]
        if (dx !== -s.dir[0] || dy !== -s.dir[1]) s.next = [dx, dy]
        if (!s.started) {
          s.started = true
          setStarted(true)
        }
      }
    }

    window.addEventListener('keydown', onKey)
    const interval = setInterval(() => { tick(); draw() }, TICK)
    draw()

    return () => {
      window.removeEventListener('keydown', onKey)
      clearInterval(interval)
    }
  }, [])

  const reset = () => {
    state.current = {
      snake: [[10, 8], [9, 8], [8, 8]],
      dir: [1, 0], next: [1, 0],
      food: [15, 8],
      score: 0, alive: true, started: true,
    }
    setScore(0)
    setDead(false)
    setStarted(true)
  }

  // Mobile swipe
  const touch = useRef(null)
  const onTouchStart = (e) => { touch.current = [e.touches[0].clientX, e.touches[0].clientY] }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current[0]
    const dy = e.changedTouches[0].clientY - touch.current[1]
    const key = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? 'ArrowRight' : 'ArrowLeft')
      : (dy > 0 ? 'ArrowDown' : 'ArrowUp')
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
    touch.current = null
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-fade pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg">
        {/* Logo */}
        <div className="font-display font-semibold text-2xl text-text-bright tracking-tight">
          KNOUZ<span className="text-amber">.</span>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-amber/70">SOMETHING IS BREWING</span>
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-text-bright leading-tight">
            Coming soon.
          </h1>
          <p className="font-mono text-sm text-text-dim mt-1">
            In the meantime, play snake.
          </p>
        </div>

        {/* Game */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-mono text-[10px] tracking-widest text-text-dim">SNAKE</span>
            <span className="font-mono text-[10px] tracking-widest text-amber">{score} pts</span>
          </div>

          <div
            className="relative rounded-xl border border-border overflow-hidden bg-surface/60"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <canvas
              ref={canvasRef}
              width={COLS * CELL}
              height={ROWS * CELL}
              className="block w-full"
              style={{ imageRendering: 'pixelated' }}
            />

            {!started && !dead && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/70 backdrop-blur-sm">
                <p className="font-mono text-xs text-text-dim tracking-widest">PRESS ANY ARROW KEY</p>
                <p className="font-mono text-[10px] text-text-dim/50">or swipe on mobile</p>
              </div>
            )}

            {dead && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg/80 backdrop-blur-sm">
                <p className="font-mono text-xs text-text-bright tracking-widest">GAME OVER — {score} pts</p>
                <button
                  onClick={reset}
                  className="font-mono text-[10px] tracking-widest border border-border px-4 py-2 rounded text-silver hover:border-amber/40 hover:text-amber transition-all duration-200"
                >
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>

          {/* Mobile d-pad */}
          <div className="mt-4 flex flex-col items-center gap-1 md:hidden">
            {[['ArrowUp'], ['ArrowLeft','ArrowDown','ArrowRight']].map((row, ri) => (
              <div key={ri} className="flex gap-1">
                {row.map(k => (
                  <button
                    key={k}
                    onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: k }))}
                    className="w-10 h-10 rounded border border-border text-text-dim flex items-center justify-center text-xs hover:border-amber/40 hover:text-amber active:scale-95 transition-all select-none"
                  >
                    {k === 'ArrowUp' ? '↑' : k === 'ArrowDown' ? '↓' : k === 'ArrowLeft' ? '←' : '→'}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="font-mono text-[10px] text-text-dim/40 tracking-widest">
          kenzaennassef.com
        </p>
      </div>
    </div>
  )
}
