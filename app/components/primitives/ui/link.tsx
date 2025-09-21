import { cva, type VariantProps } from "class-variance-authority";
import { motion, useAnimate } from "framer-motion";
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { LuArrowUpRight as Arrow } from "react-icons/lu";
import { useNavigationStore } from "~/components/navigation";
import { cn } from "~/utils/classname";

const LinkContext = createContext<{ isHovered: boolean } | null>(null);

const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinkContext must be used within a LinkContextProvider");
  }
  return context;
};

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-transform duration-200 transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-md hover:bg-primary/90 uppercase font-display rounded-md text-md md:text-xl",
        destructive:
          "bg-destructive text-destructive-foreground rounded-md font-display hover:bg-destructive/90",
        outline:
          "border border-primary font-bold rounded-md text-primary font-display p-2",
        secondary:
          "bg-secondary text-secondary-foreground rounded-md font-display hover:bg-secondary/80",
        ghost: "hover:opacity-50 font-display",
        link: "text-primary underline-offset-4 font-display hover:underline",
        nostyle: "",
      },
      size: {
        default: "h-10 px-8 py-4 text-md",
        sm: "h-9 rounded-md px-5 text-sm",
        lg: "h-11 rounded-md px-14 text-lg",
        icon: "h-10 w-10",
        minimal: "text-sm",
      },
      click: {
        default: null,
        "squish-lightly": "scale-95 opacity-90",
        "squish-normally": "scale-75 opacity-90",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof linkVariants> {
  from?: "left" | "right";
  to: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      from,
      to,
      variant,
      size,
      click = "default",
      children,
      onKeyDown = () => {},
      onKeyUp = () => {},
      onMouseDown = () => {},
      onMouseUp = () => {},
      onMouseLeave = () => {},
      onClick = () => {},
      ...props
    },
    ref,
  ) => {
    const [backgroundRef, animateBackground] = useAnimate();
    const navigate = useNavigationStore((state) => state.startNavigationExit);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <LinkContext.Provider value={{ isHovered }}>
        <a
          ref={ref}
          href={to}
          className={cn(
            "relative overflow-hidden",
            linkVariants({
              variant,
              size,
              click: isPressed ? click : "default",
              className,
            }),
          )}
          onKeyDown={(event) => {
            setIsPressed(true);
            onKeyDown(event);
          }}
          onKeyUp={(event) => {
            setIsPressed(false);
            onKeyUp(event);
          }}
          onMouseDown={(event) => {
            setIsPressed(true);
            onMouseDown(event);
          }}
          onMouseUp={(event) => {
            setIsPressed(false);
            onMouseUp(event);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={(event) => {
            setIsPressed(false);
            setIsHovered(false);
            onMouseLeave(event);
          }}
          onClick={(event) => {
            event.preventDefault();

            if (to) {
              navigate({ type: from ?? "left", location: to });

              if (from) {
                animateBackground(
                  backgroundRef.current,
                  {
                    width: ["0%", "200%"],
                  },
                  {
                    duration: 0.4,
                  },
                );
              }
            }

            onClick(event);
          }}
          {...props}
        >
          <motion.div
            ref={backgroundRef}
            className="absolute right-0 bg-background h-full -skew-x-6 translate-x-[100px] border-l-[80px] border-l-white z-10"
          />
          {children}
        </a>
      </LinkContext.Provider>
    );
  },
);
Link.displayName = "Link";

type LinkArrowProps = {
  className?: string;
};

const LinkArrow: React.FC<LinkArrowProps> = ({ className }) => {
  const { isHovered } = useLinkContext();

  return (
    <div className="relative overflow-hidden ml-2 -mr-3">
      <motion.div
        className="relative"
        animate={
          isHovered
            ? {
                x: 20,
                y: -20,
                opacity: 0,
              }
            : {
                x: 0,
                y: 0,
                opacity: 1,
              }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Arrow className={cn(className)} />
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={
          isHovered
            ? {
                x: 0,
                y: 0,
                opacity: 1,
              }
            : {
                x: -20,
                y: 20,
                opacity: 0,
              }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Arrow className={cn(className)} />
      </motion.div>
    </div>
  );
};

export { Link, LinkArrow, linkVariants, useLinkContext };
