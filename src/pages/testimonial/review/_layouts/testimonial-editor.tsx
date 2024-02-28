import { Button } from '@/components/primitives/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/primitives/ui/form'
import { Textarea } from '@/components/primitives/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@/layouts/container'
import { Rating } from '@/components/rating'

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 4,
      name: "",
      review: "",
      occupation: ""
    }
  })

  const isSubmitDisabled = false

  const onSubmit = () => {

  }


  // <div className='w-full flex flex-col gap-4 md:gap-5'>
  //   <div className='h-full'>
  //   </div>
  //   <FormField
  //     control={form.control}
  //     name="name"
  //     render={({ field }) => (
  //       <FormItem>
  //         <div className='flex flex-row justify-start gap-2'>
  //           <FormLabel>Name</FormLabel>
  //           <FormMessage className='leading-none' />
  //         </div>
  //         <FormControl>
  //           <Input
  //             {...field}
  //           />
  //         </FormControl>
  //       </FormItem>
  //     )}
  //   />
  //   <FormField
  //     control={form.control}
  //     name="name"
  //     render={({ field }) => (
  //       <FormItem>
  //         <div className='flex flex-row justify-start gap-2'>
  //           <FormLabel>Name</FormLabel>
  //           <FormMessage className='leading-none' />
  //         </div>
  //         <FormControl>
  //           <Input
  //             {...field}
  //           />
  //         </FormControl>
  //       </FormItem>
  //     )}
  //   />
  // </div>

  return (
    <Container
      className='max-w-screen-sm'
      variant='narrow'
    >
      <Form {...form}>
        <form
          className='w-full flex flex-col gap-4 md:gap-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-row justify-center'>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem
                  className='flex flex-row justify-between gap-10 space-y-0'
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
                <div className='flex flex-row justify-start gap-2'>
                  <FormLabel>Review</FormLabel>
                  <FormMessage className='leading-none' />
                </div>
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
    </Container>
  )
}

export { TestimonialEditor }
