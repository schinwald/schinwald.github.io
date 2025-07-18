import { z } from "zod";
import { authenticator } from "~/utils/authentication/authentication.server";
import { actionHandler } from "~/utils/remix/action.server";

export const action = actionHandler(
  {
    validators: {
      query: z.object({
        provider: z.enum(["google", "github"]),
      }),
    },
  },
  async ({ query, request }) => {
    await authenticator.authenticate(query.provider, request);
  },
);
