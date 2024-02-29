import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import imageStar from '@/assets/images/star.svg'

import { cn } from "src/utils/classname"

const Rating = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  props.value = props.value ?? [0]
  props.max = props.max ?? 0

  return (
    <div className='relative flex flex-row cursor-pointer'>
      <div className='relative flex flex-row gap-2'>
        {Array.from({ length: props.value[0] }).map((_, index) => {
          return (
            <div key={index} className='w-10 h-10'>
              <img src={imageStar.src} className='w-full h-full'></img>
            </div>
          )
        })}
        {Array.from({ length: props.max - props.value[0] }).map((_, index) => {
          return (
            <div key={index} className='w-10 h-10'>
              <img src={imageStar.src} className='w-full h-full opacity-10'></img>
            </div>
          )
        })}
        <div className='absolute -ml-8 pr-3 w-[calc(100%+35px)]'>
          <SliderPrimitive.Root
            ref={ref}
            className={cn(
              "relative flex w-full touch-none select-none items-center mt-1",
              className
            )}
            {...props}
          >
            <SliderPrimitive.Track className="relative h-8 w-full grow overflow-hidden rounded-full">
              <SliderPrimitive.Range className="absolute h-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
        </div>
      </div>
    </div>
  )
})

Rating.displayName = SliderPrimitive.Root.displayName

export { Rating }
