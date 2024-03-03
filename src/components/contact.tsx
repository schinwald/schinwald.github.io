import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from '@/components/header'
import paperAnimation from '@/assets/lotties/paper_airplane.json'
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { Button } from './primitives/ui/button'
import { Input } from './primitives/ui/input'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from './primitives/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, } from 'react-hook-form'
import { useAnimate, useInView } from 'framer-motion'
import { z } from "zod"
import { Textarea } from './primitives/ui/textarea'
import { Container } from '@/layouts/container'
import { Socials } from './socials'
import { cn } from '@/utils/classname'

type Notification = {
  status?: 'success' | 'error'
  message?: string
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '(Required)' })
    .email('(Must be a valid email)'),
  message: z
    .string()
    .min(1, { message: '(Required)' }),
})

type ContactProps = {
  className?: string
}

const Contact: React.FC<ContactProps> = () => {
  const lottiePaperAirplaneRef = useRef<LottieRefCurrentProps>(null)
  const lottiePaperAirplaneContainerRef = useRef(null)
  const [notification, setNotification] = useState<Notification>({})
  const [notificationRef, animateNotification] = useAnimate()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false)
  const isInView = useInView(lottiePaperAirplaneContainerRef, { margin: "-200px 0px" })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  })

  useEffect(() => {
    if (isInView) {
      if (lottiePaperAirplaneRef.current?.animationItem?.isPaused) {
        animatePaperAirplaneEntry()
      }
    }
  }, [isInView])

  const animatePaperAirplaneEntry = useCallback(() => {
    lottiePaperAirplaneRef?.current?.playSegments([0, 96], true)
    lottiePaperAirplaneRef?.current?.playSegments([97, 146])
    lottiePaperAirplaneRef?.current?.animationItem?.setLoop(true)
  }, [lottiePaperAirplaneRef])

  const animatePaperAirplaneExit = useCallback(() => {
    lottiePaperAirplaneRef?.current?.playSegments([147, 200])
    lottiePaperAirplaneRef?.current?.animationItem?.setLoop(false)
  }, [lottiePaperAirplaneRef])

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsSubmitDisabled(true)

    const responsePromise = 
      fetch('/api/contact/email', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          message: values.message
        })
      })

    animatePaperAirplaneExit()
    lottiePaperAirplaneRef?.current?.animationItem?.addEventListener('complete', async () => {
      lottiePaperAirplaneRef?.current?.animationItem?.removeEventListener('complete')

      const response = await responsePromise

      if (response.ok) {
        form.resetField('message')

        setNotification({
          status: 'success',
          message: 'Sent!'
        })
      } else {
        setNotification({
          status: 'error',
          message: 'Error!'
        })
      }

      animateNotification([
        [
          notificationRef.current, {
            opacity: 0,
            display: 'block',
            transform: 'translateY(100%)',
          }, {
            duration: 0
          }
        ], [
          notificationRef.current, {
            opacity: 1,
            transform: 'translateY(0%)',
          }, {
            duration: 0.2,
            ease: "easeOut"
          }
        ], [
          notificationRef.current, {
            opacity: 1,
            transform: 'translateY(0%)',
          }, {
            duration: 0.3,
          }
        ], [
          notificationRef.current, {
            opacity: 0,
            display: 'none',
            transform: 'translateY(100%)',
          }, {
            duration: 0.5,
            ease: "easeIn"
          }
        ]
      ])

      setTimeout(() => {
        animatePaperAirplaneEntry()
        setIsSubmitDisabled(false)
      }, 1300)
    })
  }, [])

  return (
    <div className='relative w-screen flex flex-col items-center gap-10'>
      <Container variant='narrow'>
        <div className='relative flex flex-row justify-start'>
          <Header
            className='text-left'
            title='Contact'
            align='left'
            variant='cascade'
          />
        </div>
      </Container>
      <Container variant='hybrid'>
        <div className='flex flex-col md:flex-row'>
          <div className='relative flex flex-row md:flex-col justify-between p-8 md:p-12 bg-background rounded-t-md md:rounded-none md:rounded-l-md w-full h-[130px] md:h-auto md:w-[40%] overflow-hidden'>
            <div className='relative'>
              <div className='absolute top-0 right-0 bottom-0 left-0 flex flex-row justify-start items-start z-20'>
                <h2 className='leading-10 text-foreground -rotate-6'>
                  <span className='text-3xl'>Let's</span>
                  <br></br>
                  <span>Connect!</span>
                </h2>
              </div>
            </div>
            <div className='relative mb-2 mr-16 md:m-0 md:ml-0 md:mb-56 lg:m-0 lg:ml-10 lg:mb-56'>
              <div
                ref={lottiePaperAirplaneContainerRef}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[600px] lg:w-[600px] pointer-events-none"
              >
                <Lottie
                  lottieRef={lottiePaperAirplaneRef}
                  animationData={paperAnimation}
                  autoplay={false}
                />
              </div>
            </div>
            <div className='absolute bottom-0 right-0 -translate-y-full -translate-x-1/2 mt-2'>
              <h2
                ref={notificationRef}
                className={cn(
                  'w-full hidden',
                  notification.status === 'success' && 'text-success',
                  notification.status === 'error' && 'text-destructive'
                )}
              >
                {notification.message}
              </h2>
            </div>
          </div>
          <div className='bg-background-overlay rounded-b-md md:rounded-none md:rounded-r-md w-full md:w-[60%]'>
            <Form {...form}>
              <form
                className='p-8 md:p-12 flex flex-col gap-4 md:gap-5'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex flex-row justify-start gap-2'>
                        <FormLabel>Email</FormLabel>
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex flex-row justify-start gap-2'>
                        <FormLabel>Message</FormLabel>
                        <FormMessage className='leading-none' />
                      </div>
                      <FormControl>
                        <Textarea
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='flex flex-row justify-center md:justify-start mt-2'>
                  <Button
                    type="submit"
                    disabled={isSubmitDisabled}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Container>
      <Container variant='narrow'>
        <Socials />
      </Container>
    </div>
  )
}

export { Contact }
