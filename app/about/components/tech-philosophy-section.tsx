import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TechPhilosophySection() {
	const concepts = [
		"ShadCN",
		"AI Integration",
		"Coding Agents",
		"Modern Stacks",
	];
	const areas = ["Frontend", "Backend", "DevOps", "Database", "Cloud"];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl">Technology Philosophy</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-8 md:grid-cols-2">
					<div>
						<h3 className="mb-4 font-semibold text-xl">
							Early Adopter Mindset
						</h3>
						<p className="mb-4 text-muted-foreground">
							I believe in staying ahead of the technology curve by actively
							adopting and implementing cutting-edge tools and frameworks. This
							approach has enabled me to deliver innovative solutions that
							provide competitive advantages.
						</p>
						<div className="flex flex-wrap gap-2">
							{concepts.map(concept => (
								<Badge key={concept} variant="outline">
									{concept}
								</Badge>
							))}
						</div>
					</div>

					<div>
						<h3 className="mb-4 font-semibold text-xl">
							Full-Stack Versatility
						</h3>
						<p className="mb-4 text-muted-foreground">
							My expertise spans the entire development stack, from frontend
							user interfaces to backend APIs and cloud infrastructure. This
							end-to-end understanding allows me to architect cohesive,
							production-ready solutions.
						</p>
						<div className="flex flex-wrap gap-2">
							{areas.map(area => (
								<Badge key={area} variant="outline">
									{area}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
