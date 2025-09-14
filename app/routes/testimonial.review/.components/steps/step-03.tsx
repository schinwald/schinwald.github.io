import { motion } from "framer-motion";
import { useLoaderData } from "react-router";
import * as Card from "~/components/card";
import { useNavigationStore } from "~/components/navigation";
import { Testimonial } from "~/components/testimonial";
import { useCountdown } from "~/hooks/coundown";
import type { Loader } from "../../.server/loader";
import type { StepCollectorProps, StepRootProps } from "./helper";

const Root: React.FC<StepRootProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

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
    <motion.div
      className="w-[50%] h-full"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <Card.Root size="xl">
        <Card.Content className="h-full">
          <motion.div
            className="w-full h-full flex flex-col justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
            }}
          >
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
          </motion.div>
        </Card.Content>
      </Card.Root>
    </motion.div>
  );
};

const Preview = () => {
  const { testimonial } = useLoaderData<Loader>();

  return (
    <motion.div
      className="w-[50%] h-full flex flex-col justify-center items-center"
      initial={{ x: "0%" }}
      animate={{ x: "100%" }}
      exit={{ x: "0%" }}
      transition={{ duration: 0.3 }}
    >
      <Testimonial
        avatar={testimonial.avatar ?? undefined}
        fullname={testimonial.fullName ?? undefined}
        occupation={testimonial.occupation ?? undefined}
        company={testimonial.company ?? undefined}
        rating={testimonial.rating ?? undefined}
        review={testimonial.review ?? undefined}
      />
    </motion.div>
  );
};

export const StepThree = {
  Root,
  Collector,
  Preview,
};
