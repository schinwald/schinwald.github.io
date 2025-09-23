import { css, keyframes } from "@emotion/css";
import type React from "react";
import type { PropsWithChildren } from "react";
import { cn } from "~/utils/classname";

const spinAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) scale(200%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) scale(200%) rotate(360deg);
  }
`;

const spinCSS = css`
  &::before {
    left: 50%;
    top: 50%;
    animation: ${spinAnimation} 3s linear infinite;
  }
`;

type BorderRotatingProps = {
  className?: string;
};

const BorderRotating: React.FC<PropsWithChildren<BorderRotatingProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg shadow-lg shadow-white/10",
        "before:absolute before:z-0 before:block before:aspect-square before:min-h-full before:min-w-full before:rounded-lg",
        "before:bg-conic before:from-primary before:via-tertiary before:to-secondary before:blur-xs",
        "after:-translate-x-1/2 after:-translate-y-1/2 after:absolute after:top-1/2 after:left-1/2 after:z-0 after:block after:h-[calc(100%-6px)] after:w-[calc(100%-6px)] after:rounded-[8px] after:bg-background-soft",
        spinCSS,
        className,
      )}
    >
      <div className="relative z-1 flex flex-col gap-6 p-10">{children}</div>
    </div>
  );
};

export { BorderRotating };
