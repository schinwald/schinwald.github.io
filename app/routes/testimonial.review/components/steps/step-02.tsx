import { getTextareaProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";
import z from "zod/v4";
import { Card } from "~/components/card";
import { Button } from "~/components/primitives/ui/button";
import {
  Form,
  useForm as useFormContext,
} from "~/components/primitives/ui/form";
import { Textarea } from "~/components/primitives/ui/textarea";
import { Rating } from "~/components/rating";
import { Testimonial } from "~/components/testimonial";
import type { Loader } from "../../server/loader";
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
      className="h-full w-[50%]"
      initial={{ x: "0%" }}
      animate={{ x: "100%" }}
      exit={{ x: "0%" }}
      transition={{ duration: 0.3 }}
    >
      <Card.Root size="xl">
        <Card.Content>
          <motion.div
            className="flex h-full w-full flex-col justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
            }}
          >
            <Form.Field className="flex-row justify-between mb-3">
              <Rating
                step={1}
                min={0}
                max={5}
                name={fields.rating.name}
                defaultValue={[coerceToInt(fields.rating.defaultValue)]}
              />
              <div className="flex flex-row items-center justify-center text-foreground">
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
            <Form.Field className="mt-5 flex flex-row justify-between">
              <Button
                variant="outline"
                click="squish-normally"
                onClick={() => onBack()}
              >
                <ArrowLeftIcon className="-ml-1 mr-2" />
                <span>Back</span>
              </Button>
              <Form.Submit
                click="squish-normally"
                intent="submitStepTwo"
                onSubmitSuccess={() => onNext()}
              >
                <span>Next</span>
                <ArrowRightIcon className="-mr-1 ml-2" />
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
      className="flex h-full w-[50%] flex-col items-center justify-center"
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
