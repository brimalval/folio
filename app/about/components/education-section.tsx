import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEducation } from "@/lib/data";

export async function EducationSection() {
	const education = await getEducation();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl">Education</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{education.map(edu => (
					<div key={edu.id} className="rounded-lg border p-6 bg-background">
						<div className="mb-2">
							<h3 className="font-semibold text-xl">{edu.degree}</h3>
							<p className="text-muted-foreground">{edu.institution}</p>
							<p className="text-muted-foreground text-sm">{edu.location}</p>
						</div>
						<p className="mb-4 text-muted-foreground">{edu.description}</p>
						{edu.highlights && edu.highlights.length > 0 && (
							<ul className="list-inside list-disc space-y-1 text-muted-foreground text-sm">
								{edu.highlights.map(highlight => (
									<li key={highlight}>{highlight}</li>
								))}
							</ul>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}
