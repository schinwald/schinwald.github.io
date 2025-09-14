import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import imageStar from "~/assets/images/star.svg";
import { useControllableState } from "~/hooks/controllable-state";

import { cn } from "~/utils/classname";

const Rating = React.forwardRef<
  typeof SliderPrimitive.Root,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      max = 0,
      tabIndex,
      ...props
    },
    ref,
  ) => {
    const [rating = [0], setRating] = useControllableState({
      value: value,
      defaultValue: defaultValue,
      onChange: onValueChange,
    });

    return (
      <div className="relative flex flex-row cursor-pointer my-3">
        <div className="relative flex flex-row gap-2">
          {Array.from({ length: rating[0] }).map((_, index) => {
            const key = `filled-star-${index}`;
            return (
              <div key={key} className="w-10 h-10">
                <img
                  src={imageStar}
                  alt="Filled star icon"
                  className="w-full h-full"
                />
              </div>
            );
          })}
          {Array.from({ length: max - rating[0] }).map((_, index) => {
            const key = `empty-star-${index}`;
            return (
              <div key={key} className="w-10 h-10">
                <img
                  src={imageStar}
                  alt="Empty star icon"
                  className="w-full h-full opacity-10"
                />
              </div>
            );
          })}
          <div className="absolute -ml-8 pr-3 w-[calc(100%+35px)]">
            <SliderPrimitive.Root
              ref={ref}
              className={cn(
                "relative flex w-full touch-none select-none items-center mt-1",
                className,
              )}
              max={max}
              value={rating}
              onValueChange={setRating}
              {...props}
            >
              <SliderPrimitive.Track className="relative h-8 w-full grow overflow-hidden rounded-full">
                <SliderPrimitive.Range className="absolute h-full" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb
                tabIndex={tabIndex}
                className="block h-5 w-5 rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              />
            </SliderPrimitive.Root>
          </div>
        </div>
      </div>
    );
  },
);

Rating.displayName = SliderPrimitive.Root.displayName;

export { Rating };
