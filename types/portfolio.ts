export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatar: string;
  fullPhoto?: string;
  resumeUrl?: string;
  website?: string;
  phone?: string;
}

export interface Social {
  platform: 'github' | 'linkedin' | 'twitter' | 'website' | 'email' | 'youtube' | 'instagram';
  url: string;
  username?: string;
  displayName?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  location?: string;
  companySize?: string;
  technologies?: string[];
}

export interface ProjectFrontmatter {
  id: string;
  title: string;
  description: string;
  summary?: string;
  featured: boolean;
  tags: string[];
  technologies: string[];
  role: string;
  liveUrl?: string;
  thumbnail: string;
  images?: string[];
  videos?: string[];
  metrics?: string;
  challenges?: string[];
  learnings?: string[];
}

export interface Skill {
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'language' | 'tool' | 'other';
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certifications?: string[];
}

// Project data for homepage
export interface ProjectSummary {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

// Skills data for homepage
export interface SkillCategory {
  category: string;
  skills: string[];
}

// Experience data for about page
export interface ExperienceAbout {
  company: string;
  position: string;
  period: string;
  description: string;
  overview: {
    scale: string;
    marketLeadership: string;
    brandPortfolio: string;
    businessModel: string;
  };
  responsibilities: string[];
}

// Enhanced project data for projects page
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  highlights: string[];
  technologies: string[];
}