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

const Root: React.FC<RootProps> = ({ children, className, size }) => {
  return (
    <div className="grid h-full w-full">
      <div
        className={cn(
          "relative col-span-full row-span-full flex flex-col gap-4 overflow-clip rounded-md bg-background-overlay text-foreground-overlay outline outline-[#fff2]",
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

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {children}
    </div>
  );
};

type ContentProps = PropsWithChildren & { className?: string };

const Content: React.FC<ContentProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const Card = {
  Root,
  Header,
  Content,
};
