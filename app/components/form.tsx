import { type FormProps, useFetcher } from "react-router";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from "react";
import { cn } from "~/utils/classname";
import { Button, type ButtonProps } from "./primitives/ui/button";

type FormContextType = {
  submit: () => void;
};

const FormContext = createContext<FormContextType | null>(null);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

interface RootProps extends PropsWithChildren<FormProps> {}

export const Root: React.FC<RootProps> = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  const value = useMemo(
    () => ({
      submit: () => {
        fetcher.submit(ref.current);
      },
      state: fetcher.state,
    }),
    [fetcher],
  );

  return (
    <FormContext.Provider value={value}>
      <fetcher.Form
        ref={ref}
        method="post"
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </fetcher.Form>
    </FormContext.Provider>
  );
};

interface SubmitProps extends ButtonProps {
  intent?: string;
}

export const Submit: React.FC<SubmitProps> = ({
  children,
  intent,
  ...props
}) => {
  return (
    <Button type="submit" name="intent" value={intent} {...props}>
      {children}
    </Button>
  );
};

export const Form = {
  Root,
  Submit,
};
