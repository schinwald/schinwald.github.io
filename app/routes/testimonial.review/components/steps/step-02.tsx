import { Button } from "~/components/primitives/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
} from "~/components/primitives/ui/form";
import * as Textarea from "~/components/primitives/ui/textarea";
import { Rating } from "~/components/rating";
import { cn } from "~/utils/classname";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  coerceToFileIfPossible,
  type StepProps,
} from "./helper";

export const stepTwo: React.FC<StepProps> = ({
  state,
  onBack = () => {},
  onNext = () => {},
}) => {
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
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between gap-8 space-y-0">
                  <FormControl>
                    <Rating
                      step={1}
                      min={0}
                      max={5}
                      value={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                    />
                  </FormControl>
                  <div className="flex flex-row justify-center items-center text-foreground">
                    <h2 className="m-0">{field.value}/5</h2>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea.Root>
                      <Textarea.Field
                        placeholder="Write a review..."
                        rows={14}
                        {...field}
                      />
                    </Textarea.Root>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between mt-3">
              <Button
                variant="outline"
                click="squish-normally"
                onClick={() => onBack()}
              >
                <ArrowLeftIcon className="mr-2 -ml-1" />
                <span>Back</span>
              </Button>
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
