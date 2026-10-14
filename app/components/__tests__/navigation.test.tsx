import React from 'react'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '../navigation'

vi.mock('../theme-toggle', () => ({
  default: () => <button aria-label="Toggle theme" />,
}))

vi.mock('motion/react', () => {
  // Cache per tag so each render returns the same component type (no remounts).
  const cache = new Map<string, unknown>()
  return {
  motion: new Proxy({}, {
    get: (_target, prop) => {
      const MotionTag = String(prop) as keyof React.JSX.IntrinsicElements
      if (cache.has(MotionTag)) return cache.get(MotionTag)
      const MotionComponent = function MotionComponent({
        children, initial, animate, exit, variants, whileInView, viewport,
        transition, whileHover, whileTap, layout, layoutId, ...rest
      }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode; initial?: unknown; animate?: unknown; exit?: unknown; variants?: unknown; whileInView?: unknown; viewport?: unknown; transition?: unknown; whileHover?: unknown; whileTap?: unknown; layout?: unknown; layoutId?: unknown }) {
        void initial; void animate; void exit; void variants; void whileInView
        void viewport; void transition; void whileHover; void whileTap
        void layout; void layoutId
        return React.createElement(MotionTag, rest, children)
      }
      cache.set(MotionTag, MotionComponent)
      return MotionComponent
    }
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  MotionConfig: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
  }
})

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

  it('gives the hamburger a 44px touch target', () => {
    render(<Navigation />)
    expect(screen.getByTestId('hamburger-button').className).toMatch(/\bh-11\b.*\bw-11\b/)
  })

  it('opens the mobile menu and moves focus to its first link', () => {
    render(<Navigation />)
    const toggle = screen.getByTestId('hamburger-button')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const menu = document.getElementById('mobile-menu')
    expect(menu).not.toBeNull()
    expect(document.activeElement).toBe(menu?.querySelector('a'))
  })

  it('closes the mobile menu on Escape and returns focus to the toggle', () => {
    render(<Navigation />)
    const toggle = screen.getByTestId('hamburger-button')
    fireEvent.click(toggle)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('mobile-menu')).toBeNull()
    expect(document.activeElement).toBe(toggle)
  })

  it('wraps Tab focus from the last menu link back to the toggle', () => {
    render(<Navigation />)
    const toggle = screen.getByTestId('hamburger-button')
    fireEvent.click(toggle)
    const links = document.getElementById('mobile-menu')!.querySelectorAll('a')
    const lastLink = links[links.length - 1] as HTMLElement
    lastLink.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(toggle)
  })

  it('exposes the mobile menu as a labelled modal dialog', () => {
    render(<Navigation />)
    fireEvent.click(screen.getByTestId('hamburger-button'))
    const menu = screen.getByRole('dialog', { name: 'Site menu' })
    expect(menu).toHaveAttribute('aria-modal', 'true')
    expect(menu.id).toBe('mobile-menu')
  })
})
