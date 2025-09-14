import type {
  LoaderFunction,
  LoaderFunctionArgs,
  UNSAFE_DataWithResponseInit,
} from "react-router";
import { createContext } from "./utils.server";

type InferLoaderData<T> = T extends UNSAFE_DataWithResponseInit<infer U>
  ? U
  : never;
export type LoaderData<T extends LoaderFunction> = InferLoaderData<
  Awaited<ReturnType<T>>
>;

export const loaderHandler = async <Result>(
  callback: (args: any) => Promise<Result>,
) => {
  return async (args: LoaderFunctionArgs) => {
    return await createContext(async () => {
      return await callback(args);
    });
  };
};
