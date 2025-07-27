import { z } from "zod";
import { actionHandler } from "~/utils/remix/action.server";

export const action = actionHandler(
  {
    validators: {
      json: z.object({
        email: z.string().email(),
      }),
    },
  },
  async ({ json, request }) => {
    return;
  },
);
