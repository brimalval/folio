import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import profileData from "@/data/profile.json";
import socialsData from "@/data/socials.json";

export function SocialIcons() {
	const socials = [
		...socialsData,
		{
			platform: "email" as const,
			url: `mailto:${profileData.email}`,
		},
	];

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
		<div className="mt-4 flex gap-3">
			{socials.map(social => (
				<a
					key={social.platform}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					className="rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
					aria-label={`${social.platform} link`}
				>
					{getIcon(social.platform)}
				</a>
			))}
		</div>
	);
}
