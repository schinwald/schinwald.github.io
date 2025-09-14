import type {
  FieldMetadata,
  FormMetadata,
  SubmissionResult,
} from "@conform-to/react";
import { Label as PrimitiveLabel } from "@radix-ui/react-label";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { CgSpinnerTwoAlt as SpinnerIcon } from "react-icons/cg";
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

type OnSubmitSuccess = (data: SubmissionResult) => void;
type OnSubmitFailure = (data: SubmissionResult) => void;

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
        callback(payload);
      }
    }

    if ("error" in payload) {
      for (const callback of submitFailureCallbacks.current.values()) {
        callback(payload);
      }
    }

    if (shouldUpdatePreviousState) {
      previousState.current = fetcher.state;
    }
  }, [fetcher.data, fetcher.state]);

  const registerSubmitSuccess = useCallback((callback: OnSubmitSuccess) => {
    const id = crypto.randomUUID();
    submitSuccessCallbacks.current.set(id, callback);
    return id;
  }, []);

  const registerSubmitFailure = useCallback((callback: OnSubmitFailure) => {
    const id = crypto.randomUUID();
    submitFailureCallbacks.current.set(id, callback);
    return id;
  }, []);

  const unregisterSubmitSuccess = useCallback((id: string) => {
    submitSuccessCallbacks.current.delete(id);
  }, []);

  const unregisterSubmitFailure = useCallback((id: string) => {
    submitFailureCallbacks.current.delete(id);
  }, []);

  return {
    ...fetcher,
    ref,
    submit,
    registerSubmitSuccess,
    registerSubmitFailure,
    unregisterSubmitSuccess,
    unregisterSubmitFailure,
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
    console.log("reg");
    return () => {
      console.log("unreg");
      fetcher.unregisterSubmitSuccess(successId);
    };
  }, [
    fetcher.registerSubmitSuccess,
    fetcher.unregisterSubmitSuccess,
    onSubmitSuccess,
  ]);

  useEffect(() => {
    const failureId = fetcher.registerSubmitFailure(onSubmitFailure);
    return () => {
      fetcher.unregisterSubmitFailure(failureId);
    };
  }, [
    fetcher.registerSubmitFailure,
    fetcher.unregisterSubmitFailure,
    onSubmitFailure,
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

type LabelProps = {
  field: FieldMetadata;
  children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ field, children }) => {
  return (
    <div className="flex flex-row gap-2">
      <PrimitiveLabel className="m-0" htmlFor={field.id}>
        {children}
      </PrimitiveLabel>
      <span
        id={field.errorId}
        className="text-destructive text-md leading-[22px]"
      >
        {field.errors}
      </span>
    </div>
  );
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
    return () => {
      fetcher.unregisterSubmitSuccess(successId);
    };
  }, [
    fetcher.registerSubmitSuccess,
    fetcher.unregisterSubmitSuccess,
    onSubmitSuccess,
  ]);

  useEffect(() => {
    const failureId = fetcher.registerSubmitFailure(onSubmitFailure);
    return () => {
      fetcher.unregisterSubmitFailure(failureId);
    };
  }, [
    fetcher.registerSubmitFailure,
    fetcher.unregisterSubmitFailure,
    onSubmitFailure,
  ]);

  return (
    <Button type="submit" name="intent" value={intent} {...props}>
      {children}
    </Button>
  );
};

const Spinner: React.FC = () => {
  const { fetcher } = useForm();

  return (
    <SpinnerIcon
      className={cn(
        "size-8 animate-spin animate-grow scale-100 transition-all",
        {
          "scale-0": fetcher.state === "idle",
        },
      )}
    />
  );
};

export const Form = {
  Root,
  Field,
  Label,
  Submit,
  Spinner,
};
