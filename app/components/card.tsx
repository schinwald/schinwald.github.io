import { cva, type VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { cn } from "~/utils/classname";

const rootStyles = cva("flex flex-col relative", {
  variants: {
    size: {
      xs: null,
      sm: "p-2 gap-2",
      md: "p-4 gap-4",
      lg: "p-6 gap-4",
      xl: "p-8 gap-4",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type RootProps = PropsWithChildren &
  VariantProps<typeof rootStyles> & {
    className?: string;
  };

export const Root: React.FC<RootProps> = ({ children, className, size }) => {
  return (
    <div className="w-full h-full grid">
      <div className="row-span-full rounded-md col-span-full bg-background-overlay backdrop-blur-lg opacity-40" />
      <div
        className={cn(
          "overflow-clip outline outline-[#fff2] text-foreground-overlay rounded-md row-span-full col-span-full flex flex-col relative gap-4",
          rootStyles({ size }),
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

type HeaderProps = PropsWithChildren & { className?: string };

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {children}
    </div>
  );
};

type ContentProps = PropsWithChildren & { className?: string };

export const Content: React.FC<ContentProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
