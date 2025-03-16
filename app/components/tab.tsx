import {
	type PropsWithChildren,
	act,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import * as Card from "~/components/card";
import { cn } from "~/utils/classname";

const allTabs = [
	{
		id: "home",
		name: "Home",
		href: "/",
	},
	{
		id: "about",
		name: "About",
		href: "#about",
	},
	{
		id: "projects",
		name: "Projects",
		href: "#projects",
	},
	{
		id: "testimonials",
		name: "Testimonials",
		href: "#testimonials",
	},
	{
		id: "arts",
		name: "Arts",
		href: "#arts",
	},
];

const useTabMotion = (defaultIndex: number | null = null) => {
	const tabsRef = useRef<(HTMLElement | null)[]>([]);

	const [activeTabIndex, setActiveTabIndex] = useState<number | null>(
		defaultIndex,
	);
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

	useEffect(() => {
		if (activeTabIndex === null) {
			return;
		}

		const setTabPosition = () => {
			const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
			setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
			setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
		};

		setTabPosition();
	}, [activeTabIndex]);

	const registerTabRef = (element: HTMLElement | null, index: number) => {
		tabsRef.current[index] = element;
	};

	return {
		registerTabRef,
		activeTabIndex,
		setActiveTabIndex,
		tabStyle: {
			left: tabUnderlineLeft,
			width: tabUnderlineWidth,
		},
	};
};

const TabContext = createContext<{
	activeTabMotion?: ReturnType<typeof useTabMotion>;
	hoverTabMotion?: ReturnType<typeof useTabMotion>;
}>({});

export const Root: React.FC = () => {
	const hoverTabMotion = useTabMotion();
	const activeTabMotion = useTabMotion(0);

	return (
		<TabContext.Provider
			value={{
				activeTabMotion,
				hoverTabMotion,
			}}
		>
			<div className="relative">
				<Card.Root size="xs">
					<span
						className={cn(
							"absolute bottom-0 top-0 -z-10 flex overflow-hidden p-1 transition-all duration-300 opacity-100",
							{ "opacity-0": hoverTabMotion.activeTabIndex === null },
						)}
						style={{
							left: hoverTabMotion.tabStyle.left - 4,
							width: hoverTabMotion.tabStyle.width + 8,
						}}
					>
						<span className="h-full w-full rounded-sm bg-white/10" />
					</span>
					<nav className="flex py-2 divide-x-2 divide-white/10">
						<div className="pl-[3px] pr-2">
							<Item index={0}>
								<a
									className={cn("font-display uppercase px-4 text-sm")}
									href="/"
								>
									Home
								</a>
							</Item>
						</div>
						<div className="pl-2 pr-[3px]">
							<Item index={1}>
								<a
									className={cn("font-display uppercase px-3 text-sm")}
									href="#about"
									rel="noopener noreferrer"
								>
									About
								</a>
							</Item>
							<Item index={3}>
								<a
									className={cn("font-display uppercase px-3 text-sm")}
									href="#projects"
									rel="noopener noreferrer"
								>
									Stuff
								</a>
							</Item>
							<Item index={4}>
								<a
									className={cn("font-display uppercase px-3 text-sm")}
									href="#contact"
									rel="noopener noreferrer"
								>
									Contact
								</a>
							</Item>
						</div>
					</nav>
				</Card.Root>
				<span
					className="absolute -bottom-[2px] rounded-lg z-20 flex overflow-x-clip h-[2px] transition-all duration-300"
					style={{
						width: activeTabMotion.tabStyle.width - 16,
						left: activeTabMotion.tabStyle.left + 8,
					}}
				>
					<span className="w-full h-full bg-gradient-to-r from-transparent via-secondary/80 to-transparent"></span>
				</span>
			</div>
		</TabContext.Provider>
	);
};

type ItemProps = PropsWithChildren<{
	index: number;
}>;

export const Item: React.FC<ItemProps> = ({ index, children }) => {
	const { activeTabMotion, hoverTabMotion } = useContext(TabContext);

	if (!activeTabMotion || !hoverTabMotion) {
		throw Error("No tab motion hooks found");
	}

	const isHovering = hoverTabMotion.activeTabIndex === index;
	const isActive = activeTabMotion.activeTabIndex === index;

	return (
		<button
			ref={(element) => {
				hoverTabMotion.registerTabRef(element, index);
				activeTabMotion.registerTabRef(element, index);
			}}
			className={cn("cursor-pointer text-center text-white/50", {
				"text-white": isActive || isHovering,
			})}
			onMouseEnter={() => hoverTabMotion.setActiveTabIndex(index)}
			onMouseLeave={() => hoverTabMotion.setActiveTabIndex(null)}
			onClick={() => activeTabMotion.setActiveTabIndex(index)}
		>
			{children}
		</button>
	);
};
