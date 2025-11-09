import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCachedProjectSummaries } from "@/lib/async-data";
import type { ProjectSummary } from "@/types/portfolio";

export async function ProjectCards() {
	const projects = await getCachedProjectSummaries();

	return (
		<div className="grid gap-8 md:grid-cols-3">
			{projects.map((project: ProjectSummary) => (
				<Card key={project.id}>
					<CardHeader>
						<CardTitle>{project.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className="mb-4">
							{project.description}
						</CardDescription>
						<div className="flex flex-wrap gap-1">
							{project.technologies.map(tech => (
								<Badge key={tech} variant="secondary" className="text-xs">
									{tech}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
