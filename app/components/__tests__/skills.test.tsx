import React from 'react'
import { render, screen } from '@/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Skills from '../skills'

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

describe('Skills', () => {
  it('has data-testid="skills-section"', () => {
    render(<Skills />)
    expect(screen.getByTestId('skills-section')).toBeInTheDocument()
  })

  it('renders heading "Toolkit"', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Toolkit')
  })

  it('renders all 5 category sections', () => {
    render(<Skills />)
    expect(screen.getByTestId('skill-category-frontend')).toBeInTheDocument()
    expect(screen.getByTestId('skill-category-backend')).toBeInTheDocument()
    expect(screen.getByTestId('skill-category-database')).toBeInTheDocument()
    expect(screen.getByTestId('skill-category-devops')).toBeInTheDocument()
    expect(screen.getByTestId('skill-category-tool')).toBeInTheDocument()
  })

  it('renders skill tiles with data-testid', () => {
    render(<Skills />)
    expect(screen.getByTestId('skill-tag-React')).toBeInTheDocument()
    expect(screen.getByTestId('skill-tag-TypeScript')).toBeInTheDocument()
  })

  it('renders SVG icons inside skill tiles', () => {
    render(<Skills />)
    const reactTile = screen.getByTestId('skill-tag-React')
    expect(reactTile.querySelector('svg')).toBeInTheDocument()
  })

  it('heading is NOT "Skills & Technologies"', () => {
    render(<Skills />)
    expect(screen.queryByText('Skills & Technologies')).not.toBeInTheDocument()
  })
})
