import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Overlay } from "~/components/overlay";
import { cn } from "~/utils/classname";

type OverlayContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const OverlayContext = createContext<OverlayContextType | null>(null);

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};

export const OverlayProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <OverlayContext.Provider value={value}>
      <Overlay
        className={cn(
          "pointer-events-none z-20 bg-black transition-all duration-300",
          {
            "opacity-0": !isOpen,
            "opacity-70": isOpen,
          },
        )}
        position="fixed"
      />
      {children}
    </OverlayContext.Provider>
  );
};
