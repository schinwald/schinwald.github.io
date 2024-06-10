
import z from 'zod'
import { ActionFunction, json, redirect } from '@remix-run/node'
import { DatabaseManagementSystem } from '~/utils/database'

const schemaBodyPOST = z.object({
  provider: z.enum(['google', 'github'])
})

export const action: ActionFunction = async ({ request }) => {
  if (request.method === 'POST') {
    const errors: Record<string, any> = []

    const databaseManagementSystem = new DatabaseManagementSystem({ request })

    const {
      headers,
      supabaseClient
    } = databaseManagementSystem.initialize()

    const bodyParser = await schemaBodyPOST
      .safeParseAsync(await request.json())

    if (!bodyParser.success) {
      console.error(bodyParser.error)
      errors.push(bodyParser.error)

      const response = {
        meta: {
          status: 422
        },
        errors
      }

      return json(response, {
        status: response.meta.status,
        headers
      })
    }

    const body = bodyParser.data

    // Begin OAuth
    let url
    {
      const response = await supabaseClient.auth.signInWithOAuth({
        provider: body.provider
      })

      if (response.error) {
        throw json({

        })
      }

      url = response.data.url
    }

    return redirect(url)
  }

  return new Response(null, {
    status: 404
  })
}