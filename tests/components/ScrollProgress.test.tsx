import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ScrollProgress from '@/components/ScrollProgress'

vi.mock('framer-motion', () => ({
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useSpring: (v: unknown) => v,
  motion: {
    div: ({ style, className, ...props }: React.ComponentProps<'div'>) => (
      <div style={style} className={className} {...props} />
    ),
  },
}))

describe('ScrollProgress', () => {
  it('renders the scroll progress bar', () => {
    const { container } = render(<ScrollProgress />)
    const bar = container.firstChild as HTMLElement
    expect(bar).toBeInTheDocument()
    expect(bar.className).toContain('fixed')
    expect(bar.className).toContain('top-0')
  })

  it('has gradient background', () => {
    const { container } = render(<ScrollProgress />)
    const bar = container.firstChild as HTMLElement
    expect(bar.className).toContain('bg-gradient-to-r')
    expect(bar.className).toContain('from-indigo-500')
  })

  it('has z-index above most content', () => {
    const { container } = render(<ScrollProgress />)
    const bar = container.firstChild as HTMLElement
    expect(bar.className).toContain('z-[60]')
  })
})
