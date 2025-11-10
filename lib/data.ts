import { z } from "zod";
import type {
	Experience,
	Profile,
	Skill,
	Social,
	Education,
} from "../types/portfolio";

// Zod schemas for validation
const profileSchema = z.object({
	name: z.string(),
	title: z.string(),
	bio: z.string(),
	location: z.string(),
	email: z.email(),
	avatar: z.string(),
	fullPhoto: z.string().optional(),
	resumeUrl: z.url().optional(),
	website: z.url().optional(),
	phone: z.string().optional(),
	github: z.string().optional(),
	linkedin: z.string().optional(),
});

const socialSchema = z.object({
	platform: z.enum([
		"github",
		"linkedin",
		"twitter",
		"website",
		"email",
		"youtube",
		"instagram",
	]),
	url: z.url(),
	username: z.string().optional(),
	displayName: z.string().optional(),
});

const experienceSchema = z.object({
	id: z.string(),
	company: z.string(),
	position: z.string(),
	startDate: z.string(),
	endDate: z.string().optional(),
	description: z.string(),
	location: z.string().optional(),
	companySize: z.string().optional(),
	technologies: z.array(z.string()).optional(),
});

const educationSchema = z.object({
	id: z.string(),
	degree: z.string(),
	institution: z.string(),
	location: z.string(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	description: z.string(),
	highlights: z.array(z.string()).optional(),
});

const skillSchema = z.object({
	category: z.enum([
		"frontend",
		"backend",
		"devops",
		"database",
		"language",
		"tool",
		"other",
	]),
	name: z.string(),
	level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
	certifications: z.array(z.string()).optional(),
});

const projectFrontmatterSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	summary: z.string().optional(),
	featured: z.boolean(),
	tags: z.array(z.string()),
	technologies: z.array(z.string()),
	role: z.string(),
	liveUrl: z.url().optional(),
	thumbnail: z.string(),
	images: z.array(z.string()).optional(),
	videos: z.array(z.string()).optional(),
	metrics: z.string().optional(),
	challenges: z.array(z.string()).optional(),
	learnings: z.array(z.string()).optional(),
});

// Data loading functions
export async function getProfile(): Promise<Profile> {
	try {
		const data = await import("@/data/profile.json");
		return profileSchema.parse(data.default);
	} catch (error) {
		console.error("Error loading profile:", error);
		throw new Error("Failed to load profile data");
	}
}

export async function getSocials(): Promise<Social[]> {
	try {
		const data = await import("@/data/socials.json");
		return z.array(socialSchema).parse(data.default);
	} catch (error) {
		console.error("Error loading socials:", error);
		throw new Error("Failed to load socials data");
	}
}

export async function getExperience(): Promise<Experience[]> {
	try {
		const data = await import("@/data/experience.json");
		return z.array(experienceSchema).parse(data.default);
	} catch (error) {
		console.error("Error loading experience:", error);
		throw new Error("Failed to load experience data");
	}
}

export async function getSkills(): Promise<Skill[]> {
	try {
		const data = await import("@/data/skills.json");
		return z.array(skillSchema).parse(data.default);
	} catch (error) {
		console.error("Error loading skills:", error);
		throw new Error("Failed to load skills data");
	}
}

export async function getProjects() {
	try {
		// This would need to be implemented based on your MDX parsing setup
		// For now, return a placeholder structure
		const fs = await import("node:fs/promises");
		const path = await import("node:path");

		const projectsDir = path.join(process.cwd(), "content", "projects");
		const files = await fs.readdir(projectsDir);
		const mdxFiles = files.filter(file => file.endsWith(".mdx"));

		const projects = await Promise.all(
			mdxFiles.map(async file => {
				const filePath = path.join(projectsDir, file);
				const content = await fs.readFile(filePath, "utf-8");

				// Simple frontmatter parsing (you might want to use a proper MDX parser)
				const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
				const frontmatterStr = frontmatterMatch ? frontmatterMatch[1] : "";
				const frontmatter = Object.fromEntries(
					frontmatterStr
						.split("\n")
						.filter(line => line.includes(":"))
						.map(line => {
							const [key, ...valueParts] = line.split(":");
							const value = valueParts.join(":").trim();
							return [key.trim(), value.replace(/^["']|["']$/g, "")];
						})
				);

				const projectContent = content.replace(/^---\n[\s\S]*?\n---\n/, "");

				return {
					...projectFrontmatterSchema.parse(frontmatter),
					content: projectContent,
					slug: file.replace(".mdx", ""),
				};
			})
		);

		return projects;
	} catch (error) {
		console.error("Error loading projects:", error);
		throw new Error("Failed to load projects data");
	}
}

export async function getFeaturedProjects() {
	const projects = await getProjects();
	return projects.filter(project => project.featured);
}

export async function getProjectById(id: string) {
	const projects = await getProjects();
	return projects.find(project => project.id === id);
}

export async function getEducation(): Promise<Education[]> {
	try {
		const data = await import("@/data/education.json");
		return z.array(educationSchema).parse(data.default);
	} catch (error) {
		console.error("Error loading education:", error);
		throw new Error("Failed to load education data");
	}
}

export async function getSkillsByCategory() {
	const skills = await getSkills();
	return skills.reduce(
		(acc, skill) => {
			if (!acc[skill.category]) {
				acc[skill.category] = [];
			}
			acc[skill.category].push(skill);
			return acc;
		},
		{} as Record<string, Skill[]>
	);
}
