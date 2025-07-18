import {
  getRedirectURL,
  getUser,
  setRedirectURL,
} from "~/utils/authentication/authentication.server";
import { loaderHandler } from "~/utils/remix/loader.server";
import { redirect } from "~/utils/remix/utils.server";

export const loader = loaderHandler(async ({ request, json }) => {
  const user = await getUser(request);

  if (user) {
    const redirectTo = await getRedirectURL(request);
    redirect(redirectTo ?? "/");
  }

  const redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (redirectTo) await setRedirectURL(request, redirectTo);
  return json({});
});

export type Loader = Awaited<typeof loader>;
