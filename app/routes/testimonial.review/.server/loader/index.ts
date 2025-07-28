import { requireAuthentication } from "~/utils/authentication/authentication.server";
import { loaderHandler } from "~/utils/remix/loader.server";
import { success } from "~/utils/remix/utils.server";

export const loader = loaderHandler(async ({ request }) => {
  const user = await requireAuthentication(request);
  return success({
    user: user,
  });
});

export type Loader = Awaited<typeof loader>;
