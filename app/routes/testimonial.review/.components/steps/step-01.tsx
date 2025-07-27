import { useState } from "react";
import { MdUploadFile as UploadIcon } from "react-icons/md";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "~/components/dropzone";
import { Button } from "~/components/primitives/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/primitives/ui/form";
import * as Input from "~/components/primitives/ui/input";
import { cn } from "~/utils/classname";
import {
  ArrowRightIcon,
  coerceToFileIfPossible,
  type StepProps,
} from "./helper";

export const stepOne: React.FC<StepProps> = ({ state, onNext = () => {} }) => {
  const [files, setFiles] = useState<File[] | undefined>();

  const handleUpload = (files: File[]) => {
    setFiles(files);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const avatarFile = await coerceToFileIfPossible(values.avatar_url);

    if (avatarFile) formData.append("avatar", avatarFile, "avatar.png");
    if (values.occupation) formData.append("occupation", values.occupation);
    if (values.company) formData.append("company", values.company);
    formData.append("full_name", values.full_name);
    formData.append("rating", values.rating.toString());
    formData.append("review", values.review);

    const response = await fetch("/api/testimonials/add", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());

    if ("errors" in response) {
      return;
    }

    onNext();
  }

  return (
    <div
      className={cn("duration-300", {
        "animate-fade-in": state === "entering" || state === "entered",
        "animate-fade-out": state === "exiting" || state === "exited",
      })}
    >
      <Form {...form}>
        <form
          className="w-full flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center gap-6">
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
                  <h6>
                    {form.getValues().avatar_url
                      ? "Change avatar"
                      : "Upload avatar"}
                  </h6>
                  <p className="text-foreground/70">
                    Drag and drop or click to upload
                  </p>
                </div>
              </DropzoneEmptyState>
              <DropzoneContent />
            </Dropzone>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-start gap-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormMessage className="leading-none" />
                  </div>
                  <FormControl>
                    <Input.Root>
                      <Input.Field {...field} />
                    </Input.Root>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-start gap-2">
                    <FormLabel>Occupation</FormLabel>
                    <FormMessage className="leading-none" />
                  </div>
                  <FormControl>
                    <Input.Root>
                      <Input.Field {...field} />
                    </Input.Root>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-start gap-2">
                    <FormLabel>Company</FormLabel>
                    <FormMessage className="leading-none" />
                  </div>
                  <FormControl>
                    <Input.Root>
                      <Input.Field {...field} />
                    </Input.Root>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end mt-3">
              <Button click="squish-normally" onClick={() => onNext()}>
                <span>Next</span>
                <ArrowRightIcon className="ml-2 -mr-1" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
