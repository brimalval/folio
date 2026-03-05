import React from 'react'
import { render, screen } from '@/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ExperienceSection from '../experience'

vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_target, prop) => {
      const MotionTag = String(prop) as keyof JSX.IntrinsicElements
      return function MotionComponent({
        children, initial, animate, exit, variants, whileInView, viewport,
        transition, whileHover, whileTap, layout, layoutId, ...rest
      }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode; initial?: unknown; animate?: unknown; exit?: unknown; variants?: unknown; whileInView?: unknown; viewport?: unknown; transition?: unknown; whileHover?: unknown; whileTap?: unknown; layout?: unknown; layoutId?: unknown }) {
        void initial; void animate; void exit; void variants; void whileInView
        void viewport; void transition; void whileHover; void whileTap
        void layout; void layoutId
        return <MotionTag {...rest}>{children}</MotionTag>
      }
    }
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}))

describe('ExperienceSection', () => {
  it('has data-testid="experience-section"', () => {
    render(<ExperienceSection />)
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
  })

  it('renders heading containing "Worked"', () => {
    render(<ExperienceSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Worked')
  })

  it('renders experience-item-0 through experience-item-3', () => {
    render(<ExperienceSection />)
    expect(screen.getByTestId('experience-item-0')).toBeInTheDocument()
    expect(screen.getByTestId('experience-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('experience-item-2')).toBeInTheDocument()
    expect(screen.getByTestId('experience-item-3')).toBeInTheDocument()
  })

  it('renders experience-item-4 (education entry)', () => {
    render(<ExperienceSection />)
    expect(screen.getByTestId('experience-item-4')).toBeInTheDocument()
  })

  it('renders education text (Magna Cum Laude)', () => {
    render(<ExperienceSection />)
    expect(screen.getByText(/Magna Cum Laude/i)).toBeInTheDocument()
  })

  it('renders company names (Focus Global Inc.)', () => {
    render(<ExperienceSection />)
    const companyElements = screen.getAllByText('Focus Global Inc.')
    expect(companyElements.length).toBeGreaterThan(0)
  })

  it('does NOT have a separate "Education" section heading', () => {
    render(<ExperienceSection />)
    expect(screen.queryByRole('heading', { name: /^education$/i })).not.toBeInTheDocument()
  })
})
