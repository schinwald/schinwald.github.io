import logoAnimation from '~/assets/lotties/logo.json'
import popAnimation from '~/assets/lotties/pop.json'
import { cn } from '~/utils/classname'
import { useEffect, useRef } from "react"
import type { LottieRefCurrentProps } from 'lottie-react'
import { BackgroundGradient } from '~/components/background-gradient'
import { LazyLottie } from "~/components/lottie.client";
import { ClientOnly } from "remix-utils/client-only";

type JumbotronProps = {
  className?: string
}

const Jumbotron: React.FC<JumbotronProps> = ({ className }) => {
  const lottiePopA = useRef<LottieRefCurrentProps>(null)
  const lottiePopB = useRef<LottieRefCurrentProps>(null)
  const lottiePopC = useRef<LottieRefCurrentProps>(null)
  const lottiePopD = useRef<LottieRefCurrentProps>(null)
  const lottiePopE = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []
    const timeouts: NodeJS.Timeout[] = []

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
    <div className='relative h-screen flex flex-col justify-center items-center gap-2 overflow-x-clip transition-all'>
      <ClientOnly>
        {() => (
          <LazyLottie
            lottieRef={lottiePopA}
            className="absolute w-[200px] pointer-events-none"
            style={{
              top: "calc(50% + 100px)",
              left: "calc(50% - 500px)",
            }}
            animationData={popAnimation}
            loop={false}
          />
        )}
      </ClientOnly>
      <ClientOnly>
        {() => (
          <LazyLottie
            lottieRef={lottiePopB}
            className="absolute w-[200px] pointer-events-none"
            style={{
              top: "calc(50% - 350px)",
              left: "calc(50%)",
            }}
            animationData={popAnimation}
            loop={false}
          />
        )}
      </ClientOnly>
      <ClientOnly>
        {() => (
          <LazyLottie
            lottieRef={lottiePopC}
            className="absolute w-[200px] pointer-events-none"
            style={{
              top: "calc(50% + 100px)",
              left: "calc(50% + 200px)",
            }}
            animationData={popAnimation}
            loop={false}
          />
        )}
      </ClientOnly>
      <ClientOnly>
        {() => (
          <LazyLottie
            lottieRef={lottiePopD}
            className="absolute w-[200px] pointer-events-none"
            style={{
              top: "calc(50% - 400px)",
              left: "calc(50% - 800px)",
            }}
            animationData={popAnimation}
            loop={false}
          />
        )}
      </ClientOnly>
      <ClientOnly>
        {() => (
          <LazyLottie
            lottieRef={lottiePopE}
            className="absolute w-[200px] pointer-events-none"
            style={{
              top: "calc(50% - 100px)",
              left: "calc(50% + 700px)",
            }}
            animationData={popAnimation}
            loop={false}
          />
        )}
      </ClientOnly>
      <div
        className={cn(
          className,
          "relative h-[80px] sm:h-[100px] md:h-[175px] mt-10"
        )}
      >
        <ClientOnly>
          {() => (
            <LazyLottie
              className="absolute top-[24%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[400px] sm:h-[600px] md:h-[1000px] w-[4000px] pointer-events-none"
              animationData={logoAnimation}
              loop={false}
            />
          )}
        </ClientOnly>
        <h2 className="absolute invisible -translate-x-[50%]">
          James Schinwald
        </h2>
      </div>
      <h3 className="text-foreground uppercase leading-10">
        Software Engineer
      </h3>
      <BackgroundGradient />
      <nav className='absolute bottom-0 left-0 right-0 pt-8 pb-10 h-20 flex flex-row justify-center items-center gap-6 border-b-8 border-[#fff2]'>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#about'>About Me</a>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#projects'>Projects</a>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#testimonials'>Testimonials</a>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#contact'>Contact</a>
      </nav>
    </div>
  )
}

export { Jumbotron }
