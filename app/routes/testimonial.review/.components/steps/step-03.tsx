import { cn } from "~/utils/classname";
import type { StepProps } from "./helper";

const stepThree: React.FC<StepProps> = ({ state }) => {
  return (
    <div
      className={cn("duration-300 h-full", {
        "animate-fade-in": state === "entering" || state === "entered",
        "animate-fade-out": state === "exiting" || state === "exited",
      })}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <h1 className="leading-16">Thank you!</h1>
          <h2>{data.fullName?.split(" ")[0]},</h2>
          <p>
            Thanks for taking the time to fill out a review. It has been
            submitted and will show up on my profile soon.
          </p>
        </div>
        <div>
          <p className="inline-flex justify-between w-full">
            <span>Redirecting...</span>
            <span>10</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export { stepThree };
