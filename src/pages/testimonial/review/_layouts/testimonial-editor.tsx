import { Button } from '@/components/primitives/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/primitives/ui/form'
import { Textarea } from '@/components/primitives/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useRef, useState, type ElementRef } from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@/layouts/container'
import { Rating } from '@/components/rating'
import { Typewriter } from '@/components/typewriter'
import Lottie from 'lottie-react'
import waveAnimation from '@/assets/lotties/wave.json'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/primitives/ui/carousel'
import { Input } from '@/components/primitives/ui/input'
import { cn } from '@/utils/classname'
import imageDefaultAvatar from '@/assets/images/avatar.webp'

const formSchema = z.object({
  avatar: z
    .string()
    .min(1)
    .optional(),
  first_name: z
    .string()
    .min(1, { message: '(Required)' }),
  last_name: z
    .string()
    .min(1, { message: '(Required)' }),
  occupation: z
    .string()
    .min(1)
    .optional(),
  company: z
    .string()
    .min(1)
    .optional(),
  rating: z
    .number()
    .min(0)
    .max(5),
  review: z
    .string()
    .min(1, { message: '(Required)' }),
})

type TestimonialEditorProps = {
  className?: string
  avatar?: string
  firstName?: string
  lastName?: string
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({
  className,
  firstName,
  lastName,
  avatar
}) => {
  const isSubmitDisabled = false

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      rating: 5,
      avatar: avatar,
      first_name: firstName,
      last_name: lastName
    }
  })

  const previousRef = useRef<ElementRef<'button'>>(null)
  const nextRef = useRef<ElementRef<'button'>>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [isOnLastStep, setIsOnLastStep] = useState<boolean>(true)
  const [isOnFirstStep, setIsOnFirstStep] = useState<boolean>(true)

  React.useEffect(() => {
    if (!api) return

    const totalSteps = api.scrollSnapList().length
    const stepNumber = api.selectedScrollSnap()

    setStepNumber(stepNumber)
    setIsOnFirstStep(stepNumber === 0)
    setIsOnLastStep(stepNumber === totalSteps - 1)


    api.on('select', () => {
      const stepNumber = api.selectedScrollSnap()

      setStepNumber(stepNumber)
      setIsOnFirstStep(stepNumber === 0)
      setIsOnLastStep(stepNumber === totalSteps - 1)
    })
  }, [api])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const response = await fetch('/api/testimonials/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())

    if ('errors' in response) {
      return
    }
  }

  console.log(form.formState)
  console.log(form.getValues())

  const renderButton = () => {
    if (isOnLastStep) {
      return (
        <Button
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      )
    }

    return (
      <Button
        type="button"
        onClick={() => {
          nextRef.current?.click?.()
        }}
      >
        Continue
      </Button>
    )
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Container
        className='sm:px-32 gap-6'
        variant='narrow'
      >
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{
            ease: 'easeOut',
            duration: 1.0,
            delay: 2.5
          }}
        >
          <Typewriter
            className='flex justify-center -mr-5'
            cursorClassName='bg-tertiary'
            words={[
              { text: 'Write', className: 'text-foreground' },
              { text: 'A', className: 'text-foreground' },
              { text: 'Testimonial', className: 'text-tertiary' }
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1.0,
            delay: 3.5
          }}
        >
          <Carousel
            setApi={setApi}
            disableKeyboardEvents={true}
          >
            <Form {...form}>
              <form
                className='w-full flex flex-col'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CarouselContent>
                  <CarouselItem
                    className={cn(
                      'transition duration-1000 opacity-0',
                      stepNumber === 0 && 'opacity-100'
                    )}
                  >
                    <div className='flex flex-col md:flex-row w-full h-full gap-10 p-6'>
                      <div className='relative h-full w-[200px] md:w-auto aspect-square'>
                        <div className='absolute right-0 top-0 h-[88%] w-[88%] bg-secondary'></div>
                        <div className='absolute left-0 bottom-0 h-[88%] w-[88%] bg-white'>
                          <img src={avatar ?? imageDefaultAvatar.src} className='w-full h-full'></img>
                        </div>
                      </div>
                      <div className='flex flex-col justify-end w-full gap-6'>
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className='flex flex-row justify-start gap-2'>
                                <FormLabel>First Name</FormLabel>
                                <FormMessage className='leading-none' />
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className='flex flex-row justify-start gap-2'>
                                <FormLabel>Last Name</FormLabel>
                                <FormMessage className='leading-none' />
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="occupation"
                          render={({ field }) => (
                            <FormItem>
                              <div className='flex flex-row justify-start gap-2'>
                                <FormLabel>Occupation</FormLabel>
                                <FormMessage className='leading-none' />
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <div className='flex flex-row justify-start gap-2'>
                                <FormLabel>Company</FormLabel>
                                <FormMessage className='leading-none' />
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem
                    className={cn(
                      'transition duration-1000 opacity-0',
                      stepNumber === 1 && 'opacity-100'
                    )}
                  >
                    <div className='flex flex-col w-full h-full p-6 gap-6 justify-between'>
                      <div className='flex flex-row justify-center'>
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem className='flex flex-row justify-between gap-8 w-[360px] space-y-0 -ml-4'>
                              <FormControl>
                                <Rating
                                  step={1}
                                  min={0}
                                  max={5}
                                  value={[field.value]}
                                  onValueChange={(value) => {
                                    field.onChange(value[0])
                                  }}
                                />
                              </FormControl>
                              <div className='flex flex-row justify-center items-center text-foreground'>
                                <h2 className='m-0'>{field.value}/5</h2>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder='What would you like to say...'
                                rows={12}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <div className='flex flex-row justify-center mt-6'>
                  {renderButton()}
                </div>
              </form>
            </Form>
            <CarouselPrevious
              ref={previousRef}
              className={cn(
                isOnFirstStep && 'hidden'
              )}
              variant='ghost'
            />
            <CarouselNext
              ref={nextRef}
              className={cn(
                isOnLastStep && 'hidden'
              )}
              variant='ghost'
            />
          </Carousel>
        </motion.div>
      </Container>
      <motion.div
        className='absolute'
        initial={{ bottom: 0 }}
        animate={{ bottom: 200 }}
        transition={{
          ease: 'easeOut',
          duration: 1.0,
          delay: 2.5
        }}
      >
        {Array.from({ length: 40 }).map((value, index) => {
          const offset = index * 250 - 20 * 250

          return (
            <Lottie
              key={`wave-${index}`}
              className="absolute w-[400px] pointer-events-none"
              animationData={waveAnimation}
              loop={true}
              style={{
                left: `calc(50% + ${offset}px)`
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

export { TestimonialEditor }
