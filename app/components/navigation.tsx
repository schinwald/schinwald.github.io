import { useLoaderData } from "@remix-run/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Overlay } from "~/components/overlay";
import { useNavigationStore } from "~/hooks/stores/navigation";
import type { GlobalJSONData } from "~/utils/remix/loader.server";

type NavigationProps = {
	className?: string;
};

const Navigation: React.FC<NavigationProps> = () => {
	const loaderData = useLoaderData() as GlobalJSONData;
	const [
		navigationType,
		navigationState,
		startNavigationEnter,
		endNavigationEnter,
		endNavigationExit,
	] = useNavigationStore(
		useShallow((state) => [
			state.navigationType,
			state.navigationState,
			state.startNavigationEnter,
			state.endNavigationEnter,
			state.endNavigationExit,
		]),
	);
	const [backgroundRef, animateBackground] = useAnimate();

	useEffect(() => {
		if (loaderData.navigationType) {
			startNavigationEnter({ type: loaderData.navigationType });
		}
	}, [startNavigationEnter, loaderData.navigationType]);

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
						onComplete: () => {
							endNavigationExit();
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
						onComplete: () => {
							endNavigationEnter();
						},
					},
				);
			}
		}
	}, [
		navigationState,
		navigationType,
		endNavigationEnter,
		endNavigationExit,
		backgroundRef.current,
		animateBackground,
	]);

	return (
		<Overlay className="pointer-events-none z-50" position="fixed">
			{(navigationState === "exiting" || navigationState === "exited") && (
				<motion.div
					ref={backgroundRef}
					className="absolute h-full opacity-0 bg-background w-[100%] "
				/>
			)}
			{(loaderData.navigationType ||
				navigationState === "entering" ||
				navigationState === "entered") && (
				<motion.div
					ref={backgroundRef}
					className="absolute h-full opacity-100 bg-background w-[100%] "
				/>
			)}
		</Overlay>
	);
};

export { Navigation };
