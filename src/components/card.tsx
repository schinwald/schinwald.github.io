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

type CardProps = {
  className?: string
}

const Card: React.FC<CardProps> = ({ className, ...props }) => {
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
          <div className='hidden md:block'>
            <div
              className='flex absolute overflow-hidden h-28 flex-col justify-end'
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
              className="absolute bottom-0 right-0 translate-y-[35%] translate-x-[30%] w-[300px] sm:w-[400px] lg:w-[500px] pointer-events-none"
            >
              <Lottie
                lottieRef={lottiePaperAirplaneRef}
                animationData={paperAnimation}
                autoplay={false}
              />
            </div>
          </div>
        </div>
      </Container>
      <Container variant='hybrid'>
        <div className='flex flex-col md:flex-row'>
          <div className='relative flex flex-row md:flex-col justify-between p-8 md:p-12 bg-background rounded-t-md md:rounded-none md:rounded-l-md w-full h-[130px] md:h-auto md:w-[40%] overflow-hidden'>
            <div className='relative'>
              <div className='absolute top-0 right-0 bottom-0 left-0 flex flex-row justify-start items-start z-20'>
                <h2 className='leading-10 text-white -rotate-6'>
                  <span className='text-3xl'>Let's</span>
                  <br></br>
                  <span>Connect!</span>
                </h2>
              </div>
            </div>
            <div className='absolute bottom-0 right-0 -translate-y-full -translate-x-1/2 mt-2'>
              <h2
                ref={sentMessageRef}
                className='text-success w-full hidden'
              >
                Sent!
              </h2>
            </div>
            <div className='relative mb-2 mr-16 md:m-0 md:ml-20 md:mb-56'>
              <div
                ref={lottiePaperAirplaneContainerRef}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[400px] lg:w-[500px] pointer-events-none"
              >
                <Lottie
                  lottieRef={lottiePaperAirplaneRef}
                  animationData={paperAnimation}
                  autoplay={false}
                />
              </div>
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
