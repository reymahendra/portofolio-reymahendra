import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'

export function useTilt(strength = 7) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [strength, -strength]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-strength, strength]), { stiffness: 300, damping: 30 })

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return {
    style: { rotateX, rotateY, transformStyle: 'preserve-3d' as const, transformPerspective: 1000 },
    onMouseMove,
    onMouseLeave,
  }
}
