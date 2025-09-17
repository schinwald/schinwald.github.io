import { getInputProps, getTextareaProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useAnimate, useInView } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import paperAnimation from "~/assets/lotties/paper_airplane.json";
import { Header } from "~/components/header";
import { LazyLottie } from "~/components/lottie.client";
import { Form } from "~/components/primitives/ui/form";
import * as Input from "~/components/primitives/ui/input";
import * as Textarea from "~/components/primitives/ui/textarea";
import { Socials } from "~/components/socials";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import { validators } from "../.schemas/actions/send-email";
import type { Loader } from "../.server/loader";
import { BotChecker } from "./bot-checker";

type Notification = {
  status?: "success" | "error";
  message?: string;
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

  const play = useCallback(
    (animation: AirplaneAnimation, options?: AnimationOptions) => {
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
    },
    [],
  );

  const isPaused = ref.current?.animationItem?.isPaused;

  return {
    ref,
    containerRef,
    play,
    isPaused,
  };
};

type ContactProps = {
  id: string;
  className?: string;
};

const Contact: React.FC<ContactProps> = ({ id, className }) => {
  const {
    data: { googleReCAPTCHASiteKey },
  } = useLoaderData<Loader>();

  const [entered, setEntered] = useState(false);
  const airplaneAnimation = useAirplaneAnimation();
  const notificationAnimation = useNotificationAnimation();
  const [lastResult, setLastResult] = useState();
  const { setVisible } = useProgress();
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    margin: "0px 0px -500px 0px",
  });

  const isAirplaneInView = useInView(airplaneAnimation.containerRef, {
    margin: "0px 0px -500px 0px",
    once: true,
  });

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: validators.formData });
    },
  });

  useEffect(() => {
    if (isAirplaneInView && !entered) {
      airplaneAnimation.play("enter");
      setEntered(true);
    }
  }, [isAirplaneInView, airplaneAnimation.play, entered]);

  useEffect(() => {
    if (isInView) {
      setVisible((visible) => {
        const copy = { ...visible };
        copy[id] = true;
        return copy;
      });
    } else {
      setVisible((visible) => {
        const copy = { ...visible };
        copy[id] = false;
        return copy;
      });
    }
  }, [id, isInView, setVisible]);

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

  const onSubmit = useCallback((data: any) => {
    setLastResult(data);
  }, []);

  return (
    <div
      id={id}
      ref={containerRef}
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
              onSubmitSuccess={onSubmit}
              onSubmitFailure={onSubmit}
            >
              <BotChecker googleReCAPTCHASiteKey={googleReCAPTCHASiteKey} />
              <Form.Field>
                <Form.Label field={fields.email}>Email</Form.Label>
                <Input.Root>
                  <Input.Field
                    {...getInputProps(fields.email, { type: "email" })}
                  />
                </Input.Root>
              </Form.Field>
              <Form.Field>
                <Form.Label field={fields.message}>Message</Form.Label>
                <Textarea.Root>
                  <Textarea.Field
                    rows={8}
                    {...getTextareaProps(fields.message)}
                  />
                </Textarea.Root>
              </Form.Field>
              <Form.Field className="flex flex-row justify-center md:justify-between mt-5">
                <Form.Submit
                  intent="sendEmail"
                  click="squish-normally"
                  onSubmitSuccess={() => submitSuccessHandler()}
                >
                  Submit
                </Form.Submit>
                <Form.Spinner />
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
