'use client'

import { motion } from 'motion/react'
import education from '@/data/education.json'
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '@/lib/animations/variants'
import type { Education } from '@/types/portfolio'

export default function Education() {
  const typedEducation = education as Education[]

  return (
    <section
      data-testid="education-section"
      id="education"
      className="px-6 py-24 md:py-32"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-16 text-center"
          style={{ color: 'var(--foreground)' }}
          variants={fadeInUp}
        >
          Education
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {typedEducation.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              data-testid={`education-card-${index}`}
              className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--subtle)',
              }}
              variants={staggerItem}
              whileHover={{ borderColor: 'var(--iris)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: 'var(--overlay)' }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--iris)' }}
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-1"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.degree}
                  </h3>
                  <p
                    className="text-base mb-2"
                    style={{ color: 'var(--iris)' }}
                  >
                    {item.institution}
                  </p>
                  {item.location && (
                    <p
                      className="text-sm flex items-center gap-1"
                      style={{ color: 'var(--subtle)' }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {item.location}
                    </p>
                  )}

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--subtle)' }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: 'var(--foam)' }}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
