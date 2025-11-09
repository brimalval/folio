export function HeroSection() {
	return (
		<section className="mb-10 text-center">
			<h1 className="mb-4 font-bold text-5xl">Brian Malcolm Valencia</h1>
			<h2 className="mb-6 font-semibold text-2xl text-muted-foreground">
				Full-Stack Engineer who loves building production-ready solutions
			</h2>
			<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
				I'm passionate about creating enterprise-grade applications with modern
				technology stacks. Specializing in TypeScript, NextJS, and cloud
				infrastructure, I help companies build robust systems with real business
				impact.
			</p>
			<div className="mx-auto max-w-2xl">
				<div className="flex flex-wrap justify-center gap-4 text-muted-foreground text-sm">
					<div className="flex items-center gap-2">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							role="img"
							aria-label="Location pin icon"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span>Philippines</span>
					</div>
					<div className="flex items-center gap-2">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							role="img"
							aria-label="Book icon"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
						<span>Learning Japanese</span>
					</div>
					<div className="flex items-center gap-2">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							role="img"
							aria-label="Music note icon"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							/>
						</svg>
						<span>Learning Piano</span>
					</div>
				</div>
			</div>
		</section>
	);
}
