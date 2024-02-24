import { Overlay } from '@/components/overlay'
import { useNavigationStore } from '@/stores/navigation'
import { motion, useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

type NavigationProps = {
  className?: string
}

const Navigation: React.FC<NavigationProps> = () => {
  const [isNavigating, endNavigation] = useNavigationStore(
    useShallow((state) => [state.isNavigating, state.endNavigation])
  )
  const [backgroundRef, animateBackground] = useAnimate()

  useEffect(() => {
    if (isNavigating) {
      animateBackground(backgroundRef.current, {
        width: ['0%', '200%'],
        opacity: [1, 1]
      }, {
        duration: 0.2,
        ease: 'easeOut',
        delay: 0.3,
        onComplete: () => {
          endNavigation()
        }
      })
    }
  }, [isNavigating])

  return (
    <Overlay
      className='pointer-events-none z-50'
      position='fixed'
    >
      <motion.div
        ref={backgroundRef}
        className='absolute h-full opacity-0 bg-background -skew-x-6 translate-x-[-100px]'
      >
      </motion.div>
    </Overlay>
  )
}

export { Navigation }
