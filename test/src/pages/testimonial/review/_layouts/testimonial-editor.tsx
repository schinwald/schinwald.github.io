import { Button } from '~/components/primitives/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/primitives/ui/form'
import { Textarea } from '~/components/primitives/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useRef, useState, type ElementRef } from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '~/layouts/container'
import { Rating } from '~/components/rating'
import { Typewriter } from '~/components/typewriter'
import type { LottieRefCurrentProps } from 'lottie-react'
import waveAnimation from '~/assets/lotties/wave.json'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '~/components/primitives/ui/carousel'
import { Input } from '~/components/primitives/ui/input'
import { cn } from '~/utils/classname'
import { MdAddAPhoto as IconUploadPhoto } from 'react-icons/md'
import imageDefaultAvatar from '~/assets/images/avatar.webp'
import confettiAnimation from '~/assets/lotties/confetti.json'
import thumbsUpAnimation from '~/assets/lotties/thumbs-up.json'
import { ClientOnly } from 'remix-utils/client-only'
import { LazyLottie } from '~/components/lottie.client'

const formSchema = z.object({
  avatar: z
    .string()
    .optional(),
  full_name: z
    .string({ required_error: '(Required)' })
    .regex(/.+ .+/, {
      message: '(Must be a full name)',
    }),
  occupation: z
    .string()
    .optional(),
  company: z
    .string()
    .optional(),
  rating: z
    .number()
    .min(0)
    .max(5),
  review: z
    .string({ required_error: '(Required)' })
    .min(1, { message: '(Required)' }),
})

