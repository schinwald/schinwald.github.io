import React, { useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Socials } from '@/components/socials'
import profileImage from '@/assets/images/profile.webp'
import { Container } from '@/layouts/container'
import { Link } from './primitives/ui/link'
import { useAnimate, useInView } from 'framer-motion'

type AboutProps = {
  className?: string
}

const About: React.FC<AboutProps> = () => {
  const [imageRef, animateImage] = useAnimate()
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
        scaleX: ['-100%', '-100%'],
        rotate: ['6deg', '6deg']
      }, {
        duration: 0.3,
        ease: 'easeOut'
      })
    }
  }, [isInView])

  return (
    <div className='relative w-screen flex flex-col justify-center items-center'>
      <Container
        ref={containerRef}
        variant='narrow'
      >
        <div className='flex flex-col sm:flex-row gap-10 z-30'>
          <div className='flex flex-row'>
            <div className='w-full px-16 sm:p-0'>
              <div className='relative w-full sm:w-[200px] md:w-[300px] aspect-square bg-tertiary rounded-[1000px] shadow-lg'>
                <div className='absolute w-full aspect-[3/4] rounded-b-[1000px] overflow-clip bottom-[-1px]'>
                  <img
                    ref={imageRef}
                    className='absolute bottom-0 w-full aspect-[300/360] object-cover scale-x-[-100%] -rotate-6 opacity-0'
                    src={profileImage.src}
                  >
                  </img>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Header
                className='text-left'
                title='About Me'
                align='left'
                variant='typist'
              />
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
            <div>
              <Link
                href='/about/learn-more'
                variant='default'
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className='h-[100px] w-[calc(100%+2rem)] bg-background-overlay rotate-6 mt-20 flex flex-row justify-center items-center shadow-lg'>
        <Socials />
        <div className='absolute h-[1000px] w-[calc(100%+200rem)] bg-gradient-to-t from-background-soft to-background-overlay bottom-[100%]'>
        </div>
      </div>
    </div>
  )
}

export { About }
