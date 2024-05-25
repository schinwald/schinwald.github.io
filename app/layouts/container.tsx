import React, { type PropsWithChildren } from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '~/utils/classname'

const containerVariants = cva(
  'w-full flex flex-col gap-10',
  {
    variants: {
      variant: {
        narrow: "px-6 sm:px-16 max-w-screen-md",
        hybrid: "px-0 sm:px-16 max-w-screen-md",
        wide: "w-screen",
      }
    }
  }
)

type Props = {} & 
VariantProps<typeof containerVariants> &
React.HTMLAttributes<HTMLDivElement>

const Container = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>((
  {
    className,
    variant,
    children,
  }, 
  ref
) => {
  return (
    <div 
      ref={ref}
      className={cn(
        containerVariants({ variant, className })
      )}
    >
      {children}
    </div>
  )
})

export { Container }
