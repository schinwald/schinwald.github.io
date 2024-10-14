import type { LottieComponentProps } from 'lottie-react'
import { ClientOnly } from 'remix-utils/client-only'
import { LottieClient } from './primitives/ui/lottie.client'

export const LazyLottie: React.FC<LottieComponentProps> = ({
  ...props
}) => {
  return (
    <ClientOnly>
      {() => (
        <LottieClient
          {...props}
        />
      )}
    </ClientOnly>
  )
}
