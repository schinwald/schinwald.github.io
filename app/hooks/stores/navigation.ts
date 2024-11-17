import { LoaderFunctionArgs } from "@remix-run/node";
import { create } from "zustand";

type ExtractFromSet<T> = T extends Set<infer U> ? U : never;

const navigationTypes = new Set(["left", "right"] as const);

const isNavigationType = (type: unknown): type is NavigationType => {
	return navigationTypes.has(type as any);
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

type Navigation = {
	location?: string;
	navigationType?: NavigationType;
	navigationState: NavigationState;
	startNavigationEnter: (args: StartNavigationEnterArgs) => void;
	endNavigationEnter: () => void;
	startNavigationExit: (args: StartNavigationExitArgs) => void;
	endNavigationExit: () => void;
};

const param = "navigating";

export const useNavigationStore = create<Navigation>()((set, get) => {
	if (typeof window !== "undefined") {
		const url = new URL(window.location.href);
		const type = url.searchParams.get(param);

		if (isNavigationType(type)) {
			url.searchParams.delete(param);
			window.history.replaceState(null, "", url.href);
		}
	}

	return {
		navigationType: undefined,
		navigationState: "idle",
		startNavigationEnter: ({ type = "left" }) => {
			set(() => ({
				navigationType: type,
				navigationState: "entering",
			}));
		},
		endNavigationEnter: () => {
			set(() => ({
				navigationState: "entered",
			}));
		},
		startNavigationExit: ({ type = "left", location }) => {
			set(() => ({
				navigationType: type,
				location,
				navigationState: "exiting",
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
	};
});

export const getNavigationJSONData = (args: LoaderFunctionArgs) => {
	const url = new URL(args.request.url);
	const navigationType = url.searchParams.get(param);

	if (isNavigationType(navigationType)) {
		return {
			navigationType,
		};
	}

	return {
		navigationType: undefined,
	};
};
