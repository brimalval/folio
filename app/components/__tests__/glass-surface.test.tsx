import { render, screen } from '@/lib/test-utils'
import { describe, it, expect } from 'vitest'
import GlassSurface from '../glass-surface'

describe('GlassSurface', () => {
  it('renders children', () => {
    render(<GlassSurface>test content</GlassSurface>)
    expect(screen.getByText('test content')).toBeInTheDocument()
  })

  it('accepts and applies className prop', () => {
    render(<GlassSurface className="custom-class">content</GlassSurface>)
    const wrapper = document.querySelector('[data-glass-surface]')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('renders with intensity="subtle"', () => {
    render(<GlassSurface intensity="subtle">content</GlassSurface>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with intensity="medium" (default)', () => {
    render(<GlassSurface>content</GlassSurface>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with intensity="strong"', () => {
    render(<GlassSurface intensity="strong">content</GlassSurface>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with frosted=true', () => {
    render(<GlassSurface frosted={true}>content</GlassSurface>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('has data-glass-surface attribute on wrapper div', () => {
    render(<GlassSurface>content</GlassSurface>)
    expect(document.querySelector('[data-glass-surface]')).toBeInTheDocument()
  })

  it('scopes intensity per instance instead of injecting a global style', () => {
    render(
      <>
        <GlassSurface intensity="strong">a</GlassSurface>
        <GlassSurface intensity="subtle">b</GlassSurface>
      </>
    )
    expect(document.querySelector('style')).toBeNull()
    const [strong, subtle] = document.querySelectorAll<HTMLElement>('[data-glass-surface]')
    expect(strong.style.getPropertyValue('--glass-bg-dark')).toContain('0.65')
    expect(subtle.style.getPropertyValue('--glass-bg-dark')).toContain('0.35')
  })

  it('marks frosted surfaces with data-glass-frosted', () => {
    render(<GlassSurface frosted>content</GlassSurface>)
    expect(document.querySelector('[data-glass-frosted]')).toBeInTheDocument()
  })
})
