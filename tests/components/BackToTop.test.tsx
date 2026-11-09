import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import BackToTop from '@/components/BackToTop'

describe('BackToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
  })

  it('is not visible when scroll position is low', () => {
    render(<BackToTop />)
    expect(screen.queryByLabelText('Back to top')).not.toBeInTheDocument()
  })

  it('becomes visible when scrolled past 400px', async () => {
    render(<BackToTop />)
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument()
  })

  it('hides when scrolled back up', async () => {
    render(<BackToTop />)
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument()

    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(screen.queryByLabelText('Back to top')).not.toBeInTheDocument()
    })
  })

  it('has correct aria-label', async () => {
    render(<BackToTop />)
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    const button = screen.getByLabelText('Back to top')
    expect(button).toHaveAttribute('aria-label', 'Back to top')
  })
})
