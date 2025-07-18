import { loaderHandler } from "~/utils/remix/loader.server";

export const loader = loaderHandler(async () => {
  return {};
});

export type Loader = Awaited<typeof loader>;
