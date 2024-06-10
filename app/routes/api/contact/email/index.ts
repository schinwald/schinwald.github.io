import z from 'zod'
import { EmailerService } from '~/utils/services/emailer'
import { ActionFunction } from '@remix-run/node'
import { DatabaseManagementSystem } from '~/utils/database'

const schemaQueryPOST = z.object({
  'g-recaptcha-response': z.string()
})

const schemaBodyPOST = z.object({
  email: z.string().email(),
  message: z.string()
})

export const action: ActionFunction = async ({ request }) => {
  if (request.method === 'POST') {
    const errors: Record<string, any> = []

    const databaseManagementSystem = new DatabaseManagementSystem({ request })

    const {
      headers
    } = databaseManagementSystem.initialize()

    const { searchParams } = new URL(request.url)

    const queryParser = await schemaQueryPOST
      .safeParseAsync(searchParams)
    const bodyParser = await schemaBodyPOST
      .safeParseAsync(await request.json())

    if (!queryParser.success) {
      console.error(queryParser.error)
      errors.push(queryParser.error)

      const response = {
        meta: {
          status: 422
        },
        errors
      }

      return new Response(JSON.stringify(response), {
        status: response.meta.status,
        headers
      })
    }

    if (!bodyParser.success) {
      console.error(bodyParser.error)
      errors.push(bodyParser.error)

      const response = {
        meta: {
          status: 422
        },
        errors
      }

      return new Response(JSON.stringify(response), {
        status: response.meta.status,
        headers
      })
    }

    const query = queryParser.data
    const body = bodyParser.data

    const emailerService = new EmailerService({ request })

    {
      const response = await emailerService.send({
        recaptchaResponse: query['g-recaptcha-response'],
        email: body.email,
        message: body.message
      })

      if (response.errors) {
        return new Response(JSON.stringify(response), {
          status: response.meta.status,
          headers
        })
      }
    }

    const response = {
      meta: {
        status: 200
      },
      data: null
    }

    return new Response(JSON.stringify(response), {
      status: response.meta.status,
      headers
    })
  }

  return new Response(null, {
    status: 404
  })
}