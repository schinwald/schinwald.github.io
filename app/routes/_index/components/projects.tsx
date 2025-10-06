import { useInView, useScroll } from "framer-motion";
import type React from "react";
import { useEffect, useRef } from "react";
import {
  FaArrowAltCircleLeft as ArrowLeftIcon,
  FaArrowAltCircleRight as ArrowRightIcon,
} from "react-icons/fa";
import { Header } from "~/components/header";
import { Button } from "~/components/primitives/ui/button";
import { Project } from "~/components/project";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";

type ProjectsProps = {
  id: string;
  className?: string;
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
        <div className="relative">
          <div
            ref={projectContainerRef}
            className="flex w-full flex-row items-end gap-6 overflow-x-auto -mt-28 -mb-12 snap-x snap-mandatory"
          >
            {projects.map((project, index) => {
              return (
                <Project
                  key={project.title}
                  index={index}
                  length={projects.length}
                  className="mb-12 snap-start"
                  scrollProgress={scrollXProgress}
                  {...project}
                />
              );
            })}
            <div className="mb-12 opacity-20 relative flex h-[520px] shrink-0 grow-0 basis-[calc(33.333%-16px)] w-full flex-col justify-between gap-6 rounded-md border border-[#fff2] bg-background-overlay p-8 text-white"></div>
            <div className="mb-12 opacity-20 relative flex h-[520px] shrink-0 grow-0 basis-[calc(33.333%-16px)] w-full flex-col justify-between gap-6 rounded-md border border-[#fff2] bg-background-overlay p-8 text-white"></div>
          </div>
          <Button
            className="absolute right-[100%] top-[50%] translate-y-[-50%] rounded-full"
            variant="ghost"
            onClick={() => {
              const section =
                (projectContainerRef.current?.scrollWidth ?? 0) /
                (projects.length + 2);

              projectContainerRef.current?.scrollTo({
                left: projectContainerRef.current?.scrollLeft - section,
                behavior: "smooth",
              });
            }}
          >
            <ArrowLeftIcon className="size-8 text-white" />
          </Button>
          <Button
            className="absolute left-[100%] top-[50%] translate-y-[-50%] rounded-full"
            variant="ghost"
            onClick={() => {
              const section =
                (projectContainerRef.current?.scrollWidth ?? 0) /
                (projects.length + 2);

              projectContainerRef.current?.scrollTo({
                left: projectContainerRef.current?.scrollLeft + section,
                behavior: "smooth",
              });
            }}
          >
            <ArrowRightIcon className="size-8 text-white" />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export { Projects };
