import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from 'framer-motion'

import { cn } from "@/utils/classname"
import { useAnimate } from "framer-motion"
import { useNavigationStore } from "@/hooks/stores/navigation"

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-display ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 uppercase rounded-md text-md md:text-xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary font-bold text-primary p-2",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-14 py-6",
        sm: "h-9 rounded-md px-5",
        lg: "h-11 rounded-md px-14",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, children, href, onClick, ...props }, ref) => {
    const [backgroundRef, animateBackground] = useAnimate()
    const startNavigation = useNavigationStore((state) => state.startNavigation)

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'relative overflow-hidden',
          linkVariants({ variant, size, className }),
        )}
        onClick={(event) => {
          event.preventDefault()

          if (href) {
            startNavigation(href)

            animateBackground(backgroundRef.current, {
              width: ['0%', '200%'],
            }, {
              duration: 0.4
            })
          }

          onClick?.(event)
        }}
        {...props}
      >
        <
          motion.div
          ref={backgroundRef}
          className='absolute right-0 bg-background h-full -skew-x-6 translate-x-[100px] border-l-[80px] border-l-white'
        ></motion.div>
        {children}
      </a>
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }
