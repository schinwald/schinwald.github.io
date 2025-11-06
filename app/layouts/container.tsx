import { cva, type VariantProps } from "class-variance-authority";
import React, { type PropsWithChildren } from "react";
import { cn } from "~/utils/classname";

const containerVariants = cva("w-full flex flex-col gap-10", {
  variants: {
    variant: {
      narrow: "px-4 sm:px-16 max-w-(--breakpoint-md)",
      hybrid: "px-0 sm:px-16 max-w-(--breakpoint-md)",
      normal: "px-8 max-w-(--breakpoint-lg)",
      wide: "w-full",
    },
  },
});

type Props = {} & VariantProps<typeof containerVariants> &
  React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ className, variant, children }, ref) => {
    return (
      <div ref={ref} className={cn(containerVariants({ variant, className }))}>
        {children}
      </div>
    );
  },
);
Container.displayName = "Container";

export { Container };
