import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import imageStar from "~/assets/images/star.svg";
import { useControllableState } from "~/hooks/controllable-state";

import { cn } from "~/utils/classname";

const Rating = React.forwardRef<
  HTMLDivElement,
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
      <div ref={ref} className="relative my-3 flex cursor-pointer flex-row">
        <div className="relative flex flex-row gap-2">
          {Array.from({ length: rating[0] }).map((_, index) => {
            const key = `filled-star-${index}`;
            return (
              <div key={key} className="h-10 w-10">
                <img
                  src={imageStar}
                  alt="Filled star icon"
                  className="h-full w-full"
                />
              </div>
            );
          })}
          {Array.from({ length: max - rating[0] }).map((_, index) => {
            const key = `empty-star-${index}`;
            return (
              <div key={key} className="h-10 w-10">
                <img
                  src={imageStar}
                  alt="Empty star icon"
                  className="h-full w-full opacity-10"
                />
              </div>
            );
          })}
          <div className="-ml-8 absolute w-[calc(100%+35px)] pr-3">
            <SliderPrimitive.Root
              className={cn(
                "relative mt-1 flex w-full touch-none select-none items-center",
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

Rating.displayName = "Rating";

export { Rating };
