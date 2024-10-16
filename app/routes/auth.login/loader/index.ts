import { json } from "@remix-run/node"
import { loaderHandler } from "~/utils/remix/loader.server"

export const loader = await loaderHandler(async () => {
  return json({})
})


export type Loader = typeof loader
