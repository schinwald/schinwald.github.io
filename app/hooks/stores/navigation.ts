import type { LoaderFunctionArgs } from "@remix-run/node";
import { createStore } from "zustand";

type ExtractFromSet<T> = T extends Set<infer U> ? U : never;

const navigationTypes = new Set(["left", "right"] as const);

const isNavigationType = (type: string | null): type is NavigationType => {
  if (type === null) return false;
  return navigationTypes.has(type as NavigationType);
};

type NavigationType = ExtractFromSet<typeof navigationTypes>;
type NavigationState = "idle" | "entering" | "entered" | "exiting" | "exited";

type StartNavigationEnterArgs = {
  type: NavigationType;
};

type StartNavigationExitArgs = {
  type: NavigationType;
  location: string;
};

export type Navigation = {
  location?: string;
  navigationType?: NavigationType;
  navigationState: NavigationState;
  startNavigationEnter: (args: StartNavigationEnterArgs) => void;
  endNavigationEnter: () => void;
  startNavigationExit: (args: StartNavigationExitArgs) => void;
  endNavigationExit: () => void;
};

export type NavigationStore = ReturnType<typeof createNavigationStore>;

const param = "navigating";

export const createNavigationStore = (init?: Partial<Navigation>) => {
  // Remove the navigation query string from the URL
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const type = url.searchParams.get(param);

    if (isNavigationType(type)) {
      url.searchParams.delete(param);
      window.history.replaceState(null, "", url.href);
    }
  }

  return createStore<Navigation>()((set, get) => ({
    navigationType: init?.navigationType ?? undefined,
    navigationState: init?.navigationState ?? "idle",
    startNavigationEnter: ({ type = "left" }) => {
      set(() => ({
        navigationState: "entering",
        navigationType: type,
      }));
    },
    endNavigationEnter: () => {
      set(() => ({
        navigationState: "entered",
      }));
    },
    startNavigationExit: ({ type = "left", location }) => {
      set(() => ({
        navigationState: "exiting",
        navigationType: type,
        location,
      }));
    },
    endNavigationExit: () => {
      const { location } = get();
      if (!location) throw new Error("No location to navigate to");
      const url = new URL(location, window.location.origin);
      url.searchParams.set(param, "left");
      if (location) window.location.href = url.href;
      set(() => ({
        navigationState: "exited",
      }));
    },
  }));
};

export const getNavigationJSONData = (args: LoaderFunctionArgs) => {
  const url = new URL(args.request.url);
  const navigationType = url.searchParams.get(param);

  if (isNavigationType(navigationType)) {
    return {
      navigationType,
      navigationState: "entering",
    } as const;
  }

  return {
    navigationType: undefined,
    navigationState: "idle",
  } as const;
};
