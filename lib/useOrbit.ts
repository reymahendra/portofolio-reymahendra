'use client'

import { useEffect, useRef, type RefObject } from 'react'

export type OrbitBase = {
  /** Base angle in degrees. */
  a: number
  /** Small vertical offset in px. */
  y?: number
}

type Options = {
  bases: OrbitBase[]
  /** Degrees of spin per horizontal px dragged. */
  dragFactor?: number
  /** Degrees added per frame (at 60fps) while idle. */
  drift?: number
  /** Velocity multiplier per frame (at 60fps). */
  decay?: number
  /** Horizontal radius as a fraction of the figure width. */
  rxFactor?: number
  /** Vertical radius cap, in px. */
  ryMax?: number
  /** Vertical radius as a fraction of rx. */
  ryFactor?: number
  /** Where the head sits inside the figure, as a fraction of its height. */
  headRatio?: number
  /** Max degrees a card turns away from the viewer at the sides of the ring. */
  turn?: number
}

/**
 * Elliptical carousel around a centred figure.
 *
 * Math (recomputed every frame):
 *   t = ang + base            s = sin t, k = cos t, u = (k + 1) / 2
 *   rx = min(figureWidth * rxFactor, frameWidth / 2 - cardWidth / 2 - 8)
 *   ry = min(ryMax, rx * ryFactor)
 *   x = rx * s,  y = ringCenterY + k * ry + offsetY
 *   transform = perspective(1100px) translate3d(x, y, 0) translate(-50%, -50%)
 *               rotateY(-s * 36deg) scale(0.72 + 0.28u)
 *   opacity   = 0.4 + 0.6u
 *   z-index   = k > 0 ? 10 + round(k * 10) : 1   (front above the figure, back below)
 *
 * The figure must sit at z-index 2 for the depth trick to read.
 */
export function useOrbit(
  frameRef: RefObject<HTMLElement | null>,
  figureRef: RefObject<HTMLElement | null>,
  nodeRefs: RefObject<(HTMLElement | null)[]>,
  {
    bases,
    dragFactor = 0.4,
    drift = 0.04,
    decay = 0.94,
    rxFactor = 0.45,
    ryMax = 90,
    ryFactor = 0.32,
    headRatio = 0.43,
    turn = 50,
  }: Options
) {
  const resetRef = useRef<() => void>(() => {})

  useEffect(() => {
    const frameEl = frameRef.current
    if (!frameEl) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const nodes = () => (nodeRefs.current ?? []).filter(Boolean) as HTMLElement[]

    let ang = 0
    let velocity = 0
    let dragging = false
    let lastX = 0
    let raf = 0
    let lastTime = 0
    let inView = true
    let tabVisible = !document.hidden

    let frameWidth = 0
    let figureWidth = 0
    let cardWidth = 0
    let ringCenterY = 0

    const measure = () => {
      const frame = frameEl.getBoundingClientRect()
      const figure = figureRef.current?.getBoundingClientRect()
      frameWidth = frame.width
      figureWidth = figure?.width ?? 0
      cardWidth = nodes()[0]?.offsetWidth ?? 0
      ringCenterY = figure ? figure.top - frame.top + figure.height * headRatio : frame.height * 0.5
    }

    const draw = () => {
      const list = nodes()
      // Clamp so no card can leave the frame.
      const rx = Math.min(figureWidth * rxFactor, frameWidth / 2 - cardWidth / 2 - 8)
      const ry = Math.min(ryMax, rx * ryFactor)

      for (let i = 0; i < list.length; i++) {
        const el = list[i]
        const base = bases[i] ?? { a: 0, y: 0 }
        const t = ((ang + base.a) * Math.PI) / 180
        const s = Math.sin(t)
        const k = Math.cos(t)
        const u = (k + 1) / 2

        const x = rx * s
        const y = ringCenterY + k * ry + (base.y ?? 0)
        const scale = 0.72 + 0.28 * u

        el.style.transform =
          `perspective(1100px) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) ` +
          `translate(-50%, -50%) rotateY(${(-s * turn).toFixed(2)}deg) scale(${scale.toFixed(4)})`
        el.style.opacity = (0.4 + 0.6 * u).toFixed(3)
        // Front half rides above the figure (z-index 2); back half is hidden behind it.
        el.style.zIndex = k > 0 ? String(10 + Math.round(k * 10)) : '1'
      }
    }

    const tick = (now: number) => {
      // Normalise to 60fps steps so drift/inertia feel identical on any refresh rate.
      const step = lastTime ? Math.min((now - lastTime) / (1000 / 60), 3) : 0
      lastTime = now

      if (!dragging) {
        ang += velocity * step + (reduceMotion ? 0 : drift * step)
        velocity *= Math.pow(decay, step)
      }

      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (raf) return
      lastTime = 0
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    const sync = () => {
      if (inView && tabVisible) start()
      else stop()
    }

    /* ── Drag: cards are never free-dragged, they only travel the orbit ── */
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest('[data-orbit-interactive]')) return

      // A drag must never become a text selection. Touch is left alone so the
      // vertical page scroll keeps working (touch-action: pan-y handles it).
      if (e.pointerType !== 'touch') {
        e.preventDefault()
        window.getSelection?.()?.removeAllRanges()
      }
      dragging = true
      velocity = 0
      lastX = e.clientX
      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)
      frameEl.classList.add('cursor-grabbing')
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const delta = (e.clientX - lastX) * dragFactor
      lastX = e.clientX
      ang += delta
      velocity = delta
    }

    const onPointerUp = () => {
      dragging = false
      frameEl.classList.remove('cursor-grabbing')
    }

    const bound: HTMLElement[] = []
    const bind = (el: HTMLElement) => {
      el.addEventListener('pointerdown', onPointerDown)
      el.addEventListener('pointermove', onPointerMove)
      el.addEventListener('pointerup', onPointerUp)
      el.addEventListener('pointercancel', onPointerUp)
      bound.push(el)
    }

    /* ── Keyboard ── */
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowLeft') velocity -= 4
      if (e.key === 'ArrowRight') velocity += 4
    }

    const onVisibility = () => {
      tabVisible = !document.hidden
      sync()
    }

    const onResize = () => {
      measure()
      draw()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0.05 }
    )
    observer.observe(frameEl)

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(frameEl)

    window.addEventListener('resize', onResize)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('visibilitychange', onVisibility)

    measure()
    bind(frameEl)
    nodes().forEach(bind)
    if (figureRef.current) bind(figureRef.current)
    draw()
    sync()

    if (document.fonts?.ready) document.fonts.ready.then(onResize)

    resetRef.current = () => {
      measure()
      draw()
    }

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      bound.forEach((el) => {
        el.removeEventListener('pointerdown', onPointerDown)
        el.removeEventListener('pointermove', onPointerMove)
        el.removeEventListener('pointerup', onPointerUp)
        el.removeEventListener('pointercancel', onPointerUp)
      })
      resetRef.current = () => {}
    }
  }, [frameRef, figureRef, nodeRefs, bases, dragFactor, drift, decay, rxFactor, ryMax, ryFactor, headRatio, turn])

  return { refresh: () => resetRef.current() }
}
