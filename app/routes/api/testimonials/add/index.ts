import { z } from "zod";
import sharp from "sharp";
import { v4 as uuid } from 'uuid'
import { ActionFunction } from "@remix-run/node";
import { DatabaseManagementSystem } from "~/utils/database";
import { TestimonialService } from "~/utils/services/testimonial";

const schemaFormDataPOST = z.object({
  avatar: z
    .unknown()
    .refine((value): value is File | undefined => {
      if (value === undefined) return true
      if (value instanceof File && value.size > 0) return true
      return false
    }),
  full_name: z
    .string(),
  occupation: z
    .string()
    .optional(),
  company: z
    .string()
    .optional(),
  rating: z
    .coerce
    .number()
    .min(0)
    .max(5),
  review: z
    .string()
})

export const action: ActionFunction = async ({ request }) => {
  if (request.method === 'POST') {
    const errors: Record<string, any>[] = []

    const databaseManagementSystem = new DatabaseManagementSystem({ request })

    const {
      headers,
      supabaseClient
    } = databaseManagementSystem.initialize()

    // Grab the session
    let session
    {
      const response = await databaseManagementSystem.getSession()

      if (response.errors) {
        throw new Response(JSON.stringify(response), {
          status: response.meta.status,
          headers
        })
      }

      session = response.data.session
    }

    const formDataParser = schemaFormDataPOST
      .safeParse(Object.fromEntries(await request.formData()))

    if (!formDataParser.success) {
      console.error(formDataParser.error)
      errors.push({})

      const response = {
        meta: {
          status: 422
        },
        errors
      }

      throw new Response(JSON.stringify(response), {
        status: response.meta.status,
        headers
      })
    }

    const formData = formDataParser.data

    let avatarPath, avatarPublicURL

    if (formData.avatar) {
      const buffer = await formData.avatar.arrayBuffer()

      const filename = `${uuid()}`
      const file = await sharp(buffer)
        .resize({ width: 256, height: 256, })
        .webp()
        .toBuffer()

      avatarPath = `public/${filename}.webp`

      const { error } = await supabaseClient
        .storage
        .from('avatars')
        .upload(avatarPath, file, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error(error)
        errors.push({})

        const response = {
          meta: {
            status: 500
          },
          errors
        }

        return new Response(JSON.stringify(response), {
          status: response.meta.status,
          headers
        })
      }
    }

    if (avatarPath) {
      const { data } = supabaseClient
        .storage
        .from('avatars')
        .getPublicUrl(avatarPath)

      avatarPublicURL = data.publicUrl
    }

    {
      const testimonial = {
        avatar: avatarPublicURL,
        rating: formData.rating,
        review: formData.review,
        occupation: formData.occupation,
        company: formData.company,
        full_name: formData.full_name,
        email: session.user?.email,
        session_id: session.user?.id,
      }

      const { error } = await supabaseClient
        .from('testimonials')
        .insert(testimonial)
      
      if (error) {
        console.error(error)
        errors.push({})

        const response = {
          meta: {
            status: 500
          },
          errors
        }

        return new Response(JSON.stringify(response), {
          status: response.meta.status,
          headers
        })
      }
    }

    const testimonialService = new TestimonialService({ request, supabaseClient })

    {
      const response = await testimonialService.create({
        id: session.user.id,
        email: session.user.email,
        fullName: formData.full_name,
        avatar: formData.avatar,
        rating: formData.rating,
        review: formData.review,
        occupation: formData.occupation,
        company: formData.company
      })

      if (response.errors) {
        return new Response(JSON.stringify(response), {
          status: response.meta.status,
          headers
        })
      }
    }

    return new Response(null, {
      status: 201,
      headers
    })
  }

  return new Response(null, {
    status: 404
  })
}
