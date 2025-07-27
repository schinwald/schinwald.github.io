import { requireAuthentication } from "~/utils/authentication/authentication.server";
import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ request, json }) => {
  const user = await requireAuthentication(request);
  return json({
    user: user,
  });
});

export type Loader = Awaited<typeof loader>;
