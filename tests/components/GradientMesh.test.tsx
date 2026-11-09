import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GradientMesh from '@/components/GradientMesh'

describe('GradientMesh', () => {
  it('renders the gradient mesh container', () => {
    const { container } = render(<GradientMesh />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.getAttribute('aria-hidden')).toBe('true')
  })

  it('has fixed positioning and negative z-index', () => {
    const { container } = render(<GradientMesh />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('fixed')
    expect(wrapper.className).toContain('-z-10')
  })

  it('renders three gradient blobs', () => {
    const { container } = render(<GradientMesh />)
    const blobs = container.querySelectorAll('.rounded-full')
    expect(blobs.length).toBe(3)
  })

  it('each blob has animation class', () => {
    const { container } = render(<GradientMesh />)
    const blobs = container.querySelectorAll('.rounded-full')
    blobs.forEach((blob) => {
      expect(blob.className).toMatch(/animate-mesh/)
    })
  })
})
