import logoAnimation from '~/assets/lotties/logo.json'
import { cn } from '~/utils/classname'
import { BackgroundGradient } from '~/components/background-gradient'
import { LazyLottie } from "~/components/lottie.client";
import { ClientOnly } from "remix-utils/client-only";

type JumbotronProps = {
  className?: string
}

const Jumbotron: React.FC<JumbotronProps> = ({ className }) => {
  return (
    <div className='relative h-screen flex flex-col justify-center items-center gap-2 overflow-x-clip transition-all'>
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
      <nav className='absolute bottom-0 left-0 right-0 pt-8 pb-10 h-20 flex flex-row justify-center items-center gap-6'>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#about'>About Me</a>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#projects'>Projects</a>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#testimonials'>Testimonials</a>
        <a className='font-display text-md opacity-70 rounded-md border px-4 py-1' href='#contact'>Contact</a>
      </nav>
    </div>
  )
}

export { Jumbotron }
