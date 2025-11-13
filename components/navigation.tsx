"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import profileData from "@/data/profile.json";

export function Navigation() {
	const [showName, setShowName] = useState(true);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	// Hide name on homepage, show on other pages
	useEffect(() => {
		setShowName(pathname !== "/");
	}, [pathname]);

	// Handle scroll for animation
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Determine if we should show animated name (scroll-based)
	const shouldShowAnimatedName = pathname === "/" && isScrolled;

	return (
		<nav className="fixed top-0 right-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm">
			<div className="mx-auto max-w-4xl px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src={profileData.avatar}
							alt="Brian Valencia"
							width={48}
							height={48}
							className="rounded-full object-cover"
						/>
						<div
							className={`font-bold text-foreground text-lg transition-all duration-300 ${
								showName || shouldShowAnimatedName
									? "translate-x-0 opacity-100"
									: "-translate-x-4 opacity-0"
							}`}
						>
							Brian Malcolm Valencia
						</div>
					</div>
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className={`text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground ${
								pathname === "/" ? "text-foreground dark:text-foreground" : ""
							}`}
						>
							Home
						</Link>
						<Link
							href="/projects"
							className={`text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground ${
								pathname === "/projects"
									? "text-foreground dark:text-foreground"
									: ""
							}`}
						>
							Projects
						</Link>
						<Link
							href="/about"
							className={`text-muted-foreground transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground ${
								pathname === "/about"
									? "text-foreground dark:text-foreground"
									: ""
							}`}
						>
							About
						</Link>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}
