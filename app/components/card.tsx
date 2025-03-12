import { type VariantProps, cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { cn } from "~/utils/classname";

const rootStyles = cva("flex flex-col relative", {
	variants: {
		size: {
			sm: "p-2 gap-2",
			md: "p-4 gap-4",
			lg: "p-6 gap-4",
		},
	},
	defaultVariants: {
		size: "lg",
	},
});

type RootProps = PropsWithChildren & VariantProps<typeof rootStyles>;

export const Root: React.FC<RootProps> = ({ children, size }) => {
	return (
		<div className=" text-foreground-overlay rounded-md w-full h-full gap-4 grid overflow-clip outline outline-1 outline-[#fff2]">
			<div className="row-span-full col-span-full bg-background-overlay backdrop-blur-lg opacity-40" />
			<div
				className={cn(
					"row-span-full col-span-full flex flex-col relative gap-4",
					rootStyles({ size }),
				)}
			>
				{children}
			</div>
		</div>
	);
};

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-row items-center gap-2">
			<h3>{children}</h3>
		</div>
	);
};

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
	return <div>{children}</div>;
};
