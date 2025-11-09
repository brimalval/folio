import * as Icons from "lucide-react";
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
import type { Project } from "@/types/portfolio";

export function ProjectList() {
	const projects = getCachedProjects();

	const getIcon = (techName: string) => {
		const iconName = techIcons[techName];
		if (!iconName) return null;

		switch (iconName) {
			case "Code2":
				return <Icons.Code2 className="h-3 w-3" />;
			case "Triangle":
				return <Icons.Triangle className="h-3 w-3" />;
			case "Atom":
				return <Icons.Atom className="h-3 w-3" />;
			case "Palette":
				return <Icons.Palette className="h-3 w-3" />;
			case "Square":
				return <Icons.Square className="h-3 w-3" />;
			case "Layers":
				return <Icons.Layers className="h-3 w-3" />;
			case "Cpu":
				return <Icons.Cpu className="h-3 w-3" />;
			case "Database":
				return <Icons.Database className="h-3 w-3" />;
			case "Cloud":
				return <Icons.Cloud className="h-3 w-3" />;
			case "Server":
				return <Icons.Server className="h-3 w-3" />;
			case "Container":
				return <Icons.Container className="h-3 w-3" />;
			case "Diamond":
				return <Icons.Diamond className="h-3 w-3" />;
			case "GitBranch":
				return <Icons.GitBranch className="h-3 w-3" />;
			case "ShieldCheck":
				return <Icons.ShieldCheck className="h-3 w-3" />;
			case "Terminal":
				return <Icons.Terminal className="h-3 w-3" />;
			case "Code":
				return <Icons.Code className="h-3 w-3" />;
			case "Bot":
				return <Icons.Bot className="h-3 w-3" />;
			case "PenTool":
				return <Icons.PenTool className="h-3 w-3" />;
			default:
				return null;
		}
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
