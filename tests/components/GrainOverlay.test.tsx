import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GrainOverlay from '@/components/GrainOverlay'

describe('GrainOverlay', () => {
  it('renders the grain overlay container', () => {
    const { container } = render(<GrainOverlay />)
    const overlay = container.firstChild as HTMLElement
    expect(overlay).toBeInTheDocument()
    expect(overlay.getAttribute('aria-hidden')).toBe('true')
  })

  it('has fixed positioning', () => {
    const { container } = render(<GrainOverlay />)
    const overlay = container.firstChild as HTMLElement
    expect(overlay.className).toContain('fixed')
    expect(overlay.className).toContain('inset-0')
  })

  it('contains an SVG with grain filter', () => {
    const { container } = render(<GrainOverlay />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    const filter = container.querySelector('#grain')
    expect(filter).toBeInTheDocument()
  })

  it('is pointer-events-none', () => {
    const { container } = render(<GrainOverlay />)
    const overlay = container.firstChild as HTMLElement
    expect(overlay.className).toContain('pointer-events-none')
  })
})
