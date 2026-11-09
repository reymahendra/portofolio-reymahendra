import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Terminal from '@/components/Terminal'

describe('Terminal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders boot sequence', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByText(/Rey Portfolio OS/)).toBeInTheDocument()
  })

  it('shows help text after boot', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByText(/Type 'help' to see available commands/)).toBeInTheDocument()
  })

  it('renders terminal title bar', () => {
    render(<Terminal />)
    expect(screen.getByText(/rey@portfolio — terminal/)).toBeInTheDocument()
  })

  it('shows traffic light dots', () => {
    const { container } = render(<Terminal />)
    const redDot = container.querySelector('.bg-red-500\\/80')
    const yellowDot = container.querySelector('.bg-yellow-500\\/80')
    const greenDot = container.querySelector('.bg-green-500\\/80')
    expect(redDot).toBeInTheDocument()
    expect(yellowDot).toBeInTheDocument()
    expect(greenDot).toBeInTheDocument()
  })

  it('input appears after boot', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.getByLabelText('Terminal input')).toBeInTheDocument()
  })

  it('handles help command', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    const input = screen.getByLabelText('Terminal input')
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText(/Available commands/)).toBeInTheDocument()
  })

  it('handles unknown command', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    const input = screen.getByLabelText('Terminal input')
    fireEvent.change(input, { target: { value: 'foobar' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText(/command not found: foobar/)).toBeInTheDocument()
  })

  it('handles whoami command', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    const input = screen.getByLabelText('Terminal input')
    fireEvent.change(input, { target: { value: 'whoami' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText(/Rey Mahendra — Software Engineer/)).toBeInTheDocument()
  })

  it('handles skills command', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    const input = screen.getByLabelText('Terminal input')
    fireEvent.change(input, { target: { value: 'skills' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText(/Backend/)).toBeInTheDocument()
  })

  it('handles clear command', () => {
    render(<Terminal />)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    const input = screen.getByLabelText('Terminal input')
    fireEvent.change(input, { target: { value: 'clear' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.queryByText(/Rey Portfolio OS/)).not.toBeInTheDocument()
  })
})
