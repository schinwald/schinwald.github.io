import { ClientOnly } from "remix-utils/client-only";
import logoAnimation from "~/assets/lotties/logo.json";
import * as Card from "~/components/card";
import { LazyLottie } from "~/components/lottie.client";
import * as Tab from "~/components/tab";
import { cn } from "~/utils/classname";

type JumbotronProps = {
	className?: string;
};

const Jumbotron: React.FC<JumbotronProps> = ({ className }) => {
	return (
		<div className="relative h-screen flex flex-col justify-center items-center overflow-x-clip transition-all">
			<div className="flex flex-col items-center gap-8">
				<div
					className={cn(
						className,
						"relative h-[80px] sm:h-[100px] md:h-[140px] mt-10",
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
			</div>
			<div className="absolute bottom-10">
				<Tab.Root />
			</div>
		</div>
	);
};

export { Jumbotron };
