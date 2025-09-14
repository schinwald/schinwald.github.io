import { Slot } from "@radix-ui/react-slot";
import { cn } from "app/utils/classname";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-transform duration-200 cursor-pointer text-left transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 uppercase rounded-md text-md md:text-xl font-display text-center whitespace-nowrap",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md focus-visible:outline font-display text-center whitespace-nowrap",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground rounded-md focus-visible:outline font-display text-center whitespace-nowrap",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md focus-visible:outline font-display text-center whitespace-nowrap",
        ghost: "hover:opacity-50 font-display",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-hidden font-display",
        unstyled: "",
      },
      size: {
        default: "h-10 px-8 py-4 text-md",
        sm: "h-9 rounded-md px-5 text-sm",
        lg: "h-11 rounded-md px-14 text-lg",
        icon: "h-10 w-10",
        minimal: "text-sm",
        unstyled: "",
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
        type="button"
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
