'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import profile from '@/data/profile.json'
import ThemeToggle from './theme-toggle'
import GlassSurface from './glass-surface'
import { lockScroll, unlockScroll } from '@/lib/utils/scroll-lock-manager'
import { useLenis } from '@/lib/contexts/lenis-context'
import { useActiveSection } from '@/lib/hooks/use-active-section'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const navSectionIds = navItems.map((item) => item.id)

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 motion-reduce:transition-none"
      style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
    >
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lenis = useLenis()
  const activeSection = useActiveSection(navSectionIds).activeId ?? 'hero'
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${sectionId}`)
    }
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Move focus into the menu on open; hand it back to the toggle on close.
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true
      menuRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
      return
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false
      hamburgerRef.current?.focus()
    }
  }, [isOpen])

  // Escape closes; Tab cycles between the toggle and the menu links.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
        return
      }
      if (event.key !== 'Tab' || !menuRef.current || !hamburgerRef.current) return

      const focusables = [
        hamburgerRef.current,
        ...menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const current = document.activeElement

      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      } else if (!focusables.includes(current as HTMLElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    lockScroll(lenis)

    return () => {
      unlockScroll(lenis)
    }
  }, [isOpen, lenis])

  return (
    <>
      <motion.nav
        data-testid="navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 z-[60]"
      >
        <GlassSurface
          intensity={isScrolled ? 'strong' : 'medium'}
          frosted
          className={`
            mx-auto max-w-5xl rounded-2xl px-4 md:px-6 py-3
            transition-all duration-300
            ${isScrolled ? 'shadow-lg' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="inline-flex items-center min-h-11 px-1 -mx-1 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded bg-transparent border-none appearance-none"
            >
              {profile.name.split(' ')[0]}
            </button>

              <div className="flex items-center gap-2">
                <ul className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.id)
                        }}
                        className={`
                          relative px-3 py-2 text-sm font-medium
                          transition-colors duration-200 cursor-pointer
                          focus-visible:outline-none focus-visible:ring-2 
                          focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 
                          focus-visible:ring-offset-[var(--background)]
                          after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px 
                          after:transition-transform after:duration-200 after:origin-left
                          ${activeSection === item.id
                            ? 'text-[var(--foam)] after:bg-[var(--foam)] after:scale-x-100'
                            : 'text-[var(--subtle)] hover:text-[var(--foreground)] after:bg-[var(--foreground)] after:scale-x-0 hover:after:scale-x-100'
                          }
                        `}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/projects"
                      className={
                        'relative px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:transition-transform after:duration-200 after:origin-left text-[var(--subtle)] hover:text-[var(--foreground)] after:bg-[var(--foreground)] after:scale-x-0 hover:after:scale-x-100'
                      }
                    >
                      All Projects
                    </Link>
                  </li>
                </ul>

              <ThemeToggle />

                <button
                  ref={hamburgerRef}
                  type="button"
                  data-testid="hamburger-button"
                  onClick={() => setIsOpen((open) => !open)}
                  className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg hover:bg-[var(--surface)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  style={{ color: 'var(--foreground)' }}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                <HamburgerIcon isOpen={isOpen} />
              </button>
            </div>
          </div>
        </GlassSurface>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden"
            >
              <GlassSurface intensity="strong" className="h-full">
                <div className="flex flex-col h-full pt-20 pb-6 px-6">
                  <ul className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.id)
                          }}
                          className={`
                            block px-4 py-3 rounded-xl text-base font-medium
                            transition-all duration-200 cursor-pointer
                            focus-visible:outline-none focus-visible:ring-2 
                            focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 
                            focus-visible:ring-offset-[var(--background)]
                            ${activeSection === item.id 
                              ? 'bg-[var(--foam)]/15 text-[var(--foam)]' 
                              : 'text-[var(--subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]/60'
                            }
                          `}
                        >
                          {item.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    key="projects-route"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 + 0.1 }}
                  >
                    <Link
                      href="/projects"
                      className={
                        'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] text-[var(--subtle)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]/60'
                      }
                    >
                      All Projects
                    </Link>
                  </motion.li>
                </ul>
                </div>
              </GlassSurface>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
