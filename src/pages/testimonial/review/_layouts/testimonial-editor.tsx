import { Button } from '@/components/primitives/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/primitives/ui/form'
import { Textarea } from '@/components/primitives/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@/layouts/container'
import { Rating } from '@/components/rating'
import { Typewriter } from '@/components/typewriter'
import Lottie from 'lottie-react'
import waveAnimation from '@/assets/lotties/wave.json'
import { motion } from 'framer-motion'

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
    .min(1, { message: '(Required)' }),
})

type TestimonialEditorProps = {
  className?: string
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = () => {
  const isSubmitDisabled = false

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 4,
      name: "",
      review: "",
      occupation: ""
    }
  })

  const onSubmit = () => {}

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Container
        className='max-w-screen-sm'
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
            className='ml-[50px]'
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
              className='w-full flex flex-col gap-6 md:gap-5'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='flex flex-row justify-center'>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem
                      className='flex flex-row justify-between w-[400px] space-y-0 -ml-4'
                    >
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
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='flex flex-row justify-center mt-6'>
                <Button
                  type="submit"
                  disabled={isSubmitDisabled}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </Container>
      <motion.div
        className='absolute'
        initial={{ bottom: 0 }}
        animate={{ bottom: 250 }}
        transition={{
          ease: 'easeOut',
          duration: 1.0,
          delay: 2.5
        }}
      >
        {Array.from({ length: 40 }).map((value, i) => {
          const offset = i * 250 - 20 * 250
          return (
            <Lottie
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
