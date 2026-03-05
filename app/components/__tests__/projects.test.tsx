import React from 'react'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Projects from '../projects'

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

describe('Projects', () => {
  it('has data-testid="projects-section"', () => {
    render(<Projects />)
    const sections = screen.getAllByTestId('projects-section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('renders heading "Selected Work"', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Selected Work')
  })

  it('renders 3 project cards', () => {
    render(<Projects />)
    expect(screen.getByTestId('project-card-0')).toBeInTheDocument()
    expect(screen.getByTestId('project-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('project-card-2')).toBeInTheDocument()
  })

  it('heading is NOT "Featured Work"', () => {
    render(<Projects />)
    expect(screen.queryByText('Featured Work')).not.toBeInTheDocument()
  })

  it('clicking project-card-0 shows project-detail', () => {
    render(<Projects />)
    expect(screen.queryByTestId('project-detail')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('project-card-0'))
    expect(screen.getByTestId('project-detail')).toBeInTheDocument()
  })

  it('project-detail has data-testid="project-detail" after click', () => {
    render(<Projects />)
    fireEvent.click(screen.getByTestId('project-card-0'))
    const detail = screen.getByTestId('project-detail')
    expect(detail).toBeInTheDocument()
  })
})
