import { z } from "zod";
import { actionHandler } from "~/utils/remix/action.server";

export const action = actionHandler(
  {
    validators: {
      json: z.object({}),
    },
  },
  async () => {
    // TODO: add some actions
  },
);
