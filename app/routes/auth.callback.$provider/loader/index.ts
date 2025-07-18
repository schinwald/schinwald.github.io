import { z } from "zod";
import {
  authenticator,
  getRedirectURL,
  setUser,
} from "~/utils/authentication/authentication.server";
import { loaderHandler } from "~/utils/remix/loader.server";
import { redirect } from "~/utils/remix/utils.server";

const paramschema = z.object({
  provider: z.enum(["google", "github"]),
});

export const loader = loaderHandler(async ({ params, request }) => {
  const parsed = paramschema.safeParse(params);
  if (!parsed.success) {
    throw new Error("Invalid params");
  }

  // Exchange the code for the access token
  const user = await authenticator.authenticate(parsed.data.provider, request);
  await setUser(request, user);
  const redirectTo = await getRedirectURL(request);
  redirect(redirectTo ?? "/");
});
