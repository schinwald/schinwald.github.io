import { motion, useAnimate, useInView } from "framer-motion";
import type React from "react";
import { useEffect, useRef } from "react";
import { FaExternalLinkAlt as DemoIcon } from "react-icons/fa";
import { ClientOnly } from "remix-utils/client-only";
import { Overlay } from "~/components/overlay";
import { cn } from "~/utils/classname";
import supports from "~/utils/supports.client";
import { Link } from "./primitives/ui/link";

type ProjectProps = {
  className?: string;
  title: string;
  justify: "left" | "right";
  repository: string;
  image: {
    url: string;
    alt: string;
  };
};

const Project: React.FC<ProjectProps> = ({
  title,
  justify,
  repository,
  image,
}) => {
  const [markerRef, animateMarker] = useAnimate();
  const [headerRef, animateHeader] = useAnimate();
  const [overlayRef, animateOverlay] = useAnimate();
  const [imageRef, animateImage] = useAnimate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: "600px 0px -300px 0px",
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      animateMarker(
        markerRef.current,
        {
          opacity: 1,
          scale: "100%",
        },
        {
          duration: 0.2,
          ease: "easeOut",
        },
      );

      animateHeader(
        headerRef.current,
        {
          x: "0%",
        },
        {
          duration: 0.3,
          ease: "easeOut",
          delay: 0.3,
        },
      );
    }
  }, [
    isInView,
    markerRef.current,
    headerRef.current,
    animateMarker,
    animateHeader,
  ]);

  function handleJustification<T>({ left, right }: { left: T; right: T }): T {
    switch (justify) {
      case "left":
        return left;
      case "right":
        return right;
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        handleJustification({ left: "item-start", right: "item-end" }),
        "flex flex-col gap-6",
      )}
    >
      <div
        className={cn(
          handleJustification({ left: "flex-row", right: "flex-row-reverse" }),
          "flex",
        )}
      >
        <motion.div
          ref={markerRef}
          className="h-10 aspect-square bg-tertiary z-30"
          style={{ opacity: 0, scale: "0%" }}
        />
        <div className="overflow-hidden">
          <motion.div
            ref={headerRef}
            className={cn(
              handleJustification({
                left: "border-r-[3px]",
                right: "border-l-[3px]",
              }),
              "h-10 border-t-[3px] border-b-[3px] flex flex-row justify-center items-center px-4",
            )}
            style={{ x: handleJustification({ left: "-100%", right: "100%" }) }}
          >
            <h4 className="text-foreground">{title}</h4>
          </motion.div>
        </div>
      </div>
      <div
        className={cn(
          handleJustification({ left: "justify-start", right: "justify-end" }),
          "overflow-clip flex flex-row",
        )}
      >
        <ClientOnly>
          {() => {
            if (supports.hover) {
              return (
                <motion.div
                  className={cn(
                    handleJustification({
                      left: "flex-row",
                      right: "flex-row-reverse",
                    }),
                    "flex w-full sm:w-1/2 lg:w-[450px] aspect-5/3",
                  )}
                  onHoverStart={() => {
                    animateOverlay(
                      overlayRef.current,
                      {
                        opacity: [0, 1],
                      },
                      {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    );

                    animateImage(
                      imageRef.current,
                      {
                        scale: ["100%", "110%"],
                        filter: ["blur(0px)", "blur(3px)"],
                      },
                      {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    );
                  }}
                  onHoverEnd={() => {
                    animateOverlay(
                      overlayRef.current,
                      {
                        opacity: [1, 0],
                      },
                      {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    );

                    animateImage(
                      imageRef.current,
                      {
                        scale: ["110%", "100%"],
                        filter: ["blur(3px)", "blur(0px)"],
                      },
                      {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    );
                  }}
                >
                  <div className="relative overflow-hidden w-full h-full">
                    <Overlay
                      ref={overlayRef}
                      className="opacity-0 grid"
                      position="absolute"
                    >
                      <Link
                        className="m-0 rounded-none col-span-full row-span-full w-full h-full z-10"
                        to={repository}
                        variant="ghost"
                      >
                        <h2 className="flex justify-row items-center gap-2 text-foreground mb-2">
                          <DemoIcon className="w-10 h-10 -ml-6" />
                          Demo
                        </h2>
                      </Link>
                      <div className="col-span-full row-span-full bg-background opacity-60" />
                    </Overlay>
                    <img
                      ref={imageRef}
                      className="object-cover -rotate-6 scale-[140%]"
                      src={image.url}
                      alt={image.alt}
                    />
                  </div>
                </motion.div>
              );
            }
          }}
        </ClientOnly>
      </div>
    </div>
  );
};

export { Project };
