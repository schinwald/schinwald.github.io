import { stagger, useAnimate, useInView } from "framer-motion";
import { useCallback, useEffect } from "react";

const useAnimateFooter = () => {
  const [ref, animate] = useAnimate();

  const play = useCallback(() => {
    animate(
      "p",
      {
        opacity: [0, 1],
        translateY: [20, 0],
      },
      {
        duration: 0.5,
        ease: "easeOut",
        delay: stagger(0.1),
      },
    );
  }, [animate]);

  return {
    ref,
    play,
  };
};

export const Footer = () => {
  const date = new Date();
  const footerAnimation = useAnimateFooter();
  const isInView = useInView(footerAnimation.ref, {
    margin: "0px 0px -200px 0px",
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      footerAnimation.play();
    }
  }, [isInView, footerAnimation.play]);

  return (
    <footer
      ref={footerAnimation.ref}
      className="flex flex-col gap-6 items-center pt-40 pb-20 text-foreground"
    >
      <p className="opacity-0">Thanks for stopping by :)</p>
      <p className="text-white/40 opacity-0">
        © 2021-{date.getFullYear()} James Schinwald
      </p>
    </footer>
  );
};
