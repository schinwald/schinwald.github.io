import z from 'zod'
import { json, redirect } from '@remix-run/react'
import { DatabaseManagementSystem } from '~/utils/database'
import { actionHandler } from '~/utils/remix/action.server'

const schema = z.object({
  provider: z.enum(['google', 'github'])
})

export const action = actionHandler(schema, async ({ input, request }) => {
  const errors: Record<string, any> = []

  const databaseManagementSystem = new DatabaseManagementSystem({ request })
  const { dbClient } = databaseManagementSystem.initialize()

  // Begin OAuth
  let url
  {
    const response = await dbClient.auth.signInWithOAuth({
      provider: input.provider,
      options: {
        redirectTo: `${request.url}/auth/callback`,
      }
    })

    if (response.error) {
      throw json({})
    }

    url = response.data.url
  }

  return redirect(url)
})
