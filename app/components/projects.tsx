'use client'

import { motion } from 'motion/react'
import projects from '@/data/projects.json'
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '@/lib/animations/variants'
import type { Project } from '@/types/portfolio'

export default function Projects() {
  const typedProjects = projects as Project[]

  return (
    <section
      data-testid="projects-section"
      id="projects"
      className="min-h-screen px-6 py-20 md:py-28"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-center"
          style={{ color: 'var(--foreground)' }}
          variants={fadeInUp}
        >
          Featured Work
        </motion.h2>

        <div className="grid gap-6 md:gap-12">
          {typedProjects.slice(0, 3).map((project, index) => (
            <motion.article
              key={project.id}
              data-testid={`project-card-${index}`}
              tabIndex={0}
              className="group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--iris)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--subtle)',
              }}
              variants={staggerItem}
              whileHover={{ borderColor: 'var(--iris)' }}
              whileFocus={{ borderColor: 'var(--iris)' }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3
                    className="text-2xl md:text-3xl font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {project.title}
                  </h3>
                </div>

                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--subtle)' }}
                >
                  {project.description}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-6 mt-2">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex flex-col">
                        <span
                          className="text-xl md:text-2xl font-bold"
                          style={{ color: 'var(--iris)' }}
                        >
                          {metric.value}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--muted)' }}
                        >
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: 'var(--overlay)',
                        color: 'var(--subtle)',
                        border: '1px solid var(--subtle)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
