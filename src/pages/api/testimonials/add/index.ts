import type { APIRoute } from "astro";
import { getSession } from 'auth-astro/server';
import { supabase } from '@/utils/database/supabase'
import { z } from "zod";
import sharp from "sharp";
import { v4 as uuid } from 'uuid'

const schemaFormDataPOST = z.object({
  avatar: z
    .unknown()
    .refine((value): value is File | undefined => {
      if (value === undefined) return true
      if (value instanceof File && value.size > 0) return true
      return false
    }),
  full_name: z
    .string()
    .min(1),
  occupation: z
    .string()
    .min(1)
    .optional(),
  company: z
    .string()
    .min(1)
    .optional(),
  rating: z
    .coerce
    .number()
    .min(0)
    .max(5),
  review: z
    .string()
    .min(1),
})

export const POST: APIRoute = async ({ request }) => {
  const errors: Record<string, any>[] = []

  let session = await getSession(request);

  if (['development'].includes(import.meta.env.APP_ENVIRONMENT)) {
    session = {
      user: {
        id: '1234567890',
        name: 'John Smith',
        email: 'john.smith@email.com',
      },
      expires: '1234'
    }
  } else {
    if (!session) {
      errors.push({})
      return new Response(JSON.stringify({ errors }), {
        status: 403,
        headers: {
          'content-type': 'application/json'
        },
      })
    }

    if (!session.user) {
      errors.push({})
      return new Response(JSON.stringify({ errors }), {
        status: 403,
        headers: {
          'content-type': 'application/json'
        },
      })
    }
  }

  const formDataParser = schemaFormDataPOST
    .safeParse(Object.fromEntries(await request.formData()))

  if (!formDataParser.success) {
    errors.push(formDataParser.error)
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: {
        'content-type': 'application/json'
      },
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

    const { error } = await supabase
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
      return new Response(JSON.stringify({ errors }), {
        status: 500,
        headers: {
          'content-type': 'application/json'
        },
      })
    }
  }

  if (avatarPath) {
    const { data } = supabase
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

    const { error } = await supabase
      .from('testimonials')
      .insert(testimonial)
    
    if (error) {
      errors.push({})
      return new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: {
          'content-type': 'application/json'
        },
      })
    }
  }

  const data = {}

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
  });
};
