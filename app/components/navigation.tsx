'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import profile from '@/data/profile.json'
import ThemeToggle from './theme-toggle'
import GlassSurface from './glass-surface'
import { lockScroll, unlockScroll } from '@/lib/utils/scroll-lock-manager'
import { useLenis } from '@/lib/contexts/lenis-context'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

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
      className="transition-transform duration-300"
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
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const lenis = useLenis()

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

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
        className="fixed top-4 left-4 right-4 z-50"
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
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
              className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
              style={{ color: 'var(--foreground)' }}
            >
              {profile.name.split(' ')[0]}
            </a>

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
              </ul>

              <ThemeToggle />

              <button
                data-testid="hamburger-button"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--surface)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foam)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                style={{ color: 'var(--foreground)' }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
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
            />
            <motion.div
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
