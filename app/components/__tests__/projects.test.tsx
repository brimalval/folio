import React from 'react'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { within } from '@testing-library/react'
import Projects from '../projects'

vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
      get: (_target, prop) => {
        const MotionTag = String(prop) as keyof React.JSX.IntrinsicElements
        return function MotionComponent({
          children, initial, animate, exit, variants, whileInView, viewport,
          transition, whileHover, whileTap, layout, layoutId, ...rest
        }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode; initial?: unknown; animate?: unknown; exit?: unknown; variants?: unknown; whileInView?: unknown; viewport?: unknown; transition?: unknown; whileHover?: unknown; whileTap?: unknown; layout?: unknown; layoutId?: unknown }) {
        void initial; void animate; void exit; void variants; void whileInView
        void viewport; void transition; void whileHover; void whileTap
        void layout; void layoutId
        return React.createElement(MotionTag, rest, children)
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
    expect(screen.getByTestId('project-card-3')).toBeInTheDocument()
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

  it('renders GitHub link for bunpro card', () => {
    render(<Projects />)
    const bunproCard = screen.getByTestId('project-card-3')
    const githubLink = within(bunproCard).getByRole('link', { name: /view on github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brimalval/bunpro-mcp')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(githubLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
  })

  it('clicking GitHub link does NOT open modal', () => {
    render(<Projects />)
    const bunproCard = screen.getByTestId('project-card-3')
    const githubLink = within(bunproCard).getByRole('link', { name: /view on github/i })
    expect(screen.queryByTestId('project-detail')).not.toBeInTheDocument()
    fireEvent.click(githubLink)
    expect(screen.queryByTestId('project-detail')).not.toBeInTheDocument()
  })
})
