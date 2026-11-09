import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SectionHeading from '@/components/SectionHeading'

describe('SectionHeading', () => {
  it('renders the section number', () => {
    render(<SectionHeading number="01" title="About" />)
    expect(screen.getByText('01.')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<SectionHeading number="02" title="Experience" />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders with correct heading level', () => {
    render(<SectionHeading number="03" title="Skills" />)
    const heading = screen.getByText('Skills')
    expect(heading.tagName).toBe('H2')
  })

  it('applies correct styling classes', () => {
    render(<SectionHeading number="04" title="Projects" />)
    const number = screen.getByText('04.')
    expect(number.className).toContain('text-indigo-400')
    expect(number.className).toContain('font-mono')
  })
})
