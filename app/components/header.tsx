import type { Variants } from "framer-motion";
import { motion, useInView } from "framer-motion";
import type React from "react";
import { type JSX, useRef } from "react";
import { cn } from "~/utils/classname";

type HeaderProps = {
  className?: string;
  title: string;
  align: "center" | "left" | "right";
  variant: "typist" | "cascade";
};

const containerVariant: Variants = {
  hidden: {},
  slide_up: {
    transition: {
      delayChildren: 10,
      delay: 10,
    },
  },
};

const textVariant: Variants = {
  hidden: {
    translateY: 50,
    opacity: 0,
  },
  slide_up: (i) => ({
    translateY: 0,
    opacity: (() => {
      switch (i) {
        case 1:
          return 0.5;
        case 2:
          return 0.2;
      }
      return 1;
    })(),
    transition: {
      duration: 0.3,
      delay: Math.log2(0.5 * i + 1.0),
      ease: "easeOut",
    },
  }),
};

const lineVariant = {
  hidden: {
    opacity: 0,
    width: "0%",
    transition: {
      duration: 0,
    },
  },
  slide_right: {
    opacity: 1,
    width: "100%",
    transition: {
      duration: 0.7,
    },
  },
};

const Header: React.FC<HeaderProps> = ({
  className,
  title,
  align,
  variant,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-200px 0px" });

  let text: JSX.Element;

  const centerPadding = "pax-4 md:px-8";
  const leftPadding = "pr-8 md:pr-16";
  const rightPadding = "pl-8 md:pl-16";

  function handleAlignment<T>({
    center,
    left,
    right,
  }: {
    center: T;
    left: T;
    right: T;
  }): T {
    switch (align) {
      case "center":
        return center;
      case "left":
        return left;
      case "right":
        return right;
    }
  }

  switch (variant) {
    case "typist":
      text = (
        <div
          className={cn(
            handleAlignment({
              center: centerPadding,
              left: leftPadding,
              right: rightPadding,
            }),
            "uppercase",
          )}
        >
          <div className="flex flex-row items-center gap-1">
            <h1 className="text-foreground whitespace-nowrap">{title}</h1>
          </div>
        </div>
      );
      break;
    case "cascade":
      text = (
        <motion.div
          initial="hidden"
          animate={isInView && "slide_up"}
          variants={containerVariant}
          className={cn(
            handleAlignment({
              center: centerPadding,
              left: leftPadding,
              right: rightPadding,
            }),
            "uppercase overflow-hidden flex flex-col gap-1 pt-2",
          )}
        >
          <motion.h1
            custom={2}
            variants={textVariant}
            className="text-background-soft whitespace-nowrap z-0 relative"
            style={{
              textShadow:
                "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff9, -1px 1px 0 #fff",
            }}
          >
            {title}
          </motion.h1>
          <motion.h1
            custom={1}
            variants={textVariant}
            className="text-background-soft whitespace-nowrap z-10 relative"
            style={{
              textShadow:
                "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
            }}
          >
            {title}
          </motion.h1>
          <h1 className="text-foreground z-20 relative">{title}</h1>
        </motion.div>
      );
      break;
  }

  return (
    <div
      ref={ref}
      className={cn(className, "w-[fit-content] whitespace-nowrap")}
    >
      {text}
      <motion.hr
        initial="hidden"
        animate={isInView && "slide_right"}
        variants={lineVariant}
        className="border-[2px] border-secondary mt-1"
      />
    </div>
  );
};

export { Header };
