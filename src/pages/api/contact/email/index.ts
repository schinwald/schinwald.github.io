import type { APIRoute } from "astro";
import emailer from '@/utils/services/sendgrid'
import z from 'zod'

const schemaQuery = z.object({
  'g-recaptcha-response': z.string()
})

const schemaBody = z.object({
  email: z.string().email(),
  message: z.string()
})

export const POST: APIRoute = async ({ params, request }) => {
  const queryParser = await schemaQuery
    .safeParseAsync(params)
  const bodyParser = await schemaBody
    .safeParseAsync(await request.json())

  if (!queryParser.success) {
    console.error(queryParser.error)
    return new Response(
      'Something went wrong!',
      { status: 400 }
    )
  }

  if (!bodyParser.success) {
    console.error(bodyParser.error)
    return new Response(
      'Something went wrong!',
      { status: 400 }
    )
  }

  const query = queryParser.data
  const body = bodyParser.data

  { // Make sure the recaptcha is valid
    const queryString = new URLSearchParams({
      secret: import.meta.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: query["g-recaptcha-response"]
    }).toString()

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?${queryString}`, {
      method: 'POST'
    }).then(response => response.json())

    if (!response.success) {
      console.error(response)
      return new Response(
        'Something went wrong!',
        { status: 400 }
      )
    }
  }

  try {
    await emailer.send({
      from: 'website@schinwald.dev',
      to: 'hi@schinwald.dev',
      subject: `New message! ${body.email}`,
      text: body.message
    })
  } catch (error) {
    console.error(JSON.stringify(error))
    return new Response(
      'Something went wrong!',
      { status: 400 }
    )
  }

  return new Response(
    'Successfully sent email!',
    { status: 200 }
  );
};