type TestimonialEditorProps = {
  className?: string
  avatar?: string
  fullName?: string
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({
  className,
  fullName,
  avatar
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      rating: 5,
      avatar: avatar,
      full_name: fullName
    }
  })

  const [api, setApi] = useState<CarouselApi>()
  const [slide, setSlide] = useState<number>(0)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false)

  const fileBrowserRef = useRef<ElementRef<'input'>>(null)
  const previousRef = useRef<ElementRef<'button'>>(null)
  const nextRef = useRef<ElementRef<'button'>>(null)
  const lottieConfettiRef = useRef<LottieRefCurrentProps>(null)
  const lottieThumbsUpRef = useRef<LottieRefCurrentProps>(null)

  React.useEffect(() => {
    if (!api) return

    setSlide(0)

    api.on('select', () => {
      const slide = api.selectedScrollSnap()
      setSlide(slide)
    })
  }, [api])

  const coerceToFileIfPossible = async (value: unknown) => {
    if (typeof value === 'string') {
      const buffer = await fetch(value)
        .then(response => response.blob())
      return new File([buffer], 'filename')
    }

    if (value instanceof File) {
      return value
    }

    return undefined
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitDisabled(true)

    const formData = new FormData()
    const avatarFile = await coerceToFileIfPossible(values.avatar)

    if (avatarFile) formData.append('avatar', avatarFile, 'avatar.png')
    if (values.occupation) formData.append('occupation', values.occupation)
    if (values.company) formData.append('company', values.company)
    formData.append('full_name', values.full_name)
    formData.append('rating', values.rating.toString())
    formData.append('review', values.review)

    const response = await
      fetch('/api/testimonials/add', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())

    if ('errors' in response) {
      return
    }

    lottieThumbsUpRef.current?.goToAndPlay?.(0)

    setTimeout(() => {
      lottieConfettiRef.current?.goToAndPlay?.(0)
    }, 300)

    setIsSubmitDisabled(false)
    nextRef.current?.click?.()
  }

  const renderButton = () => {
    if (slide === 2) {
      return null
    }

    if (slide === 1) {
      return (
        <Button
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      )
    }

    if (slide < 1) {
      return (
        <Button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            nextRef.current?.click?.()
          }}
        >
          Continue
        </Button>
      )
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen relative overflow-hidden'>
      <motion.div
        className='absolute left-[50%] -translate-x-[50%]'
        initial={{
          top: '50%',
          translateY: '-50%',
          translateX: '-50%'
        }}
        animate={{
          top: '0%',
          translateY: '0%',
          translateX: '-50%'
        }}
        transition={{
          ease: 'easeOut',
          duration: 1.0,
          delay: 2.5
        }}
      >
        <Typewriter
          className='flex items-center h-32 -mr-5'
          cursorClassName='bg-tertiary'
          words={[
            { text: 'Write', className: 'text-foreground' },
            { text: 'A', className: 'text-foreground' },
            { text: 'Testimonial', className: 'text-tertiary' }
          ]}
        />
      </motion.div>
      <nav className='h-32 w-full'></nav>
      <Container
        className='h-full sm:px-32 gap-6 flex-grow justify-center'
        variant='narrow'
      >
        <motion.div
          className='flex flex-col gap-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1.0,
            delay: 3.5
          }}
        >
          {/* <Progress */}
          {/*   className='h-2' */}
          {/*   value={(slide/2) * 100} */}
          {/* /> */}
          <Carousel
            className='relative'
            setApi={setApi}
            disableKeyboardEvents={true}
            watchDrag={false}
          >
            <ClientOnly>
              {() => (
                <LazyLottie
                  lottieRef={lottieConfettiRef}
                  className="absolute top-0 bottom-0 right-0 left-0 scale-[200%] pointer-events-none"
                  animationData={confettiAnimation}
                  loop={false}
                />
              )}
            </ClientOnly>
            <Form {...form}>
              <form
                className='w-full flex flex-col'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CarouselContent>
                  <CarouselItem
                    className={cn(
                      'transition duration-1000 opacity-0',
                      slide === 0 && 'opacity-100'
                    )}
                  >
                    <div className='flex flex-col justify-center md:flex-row w-full h-full gap-2 p-6'>
                      <div className='h-full aspect-square hidden md:block'>
                        <div className='flex flex-col items-center gap-2'>
                          <input
                            tabIndex={slide === 0 ? 0 : -1}
                            ref={fileBrowserRef}
                            className='hidden'
                            type='file'
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (!file) return
                              const avatar = URL.createObjectURL(file)
                              form.setValue('avatar', avatar)
                            }}
                          />
                          <Button
                            type='button'
                            variant='link'
                            size='sm'
                            tabIndex={slide === 0 ? 0 : -1}
                            onClick={() => {
                              fileBrowserRef?.current?.click?.()
                            }}
                          >
                            <IconUploadPhoto className='mr-2 -ml-2' />Upload Photo
                          </Button>
                          <div
                            className='h-[290px] w-[290px] bg-white rounded-full border-4 border-white overflow-hidden cursor-pointer relative'
                            onClick={() => {
                              fileBrowserRef?.current?.click()
                            }}
                          >
                            <div className='absolute left-0 right-0 bottom-0 top-0 bg-black opacity-0 hover:opacity-10'></div>
                            <img
                              src={form.watch().avatar ?? imageDefaultAvatar}
                              className='w-full h-full hover:scale-105 transition-all duration-300'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col justify-center w-full gap-6'>
                        <FormField
                          control={form.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className='flex flex-row justify-start gap-2'>
                                <FormLabel>Full Name</FormLabel>
                                <FormMessage className='leading-none' />
                              </div>
                              <FormControl>
                                <Input
                                  tabIndex={slide === 0 ? 0 : -1}
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
                                  tabIndex={slide === 0 ? 0 : -1}
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
                                  tabIndex={slide === 0 ? 0 : -1}
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
                      slide === 1 && 'opacity-100'
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
                                  tabIndex={slide === 1 ? 0 : -1}
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
                                tabIndex={slide === 1 ? 0 : -1}
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
                  <CarouselItem
                    className={cn(
                      'transition duration-1000 opacity-100',
                      slide === 2 && 'opacity-100'
                    )}
                  >
                    <div className='flex flex-col w-full h-full p-6 gap-6 justify-between'>
                      <div className='flex flex-col h-full items-center justify-center text-white gap-3'>
                        <ClientOnly>
                          {() => (
                            <LazyLottie
                              lottieRef={lottieThumbsUpRef}
                              className="h-full w-[200px]"
                              animationData={thumbsUpAnimation}
                              loop={false}
                            />
                          )}
                        </ClientOnly>
                        <h3>Hi {form.getValues().full_name},</h3>
                        <h2>Thank you for the review!</h2>
                      </div>
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
                (slide === 0 || slide === 2) && 'hidden'
              )}
              variant='ghost'
            />
            <CarouselNext
              ref={nextRef}
              className={cn(
                (slide === 1 || slide === 2) && 'hidden'
              )}
              variant='ghost'
            />
          </Carousel>
        </motion.div>
      </Container>
      <div className='h-[200px] w-full'></div>
      <motion.div
        className='absolute h-[400px]'
        initial={{ bottom: -400 }}
        animate={{ bottom: -200 }}
        transition={{
          ease: 'easeOut',
          duration: 1.0,
          delay: 2.5
        }}
      >
        {Array.from({ length: 40 }).map((value, index) => {
          const offset = index * 250 - 20 * 250

          return (
            <ClientOnly>
              {() => (
                <LazyLottie
                  key={`wave-${index}`}
                  className="absolute w-[400px] pointer-events-none"
                  animationData={waveAnimation}
                  loop={true}
                  style={{
                    left: `calc(50% + ${offset}px)`
                  }}
                />
              )}
            </ClientOnly>
          )
        })}
      </motion.div>
    </div >
  )
}

export { TestimonialEditor }
