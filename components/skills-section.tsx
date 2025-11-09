import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedSkillsForHomepage } from "@/lib/async-data";
import type { SkillCategory } from "@/types/portfolio";

export async function SkillsSection() {
	const skills = await getCachedSkillsForHomepage();

	return (
		<div className="grid gap-8 md:grid-cols-2">
			{skills.map((category: SkillCategory) => (
				<Card key={category.category}>
					<CardHeader>
						<CardTitle>{category.category}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{category.skills.map(skill => (
								<Badge key={skill} variant="outline">
									{skill}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
