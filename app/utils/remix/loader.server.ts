import type { LoaderFunctionArgs } from "react-router";
import { createContext } from "./utils.server";

export const loaderHandler = async <Result>(
  callback: (args: any) => Promise<Result>,
) => {
  return async (args: LoaderFunctionArgs) => {
    return await createContext(async () => {
      return await callback(args);
    });
  };
};
