import type React from "react";
import { FaGlobeAmericas as GlobeIcon } from "react-icons/fa";
import { IoMdArrowDroprightCircle as PlayIcon } from "react-icons/io";
import { cn } from "~/utils/classname";
import { Link } from "./primitives/ui/link";

type ProjectProps = {
  className?: string;
  index: number;
  repository: string;
  category: "library" | "game" | "finance";
  title: string;
  description?: string;
  image: {
    url: string;
    alt: string;
  };
};

const Project: React.FC<ProjectProps> = ({
  className,
  index,
  repository,
  category,
  title,
  description,
  image,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-[520px] w-full flex-col justify-between gap-6 rounded-md border border-[#fff2] bg-background-overlay p-8 text-white",
        className,
      )}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex h-full flex-col justify-around">
          <h3>{index.toString().padStart(2, "0")}</h3>
          <h4 className="text-secondary">{category}</h4>
        </div>
        <div className="flex size-11 flex-row items-center justify-center rounded-sm border-2 border-[#fff2] p-1">
          <GlobeIcon className="h-full w-full text-white" />
        </div>
      </div>
      <div className="aspect-square w-full rounded-md bg-white outline-4 outline-white/70">
        <img
          className="h-full w-full animate-fade-in rounded-md object-cover"
          src={image.url}
          alt={image.alt}
        />
      </div>
      <header className="flex h-full flex-col gap-4">
        <h2>{title}</h2>
        <p className="line-clamp-3 text-sm">{description}</p>
      </header>
      <div className="absolute bottom-0">
        <Link
          className="flex translate-y-[50%] gap-1"
          click="squish-lightly"
          from="left"
          to={repository}
        >
          <PlayIcon className="-ml-2" />
          <span>Preview</span>
        </Link>
      </div>
    </div>
  );
};

export { Project };
