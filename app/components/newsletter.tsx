import {
  getInputProps,
  type SubmissionResult,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useCallback, useState } from "react";
import type { ZodType } from "zod";
import { cn } from "~/utils/classname";
import { Form } from "./primitives/ui/form";
import { Input } from "./primitives/ui/input";

type NewsletterProps = {
  className?: string;
  isSubscribed: boolean;
  validators: {
    formData: ZodType;
  };
};

const Newsletter: React.FC<NewsletterProps> = ({
  className,
  isSubscribed,
  validators,
}) => {
  const [lastResult, setLastResult] = useState<SubmissionResult>();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: validators.formData });
    },
  });

  const onSubmit = useCallback((data: SubmissionResult) => {
    setLastResult(data);
  }, []);

  return (
    <div className={cn("flex flex-row items-end justify-between", className)}>
      <div className="flex flex-col gap-4">
        <h3 className="text-shadow-lg">Newsletter</h3>
        <p>
          Subscribe to this newsletter to receive notifications when new
          articles are published
        </p>
        <Form.Root
          form={form}
          fields={fields}
          method="POST"
          className="flex flex-row gap-4"
          onSubmitSuccess={onSubmit}
          onSubmitFailure={onSubmit}
        >
          <Form.Field className="relative">
            <Input.Root className="w-[400px]">
              <Input.Field
                {...getInputProps(fields.email, { type: "email" })}
                placeholder="Enter your email"
              />
            </Input.Root>
            <Form.Errors
              className="absolute top-[100%] mt-2"
              field={fields.email}
            />
          </Form.Field>
          <Form.Submit
            variant={isSubscribed ? "outline" : "default"}
            disabled={isSubscribed}
            intent="subscribeToNewsletter"
            click="squish-normally"
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Form.Submit>
        </Form.Root>
      </div>
      <span className="text-[5rem]">🚀</span>
    </div>
  );
};

Newsletter.displayName = "Newsletter";

export { Newsletter };
