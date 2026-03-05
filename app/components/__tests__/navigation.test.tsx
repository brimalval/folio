import React from 'react'
import { render, screen } from '@/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '../navigation'

vi.mock('../theme-toggle', () => ({
  default: () => <button aria-label="Toggle theme" />,
}))

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

describe('Navigation', () => {
  it('renders nav element', () => {
    render(<Navigation />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders "About" nav item', () => {
    render(<Navigation />)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  })

  it('does NOT render "Education" nav item', () => {
    render(<Navigation />)
    expect(screen.queryByText('Education')).not.toBeInTheDocument()
  })

  it('renders hamburger button', () => {
    render(<Navigation />)
    expect(screen.getByTestId('hamburger-button')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Navigation />)
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
  })
})
