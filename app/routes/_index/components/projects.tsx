import { useInView, useScroll, useTransform } from "framer-motion";
import type React from "react";
import { useEffect, useRef } from "react";
import { Header } from "~/components/header";
import { Project } from "~/components/project";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";

type ProjectsProps = {
  id: string;
  className?: string;
};

const clamp = (minimum: number, value: number, maximum: number) => {
  return Math.max(Math.min(maximum, value), minimum);
};

const Projects: React.FC<ProjectsProps> = ({ id, className }) => {
  const containerRef = useRef(null);
  const { setVisible } = useProgress();
  const isInView = useInView(containerRef, {
    margin: "0px 0px -500px 0px",
  });

  useEffect(() => {
    if (isInView) {
      setVisible((visible) => {
        const copy = { ...visible };
        copy[id] = true;
        return copy;
      });
    } else {
      setVisible((visible) => {
        const copy = { ...visible };
        copy[id] = false;
        return copy;
      });
    }
  }, [id, isInView, setVisible]);

  const projectContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollXProgress } = useScroll({ container: projectContainerRef });

  const projects = [
    {
      index: 1,
      category: "library" as const,
      repository: "https://github.com/schinwald/express-otter",
      title: "Express Otter",
      description:
        "An automatic file-system based routing solution for express.",
      image: {
        url: "https://github.com/schinwald/express-otter/blob/development/logo.png?raw=true",
        alt: "Express Otter logo",
      },
    },
    {
      index: 2,
      category: "website" as const,
      repository: "https://github.com/schinwald/cartera",
      title: "Cartera",
      description:
        "A cryptocurrency wallet manager that streamlines transactions, removes barriers, and emphasizes transparency without compromising security.",
      image: {
        url: "https://github.com/schinwald/cartera/blob/main/preview.jpg?raw=true",
        alt: "Cartera logo",
      },
    },
    {
      index: 3,
      category: "game" as const,
      repository: "https://github.com/schinwald/pets",
      title: "Pets",
      description:
        "A small game demo, where you watch your pets move around and eat food from their food bowl.",
      image: {
        url: "https://github.com/schinwald/pets/blob/main/preview.webp?raw=true",
        alt: "Pets logo",
      },
    },
    {
      index: 4,
      category: "website" as const,
      repository: "https://github.com/schinwald/weather-or-not",
      title: "Weather or Not",
      description: "A playful dashboard for displaying the weather.",
      image: {
        url: "https://github.com/schinwald/weather-or-not/blob/main/preview.jpg?raw=true",
        alt: "Weather or Not logo",
      },
    },
    {
      index: 5,
      category: "website" as const,
      repository: "https://github.com/schinwald/calculato",
      title: "Calculato",
      description: "A simple calculator app with an intelligent state machine.",
      image: {
        url: "https://github.com/schinwald/calculato/blob/main/preview.png?raw=true",
        alt: "Calculato logo",
      },
    },
    {
      index: 6,
      category: "cli" as const,
      repository: "https://github.com/schinwald/easel",
      title: "Easel",
      description:
        "An easy to use terminal colorizer with support streamed input.",
      image: {
        url: "https://raw.githubusercontent.com/schinwald/easel/refs/heads/development/logo.svg",
        alt: "Easel",
      },
    },
  ];

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn(
        "-my-28 relative flex w-screen flex-row justify-center py-28",
        className,
      )}
    >
      <Container variant="narrow">
        <div className="relative flex w-full max-w-(--breakpoint-md) flex-row justify-end">
          <Header title="Projects" align="right" variant="cascade" />
        </div>
        <div
          ref={projectContainerRef}
          className="flex w-full flex-row items-end gap-6 overflow-x-auto -mt-28 -mb-12 snap-x snap-mandatory"
        >
          {projects.map((project, index) => {
            const n = projects.length - 1;
            const start = (index - 1) / n;
            const end = index / n;
            const scrollProgress = useTransform(
              scrollXProgress,
              [start, end],
              [0, 1],
            );
            return (
              <Project
                key={project.index}
                className="mb-12 snap-start"
                scrollProgress={scrollProgress}
                {...project}
              />
            );
          })}
          <div className="mb-12 opacity-20 relative flex h-[520px] shrink-0 grow-0 basis-[calc(33.333%-16px)] w-full flex-col justify-between gap-6 rounded-md border border-[#fff2] bg-background-overlay p-8 text-white"></div>
          <div className="mb-12 opacity-20 relative flex h-[520px] shrink-0 grow-0 basis-[calc(33.333%-16px)] w-full flex-col justify-between gap-6 rounded-md border border-[#fff2] bg-background-overlay p-8 text-white"></div>
        </div>
      </Container>
    </div>
  );
};

export { Projects };
