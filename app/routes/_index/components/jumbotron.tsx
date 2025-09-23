import { ClientOnly } from "remix-utils/client-only";
import logoAnimation from "~/assets/lotties/logo.json";
import { LazyLottie } from "~/components/lottie.client";
import { cn } from "~/utils/classname";

type JumbotronProps = {
  className?: string;
};

const Jumbotron: React.FC<JumbotronProps> = ({ className }) => {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-x-clip transition-all">
      <div className="flex flex-col items-center gap-8">
        <div
          className={cn(
            className,
            "relative mt-10 h-[80px] sm:h-[100px] md:h-[140px]",
          )}
        >
          <ClientOnly>
            {() => (
              <LazyLottie
                className="pointer-events-none absolute top-[24%] left-[50%] h-[400px] w-[4000px] translate-x-[-50%] translate-y-[-50%] sm:h-[600px] md:h-[1000px]"
                animationData={logoAnimation}
                loop={false}
              />
            )}
          </ClientOnly>
          <h2 className="-translate-x-[50%] invisible absolute">
            James Schinwald
          </h2>
        </div>
        <h3 className="text-foreground uppercase leading-10">
          Software Engineer
        </h3>
      </div>
    </div>
  );
};

export { Jumbotron };
