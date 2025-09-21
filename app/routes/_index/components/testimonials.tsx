import {
  type AnimationPlaybackControls,
  useAnimate,
  useInView,
} from "framer-motion";
import type React from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Header } from "~/components/header";

import { Testimonial } from "~/components/testimonial";
import { useProgress } from "~/hooks/progress";
import { Container } from "~/layouts/container";
import { cn } from "~/utils/classname";
import { Link, LinkArrow } from "../../../components/primitives/ui/link";

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
  const testimonialRefs = useRef<(AnimationPlaybackControls | null)[]>([]);
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
    for (let i = 0; i < testimonialRefs.current.length; i++) {
      const controller = testimonialRefs.current[i];
      if (isCarouselPlaying) {
        controller?.pause();
      } else {
        controller?.play();
      }
    }
    setCarouselPlaying(!isCarouselPlaying);
  }, [isCarouselPlaying]);

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
            {data.map((value, index) => (
              <MovingTestimonial
                key={`testimonial-${value?.fullName || index}`}
                ref={(el) => {
                  testimonialRefs.current[index] = el;
                }}
                data={value}
                distance={distance}
                duration={duration}
                delay={delay}
                repeatDelay={repeatDelay}
                index={index}
                onClick={toggleCarouselPlay}
              />
            ))}
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
            <LinkArrow />
          </Link>
        </div>
      </Container>
    </div>
  );
};

type MovingTestimonialProps = {
  data: Data | null;
  distance: string;
  duration: number;
  delay: number;
  repeatDelay: number;
  index: number;
  onClick?: () => void;
};

const MovingTestimonial = forwardRef<
  AnimationPlaybackControls,
  MovingTestimonialProps
>(({ data, distance, duration, delay, repeatDelay, index, onClick }, ref) => {
  const [testimonialRef, animateTestimonial] = useAnimate();
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    controlsRef.current = animateTestimonial(
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
        delay: 0,
        startTime: -index * delay * 1000,
      },
    );
  }, [
    testimonialRef,
    animateTestimonial,
    distance,
    duration,
    delay,
    repeatDelay,
    index,
  ]);

  useImperativeHandle(
    ref,
    () => controlsRef.current as AnimationPlaybackControls,
    [],
  );

  if (!data) {
    return (
      <div ref={testimonialRef} className="absolute">
        <div className="relative h-[400px] aspect-3/4 bg-background-overlay/40 opacity-50 text-foreground-overlay rounded-md overflow-hidden" />
      </div>
    );
  }

  return (
    <button
      ref={testimonialRef}
      tabIndex={-1}
      type="button"
      className="absolute"
      onClick={onClick}
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
});

MovingTestimonial.displayName = "MovingTestimonial";

export { Testimonials };
