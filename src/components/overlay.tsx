import { forwardRef, type PropsWithChildren } from "react"
import { cn } from '@/utils'
import { motion } from 'framer-motion'

type Props = {
  className?: string
  position: 'absolute' | 'fixed'
}

const Overlay = forwardRef<HTMLDivElement, Props & PropsWithChildren>((props, ref) => {
  const { className, children, position, ...otherProps } = props

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
