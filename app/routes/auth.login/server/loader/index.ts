import { loaderHandler } from "~/utils/remix/loader.server";
import {
  getRedirectURL,
  getUser,
  setRedirectURL,
} from "~/utils/remix/sessions.server";
import { redirect, success } from "~/utils/remix/utils.server";

export const loader = loaderHandler(async ({ request }) => {
  const user = await getUser(request);

  if (user) {
    const redirectTo = await getRedirectURL(request);
    redirect(redirectTo ?? "/");
  }

  const redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (redirectTo) await setRedirectURL(request, redirectTo);
  return success({});
});

export type Loader = Awaited<typeof loader>;
