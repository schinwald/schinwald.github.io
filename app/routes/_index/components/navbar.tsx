import { useEffect } from "react";
import { Tab } from "~/components/tab";
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
    <div className="-mt-48 sticky top-10 z-40 mb-32 flex flex-row justify-center">
      <Tab.Root tabMotion={tabMotion}>
        <div className="pr-2 pl-[3px]">
          <Tab.Item index={0}>
            <a
              className={cn("flex h-full px-4 font-display text-lg uppercase")}
              href="/"
              tabIndex={-1}
            >
              Home
            </a>
          </Tab.Item>
        </div>
        <div className="pr-[3px] pl-2">
          <Tab.Item index={1}>
            <a
              className={cn("flex h-full px-3 font-display text-lg uppercase")}
              href={`#${aboutId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              About
            </a>
          </Tab.Item>
          <Tab.Item index={2}>
            <a
              className={cn("flex h-full px-3 font-display text-lg uppercase")}
              href={`#${projectsId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Projects
            </a>
          </Tab.Item>
          <Tab.Item index={3}>
            <a
              className={cn("flex h-full px-3 font-display text-lg uppercase")}
              href={`#${articlesId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Articles
            </a>
          </Tab.Item>
          <Tab.Item index={4}>
            <a
              className={cn("flex h-full px-3 font-display text-lg uppercase")}
              href={`#${testimonialsId}`}
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              Testimonials
            </a>
          </Tab.Item>
          <Tab.Item index={5}>
            <a
              className={cn("flex h-full px-3 font-display text-lg uppercase")}
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
