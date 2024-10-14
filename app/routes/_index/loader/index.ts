import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/react"
import { DatabaseManagementSystem } from "~/utils/database"
import { randomlyFillData } from "~/utils/helpers"
import { TestimonialService } from "~/utils/services/testimonial.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const dbms = new DatabaseManagementSystem({ request })

  const {
    headers,
    dbClient
  } = dbms.initialize()

  const testimonialService = new TestimonialService({ request, dbClient })

  // Grab testimonials
  let testimonials
  {
    const response = await testimonialService.read()

    if (response.errors) {
      throw new Response(JSON.stringify(response), {
        status: response.meta.status,
        headers
      })
    }

    testimonials = response.data.testimonials
  }

  const response = {
    meta: {
      status: 200
    },
    data: {
      testimonials: randomlyFillData(testimonials, 30),
      googleReCAPTCHASiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY
    }
  }

  return json(response)
}

export type Loader = typeof loader
