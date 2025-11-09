import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CareerGoalsSection() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl">Career Goals</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<p className="text-lg text-muted-foreground">
					Seeking opportunities to leverage my technical expertise and
					enterprise experience at companies that value innovation, scalability,
					and modern development practices.
				</p>

				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Target Companies</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-muted-foreground">
								<li>
									• Enterprise companies with complex technical challenges
								</li>
								<li>• High-growth startups with good benefits</li>
								<li>• Organizations investing in modern technology stacks</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Technical Focus</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-muted-foreground">
								<li>• Modern full-stack development</li>
								<li>• Cloud architecture and DevOps</li>
								<li>• Early technology adoption</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
