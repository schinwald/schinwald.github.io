import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from '~/components/header'
import { Testimonial } from '~/components/testimonial'
import { Container } from '~/layouts/container'
import { useAnimate, type AnimationPlaybackControls } from 'framer-motion'
import { Link } from './primitives/ui/link'
import { cn } from '~/utils/classname'

const count = 30
const duration = 120.0
const delay = duration / 29.0
const cycleDuration = count * delay
const repeatDelay = cycleDuration > duration ? cycleDuration - duration : 0
const distance = '1200'

type Testimonial = {
  avatar?: string
  full_name: string
  occupation?: string
  company?: string
  relationship?: string
  review: string
  rating: number
}

type TestimonialsProps = {
  className?: string
  data: (Testimonial | null)[]
}

const Testimonials: React.FC<TestimonialsProps> = ({
  className,
  data,
}) => {
  const [isCarouselPlaying, setCarouselPlaying] = useState(true)
  const [isCarouselReady, setCarouselReady] = useState(false)
  const [testimonialContainerRef, animateTestimonialContainer] = useAnimate()

  const testimonials = data.map((value, i) => {
    const animation = useAnimate()
    const [testimonialRef, animateTestimonial] = animation
    const [controls, setControls] = useState<AnimationPlaybackControls>()

    useEffect(() => {
      if (controls) return

      const newControls = animateTestimonial(testimonialRef.current, {
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

      newControls.time = duration + repeatDelay - i * delay
      setControls(newControls)
    }, [])

    return {
      data: value,
      animation,
      controls
    }
  })

  useEffect(() => {
    animateTestimonialContainer(testimonialContainerRef.current, {
      opacity: [0, 1]
    }, {
      duration: 1
    })

    setCarouselReady(true)
  }, [])

  const toggleCarouselPlay = useCallback(() => {
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i]
      const controls = testimonial.controls

      if (!controls) continue

      if (isCarouselPlaying) {
        const temp = controls.time
        controls.pause()
        controls.time = temp
      } else {
        controls.play()
      }
    }

    setCarouselPlaying(!isCarouselPlaying)
  }, [isCarouselReady, isCarouselPlaying])

  return (
    <div id='testimonials' className={cn(
      'relative w-screen flex flex-col items-center gap-10 py-8',
      className
    )}>
      <Container variant='narrow'>
        <div className='relative flex flex-row justify-end'>
          <Header
            className='text-right'
            title='Testimonials'
            align='right'
            variant='cascade'
          />
        </div>
      </Container>
      <Container
        className='h-[400px] md:h-[500px] items-center bg-background overflow-clip relative'
        variant='wide'
      >
        <div className='w-full max-w-[2400px] h-full absolute pointer-events-none'>
          {/* Hiding the overflow of the testimonials */}
          <div className='absolute right-[100%] w-full h-full bg-background z-20'></div>
          <div className='absolute left-[100%] w-full h-full bg-background z-20'></div>
          {/* Adding shadows to the edges */}
          <div className='absolute left-0 w-[100px] sm:w-[200px] md:w-[500px] h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none'></div>
          <div className='absolute right-0 w-[100px] sm:w-[200px] md:w-[500px] h-full bg-gradient-to-r to-background from-transparent z-20 pointer-events-none'></div>
        </div>
        <div className='w-full max-w-[2400px] h-full relative flex flex-row justify-center items-center scale-[60%] md:scale-100 select-none'>
          <div
            ref={testimonialContainerRef}
            className='w-full flex flex-row justify-center items-center rotate-6 opacity-0'
          >
            {testimonials.map((value, index) => {
              const { data, animation } = value
              const [ref, _] = animation

              if (!data) {
                return (
                  <div
                    ref={ref}
                    key={index}
                    className='absolute'
                  >
                    <div className='relative h-[400px] aspect-[3/4] bg-background-overlay opacity-50 text-foreground-overlay rounded-md overflow-hidden'>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  ref={ref}
                  key={index}
                  className='absolute'
                  onClick={() => {
                    toggleCarouselPlay()
                  }}
                >
                  <Testimonial
                    avatar={data.avatar}
                    rating={data.rating}
                    name={data.full_name}
                    occupation={data.occupation}
                    company={data.company}
                    review={data.review}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
      <Container variant='narrow'>
        <div className='flex flex-row justify-end'>
          <Link
            href='/testimonial/review'
            variant='default'
          >
            Write a review
          </Link>
        </div>
      </Container >
    </div>
  )
}

export { Testimonials }
