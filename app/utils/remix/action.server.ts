import type { Submission } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import type { ActionFunctionArgs } from "react-router";
import { match } from "ts-pattern";
import type { z } from "zod";
import { createContext } from "./utils.server";

type ExtendedActionFunctionArgs = ActionFunctionArgs & {
  json: unknown;
  formData: FormData | undefined;
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
      if (json?.error) {
        return {
          errors: json.error.issues,
        };
      }

      let submission: Submission<unknown> | undefined;
      if (options.validators?.formData && args.formData) {
        submission = parseWithZod(args.formData, {
          schema: options.validators.formData,
        });
        if (submission.status === "error") {
          return submission.reply();
        }
      }

      const params = options.validators?.params?.safeParse(args.params);
      if (params?.error) {
        return {
          errors: params.error.issues,
        };
      }

      const query = options.validators?.query?.safeParse(searchParams);
      if (query?.error) {
        return {
          errors: query.error.issues,
        };
      }

      // TODO: fix these types to return never
      return callback({
        ...args,
        json: json?.data as JSON,
        formData: submission?.payload as FormData,
        params: params?.data as Params,
        query: query?.data as Query,
      });
    });
  };
};

type Input = {
  json?: Record<string, unknown>;
  formData?: FormData;
};

const getInput = async (request: Request): Promise<Input> => {
  return match(request.headers.get("content-type"))
    .with("application/json", async () => ({
      json: await request.json(),
    }))
    .with("application/x-www-form-urlencoded;charset=UTF-8", async () => ({
      formData: await request.formData(),
    }))
    .with("multipart/form-data", async () => ({
      formData: await request.formData(),
    }))
    .otherwise(() => ({}));
};

export const actionHandlers = async <
  T,
  Actions extends Record<
    string,
    Promise<(args: ExtendedActionFunctionArgs) => Promise<T>>
  >,
>(
  actions: Actions,
) => {
  return async (args: ActionFunctionArgs) => {
    const input = await getInput(args.request);
    const intent = input.formData?.get("intent");

    if (!intent) throw new Error("No intent found in form data");
    if (typeof intent !== "string") throw new Error("Intent is not a string");

    const action = await actions[intent];
    if (!action) throw new Error(`No action found for intent: ${intent}`);

    return action({
      ...args,
      json: input.json,
      formData: input.formData,
    });
  };
};
