import type { APIRoute } from "astro";
import emailer from '@/utils/services/sendgrid'
import z from 'zod'

const schemaBody = z.object({
  email: z.string().email(),
  message: z.string()
})

export const POST: APIRoute = async ({ request }) => {
  const bodyParser = await schemaBody
    .safeParseAsync(await request.json())

  if (!bodyParser.success) {
    console.error(bodyParser.error)
    return new Response(
      'Something went wrong!',
      { status: 400 }
    )
  }

  const body = bodyParser.data

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
