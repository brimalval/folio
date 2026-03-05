'use client'

import { motion } from 'motion/react'
import skills from '@/data/skills.json'
import { skillsVariants, viewportConfig } from '@/lib/animations/variants'
import type { Skill } from '@/types/portfolio'
import { getSkillIcon } from '@/lib/icon-mapping'

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tool: 'Tools',
}

const categoryOrder = ['frontend', 'backend', 'database', 'devops', 'tool']

const categoryAccents: Record<string, string> = {
  frontend: 'var(--foam)',
  backend: 'var(--pine)',
  database: 'var(--gold)',
  devops: 'var(--rose)',
  tool: 'var(--iris)',
}

export default function Skills() {
  const typedSkills = skills as Skill[]

  const groupedSkills = typedSkills.reduce((acc, skill) => {
    const category = skill.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const sortedCategories = categoryOrder.filter(cat => groupedSkills[cat])

  return (
    <section
      data-testid="skills-section"
      id="skills"
      className="section-skills px-6 py-20 md:py-28"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={skillsVariants.container}
      >
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 text-center"
          style={{ color: 'var(--foreground)' }}
          variants={skillsVariants.heading}
        >
          Toolkit
        </motion.h2>

        <div className="grid gap-10 md:gap-12">
          {sortedCategories.map((category) => {
            const accent = categoryAccents[category] ?? 'var(--iris)'
            return (
              <motion.div
                key={category}
                data-testid={`skill-category-${category}`}
                variants={skillsVariants.category}
              >
                <h3
                  className="text-xs uppercase tracking-widest font-semibold mb-4"
                  style={{ color: accent }}
                >
                  {categoryLabels[category] || category}
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {groupedSkills[category].map((skill) => {
                    const Icon = getSkillIcon(skill.name)
                    return (
                      <motion.div
                        key={skill.name}
                        data-testid={`skill-tag-${skill.name}`}
                        className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg"
                        style={{ backgroundColor: 'var(--surface)' }}
                        variants={skillsVariants.item}
                      >
                        <Icon
                          className="w-6 h-6 flex-shrink-0"
                          style={{ color: accent }}
                        />
                        <span
                          className="text-xs text-center"
                          style={{ color: 'var(--subtle)' }}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
