import { useLoaderData } from "@remix-run/react";
import { motion, useAnimate } from "framer-motion";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import { match, P } from "ts-pattern";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { Overlay } from "~/components/overlay";
import {
  createNavigationStore,
  type Navigation,
  type NavigationStore,
} from "~/hooks/stores/navigation";
import type { GlobalJSONData } from "~/utils/remix/loader.server";

const NavigationContext = createContext<NavigationStore | null>(null);

export function useNavigationStore<T>(selector: (state: Navigation) => T): T {
  const store = useContext(NavigationContext);
  if (!store) throw new Error("No navigation store found");
  return useStore(store, selector);
}

export const NavigationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const loaderData = useLoaderData() as GlobalJSONData;
  const store = useRef(
    createNavigationStore({
      navigationType: loaderData.navigationType,
      navigationState: loaderData.navigationState,
    }),
  ).current;
  return (
    <NavigationContext.Provider value={store}>
      <NavigationOverlay />
      {children}
    </NavigationContext.Provider>
  );
};

type NavigationProps = {
  className?: string;
};

const NavigationOverlay: React.FC<NavigationProps> = () => {
  const [
    navigationType,
    navigationState,
    endNavigationEnter,
    endNavigationExit,
  ] = useNavigationStore(
    useShallow((state) => [
      state.navigationType,
      state.navigationState,
      state.endNavigationEnter,
      state.endNavigationExit,
    ]),
  );
  const [backgroundRef, animateBackground] = useAnimate();

  useEffect(() => {
    if (navigationState === "exiting") {
      if (navigationType === "left") {
        animateBackground(
          backgroundRef.current,
          {
            translate: ["-100%", "0%"],
            opacity: [1, 1],
          },
          {
            duration: 0.2,
            ease: "linear",
            delay: 0.3,
            onUpdate: (value) => {
              if (value === "0%") {
                endNavigationExit();
              }
            },
          },
        );
      }
    }

    if (navigationState === "entering") {
      if (navigationType === "left") {
        animateBackground(
          backgroundRef.current,
          {
            translate: ["0%", "100%"],
            opacity: [1, 1],
          },
          {
            duration: 0.2,
            ease: "easeOut",
            delay: 0.2,
            onUpdate: (value) => {
              if (value === "100%") {
                endNavigationEnter();
              }
            },
          },
        );
      }
    }
  }, [
    backgroundRef,
    navigationState,
    navigationType,
    endNavigationEnter,
    endNavigationExit,
    animateBackground,
  ]);

  console.log(navigationState, navigationType);

  return (
    <Overlay className="pointer-events-none z-50" position="fixed">
      {match({ state: navigationState, type: navigationType })
        .with({ state: P.union("exiting", "exited"), type: "left" }, () => (
          <motion.div
            ref={backgroundRef}
            className="absolute h-full opacity-0 bg-background w-[100%] "
          />
        ))
        .with({ state: P.union("entering", "entered"), type: "left" }, () => (
          <motion.div
            ref={backgroundRef}
            className="absolute h-full opacity-100 bg-background w-[100%] "
          />
        ))
        .otherwise(() => (
          <motion.div ref={backgroundRef} />
        ))}
    </Overlay>
  );
};
