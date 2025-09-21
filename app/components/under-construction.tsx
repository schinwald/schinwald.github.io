import type React from "react";
import { cn } from "~/utils/classname";

type UnderConstructionProps = {
  className?: string;
};

const UnderConstruction: React.FC<UnderConstructionProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "text-foreground flex flex-col w-full h-full justify-center items-center gap-2",
        className,
      )}
    >
      <h2>Under Construction</h2>
      <p>Please come back at another time.</p>
    </div>
  );
};

export { UnderConstruction };
