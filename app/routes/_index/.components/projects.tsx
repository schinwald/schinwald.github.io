import type React from "react";
import { Header } from "~/components/header";
import { Project } from "~/components/project";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";

type ProjectsProps = {
  className?: string;
};

const Projects: React.FC<ProjectsProps> = ({ className }) => {
  return (
    <div
      id="projects"
      className={cn(
        "relative w-screen flex flex-row justify-center py-28 -my-28",
        className,
      )}
    >
      <Container variant="narrow">
        <div className="relative w-full max-w-(--breakpoint-md) flex flex-row justify-end">
          <Header title="Projects" align="right" variant="cascade" />
        </div>
        <div className="flex flex-row items-center w-full gap-6">
          <Project
            className="h-[628px] -mt-32"
            index={1}
            category="library"
            repository="https://github.com/schinwald/express-otter"
            title="Express Otter"
            description="A simple, open-source, and self-hosted ecommerce platform."
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
            description="A simple, open-source, and self-hosted ecommerce platform."
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
            description="A simple, open-source, and self-hosted ecommerce platform."
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
