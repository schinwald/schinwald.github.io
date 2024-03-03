import { Button } from '@/components/primitives/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/primitives/ui/form'
import { Textarea } from '@/components/primitives/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@/layouts/container'
import { Rating } from '@/components/rating'
import { Typewriter } from '@/components/typewriter'
import Lottie from 'lottie-react'
import waveAnimation from '@/assets/lotties/wave.json'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/primitives/ui/carousel'
import { Input } from '@/components/primitives/ui/input'

const formSchema = z.object({
  rating: z
    .number()
    .min(0)
    .max(5),
  name: z
    .string()
    .min(1, { message: '(Required)' }),
  review: z
    .string()
    .min(1, { message: '(Required)' }),
  occupation: z
    .string()
    .min(1, { message: '(Required)' })
    .optional(),
  company: z
    .string()
    .min(1, { message: '(Required)' })
    .optional()
})

type Steps = 'write_review' | 'personal_information'

type TestimonialEditorProps = {
  className?: string
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = () => {
  const isSubmitDisabled = false

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 4,
      review: "",
      name: "",
      occupation: "",
      company: "",
    }
  })

  const [api, setApi] = useState<CarouselApi>()
  const [step, setStep] = useState<Steps>()

  React.useEffect(() => {
    if (!api) return

    api.on('select', () => {
      switch (api.selectedScrollSnap()) {
        case 0:
          setStep('write_review')
          break
        case 1:
          setStep('personal_information')
          break
      }
    })
  }, [api])

  const onSubmit = () => { }

  const renderButton = () => {
    if (step === 'personal_information') {
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
          api?.scrollNext()
        }}
      >
        Continue
      </Button>
    )
  }

  const shouldHidePrevious = step === 'write_review'
  const shouldHideNext = step === 'personal_information'

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Container
        className='sm:px-56 gap-6'
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
            className='flex justify-center'
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
          <Form {...form}>
            <form
              className='w-full flex flex-col'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Carousel setApi={setApi}>
                <CarouselContent>
                  <CarouselItem>
                    <div className='flex flex-col w-full h-full p-6 gap-6 justify-between'>
                      <div className='flex flex-row justify-center'>
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem className='flex flex-row justify-between w-[400px] space-y-0 -ml-4'>
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
                                rows={10}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className='flex flex-row w-full h-full gap-10 p-6'>
                      <div className='relative h-full aspect-square'>
                        <div className='absolute right-0 top-0 h-[88%] w-[88%] bg-secondary'></div>
                        <div className='absolute left-0 bottom-0 h-[88%] w-[88%] bg-white'></div>
                      </div>
                      <div className='flex flex-col justify-center w-full gap-6'>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <div className='flex flex-row justify-start gap-2'>
                                <FormLabel>Name</FormLabel>
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
                </CarouselContent>
                {!shouldHidePrevious && <CarouselPrevious />}
                {!shouldHideNext && <CarouselNext />}
              </Carousel>
              <div className='flex flex-row justify-center mt-6'>
                {renderButton()}
              </div>
            </form>
          </Form>
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
