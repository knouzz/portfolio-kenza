import { useState, useEffect } from 'react'

export function useCounter(end, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(end * eased))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, shouldStart])

  return count
}
