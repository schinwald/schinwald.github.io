import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card } from "~/components/card";
import { cn } from "~/utils/classname";

export const useTabMotion = (defaultIndex: number | null = null) => {
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

    const currentTab = refs.current[activeIndex] as HTMLElement;
    setWidth(currentTab?.clientWidth ?? 0);
    setHeight(currentTab?.clientHeight ?? 0);
    setLeft(currentTab?.offsetLeft ?? 0);
    setTop(currentTab?.offsetTop ?? 0);
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

type TabMotion = ReturnType<typeof useTabMotion>;

type ControllableTabMotionProps = {
  defaultValue?: number;
  tabMotion?: TabMotion;
};

function useControllableTabMotion({
  defaultValue,
  tabMotion,
}: ControllableTabMotionProps) {
  const uncontrolledTabMotion = useTabMotion(defaultValue);

  return {
    ...(tabMotion ? tabMotion : uncontrolledTabMotion),
  } as const;
}

const TabContext = createContext<{
  activeTabMotion?: TabMotion;
  hoverTabMotion?: TabMotion;
}>({});

type RootProps = {
  className?: string;
  defaultValue?: number;
  tabMotion: TabMotion;
} & PropsWithChildren;

const Root: React.FC<RootProps> = ({
  className,
  children,
  defaultValue = 0,
  tabMotion,
}) => {
  const hoverTabMotion = useTabMotion();
  const activeTabMotion = useControllableTabMotion({
    defaultValue,
    tabMotion,
  });

  return (
    <TabContext.Provider
      value={{
        activeTabMotion,
        hoverTabMotion,
      }}
    >
      <div className={cn("relative", className)}>
        <Card.Root
          size="xs"
          className="bg-background-overlay/30 brightness-125 backdrop-blur-lg"
        >
          <span
            className={cn(
              "pointer-events-none absolute top-0 bottom-0 z-20 flex overflow-hidden p-1 opacity-100 transition-all duration-150",
              { "opacity-0": hoverTabMotion.activeIndex === null },
            )}
            style={{
              left: hoverTabMotion.style.left - 4,
              width: hoverTabMotion.style.width + 8,
            }}
          >
            <span className="h-full w-full rounded-sm bg-white/10" />
          </span>
          <nav className="flex divide-x-2 divide-white/10 py-2 backdrop-blur-sm">
            {children}
          </nav>
        </Card.Root>
        <span
          className="-bottom-[2px] absolute z-20 flex h-[2px] overflow-x-clip rounded-lg transition-all duration-150"
          style={{
            width: activeTabMotion.style.width - 16,
            left: activeTabMotion.style.left + 8,
          }}
        >
          <span className="h-full w-full bg-linear-to-r from-transparent via-secondary/80 to-transparent" />
        </span>
      </div>
    </TabContext.Provider>
  );
};

type ItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    index: number;
  }>;

const Item: React.FC<ItemProps> = ({ index, children, ...props }) => {
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
      className={cn(
        "cursor-pointer text-center text-white/50 focus-visible:outline-none text-shadow-lg",
        {
          "text-white": isActive || isHovering,
        },
      )}
      type="button"
      onMouseEnter={() => hoverTabMotion.setActiveIndex(index)}
      onMouseLeave={() => hoverTabMotion.setActiveIndex(null)}
      onClick={() => activeTabMotion.setActiveIndex(index)}
      onFocus={() => hoverTabMotion.setActiveIndex(index)}
      {...props}
    >
      {children}
    </button>
  );
};

export const Tab = { Root, Item };
