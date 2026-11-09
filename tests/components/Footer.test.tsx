import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
    expect(screen.getByText(/Rey Mahendra/)).toBeInTheDocument()
  })

  it('renders all social links', () => {
    render(<Footer />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('social links open in new tab', () => {
    render(<Footer />)
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('social links have correct hrefs', () => {
    render(<Footer />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/reymahendra')
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', 'mailto:reymahndra@gmail.com')
  })

  it('renders as a footer element', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })
})
