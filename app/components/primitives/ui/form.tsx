import type { FormMetadata } from "@conform-to/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type FetcherFormProps,
  type FetcherWithComponents,
  useFetcher,
} from "react-router";
import { cn } from "~/utils/classname";
import { Button, type ButtonProps } from "./button";

type FormContextValue<T extends Record<string, any>> = {
  form?: FormMetadata<T, string[]>;
  fields?: ReturnType<FormMetadata<T, string[]>["getFieldset"]>;
  fetcher: Omit<FetcherWithComponents<any>, "submit"> & {
    ref: React.RefObject<HTMLFormElement | null>;
    submit: () => void;
    registerSubmitSuccess: (callback: OnSubmitSuccess) => string;
    registerSubmitFailure: (callback: OnSubmitFailure) => string;
    unregisterSubmitSuccess: (id: string) => void;
    unregisterSubmitFailure: (id: string) => void;
  };
};

const FormContext = createContext<FormContextValue<any> | null>(null);

export const useForm = <T extends Record<string, any>>() => {
  const context = useContext<FormContextValue<T> | null>(FormContext);

  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
};

type OnSubmitSuccess = (data: any) => void;
type OnSubmitFailure = (errors: any) => void;

const useExtendedFetcher = () => {
  const ref = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();
  const previousState = useRef<FetcherWithComponents<any>["state"]>("idle");
  const submitSuccessCallbacks = useRef<Map<string, OnSubmitSuccess>>(
    new Map(),
  );
  const submitFailureCallbacks = useRef<Map<string, OnSubmitFailure>>(
    new Map(),
  );

  const submit = useCallback(() => {
    if (!ref.current) return;
    fetcher.submit(ref.current);
  }, [fetcher]);

  useEffect(() => {
    const shouldUpdatePreviousState = previousState.current !== fetcher.state;
    const wasTransitioning =
      previousState.current === "submitting" ||
      previousState.current === "loading";
    const isSubmissionFinished =
      wasTransitioning && fetcher.state === "idle" && fetcher.data;

    if (!isSubmissionFinished) {
      if (shouldUpdatePreviousState) {
        previousState.current = fetcher.state;
      }
      return;
    }

    const payload = fetcher.data;

    if ("data" in payload) {
      for (const callback of submitSuccessCallbacks.current.values()) {
        callback(payload.data);
      }
    }

    if ("error" in payload) {
      for (const callback of submitFailureCallbacks.current.values()) {
        callback(payload.errors);
      }
    }

    if (shouldUpdatePreviousState) {
      previousState.current = fetcher.state;
    }
  }, [fetcher.data, fetcher.state]);

  return {
    ...fetcher,
    ref,
    submit,
    registerSubmitSuccess: (callback: OnSubmitSuccess) => {
      const id = crypto.randomUUID();
      submitSuccessCallbacks.current.set(id, callback);
      return id;
    },
    registerSubmitFailure: (callback: OnSubmitFailure) => {
      const id = crypto.randomUUID();
      submitFailureCallbacks.current.set(id, callback);
      return id;
    },
    unregisterSubmitSuccess: (id: string) => {
      submitSuccessCallbacks.current.delete(id);
    },
    unregisterSubmitFailure: (id: string) => {
      submitFailureCallbacks.current.delete(id);
    },
  };
};

export type RootProps = React.RefAttributes<HTMLFormElement> & {
  form?: FormMetadata<any, string[]>;
  fields?: ReturnType<FormMetadata<any, string[]>["getFieldset"]>;
  onSubmitSuccess?: OnSubmitSuccess;
  onSubmitFailure?: OnSubmitFailure;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
} & FetcherFormProps;

export const Root: React.FC<RootProps> = ({
  form,
  fields,
  children,
  className,
  onSubmitSuccess = () => {},
  onSubmitFailure = () => {},
  ...props
}) => {
  const fetcher = useExtendedFetcher();

  useEffect(() => {
    const successId = fetcher.registerSubmitSuccess(onSubmitSuccess);
    const failureId = fetcher.registerSubmitFailure(onSubmitFailure);

    return () => {
      fetcher.unregisterSubmitSuccess(successId);
      fetcher.unregisterSubmitFailure(failureId);
    };
  }, [
    fetcher.registerSubmitSuccess,
    fetcher.registerSubmitFailure,
    fetcher.unregisterSubmitFailure,
    fetcher.unregisterSubmitSuccess,
    onSubmitFailure,
    onSubmitSuccess,
  ]);

  const value = useMemo(
    () => ({
      form,
      fields,
      fetcher,
    }),
    [fetcher, form, fields],
  );

  return (
    <FormContext.Provider value={value}>
      <fetcher.Form
        ref={fetcher.ref}
        id={form?.id}
        className={className}
        {...props}
      >
        {children}
      </fetcher.Form>
    </FormContext.Provider>
  );
};

type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Field: React.FC<FieldProps> = ({ className, children }) => {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
};

interface SubmitProps extends ButtonProps {
  intent: string;
  onSubmitSuccess?: OnSubmitSuccess;
  onSubmitFailure?: OnSubmitFailure;
}

export const Submit: React.FC<SubmitProps> = ({
  children,
  intent,
  onSubmitSuccess = () => {},
  onSubmitFailure = () => {},
  ...props
}) => {
  const { fetcher } = useForm();

  useEffect(() => {
    const successId = fetcher.registerSubmitSuccess(onSubmitSuccess);
    const failureId = fetcher.registerSubmitFailure(onSubmitFailure);

    return () => {
      fetcher.unregisterSubmitSuccess(successId);
      fetcher.unregisterSubmitFailure(failureId);
    };
  }, [
    fetcher.registerSubmitSuccess,
    fetcher.registerSubmitFailure,
    fetcher.unregisterSubmitFailure,
    fetcher.unregisterSubmitSuccess,
    onSubmitFailure,
    onSubmitSuccess,
  ]);

  return (
    <Button type="submit" name="intent" value={intent} {...props}>
      {children}
    </Button>
  );
};

export const Form = {
  Root,
  Field,
  Submit,
};
