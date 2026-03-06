import React from 'react'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProjectDetail from '../project-detail'
import type { Project } from '@/types/portfolio'

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

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'Short description',
  longDescription: 'Long description with more detail about the project',
  problem: 'The problem statement',
  solution: 'The solution approach',
  metrics: [{ value: '99%', label: 'Uptime' }],
  highlights: ['Feature 1', 'Feature 2'],
  technologies: ['React', 'TypeScript', 'Node.js'],
  gallery: [],
}

const mockProjectWithGallery: Project = {
  ...mockProject,
  id: 'gallery-project',
  gallery: [
    { id: 'img1', src: 'https://example.com/img1.jpg', alt: 'Screenshot 1', title: 'Screenshot 1' },
    { id: 'img2', src: 'https://example.com/img2.jpg', alt: 'Screenshot 2', title: 'Screenshot 2' },
  ],
}

describe('ProjectDetail', () => {
  const defaultProps = {
    selectedId: 'test-project',
    projects: [mockProject],
    accentColors: ['var(--foam)'],
    onClose: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('has data-testid="project-detail"', () => {
    render(<ProjectDetail {...defaultProps} />)
    expect(screen.getByTestId('project-detail')).toBeInTheDocument()
  })

  it('renders project title in heading', () => {
    render(<ProjectDetail {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Project')
  })

  it('renders longDescription text', () => {
    render(<ProjectDetail {...defaultProps} />)
    expect(
      screen.getByText('Long description with more detail about the project')
    ).toBeInTheDocument()
  })

  it('renders technologies list', () => {
    render(<ProjectDetail {...defaultProps} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders close button with aria-label="Close"', () => {
    render(<ProjectDetail {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<ProjectDetail {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<ProjectDetail {...defaultProps} onClose={onClose} />)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders gallery images when project has gallery', () => {
    render(
      <ProjectDetail
        {...defaultProps}
        selectedId="gallery-project"
        projects={[mockProjectWithGallery]}
      />
    )
    expect(screen.getByAltText('Screenshot 1')).toBeInTheDocument()
    expect(screen.getByAltText('Screenshot 2')).toBeInTheDocument()
  })

  it('does NOT render gallery images when gallery is empty', () => {
    render(<ProjectDetail {...defaultProps} />)
    expect(document.querySelectorAll('img').length).toBe(0)
  })
})
