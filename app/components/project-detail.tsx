'use client'

import { motion } from 'motion/react'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Project } from '@/types/portfolio'

interface ProjectDetailProps {
  selectedId: string
  projects: Project[]
  accentColors: string[]
  onClose: () => void
}

export default function ProjectDetail({
  selectedId,
  projects,
  accentColors,
  onClose,
}: ProjectDetailProps) {
  const project = projects.find((p) => p.id === selectedId)
  const projectIndex = projects.findIndex((p) => p.id === selectedId)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!project) return null

  const accent = accentColors[projectIndex] ?? 'var(--foam)'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      />

      <motion.div
        layoutId={`project-card-${project.id}`}
        data-testid="project-detail"
        className="fixed inset-x-4 top-8 bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl z-50 rounded-2xl overflow-y-auto"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid rgba(var(--border-rgb, 128,128,128), 0.2)',
        }}
      >
        <div
          className="sticky top-0 z-10 flex justify-end p-4"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors duration-150"
            style={{ backgroundColor: 'var(--overlay)', color: 'var(--muted)' }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 md:px-8 pb-10 -mt-2">
          <motion.h2
            layoutId={`project-title-${project.id}`}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {project.title}
          </motion.h2>

          {project.longDescription && (
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--subtle)' }}
            >
              {project.longDescription}
            </p>
          )}

          {(project.problem || project.solution) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {project.problem && (
                <div>
                  <div
                    className="text-xs uppercase tracking-widest font-semibold mb-2"
                    style={{ color: accent }}
                  >
                    Problem
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--subtle)' }}
                  >
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div>
                  <div
                    className="text-xs uppercase tracking-widest font-semibold mb-2"
                    style={{ color: accent }}
                  >
                    Solution
                  </div>
                  <p
                    className="text-sm leading-relaxed"
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
              <div
                className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: accent }}
              >
                Impact
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span
                      className="text-2xl font-bold tabular-nums"
                      style={{ color: accent }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="text-xs uppercase tracking-wider mt-1"
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
              <div
                className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: accent }}
              >
                Highlights
              </div>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: 'var(--subtle)' }}
                  >
                    <span style={{ color: accent }}>—</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8">
              <div
                className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: accent }}
              >
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="pl-2 pr-3 py-0.5 text-xs font-mono border-l-2 tracking-wide"
                    style={{
                      borderColor: accent,
                      backgroundColor: 'var(--overlay)',
                      color: 'var(--muted)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div>
              <div
                className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: accent }}
              >
                Gallery
              </div>
              <div className="space-y-4">
                {project.gallery.map((img) => (
                  <div key={img.id}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="rounded-lg w-full object-cover"
                      loading="lazy"
                    />
                    {img.title && (
                      <p
                        className="text-xs mt-2"
                        style={{ color: 'var(--muted)' }}
                      >
                        {img.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
