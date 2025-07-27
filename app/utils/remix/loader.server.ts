import type { LoaderFunctionArgs } from "react-router";
import { getNavigationJSONData } from "~/hooks/stores/navigation";
import { createContext, success } from "./utils.server";

type NeverRecord<T extends Record<string, unknown>> = {
  [K in keyof T]?: never;
};

// This is the global JSON data that is returned on each loader handler
// NOTE: to add more data, define a handler and add it to the object
export type GlobalJSONData = ReturnType<typeof getGlobalJSONData>;
const getGlobalJSONData = (args: LoaderFunctionArgs) => ({
  ...getNavigationJSONData(args),
});

// This is the JSON data that can be returned from the loader handler
// NOTE: this excludes global json data since there could be naming conflicts
type JSONData<T> = T & NeverRecord<GlobalJSONData>;

// type LoaderHandlerArgs = LoaderFunctionArgs & {
//   json: <T>(data: JSONData<T>) => <T>;
// };

export const loaderHandler = async <T>(callback: (args: any) => Promise<T>) => {
  return async (args: LoaderFunctionArgs) => {
    return await createContext(async () => {
      return await callback({
        ...args,
        json: (data: any) =>
          success({
            ...getGlobalJSONData(args),
            ...data,
          }),
      });
    });
  };
};
