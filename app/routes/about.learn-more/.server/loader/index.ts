import { loaderHandler } from "~/utils/remix/loader.server";
import { success } from "~/utils/remix/utils.server";

export const loader = loaderHandler(async () => {
  const response = {};

  return success(response);
});

export type Loader = Awaited<typeof loader>;
