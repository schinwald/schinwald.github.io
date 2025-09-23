import type React from "react";
import { cn } from "~/utils/classname";

type UnderConstructionProps = {
  className?: string;
};

const UnderConstruction: React.FC<UnderConstructionProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 text-foreground",
        className,
      )}
    >
      <h2>Under Construction</h2>
      <p>Please come back at another time.</p>
    </div>
  );
};

export { UnderConstruction };
