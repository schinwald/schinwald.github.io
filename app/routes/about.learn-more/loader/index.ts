import { json } from "@remix-run/node"

export const loader = async () => {
  const response = {}

  return json(response)
}

export type Loader = typeof loader
