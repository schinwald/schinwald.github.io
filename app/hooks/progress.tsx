import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

type ProgressContextValues = {
  visible: Record<string, boolean>;
  setVisible: Dispatch<React.SetStateAction<Record<string, boolean>>>;
  progress: number;
};

const ProgressContext = createContext<ProgressContextValues>({
  visible: {},
  setVisible: () => {},
  progress: 0,
});

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

type ProgressProps = PropsWithChildren & {
  steps: string[];
};

export const ProgressProvider: React.FC<ProgressProps> = ({
  children,
  steps,
}) => {
  const mapping = steps.reduce((accumulator: Record<string, boolean>, step) => {
    accumulator[step] = false;
    return accumulator;
  }, {});

  const [visible, setVisible] = useState(mapping);

  let progress = 0;
  for (let i = 1; i <= steps.length; i++) {
    const j = steps.length - i;
    const step = steps[j];
    if (visible[step]) {
      progress = j;
      break;
    }
  }

  return (
    <ProgressContext.Provider value={{ visible, setVisible, progress }}>
      {children}
    </ProgressContext.Provider>
  );
};
