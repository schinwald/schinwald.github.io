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
      <section className="w-screen h-screen">
        <div className="relative w-screen flex flex-col justify-center items-center text-foreground gap-28 pb-32">
          <NavigationBar />
          <Container variant="narrow" className="gap-6">
            <Stepper.Root step={step} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row h-[620px]">
                <div className="relative grid w-full h-full border border-[#fff2] bg-background rounded-md overflow-visible">
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
