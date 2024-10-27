import { z } from "zod";
import { actionHandler } from "~/utils/remix/action.server";

const schema = z.object({})

export const action = actionHandler(schema, async () => {
  // TODO: add some actions
})
