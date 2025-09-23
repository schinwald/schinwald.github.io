import type { PropsWithChildren } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/primitives/ui/tooltip";
import { useOverlay } from "~/hooks/overlay";

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const { setIsOpen } = useOverlay();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        {children}
      </Tooltip>
    </TooltipProvider>
  );
};

const Word: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipTrigger asChild>
      <span className="cursor-help italic underline decoration-tertiary decoration-wavy">
        {children}
      </span>
    </TooltipTrigger>
  );
};

const Explanation: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipPortal>
      <TooltipContent
        sideOffset={7}
        className="z-50 max-w-xs rounded-md border-tertiary/50 border-b-1 bg-background-overlay p-6 shadow-lg shadow-tertiary/10"
      >
        <div className="flex flex-col items-start gap-4 text-white">
          <p className="inline-flex items-center gap-2 text-tertiary">
            <FaInfoCircle className="h-4 w-4" />
            Explanation
          </p>
          {children}
        </div>
      </TooltipContent>
    </TooltipPortal>
  );
};

export const Dictionary = { Root, Word, Explanation };
