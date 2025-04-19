import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import * as Card from "~/components/card";
import { cn } from "~/utils/classname";

const useTabMotion = (defaultIndex: number | null = null) => {
	const refs = useRef<(HTMLElement | null)[]>([]);

	const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);

	useEffect(() => {
		if (activeIndex === null) {
			return;
		}

		const setPosition = () => {
			const currentTab = refs.current[activeIndex] as HTMLElement;
			setWidth(currentTab?.clientWidth ?? 0);
			setHeight(currentTab?.clientHeight ?? 0);
			setLeft(currentTab?.offsetLeft ?? 0);
			setTop(currentTab?.offsetTop ?? 0);
		};

		setPosition();
	}, [activeIndex]);

	const registerRef = (element: HTMLElement | null, index: number) => {
		refs.current[index] = element;
	};

	return {
		registerRef,
		activeIndex,
		setActiveIndex,
		style: {
			width,
			height,
			left,
			top,
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
							{ "opacity-0": hoverTabMotion.activeIndex === null },
						)}
						style={{
							left: hoverTabMotion.style.left - 4,
							width: hoverTabMotion.style.width + 8,
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
						width: activeTabMotion.style.width - 16,
						left: activeTabMotion.style.left + 8,
					}}
				>
					<span className="w-full h-full bg-linear-to-r from-transparent via-secondary/80 to-transparent" />
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

	const isHovering = hoverTabMotion.activeIndex === index;
	const isActive = activeTabMotion.activeIndex === index;

	return (
		<button
			ref={(element) => {
				hoverTabMotion.registerRef(element, index);
				activeTabMotion.registerRef(element, index);
			}}
			className={cn("cursor-pointer text-center text-white/50", {
				"text-white": isActive || isHovering,
			})}
			type="button"
			onMouseEnter={() => hoverTabMotion.setActiveIndex(index)}
			onMouseLeave={() => hoverTabMotion.setActiveIndex(null)}
			onClick={() => activeTabMotion.setActiveIndex(index)}
		>
			{children}
		</button>
	);
};
