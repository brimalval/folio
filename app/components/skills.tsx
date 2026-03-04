'use client'

import { motion } from 'motion/react'
import skills from '@/data/skills.json'
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, getStaggerDelay } from '@/lib/animations/variants'
import type { Skill } from '@/types/portfolio'
import { getSkillIcon } from '@/lib/icon-mapping'
import {
  FileCode2,
  Atom,
  Terminal,
  Database,
  Cloud,
  GitBranch,
  Palette,
  Layout,
  Zap,
  Shield,
  Code,
  Code2,
} from 'lucide-react'

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tool: 'Tools',
}

const categoryOrder = ['frontend', 'backend', 'database', 'devops', 'tool']

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
          Skills & Technologies
        </motion.h2>

        <div className="grid gap-10 md:gap-12">
          {sortedCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              data-testid={`skill-category-${category}`}
              variants={staggerItem}
              custom={categoryIndex}
            >
              <h3
                className="text-lg md:text-xl font-semibold mb-6"
                style={{ color: 'var(--iris)' }}
              >
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {groupedSkills[category].map((skill, skillIndex) => {
                  const Icon = getSkillIcon(skill.name)
                  return (
                    <motion.span
                      key={skill.name}
                      data-testid={`skill-tag-${skill.name}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: 'var(--surface)',
                        color: 'var(--foreground)',
                        border: '1px solid var(--subtle)',
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: getStaggerDelay(categoryIndex * 3 + skillIndex, 0.05),
                        duration: 0.4,
                      }}
                      whileHover={{ borderColor: 'var(--iris)' }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {skill.name}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
