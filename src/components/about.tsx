import React, { useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Socials } from '@/components/socials'
import profileImage from '@/assets/images/profile.webp'
import { Container } from '@/layouts/container'
import { Link } from './primitives/ui/link'
import { useAnimate, useInView, stagger } from 'framer-motion'
import { cn } from '@/utils/classname'
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
      'relative w-screen flex flex-col justify-center items-center py-8',
      className
    )}>
      <Container
        ref={containerRef}
        variant='narrow'
      >
        <div className='flex flex-col sm:flex-row gap-10 z-30'>
          <div className='flex flex-row justify-center'>
            <div className='w-full px-16 sm:p-0 flex flex-row justify-center'>
              <div className='relative w-full sm:w-[200px] md:w-[300px] max-w-[250px] sm:max-w-full aspect-square bg-tertiary rounded-full shadow-lg'>
                <div className='absolute w-full aspect-[3/4] rounded-b-full overflow-clip bottom-[-1px]'>
                  <img
                    ref={imageRef}
                    className='absolute bottom-0 w-full aspect-[300/360] object-cover rotate-6 opacity-0'
                    src={profileImage.src}
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
                  Hello! I am James, an experienced software engineer specializing in full-stack development. With a passion for problem-solving
                  and innovation, I've worked on various projects ranging from creating interactive games, crafting user-friendly websites, developing
                  CLI tools, to architecting distributed systems. My approach to work is guided by a commitment to continuous learning and user-centric
                  design, ensuring a focus on quality and collaboration. Outside of coding, I find joy in tinkering with my operating system, working
                  on soldering projects, staying fit through regular exercise, immersing myself in nature, and embracing new hobbies. Feel free to
                  explore my portfolio and reach out for collaboration opportunities.
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
            <div className='absolute right-48 -bottom-6 h-[60px] w-[60px] pointer-events-none'>
              <SquareIcon className='w-full h-full text-secondary opacity-30 animate-spin direction-reverse' />
            </div>
            <div className='absolute right-10 -bottom-24 h-[150px] w-[150px] pointer-events-none'>
              <TriangleIcon className='w-full h-full text-secondary opacity-50 animate-spin-slow' />
            </div>
          </div>
        </div>
      </Container>
      <div className='h-[100px] w-[calc(100%+2rem)] bg-background-overlay rotate-6 mt-20 flex flex-row justify-center items-center shadow-lg'>
        <div className='absolute h-[1000px] w-[calc(100%+200rem)] bg-gradient-to-t from-background-soft to-background-overlay bottom-[100%]'>
        </div>
      </div>
    </div>
  )
}

export { About }
