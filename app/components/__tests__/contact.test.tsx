import { render, screen } from '@/lib/test-utils'
import { describe, it, expect } from 'vitest'
import Contact from '../contact'

describe('Contact', () => {
  describe('Content Rendering', () => {
    it('renders the section heading', () => {
      render(<Contact />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Get in Touch')
    })

    it('renders the description text', () => {
      render(<Contact />)
      expect(screen.getByText(/Feel free to reach out/i)).toBeInTheDocument()
    })

    it('has a contact section container with proper test id', () => {
      render(<Contact />)
      expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    })
  })

  describe('Email Link', () => {
    it('renders the email link with mailto: protocol', () => {
      render(<Contact />)
      const emailLink = screen.getByTestId('email-link')
      expect(emailLink).toBeInTheDocument()
      expect(emailLink.getAttribute('href')).toBe('mailto:brianmalcolm.v@gmail.com')
    })

    it('renders the email address in the link text', () => {
      render(<Contact />)
      expect(screen.getByText('brianmalcolm.v@gmail.com')).toBeInTheDocument()
    })

    it('has email icon', () => {
      render(<Contact />)
      const emailLink = screen.getByTestId('email-link')
      expect(emailLink.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Social Links', () => {
    it('renders GitHub link', () => {
      render(<Contact />)
      const githubLink = screen.getByTestId('social-link-github')
      expect(githubLink).toBeInTheDocument()
      expect(githubLink.getAttribute('href')).toBe('https://github.com/brimalval')
      expect(githubLink.getAttribute('target')).toBe('_blank')
      expect(githubLink.getAttribute('rel')).toBe('noopener noreferrer')
      expect(githubLink).toHaveAttribute('aria-label', 'GitHub')
    })

    it('renders LinkedIn link', () => {
      render(<Contact />)
      const linkedinLink = screen.getByTestId('social-link-linkedin')
      expect(linkedinLink).toBeInTheDocument()
      expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/brian-malcolm-valencia-032752220')
      expect(linkedinLink.getAttribute('target')).toBe('_blank')
      expect(linkedinLink.getAttribute('rel')).toBe('noopener noreferrer')
      expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn')
    })

    it('has SVG icons for social links', () => {
      render(<Contact />)
      const githubLink = screen.getByTestId('social-link-github')
      const linkedinLink = screen.getByTestId('social-link-linkedin')
      expect(githubLink.querySelector('svg')).toBeInTheDocument()
      expect(linkedinLink.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Resume Link', () => {
    it('does not render resume link when resumeUrl is placeholder "/"', () => {
      render(<Contact />)
      const resumeLink = screen.queryByTestId('resume-link')
      expect(resumeLink).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy (h2 for section)', () => {
      render(<Contact />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Get in Touch')
    })

    it('has visible focus states for interactive elements', () => {
      render(<Contact />)
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link.className).toMatch(/focus|ring|outline/)
      })
    })

    it('has proper aria labels for social links', () => {
      render(<Contact />)
      expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    })
  })

  describe('Visual Attributes', () => {
    it('has proper section styling with padding', () => {
      render(<Contact />)
      const contactSection = screen.getByTestId('contact-section')
      expect(contactSection.className).toMatch(/px-|py-|p-/)
    })

    it('has centered content layout', () => {
      render(<Contact />)
      const contactSection = screen.getByTestId('contact-section')
      expect(contactSection.className).toMatch(/justify-center|items-center|text-center/)
    })
  })

  describe('Japanese Ma Principle (Generous Spacing)', () => {
    it('applies generous spacing to contact section', () => {
      render(<Contact />)
      const contactSection = screen.getByTestId('contact-section')
      // Should have padding/margin classes indicating generous spacing
      expect(contactSection.className).toMatch(/py-|px-|gap-/)
    })
  })
})
