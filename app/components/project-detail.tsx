'use client'

import { motion } from 'motion/react'
import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import type { Project } from '@/types/portfolio'
import { useLenis } from '@/lib/contexts/lenis-context'
import { lockScroll, unlockScroll } from '@/lib/utils/scroll-lock-manager'

interface ProjectDetailProps {
  selectedId: string
  projects: Project[]
  accentColors: string[]
  onClose: () => void
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((el) => !el.closest('[inert]'))
}

// Keeps Tab / Shift+Tab cycling inside the dialog.
function trapFocus(e: KeyboardEvent, container: HTMLElement) {
  const focusable = getFocusable(container)
  const active = document.activeElement

  if (focusable.length === 0) {
    e.preventDefault()
    container.focus({ preventScroll: true })
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const outside = !(active instanceof Node) || !container.contains(active)

  if (e.shiftKey && (outside || active === first || active === container)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (outside || active === last)) {
    e.preventDefault()
    first.focus()
  }
}

export default function ProjectDetail({
  selectedId,
  projects,
  accentColors,
  onClose,
}: ProjectDetailProps) {
  const lenis = useLenis()
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const project = projects.find((p) => p.id === selectedId)
  const projectIndex = projects.findIndex((p) => p.id === selectedId)

  useEffect(() => {
    lockScroll(lenis)

    return () => {
      unlockScroll(lenis)
    }
  }, [lenis])

  // Move focus into the dialog on open; hand it back to the trigger on close.
  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    modalRef.current?.focus({ preventScroll: true })

    return () => {
      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const target = e.target
      const isEditableTarget =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      const modalElement = modalRef.current

      if (e.key === 'Tab') {
        if (modalElement) trapFocus(e, modalElement)
        return
      }

      const isScrollKey =
        e.key === 'PageDown' || e.key === ' ' || e.key === 'Spacebar'

      if (!isScrollKey || isEditableTarget) {
        return
      }

      const activeElement = document.activeElement
      const focusInsideModal =
        modalElement !== null &&
        activeElement instanceof Node &&
        modalElement.contains(activeElement)
      const targetInsideModal =
        modalElement !== null &&
        target instanceof Node &&
        modalElement.contains(target)

      if (focusInsideModal || targetInsideModal) {
        return
      }

      e.preventDefault()
    }
    window.addEventListener('keydown', fn, { passive: false })

    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!project) return null

  const accent =
    accentColors.length > 0
      ? accentColors[projectIndex % accentColors.length]
      : 'var(--foam)'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      />

      <motion.div
        ref={modalRef}
        layoutId={`project-card-${project.id}`}
        data-testid="project-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="fixed inset-x-4 top-8 bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl z-50 rounded-2xl overflow-y-auto overscroll-contain focus:outline-none"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid rgba(var(--border-rgb, 128,128,128), 0.2)',
        }}
      >
        <div
          className="sticky top-0 z-10 flex justify-end p-3"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-11 h-11 rounded-lg cursor-pointer transition-colors duration-150 text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)]"
            style={{ backgroundColor: 'var(--overlay)' }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 md:px-8 pb-10 -mt-2">
          <motion.h2
            id={titleId}
            layoutId={`project-title-${project.id}`}
            className="text-3xl md:text-4xl font-bold tracking-tight text-balance break-words mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {project.title}
          </motion.h2>

          {project.longDescription && (
            <p
              className="text-base leading-relaxed max-w-prose break-words mb-8"
              style={{ color: 'var(--subtle)' }}
            >
              {project.longDescription}
            </p>
          )}

          {(project.problem || project.solution) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {project.problem && (
                <div className="min-w-0">
                  <SectionLabel accent={accent} className="mb-2">
                    Problem
                  </SectionLabel>
                  <p
                    className="text-sm leading-relaxed break-words"
                    style={{ color: 'var(--subtle)' }}
                  >
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="min-w-0">
                  <SectionLabel accent={accent} className="mb-2">
                    Solution
                  </SectionLabel>
                  <p
                    className="text-sm leading-relaxed break-words"
                    style={{ color: 'var(--subtle)' }}
                  >
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-8">
              <SectionLabel accent={accent}>Impact</SectionLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col min-w-0">
                    <span
                      className="text-2xl font-bold tabular-nums break-words"
                      style={{ color: accent }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="text-xs uppercase tracking-wider mt-1 break-words"
                      style={{ color: 'var(--muted)' }}
                    >
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-8">
              <SectionLabel accent={accent}>Highlights</SectionLabel>
              <HighlightList highlights={project.highlights} accent={accent} />
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8">
              <SectionLabel accent={accent}>Technologies</SectionLabel>
              <TechChips
                technologies={project.technologies}
                accent={accent}
                background="var(--overlay)"
              />
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div>
              <SectionLabel accent={accent}>Gallery</SectionLabel>
              <div className="space-y-4">
                {project.gallery.map((img) => (
                  <figure key={img.id}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="rounded-lg w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {img.title && (
                      <figcaption
                        className="text-xs mt-2"
                        style={{ color: 'var(--muted)' }}
                      >
                        {img.title}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

function SectionLabel({
  accent,
  className = 'mb-4',
  children,
}: {
  accent: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`text-xs uppercase tracking-widest font-semibold ${className}`}
      style={{ color: accent }}
    >
      {children}
    </div>
  )
}

export function HighlightList({
  highlights,
  accent,
  className = 'space-y-2',
}: {
  highlights: string[]
  accent: string
  className?: string
}) {
  return (
    <ul className={className}>
      {highlights.map((highlight, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm"
          style={{ color: 'var(--subtle)' }}
        >
          <span aria-hidden="true" style={{ color: accent }}>
            —
          </span>
          <span className="min-w-0 break-words">{highlight}</span>
        </li>
      ))}
    </ul>
  )
}

interface TechChipsProps {
  technologies: string[]
  accent: string
  background?: string
  // Show at most this many chips, followed by a "+N" count for the rest.
  limit?: number
}

export function TechChips({
  technologies,
  accent,
  background = 'var(--surface)',
  limit,
}: TechChipsProps) {
  const visible = limit === undefined ? technologies : technologies.slice(0, limit)
  const hiddenCount = technologies.length - visible.length

  if (technologies.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {visible.map((tech) => (
        <li
          key={tech}
          className="pl-2 pr-3 py-0.5 text-xs font-mono border-l-2 tracking-wide max-w-full break-words"
          style={{
            borderColor: accent,
            backgroundColor: background,
            color: 'var(--muted)',
          }}
        >
          {tech}
        </li>
      ))}
      {hiddenCount > 0 && (
        <li
          className="text-xs font-mono"
          style={{ color: 'var(--muted)' }}
          aria-label={`and ${hiddenCount} more`}
        >
          +{hiddenCount}
        </li>
      )}
    </ul>
  )
}
