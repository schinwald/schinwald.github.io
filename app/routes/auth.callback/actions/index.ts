import z from 'zod'
import { DatabaseManagementSystem } from '~/utils/database'
import { actionHandler } from '~/utils/remix/action.server'

const schema = z.object({
})

export const action = await actionHandler(schema, async ({ request }) => {
  const errors: Record<string, any> = []

  console.log('in')

  const databaseManagementSystem = new DatabaseManagementSystem({ request })

  const {
    headers,
    dbClient
  } = databaseManagementSystem.initialize()
})
