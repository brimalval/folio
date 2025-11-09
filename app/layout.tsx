import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Brian Malcolm Valencia | Full-Stack Software Engineer",
	description:
		"Brian Malcolm Valencia - Enterprise-scale full-stack developer specializing in TypeScript, NextJS, and cloud infrastructure. Based in the Philippines.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 antialiased dark:bg-black`}
			>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
