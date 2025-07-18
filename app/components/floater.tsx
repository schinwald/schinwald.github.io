import * as PrimitivePortal from "@radix-ui/react-portal";
import * as Slot from "@radix-ui/react-slot";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

type FloaterContext = {
  ref: React.RefObject<HTMLDivElement> | null;
  spawner: Set<string>;
  setSpawner: Dispatch<SetStateAction<Set<string>>>;
};

const FloaterContext = createContext<FloaterContext>({
  ref: null,
  spawner: new Set<string>(),
  setSpawner: () => {},
});

export const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [spawner, setSpawner] = useState(new Set<string>());

  return (
    <FloaterContext.Provider value={{ ref, spawner, setSpawner }}>
      <div ref={ref}>{children}</div>
    </FloaterContext.Provider>
  );
};

type PortalProps = PrimitivePortal.PortalProps;

export const Portal: React.FC<PortalProps> = ({ children, ...props }) => {
  const { ref, spawner, setSpawner } = useContext(FloaterContext);

  return (
    <>
      {Array.from(spawner).map((spawn) => (
        <PrimitivePortal.Root
          key={spawn}
          container={ref?.current}
          className="absolute bottom-6 left-[50%] text-foreground p-3 rounded-md animate-float-away opacity-0"
          onAnimationEnd={() =>
            setSpawner((spawner) => {
              spawner.delete(spawn);
              return new Set(spawner);
            })
          }
          {...props}
        >
          {children}
        </PrimitivePortal.Root>
      ))}
    </>
  );
};

type TriggerProps = Slot.SlotProps & { asChild?: boolean };

export const Trigger: React.FC<TriggerProps> = ({ asChild, ...props }) => {
  const { setSpawner } = useContext(FloaterContext);
  const Component = asChild ? Slot.Root : "button";

  return (
    <Component
      onClick={() => {
        setSpawner((spawner) => {
          spawner.add(uuid());
          return new Set(spawner);
        });
      }}
      {...props}
    />
  );
};
