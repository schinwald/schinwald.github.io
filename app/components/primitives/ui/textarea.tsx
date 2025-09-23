import {
  forwardRef,
  type HTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "~/utils/classname";

type RootProps = HTMLAttributes<HTMLDivElement>;

const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row rounded-md border border-[#fff2] bg-white px-3 has-focus-visible:outline-hidden has-focus-visible:ring-2 has-focus-visible:ring-white has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
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
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Field = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full bg-transparent py-2 text-black placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Field.displayName = "Field";

export const Textarea = { Root, Field };
