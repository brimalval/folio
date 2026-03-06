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
} from 'lucide-react';

type LucideIcon = typeof Code2;

export const skillIconMap: Record<string, LucideIcon> = {
  JavaScript: FileCode2,
  TypeScript: FileCode2,
  React: Atom,
  NextJS: Atom,
  'Tailwind CSS': Palette,
  ShadCN: Layout,
  'Tanstack Query': Zap,

  Python: Terminal,
  Flask: Code,
  FastAPI: Code,
  'Hono.js': Zap,

  PostgreSQL: Database,
  Prisma: Database,
  SQLAlchemy: Database,

  AWS: Cloud,
  SST: Cloud,
  CloudFormation: Cloud,

  Git: GitBranch,
  Neovim: Terminal,
  'Opencode/Claude Code': Code,
  Zod: Shield,
};

export const fallbackIcon = Code2;

export const getSkillIcon = (skillName: string): LucideIcon => {
  return skillIconMap[skillName] || fallbackIcon;
};
