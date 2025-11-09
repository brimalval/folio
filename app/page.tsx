import Link from "next/link";
import { Suspense } from "react";
import { HeroSection } from "./components/hero-section";
import { ProjectCards } from "./components/project-cards";
import {
	ProjectCardSkeleton,
	SkillsSectionSkeleton,
} from "@/components/skeletons";
import { SkillsSection } from "./components/skills-section";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";

export const revalidate = 86400; // Revalidate once per day

export default function Home() {
	return (
		<div className="min-h-screen pt-24 font-sans">
			<main className="mx-auto max-w-4xl px-6 py-16">
				{/* Hero Section */}
				<HeroSection />
				<div className="mb-20 flex justify-center">
					<Button variant="outline" size="lg" asChild>
						<Link href="/about">More About Me</Link>
					</Button>
				</div>

				{/* Key Projects Highlights */}
				<section className="mb-20">
					<h2 className="mb-8 text-center font-bold text-3xl">
						Featured Projects
					</h2>
					<Suspense
						fallback={
							<div className="grid gap-8 md:grid-cols-3">
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
							</div>
						}
					>
						<ProjectCards />
					</Suspense>
					<div className="mt-8 flex justify-center">
						<Button asChild size="lg">
							<Link href="/projects">View Projects</Link>
						</Button>
					</div>
				</section>

				{/* Technical Skills Overview */}
				<section className="mb-20">
					<h2 className="mb-8 text-center font-bold text-3xl">
						Development Arsenal
					</h2>
					<Suspense fallback={<SkillsSectionSkeleton />}>
						<SkillsSection />
					</Suspense>
				</section>

				{/* About Me Button */}

				{/* Contact Section */}
				<section className="text-center">
					<h2 className="mb-4 font-bold text-2xl">Let's Connect</h2>
					<p className="mb-6 text-muted-foreground">
						Open to opportunities at enterprise companies and high-growth
						startups
					</p>
					<div className="mb-6">
						<SocialLinks />
					</div>
				</section>
			</main>
		</div>
	);
}
