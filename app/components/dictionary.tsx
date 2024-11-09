import { PropsWithChildren } from "react"
import { FaInfoCircle } from "react-icons/fa"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
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
    <TooltipTrigger asChild>
      <span className='underline decoration-dashed decoration-tertiary italic cursor-help'>
        {children}
      </span>
    </TooltipTrigger>
  )
}

export const Explanation: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TooltipContent sideOffset={5} className='bg-background-soft p-6 rounded-md border-none max-w-xs'>
      <div className='flex flex-col items-start gap-4'>
        <p className='inline-flex items-center gap-2 text-tertiary'>
          <FaInfoCircle className='w-4 h-4' />
          Explanation
        </p>
        {children}
      </div>
      <TooltipArrow height={15} width={20} className='fill-background-soft' />
    </TooltipContent>
  )
}
