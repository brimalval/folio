export interface ProjectSummary {
  id: string
  title: string
  description: string
  technologies: string[]
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  problem: string
  solution: string
  metrics: ProjectMetric[]
  highlights: string[]
  technologies: string[]
  gallery: GalleryImage[]
}

export interface Skill {
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'language' | 'tool' | 'other'
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  certifications?: string[]
}

export interface SkillDisplay {
  name: string
  icon: string
}

export interface SkillCategory {
  category: string
  skills: SkillDisplay[]
}

export interface Overview {
  scale: string
  marketLeadership: string
  brandPortfolio: string
  businessModel: string
}

export interface ExperienceAbout {
  company: string
  position: string
  period: string
  description: string
  overview: Overview
  responsibilities: string[]
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  location?: string
  companySize?: string
  technologies?: string[]
}

export interface Profile {
  name: string
  title: string
  bio: string
  location: string
  email: string
  avatar: string
  fullPhoto?: string
  resumeUrl?: string
  website?: string
  phone?: string
  github?: string
  linkedin?: string
}

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'website' | 'email' | 'youtube' | 'instagram'

export interface Social {
  platform: SocialPlatform
  url: string
  username?: string
  displayName?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate?: string
  endDate?: string
  description: string
  highlights?: string[]
}
