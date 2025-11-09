import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCachedProjects } from "@/lib/async-data";
import { techIcons } from "@/lib/tech-icons";
import * as Icons from "lucide-react";
import type { Project } from "@/types/portfolio";

export async function ProjectList() {
	const projects = getCachedProjects();

	const getIcon = (techName: string) => {
		const iconName = techIcons[techName];
		if (!iconName) return null;

		const IconComponent = (Icons as any)[iconName];
		return IconComponent ? <IconComponent className="h-3 w-3" /> : null;
	};

	return (
		<>
			{projects.map((project: Project) => (
				<section key={project.id} className="mb-20">
					<Card>
						<CardHeader>
							<CardTitle className="text-3xl">{project.title}</CardTitle>
							<CardDescription className="text-lg">
								{project.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-8">
							<div className="grid gap-8 md:grid-cols-2">
								<div>
									<h3 className="mb-3 font-semibold text-xl">Problem</h3>
									<p className="text-muted-foreground">{project.problem}</p>
								</div>
								<div>
									<h3 className="mb-3 font-semibold text-xl">Solution</h3>
									<p className="text-muted-foreground">{project.solution}</p>
								</div>
							</div>

							{project.metrics.length > 0 && (
								<div>
									<h3 className="mb-4 font-semibold text-xl">
										Impact & Metrics
									</h3>
									<div className="grid gap-4 md:grid-cols-3">
										{project.metrics.map(metric => (
											<Card
												key={`${metric.value}-${metric.label.replace(/\s+/g, "-").toLowerCase()}`}
											>
												<CardContent className="p-4 text-center">
													<div className="font-bold text-2xl">
														{metric.value}
													</div>
													<div className="text-muted-foreground text-sm">
														{metric.label}
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</div>
							)}

							<div>
								<h3 className="mb-3 font-semibold text-xl">
									Technical Highlights
								</h3>
								<ul className="space-y-2 text-muted-foreground">
									{project.highlights.map(highlight => (
										<li
											key={highlight
												.substring(0, 30)
												.replace(/\s+/g, "-")
												.toLowerCase()}
										>
											• {highlight}
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="mb-3 font-semibold text-xl">Technology Stack</h3>
								<div className="flex flex-wrap gap-2">
									{project.technologies.map(tech => (
										<Badge
											key={tech}
											variant="outline"
											className="flex items-center gap-1"
										>
											{getIcon(tech)}
											{tech}
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</section>
			))}
		</>
	);
}
