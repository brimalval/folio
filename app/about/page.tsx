import Link from "next/link";
import { Suspense } from "react";
import { CareerGoalsSection } from "./components/career-goals-section";
import { DifferentiatorsSection } from "./components/differentiators-section";
import { ExperienceSection } from "./components/experience-section";
import { ExperienceSkeleton } from "@/components/skeletons";
import { SocialIcons } from "./components/social-icons";
import { SocialLinks } from "@/components/social-links";
import { TechPhilosophySection } from "./components/tech-philosophy-section";
import { Button } from "@/components/ui/button";

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
						I'm a full-stack engineer based in the Philippines who's passionate
						about early technology adoption and building enterprise-scale
						solutions that make a real impact.
					</p>
					<SocialIcons />
				</section>

				{/* Professional Journey */}
				<section className="mb-20">
					<Suspense fallback={<ExperienceSkeleton />}>
						<ExperienceSection />
					</Suspense>
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

				{/* Contact */}
				<section className="text-center">
					<h2 className="mb-4 font-bold text-2xl">Let's Connect</h2>
					<p className="mb-6 text-muted-foreground">
						I'm always interested in discussing opportunities, challenges, and
						innovative projects.
					</p>
					<div className="mb-6">
						<SocialLinks />
					</div>
					<Button size="lg" asChild>
						<Link href="/projects">Back to Projects</Link>
					</Button>
				</section>
			</main>
		</div>
	);
}
