import { loaderHandler } from "~/utils/remix/loader.server";
import { getNavigationJSONData } from "./hooks/stores/navigation";

export const loader = loaderHandler(async (args) => {
  return {
    ...getNavigationJSONData(args),
  };
});

export type Loader = Awaited<typeof loader>;
