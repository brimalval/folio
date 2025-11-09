import { FileQuestion, FolderOpen, Home, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
	return (
		<div className="min-h-screen pt-20 font-sans">
			<main className="mx-auto max-w-4xl px-6 py-16">
				<div className="text-center">
					{/* 404 Icon and Message */}
					<div className="mb-8">
						<FileQuestion className="mx-auto mb-4 h-24 w-24 text-muted-foreground" />
						<h1 className="mb-4 font-bold text-6xl">404</h1>
						<h2 className="mb-2 font-bold text-2xl">Page Not Found</h2>
						<p className="mb-8 text-lg text-muted-foreground">
							The page you're looking for doesn't exist or may have been moved.
						</p>
					</div>

					{/* Navigation Options */}
					<div className="mb-12 grid gap-6 md:grid-cols-3">
						<Card className="transition-transform hover:scale-105">
							<CardHeader className="text-center">
								<Home className="mx-auto mb-2 h-8 w-8 text-primary" />
								<CardTitle>Home</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="mb-4 text-muted-foreground">
									Explore my portfolio and featured projects
								</p>
								<Button asChild className="w-full">
									<Link href="/">Go Home</Link>
								</Button>
							</CardContent>
						</Card>

						<Card className="transition-transform hover:scale-105">
							<CardHeader className="text-center">
								<FolderOpen className="mx-auto mb-2 h-8 w-8 text-primary" />
								<CardTitle>Projects</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="mb-4 text-muted-foreground">
									Take a look at what I've worked on
								</p>
								<Button asChild variant="outline" className="w-full">
									<Link href="/projects">View Projects</Link>
								</Button>
							</CardContent>
						</Card>

						<Card className="transition-transform hover:scale-105">
							<CardHeader className="text-center">
								<User className="mx-auto mb-2 h-8 w-8 text-primary" />
								<CardTitle>About</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="mb-4 text-muted-foreground">
									Learn more about my background and experience
								</p>
								<Button asChild variant="outline" className="w-full">
									<Link href="/about">About Me</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Back Button */}
					<Button variant="ghost" asChild size="lg">
						<Link href="/">← Take Me Back</Link>
					</Button>
				</div>
			</main>
		</div>
	);
}
