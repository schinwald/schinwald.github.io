import { stagger, useAnimate, useInView } from "framer-motion";
import type React from "react";
import { useEffect, useRef } from "react";
import {
  PiSquareLight as SquareIcon,
  PiTriangleThin as TriangleIcon,
} from "react-icons/pi";
import { RxCross2 as CrossIcon } from "react-icons/rx";
import profileImage from "~/assets/images/profile.webp";
import { Header } from "~/components/header";
import { Link, LinkArrow } from "~/components/primitives/ui/link";
import { Socials } from "~/components/socials";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";

type AboutProps = {
  id: string;
  className?: string;
};

const About: React.FC<AboutProps> = ({ id, className }) => {
  const [imageRef, animateImage] = useAnimate();
  const [socialsRef, animateSocials] = useAnimate();
  const { setVisible } = useProgress();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "0px 0px -500px 0px",
  });

  const profileContainerRef = useRef(null);
  const isProfileInView = useInView(profileContainerRef, {
    margin: "0px 0px -500px 0px",
    once: true,
  });

  const yearsOfExperience = (() => {
    const previousYear = new Date("2022-06-01T00:00:00");
    const currentYear = new Date();
    const years =
      (currentYear.getTime() - previousYear.getTime()) /
      (1000 * 60 * 60 * 24 * 365);
    return `${Math.round(years)}`;
  })();

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
  }, [isInView, id, setVisible]);

  useEffect(() => {
    if (isProfileInView) {
      animateImage(
        imageRef.current,
        {
          opacity: [0, 1],
          translateY: [30, 0],
          rotate: ["-6deg", "-6deg"],
        },
        {
          duration: 0.5,
          ease: "easeOut",
        },
      );

      animateSocials(
        "li",
        {
          opacity: [0, 1],
          transform: ["translateY(20px)", "translateY(0px)"],
        },
        {
          duration: 0.5,
          delay: stagger(0.1, { startDelay: 0.3 }),
        },
      );
    }
  }, [isProfileInView, imageRef, animateImage, animateSocials]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn(
        "-my-56 relative flex w-screen flex-col items-center justify-center py-56",
        className,
      )}
    >
      <Container variant="narrow">
        <div className="z-30 flex flex-col gap-10 sm:flex-row">
          <div className="flex flex-row justify-center">
            <div className="flex w-full flex-row justify-center px-16 sm:p-0">
              <div className="relative z-30 aspect-square w-full max-w-[250px] rounded-full bg-tertiary shadow-lg sm:w-[200px] sm:max-w-full md:w-[300px]">
                <div
                  ref={profileContainerRef}
                  className="absolute bottom-[-1px] aspect-3/4 w-full overflow-clip rounded-b-full"
                >
                  <img
                    ref={imageRef}
                    className="absolute bottom-0 aspect-300/360 w-full rotate-6 object-cover opacity-0"
                    src={profileImage}
                    alt="James Schinwald"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row">
                <Header
                  className="text-left"
                  title="About Me"
                  align="left"
                  variant="typist"
                />
              </div>
              <p className="text-foreground opacity-70">
                {`
                  Hey there! I'm a software engineer based in Toronto, ON, who loves solving problems and bringing ideas to life through code. I have ${yearsOfExperience}+ years of experience, work across the stack, and enjoy making apps that are both fun and functional. Whether it's tweaking a UI or optimizing the backend, I love building smooth, user-friendly experiences.
                `}
              </p>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Link
                from="left"
                to="/about/learn-more"
                variant="default"
                click="squish-lightly"
              >
                Learn more
                <LinkArrow />
              </Link>
              <Socials ref={socialsRef} variant="minimal" />
            </div>
            <div className="-top-2 pointer-events-none absolute right-10 h-[60px] w-[60px]">
              <CrossIcon className="h-full w-full animate-spin-slow text-secondary opacity-40" />
            </div>
            <div className="-top-48 sm:-bottom-6 md:-bottom-6 pointer-events-none absolute left-10 h-[60px] w-[60px] sm:top-auto sm:right-28 sm:left-auto sm:hidden md:top-auto md:right-28 md:left-auto md:block">
              <SquareIcon className="direction-reverse h-full w-full animate-spin text-secondary opacity-30" />
            </div>
            <div className="-top-64 sm:-right-10 sm:-bottom-24 md:-right-10 md:-bottom-24 pointer-events-none absolute right-10 h-[150px] w-[150px] sm:top-auto sm:left-auto sm:hidden md:top-auto md:left-auto md:block">
              <TriangleIcon className="h-full w-full animate-spin-slow text-secondary opacity-50" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { About };
