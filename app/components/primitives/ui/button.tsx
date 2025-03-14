import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils/classname";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap font-display rounded-md ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 transition-transform duration-200",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 uppercase rounded-md text-md md:text-xl focus-visible:outline",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:outline",
				outline:
					"border border-input hover:bg-accent hover:text-accent-foreground focus-visible:outline",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline",
				ghost: "hover:opacity-50",
				link: "text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none",
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
				"squish-normally": "scale-90 opacity-90",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			click = "default",
			asChild = false,
			onKeyDown = () => {},
			onKeyUp = () => {},
			onMouseDown = () => {},
			onMouseUp = () => {},
			onMouseLeave = () => {},
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const [isPressed, setIsPressed] = React.useState(false);

		return (
			<Comp
				className={cn(
					buttonVariants({
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
				onMouseLeave={(event) => {
					setIsPressed(false);
					onMouseLeave(event);
				}}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
