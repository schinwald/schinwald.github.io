import Lottie, { type LottieComponentProps } from "lottie-react";
import type React from "react";

export const LazyLottie: React.FC<LottieComponentProps> = ({ ...props }) => {
  return <Lottie {...props} />;
};
