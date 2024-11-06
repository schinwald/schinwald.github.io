import z from 'zod'
import { DatabaseManagementSystem } from '~/utils/database'
import { actionHandler } from '~/utils/remix/action.server'

const schema = z.object({
})

export const action = actionHandler(schema, async ({ request }) => {
  const errors: Record<string, any> = []

  const databaseManagementSystem = new DatabaseManagementSystem({ request })

  const {
    headers,
    dbClient
  } = databaseManagementSystem.initialize()
})
