import React, { useMemo, type PropsWithChildren } from 'react'
import { cn } from '@/utils/classname'
import imageStar from '@/assets/images/star.svg'
import imageDefaultAvatar from '@/assets/images/avatar.webp'
import waveAnimation from '@/assets/lotties/wave.json'
import Lottie from 'lottie-react'

type TestimonialProps = {
  className?: string
  stars: number
  name: string
  relationship?: string
  occupation?: string
  company?: string
  avatar?: string
}

const Testimonial: React.FC<TestimonialProps & PropsWithChildren> = ({
  className,
  stars,
  name,
  relationship,
  occupation,
  company,
  avatar,
  children,
}) => {
  if (stars < 0) stars = 0
  if (stars > 5) stars = 5

  const title = useMemo(() => {
    if (occupation && company) {
      return <span>{occupation} @ {company}</span>
    } else if (occupation) {
      return <span>{occupation}</span>
    } else if (relationship) {
      return <span>{relationship}</span>
    } else {
      return null
    }
  }, [occupation, company, relationship])

  return (
    <div 
      className={cn(
        'relative h-[400px] aspect-[3/4] bg-background-overlay text-foreground-overlay rounded-md overflow-hidden cursor-pointer',
        className,
      )}
    >
      <div className='absolute flex flex-col items-center justify-between h-full p-8 z-20'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row justify-center gap-2'>
            {Array.from({ length: stars }).map((_, index) => {
              return (
                <div key={index} className='w-10 h-10'>
                  <img src={imageStar.src} className='w-full h-full'></img>
                </div>
              )
            })}
            {Array.from({ length: 5 - stars }).map((_, index) => {
              return (
                <div key={index} className='w-10 h-10'>
                  <img src={imageStar.src} className='w-full h-full opacity-10'></img>
                </div>
              )
            })}
          </div>
          <p className='line-clamp-5'>
            {children}
          </p>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <div className='w-24 h-24 rounded-[1000px] bg-white'>
            <img src={avatar ?? imageDefaultAvatar.src} className='w-full h-full opacity-50'></img>
          </div>
          <div className='flex flex-col items-center'>
            <h6 className='text-tertiary-foreground capitalize font-bold'>
              {name}
            </h6>
            <p className='text-tertiary-foreground capitalize flex gap-1'>
              {title}
            </p>
          </div>
        </div>
      </div>
      <Lottie
        className="absolute w-full pointer-events-none"
        style={{
          bottom: "-80px",
        }}
        animationData={waveAnimation}
        loop={true}
      />
    </div>
  )
}

export { Testimonial }
