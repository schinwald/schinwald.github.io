import React, { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { Header } from '@/components/header'
import paperAnimation from '@/assets/lotties/paper_airplane.json'
import liquidAnimation from '@/assets/lotties/liquid.json'
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { Button } from './primitives/ui/button'
import { Input } from './primitives/ui/input'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from './primitives/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, } from 'react-hook-form'
import { useAnimate, useInView } from 'framer-motion'
import { z } from "zod"
import { Textarea } from './primitives/ui/textarea'
import { Container } from '@/layouts/container'
import { Socials } from './socials'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '(Required)' })
    .email('(Must be a valid email)'),
  subject: z
    .string()
    .min(1, { message: '(Required)' }),
  message: z
    .string()
    .min(1, { message: '(Required)' }),
})

type Props = {
  className?: string
}

const Contact: React.FC<Props> = ({ className, ...props }) => {
  const lottiePaperAirplaneRef = useRef<LottieRefCurrentProps>(null)
  const lottiePaperAirplaneContainerRef = useRef(null)
  const lottieTopLiquidRef = useRef<LottieRefCurrentProps>(null)
  const lottieBottomLiquidRef = useRef<LottieRefCurrentProps>(null)
  const [sentMessageRef, animateSentMessage] = useAnimate()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false)
  const isInView = useInView(lottiePaperAirplaneContainerRef, { margin: "-200px 0px" })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    if (isInView) {
      if (lottiePaperAirplaneRef.current?.animationItem?.isPaused) {
        animatePaperAirplaneEntry()
        lottieTopLiquidRef.current?.playSegments([0, 25], true)
        lottieBottomLiquidRef.current?.playSegments([0, 20], true)
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

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    setIsSubmitDisabled(true)
    animatePaperAirplaneExit()
    lottiePaperAirplaneRef?.current?.animationItem?.addEventListener('complete', () => {
      lottiePaperAirplaneRef?.current?.animationItem?.removeEventListener('complete')

      form.resetField('subject')
      form.resetField('message')
      animateSentMessage([
        [
          sentMessageRef.current, {
            opacity: 0,
            display: 'block',
            transform: 'translateY(100%)',
          }, {
            duration: 0
          }
        ], [
          sentMessageRef.current, {
            opacity: 1,
            transform: 'translateY(0%)',
          }, {
            duration: 0.3,
            ease: "easeOut"
          }
        ], [
          sentMessageRef.current, {
            opacity: 1,
            transform: 'translateY(0%)',
          }, {
            duration: 0.2,
          }
        ], [
          sentMessageRef.current, {
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
      }, 2000)
    })
  }, [])

  return (
    <div className='relative h-screen w-screen flex flex-row justify-center'>
      <Container>
        <div className='relative flex flex-row justify-start'>
          <Header
            className='text-left'
            title='Contact'
            align='left'
            variant='cascade'
          />
          <div
            className='absolute overflow-hidden h-28 flex flex-col justify-end'
            style={{
              bottom: "calc(0%)",
              right: "calc(0% + 45px)",
              transform: "translate(-50%, 0%)"
            }}
          >
            <h3
              ref={sentMessageRef}
              className='text-success w-full hidden'
            >
              Sent!
            </h3>
          </div>
          <div
            ref={lottiePaperAirplaneContainerRef}
            className="absolute bottom-0 right-0 translate-y-[35%] translate-x-[30%] w-[300px] sm:w-[400px] md:w-[500px] pointer-events-none"
          >
            <Lottie
              lottieRef={lottiePaperAirplaneRef}
              animationData={paperAnimation}
              autoplay={false}
            />
          </div>
        </div>
        <div className='w-full max-w-screen-md flex flex-col md:flex-row'>
          <div className='relative p-12 bg-background rounded-t-md md:rounded-l-md w-full h-[200px] md:h-full md:w-[40%] overflow-hidden'>
            <div className='absolute h-full w-full flex flex-row justify-start items-start z-20'>
              <h2 className='leading-10 text-white -rotate-6'>
                <span className='text-3xl'>Let's</span>
                <br></br>
                <span>Connect!</span>
              </h2>
            </div>
            <div className='absolute top-[10%] left-[50%] translate-x-[-50%] scale-x-[200%] scale-y-[200%]'>
              <Lottie
                lottieRef={lottieTopLiquidRef}
                animationData={liquidAnimation}
                autoplay={false}
                loop={false}
              />
            </div>
            <div className='absolute bottom-[0%] left-[50%] translate-x-[-50%] scale-x-[-250%] scale-y-[250%] -rotate-12'>
              <Lottie
                lottieRef={lottieBottomLiquidRef}
                animationData={liquidAnimation}
                autoplay={false}
                loop={false}
              />
            </div>
          </div>
          <div className='bg-background-overlay rounded-b-md md:rounded-r-md w-full md:w-[60%]'>
            <Form {...form}>
              <form
                className='p-12 flex flex-col gap-5'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex flex-row justify-start gap-2'>
                        <FormLabel>Sender Email</FormLabel>
                        <FormMessage className='leading-none' />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="you@email.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex flex-row justify-start gap-2'>
                        <FormLabel>Subject</FormLabel>
                        <FormMessage className='leading-none' />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="I want to connect!"
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
                          placeholder="Hello! I'm interested in..."
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='flex flex-row justify-start'>
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
        <Socials />
      </Container>
    </div>
  )
}

export { Contact }
