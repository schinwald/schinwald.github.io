import {
  getInputProps,
  getTextareaProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";
import z from "zod/v4";
import * as Card from "~/components/card";
import { Button } from "~/components/primitives/ui/button";
import {
  Form,
  useForm as useFormContext,
} from "~/components/primitives/ui/form";
import * as Textarea from "~/components/primitives/ui/textarea";
import { Rating } from "~/components/rating";
import { Testimonial } from "~/components/testimonial";
import type { Loader } from "../../.server/loader";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  type StepCollectorProps,
  type StepRootProps,
} from "./helper";

const schema = z.object({
  rating: z.number().min(0).max(5),
  review: z.string({ error: "(Required)" }).min(1, { error: "(Required)" }),
});

const Root: React.FC<StepRootProps> = ({ className, children }) => {
  const { testimonial } = useLoaderData<Loader>();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
    defaultValue: {
      rating: testimonial.rating,
      review: testimonial.review,
    },
  });

  return (
    <Form.Root method="PATCH" form={form} fields={fields} className={className}>
      {children}
    </Form.Root>
  );
};

const Collector: React.FC<StepCollectorProps> = ({
  onBack = () => {},
  onNext = () => {},
}) => {
  const { form, fields } = useFormContext<z.infer<typeof schema>>();

  if (!form || !fields) {
    throw new Error("FormProvider does not contain a form and/or fields");
  }

  const coerceToInt = (value: string | number = 0) => {
    if (typeof value === "string") return Number.parseInt(value);
    return Number.parseInt(value.toString());
  };

  return (
    <motion.div
      className="w-[50%] h-full"
      initial={{ x: "0%" }}
      animate={{ x: "100%" }}
      exit={{ x: "0%" }}
      transition={{ duration: 0.3 }}
    >
      <Card.Root>
        <Card.Content>
          <motion.div
            className="p-6 w-full h-full flex flex-col justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
            }}
          >
            <Form.Field className="flex-row justify-between">
              <Rating
                step={1}
                min={0}
                max={5}
                name={fields.rating.name}
                defaultValue={[coerceToInt(fields.rating.defaultValue)]}
              />
              <div className="flex flex-row justify-center items-center text-foreground">
                <h2 className="m-0">{coerceToInt(fields.rating.value)}/5</h2>
              </div>
            </Form.Field>
            <Form.Field>
              <Textarea.Root>
                <Textarea.Field
                  placeholder="Write a review..."
                  rows={14}
                  {...getTextareaProps(fields.review)}
                />
              </Textarea.Root>
            </Form.Field>
            <Form.Field className="flex flex-row justify-between mt-5">
              <Button
                variant="outline"
                click="squish-normally"
                onClick={() => onBack()}
              >
                <ArrowLeftIcon className="mr-2 -ml-1" />
                <span>Back</span>
              </Button>
              <Form.Submit
                click="squish-normally"
                intent="submitStepTwo"
                onSubmitSuccess={() => onNext()}
              >
                <span>Next</span>
                <ArrowRightIcon className="ml-2 -mr-1" />
              </Form.Submit>
            </Form.Field>
          </motion.div>
        </Card.Content>
      </Card.Root>
    </motion.div>
  );
};

const Preview = () => {
  const { form, fields } = useFormContext<z.infer<typeof schema>>();
  const { testimonial } = useLoaderData<Loader>();

  if (!form || !fields) {
    throw new Error("FormProvider does not contain a form and/or fields");
  }

  return (
    <motion.div
      className="w-[50%] h-full flex flex-col justify-center items-center"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <Testimonial
        avatar={testimonial.avatar ?? undefined}
        fullname={testimonial.fullName ?? undefined}
        occupation={testimonial.occupation ?? undefined}
        company={testimonial.company ?? undefined}
        rating={
          Number.parseInt(fields.rating.value ?? "0") ??
          testimonial.rating ??
          undefined
        }
        review={fields.review.value ?? testimonial.review ?? undefined}
      />
    </motion.div>
  );
};

export const StepTwo = {
  Root,
  Collector,
  Preview,
};
