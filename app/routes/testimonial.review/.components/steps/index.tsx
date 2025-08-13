import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import {
  SwitchTransition,
  Transition,
  type TransitionStatus,
} from "react-transition-group";
import * as Card from "~/components/card";
import { Form } from "~/components/primitives/ui/form";
import { cn } from "~/utils/classname";
import type { Loader } from "../../.server/loader";
import type { StepCollectorProps, StepRootProps } from "./helper";
import { StepOne } from "./step-01";
import { StepTwo } from "./step-02";
import { StepThree } from "./step-03";

type StepperRootProps = StepRootProps & {
  step: number;
};

type StepperContextValue = {
  step: number;
};

export const Steps = [StepOne, StepTwo, StepThree];

const StepperContext = createContext<StepperContextValue>({
  step: 0,
});

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStep must be used within a StepperProvider");
  }
  return context;
};

const useFormStep = (step: number) => {
  const loaderData = useLoaderData<Loader>();

  const stepData = {
    schema: Steps[step].schema,
    defaultValue: Steps[step].getDefaultValue(loaderData),
  };

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: stepData.schema });
    },
    defaultValue: stepData.defaultValue,
  });

  return { form, fields, method: "PATCH" as const };
};

const Root: React.FC<StepperRootProps> = ({ step, className, children }) => {
  const props = useFormStep(step);

  return (
    <StepperContext.Provider value={{ step }}>
      <Form.Root {...props} className={className}>
        {children}
      </Form.Root>
    </StepperContext.Provider>
  );
};

type StepperCollectorProps = StepCollectorProps;

const Collector: React.FC<StepperCollectorProps> = (props) => {
  const { step } = useStepper();

  const Step = Steps[step];

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <div className="w-full h-full absolute z-10" key={step}>
        <Step.Collector {...props} />
      </div>
    </AnimatePresence>
  );
};

const Preview: React.FC = () => {
  const { step } = useStepper();

  const Step = Steps[step];

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <div className="w-full h-full absolute z-0" key={step}>
        <Step.Preview />
      </div>
    </AnimatePresence>
  );
};

type ProgressProps = {
  step: number;
};

const Progress: React.FC<ProgressProps> = ({ step }) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      {Steps.map((_, index) => {
        const key = `step-${index}`;
        const active = step === index;
        return (
          <div
            key={key}
            className={cn(
              "transition-all duration-300 h-1 rounded-full w-3 bg-white/30",
              {
                "w-8 bg-white": active,
              },
            )}
          />
        );
      })}
    </div>
  );
};

export const Stepper = {
  Root,
  Collector,
  Preview,
  Progress,
};
