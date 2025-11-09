import { cache } from "react";
import experienceAboutData from "@/data/experience-about.json";

// Import data from JSON files
import projectSummariesData from "@/data/project-summaries.json";
import fullProjectsData from "@/data/projects.json";
import skillsHomepageData from "@/data/skills-homepage.json";
import type {
	ExperienceAbout,
	Project,
	ProjectSummary,
	SkillCategory,
} from "@/types/portfolio";

// Type assertions for imported JSON data
const projectSummaries: ProjectSummary[] =
	projectSummariesData as ProjectSummary[];
const skillsData: SkillCategory[] = skillsHomepageData as SkillCategory[];
const experienceData: ExperienceAbout = experienceAboutData as ExperienceAbout;
const projectsData: Project[] = fullProjectsData as Project[];

// React cache functions for stable caching
export const getProjectSummaries = cache(() => projectSummaries);
export const getSkillsForHomepage = cache(() => skillsData);
export const getExperienceForAbout = cache(() => experienceData);
export const getProjects = cache(() => projectsData);
export const getProject = cache((id: string) =>
	projectsData.find(project => project.id === id)
);

// For components that were using the cached versions
export const getCachedProjectSummaries = getProjectSummaries;
export const getCachedSkillsForHomepage = getSkillsForHomepage;
export const getCachedExperienceForAbout = getExperienceForAbout;
export const getCachedProjects = getProjects;
export const getCachedProject = getProject;
