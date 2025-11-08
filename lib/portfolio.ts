import {
	getExperience,
	getProfile,
	getProjects,
	getSkills,
	getSocials,
} from "./data";

// Example usage in components or pages
export async function getPortfolioData() {
	const [profile, socials, experience, skills, projects] = await Promise.all([
		getProfile(),
		getSocials(),
		getExperience(),
		getSkills(),
		getProjects(),
	]);

	return {
		profile,
		socials,
		experience,
		skills,
		projects,
	};
}

// Example helper functions for specific data needs
export async function getFeaturedProjectsData() {
	const projects = await getProjects();
	return projects.filter(project => project.featured);
}

export async function getSkillsByCategoryData() {
	const skills = await getSkills();
	return skills.reduce(
		(acc, skill) => {
			if (!acc[skill.category]) {
				acc[skill.category] = [];
			}
			acc[skill.category].push(skill);
			return acc;
		},
		{} as Record<string, typeof skills>
	);
}

export async function getLatestExperience() {
	const experience = await getExperience();
	return experience[0]; // Assuming first is most recent
}
