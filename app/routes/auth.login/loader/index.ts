import { json } from "@remix-run/node"

export const loader = async () => {
  return json({})
}


export type Loader = typeof loader
