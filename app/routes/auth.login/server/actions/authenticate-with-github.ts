import { authenticator } from "~/utils/authentication/authentication.server";
import { actionHandler } from "~/utils/remix/action.server";

export const action = actionHandler({}, async ({ request }) => {
  await authenticator.authenticate("github", request);
});
