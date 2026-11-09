import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import HeroOrbit from '@/components/HeroOrbit'

// jsdom lacks matchMedia and both observers; the orbit only uses them for
// motion preferences, visibility and resize.
beforeEach(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }))
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
})

const cards = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>('.will-change-transform'))

describe('HeroOrbit', () => {
  it('renders the figure as decorative (behind the cards)', () => {
    const { container } = render(<HeroOrbit />)
    const img = container.querySelector('img[src*="rey"]')
    expect(img).toBeInTheDocument()
    expect(img?.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('renders eight orbiting cards', () => {
    const { container } = render(<HeroOrbit />)
    expect(cards(container)).toHaveLength(8)
  })

  it('lays the cards out only through a computed transform', async () => {
    const { container } = render(<HeroOrbit />)
    await waitFor(() => {
      expect(
        cards(container).every((c) => c.style.transform.includes('perspective(1100px)'))
      ).toBe(true)
    })
    // Cards are never free-positioned: left/top stay static.
    cards(container).forEach((c) => {
      expect(c.className).toContain('left-1/2')
      expect(c.className).toContain('top-0')
    })
  })

  it('puts front cards above the figure and back cards below it', async () => {
    const { container } = render(<HeroOrbit />)
    const zIndexes = () =>
      cards(container).map((c) => Number(c.style.zIndex || 0))

    await waitFor(() => {
      expect(zIndexes().some((z) => z >= 10)).toBe(true)
    })
    // Figure sits at z-2; the back half is forced to z-1 so the head hides it.
    expect(zIndexes().some((z) => z === 1)).toBe(true)
  })

  it('exposes a labelled group for the ring', () => {
    render(<HeroOrbit />)
    expect(screen.getByRole('group', { name: /orbiting the portrait/i })).toBeInTheDocument()
  })
})
