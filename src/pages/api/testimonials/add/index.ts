import type { APIRoute } from "astro";
import { getSession } from 'auth-astro/server';
import { supabase } from '@/utils/database/supabase'
import { z } from "zod";

const schemaPOST = z.object({
  avatar: z
    .string()
    .min(1)
    .optional(),
  first_name: z
    .string()
    .min(1),
  last_name: z
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
    .number()
    .min(0)
    .max(5),
  review: z
    .string()
    .min(1),
})

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  const errors: Record<string, any>[] = []

  if (['development'].includes(import.meta.env.APP_ENVIRONMENT)) {
    // DO NOTHING
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
  }

  const bodyParser = schemaPOST.safeParse(await request.json())

  if (!bodyParser.success) {
    errors.push(bodyParser.error)
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: {
        'content-type': 'application/json'
      },
    })
  }

  const body = bodyParser.data

  const { error } = await supabase
    .from('testimonials')
    .insert({
      ...body
    })
  
  if (error) {
    errors.push({})
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: {
        'content-type': 'application/json'
      },
    })
  }

  const data = {}

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
  });
};
