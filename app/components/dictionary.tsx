import { PropsWithChildren } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/primitives/ui/tooltip"

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        {children}
      </Tooltip>
    </TooltipProvider>
  )
}

export const Word: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipTrigger>
      <span className='underline decoration-dashed decoration-tertiary italic cursor-help'>
        {children}
      </span>
    </TooltipTrigger>
  )
}

export const Explanation: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipContent className='bg-background-soft p-4 rounded-md border-none outline max-w-xs'>
      {children}
    </TooltipContent>
  )
}
