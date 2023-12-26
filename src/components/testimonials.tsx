import React, { useCallback, useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Testimonial } from '@/components/testimonial'
import { Container } from '@/layouts/container'
import { useAnimate } from 'framer-motion'
import { Link } from './primitives/ui/link'

const count = 40
const duration = 120.0
const delay = duration / 29.0
const cycleDuration = count * delay
const repeatDelay = cycleDuration > duration ? cycleDuration - duration : 0
const distance = '1200'

type Props = {
  className?: string
}

const Testimonials: React.FC<Props> = ({ className, ...props }) => {
  const animations = Array
    .from({ length: count })
    .map(() => useAnimate())

  const [isCarouselPlaying, setCarouselPlaying] = useState(true)
  const [testimonialContainerRef, animateTestimonialContainer] = useAnimate()

  useEffect(() => {
    animateTestimonialContainer(testimonialContainerRef.current, {
      opacity: [0, 1]
    }, {
      duration: 1
    })

    for (let i = 0; i < animations.length; i++) {
      const [ref, animate] = animations[i]

      const controls = animate(ref.current, {
        translateY: ['-105%', '-105%', '0%', '0%', '105%', '105%'],
        translateX: ['-120%', '120%', '120%', '-120%', '-120%', '120%'],
        x: [`-${distance}px`, `${distance}px`, `${distance}px`, `-${distance}px`, `-${distance}px`, `${distance}px`],
      }, {
        duration,
        times: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
        ease: 'linear',
        repeat: Infinity,
        repeatDelay
      })

      controls.time = duration + repeatDelay - i * delay
    }

    return () => {
      for (let i = 0; i < animations.length; i++) {
        const [ref, _] = animations[i]
        for (let j = 0; j < ref.animations.length; j++) {
          ref.animations.pop()
        }
      }
    }
  }, [])

  const toggleCarouselPlay = useCallback(() => {
    for (let i = 0; i < animations.length; i++) {
      const [ref, _] = animations[i]
      for (let j = 0; j < ref.animations.length; j++) {
        isCarouselPlaying ? ref.animations[j].pause() : ref.animations[j].play()
        setCarouselPlaying(!isCarouselPlaying)
      }
    }
  }, [isCarouselPlaying])

  return (
    <div className='relative w-screen flex flex-col items-center gap-10'>
      <Container>
        <div className='flex flex-row justify-end'>
          <Header
            className='text-right'
            title='Testimonials'
            align='right'
            variant='cascade'
          />
        </div>
      </Container >
      <div className='h-[500px] w-screen bg-background flex flex-row justify-center items-center overflow-clip relative'>
        <div className='absolute left-0 right-[calc(50%+1200px)] h-full bg-background z-20'></div>
        <div className='absolute left-[calc(50%+1200px)] right-0 h-full bg-background z-20'></div>
        <div className='w-[2400px] h-full relative flex flex-row justify-center items-center'>
          <div className='absolute left-0 w-[200px] sm:w-[300px] md:w-[500px] h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none'></div>
          <div className='absolute right-0 w-[200px] sm:w-[300px] md:w-[500px] h-full bg-gradient-to-r to-background from-transparent z-20 pointer-events-none'></div>
          <div ref={testimonialContainerRef} className='w-full flex flex-row justify-center items-center rotate-6 opacity-0'>
            {animations.map((value, index) => {
              const [ref, animate] = value

              return (
                <div
                  ref={ref}
                  key={index}
                  className='absolute'
                >
                  <Testimonial
                    stars={4}
                    name='John Smith'
                    job='Software Developer'
                    company='Devopie'
                    onClick={() => {
                      toggleCarouselPlay()
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Testimonial>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Container >
        <div className='flex flex-row justify-end'>
          <Link
            href='/testimonial/review'
            variant='default'
          >
            Write a review
          </Link>
        </div>
      </Container >
    </div >
  )
}

export { Testimonials }
