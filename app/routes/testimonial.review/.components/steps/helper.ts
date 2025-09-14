import type { PropsWithChildren } from "react";

export {
  FaArrowLeft as ArrowLeftIcon,
  FaArrowRight as ArrowRightIcon,
} from "react-icons/fa";

export type StepRootProps = {
  className?: string;
} & PropsWithChildren;

export type StepCollectorProps = {
  onBack?: () => void;
  onNext?: () => void;
};

export const coerceToFileIfPossible = async (value: unknown) => {
  if (typeof value === "string") {
    const buffer = await fetch(value).then((response) => response.blob());
    return new File([buffer], "filename");
  }

  if (value instanceof File) {
    return value;
  }

  return undefined;
};
