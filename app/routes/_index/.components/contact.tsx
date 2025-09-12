import {
  getInputProps,
  getTextareaProps,
  type SubmissionResult,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { Label } from "@radix-ui/react-label";
import { useAnimate, useInView } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { useLoaderData } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import { z } from "zod/v4";
import paperAnimation from "~/assets/lotties/paper_airplane.json";
import { Header } from "~/components/header";
import { LazyLottie } from "~/components/lottie.client";
import { Form } from "~/components/primitives/ui/form";
import * as Input from "~/components/primitives/ui/input";
import * as Textarea from "~/components/primitives/ui/textarea";
import { Socials } from "~/components/socials";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import type { Loader } from "../.server/loader";

type Notification = {
  status?: "success" | "error";
  message?: string;
};

const schema = z.object({
  email: z.email({ error: "(Must be a valid email)" }),
  message: z.string().min(1, { error: "(Required)" }),
});

type ContactProps = {
  className?: string;
};

const useNotificationAnimation = () => {
  const [value, setValue] = useState<Notification>({});
  const [ref, animate] = useAnimate();

  const play = () => {
    animate([
      [
        ref.current,
        {
          opacity: 0,
          display: "block",
          transform: "translateY(100%)",
        },
        {
          duration: 0,
        },
      ],
      [
        ref.current,
        {
          opacity: 1,
          transform: "translateY(0%)",
        },
        {
          duration: 0.2,
          ease: "easeOut",
        },
      ],
      [
        ref.current,
        {
          opacity: 1,
          transform: "translateY(0%)",
        },
        {
          duration: 0.3,
        },
      ],
      [
        ref.current,
        {
          opacity: 0,
          display: "none",
          transform: "translateY(100%)",
        },
        {
          duration: 0.5,
          ease: "easeIn",
        },
      ],
    ]);
  };

  return {
    ref,
    value,
    notify: (notification: Notification) => {
      setValue(notification);
      play();
    },
  };
};

type AirplaneAnimation = "enter" | "exit";
type AnimationOptions = {
  onComplete?: () => void;
};

const useAirplaneAnimation = () => {
  const ref = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef(null);

  const play = (animation: AirplaneAnimation, options?: AnimationOptions) => {
    switch (animation) {
      case "enter": {
        ref.current?.playSegments([0, 96], true);
        ref.current?.playSegments([97, 146]);
        ref.current?.animationItem?.setLoop(true);
        break;
      }
      case "exit": {
        ref.current?.playSegments([147, 200]);
        ref.current?.animationItem?.setLoop(false);
      }
    }

    if (options?.onComplete) {
      ref.current?.animationItem?.addEventListener("complete", () => {
        ref.current?.animationItem?.removeEventListener("complete");
        options?.onComplete?.();
      });
    }
  };

  const isPaused = ref.current?.animationItem?.isPaused;

  return {
    ref,
    containerRef,
    play,
    isPaused,
  };
};

type BotCheckerProps = {
  googleReCAPTCHASiteKey: string;
};

const BotChecker: React.FC<BotCheckerProps> = ({ googleReCAPTCHASiteKey }) => {
  const [recaptchaResponse, setReCAPTCHAResponse] = useState<string>("");

  return (
    <div
      className={cn(
        "absolute left-0 top-0 right-0 bottom-0 bg-background-overlay flex justify-center items-center hidden",
      )}
    >
      <ReCAPTCHA
        sitekey={googleReCAPTCHASiteKey}
        onChange={(value) => {
          if (value) {
            setReCAPTCHAResponse(value);
          }
        }}
      />
      <input type="hidden" name="recaptchaResponse" value={recaptchaResponse} />
    </div>
  );
};

const Contact: React.FC<ContactProps> = ({ className }) => {
  const {
    data: { googleReCAPTCHASiteKey },
  } = useLoaderData<Loader>();

  const airplaneAnimation = useAirplaneAnimation();
  const notificationAnimation = useNotificationAnimation();

  const isInView = useInView(airplaneAnimation.containerRef, {
    margin: "-200px 0px",
  });

  const [lastResult, setLastResult] = useState<SubmissionResult>();

  console.log(lastResult);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (isInView) {
      if (airplaneAnimation.isPaused) {
        airplaneAnimation.play("enter");
      }
    }
  }, [isInView, airplaneAnimation.play, airplaneAnimation.isPaused]);

  const submitSuccessHandler = () => {
    airplaneAnimation.play("exit", {
      onComplete: () => {
        notificationAnimation.notify({ message: "Sent!", status: "success" });

        setTimeout(() => {
          airplaneAnimation.play("enter");
        }, 1300);
      },
    });
  };

  return (
    <div
      id="contact"
      className={cn(
        "relative w-screen flex flex-col items-center gap-10 py-28 -my-28",
        className,
      )}
    >
      <Container variant="narrow">
        <div className="relative flex flex-row justify-start">
          <Header title="Contact" align="left" variant="cascade" />
        </div>
      </Container>
      <Container variant="hybrid">
        <div className="flex flex-col md:flex-row">
          <div className="relative border-l border-t border-b border-[#fff2] flex flex-row md:flex-col justify-between p-8 md:p-12 bg-background rounded-t-md md:rounded-none md:rounded-l-md w-full h-[130px] md:h-auto md:w-[40%] overflow-hidden">
            <div className="relative">
              <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-row justify-start items-start z-20">
                <h2 className="leading-10 text-foreground -rotate-6">
                  <span className="text-3xl">Let's</span>
                  <br />
                  <span>Connect!</span>
                </h2>
              </div>
            </div>
            <div className="relative mb-2 mr-16 md:m-0 md:ml-0 md:mb-60 lg:m-0 lg:ml-10 lg:mb-60">
              <div
                ref={airplaneAnimation.containerRef}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[600px] lg:w-[600px] pointer-events-none"
              >
                <ClientOnly>
                  {() => (
                    <LazyLottie
                      lottieRef={airplaneAnimation.ref}
                      animationData={paperAnimation}
                      autoplay={false}
                    />
                  )}
                </ClientOnly>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 -translate-y-full -translate-x-1/2 mt-2">
              <h2
                ref={notificationAnimation.ref}
                className={cn(
                  "w-full hidden",
                  notificationAnimation.value.status === "success" &&
                    "text-success",
                  notificationAnimation.value.status === "error" &&
                    "text-destructive",
                )}
              >
                {notificationAnimation.value.message}
              </h2>
            </div>
          </div>
          <div className="bg-background-overlay overflow-hidden rounded-b-md md:rounded-none md:rounded-r-md w-full md:w-[60%] relative border-r border-t border-b border-[#fff2]">
            <Form.Root
              form={form}
              fields={fields}
              method="POST"
              className="p-8 md:p-12 flex flex-col gap-5 text-foreground"
              onSubmitSuccess={(data) => console.log(data)}
              onSubmitFailure={(data) => console.log(data)}
            >
              <BotChecker googleReCAPTCHASiteKey={googleReCAPTCHASiteKey} />
              <Form.Field>
                <div className="flex flex-row gap-2">
                  <Label htmlFor={fields.email.id}>Email</Label>
                  <span id={fields.email.errorId} className="text-destructive">
                    {fields.email.errors}
                  </span>
                </div>
                <Input.Root>
                  <Input.Field
                    {...getInputProps(fields.email, { type: "email" })}
                  />
                </Input.Root>
              </Form.Field>
              <Form.Field>
                <div className="flex flex-row gap-2">
                  <Label htmlFor={fields.message.id}>Message</Label>
                  <span
                    id={fields.message.errorId}
                    className="text-destructive"
                  >
                    {fields.message.errors}
                  </span>
                </div>
                <Textarea.Root>
                  <Textarea.Field
                    rows={8}
                    {...getTextareaProps(fields.message)}
                  />
                </Textarea.Root>
              </Form.Field>
              <Form.Field className="flex flex-row justify-center md:justify-start mt-5">
                <Form.Submit
                  intent="sendEmail"
                  click="squish-normally"
                  onSubmitSuccess={() => submitSuccessHandler()}
                >
                  Submit
                </Form.Submit>
              </Form.Field>
            </Form.Root>
          </div>
        </div>
      </Container>
      <Container variant="narrow">
        <Socials />
      </Container>
    </div>
  );
};

export { Contact };
