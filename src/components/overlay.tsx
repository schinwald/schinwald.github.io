import { forwardRef, type PropsWithChildren } from "react"
import { cn } from '@/utils/classname'
import { motion } from 'framer-motion'

type OverlayProps = {
  className?: string
  position: 'absolute' | 'fixed'
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps & PropsWithChildren>((
  { className, children, position },
  ref
) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'z-20 w-full h-full',
        position,
        className
      )}
    >
      {children}
    </motion.div>
  )
})

export { Overlay }
