import z from "zod/v4";
import { useNavigationStore } from "~/components/navigation";
import { Testimonial } from "~/components/testimonial";
import { useCountdown } from "~/hooks/coundown";
import type { StepCollectorProps } from "./helper";

const schema = z.object({});

const getDefaultValue = () => ({});

const Collector: React.FC<StepCollectorProps> = () => {
  const navigate = useNavigationStore((state) => state.startNavigationExit);
  const counter = useCountdown({
    start: 10000,
    end: 0,
    delay: 1000,
    onComplete: () => {
      navigate({ type: "left", location: "/" });
    },
  });

  return (
    <div className="p-6 h-full flex flex-col justify-center gap-5">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <h1 className="leading-16">Thank you!</h1>
          {/* <h2>{data.fullName?.split(" ")[0]},</h2> */}
          <p>
            Thanks for taking the time to fill out a review. It has been
            submitted and will show up on my profile soon.
          </p>
        </div>
        <div>
          <p className="inline-flex justify-between w-full">
            <span>Redirecting...</span>
            <span>{counter / 1000}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Preview = () => {
  return <Testimonial />;
};

export const StepThree = {
  Collector,
  Preview,
  schema,
  getDefaultValue,
};
