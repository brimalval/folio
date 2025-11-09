import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import profileData from "@/data/profile.json";
import socialsData from "@/data/socials.json";

export function SocialLinks() {
	const baseSocials = [
		...socialsData,
		{
			platform: "email" as const,
			url: `mailto:${profileData.email}`,
			displayName: "Email",
		},
	];

	// Only add website if it's not empty
	const websiteLink = profileData.website
		? [
				{
					platform: "website" as const,
					url: profileData.website,
					displayName: "Website",
				},
			]
		: [];

	const socials = [...baseSocials, ...websiteLink];

	const getIcon = (platform: string) => {
		switch (platform) {
			case "github":
				return <GithubIcon className="h-5 w-5" />;
			case "linkedin":
				return <LinkedinIcon className="h-5 w-5" />;
			case "email":
				return <MailIcon className="h-5 w-5" />;
			default:
				return null;
		}
	};

	return (
		<div className="flex justify-center gap-4">
			{socials.map(social => (
				<a
					key={social.platform}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 rounded-lg border border-border bg-background p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
				>
					{getIcon(social.platform)}
					<span className="font-medium text-sm">{social.displayName}</span>
				</a>
			))}
		</div>
	);
}
