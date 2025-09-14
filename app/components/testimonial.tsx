import type React from "react";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils/client-only";
import imageDefaultAvatar from "~/assets/images/avatar.webp";
import imageStar from "~/assets/images/star.svg";
import waveAnimation from "~/assets/lotties/wave.json";
import { cn } from "~/utils/classname";
import { LazyLottie } from "./lottie";

type TestimonialProps = {
  className?: string;
  avatar?: string;
  fullname?: string;
  occupation?: string;
  company?: string;
  rating?: number;
  review?: string;
};

const Testimonial: React.FC<TestimonialProps> = ({
  className,
  avatar,
  fullname,
  occupation,
  company,
  rating = 0,
  review,
}) => {
  if (rating < 0) rating = 0;
  if (rating > 5) rating = 5;

  const title = useMemo(() => {
    if (occupation && company) {
      return (
        <p className="text-center text-tertiary-foreground capitalize leading-5">
          <span className="whitespace-nowrap">{occupation}</span>
          <br />
          <span className="whitespace-nowrap">@{company}</span>
        </p>
      );
    }

    if (occupation) {
      return (
        <p className="text-center text-tertiary-foreground capitalize">
          <span className="whitespace-nowrap">{occupation}</span>
        </p>
      );
    }

    return null;
  }, [occupation, company]);

  return (
    <div
      className={cn(
        "relative h-[400px] aspect-3/4 border border-[#fff2] bg-background-overlay text-foreground-overlay rounded-md overflow-hidden cursor-pointer",
        className,
      )}
    >
      <div className="absolute flex flex-col gap-4 items-center justify-between h-full p-8 z-20">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center gap-2">
            {/* TODO: replace this with rating component */}
            {Array.from({ length: rating }).map((_, index) => {
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
            {Array.from({ length: 5 - rating }).map((_, index) => {
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
          </div>
          <p className="line-clamp-5">{review}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-white outline-4 outline-white/70 overflow-hidden">
            <img
              src={avatar ?? imageDefaultAvatar}
              alt="Avatar of the user"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <h5 className="text-tertiary-foreground/80 capitalize font-bold">
              {fullname}
            </h5>
            {title}
          </div>
        </div>
      </div>
      <ClientOnly>
        {() => (
          <LazyLottie
            className="absolute w-full pointer-events-none"
            style={{
              bottom: "-80px",
            }}
            animationData={waveAnimation}
            loop={true}
          />
        )}
      </ClientOnly>
    </div>
  );
};

export { Testimonial };
