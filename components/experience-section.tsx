import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedExperienceForAbout } from "@/lib/async-data";

export async function ExperienceSection() {
	const experience = await getCachedExperienceForAbout();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl">Professional Journey</CardTitle>
			</CardHeader>
			<CardContent className="space-y-8">
				<div>
					<h3 className="mb-3 font-semibold text-xl">
						{experience.company} | {experience.position}
					</h3>
					<p className="mb-4 text-muted-foreground">{experience.period}</p>
					<p className="mb-6 text-muted-foreground">{experience.description}</p>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Company Overview:</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-muted-foreground">
								<li>
									• <strong>Scale:</strong> {experience.overview.scale}
								</li>
								<li>
									• <strong>Market Leadership:</strong>{" "}
									{experience.overview.marketLeadership}
								</li>
								<li>
									• <strong>Brand Portfolio:</strong>{" "}
									{experience.overview.brandPortfolio}
								</li>
								<li>
									• <strong>Business Model:</strong>{" "}
									{experience.overview.businessModel}
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>

				<div>
					<h3 className="mb-3 font-semibold text-xl">
						Role & Responsibilities
					</h3>
					<ul className="space-y-2 text-muted-foreground">
						{experience.responsibilities.map((responsibility, index) => (
							<li key={index}>• {responsibility}</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
