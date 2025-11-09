import Link from "next/link";
import { Suspense } from "react";
import { ProjectDetailSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { ProjectList } from "./components/project-list";

export const revalidate = 86400; // Revalidate once per day

export default function Projects() {
	return (
		<div className="min-h-screen pt-20 font-sans">
			<main className="mx-auto max-w-4xl px-6 py-16">
				{/* Header */}
				<section className="mb-16">
					<Button variant="ghost" asChild className="mb-8">
						<Link href="/">← Back to Home</Link>
					</Button>
					<h1 className="mb-4 font-bold text-4xl">Projects</h1>
				</section>

				{/* Projects List */}
				<Suspense fallback={<ProjectDetailSkeleton />}>
					<ProjectList />
				</Suspense>
			</main>
		</div>
	);
}
