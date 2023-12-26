import React, { type PropsWithChildren } from 'react'
import { cn } from '@/utils'

type Props = {
  className?: string
}

const Container: React.FC<PropsWithChildren<Props>> = ({ className, children, ...props }) => {
  return (
    <div 
      className={cn(
        className,
        'w-full max-w-screen-md flex flex-col gap-10 px-16'
      )}
    >
      {children}
    </div>
  )
}

export { Container }
