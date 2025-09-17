import {
  type AnimationPlaybackControls,
  useAnimate,
  useInView,
} from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "~/components/header";
import { Button } from "~/components/primitives/ui/button";
import { Testimonial } from "~/components/testimonial";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import { Link } from "../../../components/primitives/ui/link";

const count = 30;
const duration = 120.0;
const delay = duration / 29.0;
const cycleDuration = count * delay;
const repeatDelay = cycleDuration > duration ? cycleDuration - duration : 0;
const distance = "1200";

type Data = {
  avatar: string | null;
  fullName: string;
  occupation: string | null;
  company: string | null;
  review: string;
  rating: number;
};

type TestimonialsProps = {
  id: string;
  className?: string;
  data: (Data | null)[];
};

const Testimonials: React.FC<TestimonialsProps> = ({ id, className, data }) => {
  const [isCarouselPlaying, setCarouselPlaying] = useState(true);
  const [_isCarouselReady, setCarouselReady] = useState(false);
  const [testimonialContainerRef, animateTestimonialContainer] = useAnimate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "0px 0px -500px 0px",
  });
  const { setVisible } = useProgress();

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

  const testimonials = data.map((value, i) => {
    const animation = useAnimate();
    const [testimonialRef, animateTestimonial] = animation;
    const [controls, setControls] = useState<AnimationPlaybackControls>();

    useEffect(() => {
      if (controls) return;

      const newControls = animateTestimonial(
        testimonialRef.current,
        {
          translateY: ["-105%", "-105%", "0%", "0%", "105%", "105%"],
          translateX: ["-120%", "120%", "120%", "-120%", "-120%", "120%"],
          x: [
            `-${distance}px`,
            `${distance}px`,
            `${distance}px`,
            `-${distance}px`,
            `-${distance}px`,
            `${distance}px`,
          ],
        },
        {
          duration,
          times: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay,
          startTime: -i * delay * 1000,
        },
      );
      setControls(newControls);
    }, [testimonialRef, i, controls, animateTestimonial]);

    return {
      data: value,
      animation,
      controls,
    };
  });

  useEffect(() => {
    animateTestimonialContainer(
      testimonialContainerRef.current,
      {
        opacity: [0, 1],
      },
      {
        duration: 1,
      },
    );

    setCarouselReady(true);
  }, [testimonialContainerRef, animateTestimonialContainer]);

  const toggleCarouselPlay = useCallback(() => {
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i];
      const controls = testimonial.controls;

      if (!controls) continue;

      if (isCarouselPlaying) {
        const temp = controls.time;
        controls.pause();
        controls.time = temp;
      } else {
        controls.play();
      }
    }

    setCarouselPlaying(!isCarouselPlaying);
  }, [testimonials, isCarouselPlaying]);

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
        <div className="relative flex flex-row justify-end">
          <Header title="Testimonials" align="right" variant="cascade" />
        </div>
      </Container>
      <Container
        className="h-[400px] md:h-[500px] items-center bg-background overflow-clip relative border border-[#fff2]"
        variant="wide"
      >
        <div className="w-full max-w-[2400px] h-full absolute pointer-events-none">
          {/* Hiding the overflow of the testimonials */}
          <div className="absolute right-[100%] w-full h-full bg-background z-20" />
          <div className="absolute left-[100%] w-full h-full bg-background z-20" />
          {/* Adding shadows to the edges */}
          <div className="absolute left-0 w-[100px] sm:w-[200px] md:w-[500px] h-full bg-linear-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 w-[100px] sm:w-[200px] md:w-[500px] h-full bg-linear-to-r to-background from-transparent z-20 pointer-events-none" />
        </div>
        <div className="w-full max-w-[2400px] h-full relative flex flex-row justify-center items-center scale-[60%] md:scale-100 select-none">
          <div
            ref={testimonialContainerRef}
            className="w-full flex flex-row justify-center items-center rotate-6 opacity-0"
          >
            {testimonials.map((value, index) => {
              const key = `testimonial-${index}`;
              const { data, animation } = value;
              const [ref, _] = animation;

              if (!data) {
                return (
                  <div ref={ref} key={key} className="absolute">
                    <div className="relative h-[400px] aspect-3/4 bg-background-overlay/40 opacity-50 text-foreground-overlay rounded-md overflow-hidden" />
                  </div>
                );
              }

              return (
                <button
                  ref={ref}
                  tabIndex={-1}
                  key={key}
                  type="button"
                  className="absolute"
                  onClick={() => {
                    toggleCarouselPlay();
                  }}
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      toggleCarouselPlay();
                    }
                  }}
                >
                  <Testimonial
                    avatar={data.avatar ?? undefined}
                    rating={data.rating ?? undefined}
                    fullname={data.fullName ?? undefined}
                    occupation={data.occupation ?? undefined}
                    company={data.company ?? undefined}
                    review={data.review ?? undefined}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Container>
      <Container variant="narrow">
        <div className="flex flex-row justify-end">
          <Link
            from="left"
            to="/testimonial/review"
            variant="default"
            click="squish-lightly"
          >
            Write a review
          </Link>
        </div>
      </Container>
    </div>
  );
};

export { Testimonials };
