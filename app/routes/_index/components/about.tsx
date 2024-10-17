import React, { useEffect, useRef } from 'react'
import { Header } from '~/components/header'
import { Socials } from '~/components/socials'
import profileImage from '~/assets/images/profile.webp'
import { Container } from '~/layouts/container'
import { Link } from '~/components/primitives/ui/link'
import { useAnimate, useInView, stagger } from 'framer-motion'
import { cn } from '~/utils/classname'
import {
  RxCross2 as CrossIcon
} from "react-icons/rx";
import {
  PiSquareLight as SquareIcon,
  PiTriangleThin as TriangleIcon
} from "react-icons/pi";

type AboutProps = {
  className?: string
}

const About: React.FC<AboutProps> = ({
  className
}) => {
  const [imageRef, animateImage] = useAnimate()
  const [socialsRef, animateSocials] = useAnimate()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, {
    margin: "-200px 0px",
    once: true,
  })

  const yearsOfExperience = (() => {
    const previousYear = new Date('2022-06-01T00:00:00')
    const currentYear = new Date()
    const years = (currentYear.getTime() - previousYear.getTime()) / (1000 * 60 * 60 * 24 * 365)
    const yearsRemainder = years % 1
    const includeHalf = yearsRemainder > 0.25 && yearsRemainder < 0.75
    if (includeHalf) return `${Math.floor(years)} and a half`
    return `${Math.round(years)}`
  })()

  useEffect(() => {
    if (isInView) {
      animateImage(imageRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        rotate: ['-6deg', '-6deg']
      }, {
        duration: 0.5,
        ease: 'easeOut'
      })

      animateSocials("li", {
        opacity: [0, 1],
        transform: ['translateY(20px)', 'translateY(0px)']
      }, {
        duration: 0.5,
        delay: stagger(0.1, { startDelay: 0.3 })
      })
    }
  }, [isInView])

  return (
    <div id='about' className={cn(
      'relative w-screen flex flex-col justify-center items-center py-20 -my-20',
      className
    )}>
      <Container
        ref={containerRef}
        variant='narrow'
      >
        <div className='flex flex-col sm:flex-row gap-10 z-30'>
          <div className='flex flex-row justify-center'>
            <div className='w-full px-16 sm:p-0 flex flex-row justify-center'>
              <div className='relative z-30 w-full sm:w-[200px] md:w-[300px] max-w-[250px] sm:max-w-full aspect-square bg-tertiary rounded-full shadow-lg'>
                <div className='absolute w-full aspect-[3/4] rounded-b-full overflow-clip bottom-[-1px]'>
                  <img
                    ref={imageRef}
                    className='absolute bottom-0 w-full aspect-[300/360] object-cover rotate-6 opacity-0'
                    src={profileImage}
                  >
                  </img>
                </div>
              </div>
            </div>
          </div>
          <div className='relative flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-row'>
                <Header
                  className='text-left'
                  title='About Me'
                  align='left'
                  variant='typist'
                />
              </div>
              <p className='text-foreground opacity-70'>
                {`
                  Hey there! I'm a software engineer based in Toronto, ON, who loves solving problems and bringing ideas to life through code. I work across the stack and enjoy making apps that are both fun and functional. Whether it's tweaking a UI or optimizing the backend, I love building smooth, user-friendly experiences.
                `}
              </p>
            </div>
            <div className='flex flex-row gap-6 items-start'>
              <Link
                href='/about/learn-more'
                variant='default'
              >
                Learn more
              </Link>
              <Socials
                ref={socialsRef}
                variant='minimal'
              />
            </div>
            <div className='absolute right-10 -top-2 h-[60px] w-[60px] pointer-events-none'>
              <CrossIcon className='w-full h-full text-secondary opacity-40 animate-spin-slow' />
            </div>
            <div className='absolute -top-48 left-10 sm:hidden md:block sm:left-auto sm:top-auto sm:right-28 sm:-bottom-6 md:left-auto md:top-auto md:right-28 md:-bottom-6 h-[60px] w-[60px] pointer-events-none'>
              <SquareIcon className='w-full h-full text-secondary opacity-30 animate-spin direction-reverse' />
            </div>
            <div className='absolute -top-64 right-10 sm:hidden md:block sm:top-auto sm:-right-10 sm:left-auto sm:-bottom-24 md:top-auto md:-right-10 md:left-auto md:-bottom-24 h-[150px] w-[150px] pointer-events-none'>
              <TriangleIcon className='w-full h-full text-secondary opacity-50 animate-spin-slow' />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { About }
