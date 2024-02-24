import * as React from "react"

const RawLottie = React.lazy(async () => {
  await import('lottie-react')
});

type Props = LottieComponentProps

const Lottie: React.FC<Props> = (props) => {
  if (!window) return null
  
  return (
    <Suspense
      fallback={(
        <div>
          Loading...
        </div>
      )}
    >
      <RawLottie
        {...props}
      />
    </Suspense>
  )
}

export { Lottie }
