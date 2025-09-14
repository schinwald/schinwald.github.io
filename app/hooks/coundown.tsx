import { useEffect, useState } from "react";

type CounterArgs = {
  start: number;
  end: number;
  delay: number;
  onTick?: (value: number) => void;
  onComplete?: () => void;
};

export const useCountdown = ({
  start,
  end,
  delay,
  onTick = () => {},
  onComplete = () => {},
}: CounterArgs) => {
  const [counter, setCounter] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => {
        if (counter <= end) {
          clearInterval(interval);
          onComplete();
          onTick(end);
          return end;
        }

        onTick(counter - delay);
        return counter - delay;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [delay, end, onTick, onComplete]);

  return counter;
};
