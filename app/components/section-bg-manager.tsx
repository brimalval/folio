'use client'

import { useActiveSection } from '@/lib/hooks/use-active-section'

const ALL_SECTIONS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'] as const

export default function SectionBgManager() {
  useActiveSection(ALL_SECTIONS)
  return null
}
