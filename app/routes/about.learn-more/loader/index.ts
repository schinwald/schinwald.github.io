import { json } from "@remix-run/node"
import { loaderHandler } from "~/utils/remix/loader.server"

export const loader = loaderHandler(async () => {
  const response = {}

  return json(response)
})

export type Loader = typeof loader
