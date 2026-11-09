import { describe, it, expect, afterEach } from 'vitest'
import { imgSrc } from '@/lib/imgSrc'

describe('imgSrc', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH
  })

  it('returns path as-is when no base path is set', () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH
    expect(imgSrc('/images/photo.png')).toBe('/images/photo.png')
  })

  it('prepends base path when set', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/rey-portfolio'
    expect(imgSrc('/images/photo.png')).toBe('/rey-portfolio/images/photo.png')
  })

  it('handles empty string base path', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = ''
    expect(imgSrc('/images/photo.png')).toBe('/images/photo.png')
  })

  it('handles root path', () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH
    expect(imgSrc('/')).toBe('/')
  })
})
