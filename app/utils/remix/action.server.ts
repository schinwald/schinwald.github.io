import type { ActionFunctionArgs } from "react-router";
import { match } from "ts-pattern";
import type { z } from "zod";
import { createContext } from "./utils.server";

type ExtendedActionFunctionArgs = ActionFunctionArgs & {
  json: unknown;
  formData: unknown;
};

type ActionOptions<JSON, FormData, Params, Query> = {
  validators?: Partial<{
    json: z.ZodSchema<JSON>;
    formData: z.ZodSchema<FormData>;
    params: z.ZodSchema<Params>;
    query: z.ZodSchema<Query>;
  }>;
};

type CallbackArgs<JSON, FormData, Params, Query> = Omit<
  ActionFunctionArgs,
  "json" | "formData" | "params"
> & {
  json: JSON;
  formData: FormData;
  params: Params;
  query: Query;
};

export const actionHandler = async <JSON, FormData, Params, Query, Result>(
  options: ActionOptions<JSON, FormData, Params, Query>,
  callback: (
    args: CallbackArgs<JSON, FormData, Params, Query>,
  ) => Promise<Result>,
) => {
  return async (args: ExtendedActionFunctionArgs) => {
    return createContext(async () => {
      const url = new URL(args.request.url);

      const searchParams: Record<string, string> = {};
      for (const [key, value] of url.searchParams.entries()) {
        searchParams[key] = value;
      }

      const json = options.validators?.json?.safeParse(args.json);
      if (json?.error) throw new Error("Invalid JSON");

      const formData = options.validators?.formData?.safeParse(args.formData);
      if (formData?.error) throw new Error("Invalid form data");

      const params = options.validators?.params?.safeParse(args.params);
      if (params?.error) throw new Error("Invalid params");

      const query = options.validators?.query?.safeParse(searchParams);
      if (query?.error) throw new Error("Invalid query");

      // TODO: fix these types to return never
      return callback({
        ...args,
        json: json?.data as JSON,
        formData: formData?.data as FormData,
        params: params?.data as Params,
        query: query?.data as Query,
      });
    });
  };
};

const getInput = async (request: Request) => {
  return await match(request.headers.get("content-type"))
    .with("application/json", () => request.json())
    .with("application/x-www-form-urlencoded;charset=UTF-8", () =>
      request.formData().then(Object.fromEntries),
    )
    .with("multipart/form-data", () =>
      request.formData().then(Object.fromEntries),
    )
    .otherwise(() => null);
};

export const intent = <
  Actions extends Record<
    string,
    Promise<(args: ExtendedActionFunctionArgs) => Promise<void>>
  >,
>(
  actions: Actions,
) => {
  return async (args: ActionFunctionArgs) => {
    const input = await getInput(args.request);
    const action = await actions[input.intent];
    if (!action) throw new Error(`No action found for intent: ${intent}`);
    return action({
      ...args,
      json: input,
      formData: input,
    });
  };
};
