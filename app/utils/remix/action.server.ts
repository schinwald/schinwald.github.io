import type { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";

type CallbackArgs<S> = ActionFunctionArgs & {
  input: S;
}

export const actionHandler = async <T, S>(
  schema: z.ZodSchema<S>,
  callback: (args: CallbackArgs<S>) => Promise<T>
) => {
  return async (args: ActionFunctionArgs) => {
    const { request } = args

    const json = await request.json()
    const { data, error } = schema.safeParse(json)

    if (error) {
      throw new Response(error.message, {
        status: 422,
        headers: { "Content-Type": "application/json" }
      })
    }

    callback({ ...args, input: data })
  }
}
