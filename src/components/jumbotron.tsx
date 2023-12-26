import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import logoAnimation from '@/assets/lotties/logo.json'
import popAnimation from '@/assets/lotties/pop.json'
import { cn } from '@/utils'
import { useEffect, useRef } from "react"

type Props = {
  className?: string
}

const Jumbotron: React.FC<Props> = ({ className, ...props }) => {
  const lottiePopA = useRef<LottieRefCurrentProps>(null)
  const lottiePopB = useRef<LottieRefCurrentProps>(null)
  const lottiePopC = useRef<LottieRefCurrentProps>(null)
  const lottiePopD = useRef<LottieRefCurrentProps>(null)
  const lottiePopE = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    const intervals: number[] = []
    const timeouts: number[] = []

    // Handle pop D
    lottiePopD?.current?.stop()
    lottiePopD?.current?.setSpeed(0.5)
    timeouts.push(setTimeout(() => {
      lottiePopD?.current?.goToAndPlay(0)
      intervals.push(setInterval(() => {
        lottiePopD?.current?.goToAndPlay(0)
      }, 10000))
    }, 3000))

    // Handle pop A
    lottiePopA?.current?.stop()
    lottiePopA?.current?.setSpeed(0.5)
    timeouts.push(setTimeout(() => {
      lottiePopA?.current?.goToAndPlay(0)
      intervals.push(setInterval(() => {
        lottiePopA?.current?.goToAndPlay(0)
      }, 10000))
    }, 1600))

    // Handle pop B
    lottiePopB?.current?.stop()
    lottiePopB?.current?.setSpeed(0.5)
    timeouts.push(setTimeout(() => {
      lottiePopB?.current?.goToAndPlay(0)
      intervals.push(setInterval(() => {
        lottiePopB?.current?.goToAndPlay(0)
      }, 10000))
    }, 2200))

    // Handle pop C
    lottiePopC?.current?.stop()
    lottiePopC?.current?.setSpeed(0.5)
    timeouts.push(setTimeout(() => {
      lottiePopC?.current?.goToAndPlay(0)
      intervals.push(setInterval(() => {
        lottiePopC?.current?.goToAndPlay(0)
      }, 10000))
    }, 2500))

    // Handle pop E
    lottiePopE?.current?.stop()
    lottiePopE?.current?.setSpeed(0.5)
    timeouts.push(setTimeout(() => {
      lottiePopE?.current?.goToAndPlay(0)
      intervals.push(setInterval(() => {
        lottiePopE?.current?.goToAndPlay(0)
      }, 10000))
    }, 2900))

    return () => {
      for (const interval of intervals) {
        clearInterval(interval)
      }

      for (const timeout of timeouts) {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <div className='relative h-screen flex flex-col justify-center items-center gap-2 overflow-x-clip'>
      <Lottie
        lottieRef={lottiePopA}
        className="absolute w-[200px] pointer-events-none"
        style={{
          top: "calc(50% + 100px)",
          left: "calc(50% - 500px)",
        }}
        animationData={popAnimation}
        loop={false}
      />
      <Lottie
        lottieRef={lottiePopB}
        className="absolute w-[200px] pointer-events-none"
        style={{
          top: "calc(50% - 350px)",
          left: "calc(50%)",
        }}
        animationData={popAnimation}
        loop={false}
      />
      <Lottie
        lottieRef={lottiePopC}
        className="absolute w-[200px] pointer-events-none"
        style={{
          top: "calc(50% + 100px)",
          left: "calc(50% + 200px)",
        }}
        animationData={popAnimation}
        loop={false}
      />
      <Lottie
        lottieRef={lottiePopD}
        className="absolute w-[200px] pointer-events-none"
        style={{
          top: "calc(50% - 400px)",
          left: "calc(50% - 800px)",
        }}
        animationData={popAnimation}
        loop={false}
      />
      <Lottie
        lottieRef={lottiePopE}
        className="absolute w-[200px] pointer-events-none"
        style={{
          top: "calc(50% - 100px)",
          left: "calc(50% + 700px)",
        }}
        animationData={popAnimation}
        loop={false}
      />
      <div
        className={cn(
          className,
          "relative h-[175px] mt-10"
        )}
      >
        <Lottie
          className="absolute top-[24%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[600px] md:h-[1000px] w-[4000px] pointer-events-none"
          animationData={logoAnimation}
          loop={false}
        />
      </div>
      <h3 className="text-white uppercase leading-10">
        Software Engineer
      </h3>
    </div>
  )
}

export { Jumbotron }
