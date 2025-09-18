import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "~/utils/classname";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "data-[side=bottom]:animate-pop-in-from-bottom data-[side=left]:animate-pop-in-from-left data-[side=right]:animate-pop-in-from-right data-[side=top]:animate-pop-in-from-top",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipPortal,
};
