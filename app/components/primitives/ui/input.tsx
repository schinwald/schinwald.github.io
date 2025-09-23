import * as React from "react";

import { cn } from "~/utils/classname";

type RootProps = React.HTMLAttributes<HTMLDivElement>;

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row rounded-md bg-white px-3 transition-all has-focus-visible:outline-hidden has-focus-visible:ring-2 has-focus-visible:ring-white has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Root.displayName = "Root";

export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full py-5 text-black file:border-0 file:bg-transparent file:font-medium file:text-md placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Field.displayName = "Field";

export { Root, Field };
