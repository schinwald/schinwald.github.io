import * as React from "react";

import { cn } from "~/utils/classname";

type RootProps = React.HTMLAttributes<HTMLDivElement>;

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row px-3 bg-white rounded-md border border-[#fff2] has-focus-visible:outline-hidden has-focus-visible:ring-2 has-focus-visible:ring-white has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Root.displayName = "Root";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Field = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] bg-transparent w-full py-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
