import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DifferentiatorsSection() {
	const differentiators = [
		{
			id: "production-ready",
			title: "Production-Ready Experience",
			description:
				"Proven track record building applications that handle significant revenue, thousands of users, and complex business operations across multiple countries.",
		},
		{
			id: "cross-functional",
			title: "Cross-Functional Collaboration",
			description:
				"Extensive experience working across team boundaries with marketing teams, data engineering, product management, and specialized development teams.",
		},
		{
			id: "rapid-adaptation",
			title: "Rapid Technology Adaptation",
			description:
				"Strong curiosity and ability to quickly master new technologies, enabling implementation of modern solutions and modernization of legacy systems that drive business value.",
		},
		{
			id: "devops-cloud",
			title: "DevOps & Cloud Expertise",
			description:
				"Knowledge of AWS services, infrastructure as code, and deployment strategies for reliable, production-ready applications.",
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl">Key Differentiators</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{differentiators.map(item => (
						<div key={item.id} className="flex items-start gap-4">
							<div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
							<div>
								<h3 className="mb-2 font-semibold text-lg">{item.title}</h3>
								<p className="text-muted-foreground">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
