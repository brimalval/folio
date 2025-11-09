"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
						<img
							src={profileData.avatar}
							alt="Brian Valencia"
							className="h-12 w-12 rounded-full object-cover"
						/>
						<div
							className={`font-bold text-black text-lg transition-all duration-300 dark:text-zinc-50 ${
								showName || shouldShowAnimatedName
									? "translate-x-0 opacity-100"
									: "-translate-x-4 opacity-0"
							}`}
						>
							Brian Malcolm Valencia
						</div>
					</div>
					<div className="flex gap-6">
						<Link
							href="/"
							className={`text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50 ${
								pathname === "/" ? "text-black dark:text-zinc-50" : ""
							}`}
						>
							Home
						</Link>
						<Link
							href="/projects"
							className={`text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50 ${
								pathname === "/projects" ? "text-black dark:text-zinc-50" : ""
							}`}
						>
							Projects
						</Link>
						<Link
							href="/about"
							className={`text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50 ${
								pathname === "/about" ? "text-black dark:text-zinc-50" : ""
							}`}
						>
							About
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
