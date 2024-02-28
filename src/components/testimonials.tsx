import React, { useCallback, useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Testimonial } from '@/components/testimonial'
import { Container } from '@/layouts/container'
import { useAnimate } from 'framer-motion'
import { Link } from './primitives/ui/link'

const count = 30
const duration = 120.0
const delay = duration / 29.0
const cycleDuration = count * delay
const repeatDelay = cycleDuration > duration ? cycleDuration - duration : 0
const distance = '1200'

const data = Array.from({ length: 15 }).fill(true)

type TestimonialsProps = {
  className?: string
}

const Testimonials: React.FC<TestimonialsProps> = () => {
  let filledData
  if (data.length < count) {
    filledData = Array.from({ length: count }).fill(null)
    for (let i = 0; i <= count; i++) {
      let j = Math.floor(Math.random() * count)
      while (true) {
        if (!filledData[j]) {
          filledData[j] = data[i]
          break
        }

        j++
        j = j % count
      }
    }
  } else {
    filledData = data
  }

  const testimonials = filledData.map((value) => {
    return {
      data: value,
      animation: useAnimate()
    }
  })

  const [isCarouselPlaying, setCarouselPlaying] = useState(true)
  const [testimonialContainerRef, animateTestimonialContainer] = useAnimate()

  useEffect(() => {
    animateTestimonialContainer(testimonialContainerRef.current, {
      opacity: [0, 1]
    }, {
      duration: 1
    })

    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i]
      const [ref, animate] = testimonial.animation

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
      for (let i = 0; i < testimonials.length; i++) {
        const testimonial = testimonials[i]
        const [ref, _] = testimonial.animation

        for (let j = 0; j < ref.animations.length; j++) {
          ref.animations.pop()
        }
      }
    }
  }, [])

  // const toggleCarouselPlay = useCallback(() => {
  //   for (let i = 0; i < animations.length; i++) {
  //     const [ref, _] = animations[i]
  //     for (let j = 0; j < ref.animations.length; j++) {
  //       isCarouselPlaying ? ref.animations[j].pause() : ref.animations[j].play()
  //       setCarouselPlaying(!isCarouselPlaying)
  //     }
  //   }
  // }, [isCarouselPlaying])

  return (
    <div className='relative w-screen flex flex-col items-center gap-10'>
      <Container variant='narrow'>
        <div className='flex flex-row justify-end'>
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
              const [ref, _] = value.animation

              if (!value.data) {
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
                >
                  <Testimonial
                    stars={4}
                    name='John Smith'
                    occupation='Software Developer'
                    company='Devopie'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Testimonial>
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
    </div >
  )
}

export { Testimonials }
