import { getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdUploadFile as UploadIcon } from "react-icons/md";
import { useLoaderData } from "react-router";
import z from "zod/v4";
import * as Card from "~/components/card";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "~/components/dropzone";
import {
  Form,
  useForm as useFormContext,
} from "~/components/primitives/ui/form";
import * as Input from "~/components/primitives/ui/input";
import { Label } from "~/components/primitives/ui/label";
import { Testimonial } from "~/components/testimonial";
import type { Loader } from "../../server/loader";
import {
  ArrowRightIcon,
  type StepCollectorProps,
  type StepRootProps,
} from "./helper";

const schema = z.object({
  avatarURL: z.string().optional(),
  fullName: z.string({ error: "(Required)" }).regex(/.+ .+/, {
    message: "(Must be a full name)",
  }),
  occupation: z.string().optional(),
  company: z.string().optional(),
});

const Root: React.FC<StepRootProps> = ({ className, children }) => {
  const { testimonial } = useLoaderData<Loader>();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
    defaultValue: {
      avatarURL: testimonial.avatar,
      fullName: testimonial.fullName,
      occupation: testimonial.occupation,
      company: testimonial.company,
    },
  });

  return (
    <Form.Root method="PATCH" form={form} fields={fields} className={className}>
      {children}
    </Form.Root>
  );
};

const Collector: React.FC<StepCollectorProps> = ({ onNext = () => {} }) => {
  const [files, setFiles] = useState<File[] | undefined>();

  const { form, fields } = useFormContext<z.infer<typeof schema>>();

  if (!form || !fields) {
    throw new Error("FormProvider does not contain a form and/or fields");
  }

  const handleUpload = (files: File[]) => {
    setFiles(files);
  };

  return (
    <motion.div
      className="w-[50%] h-full"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <Card.Root size="xl">
        <Card.Content>
          <motion.div
            className="w-full h-full flex flex-col justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
            }}
          >
            <Form.Field>
              <Dropzone
                maxFiles={1}
                onDrop={handleUpload}
                onError={console.error}
                src={files}
                className="bg-white/10 border-dashed border-white/70"
              >
                <DropzoneEmptyState>
                  <div className="flex flex-col items-center gap-4 text-foreground">
                    <UploadIcon className="size-10" />
                    <h6>Upload avatar</h6>
                    <p className="text-foreground/70">
                      Drag and drop or click to upload
                    </p>
                  </div>
                </DropzoneEmptyState>
                <DropzoneContent />
              </Dropzone>
            </Form.Field>
            <Form.Field>
              <div className="flex flex-row gap-2">
                <Label htmlFor={fields.fullName.id}>Full name</Label>
                <span id={fields.fullName.errorId} className="text-destructive">
                  {fields.fullName.errors}
                </span>
              </div>
              <Input.Root>
                <Input.Field
                  {...getInputProps(fields.fullName, { type: "text" })}
                />
              </Input.Root>
            </Form.Field>
            <Form.Field>
              <div className="flex flex-row gap-2">
                <Label htmlFor={fields.occupation.id}>Occupation</Label>
                <span
                  id={fields.occupation.errorId}
                  className="text-destructive"
                >
                  {fields.occupation.errors}
                </span>
              </div>
              <Input.Root>
                <Input.Field
                  {...getInputProps(fields.occupation, { type: "text" })}
                />
              </Input.Root>
            </Form.Field>
            <Form.Field>
              <div className="flex flex-row gap-2">
                <Label htmlFor={fields.company.id}>Company</Label>
                <span id={fields.company.errorId} className="text-destructive">
                  {fields.company.errors}
                </span>
              </div>
              <Input.Root>
                <Input.Field
                  {...getInputProps(fields.company, { type: "text" })}
                />
              </Input.Root>
            </Form.Field>
            <Form.Field className="flex flex-row justify-end mt-5">
              <Form.Submit
                click="squish-normally"
                intent="submitStepOne"
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

const Preview: React.FC = () => {
  const { form, fields } = useFormContext<z.infer<typeof schema>>();
  const { testimonial } = useLoaderData<Loader>();

  if (!form || !fields) {
    throw new Error("FormProvider does not contain a form and/or fields");
  }

  return (
    <motion.div
      className="w-[50%] h-full flex flex-col justify-center items-center"
      initial={{ x: "0%" }}
      animate={{ x: "100%" }}
      exit={{ x: "0%" }}
      transition={{ duration: 0.3 }}
    >
      <Testimonial
        avatar={fields.avatarURL.value ?? testimonial.avatar ?? undefined}
        fullname={fields.fullName.value ?? testimonial.fullName ?? undefined}
        occupation={
          fields.occupation.value ?? testimonial.occupation ?? undefined
        }
        company={fields.company.value ?? testimonial.company ?? undefined}
        rating={testimonial.rating ?? undefined}
        review={testimonial.review ?? undefined}
      />
    </motion.div>
  );
};

export const StepOne = {
  Root,
  Collector,
  Preview,
};
