import { LoaderFunctionArgs } from "@remix-run/node";

export const loaderHandler = async <T>(callback: (args: LoaderFunctionArgs) => Promise<T> | T) => {
  return callback
}
