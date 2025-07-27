import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ json }) => {
  return json({});
});

export type Loader = Awaited<typeof loader>;
