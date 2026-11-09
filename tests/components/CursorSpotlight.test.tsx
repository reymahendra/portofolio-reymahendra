import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CursorSpotlight from '@/components/CursorSpotlight'

vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})))

describe('CursorSpotlight', () => {
  it('renders the cursor spotlight element', () => {
    const { container } = render(<CursorSpotlight />)
    const spotlight = container.firstChild as HTMLElement
    expect(spotlight).toBeInTheDocument()
  })

  it('has aria-hidden for accessibility', () => {
    const { container } = render(<CursorSpotlight />)
    const spotlight = container.firstChild as HTMLElement
    expect(spotlight.getAttribute('aria-hidden')).toBe('true')
  })

  it('is pointer-events-none', () => {
    const { container } = render(<CursorSpotlight />)
    const spotlight = container.firstChild as HTMLElement
    expect(spotlight.className).toContain('pointer-events-none')
  })

  it('has fixed positioning', () => {
    const { container } = render(<CursorSpotlight />)
    const spotlight = container.firstChild as HTMLElement
    expect(spotlight.className).toContain('fixed')
  })

  it('has radial gradient background', () => {
    const { container } = render(<CursorSpotlight />)
    const spotlight = container.firstChild as HTMLElement
    // The gradient now lives in a theme-aware utility class (light + dark variants).
    expect(spotlight.className).toContain('radial-gradient')
    expect(spotlight.className).toContain('dark:bg-[radial-gradient')
  })
})
