import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedSkillsForHomepage } from "@/lib/async-data";
import type { SkillCategory } from "@/types/portfolio";

export async function SkillsSection() {
	const skills = await getCachedSkillsForHomepage();

	const getIcon = (iconName: string): React.ReactNode => {
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
		<div className="grid gap-8 md:grid-cols-3">
			{skills.map((category: SkillCategory) => (
				<Card key={category.category}>
					<CardHeader>
						<CardTitle>{category.category}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{category.skills.map(skill => (
								<Badge
									key={skill.name}
									variant="outline"
									className="flex items-center gap-1"
								>
									{getIcon(skill.icon)}
									{skill.name}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
