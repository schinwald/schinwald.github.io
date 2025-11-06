import React from "react";
import {
  AiOutlineGithub as GitHubIcon,
  AiFillLinkedin as LinkedInIcon,
  AiOutlineTwitter as TwitterIcon,
} from "react-icons/ai";
import { cn } from "~/utils/classname";
import { Link } from "./primitives/ui/link";

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
              "flex flex-row items-center justify-center gap-8 text-foreground",
            )}
          >
            <li>
              <Link
                className="flex flex-row gap-2"
                to="https://www.github.com/schinwald"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="minimal"
              >
                <GitHubIcon className="size-7 drop-shadow-lg" />
                <h4 className="mr-1 hidden sm:block text-shadow-lg">Github</h4>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-row gap-2"
                to="https://www.linkedin.com/in/schinwald"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="minimal"
              >
                <LinkedInIcon className="size-7 drop-shadow-lg" />
                <h4 className="mr-1 hidden sm:block text-shadow-lg">
                  LinkedIn
                </h4>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-row gap-2"
                to="https://www.twitter.com/schinwald"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="minimal"
              >
                <TwitterIcon className="size-7 drop-shadow-lg" />
                <h4 className="mr-1 hidden sm:block text-shadow-lg">Twitter</h4>
              </Link>
            </li>
          </ul>
        );
      case "minimal":
        return (
          <ul
            ref={ref}
            className={cn(
              "flex flex-row items-center justify-center gap-2 text-foreground",
              className,
            )}
          >
            <li className="opacity-0">
              <Link
                to="https://www.github.com/schinwald"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="minimal"
              >
                <GitHubIcon className="size-8 drop-shadow-lg" />
              </Link>
            </li>
            <li className="opacity-0">
              <Link
                to="https://www.linkedin.com/in/schinwald"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="minimal"
              >
                <LinkedInIcon className="size-8 drop-shadow-lg" />
              </Link>
            </li>
            <li className="opacity-0">
              <Link
                to="https://www.twitter.com/schinwald"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="minimal"
              >
                <TwitterIcon className="size-8 drop-shadow-lg" />
              </Link>
            </li>
          </ul>
        );
    }
  },
);

export { Socials };
