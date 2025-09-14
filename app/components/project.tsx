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
        "relative h-[520px] bg-background-overlay border border-[#fff2] rounded-md w-full p-8 flex flex-col justify-between gap-6 text-white",
        className,
      )}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-col justify-around h-full">
          <h3>{index.toString().padStart(2, "0")}</h3>
          <h4 className="text-secondary">{category}</h4>
        </div>
        <div className="size-11 border-2 border-[#fff2] rounded-sm p-1 flex flex-row items-center justify-center">
          <GlobeIcon className="w-full h-full text-white" />
        </div>
      </div>
      <div className="bg-white outline-4 outline-white/70 rounded-md w-full aspect-square">
        <img
          className="object-cover w-full h-full rounded-md animate-fade-in"
          src={image.url}
          alt={image.alt}
        />
      </div>
      <header className="h-full flex flex-col gap-4">
        <h2>{title}</h2>
        <p className="text-sm line-clamp-3">{description}</p>
      </header>
      <div className="absolute bottom-0">
        <Link
          className="translate-y-[50%] flex gap-1"
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
