import Link from "next/link";
import { Suspense } from "react";
import { ExperienceSkeleton } from "@/components/skeletons";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { CareerGoalsSection } from "./components/career-goals-section";
import { DifferentiatorsSection } from "./components/differentiators-section";
import { EducationSection } from "./components/education-section";
import { ExperienceSection } from "./components/experience-section";
import { SocialIcons } from "./components/social-icons";
import { TechPhilosophySection } from "./components/tech-philosophy-section";

export const revalidate = 86400; // Revalidate once per day

export default function About() {
	return (
		<div className="min-h-screen pt-20 font-sans">
			<main className="mx-auto max-w-4xl px-6 py-16">
				{/* Header */}
				<section className="mb-16">
					<Button variant="ghost" asChild className="mb-8">
						<Link href="/">← Back to Home</Link>
					</Button>
					<h1 className="mb-4 font-bold text-4xl">About Brian</h1>
					<p className="text-muted-foreground text-xl">
						Here's my background: my professional journey so far, what sets me
						apart as a developer, and where I'd like to take my career next.
					</p>
					<SocialIcons />
				</section>

				{/* Professional Journey */}
				<section className="mb-20">
					<Suspense fallback={<ExperienceSkeleton />}>
						<ExperienceSection />
					</Suspense>
				</section>

				{/* Education */}
				<section className="mb-20">
					<EducationSection />
				</section>

				{/* Technology Philosophy */}
				<section className="mb-20">
					<TechPhilosophySection />
				</section>

				{/* Technical Differentiators */}
				<section className="mb-20">
					<DifferentiatorsSection />
				</section>

				{/* Career Goals */}
				<section className="mb-20">
					<CareerGoalsSection />
				</section>
			</main>
		</div>
	);
}
