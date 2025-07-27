import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SwitchTransition, Transition } from "react-transition-group";
import { z } from "zod";
import * as Card from "~/components/card";
import { NavigationBar } from "~/components/navigation-bar";
import { Testimonial } from "~/components/testimonial";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import { stepOne, stepThree, stepTwo } from "./steps";

const formSchema = z.object({
  avatar_url: z.string().optional(),
  full_name: z.string({ error: "(Required)" }).regex(/.+ .+/, {
    message: "(Must be a full name)",
  }),
  occupation: z.string().optional(),
  company: z.string().optional(),
  rating: z.number().min(0).max(5),
  review: z.string({ error: "(Required)" }).min(1, { error: "(Required)" }),
});

type TestimonialEditorProps = {
  className?: string;
  avatarURL?: string;
  fullName?: string;
};

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({
  className,
  fullName,
  avatarURL,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      rating: 0,
      avatar_url: avatarURL,
      full_name: fullName,
    },
  });

  const watched = {
    fullName: form.watch("full_name"),
    review: form.watch("review"),
    rating: form.watch("rating"),
    company: form.watch("company"),
    occupation: form.watch("occupation"),
    avatarURL: form.watch("avatar_url"),
  };

  const [step, setStep] = useState<number>(0);
  const nodeRef = useRef(null);

  const steps = [stepOne, stepTwo, stepThree];

  return (
    <div className={className}>
      <section className="w-screen h-screen">
        <div className="relative w-screen flex flex-col justify-center items-center text-foreground gap-28 pb-32">
          <NavigationBar />
          <Container variant="narrow" className="gap-6">
            <div className="flex flex-col md:flex-row h-[650px]">
              <div className="relative grid w-full h-full border border-[#fff2] bg-background rounded-md overflow-hidden">
                <div className="col-span-full row-span-full flex flex-row z-20 overflow-hidden">
                  <div
                    className={cn(
                      "w-[50%] transition-all duration-600 backdrop-blur-lg",
                      {
                        "translate-x-[100%]": step % 2 === 1,
                      },
                    )}
                  >
                    <Card.Root>
                      <Card.Content className="p-8 h-full">
                        <SwitchTransition mode="out-in">
                          <Transition
                            nodeRef={nodeRef}
                            key={step}
                            timeout={300}
                            unmountOnExit
                          >
                            {(state) => {
                              const Rendered = steps[step];

                              return (
                                <Rendered
                                  state={state}
                                  onNext={() => {
                                    setStep((step) => step + 1);
                                  }}
                                  onBack={() => {
                                    setStep((step) => step - 1);
                                  }}
                                />
                              );
                            }}
                          </Transition>
                        </SwitchTransition>
                      </Card.Content>
                    </Card.Root>
                  </div>
                </div>
                <div className="col-span-full row-span-full flex flex-row justify-end">
                  <div
                    className={cn(
                      "w-[50%] p-8 flex flex-row justify-center items-center transition-all duration-600 z-10",
                      { "-translate-x-[100%]": step % 2 === 1 },
                    )}
                  >
                    <Testimonial
                      avatar={watched.avatarURL ?? null}
                      fullname={watched.fullName}
                      occupation={watched.occupation ?? null}
                      company={watched.company ?? null}
                      rating={watched.rating}
                      review={watched.review}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-2">
              {steps.map((_, index) => {
                const key = `step-${index}`;
                return (
                  <div
                    key={key}
                    className={cn(
                      "transition-all h-1 bg-white/30 rounded-full w-4",
                      { "w-8 bg-white": step === index },
                    )}
                  />
                );
              })}
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
};

export { TestimonialEditor };
