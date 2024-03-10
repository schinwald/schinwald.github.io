import type { APIRoute } from "astro";
import { supabase } from '@/utils/database/supabase'
import { z } from "zod";

const schemaPOST = z.object({
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
  const errors: Record<string, any>[] = []

  const body = await schemaPOST.parseAsync(await request.json())

  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .insert({
      ...body
    })
  
  if (error) {
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: {
        'content-type': 'application/json'
      },
    })
  }

  const data = {
    testimonials
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
  });
};
