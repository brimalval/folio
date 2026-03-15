import projects from '@/data/projects.json'
import { describe, it } from 'vitest'
import { z } from 'zod'
import type { Project } from '@/types/portfolio'

const nonEmptyString = z.string().min(1, { message: 'must be a non-empty string' })

const metricSchema = z
  .object({
    value: nonEmptyString,
    label: nonEmptyString,
  })
  .passthrough()

const gallerySchema = z
  .object({
    id: nonEmptyString,
    src: nonEmptyString,
    alt: nonEmptyString,
    title: nonEmptyString,
  })
  .passthrough()

const projectSchema = z.object({
  id: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
  longDescription: nonEmptyString,
  problem: nonEmptyString,
  solution: nonEmptyString,
  metrics: z.array(metricSchema),
  highlights: z.array(nonEmptyString),
  technologies: z.array(nonEmptyString),
  gallery: z.array(gallerySchema),
  featured: z.boolean().optional(),
  githubUrl: z.string().url().optional(),
})

const projectsWithTypedIds = projects as Project[]

describe('project data schema', () => {
  it('validates each project entry against the expected schema', () => {
    projectsWithTypedIds.forEach((project, index) => {
      try {
        projectSchema.parse(project)
      } catch (error) {
        if (error instanceof z.ZodError) {
          const issueMessages = error.issues.map((issue) => {
            const path = issue.path.length ? issue.path.join('.') : 'root'
            return `${path}: ${issue.message}`
          })
          const identifier = project.id ?? `index ${index}`
          throw new Error(
            `Project ${identifier} (index ${index}) failed schema validation: ${issueMessages.join(' | ')}`,
          )
        }
        throw error
      }
    })
  })
})
