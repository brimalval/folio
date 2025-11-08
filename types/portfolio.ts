export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatar: string;
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