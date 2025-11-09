import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DifferentiatorsSection() {
	const differentiators = [
		{
			title: "Production-Ready Experience",
			description:
				"Proven track record building applications that handle significant revenue, thousands of users, and complex business operations across multiple countries.",
		},
		{
			title: "Cross-Functional Collaboration",
			description:
				"Extensive experience working across team boundaries with data engineering, product management, and specialized development teams.",
		},
		{
			title: "Rapid Technology Adaptation",
			description:
				"Strong curiosity and ability to quickly master new technologies, enabling implementation of modern solutions that drive business value.",
		},
		{
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
					{differentiators.map((item, index) => (
						<div key={index} className="flex items-start gap-4">
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
