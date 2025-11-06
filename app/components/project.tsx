import { clamp, type MotionValue, motion, useTransform } from "framer-motion";
import type React from "react";
import { FaGlobeAmericas as GlobeIcon } from "react-icons/fa";
import { IoMdArrowDroprightCircle as PlayIcon } from "react-icons/io";
import { cn } from "~/utils/classname";
import { Link } from "./primitives/ui/link";

type ProjectProps = {
  className?: string;
  index: number;
  length: number;
  repository: string;
  category: "library" | "game" | "website" | "cli";
  title: string;
  description?: string;
  image: {
    url: string;
    alt: string;
  };
  scrollProgress: MotionValue<number>;
};

const Project: React.FC<ProjectProps> = ({
  className,
  index,
  length,
  repository,
  category,
  title,
  description,
  image,
  scrollProgress,
}) => {
  const n = length - 1;
  const start = (index - 1) / n;
  const end = index / n;
  const scrollSectionProgress = useTransform(
    scrollProgress,
    [start, end],
    [0, 1],
  );
  const height = useTransform(
    scrollSectionProgress,
    [0, 1],
    ["520px", "632px"],
  );
  const descriptionOpacity = useTransform(scrollSectionProgress, (value) =>
    value >= 0.8 ? 1 : 0,
  );
  const opacity = useTransform(scrollProgress, (value) => {
    let left, right;

    left = (index - 3) / n;
    right = (index - 2) / n;
    if (left <= value && value <= right)
      return clamp(0, (value - left) / (right - left), 1);

    left = index / n;
    right = (index + 1) / n;
    if (left <= value && value <= right)
      return clamp(0, -((value - left) / (right - left) - 1), 1);
    return 1;
  });

  return (
    <motion.div
      className={cn(
        "relative flex shrink-0 grow-0 basis-[calc(33.333%-16px)] w-full flex-col justify-between gap-6 rounded-md border border-[#fff2] bg-background-overlay p-8 text-white",
        className,
      )}
      style={{ height, opacity }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex h-full flex-col justify-around">
          <h3 className="text-shadow-lg">
            {index.toString().padStart(2, "0")}
          </h3>
          <h4 className="text-shadow-lg text-secondary">{category}</h4>
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
      <header className="flex h-full flex-col gap-4 overflow-hidden">
        <h2 className="text-shadow-lg">{title}</h2>
        <motion.p
          className="line-clamp-5 text-sm transition-opacity duration-500"
          style={{ opacity: descriptionOpacity }}
        >
          {description}
        </motion.p>
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
    </motion.div>
  );
};

export { Project };
