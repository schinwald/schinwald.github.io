import { useInView } from "framer-motion";
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

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn(
        "relative w-screen flex flex-row justify-center py-28 -my-28",
        className,
      )}
    >
      <Container variant="narrow">
        <div className="relative w-full max-w-(--breakpoint-md) flex flex-row justify-end">
          <Header title="Projects" align="right" variant="cascade" />
        </div>
        <div className="flex flex-row items-end w-full gap-6 -mt-28">
          <Project
            className="h-[628px]"
            index={1}
            category="library"
            repository="https://github.com/schinwald/express-otter"
            title="Express Otter"
            description="An automatic file-system based routing solution for express."
            image={{
              url: "https://github.com/schinwald/express-otter/blob/development/logo.png?raw=true",
              alt: "Express Otter logo",
            }}
          />
          <Project
            index={2}
            repository="https://github.com/schinwald/cartera"
            category="finance"
            title="Cartera"
            description="A cryptocurrency wallet manager that streamlines transactions, removes barriers, and emphasizes transparency without compromising security."
            image={{
              url: "https://github.com/schinwald/cartera/blob/main/preview.jpg?raw=true",
              alt: "Cartera logo",
            }}
          />
          <Project
            index={3}
            repository="https://github.com/schinwald/pets"
            category="game"
            title="Pets"
            description="A small game demo, where you watch your pets move around and eat food from their food bowl."
            image={{
              url: "https://github.com/schinwald/pets/blob/main/preview.webp?raw=true",
              alt: "Pets logo",
            }}
          />
          {/* <Project */}
          {/*   title="Weather or Not" */}
          {/*   repository="https://github.com/schinwald/weather-or-not" */}
          {/*   image={{ */}
          {/*     url: "https://github.com/schinwald/weather-or-not/blob/main/preview.jpg?raw=true", */}
          {/*     alt: "Weather or Not logo", */}
          {/*   }} */}
          {/* /> */}
          {/* <Project */}
          {/*   title="Calculato" */}
          {/*   repository="https://github.com/schinwald/calculato" */}
          {/*   image={{ */}
          {/*     url: "https://github.com/schinwald/calculato/blob/main/preview.png?raw=true", */}
          {/*     alt: "Calculato logo", */}
          {/*   }} */}
          {/* /> */}
        </div>
      </Container>
    </div>
  );
};

export { Projects };
