import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/utils/classname"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-display rounded-md ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 uppercase rounded-md text-md md:text-xl focus-visible:outline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:outline",
        outline: "border border-input bg-background-soft hover:bg-accent hover:text-accent-foreground focus-visible:outline",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none",
      },
      size: {
        default: "h-10 px-8 py-4",
        sm: "h-9 rounded-md px-5",
        lg: "h-11 rounded-md px-14",
        icon: "h-10 w-10",
        minimal: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
