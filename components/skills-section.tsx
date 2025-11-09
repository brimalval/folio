import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedSkillsForHomepage } from "@/lib/async-data";
import * as Icons from "lucide-react";
import type { SkillCategory } from "@/types/portfolio";

export async function SkillsSection() {
	const skills = await getCachedSkillsForHomepage();

	const getIcon = (iconName: string) => {
		const IconComponent = (Icons as any)[iconName];
		return IconComponent ? <IconComponent className="h-3 w-3" /> : null;
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
