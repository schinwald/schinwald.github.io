import { ClientOnly } from "remix-utils/client-only";
import logoAnimation from "~/assets/lotties/logo.json";
import * as Card from "~/components/card";
import { LazyLottie } from "~/components/lottie.client";
import { cn } from "~/utils/classname";

type JumbotronProps = {
	className?: string;
};

const Jumbotron: React.FC<JumbotronProps> = ({ className }) => {
	return (
		<div className="relative h-screen flex flex-col justify-center items-center gap-2 overflow-x-clip transition-all">
			<div
				className={cn(
					className,
					"relative h-[80px] sm:h-[100px] md:h-[175px] mt-10",
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
			<div className="absolute z-10 bottom-8">
				<Card.Root size="sm">
					<nav className="flex px-2 divide-solid">
						<a className="font-display text-sm px-4 py-1" href="#about">
							About
						</a>
						<a className="font-display text-sm px-4 py-1" href="#projects">
							Projects
						</a>
						<a className="font-display text-sm px-4 py-1" href="#testimonials">
							Testimonials
						</a>
						<a className="font-display text-sm px-4 py-1" href="#contact">
							Contact
						</a>
					</nav>
				</Card.Root>
			</div>
		</div>
	);
};

export { Jumbotron };
