import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCardSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-6 w-3/4" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
			<div className="flex gap-2">
				<Skeleton className="h-6 w-16 rounded-full" />
				<Skeleton className="h-6 w-20 rounded-full" />
				<Skeleton className="h-6 w-16 rounded-full" />
			</div>
		</div>
	);
}

export function SkillsSectionSkeleton() {
	return (
		<div className="grid gap-8 md:grid-cols-2">
			<div className="space-y-4">
				<Skeleton className="h-7 w-24" />
				<div className="flex flex-wrap gap-2">
					{[1, 2, 3, 4, 5, 6].map(i => (
						<Skeleton key={i} className="h-8 w-20 rounded-full" />
					))}
				</div>
			</div>
			<div className="space-y-4">
				<Skeleton className="h-7 w-32" />
				<div className="flex flex-wrap gap-2">
					{[1, 2, 3, 4, 5, 6].map(i => (
						<Skeleton key={i} className="h-8 w-24 rounded-full" />
					))}
				</div>
			</div>
		</div>
	);
}

export function ProjectDetailSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<Skeleton className="h-10 w-3/4" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-5/6" />
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-3">
					<Skeleton className="h-7 w-20" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-4/5" />
					<Skeleton className="h-4 w-5/6" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-7 w-20" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-4/5" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</div>

			<div className="space-y-4">
				<Skeleton className="h-7 w-32" />
				<div className="grid gap-4 md:grid-cols-3">
					{[1, 2, 3].map(i => (
						<div key={i} className="space-y-2">
							<Skeleton className="h-8 w-16" />
							<Skeleton className="h-4 w-24" />
						</div>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<Skeleton className="h-7 w-40" />
				<div className="space-y-2">
					{[1, 2, 3, 4, 5].map(i => (
						<Skeleton key={i} className="h-4 w-full" />
					))}
				</div>
			</div>

			<div className="space-y-4">
				<Skeleton className="h-7 w-32" />
				<div className="flex flex-wrap gap-2">
					{[1, 2, 3, 4, 5, 6, 7].map(i => (
						<Skeleton key={i} className="h-8 w-20 rounded-full" />
					))}
				</div>
			</div>
		</div>
	);
}

export function ExperienceSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<Skeleton className="h-8 w-3/4" />
				<Skeleton className="h-5 w-48" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-5/6" />
			</div>

			<div className="space-y-4">
				<Skeleton className="h-6 w-32" />
				<div className="space-y-3">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/5" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</div>

			<div className="space-y-4">
				<Skeleton className="h-6 w-40" />
				<div className="space-y-2">
					{[1, 2, 3, 4, 5].map(i => (
						<Skeleton key={i} className="h-4 w-full" />
					))}
				</div>
			</div>
		</div>
	);
}

export function HeroSectionSkeleton() {
	return (
		<section className="mb-20 space-y-6 text-center">
			<Skeleton className="mx-auto h-14 w-3/4" />
			<Skeleton className="mx-auto h-6 w-full max-w-2xl" />
			<Skeleton className="mx-auto h-6 w-5/6 max-w-2xl" />
			<div className="flex justify-center gap-4">
				<Skeleton className="h-12 w-32" />
				<Skeleton className="h-12 w-28" />
			</div>
		</section>
	);
}
