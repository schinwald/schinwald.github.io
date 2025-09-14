import React from "react";
import { AiFillLinkedin as LinkedInIcon } from "react-icons/ai";
import { AiOutlineGithub as GitHubIcon } from "react-icons/ai";
import { AiOutlineTwitter as TwitterIcon } from "react-icons/ai";
import { cn } from "~/utils/classname";

type SocialsProps = {
	className?: string;
	variant?: "default" | "minimal";
};

const Socials = React.forwardRef<HTMLUListElement, SocialsProps>(
	({ className, variant = "default" }, ref) => {
		switch (variant) {
			case "default":
				return (
					<ul
						ref={ref}
						className={cn(
							className,
							"flex flex-row gap-8 justify-center items-center text-foreground",
						)}
					>
						<li>
							<a
								className="flex flex-row items-center gap-2"
								href="https://www.github.com/schinwald"
								target="_blank"
								rel="noreferrer"
							>
								<GitHubIcon className="size-7" />
								<h4 className="hidden sm:block">Github</h4>
							</a>
						</li>
						<li>
							<a
								className="flex flex-row items-center gap-2"
								href="https://www.linkedin.com/in/schinwald"
								target="_blank"
								rel="noreferrer"
							>
								<LinkedInIcon className="size-7" />
								<h4 className="hidden sm:block">LinkedIn</h4>
							</a>
						</li>
						<li>
							<a
								className="flex flex-row items-center gap-2"
								href="https://www.twitter.com/schinwald"
								target="_blank"
								rel="noreferrer"
							>
								<TwitterIcon className="size-7" />
								<h4 className="hidden sm:block">Twitter</h4>
							</a>
						</li>
					</ul>
				);
			case "minimal":
				return (
					<ul
						ref={ref}
						className={cn(
							"flex flex-row gap-2 justify-center items-center text-foreground",
							className,
						)}
					>
						<li className="opacity-0">
							<a
								className="flex flex-row items-center gap-2"
								href="https://www.github.com/schinwald"
								target="_blank"
								rel="noreferrer"
							>
								<GitHubIcon className="size-8" />
							</a>
						</li>
						<li className="opacity-0">
							<a
								className="flex flex-row items-center gap-2"
								href="https://www.linkedin.com/in/schinwald"
								target="_blank"
								rel="noreferrer"
							>
								<LinkedInIcon className="size-8" />
							</a>
						</li>
						<li className="opacity-0">
							<a
								className="flex flex-row items-center gap-2"
								href="https://www.twitter.com/schinwald"
								target="_blank"
								rel="noreferrer"
							>
								<TwitterIcon className="size-8" />
							</a>
						</li>
					</ul>
				);
		}
	},
);

export { Socials };
