import { useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'

export function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return { style: { x: springX, y: springY }, onMouseMove, onMouseLeave }
}
