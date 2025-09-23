import type React from "react";
import { useCallback, useState } from "react";
import { NavigationBar } from "~/components/navigation-bar";
import { Container } from "~/layouts/container";
import { Stepper } from "./steps";

type TestimonialEditorProps = {
  className?: string;
};

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({ className }) => {
  const [step, setStep] = useState<number>(0);

  const onNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const onBack = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  return (
    <div className={className}>
      <section className="h-screen w-screen">
        <div className="relative flex w-screen flex-col items-center justify-center gap-20 pb-32 text-foreground">
          <NavigationBar />
          <Container variant="narrow" className="gap-6">
            <Stepper.Root step={step} className="flex flex-col gap-4">
              <div className="flex h-[590px] flex-col md:flex-row">
                <div className="relative grid h-full w-full overflow-visible rounded-md border border-[#fff2] bg-background">
                  <div className="col-span-full row-span-full">
                    <Stepper.Collector onNext={onNext} onBack={onBack} />
                  </div>
                  <div className="col-span-full row-span-full">
                    <Stepper.Preview />
                  </div>
                </div>
              </div>
            </Stepper.Root>
            <Stepper.Progress step={step} />
          </Container>
        </div>
      </section>
    </div>
  );
};

export { TestimonialEditor };
