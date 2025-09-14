import { useState } from "react";

interface Props<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: Props<T>) {
  const isControlled = value !== undefined;

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue);

  const setValue = (v: T) => {
    if (!isControlled) {
      setUncontrolledState(v);
    }
    onChange?.(v);
  };

  return [isControlled ? value : uncontrolledState, setValue] as const;
}
