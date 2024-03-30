import type { APIRoute } from "astro";
import { supabase } from '@/utils/database/supabase'

export const GET: APIRoute = async ({}) => {
  const errors: Record<string, any>[] = []

  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('avatar, full_name, company, occupation, review, rating')
    .eq('approved', true)

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
