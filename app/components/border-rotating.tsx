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
				"relative overflow-hidden rounded-lg shadow-white/10 shadow-lg",
				"before:block before:rounded-lg before:aspect-square before:absolute before:min-w-full before:min-h-full before:z-0",
				"before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-primary before:via-tertiary before:to-secondary before:blur-sm",
				"after:block after:rounded-[8px] after:absolute after:bg-background-soft after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%-6px)] after:h-[calc(100%-6px)] after:z-0",
				spinCSS,
				className,
			)}
		>
			<div className="flex flex-col gap-6 p-10 relative z-[1]">{children}</div>
		</div>
	);
};

export { BorderRotating };
