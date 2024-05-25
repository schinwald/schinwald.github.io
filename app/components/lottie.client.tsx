import React from 'react'
import Lottie, { LottieComponentProps } from 'lottie-react'


export const LazyLottie: React.FC<LottieComponentProps> = ({
  ...props
}) => {
  return (
    <Lottie
      {...props}
    />
  )
}