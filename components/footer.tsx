import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-border border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* Contact Information */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg">Contact</h3>
						<div className="space-y-3 text-muted-foreground text-sm">
							<a
								href="mailto:brianmalcolm.v@gmail.com"
								className="flex items-center gap-2 transition-colors hover:text-foreground"
							>
								<Mail className="h-4 w-4" />
								brianmalcolm.v@gmail.com
							</a>
							<a
								href="tel:+639164164268"
								className="flex items-center gap-2 transition-colors hover:text-foreground"
							>
								<Phone className="h-4 w-4" />
								+63 916 416 4268
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg">Quick Links</h3>
						<nav className="flex flex-col space-y-3 text-muted-foreground text-sm">
							<Link
								href="/"
								className="transition-colors hover:text-foreground"
							>
								Home
							</Link>
							<Link
								href="/projects"
								className="transition-colors hover:text-foreground"
							>
								Projects
							</Link>
							<Link
								href="/about"
								className="transition-colors hover:text-foreground"
							>
								About
							</Link>
						</nav>
					</div>

					{/* Social Links */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg">Connect</h3>
						<div className="flex gap-4">
							<a
								href="https://github.com/brimalval"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground transition-colors hover:text-foreground"
								aria-label="GitHub"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://www.linkedin.com/in/brian-malcolm-valencia-032752220"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground transition-colors hover:text-foreground"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-12 border-border border-t pt-8">
					<div className="flex flex-col items-center justify-between gap-4 text-muted-foreground text-sm md:flex-row">
						<p>
							&copy; {currentYear} Brian Malcolm Valencia. All rights reserved.
						</p>
						<p className="text-xs">
							Built with Next.js, TypeScript, Tailwind CSS, NeoVim (btw), and
							some coffee
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
