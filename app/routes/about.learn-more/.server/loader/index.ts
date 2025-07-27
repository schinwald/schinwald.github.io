import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async ({ json }) => {
  const response = {};

  return json(response);
});

export type Loader = Awaited<typeof loader>;
