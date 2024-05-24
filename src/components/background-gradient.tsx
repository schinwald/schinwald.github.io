import React from 'react'
import { cn } from '@/utils/classname'

type BackgroundGradientProps = {
  className?: string
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute z-100 top-0 left-0 h-screen w-screen opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,1)0%,rgba(0,212,255,0)100%)] pointer-events-none",
        className
      )}
    >
    </div>
  )
}

export { BackgroundGradient }
