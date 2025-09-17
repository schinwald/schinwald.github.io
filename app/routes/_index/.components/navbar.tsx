import { useEffect } from "react";
import * as Tab from "~/components/tab";
import { useTabMotion } from "~/components/tab";
import { useProgress } from "~/hooks/progress";
import { cn } from "~/utils/classname";

export const Navbar = () => {
  const { steps, progress } = useProgress();
  const tabMotion = useTabMotion();

  useEffect(() => {
    tabMotion.setActiveIndex(progress);
  }, [progress, tabMotion.setActiveIndex]);

  const [aboutId, projectsId, articlesId, testimonialsId, contactId] = steps;

  return (
    <div className="sticky -mt-48 mb-32 top-10 z-40 flex flex-row justify-center">
      <Tab.Root tabMotion={tabMotion}>
        <div className="pl-[3px] pr-2">
          <Tab.Item index={0}>
            <a
              className={cn("font-display uppercase px-4 text-lg h-full flex")}
              href="/"
              tabIndex={-1}
            >
              Home
            </a>
          </Tab.Item>
        </div>
        <div className="pl-2 pr-[3px]">
          <Tab.Item index={1}>
            <a
              className={cn("font-display uppercase px-3 text-lg h-full flex")}
              href={`#${aboutId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              About
            </a>
          </Tab.Item>
          <Tab.Item index={2}>
            <a
              className={cn("font-display uppercase px-3 text-lg h-full flex")}
              href={`#${projectsId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Projects
            </a>
          </Tab.Item>
          <Tab.Item index={3}>
            <a
              className={cn("font-display uppercase px-3 text-lg h-full flex")}
              href={`#${articlesId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Articles
            </a>
          </Tab.Item>
          <Tab.Item index={4}>
            <a
              className={cn("font-display uppercase px-3 text-lg h-full flex")}
              href={`#${testimonialsId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Testimonials
            </a>
          </Tab.Item>
          <Tab.Item index={5}>
            <a
              className={cn("font-display uppercase px-3 text-lg h-full flex")}
              href={`#${contactId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Contact
            </a>
          </Tab.Item>
        </div>
      </Tab.Root>
    </div>
  );
};
