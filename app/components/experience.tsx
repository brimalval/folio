'use client'

import { motion } from 'motion/react'
import experience from '@/data/experience.json'
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '@/lib/animations/variants'
import type { Experience } from '@/types/portfolio'

export default function ExperienceSection() {
  const typedExperience = experience as Experience[]

  return (
    <section
      data-testid="experience-section"
      id="experience"
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
          Experience
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--iris), transparent)' }}
          />

          <div className="space-y-10 pl-8">
            {typedExperience.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                data-testid={`experience-item-${index}`}
                className="relative"
                variants={staggerItem}
              >
                <div
                  className="absolute -left-8 top-2 w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: 'var(--iris)',
                    boxShadow: '0 0 0 4px var(--surface), 0 0 0 6px var(--iris)',
                  }}
                />

                <div
                  className="p-6 rounded-xl transition-all duration-300 card-hover"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--subtle)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="text-xl md:text-2xl font-semibold"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {item.position}
                      </h3>
                      <p
                        className="text-base md:text-lg"
                        style={{ color: 'var(--iris)' }}
                      >
                        {item.company}
                      </p>
                    </div>
                    <div className="sm:text-right flex-shrink-0">
                      <p
                        className="text-sm md:text-base"
                        style={{ color: 'var(--muted)' }}
                      >
                        {item.startDate} — {item.endDate || 'Present'}
                      </p>
                      {item.location && (
                        <p
                          className="text-sm"
                          style={{ color: 'var(--subtle)' }}
                        >
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: 'var(--subtle)' }}
                  >
                    {item.description}
                  </p>

                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded"
                          style={{
                            backgroundColor: 'var(--overlay)',
                            color: 'var(--muted)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
